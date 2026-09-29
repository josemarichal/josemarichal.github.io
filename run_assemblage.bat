@echo off
title Idea Assemblage Studio (Betye Saar Edition)
echo Launching Idea Assemblage Desktop App...

set APP_URL=file:///%~dp0idea_assemblage.html
set APP_URL=%APP_URL:\=/%

:: Check for Microsoft Edge
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%" --window-size=1400,900
    goto done
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="%APP_URL%" --window-size=1400,900
    goto done
)

:: Check for Google Chrome
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%" --window-size=1400,900
    goto done
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="%APP_URL%" --window-size=1400,900
    goto done
)

:: Fallback to default browser
start "" "%APP_URL%"

:done
exit
