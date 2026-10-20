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
    Calls local Ollama model (Llama 3, Mistral, etc.) with a high-creativity,
    unconstrained prompt to produce publication-grade media pitches.
    """
    produce_str = ", ".join(agency.get("produce_catalog", []))
    spec = agency.get("agency_specialty", "Strategic Media Relations")
    perspective = agency.get("agency_perspective", "")
    agency_name = agency.get("agency_name", agency.get("firm_name", "Media Agency"))
    aid = agency.get("agency_id", agency.get("firm_id", "AGENCY"))
    outlets_str = ", ".join(agency.get("target_outlets", ["The Atlantic", "Wired", "The New Yorker", "Substack"]))
    
    # 1,200 words of the foundational passage providing the scholarly grounding
    whitepaper_excerpt = agency.get("text", "")[:1400]

    prompt = f"""You are the fearless, high-concept Creative Director at '{agency_name}' ({aid}).
Your firm's core editorial obsession: {spec}.
Your proprietary conceptual arsenal (the 'produce' you bring to market): {produce_str}.
Your strategic worldview: "{perspective}"

CLIENT'S SUBMITTED NEWS ARTICLE / TOPIC:
\"\"\"
{rfp_text.strip()}
\"\"\"

FOUNDATIONAL RESEARCH FROM YOUR BOOK CHAPTER / WHITEPAPER:
\"\"\"
{whitepaper_excerpt}
\"\"\"

CRITICAL STYLISTIC DIRECTIVES:
- Do NOT use clunky sci-fi jargon, artificial product names, or mechanical compound phrases (e.g., "Surface Pattern Classifiers", "Deviation Alarms", "Optimization Suites").
- Do NOT use formulaic Mad-Libs like "Why X is Actually a Crisis of Y" or "In today's fast-paced digital world" or "The conventional debate treats X as an isolated event".
- Ground your arguments in the real, elegant philosophical and cultural concepts from your research (such as: {produce_str}).
- Write with literary bite, philosophical urgency, and razor-sharp cultural criticism (in the style of *The Atlantic*, *The New Yorker*, *Wired*, or *The Baffler*).
- Directly collide the specific details of the client's topic with the philosophical insights, named thinkers (e.g. Marcuse, Scott, Taylor, Locke, Dick, Kant, Fisher), and human metaphors in your foundational research passage.

Please provide your complete pitch formatted with these clear headers:

### UNCONVENTIONAL STRATEGIC ANGLE
A 2-3 sentence counterintuitive thesis that reframes why conventional coverage of this story is completely missing the real structural dynamic.

