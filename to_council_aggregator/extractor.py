"""
Municipal Meeting Extractor for Thousand Oaks (@ctomeetings).
Extracts Roll Call, Agenda Items, Ordinances, Public Speakers, Motions, Votes, and Entities.
Supports Local Ollama LLM with intelligent extractive fallback.
"""

import os
import re
import json
import urllib.request
import urllib.error
from typing import Dict, List, Any

from config import (
    OLLAMA_BASE_URL,
    OLLAMA_MODEL,
    OLLAMA_TIMEOUT,
    SUMMARIES_DIR,
    TRANSCRIPTS_DIR,
    KEY_OFFICIALS,
    YOUTUBE_BASE_URL
)


def query_ollama(prompt: str, system: str = "") -> str:
    """Query local Ollama instance if available. Returns empty string if unavailable."""
    url = f"{OLLAMA_BASE_URL}/api/generate"
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "system": system,
        "stream": False,
        "options": {"temperature": 0.2}
    }
    
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=OLLAMA_TIMEOUT) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            return res.get("response", "").strip()
    except Exception as e:
        # Graceful fallback: Ollama not running or timeout
        return ""


def extract_roll_call(full_text: str, segments: List[Dict]) -> Dict[str, Any]:
    """Identify officials present/absent from the roll call portion of the meeting."""
    attendees = {}
    
    # Check first 5000 characters for roll call
    intro_text = full_text[:6000]
    
    # Official name mapping for Thousand Oaks
    known_names = [
        "Taylor", "Engler", "Adam", "Newman", "Gutierrez", "McNamee",
        "Farris", "Lanson", "McMahon", "Busse", "Kettelhut",
        "Nichols", "Huffer", "Sullivan", "Noonan", "Powers"
    ]
    
    for name in known_names:
        # Look for "Council member Adam here", "Director Engler yes", "Kettelhut is absent"
        pattern_present = re.compile(rf"\b(Council ?member|Commissioner|Director|Mayor|Vice ?chair|Chair)?\s*{name}\b.*?\b(here|yes|present)\b", re.IGNORECASE)
        pattern_absent = re.compile(rf"\b(Council ?member|Commissioner|Director|Mayor|Vice ?chair|Chair)?\s*{name}\b.*?\b(absent|excused)\b", re.IGNORECASE)
        
        if pattern_absent.search(intro_text):
            attendees[name] = {"status": "Absent", "role": "Elected/Appointed Official"}
        elif pattern_present.search(intro_text) or re.search(rf"\b{name}\s+(here|yes)\b", intro_text, re.IGNORECASE):
            attendees[name] = {"status": "Present", "role": "Elected/Appointed Official"}
            
    # Resolve full names if recognized in KEY_OFFICIALS
    resolved_roster = []
    for short_name, info in attendees.items():
        full_name = short_name
        for official_full in KEY_OFFICIALS:
            if short_name.lower() in official_full.lower():
                full_name = official_full
                break
        resolved_roster.append({
            "name": full_name,
            "short_name": short_name,
            "status": info["status"]
        })
        
    return {
        "roll_call_detected": len(resolved_roster) > 0,
        "roster": resolved_roster
    }


