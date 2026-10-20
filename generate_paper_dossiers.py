#!/usr/bin/env python3
"""
Technology & Policy Paper Dossier Generator
Author: Jose Marichal / Technology and Society Working Group

Takes raw conference program text, panel outlines, or paper abstracts
and uses Local LLMs (Ollama, LM Studio) or Google Gemini to generate
structured pedagogical dossiers matching conference_papers_data.js.

Default behavior: Auto-detects local Ollama (http://localhost:11434) and uses
installed models like llama3, qwen2.5, or mistral with ZERO API keys required!
"""

import os
import sys
import json
import re
import urllib.request
import urllib.error
import argparse

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

DATA_FILE = os.path.join(os.path.dirname(__file__), "conference_papers_data.js")

SYSTEM_PROMPT = """You are a distinguished Professor of Political Science, Technology Governance, and Public Policy.
Your task is to take raw conference program text, panels, or paper abstracts and transform each paper into our pedagogical JSON schema.

Each paper must bridge to BOTH:
1. Global Politics (treaties, transnational supply chains, multilateral governance, post-colonial sovereignty)
2. California & State Politics (state legislation like SB 1047, AB 2273, CalRx, CEQA, CPRA, CPUC, local municipalities)

Return ONLY a valid JSON array of objects adhering to this schema:
[
  {
    "panelNumber": 100,
    "panelTitle": "Panel Title (or null)",
    "panelOrganizers": ["Organizer Name (Affiliation)"],
    "title": "Full Paper Title",
    "authors": [
      { "name": "Author Name", "affiliation": "Institution" }
    ],
    "track": "Global Politics",
    "secondaryTrack": "California & State Politics",
    "theme": "Theme Name (e.g. AI & Cloud Energy / Proptech & Housing)",
    "themeSlug": "infrastructure",
    "coreQuestion": "The core theoretical puzzle and research question being proposed.",
    "sociotechnicalConflict": "What corporate or state myth is challenged.",
    "studentHook": "Plain-language, engaging hook for undergraduate politics students.",
    "globalPoliticsRelevance": "Connection to international governance, treaties, and global political economy.",
    "californiaStateRelevance": "Direct connection to California state bills, regulatory agencies, or local cities.",
    "theoreticalConcepts": [
      { "term": "Concept Name", "definition": "Clear 1-sentence definition." }
    ],
    "recommendedReadings": [
      { "citation": "Author, Year. Title. Publisher." }
    ],
    "policyCases": [
      "Real-world legislation, agency order, or public controversy"
    ],
    "searchQueries": [
      "\"exact search query\" for Google Scholar or JSTOR"
    ],
    "expertProfile": {
      "idealRoles": ["Practitioner Title (e.g. Policy Director, Investigative Journalist)"],
      "suggestedOrganizations": ["Target Organizations (California & Global)"],
      "interviewProtocol": [
        { "step": "Phase 1: Empirical Grounding (5-8 min)", "question": "Question exploring baseline day-to-day reality." },
        { "step": "Phase 2: The Core Conflict (10-12 min)", "question": "Question probing the theoretical tension in the paper." },
        { "step": "Phase 3: Power & Inequality (10-12 min)", "question": "Question exploring who profits vs who bears externalized harms." },
        { "step": "Phase 4: California vs Global Bridge (8-10 min)", "question": "Question bridging the local/state reality to global governance." },
        { "step": "Phase 5: Democratic Solutions (5-8 min)", "question": "Question asking about viable regulatory reforms or grassroots alternatives." }
      ],
      "emailSubject": "Interview Request: Research on [Topic] and Policy Governance",
      "emailPitch": "Compelling 2-sentence explanation of why the student wants to interview this expert about the paper's core tension."
    }
  }
]
"""

