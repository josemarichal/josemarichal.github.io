"""
02_prepare_corpus.py
Parses downloaded GovInfo CHRG summaries and HTML transcripts, enriches speakers
with Member metadata (party, state, bioguide_id) via committee rosters +
unitedstates/congress-legislators, and Witness metadata (affiliation, sector)
via transcript CONTENTS blocks.

Outputs:
  1. data/hearings_metadata.csv
  2. data/ai_segments_all_published.csv
  3. data/ai_segments_held_3yr.csv
  4. data/preliminary_coding_sample.csv (200 stratified segments)
"""

import os
import re
import json
import html
from collections import defaultdict
import pandas as pd

BASE_DIR = r"c:\Users\jfmar\anaconda3\envs\topic_modeling\congressional_ai_rhetoric"
RAW_DIR = os.path.join(BASE_DIR, "raw")
SUM_DIR = os.path.join(RAW_DIR, "summaries")
HTM_DIR = os.path.join(RAW_DIR, "htm")
LEG_DIR = os.path.join(RAW_DIR, "legislators")
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

HELD_START = "2023-11-15"
HELD_END = "2026-11-15"

AI_CASE_SENSITIVE = [
    ("AI", re.compile(r"\bAI\b")),
    ("A.I.", re.compile(r"\bA\.I\.\b")),
]
AI_CASE_INSENSITIVE = [
    ("artificial intelligence", re.compile(r"\bartificial intelligence\b", re.IGNORECASE)),
    ("generative AI", re.compile(r"\bgenerative\s+ai\b", re.IGNORECASE)),
    ("large language model", re.compile(r"\blarge language models?\b", re.IGNORECASE)),
    ("LLM", re.compile(r"\bllms?\b", re.IGNORECASE)),
    ("foundation model", re.compile(r"\bfoundation models?\b", re.IGNORECASE)),
    ("machine learning", re.compile(r"\bmachine learning\b", re.IGNORECASE)),
    ("deepfake", re.compile(r"\bdeepfakes?\b", re.IGNORECASE)),
    ("algorithmic", re.compile(r"\balgorithmic\b", re.IGNORECASE)),
]

HONORIFICS = (
    r"Senator|Representative|Chairman|Chairwoman|Chair|Vice Chairman|"
    r"Mr\.|Ms\.|Mrs\.|Dr\.|Prof\.|Professor|General|Gen\.|Lieutenant General|Lt\. Gen\.|"
    r"Brigadier General|Brig\. Gen\.|Major General|Maj\. Gen\.|Admiral|Adm\.|"
    r"Vice Admiral|Rear Admiral|Colonel|Col\.|Captain|Capt\.|Commander|Cmdr\.|"
    r"Secretary|Under Secretary|Assistant Secretary|Deputy Secretary|"
    r"Director|Deputy Director|Administrator|Commissioner|Ambassador|Judge|Justice|Hon\."
)

SPEAKER_RE = re.compile(
    r"^\s{0,10}("
    r"The\s+(?:ACTING\s+)?(?:CHAIRMAN|CHAIRWOMAN|CHAIR|VICE CHAIRMAN|PRESIDING OFFICER)"
    rf"|(?:{HONORIFICS})\s+[A-Z][A-Za-z\'\-]+(?:\s+(?:of\s+[A-Z][A-Za-z\s]+|[A-Z][A-Za-z\'\-]+)){{0,2}}"
    r")(?:\s*\[[^\]]+\])?\.\s+(.*)$"
)

STATEMENT_HEADER_RE = re.compile(
    r"^\s*(?:OPENING\s+|PREPARED\s+)?STATEMENT\s+OF\s+(.+?)(?:,|\s*$)",
    re.IGNORECASE,
)

PREPARED_START_RE = re.compile(
    r"\[(?:The\s+)?(?:prepared\s+statement|statement)\s+of\s+(.+?)\s+follows:\]",
    re.IGNORECASE,
)

