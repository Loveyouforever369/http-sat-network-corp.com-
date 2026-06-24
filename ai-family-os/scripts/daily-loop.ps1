<#
.SYNOPSIS
  AI Family - the canonical daily routine (morning / midday / evening).
.EXAMPLE
  ./daily-loop.ps1            # run all three phases
  ./daily-loop.ps1 -Phase Morning
#>
[CmdletBinding()]
param([ValidateSet('Morning', 'Midday', 'Evening', 'All')] [string]$Phase = 'All')

. "$PSScriptRoot/_Common.ps1"
$ctx = Initialize-Family
$today = Get-Date -Format 'yyyy-MM-dd'
Write-Host ("AI FAMILY | Daily Loop | {0}" -f $today) -ForegroundColor Yellow

function Invoke-MorningPhase($ctx) {
    Write-Host "`n-- MORNING: scan signals, assign, brief --" -ForegroundColor Cyan
    $new = @($ctx.Config.signals | Where-Object { $_.status -eq 'new' })
    Write-Host ("   {0} new signal(s) to triage" -f $new.Count)
    foreach ($s in $new) {
        $assignee = Find-Member -Ctx $ctx -Key $s.assigned_host
        Write-Host ("   - {0}  [{1}] -> {2}" -f $s.headline, $s.priority, $assignee.name)
        Write-FamilyLog -Ctx $ctx -System 'daily-loop' -Actor $assignee.id -Task ("study signal " + $s.id) -NextStep 'training brief' | Out-Null
    }
    Invoke-FamilyPipeline -Ctx $ctx -Pipeline 'family-training-loop' | Out-Null
    & "$PSScriptRoot/send-family-briefing.ps1"
}

function Invoke-MiddayPhase($ctx) {
    Write-Host "`n-- MIDDAY: produce content assets --" -ForegroundColor Cyan
    Invoke-FamilyPipeline -Ctx $ctx -Pipeline 'content-engine' | Out-Null
}

function Invoke-EveningPhase($ctx) {
    Write-Host "`n-- EVENING: review, repurpose, queue --" -ForegroundColor Cyan
    & "$PSScriptRoot/posting-pipeline.ps1" -Generate
    Invoke-FamilyPipeline -Ctx $ctx -Pipeline 'guardian-review' | Out-Null
    Write-FamilyLog -Ctx $ctx -System 'daily-loop' -Actor 'MBR-0011' -Task 'end-of-day review' -NextStep 'queue tomorrow' | Out-Null
}

switch ($Phase) {
    'Morning' { Invoke-MorningPhase $ctx }
    'Midday'  { Invoke-MiddayPhase $ctx }
    'Evening' { Invoke-EveningPhase $ctx }
    'All'     { Invoke-MorningPhase $ctx; Invoke-MiddayPhase $ctx; Invoke-EveningPhase $ctx }
}
Write-Host ("`nOK Daily loop ({0}) complete." -f $Phase) -ForegroundColor Green
