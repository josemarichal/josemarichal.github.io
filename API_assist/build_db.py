import json
import re
import os

def build_api_db():
    readme_path = os.path.join("public-apis", "README.md")
    if not os.path.exists(readme_path):
        print(f"File {readme_path} not found.")
        return

    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the index section to understand categories
    # Tables start after the "Index" section
    
    # Split by lines
    lines = content.split('\n')
    
    apis = []
    current_category = "General"
    
    # Match markdown headers for categories, e.g., "### Animals"
    category_regex = re.compile(r'^###\s+(.+)$')
    
    # Match markdown tables. 
    # Example row: | [AdoptAPet](https://www.adoptapet.com/public/apis/pet_list.html) | Resource to help get pets adopted | `apiKey` | Yes | Yes |
    # Or without backticks for apiKey.
    table_regex = re.compile(r'^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|')

    in_table = False
    
    for line in lines:
        cat_match = category_regex.match(line.strip())
        if cat_match:
            current_category = cat_match.group(1).strip()
            continue
            
        if line.strip().startswith('| API | Description | Auth | HTTPS | CORS |'):
            in_table = True
            continue
            
        row_match = table_regex.match(line.strip())
        if row_match:
            api_name = row_match.group(1).strip()
            api_link = row_match.group(2).strip()
            description = row_match.group(3).strip()
            auth = row_match.group(4).strip().replace('`', '')
            https = row_match.group(5).strip()
            cors = row_match.group(6).strip()
            
            apis.append({
                "category": current_category,
                "name": api_name,
                "link": api_link,
                "description": description,
                "auth": auth if auth else "No",
                "https": https,
                "cors": cors
            })

    # Save to JS file to avoid CORS issues on file:// protocol
    with open("api_db.js", "w", encoding="utf-8") as out:
        out.write("const apiData = ")
        json.dump(apis, out, indent=2)
        out.write(";\n")

    print(f"Successfully extracted {len(apis)} APIs into api_db.js.")

if __name__ == "__main__":
    build_api_db()
