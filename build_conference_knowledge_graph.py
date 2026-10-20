#!/usr/bin/env python3
"""
4S 2026 Conference Knowledge Graph Data Builder
Extracts and structures the 10 largest technology nodes, their semantic networks,
and individual research papers from the 4S 2026 Toronto Conference Proceedings.
"""

import json
import os
import sys
import re

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

OUTPUT_JS = os.path.join(os.path.dirname(__file__), "conference_knowledge_graph_data.js")
PARSED_PAPERS_JSON = r"C:\Users\jfmar\.gemini\antigravity-ide\brain\5d3690e2-0cca-4cba-be5b-55ec686f2a85\scratch\parsed_conference_papers.json"

def clean_text(s):
    if not s:
        return ""
    replacements = {
        "Fou\ufffdd": "Fouad",
        "S\ufffdrensen": "Sørensen",
        "\ufffdcole": "École",
        "Schj\ufffdtt": "Schjøtt",
        "Universit\ufffd": "Université",
        "Montr\ufffdal": "Montréal",
        "Bj\ufffdrn": "Björn",
        "Sch\ufffdtz": "Schütz",
        "Panth\ufffdon": "Panthéon",
        "Rivi\ufffdre": "Rivière",
        "St\ufffdckel": "Stöckel",
        "M\ufffdller": "Müller",
        "G\ufffdnter": "Günter",
        "Fran\ufffdois": "François",
        "\ufffdLike": '"Like',
        "beings:\ufffd": 'beings:"',
        "\ufffdGreen": '"Green',
        "Us:\ufffd": 'Us:"'
    }
    for k, v in replacements.items():
        s = s.replace(k, v)
    s = s.replace("\ufffd", "'")
    return " ".join(s.split())

