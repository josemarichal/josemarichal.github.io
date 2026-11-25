$WshShell = New-Object -ComObject WScript.Shell

$possibleDesktops = @(
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\OneDrive\Desktop"
)

$targetScript = "c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\app.py"
$workingDir = "c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app"
$iconPath = "c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\film_icon.ico"

# Find pythonw.exe
$pythonw = (Get-Command pythonw.exe -ErrorAction SilentlyContinue).Source
if (-not $pythonw) {
    if (Test-Path "C:\Users\jfmar\anaconda3\pythonw.exe") {
        $pythonw = "C:\Users\jfmar\anaconda3\pythonw.exe"
    } elseif (Test-Path "C:\Python313\pythonw.exe") {
        $pythonw = "C:\Python313\pythonw.exe"
    } else {
        $pythonw = "pythonw.exe"
    }
}

foreach ($d in ($possibleDesktops | Select-Object -Unique)) {
    if ($d -and (Test-Path $d)) {
        # Clean standard name
        $lnkPath = Join-Path $d "Short Film Assistant.lnk"
        $shortcut = $WshShell.CreateShortcut($lnkPath)
        $shortcut.TargetPath = $pythonw
        $shortcut.Arguments = "`"$targetScript`""
        $shortcut.WorkingDirectory = $workingDir
        $shortcut.IconLocation = "$iconPath,0"
        $shortcut.Description = "Short Film Assistant - Video Essays from Book Manuscript"
        $shortcut.Save()
        Write-Host "Created Desktop Shortcut: $lnkPath"
    }
}
