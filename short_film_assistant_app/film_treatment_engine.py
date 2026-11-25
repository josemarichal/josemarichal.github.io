"""
Film Treatment & AV Script Generation Engine
Converts each of the 55 book manuscript passages into a genuinely unique,
passage-specific 3-4 minute cinematic video essay treatment, adapting the author's
actual sentences, theorists, and case studies into spoken narration and mapping
each beat to the best MovingImageArchive.com collection and Archive.org soundtrack.
"""

import re
import hashlib

# All 18 Curated Moving Image Archive collections
MIA_COLLECTIONS = {
    "Computers & Interfaces": "https://www.movingimagearchive.com/collections",
    "Small Against Everything": "https://www.movingimagearchive.com/collections",
    "Phones & Communication": "https://www.movingimagearchive.com/collections",
    "Glowing Lines": "https://www.movingimagearchive.com/collections",
    "Cursors": "https://www.movingimagearchive.com/collections",
    "Animated Maps": "https://www.movingimagearchive.com/collections",
    "Robots & Automation": "https://www.movingimagearchive.com/collections",
    "Cameras & Photography": "https://www.movingimagearchive.com/collections",
    "Television & Broadcasting": "https://www.movingimagearchive.com/collections",
    "Machines & Manufacturing": "https://www.movingimagearchive.com/collections",
    "Science & Instruments": "https://www.movingimagearchive.com/collections",
    "Electricity & Electronics": "https://www.movingimagearchive.com/collections",
    "Everyday Inventions": "https://www.movingimagearchive.com/collections",
    "Sound & Recording": "https://www.movingimagearchive.com/collections",
    "Space & Flight": "https://www.movingimagearchive.com/collections",
    "Transport & Navigation": "https://www.movingimagearchive.com/collections",
    "Objects on Black": "https://www.movingimagearchive.com/collections",
    "Typography Over the Ages": "https://www.movingimagearchive.com/collections",
    "Pale Blue Dot": "https://www.movingimagearchive.com/collections",
    "Film Countdowns": "https://www.movingimagearchive.com/collections",
    "Film Grain": "https://www.movingimagearchive.com/collections",
    "Frames": "https://www.movingimagearchive.com/collections",
}

