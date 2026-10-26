import os
import sys
import json
import re
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(BASE_DIR)
DRAFT_FILE = os.path.join(PROJECT_DIR, "chapter_1_brand_liberalism_condensed.md")
REMOVALS_FILE = os.path.join(PROJECT_DIR, "brand_liberalism_excavations_removals.md")
DECISIONS_FILE = os.path.join(BASE_DIR, "review_decisions.json")

PORT = 8585

# Curated candidate list with theoretical context and rationales
CURATED_CANDIDATES = [
    {
        "id": "cand_hawley",
        "title": "Natural Law Critiques, Josh Hawley & Leo Strauss",
        "section": "The Need for Relevance",
        "snippet": "Machine liberalism, with its emphasis on solidarity (fame and civic) is susceptible to fascile natural law critiques...",
        "rationale": "Digression into Senator Josh Hawley's 'crisis of men' book, Platonic masculinity, Kierkegaard, and Leo Strauss mythic national projects. Moving this keeps the section focused on Boltanski & Thévenot fame regimes and Pottle hermeneutic injustice."
    },
    {
        "id": "cand_fb_memoir",
        "title": "2012 Facebook Book Recollections & Intersectionality Ramble",
        "section": "Platforms and Political Identity",
        "snippet": "and this relates back to a book I did 15 years ago about Facebook where group formation was more about recognition...",
        "rationale": "Conversational stream-of-consciousness dictation recalling author's 2012 Facebook book, intersectionality making gender 'messy and complexified', and repeating linked fate points."
    },
    {
        "id": "cand_coach_bags",
        "title": "Forbes Gen Z Coach Bags & Fast-Casual Luxury Clipping",
        "section": "Platforms and Political Identity",
        "snippet": "the marketing never switches off; it lives on their For You pages, customized by data to spark new cravings daily...",
        "rationale": "Quotation from Forbes on Gen Z buying Coach bags, Chipotle, and Sweetgreen. Tangential consumer anecdote that can be archived."
    },
    {
        "id": "cand_chess_dynamo",
        "title": "Dynamo Kiev Soccer Grid & Rule-Based Novice Ceilings",
        "section": "The Habits of Algorithmic Life",
        "snippet": "Bent Flyvbjerg cites the 1980s Dynamo Kiev soccer team, whose players were taught computer-designed plays and warned against improvising...",
        "rationale": "Extended sports analogy on Soviet 'Total Football' with no heart and chess novices hitting a ceiling. Core phronesis argument remains intact without it."
    },
    {
        "id": "cand_dead_internet",
        "title": "Dead Internet Furies & Adam Smith Butter-Making",
        "section": "Brand as Property",
        "snippet": "AI adds another layer of abstraction so that it truly becomes a dead internet—a world in which it's impossible to know what's real or what's genuine...",
        "rationale": "Conversational reflection on mythological Furies, demon forces in your ear while scrolling, and Adam Smith butter-making."
    },
    {
        "id": "cand_sovereign_llms",
        "title": "National Language Sovereignty & Asian Scholar Productivity",
        "section": "Brand as Property",
        "snippet": "To me, the most interesting thing about this paper is the way it found that large language models make English more accessible to non-English speakers...",
        "rationale": "Empirical detour on Science paper tracking Asian-named authors' English writing gains and Estonia/Serbia sovereign LLM initiatives."
    },
    {
        "id": "cand_foma_amartya",
        "title": "Vonnegut Foma & Amartya Sen Truncated Notes",
        "section": "Ontological Enclosure",
        "snippet": "Ontological enclosure as 'foma'... We have to make sense of it lives somehow, but what happens when it doesn't confirm with reality...",
        "rationale": "Trailing rough stub notes at chapter conclusion referencing Cat's Cradle foma and Amartya Sen's Development as Freedom."
    },
    {
        "id": "cand_pottle_suburbs",
        "title": "Suburban White Habitus & News Media Theories in the Lack",
        "section": "The Need for Relevance",
        "snippet": "The structure of the American suburbs that excludes people from low income groups doesn't simply exclude their material access...",
        "rationale": "Secondary literature review on Bonilla-Silva's white habitus and suburbanites' theories of the 'other' in news coverage."
    },
    {
        "id": "cand_dopamine_shopping",
        "title": "South Korea Fake Dopamine Shopping & Gen Z Influencers",
        "section": "The Habits of Algorithmic Life",
        "snippet": "Poll taht said 57 percent of Gen Z want to be influencers. The compulsion to self-create through online consumption is so strong...",
        "rationale": "Trend clipping on South Korean dopamine websites where users simulate shopping rituals without buying."
    },
    {
        "id": "cand_christian_persistence",
        "title": "Ontario Ship Models & Christian (2026) 10-Minute AI Persistence Loss",
        "section": "The Habits of Algorithmic Life",
        "snippet": "I recently visited the Ontario Art Museum when it has an exhibit of shop building. I necountered a room ful of meticulously constructed model boats...",
        "rationale": "Personal museum visit anecdote combined with UC Berkeley news clipping on AI eroding persistence."
    }
]

