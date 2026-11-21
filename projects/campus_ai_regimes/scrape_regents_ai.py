"""Crawl 50 state flagship public university Board of Trustees / Regents minutes & agendas
and extract AI-related context snippets (2023-2026) into CSV and JSONL.
"""

import argparse
import concurrent.futures
import csv
import io
import json
import pathlib
import re
import urllib.parse
import requests
from bs4 import BeautifulSoup
from pypdf import PdfReader

BASE_DIR = pathlib.Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
BOARDS_CSV = BASE_DIR / "flagship_boards_50.csv"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

AI_TERMS_RE = re.compile(
    r"\b("
    r"artificial intelligence|"
    r"generative ai|"
    r"gen\s*ai|"
    r"chatgpt|"
    r"openai|"
    r"microsoft copilot|"
    r"google gemini|"
    r"anthropic|"
    r"large language model[s]?|"
    r"llms?|"
    r"turnitin|"
    r"ai detection|"
    r"ai detector[s]?|"
    r"ai task force|"
    r"chief ai|"
    r"machine learning"
    r")\b",
    re.I,
)

YEAR_RE = re.compile(r"\b(2023|2024|2025|2026)\b")
DOC_HINT_RE = re.compile(r"(minute|agenda|packet|book|docket|meeting|resolution|2023|2024|2025|2026)", re.I)


def extract_pdf_text(content: bytes, max_pages: int = 80) -> str:
    try:
        reader = PdfReader(io.BytesIO(content))
        pages = []
        for page in reader.pages[:max_pages]:
            txt = page.extract_text() or ""
            if txt:
                pages.append(txt)
        return "\n".join(pages)
    except Exception:
        return ""


def extract_snippets(text: str, state: str, university: str, board_name: str, doc_url: str, doc_title: str) -> list[dict]:
    clean = re.sub(r"\s+", " ", text).strip()
    if not clean:
        return []
    snippets = []
    last_end = -1
    for m in AI_TERMS_RE.finditer(clean):
        if m.start() < last_end:
            continue
        start = max(0, m.start() - 400)
        end = min(len(clean), m.end() + 450)
        last_end = end
        ctx = clean[start:end].strip()
        years = sorted(set(YEAR_RE.findall(doc_title + " " + doc_url + " " + ctx)))
        snippets.append({
            "state": state,
            "university": university,
            "board_name": board_name,
            "matched_term": m.group(0),
            "year_hint": years[-1] if years else "",
            "doc_title": doc_title[:160],
            "doc_url": doc_url,
            "snippet": ctx,
        })
        if len(snippets) >= 12:
            break
    return snippets


def fetch_doc_and_extract(session: requests.Session, url: str, title: str, row: dict) -> list[dict]:
    try:
        r = session.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
        if r.status_code != 200:
            return []
        ctype = (r.headers.get("Content-Type") or "").lower()
        if "pdf" in ctype or url.lower().endswith(".pdf"):
            text = extract_pdf_text(r.content)
        elif "html" in ctype or "text" in ctype:
            soup = BeautifulSoup(r.text, "html.parser")
            for tag in soup(["script", "style", "nav", "header", "footer"]):
                tag.decompose()
            text = soup.get_text(" ", strip=True)
        else:
            return []
        return extract_snippets(text, row["state"], row["university"], row["board_name"], url, title)
    except Exception:
        return []


def safe_get(session: requests.Session, url: str, timeout: int = 18) -> requests.Response | None:
    """Fetch a URL with browser headers and an SSL-verify fallback on cert errors."""
    try:
        return session.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
    except requests.exceptions.SSLError:
        try:
            return session.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True, verify=False)
        except Exception:
            return None
    except Exception:
        return None


def resolve_board_index(session: requests.Session, minutes_url: str) -> tuple[requests.Response | None, str]:
    """Try `minutes_url`, then fall back to parent paths and root-domain navigation discovery."""
    resp = safe_get(session, minutes_url, timeout=18)
    if resp is not None and resp.status_code == 200:
        return resp, "direct"

    parsed = urllib.parse.urlparse(minutes_url)
    base_root = f"{parsed.scheme}://{parsed.netloc}/"
    parts = [p for p in parsed.path.split("/") if p]
    candidates = []
    # Walk up parent paths (e.g. /regents/meetings -> /regents/ -> /)
    for i in range(len(parts) - 1, -1, -1):
        candidates.append(f"{parsed.scheme}://{parsed.netloc}/" + "/".join(parts[:i]) + ("/" if i > 0 else ""))
    if base_root not in candidates:
        candidates.append(base_root)

    for cand in candidates:
        r = safe_get(session, cand, timeout=15)
        if r is None or r.status_code != 200:
            continue
        soup = BeautifulSoup(r.text, "html.parser")
        best_url = None
        best_score = -1
        for a in soup.find_all("a", href=True):
            href = urllib.parse.urljoin(r.url, a["href"])
            if href.startswith(("mailto:", "javascript:", "#")):
                continue
            lbl = a.get_text(" ", strip=True).lower()
            hl = href.lower()
            score = 0
            if "minute" in lbl or "minute" in hl:
                score += 4
            if "agenda" in lbl or "agenda" in hl:
                score += 3
            if "meeting" in lbl or "meeting" in hl:
                score += 2
            if any(k in lbl or k in hl for k in ("docket", "material", "archive", "2026", "2025", "2024")):
                score += 1
            if score > best_score:
                best_score = score
                best_url = href
        if best_url and best_score >= 2:
            sub_r = safe_get(session, best_url, timeout=15)
            if sub_r is not None and sub_r.status_code == 200:
                return sub_r, f"root_fallback:{best_url}"
        return r, f"parent_fallback:{cand}"

    return resp, "failed"


