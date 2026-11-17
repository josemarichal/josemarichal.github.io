import json
import urllib.request
import re

OLLAMA_BASE_URL = "http://localhost:11434"


def get_available_ollama_models():
    """Returns (is_available, list_of_model_names)"""
    try:
        req = urllib.request.Request(f"{OLLAMA_BASE_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=2.0) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            models = [m["name"] for m in data.get("models", [])]
            return True, models
    except Exception:
        return False, []


def generate_llm_proposal(agency, rfp_text, model="llama3:latest", timeout=90):
    """
    Calls local Ollama model (Llama 3, Mistral, etc.) to synthesize a book section
    from *You Must Become an Algorithmic Problem* with the user's submitted
    research notes/snippet into a concrete new research expansion pitch.
    """
    produce_str = ", ".join(agency.get("produce_catalog", []))
    spec = agency.get("agency_specialty", "Socio-Technical Theory")
    chapter = agency.get("chapter", "Book Section")
    perspective = agency.get("agency_perspective", "")
    agency_name = agency.get("agency_name", agency.get("firm_name", "Book Section"))
    aid = agency.get("agency_id", agency.get("firm_id", "SEC"))
    outlets_str = ", ".join(
        agency.get("target_outlets", ["Perspectives on Politics", "Big Data & Society", "Science, Technology, & Human Values"])
    )

    whitepaper_excerpt = agency.get("text", "")[:1600]

    prompt = f"""You are a senior interdisciplinary political scientist and STS research strategist helping the author of *You Must Become an Algorithmic Problem* expand sections of the book into new peer-reviewed research papers, grant proposals, and research agendas.

BOOK SECTION BEING EXPANDED: '{agency_name}' ({aid}) — {chapter}
Section's Theoretical Focus: {spec}
Core Concepts in This Section: {produce_str}
Section Perspective: "{perspective}"

USER'S SUBMITTED RESEARCH NOTES / SNIPPET:
\"\"\"
{rfp_text.strip()}
\"\"\"

EXCERPT FROM THE BOOK SECTION:
\"\"\"
{whitepaper_excerpt}
\"\"\"

TASK:
Show the author specifically how to MERGE the arguments, metaphors, and thinkers in this book section with the themes, theorists, and empirical concerns in the USER'S SUBMITTED RESEARCH NOTES above to launch a new research paper or project.

CRITICAL DIRECTIVES:
- Ground every claim in BOTH the user's submitted notes (name specific themes/theorists/cases from their snippet) AND the book section's concepts ({produce_str}).
- Do NOT pitch op-eds, viral tweets, or video scripts. Pitch serious academic research expansions (journal articles, special-issue contributions, grant/book-chapter proposals).
- Avoid generic filler; be concrete about the theoretical bridge, empirical case, and research design.

Please format your response with these exact headers:

### SYNTHESIS ANGLE
2-3 sentences explaining the core conceptual collision: how merging this book section with the themes in the user's notes creates a novel research contribution.

### RESEARCH PAPER PITCH
- Working Title: (An academic article or chapter title)
- Target Journals: (Suggest 3-4 realistic academic journals such as Big Data & Society, Perspectives on Politics, ST&HV, New Media & Society, Surveillance & Society, etc., tailored to the merged topic — baseline options: {outlets_str})
- Core Synthesis Thesis: (1-2 sentences stating the merged argument)
- Research Gap & Payoff: (1-2 sentences on what combining these two bodies of work reveals that neither does alone)
- 3-Part Paper Outline:
1. (Section 1: Theoretical Bridge)
2. (Section 2: Empirical / Case Synthesis)
3. (Section 3: Normative / Policy Implications)

### CONCEPTUAL BRIDGE
- 4-Step Analytical Bridge:
1. (How book concept 1 maps onto a specific theme in the user's notes)
2. (How book concept 2 maps onto a second theme/case in the user's notes)
3. (Where the two frameworks challenge or sharpen each other)
4. (What new concept or typology emerges from the synthesis)
- Guiding Research Questions:
1. (Empirical or theoretical research question 1)
2. (Empirical or theoretical research question 2)

### EMPIRICAL DESIGN & NEXT STEPS
- Empirical Case Strategy: (Concrete case, archive, dataset, or field site that tests this merged argument)
- Methodology: (Specific qualitative, computational, or mixed-methods approach)
- Draft Abstract: (100-140 words of publishable academic abstract prose)
- Immediate Next Steps:
1. (Actionable step 1)
2. (Actionable step 2)
3. (Actionable step 3)
"""

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.75,
            "top_p": 0.9,
            "num_predict": 1800,
        },
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{OLLAMA_BASE_URL}/api/generate",
        data=req_data,
        headers={"Content-Type": "application/json"},
    )

    with urllib.request.urlopen(req, timeout=timeout) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        raw_text = res.get("response", "").strip()

    return parse_llm_response_to_proposal(agency, raw_text, model)


