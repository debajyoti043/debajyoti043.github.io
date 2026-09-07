@echo off
REM ===================================================================
REM  Back up the whole website (and the offline Journal) to OneDrive.
REM  Double-click this file any time you want a fresh backup.
REM
REM  It copies to:  %USERPROFILE%\OneDrive\Website-Backup\
REM  OneDrive then syncs that to the cloud automatically, so the files
REM  survive even if this computer dies.
REM ===================================================================

set "DEST=%USERPROFILE%\OneDrive\Website-Backup"

echo.
echo Backing up to: %DEST%
echo.

REM /MIR mirrors the folder: adds new files, updates changed ones, and
REM removes files you have deleted. The hidden .git folder comes too, so
REM the full edit history is backed up as well.
robocopy "%~dp0." "%DEST%\Portfolio website" /MIR /NFL /NDL /NJH /NP /R:2 /W:2

REM The Journal is parked outside the site folder; back it up too.
if exist "%~dp0..\_journal-offline" (
  robocopy "%~dp0..\_journal-offline" "%DEST%\_journal-offline" /MIR /NFL /NDL /NJH /NP /R:2 /W:2
)

echo.
echo ============================================
echo  Backup finished.
echo  Files are in: %DEST%
echo  OneDrive will sync them to the cloud.
echo ============================================
echo.
pause
