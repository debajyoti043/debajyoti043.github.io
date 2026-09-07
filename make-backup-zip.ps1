# Makes a dated .zip of the whole website (plus the offline Journal)
# on your Desktop, ready to drag into Google Drive.
# Called by backup-to-google-drive.bat; you can also right-click >
# "Run with PowerShell".

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$site    = Split-Path -Parent $MyInvocation.MyCommand.Path
$journal = Join-Path (Split-Path -Parent $site) "_journal-offline"
$stamp   = Get-Date -Format "yyyy-MM-dd"
$stage   = Join-Path $env:TEMP ("website-backup-stage-" + $stamp)
$zip     = Join-Path ([Environment]::GetFolderPath("Desktop")) ("debajyotideb-website-backup-" + $stamp + ".zip")

if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
New-Item -ItemType Directory -Force -Path $stage | Out-Null

# /E copies every subfolder, hidden ones such as .git included.
robocopy $site (Join-Path $stage "Portfolio website") /E /NFL /NDL /NJH /NJS /NP /R:1 /W:1 | Out-Null
if (Test-Path -LiteralPath $journal) {
  robocopy $journal (Join-Path $stage "_journal-offline") /E /NFL /NDL /NJH /NJS /NP /R:1 /W:1 | Out-Null
}

if (Test-Path -LiteralPath $zip) { Remove-Item -LiteralPath $zip -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory($stage, $zip, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Remove-Item -LiteralPath $stage -Recurse -Force

$mb = [Math]::Round((Get-Item -LiteralPath $zip).Length / 1MB, 2)
Write-Host ""
Write-Host "  Created: $zip  ($mb MB)"
exit 0
