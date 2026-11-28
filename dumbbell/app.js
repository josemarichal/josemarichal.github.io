/**
 * Dumbbell, Bodyweight & Mobility Library — Application Logic
 * Author: Technology & Society Working Group (Jose Marichal)
 */

class DumbbellApp {
    constructor() {
        this.workoutData = WORKOUT_DATA || {};
        this.exerciseLinks = EXERCISE_LINKS || {};
        this.days = Object.keys(this.workoutData);
        this.activeDay = this.days[2] || this.days[0]; // Default to "Push Day"
        this.searchQuery = "";
        this.favorites = new Set();
        this.showingFavorites = false;

        // Timer State
        this.timerSeconds = 60;
        this.timerRemaining = 60;
        this.timerInterval = null;
        this.timerIsRunning = false;

        this.initDOMElements();
        this.loadFavorites();
        this.renderTabs();
        this.initEventListeners();
        this.renderExercises();
    }

    initDOMElements() {
        this.dom = {
            dayTabs: document.getElementById("day-tabs"),
            searchInput: document.getElementById("search-input"),
            searchClear: document.getElementById("search-clear"),
            btnOpenRandom: document.getElementById("btn-open-random"),
            btnViewFavs: document.getElementById("btn-view-favs"),
            favCount: document.getElementById("fav-count"),
            currentDayTitle: document.getElementById("current-day-title"),
            currentDayCount: document.getElementById("current-day-count"),
            btnExpandAll: document.getElementById("btn-expand-all"),
            btnCollapseAll: document.getElementById("btn-collapse-all"),
            exerciseContainer: document.getElementById("exercise-container"),

            // Modal
            modal: document.getElementById("workout-modal"),
            modalTitle: document.getElementById("modal-title"),
            modalEyebrow: document.getElementById("modal-eyebrow"),
            modalCloseBtn: document.getElementById("modal-close-btn"),
            modalCloseBottom: document.getElementById("modal-close-bottom"),
            modalWorkoutBody: document.getElementById("modal-workout-body"),
            exercisesPerCat: document.getElementById("exercises-per-cat"),
            btnReroll: document.getElementById("btn-reroll"),
            btnCopyWorkout: document.getElementById("btn-copy-workout"),

            // Timer
            timerDisplay: document.getElementById("timer-display"),
            btnTimerToggle: document.getElementById("btn-timer-toggle"),
            btnTimerReset: document.getElementById("btn-timer-reset"),
            timerBtns: document.querySelectorAll(".timer-btn")
        };
    }

    loadFavorites() {
        try {
            const raw = localStorage.getItem("dumbbell_favorites");
            if (raw) {
                this.favorites = new Set(JSON.parse(raw));
                this.updateFavBadge();
            }
        } catch (e) {
            console.warn("Could not load favorites", e);
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem("dumbbell_favorites", JSON.stringify(Array.from(this.favorites)));
            this.updateFavBadge();
        } catch (e) {}
    }

    updateFavBadge() {
        this.dom.favCount.textContent = this.favorites.size;
    }

