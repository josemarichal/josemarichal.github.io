/**
 * Storage & State Persistence Layer
 * Manages user habits, streaks, custom disciplines, reflections, and Rule of Life in LocalStorage.
 */

import { DEFAULT_DISCIPLINES, CANONICAL_HOURS } from "./data/disciplines.js";

const STORAGE_KEYS = {
  CUSTOM_DISCIPLINES: "orthopraxis_custom_disciplines",
  HISTORY: "orthopraxis_history", // { [dateStr 'YYYY-MM-DD']: [disciplineId, ...] }
  SESSION_LOGS: "orthopraxis_session_logs", // Array of { id, disciplineId, durationSec, timestamp, dateStr }
  JOURNAL_ENTRIES: "orthopraxis_journal_entries", // Array of { id, disciplineId, title, content, mood, tags, timestamp, dateStr }
  HORARIUM: "orthopraxis_horarium", // Array of hour objects
  SETTINGS: "orthopraxis_settings"
};

const DEFAULT_SETTINGS = {
  theme: "theme-midnight", // 'theme-midnight', 'theme-parchment', 'theme-hermitage', 'theme-celestial'
  bellType: "tibetan-bowl", // 'tibetan-bowl', 'cathedral-bell'
  audioVolume: 0.75,
  ambientSound: "none",
  ambientVolume: 0.35,
  soundEnabled: true
};

export class StorageManager {
  constructor() {
    this.init();
  }