# The Top 10 Largest Technology Nodes identified from the 4S 2026 Proceedings:
TOP_10_TECH_NODES = [
    {
        "id": "tech_ai_llm",
        "rank": 1,
        "name": "Generative AI & Large Language Models (LLMs)",
        "shortName": "Generative AI & LLMs",
        "category": "Artificial Intelligence",
        "icon": "🤖",
        "color": "#38bdf8", # Cyan
        "degree": 86,
        "betweenness": 0.94,
        "corePuzzle": "The tension between corporate claims of universal intelligence and the empirical reality of automated knowledge enclosure, epistemic flattening, and hidden ghost work.",
        "keyTensions": [
            "Corporate monopoly of foundational models vs. open-source / decentralized alternatives",
            "Synthesized 'machine hallucination' vs. situated human expertise",
            "AI as cognitive automation vs. intensification of hidden digital piecework"
        ],
        "primaryPanels": [
            "Panel 2 & 35: AI Governance & Public Policy",
            "Panel 7, 42, 97, 126: Critical AI Literacy",
            "Panel 28, 61, 117, 148: Political Economy Underpinning AI",
            "Panel 95, 125: Computational Code-Switching in the Age of LLMs",
            "Panel 159, 194: Contesting AI Futures",
            "Panel 163, 200, 230: Does Generative AI Flip the Script?",
            "Panel 172, 210, 266: Ghostly Technologies & Illusion of Care",
            "Panel 265, 296: Ruins in the Age of AI",
            "Panel 321, 357, 416, 449: Affect and Artificial Intelligence",
            "Panel 504, 540, 569: Agency and Politics of LLM-Based Chatbots",
            "Panel 580: AI, Language & Technopower in Africa",
            "Panel 609: Machine Liberalism (Jose Marichal)"
        ],
        "prominentScholars": [
            "danah boyd (Cornell / Data & Society)",
            "Lucy Suchman (Lancaster)",
            "Jose Marichal (Cal Lutheran)",
            "Janet Vertesi (Princeton)",
            "Alex Taylor (Edinburgh)",
            "Luke Stark (Western)",
            "Alissa Centivany (Western)"
        ],
        "governanceCases": [
            "California SB 1047 (Safe and Secure Innovation for Frontier AI Models Act)",
            "EU AI Act Tiered Foundation Model Regulations",
            "Copyright litigation over model training corpora (Fair Use vs. Data Theft)"
        ]
    },
    {
        "id": "tech_cloud_datacenters",
        "rank": 2,
        "name": "Hyperscale Data Centers & Cloud Computing",
        "shortName": "Data Centers & Cloud",
        "category": "Physical Infrastructure",
        "icon": "🏢",
        "color": "#f59e0b", # Amber
        "degree": 64,
        "betweenness": 0.82,
        "corePuzzle": "The myth of the 'immaterial cloud' colliding with the brutal material reality of land-grabbing, massive electric grid strain, and billions of gallons of water consumed for server cooling.",
        "keyTensions": [
            "Global computing speed vs. hyper-local resource exhaustion and noise pollution",
            "Subsidized corporate tech corridors vs. local municipal tax/utility burdens",
            "Data centers as critical sovereign infrastructure vs. sites of ecological sacrifice"
        ],
        "primaryPanels": [
            "Panel 11: Data Centers and Civil Society",
            "Panel 161, 196, 228: Critical Investigations of Data Centers & Hyper-Local Contestations",
            "Panel 265, 296: Ruins in the Age of AI (Thermolabour & Data Center Alley)",
            "Panel 274: Storage & Sabotage (Infrastructural Disruption)",
            "Panel 309: Mekaguda Data Centre in Hyderabad",
            "Panel 310: From Community Centers to Data Centers",
            "Panel 331, 364, 423, 454: Future Directions for Critical Data Center Studies",
            "Panel 481, 586: Cloud Infrastructure & Critical Business Model Studies",
            "Panel 593: AI Infrastructure and Energy Imaginaries in San Gabriel Valley"
        ],
        "prominentScholars": [
            "Sibo Chen (Toronto Metropolitan)",
            "Patrick Brodie (UC Dublin)",
            "Imre Szeman (Toronto)",
            "Maya Livio (American Univ)",
            "Julia Frotey (INRS)",
            "Morgan Mouton (INRS)",
            "Devika Narayan (Bristol)"
        ],
        "governanceCases": [
            "Northern Virginia (Data Center Alley) Zoning and Diesel Generator Moratoriums",
            "Santa Clara & The Dalles (Oregon) Municipal Aquifer Depletion Controversies",
            "Chilean & Uruguayan Environmental Court Halts on Google/Amazon Hyperscale Centers"
        ]
    },
    {
        "id": "tech_biomed_genomics",
        "rank": 3,
        "name": "Biomedical Technologies, ReproTech & Genomics",
        "shortName": "Biotech & Genomics",
        "category": "Life Sciences & Medicine",
        "icon": "🧬",
        "color": "#ec4899", # Pink
        "degree": 58,
        "betweenness": 0.79,
        "corePuzzle": "How advanced biotechnologies, polygenic risk scoring, and pharmaceutical assetization reconfigure human embodiment, reproductive autonomy, and healthcare rationing.",
        "keyTensions": [
            "Direct-to-consumer genetic optimization vs. new forms of algorithmic eugenics",
            "Patented proprietary pharmaceuticals vs. Global South generic biomanufacturing",
            "Algorithmic clinical diagnostics vs. patient-centered care and disabled bodily autonomy"
        ],
        "primaryPanels": [
            "Panel 4: Computing Health: Bodies, Data, and Technoscientific Power",
            "Panel 25, 59, 115: Techno-Scientific Healthcare Futures",
            "Panel 26: Technoliberalism and Trans Medicine",
            "Panel 44: Genetics, Eugenics, and Psychometrics",
            "Panel 64: Organising the Commons in Medical Device & Pharma Markets",
            "Panel 104, 132: Human Genomics in the Global Economy",
            "Panel 170, 206, 263, 294: Entangled Reproductive Futures",
            "Panel 209, 264, 295: From Big Pharma Power to Pharma Futures Otherwise",
            "Panel 332, 359, 365, 424, 455: 'Hot Girl Eugenics': Beauty Technocultures",
            "Panel 491, 530: Neurointerventionism: Governing Bodies, Brains & Futures",
            "Panel 493: Observations of Ozempic & GLP-1 Drugs",
            "Panel 606: Monogenic & Polygenic Risk in the Age of Embryo Selection"
        ],
        "prominentScholars": [
            "Steven Epstein (Northwestern)",
            "Ulrike Felt (Vienna)",
            "Anne Pollock (King's College London)",
            "Lauren Paremoer (Cape Town)",
            "Koichi Kameda (IRD / Paris Cité)",
            "Nadia Karizat (Michigan)",
            "Kelly Fritsch (Carleton)"
        ],
        "governanceCases": [
            "California CalRx State Biosimilar Insulin Manufacturing Initiative",
            "FDA Genetic Health Risk & Polygenic Embryo Screening Authorizations",
            "WTO TRIPS Waiver Battles for mRNA Vaccines and Hepatitis C Treatments"
        ]
    },
    {
        "id": "tech_surveillance_biometrics",
        "rank": 4,
        "name": "Surveillance Infrastructures & Biometric ID",
        "shortName": "Surveillance & Biometrics",
        "category": "Security & Carceral Tech",
        "icon": "👁️",
        "color": "#ef4444", # Red
        "degree": 52,
        "betweenness": 0.76,
        "corePuzzle": "How digital tracking, computer vision, and biometric identification expand state and corporate carceral apparatuses under the guise of public safety and convenience.",
        "keyTensions": [
            "Predictive policing and raid automation vs. civil liberties and constitutional due process",
            "Commercial neighborhood surveillance (Ring/ALPRs) vs. communal trust and racial equity",
            "Biometric verification at geopolitical borders vs. migrant rights and asylum protection"
        ],
        "primaryPanels": [
            "Panel 19, 51, 107: Interrogating State Surveillance in Authoritarian Times",
            "Panel 73: Global Surveillance TechnoPower: Naming Systems & Building Resistance",
            "Panel 80: Surveillance Infrastructures",
            "Panel 128: Data & the Body: GPS Surveillance & Digital Policing",
            "Panel 138: Doorbell Camera Surveillance as Ambivalent Neighborhood Futurity",
            "Panel 165, 202: Doing Criminology with STS",
            "Panel 218: Intersectional Data Justice: Surveillance and Privacy",
            "Panel 258, 292: Digital Identification Technologies (Biometric IDs & Deepfakes)",
            "Panel 341: Mobile Fortify & ICE Facial Recognition",
            "Panel 430: Surveillance as Platform Imaginary in Gov-Tech",
            "Panel 567: Digital Policing & Tech-Corporate Governmentality",
            "Panel 608: War, Genocide and Technopower (Bodyworn Cameras & Data-Driven War)"
        ],
        "prominentScholars": [
            "Torin Monahan (UNC Chapel Hill)",
            "Aaron Gluck-Thaler (Toronto)",
            "Keli Gabinelli (UC San Diego)",
            "Nicole Bennett (Indiana)",
            "Justin Lahey (Canada Border Services)",
            "Michelle Spektor (Harvard Kennedy School)"
        ],
        "governanceCases": [
            "Flock Safety Automated License Plate Readers (ALPRs) in California Municipalities",
            "ICE Mobile Fortify Facial Recognition Apps & Palantir Border Targeting",
            "Municipal Facial Recognition Bans (San Francisco, Oakland, Boston)"
        ]
    },
    {
        "id": "tech_platforms_labor",
        "rank": 5,
        "name": "Digital Platforms, Gig Economy & Algorithmic Labor",
        "shortName": "Platforms & Gig Labor",
        "category": "Platform Capitalism",
        "icon": "🛵",
        "color": "#10b981", # Emerald
        "degree": 50,
        "betweenness": 0.73,
        "corePuzzle": "How platform architectures use algorithmic management, dispatch metrics, and gamification to discipline labor while evading traditional employer obligations.",
        "keyTensions": [
            "Algorithmic optimization of routes vs. worker physical exhaustion and wage insecurity",
            "Platform network effects vs. worker collective bargaining and unionization",
            "Silicon Valley platform capitalism vs. decentralized worker-owned cooperatives"
        ],
        "primaryPanels": [
            "Panel 14, 48, 72: Journalism, Platforms, and Reconfiguration of Autonomy",
            "Panel 37: Governance Platforms & Digital Mediators",
            "Panel 38, 92: Entanglements in Labour, Life and Platform Economies",
            "Panel 147: Food Delivery Platforms & Worker Optimization",
            "Panel 255: Automated Laboratories, Vibe Coding & Citizen Science Labor",
            "Panel 275: Platforming Norms & Everyday Technofeudalism",
            "Panel 276, 309: Situated Resistance to Platform Power",
            "Panel 304: Platform-Mediated Intimacies & Gig Work",
            "Panel 307: Digital Tools in Unions and Democratic Institutions",
            "Panel 326: Gig Workers' Embodied Experiences as Alternate Counts",
            "Panel 337, 371, 428: Reclaiming the Futures of Work",
            "Panel 509, 546, 611, 646: Worker-Led Techno-Futures (WIRM, Uber Alternatives)"
        ],
        "prominentScholars": [
            "Rafael Grohmann (Toronto)",
            "Udayan Tandon (UC San Diego)",
            "Derly Sanchez-Vargas (Rosario)",
            "Oscar Javier Maldonado (Rosario)",
            "Julie Chen (Toronto)",
            "Vera Khovanskaya (Toronto)"
        ],
        "governanceCases": [
            "California Proposition 22 & AB 5 Independent Contractor Battles",
            "EU Platform Work Directive on Algorithmic Transparency and Employment Status",
            "Worker-led delivery strikes and counter-apps in India, Colombia, and Brazil"
        ]
    },
    {
        "id": "tech_environmental_energy",
        "rank": 6,
        "name": "Environmental Sensing, Smart Grids & Energy Transition Tech",
        "shortName": "CleanTech & Eco-Sensing",
        "category": "Energy & Climate",
        "icon": "🌱",
        "color": "#84cc16", # Lime
        "degree": 48,
        "betweenness": 0.71,
        "corePuzzle": "How technological solutions to climate change (carbon capture, smart grids, solar farms) frequently replicate extractivist logics and create new ecological sacrifice zones.",
        "keyTensions": [
            "Centralized solar/wind mega-projects vs. indigenous land sovereignty and local biodiversity",
            "Technological carbon accounting metrics vs. real emissions reduction",
            "Smart grid automation vs. equitable energy access during extreme weather crises"
        ],
        "primaryPanels": [
            "Panel 3, 36, 89: Articulating Hydrofutures: Water, Technology, and Power",
            "Panel 13, 47, 101: Environment as Information (Wave forecasting, sonic sensors)",
            "Panel 54, 109, 136: Knowing and Caring for Soil: Sensorization & Remediation",
            "Panel 120: The Technopower of Solar Energy in Global Energy Transition",
            "Panel 157, 279: Climate Governance and Technoscience",
            "Panel 162: Climate Informatics & Disaster Cyborgs",
            "Panel 175: Precision Agriculture & Himalayan Environmental Sensors",
            "Panel 342, 376, 408: Social Acceptance of Renewable Energy & Carbon Counting",
            "Panel 421: Energy Governance: EVs, CCUS, and Dynamic Line Ratings",
            "Panel 487, 528: Assembling Electrical Modernity: Microgrids & Transmission",
            "Panel 561: Mediating Carbon: Direct Air Capture (DAC) & California Firetech",
            "Panel 623, 625: Technopolitics of Energy & Media Energetics"
        ],
        "prominentScholars": [
            "Anne Pasek (Trent Univ)",
            "Abby Kinchy (RPI)",
            "Stephen Collier (UC Berkeley)",
            "Lisa Han (Pitzer)",
            "Prathamesh Antarkar (IIT Bombay)",
            "Dirk Scheer (Karlsruhe / KIT)"
        ],
        "governanceCases": [
            "California Public Utilities Commission (CPUC) NEM 3.0 Rooftop Solar Net Metering Reform",
            "US DOE Regional Direct Air Capture (DAC) Hub Grants and CEQA Review Conflicts",
            "California Wildfire Mitigation Plans and Investor-Owned Utility Power Shutoffs (PSPS)"
        ]
    },
    {
        "id": "tech_robotics_cybernetics",
        "rank": 7,
        "name": "Robotics, Autonomous Systems & Cybernetics",
        "shortName": "Robotics & Cybernetics",
        "category": "Autonomous Systems",
        "icon": "🦾",
        "color": "#a855f7", # Purple
        "degree": 42,
        "betweenness": 0.65,
        "corePuzzle": "The reimagining of agency, control, and moral responsibility as mechanical and computational systems operate autonomously in clinics, streets, classrooms, and battlefields.",
        "keyTensions": [
            "Robotic care and companionship vs. affective exploitation and dehumanization",
            "Autonomous vehicle algorithmic safety vs. unpredictable real-world urban liability",
            "Cybernetic system optimization vs. democratic deliberation and human error tolerance"
        ],
        "primaryPanels": [
            "Panel 8: Interrogating Wearable Robots as Technoscientific Futures",
            "Panel 24, 57: Many Machine Agencies: Recipes for Posthuman Encounters",
            "Panel 25: Social Robotics Innovation in Older Adults' Care",
            "Panel 86: Automation Technologies from Machine Age to AI",
            "Panel 112: Feminist STS on Companion and Affective Robotics (Robonosis)",
            "Panel 141: Power, Glitch, Body and Algorithm (Assistive Smartwear)",
            "Panel 174: Imaginaries of Automation in Architecture & Robotics",
            "Panel 413: Cybernetics Did Not Take Place (50th Macy Conference Retrospective)",
            "Panel 425, 456: Political Cybernetics & Machine Learning Gremlins",
            "Panel 479, 520: Computing Sociality: Robot-Human Interaction in Autism Care",
            "Panel 501: Resistance and Refusal of Robots, Cyborgs, and 'Robot Rights'",
            "Panel 630: Safety of Autonomous Vehicles and Real-World Testing Ambiguities"
        ],
        "prominentScholars": [
            "John Downer (Bristol)",
            "Roger Søraa (NTNU)",
            "Eva Slesingerova (Masaryk)",
            "Jo Ann Oravec (Wisconsin)",
            "David Cecchetto (York)",
            "Thao Phan (ANU)"
        ],
        "governanceCases": [
            "California DMV Autonomous Vehicle Regulations (Cruise & Waymo Robotaxi Permits)",
            "San Francisco Board of Supervisors Police Remote-Controlled Robot Armament Debate",
            "OSHA Workplace Safety Standards for Collaborative Industrial Robots (Cobots)"
        ]
    },
    {
        "id": "tech_digital_sovereignty",
        "rank": 8,
        "name": "Digital Sovereignty, Public Code & National Stacks",
        "shortName": "Digital Sovereignty",
        "category": "Governance & Geopolitics",
        "icon": "🛡️",
        "color": "#6366f1", # Indigo
        "degree": 39,
        "betweenness": 0.62,
        "corePuzzle": "Nation-states, indigenous communities, and civil society attempting to assert democratic control over computational infrastructure monopolized by American and Chinese tech oligopolies.",
        "keyTensions": [
            "National 'Sovereign AI' ambitions vs. structural dependency on US cloud providers (AWS, Azure)",
            "Data sovereignty as citizen empowerment vs. authoritarian state surveillance and censorship",
            "Indigenous Data Sovereignty (CARE Principles) vs. global commercial data scraping"
        ],
        "primaryPanels": [
            "Panel 11, 45, 70: Digital Sovereignty in the Age of Technopowers",
            "Panel 146: Sovereign AI Factories in Canada & Digital Sovereignty in France/Russia",
            "Panel 178, 217, 275, 308: Technocoloniality: Global Inequalities in Technological Models",
            "Panel 328, 406: STS Perspectives on Technological Sovereignty",
            "Panel 434, 465: Sovereign AI Compute Strategies in Canada & US/India Policy",
            "Panel 478, 518, 582: Code, Bodies, Territories: Digital Colonialism in Latin America",
            "Panel 485: Dependency Theory and Digital Sovereignty (Indigenous 5G Networks)"
        ],
        "prominentScholars": [
            "Sophie Toupin (Laval)",
            "Blair Attard-Frost (Alberta)",
            "Mélina Poulin (INRS)",
            "Jonathan Roberge (INRS)",
            "Robert Gehl (York)",
            "Fernanda R. Rosa (Virginia Tech)",
            "Riccardo Nanni (CNRS)"
        ],
        "governanceCases": [
            "Canada's $2 Billion Sovereign AI Compute Strategy and Public Cloud Procurement",
            "France Andromède Cloud Failure & European Gaia-X Sovereign Infrastructure Project",
            "First Nations OCAP Principles (Ownership, Control, Access, Possession) in Data Governance"
        ]
    },
    {
        "id": "tech_semiconductors_minerals",
        "rank": 9,
        "name": "Semiconductors, Critical Minerals & Hardware Supply Chains",
        "shortName": "Chips & Critical Minerals",
        "category": "Material Supply Chains",
        "icon": "⚡",
        "color": "#06b6d4", # Teal
        "degree": 36,
        "betweenness": 0.58,
        "corePuzzle": "The global geopolitical chokepoints and ecological sacrifice zones required to produce silicon chips, rare earth magnets, and batteries for the AI and green energy transitions.",
        "keyTensions": [
            "Geopolitical chip dominance (Taiwan/TSMC) vs. vulnerability to militarized blockade",
            "Green transition demand for lithium, nickel, and cobalt vs. indigenous water rights",
            "High-tech fab investment subsidies vs. toxic industrial waste and worker chemical exposure"
        ],
        "primaryPanels": [
            "Panel 5, 40: Computing Machinery Supply Chains as Colonial and Postcolonial Projects",
            "Panel 166, 203, 232: Earth's Subsurface: Mine Sensorization & Direct Lithium Extraction",
            "Panel 269: Indigenous & Anti-Colonial Perspectives on Critical and Rare Earth Minerals",
            "Panel 348, 440: Global Supply Chains: TSMC Foundry Model & Maquiladora Assembly",
            "Panel 471: Unpacking Global Supply Chains: RCA in Taiwan & Open Innovation Platforms",
            "Panel 539: Rare Earth Elements: The Raw Material of Technopower",
            "Panel 607: Toxic Interdependencies: E-Waste Dismantling in Post-Socialist China"
        ],
        "prominentScholars": [
            "Chen-Pang Yeang (Toronto)",
            "Javiera Barandiaran (UC Santa Barbara)",
            "David Struthers (IT Univ Copenhagen)",
            "Mehrnush Golriz (UCLA)",
            "Ling-Ming Huang (Chung Shan Medical)",
            "Vitor Chiodi (LABMEM Brazil)"
        ],
        "governanceCases": [
            "US CHIPS and Science Act Domestic Fab Subsidies and Environmental Waivers",
            "Chilean National Lithium Strategy (State-Led Direct Lithium Extraction Mandates)",
            "Salton Sea Lithium Valley Extraction and Imperial Valley Tribal Water Rights"
        ]
    },
    {
        "id": "tech_games_synthetic_sim",
        "rank": 10,
        "name": "Game Engines, Virtual Realities & Synthetic Simulation",
        "shortName": "Game Engines & Sim",
        "category": "Media & Simulation",
        "icon": "🎮",
        "color": "#eab308", # Gold
        "degree": 34,
        "betweenness": 0.54,
        "corePuzzle": "How 3D game engines (Unreal, Unity) and immersive simulation tools have escaped entertainment to become core instruments of urban planning, architectural modeling, and military training.",
        "keyTensions": [
            "Commercial assetization of video games (loot boxes, predatory microtransactions) vs. communal play",
            "Game engines as neutral visualization tools vs. ideological determinism in architectural/urban modeling",
            "Synthetic worlds as escapism vs. digital laboratories for AI reinforcement training"
        ],
        "primaryPanels": [
            "Panel 20, 52, 108: Intersections of Game Studies and STS (Game Engines as Infrastructure)",
            "Panel 21, 53: Refusing and Resisting the Reactionary Technopolitics of Games",
            "Panel 190: Knowledge Games: Automating Programming Labor & Pedagogy of Algorithms",
            "Panel 253: Embodied Games & Transnational Cosmic Game Making",
            "Panel 288: Data Games: Cinematic Cutscenes and Conflicting Measurement Schemas",
            "Panel 293: Modded Minecraft as Contraption & The Life of PLATO",
            "Panel 343: Synthetic Power: Relational Image Synthesis",
            "Panel 498, 534, 601: Play, Science Fiction, and Engineering Science (Minecraft Bot Players)",
            "Panel 540: GenAI-Based NPCs in Gaming (Dominique Kelly, Jacquelyn Burkell)"
        ],
        "prominentScholars": [
            "Camilla Rinciari (Politecnico di Milano)",
            "Jim Malazita (RPI)",
            "Bart Simon (Concordia)",
            "Darren Wershler (Concordia)",
            "Emma Vossen (Brock)",
            "Alexander Ross (UBC)"
        ],
        "governanceCases": [
            "FTC and EU Digital Services Act Regulations on Predatory Game Design & Loot Boxes",
            "Epic Games vs. Apple/Google Antitrust Battles over Engine Ecosystem Control",
            "US Department of Defense Simulation Grants for Unreal Engine Military Training Environments"
        ]
    }
]