STATE_NAMES = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR", "california": "CA",
    "colorado": "CO", "connecticut": "CT", "delaware": "DE", "florida": "FL", "georgia": "GA",
    "hawaii": "HI", "idaho": "ID", "illinois": "IL", "indiana": "IN", "iowa": "IA",
    "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD",
    "massachusetts": "MA", "michigan": "MI", "minnesota": "MN", "mississippi": "MS", "missouri": "MO",
    "montana": "MT", "nebraska": "NE", "nevada": "NV", "new hampshire": "NH", "new jersey": "NJ",
    "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", "ohio": "OH",
    "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC",
    "south dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT", "vermont": "VT",
    "virginia": "VA", "washington": "WA", "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY",
    "district of columbia": "DC", "puerto rico": "PR", "guam": "GU", "virgin islands": "VI",
    "american samoa": "AS", "northern mariana islands": "MP",
}


def load_legislators():
    """Load 118th & 119th Congress legislators indexed by (chamber, last_name_lower)."""
    idx = defaultdict(list)
    for fn in ["legislators-current.json", "legislators-historical.json"]:
        path = os.path.join(LEG_DIR, fn)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for leg in data:
            bioguide = leg.get("id", {}).get("bioguide", "")
            name = leg.get("name", {})
            last = name.get("last", "").strip()
            first = name.get("first", "").strip()
            full = name.get("official_full") or f"{first} {last}".strip()
            if not last:
                continue
            for term in leg.get("terms", []):
                start = term.get("start", "")
                end = term.get("end", "")
                if end >= "2023-01-01" and start <= "2026-12-31":
                    t_type = term.get("type", "")
                    ch = "SENATE" if t_type == "sen" else ("HOUSE" if t_type == "rep" else "")
                    rec = {
                        "bioguide_id": bioguide,
                        "full_name": full,
                        "last_lower": last.lower(),
                        "chamber": ch,
                        "party": term.get("party", ""),
                        "state": term.get("state", ""),
                        "start": start,
                        "end": end,
                    }
                    idx[(ch, last.lower())].append(rec)
    return idx


def extract_pre_text(htm_str):
    m = re.search(r"<pre>(.*)</pre>", htm_str, re.DOTALL | re.IGNORECASE)
    raw = m.group(1) if m else htm_str
    raw = re.sub(r"<[^>]+>", "", raw)
    return html.unescape(raw)


def extract_committee(pre_text):
    header = pre_text[:3500]
    m = re.search(r"(COMMITTEE ON [A-Z0-9\s,&\-]+)", header)
    if m:
        return re.sub(r"\s+", " ", m.group(1)).strip()
    return ""


def parse_committee_roster(pre_text):
    """Extract (last_name_lower -> state_code) from the transcript's committee roster."""
    roster = {}
    header = pre_text[:8000]
    state_pat = "|".join(re.escape(s) for s in sorted(STATE_NAMES.keys(), key=len, reverse=True))
    pat = re.compile(rf"([A-Z][A-Z\.\'\-\s]{{2,35}}),\s+({state_pat})\b", re.IGNORECASE)
    for m in pat.finditer(header):
        name_part = re.sub(r"\s+", " ", m.group(1)).strip()
        st = STATE_NAMES.get(m.group(2).lower(), "")
        # Take last word (excluding Jr., II, III, Chairman, etc.)
        tokens = [t.strip(".,") for t in name_part.split() if t.strip(".,").lower() not in {"jr", "sr", "ii", "iii", "iv", "chairman", "chairwoman", "ranking", "member"}]
        if tokens:
            roster[tokens[-1].lower()] = st
    return roster


def classify_witness_sector(affil):
    a = affil.lower()
    if not a:
        return "Other / Unspecified"
    if any(k in a for k in [
        "department of", "u.s.", "united states", "federal", "agency", "commission", "bureau",
        "secretary", "administrator", "director,", "command", "army", "navy", "air force",
        "marine", "pentagon", "white house", "office of", "national security", "cyber command",
        "nist", "ftc", "sec ", "fda", "doj", "dhs", "fbi", "cia", "nsa", "gao", "governor",
        "attorney general", "mayor", "state of ", "city of "
    ]):
        return "Government / Military"
    if any(k in a for k in [
        "university", "college", "professor", "school of", "institute", "center for",
        "foundation", "fellow", "researcher", "academy", "union", "afl-cio", "coalition",
        "advocacy", "civil", "aclu", "eff", "epic", "public interest", "nonprofit", "assoc",
        "association", "society", "council", "brookings", "rand", "carnegie", "cset"
    ]):
        return "Academia / Civil Society"
    if any(k in a for k in [
        "inc", "corp", "llc", "ltd", "ceo", "chief ", "president,", "founder", "vp",
        "vice president", "google", "microsoft", "meta", "openai", "anthropic", "amazon",
        "ibm", "nvidia", "oracle", "apple", "palantir", "salesforce", "scale ai", "company",
        "technologies", "labs", "bank", "capital", "partners", "ventures", "industries"
    ]):
        return "Industry / Private Sector"
    return "Other / Unspecified"


