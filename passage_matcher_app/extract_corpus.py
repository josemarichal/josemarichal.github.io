import os
import re
import json
import PyPDF2

PDF_SOURCE = r"C:\Users\jfmar\.gemini\antigravity-ide\brain\df54a196-83aa-4149-971f-39aafe0bce33\.user_uploaded\media_1789450608401.pdf"
APP_DIR = os.path.dirname(os.path.abspath(__file__))
CORPUS_FILE = os.path.join(APP_DIR, "book_corpus.txt")
BACKUP_FILE = os.path.join(APP_DIR, "book_corpus_original_backup.txt")
INDEX_FILE = os.path.join(APP_DIR, "passages_index.json")

HEADER_KEYWORDS = [
    "YOU MUST BECOME AN ALGORITHMIC PROBLEM",
    "HOW MUCH OF A PROBLEM ARE WE?",
    "THE POLITICS OF OPTIMIZATION",
    "THE PROBLEM FOR DEMOCRACY",
    "THE ALGORITHMIC CONTRACT AND ITS DISCONTENTS",
    "THE CLASSIFICATION ECONOMY",
    "OPTIMIZING IDENTITY",
    "ALGORITHMIC OBLIGATION",
    "REFERENCES",
    "INDEX"
]

CHAPTER_MAP = [
    (4, "Introduction: You Must Remain an Algorithmic Problem"),
    (14, "Chapter 1: How Much of a Problem Are We?"),
    (27, "Chapter 2: The Politics of Optimization"),
    (37, "Chapter 3: The Problem for Democracy"),
    (46, "Chapter 4: The Algorithmic Contract and Its Discontents"),
    (69, "Chapter 5: The Classification Economy"),
    (88, "Chapter 6: Optimizing Identity"),
    (108, "Chapter 7: Algorithmic Obligation")
]

def extract_raw_pages(pdf_path):
    reader = PyPDF2.PdfReader(pdf_path)
    page_records = []
    # Pages 4 to 125 (0-indexed) correspond to page 5 to 126 in the PDF
    for idx in range(4, 126):
        txt = reader.pages[idx].extract_text() or ""
        lines = txt.split("\n")
        cleaned_lines = []
        for line in lines:
            s = line.strip()
            if not s:
                continue
            # Filter isolated line numbers (1..45) or 'page ...'
            if re.match(r"^\d+$", s) and int(s) <= 45:
                continue
            if re.match(r"^page\s+([ivx\d]+|\d+)$", s, re.IGNORECASE):
                continue
            # Filter running headers
            un_num = re.sub(r"^\d+", "", s).strip()
            if un_num.upper() in HEADER_KEYWORDS or (len(un_num) > 3 and un_num.upper() == "INTRODUCTION"):
                continue
            # Clean fused line numbers on title lines
            if s.startswith("1Introduction:"):
                s = s[1:]
            elif re.match(r"^\d{1,2}(?=[A-Za-z])", s):
                # Only strip if it's a known chapter header prefix
                prefix_test = re.sub(r"^\d{1,2}", "", s).strip()
                if any(h in prefix_test.upper() for h in ["INTRODUCTION", "CHAPTER", "HOW MUCH", "THE POLITICS", "THE PROBLEM", "THE ALGORITHMIC", "THE CLASSIFICATION", "OPTIMIZING", "ALGORITHMIC OBLIGATION"]):
                    s = prefix_test
            cleaned_lines.append(s)
        
        # Figure out chapter name
        chap_name = "Unknown Chapter"
        for page_start, name in reversed(CHAPTER_MAP):
            if idx >= page_start:
                chap_name = name
                break
                
        page_records.append({
            "pdf_page": idx + 1,
            "chapter": chap_name,
            "lines": cleaned_lines
        })
    return page_records

