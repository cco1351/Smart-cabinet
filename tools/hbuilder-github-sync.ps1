param(
  [switch]$Once,
  [int]$IntervalSeconds = 3
)
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
function Invoke-Git([string[]]$Args) {
  & git -C $ProjectRoot @Args
  if ($LASTEXITCODE -ne 0) { throw "git failed: $($Args -join ' ')" }
}
function Sync-Changes {
  $status = (& git -C $ProjectRoot status --porcelain)
  if (-not $status) { return $false }
  Start-Sleep -Seconds 2
  Invoke-Git @('add','-A')
  $staged = (& git -C $ProjectRoot diff --cached --name-only)
  if (-not $staged) { return $false }
  $stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
  Invoke-Git @('commit','-m',"chore: auto-sync $stamp")
  & git -C $ProjectRoot pull --rebase --autostash origin main
  if ($LASTEXITCODE -ne 0) { throw 'git pull --rebase failed; resolve the conflict before restarting sync.' }
  Invoke-Git @('push','origin','main')
  Write-Host "[$stamp] pushed to GitHub"
  return $true
}
if ($Once) { [void](Sync-Changes); exit 0 }
Write-Host "Watching $ProjectRoot for changes. Press Ctrl+C to stop."
while ($true) {
  try { [void](Sync-Changes) } catch { Write-Warning $_.Exception.Message }
  Start-Sleep -Seconds ([Math]::Max(1,$IntervalSeconds))
}