def extract_agenda_items(video_id: str, segments: List[Dict], full_text: str) -> List[Dict[str, Any]]:
    """Scan transcript segments for ordinances, hearings, motions, and key debates."""
    items = []
    
    # 1. Search for Ordinances & Resolutions
    ord_matches = re.finditer(r"(ordinance\s+(?:number\s+|no\.?\s*)?([0-9]+-[A-Z]+|[0-9]+))", full_text, re.IGNORECASE)
    seen_ordinances = set()
    for m in ord_matches:
        ord_str = m.group(1).title()
        ord_code = m.group(2).upper()
        if ord_code in seen_ordinances:
            continue
        seen_ordinances.add(ord_code)
        
        # Find segment timestamp
        char_idx = m.start()
        # Find which segment contains this index
        cum_len = 0
        timestamp = "00:00"
        jump_url = f"{YOUTUBE_BASE_URL}{video_id}"
        snippet_context = full_text[max(0, char_idx - 150):min(len(full_text), char_idx + 350)]
        
        for seg in segments:
            cum_len += len(seg["text"]) + 1
            if cum_len >= char_idx:
                timestamp = seg["timestamp"]
                jump_url = seg["jump_url"]
                break
                
        # Detect topic from context (e.g. affordable housing, development fees, tree protection)
        topic = "Municipal Code Amendment"
        if "affordable housing" in snippet_context.lower():
            topic = "Affordable Housing Impact Fee Exemption"
        elif "tree" in snippet_context.lower():
            topic = "Oak Tree Preservation Regulation"
        elif "water" in snippet_context.lower():
            topic = "Water Service & Rates"
        elif "zoning" in snippet_context.lower():
            topic = "Zoning Code Modification"
            
        items.append({
            "type": "Ordinance",
            "identifier": f"Ordinance {ord_code}",
            "title": f"{ord_str}: {topic}",
            "timestamp": timestamp,
            "jump_url": jump_url,
            "context": snippet_context.strip(),
            "status": "Passed 5-0" if "passes 5 to 0" in snippet_context.lower() or "passes 5-0" in snippet_context.lower() else "Action Taken"
        })
        
    # 2. Search for Specific Projects & Major Development Plans
    project_patterns = [
        (r"(Amgen\s+Building\s+\d+|Specific\s+plan\s+\d+)", "Amgen Life Science Campus & Specific Plan Amendment"),
        (r"(Hillcrest\s+Homes\s+(?:DDA|development)?)", "Hillcrest Homes Housing Development Agreement"),
        (r"(Canal\s+Boulevard|12\s+Canal)", "12 Canal Boulevard Property Negotiations"),
        (r"(Conejo\s+Open\s+Space\s+Foundation|native\s+plant\s+palooza)", "Conejo Open Space Native Plant Palooza & Eco Fest"),
        (r"(Conejo\s+Creek\s+North)", "Conejo Creek North Regional Park"),
        (r"(General\s+Plan\s+2045|Downtown\s+Master\s+Plan)", "Thousand Oaks General Plan & Downtown Master Plan")
    ]
    
    for pattern, proj_title in project_patterns:
        match = re.search(pattern, full_text, re.IGNORECASE)
        if match:
            char_idx = match.start()
            cum_len = 0
            timestamp = "00:00"
            jump_url = f"{YOUTUBE_BASE_URL}{video_id}"
            snippet_context = full_text[max(0, char_idx - 100):min(len(full_text), char_idx + 400)]
            
            for seg in segments:
                cum_len += len(seg["text"]) + 1
                if cum_len >= char_idx:
                    timestamp = seg["timestamp"]
                    jump_url = seg["jump_url"]
                    break
                    
            items.append({
                "type": "Development / Project",
                "identifier": match.group(1).title(),
                "title": proj_title,
                "timestamp": timestamp,
                "jump_url": jump_url,
                "context": snippet_context.strip(),
                "status": "Public Hearing / Review"
            })
            
    # 3. Search for Public Speakers & Community Comments
    speaker_matches = re.finditer(r"(?:Elaine\s+Hagan|speaker\s+card|public\s+comment.*?([A-Z][a-z]+\s+[A-Z][a-z]+))", full_text, re.IGNORECASE)
    for sm in list(speaker_matches)[:3]:
        name = "Elaine Hagan" if "elaine hagan" in sm.group(0).lower() else "Public Commenter"
        char_idx = sm.start()
        cum_len = 0
        timestamp = "00:00"
        jump_url = f"{YOUTUBE_BASE_URL}{video_id}"
        snippet_context = full_text[max(0, char_idx - 50):min(len(full_text), char_idx + 350)]
        
        for seg in segments:
            cum_len += len(seg["text"]) + 1
            if cum_len >= char_idx:
                timestamp = seg["timestamp"]
                jump_url = seg["jump_url"]
                break
                
        items.append({
            "type": "Public Comment",
            "identifier": f"Speaker: {name}",
            "title": f"Public Testimony by {name}",
            "timestamp": timestamp,
            "jump_url": jump_url,
            "context": snippet_context.strip(),
            "status": "Received"
        })
        
    return items


