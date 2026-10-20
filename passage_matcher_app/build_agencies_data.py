import json

with open("firms_market_index.json", "r", encoding="utf-8") as f:
    firms = json.load(f)

# Curated agency branding for all 55 media relations companies
AGENCY_METADATA = [
    # Ch 0 / Intro
    {
        "name": "Kipple Dynamics PR & Communications",
        "specialty": "Informational Clutter & Cognitive Entropy",
        "perspective": "Reframes media narratives around mental exhaustion, digital junk mail ('kipple'), and the paralysis caused by notification flood.",
        "target_outlets": ["Wired", "The Atlantic", "Vox", "New York Magazine", "Substack Tech Critics"],
        "pitch_style": "Provocative cultural critique diagnosing modern cognitive overwhelm"
    },
    {
        "name": "Inscrutability Comms & Public Affairs",
        "specialty": "Black-Box Algorithms & Epistemic Opacity",
        "perspective": "Exposes how automated decision engines operate beyond human audit, framing tech policy around accountability gaps and cognitive asymmetries.",
        "target_outlets": ["Financial Times", "Tech Policy Press", "ProPublica", "Lawfare", "The Verge"],
        "pitch_style": "Investigative exposes challenging unaccountable administrative algorithms"
    },
    {
        "name": "Behavioral Preemption Studio",
        "specialty": "Predictive Nudging & Intent Arbitrage",
        "perspective": "Pitches explosive pieces on how digital platforms anticipate, nudge, and pre-program human behavior before conscious intent forms.",
        "target_outlets": ["MIT Technology Review", "Fast Company", "Aeon", "The Guardian Tech"],
        "pitch_style": "Forward-looking psychological analyses of behavioral engineering"
    },
    {
        "name": "Quantified Demos Media Lab",
        "specialty": "Real-Time Telemetry & Metricized Citizenship",
        "perspective": "Exposes how democratic deliberation is being replaced by continuous sentiment polls, telemetry dashboards, and metricized legitimacy.",
        "target_outlets": ["Boston Review", "Politico Magazine", "Democracy Journal", "Nieman Lab"],
        "pitch_style": "Civic-reform essays calling out the reduction of citizenship to telemetry"
    },
    {
        "name": "Surplus Extraction Communications",
        "specialty": "Behavioral Surplus & Attention Monetization",
        "perspective": "Translates complex political economy into viral exposés on how ambient user attention is harvested and financialized without consent.",
        "target_outlets": ["Jacobin", "Current Affairs", "Business Insider", "Noéma Magazine"],
        "pitch_style": "Economic exposés dissecting the monetization of daily human experience"
    },
    {
        "name": "Epistemic Authority Strategy Group",
        "specialty": "Institutional Credentialing & Automated Knowledge",
        "perspective": "Diagnoses how traditional institutional trust and moral consensus are surrendered to automated validation protocols.",
        "target_outlets": ["The Chronicle of Higher Education", "Stanford Social Innovation Review", "Los Angeles Review of Books"],
        "pitch_style": "Intellectual long-form essays on the crisis of institutional authority"
    },
    {
        "name": "Ordinal Ranking Public Relations",
        "specialty": "Social Credit, Metricized Status & Continuous Sorting",
        "perspective": "Critiques how humans are ranked along continuous ordinal scores, framing stories around algorithmic meritocracy and digital caste systems.",
        "target_outlets": ["Harper's Magazine", "The New Republic", "Dissent Magazine", "Slate"],
        "pitch_style": "Hard-hitting cultural critiques of numerical human sorting"
    },
    {
        "name": "Platform Sovereignty Comms",
        "specialty": "Corporate Statecraft & Private Platform Governance",
        "perspective": "Positions tech platforms as modern supranational sovereigns that supersede democratic nation-states and traditional constitutional law.",
        "target_outlets": ["Foreign Affairs", "The Nation", "Columbia Journalism Review", "Wired UK"],
        "pitch_style": "Geopolitical and regulatory essays on multinational platform empires"
    },

    # Ch 1 / Ch 2
    {
        "name": "The Optimization Cartel Media",
        "specialty": "Total Efficiency & Human Capital Auditing",
        "perspective": "Sells counter-narratives exposing how the obsession with total optimization squeezes the joy, idiosyncrasy, and slack out of human life.",
        "target_outlets": ["The New Yorker", "The Baffler", "Bloomberg Businessweek", "Rest of World"],
        "pitch_style": "Wry, devastating critiques of corporate optimization mania"
    },
    {
        "name": "Cold Calculation Comms",
        "specialty": "Technocratic Policy & Affective Neutralization",
        "perspective": "Questions the dogma that cold algorithmic calculation makes better policy decisions than messy, emotional democratic compromise.",
        "target_outlets": ["Public Books", "n+1", "Boston Review", "American Affairs"],
        "pitch_style": "Philosophical op-eds challenging technocratic hubris"
    },
    {
        "name": "Commons Enclosure Strategy Group",
        "specialty": "Digital Enclosures & Privatized Public Goods",
        "perspective": "Advocates for the digital commons, revealing how shared cultural memory and civic spaces are enclosed into proprietary data commodities.",
        "target_outlets": ["In These Times", "Logic(s) Magazine", "OpenDemocracy", "EFF Deeplinks"],
        "pitch_style": "Activist storytelling defending public goods against digital privatization"
    },
    {
        "name": "Ambient Visibility PR",
        "specialty": "Digital Panopticons & Ubiquitous Surveillance",
        "perspective": "Highlights the psychological toll of continuous digital visibility and internalizing compliance under ubiquitous sensor networks.",
        "target_outlets": ["The Intercept", "WIRED", "Vice Motherboard", "The Verge"],
        "pitch_style": "Chilling architectural profiles of modern surveillance capitalism"
    },
    {
        "name": "Monoculture Narrative Labs",
        "specialty": "Algorithmic Homogenization & Standardized Thought",
        "perspective": "Reveals how recommendation algorithms compress culture, architecture, and political thought into bland, predictable monocultures.",
        "target_outlets": ["GQ", "Pitchfork", "The Architectural Review", "Dirt Media"],
        "pitch_style": "Aesthetic and cultural essays on the flattening of modern taste"
    },
    {
        "name": "Categorical Gatekeeping Comms",
        "specialty": "Automated Redlining & Sorting Discrimination",
        "perspective": "Spotlights algorithmic bias, digital redlining, and automated gatekeeping in housing, lending, and employment opportunities.",
        "target_outlets": ["The Markup", "ProPublica", "Washington Post", "ColorLines"],
        "pitch_style": "Data-driven investigative exposés on discriminatory code"
    },
    {
        "name": "Hedonic Nudge Communications",
        "specialty": "Gamified Governance & Invisible Deterrence",
        "perspective": "Pitches intriguing pieces on how civic resistance is neutralized through fun, gamification, and frictionless user experiences.",
        "target_outlets": ["Fast Company", "Real Life Mag", "The Outline", "Techdirt"],
        "pitch_style": "Sharp behavioral essays on subtle digital obedience"
    },
    {
        "name": "Outrage Monetization PR",
        "specialty": "Affective Polarization & Viral Conflict",
        "perspective": "Exposes how social media algorithms intentionally engineer tribal rage because anger produces the highest margin of engagement.",
        "target_outlets": ["The Atlantic", "Substack", "Nieman Reports", "Columbia Journalism Review"],
        "pitch_style": "Media criticism analyzing viral polarization mechanisms"
    },

    # Ch 3 / Ch 4
    {
        "name": "Synthetic Reality Media Group",
        "specialty": "Virtual State of Nature & Mediated Ecology",
        "perspective": "Explores how algorithmic interfaces detach humans from biological ecology, creating an artificial, mediated state of nature.",
        "target_outlets": ["Emergence Magazine", "Orion Magazine", "Aeon", "Cabinet Magazine"],
        "pitch_style": "Ecological and philosophical essays on disconnection from nature"
    },
    {
        "name": "Anxiety Alleviation Communications",
        "specialty": "The Burden of Choice & Algorithmic Surrogacy",
        "perspective": "Pitches empathetic stories on why exhausted consumers surrender decision-making autonomy to recommendation feeds just to reduce anxiety.",
        "target_outlets": ["The Cut", "The New York Times Opinion", "Psyche", "Bustle"],
        "pitch_style": "Relatable psychological essays on decision fatigue and surrendered agency"
    },
    {
        "name": "Digital Covenant Public Affairs",
        "specialty": "Unilateral Terms of Service & Click-Wrap Feudalism",
        "perspective": "Frames user agreements as modern feudal charters where users exchange personal sovereignty for access to digital utilities.",
        "target_outlets": ["Lawfare", "Harvard Law Review Forum", "Wired", "Slate"],
        "pitch_style": "Legal-cultural critiques of unilateral digital adhesion contracts"
    },
    {
        "name": "Synthetic Identity Studio",
        "specialty": "Algorithmic Personas & Manufactured Belonging",
        "perspective": "Examines how algorithmically curated subcultures hand users pre-packaged identities, offering synthetic authenticity at the expense of selfhood.",
        "target_outlets": ["Dazed", "i-D", "The New Yorker Culture Desk", "Substack"],
        "pitch_style": "Subcultural analyses of algorithmic identity construction"
    },
    {
        "name": "Algorithmic Equity Comms",
        "specialty": "Dynamic Pricing & Numerical Welfare Scores",
        "perspective": "Pitches stories exposing how dynamic pricing algorithms and ordinal welfare scores quietly dismantle universal public rights.",
        "target_outlets": ["The American Prospect", "The Nation", "MarketWatch", "In These Times"],
        "pitch_style": "Consumer-protection exposés on dynamic pricing algorithms"
    },
    {
        "name": "Sovereign Platform Relations",
        "specialty": "Monopoly Platforms vs. Democratic Sovereignty",
        "perspective": "Positions conflicts between Big Tech and regulators as sovereign wars over who writes the fundamental laws of society.",
        "target_outlets": ["Foreign Policy", "Politico", "Financial Times", "Le Monde Diplomatique"],
        "pitch_style": "High-stakes geopolitical analysis of platform monopolies"
    },
    {
        "name": "Micro-Targeting & Electoral Strategy",
        "specialty": "Psychographic Profiling & Voter Management",
        "perspective": "Demystifies how political campaigns use machine learning to micro-target fears, suppress turnout, and engineer electoral outcomes.",
        "target_outlets": ["The Guardian", "The New Yorker", "Cook Political Report", "FiveThirtyEight"],
        "pitch_style": "Insiders' look at the machinery of predictive voter engineering"
    },
    {
        "name": "Preemptive Security Media Lab",
        "specialty": "Threat Anticipation & Pre-Crime Buffers",
        "perspective": "Exposes how law enforcement and corporate security use algorithmic ontopower to neutralize dissent and criminalize potentiality.",
        "target_outlets": ["The Intercept", "Truthout", "Coda Story", "Mother Jones"],
        "pitch_style": "Civil-liberties exposés on predictive threat neutralization"
    },
    {
        "name": "Aesthetic Veneer Comms",
        "specialty": "Decorative Consent & The Illusion of Choice",
        "perspective": "Unveils how modern tech interfaces offer the decorative illusion of freedom and user settings to mask complete corporate control.",
        "target_outlets": ["Fast Company Design", "Current Affairs", "Jacobin", "Real Life Mag"],
        "pitch_style": "Interface design teardowns revealing structural control"
    },
    {
        "name": "Outlier Rebellion PR",
        "specialty": "Defiant Nonconformists & Epistemic Diversity",
        "perspective": "Celebrates idiosyncratic humans who break the model, pitching why liberal democracy desperately requires defiant, unclassifiable outliers.",
        "target_outlets": ["The Atlantic", "Wired", "Aeon", "Boston Review", "The Point Magazine"],
        "pitch_style": "Inspiring philosophical essays championing civic nonconformity"
    },
    {
        "name": "Public Reason Media Network",
        "specialty": "Democratic Deliberation vs. Corporate Platform Enclosure",
        "perspective": "Champions public contestability, defending the public square against algorithmically dictated moderation rules.",
        "target_outlets": ["Democracy Journal", "The Nation", "Dissent", "Public Books"],
        "pitch_style": "Democratic manifestos calling for public ownership of digital squares"
    },

    # Ch 5: Classification Economy
    {
        "name": "Intangible Capital Foundry",
        "specialty": "Financialization of Behavioral Data & IP Monopolies",
        "perspective": "Explains to mainstream audiences how Big Tech's trillion-dollar valuations are built on financializing user behavior and patent enclosures.",
        "target_outlets": ["Bloomberg", "Financial Times", "Fortune", "The Economist"],
        "pitch_style": "Sophisticated financial analyses of surveillance assets"
    },
    {
        "name": "Precarity & Dopamine Narrative Lab",
        "specialty": "Algorithmic Precarity & Notification Addictions",
        "perspective": "Analyzes the link between economic precarity in the gig economy and the dopamine volatility engineered into app notification loops.",
        "target_outlets": ["Vox", "Vice", "HuffPost Personal", "Business Insider"],
        "pitch_style": "Human-interest reporting on gig workers and screen addiction"
    },
    {
        "name": "Micro-Celebrity Relations Group",
        "specialty": "Personal Brand Optimization & Follower Extraction",
        "perspective": "Dissects the exhausting reality of the creator economy, where human relationships are converted into metrics and personal brand equity.",
        "target_outlets": ["The New York Times Style Section", "Wired", "Teen Vogue", "Substack"],
        "pitch_style": "Cultural profiles of the psychological cost of influencer culture"
    },
    {
        "name": "Stealth Influence Studio",
        "specialty": "Native Persuasion & Subconscious Advertising",
        "perspective": "Exposes how modern marketing dissolves the line between authentic peer-to-peer conversation and commercial sponsored influence.",
        "target_outlets": ["Adweek", "Digiday", "Fast Company", "The Verge"],
        "pitch_style": "Industry exposés on stealth advertising and dark patterns"
    },
    {
        "name": "Affective Resonance PR",
        "specialty": "Real-Time Mood Steering & Emotional Contagion",
        "perspective": "Alerts the public to how feeds adjust emotional cadence in real time to steer moods toward shopping or political action.",
        "target_outlets": ["MIT Technology Review", "Psyche", "The Atlantic", "Wired"],
        "pitch_style": "Science and psychology reporting on automated emotional modulation"
    },
    {
        "name": "Crisis Exploitation Media Group",
        "specialty": "Disaster Capitalism & Emergency Data Surveillance",
        "perspective": "Pitches investigations into how tech platforms exploit political crises and natural disasters to fast-track intrusive surveillance tools.",
        "target_outlets": ["The Guardian", "The Intercept", "In These Times", "Rolling Stone"],
        "pitch_style": "Hard-hitting investigative reporting on crisis opportunism"
    },
    {
        "name": "Literalism Comms Bureau",
        "specialty": "Machine-Readable Classification vs. Poetic Nuance",
        "perspective": "Defends the richness of human poetry and metaphor against the flattening demand that all language be structured as machine-readable tokens.",
        "target_outlets": ["The Paris Review Daily", "Literary Hub", "Los Angeles Review of Books", "The Point"],
        "pitch_style": "Literary essays defending poetic ambiguity against binary algorithms"
    },
    {
        "name": "Spiritual Metricization Studio",
        "specialty": "Quantifying the Human Soul & Secularized Divinity",
        "perspective": "Provocatively investigates the tech industry's hubristic effort to reduce spirituality, love, and consciousness to neurological parameters.",
        "target_outlets": ["Plough Quarterly", "The Atlantic", "Aeon", "Tikkun"],
        "pitch_style": "Philosophical and existential essays on tech's spiritual hubris"
    },
    {
        "name": "Surface Pattern PR",
        "specialty": "Statistical Correlation vs. Deep Meaning",
        "perspective": "Critiques machine learning's blind reliance on correlation over causality, showing why surface patterns create devastating blind spots.",
        "target_outlets": ["Undark Magazine", "Nautilus", "Stanford Social Innovation Review", "The Verge"],
        "pitch_style": "Science-critical essays exposing the limits of big data pattern matching"
    },
    {
        "name": "Contemplation Tax Media Network",
        "specialty": "The Economic War on Idle Time & Reflection",
        "perspective": "Frames reflection, day-dreaming, and unmonetized contemplation as the ultimate form of modern civil rebellion against productivity mandates.",
        "target_outlets": ["The New York Times", "The Guardian", "The Baffler", "Orion Magazine"],
        "pitch_style": "Lyrical manifestos celebrating the radical value of doing nothing"
    },
    {
        "name": "Tamed Will Communications",
        "specialty": "Taming Human Unpredictability & Behavioral Guardrails",
        "perspective": "Shows how tech infrastructure is designed to domesticate the wildness of human nature into safe, predictable consumer habits.",
        "target_outlets": ["Noéma Magazine", "Boston Review", "American Affairs", "Aeon"],
        "pitch_style": "Sociological deep-dives on the domestication of the modern user"
    },
    {
        "name": "Synthetic Wisdom PR",
        "specialty": "Machine Heuristics vs. Ancestral & Philosophical Wisdom",
        "perspective": "Highlights what is lost when ancient philosophical traditions and intergenerational wisdom are replaced by LLM summary outputs.",
        "target_outlets": ["Commonweal", "The Hedgehog Review", "Psyche", "Los Angeles Times"],
        "pitch_style": "Humanistic essays contrasting real wisdom with synthetic heuristics"
    },
    {
        "name": "Psychic Exhaustion Comms",
        "specialty": "Burnout Economics & Psychic Depletion",
        "perspective": "Connects the epidemic of burnout and despair directly to the mathematical logic of platforms optimizing for maximum psychic load.",
        "target_outlets": ["The New Yorker", "Time Magazine", "Wired", "Vox"],
        "pitch_style": "Empathetic cultural reporting on systemic burnout and psychic load"
    },

    # Ch 6 & 7: Epistemic Rights, Digital Serendipity & Democratic Transformation
    {
        "name": "Solitary Echo Communications",
        "specialty": "Social Atomization & Custom Isolation Realities",
        "perspective": "Exposes how hyper-personalized feeds fragment society into millions of solitary realities, preventing shared facts and solidarity.",
        "target_outlets": ["The Atlantic", "Washington Post", "Columbia Journalism Review", "Dissent"],
        "pitch_style": "Societal diagnosis of hyper-individualized reality bubbles"
    },
    {
        "name": "Cognitive Feedlot Media",
        "specialty": "Industrial Attention Confinement",
        "perspective": "Compares modern digital platforms to industrial feedlots, showing how humans are housed in attention corrals for high-yield data output.",
        "target_outlets": ["Harper's", "Mother Jones", "Jacobin", "Current Affairs"],
        "pitch_style": "Provocative agricultural metaphors revealing tech user exploitation"
    },
    {
        "name": "Environmental Sanitization PR",
        "specialty": "Risk Elimination & Zero-Volatility Conformity",
        "perspective": "Questions the modern obsession with eliminating all social friction and risk, arguing that safety-first algorithms kill human spontaneity.",
        "target_outlets": ["The New York Times Magazine", "Wired", "Reason", "The Point"],
        "pitch_style": "Thought-provoking essays on the stifling cost of total risk reduction"
    },
    {
        "name": "Data Sovereignty Public Affairs",
        "specialty": "Property Rights in Personal Data & Behavioral Title",
        "perspective": "Leads the media charge for personal data property rights, arguing citizens should hold enforceable legal title over their behavioral footprints.",
        "target_outlets": ["Wall Street Journal", "Politico", "Wired", "Tech Policy Press"],
        "pitch_style": "Policy-forward advocacy pieces outlining new property rights regimes"
    },
    {
        "name": "Cognitive Defense Comms",
        "specialty": "Anti-Hallucination Shields & Epistemic Self-Determination",
        "perspective": "Defends human knowers against generative AI distortion, pitching toolkits and frameworks for preserving human cognitive sovereignty.",
        "target_outlets": ["MIT Technology Review", "The Verge", "Noéma", "Fast Company"],
        "pitch_style": "Cutting-edge tech pieces defending human knowledge against synthetic slop"
    },
    {
        "name": "Serendipity & Play PR",
        "specialty": "Radical Unpredictability, Random Collisions & Play",
        "perspective": "Champions joyful unpredictability, anti-efficiency culture, and liberating human play from metricized optimization algorithms.",
        "target_outlets": ["The New Yorker", "Wired", "Fast Company", "Aeon", "Kottke.org"],
        "pitch_style": "Playful, energetic cultural essays on the joy of getting lost online"
    },
    {
        "name": "Algorithmic Literacy Media Group",
        "specialty": "Critical Code Pedagogy & Epistemic Equality",
        "perspective": "Democratizes code literacy, pitching educational curricula that teach ordinary citizens how to deconstruct and question algorithmic models.",
        "target_outlets": ["EdSurge", "Education Week", "The Hechinger Report", "Stanford Magazine"],
        "pitch_style": "Educational-reform features empowering citizens through code literacy"
    },
    {
        "name": "Youth Potentiality Safeguards PR",
        "specialty": "Unprofiled Exploration & The Right-to-Become",
        "perspective": "Fights for the sacred right of young people to explore, make mistakes, and evolve without having their childhood sealed into permanent predictive profiles.",
        "target_outlets": ["The New York Times", "The Atlantic", "Teen Vogue", "Parents Magazine"],
        "pitch_style": "Passionate advocacy pieces defending youth development from predictive profiling"
    },
    {
        "name": "Productive Ambiguity Comms",
        "specialty": "Defending Nuance, Doubt & Anti-Binary Thinking",
        "perspective": "Wages war against algorithmic polarization by writing defenses of nuance, doubt, and embracing contradiction in public debate.",
        "target_outlets": ["The Hedgehog Review", "Boston Review", "Aeon", "Commonweal"],
        "pitch_style": "Reflective philosophical essays celebrating gray areas and epistemic modesty"
    },
    {
        "name": "Deliberative Synthesis Media",
        "specialty": "NLP for Democratic Deliberation & Civic Consensus",
        "perspective": "Shows how natural language processing can be repurposed from engagement farming into constructive deliberative mapping for civic consensus.",
        "target_outlets": ["Nieman Lab", "Tech Policy Press", "Democracy Journal", "Stanford Social Innovation Review"],
        "pitch_style": "Constructive technological solutions showcasing AI as a deliberative bridge"
    },
    {
        "name": "Transformative Civic Narrative Lab",
        "specialty": "Citizen Empowerment & Institutional Renovation",
        "perspective": "Pitches visionary campaigns on how citizens can organize collective power to reclaim technological tools and renovate democratic institutions.",
        "target_outlets": ["The Nation", "In These Times", "Dissent", "Jacobin"],
        "pitch_style": "Actionable, inspiring political commentary on collective democratic reclamation"
    },
    {
        "name": "Tactical Disobedience Media",
        "specialty": "Metric Distortion & Algorithmic Insubordination",
        "perspective": "Provides strategic PR for digital civil disobedience: teaching users how to poison training datasets, confuse trackers, and resist surveillance.",
        "target_outlets": ["Wired", "Vice Motherboard", "The Verge", "Boing Boing"],
        "pitch_style": "Mischievous, tactical guides to everyday algorithmic rebellion"
    },
    {
        "name": "Dialectical Strategy Comms",
        "specialty": "Embracing Contradiction, Irony & Democratic Tension",
        "perspective": "Helps organizations and leaders navigate the inescapable paradoxes of living in an automated world with irony, humor, and courage.",
        "target_outlets": ["Public Books", "n+1", "The Point Magazine", "The Baffler"],
        "pitch_style": "Sophisticated, ironic political essays navigating cultural tensions"
    },
    {
        "name": "Algorithmic Resistance PR",
        "specialty": "Preserving Humanity as an Unsolvable Machine Problem",
        "perspective": "Mounts high-profile intellectual defenses of human unpredictability: reminding the world that humans were never meant to be optimized problems.",
        "target_outlets": ["The Atlantic", "Wired", "Harper's", "The New York Review of Books"],
        "pitch_style": "Grand philosophical manifestos defending human mystery against technical mastery"
    },
    {
        "name": "Constituent Power Media Lab",
        "specialty": "Extraordinary Founding Moments & Democratic Rupture",
        "perspective": "Orchestrates high-impact political campaigns centered on popular constituent sovereignty, civic ruptures, and democratic renewal over technocratic defeatism.",
        "target_outlets": ["The Nation", "Boston Review", "Democracy Journal", "The Guardian"],
        "pitch_style": "Electrifying political calls-to-action on constituent democratic power"
    }
]

# Update firms list with agency metadata
for idx, f in enumerate(firms):
    meta = AGENCY_METADATA[idx]
    f["agency_id"] = f["firm_id"].replace("FIRM", "AGENCY")
    f["agency_name"] = meta["name"]
    f["agency_specialty"] = meta["specialty"]
    f["agency_perspective"] = meta["perspective"]
    f["target_outlets"] = meta["target_outlets"]
    f["pitch_style"] = meta["pitch_style"]

with open("firms_market_index.json", "w", encoding="utf-8") as f:
    json.dump(firms, f, indent=2, ensure_ascii=False)

print(f"Upgraded all {len(firms)} agencies with rich media relations metadata!")
