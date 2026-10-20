import json
import re
from collections import Counter

with open("raw_55_passages.json", "r", encoding="utf-8") as f:
    passages = json.load(f)

stopwords = set(["the", "and", "to", "of", "a", "in", "is", "that", "for", "as", "are", "with", "be", "this", "on", "by", "it", "an", "not", "we", "or", "from", "at", "which", "our", "more", "can", "have", "has", "but", "their", "they", "its", "one", "all", "also", "would", "about", "who", "what", "into", "more", "than", "other", "if", "been", "these", "there"])

for idx, p in enumerate(passages):
    text = p["text"]
    words = re.findall(r'[A-Za-z]{4,}', text.lower())
    content_words = [w for w in words if w not in stopwords]
    top_words = [w for w, c in Counter(content_words).most_common(5)]
    
    first_sentence = text.split(".")[0].strip() if "." in text else text[:80]
    print(f"Firm #{idx+1:02d} ({p['chapter']}): words={p['word_count']}")
    print(f"   Opening: {first_sentence[:90]}")
    print(f"   Keywords: {', '.join(top_words)}")
