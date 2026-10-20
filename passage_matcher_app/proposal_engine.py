import re
import hashlib

def extract_query_focus(query_text):
    clean = query_text.strip()
    if not clean:
        return "The Contemporary Crisis", "Technology & Human Agency"
    
    lines = [line.strip() for line in clean.split("\n") if line.strip()]
    first_line = lines[0] if lines else "Current Developments"
    
    # Check if first line looks like a title or headline
    if len(first_line) < 110 and not first_line.endswith("."):
        title_cand = first_line
    else:
        sentences = re.split(r'(?<=[.!?])\s+', clean)
        title_cand = sentences[0][:85] if sentences else clean[:85]
        
    words = [w.strip(".,!?\"'()[]{}") for w in clean.split() if len(w) > 4]
    stop_words = {"about", "there", "their", "which", "would", "could", "should", "these", "those", "where", "while", "being", "through", "people", "because", "between"}
    keywords = [w for w in words if w.lower() not in stop_words]
    top_kws = keywords[:5] if keywords else ["Technology", "Institutions", "Society"]
    topic_summary = " & ".join(top_kws[:3]).title() if top_kws else "The Digital Crisis"
    
    return title_cand, topic_summary


def extract_resonant_quote_or_idea(passage_text):
    """
    Extracts an evocative sentence from the agency's foundational book passage
    to ground the pitch in the author's actual theoretical arguments.
    """
    if not passage_text:
        return "We navigate information overwhelm through an unconscious surrender of our curational autonomy."
    
    sentences = re.split(r'(?<=[.!?])\s+', passage_text)
    # Prefer sentences with rich theoretical keywords
    priorities = ["contract", "kipple", "outlier", "locke", "hobbes", "rousseau", "entropy", "voice", "predict", "model fit", "anomaly", "curation", "anxiety"]
    
    for sent in sentences:
        s_lower = sent.lower()
        if any(p in s_lower for p in priorities) and 50 < len(sent) < 220:
            return sent.strip()
            
    # Fallback to a solid middle sentence
    for sent in sentences[2:8]:
        if 60 < len(sent) < 200:
            return sent.strip()
            
    return sentences[0][:180] if sentences else "Digital systems subtly steer citizens to perform predictably."