def build_corpus_and_passages(page_records, target_words=1000):
    # Assemble paragraphs
    all_paragraphs = []
    cur_p = []
    cur_chap = page_records[0]["chapter"]
    
    for rec in page_records:
        rec_chap = rec["chapter"]
        for line in rec["lines"]:
            # If a chapter header line is encountered
            if any(line == name or (line.startswith("Chapter ") and "Chapter " in rec_chap) for _, name in CHAPTER_MAP):
                if cur_p:
                    all_paragraphs.append({
                        "chapter": cur_chap,
                        "text": " ".join(cur_p).strip()
                    })
                    cur_p = []
                cur_chap = rec_chap
                cur_p.append(line)
                continue
                
            cur_p.append(line)
            # Heuristic for end of paragraph: line ends with punctuation and is somewhat short or next line starts indented/capital
            is_end = bool(re.search(r'[\.!?:\u201d\u2019\"]$', line))
            if is_end and len(line) < 68:
                all_paragraphs.append({
                    "chapter": cur_chap,
                    "text": " ".join(cur_p).strip()
                })
                cur_p = []
                
    if cur_p:
        all_paragraphs.append({
            "chapter": cur_chap,
            "text": " ".join(cur_p).strip()
        })
        
    # Build continuous text with double newlines
    full_corpus_text = "\n\n".join(p["text"] for p in all_paragraphs if p["text"])
    
    # Now segment into ~1000 word passages
    # We segment at paragraph boundaries as much as possible; if a paragraph is too long or we need sentences, split by sentences
    passages = []
    passage_id = 1
    
    accumulated_paragraphs = []
    accumulated_words = 0
    passage_chap = all_paragraphs[0]["chapter"] if all_paragraphs else ""
    
    for p in all_paragraphs:
        p_text = p["text"]
        p_words = len(p_text.split())
        if not p_text:
            continue
            
        if not accumulated_paragraphs:
            passage_chap = p["chapter"]
            
        accumulated_paragraphs.append(p_text)
        accumulated_words += p_words
        
        # When we reach ~1000 words (between 950 and 1100)
        if accumulated_words >= 1000:
            passage_text = "\n\n".join(accumulated_paragraphs)
            passages.append({
                "id": f"passage_{passage_id:03d}",
                "chapter": passage_chap,
                "word_count": len(passage_text.split()),
                "text": passage_text
            })
            passage_id += 1
            accumulated_paragraphs = []
            accumulated_words = 0
            
    # Handle remaining paragraphs
    if accumulated_paragraphs:
        passage_text = "\n\n".join(accumulated_paragraphs)
        if passages and accumulated_words < 450:
            # Merge with previous passage if small
            passages[-1]["text"] += "\n\n" + passage_text
            passages[-1]["word_count"] = len(passages[-1]["text"].split())
        else:
            passages.append({
                "id": f"passage_{passage_id:03d}",
                "chapter": passage_chap,
                "word_count": len(passage_text.split()),
                "text": passage_text
            })
            
    return full_corpus_text, passages

def run_extraction():
    print(f"Reading PDF from {PDF_SOURCE}...")
    page_records = extract_raw_pages(PDF_SOURCE)
    corpus_text, passages = build_corpus_and_passages(page_records, target_words=1000)
    
    # Save active corpus
    with open(CORPUS_FILE, "w", encoding="utf-8") as f:
        f.write(corpus_text)
    print(f"Saved active corpus to {CORPUS_FILE} ({len(corpus_text.split())} words)")
    
    # Save original backup
    if not os.path.exists(BACKUP_FILE):
        with open(BACKUP_FILE, "w", encoding="utf-8") as f:
            f.write(corpus_text)
        print(f"Saved original backup to {BACKUP_FILE}")
        
    # Save passages index
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(passages, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(passages)} passages to {INDEX_FILE}")
    
    # Print summary statistics
    words_list = [p["word_count"] for p in passages]
    print(f"Passage statistics: Count={len(passages)}, Min={min(words_list)}, Max={max(words_list)}, Avg={sum(words_list)/len(words_list):.1f}")
    return len(passages)

if __name__ == "__main__":
    run_extraction()