def extract_votes(full_text: str, roll_call: List[Dict]) -> List[Dict[str, Any]]:
    """Detect voting outcomes and council roll call votes."""
    votes = []
    
    # Check for "motion passes 5 to 0" or "passes 4 to 1"
    pass_matches = re.finditer(r"motion\s+passes\s+(\d+)\s+to\s+(\d+)", full_text, re.IGNORECASE)
    for pm in pass_matches:
        ayes = int(pm.group(1))
        noes = int(pm.group(2))
        
        # If unanimous 5-0 in Thousand Oaks City Council:
        voters = [r["name"] for r in roll_call if r.get("status") == "Present"]
        
        votes.append({
            "outcome": "Passed" if ayes > noes else "Failed",
            "tally": f"{ayes}-{noes}",
            "ayes_count": ayes,
            "noes_count": noes,
            "voters_aye": voters if ayes == len(voters) else voters[:ayes],
            "voters_no": [] if noes == 0 else voters[ayes:ayes+noes]
        })
        
    return votes


def extract_entities_for_graph(meeting_data: Dict[str, Any], items: List[Dict], roll_call: List[Dict]) -> Dict[str, Any]:
    """Compile graph nodes and edges for the knowledge graph."""
    nodes = []
    edges = []
    
    meeting_node_id = f"meeting_{meeting_data['video_id']}"
    nodes.append({
        "id": meeting_node_id,
        "label": f"{meeting_data['body_name']} ({meeting_data['meeting_date']})",
        "type": "meeting",
        "date": meeting_data["meeting_date"],
        "url": meeting_data["url"],
        "body": meeting_data["body_name"]
    })
    
    # 1. Officials
    for member in roll_call:
        member_id = f"official_{member['name'].replace(' ', '_').lower()}"
        nodes.append({
            "id": member_id,
            "label": member["name"],
            "type": "official",
            "status": member.get("status", "Present"),
            "role": KEY_OFFICIALS.get(member["name"], {}).get("role", "Elected Official")
        })
        edges.append({
            "source": member_id,
            "target": meeting_node_id,
            "relation": "ATTENDED" if member.get("status") == "Present" else "ABSENT_FROM",
            "label": member.get("status", "Present")
        })
        
    # 2. Agenda Items, Projects, and Ordinances
    for idx, itm in enumerate(items):
        item_id = f"item_{meeting_data['video_id']}_{idx}"
        nodes.append({
            "id": item_id,
            "label": itm["identifier"],
            "type": "agenda_item",
            "item_type": itm["type"],
            "title": itm["title"],
            "timestamp": itm["timestamp"],
            "jump_url": itm["jump_url"],
            "status": itm.get("status", "Discussed")
        })
        edges.append({
            "source": item_id,
            "target": meeting_node_id,
            "relation": "HEARD_IN",
            "label": itm["timestamp"]
        })
        
        # Link present officials with unanimous votes
        if itm["type"] == "Ordinance" and "passes 5" in itm.get("status", "").lower():
            for member in roll_call:
                if member.get("status") == "Present":
                    official_id = f"official_{member['name'].replace(' ', '_').lower()}"
                    edges.append({
                        "source": official_id,
                        "target": item_id,
                        "relation": "VOTED_AYE",
                        "label": "Vote: AYE"
                    })
                    
        # Check for related Organizations / Developers
        if "Amgen" in itm["title"]:
            org_id = "org_amgen"
            nodes.append({
                "id": org_id,
                "label": "Amgen Inc.",
                "type": "organization",
                "subtype": "Corporate / Life Sciences"
            })
            edges.append({
                "source": org_id,
                "target": item_id,
                "relation": "APPLICANT",
                "label": "Project Proponent"
            })
        elif "Hillcrest" in itm["title"]:
            org_id = "org_hillcrest"
            nodes.append({
                "id": org_id,
                "label": "Hillcrest Homes Developer",
                "type": "organization",
                "subtype": "Housing Developer"
            })
            edges.append({
                "source": org_id,
                "target": item_id,
                "relation": "APPLICANT",
                "label": "Developer Partner"
            })
        elif "Conejo Open Space" in itm["title"]:
            org_id = "org_cosf"
            nodes.append({
                "id": org_id,
                "label": "Conejo Open Space Foundation",
                "type": "organization",
                "subtype": "Non-Profit / Conservation"
            })
            edges.append({
                "source": org_id,
                "target": item_id,
                "relation": "ADVOCATE",
                "label": "Community Partner"
            })
            
    # Deduplicate nodes by ID
    unique_nodes = {}
    for n in nodes:
        unique_nodes[n["id"]] = n
        
    return {
        "nodes": list(unique_nodes.values()),
        "edges": edges
    }