# Thematic visual rules mapping passage keywords to MovingImageArchive collections, visual shots, and search queries
VISUAL_MOTIF_RULES = [
    {
        "keywords": ["camera", "ring", "surveillance", "watch", "police", "policing", "facial recognition", "eye", "panopticon", "suspect", "suspicion", "crime"],
        "collection": "Cameras & Photography",
        "shot_templates": [
            "Extreme close-up of a 16mm camera lens iris contracting; cut to vintage police dispatchers monitoring wall-sized street maps and CCTV monitors.",
            "Archival footage of suburban streets shot from an elevated security vantage point; slow zoom onto front porches and blinking indicator lights.",
        ],
        "queries": "camera lens close-up, surveillance monitor, suburban street, police dispatch, eye blinking"
    },
    {
        "keywords": ["music", "spotify", "song", "sound", "audio", "listen", "radio", "record", "jazz", "acoustic", "voice"],
        "collection": "Sound & Recording",
        "shot_templates": [
            "Close-up of vinyl record grooves spinning under a needle, cutting abruptly to magnetic tape reels and digital audio waveforms on an oscilloscope.",
            "Vintage recording studio engineers adjusting analog mixing dials while a lone listener sits in an acoustic test chamber with headphones.",
        ],
        "queries": "vinyl record spinning, magnetic tape reel, headphones listener, audio waveform, microphone"
    },
    {
        "keywords": ["neural", "gradient descent", "cost function", "weights", "backpropagation", "parameter", "vector", "graph", "node", "edge", "boolean", "fuzzy"],
        "collection": "Glowing Lines",
        "shot_templates": [
            "Luminous green vector lines oscillating against a pitch-black cathode-ray screen, tracing mathematical curves and converging toward a single point.",
            "Abstract geometric wireframes rotating in dark space; rapid cuts to glowing oscilloscope waves flattening into a uniform straight line.",
        ],
        "queries": "oscilloscope green lines, vector graphics, mathematical curve, glowing grid, abstract geometry"
    },
    {
        "keywords": ["brain", "neuron", "lichtman", "protein", "alphafold", "biology", "experiment", "laboratory", "scientist", "psychology", "psychometric", "ocean", "trait"],
        "collection": "Science & Instruments",
        "shot_templates": [
            "Mid-century neuroscientists attaching electrodes and examining illuminated brain cross-sections; cut to laboratory dials and strip-chart recorders.",
            "Microscopic time-lapse of cellular structures juxtaposed with technicians measuring human reaction times in a 1960s behavioral lab.",
        ],
        "queries": "laboratory instruments, brain diagram, microscope, scientist dials, behavioral test"
    },
    {
        "keywords": ["click", "swipe", "scroll", "interface", "app", "screen", "uber", "amazon", "menu", "button", "user", "platform", "filter"],
        "collection": "Cursors",
        "shot_templates": [
            "Macro shot of an early graphical user interface cursor clicking checkboxes and drop-down menus in hypnotic, repetitive succession.",
            "Split-screen of fingers tapping mechanical keys and a pixelated arrow pointer navigating a maze of windows and dialog boxes.",
        ],
        "queries": "computer cursor clicking, early GUI interface, mouse pointer, typing hands"
    },
    {
        "keywords": ["factory", "industrial", "farm", "farming", "assembly", "commodity", "labor", "work", "worker", "extraction", "gold rush", "capital", "rent"],
        "collection": "Machines & Manufacturing",
        "shot_templates": [
            "High-speed industrial assembly line sorting identical products into numbered bins; mechanical arms stamping metal with relentless precision.",
            "1950s automated factory floor where solitary workers monitor rows of synchronized conveyor belts and sorting chutes.",
        ],
        "queries": "industrial assembly line, sorting machine, conveyor belt, factory automation, stamping press"
    },
    {
        "keywords": ["frontier", "manifest destiny", "map", "city", "new york", "border", "state", "global", "territory", "highway", "architecture", "urban"],
        "collection": "Animated Maps",
        "shot_templates": [
            "Vintage animated cartography showing glowing network lines expanding across the American continent and enveloping urban grids.",
            "Aerial flyover of sprawling modernist city blocks and highway interchanges transitioning into an animated diagram of communication nodes.",
        ],
        "queries": "animated map network, aerial city grid, highway interchange, continental expansion"
    },
    {
        "keywords": ["contract", "locke", "hobbes", "rousseau", "kant", "aristotle", "constitution", "law", "rights", "philosophy", "book", "metaphor", "language"],
        "collection": "Typography Over the Ages",
        "shot_templates": [
            "Close-up of hot-metal linotype machines casting lines of text; classical serif title cards dissolving into scrolling digital terms of service.",
            "Archival shots of printing presses, leather-bound treatises, and mechanical typewriters striking paper in sharp rhythmic bursts.",
        ],
        "queries": "printing press, linotype machine, typewriter keys, vintage title card, classical book"
    },
    {
        "keywords": ["kipple", "junk", "clutter", "object", "match", "phone", "dumb phone", "device", "artifact", "non-thing"],
        "collection": "Objects on Black",
        "shot_templates": [
            "Isolated everyday consumer objects—rotary phones, mail stacks, wristwatches, and circuit boards—rotating slowly against a stark black void.",
            "High-contrast tabletop photography of obsolete gadgets and paper clutter accumulating in harsh spotlight against darkness.",
        ],
        "queries": "object on black background, rotating telephone, circuit board, paper stack, vintage gadget"
    },
    {
        "keywords": ["nature", "ecological", "environment", "earth", "water", "energy", "data center", "cooling", "planet", "cosmos", "weber", "disenchantment"],
        "collection": "Pale Blue Dot",
        "shot_templates": [
            "Sweeping 16mm footage of natural forests and rivers cutting abruptly to high-voltage transmission towers and industrial cooling stacks.",
            "View of Earth from high altitude paired with archival footage of hydroelectric dams, power grids, and spinning utility meters.",
        ],
        "queries": "earth from space, transmission towers, power grid, river landscape, industrial cooling"
    },
    {
        "keywords": ["television", "news", "media", "broadcast", "ad", "advertising", "spectacle", "culture", "entertainment", "tiktok", "instagram"],
        "collection": "Television & Broadcasting",
        "shot_templates": [
            "1950s family bathed in the blue glow of a living-room television set while broadcast antennas transmit concentric signal rings into the night sky.",
            "Bank of studio television monitors in a master control room, each screen flashing a different commercial or news anchor simultaneously.",
        ],
        "queries": "family watching television, broadcast tower rings, TV control room monitors, vintage commercial"
    },
    {
        "keywords": ["social media", "twitter", "communicate", "talk", "speech", "conversation", "message", "telegraph", "switchboard", "network"],
        "collection": "Phones & Communication",
        "shot_templates": [
            "Row of mid-century telephone switchboard operators frantically plugging and unplugging cords into a towering honeycomb of jacks.",
            "Signal corps technicians monitoring teletype machines as miles of copper telephone wire stretch across poles toward the horizon.",
        ],
        "queries": "telephone switchboard operators, teletype machine, telegraph wires, communication network"
    },
    {
        "keywords": ["android", "blade runner", "robot", "ai", "artificial intelligence", "automaton", "machine", "replica", "synthetic"],
        "collection": "Robots & Automation",
        "shot_templates": [
            "Retro-futuristic mechanical humanoid automatons and cybernetic prosthetic hands performing delicate human gestures in a laboratory.",
            "Early computer chess machines and mechanical servomotors whirring as researchers observe behind glass partitions.",
        ],
        "queries": "vintage robot, mechanical hand, automaton, cybernetics lab, computer chess"
    },
    {
        "keywords": ["anxiety", "alone", "isolated", "lonely", "crowd", "citizen", "individual", "autonomy", "outlier", "conform", "ordinary", "exhaustion"],
        "collection": "Small Against Everything",
        "shot_templates": [
            "A lone pedestrian standing motionless in the middle of a rushing commuter crowd, dwarfed by monolithic brutalist office towers.",
            "Wide-angle archival shot of a single tiny figure walking across a vast concrete plaza under towering geometric shadows.",
        ],
        "queries": "solitary figure crowd, tiny person brutalist architecture, commuter rush, lone walker"
    },
    {
        "keywords": ["algorithm", "model", "data", "predict", "prediction", "classification", "classify", "sort", "rank", "ordinal", "score", "compute"],
        "collection": "Computers & Interfaces",
        "shot_templates": [
            "IBM mainframe punch-card sorters riffling through thousands of cards per minute while technicians inspect spools of magnetic tape.",
            "Room-sized 1960s computers with blinking control panel lights and spinning tape drives calculating statistical tables.",
        ],
        "queries": "IBM punch card sorter, mainframe computer room, blinking control panel, magnetic tape drive"
    },
]


