import os
import win32com.client

wscript = win32com.client.Dispatch("WScript.Shell")

base_dir = r"c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\manuscript_editor"
bat_path = os.path.join(base_dir, "launch_editor.bat")
ico_path = os.path.join(base_dir, "app_icon.ico")
shortcut_name = "Brand Liberalism Editor.lnk"

# Potential Desktop paths
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
        shortcut.TargetPath = bat_path
        shortcut.WorkingDirectory = base_dir
        shortcut.Description = "Brand Liberalism Manuscript Editor & Cutting Deck"
        shortcut.IconLocation = f"{ico_path},0"
        shortcut.Save()
        created.append(target_lnk)
        print(f"Created shortcut: {target_lnk}")

if not created:
    print("Warning: No desktop directory found.")
else:
    print("Successfully created desktop shortcut(s)!")
