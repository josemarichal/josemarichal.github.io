import os
import win32com.client

wscript = win32com.client.Dispatch("WScript.Shell")

pythonw_path = r"C:\Users\jfmar\anaconda3\pythonw.exe"
app_py = r"c:\Users\jfmar\josemarichal\github.io\passage_matcher_app\app.py"
working_dir = r"c:\Users\jfmar\josemarichal\github.io\passage_matcher_app"
icon_path = r"c:\Users\jfmar\josemarichal\github.io\passage_matcher_app\app_icon.ico"
shortcut_names = ["Marketplace of Ideas.lnk", "Media Relations Exchange.lnk"]

# Potential Desktop paths
desktop_paths = [
    wscript.SpecialFolders("Desktop"),
    r"C:\Users\jfmar\OneDrive\Desktop",
    r"C:\Users\jfmar\Desktop"
]

created = []
for d in set(desktop_paths):
    if os.path.isdir(d):
        for sname in shortcut_names:
            target_lnk = os.path.join(d, sname)
            shortcut = wscript.CreateShortcut(target_lnk)
            shortcut.TargetPath = pythonw_path
            shortcut.Arguments = f'"{app_py}"'
            shortcut.WorkingDirectory = working_dir
            shortcut.IconLocation = f"{icon_path},0"
            shortcut.Description = "The Media Relations Exchange - 55 PR Agencies Competing to Pitch Your Ideas"
            shortcut.Save()
            created.append(target_lnk)
            print(f"Created shortcut: {target_lnk}")

if not created:
    print("Warning: No desktop directory found.")
else:
    print("Successfully created desktop shortcut(s)!")
