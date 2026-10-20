import json
from extract_corpus import extract_raw_pages, PDF_SOURCE, CHAPTER_MAP

page_recs = extract_raw_pages(PDF_SOURCE)
with open("firms_market_index.json", "r", encoding="utf-8") as f:
    firms = json.load(f)

for i, f in enumerate(firms):
    snippet = f["text"][:60].strip()
    found_page = None
    for rec in page_recs:
        full_p_text = " ".join(rec["lines"])
        if snippet[:30] in full_p_text:
            found_page = rec["pdf_page"]
            break
    
    # Determine chapter from page
    assigned_chapter = "Introduction: You Must Remain an Algorithmic Problem"
    if found_page:
        for p_start, c_name in reversed(CHAPTER_MAP):
            # p_start is 0-indexed page in PDF (e.g. 4 is page 5)
            if found_page >= (p_start + 1):
                assigned_chapter = c_name
                break
    f["pdf_page"] = found_page
    f["chapter"] = assigned_chapter
    print(f"FIRM-{i+1:02d}: {f['firm_name'][:30]:<30} | Page: {found_page} | {assigned_chapter}")

with open("firms_market_index.json", "w", encoding="utf-8") as f:
    json.dump(firms, f, indent=2, ensure_ascii=False)
print("Updated firms_market_index.json with true chapters and PDF pages!")
