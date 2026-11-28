/**
 * Liberalism Wiki Reader — Static Web Client for GitHub Pages
 * Handles catalog browsing, instant search, article rendering via shards,
 * wikilink resolution, bidirectional backlink exploration, and themes.
 */

class WikiApp {
    constructor() {
        this.catalog = [];
        this.catalogMap = new Map();
        this.shardCache = new Map();
        this.currentArticleId = null;
        this.history = [];
        this.historyIndex = -1;
        this.favorites = new Set();
        this.recentHistory = [];
        this.activeTab = "all";
        this.activeLetter = "ALL";
        this.searchQuery = "";
        this.fontSize = 1.12; // rem

        this.initDOMElements();
        this.initAlphabet();
        this.initEventListeners();
        this.loadSettings();
        this.loadCatalog();
    }

    initDOMElements() {
        this.dom = {
            sidebar: document.getElementById("sidebar"),
            articleList: document.getElementById("article-list"),
            searchInput: document.getElementById("search-input"),
            totalBadge: document.getElementById("total-badge"),
            filterCount: document.getElementById("filter-count"),
            activeFilterLabel: document.getElementById("active-filter-label"),
            favCount: document.getElementById("fav-count"),
            alphaBar: document.getElementById("alpha-bar"),
            contentArea: document.getElementById("content-area"),
            progressBar: document.getElementById("reading-progress"),
            artTitle: document.getElementById("art-title"),
            artBadge: document.getElementById("art-folder-badge"),
            artWordCount: document.getElementById("art-word-count"),
            artReadTime: document.getElementById("art-read-time"),
            btnFavorite: document.getElementById("btn-favorite"),
            tocPills: document.getElementById("toc-pills"),
            articleBody: document.getElementById("article-body"),
            connectedKnowledge: document.getElementById("connected-knowledge"),
            backlinksCount: document.getElementById("backlinks-count"),
            backlinksGrid: document.getElementById("backlinks-grid"),
            outgoingCount: document.getElementById("outgoing-count"),
            outgoingTags: document.getElementById("outgoing-tags"),
            btnBack: document.getElementById("btn-back"),
            btnForward: document.getElementById("btn-forward"),
            btnRandom: document.getElementById("btn-random"),
            btnZen: document.getElementById("btn-zen"),
            themeSelect: document.getElementById("theme-select"),
            fontSelect: document.getElementById("font-select"),
            btnFontDec: document.getElementById("btn-font-dec"),
            btnFontInc: document.getElementById("btn-font-inc")
        };
    }