def clean_manuscript_text(text):
    """
    Cleans OCR spacing artifacts and strips inline academic citations
    like '(Dick 1996, 65)' or '(Hobbes 1967 [1651])' so the text reads naturally aloud.
    """
    if not text:
        return ""
    t = text
    # Fix common OCR split capitals from PDF extraction
    ocr_fixes = [
        (r"\bT o\b", "To"),
        (r"\bT ech", "Tech"),
        (r"\bT witter", "Twitter"),
        (r"\bTikT ok", "TikTok"),
        (r"\bY ork", "York"),
        (r"\bY ou", "You"),
        (r"\bW e\b", "We"),
        (r"\bP olitical", "Political"),
        (r"\b –  ", " — "),
        (r"\b– ", "— "),
    ]
    for pat, repl in ocr_fixes:
        t = re.sub(pat, repl, t)

    # Remove parenthetical author-year citations like (Dick 1996, 65) or (St Aubin and Liedke 2024a)
    t = re.sub(r"\s*\([A-Z][A-Za-z\s,&.\-]+?\d{4}[a-z]?(?:\s*\[\d{4}\])?(?:,\s*\d+(?:–\d+)?)?\)", "", t)
    # Remove standalone section numbers like '111 '
    t = re.sub(r"^\d+\s+", "", t)
    # Collapse multiple spaces
    t = re.sub(r"[ \t]{2,}", " ", t)
    return t.strip()


def split_into_sentences(text):
    """Split cleaned text into well-formed sentences suitable for voiceover, avoiding splits on initials like 'K.' or 'et al.'."""
    # Protect common abbreviations and single-letter initials before splitting
    protected = re.sub(r"\b([A-Z])\.\s+", r"\1<DOT> ", text)
    protected = re.sub(r"\b(et al|vs|Dr|Mr|Ms|Prof|St|U\.S|e\.g|i\.e)\.\s+", r"\1<DOT> ", protected)
    raw_sents = re.split(r"(?<=[.!?])\s+", protected)
    good_sents = []
    for s in raw_sents:
        s_clean = s.replace("<DOT>", ".").strip()
        if len(s_clean) > 28 and not s_clean.isupper():
            good_sents.append(s_clean)
    return good_sents