def clean_str(s):
    if not s:
        return ""
    res = s.strip()
    res = re.sub(r'^\s*[*•\-]+\s*', '', res)
    res = re.sub(r'^\*{1,3}|\*{1,3}$', '', res)
    res = re.sub(r'^["\']|["\']$', '', res)
    return res.strip()


def _extract_numbered_items(block, exclude_keywords=()):
    items = []
    for line in block.split("\n"):
        m = re.match(r'^\s*(?:\d+[\.\)]|\*|-)\s+(.*)', line)
        if m:
            txt = re.sub(r'\*+', '', m.group(1)).strip()
            if len(txt) > 15 and not any(k in txt.lower() for k in exclude_keywords):
                items.append(txt)
    return items


def parse_llm_response_to_proposal(agency, raw_text, model_name):
    """
    Extracts the LLM's generated Research Expansion sections into structured fields.
    """
    def get_section(hdr, nxt):
        pat = rf"(?:###|\*\*)\s*{hdr}.*?(?=(?:###|\*\*)\s*{nxt}|\Z)"
        m = re.search(pat, raw_text, re.DOTALL | re.IGNORECASE)
        if m:
            lines = m.group(0).split("\n")
            return "\n".join(lines[1:]).strip()
        return ""

    sec_angle = get_section("SYNTHESIS ANGLE", "RESEARCH PAPER PITCH")
    sec_pitch = get_section("RESEARCH PAPER PITCH", "CONCEPTUAL BRIDGE")
    sec_bridge = get_section("CONCEPTUAL BRIDGE", "EMPIRICAL DESIGN")
    sec_design = get_section("EMPIRICAL DESIGN", "xyznonexistent")

    if not sec_angle:
        sec_angle = raw_text[:350]
    if not sec_pitch:
        sec_pitch = raw_text[350:1000]

    # --- 1. Research Paper Pitch ---
    title_match = re.search(r"(?:Working Title|Title)[:\s*]+([^\n]+)", sec_pitch, re.I)
    paper_title = (
        clean_str(title_match.group(1))
        if title_match
        else f"Expanding {agency.get('agency_specialty', 'Algorithmic Theory')}"
    )

    journals_match = re.search(r"(?:Target Journals|Target Venues)[:\s*]+([^\n]+)", sec_pitch, re.I)
    target_journals = (
        clean_str(journals_match.group(1))
        if journals_match
        else "Perspectives on Politics, Big Data & Society, Science, Technology, & Human Values"
    )

    thesis_match = re.search(r"(?:Core Synthesis Thesis|Synthesis Thesis|Thesis)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_pitch, re.I)
    synthesis_thesis = clean_str(thesis_match.group(1)) if thesis_match else sec_pitch[:260]

    gap_match = re.search(r"(?:Research Gap & Payoff|Research Gap)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_pitch, re.I)
    research_gap = (
        clean_str(gap_match.group(1))
        if gap_match
        else "Bridges normative socio-technical theory with the empirical dynamics in your notes."
    )

    outline = _extract_numbered_items(
        sec_pitch,
        exclude_keywords=("working title", "target journals", "synthesis thesis", "research gap", "paper outline"),
    )
    if len(outline) < 3:
        outline += [
            "1. Theoretical Bridge: Connecting the book section's core concepts to the frameworks in your notes.",
            "2. Empirical Synthesis: Testing the merged framework against concrete cases.",
            "3. Normative & Policy Implications: Reimagining institutional design and democratic agency.",
        ]

    # --- 2. Conceptual Bridge ---
    bridge_parts = re.split(r"Guiding Research Questions[:\s*]*", sec_bridge, flags=re.I)
    moves_block = bridge_parts[0] if bridge_parts else sec_bridge
    rqs_block = bridge_parts[1] if len(bridge_parts) > 1 else sec_bridge

    bridging_moves = _extract_numbered_items(
        moves_block,
        exclude_keywords=("4-step analytical bridge", "analytical bridge", "guiding research"),
    )
    if len(bridging_moves) < 3:
        bridging_moves += [
            "Map the book section's core mechanism onto the central political dynamic in your notes.",
            "Identify where the two literatures reinforce or complicate each other's assumptions.",
            "Formulate a unified conceptual vocabulary for the merged research agenda.",
        ]

    rqs = [q for q in _extract_numbered_items(rqs_block) if "?" in q]
    if len(rqs) < 2:
        rqs += [
            "How does the book section's model of algorithmic legibility reshape the political dynamics in your notes?",
            "What new forms of institutional resistance or policy design emerge from this synthesis?",
        ]

    # --- 3. Empirical Design & Next Steps ---
    case_match = re.search(r"(?:Empirical Case Strategy|Case Strategy)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_design, re.I)
    case_strategy = (
        clean_str(case_match.group(1))
        if case_match
        else "Comparative case study pairing computational/institutional records with qualitative discourse analysis."
    )

    meth_match = re.search(r"(?:Methodology)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_design, re.I)
    methodology = (
        clean_str(meth_match.group(1))
        if meth_match
        else "Mixed-methods interpretive policy analysis and systematic document coding."
    )

    abs_match = re.search(r"(?:Draft Abstract|Abstract)[:\s*]+([^\n]+(?:\n(?![-*•\d]+\s|\s*###|\s*\*\*Immediate)[^\n]+)*)", sec_design, re.I)
    abstract_draft = clean_str(abs_match.group(1)) if abs_match else sec_design[:380]

    steps_split = re.split(r"Immediate Next Steps[:\s*]*", sec_design, flags=re.I)
    steps_block = steps_split[1] if len(steps_split) > 1 else sec_design
    next_steps = _extract_numbered_items(steps_block, exclude_keywords=("empirical case", "methodology", "draft abstract"))
    if len(next_steps) < 2:
        next_steps += [
            "Extract 3–4 key citations from your notes to pair with this book section.",
            "Draft a 500-word conference or special-issue pitch using the abstract above.",
        ]

    return {
        "agency_name": agency.get("agency_name", agency.get("firm_name")),
        "agency_id": agency.get("agency_id", agency.get("firm_id")),
        "specialty": agency.get("agency_specialty", ""),
        "chapter": agency.get("chapter", "Book Section"),
        "strategic_angle": sec_angle,
        "is_llm_generated": True,
        "llm_model": model_name,
        "raw_llm_output": raw_text,
        "research_pitch": {
            "title": paper_title,
            "target_journals": target_journals,
            "synthesis_thesis": synthesis_thesis,
            "research_gap": research_gap,
            "paper_outline": outline[:3],
        },
        "conceptual_bridge": {
            "core_concepts": agency.get("produce_catalog", []),
            "bridging_moves": bridging_moves[:4],
            "research_questions": rqs[:3],
        },
        "empirical_design": {
            "case_strategy": case_strategy,
            "methodology": methodology,
            "abstract_draft": abstract_draft,
            "next_steps": next_steps[:3],
        },
        "produce_catalog": agency.get("produce_catalog", []),
        "full_passage": agency.get("text", ""),
    }
