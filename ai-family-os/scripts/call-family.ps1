<#
.SYNOPSIS
  AI Family - the universal call entrypoint.
.EXAMPLE
  ./call-family.ps1 -Member sage -Request "Study this model and return a training brief"
  ./call-family.ps1 -Pipeline family-training-loop
  ./call-family.ps1 -Campaign weekly-signal-drop
  ./call-family.ps1 -List Members
#>
[CmdletBinding()]
param(
    [string]$Member,
    [string]$Pipeline,
    [string]$Campaign,
    [string]$Request = '',
    [ValidateSet('Members', 'Pipelines', 'Crews', 'Campaigns')]
    [string]$List
)

. "$PSScriptRoot/_Common.ps1"
$ctx = Initialize-Family

if ($List) {
    switch ($List) {
        'Members'   { $ctx.Config.members   | Select-Object id, name, crew, role | Format-Table -AutoSize }
        'Pipelines' { $ctx.Config.pipelines | Select-Object id, name, goal | Format-Table -AutoSize }
        'Crews'     { $ctx.Config.crews     | Select-Object id, name, lead, mission | Format-Table -AutoSize }
        'Campaigns' { $ctx.Config.campaigns | Select-Object id, name, @{n='pipelines';e={$_.pipelines -join ', '}} | Format-Table -AutoSize }
    }
    return
}

if ($Member)        { Invoke-FamilyMember   -Ctx $ctx -Member $Member -Request $Request | Out-Null }
elseif ($Pipeline)  { Invoke-FamilyPipeline -Ctx $ctx -Pipeline $Pipeline -Request $Request | Out-Null }
elseif ($Campaign)  { Invoke-FamilyCampaign -Ctx $ctx -Campaign $Campaign -Request $Request }
else {
    Write-Host "AI Family - call-family" -ForegroundColor Yellow
    Write-Host "  ./call-family.ps1 -Member sage -Request 'Study X'"
    Write-Host "  ./call-family.ps1 -Pipeline family-training-loop"
    Write-Host "  ./call-family.ps1 -Campaign weekly-signal-drop"
    Write-Host "  ./call-family.ps1 -List Members|Pipelines|Crews|Campaigns"
}
