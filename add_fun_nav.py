import os
import re

directory = "C:/Users/jfmar/josemarichal/github.io"


def update_nav(content):
    # Looking for the AI Tools link to insert our new link immediately after it
    pattern = r'(<li><a href="ai_tools\.html">AI Tools</a></li>)'
    new_link = r'\1\n                    <li><a href="just_for_fun.html">Just for Fun</a></li>'

    # Check if we already inserted it
    if 'href="just_for_fun.html"' in content:
        return content

    if re.search(pattern, content):
        new_content = re.sub(pattern, new_link, content)
        return new_content

    return content


for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = update_nav(content)

        if new_content != content:
            print(f"Updating {filename}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Batch update complete.")
