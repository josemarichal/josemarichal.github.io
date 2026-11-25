# 🎬 Short Film Assistant — Desktop Application
### Video Essays from *You Must Remain an Algorithmic Problem* & Moving Image Archive

A desktop studio application that adapts your 55 book manuscript passages into **cinematic 3–4 minute YouTube video essay treatments**, complete with:
1. **Two-Column Audio/Visual (AV) Scripts**: Beat-by-beat voiceover narration paired with exact archival visual cues.
2. **Moving Image Archive Direct Deep-Links**: Direct mapping to pre-curated collections on `https://www.movingimagearchive.com/collections` (`Computers & Interfaces`, `Small Against Everything`, `Glowing Lines`, `Cursors`, `Phones & Communication`, `Animated Maps`).
3. **Internet Archive Public Domain Music Box**: Built-in mood-based browser and live search for public-domain soundtracks on `archive.org` (analog synth drones, 1950s corporate fanfares, melancholic Satie piano, Cold War tension stingers).
4. **Studio Voiceover Teleprompter**: Formatted reading view with word counts, pacing guides (`[PAUSE]`, `[BEAT]`), and delivery timing calculated at 135 words per minute.
5. **Full Manuscript Reference**: Side-by-side access to all 55 underlying research passages and theoretical concepts.

---

## 🚀 How to Launch

### Option 1: Double-Click the Launcher
Simply double-click:
`launch_app.bat`

### Option 2: Command Line
```bash
python app.py
```

---

## 🛠️ App Features & Layout

### 1. Left Sidebar: Manuscript & Concept Selector
- **Filter by Chapter**: Select from Introduction through Chapter 7.
- **Real-Time Concept Search**: Type any concept (e.g., `Kipple`, `Outlier`, `Local Minima`, `Ring`, `Ordinal`, `Extropianism`) to instantly filter the 55 passages.
- Shows word count and chapter provenance for every passage.

### 2. Main Workspace: 4 Studio Tabs
- **🎞️ Two-Column AV Script**:
  - Act I: The Informational Clutter (The Hook) `0:00 - 0:45`
  - Act II: The Technological Promise (The Illusion) `0:45 - 1:45`
  - Act III: The Local Minima (The Trap) `1:45 - 2:45`
  - Act IV: The Outlier Imperative (The Provocation) `2:45 - 3:45`
  - Each beat features a one-click button: **"Open Collection ↗"** to jump straight to the relevant bin on `movingimagearchive.com`.
- **🎵 Internet Archive Music Box**:
  - Browse curated public-domain music by mood (*Dystopian Synth Drone*, *1950s Optimism*, *Melancholy Solitude*, *Investigative Tension*).
  - Search Archive.org directly for specific soundtrack keywords.
  - One-click buttons to preview in browser or copy the direct audio stream URL.
- **🎙️ Teleprompter Studio**:
  - Clean, high-legibility display for recording your voiceover track into Audacity or your microphone.
  - Word count and estimated delivery time.
- **📖 Book Manuscript Text**:
  - The complete unabridged ~1,000-word passage from your book for instant reference.

### 3. One-Click Exports
- **📋 Copy AV Script**: Copies the entire formatted Two-Column Markdown table to your clipboard for pasting into Google Docs, Notion, or Final Draft.
- **💾 Export Package (.md)**: Saves the complete script, visual shotlist, and music cues to a local Markdown file.
- **🌐 Moving Image Archive**: Quick access to browse all 120,000+ public-domain shots.

