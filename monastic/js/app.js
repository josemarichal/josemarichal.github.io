/**
 * Main Application Orchestrator
 * Connects Catalog, Practice Studio, Horarium, Streaks Tracker, Journal, and Comparative Orthopraxis Philosophy.
 */

import { DEFAULT_DISCIPLINES, CATEGORIES, CANONICAL_HOURS, TRADITIONS } from "./data/disciplines.js";
import { sound } from "./audio.js";
import { storage } from "./storage.js";
import { practice } from "./practice.js";
import { horarium } from "./horarium.js";

class OrthopraxisApp {
  constructor() {
    this.activeTab = "catalog";
    this.activeTradition = "all";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.selectedDiscipline = null;

    this.init();
  }

  init() {
    this.applySavedTheme();
    this.setupEventListeners();
    this.setupPracticeCallbacks();
    this.renderAll();
    this.startHorariumClock();
    this.refreshLucideIcons();
  }

  // ==================== THEME & SOUND SETTINGS ====================

  applySavedTheme() {
    const settings = storage.getSettings();
    document.body.className = settings.theme || "theme-midnight";
    sound.setVolume(settings.audioVolume || 0.75);
    sound.setAmbientVolume(settings.ambientVolume || 0.35);
    if (settings.ambientSound && settings.ambientSound !== "none") {
      sound.setAmbientSound(settings.ambientSound);
    }
  }

  setTheme(themeName) {
    document.body.className = themeName;
    storage.saveSettings({ theme: themeName });
    this.showToast(`Theme set to ${this.getThemeDisplayName(themeName)}`);
  }

  getThemeDisplayName(themeName) {
    switch (themeName) {
      case "theme-midnight": return "Monastery Midnight";
      case "theme-parchment": return "Vatican Parchment";
      case "theme-hermitage": return "Forest Hermitage";
      case "theme-celestial": return "Celestial Solitude";
      default: return themeName;
    }
  }

  // ==================== NAVIGATION TABS ====================

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    document.querySelectorAll(".tab-view").forEach(view => {
      view.classList.toggle("active", view.id === `tab-${tabId}`);
    });

    if (tabId === "tracker") {
      this.renderTracker();
    } else if (tabId === "horarium") {
      this.renderHorarium();
    } else if (tabId === "journal") {
      this.renderJournal();
    } else if (tabId === "philosophy") {
      this.renderPhilosophy();
    } else if (tabId === "catalog") {
      this.renderCatalog();
    }

    this.refreshLucideIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ==================== EVENT LISTENERS ====================

  setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => this.switchTab(btn.dataset.tab));
    });

    // Monastic Hour Badge in Header
    const hourPill = document.getElementById("header-hour-pill");
    if (hourPill) {
      hourPill.addEventListener("click", () => this.switchTab("horarium"));
    }

    // Search input
    const searchInput = document.getElementById("catalog-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderCatalog();
      });
    }

    // Traditions filter chips
    document.getElementById("traditions-chips-wrap")?.addEventListener("click", (e) => {
      const chip = e.target.closest(".tradition-chip-btn");
      if (chip) {
        this.activeTradition = chip.dataset.tradition;
        document.querySelectorAll(".tradition-chip-btn").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.renderCatalog();
      }
    });

    // Category filter chips
    document.getElementById("category-chips-wrap")?.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip-btn");
      if (chip) {
        this.activeCategory = chip.dataset.category;
        document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.renderCatalog();
      }
    });

    // Theme selector button
    document.getElementById("theme-toggle-btn")?.addEventListener("click", () => {
      this.openModal("modal-theme-select");
    });

    // Sound settings button
    document.getElementById("sound-settings-btn")?.addEventListener("click", () => {
      this.openModal("modal-sound-settings");
      this.populateSoundSettings();
    });

    // Add Custom Discipline button
    document.getElementById("btn-add-custom")?.addEventListener("click", () => {
      this.openModal("modal-custom-discipline");
    });

    // New Journal Entry button
    document.getElementById("btn-new-journal")?.addEventListener("click", () => {
      this.openJournalModal();
    });

    // Data Management (Export / Import)
    document.getElementById("btn-data-manage")?.addEventListener("click", () => {
      this.openModal("modal-data-manage");
    });

    // Modal Close buttons
    document.querySelectorAll(".modal-close-btn, .modal-overlay").forEach(el => {
      el.addEventListener("click", (e) => {
        if (e.target === el || e.target.closest(".modal-close-btn")) {
          this.closeAllModals();
        }
      });
    });

    // Stop modal content clicks from bubbling to overlay
    document.querySelectorAll(".modal-content").forEach(content => {
      content.addEventListener("click", e => e.stopPropagation());
    });

    // Studio controls
    document.getElementById("studio-btn-toggle")?.addEventListener("click", () => {
      const isPaused = practice.togglePause();
      const icon = document.getElementById("studio-toggle-icon");
      if (icon) {
        icon.setAttribute("data-lucide", isPaused ? "play" : "pause");
        this.refreshLucideIcons();
      }
    });

    document.getElementById("studio-btn-prev")?.addEventListener("click", () => practice.prevStep());
    document.getElementById("studio-btn-next")?.addEventListener("click", () => practice.nextStep());
    document.getElementById("studio-btn-exit")?.addEventListener("click", () => {
      practice.stopPractice();
      this.renderStudio();
    });

    // Sound test in settings
    document.getElementById("btn-test-bell")?.addEventListener("click", () => {
      const type = document.getElementById("setting-bell-type").value;
      if (type === "cathedral-bell") sound.playCathedralBell();
      else sound.playTibetanBowl();
    });

    // Custom Discipline Form Submission
    document.getElementById("form-custom-discipline")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleCustomDisciplineSubmit();
    });

    // Journal Form Submission
    document.getElementById("form-journal-entry")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleJournalSubmit();
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals();
      }
      if (e.code === "Space" && this.activeTab === "practice" && practice.isRunning && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("studio-btn-toggle")?.click();
      }
    });
  }

  // ==================== PRACTICE CALLBACKS ====================

  setupPracticeCallbacks() {
    practice.onTick = (state) => {
      this.updateStudioTimerDisplay(state);
    };

    practice.onStepChange = (state) => {
      this.renderStudioActiveState(state);
    };

    practice.onBreathCycle = (breathInfo) => {
      this.updateBreathOrb(breathInfo);
    };

    practice.onComplete = ({ discipline, durationSec }) => {
      this.renderStudio();
      this.renderCatalog();
      this.openPostPracticeReflection(discipline, durationSec);
    };
  }

  // ==================== CATALOG RENDERING ====================

  renderCatalog() {
    const grid = document.getElementById("disciplines-grid");
    if (!grid) return;

    const all = storage.getAllDisciplines();
    let filtered = all;

    // Filter by Tradition
    if (this.activeTradition !== "all") {
      filtered = filtered.filter(d => d.tradition === this.activeTradition);
    }

    // Filter by Category
    if (this.activeCategory !== "all") {
      filtered = filtered.filter(d => d.category === this.activeCategory);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      filtered = filtered.filter(d => {
        const text = `${d.name} ${d.latinName || ""} ${d.traditionLabel || ""} ${d.shortDesc || ""} ${(d.tags || []).join(" ")} ${(d.habitBenefits || []).join(" ")}`.toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    // Update Tradition Chip Counts
    TRADITIONS.forEach(trad => {
      const countEl = document.getElementById(`count-trad-${trad.id}`);
      if (countEl) {
        const tCount = trad.id === "all" ? all.length : all.filter(d => d.tradition === trad.id).length;
        countEl.textContent = tCount;
      }
    });

    // Update Category Chip Counts
    CATEGORIES.forEach(cat => {
      const countEl = document.getElementById(`count-${cat.id}`);
      if (countEl) {
        const cCount = cat.id === "all" ? all.length : all.filter(d => d.category === cat.id).length;
        countEl.textContent = cCount;
      }
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--accent-gold);"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary);">No Disciplines Found</h3>
          <p style="margin-top: 0.5rem;">Try adjusting your tradition filter, search query, or category selection.</p>
        </div>
      `;
      this.refreshLucideIcons();
      return;
    }

    const todayCompleted = storage.getTodayCompletedIds();

    grid.innerHTML = filtered.map(disc => {
      const isCompleted = todayCompleted.includes(disc.id);
      const iconName = disc.icon || "sparkles";

      return `
        <div class="discipline-card ${isCompleted ? "completed-today" : ""}" data-id="${disc.id}">
          <div class="card-top">
            <div class="card-header-left">
              <div class="card-icon-box">
                <i data-lucide="${iconName}"></i>
              </div>
              <div class="card-titles">
                <h3 class="card-title">${disc.name}</h3>
                ${disc.latinName ? `<span class="card-latin">${disc.latinName}</span>` : ""}
              </div>
            </div>
            <div class="card-actions-top">
              <button class="habit-check-btn" title="${isCompleted ? "Marked Complete Today" : "Mark Complete for Today"}" data-action="toggle-complete" data-id="${disc.id}">
                <i data-lucide="check"></i>
              </button>
            </div>
          </div>

          <div class="card-body">
            <p class="card-desc">${disc.shortDesc || ""}</p>
            
            <div class="card-meta-pills">
              <span class="meta-pill tradition">
                <i data-lucide="globe"></i>
                ${disc.traditionLabel || "Orthopraxis"}
              </span>
              <span class="meta-pill duration">
                <i data-lucide="clock"></i>
                ${disc.durationLabel || disc.durationMin + " Min"}
              </span>
              <span class="meta-pill">
                <i data-lucide="tag"></i>
                ${disc.categoryLabel || "Practice"}
              </span>
            </div>

            ${disc.tags && disc.tags.length > 0 ? `
              <div class="card-tags">
                ${disc.tags.slice(0, 4).map(t => `<span class="tag-pill">#${t}</span>`).join("")}
              </div>
            ` : ""}
          </div>

          <div class="card-footer">
            <button class="btn-secondary" data-action="view-details" data-id="${disc.id}">
              <i data-lucide="info"></i>
              Origin & Guidance
            </button>
            <button class="btn-primary" data-action="start-practice" data-id="${disc.id}">
              <i data-lucide="play"></i>
              Practice
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Attach card event listeners
    grid.querySelectorAll("[data-action='toggle-complete']").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const isNowDone = storage.toggleComplete(id);
        if (isNowDone) {
          sound.playSoftChime();
          this.showToast("Discipline marked completed for today! 🕊️");
        }
        this.renderCatalog();
        this.renderTracker();
      });
    });

    grid.querySelectorAll("[data-action='view-details']").forEach(btn => {
      btn.addEventListener("click", () => {
        this.openDisciplineDetail(btn.dataset.id);
      });
    });

    grid.querySelectorAll("[data-action='start-practice']").forEach(btn => {
      btn.addEventListener("click", () => {
        this.launchPractice(btn.dataset.id);
      });
    });

    this.refreshLucideIcons();
  }

  // ==================== COMPARATIVE ORTHOPRAXIS PHILOSOPHY ====================

  renderPhilosophy() {
    const container = document.getElementById("philosophy-view-content");
    if (!container) return;

    container.innerHTML = `
      <div class="philosophy-hero-card">
        <h2 style="font-family: var(--font-serif); font-size: 1.85rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.75rem;">
          <i data-lucide="scale" style="color: var(--accent-gold);"></i>
          The Primacy of Practice: Orthopraxis across World Traditions
        </h2>
        
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
          While Western religious discourse has frequently privileged <em>orthodoxy</em> (right belief or dogma), the vast majority of world faith and wisdom traditions operate as comprehensive systems of <strong>orthopraxis</strong> (right practice and bodily habituation). In these frameworks, the performance of codified actions, liturgy, ritual propriety, and moral disciplines directly forms the human subject and awakens transcendent consciousness.
        </p>

        <div class="philosophy-quote-highlight">
          "Jewish faith is not a set of cognitive assertions or dogmas, but rather a 'groundless conative commitment' manifested purely through halakhic observance."
          <div style="font-size: 0.88rem; font-family: var(--font-sans); font-style: normal; color: var(--accent-gold); margin-top: 0.5rem;">
            — Yeshayahu Leibowitz
          </div>
        </div>

        <div class="philosophy-quote-highlight" style="border-left-color: var(--accent-purple);">
          "Confucianism views 'the secular as sacred'... Li (ritual propriety) operates as a system of behavioral norms that cultivates moral dispositions through highly codified physical actions."
          <div style="font-size: 0.88rem; font-family: var(--font-sans); font-style: normal; color: var(--accent-purple); margin-top: 0.5rem;">
            — Herbert Fingarette, <em>Confucius: The Secular as Sacred</em>
          </div>
        </div>
      </div>

      <div class="traditions-matrix-grid">
        ${TRADITIONS.filter(t => t.id !== "all").map(t => `
          <div class="tradition-matrix-card">
            <div class="tradition-card-header">
              <div class="tradition-icon-wrap">
                <i data-lucide="${t.icon}"></i>
              </div>
              <div class="tradition-name-wrap">
                <h3 class="tradition-title">${t.label}</h3>
                <span class="tradition-script">${t.originalScript || ""}</span>
              </div>
            </div>

            <div class="tradition-scholars">
              <strong>Key Scholars & Sages:</strong> ${t.scholarRefs || "Tradition Codifiers"}
            </div>

            <p class="tradition-summary-text">${t.summary}</p>

            <button class="btn-secondary" data-action="filter-tradition-quick" data-tradition="${t.id}" style="margin-top: auto; justify-content: center;">
              <i data-lucide="book-open"></i>
              Explore ${t.label} Disciplines
            </button>
          </div>
        `).join("")}
      </div>
    `;

    container.querySelectorAll("[data-action='filter-tradition-quick']").forEach(btn => {
      btn.addEventListener("click", () => {
        const trad = btn.dataset.tradition;
        this.activeTradition = trad;
        document.querySelectorAll(".tradition-chip-btn").forEach(c => {
          c.classList.toggle("active", c.dataset.tradition === trad);
        });
        this.switchTab("catalog");
      });
    });

    this.refreshLucideIcons();
  }

  // ==================== PRACTICE STUDIO ====================

  launchPractice(disciplineId) {
    const discipline = storage.getDisciplineById(disciplineId);
    if (!discipline) return;

    this.selectedDiscipline = discipline;
    this.switchTab("practice");
    practice.startPractice(discipline);
    this.renderStudio();
  }

  renderStudio() {
    const studioWrap = document.getElementById("practice-studio-content");
    if (!studioWrap) return;

    if (!practice.isRunning) {
      studioWrap.innerHTML = `
        <div class="studio-idle-card">
          <div class="studio-idle-icon">
            <i data-lucide="flame"></i>
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--text-primary);">Contemplative Studio Idle</h2>
          <p style="max-width: 540px; color: var(--text-secondary); line-height: 1.6;">
            Select any spiritual discipline or orthopraxis habit from the catalog, Horarium, or traditions matrix to begin a guided session with sacred bells and timers.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
            <button class="btn-primary" id="btn-studio-quick-breath">
              <i data-lucide="wind"></i>
              Breath Prayer (5 Min)
            </button>
            <button class="btn-secondary" id="btn-studio-dhikr">
              <i data-lucide="sparkles"></i>
              Islamic Dhikr (15 Min)
            </button>
            <button class="btn-secondary" id="btn-studio-gayatri">
              <i data-lucide="sun"></i>
              Gayatri Japa (20 Min)
            </button>
            <button class="btn-secondary" id="btn-studio-stoic">
              <i data-lucide="moon"></i>
              Stoic Evening Audit (10 Min)
            </button>
          </div>
        </div>
      `;

      document.getElementById("btn-studio-quick-breath")?.addEventListener("click", () => this.launchPractice("breath-prayer"));
      document.getElementById("btn-studio-dhikr")?.addEventListener("click", () => this.launchPractice("dhikr-remembrance"));
      document.getElementById("btn-studio-gayatri")?.addEventListener("click", () => this.launchPractice("sandhyavandanam-gayatri"));
      document.getElementById("btn-studio-stoic")?.addEventListener("click", () => this.launchPractice("stoic-evening-audit"));

      this.refreshLucideIcons();
      return;
    }

    const state = practice.getCurrentState();
    this.renderStudioActiveState(state);
  }

  renderStudioActiveState(state) {
    const studioWrap = document.getElementById("practice-studio-content");
    if (!studioWrap || !state.discipline) return;

    const disc = state.discipline;
    const isBreath = state.isBreath;

    studioWrap.innerHTML = `
      <div class="studio-active-wrapper">
        <div class="studio-header">
          <div class="studio-discipline-info">
            <h2>${disc.name}</h2>
            ${disc.latinName ? `<span class="latin-tag">${disc.latinName}</span>` : ""}
            <div style="margin-top: 4px;">
              <span class="meta-pill tradition">${disc.traditionLabel || "Orthopraxis"}</span>
            </div>
          </div>
          <div class="studio-top-controls">
            <button class="btn-secondary" id="studio-btn-bell" title="Ring Sacred Bell">
              <i data-lucide="bell"></i>
            </button>
            <button class="btn-secondary" id="studio-btn-exit" title="Exit Practice">
              <i data-lucide="x"></i>
              End Session
            </button>
          </div>
        </div>

        <div class="studio-center-stage">
          ${isBreath ? `
            <div class="breathing-orb-container">
              <div class="breathing-orb ${state.breathState}" id="breathing-orb-el">
                <span class="orb-inner-text" id="orb-text">Breathe In</span>
              </div>
              <div class="breath-phrase-card">
                <span class="breath-phrase-title">Current Sacred Phrase / Dhikr / Mantra</span>
                <span class="breath-phrase-text" id="breath-phrase-display">
                  "${state.phrase.inhale} ... ${state.phrase.exhale}"
                </span>
                ${disc.suggestedPhrases && disc.suggestedPhrases.length > 1 ? `
                  <div style="margin-top: 0.5rem;">
                    <select id="select-breath-phrase" class="form-select" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                      ${disc.suggestedPhrases.map((p, idx) => `
                        <option value="${idx}">Phrase ${idx + 1}: ${p.inhale} / ${p.exhale}</option>
                      `).join("")}
                    </select>
                  </div>
                ` : ""}
              </div>
            </div>
          ` : `
            <div class="timer-circle-wrap">
              <svg class="timer-svg" viewBox="0 0 260 260">
                <circle class="timer-circle-bg" cx="130" cy="130" r="120"></circle>
                <circle class="timer-circle-progress" id="timer-circle-progress-el" cx="130" cy="130" r="120"></circle>
              </svg>
              <div class="timer-center-content">
                <div class="timer-digits" id="timer-step-digits">${this.formatTime(state.stepTimeRemaining)}</div>
                <div class="timer-label" id="timer-label-text">Step ${state.stepIndex + 1} of ${state.totalSteps}</div>
              </div>
            </div>
          `}

          <div class="studio-step-box">
            <div class="step-indicator-bar">
              <span>Step ${state.stepIndex + 1} / ${state.totalSteps}</span>
              <span>Total Remaining: <strong id="total-remaining-digits">${this.formatTime(state.totalTimeRemaining)}</strong></span>
            </div>
            <h3 class="step-title">${state.currentStep ? state.currentStep.title : "Contemplation"}</h3>
            <p class="step-guidance">${state.currentStep ? state.currentStep.guidance : ""}</p>
          </div>
        </div>

        <div class="studio-controls-bar">
          <button class="control-btn-md" id="studio-btn-prev" title="Previous Step">
            <i data-lucide="skip-back"></i>
          </button>
          <button class="control-btn-lg" id="studio-btn-toggle" title="Play / Pause">
            <i data-lucide="${state.isPaused ? "play" : "pause"}" id="studio-toggle-icon"></i>
          </button>
          <button class="control-btn-md" id="studio-btn-next" title="Next Step">
            <i data-lucide="skip-forward"></i>
          </button>
        </div>
      </div>
    `;

    document.getElementById("studio-btn-toggle")?.addEventListener("click", () => {
      const isPaused = practice.togglePause();
      const icon = document.getElementById("studio-toggle-icon");
      if (icon) {
        icon.setAttribute("data-lucide", isPaused ? "play" : "pause");
        this.refreshLucideIcons();
      }
    });

    document.getElementById("studio-btn-prev")?.addEventListener("click", () => practice.prevStep());
    document.getElementById("studio-btn-next")?.addEventListener("click", () => practice.nextStep());
    document.getElementById("studio-btn-exit")?.addEventListener("click", () => {
      practice.stopPractice();
      this.renderStudio();
    });

    document.getElementById("studio-btn-bell")?.addEventListener("click", () => {
      sound.playTibetanBowl();
    });

    document.getElementById("select-breath-phrase")?.addEventListener("change", (e) => {
      practice.setPhraseIndex(parseInt(e.target.value, 10));
    });

    this.refreshLucideIcons();
  }

  updateStudioTimerDisplay(state) {
    const digits = document.getElementById("timer-step-digits");
    if (digits) {
      digits.textContent = this.formatTime(state.stepTimeRemaining);
    }

    const totalDigits = document.getElementById("total-remaining-digits");
    if (totalDigits) {
      totalDigits.textContent = this.formatTime(state.totalTimeRemaining);
    }

    const circle = document.getElementById("timer-circle-progress-el");
    if (circle) {
      const circumference = 2 * Math.PI * 120;
      const offset = circumference * (1 - state.stepProgress);
      circle.style.strokeDashoffset = offset;
    }
  }

  updateBreathOrb(breathInfo) {
    const orb = document.getElementById("breathing-orb-el");
    const text = document.getElementById("orb-text");
    if (!orb || !text) return;

    orb.className = `breathing-orb ${breathInfo.phase}`;
    text.textContent = breathInfo.label || "Breathe";

    const phraseEl = document.getElementById("breath-phrase-display");
    if (phraseEl && breathInfo.phrase) {
      if (breathInfo.phase === "inhale" || breathInfo.phase === "hold-in") {
        phraseEl.innerHTML = `<span style="color: var(--accent-gold); font-weight: 600;">[Inhale]</span> ${breathInfo.phrase.inhale}`;
      } else {
        phraseEl.innerHTML = `<span style="color: var(--accent-blue); font-weight: 600;">[Exhale]</span> ${breathInfo.phrase.exhale}`;
      }
    }
  }

  formatTime(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(s / 60);
    const remSecs = s % 60;
    return `${mins}:${String(remSecs).padStart(2, "0")}`;
  }

  // ==================== HORARIUM / RULE OF LIFE ====================

  startHorariumClock() {
    const update = () => {
      const activeHour = horarium.getCurrentMonasticHour();
      const pill = document.getElementById("header-hour-pill");
      if (pill && activeHour) {
        pill.innerHTML = `
          <div class="hour-dot"></div>
          <span>${activeHour.name} (${activeHour.hourTime})</span>
        `;
      }
    };
    update();
    setInterval(update, 30000);
  }

  renderHorarium() {
    const listWrap = document.getElementById("horarium-list-wrap");
    if (!listWrap) return;

    const hours = horarium.getHours();
    const activeHour = horarium.getCurrentMonasticHour();
    const todayCompleted = storage.getTodayCompletedIds();

    listWrap.innerHTML = hours.map(h => {
      const isCurrent = activeHour && activeHour.id === h.id;
      const disc = storage.getDisciplineById(h.disciplineId);

      return `
        <div class="hour-card ${isCurrent ? "current-hour" : ""}">
          <div class="hour-badge-circle">
            <span class="hour-time-text">${h.hourTime}</span>
          </div>

          <div class="hour-info">
            <h3 class="hour-name">
              ${h.name}
              ${isCurrent ? `<span class="badge-gold">Current Hour</span>` : ""}
            </h3>
            <span class="hour-latin">${h.latinName || ""}</span>
            <p class="hour-desc">${h.desc || ""}</p>
            ${disc ? `
              <div style="margin-top: 0.35rem; font-size: 0.85rem; color: var(--accent-gold);">
                <i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
                Assigned Practice: <strong>${disc.name}</strong> (${disc.durationLabel}) — <em>${disc.traditionLabel || ""}</em>
              </div>
            ` : ""}
          </div>

          <div class="hour-actions">
            ${disc ? `
              <button class="btn-primary" data-action="horarium-practice" data-id="${disc.id}">
                <i data-lucide="play"></i>
                Practice
              </button>
            ` : ""}
          </div>
        </div>
      `;
    }).join("");

    listWrap.querySelectorAll("[data-action='horarium-practice']").forEach(btn => {
      btn.addEventListener("click", () => {
        this.launchPractice(btn.dataset.id);
      });
    });

    this.refreshLucideIcons();
  }

  // ==================== TRACKER & METRICS ====================

  renderTracker() {
    const metrics = storage.getMetrics();
    const daysData = storage.getLastNDaysData(14);

    document.getElementById("metric-current-streak").textContent = metrics.currentStreak;
    document.getElementById("metric-longest-streak").textContent = metrics.longestStreak;
    document.getElementById("metric-completed-today").textContent = metrics.completedTodayCount;
    document.getElementById("metric-total-minutes").textContent = metrics.totalMinutes;

    const gridEl = document.getElementById("days-consistency-grid");
    if (gridEl) {
      gridEl.innerHTML = daysData.map(day => `
        <div class="day-cell ${day.isToday ? "active" : ""} ${day.count > 0 ? "has-practice" : ""}" title="${day.dateStr}: ${day.count} practices">
          <span>${day.dayName}</span>
          <strong class="day-cell-count">${day.dayNum}</strong>
          <span>${day.count > 0 ? `${day.count}✓` : "·"}</span>
        </div>
      `).join("");
    }

    const topListEl = document.getElementById("top-disciplines-list");
    if (topListEl) {
      if (metrics.topDisciplines.length === 0) {
        topListEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No practice history recorded yet. Complete a practice session to build your orthopraxis stats!</p>`;
      } else {
        const maxCount = metrics.topDisciplines[0].count || 1;
        topListEl.innerHTML = metrics.topDisciplines.map(({ discipline, count }) => {
          const pct = Math.round((count / maxCount) * 100);
          return `
            <div class="top-item">
              <div class="top-item-header">
                <strong>${discipline.name}</strong>
                <span>${count} session${count > 1 ? "s" : ""}</span>
              </div>
              <div class="top-item-bar">
                <div class="top-item-fill" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
        }).join("");
      }
    }
  }

  // ==================== SPIRITUAL JOURNAL ====================

  renderJournal() {
    const listEl = document.getElementById("journal-entries-list");
    if (!listEl) return;

    const entries = storage.getJournalEntries();
    if (entries.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i data-lucide="book-open" style="width: 48px; height: 48px; color: var(--accent-gold); margin-bottom: 1rem;"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; color: var(--text-primary);">No Reflections Recorded</h3>
          <p style="margin-top: 0.5rem;">After completing a practice session, record your interior movements, consolations, and prayers here.</p>
        </div>
      `;
      this.refreshLucideIcons();
      return;
    }

    listEl.innerHTML = entries.map(entry => {
      const disc = entry.disciplineId ? storage.getDisciplineById(entry.disciplineId) : null;
      return `
        <div class="journal-entry-card" data-id="${entry.id}">
          <div class="entry-header">
            <h3 class="entry-title">${entry.title}</h3>
            <div class="entry-meta">
              <span>${entry.dateStr}</span>
              <span class="entry-mood-badge">${entry.mood || "Contemplative"}</span>
              <button class="action-icon-btn" data-action="delete-journal" data-id="${entry.id}" title="Delete Reflection" style="width: 28px; height: 28px;">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </div>

          ${disc ? `
            <div style="font-size: 0.85rem; color: var(--accent-gold);">
              <i data-lucide="sparkles" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i>
              Discipline: <strong>${disc.name}</strong> (${disc.traditionLabel || "Orthopraxis"})
            </div>
          ` : ""}

          <div class="entry-content">${this.escapeHtml(entry.content)}</div>
        </div>
      `;
    }).join("");

    listEl.querySelectorAll("[data-action='delete-journal']").forEach(btn => {
      btn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this reflection?")) {
          storage.deleteJournalEntry(btn.dataset.id);
          this.renderJournal();
          this.showToast("Reflection deleted");
        }
      });
    });

    this.refreshLucideIcons();
  }

  openJournalModal(disciplineId = null, defaultTitle = "Spiritual Reflection") {
    const form = document.getElementById("form-journal-entry");
    if (!form) return;
    form.reset();

    const select = document.getElementById("journal-discipline-select");
    if (select) {
      const all = storage.getAllDisciplines();
      select.innerHTML = `<option value="">-- General Reflection (No specific discipline) --</option>` +
        all.map(d => `<option value="${d.id}" ${d.id === disciplineId ? "selected" : ""}>${d.name} (${d.traditionLabel || ""})</option>`).join("");
    }

    const titleInput = document.getElementById("journal-title-input");
    if (titleInput) titleInput.value = defaultTitle;

    this.openModal("modal-journal");
  }

  handleJournalSubmit() {
    const disciplineId = document.getElementById("journal-discipline-select").value || null;
    const title = document.getElementById("journal-title-input").value.trim() || "Spiritual Reflection";
    const mood = document.getElementById("journal-mood-select").value;
    const content = document.getElementById("journal-content-input").value.trim();

    if (!content) {
      alert("Please write a reflection before saving.");
      return;
    }

    storage.saveJournalEntry({
      disciplineId,
      title,
      mood,
      content
    });

    this.closeAllModals();
    this.showToast("Spiritual reflection saved! 📖");
    this.renderJournal();
  }

  openPostPracticeReflection(discipline, durationSec) {
    const modal = document.getElementById("modal-post-practice");
    if (!modal) return;

    document.getElementById("post-practice-title").textContent = `Session Complete: ${discipline.name}`;
    document.getElementById("post-practice-subtext").textContent = `You dedicated ${Math.round(durationSec / 60)} minutes to ${discipline.name} (${discipline.latinName || ""}). Take a moment to capture what was revealed.`;

    document.getElementById("btn-post-practice-journal")?.addEventListener("click", () => {
      this.closeAllModals();
      this.openJournalModal(discipline.id, `Reflection on ${discipline.name}`);
    }, { once: true });

    document.getElementById("btn-post-practice-skip")?.addEventListener("click", () => {
      this.closeAllModals();
    }, { once: true });

    this.openModal("modal-post-practice");
  }

  // ==================== DISCIPLINE DETAIL MODAL ====================

  openDisciplineDetail(id) {
    const disc = storage.getDisciplineById(id);
    if (!disc) return;

    document.getElementById("detail-modal-title").textContent = disc.name;
    document.getElementById("detail-modal-latin").textContent = disc.latinName || "";
    document.getElementById("detail-modal-tradition").textContent = disc.traditionLabel || "World Orthopraxis";
    document.getElementById("detail-modal-category").textContent = disc.categoryLabel || "Orthopraxis";
    document.getElementById("detail-modal-duration").textContent = disc.durationLabel || disc.durationMin + " Min";
    document.getElementById("detail-modal-desc").textContent = disc.longDesc || disc.shortDesc;

    const quoteBox = document.getElementById("detail-modal-quote");
    if (quoteBox) {
      if (disc.scriptureOrQuote) {
        quoteBox.style.display = "block";
        quoteBox.textContent = `"${disc.scriptureOrQuote}"`;
      } else {
        quoteBox.style.display = "none";
      }
    }

    const originBox = document.getElementById("detail-modal-origin");
    if (originBox) {
      originBox.textContent = disc.originHistory || "Orthopraxis tradition.";
    }

    const benefitsList = document.getElementById("detail-modal-benefits");
    if (benefitsList && disc.habitBenefits) {
      benefitsList.innerHTML = disc.habitBenefits.map(b => `
        <li style="display: flex; gap: 0.5rem; align-items: flex-start;">
          <i data-lucide="check-circle-2" style="color: var(--accent-gold); width: 16px; height: 16px; flex-shrink: 0; margin-top: 3px;"></i>
          <span>${b}</span>
        </li>
      `).join("");
    }

    const stepsList = document.getElementById("detail-modal-steps");
    if (stepsList && disc.steps) {
      stepsList.innerHTML = disc.steps.map((s, idx) => `
        <div class="detail-step-item">
          <div class="step-num-badge">${idx + 1}</div>
          <div>
            <strong style="color: var(--text-primary); font-size: 0.95rem;">${s.title}</strong>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.2rem;">${s.guidance}</p>
          </div>
        </div>
      `).join("");
    }

    const refLink = document.getElementById("detail-modal-ref-link");
    if (refLink) {
      refLink.href = disc.url || "https://urbanmonastic.org/practices/";
    }

    const practiceBtn = document.getElementById("detail-modal-start-practice");
    if (practiceBtn) {
      practiceBtn.onclick = () => {
        this.closeAllModals();
        this.launchPractice(disc.id);
      };
    }

    this.openModal("modal-discipline-detail");
    this.refreshLucideIcons();
  }

  // ==================== CUSTOM DISCIPLINE CREATION ====================

  handleCustomDisciplineSubmit() {
    const name = document.getElementById("custom-name").value.trim();
    const latinName = document.getElementById("custom-latin").value.trim();
    const tradition = document.getElementById("custom-tradition")?.value || "christian";
    const category = document.getElementById("custom-category").value;
    const durationMin = parseInt(document.getElementById("custom-duration").value, 10) || 10;
    const shortDesc = document.getElementById("custom-desc").value.trim();
    const habitBenefit = document.getElementById("custom-benefit").value.trim();

    if (!name || !shortDesc) {
      alert("Please provide at least a name and short description.");
      return;
    }

    const tradObj = TRADITIONS.find(t => t.id === tradition);

    const newDisc = {
      id: "custom-" + Date.now(),
      name,
      latinName,
      tradition,
      traditionLabel: tradObj ? tradObj.label : "Custom Orthopraxis",
      category,
      categoryLabel: CATEGORIES.find(c => c.id === category)?.label || "Custom Orthopraxis",
      durationMin,
      durationLabel: `${durationMin} Minutes`,
      icon: "bookmark-check",
      shortDesc,
      longDesc: shortDesc,
      originHistory: "Personal custom orthopraxis rule.",
      tags: ["custom", "personal-rule"],
      habitBenefits: habitBenefit ? [habitBenefit] : ["Fosters personal spiritual intentionality"],
      steps: [
        { title: "Preparation & Stillness", durationSec: 60, guidance: "Quiet your mind and set sacred intention." },
        { title: "Active Practice", durationSec: (durationMin * 60) - 120, guidance: shortDesc },
        { title: "Closing Dedication", durationSec: 60, guidance: "Offer gratitude and return with peace." }
      ]
    };

    storage.saveCustomDiscipline(newDisc);
    this.closeAllModals();
    this.showToast(`Created discipline "${name}"!`);
    this.renderCatalog();
  }

  // ==================== SOUND SETTINGS ====================

  populateSoundSettings() {
    const settings = storage.getSettings();
    const bellSelect = document.getElementById("setting-bell-type");
    if (bellSelect) bellSelect.value = settings.bellType || "tibetan-bowl";

    const volSlider = document.getElementById("setting-audio-volume");
    if (volSlider) volSlider.value = Math.round((settings.audioVolume || 0.75) * 100);

    const ambientSelect = document.getElementById("setting-ambient-type");
    if (ambientSelect) ambientSelect.value = settings.ambientSound || "none";

    const soundEnabled = document.getElementById("setting-sound-enabled");
    if (soundEnabled) soundEnabled.checked = settings.soundEnabled !== false;

    bellSelect?.addEventListener("change", (e) => {
      storage.saveSettings({ bellType: e.target.value });
    });

    volSlider?.addEventListener("input", (e) => {
      const v = parseInt(e.target.value, 10) / 100;
      sound.setVolume(v);
      storage.saveSettings({ audioVolume: v });
    });

    ambientSelect?.addEventListener("change", (e) => {
      const type = e.target.value;
      sound.setAmbientSound(type);
      storage.saveSettings({ ambientSound: type });
    });

    soundEnabled?.addEventListener("change", (e) => {
      storage.saveSettings({ soundEnabled: e.target.checked });
    });
  }

  // ==================== MODALS & HELPERS ====================

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("open");
      this.refreshLucideIcons();
    }
  }

  closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("open"));
  }

  showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i data-lucide="sparkles" style="color: var(--accent-gold); width: 16px; height: 16px;"></i> <span>${message}</span>`;
    container.appendChild(toast);
    this.refreshLucideIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(15px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  refreshLucideIcons() {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  renderAll() {
    this.renderCatalog();
    this.renderPhilosophy();
    this.renderStudio();
    this.renderHorarium();
    this.renderTracker();
    this.renderJournal();
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  window.storage = storage;
  window.sound = sound;
  window.practice = practice;
  window.horarium = horarium;
  window.app = new OrthopraxisApp();
});