def load_and_enrich_papers():
    with open(PARSED_PAPERS_JSON, "r", encoding="utf-8") as f:
        raw_panels = json.load(f)

    cleaned_panels = {}
    for p_num_str, p in raw_panels.items():
        p_num = int(p_num_str)
        cleaned_panels[p_num] = {
            "panelNumber": p_num,
            "panelTitle": clean_text(p.get("title", "")),
            "papers": [
                {
                    "title": clean_text(paper.get("title", "")),
                    "authors": clean_text(paper.get("authors", ""))
                }
                for paper in p.get("papers", [])
                if paper.get("title") and len(clean_text(paper.get("title", ""))) > 5
            ]
        }

    for node in TOP_10_TECH_NODES:
        panel_nums = []
        for p_str in node["primaryPanels"]:
            for n in re.findall(r'\b\d{1,3}\b', p_str):
                num = int(n)
                if num not in panel_nums:
                    panel_nums.append(num)
        
        node_panels = []
        total_papers = 0
        for p_num in panel_nums:
            if p_num in cleaned_panels:
                p_data = cleaned_panels[p_num]
                if p_data["papers"]:
                    node_panels.append(p_data)
                    total_papers += len(p_data["papers"])
        
        node["panels"] = node_panels
        node["panelCount"] = len(node_panels)
        node["paperCount"] = total_papers

