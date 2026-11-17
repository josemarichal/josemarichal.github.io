import re
import hashlib


def extract_query_focus(query_text):
    clean = query_text.strip()
    if not clean:
        return "Untitled Research Notes", "Technology & Democratic Agency", ["Algorithms", "Institutions", "Society"]

    lines = [line.strip() for line in clean.split("\n") if line.strip()]
    first_line = lines[0] if lines else "Research Snippet"

    # Check if first line looks like a title or heading
    if len(first_line) < 110 and not first_line.endswith("."):
        title_cand = first_line
    else:
        sentences = re.split(r'(?<=[.!?])\s+', clean)
        title_cand = sentences[0][:85] if sentences else clean[:85]

    words = [w.strip(".,!?\"'()[]{}:;") for w in clean.split() if len(w) > 4]
    stop_words = {
        "about", "there", "their", "which", "would", "could", "should", "these",
        "those", "where", "while", "being", "through", "people", "because",
        "between", "under", "using", "other", "notes", "class", "reading", "readings"
    }
    seen = set()
    keywords = []
    for w in words:
        wl = w.lower()
        if wl not in stop_words and wl.isalpha() and wl not in seen:
            seen.add(wl)
            keywords.append(w.title())
    top_kws = keywords[:5] if keywords else ["Technology", "Institutions", "Society"]
    topic_summary = " & ".join(top_kws[:3])

    return title_cand, topic_summary, top_kws


def extract_resonant_quote_or_idea(passage_text):
    """
    Extracts an evocative sentence from the book section
    to ground the research expansion in the author's actual theoretical arguments.
    """
    if not passage_text:
        return "We navigate information overwhelm through an unconscious surrender of our curational autonomy."

    sentences = re.split(r'(?<=[.!?])\s+', passage_text)
    priorities = [
        "contract", "kipple", "outlier", "locke", "hobbes", "rousseau",
        "entropy", "voice", "predict", "model fit", "anomaly", "curation", "anxiety"
    ]

    for sent in sentences:
        s_lower = sent.lower()
        if any(p in s_lower for p in priorities) and 50 < len(sent) < 220:
            return sent.strip()

    for sent in sentences[2:8]:
        if 60 < len(sent) < 200:
            return sent.strip()

    return sentences[0][:180] if sentences else "Digital systems subtly steer citizens to perform predictably."


def _suggest_journals(agency, topic_summary):
    """Suggests academic journals blending the section's domain with the snippet's themes."""
    base_map = {
        "Wired": "Big Data & Society",
        "The Atlantic": "Perspectives on Politics",
        "The New Yorker": "Theory, Culture & Society",
        "MIT Technology Review": "Science, Technology, & Human Values",
        "The Verge": "New Media & Society",
        "Substack": "Engaging Science, Technology, and Society",
        "Noema Magazine": "Philosophy & Technology",
        "Boston Review": "Politics & Society",
        "The Baffler": "Science as Culture",
        "Rest of World": "Surveillance & Society",
    }
    raw_outlets = agency.get("target_outlets", [])
    academic = []
    for o in raw_outlets:
        mapped = base_map.get(o, o)
        if mapped not in academic:
            academic.append(mapped)

    t_lower = topic_summary.lower()
    if any(k in t_lower for k in ["race", "racial", "segregat", "justice", "colorblind"]):
        for j in ["Big Data & Society", "New Media & Society", "Perspectives on Politics"]:
            if j not in academic:
                academic.insert(0, j)
    elif any(k in t_lower for k in ["camera", "flock", "surveill", "police", "alpr"]):
        for j in ["Surveillance & Society", "Law & Society Review", "Journal of Information Technology & Politics"]:
            if j not in academic:
                academic.insert(0, j)
    elif any(k in t_lower for k in ["data", "center", "energy", "water", "climate", "grid"]):
        for j in ["Energy Research & Social Science", "Environmental Humanities", "Science, Technology, & Human Values"]:
            if j not in academic:
                academic.insert(0, j)

    if not academic:
        academic = ["Science, Technology, & Human Values", "Big Data & Society", "Perspectives on Politics"]
    return ", ".join(academic[:4])


