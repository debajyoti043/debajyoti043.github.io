@echo off
setlocal enabledelayedexpansion
REM ===================================================================
REM  BACK UP THE WEBSITE TO YOUR PERSONAL GOOGLE DRIVE
REM
REM  Just double-click this file whenever you want a fresh backup.
REM
REM  Google Drive does NOT need to be running, and does NOT need to
REM  start with Windows. If it is closed, this script starts it, copies
REM  the files, waits for the upload, and then closes it again -- so it
REM  uses no memory except during the backup itself.
REM
REM  If Google Drive is already running, the script leaves it running.
REM ===================================================================

set "GD="
set "GDEXE="
set "STARTEDBYME="

REM --- Find GoogleDriveFS.exe (the version number changes on updates) ---
for /f "delims=" %%F in ('dir /b /s /o-n "%ProgramFiles%\Google\Drive File Stream\GoogleDriveFS.exe" 2^>nul') do (
  if not defined GDEXE set "GDEXE=%%F"
)

REM --- Is Drive already mounted? ---
call :findmount
if defined GD (
  echo.
  echo  Google Drive is already running.
  goto :sync
)

REM --- Not mounted. Start it ourselves. ---
if not defined GDEXE goto :zip

echo.
echo  Google Drive is not running. Starting it...
start "" "%GDEXE%"
set "STARTEDBYME=1"

set /a TRIES=0
:waitloop
call :findmount
if defined GD goto :sync
set /a TRIES+=1
if !TRIES! GEQ 45 (
  echo  Google Drive did not start in time.
  goto :zip
)
>nul ping -n 3 127.0.0.1
goto :waitloop


:sync
set "DEST=%GD%\Website-Backup"
echo.
echo  Backing up to: %DEST%
echo.
REM /MIR mirrors the folder: adds new files, updates changed ones and
REM removes ones you deleted. The hidden .git folder comes along too,
REM so your full edit history is backed up as well.
robocopy "%~dp0." "%DEST%\Portfolio website" /MIR /NFL /NDL /NJH /NP /R:2 /W:2
if exist "%~dp0..\_journal-offline" robocopy "%~dp0..\_journal-offline" "%DEST%\_journal-offline" /MIR /NFL /NDL /NJH /NP /R:2 /W:2

if defined STARTEDBYME (
  echo.
  echo  Waiting 45 seconds for Google Drive to upload...
  >nul ping -n 46 127.0.0.1
  echo  Closing Google Drive again.
  "%GDEXE%" --quit >nul 2>&1
)

echo.
echo  ============================================
echo   Backup finished.
echo   Files are in: %DEST%
echo   Check drive.google.com ^> Website-Backup
echo  ============================================
goto :done


:zip
echo.
echo  Could not reach Google Drive on this PC.
echo  Making a dated ZIP on your Desktop instead...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0make-backup-zip.ps1"
if errorlevel 1 goto :done
echo.
echo  Opening Google Drive in your browser.
echo  Drag the zip from your Desktop onto the Drive page to upload it.
start "" "https://drive.google.com/drive/my-drive"
goto :done


:findmount
set "GD="
if exist "%USERPROFILE%\My Drive\" set "GD=%USERPROFILE%\My Drive"
if not defined GD (
  for %%D in (G H I J K L M N O P Q R S T U V W X Y Z) do (
    if not defined GD if exist "%%D:\My Drive\" set "GD=%%D:\My Drive"
  )
)
goto :eof


:done
echo.
pause
