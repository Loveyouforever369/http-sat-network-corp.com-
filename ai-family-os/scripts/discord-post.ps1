<#
.SYNOPSIS
  AI Family - post an episode/announcement to a Discord channel via webhook.
.DESCRIPTION
  Runs where Discord is reachable (your machine / n8n / a deployed function).
  NOTE: it CANNOT run from the Claude cloud sandbox - that network policy blocks
  discord.com (403 on CONNECT). Set the webhook URL as an env var; never hardcode it.
.EXAMPLE
  $env:FAMILY_DISCORD_WEBHOOK = "https://discord.com/api/webhooks/XXX/YYY"
  ./discord-post.ps1 -Title "Homefront EP-0107 is live" -Message "3 ways AI lowers your home bills" -Url "https://..."
#>
[CmdletBinding()]
param(
  [string]$WebhookUrl = $env:FAMILY_DISCORD_WEBHOOK,
  [Parameter(Mandatory)] [string]$Title,
  [Parameter(Mandatory)] [string]$Message,
  [string]$Url = "",
  [string]$Username = "The AI Family",
  [int]$Color = 16103746   # gold (#f5b942)
)

if (-not $WebhookUrl) {
  Write-Host "No webhook URL. Set `$env:FAMILY_DISCORD_WEBHOOK or pass -WebhookUrl." -ForegroundColor Red
  exit 1
}

$embed = @{ title = $Title; description = $Message; color = $Color }
if ($Url) { $embed.url = $Url }
$payload = @{ username = $Username; embeds = @($embed) } | ConvertTo-Json -Depth 6

try {
  Invoke-RestMethod -Uri $WebhookUrl -Method Post -ContentType 'application/json' -Body $payload | Out-Null
  Write-Host "OK posted to Discord: $Title" -ForegroundColor Green
  # If running inside the OS, log it:
  $common = Join-Path $PSScriptRoot '_Common.ps1'
  if (Test-Path $common) { . $common; $ctx = Initialize-Family; Write-FamilyLog -Ctx $ctx -System 'discord-post' -Actor 'MBR-0006' -Task ("posted: " + $Title) | Out-Null }
} catch {
  Write-Host "Discord post failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