    initEventListeners() {
        // Search Input
        let searchTimer = null;
        this.dom.searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimer);
            const val = e.target.value.trim();
            this.dom.searchClear.style.display = val ? "block" : "none";
            searchTimer = setTimeout(() => {
                this.searchQuery = val.toLowerCase();
                this.renderExercises();
            }, 120);
        });

        this.dom.searchClear.addEventListener("click", () => {
            this.dom.searchInput.value = "";
            this.dom.searchClear.style.display = "none";
            this.searchQuery = "";
            this.renderExercises();
            this.dom.searchInput.focus();
        });

        // View Favorites Toggle
        this.dom.btnViewFavs.addEventListener("click", () => {
            this.showingFavorites = !this.showingFavorites;
            this.dom.btnViewFavs.classList.toggle("active", this.showingFavorites);
            
            // Remove active from day tabs
            document.querySelectorAll(".day-tab-btn").forEach(b => b.classList.remove("active"));
            if (!this.showingFavorites) {
                const activeBtn = document.querySelector(`.day-tab-btn[data-day="${this.activeDay}"]`);
                if (activeBtn) activeBtn.classList.add("active");
            }
            this.renderExercises();
        });

        // Expand / Collapse all
        this.dom.btnExpandAll.addEventListener("click", () => {
            document.querySelectorAll(".category-card").forEach(c => c.classList.remove("collapsed"));
        });
        this.dom.btnCollapseAll.addEventListener("click", () => {
            document.querySelectorAll(".category-card").forEach(c => c.classList.add("collapsed"));
        });

        // Random Workout Modal
        this.dom.btnOpenRandom.addEventListener("click", () => this.openWorkoutModal());
        this.dom.modalCloseBtn.addEventListener("click", () => this.closeWorkoutModal());
        this.dom.modalCloseBottom.addEventListener("click", () => this.closeWorkoutModal());
        this.dom.modal.addEventListener("click", (e) => {
            if (e.target === this.dom.modal) this.closeWorkoutModal();
        });
        this.dom.btnReroll.addEventListener("click", () => this.generateWorkoutRoutine());
        this.dom.exercisesPerCat.addEventListener("change", () => this.generateWorkoutRoutine());
        this.dom.btnCopyWorkout.addEventListener("click", () => this.copyWorkoutToClipboard());

        // Timer Controls
        this.dom.timerBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.dom.timerBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.setTimerDuration(parseInt(btn.dataset.sec, 10));
            });
        });
        this.dom.btnTimerToggle.addEventListener("click", () => this.toggleTimer());
        this.dom.btnTimerReset.addEventListener("click", () => this.resetTimer());

        // Keyboard Shortcut: Escape closes modal, / focuses search
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeWorkoutModal();
            } else if (e.key === "/" && document.activeElement !== this.dom.searchInput) {
                e.preventDefault();
                this.dom.searchInput.focus();
                this.dom.searchInput.select();
            }
        });
    }

    renderTabs() {
        this.dom.dayTabs.innerHTML = this.days.map(day => {
            const isActive = day === this.activeDay ? "active" : "";
            return `<button class="day-tab-btn ${isActive}" data-day="${day}">${day}</button>`;
        }).join("");

        this.dom.dayTabs.querySelectorAll(".day-tab-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                this.dom.dayTabs.querySelectorAll(".day-tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.showingFavorites = false;
                this.dom.btnViewFavs.classList.remove("active");
                this.activeDay = btn.dataset.day;
                this.renderExercises();
            });
        });
    }

    getVideoUrl(exerciseName) {
        if (this.exerciseLinks && this.exerciseLinks[exerciseName]) {
            return {
                url: this.exerciseLinks[exerciseName],
                hasTimestamp: true,
                label: "▶ Video"
            };
        }
        const query = encodeURIComponent(exerciseName + " form");
        return {
            url: `https://www.youtube.com/results?search_query=${query}`,
            hasTimestamp: false,
            label: "▶ YouTube"
        };
    }

    renderExercises() {
        let totalCount = 0;
        let html = "";

        if (this.showingFavorites) {
            this.dom.currentDayTitle.textContent = "Saved Favorites";
            const favList = Array.from(this.favorites);
            this.dom.currentDayCount.textContent = `${favList.length} Exercises`;

            if (favList.length === 0) {
                this.dom.exerciseContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; background: #fff; padding: 3rem; text-align: center; border: 2px dashed #cbd5e1; border-radius: 6px;">
                        <span style="font-size: 2.5rem;">⭐</span>
                        <h3 style="margin-top: 0.5rem; font-family: var(--font-heading);">No Saved Exercises Yet</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
                            Click the star icon next to any exercise to pin your favorites here for quick access.
                        </p>
                    </div>
                `;
                return;
            }

            // Render single favorites group
            html = `
                <div class="category-card" style="grid-column: 1 / -1;">
                    <div class="category-header">
                        <span class="category-title">⭐ Your Starred Movements</span>
                        <span class="category-count">${favList.length}</span>
                    </div>
                    <ul class="exercise-list" style="max-height: none;">
                        ${favList.map(ex => this.renderExerciseItem(ex)).join("")}
                    </ul>
                </div>
            `;
            this.dom.exerciseContainer.innerHTML = html;
            return;
        }

        // Global search vs single day
        if (this.searchQuery) {
            this.dom.currentDayTitle.textContent = `Search: "${this.searchQuery}"`;
            
            for (const [dayName, categories] of Object.entries(this.workoutData)) {
                for (const [catName, items] of Object.entries(categories)) {
                    const matched = items.filter(i => i.toLowerCase().includes(this.searchQuery) || catName.toLowerCase().includes(this.searchQuery));
                    if (matched.length > 0) {
                        totalCount += matched.length;
                        html += `
                            <div class="category-card">
                                <div class="category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                                    <span class="category-title">
                                        <span class="category-toggle-icon">▼</span>
                                        ${catName} <small style="font-weight: 400; color: #64748b;">(${dayName})</small>
                                    </span>
                                    <span class="category-count">${matched.length}</span>
                                </div>
                                <ul class="exercise-list">
                                    ${matched.map(ex => this.renderExerciseItem(ex)).join("")}
                                </ul>
                            </div>
                        `;
                    }
                }
            }

            this.dom.currentDayCount.textContent = `${totalCount} Matches`;
            if (totalCount === 0) {
                html = `
                    <div style="grid-column: 1 / -1; background: #fff; padding: 3rem; text-align: center; border: 2px dashed #cbd5e1; border-radius: 6px;">
                        <span style="font-size: 2.5rem;">🔍</span>
                        <h3 style="margin-top: 0.5rem; font-family: var(--font-heading);">No Exercises Found</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.25rem;">
                            No movements matched "${this.searchQuery}". Try a broader term (e.g. "press", "squat", "row").
                        </p>
                    </div>
                `;
            }
            this.dom.exerciseContainer.innerHTML = html;
            return;
        }

        // Standard Day View
        const categories = this.workoutData[this.activeDay] || {};
        this.dom.currentDayTitle.textContent = this.activeDay;

        for (const [catName, items] of Object.entries(categories)) {
            totalCount += items.length;
            html += `
                <div class="category-card">
                    <div class="category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                        <span class="category-title">
                            <span class="category-toggle-icon">▼</span>
                            ${catName}
                        </span>
                        <span class="category-count">${items.length}</span>
                    </div>
                    <ul class="exercise-list">
                        ${items.map(ex => this.renderExerciseItem(ex)).join("")}
                    </ul>
                </div>
            `;
        }

        this.dom.currentDayCount.textContent = `${totalCount} Exercises`;
        this.dom.exerciseContainer.innerHTML = html;
    }

    renderExerciseItem(exercise) {
        const v = this.getVideoUrl(exercise);
        const isFav = this.favorites.has(exercise);
        const favClass = isFav ? "active" : "";
        const favChar = isFav ? "★" : "☆";
        const tsClass = v.hasTimestamp ? "has-timestamp" : "";

        // Escape double quotes in exercise name for onclick attributes
        const safeEx = exercise.replace(/"/g, '&quot;');

        return `
            <li class="exercise-item" data-name="${safeEx}">
                <div class="exercise-name-wrap">
                    <button class="btn-fav ${favClass}" onclick="app.toggleFavorite('${safeEx}', this)" title="Star Exercise">${favChar}</button>
                    <span class="exercise-name">${exercise}</span>
                </div>
                <div class="exercise-actions">
                    <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="btn-watch ${tsClass}" title="Watch tutorial on YouTube">
                        ${v.label} ↗
                    </a>
                </div>
            </li>
        `;
    }

    toggleFavorite(exerciseName, btnEl) {
        if (this.favorites.has(exerciseName)) {
            this.favorites.delete(exerciseName);
            if (btnEl) {
                btnEl.textContent = "☆";
                btnEl.classList.remove("active");
            }
        } else {
            this.favorites.add(exerciseName);
            if (btnEl) {
                btnEl.textContent = "★";
                btnEl.classList.add("active");
            }
        }
        this.saveFavorites();
        if (this.showingFavorites) {
            this.renderExercises();
        }
    }

    /* ======================================================================
       Workout Generator Modal Logic
       ====================================================================== */
    openWorkoutModal() {
        this.dom.modalTitle.textContent = `${this.activeDay} Workout`;
        this.dom.modalEyebrow.textContent = `RANDOMIZED GENERATOR`;
        this.dom.modal.style.display = "flex";
        this.generateWorkoutRoutine();
    }

    closeWorkoutModal() {
        this.dom.modal.style.display = "none";
    }

    generateWorkoutRoutine() {
        const countPerGroup = parseInt(this.dom.exercisesPerCat.value, 10) || 2;
        const categories = this.workoutData[this.activeDay] || {};

        let routineHtml = "";
        this.currentRoutineItems = [];

        for (const [catName, items] of Object.entries(categories)) {
            if (!items || items.length === 0) continue;
            
            // Random sample
            const sampled = this.sampleArray(items, countPerGroup);
            
            routineHtml += `
                <div class="routine-group">
                    <div class="routine-group-title">${catName}</div>
            `;

            sampled.forEach((ex, idx) => {
                const v = this.getVideoUrl(ex);
                const safeEx = ex.replace(/"/g, '&quot;');
                this.currentRoutineItems.push({ category: catName, exercise: ex });

                routineHtml += `
                    <div class="routine-item" id="routine-item-${catName.replace(/\W/g, '')}-${idx}">
                        <label class="routine-checkbox-wrap">
                            <input type="checkbox" class="routine-checkbox" onchange="this.closest('.routine-item').classList.toggle('completed', this.checked)">
                            <span class="routine-text">${ex}</span>
                        </label>
                        <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="btn-watch ${v.hasTimestamp ? 'has-timestamp' : ''}" style="font-size: 0.72rem; padding: 0.2rem 0.5rem;">
                            ${v.label} ↗
                        </a>
                    </div>
                `;
            });

            routineHtml += `</div>`;
        }

        this.dom.modalWorkoutBody.innerHTML = routineHtml;
    }

    sampleArray(arr, n) {
        if (arr.length <= n) return [...arr];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    copyWorkoutToClipboard() {
        if (!this.currentRoutineItems || this.currentRoutineItems.length === 0) return;

        let text = `🏋️ ${this.activeDay.toUpperCase()} WORKOUT ROUTINE\n`;
        text += `Generated from Dumbbell & Bodyweight Library\n`;
        text += `=====================================\n\n`;

        let currentCat = "";
        this.currentRoutineItems.forEach(item => {
            if (item.category !== currentCat) {
                currentCat = item.category;
                text += `\n[ ${currentCat.toUpperCase()} ]\n`;
            }
            text += `  • ${item.exercise}\n`;
        });

        text += `\n=====================================\nReady to train!`;

        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.dom.btnCopyWorkout.textContent;
            this.dom.btnCopyWorkout.textContent = "✓ Copied!";
            setTimeout(() => {
                this.dom.btnCopyWorkout.textContent = originalText;
            }, 1800);
        }).catch(err => {
            alert("Could not copy to clipboard: " + err);
        });
    }

    /* ======================================================================
       Rest Timer Logic
       ====================================================================== */
    setTimerDuration(seconds) {
        this.timerSeconds = seconds;
        this.resetTimer();
    }

    toggleTimer() {
        if (this.timerIsRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (this.timerRemaining <= 0) {
            this.timerRemaining = this.timerSeconds;
        }
        this.timerIsRunning = true;
        this.dom.btnTimerToggle.textContent = "Pause";
        this.dom.btnTimerToggle.classList.add("running");

        this.timerInterval = setInterval(() => {
            this.timerRemaining--;
            this.updateTimerDisplay();

            if (this.timerRemaining <= 0) {
                this.timerFinished();
            }
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.timerInterval);
        this.timerIsRunning = false;
        this.dom.btnTimerToggle.textContent = "Resume";
        this.dom.btnTimerToggle.classList.remove("running");
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerIsRunning = false;
        this.timerRemaining = this.timerSeconds;
        this.dom.btnTimerToggle.textContent = "Start";
        this.dom.btnTimerToggle.classList.remove("running");
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const mins = Math.floor(this.timerRemaining / 60);
        const secs = this.timerRemaining % 60;
        const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        this.dom.timerDisplay.textContent = str;
    }

    timerFinished() {
        this.resetTimer();
        this.playBeep();
    }

    playBeep() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "sine";
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (e) {}
    }
}

// Global App Instance
let app;
window.addEventListener("DOMContentLoaded", () => {
    app = new DumbbellApp();
});
