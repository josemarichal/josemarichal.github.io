import os
import re

directory = "c:/Users/jfmar/josemarichal/github.io"

def update_nav(content):
    # Check if Internships link already exists
    if 'href="internships.html"' in content:
        return content

    # Regex to find the Media link and append Internships after it
    # Pattern looks for <li><a href="media.html">Media</a></li>
    # We use a capture group to keep the Media link and add the new one
    pattern = r'(<li><a href="media\.html">Media</a></li>)'
    replacement = r'\1\n                    <li><a href="internships.html">Internships</a></li>'
    
    new_content = re.sub(pattern, replacement, content)
    
    return new_content

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        
        # Skip if it's the interns page itself (already correct) or index (already done)
        # primarily to avoid messing up the specific "active" class or other manual edits I made
        if filename in ["internships.html", "index.html"]:
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = update_nav(content)
        
        if new_content != content:
            print(f"Updating {filename}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Batch update complete.")
