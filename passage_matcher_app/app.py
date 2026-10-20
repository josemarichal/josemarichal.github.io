import os
import sys

# Ensure stdout/stderr are valid under pythonw.exe (no console window)
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

import json
import time
import threading
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from proposal_engine import generate_agency_proposal, format_proposal_as_text
from ollama_client import get_available_ollama_models, generate_llm_proposal

# Sentence Transformers for neural semantic embeddings
USE_TRANSFORMERS = False
try:
    from sentence_transformers import SentenceTransformer
    USE_TRANSFORMERS = True
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AGENCIES_INDEX_FILE = os.path.join(BASE_DIR, "firms_market_index.json")
EMBEDDINGS_FILE = os.path.join(BASE_DIR, "firms_embeddings.npy")
CAMPAIGNS_FILE = os.path.join(BASE_DIR, "campaign_ledger.json")
ICON_FILE = os.path.join(BASE_DIR, "app_icon.ico")

# Quick Media RFP Presets for testing
PRESET_RFPS = [
    {
        "label": "Tech Burnout & Slack Clutter",
        "text": "Tech workers and knowledge professionals report severe cognitive fatigue and burnout from hundreds of daily Slack notifications, endless emails, and unstructured digital clutter."
    },
    {
        "label": "Ring Cameras & Suburban Paranoia",
        "text": "Suburban homeowners are installing Ring smart cameras and sharing Ring Neighbors telemetry, turning ordinary neighborhood activities into constant perceived crime threats."
    },
    {
        "label": "Cloud Monopolies & Technofeudalism",
        "text": "Trillion-dollar cloud platforms now extract algorithmic rents across all commerce, replacing open competitive markets with private digital fiefdoms."
    },
    {
        "label": "AI Optimization & Outlier Suppression",
        "text": "Corporate machine learning systems enforce rigid predictive model fitting, treating creative nonconformists and independent thinkers as problematic outliers to be smoothed out."
    },
    {
        "label": "Viral Outrage & Social Algorithms",
        "text": "Recommendation algorithms intentionally amplify tribal rage and affective polarization because moral outrage generates the highest engagement margins."
    }
]


class MediaRelationsExchangeApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("The Media Relations Exchange — 55 PR Agencies Competing to Pitch Your Ideas")
        self.geometry("1300x900")
        self.minsize(1080, 740)

        # Set window icon if available
        if os.path.exists(ICON_FILE):
            try:
                self.iconbitmap(ICON_FILE)
            except Exception:
                pass

        # Style configuration
        self.style = ttk.Style(self)
        try:
            self.style.theme_use("clam")
        except Exception:
            pass

        self._configure_styles()

        # Data state
        self.agencies = []
        self.agency_embeddings = None
        self.embed_model = None
        self.campaigns = []
        self.current_competition_results = []
        self.active_proposals = {}  # Cache generated proposals for current query
        self.current_drawer_agency = None

        # Check local Ollama models
        self.ollama_available, self.installed_models = get_available_ollama_models()

        self.load_data()
        self.build_ui()

        # Initial table renders
        self.refresh_exchange_board()
        self.refresh_angles_directory()
        self.refresh_campaigns_table()

    def _configure_styles(self):
        self.configure(bg="#0f172a")

        self.style.configure(".", background="#f8fafc", foreground="#0f172a", font=("Segoe UI", 9))
        self.style.configure("TFrame", background="#f8fafc")
        self.style.configure("TLabelframe", background="#f8fafc", foreground="#1e293b", font=("Segoe UI", 9, "bold"))
        self.style.configure("TLabelframe.Label", background="#f8fafc", foreground="#1e293b", font=("Segoe UI", 9, "bold"))

        # Header Styles
        self.style.configure("Header.TFrame", background="#0f172a")
        self.style.configure("HeaderTitle.TLabel", background="#0f172a", foreground="#f8fafc", font=("Segoe UI", 16, "bold"))
        self.style.configure("HeaderSubtitle.TLabel", background="#0f172a", foreground="#94a3b8", font=("Segoe UI", 9))
        self.style.configure("HeaderStat.TLabel", background="#1e293b", foreground="#38bdf8", font=("Consolas", 10, "bold"), padding=6)

        # Buttons
        self.style.configure("Primary.TButton", font=("Segoe UI", 10, "bold"), foreground="#ffffff", background="#2563eb", padding=(10, 7))
        self.style.map("Primary.TButton", background=[("active", "#1d4ed8"), ("pressed", "#1e40af")])

        self.style.configure("LLM.TButton", font=("Segoe UI", 9, "bold"), foreground="#7c3aed", background="#ede9fe", padding=(8, 4))
        self.style.map("LLM.TButton", background=[("active", "#ddd6fe"), ("pressed", "#c4b5fd")])

        self.style.configure("Preset.TButton", font=("Segoe UI", 8), padding=(5, 3))
        self.style.configure("Hire.TButton", font=("Segoe UI", 9, "bold"), foreground="#ffffff", background="#059669", padding=(8, 5))
        self.style.map("Hire.TButton", background=[("active", "#047857"), ("pressed", "#065f46")])

        # Treeview styling
        self.style.configure(
            "Treeview",
            background="#ffffff",
            foreground="#0f172a",
            fieldbackground="#ffffff",
            font=("Segoe UI", 9),
            rowheight=26
        )
        self.style.configure(
            "Treeview.Heading",
            background="#e2e8f0",
            foreground="#0f172a",
            font=("Segoe UI", 9, "bold")
        )
        self.style.map("Treeview", background=[("selected", "#38bdf8")], foreground=[("selected", "#0f172a")])

        # Notebook styling
        self.style.configure("TNotebook", background="#e2e8f0", tabmargins=[4, 4, 4, 0])
        self.style.configure("TNotebook.Tab", font=("Segoe UI", 9, "bold"), padding=(12, 6), background="#cbd5e1")
        self.style.map("TNotebook.Tab", background=[("selected", "#ffffff"), ("active", "#e2e8f0")], foreground=[("selected", "#2563eb")])

    def load_data(self):
        if os.path.exists(AGENCIES_INDEX_FILE):
            with open(AGENCIES_INDEX_FILE, "r", encoding="utf-8") as f:
                self.agencies = json.load(f)
        else:
            self.agencies = []

        if os.path.exists(EMBEDDINGS_FILE):
            try:
                self.agency_embeddings = np.load(EMBEDDINGS_FILE)
            except Exception as e:
                print(f"Warning: Could not load embeddings: {e}")
                self.agency_embeddings = None

        if os.path.exists(CAMPAIGNS_FILE):
            try:
                with open(CAMPAIGNS_FILE, "r", encoding="utf-8") as f:
                    self.campaigns = json.load(f)
            except Exception:
                self.campaigns = []
        else:
            self.campaigns = []

        retained_ids = {c["agency_id"] for c in self.campaigns}
        for a in self.agencies:
            aid = a.get("agency_id", a.get("firm_id", ""))
            a["is_retained"] = aid in retained_ids

    def save_campaigns(self):
        with open(CAMPAIGNS_FILE, "w", encoding="utf-8") as f:
            json.dump(self.campaigns, f, indent=2, ensure_ascii=False)

    def build_ui(self):
        # Top Header Bar (Executive Agency Ticker)
        header_frame = ttk.Frame(self, style="Header.TFrame", padding=(16, 12))
        header_frame.pack(fill=tk.X)

        title_box = ttk.Frame(header_frame, style="Header.TFrame")
        title_box.pack(side=tk.LEFT, fill=tk.Y)

        title_lbl = ttk.Label(
            title_box,
            text="📣 THE MEDIA RELATIONS EXCHANGE",
            style="HeaderTitle.TLabel"
        )
        title_lbl.pack(anchor="w")

        subtitle_lbl = ttk.Label(
            title_box,
            text="55 Strategic Communications Agencies Competing with Tailored PR, Op-Ed, Social & Video Pitches",
            style="HeaderSubtitle.TLabel"
        )
        subtitle_lbl.pack(anchor="w", pady=(2, 0))

        # Real-time Ticker Metrics
        self.ticker_lbl = ttk.Label(
            header_frame,
            text="",
            style="HeaderStat.TLabel"
        )
        self.ticker_lbl.pack(side=tk.RIGHT, pady=2)
        self.update_ticker()

        # Main Paned Window
        main_paned = ttk.PanedWindow(self, orient=tk.HORIZONTAL)
        main_paned.pack(fill=tk.BOTH, expand=True, padx=12, pady=10)

        # =========================================================================
        # LEFT PANE: CLIENT MEDIA RFP & PARAMETERS
        # =========================================================================
        left_frame = ttk.Frame(main_paned, padding=10)
        main_paned.add(left_frame, weight=1)

        lbl_step1 = ttk.Label(left_frame, text="1. SUBMIT MEDIA RFP / PASTE CONTENT", font=("Segoe UI", 11, "bold"), foreground="#1e293b")
        lbl_step1.pack(anchor="w", pady=(0, 2))

        lbl_instruct = ttk.Label(
            left_frame,
            text="Paste an article, speech, or concept to solicit competing PR proposals from all 55 agencies:",
            font=("Segoe UI", 8),
            foreground="#64748b"
        )
        lbl_instruct.pack(anchor="w", pady=(0, 6))

        # Presets Bar
        presets_box = ttk.LabelFrame(left_frame, text="⚡ Quick RFP Presets", padding=6)
        presets_box.pack(fill=tk.X, pady=(0, 8))

        presets_inner = ttk.Frame(presets_box)
        presets_inner.pack(fill=tk.X)

        for p in PRESET_RFPS:
            btn = ttk.Button(
                presets_inner,
                text=p["label"],
                style="Preset.TButton",
                command=lambda val=p["text"]: self.set_preset_rfp(val)
            )
            btn.pack(side=tk.LEFT, padx=2, pady=2)

        # RFP Text Box
        self.rfp_text = scrolledtext.ScrolledText(
            left_frame,
            wrap=tk.WORD,
            font=("Segoe UI", 10),
            height=12,
            relief=tk.SOLID,
            borderwidth=1,
            highlightbackground="#cbd5e1",
            highlightthickness=1
        )
        self.rfp_text.pack(fill=tk.BOTH, expand=True, pady=(0, 8))

        # Parameters Frame
        params_box = ttk.LabelFrame(left_frame, text="⚙️ Proposal Evaluation & Generative LLM", padding=8)
        params_box.pack(fill=tk.X, pady=(0, 8))

        # Matching Engine selection
        engine_row = ttk.Frame(params_box)
        engine_row.pack(fill=tk.X, pady=2)
        ttk.Label(engine_row, text="Matching Engine:", font=("Segoe UI", 8, "bold")).pack(side=tk.LEFT, padx=(0, 8))
        self.engine_var = tk.StringVar(value="neural" if USE_TRANSFORMERS else "tfidf")
        ttk.Radiobutton(engine_row, text="Neural MiniLM", variable=self.engine_var, value="neural").pack(side=tk.LEFT, padx=(0, 8))
        ttk.Radiobutton(engine_row, text="TF-IDF Liquidity", variable=self.engine_var, value="tfidf").pack(side=tk.LEFT)

        # Generative Model Selection (Local LLM via Ollama)
        llm_row = ttk.Frame(params_box)
        llm_row.pack(fill=tk.X, pady=(6, 2))
        ttk.Label(llm_row, text="Generative LLM:", font=("Segoe UI", 8, "bold")).pack(side=tk.LEFT, padx=(0, 8))

        preferred_models = ["llama3:latest", "mistral:latest", "DeepSeek-R1:7b", "qwen2.5:7b"]
        avail_options = [m for m in preferred_models if m in self.installed_models]
        if not avail_options and self.installed_models:
            avail_options = self.installed_models[:4]
        avail_options.append("Instant Local Heuristic (Offline)")

        default_model = "llama3:latest" if "llama3:latest" in avail_options else avail_options[0]
        self.llm_model_var = tk.StringVar(value=default_model)

        self.llm_combo = ttk.Combobox(llm_row, textvariable=self.llm_model_var, values=avail_options, state="readonly", width=25)
        self.llm_combo.pack(side=tk.LEFT, padx=(0, 8))

        # Auto-generate checkbox
        self.auto_llm_var = tk.BooleanVar(value=False)
        auto_cb = ttk.Checkbutton(
            params_box,
            text="✨ Auto-draft Lead Pitch with Local LLM (Llama 3 / Mistral)",
            variable=self.auto_llm_var
        )
        auto_cb.pack(anchor="w", pady=(4, 0))

        # Action Buttons
        actions_frame = ttk.Frame(left_frame)
        actions_frame.pack(fill=tk.X, pady=4)

        self.compete_btn = ttk.Button(
            actions_frame,
            text="🚀 SOLICIT AGENCY PITCHES (55 AGENCIES COMPETE)",
            style="Primary.TButton",
            command=self.run_agency_competition
        )
        self.compete_btn.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 4))

        paste_btn = ttk.Button(actions_frame, text="📋 Paste", command=self.paste_clipboard)
        paste_btn.pack(side=tk.LEFT, padx=(0, 4))

        clear_btn = ttk.Button(actions_frame, text="🧹 Clear", command=self.clear_rfp)
        clear_btn.pack(side=tk.RIGHT)

        # =========================================================================
        # RIGHT PANE: PROPOSAL TABS & PITCH DECKS
        # =========================================================================
        right_frame = ttk.Frame(main_paned, padding=6)
        main_paned.add(right_frame, weight=2)

        self.notebook = ttk.Notebook(right_frame)
        self.notebook.pack(fill=tk.BOTH, expand=True)

        # Tab 1: Top Agency Pitch Decks
        self.tab_leaders = ttk.Frame(self.notebook, padding=10)
        self.notebook.add(self.tab_leaders, text="🏆 Top Agency Pitch Decks")
        self.build_leaders_tab()

        # Tab 2: Full 55-Agency Exchange Board
        self.tab_exchange = ttk.Frame(self.notebook, padding=10)
        self.notebook.add(self.tab_exchange, text="📊 All 55 Media Agencies Exchange")
        self.build_exchange_tab()

        # Tab 3: PR Angles & Produce Catalog
        self.tab_angles = ttk.Frame(self.notebook, padding=10)
        self.notebook.add(self.tab_angles, text="📦 PR Angles & Produce Catalog")
        self.build_angles_tab()

        # Tab 4: Retained Agencies Ledger
        self.tab_campaigns = ttk.Frame(self.notebook, padding=10)
        self.notebook.add(self.tab_campaigns, text="📜 Retained Agencies & Campaign Ledger")
        self.build_campaigns_tab()

    def build_leaders_tab(self):
        top_sub = ttk.Frame(self.tab_leaders)
        top_sub.pack(fill=tk.X, pady=(0, 8))

        self.competition_status_lbl = ttk.Label(
            top_sub,
            text="Submit content on the left and click 'Solicit Agency Pitches' to view the top 3 proposals.",
            font=("Segoe UI", 9, "italic"),
            foreground="#475569"
        )
        self.competition_status_lbl.pack(side=tk.LEFT)

        self.leaders_notebook = ttk.Notebook(self.tab_leaders)
        self.leaders_notebook.pack(fill=tk.BOTH, expand=True)

        self.leader_cards = []
        ranks = [
            ("🥇 Rank 1: Lead Agency Pitch", "#059669"),
            ("🥈 Rank 2: Alternative Angle", "#2563eb"),
            ("🥉 Rank 3: Challenger Pitch", "#d97706")
        ]

        for idx, (title, color) in enumerate(ranks):
            tab = ttk.Frame(self.leaders_notebook, padding=8)
            self.leaders_notebook.add(tab, text=f"Agency #{idx+1}")

            # Top Agency Profile Card
            profile_card = ttk.Frame(tab, relief=tk.SOLID, borderwidth=1, padding=10)
            profile_card.pack(fill=tk.X, pady=(0, 8))

            row1 = ttk.Frame(profile_card)
            row1.pack(fill=tk.X)

            badge_lbl = ttk.Label(row1, text=f"#{idx+1}", font=("Segoe UI", 12, "bold"), foreground=color)
            badge_lbl.pack(side=tk.LEFT, padx=(0, 8))

            name_lbl = ttk.Label(row1, text="No Competition Run Yet", font=("Segoe UI", 12, "bold"), foreground="#0f172a")
            name_lbl.pack(side=tk.LEFT, fill=tk.X, expand=True)

            share_badge = ttk.Label(row1, text="0.0% Proposal Fit", font=("Consolas", 11, "bold"), foreground=color)
            share_badge.pack(side=tk.RIGHT)

            # Row 2: Specialty & Strategic Angle
            spec_row = ttk.Frame(profile_card)
            spec_row.pack(fill=tk.X, pady=(4, 2))
            ttk.Label(spec_row, text="Agency Specialty:", font=("Segoe UI", 8, "bold"), foreground="#64748b").pack(side=tk.LEFT, padx=(0, 6))
            spec_lbl = ttk.Label(spec_row, text="—", font=("Segoe UI", 9, "bold"), foreground="#1e293b")
            spec_lbl.pack(side=tk.LEFT)

            llm_status_badge = ttk.Label(spec_row, text="[Draft: Heuristic]", font=("Segoe UI", 8, "italic"), foreground="#64748b")
            llm_status_badge.pack(side=tk.RIGHT)

            angle_row = ttk.Frame(profile_card)
            angle_row.pack(fill=tk.X, pady=(2, 4))
            ttk.Label(angle_row, text="Strategic Media Angle:", font=("Segoe UI", 8, "bold"), foreground="#64748b").pack(anchor="w")
            angle_lbl = ttk.Label(angle_row, text="—", font=("Segoe UI", 9), wraplength=740)
            angle_lbl.pack(anchor="w")

            # Row 3: Target Outlets
            meta_row = ttk.Frame(profile_card)
            meta_row.pack(fill=tk.X, pady=(2, 6))
            ttk.Label(meta_row, text="Target Outlets:", font=("Segoe UI", 8, "bold"), foreground="#64748b").pack(side=tk.LEFT, padx=(0, 6))
            outlets_lbl = ttk.Label(meta_row, text="—", font=("Segoe UI", 8, "italic"), foreground="#2563eb")
            outlets_lbl.pack(side=tk.LEFT)

            # Row 4: Action Buttons with LLM Generator Button
            btn_row = ttk.Frame(profile_card)
            btn_row.pack(fill=tk.X, pady=(4, 0))

            sector_lbl = ttk.Label(btn_row, text="Sector: —", font=("Segoe UI", 8), foreground="#64748b")
            sector_lbl.pack(side=tk.LEFT)

            hire_btn = ttk.Button(
                btn_row,
                text="🤝 Retain Agency",
                style="Hire.TButton",
                command=lambda r_idx=idx: self.hire_agency_by_rank(r_idx),
                state=tk.DISABLED
            )
            hire_btn.pack(side=tk.RIGHT, padx=(6, 0))

            copy_btn = ttk.Button(
                btn_row,
                text="📋 Copy Proposal",
                command=lambda r_idx=idx: self.copy_proposal_by_rank(r_idx),
                state=tk.DISABLED
            )
            copy_btn.pack(side=tk.RIGHT, padx=(6, 0))

            llm_btn = ttk.Button(
                btn_row,
                text="✨ Draft with Local LLM",
                style="LLM.TButton",
                command=lambda r_idx=idx: self.generate_card_with_local_llm(r_idx),
                state=tk.DISABLED
            )
            llm_btn.pack(side=tk.RIGHT)

            # Proposal Multi-Channel Notebook
            prop_notebook = ttk.Notebook(tab)
            prop_notebook.pack(fill=tk.BOTH, expand=True)

            tab_oped = ttk.Frame(prop_notebook, padding=8)
            prop_notebook.add(tab_oped, text="📰 Op-Ed & Blog Pitch")
            oped_txt = scrolledtext.ScrolledText(tab_oped, wrap=tk.WORD, font=("Georgia", 10), background="#ffffff", relief=tk.FLAT)
            oped_txt.pack(fill=tk.BOTH, expand=True)

            tab_social = ttk.Frame(prop_notebook, padding=8)
            prop_notebook.add(tab_social, text="📱 Social Media Campaign")
            social_txt = scrolledtext.ScrolledText(tab_social, wrap=tk.WORD, font=("Segoe UI", 10), background="#ffffff", relief=tk.FLAT)
            social_txt.pack(fill=tk.BOTH, expand=True)

            tab_video = ttk.Frame(prop_notebook, padding=8)
            prop_notebook.add(tab_video, text="🎥 Video & Multimedia Script")
            video_txt = scrolledtext.ScrolledText(tab_video, wrap=tk.WORD, font=("Segoe UI", 10), background="#ffffff", relief=tk.FLAT)
            video_txt.pack(fill=tk.BOTH, expand=True)

            tab_paper = ttk.Frame(prop_notebook, padding=8)
            prop_notebook.add(tab_paper, text="📑 Agency Research Whitepaper (~1,000 Words)")
            paper_txt = scrolledtext.ScrolledText(tab_paper, wrap=tk.WORD, font=("Georgia", 10), background="#ffffff", relief=tk.FLAT)
            paper_txt.pack(fill=tk.BOTH, expand=True)

            self.leader_cards.append({
                "tab": tab,
                "badge_lbl": badge_lbl,
                "name_lbl": name_lbl,
                "share_badge": share_badge,
                "spec_lbl": spec_lbl,
                "llm_status_badge": llm_status_badge,
                "angle_lbl": angle_lbl,
                "outlets_lbl": outlets_lbl,
                "sector_lbl": sector_lbl,
                "hire_btn": hire_btn,
                "copy_btn": copy_btn,
                "llm_btn": llm_btn,
                "prop_notebook": prop_notebook,
                "oped_txt": oped_txt,
                "social_txt": social_txt,
                "video_txt": video_txt,
                "paper_txt": paper_txt,
                "agency_data": None,
                "proposal_data": None
            })

    def build_exchange_tab(self):
        filter_bar = ttk.Frame(self.tab_exchange)
        filter_bar.pack(fill=tk.X, pady=(0, 8))

        ttk.Label(filter_bar, text="Filter Agencies / Angles:", font=("Segoe UI", 9, "bold")).pack(side=tk.LEFT, padx=(0, 6))
        self.exchange_filter_var = tk.StringVar()
        self.exchange_filter_var.trace_add("write", lambda *args: self.filter_exchange_board())
        filter_entry = ttk.Entry(filter_bar, textvariable=self.exchange_filter_var, width=28)
        filter_entry.pack(side=tk.LEFT, padx=(0, 10))

        ttk.Label(filter_bar, text="(Type agency name, specialty, produce angle, or sector)", font=("Segoe UI", 8), foreground="#64748b").pack(side=tk.LEFT)

        self.exchange_count_lbl = ttk.Label(filter_bar, text="55 Agencies Listed", font=("Segoe UI", 9, "bold"), foreground="#2563eb")
        self.exchange_count_lbl.pack(side=tk.RIGHT)

        exchange_paned = ttk.PanedWindow(self.tab_exchange, orient=tk.VERTICAL)
        exchange_paned.pack(fill=tk.BOTH, expand=True)

        tree_frame = ttk.Frame(exchange_paned)
        exchange_paned.add(tree_frame, weight=3)

        cols = ("rank", "id", "name", "specialty", "share", "score", "produce", "chapter", "status")
        self.exchange_tree = ttk.Treeview(tree_frame, columns=cols, show="headings", selectmode="browse")

        self.exchange_tree.heading("rank", text="Rank")
        self.exchange_tree.heading("id", text="Agency ID")
        self.exchange_tree.heading("name", text="Media Relations Company")
        self.exchange_tree.heading("specialty", text="Specialty / PR Niche")
        self.exchange_tree.heading("share", text="Proposal Fit (%)")
        self.exchange_tree.heading("score", text="Score")
        self.exchange_tree.heading("produce", text="Key Media Angles (Produce)")
        self.exchange_tree.heading("chapter", text="Sector")
        self.exchange_tree.heading("status", text="Status")

        self.exchange_tree.column("rank", width=50, anchor="center")
        self.exchange_tree.column("id", width=80, anchor="center")
        self.exchange_tree.column("name", width=220, anchor="w")
        self.exchange_tree.column("specialty", width=210, anchor="w")
        self.exchange_tree.column("share", width=105, anchor="e")
        self.exchange_tree.column("score", width=65, anchor="e")
        self.exchange_tree.column("produce", width=220, anchor="w")
        self.exchange_tree.column("chapter", width=190, anchor="w")
        self.exchange_tree.column("status", width=80, anchor="center")

        tree_scroll_y = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.exchange_tree.yview)
        tree_scroll_x = ttk.Scrollbar(tree_frame, orient=tk.HORIZONTAL, command=self.exchange_tree.xview)
        self.exchange_tree.configure(yscrollcommand=tree_scroll_y.set, xscrollcommand=tree_scroll_x.set)

        self.exchange_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        tree_scroll_y.pack(side=tk.RIGHT, fill=tk.Y)
        tree_scroll_x.pack(side=tk.BOTTOM, fill=tk.X)

        self.exchange_tree.bind("<<TreeviewSelect>>", self.on_exchange_agency_selected)

        # Bottom Drawer
        drawer_frame = ttk.LabelFrame(exchange_paned, text="🔍 Agency Campaign Proposal & Research Whitepaper", padding=8)
        exchange_paned.add(drawer_frame, weight=2)

        drawer_top = ttk.Frame(drawer_frame)
        drawer_top.pack(fill=tk.X, pady=(0, 4))

        self.drawer_title_lbl = ttk.Label(drawer_top, text="Select an agency above to view its campaign proposal.", font=("Segoe UI", 10, "bold"))
        self.drawer_title_lbl.pack(side=tk.LEFT)

        self.drawer_hire_btn = ttk.Button(
            drawer_top,
            text="🤝 Retain Agency",
            style="Hire.TButton",
            command=self.hire_drawer_agency,
            state=tk.DISABLED
        )
        self.drawer_hire_btn.pack(side=tk.RIGHT, padx=4)

        self.drawer_copy_btn = ttk.Button(
            drawer_top,
            text="📋 Copy Full Proposal",
            command=self.copy_drawer_proposal,
            state=tk.DISABLED
        )
        self.drawer_copy_btn.pack(side=tk.RIGHT, padx=4)

        self.drawer_llm_btn = ttk.Button(
            drawer_top,
            text="✨ Draft with Local LLM",
            style="LLM.TButton",
            command=self.draft_drawer_with_local_llm,
            state=tk.DISABLED
        )
        self.drawer_llm_btn.pack(side=tk.RIGHT)

        self.drawer_meta_lbl = ttk.Label(drawer_frame, text="", font=("Segoe UI", 8), foreground="#475569")
        self.drawer_meta_lbl.pack(anchor="w", pady=(0, 4))

        self.drawer_text = scrolledtext.ScrolledText(
            drawer_frame,
            wrap=tk.WORD,
            font=("Georgia", 10),
            height=8,
            relief=tk.FLAT,
            background="#ffffff"
        )
        self.drawer_text.pack(fill=tk.BOTH, expand=True)

    def build_angles_tab(self):
        top_p = ttk.Frame(self.tab_angles)
        top_p.pack(fill=tk.X, pady=(0, 8))

        ttk.Label(top_p, text="The PR Angles & Conceptual Produce Directory", font=("Segoe UI", 11, "bold")).pack(side=tk.LEFT)

        self.angles_filter_var = tk.StringVar()
        self.angles_filter_var.trace_add("write", lambda *args: self.filter_angles_directory())
        ttk.Label(top_p, text="Search Angles:", font=("Segoe UI", 9, "bold")).pack(side=tk.LEFT, padx=(20, 6))
        p_filter = ttk.Entry(top_p, textvariable=self.angles_filter_var, width=25)
        p_filter.pack(side=tk.LEFT)

        self.angles_count_lbl = ttk.Label(top_p, text="220 Media Angles", font=("Segoe UI", 9, "bold"), foreground="#2563eb")
        self.angles_count_lbl.pack(side=tk.RIGHT)

        p_tree_frame = ttk.Frame(self.tab_angles)
        p_tree_frame.pack(fill=tk.BOTH, expand=True)

        cols = ("produce", "agency", "agency_id", "specialty", "target_outlets")
        self.angles_tree = ttk.Treeview(p_tree_frame, columns=cols, show="headings", selectmode="browse")

        self.angles_tree.heading("produce", text="Conceptual Produce / Media Angle")
        self.angles_tree.heading("agency", text="Originating Agency")
        self.angles_tree.heading("agency_id", text="Agency ID")
        self.angles_tree.heading("specialty", text="Agency Specialty")
        self.angles_tree.heading("target_outlets", text="Target Media Outlets")

        self.angles_tree.column("produce", width=240, anchor="w")
        self.angles_tree.column("agency", width=220, anchor="w")
        self.angles_tree.column("agency_id", width=80, anchor="center")
        self.angles_tree.column("specialty", width=240, anchor="w")
        self.angles_tree.column("target_outlets", width=280, anchor="w")

        p_scroll = ttk.Scrollbar(p_tree_frame, orient=tk.VERTICAL, command=self.angles_tree.yview)
        self.angles_tree.configure(yscrollcommand=p_scroll.set)

        self.angles_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        p_scroll.pack(side=tk.RIGHT, fill=tk.Y)

    def build_campaigns_tab(self):
        top_a = ttk.Frame(self.tab_campaigns)
        top_a.pack(fill=tk.X, pady=(0, 8))

        ttk.Label(top_a, text="Ledger of Retained Agencies & Launched Campaigns", font=("Segoe UI", 11, "bold")).pack(side=tk.LEFT)

        self.campaigns_count_lbl = ttk.Label(top_a, text="0 Retained Campaigns", font=("Segoe UI", 9, "bold"), foreground="#059669")
        self.campaigns_count_lbl.pack(side=tk.RIGHT)

        a_tree_frame = ttk.Frame(self.tab_campaigns)
        a_tree_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 8))

        cols = ("timestamp", "id", "name", "specialty", "share", "headline", "rfp")
        self.campaigns_tree = ttk.Treeview(a_tree_frame, columns=cols, show="headings", selectmode="browse")

        self.campaigns_tree.heading("timestamp", text="Retained Date")
        self.campaigns_tree.heading("id", text="Agency ID")
        self.campaigns_tree.heading("name", text="Retained Agency")
        self.campaigns_tree.heading("specialty", text="PR Specialty")
        self.campaigns_tree.heading("share", text="Proposal Fit")
        self.campaigns_tree.heading("headline", text="Op-Ed Headline")
        self.campaigns_tree.heading("rfp", text="RFP Snippet")

        self.campaigns_tree.column("timestamp", width=130, anchor="center")
        self.campaigns_tree.column("id", width=80, anchor="center")
        self.campaigns_tree.column("name", width=200, anchor="w")
        self.campaigns_tree.column("specialty", width=180, anchor="w")
        self.campaigns_tree.column("share", width=100, anchor="e")
        self.campaigns_tree.column("headline", width=260, anchor="w")
        self.campaigns_tree.column("rfp", width=280, anchor="w")

        a_scroll = ttk.Scrollbar(a_tree_frame, orient=tk.VERTICAL, command=self.campaigns_tree.yview)
        self.campaigns_tree.configure(yscrollcommand=a_scroll.set)

        self.campaigns_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        a_scroll.pack(side=tk.RIGHT, fill=tk.Y)

        btn_bar = ttk.Frame(self.tab_campaigns)
        btn_bar.pack(fill=tk.X)

        release_btn = ttk.Button(btn_bar, text="🔄 Release / Re-float Selected Agency", command=self.release_selected_campaign)
        release_btn.pack(side=tk.LEFT)

        clear_btn = ttk.Button(btn_bar, text="Clear Campaign History", command=self.clear_all_campaigns)
        clear_btn.pack(side=tk.RIGHT)

    # =========================================================================
    # MEDIA COMPETITION & GENERATIVE LOCAL LLM LOGIC
    # =========================================================================

    def update_ticker(self):
        total_agencies = len(self.agencies)
        retained_count = len(self.campaigns)
        available = total_agencies - retained_count
        total_angles = sum(len(a.get("produce_catalog", [])) for a in self.agencies)
        total_words = sum(a.get("word_count", 0) for a in self.agencies if not a.get("is_retained", False))

        llm_name = self.llm_model_var.get() if hasattr(self, "llm_model_var") else "Local LLM"
        ticker_text = (
            f"Available Agencies: {available}/{total_agencies} | "
            f"Retained: {retained_count} | "
            f"PR Angles: {total_angles} | "
            f"Local LLM: {llm_name.split(':')[0]} | "
            f"Research Corpus: {total_words:,} words"
        )
        self.ticker_lbl.config(text=ticker_text)

    def set_preset_rfp(self, text):
        self.rfp_text.delete("1.0", tk.END)
        self.rfp_text.insert(tk.END, text)

    def clear_rfp(self):
        self.rfp_text.delete("1.0", tk.END)

    def paste_clipboard(self):
        try:
            cb = self.clipboard_get()
            self.rfp_text.insert(tk.INSERT, cb)
        except Exception:
            pass

    def run_agency_competition(self):
        query = self.rfp_text.get("1.0", tk.END).strip()
        if not query:
            messagebox.showwarning(
                "Missing Media RFP",
                "Please paste an article, speech, or concept into the RFP area first."
            )
            return

        if not self.agencies:
            messagebox.showerror("No Agencies", "No media relations agencies found in index.")
            return

        engine = self.engine_var.get()
        tau = 0.08

        self.compete_btn.config(text="⏳ Evaluating Proposals from 55 Agencies...", state=tk.DISABLED)
        self.update_idletasks()

        try:
            scores = self._calculate_scores(query, engine)
        except Exception as e:
            messagebox.showerror("Engine Fallback", f"Neural calculation note: {e}\nUsing TF-IDF Liquidity.")
            scores = self._calculate_tfidf(query)

        # Softmax proposal fit %
        exp_scores = np.exp((scores - np.max(scores)) / tau)
        proposal_fits = (exp_scores / np.sum(exp_scores)) * 100.0

        ranked_indices = np.argsort(proposal_fits)[::-1]

        self.current_competition_results = []
        self.active_proposals = {}

        for rank, idx in enumerate(ranked_indices, 1):
            agency = self.agencies[idx]
            aid = agency.get("agency_id", agency.get("firm_id", f"AGENCY-{idx+1:02d}"))
            
            # Generate instant heuristic proposal first
            prop = generate_agency_proposal(agency, query)
            self.active_proposals[aid] = prop

            self.current_competition_results.append({
                "rank": rank,
                "agency": agency,
                "agency_id": aid,
                "agency_index": idx,
                "proposal_fit": float(proposal_fits[idx]),
                "score": float(scores[idx]),
                "proposal": prop
            })

        self.compete_btn.config(text="🚀 SOLICIT AGENCY PITCHES (55 AGENCIES COMPETE)", state=tk.NORMAL)

        # Render Top 3 Leaders with instant proposals
        self.render_top_leaders()
        self.refresh_exchange_board()

        top1 = self.current_competition_results[0]
        self.competition_status_lbl.config(
            text=f"RFP Evaluation Complete! {top1['agency']['agency_name']} wins Lead Pitch with {top1['proposal_fit']:.1f}% fit.",
            foreground="#059669"
        )

        self.notebook.select(0)
        self.leaders_notebook.select(0)

        # If auto-generate with local LLM is checked, start generating for rank 1
        if self.auto_llm_var.get() and self.ollama_available and "Heuristic" not in self.llm_model_var.get():
            self.generate_card_with_local_llm(0)

    def _calculate_scores(self, query, engine):
        if engine == "neural" and USE_TRANSFORMERS:
            if self.embed_model is None:
                self.ticker_lbl.config(text="Loading Neural Model (all-MiniLM-L6-v2)...")
                self.update_idletasks()
                self.embed_model = SentenceTransformer("all-MiniLM-L6-v2")
                self.update_ticker()

            q_emb = self.embed_model.encode([query], normalize_embeddings=True)

            if self.agency_embeddings is not None and len(self.agency_embeddings) == len(self.agencies):
                scores = np.dot(self.agency_embeddings, q_emb.T).flatten()
            else:
                agency_texts = [
                    f"Agency: {a.get('agency_name', a['firm_name'])}. Specialty: {a.get('agency_specialty', '')}. Perspective: {a.get('agency_perspective', '')}. Concepts: {', '.join(a.get('produce_catalog', []))}. {a['text']}"
                    for a in self.agencies
                ]
                d_embs = self.embed_model.encode(agency_texts, normalize_embeddings=True)
                scores = np.dot(d_embs, q_emb.T).flatten()
            return scores
        else:
            return self._calculate_tfidf(query)

    def _calculate_tfidf(self, query):
        agency_texts = [
            f"{a.get('agency_name', a['firm_name'])} {a.get('agency_specialty', '')} {a.get('agency_perspective', '')} {' '.join(a.get('produce_catalog', []))} {a['text']}"
            for a in self.agencies
        ]
        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([query] + agency_texts)
        return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])[0]

    def render_top_leaders(self):
        if not self.current_competition_results:
            return

        for rank_idx in range(3):
            if rank_idx < len(self.current_competition_results):
                res = self.current_competition_results[rank_idx]
                a = res["agency"]
                fit = res["proposal_fit"]
                score = res["score"]
                prop = res["proposal"]
                card = self.leader_cards[rank_idx]

                card["agency_data"] = res
                card["proposal_data"] = prop

                aid = a.get("agency_id", a.get("firm_id", ""))
                card["name_lbl"].config(text=f"{a.get('agency_name', a['firm_name'])} [{aid}]")
                card["share_badge"].config(text=f"{fit:.2f}% Proposal Fit (Score: {score:.3f})")
                card["spec_lbl"].config(text=a.get("agency_specialty", "Strategic Media Relations"))
                card["angle_lbl"].config(text=prop["strategic_angle"])
                card["outlets_lbl"].config(text=", ".join(a.get("target_outlets", [])))
                card["sector_lbl"].config(text=f"Sector: {a.get('chapter', 'General')} | Research Corpus: {a.get('word_count', 0)} words")

                # Status badge
                if prop.get("is_llm_generated"):
                    card["llm_status_badge"].config(
                        text=f"✨ Drafted by {prop.get('llm_model', 'Local LLM')}",
                        foreground="#7c3aed"
                    )
                else:
                    card["llm_status_badge"].config(
                        text="[Draft: Heuristic]",
                        foreground="#64748b"
                    )

                # Buttons
                if a.get("is_retained", False):
                    card["hire_btn"].config(text="✓ Already Retained", state=tk.DISABLED)
                else:
                    card["hire_btn"].config(text="🤝 Retain Agency", state=tk.NORMAL)
                card["copy_btn"].config(state=tk.NORMAL)
                card["llm_btn"].config(state=tk.NORMAL, text="✨ Draft with Local LLM")

                # Populate Op-Ed Pitch
                op = prop.get("oped_pitch", {})
                card["oped_txt"].delete("1.0", tk.END)
                oped_content = (
                    f"PROPOSED HEADLINE:\n{op.get('title', 'Op-Ed Title')}\n\n"
                    f"TARGET PUBLICATIONS:\n{op.get('target_publications', 'Wired, The Atlantic')}\n\n"
                    f"PROVOCATIVE THESIS:\n{op.get('provocative_thesis', '')}\n\n"
                )
                if op.get("sample_opening"):
                    oped_content += f"SAMPLE OPENING PARAGRAPH:\n{op['sample_opening']}\n\n"
                sections = op.get("editorial_sections", [])
                if sections:
                    oped_content += "EDITORIAL OUTLINE & ARGUMENTS:\n"
                    for s in sections:
                        oped_content += f"  • {s}\n\n"
                card["oped_txt"].insert(tk.END, oped_content)

                # Populate Social Campaign
                soc = prop.get("social_campaign", {})
                card["social_txt"].delete("1.0", tk.END)
                social_content = (
                    f"PLATFORM STRATEGY:\n{soc.get('platform_focus', 'X / LinkedIn')}\n\n"
                    f"OPENING VIRAL HOOK POST:\n{soc.get('hook_post', '')}\n\n"
                )
                slides = soc.get("carousel_slides", [])
                if slides:
                    social_content += "VISUAL CAROUSEL / THREAD BREAKDOWN:\n"
                    for s in slides:
                        social_content += f"  • {s}\n\n"
                if soc.get("engagement_question"):
                    social_content += f"AUDIENCE ENGAGEMENT QUESTION:\n\"{soc['engagement_question']}\"\n"
                card["social_txt"].insert(tk.END, social_content)

                # Populate Video Script
                vid = prop.get("video_pitch", {})
                card["video_txt"].delete("1.0", tk.END)
                video_content = (
                    f"VIDEO TITLE:\n{vid.get('video_title', 'Video Essay')}\n\n"
                    f"PRODUCTION FORMAT:\n{vid.get('format', 'Video Essay Short')}\n\n"
                    f"VISUAL TREATMENT & CUES:\n{vid.get('visual_treatment', '')}\n\n"
                    f"COLD OPEN SCRIPT (FIRST 20 SECONDS):\n{vid.get('cold_open_script', '')}\n"
                )
                pod = prop.get("podcast_pitch", {})
                if pod.get("interview_hook"):
                    video_content += f"\nPODCAST & BROADCAST HOOK:\n{pod.get('interview_hook', '')}\n\n"
                    pod_qs = pod.get("provocative_questions", [])
                    if pod_qs:
                        video_content += "QUESTIONS FOR HOST:\n"
                        for q in pod_qs:
                            video_content += f"  • {q}\n"
                card["video_txt"].insert(tk.END, video_content)

                # Populate Whitepaper
                card["paper_txt"].delete("1.0", tk.END)
                card["paper_txt"].insert(tk.END, a["text"])

    def generate_card_with_local_llm(self, card_idx):
        if not self.current_competition_results or card_idx >= len(self.current_competition_results):
            return

        selected_model = self.llm_model_var.get()
        if "Heuristic" in selected_model:
            messagebox.showinfo("Select Model", "Please select a local model (e.g. Llama 3 or Mistral) from the Generative LLM dropdown on the left.")
            return

        res = self.current_competition_results[card_idx]
        agency = res["agency"]
        query = self.rfp_text.get("1.0", tk.END).strip()
        card = self.leader_cards[card_idx]

        # Update button and status to indicate background generation
        card["llm_btn"].config(text=f"⏳ {selected_model.split(':')[0]} drafting...", state=tk.DISABLED)
        card["llm_status_badge"].config(text=f"⏳ Generating proposal with {selected_model}...", foreground="#d97706")
        self.competition_status_lbl.config(
            text=f"Connecting to {selected_model} to draft custom proposal for {agency.get('agency_name')}...",
            foreground="#2563eb"
        )

        def worker():
            try:
                llm_prop = generate_llm_proposal(agency, query, model=selected_model)
                self.after(0, lambda: self._on_card_llm_success(card_idx, llm_prop, selected_model))
            except Exception as e:
                self.after(0, lambda: self._on_card_llm_failure(card_idx, str(e)))

        threading.Thread(target=worker, daemon=True).start()

    def _on_card_llm_success(self, card_idx, llm_prop, model_name):
        res = self.current_competition_results[card_idx]
        res["proposal"] = llm_prop
        aid = res["agency"].get("agency_id", res["agency"].get("firm_id"))
        self.active_proposals[aid] = llm_prop

        self.render_top_leaders()
        self.competition_status_lbl.config(
            text=f"✨ Custom proposal generated by {model_name} for {res['agency'].get('agency_name')}!",
            foreground="#059669"
        )

    def _on_card_llm_failure(self, card_idx, err_msg):
        card = self.leader_cards[card_idx]
        card["llm_btn"].config(text="✨ Draft with Local LLM", state=tk.NORMAL)
        card["llm_status_badge"].config(text="[LLM error - fallback active]", foreground="#dc2626")
        self.competition_status_lbl.config(
            text=f"Local LLM generation failed: {err_msg[:60]}. Fallback proposal active.",
            foreground="#dc2626"
        )
        messagebox.showerror(
            "Local LLM Error",
            f"Could not complete generation with Ollama:\n\n{err_msg}\n\nMake sure Ollama is running (`ollama serve`)."
        )

    def draft_drawer_with_local_llm(self):
        if not self.current_drawer_agency:
            return

        selected_model = self.llm_model_var.get()
        if "Heuristic" in selected_model:
            messagebox.showinfo("Select Model", "Please select a local model (e.g. Llama 3 or Mistral) from the Generative LLM dropdown on the left.")
            return

        agency = self.current_drawer_agency
        query = self.rfp_text.get("1.0", tk.END).strip()
        aid = agency.get("agency_id", agency.get("firm_id"))

        self.drawer_llm_btn.config(text=f"⏳ Drafting with {selected_model.split(':')[0]}...", state=tk.DISABLED)

        def worker():
            try:
                llm_prop = generate_llm_proposal(agency, query if query else "The Digital Crisis", model=selected_model)
                self.after(0, lambda: self._on_drawer_llm_success(agency, llm_prop, selected_model))
            except Exception as e:
                self.after(0, lambda: self._on_drawer_llm_failure(str(e)))

        threading.Thread(target=worker, daemon=True).start()

    def _on_drawer_llm_success(self, agency, llm_prop, model_name):
        aid = agency.get("agency_id", agency.get("firm_id"))
        self.active_proposals[aid] = llm_prop

        # Also update in competition results if present
        for res in self.current_competition_results:
            if res.get("agency_id") == aid:
                res["proposal"] = llm_prop

        formatted_proposal = format_proposal_as_text(llm_prop)
        self.drawer_text.delete("1.0", tk.END)
        self.drawer_text.insert(tk.END, formatted_proposal)
        self.drawer_llm_btn.config(text="✨ Re-draft with LLM", state=tk.NORMAL)

        # Re-render top leaders if this agency is on the podium
        self.render_top_leaders()
        messagebox.showinfo("Proposal Generated", f"Custom PR campaign proposal generated by {model_name}!")

    def _on_drawer_llm_failure(self, err_msg):
        self.drawer_llm_btn.config(text="✨ Draft with Local LLM", state=tk.NORMAL)
        messagebox.showerror("Local LLM Error", f"Ollama generation failed:\n\n{err_msg}")

    def refresh_exchange_board(self):
        for item in self.exchange_tree.get_children():
            self.exchange_tree.delete(item)

        filter_term = self.exchange_filter_var.get().lower().strip()

        rows = []
        if self.current_competition_results:
            for item in self.current_competition_results:
                a = item["agency"]
                aid = a.get("agency_id", a.get("firm_id", ""))
                rows.append({
                    "rank": item["rank"],
                    "id": aid,
                    "name": a.get("agency_name", a["firm_name"]),
                    "specialty": a.get("agency_specialty", ""),
                    "share": f"{item['proposal_fit']:.2f}%",
                    "score": f"{item['score']:.3f}",
                    "produce": ", ".join(a.get("produce_catalog", [])),
                    "chapter": a.get("chapter", ""),
                    "status": "Retained" if a.get("is_retained", False) else "Available",
                    "agency": a
                })
        else:
            for idx, a in enumerate(self.agencies, 1):
                aid = a.get("agency_id", a.get("firm_id", f"AGENCY-{idx:02d}"))
                rows.append({
                    "rank": idx,
                    "id": aid,
                    "name": a.get("agency_name", a["firm_name"]),
                    "specialty": a.get("agency_specialty", ""),
                    "share": "—",
                    "score": "—",
                    "produce": ", ".join(a.get("produce_catalog", [])),
                    "chapter": a.get("chapter", ""),
                    "status": "Retained" if a.get("is_retained", False) else "Available",
                    "agency": a
                })

        displayed_count = 0
        for r in rows:
            if filter_term:
                search_corpus = f"{r['id']} {r['name']} {r['specialty']} {r['produce']} {r['chapter']} {r['status']}".lower()
                if filter_term not in search_corpus:
                    continue

            tag = "retained" if r["status"] == "Retained" else "normal"
            self.exchange_tree.insert(
                "",
                tk.END,
                values=(
                    r["rank"],
                    r["id"],
                    r["name"],
                    r["specialty"],
                    r["share"],
                    r["score"],
                    r["produce"],
                    r["chapter"],
                    r["status"]
                ),
                tags=(tag,)
            )
            displayed_count += 1

        self.exchange_tree.tag_configure("retained", foreground="#94a3b8")
        self.exchange_count_lbl.config(text=f"{displayed_count} of 55 Agencies Displayed")

    def filter_exchange_board(self):
        self.refresh_exchange_board()

    def on_exchange_agency_selected(self, event):
        selected_items = self.exchange_tree.selection()
        if not selected_items:
            return
        item_vals = self.exchange_tree.item(selected_items[0])["values"]
        if not item_vals:
            return

        aid = item_vals[1]
        target_agency = next((a for a in self.agencies if a.get("agency_id") == aid or a.get("firm_id") == aid), None)
        if not target_agency:
            return

        self.current_drawer_agency = target_agency

        query = self.rfp_text.get("1.0", tk.END).strip()
        prop = self.active_proposals.get(aid)
        if not prop:
            prop = generate_agency_proposal(target_agency, query if query else "The Digital Crisis")
            self.active_proposals[aid] = prop

        self.drawer_title_lbl.config(
            text=f"Campaign Proposal: {target_agency.get('agency_name', target_agency['firm_name'])} [{aid}]",
            font=("Segoe UI", 11, "bold"),
            foreground="#1e293b"
        )

        meta = (
            f"Specialty: {target_agency.get('agency_specialty', '')} | "
            f"Sector: {target_agency.get('chapter', 'General')} | "
            f"Target Outlets: {', '.join(target_agency.get('target_outlets', []))}"
        )
        self.drawer_meta_lbl.config(text=meta)

        formatted_proposal = format_proposal_as_text(prop)
        self.drawer_text.delete("1.0", tk.END)
        self.drawer_text.insert(tk.END, formatted_proposal)

        self.drawer_copy_btn.config(state=tk.NORMAL)
        self.drawer_llm_btn.config(state=tk.NORMAL, text="✨ Draft with Local LLM")
        if target_agency.get("is_retained", False):
            self.drawer_hire_btn.config(text="✓ Retained", state=tk.DISABLED)
        else:
            self.drawer_hire_btn.config(text="🤝 Retain Agency", state=tk.NORMAL)

    def hire_drawer_agency(self):
        if not self.current_drawer_agency:
            return
        aid = self.current_drawer_agency.get("agency_id", self.current_drawer_agency.get("firm_id"))
        prop = self.active_proposals.get(aid)
        share_str = "Direct Selection"
        self._execute_campaign_retention(self.current_drawer_agency, prop, share_str)

    def copy_drawer_proposal(self):
        if not self.current_drawer_agency:
            return
        content = self.drawer_text.get("1.0", tk.END).strip()
        self.clipboard_clear()
        self.clipboard_append(content)
        messagebox.showinfo("Copied", "Full campaign proposal copied to clipboard!")

    def refresh_angles_directory(self):
        for item in self.angles_tree.get_children():
            self.angles_tree.delete(item)

        filter_term = self.angles_filter_var.get().lower().strip()

        count = 0
        for a in self.agencies:
            aid = a.get("agency_id", a.get("firm_id", ""))
            outlets_str = ", ".join(a.get("target_outlets", []))
            for p in a.get("produce_catalog", []):
                if filter_term and filter_term not in f"{p} {a.get('agency_name', '')} {aid} {a.get('agency_specialty', '')} {outlets_str}".lower():
                    continue

                self.angles_tree.insert(
                    "",
                    tk.END,
                    values=(
                        p,
                        a.get("agency_name", a["firm_name"]),
                        aid,
                        a.get("agency_specialty", ""),
                        outlets_str
                    )
                )
                count += 1

        self.angles_count_lbl.config(text=f"{count} PR Angles Listed")

    def filter_angles_directory(self):
        self.refresh_angles_directory()

    def refresh_campaigns_table(self):
        for item in self.campaigns_tree.get_children():
            self.campaigns_tree.delete(item)

        for c in reversed(self.campaigns):
            self.campaigns_tree.insert(
                "",
                tk.END,
                values=(
                    c.get("timestamp", "—"),
                    c.get("agency_id", "—"),
                    c.get("agency_name", "—"),
                    c.get("specialty", "—"),
                    c.get("proposal_fit", "—"),
                    c.get("oped_headline", "—"),
                    c.get("rfp_snippet", "—")
                )
            )

        self.campaigns_count_lbl.config(text=f"{len(self.campaigns)} Retained Campaigns")

    def hire_agency_by_rank(self, rank_idx):
        if not self.current_competition_results or rank_idx >= len(self.current_competition_results):
            return
        res = self.current_competition_results[rank_idx]
        agency = res["agency"]
        prop = res["proposal"]
        share_str = f"{res['proposal_fit']:.2f}%"
        self._execute_campaign_retention(agency, prop, share_str)

    def copy_proposal_by_rank(self, rank_idx):
        if not self.current_competition_results or rank_idx >= len(self.current_competition_results):
            return
        res = self.current_competition_results[rank_idx]
        prop = res["proposal"]
        formatted = format_proposal_as_text(prop)
        self.clipboard_clear()
        self.clipboard_append(formatted)
        messagebox.showinfo("Copied", f"Proposal for {res['agency']['agency_name']} copied to clipboard!")

    def _execute_campaign_retention(self, agency, prop, share_str):
        if agency.get("is_retained", False):
            messagebox.showinfo("Already Retained", f"{agency['agency_name']} is already retained for an active campaign.")
            return

        rfp_query = self.rfp_text.get("1.0", tk.END).strip()
        rfp_snippet = rfp_query[:180] if rfp_query else "General Concept RFP"
        aid = agency.get("agency_id", agency.get("firm_id"))
        headline = prop["oped_pitch"]["title"] if prop else "Media Campaign"

        confirmed = messagebox.askyesno(
            "Retain Agency & Launch Campaign",
            f"Are you sure you want to retain:\n\n"
            f"📣 {agency.get('agency_name', agency['firm_name'])} [{aid}]\n"
            f"📊 Proposal Fit: {share_str}\n"
            f"🎯 Specialty: {agency.get('agency_specialty', '')}\n"
            f"📰 Pitch Headline: {headline}\n\n"
            "This will log the campaign into your Campaign Ledger and retain this agency."
        )

        if not confirmed:
            return

        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        record = {
            "timestamp": timestamp,
            "agency_id": aid,
            "agency_name": agency.get("agency_name", agency["firm_name"]),
            "specialty": agency.get("agency_specialty", ""),
            "proposal_fit": share_str,
            "oped_headline": headline,
            "rfp_snippet": rfp_snippet,
            "proposal": prop,
            "word_count": agency.get("word_count", 0),
            "text": agency["text"]
        }

        self.campaigns.append(record)
        agency["is_retained"] = True

        self.save_campaigns()
        self.update_ticker()
        self.refresh_exchange_board()
        self.refresh_campaigns_table()
        self.render_top_leaders()

        messagebox.showinfo(
            "Agency Retained!",
            f"Congratulations! You have retained {agency.get('agency_name', agency['firm_name'])}!\n\n"
            f"The campaign proposal has been added to your Campaign Ledger."
        )

    def release_selected_campaign(self):
        selected_items = self.campaigns_tree.selection()
        if not selected_items:
            messagebox.showinfo("Select Record", "Please select a campaign record to release.")
            return

        vals = self.campaigns_tree.item(selected_items[0])["values"]
        aid = vals[1]

        target = next((a for a in self.agencies if a.get("agency_id") == aid or a.get("firm_id") == aid), None)
        if target:
            target["is_retained"] = False

        self.campaigns = [c for c in self.campaigns if c.get("agency_id") != aid]
        self.save_campaigns()

        self.update_ticker()
        self.refresh_exchange_board()
        self.refresh_campaigns_table()
        self.render_top_leaders()

        messagebox.showinfo("Agency Released", f"Agency {aid} is now available for new client RFPs!")

    def clear_all_campaigns(self):
        if not self.campaigns:
            return
        if messagebox.askyesno("Clear Ledger", "Release all retained agencies and reset campaign history?"):
            for a in self.agencies:
                a["is_retained"] = False
            self.campaigns = []
            self.save_campaigns()
            self.update_ticker()
            self.refresh_exchange_board()
            self.refresh_campaigns_table()
            self.render_top_leaders()


def main():
    app = MediaRelationsExchangeApp()
    app.mainloop()


if __name__ == "__main__":
    main()