def extract_json_array(text: str) -> list:
    """Safely extracts JSON array from model output, handling potential markdown wrappers."""
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()

    try:
        data = json.loads(text)
        return data if isinstance(data, list) else [data]
    except Exception:
        # Fallback: search for outermost [ ... ]
        match = re.search(r"(\[[\s\S]*\])", text)
        if match:
            try:
                data = json.loads(match.group(1))
                return data if isinstance(data, list) else [data]
            except Exception:
                pass
        raise ValueError(f"Could not parse valid JSON array from LLM response. Raw output:\n{text[:500]}...")

def get_ollama_models(endpoint="http://localhost:11434") -> list:
    """Fetch list of models available in local Ollama instance."""
    try:
        url = f"{endpoint.rstrip('/')}/api/tags"
        req = urllib.request.Request(url, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return [m["name"] for m in data.get("models", [])]
    except Exception:
        return []

def call_ollama(raw_text: str, endpoint="http://localhost:11434", model=None) -> list:
    """Calls local Ollama API at http://localhost:11434 with JSON format enforcement."""
    available_models = get_ollama_models(endpoint)
    if not model:
        if not available_models:
            raise ConnectionError(f"Could not connect to Ollama at {endpoint}. Ensure Ollama is running.")
        # Prefer llama3 or qwen or mistral, else first available
        for pref in ["llama3:latest", "llama3", "qwen2.5:7b", "qwen2.5", "mistral:latest", "mistral"]:
            if pref in available_models:
                model = pref
                break
        if not model:
            model = available_models[0]

    print(f"🦙 Calling local Ollama ({model}) at {endpoint}...")
    url = f"{endpoint.rstrip('/')}/api/chat"
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Analyze these conference papers and return ONLY a JSON array:\n\n{raw_text}"}
        ],
        "format": "json",
        "stream": False,
        "options": {
            "temperature": 0.2
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            content = result["message"]["content"]
            return extract_json_array(content)
    except urllib.error.URLError as e:
        raise ConnectionError(f"Failed to communicate with Ollama at {endpoint}: {e}")

def call_lmstudio(raw_text: str, endpoint="http://localhost:1234/v1", model="local-model") -> list:
    """Calls local LM Studio / OpenAI-compatible endpoint."""
    print(f"⚡ Calling local LM Studio at {endpoint}...")
    url = f"{endpoint.rstrip('/')}/chat/completions"
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Analyze these conference papers and return ONLY a JSON array:\n\n{raw_text}"}
        ],
        "temperature": 0.2
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req, timeout=240) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        content = result["choices"][0]["message"]["content"]
        return extract_json_array(content)

def call_gemini(raw_text: str, api_key: str, model: str = "gemini-2.5-flash") -> list:
    """Calls Google Gemini REST API."""
    print(f"✨ Calling Google Gemini ({model})...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{SYSTEM_PROMPT}\n\nRAW CONFERENCE TEXT TO ANALYZE:\n{raw_text}"}
                ]
            }
        ],
        "generationConfig": {
            "response_mime_type": "application/json",
            "temperature": 0.2
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req, timeout=90) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        return extract_json_array(text)

def load_existing_papers():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(r"window\.CONFERENCE_PAPERS\s*=\s*(\[[\s\S]*?\]);", content)
    if match:
        try:
            return json.loads(match.group(1))
        except Exception:
            return []
    return []

def save_papers_file(papers):
    content = f"""/**
 * Technology & Policy Research Papers Database
 * Consolidated Library ({len(papers)} Papers)
 * Curated for Political Science, Global Politics, and California / State Politics
 * Technology Issue Research & 45-Minute Field Expert Interview Assignment
 */

window.CONFERENCE_PAPERS = {json.dumps(papers, indent=2)};
"""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Saved {len(papers)} papers to {DATA_FILE}")

def detect_best_provider():
    """Auto-detects whether Ollama, LM Studio, or Gemini is available."""
    # Check Ollama
    ollama_models = get_ollama_models("http://localhost:11434")
    if ollama_models:
        return "ollama", ollama_models[0]
    
    # Check Gemini API Key
    if os.environ.get("GEMINI_API_KEY"):
        return "gemini", "gemini-2.5-flash"

    # Default to ollama
    return "ollama", "llama3:latest"

