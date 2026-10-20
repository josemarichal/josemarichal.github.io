import json
import re
from extract_corpus import extract_raw_pages, PDF_SOURCE, CHAPTER_MAP

with open("raw_55_passages.json", "r", encoding="utf-8") as f:
    passages = json.load(f)

# Extract raw pages for chapter mapping
page_recs = extract_raw_pages(PDF_SOURCE)

# Curated firm names, goals, and produce tailored to each passage's themes
FIRM_TEMPLATES = [
    # Ch 0 / Intro
    ("Kipple Dynamics Ltd.", "To monopolize the management of informational clutter and cognitive entropy in post-industrial society.", ["Synthetic Kipple", "Informational Waste Management", "Deckard's Entropy Model", "Technological Decay Mitigation"]),
    ("Algorithmic Inscrutability Corp", "To engineer opaque algorithmic decision systems that transcend human cognitive audit.", ["Black Box Logic Systems", "Cognitive Asymmetry Engines", "Inscrutability Protocols", "Administrative Obfuscation"]),
    ("Behavioral Preemption Labs", "To commercialize predictive human modeling before conscious intent materializes.", ["Preemptive Behavioral Triggers", "Sub-perceptual Nudges", "Anticipatory Governance", "Intent Arbitrage"]),
    ("The Quantified Demos Group", "To convert democratic deliberation into continuous, metricized telemetry feeds.", ["Telemetry Polling Units", "Real-time Sentiment Extraction", "Quantified Citizenship", "Metricized Legitimacy"]),
    ("Surplus Optimization Ventures", "To extract maximum behavioral surplus from user attention and ambient interaction.", ["Behavioral Extraction Pipelines", "Attention Monetization Assets", "Cognitive Yield Optimization", "Frictionless Capture"]),
    ("Epistemic Capture Partners", "To restructure public institutions around algorithmic verification rather than moral consensus.", ["Epistemic Credentialing", "Automated Knowledge Validation", "Institutional Drift Protocols", "Procedural Authority Filters"]),
    ("The Ordinal Meritocracy Syndicate", "To rank human worth, civic priority, and institutional access along continuous numerical scales.", ["Ordinal Human Sorting", "Merit Ranking Algorithms", "Civic Access Tiers", "Status Commodification"]),
    ("Algorithmic Leviathan Inc.", "To provide private technological scaffolding that supersedes traditional state regulatory capacity.", ["Private Sovereignty Frameworks", "Platform Jurisprudence", "Technocratic Preemption", "Synthetic Social Contracts"]),
    
    # Ch 1 / Ch 2
    ("The Optimization Cartel", "To optimize every human transaction, interaction, and thought for frictionless economic output.", ["Total Optimization Suites", "Frictionless Transaction Modalities", "Sub-optimal Exclusion Filters", "Algorithmic Efficiency Audits"]),
    ("Hyper-Rationality Systems", "To eliminate irrational human emotionality from public policy in favor of pure algorithmic calculation.", ["Cold Rationality Engines", "Affective Damping Protocols", "Technocratic Utility Functions", "Objective Choice Architectures"]),
    ("The Metricized Commons Foundry", "To privatize and parcel out shared cultural and civic goods into trackable data assets.", ["Assetized Public Goods", "Data-Harvested Culture", "Enclosure Metrics", "Tokenized Interaction Rights"]),
    ("Predictive Panopticon Ltd.", "To maintain self-disciplining social order through ambient, ubiquitous digital visibility.", ["Ambient Surveillance Grids", "Panoptic Disciplinary Feeds", "Internalized Compliance Metrics", "Ubiquitous Eye Sensors"]),
    ("Cognitive Monoculture Corp", "To homogenize consumer and voter cognitive patterns to maximize behavioral predictability.", ["Standardized Thought Patterns", "Algorithmic Homogenization", "Variance Reduction Frameworks", "Predictable Habit Units"]),
    ("The Sorting Hat Collective", "To automate categorical segregation in housing, employment, and credit markets.", ["Predictive Risk Classifiers", "Automated Redlining Tools", "Algorithmic Gatekeeping", "Creditworthiness Heuristics"]),
    ("Frictionless Compliance LLC", "To minimize civic resistance by rendering control invisible, smooth, and entertaining.", ["Hedonic Nudge Technology", "Inconspicuous Governance", "Subtle Deterrence Algorithms", "Gamified Civic Duties"]),
    ("The Discontented Citizen Exchange", "To package and monetize political polarization and outrage into viral engagement commodities.", ["Outrage Fuel Derivatives", "Tribal Polarization Bundles", "Affective Engagement Produce", "Epistemic Tribalism Feeds"]),

    # Ch 3 / Ch 4
    ("Augmented Nature Systems", "To replace unmediated biological reality with an algorithmically curated state of nature.", ["Augmented Environment Feeds", "Synthetic Reality Layers", "Virtual State of Nature", "Perceptual Mediation Engines"]),
    ("The Fisher Choice Exchange", "To relieve individuals from the exhausting burden of moral choice via algorithmic delegation.", ["Toil-of-Choice Alleviation", "Delegated Morality Models", "Algorithmic Surrogacy", "Automated Personal Will"]),
    ("Algorithmic Contract Labs", "To draft, execute, and enforce unilateral digital social contracts without human negotiation.", ["Unilateral Digital Covenants", "Click-Wrap Consent Instruments", "Asymmetrical Sovereignty Deeds", "Enforceable Digital Feudalism"]),
    ("Identity Formation Capital", "To mass-produce algorithmic identities and deliver them to users as synthetic authentic selves.", ["Custom Algorithmic Personas", "Targeted Subculture Identities", "Synthetic Authenticity", "Echo-Chamber Belonging"]),
    ("Ordinal Justice Holdings", "To substitute constitutional justice with continuous, algorithmic ordinal ranking.", ["Algorithmic Equity Scores", "Continuous Priority Ranking", "Dynamic Access Pricing", "Ordinal Welfare Metrics"]),
    ("Big Tech Sovereign Partners", "To broker power between sovereign nation-states and private multinational platform monopolies.", ["Platform Hegemony Instruments", "Cross-Border Regulatory Shields", "Corporate Statecraft Assets", "Private Law Enforcement APIs"]),
    ("Predictive Politics Corp", "To make democratic electoral outcomes fully predictable and manageable through micro-targeting.", ["Electoral Certainty Models", "Psychographic Voter Slices", "Turnout Suppression Scripts", "Predictable Democracy Feeds"]),
    ("Ontopower Preemption Group", "To weaponize algorithmic threat anticipation, neutralizing dissent before it materializes.", ["Ontopower Security Grids", "Preemptive Threat Neutralization", "Noise-to-Signal Defense", "Pre-Crime Behavioral Buffers"]),
    ("Liberal Facade Ventures", "To provide the aesthetic veneer of liberal individual freedom over automated control structures.", ["Illusion-of-Choice Interfaces", "Liberal Aesthetic Veneers", "Decorative Consent Controls", "Subservient Agency Portals"]),
    ("The Democratic Outlier Exchange", "To identify, isolate, and commodify deviant political outliers who resist categorization.", ["Outlier Containment Systems", "Anomaly Arbitrage", "Resistance Tokenization", "Subversive Behavior Buffers"]),
    ("Contested Commons Syndicate", "To intermediate the struggle between democratic public reason and private platform enclosure.", ["Public Reason Arbitrage", "Commons Defensive Shields", "Platform Litigation Toolkits", "Democratic Contestability Layers"]),
    
    # Ch 5: Classification Economy
    ("Intangible Capital Foundry", "To financialize intangible assets, algorithmic patents, and predictive behavioural data.", ["Intangible Valuation Models", "Knowledge Asset Derivatives", "Goodwill Securitization", "Intellectual Monopoly Patents"]),
    ("Platform Anxiety Capital", "To harness the psychological distress of algorithmic precarity to drive user engagement.", ["Precarity Monetization", "Validation-Seeking Loops", "Anxiety Fuel Engines", "Dopamine Volatility Assets"]),
    ("The Influencer Gold Rush Ltd.", "To industrialize micro-celebrity, personal brand optimization, and follower market share.", ["Micro-Celebrity Assembly Lines", "Audience Extraction Units", "Viral Alchemy Protocols", "Personal Brand Valuations"]),
    ("Surreptitious Ad Systems", "To seamlessly blend commercial persuasion with organic interpersonal communication.", ["Subconscious Product Injection", "Conversational Ad Weaving", "Ambient Native Promotion", "Stealth Brand Integration"]),
    ("Affective Engineering Corp", "To modulate human affective states in real time through targeted algorithmic stimulus.", ["Emotional Velocity Shifters", "Sentiment Calibration Feeds", "Real-Time Mood Steering", "Affective Feedback Loops"]),
    ("Stochastic Terror Analytics", "To weaponize unpredictable political disruption to generate massive data collection events.", ["Stochastic Shock Modeling", "Crisis Surveillance Yields", "Chaos Ingestion Algorithms", "Emergency Data Expropriation"]),
    ("The Anti-Metaphor Bureau", "To strip human language of poetic ambiguity, enforcing rigid machine-readable classification.", ["Literalism Enforcers", "Metaphor Neutralization", "Strict Semantic Parsing", "Binary Nuance Excision"]),
    ("Transcendental Engineering LLC", "To reverse-engineer the human soul and divine spark into predictable neurological parameters.", ["Transcendental Neural Maps", "Spiritual Mechanization", "Emersonian Soul Audits", "Secularized Divine Metrics"]),
    ("Anomaly Detection Group", "To replace deep contextual understanding with statistical pattern anomaly detection.", ["Surface Pattern Classifiers", "Context-Free Deviation Alarms", "Statistical Outlier Cages", "Predictive Correlation Tools"]),
    ("Sub-Optimal Human Capital", "To quantify the financial cost of human reflection and contemplation as economic drag.", ["Idle Time Reduction Meters", "Contemplation Tax Models", "Efficiency Deficit Counters", "Restless Output Accelerators"]),
    ("The Human Nature Monopolists", "To tame the unpredictable wildness of human nature into disciplined platform assets.", ["Human Nature Calibrators", "Unpredictability Containment", "Tamed Will Protocols", "Behavioral Guardrails"]),
    ("Algorithmic Wisdom Trust", "To replace ancestral and philosophical wisdom with machine-learned consensus heuristics.", ["Synthetic Heuristic Libraries", "Automated Folklore", "Consensus Wisdom Feeds", "Ersatz Moral Guidance"]),
    ("Burnout Economics Corp", "To calculate the precise threshold of human psychic exhaustion before productivity collapses.", ["Burnout Optimization Meters", "Maximum Psychic Load Limits", "Depletion Curve Analytics", "Fatigue Threshold Extenders"]),
    
    # Ch 6 & 7: Epistemic Rights, Digital Serendipity & Democratic Transformation
    ("Mass Isolation Ventures", "To maintain social atomization, preventing collective solidarity through customized reality feeds.", ["Atomization Architectures", "Solitary Echo Cocoons", "Solidarity Disruption Networks", "Custom Isolation Reality"]),
    ("Factory Farm Human Capital", "To engineer social spaces modeled after industrial confinement agriculture.", ["Cognitive Feedlot Design", "Human Confinement Metrics", "Biomass Yield Maximizers", "Synthetic Nutrition Loops"]),
    ("Risk Reduction Feedlots", "To minimize volatility in consumer and voter cohorts through total environmental control.", ["Volatility Dampeners", "Risk-Zero Enclosures", "Predictable Herd Flow", "Environmental Sanitization"]),
    ("Algorithmic Rights Watch", "To establish legal title and property rights over individual behavioral and biometric data.", ["Data Property Deeds", "Self-Sovereign Identity Tokens", "Behavioral Title Registers", "Auditability Protocols"]),
    ("Epistemic Sovereignty Labs", "To defend human knowers against cognitive distortion by generative artificial intelligence.", ["Epistemic Defensive Shields", "Cognitive Self-Determination", "Truth Verification Oracles", "Anti-Hallucination Firewalls"]),
    ("Digital Serendipity Collective", "To reintroduce productive unpredictability, random collisions, and play into digital spaces.", ["Serendipity Injection Engines", "Playful Collision Portals", "Unplanned Discovery Vectors", "Chance Encounter Generators"]),
    ("Educational Access Partners", "To democratize deep epistemic capabilities through open algorithmic literacy curricula.", ["Algorithmic Literacy Toolkits", "Critical Code Pedagogy", "Epistemic Equality Frameworks", "Public Knowledge Infrastructure"]),
    ("Digital Potentiality Foundry", "To protect the unformed, exploratory potential of young minds from premature data profiling.", ["Potentiality Safe Zones", "Unprofiled Exploratory Sandboxes", "Identity Incubation Shields", "Right-to-Become Assets"]),
    ("Fuzzy Logic Guild", "To wage war against false Boolean certitude by championing productive ambiguity and doubt.", ["Ambiguity Preservation Tools", "Productive Doubt Modulators", "Nuance Defense Algorithms", "Anti-Binary Philosophy Units"]),
    ("Democratic NLP Systems", "To repurpose natural language processing transformers for inclusive civic deliberation.", ["Deliberative Synthesis Models", "Consensus Discovery NLP", "Multi-Voice Aggregators", "Egalitarian Discourse Engines"]),
    ("Transformational Citizenship Inc.", "To rebuild democratic institutions around algorithmic resistance, outliers, and collective flourishing.", ["Civic Empowerment Protocols", "Resistance Architecture Blueprints", "Transformative Commons Instruments", "Democratic Reclamation Assets"]),
    ("Algorithmic Insubordination Corp", "To train citizens in tactical digital disobedience and metric distortion.", ["Metric Camouflage Toolkits", "Algorithmic Insubordination Scripts", "Noise Generation Devices", "Counter-Optimization Assets"]),
    ("The Paradox Collective", "To embrace the inescapable contradictions of human democracy in an automated machine age.", ["Dialectical Governance Models", "Irony Resistance Assets", "Tension Navigation Protocols", "Living Paradox Frameworks"]),
    ("Algorithmic Problem Vanguard", "To preserve humanity as an unresolved, beautiful, unclassifiable problem for machines forever.", ["Unclassifiable Human Seeds", "Incorrigible Mystery Units", "Defiant Ambiguity Anchors", "Ultimate Resistance Software"]),
    ("Constituent Power Foundry", "To unleash constituent power and extraordinary democratic founding moments that transcend algorithmic determinism.", ["Constituent Power Engines", "Extraordinary Founding Moments", "Democratic Renovation Protocols", "Anti-Determinism Blueprints"])
]

