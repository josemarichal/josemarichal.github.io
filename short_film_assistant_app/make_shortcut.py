import os
import win32com.client

wscript = win32com.client.Dispatch("WScript.Shell")

pythonw_path = r"C:\Users\jfmar\anaconda3\pythonw.exe"
if not os.path.exists(pythonw_path):
    import shutil
    pythonw_path = shutil.which("pythonw.exe") or "pythonw.exe"

app_py = r"c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\app.py"
working_dir = r"c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app"
icon_path = r"c:\Users\jfmar\josemarichal\github.io\short_film_assistant_app\app_icon.ico"
shortcut_name = "🎬 Short Film Assistant.lnk"

desktop_paths = [
    wscript.SpecialFolders("Desktop"),
    r"C:\Users\jfmar\OneDrive\Desktop",
    r"C:\Users\jfmar\Desktop"
]

created = []
for d in set(desktop_paths):
    if os.path.isdir(d):
        target_lnk = os.path.join(d, shortcut_name)
        shortcut = wscript.CreateShortcut(target_lnk)
        shortcut.TargetPath = pythonw_path
        shortcut.Arguments = f'"{app_py}"'
        shortcut.WorkingDirectory = working_dir
        if os.path.exists(icon_path):
            shortcut.IconLocation = f"{icon_path},0"
        shortcut.Description = "Short Film Assistant - Video Essays from Book Manuscript & Moving Image Archive"
        shortcut.Save()
        created.append(target_lnk)
        print(f"Created shortcut: {target_lnk}")

if not created:
    print("Warning: No desktop directory found.")
else:
    print("Successfully created desktop shortcut(s)!")