def process_board(row: dict, max_docs_per_board: int = 25) -> tuple[dict, list[dict]]:
    state = row["state"]
    univ = row["university"]
    root_url = row["minutes_url"]
    session = requests.Session()
    status_row = {
        "state": state,
        "university": univ,
        "minutes_url": root_url,
        "http_status": "",
        "docs_scanned": 0,
        "ai_snippets_found": 0,
        "note": "",
    }

    resp, resolution_note = resolve_board_index(session, root_url)
    if resp is None:
        status_row["http_status"] = "ERR"
        status_row["note"] = "Connection/SSL error on direct & root fallback"
        return status_row, []
    status_row["http_status"] = str(resp.status_code)
    status_row["minutes_url"] = resp.url
    if resp.status_code != 200:
        status_row["note"] = f"HTTP {resp.status_code}"
        return status_row, []
    if resolution_note != "direct":
        status_row["note"] = resolution_note

    soup = BeautifulSoup(resp.text, "html.parser")
    root_domain = urllib.parse.urlparse(resp.url).netloc

    # Collect candidate links (PDFs or subpages mentioning minutes/agendas/2023-2026)
    doc_links: list[tuple[str, str]] = []
    subpages: list[tuple[str, str]] = []
    seen = set()

    for a in soup.find_all("a", href=True):
        href = urllib.parse.urljoin(resp.url, a["href"])
        if href in seen or href.startswith(("mailto:", "javascript:", "#")):
            continue
        seen.add(href)
        label = a.get_text(" ", strip=True)
        combo = f"{label} {href}"
        if not DOC_HINT_RE.search(combo):
            continue
        if href.lower().endswith(".pdf"):
            # Prioritize 2023-2026 PDFs if year appears
            if YEAR_RE.search(combo) or "minute" in combo.lower() or "agenda" in combo.lower():
                doc_links.append((href, label or "PDF"))
        elif urllib.parse.urlparse(href).netloc == root_domain:
            if any(k in combo.lower() for k in ("minute", "agenda", "2023", "2024", "2025", "2026", "meeting")):
                subpages.append((href, label or "Page"))

    # Crawl up to 12 year/meeting subpages to discover nested PDFs
    for sp_url, sp_label in subpages[:12]:
        if len(doc_links) >= max_docs_per_board:
            break
        try:
            sp_resp = session.get(sp_url, headers=HEADERS, timeout=12)
            if sp_resp.status_code != 200:
                continue
            sp_soup = BeautifulSoup(sp_resp.text, "html.parser")
            for a in sp_soup.find_all("a", href=True):
                href = urllib.parse.urljoin(sp_resp.url, a["href"])
                if href in seen:
                    continue
                seen.add(href)
                lbl = a.get_text(" ", strip=True)
                combo = f"{lbl} {href}"
                if href.lower().endswith(".pdf") and DOC_HINT_RE.search(combo):
                    doc_links.append((href, lbl or sp_label))
        except Exception:
            continue

    # Also scan the root page text itself + top subpages as HTML documents
    all_targets = [(resp.url, "Main Minutes Index")] + doc_links[:max_docs_per_board] + subpages[:5]
    all_snippets: list[dict] = []
    scanned = 0
    for target_url, target_title in all_targets:
        scanned += 1
        snips = fetch_doc_and_extract(session, target_url, target_title, row)
        all_snippets.extend(snips)

    status_row["docs_scanned"] = scanned
    status_row["ai_snippets_found"] = len(all_snippets)
    if scanned <= 1 and not doc_links and not subpages:
        status_row["note"] = "Likely JS-rendered portal (BoardDocs/Diligent) or no static links"
    return status_row, all_snippets


def main() -> None:
    parser = argparse.ArgumentParser(description="Collect AI references from 50 flagship public university Board minutes.")
    parser.add_argument("--workers", type=int, default=10, help="Concurrent university workers.")
    parser.add_argument("--max-docs", type=int, default=20, help="Max documents/PDFs scanned per board.")
    args = parser.parse_args()

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with BOARDS_CSV.open("r", encoding="utf-8") as f:
        boards = list(csv.DictReader(f))

    statuses = []
    snippets = []
    print(f"Scanning {len(boards)} flagship university Board of Trustees/Regents portals...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {pool.submit(process_board, b, args.max_docs): b for b in boards}
        for fut in concurrent.futures.as_completed(futures):
            st, snips = fut.result()
            statuses.append(st)
            snippets.extend(snips)
            print(f"  [{st['state']}] {st['university']}: status={st['http_status']} docs={st['docs_scanned']} ai_hits={st['ai_snippets_found']}")

    statuses.sort(key=lambda x: x["state"])
    cov_csv = DATA_DIR / "board_coverage_report.csv"
    with cov_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["state", "university", "minutes_url", "http_status", "docs_scanned", "ai_snippets_found", "note"])
        w.writeheader()
        w.writerows(statuses)

    snip_csv = DATA_DIR / "regents_ai_snippets.csv"
    with snip_csv.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["state", "university", "board_name", "matched_term", "year_hint", "doc_title", "doc_url", "snippet"])
        w.writeheader()
        w.writerows(snippets)

    snip_jsonl = DATA_DIR / "regents_ai_snippets.jsonl"
    with snip_jsonl.open("w", encoding="utf-8") as f:
        for s in snippets:
            f.write(json.dumps(s, ensure_ascii=False) + "\n")

    print(f"Done! Scanned {len(statuses)} boards, extracted {len(snippets)} AI snippets -> {snip_csv}")


if __name__ == "__main__":
    main()