def load_decisions():
    if os.path.exists(DECISIONS_FILE):
        try:
            with open(DECISIONS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_decisions(decisions):
    with open(DECISIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(decisions, f, indent=2)

def read_draft():
    if os.path.exists(DRAFT_FILE):
        with open(DRAFT_FILE, 'r', encoding='utf-8') as f:
            return f.read()
    return ""

def read_removals():
    if os.path.exists(REMOVALS_FILE):
        with open(REMOVALS_FILE, 'r', encoding='utf-8') as f:
            return f.read()
    return ""

def get_candidates():
    draft = read_draft()
    lines = [l.strip() for l in draft.splitlines() if l.strip()]
    decisions = load_decisions()
    
    candidates = []
    
    # 1. Match curated candidates
    for cand in CURATED_CANDIDATES:
        cand_id = cand["id"]
        # Find if snippet is in draft
        snippet = cand["snippet"][:40]
        found_idx = -1
        full_text = ""
        for i, l in enumerate(lines):
            if snippet.lower() in l.lower():
                found_idx = i
                full_text = l
                break
        
        status = decisions.get(cand_id, {}).get("status", "pending")
        if found_idx != -1:
            candidates.append({
                "id": cand_id,
                "title": cand["title"],
                "section": cand["section"],
                "rationale": cand["rationale"],
                "text": full_text,
                "words": len(full_text.split()),
                "status": status,
                "line_index": found_idx
            })
    
    # 2. Add other long standalone paragraphs (>110 words) that haven't been curated yet
    curated_snippets = [c["snippet"][:30].lower() for c in CURATED_CANDIDATES]
    current_sec = "Chapter 1: Brand Liberalism"
    for i, l in enumerate(lines):
        if l.startswith("#"):
            current_sec = l.replace("#", "").strip()
            continue
        words = len(l.split())
        if words >= 110:
            is_curated = any(cs in l.lower() for cs in curated_snippets)
            if not is_curated:
                cand_id = f"para_{i}"
                status = decisions.get(cand_id, {}).get("status", "pending")
                candidates.append({
                    "id": cand_id,
                    "title": f"Passage in {current_sec}",
                    "section": current_sec,
                    "rationale": "Long discursive passage eligible for review.",
                    "text": l,
                    "words": words,
                    "status": status,
                    "line_index": i
                })
                
    return candidates

class RequestHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        
        if path == "/" or path == "/index.html":
            html_path = os.path.join(BASE_DIR, "index.html")
            with open(html_path, "r", encoding="utf-8") as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
            return
            
        elif path == "/api/state":
            draft = read_draft()
            removals = read_removals()
            draft_words = len(draft.split())
            removals_words = len(removals.split())
            candidates = get_candidates()
            
            data = {
                "current_words": draft_words,
                "target_words": 15000,
                "removals_words": removals_words,
                "words_to_cut": max(0, draft_words - 15000),
                "candidates": candidates,
                "draft": draft,
                "removals": removals
            }
            self._send_json(data)
            return

        self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(length).decode('utf-8')
        payload = json.loads(body) if body else {}

        if path == "/api/cut":
            cand_id = payload.get("id")
            text_to_cut = payload.get("text", "").strip()
            title = payload.get("title", "Excised Passage")
            rationale = payload.get("rationale", "")
            
            if not text_to_cut:
                self._send_json({"error": "No text provided"}, 400)
                return

            draft = read_draft()
            removals = read_removals()

            if text_to_cut in draft:
                # Remove from draft
                new_draft = draft.replace(text_to_cut, "").replace("\n\n\n", "\n\n")
                with open(DRAFT_FILE, 'w', encoding='utf-8') as f:
                    f.write(new_draft)

                # Append to removals
                words = len(text_to_cut.split())
                new_category = f"\n\n## {title}\n> **Repurposing & Context Note:** {rationale}\n\n```markdown\n{text_to_cut}\n```\n\n*Section Word Count: {words} words*\n\n---\n"
                with open(REMOVALS_FILE, 'a', encoding='utf-8') as f:
                    f.write(new_category)

                # Record decision
                decisions = load_decisions()
                decisions[cand_id] = {"status": "cut", "words": words, "title": title}
                save_decisions(decisions)

                self._send_json({"success": True, "words_cut": words})
            else:
                self._send_json({"error": "Text snippet not found in current draft"}, 404)
            return

        elif path == "/api/keep":
            cand_id = payload.get("id")
            decisions = load_decisions()
            decisions[cand_id] = {"status": "kept"}
            save_decisions(decisions)
            self._send_json({"success": True})
            return

        elif path == "/api/reset_decisions":
            save_decisions({})
            self._send_json({"success": True})
            return

        self.send_error(404, "Not Found")

def run_server():
    server_address = ('127.0.0.1', PORT)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"Manuscript Review Server running at http://127.0.0.1:{PORT}")
    webbrowser.open(f"http://127.0.0.1:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
