import re

def process_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_ul(match):
        inner_html = match.group(1)
        # Find all li elements. Note: Some lis might have nested elements, but our syllabus lists are flat.
        lis = re.findall(r'<li>(.*?)</li>', inner_html, re.DOTALL)
        
        if not lis:
            return match.group(0)

        required = []
        optional = []
        other = []
        
        for li in lis:
            li_clean = li.strip()
            # check for optional
            if re.match(r'^\s*\(Optional\)\s*', li_clean, re.IGNORECASE):
                opt_text = re.sub(r'^\s*\(Optional\)\s*', '', li_clean, flags=re.IGNORECASE)
                optional.append(opt_text)
            elif 'Discussion Prompt' in li_clean or '📌' in li_clean or 'In-Class:' in li_clean or 'Examination' in li_clean or 'Syllabus overview' in li_clean or 'Placeholder:' in li_clean:
                other.append(li_clean)
            else:
                required.append(li_clean)

        # If there are no required and no optional (e.g. only other), don't change the structure
        if not required and not optional:
            return match.group(0)
            
        new_inner = '\n'
        if required:
            new_inner += '<li><strong>Required:</strong>\n<ul>\n'
            for r in required:
                new_inner += f'<li>{r}</li>\n'
            new_inner += '</ul>\n</li>\n'
        
        if optional:
            new_inner += '<li><strong>Optional:</strong>\n<ul>\n'
            for o in optional:
                new_inner += f'<li>{o}</li>\n'
            new_inner += '</ul>\n</li>\n'
            
        for oth in other:
            new_inner += f'<li>{oth}</li>\n'
            
        return f'<ul class="readings-list">{new_inner}</ul>'

    new_content = re.sub(r'<ul class="readings-list">(.*?)</ul>', replace_ul, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)


def process_md(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    out_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith('**Mon, ') or line.startswith('**Wed, ') or line.startswith('**Fri, '):
            out_lines.append(line)
            i += 1
            # Gather bullet points until an empty line or next day or next week
            bullets = []
            while i < len(lines):
                if lines[i].strip() == '' or lines[i].startswith('**') or lines[i].startswith('### '):
                    break
                if lines[i].strip().startswith('* '):
                    bullets.append(lines[i].strip()[2:])
                i += 1
                
            required = []
            optional = []
            other = []
            
            for b in bullets:
                b_clean = b.strip()
                if re.match(r'^\(Optional\)\s*', b_clean, re.IGNORECASE):
                    opt_text = re.sub(r'^\(Optional\)\s*', '', b_clean, flags=re.IGNORECASE)
                    optional.append(opt_text)
                elif 'Discussion Prompt' in b_clean or '📌' in b_clean or 'In-Class:' in b_clean or 'Examination' in b_clean or 'Syllabus overview' in b_clean or 'Placeholder:' in b_clean:
                    other.append(b_clean)
                else:
                    required.append(b_clean)
                    
            if not required and not optional:
                for b in bullets:
                    out_lines.append(f'* {b}\n')
            else:
                if required:
                    out_lines.append('* **Required:**\n')
                    for r in required:
                        out_lines.append(f'  * {r}\n')
                if optional:
                    out_lines.append('* **Optional:**\n')
                    for o in optional:
                        out_lines.append(f'  * {o}\n')
                for oth in other:
                    out_lines.append(f'* {oth}\n')
            
            continue
            
        out_lines.append(line)
        i += 1
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(out_lines)

process_html(r'c:\Users\jfmar\josemarichal\github.io\syllabus_california_politics.html')
process_md(r'c:\Users\jfmar\josemarichal\github.io\california-politics-2026-syllabus (1).md')
print("Successfully restructured readings!")