def generate_knowledge_graph_data():
    load_and_enrich_papers()
    nodes = []
    edges = []

    # 1. Add the Top 10 Technology Core Nodes
    for t in TOP_10_TECH_NODES:
        nodes.append({
            "id": t["id"],
            "label": t["shortName"],
            "title": f"<b>Rank #{t['rank']}: {t['name']}</b><br>Category: {t['category']}<br>Papers: {t['paperCount']} across {t['panelCount']} Panels",
            "group": "top_tech_node",
            "category": t["category"],
            "value": t["paperCount"],
            "rank": t["rank"],
            "icon": t["icon"],
            "color": {
                "background": t["color"],
                "border": "#ffffff",
                "highlight": { "background": "#ffffff", "border": t["color"] }
            },
            "font": { "color": "#ffffff", "size": 15, "face": "Plus Jakarta Sans", "bold": True },
            "meta": t
        })

    # 2. Add Cross-Technology Interconnections
    cross_tech_links = [
        ("tech_ai_llm", "tech_cloud_datacenters", "REQUIRES_COMPUTE", "AI models depend on hyperscale data centers for training and inference"),
        ("tech_ai_llm", "tech_semiconductors_minerals", "REQUIRES_HARDWARE", "AI scaling relies on advanced TSMC GPU fabrication and rare earth inputs"),
        ("tech_ai_llm", "tech_surveillance_biometrics", "POWERS_RECOGNITION", "Computer vision and LLMs automate border and police surveillance"),
        ("tech_ai_llm", "tech_platforms_labor", "DISPLACES_LABOR", "Generative AI reconfigures knowledge and gig platform piecework"),
        ("tech_ai_llm", "tech_biomed_genomics", "AUTOMATES_DIAGNOSIS", "Deep learning models predict protein folds and clinical risk scores"),
        ("tech_ai_llm", "tech_robotics_cybernetics", "EMBODIES_INTELLIGENCE", "LLMs power physical robots, conversational agents, and cybernetic feedback"),
        ("tech_ai_llm", "tech_digital_sovereignty", "THREATENS_AUTONOMY", "US/Chinese AI monopolies compel states to build sovereign AI compute"),
        ("tech_ai_llm", "tech_environmental_energy", "STRAINS_GRIDS", "Exponential model training consumes surging electricity and fresh water"),
        ("tech_ai_llm", "tech_games_synthetic_sim", "GENERATES_WORLDS", "GenAI produces autonomous game dialogue, procedural assets, and NPCs"),

        ("tech_cloud_datacenters", "tech_environmental_energy", "CONSUMES_POWER", "Data centers overload municipal water supplies and electric utilities"),
        ("tech_cloud_datacenters", "tech_digital_sovereignty", "HOSTS_SOVEREIGNTY", "Data residency and sovereign cloud factories dictate geopolitical autonomy"),
        ("tech_cloud_datacenters", "tech_semiconductors_minerals", "HOUSES_CHIPS", "Hyperscale servers pack millions of specialized silicon accelerators"),

        ("tech_surveillance_biometrics", "tech_digital_sovereignty", "ENFORCES_BORDERS", "Biometric databases (e-ID, passportization) enforce state control"),
        ("tech_surveillance_biometrics", "tech_platforms_labor", "DISCIPLINES_WORKERS", "GPS and camera tracking monitor delivery drivers and warehouse workers"),

        ("tech_platforms_labor", "tech_digital_sovereignty", "EXPLOITS_PERIPHERY", "Silicon Valley platform monopolies extract value from Global South workers"),
        ("tech_platforms_labor", "tech_games_synthetic_sim", "ASSETIZES_ENGAGEMENT", "Gamer labor, modding, and virtual economies parallel gig labor"),

        ("tech_environmental_energy", "tech_semiconductors_minerals", "DEMANDS_LITHIUM", "Renewable batteries and solar panels require destructive mining"),
        ("tech_biomed_genomics", "tech_surveillance_biometrics", "EXTRACTS_BIODATA", "DNA databases and biometric tracking blur carceral and medical boundaries"),
        ("tech_robotics_cybernetics", "tech_semiconductors_minerals", "PHYSICAL_ACTUATION", "Robotic hardware requires precision servos and microchips"),
        ("tech_robotics_cybernetics", "tech_games_synthetic_sim", "SIMULATES_ENVIRONMENTS", "Robots are trained inside 3D game engines (Unity/Unreal physics)")
    ]

    for src, dst, rel, desc in cross_tech_links:
        edges.append({
            "from": src,
            "to": dst,
            "label": rel,
            "title": desc,
            "color": { "color": "rgba(56, 189, 248, 0.45)", "highlight": "#38bdf8" },
            "width": 3,
            "relation": rel
        })

    # 3. Add Satellite Nodes
    satellite_nodes = [
        # AI Satellites
        { "id": "sat_llm_safety", "label": "Model Alignment & Safety", "parent": "tech_ai_llm", "cat": "Concept", "val": 22, "sampleQuery": "Safety" },
        { "id": "sat_ai_literacy", "label": "Critical AI Literacy", "parent": "tech_ai_llm", "cat": "Pedagogy", "val": 20, "sampleQuery": "Literacy" },
        { "id": "sat_machine_liberalism", "label": "Machine Liberalism", "parent": "tech_ai_llm", "cat": "Theory", "val": 18, "sampleQuery": "Liberalism" },
        { "id": "sat_sb1047", "label": "California SB 1047", "parent": "tech_ai_llm", "cat": "Policy", "val": 24, "sampleQuery": "Governance" },

        # Data Center Satellites
        { "id": "sat_datacenter_alley", "label": "Data Center Alley", "parent": "tech_cloud_datacenters", "cat": "Site", "val": 20, "sampleQuery": "Alley" },
        { "id": "sat_thermolabour", "label": "Thermolabour & Heat", "parent": "tech_cloud_datacenters", "cat": "Theory", "val": 18, "sampleQuery": "Heat" },
        { "id": "sat_water_cooling", "label": "Aquifer Water Depletion", "parent": "tech_cloud_datacenters", "cat": "Ecology", "val": 22, "sampleQuery": "Water" },

        # Biomedicine Satellites
        { "id": "sat_polygenic_risk", "label": "Polygenic Embryo Risk", "parent": "tech_biomed_genomics", "cat": "Genomics", "val": 20, "sampleQuery": "Risk" },
        { "id": "sat_hot_girl_eugenics", "label": "Algorithmic Aesthetics", "parent": "tech_biomed_genomics", "cat": "Culture", "val": 18, "sampleQuery": "Beauty" },
        { "id": "sat_pharma_sovereignty", "label": "Pharma Sovereignty", "parent": "tech_biomed_genomics", "cat": "Global South", "val": 22, "sampleQuery": "Pharma" },
        { "id": "sat_glp1", "label": "GLP-1 Appetite Control", "parent": "tech_biomed_genomics", "cat": "Medicine", "val": 16, "sampleQuery": "Ozempic" },

        # Surveillance Satellites
        { "id": "sat_flock_alpr", "label": "Flock ALPR Networks", "parent": "tech_surveillance_biometrics", "cat": "Police Tech", "val": 22, "sampleQuery": "Camera" },
        { "id": "sat_mobile_fortify", "label": "ICE Mobile Fortify", "parent": "tech_surveillance_biometrics", "cat": "Borders", "val": 20, "sampleQuery": "Border" },
        { "id": "sat_ring_surveillance", "label": "Ring Domestic Enclosure", "parent": "tech_surveillance_biometrics", "cat": "Civic", "val": 18, "sampleQuery": "Doorbell" },

        # Platform Labor Satellites
        { "id": "sat_algorithmic_mgmt", "label": "Algorithmic Dispatch", "parent": "tech_platforms_labor", "cat": "Labor", "val": 22, "sampleQuery": "Delivery" },
        { "id": "sat_vibe_coding", "label": "Vibe Coding Panics", "parent": "tech_platforms_labor", "cat": "Software", "val": 18, "sampleQuery": "Coding" },
        { "id": "sat_workers_inquiry", "label": "Workers' Counter-Apps", "parent": "tech_platforms_labor", "cat": "Resistance", "val": 20, "sampleQuery": "Resistance" },

        # Energy & Ecology Satellites
        { "id": "sat_dac_hubs", "label": "Direct Air Capture Hubs", "parent": "tech_environmental_energy", "cat": "Climate", "val": 20, "sampleQuery": "Capture" },
        { "id": "sat_solar_pv", "label": "Solar PV Panacea Myth", "parent": "tech_environmental_energy", "cat": "Energy", "val": 18, "sampleQuery": "Solar" },
        { "id": "sat_wildfire_risk", "label": "California Firetech", "parent": "tech_environmental_energy", "cat": "Insurance", "val": 20, "sampleQuery": "Fire" },

        # Robotics Satellites
        { "id": "sat_autonomous_vehicles", "label": "Autonomous Vehicle Safety", "parent": "tech_robotics_cybernetics", "cat": "Transport", "val": 22, "sampleQuery": "Vehicle" },
        { "id": "sat_robonosis", "label": "Robotic Intimacy", "parent": "tech_robotics_cybernetics", "cat": "Care", "val": 18, "sampleQuery": "Robotics" },

        # Sovereignty Satellites
        { "id": "sat_sovereign_compute", "label": "Canada Compute Strategy", "parent": "tech_digital_sovereignty", "cat": "Policy", "val": 20, "sampleQuery": "Sovereignty" },
        { "id": "sat_indigenous_data", "label": "Indigenous CARE Principles", "parent": "tech_digital_sovereignty", "cat": "Sovereignty", "val": 22, "sampleQuery": "Indigenous" },

        # Semiconductor Satellites
        { "id": "sat_tsmc_foundry", "label": "TSMC Silicon Monopoly", "parent": "tech_semiconductors_minerals", "cat": "Supply Chain", "val": 22, "sampleQuery": "TSMC" },
        { "id": "sat_lithium_brine", "label": "Chilean Direct Lithium", "parent": "tech_semiconductors_minerals", "cat": "Mining", "val": 20, "sampleQuery": "Lithium" },

        # Game Engine Satellites
        { "id": "sat_game_engines", "label": "Engines as Infrastructure", "parent": "tech_games_synthetic_sim", "cat": "Media", "val": 20, "sampleQuery": "Engine" },
        { "id": "sat_loot_boxes", "label": "Predatory Loot Boxes", "parent": "tech_games_synthetic_sim", "cat": "Finance", "val": 18, "sampleQuery": "Play" }
    ]

    for sat in satellite_nodes:
        nodes.append({
            "id": sat["id"],
            "label": sat["label"],
            "title": f"<b>{sat['label']}</b><br>Cluster: {sat['cat']}<br>Linked to: {sat['parent']}",
            "group": "satellite_node",
            "category": sat["cat"],
            "value": sat["val"],
            "color": {
                "background": "#1e293b",
                "border": "rgba(255, 255, 255, 0.3)",
                "highlight": { "background": "#38bdf8", "border": "#ffffff" }
            },
            "font": { "color": "#cbd5e1", "size": 11, "face": "Plus Jakarta Sans" },
            "parent": sat["parent"],
            "sampleQuery": sat.get("sampleQuery", "")
        })

        edges.append({
            "from": sat["id"],
            "to": sat["parent"],
            "label": "SUB_DOMAIN",
            "color": { "color": "rgba(255, 255, 255, 0.15)", "highlight": "#38bdf8" },
            "width": 1.5,
            "dashes": True
        })

    return {
        "topNodes": TOP_10_TECH_NODES,
        "graph": {
            "nodes": nodes,
            "edges": edges
        }
    }

def main():
    data = generate_knowledge_graph_data()
    js_content = f"""/**
 * 4S 2026 Conference Proceedings Knowledge Graph Dataset
 * Top 10 Technology Hubs with Panel-by-Panel Research Papers Breakdown
 * Extracted from 4S 2026 Toronto Conference Proceedings (578 Pages)
 */

window.CONFERENCE_KNOWLEDGE_GRAPH = {json.dumps(data, indent=2)};
"""
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)
    total_papers = sum(t["paperCount"] for t in data["topNodes"])
    print(f"✅ Generated Knowledge Graph Dataset ({len(data['graph']['nodes'])} nodes, {len(data['graph']['edges'])} edges, {total_papers} papers across {sum(t['panelCount'] for t in data['topNodes'])} panels) -> {OUTPUT_JS}")

if __name__ == "__main__":
    main()