def generate_agency_proposal(agency, query_text):
    """
    Generates an imaginative, conceptually grounded media proposal.
    Employs 6 distinct editorial archetypes based on the agency's sector,
    specialty, and passage corpus, completely eliminating repetitive Mad-Libs.
    """
    title_cand, topic_summary = extract_query_focus(query_text)
    
    produce = agency.get("produce_catalog", ["Algorithmic Framework", "Conceptual Model", "Strategic Audit"])
    p1 = produce[0] if produce else "Systemic Mechanism"
    p2 = produce[1] if len(produce) > 1 else "Predictive Model"
    p3 = produce[2] if len(produce) > 2 else "Civic Counterweight"
    
    spec = agency.get("agency_specialty", "Strategic Media Relations")
    perspective = agency.get("agency_perspective", "Structural analysis of algorithmic governance.")
    outlets = agency.get("target_outlets", ["Wired", "The Atlantic", "Substack"])
    outlets_str = ", ".join(outlets[:4])
    
    passage = agency.get("text", "")
    resonant_idea = extract_resonant_quote_or_idea(passage)
    aid = agency.get("agency_id", agency.get("firm_id", "AGENCY-01"))
    
    # Deterministic hash to cycle through 6 distinct rhetorical archetypes
    hash_val = int(hashlib.md5((aid + spec).encode()).hexdigest(), 16)
    archetype_idx = hash_val % 6
    
    # ---------------------------------------------------------
    # ARCHETYPE 0: The Cybernetic & Cognitive Entropy Angle (Kipple / Overwhelm)
    # ---------------------------------------------------------
    if archetype_idx == 0:
        strategic_angle = (
            f"Mainstream commentary treats '{title_cand[:65]}' as an isolated management or lifestyle failure. "
            f"{agency['agency_name']} reframes this story as a classic crisis of information entropy: our devices "
            f"and workflows are designed to maximize cognitive 'kipple' rather than preserve human clarity. "
            f"By introducing '{p1}', we show that burnout is an architectural outcome of the modern attention economy."
        )
        oped_title = f"The Kipple Economy: What '{title_cand[:50]}' Reveals About Information Entropy"
        thesis = (
            f"Behind the headline of '{title_cand[:60]}' lies a profound thermodynamic reality: digital systems "
            f"inevitably generate useless cognitive waste ('kipple') that paralyzes independent thought. "
            f"By confronting this dynamic through {p1} and {p2}, we demonstrate that recovery requires redesigning "
            f"our information architecture, not simply meditating harder."
        )
        sample_opening = (
            f"When Philip K. Dick coined the word 'kipple' in 1968, he meant the useless junk mail, match folders, "
            f"and clutter that multiplies when no one is watching. Today, as '{title_cand[:55]}' dominates our screens, "
            f"we are confronting kipple in its purest digital form. The notifications, alerts, and endless threads are not "
            f"mere noise—they are an aggressive entropic tide eroding our cognitive sovereignty."
        )
        sections = [
            f"1. The Entropy of Everyday Work: Why '{title_cand[:45]}' is fundamentally an informational waste problem.",
            f"2. The Mechanics of {p1}: How platforms leverage cognitive fatigue to deepen reliance on automated filters.",
            f"3. Reclaiming the Mind: Deploying {p3} to build deliberate friction into digital consumption."
        ]
        hook_post = (
            f"We are looking at '{title_cand[:60]}' through completely the wrong lens.\n\n"
            f"It's not just personal burnout. It's the thermodynamic law of digital kipple: systems designed to maximize engagement will always maximize cognitive clutter.\n\n"
            f"Here is why '{p1}' is the missing concept in this entire debate: [THREAD] 👇"
        )
        carousel_slides = [
            f"Slide 1: THE DELUSION — Why self-help fixes for '{title_cand[:40]}' miss the structural trap.",
            f"Slide 2: KIPPLE EXPLAINED — How useless digital clutter relentlessly multiplies in closed systems.",
            f"Slide 3: THE HIDDEN LEVER — Why {p1} and {p2} quiet our anxiety only by increasing our dependence.",
            f"Slide 4: INTENTIONAL FRICTION — Why becoming an 'algorithmic outlier' is the only lasting defense."
        ]
        discussion_q = f"How much of your daily mental exhaustion is genuine productive work vs. fighting off digital kipple?"
        video_title = f"Digital Kipple: The Hidden Architecture Behind {topic_summary}"
        cold_open = (
            f"\"Look at your screen right now. The red badges, the unread threads, the endless river of notifications. "
            f"We're told '{title_cand[:50]}' is our own fault for lacking discipline. But what if the system was engineered "
            f"from day one to drown your willpower in informational clutter? Enter the concept of {p1}.\""
        )
        podcast_hook = f"Why knowledge-economy burnout is an informational architecture crisis, not a personal failure."
        pod_qs = [
            f"How does the concept of '{p1}' completely overturn Silicon Valley's productivity mythology?",
            f"What would an enterprise communication protocol look like if it actively fought information entropy?"
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 1: The Algorithmic Social Contract Angle (Locke / Hobbes / Sovereignty)
    # ---------------------------------------------------------
    elif archetype_idx == 1:
        strategic_angle = (
            f"While standard reporting asks whether '{title_cand[:65]}' is ethical or legal, "
            f"{agency['agency_name']} elevates the discussion to political theory: we have entered an unwritten "
            f"'Algorithmic Contract.' Like Locke's or Hobbes's state of nature, we surrender our curational autonomy "
            f"to recommendation systems in exchange for protection from the terrifying anxiety of choice."
        )
        oped_title = f"The Faustian Curation: Why '{title_cand[:50]}' is a Crisis of the Algorithmic Contract"
        thesis = (
            f"The events surrounding '{title_cand[:60]}' are not an accidental breach of trust; they are the logical "
            f"fruition of our contract with platforms. In exchange for relief from the infinite scroll of information, "
            f"we have allowed {p1} to make us more predictable consumer subjects and compliant citizens."
        )
        sample_opening = (
            f"Political philosophers from Locke to Rousseau posited that rational actors will surrender autonomy in a "
            f"'state of nature' for the security of a commonwealth. In the digital age, as '{title_cand[:55]}' makes clear, "
            f"we have entered an unwritten algorithmic contract. We did not sign on a dotted line, but every click and "
            f"curated feed marks an exchange: our curational independence in return for cognitive comfort."
        )
        sections = [
            f"1. The Terms of Surrender: How '{title_cand[:45]}' reveals the true price of automated curation.",
            f"2. The Illusion of Free Voice: How {p1} transforms authentic thought into tokenized market intelligence.",
            f"3. Renegotiating the Contract: Restoring democratic legitimacy through {p3} and public accountability."
        ]
        hook_post = (
            f"You never signed a terms of service that said you would trade your democratic agency for an easier news feed.\n\n"
            f"Yet '{title_cand[:60]}' proves that is exactly what has happened. We are living under an 'Algorithmic Contract'.\n\n"
            f"Here is what Locke, Hobbes, and {p1} teach us about this crisis: [THREAD] 🧵"
        )
        carousel_slides = [
            f"Slide 1: THE THOUGHT EXPERIMENT — Why social contract theory explains modern tech monopolies.",
            f"Slide 2: THE ANXIETY TRADEOFF — How curational overload makes us willingly submit to {p1}.",
            f"Slide 3: PREDICTABLE SUBJECTS — Why platforms must reduce human variance to train {p2}.",
            f"Slide 4: CITIZEN VS. USER — Reclaiming the right to remain un-optimized and unpredictable."
        ]
        discussion_q = f"What part of your own decision-making have you happily outsourced to an algorithm this week?"
        video_title = f"The Algorithmic Contract: The Secret Political Philosophy Behind {topic_summary}"
        cold_open = (
            f"\"In 1651, Thomas Hobbes warned that without a sovereign, life would be nasty, brutish, and short. "
            f"In 2026, without a recommendation algorithm, life on the internet is simply overwhelming. "
            f"When we look at '{title_cand[:50]}', we are seeing the modern sovereign flex its muscles: {p1}.\""
        )
        podcast_hook = f"Why our relationship with Big Tech is best understood as an unwritten, authoritarian social contract."
        pod_qs = [
            f"In what ways does '{p1}' function exactly like a modern Hobbesian Leviathan?",
            f"If citizens want to break or renegotiate the algorithmic contract, what leverage do we actually possess?"
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 2: The Machine Learning & Outlier Angle (Model Fitting / Deviance)
    # ---------------------------------------------------------
    elif archetype_idx == 2:
        strategic_angle = (
            f"Conventional coverage views '{title_cand[:65]}' as a glitch or bias problem. "
            f"{agency['agency_name']} connects this directly to core data science: the relentless drive to 'reduce the cost "
            f"function' by smoothing out statistical outliers. In modern society, independent human beings are the outliers "
            f"that predictive models are engineered to suppress."
        )
        oped_title = f"The Outlier's Dilemma: How '{title_cand[:50]}' Exposes the Tyranny of Model Fitting"
        thesis = (
            f"Machine learning optimizes systems by penalizing nonconforming data points. As '{title_cand[:60]}' reveals, "
            f"our cultural and political institutions are now governed by the same mathematical logic: individuals are subtly "
            f"coerced through {p1} to 'fit the model,' eroding the very idiosyncrasies that sustain a healthy democracy."
        )
        sample_opening = (
            f"In supervised machine learning, an outlier is a nuisance. If you curve the regression line to accommodate it, "
            f"you overfit your training data; if you ignore it, your predictions are flawed. What we are witnessing with "
            f"'{title_cand[:55]}' is the migration of this statistical dogma into human culture. Society itself is being "
            f"regularized, and anyone who refuses to fit the predictive pattern is treated as an error to be corrected."
        )
        sections = [
            f"1. The Statistical Smoothing of Human Life: Why '{title_cand[:45]}' is a model-fitting crisis.",
            f"2. The Machinery of {p1}: How {p2} subtly penalizes cultural and political nonconformity.",
            f"3. The Epistemological Outlier: Why liberal democracy depends on people who refuse to fit the curve."
        ]
        hook_post = (
            f"In data science, an 'outlier' is something you eliminate to improve model fit.\n\n"
            f"In liberal democracy, an outlier is someone who comes up with a breakthrough idea.\n\n"
            f"'{title_cand[:60]}' is what happens when machine learning values replace civic values. Let's unpack: 👇"
        )
        carousel_slides = [
            f"Slide 1: THE DATA METAPHOR — How predictive algorithms treat human idiosyncrasy as 'noise'.",
            f"Slide 2: CURVING THE LINE — Why platforms deploy {p1} to force conformity into like-minded clusters.",
            f"Slide 3: THE COST FUNCTION OF CIVIC LIFE — What happens when everyone strives to fit the model.",
            f"Slide 4: REMAIN AN ALGORITHMIC PROBLEM — Why defiant unpredictability is an act of democratic resistance."
        ]
        discussion_q = f"Where in your life or work do you feel the strongest pressure to 'fit the predictive model'?"
        video_title = f"The Outlier Penalty: Why AI Systems Are Engineering Human Conformity in {topic_summary}"
        cold_open = (
            f"\"Every data scientist knows the rule: penalize the outliers to minimize the loss function. "
            f"Now look at '{title_cand[:50]}'. You aren't just looking at software—you're looking at a world that is "
            f"actively sanding down the rough edges of human individuality using {p1}.\""
        )
        podcast_hook = f"Why remaining an 'algorithmic problem' and defying model fitting is essential for democratic survival."
        pod_qs = [
            f"How does the mathematics of '{p1}' penalize genuine creativity and intellectual independence?",
            f"Can an AI-driven society still tolerate people who refuse to be predicted?"
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 3: The Political Economy & Voice vs. Thought Angle (Attention Rents / Bot Networks)
    # ---------------------------------------------------------
    elif archetype_idx == 3:
        strategic_angle = (
            f"Mainstream analysts treat '{title_cand[:65]}' as an issue of free speech or online incivility. "
            f"{agency['agency_name']} exposes the underlying economic incentive: platforms monetize 'voice' (immediate, "
            f"visceral reaction) because 'thought' (slow, reflective deliberation) generates zero ad inventory. "
            f"Through '{p1}', speech has been tokenized into speculative financial assets."
        )
        oped_title = f"Voice Without Thought: The Dark Monetization Engine Behind '{title_cand[:50]}'"
        thesis = (
            f"The chaos documented in '{title_cand[:60]}' is not a failure of moderation; it is the deliberate outcome "
            f"of an economic engine that commodifies reactive expression. By privileging voice over reflection via {p1}, "
            f"platforms extract behavioral surplus while converting public discourse into an automated bot ecosystem."
        )
        sample_opening = (
            f"The average person speaks roughly 16,000 words a day. In the early days of the web, this was celebrated as the "
            f"democratization of voice. But as '{title_cand[:55]}' demonstrates, an economic system that treats voice as a "
            f"monetizable commodity must constantly stimulate more of it. Reflection is unprofitable; outrage is billable. "
            f"We have built a digital commons where everyone must speak, but no one has time to think."
        )
        sections = [
            f"1. The Extraction of Voice: Why '{title_cand[:45]}' is driven by behavioral inventory quotas.",
            f"2. The Tokenization of Opinion: How {p1} and {p2} transform human affect into predictive assets.",
            f"3. Reviving Slow Deliberation: Structural counter-measures to decouple communication from engagement metrics."
        ]
        hook_post = (
            f"The internet didn't break our democracy because of bad ideas. It broke because 'voice' is profitable and 'thought' is not.\n\n"
            f"'{title_cand[:60]}' is a masterclass in how {p1} turns our most primal reactions into corporate balance sheets.\n\n"
            f"Here is the economic breakdown that PR firms won't tell you: [THREAD] 📉"
        )
        carousel_slides = [
            f"Slide 1: THE COMMODITY TRAP — Why human expression was tokenized into an attention market.",
            f"Slide 2: VOICE VS. THOUGHT — Why platforms incentivize instant reaction and punish deliberation.",
            f"Slide 3: THE SYNTHETIC ILLUSION — How bot networks and {p1} manufacture artificial consensus.",
            f"Slide 4: DE-COMMODIFYING DISCOURSE — Why reclaiming public life requires disconnecting speech from ad clicks."
        ]
        discussion_q = f"Do social platforms make you feel like you are expressing yourself, or just performing for an algorithm?"
        video_title = f"The Attention Monopoly: How {p1} Turned Speech Into Raw Material"
        cold_open = (
            f"\"If you speak 16,000 words today, who owns the value of that expression? "
            f"'{title_cand[:50]}' isn't about public debate—it's about an industrial extraction machine that takes your voice, "
            f"turns it into training tokens, and sells it back to you via {p1}.\""
        )
        podcast_hook = f"How the commodification of human expression created an ecosystem where reflection cannot survive."
        pod_qs = [
            f"Why is '{p1}' economically incompatible with traditional democratic deliberation?",
            f"How much of what we think is public sentiment on '{topic_summary}' is actually automated engagement harvesting?"
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 4: The Surveillance & Manufactured Paranoia Angle (Ring Cameras / Anomaly Detection)
    # ---------------------------------------------------------
    elif archetype_idx == 4:
        strategic_angle = (
            f"While standard reporting frames '{title_cand[:65]}' through consumer utility or physical security, "
            f"{agency['agency_name']} investigates the psychological architecture of 'personal anomaly detection.' "
            f"By turning ordinary citizens into automated neighborhood watchmen via '{p1}', digital systems cultivate "
            f"a perpetual state of low-grade suburban paranoia."
        )
        oped_title = f"The Panoptic Porch: How '{title_cand[:50]}' Turns Anxiety Into an Operating System"
        thesis = (
            f"The deployment of {p1} in stories like '{title_cand[:60]}' reveals a darker civic shift: we are being "
            f"trained to view every un-optimized event or unfamiliar stranger as a menacing anomaly. In exchange for the "
            f"illusion of safety, we have dismantled the spontaneous trust that makes urban life possible."
        )
        sample_opening = (
            f"Walk through an American suburb today, and you will see dozens of small black lenses blinking on front doors. "
            f"The phenomenon surrounding '{title_cand[:55]}' is part of the same quiet revolution. We have installed "
            f"personal anomaly detectors in our homes and our feeds, training algorithmic scanners to alert us to every minor "
            f"deviation from the norm. The result is not greater safety, but an engineered epidemic of fear."
        )
        sections = [
            f"1. The Anomaly Detection Complex: Why '{title_cand[:45]}' cultivates an economy of ambient suspicion.",
            f"2. The Feedback Loop of Fear: How {p1} and {p2} amplify threat perception for platform stickiness.",
            f"3. Restoring Civic Grace: Why living with unpredictability is essential for a free society."
        ]
        hook_post = (
            f"We traded neighborly trust for personal anomaly detectors, and now everyone looks like a threat.\n\n"
            f"'{title_cand[:60]}' isn't just about security or tech efficiency—it's about how {p1} monetizes paranoia.\n\n"
            f"The sociological breakdown of what is happening to our communities: [THREAD] 🚨"
        )
        carousel_slides = [
            f"Slide 1: THE ILLUSION OF SAFETY — How automated alerts manufacture constant low-grade dread.",
            f"Slide 2: ANOMALY AS ENEMY — How {p1} reframes any unexpected behavior as an imminent danger.",
            f"Slide 3: THE PRIVATE SURVEILLANCE COMMONS — Why platforms crowdsource social control to users.",
            f"Slide 4: EMBRACING THE UNCLASSIFIED — Why civil society requires tolerating the unfamiliar."
        ]
        discussion_q = f"Has smart tech in your neighborhood or workplace made you feel safer, or just more suspicious?"
        video_title = f"The Paranoia Machine: What '{title_cand[:45]}' Tells Us About Digital Telemetry"
        cold_open = (
            f"\"Motion detected at front door. Notification sent. Pulse spikes. "
            f"Stories like '{title_cand[:50]}' are not isolated incidents—they are part of an operating system that feeds on "
            f"your anxiety. And the core engine making billions off that dread is {p1}.\""
        )
        podcast_hook = f"Why personal surveillance and algorithmic anomaly detection are eroding community solidarity."
        pod_qs = [
            f"How does the logic of '{p1}' turn ordinary citizens into uncompensated surveillance operatives?",
            f"Can we rebuild social trust while remaining tethered to automated risk-scoring systems?"
        ]

    # ---------------------------------------------------------
    # ARCHETYPE 5: The Technofeudalism & Algorithmic Rent Angle (Digital Fiefdoms)
    # ---------------------------------------------------------
    else:
        strategic_angle = (
            f"While traditional media covers '{title_cand[:65]}' as standard antitrust or corporate competition, "
            f"{agency['agency_name']} reframes this as the consolidation of 'technofeudalism.' "
            f"Platforms no longer operate within capitalist markets—they are the market, extracting algorithmic rents "
            f"from every transaction and interaction through proprietary controls like '{p1}'."
        )
        oped_title = f"The New Digital Fiefdoms: Why '{title_cand[:50]}' Signals the End of Open Markets"
        thesis = (
            f"The development highlighted in '{title_cand[:60]}' is not competition at work; it is rentier enclosure. "
            f"By weaponizing {p1} and {p2}, cloud conglomerates have subordinated traditional commerce and civic life "
            f"under proprietary algorithmic gatekeepers that operate with quasi-governmental power."
        )
        sample_opening = (
            f"In a feudal economy, lords did not produce goods; they controlled the land, extracting rents from everyone "
            f"who wished to farm it. Today, as '{title_cand[:55]}' demonstrates, cloud infrastructure and platform gatekeepers "
            f"occupy that exact structural position. We are no longer operating in free markets of goods or ideas; we are "
            f"serfs paying digital tithes to private algorithmic landlords."
        )
        sections = [
            f"1. Enclosing the Digital Commons: Why '{title_cand[:45]}' represents platform rentierism.",
            f"2. The Extraction Mechanism: How {p1} locks users, workers, and publishers into proprietary fiefdoms.",
            f"3. Digital Public Infrastructure: Alternative models to reclaim sovereignty from platform lords."
        ]
        hook_post = (
            f"Stop calling it 'Big Tech'. Start calling it what it actually is: Technofeudalism.\n\n"
            f"'{title_cand[:60]}' is not free enterprise competing fairly—it is a private digital fiefdom collecting rent.\n\n"
            f"Here is why {p1} changes the economic rules forever: [THREAD] 🏰"
        )
        carousel_slides = [
            f"Slide 1: THE MARKET IS DEAD — Why cloud platforms are no longer capitalist firms, but closed territories.",
            f"Slide 2: ALGORITHMIC RENTS — How {p1} imposes an invisible tax on every human interaction.",
            f"Slide 3: LOCK-IN AND SUBMISSION — Why opting out has been made deliberately economically impossible.",
            f"Slide 4: PUBLIC DIGITAL COMMONS — How municipal and democratic infrastructure can break the fiefdoms."
        ]
        discussion_q = f"Which tech platform feels less like a service you choose and more like a utility you are forced to pay?"
        video_title = f"Technofeudalism: How {p1} Replaced the Free Market"
        cold_open = (
            f"\"Think you live in a market economy? Look at '{title_cand[:50]}'. "
            f"When a handful of platform landlords own the digital earth beneath your feet, you aren't a consumer with choice—"
            f"you are a serf tilling data for {p1}. Let's look at the balance sheets.\" "
        )
        podcast_hook = f"Why platform monopolies are turning capitalism into a new form of digital feudalism."
        pod_qs = [
            f"How does '{p1}' allow platforms to extract rents rather than creating genuine economic value?",
            f"What would antitrust look like if it was built to dismantle digital fiefdoms rather than just price-fixing?"
        ]

    return {
        "agency_name": agency.get("agency_name", agency.get("firm_name")),
        "agency_id": aid,
        "specialty": spec,
        "strategic_angle": strategic_angle,
        "is_llm_generated": False,
        "llm_model": "Heuristic Framing Engine",
        "oped_pitch": {
            "title": oped_title,
            "target_publications": outlets_str,
            "provocative_thesis": thesis,
            "sample_opening": sample_opening,
            "editorial_sections": sections,
            "full_oped_text": f"PROPOSED HEADLINE:\n{oped_title}\n\nTARGET PUBLICATIONS:\n{outlets_str}\n\nPROVOCATIVE THESIS:\n{thesis}\n\nSAMPLE OPENING PARAGRAPH:\n{sample_opening}\n\nEDITORIAL OUTLINE:\n  • {sections[0]}\n  • {sections[1]}\n  • {sections[2]}"
        },
        "social_campaign": {
            "platform_focus": "X (Twitter) Deep Thread + LinkedIn Thought Leadership + Instagram/Visual Carousel",
            "hook_post": hook_post,
            "carousel_slides": carousel_slides,
            "engagement_question": discussion_q
        },
        "video_pitch": {
            "video_title": video_title,
            "format": "8-12 Minute High-Production YouTube Video Essay / Documentary Short",
            "visual_treatment": "High-contrast visual essay blending archival footage, terminal interfaces, and cinematic split-screens set to ambient electronic score.",
            "cold_open_script": cold_open
        },
        "podcast_pitch": {
            "target_shows": "The Ezra Klein Show, Tech Won't Save Us, Hard Fork, Offline with Jon Favreau, Conversations with Tyler",
            "interview_hook": podcast_hook,
            "provocative_questions": pod_qs
        },
        "produce_catalog": produce,
        "whitepaper_excerpt": agency.get("executive_summary", resonant_idea),
        "full_passage": passage
    }


def format_proposal_as_text(proposal):
    """
    Renders the complete agency proposal in clean, publication-ready text format.
    Safely iterates through any list without assuming fixed array indices.
    """
    p = proposal
    op = p.get("oped_pitch", {})
    soc = p.get("social_campaign", {})
    vid = p.get("video_pitch", {})
    pod = p.get("podcast_pitch", {})
    
    border_main = "=" * 78
    border_sub = "-" * 78
    
    llm_badge = f" [AI Drafted by {p.get('llm_model', 'Local LLM')}]" if p.get("is_llm_generated") else " [Strategic Framing Draft]"
    lines = [
        border_main,
        f"MEDIA RELATIONS CAMPAIGN PROPOSAL: {p.get('agency_name', 'AGENCY').upper()} [{p.get('agency_id', 'ID')}]{llm_badge}",
        f"Specialty: {p.get('specialty', 'Media Relations')}",
        border_main,
        "",
        "[*] STRATEGIC MEDIA ANGLE & REFRAMING:",
        p.get('strategic_angle', 'No strategic angle provided.'),
        "",
        border_sub,
        "1. LONG-FORM BLOG POST & OP-ED PITCH",
        f"Headline: {op.get('title', 'Op-Ed Title')}",
        f"Target Publications: {op.get('target_publications', 'Wired, The Atlantic')}",
        "",
        "Provocative Core Thesis & Strategy:",
        op.get('provocative_thesis', ''),
        "",
    ]
    
    if op.get("sample_opening"):
        lines.extend([
            "Sample Introductory Paragraph:",
            op['sample_opening'],
            ""
        ])
        
    editorial_sections = op.get("editorial_sections", [])
    if editorial_sections:
        lines.append("Editorial Outline & Arguments:")
        for section in editorial_sections:
            lines.append(f"  • {section}")
        lines.append("")
        
    lines.extend([
        border_sub,
        "2. MULTI-PLATFORM VIRAL SOCIAL MEDIA CAMPAIGN",
        f"Platform Focus: {soc.get('platform_focus', 'X / LinkedIn')}",
        "",
        "Opening Hook Post:",
        soc.get('hook_post', ''),
        "",
    ])
    
    carousel_slides = soc.get("carousel_slides", [])
    if carousel_slides:
        lines.append("Visual Carousel & Thread Breakdown:")
        for slide in carousel_slides:
            lines.append(f"  • {slide}")
        lines.append("")
        
    if soc.get("engagement_question"):
        lines.extend([
            "Audience Engagement Trigger:",
            f"\"{soc['engagement_question']}\"",
            ""
        ])
        
    lines.extend([
        border_sub,
        "3. VIDEO & MULTIMEDIA EXPLAINER CONCEPT",
        f"Video Title: {vid.get('video_title', 'Video Essay')}",
        f"Format: {vid.get('format', 'Video Essay Short')}",
        f"Visual Treatment & Aesthetic Cues: {vid.get('visual_treatment', '')}",
        "",
        "Cold Open Script:",
        vid.get('cold_open_script', ''),
        "",
        border_sub,
        "4. PODCAST & BROADCAST INTERVIEW HOOK",
        f"Target Shows: {pod.get('target_shows', 'The Ezra Klein Show')}",
        f"Pitch Angle: {pod.get('interview_hook', '')}",
        ""
    ])
    
    pod_qs = pod.get("provocative_questions", [])
    if pod_qs:
        lines.append("Key Questions for Host:")
        for idx, q in enumerate(pod_qs, 1):
            lines.append(f"  {idx}. {q}")
        lines.append("")
        
    lines.extend([
        border_sub,
        "5. FOUNDATIONAL INTELLECTUAL WHITEPAPER (~1,000 Words)",
        f"Research Basis: {p.get('agency_name', 'Agency')} Theoretical Corpus",
        border_main,
        "",
        p.get('full_passage', '')
    ])
    
    return "\n".join(lines)
