import os
import re

directory = "c:/Users/jfmar/josemarichal/github.io"

def update_nav(content):
    # Regex to find the PAI-L link and remove it
    # Pattern looks for <li><a href="about.html"...>PAI-L</a></li>
    # We use multiline mode just in case, but usually it's one line.
    content = re.sub(r'\s*<li><a href="about\.html".*?>PAI-L</a></li>', '', content)
    
    # Regex to rename "Projects" to "PAI-L Projects"
    # Pattern looks for ><a href="projects.html"...>Projects</a>
    content = re.sub(r'(<a href="projects\.html"[^>]*?>)Projects</a>', r'\1PAI-L Projects</a>', content)
    
    return content

def update_index_text(content):
    # Update the text link in index.html Body
    # "The work of the Participatory AI Lab can be found on the <a href="about.html">About PAI-L</a> page."
    # Change to point to projects.html
    content = content.replace('<a href="about.html">About PAI-L</a>', '<a href="projects.html">Participatory AI Lab Projects</a>')
    return content

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = update_nav(content)
        
        if filename == "index.html":
            new_content = update_index_text(new_content)
            
        if new_content != content:
            print(f"Updating {filename}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Batch update complete.")