def parse_contents_witnesses(pre_text):
    """Extract witness last_name_lower -> (full_entry, sector) from CONTENTS block."""
    witnesses = {}
    m = re.search(r"C\s+O\s+N\s+T\s+E\s+N\s+T\s+S(.*?)(?:\n\s*\([ivx]+\)|\n\s*={5,}|\n\s*-{10,})", pre_text[:15000], re.DOTALL | re.IGNORECASE)
    if not m:
        return witnesses
    block = m.group(1)
    # Match entries like "Sutton, Hon. Katherine, Assistant Secretary..." or "Statement of Dr. Jane Doe, CEO..."
    lines = block.splitlines()
    entries = []
    cur = []
    for ln in lines:
        s = ln.strip()
        if not s:
            if cur:
                entries.append(" ".join(cur))
                cur = []
        else:
            cur.append(s)
    if cur:
        entries.append(" ".join(cur))

    for ent in entries:
        ent_clean = re.sub(r"\.{3,}\s*\d+\s*$", "", ent).strip()
        if any(skip in ent_clean.lower() for skip in ["contents", "witness statements", "members statements", "questions for the record", "opening statement of senator", "statement of senator", "statement of representative"]):
            continue
        # Case 1: "Last, First, Affiliation"
        m1 = re.match(r"^([A-Z][A-Za-z\'\-]+),\s+([^,]+),\s+(.+)$", ent_clean)
        if m1:
            last = m1.group(1).strip().lower()
            affil = m1.group(3).strip()
            witnesses[last] = (ent_clean, classify_witness_sector(affil))
            continue
        # Case 2: "Statement of Title First Last, Affiliation"
        m2 = re.match(r"^(?:Prepared\s+)?Statement\s+of\s+(.+?),\s+(.+)$", ent_clean, re.IGNORECASE)
        if m2:
            name_toks = m2.group(1).strip().split()
            if name_toks:
                last = name_toks[-1].strip(".,").lower()
                affil = m2.group(2).strip()
                witnesses[last] = (ent_clean, classify_witness_sector(affil))
    return witnesses


def resolve_speaker(speaker_name, chamber, held_date, leg_idx, roster, witnesses):
    s = speaker_name.strip()
    if re.match(r"^The\s+(?:ACTING\s+)?(?:CHAIRMAN|CHAIRWOMAN|CHAIR|VICE CHAIRMAN|PRESIDING OFFICER)\b", s, re.IGNORECASE):
        return "Member", "", "", "", "", ""

    # Extract last name token (handle "Mr. Smith of Texas" -> "smith")
    s_no_of = re.sub(r"\s+of\s+[A-Z][A-Za-z\s]+$", "", s)
    tokens = [t.strip(".,") for t in s_no_of.split() if t.strip(".,").lower() not in {"jr", "sr", "ii", "iii", "iv"}]
    last = tokens[-1].lower() if tokens else ""

    explicit_member = bool(re.match(r"^(Senator|Representative|Chairman|Chairwoman)\b", s))

    # Check witness list first unless explicitly titled Senator/Representative
    if not explicit_member and last in witnesses and last not in roster:
        affil, sector = witnesses[last]
        return "Witness", "", "", "", affil, sector

    # Check official legislator roster
    cands = leg_idx.get((chamber, last), [])
    if not cands and chamber == "JOINT":
        cands = leg_idx.get(("SENATE", last), []) + leg_idx.get(("HOUSE", last), [])

    # Filter by held_date if available
    if held_date and cands:
        active = [c for c in cands if c["start"] <= held_date <= c["end"]]
        if active:
            cands = active

    if cands:
        # Disambiguate with committee roster state if available
        if last in roster and roster[last]:
            st_match = [c for c in cands if c["state"] == roster[last]]
            if st_match:
                cands = st_match
        # If speaker is in committee roster OR explicitly titled Member OR only 1 legislator match
        if explicit_member or last in roster or (len(cands) == 1 and last not in witnesses):
            c = cands[0]
            return "Member", c["party"], c["state"], c["bioguide_id"], "", ""

    if last in witnesses:
        affil, sector = witnesses[last]
        return "Witness", "", "", "", affil, sector

    if explicit_member:
        return "Member", "", roster.get(last, ""), "", "", ""

    return "Witness" if re.match(r"^(Dr\.|Prof\.|Professor|General|Gen\.|Lieutenant|Brigadier|Major|Admiral|Adm\.|Secretary|Under|Assistant|Deputy|Director|Administrator|Commissioner|Ambassador|Judge|Hon\.)", s) else "Unknown", "", "", "", "", ""


