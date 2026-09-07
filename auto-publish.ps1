# ===================================================================
#  AUTO-PUBLISH
#
#  Saves any changes you made to the website, backs them up to GitHub,
#  and publishes them to debajyotideb.com -- all in one step.
#
#  A Windows Scheduled Task runs this on its own, so normally you never
#  touch it. You can also right-click > "Run with PowerShell" any time
#  you want to publish immediately instead of waiting.
#
#  If nothing changed, it does nothing and exits quietly.
#
#  A log of every run is kept at:  auto-publish.log  (next to this file)
# ===================================================================

$ErrorActionPreference = "Stop"
$site = Split-Path -Parent $MyInvocation.MyCommand.Path
$log  = Join-Path $site "auto-publish.log"

function Write-Log($msg) {
  $line = "{0}  {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
  Add-Content -LiteralPath $log -Value $line -Encoding UTF8
  Write-Host $line
}

try {
  Set-Location -LiteralPath $site

  # Anything to publish?
  $changes = & git status --porcelain
  if (-not $changes) {
    Write-Log "No changes - nothing to publish."
    exit 0
  }

  $count = ($changes | Measure-Object).Count
  Write-Log "Found $count changed file(s). Publishing..."

  & git add -A
  if ($LASTEXITCODE -ne 0) { throw "git add failed" }

  $msg = "Site update " + (Get-Date -Format "yyyy-MM-dd HH:mm")
  & git commit -q -m $msg
  if ($LASTEXITCODE -ne 0) { throw "git commit failed" }

  & git push -q origin main
  if ($LASTEXITCODE -ne 0) { throw "git push failed - check your GitHub sign-in" }

  Write-Log "Published. GitHub Pages will rebuild debajyotideb.com in about a minute."
  exit 0
}
catch {
  Write-Log ("ERROR: " + $_.Exception.Message)
  exit 1
}