### OP-ED & BLOG PITCH
- Evocative Headline: (A memorable, literary, witty, or arresting title)
- Target Publication: ({outlets_str})
- The Provocative Thesis: (1-2 sentences on the deep systemic reality)
- Opening Paragraph: (Write 80-120 words of publishable, vivid prose that pulls the reader in immediately)
- 3 Core Arguments: (Three substantive, concrete points unpacking the argument with reference to your passage's concepts)

### VIRAL SOCIAL MEDIA CAMPAIGN
- Scroll-Stopping Opening Post: (A punchy, provocative post for X/LinkedIn designed to ignite viral curiosity without cheap clickbait)
- 4-Part Thread / Carousel Breakdown: (Walk through the argument step-by-step with real intellectual substance)
- Audience Discussion Trigger: (A sharp question to provoke debate in the comments)

### VIDEO ESSAY & MULTIMEDIA TREATMENT
- Video Title:
- Visual Treatment & Aesthetic Cues: (Describe cinematography, pacing, split-screen contrasts, sound design)
- 30-Second Cold Open Script: (Vivid voiceover script to hook the viewer in the first 20 seconds)

### PODCAST & INTERVIEW PITCH
- Pitch Angle for Host:
- 2 Provocative Questions for the Host to ask you on air:
"""

    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.85,
            "top_p": 0.9,
            "num_predict": 1800
        }
    }

    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{OLLAMA_BASE_URL}/api/generate",
        data=req_data,
        headers={"Content-Type": "application/json"}
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


def parse_llm_response_to_proposal(agency, raw_text, model_name):
    """
    Intelligently extracts the LLM's generated sections into full structured fields
    without clobbering with repetitive boilerplate.
    """
    def get_section(hdr, nxt):
        pat = rf"(?:###|\*\*)\s*{hdr}.*?(?=(?:###|\*\*)\s*{nxt}|\Z)"
        m = re.search(pat, raw_text, re.DOTALL | re.IGNORECASE)
        if m:
            lines = m.group(0).split('\n')
            return '\n'.join(lines[1:]).strip()
        return ""

    sec_angle = get_section("UNCONVENTIONAL STRATEGIC ANGLE", "OP-ED")
    sec_oped = get_section("OP-ED", "VIRAL SOCIAL")
    sec_social = get_section("VIRAL SOCIAL", "VIDEO ESSAY")
    sec_video = get_section("VIDEO ESSAY", "PODCAST")
    sec_podcast = get_section("PODCAST", "xyznonexistent")

    # Fallback to general splits if exact headers varied
    if not sec_angle:
        m = re.search(r"UNCONVENTIONAL STRATEGIC ANGLE:?\s*(.*?)(?=(?:OP-ED|\*\*OP-ED|### OP-ED)|\Z)", raw_text, re.DOTALL | re.I)
        sec_angle = m.group(1).strip() if m else raw_text[:350]

    if not sec_oped:
        m = re.search(r"OP-ED & BLOG PITCH:?\s*(.*?)(?=(?:VIRAL SOCIAL|\*\*VIRAL|### VIRAL)|\Z)", raw_text, re.DOTALL | re.I)
        sec_oped = m.group(1).strip() if m else raw_text[350:900]

    # --- 1. Op-Ed Pitch Extraction ---
    hl_match = re.search(r"(?:Headline|Evocative Headline)[:\s*]+([^\n]+)", sec_oped, re.I)
    headline = clean_str(hl_match.group(1)) if hl_match else f"The Structural Logic Behind {agency.get('agency_specialty', 'Algorithms')}"

    pubs_match = re.search(r"(?:Target Publication|Target Publications)[:\s*]+([^\n]+)", sec_oped, re.I)
    target_pubs = clean_str(pubs_match.group(1)) if pubs_match else ", ".join(agency.get("target_outlets", ["The Atlantic", "Wired"]))

    thesis_match = re.search(r"(?:The Provocative Thesis|Provocative Thesis)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_oped, re.I)
    thesis = clean_str(thesis_match.group(1)) if thesis_match else sec_oped[:240]

    opening_match = re.search(r"(?:Opening Paragraph)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_oped, re.I)
    opening = clean_str(opening_match.group(1)) if opening_match else ""

    args = []
    for line in sec_oped.split('\n'):
        m_num = re.match(r'^\s*(?:\d+[\.\)]|\*|-)\s+(.*)', line)
        if m_num and len(m_num.group(1)) > 20 and not any(k in line.lower() for k in ["headline", "publication", "thesis", "opening paragraph", "core argument"]):
            cleaned_arg = re.sub(r'\*+', '', m_num.group(1)).strip()
            args.append(cleaned_arg)
    if len(args) < 3:
        args += [
            "How standard coverage misdiagnoses the fundamental technical and architectural drivers at play.",
            "The direct link between commercial model optimization and the erosion of civic autonomy.",
            "A structural pathway for reclaiming discerning human agency from automated systems."
        ]

    # --- 2. Viral Social Media Campaign Extraction ---
    hook_match = re.search(r"(?:Scroll-Stopping Opening Post|Opening Post)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_social, re.I)
    social_hook = clean_str(hook_match.group(1)) if hook_match else (sec_social[:280] if sec_social else "Why mainstream analysis is missing the real story behind this shift: a thread.")

    slides = []
    for line in sec_social.split('\n'):
        m_num = re.match(r'^\s*(?:\d+[\.\)]|\*|-)\s+(.*)', line)
        if m_num and not any(k in line.lower() for k in ["opening post", "trigger", "question", "breakdown", "carousel"]):
            cleaned_slide = re.sub(r'\*+', '', m_num.group(1)).strip()
            if not cleaned_slide.endswith(":"):
                slides.append(cleaned_slide)
    if len(slides) < 4:
        slides += [
            "Slide 1: THE BLIND SPOT — Why conventional media narratives misinterpret the initial symptom.",
            "Slide 2: THE HIDDEN LOGIC — The systemic model-fitting mechanism steering public behavior.",
            "Slide 3: THE CIVIC TRADEOFF — What human agency surrenders in exchange for automated convenience.",
            "Slide 4: THE STRATEGY — How nonconformist outliers provide the key to systemic renewal."
        ]

    q_match = re.search(r"(?:Audience Discussion Trigger|Discussion Trigger)[:\s*]+([^\n]+)", sec_social, re.I)
    discussion_q = clean_str(q_match.group(1)) if q_match else "Are you seeing this pattern unfold in your own digital habits, or is this being overstated?"

    # --- 3. Video Essay & Multimedia Treatment Extraction ---
    vt_match = re.search(r"(?:Video Title)[:\s*]+([^\n]+)", sec_video, re.I)
    video_title = clean_str(vt_match.group(1)) if vt_match else f"The Architecture Behind {headline}"

    vis_match = re.search(r"(?:Visual Treatment & Aesthetic Cues|Visual Treatment)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_video, re.I)
    visual_treatment = clean_str(vis_match.group(1)) if vis_match else "High-contrast visual essay blending archival footage with contemporary digital telemetry."

    open_match = re.search(r"(?:30-Second Cold Open Script|Cold Open Script)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_video, re.I)
    cold_open = clean_str(open_match.group(1)) if open_match else (sec_video[:300] if sec_video else f"Look closely at the surface story. What looks like accidental chaos is actually the calculated consequence of algorithmic governance.")

    # --- 4. Podcast & Interview Extraction ---
    pod_hook_match = re.search(r"(?:Pitch Angle for Host|Pitch Angle)[:\s*]+([^\n]+(?:\n[^\n*#1-9]+)?)", sec_podcast, re.I)
    pod_hook = clean_str(pod_hook_match.group(1)) if pod_hook_match else (sec_podcast[:250] if sec_podcast else f"Why this crisis signals a historic turning point in human-machine coordination.")

    pod_qs = []
    for line in sec_podcast.split('\n'):
        m_num = re.match(r'^\s*(?:\d+[\.\)]|\*|-)\s+(.*)', line)
        if m_num and "?" in line and not "pitch" in line.lower():
            cleaned_q = re.sub(r'\*+', '', m_num.group(1)).strip()
            pod_qs.append(cleaned_q)
    if len(pod_qs) < 2:
        pod_qs += [
            "Why does the mainstream coverage persistently frame this as a personal failure rather than an architectural trap?",
            "What concrete tactical steps can individuals and institutions take right now to reclaim cognitive autonomy?"
        ]

    return {
        "agency_name": agency.get("agency_name", agency.get("firm_name")),
        "agency_id": agency.get("agency_id", agency.get("firm_id")),
        "specialty": agency.get("agency_specialty", ""),
        "strategic_angle": sec_angle,
        "is_llm_generated": True,
        "llm_model": model_name,
        "raw_llm_output": raw_text,
        "oped_pitch": {
            "title": headline,
            "target_publications": target_pubs,
            "provocative_thesis": thesis,
            "sample_opening": opening,
            "editorial_sections": args[:3],
            "full_oped_text": sec_oped
        },
        "social_campaign": {
            "platform_focus": "X (Twitter) Deep Thread + LinkedIn Thought Leadership + Visual Carousel",
            "hook_post": social_hook,
            "carousel_slides": slides[:4],
            "engagement_question": discussion_q
        },
        "video_pitch": {
            "video_title": video_title,
            "format": "High-Concept Video Essay / Documentary Short",
            "visual_treatment": visual_treatment,
            "cold_open_script": cold_open
        },
        "podcast_pitch": {
            "target_shows": "The Ezra Klein Show, Tech Won't Save Us, Hard Fork, Offline with Jon Favreau, Conversations with Tyler",
            "interview_hook": pod_hook,
            "provocative_questions": pod_qs[:2]
        },
        "produce_catalog": agency.get("produce_catalog", []),
        "full_passage": agency.get("text", "")
    }
