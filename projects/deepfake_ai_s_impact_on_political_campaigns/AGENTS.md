# Project: Deepfake AI's Impact on Political Campaigns
**Category / Focus:** Synthetic Media • Electoral Integrity  
**Workspace Location:** `projects/deepfake_ai_s_impact_on_political_campaigns/`  
**Live Interface / URL:** `deepfake_ai_campaigns_2026.html`

> **Antigravity Context Rule**: This file is the primary memory and decision log for this project. Whenever the user modifies, reviews, or makes architectural decisions regarding this project, the agent must update this document.

---

## 1. Project Overview & Research Mission
Tracking and evaluating the weaponization of generative synthetic audio clones, hyper-realistic video manipulation, and autonomous persuasion dialogues in electoral contests—with a specialized focus on **partisan social media influencers and creator collectives producing organic generative AI campaign videos ("slopaganda" / surrogate AI ads) on behalf of candidates** outside formal FEC/state ad-disclaimer regimes. Audits the "liar's dividend", voter epistemic degradation, and legal/regulatory countermeasures for democratic integrity.

---

## 2. Key Files & Resources
- **Live Interactive Dataset & Methodology Page:** `deepfake_ai_campaigns_2026.html`
- **Card Image:** `images/deepfake_campaigns.jpg`
- **Core File:** `projects.html`
- **Core File:** `Mark_Coeckelbergh_Why_AI_Undermines_Democracy_Citations_Dossier.md`
- **Strategy 2 Data Collection Plan ("Candidate Repost & Amplification" Harvesting):** `projects/deepfake_ai_s_impact_on_political_campaigns/strategy2_candidate_repost_data_collection_plan.md`
- **Reddit Political AI Threads + Voter Debate Dataset (`n=58`):** `projects/deepfake_ai_s_impact_on_political_campaigns/reddit_political_ai_campaign_threads.csv`
- **Reddit Arctic Shift Harvester Script:** `projects/deepfake_ai_s_impact_on_political_campaigns/harvest_reddit_political_ai.py`
- **Influencer Political AI Videos + Crowd Comment Detection Dataset (`n=99`):** `projects/deepfake_ai_s_impact_on_political_campaigns/influencer_political_ai_videos_crowd_scored.csv`
- **Influencer + Comment Crowd-Detection Harvester Script:** `projects/deepfake_ai_s_impact_on_political_campaigns/harvest_influencer_ai_shorts_and_comments.py`
- **28-State AI Disclaimer Statutes Reference CSV:** `projects/deepfake_ai_s_impact_on_political_campaigns/state_ai_disclaimer_laws_2026.csv`
- **2026 Political AI Videos + Spoken Transcripts Dataset (`n=89`):** `projects/deepfake_ai_s_impact_on_political_campaigns/political_ai_videos_with_transcripts.csv`
- **Harvester & Transcript Extractor Script:** `projects/deepfake_ai_s_impact_on_political_campaigns/harvest_state_ai_disclaimers.py`

---

