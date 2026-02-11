import os
import re

directory = "c:/Users/jfmar/josemarichal/github.io"


def update_nav(content):
    # Regex to find and remove the Internships link
    # Pattern looks for <li><a href="internships.html">Internships</a></li>
    # allowing for potential whitespace/newlines around it
    pattern = r'\s*<li><a href="internships\.html">Internships</a></li>'

    if re.search(pattern, content):
        new_content = re.sub(pattern, '', content)
        return new_content

    return content


for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)

        # We process ALL html files to remove the link
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = update_nav(content)

        if new_content != content:
            print(f"Updating {filename}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Batch update complete.")