firms = []
for idx, p in enumerate(passages[:55]):
    t_name, t_goal, t_produce = FIRM_TEMPLATES[idx]
    
    clean_text = p["text"].replace("\ufffd", "'").replace("  ", " ")
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', clean_text.replace("\n\n", " ")) if s.strip()]
    exec_summary = " ".join(sentences[:2]) if len(sentences) >= 2 else clean_text[:200]
    
    # Page lookup
    snippet = clean_text[:60].strip()
    found_page = None
    for rec in page_recs:
        full_p_text = " ".join(rec["lines"])
        if snippet[:30] in full_p_text:
            found_page = rec["pdf_page"]
            break
            
    assigned_chapter = "Introduction: You Must Remain an Algorithmic Problem"
    if found_page:
        for p_start, c_name in reversed(CHAPTER_MAP):
            if found_page >= (p_start + 1):
                assigned_chapter = c_name
                break

    firms.append({
        "firm_id": f"FIRM-{idx+1:02d}",
        "firm_name": t_name,
        "firm_goal": t_goal,
        "produce_catalog": t_produce,
        "executive_summary": exec_summary,
        "chapter": assigned_chapter,
        "pdf_page": found_page,
        "word_count": p["word_count"],
        "text": clean_text
    })

print(f"Built {len(firms)} fully customized firms!")
with open("firms_market_index.json", "w", encoding="utf-8") as f:
    json.dump(firms, f, indent=2, ensure_ascii=False)
print("Saved to firms_market_index.json")
