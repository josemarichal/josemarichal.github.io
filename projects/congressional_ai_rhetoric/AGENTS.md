# Antigravity Project Context & Memory
## Project: Narrative Presentation of AI in Congressional Hearings (`congressional_ai_rhetoric`)

## 1. Project Overview & Scope
Investigating how artificial intelligence is narratively, rhetorically, and politically presented in United States Congressional committee hearings. Drawing upon official GovInfo GPO Congressional Hearing records (`CHRG` collection) across the 118th and 119th Congresses (2023&ndash;2026), this project examines how Members of Congress, executive officials, and expert witnesses frame AI risks, economic promises, national security imperatives, and regulatory necessity.

### Core Theoretical Frameworks
1. **Deborah Stone (1989) Causal Stories Framework**:
   - **Mechanical Causal Stories**: Framing AI systems, algorithms, automated decision systems, and neural networks as mechanical conduits executing code without human oversight, leading to autonomous outcomes, black-box hallucinations, or automated harms.
   - **Inadvertent Causal Stories**: Framing harms as unintended side-effects of well-intentioned private innovation or government deployment (e.g., algorithmic bias in hiring, credit discrimination, workforce dislocation, copyright ingestion).
   - **Intentional Causal Stories**: Framing harms as deliberate acts of corporate malfeasance, monopoly concentration, foreign adversary cyber operations (China, Russia, North Korea), deepfake election interference, or consumer exploitation.
   - **Accidental Causal Stories**: Treating machine failures or hallucination as unpredictable acts of technological nature or stochastic anomalies beyond immediate regulatory control.
2. **Narrative Policy Framework (NPF)**:
   - Examining how policy actors construct narrative elements: **Heroes** (innovators, domestic engineers, watchful regulators), **Villains** (Big Tech monopolies, foreign autocracies, rogue algorithms), **Victims** (displaced workers, defrauded seniors, copyright holders, marginalized communities), and **Moral/Policy Remedies** (licensing, antitrust enforcement, federal R&amp;D subsidies, open-source protections).
3. **Partisan & Ideological Framing**:
   - Tracking divergence between Republican deregulation/global competitiveness narratives vs. Democratic anti-bias, labor protection, and civil rights guardrail narratives.

---

## 2. Corpus Architecture & Key Files
- **Primary Web Portal:** [`congressional_ai_rhetoric.html`](file:///c:/Users/jfmar/josemarichal/github.io/congressional_ai_rhetoric.html)
- **Hearing Metadata ($N = 805$):** [`projects/congressional_ai_rhetoric/data/hearings_metadata.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/data/hearings_metadata.csv) (and root mirror `congressional_ai_hearings_metadata.csv`)
- **Master Segments Corpus ($N = 4,198$):** [`projects/congressional_ai_rhetoric/data/ai_segments_all_published.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/data/ai_segments_all_published.csv) (23 variables)
- **Stratified Causal Coding Sample ($N = 200$):** [`projects/congressional_ai_rhetoric/data/preliminary_coding_sample.csv`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/data/preliminary_coding_sample.csv) (and root mirror `congressional_ai_preliminary_coding_sample.csv`)
- **Interactive Explorer Dataset:** [`projects/congressional_ai_rhetoric/data/curated_explorer_segments.js`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/data/curated_explorer_segments.js)
- **Data Harvesting Pipeline:** [`projects/congressional_ai_rhetoric/01_fetch_govinfo.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/01_fetch_govinfo.py)
- **Corpus Parser & Legislator Enrichment:** [`projects/congressional_ai_rhetoric/02_prepare_corpus.py`](file:///c:/Users/jfmar/josemarichal/github.io/projects/congressional_ai_rhetoric/02_prepare_corpus.py)

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-11-25 | **Corpus Integration & Repository Ingestion** | Connected project repository from external topic modeling workspace (`topic_modeling/congressional_ai_rhetoric`), importing full 805-hearing metadata, 4,198 substantive AI speech turns, and the 200-item stratified causal coding sample into `projects/congressional_ai_rhetoric/`. |
| 2026-11-25 | **Web Portal & Working Group Card Deployment** | Authored `congressional_ai_rhetoric.html` presenting corpus statistics, Deborah Stone causal classifications, interactive speech turn explorer (`curated_explorer_segments.js`), download repository, and GUIDE-LLM AI transparency checklist. Added dedicated showcase card titled "Narrative Presentation of AI in Congressional hearings" to `projects.html`. |
| 2026-11-25 | **Legislator Metadata Enrichment** | Joined Member turns against `unitedstates/congress-legislators` bioguide indexes for 118th and 119th Congresses, tagging party (897 Republican, 813 Democrat, 23 Independent), state delegations, and committee leadership roles. |