    initAlphabet() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        letters.forEach(letter => {
            const btn = document.createElement("button");
            btn.className = "alpha-btn";
            btn.dataset.letter = letter;
            btn.textContent = letter;
            this.dom.alphaBar.appendChild(btn);
        });
    }

    initEventListeners() {
        // Tab switching
        document.querySelectorAll(".tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.activeTab = btn.dataset.tab;
                this.renderCatalogList();
            });
        });

        // Alphabet bar
        this.dom.alphaBar.addEventListener("click", (e) => {
            if (e.target.classList.contains("alpha-btn")) {
                document.querySelectorAll(".alpha-btn").forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                this.activeLetter = e.target.dataset.letter;
                this.renderCatalogList();
            }
        });

        // Search input with debounce
        let searchTimeout = null;
        this.dom.searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchQuery = e.target.value.trim().toLowerCase();
                this.renderCatalogList();
            }, 120);
        });

        // History Navigation Buttons
        this.dom.btnBack.addEventListener("click", () => this.goBack());
        this.dom.btnForward.addEventListener("click", () => this.goForward());
        this.dom.btnRandom.addEventListener("click", () => this.loadRandomArticle());

        // Zen / Sidebar Toggle
        this.dom.btnZen.addEventListener("click", () => {
            this.dom.sidebar.classList.toggle("collapsed");
            this.dom.btnZen.classList.toggle("active");
        });

        // Favorite Toggle on Article
        this.dom.btnFavorite.addEventListener("click", () => this.toggleCurrentFavorite());

        // Theme and Typography
        this.dom.themeSelect.addEventListener("change", (e) => this.setTheme(e.target.value));
        this.dom.fontSelect.addEventListener("change", (e) => this.setFontMode(e.target.value));
        this.dom.btnFontDec.addEventListener("click", () => this.adjustFontSize(-0.06));
        this.dom.btnFontInc.addEventListener("click", () => this.adjustFontSize(0.06));

        // Reading Scroll Progress
        this.dom.contentArea.addEventListener("scroll", () => {
            const el = this.dom.contentArea;
            const scrollTotal = el.scrollHeight - el.clientHeight;
            if (scrollTotal > 0) {
                const pct = Math.min(100, Math.max(0, (el.scrollTop / scrollTotal) * 100));
                this.dom.progressBar.style.width = pct + "%";
            }
        });

        // Keyboard Shortcuts
        window.addEventListener("keydown", (e) => {
            if (e.key === "/" && document.activeElement !== this.dom.searchInput) {
                e.preventDefault();
                this.dom.searchInput.focus();
                this.dom.searchInput.select();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                this.dom.searchInput.focus();
                this.dom.searchInput.select();
            } else if (e.key === "Escape") {
                if (document.activeElement === this.dom.searchInput) {
                    this.dom.searchInput.value = "";
                    this.searchQuery = "";
                    this.renderCatalogList();
                    this.dom.searchInput.blur();
                }
            } else if (e.altKey && e.key === "ArrowLeft") {
                e.preventDefault();
                this.goBack();
            } else if (e.altKey && e.key === "ArrowRight") {
                e.preventDefault();
                this.goForward();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r" && !e.shiftKey) {
                if (document.activeElement !== this.dom.searchInput) {
                    e.preventDefault();
                    this.loadRandomArticle();
                }
            }
        });

        // Handle URL Hash Changes (for bookmarking / browser history)
        window.addEventListener("hashchange", () => {
            const hash = window.location.hash;
            if (hash.startsWith("#/article/")) {
                const targetId = decodeURIComponent(hash.replace("#/article/", ""));
                if (targetId && targetId !== this.currentArticleId) {
                    this.fetchAndDisplayArticle(targetId, false);
                }
            }
        });
    }

    loadSettings() {
        try {
            const savedTheme = localStorage.getItem("wiki_theme") || "ivory";
            const savedFont = localStorage.getItem("wiki_font") || "serif";
            const savedSize = localStorage.getItem("wiki_size");
            const savedHistory = localStorage.getItem("wiki_history");
            const savedFavs = localStorage.getItem("wiki_favs");

            if (savedTheme) {
                this.dom.themeSelect.value = savedTheme;
                this.setTheme(savedTheme, false);
            }
            if (savedFont) {
                this.dom.fontSelect.value = savedFont;
                this.setFontMode(savedFont, false);
            }
            if (savedSize) {
                this.fontSize = parseFloat(savedSize);
                document.documentElement.style.setProperty("--article-size", `${this.fontSize}rem`);
            }
            if (savedHistory) {
                this.recentHistory = JSON.parse(savedHistory);
            }
            if (savedFavs) {
                this.favorites = new Set(JSON.parse(savedFavs));
                this.dom.favCount.textContent = this.favorites.size;
            }
        } catch (e) {
            console.warn("Could not load local settings", e);
        }
    }

    setTheme(theme, save = true) {
        document.body.className = document.body.className.replace(/theme-\w+/g, "");
        document.body.classList.add(`theme-${theme}`);
        if (save) localStorage.setItem("wiki_theme", theme);
    }

    setFontMode(mode, save = true) {
        document.body.className = document.body.className.replace(/font-\w+-mode/g, "");
        document.body.classList.add(`font-${mode}-mode`);
        if (save) localStorage.setItem("wiki_font", mode);
    }

    adjustFontSize(delta) {
        this.fontSize = Math.max(0.85, Math.min(1.6, this.fontSize + delta));
        document.documentElement.style.setProperty("--article-size", `${this.fontSize.toFixed(2)}rem`);
        localStorage.setItem("wiki_size", this.fontSize.toString());
    }

    async loadCatalog() {
        try {
            const res = await fetch("data/catalog.json");
            if (!res.ok) throw new Error(`Could not load catalog (${res.status})`);
            
            this.catalog = await res.json();
            this.catalogMap = new Map(this.catalog.map(a => [a.id, a]));
            this.dom.totalBadge.textContent = this.catalog.length.toLocaleString();

            this.renderCatalogList();

            // Initial article selection from hash or default to Liberalism overview
            const initialHash = window.location.hash;
            if (initialHash.startsWith("#/article/")) {
                const targetId = decodeURIComponent(initialHash.replace("#/article/", ""));
                this.navigateTo(targetId);
            } else {
                const flagship = this.catalog.find(a => a.title.toLowerCase() === "classical liberalism" || a.title.toLowerCase() === "liberalism") || this.catalog[0];
                if (flagship) {
                    this.navigateTo(flagship.id);
                }
            }
        } catch (err) {
            console.error("Error loading knowledge base catalog:", err);
            this.dom.articleList.innerHTML = `<li style="padding:1rem;color:red;">Error loading catalog: ${err.message}</li>`;
        }
    }

    filterArticles() {
        let list = this.catalog;

        // Tab filter
        if (this.activeTab === "wiki") {
            list = list.filter(a => a.folder === "wiki");
        } else if (this.activeTab === "liberalism") {
            list = list.filter(a => a.folder === "liberalism");
        } else if (this.activeTab === "favorites") {
            list = list.filter(a => this.favorites.has(a.id));
        } else if (this.activeTab === "history") {
            const historySet = new Map(this.recentHistory.map((item, idx) => [item.id, idx]));
            list = list.filter(a => historySet.has(a.id))
                       .sort((a, b) => historySet.get(a.id) - historySet.get(b.id));
        }

        // Letter filter (if not ALL and not search)
        if (this.activeLetter !== "ALL" && !this.searchQuery && this.activeTab !== "history") {
            if (this.activeLetter === "#") {
                list = list.filter(a => /^[^a-zA-Z]/.test(a.title.trim()));
            } else {
                const letter = this.activeLetter.toLowerCase();
                list = list.filter(a => a.title.trim().toLowerCase().startsWith(letter));
            }
        }

        // Search query filter
        if (this.searchQuery) {
            const q = this.searchQuery;
            list = list.filter(a => {
                const titleLower = a.title.toLowerCase();
                const previewLower = a.preview ? a.preview.toLowerCase() : "";
                return titleLower.includes(q) || previewLower.includes(q);
            });
            // Rank by title starts with query
            list.sort((a, b) => {
                const aStarts = a.title.toLowerCase().startsWith(q);
                const bStarts = b.title.toLowerCase().startsWith(q);
                if (aStarts && !bStarts) return -1;
                if (!aStarts && bStarts) return 1;
                return a.title.localeCompare(b.title);
            });
        }

        return list;
    }

    renderCatalogList() {
        const filtered = this.filterArticles();
        this.dom.filterCount.textContent = filtered.length.toLocaleString();

        let label = "All Entries";
        if (this.activeTab === "wiki") label = "Wiki Folder";
        else if (this.activeTab === "liberalism") label = "Core Liberalism";
        else if (this.activeTab === "favorites") label = "Saved Favorites";
        else if (this.activeTab === "history") label = "Recent History";

        if (this.activeLetter !== "ALL" && !this.searchQuery) {
            label += ` (${this.activeLetter})`;
        } else if (this.searchQuery) {
            label = `Matching "${this.searchQuery}"`;
        }
        this.dom.activeFilterLabel.textContent = label;

        if (filtered.length === 0) {
            this.dom.articleList.innerHTML = `
                <li style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
                    No articles found matching criteria.
                </li>
            `;
            return;
        }

        // Render first 250 entries for instantaneous rendering performance
        const renderSlice = filtered.slice(0, 250);
        this.dom.articleList.innerHTML = renderSlice.map(item => {
            const isActive = item.id === this.currentArticleId ? "active" : "";
            const isFav = this.favorites.has(item.id) ? "★ " : "";
            return `
                <li class="article-item ${isActive}" data-id="${item.id}" onclick="app.navigateTo('${item.id}')">
                    <div class="article-item-header">
                        <span class="article-item-title">${isFav}${item.title}</span>
                        <span class="article-item-badge">${item.folder}</span>
                    </div>
                    ${item.preview ? `<div class="article-item-preview">${item.preview}</div>` : ""}
                    <div class="article-item-meta">
                        <span>${item.words.toLocaleString()} words</span>
                        ${item.backlinks_count > 0 ? `<span>🔗 ${item.backlinks_count} links</span>` : ""}
                    </div>
                </li>
            `;
        }).join("");

        if (filtered.length > 250) {
            const moreLi = document.createElement("li");
            moreLi.style.cssText = "padding: 0.75rem; text-align: center; font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);";
            moreLi.textContent = `+ ${filtered.length - 250} more entries. Refine search or filter letter.`;
            this.dom.articleList.appendChild(moreLi);
        }
    }

    navigateTo(articleId) {
        if (!articleId) return;

        if (this.history[this.historyIndex] !== articleId) {
            this.history = this.history.slice(0, this.historyIndex + 1);
            this.history.push(articleId);
            this.historyIndex = this.history.length - 1;
        }

        this.updateHistoryButtons();
        this.fetchAndDisplayArticle(articleId, true);
    }

    updateHistoryButtons() {
        this.dom.btnBack.disabled = this.historyIndex <= 0;
        this.dom.btnForward.disabled = this.historyIndex >= this.history.length - 1;
    }

    goBack() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.updateHistoryButtons();
            const targetId = this.history[this.historyIndex];
            this.fetchAndDisplayArticle(targetId, true);
        }
    }

    goForward() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.updateHistoryButtons();
            const targetId = this.history[this.historyIndex];
            this.fetchAndDisplayArticle(targetId, true);
        }
    }

    loadRandomArticle() {
        if (!this.catalog.length) return;
        const randomItem = this.catalog[Math.floor(Math.random() * this.catalog.length)];
        this.navigateTo(randomItem.id);
    }

    async getArticleData(articleId) {
        const item = this.catalogMap.get(articleId);
        if (!item) return null;

        const shardName = item.shard;
        if (!this.shardCache.has(shardName)) {
            const res = await fetch(`data/shards/${shardName}`);
            if (!res.ok) throw new Error(`Could not load shard ${shardName} (${res.status})`);
            const shardData = await res.json();
            this.shardCache.set(shardName, shardData);
        }

        const shard = this.shardCache.get(shardName);
        return shard[articleId] || null;
    }

    async fetchAndDisplayArticle(articleId, updateHash = true) {
        this.currentArticleId = articleId;

        document.querySelectorAll(".article-item").forEach(el => {
            el.classList.toggle("active", el.dataset.id === articleId);
        });

        this.dom.articleBody.innerHTML = `
            <div class="loading-indicator">
                Loading article...
            </div>
        `;
        this.dom.progressBar.style.width = "0%";

        try {
            const data = await this.getArticleData(articleId);
            if (!data) throw new Error(`Article not found: ${articleId}`);

            // Update Header Meta
            this.dom.artTitle.textContent = data.title;
            this.dom.artBadge.textContent = data.folder.toUpperCase();
            this.dom.artWordCount.textContent = (data.word_count || 0).toLocaleString();
            this.dom.artReadTime.textContent = data.read_time_min || 1;

            // Update Favorite Button State
            this.updateFavoriteButton();

            // Update Table of Contents Pills
            if (data.headings && data.headings.length > 1) {
                this.dom.tocPills.style.display = "flex";
                this.dom.tocPills.innerHTML = data.headings.map(h => {
                    const slug = h.text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                    return `<a class="toc-pill" href="#${slug}">${h.text}</a>`;
                }).join("");
            } else {
                this.dom.tocPills.style.display = "none";
            }

            // Set Markdown HTML Body
            this.dom.articleBody.innerHTML = data.html;

            // Update Connected Knowledge Section
            this.renderConnectedKnowledge(data);

            // Add to recent history
            this.addToRecentHistory(data);

            // Scroll to top
            this.dom.contentArea.scrollTop = 0;

            // Update hash if requested
            if (updateHash) {
                history.replaceState(null, null, `#/article/${encodeURIComponent(articleId)}`);
            }
        } catch (err) {
            this.dom.articleBody.innerHTML = `
                <div style="padding: 2rem; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
                    <h3>Error Loading Article</h3>
                    <p>${err.message}</p>
                </div>
            `;
            this.dom.connectedKnowledge.style.display = "none";
        }
    }

    renderConnectedKnowledge(data) {
        const backlinks = data.backlinks || [];
        const outgoing = data.outgoing || [];

        if (backlinks.length === 0 && outgoing.length === 0) {
            this.dom.connectedKnowledge.style.display = "none";
            return;
        }

        this.dom.connectedKnowledge.style.display = "block";

        // Backlinks
        this.dom.backlinksCount.textContent = backlinks.length;
        if (backlinks.length === 0) {
            this.dom.backlinksGrid.innerHTML = `
                <div style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">
                    No other articles currently link to this entry.
                </div>
            `;
        } else {
            this.dom.backlinksGrid.innerHTML = backlinks.map(b => `
                <div class="backlink-card" onclick="app.navigateTo('${b.id}')">
                    <div>
                        <div class="backlink-title">${b.title}</div>
                        ${b.preview ? `<div class="backlink-preview">${b.preview}</div>` : ""}
                    </div>
                    <div style="font-size: 0.68rem; font-family: var(--font-mono); color: var(--text-muted); margin-top: 0.5rem;">
                        📁 ${b.folder}
                    </div>
                </div>
            `).join("");
        }

        // Outgoing references
        this.dom.outgoingCount.textContent = outgoing.length;
        this.dom.outgoingTags.innerHTML = outgoing.map(o => {
            if (o.target_id) {
                return `<a class="outgoing-tag" onclick="app.navigateTo('${o.target_id}')" title="Read ${o.clean}">[[${o.clean}]]</a>`;
            } else {
                return `<span class="outgoing-tag" style="opacity: 0.6; cursor: help;" title="Unindexed topic">[[${o.clean}]]</span>`;
            }
        }).join("");
    }

    addToRecentHistory(item) {
        this.recentHistory = this.recentHistory.filter(h => h.id !== item.id);
        this.recentHistory.unshift({
            id: item.id,
            title: item.title,
            folder: item.folder
        });
        this.recentHistory = this.recentHistory.slice(0, 40);
        try {
            localStorage.setItem("wiki_history", JSON.stringify(this.recentHistory));
        } catch (e) {}
    }

    toggleCurrentFavorite() {
        if (!this.currentArticleId) return;
        if (this.favorites.has(this.currentArticleId)) {
            this.favorites.delete(this.currentArticleId);
        } else {
            this.favorites.add(this.currentArticleId);
        }
        this.dom.favCount.textContent = this.favorites.size;
        this.updateFavoriteButton();
        this.renderCatalogList();
        try {
            localStorage.setItem("wiki_favs", JSON.stringify(Array.from(this.favorites)));
        } catch (e) {}
    }

    updateFavoriteButton() {
        const isFav = this.favorites.has(this.currentArticleId);
        this.dom.btnFavorite.textContent = isFav ? "★" : "☆";
        this.dom.btnFavorite.classList.toggle("active", isFav);
        this.dom.btnFavorite.title = isFav ? "Remove from Favorites" : "Save to Favorites";
    }
}

// Global instance
let app;
window.addEventListener("DOMContentLoaded", () => {
    app = new WikiApp();
});
