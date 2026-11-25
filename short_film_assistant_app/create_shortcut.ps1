$WshShell = New-Object -ComObject WScript.Shell
$Desktop = [System.Environment]::GetFolderPath('Desktop')
$ShortcutPath = Join-Path $Desktop "Short Film Assistant.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "pythonw.exe"
$Shortcut.Arguments = "`"c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\app.py`""
$Shortcut.WorkingDirectory = "c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app"
$Shortcut.IconLocation = "c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\app_icon.ico,0"
$Shortcut.Description = "Short Film Assistant - Video Essays from Book Manuscript"
$Shortcut.Save()
Write-Host "Desktop shortcut created at: $ShortcutPath"