## 3. Decision Log & Project Memory
| Date | Decision / Architectural Choice | Rationale & Context |
| :--- | :--- | :--- |
| 2026-11-05 | **Removed Interpretive Analysis from Public Dashboard** | Per user instruction, stripped editorial/interpretive analysis sections so the dashboard presents strictly the Research Question, Methods, Data/Code Downloads, and Descriptive/Empirical Findings. |
| 2026-11-03 | **Published Interactive GitHub Pages Portal (`deepfake_ai_campaigns_2026.html`) & Linked from `projects.html`** | Created `deepfake_ai_campaigns_2026.html` presenting the 4-layer open-access methodology, direct download cards for all 4 CSVs, Strategy 2 blueprint, and 3 Python harvester scripts, plus an interactive 4-tab live explorer (`n=99` influencer AI videos, `n=58` Reddit battleground threads, `n=89` spoken transcripts, and `n=28` state disclaimer laws) and wired it into the "Deepfake AI's Impact on Political Campaigns" card in `projects.html`. |
| 2026-11-03 | **Supplemented with Reddit Battleground Threads & Voter Comment Debates (`n=58`) via Arctic Shift API** | Built and executed `harvest_reddit_political_ai.py` against `arctic-shift.photon-reddit.com`, harvesting 58 threads and ~1,200 voter comments across state battleground (`r/texas`, `r/TexasPolitics`, `r/Georgia`, `r/Maine`, `r/Ohio`, `r/wisconsin`, `r/LosAngeles`) and election (`r/YAPms`, `r/PoliticalHumor`, `r/Conservative`, `r/technology`) subreddits into `reddit_political_ai_campaign_threads.csv`, uncovering additional unlisted/native-video (`v.redd.it` / `youtu.be`) 2026 campaign deepfakes (e.g., Dan Patrick TX deepfake ad, Rep. Mike Collins' AI video of Jon Ossoff, Rep. Derrick Van Orden's WI deepfake cease-and-desist, and PA Gov candidate Stacy Garrity's running mate soliciting $2M from Elon Musk for an all-AI ad). |
| 2026-11-03 | **Executed Prototype Influencer AI Video + Crowd-Comment Detection Harvester (`n=99`)** | Built and ran `harvest_influencer_ai_shorts_and_comments.py` using YouTube's `youtubei/v1/next` endpoint to harvest 99 short-form political influencer/creator/PAC AI videos (`influencer_political_ai_videos_crowd_scored.csv`), detecting 52 videos with YouTube's native `"Altered or synthetic content"` badge and 30 videos where viewer comments explicitly flagged/debated AI generation. |
| 2026-11-03 | **Adopted Strategy 2 ("Candidate Repost & Amplification" Harvesting) Data Collection Plan** | Authored full 4-phase research design (`strategy2_candidate_repost_data_collection_plan.md`) anchoring data collection on a panel of ~250–300 2026 US Senate, battleground House, and Gubernatorial candidate ecosystems. |
| 2026-11-03 | **Pivot to Partisan Social Media Influencers Creating Generative AI Ads for Candidates** | Shifted focus from formal disclosed campaign TV/pre-roll ads to the harder, higher-impact phenomenon of political social media influencers, meme collectives, and PAC-backed creator networks generating organic AI campaign videos on behalf of candidates. |
| 2026-11-03 | **State AI Disclaimer + Political Video & Transcript Harvester Built** | Compiled the 28-state statutory AI disclaimer table (`state_ai_disclaimer_laws_2026.csv`) and executed `harvest_state_ai_disclaimers.py` against YouTube's video corpus (`sp=EgIQAQ%3D%3D`) + `youtube_transcript_api`, harvesting 89 political AI campaign ads and news investigations (82 with full spoken transcripts) into `political_ai_videos_with_transcripts.csv`. |
| 2026-11-03 | **2026 US Elections Political Deepfake Video Dataset Strategy** | Formulated a 5-pillar open-access data collection architecture to bypass Wesleyan Media Project / Kantar CMAG paywalls. |
| 2026-10-27 | **Curricular & Expert Interview Protocol Design** | Formulated research question refinements, 3-question podcast protocol with sub-probes, and multi-tier background research library linking generative synthetic political media to IR theories (Cognitive Warfare, Epistemic Degradation, Liar's Dividend). |
| 2026-10-04 | **Integration with Empirical Literature** | Incorporated findings from Lin et al. (Nature 2025) on conversational AI persuasion and Coeckelbergh (2024/2025) on epistemic degradation. |

*(Agent instruction: When the user makes key decisions, adds dependencies, or changes project directions, append a new row above).* 

---

## 4. Current Status & Next Steps
- [x] Registered in `projects.html` showcase grid
- [x] Detail data collection / code implementation (`harvest_state_ai_disclaimers.py`, `harvest_influencer_ai_shorts_and_comments.py`, `harvest_reddit_political_ai.py`)
- [x] Build initial YouTube + Reddit Political AI Campaign & Crowd-Debate Datasets (`political_ai_videos_with_transcripts.csv`, `influencer_political_ai_videos_crowd_scored.csv`, `reddit_political_ai_campaign_threads.csv`)

---

## 5. Agent Instructions for Antigravity
1. When answering questions about this project, read this file to immediately get up to speed on the current state and prior decisions.
2. Keep the **Key Files & Resources** list updated whenever new scripts, data files, or HTML pages are created.
3. Maintain the **Decision Log** with clear dates and rationales whenever the user approves changes.
