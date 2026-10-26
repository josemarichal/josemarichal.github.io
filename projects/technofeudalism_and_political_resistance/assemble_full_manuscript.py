import os
import importlib.util

p1_path = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\draft_chapter_1_raw.md'
p2_path = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\draft_chapter_1_part2_raw.md'

with open(p1_path, 'r', encoding='utf-8') as f: p1_text = f.read()
with open(p2_path, 'r', encoding='utf-8') as f: p2_text = f.read()

p1_lines = [l.strip() for l in p1_text.splitlines() if l.strip()]
if p1_lines[0].startswith('<USER_REQUEST>'): p1_lines = p1_lines[1:]
if p1_lines[0].startswith('This document is 41000 words'):
    if 'Chapter 1: Brand Liberalism' in p1_lines[0]: p1_lines[0] = 'Chapter 1: Brand Liberalism'
    else: p1_lines = p1_lines[1:]

p2_lines = [l.strip() for l in p2_text.splitlines() if l.strip()]

# Load Part 1 cut categories
spec = importlib.util.spec_from_file_location('builder', r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\build_excavations_file.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

# builder.cut_categories[0] is Category 1 (Enclosure) -> KEPT in draft
# builder.cut_categories[1] is Category 2 (Ernst/GIS) -> KEPT in draft
# builder.cut_categories[2:] are Categories 3-16 -> MOVED to removals
p1_removals_cats = builder.cut_categories[2:]
p1_removals_indices = set()
for t, n, idxs in p1_removals_cats:
    p1_removals_indices.update(idxs)

# Part 2 removals
p2_removals_cats = [
    (
        "17. Bio-Tech Superintelligence & Genetic Optimization (Stephen Hsu & CRISPR Broiler Chickens)",
        "Notes on Stephen Hsu (Michigan State), CRISPR genetic determinants of cognitive ability, 30x standard deviation broiler chickens, and maximal savant computational capabilities.",
        list(range(30, 36))
    ),
    (
        "18. Suburban Policy Case Studies: Surveillance Drones, SB 9 Housing & Thousand Oaks",
        "Contemporary local policy fieldwork from Thousand Oaks: $700k Skydio X10 police drone deployment on Freeway 101, Sabrina Carpenter smoothie post-materialism, McDonaldization/gentrification, $700 pods, and California SB 9 zoning disputes vs HOA local control.",
        list(range(99, 111))
    ),
    (
        "19. Social Fragmentation: The Decline of Entertaining (Derek Thompson / The Atlantic)",
        "Data and sociological reflections on Derek Thompson's 'great disinvitation' (Americans hosting dinner parties monthly falling from 42% in 1975 to 12% in 2026).",
        list(range(120, 123))
    )
]

p2_removals_indices = set(range(0, 12)) | set(range(30, 36)) | set(range(99, 111)) | set(range(120, 123))

# Assemble Removals document
removals_file = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\brand_liberalism_excavations_removals.md'
with open(removals_file, 'w', encoding='utf-8') as f:
    f.write('# Brand Liberalism: Excavations & Preserved Passages Repository\n')
    f.write('**Author:** Jose Marichal  \n')
    f.write('**Project:** Technofeudalism and Political Resistance / Machine Liberalism  \n')
    f.write('**Note:** Passages 1 (Historical Agrarian Commons & Enclosure Movement) and 2 (Media Archaeology, Microtemporality & Topological Space) have been retained in the main chapter per author instruction. All other excised passages across Parts 1 and 2 are preserved below verbatim with context notes for other writing projects.\n\n')
    f.write('---\n\n')
    
    total_rem_words = 0
    # Write Part 1 removals
    for title, note, idxs in p1_removals_cats:
        f.write(f'## {title}\n')
        f.write(f'> **Repurposing & Context Note:** {note}\n\n')
        f.write('```markdown\n')
        cat_words = 0
        for idx in idxs:
            if idx < len(p1_lines):
                para = p1_lines[idx]
                cat_words += len(para.split())
                f.write(para + '\n\n')
        
        # If this is the Public Admin category, append the Part 2 continuation (lines 0 to 11)!
        if 'Public Administration' in title:
            for p2_idx in range(0, 12):
                if p2_idx < len(p2_lines):
                    para = p2_lines[p2_idx]
                    cat_words += len(para.split())
                    f.write(para + '\n\n')
        
        f.write('```\n\n')
        f.write(f'*Section Word Count: {cat_words} words*\n\n---\n\n')
        total_rem_words += cat_words

    # Write Part 2 removals
    for title, note, idxs in p2_removals_cats:
        f.write(f'## {title}\n')
        f.write(f'> **Repurposing & Context Note:** {note}\n\n')
        f.write('```markdown\n')
        cat_words = 0
        for idx in idxs:
            if idx < len(p2_lines):
                para = p2_lines[idx]
                cat_words += len(para.split())
                f.write(para + '\n\n')
        f.write('```\n\n')
        f.write(f'*Section Word Count: {cat_words} words*\n\n---\n\n')
        total_rem_words += cat_words

    f.write(f'\n**Total Preserved Words in this Document:** {total_rem_words} words\n')

print(f'Generated complete removals document: {removals_file} with {total_rem_words} words.')

# Assemble complete draft
draft_file = r'c:\Users\jfmar\josemarichal\github.io\projects\technofeudalism_and_political_resistance\chapter_1_brand_liberalism_condensed.md'
headings_list = [
    'Chapter 1: Brand Liberalism',
    'Platforms and Political Identity',
    'The New AI Platforms',
    'The Need for Relevance',
    'We have Never Been a Public Sphere',
    'The Turn Towards Groupism',
    'Democratic unfreedom',
    'The Incentive Structure of Engagement Algorithms',
    'Brand over Voice',
    'Discursive Flattening',
    'Performative Villainy',
    'Fallability Entrepreneurs',
    'The Habits of Algorithmic Life',
    'Brand as Property',
    'Ontological Enclosure'
]

with open(draft_file, 'w', encoding='utf-8') as f:
    total_draft_words = 0
    # Write Part 1 kept lines
    for i, line in enumerate(p1_lines):
        if i in p1_removals_indices:
            continue
        clean_h = line.replace('## ', '').strip()
        if clean_h in headings_list:
            if clean_h == 'Chapter 1: Brand Liberalism':
                f.write('# ' + clean_h + '\n\n')
            else:
                f.write('\n## ' + clean_h + '\n\n')
        else:
            f.write(line + '\n\n')
            total_draft_words += len(line.split())

    # Write Part 2 kept lines
    for j, line in enumerate(p2_lines):
        if j in p2_removals_indices:
            continue
        clean_h = line.replace('## ', '').strip()
        if clean_h in headings_list:
            f.write('\n## ' + clean_h + '\n\n')
        else:
            f.write(line + '\n\n')
            total_draft_words += len(line.split())

print(f'Generated complete assembled draft: {draft_file} with {total_draft_words} words.')