def pick_best_sentences(sentences, target_words=85, priority_terms=None):
    """
    Selects a coherent sequence of sentences from a slice of the passage,
    aiming for ~75-100 words of punchy spoken narration.
    """
    if not sentences:
        return ""
    if len(sentences) <= 3:
        return " ".join(sentences)

    # Score sentences by presence of priority terms and ideal spoken length
    scored = []
    for idx, s in enumerate(sentences):
        score = 0
        w_count = len(s.split())
        if 10 <= w_count <= 32:
            score += 3
        elif w_count < 45:
            score += 1
        if "?" in s:
            score += 2  # Rhetorical questions work great in video essays
        if priority_terms:
            s_low = s.lower()
            for term in priority_terms:
                if term.lower() in s_low:
                    score += 3
        scored.append((score, idx, s))

    # Pick top sentences but preserve their original narrative order!
    scored.sort(key=lambda x: (-x[0], x[1]))
    chosen_indices = []
    current_words = 0
    for score, idx, s in scored:
        w = len(s.split())
        if current_words + w <= target_words + 25 or len(chosen_indices) < 2:
            chosen_indices.append(idx)
            current_words += w
        if current_words >= target_words and len(chosen_indices) >= 3:
            break

    chosen_indices.sort()
    return " ".join(sentences[i] for i in chosen_indices)


def select_visual_motif_for_beat(beat_text, passage_id, beat_num, used_collections):
    """
    Dynamically selects the best MovingImageArchive collection, visual shot description,
    and search query based on the actual content of the beat.
    Ensures visual variety across the 4 beats so no two consecutive beats repeat the same collection.
    """
    b_low = beat_text.lower()
    best_rule = None
    best_score = -1

    for rule in VISUAL_MOTIF_RULES:
        hits = sum(2 if kw in b_low else 0 for kw in rule["keywords"])
        # Penalize already-used collections to guarantee diverse visual beats across the 4 acts
        if rule["collection"] in used_collections:
            hits -= 3
        if hits > best_score:
            best_score = hits
            best_rule = rule

    if not best_rule or best_score <= 0:
        # Deterministic fallback based on passage_id + beat_num
        h = int(hashlib.md5(f"{passage_id}_{beat_num}".encode()).hexdigest(), 16)
        available = [r for r in VISUAL_MOTIF_RULES if r["collection"] not in used_collections]
        pool = available if available else VISUAL_MOTIF_RULES
        best_rule = pool[h % len(pool)]

    used_collections.add(best_rule["collection"])
    h_shot = int(hashlib.md5(f"{passage_id}_{beat_num}_{beat_text[:30]}".encode()).hexdigest(), 16)
    shot_desc = best_rule["shot_templates"][h_shot % len(best_rule["shot_templates"])]

    # Extract 2 concrete nouns/phrases from the beat text to customize the search query
    words = [w.strip(".,!?\"'()[]{}:;—") for w in beat_text.split()]
    stop = {"the", "and", "that", "this", "with", "from", "have", "what", "when", "where", "which", "their", "there", "about", "would", "could", "should", "these", "those", "into", "more", "than", "they", "them", "were", "been", "being", "through"}
    distinct_terms = []
    for w in words:
        if len(w) >= 5 and w.lower() not in stop and w.isalpha():
            if w.lower() not in [d.lower() for d in distinct_terms]:
                distinct_terms.append(w.lower())
        if len(distinct_terms) >= 2:
            break

    custom_query = best_rule["queries"]
    if distinct_terms:
        custom_query = f"{best_rule['queries']}, {', '.join(distinct_terms)}"

    return best_rule["collection"], shot_desc, custom_query