  init() {
    // Ensure default settings exist
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      this.saveSettings(DEFAULT_SETTINGS);
    }
  }

  getTodayStr() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ==================== DISCIPLINES ====================

  getAllDisciplines() {
    const custom = this.getCustomDisciplines();
    return [...DEFAULT_DISCIPLINES, ...custom];
  }

  getDisciplineById(id) {
    return this.getAllDisciplines().find(d => d.id === id) || null;
  }

  getCustomDisciplines() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_DISCIPLINES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading custom disciplines", e);
      return [];
    }
  }

  saveCustomDiscipline(disc) {
    const current = this.getCustomDisciplines();
    const existingIndex = current.findIndex(d => d.id === disc.id);
    if (existingIndex >= 0) {
      current[existingIndex] = disc;
    } else {
      current.push(disc);
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DISCIPLINES, JSON.stringify(current));
    return disc;
  }

  deleteCustomDiscipline(id) {
    const current = this.getCustomDisciplines().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DISCIPLINES, JSON.stringify(current));
  }

  // ==================== HABITS & COMPLETIONS ====================

  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Error reading history", e);
      return {};
    }
  }

  getTodayCompletedIds() {
    const history = this.getHistory();
    const today = this.getTodayStr();
    return history[today] || [];
  }

  isCompletedToday(disciplineId) {
    return this.getTodayCompletedIds().includes(disciplineId);
  }

  toggleComplete(disciplineId, dateStr = null) {
    const history = this.getHistory();
    const targetDate = dateStr || this.getTodayStr();
    const dayList = history[targetDate] || [];

    const index = dayList.indexOf(disciplineId);
    let isNowCompleted = false;

    if (index >= 0) {
      dayList.splice(index, 1);
      isNowCompleted = false;
    } else {
      dayList.push(disciplineId);
      isNowCompleted = true;
      // Also log session
      const discipline = this.getDisciplineById(disciplineId);
      this.logSession(disciplineId, (discipline ? discipline.durationMin : 10) * 60, targetDate);
    }

    history[targetDate] = dayList;
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return isNowCompleted;
  }

  markCompleted(disciplineId, durationSec = null) {
    const history = this.getHistory();
    const today = this.getTodayStr();
    const dayList = history[today] || [];

    if (!dayList.includes(disciplineId)) {
      dayList.push(disciplineId);
      history[today] = dayList;
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    }

    const discipline = this.getDisciplineById(disciplineId);
    const secs = durationSec || (discipline ? discipline.durationMin * 60 : 600);
    this.logSession(disciplineId, secs, today);
  }

  // ==================== PRACTICE SESSIONS ====================

  getSessionLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  logSession(disciplineId, durationSec, dateStr = null) {
    const logs = this.getSessionLogs();
    const session = {
      id: "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      disciplineId,
      durationSec,
      timestamp: Date.now(),
      dateStr: dateStr || this.getTodayStr()
    };
    logs.unshift(session);
    // Keep max 500 session records
    if (logs.length > 500) logs.length = 500;
    localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(logs));
    return session;
  }

  // ==================== STREAKS & METRICS ====================

  getMetrics() {
    const history = this.getHistory();
    const sessionLogs = this.getSessionLogs();
    const today = this.getTodayStr();
    const dates = Object.keys(history).sort();

    let totalCompletedSessions = 0;
    Object.values(history).forEach(list => {
      totalCompletedSessions += list.length;
    });

    let totalMinutes = 0;
    sessionLogs.forEach(s => {
      totalMinutes += Math.round((s.durationSec || 0) / 60);
    });

    // Calculate current streak
    let currentStreak = 0;
    let checkDate = new Date();
    
    // Check if practiced today
    const todayPracticed = history[today] && history[today].length > 0;
    if (todayPracticed) {
      currentStreak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // Check if practiced yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];
      if (history[yStr] && history[yStr].length > 0) {
        currentStreak = 1;
        checkDate = yesterday;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    if (currentStreak > 0) {
      while (true) {
        const dStr = checkDate.toISOString().split("T")[0];
        if (history[dStr] && history[dStr].length > 0) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Longest streak
    let longestStreak = currentStreak;
    let tempStreak = 0;
    let prevTimestamp = null;

    dates.forEach(dStr => {
      if (history[dStr] && history[dStr].length > 0) {
        const curr = new Date(dStr + "T00:00:00").getTime();
        if (prevTimestamp === null) {
          tempStreak = 1;
        } else {
          const diffDays = Math.round((curr - prevTimestamp) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            tempStreak++;
          } else if (diffDays > 1) {
            tempStreak = 1;
          }
        }
        prevTimestamp = curr;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      }
    });

    // Top practiced disciplines
    const counts = {};
    Object.values(history).forEach(list => {
      list.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });
    });

    const topDisciplines = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({
        discipline: this.getDisciplineById(id),
        count
      }))
      .filter(item => item.discipline !== null);

    return {
      currentStreak,
      longestStreak,
      totalCompletedSessions,
      totalMinutes,
      completedTodayCount: (history[today] || []).length,
      topDisciplines
    };
  }

  getLastNDaysData(days = 14) {
    const history = this.getHistory();
    const result = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const completed = history[dateStr] || [];

      result.push({
        dateStr,
        dayName: d.toLocaleDateString(undefined, { weekday: "short" }),
        dayNum: d.getDate(),
        isToday: i === 0,
        count: completed.length,
        items: completed
      });
    }
    return result;
  }

  // ==================== JOURNAL & REFLECTIONS ====================

  getJournalEntries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading journal entries", e);
      return [];
    }
  }

  saveJournalEntry(entry) {
    const entries = this.getJournalEntries();
    const newEntry = {
      id: entry.id || "journal_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      disciplineId: entry.disciplineId || null,
      title: entry.title || "Spiritual Reflection",
      content: entry.content || "",
      mood: entry.mood || "Peaceful", // 'Peaceful', 'Grateful', 'Struggling', 'Contemplative', 'Joyful'
      tags: entry.tags || [],
      timestamp: entry.timestamp || Date.now(),
      dateStr: entry.dateStr || this.getTodayStr()
    };

    const existingIndex = entries.findIndex(e => e.id === newEntry.id);
    if (existingIndex >= 0) {
      entries[existingIndex] = newEntry;
    } else {
      entries.unshift(newEntry);
    }

    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
    return newEntry;
  }

  deleteJournalEntry(id) {
    const entries = this.getJournalEntries().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
  }

  // ==================== HORARIUM / RULE OF LIFE ====================

  getHorarium() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HORARIUM);
      return data ? JSON.parse(data) : CANONICAL_HOURS;
    } catch (e) {
      return CANONICAL_HOURS;
    }
  }

  saveHorarium(hours) {
    localStorage.setItem(STORAGE_KEYS.HORARIUM, JSON.stringify(hours));
  }

  resetHorariumToDefault() {
    localStorage.setItem(STORAGE_KEYS.HORARIUM, JSON.stringify(CANONICAL_HOURS));
    return CANONICAL_HOURS;
  }

  // ==================== SETTINGS ====================

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(settings) {
    const current = this.getSettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
    return merged;
  }

  // ==================== EXPORT & IMPORT ====================

  exportAllData() {
    return {
      version: "1.0",
      exportDate: new Date().toISOString(),
      customDisciplines: this.getCustomDisciplines(),
      history: this.getHistory(),
      sessionLogs: this.getSessionLogs(),
      journalEntries: this.getJournalEntries(),
      horarium: this.getHorarium(),
      settings: this.getSettings()
    };
  }

  importData(jsonData) {
    try {
      if (jsonData.customDisciplines) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_DISCIPLINES, JSON.stringify(jsonData.customDisciplines));
      }
      if (jsonData.history) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(jsonData.history));
      }
      if (jsonData.sessionLogs) {
        localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(jsonData.sessionLogs));
      }
      if (jsonData.journalEntries) {
        localStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(jsonData.journalEntries));
      }
      if (jsonData.horarium) {
        localStorage.setItem(STORAGE_KEYS.HORARIUM, JSON.stringify(jsonData.horarium));
      }
      if (jsonData.settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(jsonData.settings));
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    this.init();
  }
}

export const storage = new StorageManager();