def main():
    parser = argparse.ArgumentParser(
        description="Generate Technology & Policy paper dossiers from raw conference text using Local LLMs (Ollama) or Gemini."
    )
    parser.add_argument("--input", "-i", help="Path to text file containing raw conference program or abstracts.")
    parser.add_argument("--text", "-t", help="Raw text string to process directly.")
    parser.add_argument("--provider", "-p", choices=["ollama", "lmstudio", "gemini", "auto"], default="auto",
                        help="LLM provider: 'ollama' (local, default), 'lmstudio' (local), 'gemini' (cloud), or 'auto'.")
    parser.add_argument("--endpoint", "-e", default=None, help="Custom endpoint for Ollama or LM Studio.")
    parser.add_argument("--model", "-m", default=None, help="Model name (e.g., 'llama3:latest', 'qwen2.5:7b', 'gemini-2.5-flash').")
    parser.add_argument("--key", "-k", help="Gemini API Key (if using Gemini).")
    parser.add_argument("--output-json", "-o", help="Optional path to output raw JSON without appending to conference_papers_data.js.")
    parser.add_argument("--copy-prompt", action="store_true", help="Print the optimized prompt for use in web chat.")
    parser.add_argument("--list-models", action="store_true", help="List available local Ollama models.")
    args = parser.parse_args()

    if args.list_models:
        models = get_ollama_models(args.endpoint or "http://localhost:11434")
        if models:
            print(f"Installed Ollama models ({len(models)}):")
            for m in models:
                print(f"  • {m}")
        else:
            print("No models detected or Ollama server is offline at http://localhost:11434")
        return

    if args.copy_prompt:
        print("=== COPY THIS PROMPT INTO GEMINI / CLAUDE / CHATGPT / LOCAL WEBUI ===")
        print(SYSTEM_PROMPT)
        print("\n[PASTE YOUR RAW CONFERENCE TEXT AT THE END]")
        return

    raw_text = ""
    if args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            raw_text = f.read()
    elif args.text:
        raw_text = args.text
    else:
        print("Usage examples:")
        print("  python generate_paper_dossiers.py --text 'Panel 10: Algorithmic Water Rights...'")
        print("  python generate_paper_dossiers.py --input new_papers.txt")
        print("  python generate_paper_dossiers.py --list-models")
        print("  python generate_paper_dossiers.py --copy-prompt")
        sys.exit(0)

    # Determine provider
    provider = args.provider
    model = args.model
    if provider == "auto":
        detected_p, detected_m = detect_best_provider()
        provider = detected_p
        if not model:
            model = detected_m

    print(f"⚙️ Selected Provider: {provider.upper()}")

    new_papers = []
    if provider == "ollama":
        endpoint = args.endpoint or "http://localhost:11434"
        new_papers = call_ollama(raw_text, endpoint=endpoint, model=model)
    elif provider == "lmstudio":
        endpoint = args.endpoint or "http://localhost:1234/v1"
        new_papers = call_lmstudio(raw_text, endpoint=endpoint, model=model or "local-model")
    elif provider == "gemini":
        key = args.key or os.environ.get("GEMINI_API_KEY")
        if not key:
            print("Error: Gemini API Key required when using --provider gemini.")
            sys.exit(1)
        new_papers = call_gemini(raw_text, key, model=model or "gemini-2.5-flash")

    print(f"🎉 Successfully generated {len(new_papers)} paper dossier(s)!")

    if args.output_json:
        with open(args.output_json, "w", encoding="utf-8") as f:
            json.dump(new_papers, f, indent=2)
        print(f"Saved JSON output to {args.output_json}")
    else:
        existing = load_existing_papers()
        max_id = max([p.get("id", 0) for p in existing] + [0])
        for p in new_papers:
            max_id += 1
            p["id"] = max_id
            existing.append(p)
        save_papers_file(existing)

if __name__ == "__main__":
    main()
