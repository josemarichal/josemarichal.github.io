import os
import re

directory = "C:/Users/jfmar/josemarichal/github.io"


def remove_blog_link(content):
    # Matches the blog link and any surrounding whitespace to keep formatting clean
    pattern = r'\s*<li><a href="blog\.html"[^>]*>Blog</a></li>'

    if re.search(pattern, content):
        new_content = re.sub(pattern, '', content)
        return new_content

    return content


for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = remove_blog_link(content)

        if new_content != content:
            print(f"Updating {filename}...")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

print("Batch update complete.")
