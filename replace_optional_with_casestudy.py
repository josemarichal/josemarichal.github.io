import re

def get_policy_issue(text):
    t = text.lower()
    if any(k in t for k in ['hous', 'neighborhood', 'transit', 'build', 'wiener', 'zoning', 'yimby']):
        return "Housing & Homelessness"
    if any(k in t for k in ['climate', 'water', 'wildfire', 'ceqa', 'environment', 'energy']):
        return "Environment"
    if any(k in t for k in ['educ', 'higher ed', 'uc', 'student', 'school']):
        return "Education"
    if any(k in t for k in ['health', 'care', 'medical', 'hospital']):
        return "Health & Safety Net"
    if any(k in t for k in ['labor', 'prop 22', 'tax', 'economy', 'rail', 'cost', 'worker', 'precarity', 'budget']):
        return "Economy & Labor"
    if any(k in t for k in ['justice', 'police', 'incarceration', 'crime', 'prison']):
        return "Criminal Justice"
    
    # Default fallback
    return "Economy & Labor"

def process_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    def repl(m):
        opt_content = m.group(1)
        issue = get_policy_issue(opt_content)
        return f'<li><strong>Case Study:</strong> {issue}</li>\n'
        
    # Match the optional block
    content = re.sub(r'<li><strong>Optional:</strong>\s*<ul>(.*?)</ul>\s*</li>\n?', repl, content, flags=re.DOTALL | re.IGNORECASE)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def process_md(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def repl(m):
        opt_content = m.group(1)
        issue = get_policy_issue(opt_content)
        return f'* **Case Study:** {issue}\n'
        
    # Match the optional block in markdown
    # It starts with "* **Optional:**\n" and is followed by lines starting with "  * "
    content = re.sub(r'\* \*\*Optional:\*\*\n((?:  \* .*\n)*)', repl, content, flags=re.IGNORECASE)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

process_html(r'c:\Users\jfmar\josemarichal\github.io\syllabus_california_politics.html')
process_md(r'c:\Users\jfmar\josemarichal\github.io\california-politics-2026-syllabus (1).md')
print("Successfully replaced optional readings with case studies.")