def select_soundtrack_for_passage(passage_data, style_mode):
    """
    Matches each passage to a specific Internet Archive soundtrack based on its
    chapter, specialty, and emotional register.
    """
    from archive_music import CURATED_ARCHIVE_TRACKS
    raw = (
        passage_data.get("text", "") + " " +
        passage_data.get("agency_specialty", "") + " " +
        " ".join(passage_data.get("produce_catalog", []))
    ).lower()
    fid = passage_data.get("firm_id", "FIRM-01")
    h = int(hashlib.md5((fid + style_mode).encode()).hexdigest(), 16)

    if any(k in raw for k in ["ring", "camera", "surveillance", "policing", "anomaly", "suspicion", "panopticon"]):
        mood = "Dystopian / Cybernetic Drone"
    elif any(k in raw for k in ["market", "hayek", "neoliberal", "uber", "amazon", "capital", "commodity", "rent"]):
        mood = "1950s Industrial / Educational Optimism"
    elif any(k in raw for k in ["romantic", "whitman", "thoreau", "emerson", "solitude", "serendipity", "music", "art", "satie", "beauty"]):
        mood = "Melancholy / Philosophical Solitude"
    else:
        mood = "Investigative / Cold War Tension"

    matching = [t for t in CURATED_ARCHIVE_TRACKS if mood.lower() in t["mood"].lower()]
    chosen = matching[h % len(matching)] if matching else CURATED_ARCHIVE_TRACKS[h % len(CURATED_ARCHIVE_TRACKS)]
    return chosen["mood"], f"{chosen['title']} ({chosen['artist']})", chosen["archive_url"]


