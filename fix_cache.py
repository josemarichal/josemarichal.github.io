import glob

for filepath in glob.glob('c:/Users/jfmar/josemarichal/github.io/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'href="style.css"' in content:
        content = content.replace('href="style.css"', 'href="style.css?v=2"')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
