@echo off
setlocal enabledelayedexpansion
REM ===================================================================
REM  BACK UP THE WEBSITE TO YOUR PERSONAL GOOGLE DRIVE
REM
REM  Just double-click this file whenever you want a fresh backup.
REM
REM  If Google Drive for Desktop is installed, this copies everything
REM  straight into your Drive folder and Drive syncs it to the cloud.
REM  If it is not installed, this makes a dated .zip on your Desktop
REM  and opens drive.google.com so you can drag the zip in.
REM ===================================================================

set "GD="

REM --- Look for a Google Drive for Desktop mount ---------------------
if exist "%USERPROFILE%\My Drive\" set "GD=%USERPROFILE%\My Drive"
if not defined GD (
  for %%D in (G H I J K L M N O P Q R S T U V W X Y Z) do (
    if not defined GD if exist "%%D:\My Drive\" set "GD=%%D:\My Drive"
  )
)

if defined GD goto :sync
goto :zip


:sync
set "DEST=%GD%\Website-Backup"
echo.
echo  Google Drive found.
echo  Backing up to: %DEST%
echo.
REM /MIR mirrors the folder: adds new files, updates changed ones and
REM removes ones you deleted. The hidden .git folder comes along too,
REM so your full edit history is backed up as well.
robocopy "%~dp0." "%DEST%\Portfolio website" /MIR /NFL /NDL /NJH /NP /R:2 /W:2
if exist "%~dp0..\_journal-offline" robocopy "%~dp0..\_journal-offline" "%DEST%\_journal-offline" /MIR /NFL /NDL /NJH /NP /R:2 /W:2
echo.
echo  ============================================
echo   Backup finished.
echo   Files are in: %DEST%
echo   Google Drive will sync them to the cloud.
echo  ============================================
goto :done


:zip
echo.
echo  Google Drive for Desktop is not installed on this PC.
echo  Making a dated ZIP on your Desktop instead...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make-backup-zip.ps1"
if errorlevel 1 goto :done
echo.
echo  Opening Google Drive in your browser.
echo  Drag the zip from your Desktop onto the Drive page to upload it.
start "" "https://drive.google.com/drive/my-drive"
goto :done


:done
echo.
pause