def generate_film_treatment(passage_data, style_mode="Adam Curtis Counterpoint"):
    """
    Generates a genuinely unique, passage-specific 4-Act Video Essay Treatment
    directly from the selected book manuscript passage.
    """
    fid = passage_data.get("firm_id", "FIRM-01")
    raw_text = passage_data.get("text", "")
    chapter = passage_data.get("chapter", "The Algorithmic Contract")
    firm_name = passage_data.get("firm_name", "Critical Media Lab")
    specialty = passage_data.get("agency_specialty", "Algorithmic Governance")
    perspective = passage_data.get("agency_perspective", "")
    produce = passage_data.get("produce_catalog", ["The Algorithmic Contract", "Human Agency", "The Outlier", "Democratic Pluralism"])

    c1 = produce[0] if len(produce) > 0 else "The Algorithmic Contract"
    c2 = produce[1] if len(produce) > 1 else "Predictive Optimization"
    c3 = produce[2] if len(produce) > 2 else "Cognitive Autonomy"
    c4 = produce[3] if len(produce) > 3 else "The Outlier Imperative"

    # Clean text and split into sentences
    cleaned = clean_manuscript_text(raw_text)
    # Strip chapter header repetition if present at very start
    if cleaned.startswith(chapter):
        cleaned = cleaned[len(chapter):].strip()

    all_sents = split_into_sentences(cleaned)
    n = len(all_sents)

    # Divide the passage's actual sentences into 4 narrative acts
    if n >= 8:
        q1 = all_sents[0 : max(2, n // 4)]
        q2 = all_sents[max(2, n // 4) : max(4, n // 2)]
        q3 = all_sents[max(4, n // 2) : max(6, (3 * n) // 4)]
        q4 = all_sents[max(6, (3 * n) // 4) :]
    else:
        q1 = all_sents[:2]
        q2 = all_sents[2:4]
        q3 = all_sents[4:6]
        q4 = all_sents[6:]

    # Extract passage-specific narration for each of the 4 acts
    body_1 = pick_best_sentences(q1, target_words=80, priority_terms=[c1, c2])
    body_2 = pick_best_sentences(q2, target_words=90, priority_terms=[c2, c3])
    body_3 = pick_best_sentences(q3, target_words=90, priority_terms=[c3, c4, "algorithm", "model", "predict"])
    body_4 = pick_best_sentences(q4, target_words=85, priority_terms=[c4, c1, "outlier", "democracy", "human"])

    # Apply Director Style Mode framing
    if style_mode == "Vox Visual Explainer":
        title = f"How '{c1}' Secretly Reshapes Your Mind ({fid})"
        logline = f"An investigative visual explainer unpacking {c1} and {c2}—drawn from {chapter}."
        vo_beat_1 = f"Look closely at how we navigate our digital lives today. Focus on a concept I call {c1}. {body_1}"
        vo_beat_2 = f"To understand how we got here, we have to look at the underlying framework of {c2}. {body_2}"
        vo_beat_3 = f"Here is where the mechanism snaps shut: {c3}. {body_3}"
        vo_beat_4 = f"And that leaves us with a critical choice around {c4}. {body_4}"
        act_titles = [
            f"Act I: The Puzzle of {c1} (The Explainer Hook)",
            f"Act II: Mapping {c2} (The Context)",
            f"Act III: Inside {c3} (The Mechanism)",
            f"Act IV: {c4} (The Takeaway)"
        ]
    elif style_mode == "Errol Morris Interrotron":
        title = f"Case File {fid}: {c1} and {c2}"
        logline = f"A forensic philosophical inquiry into {specialty.lower()}, interrogating {c1} and {c3}."
        vo_beat_1 = f"{body_1} That is the central paradox of {c1}."
        vo_beat_2 = f"Consider the logic behind {c2}. {body_2}"
        vo_beat_3 = f"What happens when {c3} becomes the rule rather than the exception? {body_3}"
        vo_beat_4 = f"{body_4} In the end, {c4} is the one variable the model cannot solve."
        act_titles = [
            f"Act I: Exhibit A — {c1}",
            f"Act II: The Premise — {c2}",
            f"Act III: Cross-Examination — {c3}",
            f"Act IV: Closing Verdict — {c4}"
        ]
    elif style_mode == "Poetic Essay Film":
        title = f"Notes on {c1} ({chapter.split(':')[0]})"
        logline = f"A contemplative archival meditation on {c1}, {c2}, and the quiet erosion of human contingency."
        vo_beat_1 = f"{body_1}"
        vo_beat_2 = f"{body_2}"
        vo_beat_3 = f"{body_3}"
        vo_beat_4 = f"{body_4}"
        act_titles = [
            f"Movement I: {c1}",
            f"Movement II: {c2}",
            f"Movement III: {c3}",
            f"Movement IV: {c4}"
        ]
    else:  # Default: Adam Curtis Counterpoint
        title = f"{c1}: A Short Film on {specialty} ({fid})"
        logline = (
            perspective if perspective else
            f"A counter-punctual archival essay examining {c1}, {c2}, and {c3}—adapted from {chapter}."
        )
        vo_beat_1 = f"{body_1}"
        vo_beat_2 = f"But beneath this surface lay a deeper theoretical bargain—what we can trace through {c2}. {body_2}"
        vo_beat_3 = f"Yet this produced a strange and unintended consequence: {c3}. {body_3}"
        vo_beat_4 = f"{body_4} And this is why {c4} remains the essential question of our time."
        act_titles = [
            f"Act I: {c1} (The Disruption)",
            f"Act II: {c2} (The Illusion of Order)",
            f"Act III: {c3} (The Algorithmic Trap)",
            f"Act IV: {c4} (The Democratic Reckoning)"
        ]

    # Build dynamic visual cues and MovingImageArchive mappings for each of the 4 acts
    used_collections = set()
    vo_list = [vo_beat_1, vo_beat_2, vo_beat_3, vo_beat_4]
    timecodes = ["0:00 - 0:45", "0:45 - 1:45", "1:45 - 2:45", "2:45 - 3:45"]
    durations = [45, 60, 60, 60]

    beats = []
    for i in range(4):
        col_name, shot_desc, search_q = select_visual_motif_for_beat(vo_list[i], fid, i + 1, used_collections)
        # Add passage-specific context to the visual cue
        concept_tag = produce[i] if i < len(produce) else c1
        full_cue = f"[{style_mode} — Theme: {concept_tag}] {shot_desc}"
        beats.append({
            "beat_number": i + 1,
            "title": act_titles[i],
            "timecode": timecodes[i],
            "vo_narration": vo_list[i],
            "visual_cue": full_cue,
            "archive_collection": col_name,
            "archive_url": MIA_COLLECTIONS.get(col_name, "https://www.movingimagearchive.com/collections"),
            "search_query": search_q,
            "duration_sec": durations[i]
        })

    # Soundtrack selection
    soundtrack_mood, soundtrack_suggestion, soundtrack_url = select_soundtrack_for_passage(passage_data, style_mode)

    total_words = sum(len(b["vo_narration"].split()) for b in beats)
    est_runtime_min = round(max(1.5, total_words / 135.0), 1)

    # Teleprompter script
    teleprompter_lines = [
        f"FILM TITLE: {title.upper()}",
        f"SOURCE PASSAGE: {fid} — {firm_name} ({chapter})",
        f"DIRECTOR STYLE: {style_mode}",
        f"KEY CONCEPTS: {', '.join(produce)}",
        f"ESTIMATED DELIVERY TIME: ~{est_runtime_min} Minutes ({total_words} Words @ 135 WPM)",
        f"SOUNDTRACK CUE: {soundtrack_suggestion} [Set bed at -18dB]",
        "",
        "======================================================================",
        "[COLD OPEN — FADE IN ARCHIVAL AUDIO & FILM GRAIN]",
        "======================================================================",
        ""
    ]
    for b in beats:
        teleprompter_lines.append(f"--- {b['title'].upper()} ({b['timecode']}) ---")
        teleprompter_lines.append(f"[ARCHIVE VISUAL ({b['archive_collection']}): {b['visual_cue']}]")
        teleprompter_lines.append(f"[SEARCH QUERY: {b['search_query']}]")
        teleprompter_lines.append("")
        teleprompter_lines.append(b["vo_narration"])
        teleprompter_lines.append("")
        teleprompter_lines.append("[BEAT — 1.5 SECOND PAUSE — LET ARCHIVAL FOOTAGE BREATHE]")
        teleprompter_lines.append("")

    teleprompter_lines.extend([
        "======================================================================",
        f"[END CARD: {c1.upper()} — YOU MUST REMAIN AN ALGORITHMIC PROBLEM]",
        "======================================================================"
    ])

    return {
        "firm_id": fid,
        "title": title,
        "logline": logline,
        "chapter": chapter,
        "primary_concept": c1,
        "produce_catalog": produce,
        "style_mode": style_mode,
        "soundtrack_mood": soundtrack_mood,
        "soundtrack_suggestion": soundtrack_suggestion,
        "soundtrack_url": soundtrack_url,
        "total_words": total_words,
        "est_runtime_min": est_runtime_min,
        "beats": beats,
        "teleprompter_text": "\n".join(teleprompter_lines)
    }


def format_treatment_as_markdown(treatment):
    """Format full treatment package as a clean GitHub-flavored Markdown document."""
    md = []
    md.append(f"# 🎬 Video Essay Treatment: {treatment['title']}")
    md.append(f"**Passage ID:** `{treatment.get('firm_id', '')}` | **Source Chapter:** {treatment['chapter']}  ")
    md.append(f"**Director Style:** `{treatment.get('style_mode', 'Adam Curtis Counterpoint')}`  ")
    md.append(f"**Core Concepts:** {', '.join(treatment.get('produce_catalog', []))}  ")
    md.append(f"**Logline:** *{treatment['logline']}*  ")
    md.append(f"**Pacing:** {treatment['total_words']} Words | Estimated Runtime: ~{treatment['est_runtime_min']} Minutes (@ 135 WPM)  ")
    md.append(f"**Recommended Soundtrack:** [{treatment['soundtrack_suggestion']}]({treatment['soundtrack_url']}) (*{treatment['soundtrack_mood']}*)  ")
    md.append("\n---\n")
    md.append("## 🎞️ Two-Column Audio / Visual (AV) Script\n")
    md.append("| Timecode & Scene | Voiceover Narration (Spoken Track) | Visual Cue & Moving Image Archive Search |")
    md.append("| :--- | :--- | :--- |")

    for b in treatment["beats"]:
        clean_vo = b["vo_narration"].replace("\n", " ")
        cue_text = (
            f"**Cue:** {b['visual_cue']}<br><br>"
            f"📂 **Collection:** [{b['archive_collection']}]({b['archive_url']})<br>"
            f"🔍 *Search Query:* `{b['search_query']}`"
        )
        md.append(f"| **{b['title']}**<br>`{b['timecode']}` | {clean_vo} | {cue_text} |")

    md.append("\n---\n")
    md.append("## 🎙️ Teleprompter / Voiceover Delivery Script\n")
    md.append("```text\n" + treatment["teleprompter_text"] + "\n```\n")

    return "\n".join(md)


# ==============================================================================
# OPTIONAL LOCAL LLM (OLLAMA) SCREENPLAY REWRITER
# ==============================================================================
import json
import urllib.request

OLLAMA_BASE_URL = "http://localhost:11434"

def get_available_ollama_models():
    """Returns (is_available, list_of_model_names)"""
    try:
        req = urllib.request.Request(f"{OLLAMA_BASE_URL}/api/tags")
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            models = [m["name"] for m in data.get("models", [])]
            return True, models
    except Exception:
        return False, []


def generate_llm_film_treatment(passage_data, style_mode="Adam Curtis Counterpoint", model="llama3:latest", timeout=90):
    """
    Uses a local Ollama LLM (e.g. llama3, mistral) to write a custom 4-Act video essay
    script from the selected book passage, while preserving MovingImageArchive mappings.
    """
    base_treatment = generate_film_treatment(passage_data, style_mode=style_mode)
    produce_str = ", ".join(passage_data.get("produce_catalog", []))
    chapter = passage_data.get("chapter", "")
    raw_text = clean_manuscript_text(passage_data.get("text", ""))[:1600]
    collections_list = ", ".join(list(MIA_COLLECTIONS.keys())[:14])

    prompt = f"""You are a documentary filmmaker and political theorist adapting a section of Jose Marichal's book manuscript into a 3.5-minute YouTube video essay in the style of: {style_mode}.

BOOK CHAPTER: {chapter}
KEY CONCEPTS IN THIS PASSAGE: {produce_str}

SOURCE MANUSCRIPT PASSAGE:
\"\"\"
{raw_text}
\"\"\"

AVAILABLE MOVING IMAGE ARCHIVE COLLECTIONS:
{collections_list}

Write a 4-Act Video Essay treatment grounded strictly in the specific theorists, examples, and arguments of THIS passage.
Return ONLY valid JSON with this exact structure:
{{
  "title": "Compelling Film Title",
  "logline": "One-sentence philosophical logline",
  "beats": [
    {{
      "title": "Act I: [Scene Title]",
      "vo_narration": "75-95 words of vivid spoken voiceover narration for Act I",
      "visual_cue": "Specific archival 16mm visual shot description",
      "archive_collection": "Exact name of one collection from the list above",
      "search_query": "3-4 comma-separated archival search keywords"
    }},
    {{
      "title": "Act II: [Scene Title]",
      "vo_narration": "75-95 words of spoken voiceover narration for Act II",
      "visual_cue": "Specific archival visual shot description",
      "archive_collection": "Exact name of one collection from the list above",
      "search_query": "3-4 comma-separated archival search keywords"
    }},
    {{
      "title": "Act III: [Scene Title]",
      "vo_narration": "75-95 words of spoken voiceover narration for Act III",
      "visual_cue": "Specific archival visual shot description",
      "archive_collection": "Exact name of one collection from the list above",
      "search_query": "3-4 comma-separated archival search keywords"
    }},
    {{
      "title": "Act IV: [Scene Title]",
      "vo_narration": "75-95 words of spoken voiceover narration for Act IV",
      "visual_cue": "Specific archival visual shot description",
      "archive_collection": "Exact name of one collection from the list above",
      "search_query": "3-4 comma-separated archival search keywords"
    }}
  ]
}}"""

    payload = {
        "model": model,
        "prompt": prompt,
        "format": "json",
        "stream": False,
        "options": {"temperature": 0.75, "num_predict": 1400}
    }
    req = urllib.request.Request(
        f"{OLLAMA_BASE_URL}/api/generate",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        res_data = json.loads(resp.read().decode("utf-8"))
        raw_json = res_data.get("response", "{}")
        parsed = json.loads(raw_json)

    if "beats" in parsed and len(parsed["beats"]) == 4:
        base_treatment["title"] = parsed.get("title", base_treatment["title"])
        base_treatment["logline"] = parsed.get("logline", base_treatment["logline"])
        timecodes = ["0:00 - 0:45", "0:45 - 1:45", "1:45 - 2:45", "2:45 - 3:45"]
        for i, b in enumerate(parsed["beats"]):
            col = b.get("archive_collection", base_treatment["beats"][i]["archive_collection"])
            if col not in MIA_COLLECTIONS:
                col = base_treatment["beats"][i]["archive_collection"]
            base_treatment["beats"][i].update({
                "title": b.get("title", base_treatment["beats"][i]["title"]),
                "timecode": timecodes[i],
                "vo_narration": b.get("vo_narration", base_treatment["beats"][i]["vo_narration"]),
                "visual_cue": b.get("visual_cue", base_treatment["beats"][i]["visual_cue"]),
                "archive_collection": col,
                "archive_url": MIA_COLLECTIONS.get(col, "https://www.movingimagearchive.com/collections"),
                "search_query": b.get("search_query", base_treatment["beats"][i]["search_query"]),
            })
        total_words = sum(len(x["vo_narration"].split()) for x in base_treatment["beats"])
        base_treatment["total_words"] = total_words
        base_treatment["est_runtime_min"] = round(max(1.5, total_words / 135.0), 1)

    return base_treatment