def generate_agency_proposal(agency, query_text):
    """
    Generates a structured Research Expansion Proposal that merges a book section
    from *You Must Become an Algorithmic Problem* with the themes in the user's
    submitted notes/snippet. Employs 6 distinct theoretical/methodological archetypes.
    """
    title_cand, topic_summary, top_kws = extract_query_focus(query_text)
    kw1 = top_kws[0] if len(top_kws) > 0 else "Political Agency"
    kw2 = top_kws[1] if len(top_kws) > 1 else "Institutional Power"
    kw3 = top_kws[2] if len(top_kws) > 2 else "Democratic Norms"

    produce = agency.get("produce_catalog", ["Algorithmic Legibility", "Model Fit", "Socio-Technical Contract"])
    p1 = produce[0] if produce else "Algorithmic Legibility"
    p2 = produce[1] if len(produce) > 1 else "Predictive Model Fit"
    p3 = produce[2] if len(produce) > 2 else "Curational Autonomy"

    spec = agency.get("agency_specialty", "Socio-Technical Theory")
    chapter = agency.get("chapter", "Book Section")
    journals_str = _suggest_journals(agency, query_text)

    passage = agency.get("text", "")
    resonant_idea = extract_resonant_quote_or_idea(passage)
    aid = agency.get("agency_id", agency.get("firm_id", "SEC-01"))
    section_name = agency.get("agency_name", agency.get("firm_name", "Book Section"))

    hash_val = int(hashlib.md5((aid + spec).encode()).hexdigest(), 16)
    archetype_idx = hash_val % 6

    # ---------------------------------------------------------
    # ARCHETYPE 0: Cognitive Entropy, Kipple & Institutional Overload
    # ---------------------------------------------------------
    if archetype_idx == 0:
        strategic_angle = (
            f"Merge '{chapter}' ({p1}) with your notes on '{title_cand[:55]}' by theorizing how information entropy "
            f"and cognitive 'kipple' reshape {kw1.lower()} and {kw2.lower()}. Rather than treating {kw1.lower()} solely "
            f"as a discursive or institutional debate, this expansion examines how sensory and administrative overload "
            f"induces citizens and institutions to outsource judgment to automated filters."
        )
        paper_title = f"Entropy and {kw1}: Extending '{p1}' into {topic_summary}"
        synthesis_thesis = (
            f"Combining the book's concept of '{p1}' with {topic_summary} reveals that actors facing high informational "
            f"friction accept automated sorting not out of ideological consensus, but to escape cognitive overwhelm—quietly "
            f"restructuring {kw2.lower()} and {kw3.lower()} in the process."
        )
        research_gap = (
            f"Existing scholarship on {topic_summary} rarely accounts for the thermodynamic/attentional mechanics of "
            f"digital environments; pairing it with '{resonant_idea}' bridges micro-level cognitive fatigue and macro-level "
            f"institutional power."
        )
        paper_outline = [
            f"1. Theoretical Bridge: Importing '{p1}' and digital kipple into debates over {kw1} and {kw2}.",
            f"2. Mechanism Analysis: How {p2} converts everyday informational clutter into silent compliance around {title_cand[:45]}.",
            f"3. Institutional & Democratic Payoff: Designing deliberate friction ({p3}) to restore public deliberation."
        ]
        bridging_moves = [
            f"Map '{p1}' onto {kw1}: Identify where actors in your notes trade autonomy for reduced cognitive/administrative load.",
            f"Trace '{p2}' inside {kw2}: Show which forms of noise or complexity are amplified versus filtered out.",
            f"Locate the 'Kipple' Trap: Explain how proliferating dashboards, metrics, or feeds crowd out {kw3.lower()}." ,
            f"Counter-Design ({p3}): Specify what slow, analog, or high-friction democratic practices resist this drift."
        ]
        research_questions = [
            f"Under what conditions does informational overload lead communities dealing with {kw1.lower()} to accept automated governance?",
            f"How does '{p1}' interact with existing power asymmetries in {kw2.lower()}?"
        ]
        case_strategy = (
            f"Comparative case study pairing two settings from your notes on '{title_cand[:45]}': one high-automation "
            f"environment and one deliberative/analog counter-example."
        )
        methodology = "Qualitative discourse & document analysis (policy memos, meeting transcripts, platform interfaces) coded for friction vs. delegation."
        abstract_draft = (
            f"This paper extends the socio-technical framework of '{chapter}' into the domain of {topic_summary}. "
            f"Drawing on the concept of '{p1}', we argue that contemporary shifts in {kw1.lower()} and {kw2.lower()} "
            f"cannot be understood solely through formal rules or actor preferences. Instead, informational entropy "
            f"pressures citizens and decision-makers to surrender curational autonomy to predictive systems. "
            f"By analyzing {title_cand[:60]}, this study demonstrates how institutionalizing '{p3}' offers a pathway "
            f"to preserve democratic agency."
        )
        next_steps = [
            f"Pull 3–5 concrete empirical examples from your '{title_cand[:35]}' notes that illustrate cognitive/administrative delegation.",
            f"Pair the book's kipple/entropy framing with 2 foundational citations from {topic_summary} literature.",
            f"Draft a 500-word conference abstract targeting a panel on {kw1} and Algorithmic Governance."
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 1: The Socio-Technical Contract & Democratic Sovereignty
    # ---------------------------------------------------------
    elif archetype_idx == 1:
        strategic_angle = (
            f"Use '{chapter}' to reframe your notes on '{title_cand[:55]}' as a crisis of the unwritten Socio-Technical Contract. "
            f"Just as social contract theory asks what citizens surrender for security, this expansion asks what {kw1.lower()} "
            f"and {kw2.lower()} surrender to computational systems in exchange for reduced uncertainty."
        )
        paper_title = f"Renegotiating the Contract: {p1}, {kw1}, and {kw2}"
        synthesis_thesis = (
            f"Applying the book's Algorithmic Contract framework to {topic_summary} shows that technical systems do not merely "
            f"mediate {kw1.lower()}—they establish pre-political terms of participation that bypass traditional democratic consent."
        )
        research_gap = (
            f"Normative political theory and {topic_summary} scholarship often treat technology as an external tool; "
            f"integrating '{p1}' reveals the hidden contractual bargain reshaping {kw2.lower()} and {kw3.lower()}."
        )
        paper_outline = [
            f"1. The Unwritten Bargain: Extending Locke/Hobbes and '{p1}' to {topic_summary}.",
            f"2. Asymmetric Terms: How {p2} redistributes authority and accountability in {kw1.lower()} contexts.",
            f"3. Renegotiation: Institutional mechanisms to restore democratic voice and '{p3}'."
        ]
        bridging_moves = [
            f"Define the 'State of Nature' in {kw1}: What anxiety or coordination failure makes automated governance attractive?",
            f"Specify the Tradeoff ({p1}): What local knowledge, discretion, or {kw2.lower()} is surrendered?",
            f"Identify the Sovereign ({p2}): Who sets the objective function—platforms, vendors, or municipal/state actors?",
            f"Draft Contract Reforms ({p3}): What contestatory rights or opt-out architectures would renegotiate the terms?"
        ]
        research_questions = [
            f"What implicit 'anxiety-for-autonomy' bargain underpins technological adoption in {topic_summary}?",
            f"How can communities contest the terms of '{p1}' when infrastructure is privately owned?"
        ]
        case_strategy = (
            f"Institutional and normative analysis of procurement contracts, public debates, or governance frameworks "
            f"referenced in your notes on '{title_cand[:45]}'."
        )
        methodology = "Interpretive policy analysis + normative political theory synthesis examining public records, vendor claims, and theoretical texts."
        abstract_draft = (
            f"How do algorithmic systems alter the terms of democratic consent in {topic_summary}? Extending the "
            f"socio-technical contract theory developed in '{chapter}', this paper argues that the adoption of {p1} "
            f"in {kw1.lower()} creates an unwritten bargain: actors gain relief from complexity while ceding interpretive "
            f"authority over {kw2.lower()}. Through an examination of {title_cand[:60]}, we show how renegotiating this "
            f"contract requires moving beyond transparency toward enforceable contestability ({p3})."
        )
        next_steps = [
            f"Map the key stakeholders in your '{title_cand[:35]}' notes onto 'citizen/subject' vs. 'algorithmic sovereign' roles.",
            f"Contrast the book's Lockean/Hobbesian contract framing with the core theorists in your notes.",
            f"Identify one concrete policy or governance venue where the contract is currently being contested."
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 2: Statistical Outliers, Model Fit & Marginalization
    # ---------------------------------------------------------
    elif archetype_idx == 2:
        strategic_angle = (
            f"Connect the book's machine-learning critique—that systems penalize statistical outliers to improve 'model fit'—directly "
            f"to your notes on '{title_cand[:55]}'. This expansion asks who gets classified as an 'algorithmic problem' "
            f"within {kw1.lower()} and {kw2.lower()}, and what democratic capacity is lost when deviance is smoothed out."
        )
        paper_title = f"Who Counts as an Outlier? Model Fit, {kw1}, and the Politics of {kw2}"
        synthesis_thesis = (
            f"When predictive systems optimize to reduce cost functions, marginalized or nonconforming practices in {topic_summary} "
            f"are treated as noise to be corrected—turning '{p1}' into a mechanism of political and social stratification."
        )
        research_gap = (
            f"While {topic_summary} documents disparate outcomes, merging it with '{p1}' and '{p2}' explains the "
            f"mathematical logic by which systems systematically penalize idiosyncrasy and dissent."
        )
        paper_outline = [
            f"1. The Epistemology of Model Fit: Why optimization regimes in '{chapter}' fear outliers.",
            f"2. Stratifying {kw1}: How {p1} and {p2} operationalize normality in {title_cand[:45]}.",
            f"3. Defending the Outlier: Why protecting '{p3}' is essential for democratic innovation and {kw3.lower()}."
        ]
        bridging_moves = [
            f"Locate the 'Cost Function': What is the system in your notes trying to optimize or predict?",
            f"Name the Outlier ({p1}): Which groups, arguments, or behaviors in {kw1.lower()} resist clean classification?",
            f"Trace the Penalty ({p2}): How does failing to 'fit the model' translate into exclusion, surveillance, or erasure?",
            f"Value the Anomaly ({p3}): Show why those exact outliers carry vital epistemic and democratic insight."
        ]
        research_questions = [
            f"How do classification systems in {topic_summary} convert political or cultural difference into statistical error?",
            f"What institutional protections allow actors in {kw2.lower()} to remain 'algorithmic problems' without severe penalty?"
        ]
        case_strategy = (
            f"Empirical audit or comparative case study of classification/scoring practices in {topic_summary}, "
            f"contrasting standardized metrics against outlier lived experiences."
        )
        methodology = "Mixed-methods: algorithmic/document audit paired with qualitative coding of outlier/dissenting cases."
        abstract_draft = (
            f"Machine learning systems improve predictive accuracy by minimizing variance and smoothing out statistical outliers. "
            f"This paper merges that insight from '{chapter}' with scholarship on {topic_summary} to examine how '{p1}' "
            f"reshapes {kw1.lower()} and {kw2.lower()}. Focusing on {title_cand[:60]}, we demonstrate that efforts to enforce "
            f"'{p2}' disproportionately penalize non-standard civic actors, eroding the epistemic diversity required for {kw3.lower()}."
        )
        next_steps = [
            f"List 2–3 concrete 'outliers' or nonconforming actors from your '{title_cand[:35]}' notes.",
            f"Specify how 'model fit' operates metaphorically or literally in that empirical domain.",
            f"Target a special issue or journal bridging critical data studies and {kw1.lower()}."
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 3: Legibility, Resistance & Hidden Transcripts
    # ---------------------------------------------------------
    elif archetype_idx == 3:
        strategic_angle = (
            f"Bridge '{chapter}' with your notes on '{title_cand[:55]}' through the politics of legibility and refusal. "
            f"Just as states make populations legible to govern them, platforms demand formatted legibility—and your notes "
            f"point toward how communities in {kw1.lower()} and {kw2.lower()} resist, evade, or counter-frame that gaze."
        )
        paper_title = f"Refusing Legibility: {p1}, Resistance, and {topic_summary}"
        synthesis_thesis = (
            f"Synthesizing the book's critique of '{p1}' with {topic_summary} uncovers a repertoire of 'algorithmic aversion' "
            f"and counter-public practices through which actors preserve autonomy despite pressure to conform to {p2}."
        )
        research_gap = (
            f"Studies of resistance in {kw1.lower()} often focus on overt protest; pairing them with '{p1}' highlights "
            f"everyday opacity, obfuscation, and hidden transcripts against computational legibility."
        )
        paper_outline = [
            f"1. Seeing Like an Algorithm: Extending legibility theory and '{p1}' to {kw1.lower()}.",
            f"2. Formats of Compliance: How {p2} solicits self-formatting in {title_cand[:45]}.",
            f"3. Counter-Publics & Refusal: Reclaiming '{p3}' and strategic illegibility in {kw2.lower()}."
        ]
        bridging_moves = [
            f"Identify the Legibility Demand ({p1}): How must actors in your notes format themselves to be seen or heard?",
            f"Spot Self-Formatting ({p2}): Where do participants alter behavior or rhetoric to satisfy ranking/filtering rules?",
            f"Uncover Hidden Transcripts: What oppositional practices in {kw1.lower()} operate below or against the metric?",
            f"Theorize Collective Refusal ({p3}): How can individual evasion scale into organized {kw3.lower()}?"
        ]
        research_questions = [
            f"What tactics do communities in {topic_summary} use to evade or subvert demands for '{p1}'?",
            f"When does strategic illegibility strengthen {kw2.lower()}, and when does it risk political invisibility?"
        ]
        case_strategy = (
            f"Ethnographic, archival, or discourse-analytic study of grassroots/counter-public resistance strategies "
            f"within '{title_cand[:45]}'."
        )
        methodology = "Qualitative thematic coding of community testimonies, oppositional texts, and digital/analog refusal practices."
        abstract_draft = (
            f"Contemporary platforms and administrative systems govern by demanding continuous, standardized legibility. "
            f"Bringing '{chapter}' into dialogue with {topic_summary}, this article investigates how actors navigating "
            f"{kw1.lower()} confront '{p1}'. Through an analysis of {title_cand[:60]}, we identify how '{p2}' induces "
            f"anticipatory conformity—and document emerging strategies of refusal and '{p3}' that sustain {kw2.lower()}."
        )
        next_steps = [
            f"Connect the book's legibility argument to resistance theorists (e.g., James C. Scott, Robin Kelley) if present in your notes.",
            f"Catalog 3–4 concrete refusal or counter-framing tactics from '{title_cand[:35]}'.",
            f"Outline an empirical section comparing compliant vs. 'problematic' actors."
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 4: Inviolate Personality, Play & Normative Redesign
    # ---------------------------------------------------------
    elif archetype_idx == 4:
        strategic_angle = (
            f"Use the constructive normative core of '{chapter}'—protecting 'inviolate personality,' play, and human potentiality—to "
            f"generate a positive reform agenda for your notes on '{title_cand[:55]}'. Instead of stopping at critique, "
            f"this expansion asks what {kw1.lower()} and {kw2.lower()} would look like if designed for flourishing rather than prediction."
        )
        paper_title = f"Beyond Optimization: {p3}, Play, and the Future of {topic_summary}"
        synthesis_thesis = (
            f"Merging the book's call for '{p3}' with {topic_summary} shifts the normative baseline from 'fairness within "
            f"prediction' to protecting unmeasured potentiality and collective self-determination in {kw1.lower()}."
        )
        research_gap = (
            f"Policy debates in {topic_summary} frequently settle for procedural tweaks; anchoring them in '{p1}' and "
            f"Warren & Brandeis's 'inviolate personality' provides a richer normative standard for {kw2.lower()}."
        )
        paper_outline = [
            f"1. The Limits of Optimization: Why '{p1}' cannot deliver human flourishing in {kw1.lower()}.",
            f"2. Inviolate Personality & Potentiality: Re-reading {title_cand[:45]} through '{p3}'.",
            f"3. Institutional Protections: Concrete design and policy guardrails for {kw2.lower()} and {kw3.lower()}."
        ]
        bridging_moves = [
            f"Diagnose the Narrow Metric ({p1}): What human or civic goods in your notes are excluded by current optimization goals?",
            f"Define 'Inviolate Personality' Here: What spaces in {kw1.lower()} should remain off-limits to scoring or profiling?",
            f"Center Play & Unpredictability ({p3}): How can institutions in {kw2.lower()} reward experimentation over conformity?",
            f"Translate into Policy: Draft 2–3 actionable principles for {kw3.lower()}."
        ]
        research_questions = [
            f"What happens to {kw1.lower()} when we replace predictive efficiency with '{p3}' as our design criterion?",
            f"Which legal or institutional mechanisms best protect 'inviolate personality' in {topic_summary}?"
        ]
        case_strategy = (
            f"Normative-institutional design study evaluating existing policy proposals in '{title_cand[:45]}' against "
            f"the book's three principles for human autonomy."
        )
        methodology = "Normative policy evaluation + comparative institutional analysis of municipal, state, or platform governance models."
        abstract_draft = (
            f"Critiques of {topic_summary} often focus on reducing algorithmic error while leaving the imperative of prediction "
            f"intact. Drawing on '{chapter}', this paper argues that defending {kw1.lower()} requires protecting human "
            f"potentiality and 'inviolate personality' against '{p1}'. Examining {title_cand[:60]}, we propose concrete "
            f"institutional guardrails centered on '{p3}' to revitalize {kw2.lower()}."
        )
        next_steps = [
            f"Extract the normative principles from '{chapter}' and test them against a live policy dilemma in your notes.",
            f"Identify 2 existing regulatory or community proposals in {kw1.lower()} to evaluate.",
            f"Pitch this as a theory-to-policy article or book chapter proposal."
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 5: Technoliberalism, Platform Power & Public Accountability
    # ---------------------------------------------------------
    else:
        strategic_angle = (
            f"Synthesize '{chapter}' with your notes on '{title_cand[:55]}' by foregrounding political economy and "
            f"technoliberalism. This expansion traces how private platform architectures and {p1.lower()} convert "
            f"contested public questions in {kw1.lower()} and {kw2.lower()} into proprietary infrastructural decisions."
        )
        paper_title = f"Technoliberalism and {kw1}: {p1} in {topic_summary}"
        synthesis_thesis = (
            f"Putting the book's critique of technoliberalism into conversation with {topic_summary} demonstrates how "
            f"'{p1}' privatizes public governance—making {kw2.lower()} accountable to market calculation rather than {kw3.lower()}."
        )
        research_gap = (
            f"Scholarship on {topic_summary} often separates technical design from political economy; '{p1}' and '{p2}' "
            f"link infrastructural lock-in directly to democratic accountability deficits."
        )
        paper_outline = [
            f"1. Infrastructural Privatization: How '{p1}' reshapes public authority in {kw1.lower()}.",
            f"2. The Technoliberal Frame: Legitimating {p2} in {title_cand[:45]}.",
            f"3. Public Reclamation: Pathways to democratic oversight and '{p3}' in {kw2.lower()}."
        ]
        bridging_moves = [
            f"Follow the Infrastructure ({p1}): Which private systems or standards mediate {kw1.lower()} in your notes?",
            f"Unpack the Legitimating Story ({p2}): How is efficiency, safety, or convenience used to justify depoliticization?",
            f"Assess Democratic Deficit: Who loses standing or voice in {kw2.lower()} when decisions become proprietary?",
            f"Specify Public Counterweights ({p3}): What state, municipal, or civic governance tools can restore accountability?"
        ]
        research_questions = [
            f"How does '{p1}' shift decision-making authority over {kw1.lower()} from public institutions to private infrastructure?",
            f"What coalition frames enable communities to challenge technoliberal governance in {topic_summary}?"
        ]
        case_strategy = (
            f"Political-economy and framing analysis of a specific public-private interface in '{title_cand[:45]}' "
            f"(e.g., municipal vendor contracts, platform rules, or regulatory hearings)."
        )
        methodology = "Process tracing + frame analysis of public hearings, lobbying disclosures, and technical documentation."
        abstract_draft = (
            f"When public institutions rely on proprietary computational infrastructure, political choices are frequently "
            f"repackaged as neutral optimization. Extending '{chapter}' into {topic_summary}, this paper examines how "
            f"'{p1}' and '{p2}' restructure authority over {kw1.lower()} and {kw2.lower()}. Through an analysis of "
            f"{title_cand[:60]}, we show how rebuilding public accountability around '{p3}' challenges technoliberal lock-in."
        )
        next_steps = [
            f"Identify the primary private/platform actor and public institution in your '{title_cand[:35]}' notes.",
            f"Document the justification frames (safety, efficiency, convenience) used to defend '{p1}'.",
            f"Map potential coalition partners for democratic oversight."
        ]

    return {
        "agency_name": section_name,
        "agency_id": aid,
        "specialty": spec,
        "chapter": chapter,
        "strategic_angle": strategic_angle,
        "is_llm_generated": False,
        "llm_model": "Heuristic Synthesis",
        "research_pitch": {
            "title": paper_title,
            "target_journals": journals_str,
            "synthesis_thesis": synthesis_thesis,
            "research_gap": research_gap,
            "paper_outline": paper_outline,
        },
        "conceptual_bridge": {
            "core_concepts": produce,
            "bridging_moves": bridging_moves,
            "research_questions": research_questions,
        },
        "empirical_design": {
            "case_strategy": case_strategy,
            "methodology": methodology,
            "abstract_draft": abstract_draft,
            "next_steps": next_steps,
        },
        "produce_catalog": produce,
        "full_passage": passage,
    }


def format_proposal_as_text(proposal):
    """
    Renders the complete Research Expansion Proposal in clean, structured text format.
    """
    p = proposal
    rp = p.get("research_pitch", {})
    cb = p.get("conceptual_bridge", {})
    ed = p.get("empirical_design", {})

    border_main = "=" * 78
    border_sub = "-" * 78

    llm_badge = (
        f" [AI Synthesized by {p.get('llm_model', 'Local LLM')}]"
        if p.get("is_llm_generated")
        else " [Heuristic Research Synthesis]"
    )
    lines = [
        border_main,
        f"RESEARCH EXPANSION PROPOSAL: {p.get('agency_name', 'BOOK SECTION').upper()} [{p.get('agency_id', 'ID')}]{llm_badge}",
        f"Book Chapter: {p.get('chapter', 'Book Section')} | Focus: {p.get('specialty', 'Socio-Technical Theory')}",
        border_main,
        "",
        "[*] SYNTHESIS ANGLE (MERGING BOOK SECTION + YOUR NOTES):",
        p.get("strategic_angle", "No synthesis angle provided."),
        "",
        border_sub,
        "1. NEW RESEARCH PAPER / PROJECT PITCH",
        f"Working Title: {rp.get('title', 'Research Paper Title')}",
        f"Target Journals / Venues: {rp.get('target_journals', 'Big Data & Society, Perspectives on Politics')}",
        "",
        "Core Synthesis Thesis:",
        rp.get("synthesis_thesis", ""),
        "",
        "Research Gap & Theoretical Payoff:",
        rp.get("research_gap", ""),
        "",
    ]

    outline = rp.get("paper_outline", [])
    if outline:
        lines.append("Proposed 3-Part Paper / Chapter Outline:")
        for sec in outline:
            lines.append(f"  • {sec}")
        lines.append("")

    lines.extend([
        border_sub,
        "2. CONCEPTUAL & THEORETICAL BRIDGE",
        f"Book Concepts Used: {', '.join(cb.get('core_concepts', p.get('produce_catalog', [])))}",
        "",
    ])

    moves = cb.get("bridging_moves", [])
    if moves:
        lines.append("4-Step Analytical Bridge:")
        for m in moves:
            lines.append(f"  • {m}")
        lines.append("")

    rqs = cb.get("research_questions", [])
    if rqs:
        lines.append("Guiding Research Questions:")
        for idx, q in enumerate(rqs, 1):
            lines.append(f"  {idx}. {q}")
        lines.append("")

    lines.extend([
        border_sub,
        "3. EMPIRICAL DESIGN, ABSTRACT & NEXT STEPS",
        f"Empirical Case Strategy: {ed.get('case_strategy', '')}",
        f"Methodology: {ed.get('methodology', '')}",
        "",
        "Draft Abstract / CFP Pitch:",
        ed.get("abstract_draft", ""),
        "",
    ])

    steps = ed.get("next_steps", [])
    if steps:
        lines.append("Immediate Next Steps:")
        for idx, st in enumerate(steps, 1):
            lines.append(f"  {idx}. {st}")
        lines.append("")

    lines.extend([
        border_sub,
        "4. ORIGINAL BOOK SECTION SOURCE TEXT",
        f"Source: {p.get('chapter', 'You Must Become an Algorithmic Problem')}",
        border_main,
        "",
        p.get("full_passage", ""),
    ])

    return "\n".join(lines)
