# 📣 The Media Relations Exchange — Desktop Application

A desktop application where your book manuscript is structured into **55 independent Media Relations & Strategic Communications Agencies**. When you submit an article, speech, or concept, all 55 agencies compete by pitching **tailored media angles, blog posts/op-eds, viral social media campaigns, and video explainers** to promote and reframe the material through their unique perspective.

Now enhanced with **Local Generative LLM integration via Ollama** (Llama 3, Mistral, DeepSeek-R1, and Qwen 2.5) running 100% locally on your PC!

---

## 💡 The Conceptual Metaphor
- **55 Media Relations Agencies**: Each ~1,000-word passage represents an elite PR & communications strategy firm (e.g., *Kipple Dynamics PR*, *Inscrutability Comms*, *Psychic Exhaustion Comms*, *Outlier Rebellion PR*, *Digital Serendipity Lab*, *Constituent Power Media Lab*).
- **Agency Specialties & Angles (Produce)**: The core ideas and arguments in each passage are the agency's proprietary strategic angles and conceptual frameworks (220+ distinct media angles).
- **Client Media RFP**: When you paste an article, news clip, or concept, you issue an open RFP. All 55 agencies immediately evaluate the material and generate competitive pitch proposals.
- **Proposal Fit Engine**: Powered by neural semantic embeddings (`all-MiniLM-L6-v2`) and calibrated softmax, calculating the percentage fit (market share) of each agency's pitch in under 30 milliseconds.
- **Generative AI Proposals**: Top agencies can write out custom, publishable drafts of op-eds, viral social media threads, and video scripts using your local **Llama 3** or **Mistral** models!

---

## 🚀 Key Features

1. **Top Agency Pitch Decks (Podium)**:
   - Visual cards for the Top 3 winning agencies (🥇 Rank 1 Lead Pitch, 🥈 Rank 2 Alternative Angle, 🥉 Rank 3 Challenger Pitch).
   - **✨ Draft with Local LLM (Llama 3 / Mistral)**: Button on each card that connects to Ollama in the background to write an original, full-length media pitch.
   - For each agency, switch between 4 dedicated proposal tabs:
     - 📰 **Op-Ed & Blog Pitch**: Catchy Headline, Target Publications (e.g., *The Atlantic*, *Wired*, *Nieman Lab*), Provocative Thesis, Sample Introductory Draft, and 3 Editorial Outline Arguments.
     - 📱 **Viral Social Campaign**: Multi-platform strategy, viral opening hook post, 4-slide carousel breakdown, and audience debate question.
     - 🎥 **Video & Multimedia Script**: Video Title, visual treatment & cues, and a cold open voiceover script.
     - 📑 **Foundational Whitepaper**: The complete ~1,000-word passage providing the deep research backing the pitch.
   - **"🤝 Retain Agency / Launch Campaign"**: Contractually hires the agency, logs the campaign proposal into your Campaign Ledger, and marks the agency retained.
   - **"📋 Copy Full Proposal"**: Copies the entire multi-channel PR proposal to clipboard.

2. **Local LLM Engine Controls**:
   - Choose between **Llama 3 (`llama3:latest`)**, **Mistral (`mistral:latest`)**, **DeepSeek-R1**, or **Instant Heuristic**.
   - Checkbox: `✨ Auto-draft Lead Pitch with Local LLM` to automatically run Llama 3/Mistral on the #1 winning agency when you click solicit pitches.
   - Runs asynchronously in background threads so the interface never freezes.

3. **All 55 Media Agencies Exchange Board**:
   - Comprehensive exchange table listing all 55 agencies ranked by proposal fit.
   - Columns: `Rank`, `Agency ID`, `Agency Name`, `Specialty / PR Niche`, `Proposal Fit (%)`, `Score`, `Key Media Angles`, `Sector`, `Status`.
   - Real-time search/filter by keyword, specialty, angle, or sector.
   - Click any agency row to view its proposal and research whitepaper in the inspector drawer, with an on-demand button to draft with your local LLM.

4. **PR Angles & Produce Directory**:
   - Searchable directory of all 220+ conceptual angles, originating agencies, and target media outlets.

5. **Retained Agencies & Campaign Ledger**:
   - History of all retained agencies, client RFPs, awarded campaign proposals, and timestamps.
   - Release / Re-float capability to return agencies to the active bidding pool.

---

## 🏃 How to Run
### Option 1: Desktop Shortcut
Double-click the **"Media Relations Exchange"** or **"Marketplace of Ideas"** shortcut on your Desktop.

### Option 2: Command Line
```bash
python app.py
```
Or double-click:
`launch_app.bat`