def find_ai_matches(text):
    hits = []
    for label, pat in AI_CASE_SENSITIVE:
        if pat.search(text):
            hits.append(label)
    for label, pat in AI_CASE_INSENSITIVE:
        if pat.search(text):
            hits.append(label)
    return hits


def segment_transcript(pre_text, chamber, held_date, leg_idx, roster, witnesses):
    lines = pre_text.splitlines()
    blocks = []
    current = []
    for line in lines:
        if line.strip() == "":
            if current:
                blocks.append("\n".join(current))
                current = []
        else:
            current.append(line)
    if current:
        blocks.append("\n".join(current))

    turns = []
    current_speaker = "Unknown"
    current_meta = ("Unknown", "", "", "", "", "")
    current_stmt_type = "Q&A_or_Hearing"
    turn_id = 0

    for blk in blocks:
        flat = re.sub(r"-\n\s*", "", blk)
        flat = re.sub(r"\s+", " ", flat).strip()
        if not flat:
            continue

        m_prep = PREPARED_START_RE.search(flat)
        if m_prep:
            turn_id += 1
            current_speaker = m_prep.group(1).strip()
            current_meta = resolve_speaker(current_speaker, chamber, held_date, leg_idx, roster, witnesses)
            current_stmt_type = "Prepared"
            continue

        m_hdr = STATEMENT_HEADER_RE.match(flat)
        if m_hdr and len(flat) < 120:
            turn_id += 1
            current_speaker = m_hdr.group(1).strip()
            current_meta = resolve_speaker(current_speaker, chamber, held_date, leg_idx, roster, witnesses)
            current_stmt_type = "Prepared"
            continue

        if len(flat) < 40:
            continue

        m = SPEAKER_RE.match(flat)
        if m:
            turn_id += 1
            current_speaker = re.sub(r"\s+", " ", m.group(1)).strip()
            current_meta = resolve_speaker(current_speaker, chamber, held_date, leg_idx, roster, witnesses)
            body = m.group(2).strip()
            current_stmt_type = "Q&A_or_Hearing"
            if len(body) >= 40:
                turns.append((turn_id, current_speaker, *current_meta, current_stmt_type, body))
        else:
            turns.append((turn_id, current_speaker, *current_meta, current_stmt_type, flat))

    return turns


