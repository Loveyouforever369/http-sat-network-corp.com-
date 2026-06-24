# AI Family OS - shared runtime.
# Dot-source from every script:  . "$PSScriptRoot/_Common.ps1"
# Targets PowerShell 7+ (cross-platform: Windows / macOS / Linux).

$ErrorActionPreference = 'Stop'

function Get-FamilyRoot {
    if ($env:FAMILY_ROOT) { if (Test-Path $env:FAMILY_ROOT) { return (Resolve-Path $env:FAMILY_ROOT).Path } }
    return (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
}

function Initialize-Family {
    $root = Get-FamilyRoot
    $configPath = Join-Path $root 'config/family.json'
    if ($env:FAMILY_CONFIG) { $configPath = $env:FAMILY_CONFIG }
    if (-not (Test-Path $configPath)) { throw "Family config not found: $configPath" }
    $cfg = Get-Content -Raw -Path $configPath | ConvertFrom-Json

    $logsDir   = Join-Path $root $cfg.settings.paths.logs
    $briefsDir = Join-Path $root $cfg.settings.paths.briefs
    $assetsDir = Join-Path $root $cfg.settings.paths.assets
    if ($env:FAMILY_LOGS)   { $logsDir   = $env:FAMILY_LOGS }
    if ($env:FAMILY_BRIEFS) { $briefsDir = $env:FAMILY_BRIEFS }
    foreach ($p in @($logsDir, $briefsDir, $assetsDir)) {
        if (-not (Test-Path $p)) { New-Item -ItemType Directory -Force -Path $p | Out-Null }
    }
    return [pscustomobject]@{
        Config = $cfg; Root = $root
        Logs = $logsDir; Briefs = $briefsDir; Assets = $assetsDir
    }
}

function Find-Member {
    param($Ctx, [string]$Key)
    $slug = $Key.ToLower()
    $m = $Ctx.Config.members | Where-Object {
        $_.id -eq $Key -or $_.name -eq $Key -or (($_.name -replace '\s+', '-').ToLower() -eq $slug)
    }
    return $m | Select-Object -First 1
}

function Find-Pipeline {
    param($Ctx, [string]$Key)
    return ($Ctx.Config.pipelines | Where-Object { $_.id -eq $Key -or $_.name -eq $Key } | Select-Object -First 1)
}

function Find-Campaign {
    param($Ctx, [string]$Key)
    return ($Ctx.Config.campaigns | Where-Object { $_.id -eq $Key -or $_.name -eq $Key } | Select-Object -First 1)
}

function Write-FamilyLog {
    param($Ctx, [string]$System, [string]$Actor, [string]$Task, [string]$Result = 'ok', [string]$NextStep = '')
    $entry = [ordered]@{
        id       = 'LOG-' + (Get-Date -Format 'yyyyMMddHHmmssfff')
        ts       = (Get-Date).ToString('o')
        system   = $System
        actor    = $Actor
        task     = $Task
        result   = $Result
        next_step = $NextStep
    }
    $logFile = Join-Path $Ctx.Logs ('family-' + (Get-Date -Format 'yyyy-MM-dd') + '.jsonl')
    ($entry | ConvertTo-Json -Compress) | Add-Content -Path $logFile -Encoding utf8
    Write-Host ("  [log] {0} | {1} | {2}" -f $System, $Actor, $Task) -ForegroundColor DarkGray
    return $entry
}

function Invoke-Model {
    # === THE SEAM: wire your real model / MCP call here ===
    # Demo mode returns a deterministic stub so the whole spine runs with ZERO API keys,
    # exactly like Prometheus' demo mode. To go live: set settings.demo_mode = false and
    # implement the real call (e.g. the Anthropic Messages API using settings.model).
    param($Ctx, [string]$Role, [string]$Request, [string[]]$Expected)
    if ($Ctx.Config.settings.demo_mode) {
        $exp = if ($Expected -and $Expected.Count -gt 0) { $Expected -join ', ' } else { 'result' }
        return "[DEMO | $Role] '$Request' -> would produce: $exp. (Wire Invoke-Model in _Common.ps1 to go live.)"
    }
    throw "Live mode requested but Invoke-Model is not wired. Implement the API call in scripts/_Common.ps1."
}

function Invoke-FamilyMember {
    param($Ctx, [string]$Member, [string]$Request)
    $m = Find-Member -Ctx $Ctx -Key $Member
    if (-not $m) { Write-Host "Unknown member: $Member" -ForegroundColor Red; return }
    Write-Host ("-> {0}  ({1})" -f $m.name, $m.role) -ForegroundColor Cyan
    $expected = @()
    if ($m.PSObject.Properties.Name -contains 'outputs') { $expected = @($m.outputs) }
    $out = Invoke-Model -Ctx $Ctx -Role $m.role -Request $Request -Expected $expected
    Write-Host "   $out"
    Write-FamilyLog -Ctx $Ctx -System 'member' -Actor $m.id -Task $Request | Out-Null
    return $out
}

function Invoke-FamilyPipeline {
    param($Ctx, [string]$Pipeline, [string]$Request = '')
    $p = Find-Pipeline -Ctx $Ctx -Key $Pipeline
    if (-not $p) { Write-Host "Unknown pipeline: $Pipeline" -ForegroundColor Red; return }
    Write-Host (">> Pipeline {0} - {1}" -f $p.id, $p.name) -ForegroundColor Yellow
    $carry = $Request
    $results = @()
    foreach ($step in $p.steps) {
        $m = Find-Member -Ctx $Ctx -Key $step.member
        $req = "Goal: $($p.goal). Emit: $($step.emits). Context: $carry"
        $out = Invoke-Model -Ctx $Ctx -Role $m.role -Request $req -Expected @($step.emits)
        Write-Host ("   . {0} => {1}" -f $m.name, $step.emits) -ForegroundColor Cyan
        Write-FamilyLog -Ctx $Ctx -System $p.id -Actor $m.id -Task ("emit " + $step.emits) | Out-Null
        $results += [pscustomobject]@{ member = $m.name; emits = $step.emits; output = $out }
        $carry = $step.emits
    }
    Write-Host ("OK {0} complete - {1} steps" -f $p.name, $results.Count) -ForegroundColor Green
    return $results
}

function Invoke-FamilyCampaign {
    param($Ctx, [string]$Campaign, [string]$Request = '')
    $c = Find-Campaign -Ctx $Ctx -Key $Campaign
    if (-not $c) { Write-Host "Unknown campaign: $Campaign" -ForegroundColor Red; return }
    Write-Host ("** Campaign {0} - {1}" -f $c.id, $c.name) -ForegroundColor Magenta
    foreach ($pl in $c.pipelines) { Invoke-FamilyPipeline -Ctx $Ctx -Pipeline $pl -Request $Request | Out-Null }
    Write-FamilyLog -Ctx $Ctx -System $c.id -Actor 'campaign' -Task ("ran " + ($c.pipelines -join ', ')) | Out-Null
}
