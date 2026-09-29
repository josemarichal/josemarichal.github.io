#!/usr/bin/env python3
"""
Desktop launcher for Idea Assemblage Studio (Betye Saar Edition)
Launches the application in native standalone window mode via Edge, Chrome, or default browser.
"""
import os
import sys
import subprocess
import webbrowser

DIR = os.path.dirname(os.path.abspath(__file__))
HTML_PATH = os.path.join(DIR, "idea_assemblage.html")
FILE_URL = "file:///" + HTML_PATH.replace("\\", "/")

def launch():
    print("Launching Idea Assemblage Studio...")
    # Common browser paths on Windows
    edge_paths = [
        os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"),
    ]
    chrome_paths = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe"),
    ]

    for p in edge_paths + chrome_paths:
        if os.path.exists(p):
            try:
                subprocess.Popen([p, f"--app={FILE_URL}", "--window-size=1400,900"])
                return
            except Exception:
                pass

    # Fallback to default browser
    webbrowser.open(FILE_URL)

if __name__ == "__main__":
    launch()