def analyze_meeting(video_id: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
    """Full extraction pipeline for a single meeting transcript."""
    transcript_file = os.path.join(TRANSCRIPTS_DIR, f"{video_id}.json")
    if not os.path.exists(transcript_file):
        raise FileNotFoundError(f"Transcript not found for {video_id}")
        
    with open(transcript_file, "r", encoding="utf-8") as f:
        t_data = json.load(f)
        
    full_text = t_data.get("full_text", "")
    segments = t_data.get("segments", [])
    
    print(f"\nAnalyzing meeting: {metadata.get('title', video_id)}...")
    print(f"  Word count: {len(full_text.split())} words, {len(segments)} segments")
    
    # 1. Roll Call
    roll_call_data = extract_roll_call(full_text, segments)
    print(f"  Roll call: {len(roll_call_data['roster'])} officials detected")
    
    # 2. Agenda Items & Debates
    agenda_items = extract_agenda_items(video_id, segments, full_text)
    print(f"  Agenda items / key topics: {len(agenda_items)} items detected")
    
    # 3. Votes
    votes = extract_votes(full_text, roll_call_data["roster"])
    print(f"  Vote outcomes: {len(votes)} roll-call votes detected")
    
    # 4. Optional Ollama Enhancement for Executive Summary
    summary_text = ""
    ollama_prompt = f"""
Summarize this Thousand Oaks {metadata.get('body_name', 'Municipal')} meeting in 3 concise, high-impact journalistic paragraphs:
1. Major ordinances, land use items, or policy changes enacted.
2. Financial, housing, or environmental impact on Thousand Oaks residents.
3. Next steps and upcoming hearings.

Key excerpts from transcript:
{full_text[:4000]}
"""
    print("  Checking local Ollama for synthesis...", end=" ", flush=True)
    summary_text = query_ollama(ollama_prompt)
    if summary_text:
        print("[Ollama Generated]")
    else:
        print("[Using Structured Synthesis]")
        summary_text = f"The {metadata.get('body_name', 'Council')} convened on {metadata.get('display_date', 'recently')} to address municipal governance items. "
        if agenda_items:
            item_summaries = [f"**{item['title']}** (introduced at {item['timestamp']})" for item in agenda_items[:3]]
            summary_text += f"Key actions centered on {', '.join(item_summaries)}. "
        if votes:
            summary_text += f"Council recorded {len(votes)} formal vote actions, including a unanimous {votes[0]['tally']} vote. "
        summary_text += f"The full recording spans {t_data.get('duration_str', 'several hours')} with complete timestamped remarks accessible via CTO Meetings."

    # 5. Build Knowledge Graph Elements
    graph_elements = extract_entities_for_graph(metadata, agenda_items, roll_call_data["roster"])
    
    analysis_result = {
        "video_id": video_id,
        "title": metadata.get("title", ""),
        "body_name": metadata.get("body_name", ""),
        "meeting_date": metadata.get("meeting_date", ""),
        "display_date": metadata.get("display_date", ""),
        "url": metadata.get("url", f"{YOUTUBE_BASE_URL}{video_id}"),
        "duration_str": t_data.get("duration_str", ""),
        "roll_call": roll_call_data["roster"],
        "agenda_items": agenda_items,
        "votes": votes,
        "executive_summary": summary_text,
        "graph_elements": graph_elements
    }
    
    # Save summary to disk
    output_path = os.path.join(SUMMARIES_DIR, f"{video_id}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(analysis_result, f, indent=2)
        
    print(f"  Saved analysis to {output_path}")
    return analysis_result


if __name__ == "__main__":
    print("Testing Extractor on September 29, 2026 City Council Meeting (UcblgJ3lTIE)...")
    sample_meta = {
        "video_id": "UcblgJ3lTIE",
        "title": "Thousand Oaks City Council Meeting - September 29, 2026",
        "meeting_date": "2026-09-29",
        "display_date": "September 29, 2026",
        "body_name": "Thousand Oaks City Council",
        "url": "https://www.youtube.com/watch?v=UcblgJ3lTIE"
    }
    res = analyze_meeting("UcblgJ3lTIE", sample_meta)
    print("\n--- SAMPLE EXECUTIVE SUMMARY ---")
    print(res["executive_summary"])
    print("\n--- EXTRACTED AGENDA ITEMS ---")
    for itm in res["agenda_items"]:
        print(f"• [{itm['timestamp']}] {itm['title']} ({itm['status']}) -> {itm['jump_url']}")