def main():
    leg_idx = load_legislators()
    sum_files = sorted(f for f in os.listdir(SUM_DIR) if f.endswith(".json"))
    print(f"Processing {len(sum_files)} downloaded hearings...", flush=True)

    hearing_rows = []
    segment_rows = []

    for sf in sum_files:
        pkg_id = sf[:-5]
        htm_path = os.path.join(HTM_DIR, f"{pkg_id}.htm")
        if not os.path.exists(htm_path):
            continue

        with open(os.path.join(SUM_DIR, sf), "r", encoding="utf-8") as f:
            summary = json.load(f)
        with open(htm_path, "r", encoding="utf-8", errors="replace") as f:
            htm_str = f.read()

        pre_text = extract_pre_text(htm_str)
        committee = extract_committee(pre_text)
        roster = parse_committee_roster(pre_text)
        witnesses = parse_contents_witnesses(pre_text)

        chamber = summary.get("chamber", "")
        held_dates = summary.get("heldDates") or []
        held_date = held_dates[0] if held_dates else ""
        in_3yr = bool(held_date and HELD_START <= held_date <= HELD_END)

        turns = segment_transcript(pre_text, chamber, held_date, leg_idx, roster, witnesses)
        ai_count = 0

        for idx, (turn_id, speaker, role, party, state, bioguide, w_affil, w_sector, stmt_type, text) in enumerate(turns):
            matches = find_ai_matches(text)
            if not matches:
                continue
            ai_count += 1
            prev_p = turns[idx - 1][9][:500] if idx > 0 else ""
            next_p = turns[idx + 1][9][:500] if idx + 1 < len(turns) else ""

            segment_rows.append({
                "segment_id": f"{pkg_id}_t{turn_id}_p{idx}",
                "package_id": pkg_id,
                "title": summary.get("title", ""),
                "congress": summary.get("congress", ""),
                "chamber": chamber,
                "committee": committee,
                "date_issued": summary.get("dateIssued", ""),
                "held_date": held_date,
                "in_3yr_held_window": in_3yr,
                "turn_id": turn_id,
                "paragraph_idx": idx,
                "speaker_name": speaker,
                "speaker_role": role,
                "party": party,
                "state": state,
                "bioguide_id": bioguide,
                "witness_affiliation": w_affil,
                "witness_sector": w_sector,
                "statement_type": stmt_type,
                "matched_terms": "; ".join(matches),
                "text": text,
                "prev_paragraph": prev_p,
                "next_paragraph": next_p,
            })

        hearing_rows.append({
            "package_id": pkg_id,
            "title": summary.get("title", ""),
            "congress": summary.get("congress", ""),
            "chamber": chamber,
            "committee": committee,
            "date_issued": summary.get("dateIssued", ""),
            "held_date": held_date,
            "in_3yr_held_window": in_3yr,
            "total_paragraphs": len(turns),
            "ai_paragraphs": ai_count,
        })

    df_hearings = pd.DataFrame(hearing_rows)
    df_all = pd.DataFrame(segment_rows)

    df_hearings.to_csv(os.path.join(DATA_DIR, "hearings_metadata.csv"), index=False)
    df_all.to_csv(os.path.join(DATA_DIR, "ai_segments_all_published.csv"), index=False)

    df_3yr = df_all[df_all["in_3yr_held_window"]].copy()
    df_3yr.to_csv(os.path.join(DATA_DIR, "ai_segments_held_3yr.csv"), index=False)

    print(f"Hearings processed: {len(df_hearings)} (in 3yr held window: {df_hearings['in_3yr_held_window'].sum()})")
    print(f"AI segments: {len(df_all)}")
    print("\nSpeaker roles:\n", df_all["speaker_role"].value_counts())
    print("\nMember parties:\n", df_all[df_all["speaker_role"] == "Member"]["party"].value_counts(dropna=False))
    print("\nWitness sectors:\n", df_all[df_all["speaker_role"] == "Witness"]["witness_sector"].value_counts(dropna=False))

    if len(df_3yr) > 0:
        df_3yr["year_half"] = df_3yr["held_date"].str[:4] + "-H" + (
            (df_3yr["held_date"].str[5:7].astype(int) > 6).astype(int) + 1
        ).astype(str)
        n_sample = min(200, len(df_3yr))
        strata = df_3yr.groupby(["year_half", "chamber"], group_keys=False)
        sample = strata.apply(
            lambda g: g.sample(n=max(1, round(n_sample * len(g) / len(df_3yr))), random_state=42)
        ).head(n_sample).copy()
        sample["primary_causal_story"] = ""
        sample["secondary_causal_story"] = ""
        sample["notes"] = ""
        sample_cols = [
            "segment_id", "package_id", "held_date", "chamber", "committee", "title",
            "speaker_name", "speaker_role", "party", "state", "witness_affiliation", "witness_sector",
            "statement_type", "matched_terms", "text", "prev_paragraph", "next_paragraph",
            "primary_causal_story", "secondary_causal_story", "notes"
        ]
        sample[sample_cols].to_csv(os.path.join(DATA_DIR, "preliminary_coding_sample.csv"), index=False)
        print(f"\nSaved {len(sample)} stratified segments to data/preliminary_coding_sample.csv")


if __name__ == "__main__":
    main()
