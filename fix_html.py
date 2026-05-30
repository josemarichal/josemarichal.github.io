import os
import glob
import re

dir_path = r'c:\Users\jfmar\josemarichal\github.io'
html_files = glob.glob(os.path.join(dir_path, '**', '*.html'), recursive=True)

for file in html_files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # Update cache buster
        content = re.sub(r'href="style\.css\?v=\d+"', 'href="style.css?v=3"', content)
        content = re.sub(r'href="\.\./style\.css\?v=\d+"', 'href="../style.css?v=3"', content)
        
        # For files without cache buster
        content = re.sub(r'href="style\.css"', 'href="style.css?v=3"', content)
        content = re.sub(r'href="\.\./style\.css"', 'href="../style.css?v=3"', content)
        
        # Remove the old font tags
        # These might be split across lines, so we use DOTALL
        content = re.sub(
            r'<link[^>]*href="https://fonts\.googleapis\.com"[^>]*>\s*<link[^>]*href="https://fonts\.gstatic\.com"[^>]*>\s*<link[^>]*family=Inter[^>]*>', 
            '', 
            content, 
            flags=re.DOTALL
        )
        # Fallback if they are not grouped together
        content = re.sub(r'<link[^>]*family=Inter[^>]*>', '', content)
        content = re.sub(r'<link[^>]*href="https://fonts\.googleapis\.com"[^>]*>', '', content)
        content = re.sub(r'<link[^>]*href="https://fonts\.gstatic\.com"[^>]*>', '', content)
            
        if content != original_content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file}")
            
    except Exception as e:
        print(f"Error processing {file}: {e}")
