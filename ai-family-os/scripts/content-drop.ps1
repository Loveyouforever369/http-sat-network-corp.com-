<#
.SYNOPSIS
  Orchestrates PIPE-006 (content-drop-machine) with one human approval gate.
.DESCRIPTION
  Walks the make -> build -> distribute -> orchestrate flow. Stops at the
  Guardian gate; only continues to publish + schedule when -Approve is passed.
  Runs in demo mode with zero API keys (Invoke-Model returns stubs).
.EXAMPLE
  ./content-drop.ps1 -Topic "What changed in AI this week"
  ./content-drop.ps1 -Topic "What changed in AI this week" -Approve
#>
[CmdletBinding()]
param(
    [string]$Topic = "What changed in AI this week",
    [switch]$Approve
)

. "$PSScriptRoot/_Common.ps1"
$ctx = Initialize-Family
$p = Find-Pipeline -Ctx $ctx -Key 'content-drop-machine'
if (-not $p) { Write-Host "Pipeline content-drop-machine not found in config." -ForegroundColor Red; return }

Write-Host ("CONTENT-DROP MACHINE | topic: {0}" -f $Topic) -ForegroundColor Yellow
Write-Host ("Mode: {0}" -f $(if ($Approve) { 'APPROVED (will distribute)' } else { 'walk-to-gate (stops before publish)' })) -ForegroundColor DarkGray

$carry = $Topic
foreach ($step in $p.steps) {
    $m = Find-Member -Ctx $ctx -Key $step.member
    $isGate = ($step.PSObject.Properties.Name -contains 'gate') -and $step.gate
    $tool = if ($step.PSObject.Properties.Name -contains 'tool') { $step.tool } else { '' }

    if ($isGate) {
        Write-Host ""
        Write-Host ("  [GATE] {0} -> {1}" -f $m.name, $step.emits) -ForegroundColor Magenta
        $rep = Invoke-Model -Ctx $ctx -Role $m.role -Request "Review the drop for accuracy, trust, and disclosure. Context: $carry" -Expected @($step.emits)
        Write-Host "    $rep"
        Write-FamilyLog -Ctx $ctx -System $p.id -Actor $m.id -Task 'approval gate' | Out-Null
        if (-not $Approve) {
            Write-Host "  >> APPROVAL GATE: stopping before publish. Re-run with -Approve to distribute + schedule." -ForegroundColor Yellow
            return
        }
        Write-Host "  >> Approved. Continuing to distribution." -ForegroundColor Green
        continue
    }

    $req = "Goal: $($p.goal). Emit: $($step.emits). Tool: $tool. Context: $carry"
    $out = Invoke-Model -Ctx $ctx -Role $m.role -Request $req -Expected @($step.emits)
    $label = if ($tool) { "{0}  ({1})" -f $step.emits, $tool } else { $step.emits }
    Write-Host ("  . {0} => {1}" -f $m.name, $label) -ForegroundColor Cyan
    Write-FamilyLog -Ctx $ctx -System $p.id -Actor $m.id -Task ("emit " + $step.emits) | Out-Null
    $carry = $step.emits
}
Write-Host "`nOK Content-drop complete - published + scheduled." -ForegroundColor Green
