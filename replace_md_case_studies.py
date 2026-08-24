import re

md_file = r'c:\Users\jfmar\josemarichal\github.io\california-politics-2026-syllabus (1).md'
with open(md_file, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'Institute for Local Government': 'Economy & Labor',
    'Katherine Levine Einstein': 'Housing & Homelessness',
    'Nolan Gray, *Arbitrary': 'Housing & Homelessness',
    'Public Policy Institute of California, *[\"Wildfires': 'Environment',
    'Ezra Klein, *[\"The Climate Movement': 'Environment',
    'PPIC, *[Priorities for California’s Water]': 'Environment',
    '[CalMatters Water In-Depth': 'Environment',
    'Ralph Vartabedian, *[\"How California\'s High-Speed': 'Economy & Labor',
    '[CA High-Speed Rail Authority': 'Economy & Labor',
    'Alon Levy & Eric Goldwyn': 'Economy & Labor',
    'Veena Dubal, *[\"The Drive': 'Economy & Labor',
    'Selected legislative analyses on SB 1047': 'Economy & Labor',
    '[Healthy California for All': 'Health & Safety Net',
    'John Aubrey Douglass, *The California Idea': 'Education',
    'Ezra Klein, *[\"How California Can Save Itself\"]': 'Housing & Homelessness'
}

for k, issue in replacements.items():
    # Regex to match the line containing the key
    pattern = r'^\s*\*\s*.*?' + re.escape(k) + r'.*?$'
    content = re.sub(pattern, f'* **Case Study:** {issue}', content, flags=re.MULTILINE)

with open(md_file, 'w', encoding='utf-8') as f:
    f.write(content)
print('Markdown manual replacements done.')
