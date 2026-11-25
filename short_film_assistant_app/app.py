"""
Short Film Assistant — Desktop Application
Author: Jose Marichal (Technology & Society Working Group)
Adapts book manuscript passages into unique 3-4 minute cinematic video essays,
mapping visual cues to MovingImageArchive.com collections and public-domain scores from Archive.org.
"""

import os
import sys
import json
import webbrowser
import threading
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext, filedialog

# Ensure stdout/stderr are valid under pythonw.exe (no console window)
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

# Add current folder to path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from archive_music import get_curated_tracks, search_internet_archive_audio, CURATED_ARCHIVE_TRACKS
from film_treatment_engine import (
    generate_film_treatment,
    generate_llm_film_treatment,
    get_available_ollama_models,
    format_treatment_as_markdown,
    MIA_COLLECTIONS
)

# Path to the 55 passages index
PASSAGES_INDEX_PATH = os.path.join(os.path.dirname(BASE_DIR), "passage_matcher_app", "firms_market_index.json")

DIRECTOR_STYLES = [
    "Adam Curtis Counterpoint",
    "Vox Visual Explainer",
    "Errol Morris Interrotron",
    "Poetic Essay Film"
]


class ShortFilmAssistantApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🎬 Short Film Assistant — Video Essays from Book Manuscript")
        self.root.geometry("1340x860")
        self.root.minsize(1080, 720)

        # Set window icon
        icon_path = os.path.join(BASE_DIR, "film_icon.ico")
        if os.path.exists(icon_path):
            try:
                self.root.iconbitmap(icon_path)
            except Exception:
                pass

        # Apply dark theme styling
        self.setup_dark_theme()

        # Load manuscript data
        self.passages = self.load_passages()
        self.current_treatment = None
        self.selected_passage = None
        self.ollama_available, self.ollama_models = get_available_ollama_models()

        # Build UI layout
        self.build_ui()

        # Select first passage by default
        if self.passages:
            self.passages_listbox.select_set(0)
            self.on_passage_select(None)

    def setup_dark_theme(self):
        self.root.configure(bg="#121316")
        style = ttk.Style()
        style.theme_use("clam")

        # Global Colors
        self.BG_MAIN = "#121316"
        self.BG_PANEL = "#1c1e24"
        self.BG_CARD = "#252830"
        self.TEXT_MAIN = "#f1f5f9"
        self.TEXT_MUTED = "#94a3b8"
        self.ACCENT_GOLD = "#f59e0b"
        self.ACCENT_CYAN = "#38bdf8"
        self.ACCENT_GREEN = "#10b981"
        self.ACCENT_ROSE = "#f43f5e"

        style.configure(".", background=self.BG_MAIN, foreground=self.TEXT_MAIN, font=("Segoe UI", 10))
        style.configure("TLabel", background=self.BG_MAIN, foreground=self.TEXT_MAIN)
        style.configure("Panel.TFrame", background=self.BG_PANEL)
        style.configure("Card.TFrame", background=self.BG_CARD, relief="flat")

        # Notebook Tab styling
        style.configure("TNotebook", background=self.BG_MAIN, borderwidth=0)
        style.configure("TNotebook.Tab", background="#2a2d36", foreground=self.TEXT_MUTED, padding=[16, 8], font=("Segoe UI", 10, "bold"))
        style.map("TNotebook.Tab", background=[("selected", self.BG_PANEL)], foreground=[("selected", self.ACCENT_CYAN)])

        # Button styling
        style.configure("Primary.TButton", background=self.ACCENT_CYAN, foreground="#0f172a", font=("Segoe UI", 9, "bold"), padding=[10, 5])
        style.map("Primary.TButton", background=[("active", "#0284c7")])

        style.configure("Gold.TButton", background=self.ACCENT_GOLD, foreground="#0f172a", font=("Segoe UI", 9, "bold"), padding=[10, 5])
        style.map("Gold.TButton", background=[("active", "#d97706")])

        style.configure("Action.TButton", background="#334155", foreground="#ffffff", font=("Segoe UI", 9), padding=[8, 4])
        style.map("Action.TButton", background=[("active", "#475569")])

    def load_passages(self):
        """Load the 55 book passages from firms_market_index.json."""
        if os.path.exists(PASSAGES_INDEX_PATH):
            try:
                with open(PASSAGES_INDEX_PATH, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"Error loading passages: {e}")
        return []

    def build_ui(self):
        # Header Bar
        header = tk.Frame(self.root, bg=self.BG_PANEL, height=58)
        header.pack(fill="x", side="top", padx=0, pady=0)

        title_lbl = tk.Label(header, text="🎬 SHORT FILM ASSISTANT", bg=self.BG_PANEL, fg=self.ACCENT_GOLD, font=("Segoe UI", 13, "bold"))
        title_lbl.pack(side="left", padx=14, pady=10)

        # Director Style Selector
        tk.Label(header, text="Director Style:", bg=self.BG_PANEL, fg=self.TEXT_MUTED, font=("Segoe UI", 9, "bold")).pack(side="left", padx=(8, 4))
        self.style_var = tk.StringVar(value=DIRECTOR_STYLES[0])
        style_combo = ttk.Combobox(header, textvariable=self.style_var, values=DIRECTOR_STYLES, state="readonly", width=23)
        style_combo.pack(side="left", padx=4, pady=10)
        style_combo.bind("<<ComboboxSelected>>", lambda e: self.regenerate_current_passage())

        # Top Right Action Buttons
        btn_archive = ttk.Button(header, text="🌐 Moving Image Archive", style="Action.TButton", command=lambda: webbrowser.open("https://www.movingimagearchive.com/collections"))
        btn_archive.pack(side="right", padx=10, pady=10)

        btn_export = ttk.Button(header, text="💾 Export (.md)", style="Action.TButton", command=self.export_markdown)
        btn_export.pack(side="right", padx=4, pady=10)

        btn_copy = ttk.Button(header, text="📋 Copy AV Script", style="Gold.TButton", command=self.copy_av_script)
        btn_copy.pack(side="right", padx=4, pady=10)

        self.btn_llm = ttk.Button(header, text="✨ Polish with Local LLM", style="Primary.TButton", command=self.run_llm_rewrite)
        self.btn_llm.pack(side="right", padx=6, pady=10)

        # Main Horizontal Paned Split
        paned = tk.PanedWindow(self.root, orient="horizontal", bg=self.BG_MAIN, bd=0, sashwidth=4, sashpad=2)
        paned.pack(fill="both", expand=True, padx=12, pady=12)

        # --- LEFT SIDEBAR: Passage & Concept Selector ---
        sidebar = tk.Frame(paned, bg=self.BG_PANEL, width=350)
        paned.add(sidebar, minsize=290)

        # Search Bar
        search_frame = tk.Frame(sidebar, bg=self.BG_PANEL)
        search_frame.pack(fill="x", padx=12, pady=10)

        tk.Label(search_frame, text="🔍 Search Manuscript / Concepts:", bg=self.BG_PANEL, fg=self.TEXT_MUTED, font=("Segoe UI", 9, "bold")).pack(anchor="w")
        self.search_var = tk.StringVar()
        self.search_var.trace_add("write", self.filter_passages)
        search_entry = tk.Entry(search_frame, textvariable=self.search_var, bg="#2a2d36", fg="#ffffff", insertbackground="#ffffff", font=("Segoe UI", 10), bd=0, relief="flat")
        search_entry.pack(fill="x", pady=4, ipady=4)

        # Chapter Filter Dropdown
        filter_frame = tk.Frame(sidebar, bg=self.BG_PANEL)
        filter_frame.pack(fill="x", padx=12, pady=(0, 8))

        tk.Label(filter_frame, text="Filter by Chapter:", bg=self.BG_PANEL, fg=self.TEXT_MUTED, font=("Segoe UI", 9)).pack(anchor="w")
        chapters = ["All Chapters"] + sorted(list(set(p.get("chapter", "Other") for p in self.passages)))
        self.chapter_var = tk.StringVar(value="All Chapters")
        chapter_menu = ttk.Combobox(filter_frame, textvariable=self.chapter_var, values=chapters, state="readonly")
        chapter_menu.pack(fill="x", pady=2)
        chapter_menu.bind("<<ComboboxSelected>>", self.filter_passages)

        # Passages Listbox
        list_frame = tk.Frame(sidebar, bg=self.BG_PANEL)
        list_frame.pack(fill="both", expand=True, padx=12, pady=6)

        self.passages_listbox = tk.Listbox(
            list_frame, bg="#23262e", fg="#e2e8f0", selectbackground=self.ACCENT_CYAN,
            selectforeground="#0f172a", font=("Segoe UI", 9), bd=0, highlightthickness=0, activestyle="none"
        )
        scrollbar = ttk.Scrollbar(list_frame, orient="vertical", command=self.passages_listbox.yview)
        self.passages_listbox.configure(yscrollcommand=scrollbar.set)
        self.passages_listbox.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        self.passages_listbox.bind("<<ListboxSelect>>", self.on_passage_select)

        # Sidebar footer stats
        self.stats_lbl = tk.Label(sidebar, text=f"📚 {len(self.passages)} Unique Book Passages Loaded", bg=self.BG_PANEL, fg=self.TEXT_MUTED, font=("Segoe UI", 9, "italic"))
        self.stats_lbl.pack(fill="x", padx=12, pady=10)

        # --- RIGHT MAIN WORKSPACE: Tabs ---
        main_workspace = tk.Frame(paned, bg=self.BG_MAIN)
        paned.add(main_workspace, minsize=640)

        # Passage Banner Card
        self.banner_frame = tk.Frame(main_workspace, bg=self.BG_CARD, height=78)
        self.banner_frame.pack(fill="x", padx=6, pady=(0, 10))

        self.banner_title = tk.Label(self.banner_frame, text="Select a passage to generate film treatment", bg=self.BG_CARD, fg="#ffffff", font=("Segoe UI", 12, "bold"))
        self.banner_title.pack(anchor="w", padx=14, pady=(8, 2))

        self.banner_meta = tk.Label(self.banner_frame, text="", bg=self.BG_CARD, fg=self.ACCENT_CYAN, font=("Segoe UI", 9))
        self.banner_meta.pack(anchor="w", padx=14, pady=(0, 8))

        # Notebook Tabs
        self.notebook = ttk.Notebook(main_workspace)
        self.notebook.pack(fill="both", expand=True, padx=6, pady=0)

        # Tab 1: Two-Column AV Script
        self.tab_av = tk.Frame(self.notebook, bg=self.BG_PANEL)
        self.notebook.add(self.tab_av, text="🎞️ Two-Column AV Script")
        self.build_av_script_tab()

        # Tab 2: Internet Archive Music Box
        self.tab_music = tk.Frame(self.notebook, bg=self.BG_PANEL)
        self.notebook.add(self.tab_music, text="🎵 Internet Archive Music Box")
        self.build_music_box_tab()

        # Tab 3: Teleprompter / Studio Reader
        self.tab_teleprompter = tk.Frame(self.notebook, bg=self.BG_PANEL)
        self.notebook.add(self.tab_teleprompter, text="🎙️ Teleprompter Studio")
        self.build_teleprompter_tab()

        # Tab 4: Manuscript Passage
        self.tab_manuscript = tk.Frame(self.notebook, bg=self.BG_PANEL)
        self.notebook.add(self.tab_manuscript, text="📖 Book Manuscript Text")
        self.build_manuscript_tab()

        # Populate initial list
        self.filter_passages()

    def filter_passages(self, *args):
        """Filter the sidebar listbox based on search query and chapter dropdown."""
        query = self.search_var.get().lower()
        selected_chap = self.chapter_var.get()

        self.passages_listbox.delete(0, tk.END)
        self.filtered_indices = []

        for idx, p in enumerate(self.passages):
            chap = p.get("chapter", "")
            produce = p.get("produce_catalog", ["Untitled"])
            title = produce[0] if produce else "Passage"
            firm_name = p.get("firm_name", "")
            text = p.get("text", "")

            if selected_chap != "All Chapters" and chap != selected_chap:
                continue

            if query and not (
                query in title.lower() or
                query in chap.lower() or
                query in firm_name.lower() or
                query in text.lower() or
                any(query in c.lower() for c in produce)
            ):
                continue

            disp_text = f"{p.get('firm_id', f'P-{idx+1}')}: {title}"
            self.passages_listbox.insert(tk.END, disp_text)
            self.filtered_indices.append(idx)

    def on_passage_select(self, event):
        """Handle user clicking a passage in the listbox."""
        sel = self.passages_listbox.curselection()
        if not sel:
            return
        filtered_idx = sel[0]
        if filtered_idx >= len(self.filtered_indices):
            return
        actual_idx = self.filtered_indices[filtered_idx]
        passage_data = self.passages[actual_idx]
        self.selected_passage = passage_data
        self.regenerate_current_passage()

    def regenerate_current_passage(self):
        if not self.selected_passage:
            return
        passage_data = self.selected_passage
        style_mode = self.style_var.get()

        produce = passage_data.get("produce_catalog", ["Concept"])
        title = produce[0] if produce else "Concept"
        concepts_str = " • ".join(produce[:4])
        self.banner_title.config(text=f"🎞️ {passage_data.get('firm_id', '')}: {title} — ({passage_data.get('firm_name', '')})")
        self.banner_meta.config(
            text=f"Chapter: {passage_data.get('chapter', 'N/A')}  |  Concepts: {concepts_str}"
        )

        # Update Full Manuscript Text Tab
        self.manuscript_text.delete("1.0", tk.END)
        self.manuscript_text.insert(tk.END, passage_data.get("text", ""))

        # Generate passage-specific Film Treatment
        self.current_treatment = generate_film_treatment(passage_data, style_mode=style_mode)
        self.render_treatment()

    def run_llm_rewrite(self):
        """Optionally rewrite the script using local Ollama LLM."""
        if not self.selected_passage:
            return
        avail, models = get_available_ollama_models()
        if not avail or not models:
            messagebox.showwarning(
                "Local LLM Not Running",
                "Could not connect to a local Ollama server at http://localhost:11434.\n\n"
                "The built-in Passage Script Engine is already generating unique scripts directly "
                "from your manuscript! Start Ollama if you also want generative AI rewrites."
            )
            return

        chosen_model = models[0]
        for pref in ["llama3:latest", "mistral:latest", "qwen2.5:latest"]:
            if pref in models:
                chosen_model = pref
                break

        self.btn_llm.config(text=f"⏳ Drafting ({chosen_model})...", state="disabled")
        passage = self.selected_passage
        style_mode = self.style_var.get()

        def worker():
            try:
                new_t = generate_llm_film_treatment(passage, style_mode=style_mode, model=chosen_model)
                self.root.after(0, lambda: self._on_llm_done(new_t, None))
            except Exception as e:
                self.root.after(0, lambda: self._on_llm_done(None, str(e)))

        threading.Thread(target=worker, daemon=True).start()

    def _on_llm_done(self, new_treatment, err):
        self.btn_llm.config(text="✨ Polish with Local LLM", state="normal")
        if err or not new_treatment:
            messagebox.showerror("LLM Error", f"Failed to rewrite with Ollama:\n{err}")
            return
        self.current_treatment = new_treatment
        self.render_treatment()

    def build_av_script_tab(self):
        container = tk.Frame(self.tab_av, bg=self.BG_PANEL)
        container.pack(fill="both", expand=True, padx=12, pady=12)

        self.av_canvas = tk.Canvas(container, bg=self.BG_PANEL, bd=0, highlightthickness=0)
        self.av_scrollbar = ttk.Scrollbar(container, orient="vertical", command=self.av_canvas.yview)
        self.av_scroll_frame = tk.Frame(self.av_canvas, bg=self.BG_PANEL)

        self.av_scroll_frame.bind(
            "<Configure>",
            lambda e: self.av_canvas.configure(scrollregion=self.av_canvas.bbox("all"))
        )
        self.av_canvas_window = self.av_canvas.create_window((0, 0), window=self.av_scroll_frame, anchor="nw")
        self.av_canvas.configure(yscrollcommand=self.av_scrollbar.set)

        self.av_canvas.pack(side="left", fill="both", expand=True)
        self.av_scrollbar.pack(side="right", fill="y")

        self.av_canvas.bind(
            "<Configure>",
            lambda e: self.av_canvas.itemconfig(self.av_canvas_window, width=e.width)
        )

    def render_treatment(self):
        """Render the 4 unique beats of the AV script into the scrollable frame."""
        for widget in self.av_scroll_frame.winfo_children():
            widget.destroy()

        if not self.current_treatment:
            return

        t = self.current_treatment

        # Header summary box
        summary_card = tk.Frame(self.av_scroll_frame, bg=self.BG_CARD, bd=1, relief="solid")
        summary_card.pack(fill="x", pady=(0, 12), ipady=6)

        tk.Label(summary_card, text=f"FILM TITLE: {t['title']}", bg=self.BG_CARD, fg=self.ACCENT_GOLD, font=("Segoe UI", 11, "bold")).pack(anchor="w", padx=12, pady=(4, 2))
        tk.Label(summary_card, text=f"LOGLINE: {t['logline']}", bg=self.BG_CARD, fg=self.TEXT_MAIN, font=("Segoe UI", 9, "italic"), wraplength=820, justify="left").pack(anchor="w", padx=12, pady=(0, 4))

        meta_row = tk.Frame(summary_card, bg=self.BG_CARD)
        meta_row.pack(fill="x", padx=12, pady=(2, 4))
        tk.Label(meta_row, text=f"🎬 Style: {t.get('style_mode', '')}", bg=self.BG_CARD, fg="#cbd5e1", font=("Segoe UI", 9, "bold")).pack(side="left", padx=(0, 16))
        tk.Label(meta_row, text=f"⏱️ Runtime: ~{t['est_runtime_min']} min ({t['total_words']} words)", bg=self.BG_CARD, fg=self.ACCENT_CYAN, font=("Segoe UI", 9, "bold")).pack(side="left", padx=(0, 16))
        tk.Label(meta_row, text=f"🎵 Score: {t['soundtrack_suggestion']}", bg=self.BG_CARD, fg=self.ACCENT_GREEN, font=("Segoe UI", 9)).pack(side="left")

        # Render each beat
        for b in t["beats"]:
            beat_card = tk.Frame(self.av_scroll_frame, bg=self.BG_CARD, bd=1, relief="solid")
            beat_card.pack(fill="x", pady=6, ipady=4)

            # Beat header
            b_hdr = tk.Frame(beat_card, bg=self.BG_CARD)
            b_hdr.pack(fill="x", padx=12, pady=(6, 4))
            tk.Label(b_hdr, text=b["title"], bg=self.BG_CARD, fg="#ffffff", font=("Segoe UI", 10, "bold")).pack(side="left")
            tk.Label(b_hdr, text=f"⏱️ {b['timecode']}", bg="#334155", fg="#f8fafc", font=("Segoe UI", 8, "bold"), padx=6, pady=2).pack(side="right")

            # Two Column Grid: Left VO, Right Visual
            grid_frame = tk.Frame(beat_card, bg=self.BG_CARD)
            grid_frame.pack(fill="x", padx=12, pady=4)

            # Left VO Col
            vo_frame = tk.Frame(grid_frame, bg="#1e2129", bd=1, relief="flat")
            vo_frame.pack(side="left", fill="both", expand=True, padx=(0, 6), pady=4)
            tk.Label(vo_frame, text="🎙️ VOICE-OVER NARRATION (ADAPTED FROM MANUSCRIPT):", bg="#1e2129", fg=self.ACCENT_CYAN, font=("Segoe UI", 8, "bold")).pack(anchor="w", padx=8, pady=(4, 2))
            vo_txt = tk.Label(vo_frame, text=b["vo_narration"], bg="#1e2129", fg=self.TEXT_MAIN, font=("Segoe UI", 9), wraplength=440, justify="left")
            vo_txt.pack(anchor="w", padx=8, pady=(0, 8))

            # Right Visual Cue Col
            vis_frame = tk.Frame(grid_frame, bg="#1a202c", bd=1, relief="flat")
            vis_frame.pack(side="right", fill="both", expand=True, padx=(6, 0), pady=4)
            tk.Label(vis_frame, text="🎞️ ARCHIVAL VISUAL CUE & SHOT DIRECTION:", bg="#1a202c", fg=self.ACCENT_GOLD, font=("Segoe UI", 8, "bold")).pack(anchor="w", padx=8, pady=(4, 2))
            vis_txt = tk.Label(vis_frame, text=b["visual_cue"], bg="#1a202c", fg="#cbd5e1", font=("Segoe UI", 9, "italic"), wraplength=340, justify="left")
            vis_txt.pack(anchor="w", padx=8, pady=(0, 4))

            # Search Keywords Line
            sq_lbl = tk.Label(vis_frame, text=f"🔍 Keywords: {b['search_query']}", bg="#1a202c", fg="#94a3b8", font=("Segoe UI", 8), wraplength=340, justify="left")
            sq_lbl.pack(anchor="w", padx=8, pady=(0, 4))

            # Moving Image Archive Collection & Link Buttons
            mia_row = tk.Frame(vis_frame, bg="#1a202c")
            mia_row.pack(fill="x", padx=8, pady=(2, 6))
            tk.Label(mia_row, text=f"📂 {b['archive_collection']}", bg="#1a202c", fg=self.ACCENT_GREEN, font=("Segoe UI", 8, "bold")).pack(side="left")

            cat_url = b["archive_url"]
            sq_val = b["search_query"]
            ttk.Button(mia_row, text="Open Archive ↗", style="Action.TButton", command=lambda u=cat_url: webbrowser.open(u)).pack(side="right", padx=(4, 0))
            ttk.Button(mia_row, text="Copy Keywords", style="Action.TButton", command=lambda q=sq_val: self.copy_to_clipboard(q, f"Copied search keywords:\n{q}")).pack(side="right")

        # Reset scroll to top
        self.av_canvas.yview_moveto(0.0)

        # Update Teleprompter
        self.teleprompter_text.delete("1.0", tk.END)
        self.teleprompter_text.insert(tk.END, t["teleprompter_text"])

    def build_music_box_tab(self):
        container = tk.Frame(self.tab_music, bg=self.BG_PANEL)
        container.pack(fill="both", expand=True, padx=12, pady=12)

        top_bar = tk.Frame(container, bg=self.BG_PANEL)
        top_bar.pack(fill="x", pady=(0, 10))

        tk.Label(top_bar, text="🎵 Public Domain Soundtrack Finder:", bg=self.BG_PANEL, fg=self.ACCENT_GOLD, font=("Segoe UI", 11, "bold")).pack(side="left", padx=(0, 12))

        self.music_search_var = tk.StringVar()
        m_entry = tk.Entry(top_bar, textvariable=self.music_search_var, bg="#2a2d36", fg="#ffffff", font=("Segoe UI", 9), width=30, insertbackground="#ffffff")
        m_entry.pack(side="left", padx=6, ipady=3)
        m_entry.bind("<Return>", lambda e: self.search_music())

        btn_search = ttk.Button(top_bar, text="🔍 Search Archive.org", style="Action.TButton", command=self.search_music)
        btn_search.pack(side="left", padx=4)

        tk.Label(top_bar, text="Filter Mood:", bg=self.BG_PANEL, fg=self.TEXT_MUTED, font=("Segoe UI", 9)).pack(side="left", padx=(16, 4))
        moods = [
            "All Moods",
            "Dystopian / Cybernetic Drone",
            "1950s Industrial / Educational Optimism",
            "Melancholy / Philosophical Solitude",
            "Investigative / Cold War Tension"
        ]
        self.music_mood_var = tk.StringVar(value="All Moods")
        mood_menu = ttk.Combobox(top_bar, textvariable=self.music_mood_var, values=moods, state="readonly", width=28)
        mood_menu.pack(side="left", padx=4)
        mood_menu.bind("<<ComboboxSelected>>", lambda e: self.refresh_music_tracks())

        m_container = tk.Frame(container, bg=self.BG_PANEL)
        m_container.pack(fill="both", expand=True)

        self.m_canvas = tk.Canvas(m_container, bg=self.BG_PANEL, bd=0, highlightthickness=0)
        self.m_scrollbar = ttk.Scrollbar(m_container, orient="vertical", command=self.m_canvas.yview)
        self.m_scroll_frame = tk.Frame(self.m_canvas, bg=self.BG_PANEL)

        self.m_scroll_frame.bind(
            "<Configure>",
            lambda e: self.m_canvas.configure(scrollregion=self.m_canvas.bbox("all"))
        )
        self.m_canvas_window = self.m_canvas.create_window((0, 0), window=self.m_scroll_frame, anchor="nw")
        self.m_canvas.configure(yscrollcommand=self.m_scrollbar.set)

        self.m_canvas.pack(side="left", fill="both", expand=True)
        self.m_scrollbar.pack(side="right", fill="y")

        self.m_canvas.bind(
            "<Configure>",
            lambda e: self.m_canvas.itemconfig(self.m_canvas_window, width=e.width)
        )

        self.refresh_music_tracks()

    def refresh_music_tracks(self, tracks=None):
        for widget in self.m_scroll_frame.winfo_children():
            widget.destroy()

        if tracks is None:
            mood = self.music_mood_var.get()
            tracks = get_curated_tracks(mood)

        for trk in tracks:
            card = tk.Frame(self.m_scroll_frame, bg=self.BG_CARD, bd=1, relief="solid")
            card.pack(fill="x", pady=6, padx=6, ipady=6)

            hdr = tk.Frame(card, bg=self.BG_CARD)
            hdr.pack(fill="x", padx=12, pady=(4, 2))
            tk.Label(hdr, text=f"🎵 {trk['title']}", bg=self.BG_CARD, fg=self.ACCENT_CYAN, font=("Segoe UI", 10, "bold")).pack(side="left")
            tk.Label(hdr, text=trk.get("license", "Public Domain"), bg="#065f46", fg="#d1fae5", font=("Segoe UI", 8, "bold"), padx=6, pady=2).pack(side="right")

            sub_txt = f"Artist: {trk['artist']}  |  Mood: {trk['mood']}"
            tk.Label(card, text=sub_txt, bg=self.BG_CARD, fg=self.TEXT_MUTED, font=("Segoe UI", 8, "italic")).pack(anchor="w", padx=12, pady=(0, 4))

            tk.Label(card, text=trk["description"], bg=self.BG_CARD, fg=self.TEXT_MAIN, font=("Segoe UI", 9), wraplength=700, justify="left").pack(anchor="w", padx=12, pady=(0, 6))

            btn_row = tk.Frame(card, bg=self.BG_CARD)
            btn_row.pack(fill="x", padx=12, pady=(2, 4))

            stream_u = trk.get("archive_url", "")
            ttk.Button(btn_row, text="▶ Preview on Archive.org", style="Gold.TButton", command=lambda u=stream_u: webbrowser.open(u)).pack(side="left", padx=(0, 8))
            ttk.Button(btn_row, text="📋 Copy Audio Link", style="Action.TButton", command=lambda u=stream_u: self.copy_to_clipboard(u, "Audio URL copied!")).pack(side="left")

    def search_music(self):
        query = self.music_search_var.get().strip()
        if not query:
            self.refresh_music_tracks()
            return

        def run_search():
            res = search_internet_archive_audio(query)
            self.root.after(0, lambda: self.refresh_music_tracks(res))

        threading.Thread(target=run_search, daemon=True).start()

    def build_teleprompter_tab(self):
        container = tk.Frame(self.tab_teleprompter, bg=self.BG_PANEL)
        container.pack(fill="both", expand=True, padx=12, pady=12)

        ctrl_row = tk.Frame(container, bg=self.BG_PANEL)
        ctrl_row.pack(fill="x", pady=(0, 8))

        tk.Label(ctrl_row, text="🎙️ STUDIO VOICE-OVER TELEPROMPTER", bg=self.BG_PANEL, fg=self.ACCENT_CYAN, font=("Segoe UI", 11, "bold")).pack(side="left")
        ttk.Button(ctrl_row, text="📋 Copy Teleprompter Text", style="Action.TButton", command=lambda: self.copy_to_clipboard(self.teleprompter_text.get("1.0", tk.END), "Teleprompter text copied!")).pack(side="right")

        self.teleprompter_text = scrolledtext.ScrolledText(
            container, bg="#1a1c23", fg="#f8fafc", insertbackground="#ffffff",
            font=("Consolas", 12), wrap="word", bd=0, padx=16, pady=16
        )
        self.teleprompter_text.pack(fill="both", expand=True)

    def build_manuscript_tab(self):
        container = tk.Frame(self.tab_manuscript, bg=self.BG_PANEL)
        container.pack(fill="both", expand=True, padx=12, pady=12)

        self.manuscript_text = scrolledtext.ScrolledText(
            container, bg="#181920", fg="#e2e8f0", insertbackground="#ffffff",
            font=("Georgia", 11), wrap="word", bd=0, padx=16, pady=16
        )
        self.manuscript_text.pack(fill="both", expand=True)

    def copy_av_script(self):
        if not self.current_treatment:
            return
        md = format_treatment_as_markdown(self.current_treatment)
        self.copy_to_clipboard(md, "AV Script Markdown copied to clipboard!")

    def export_markdown(self):
        if not self.current_treatment:
            return
        md = format_treatment_as_markdown(self.current_treatment)
        file_path = filedialog.asksaveasfilename(
            defaultextension=".md",
            filetypes=[("Markdown Files", "*.md"), ("Text Files", "*.txt")],
            initialfile=f"video_essay_{self.current_treatment['firm_id'].lower()}_{self.current_treatment['primary_concept'].lower().replace(' ', '_')}.md"
        )
        if file_path:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(md)
            messagebox.showinfo("Export Successful", f"Saved treatment to:\n{file_path}")

    def copy_to_clipboard(self, text, message="Copied to clipboard!"):
        self.root.clipboard_clear()
        self.root.clipboard_append(text)
        self.root.update()
        messagebox.showinfo("Clipboard", message)


def main():
    root = tk.Tk()
    app = ShortFilmAssistantApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
