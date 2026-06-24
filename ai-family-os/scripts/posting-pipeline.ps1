<#
.SYNOPSIS
  AI Family - generate the posting queue from current episodes.
.EXAMPLE
  ./posting-pipeline.ps1 -Generate
#>
[CmdletBinding()]
param([switch]$Generate)

. "$PSScriptRoot/_Common.ps1"
$ctx = Initialize-Family

if (-not $Generate) {
    Write-Host "Usage: ./posting-pipeline.ps1 -Generate"
    return
}

$today = Get-Date -Format 'yyyy-MM-dd'
$queue = @()
foreach ($e in $ctx.Config.episodes) {
    foreach ($t in $e.publish_targets) {
        $queue += [pscustomobject]@{
            episode = $e.id
            title   = $e.title
            target  = $t
            status  = $e.status
        }
    }
}

$outFile = Join-Path $ctx.Briefs ("posting-queue-$today.json")
$queue | ConvertTo-Json -Depth 5 | Set-Content -Path $outFile -Encoding utf8
Write-Host ("OK Posting queue: {0} item(s) -> {1}" -f $queue.Count, $outFile) -ForegroundColor Green
$queue | Select-Object episode, target, status | Format-Table -AutoSize
Write-FamilyLog -Ctx $ctx -System 'posting-pipeline' -Actor 'MBR-0011' -Task ("generated queue: " + $queue.Count + " items") | Out-Null
