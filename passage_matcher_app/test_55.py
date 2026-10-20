import os
import json
import re
from extract_corpus import extract_raw_pages, PDF_SOURCE, CHAPTER_MAP

page_records = extract_raw_pages(PDF_SOURCE)
all_paragraphs = []
cur_p = []
cur_chap = page_records[0]["chapter"]

for rec in page_records:
    rec_chap = rec["chapter"]
    for line in rec["lines"]:
        if any(line == name or (line.startswith("Chapter ") and "Chapter " in rec_chap) for _, name in CHAPTER_MAP):
            if cur_p:
                all_paragraphs.append({"chapter": cur_chap, "text": " ".join(cur_p).strip()})
                cur_p = []
            cur_chap = rec_chap
            cur_p.append(line)
            continue
        cur_p.append(line)
        is_end = bool(re.search(r'[\.!?:\u201d\u2019\"]$', line))
        if is_end and len(line) < 68:
            all_paragraphs.append({"chapter": cur_chap, "text": " ".join(cur_p).strip()})
            cur_p = []

if cur_p:
    all_paragraphs.append({"chapter": cur_chap, "text": " ".join(cur_p).strip()})

total_words = sum(len(p["text"].split()) for p in all_paragraphs if p["text"])
print(f"Total paragraphs: {len(all_paragraphs)}")
print(f"Total words: {total_words}")
target_words = total_words / 55
print(f"Target words per passage for 55 firms: {target_words:.1f}")

# Segment into exactly 55 passages
passages = []
target_w = total_words // 55
accum_p = []
accum_w = 0
chap = all_paragraphs[0]["chapter"]

for idx, p in enumerate(all_paragraphs):
    p_text = p["text"]
    w = len(p_text.split())
    if not p_text:
        continue
    if not accum_p:
        chap = p["chapter"]
    accum_p.append(p_text)
    accum_w += w
    
    # Check if we should cut
    passages_remaining = 55 - len(passages)
    words_remaining = sum(len(p2["text"].split()) for p2 in all_paragraphs[idx+1:])
    
    if passages_remaining > 1:
        needed_avg = words_remaining / (passages_remaining - 1)
        if accum_w >= target_w or (accum_w >= 850 and accum_w + 100 > needed_avg):
            passages.append({
                "id": f"firm_{len(passages)+1:02d}",
                "chapter": chap,
                "word_count": accum_w,
                "text": "\n\n".join(accum_p)
            })
            accum_p = []
            accum_w = 0
    else:
        # Last passage gathers the rest
        pass

if accum_p:
    passages.append({
        "id": f"firm_{len(passages)+1:02d}",
        "chapter": chap,
        "word_count": accum_w,
        "text": "\n\n".join(accum_p)
    })

print(f"Successfully segmented into {len(passages)} passages!")
word_counts = [p["word_count"] for p in passages]
print(f"Min words: {min(word_counts)}, Max words: {max(word_counts)}, Avg: {sum(word_counts)/len(word_counts):.1f}")
