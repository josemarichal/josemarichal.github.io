/**
 * Horarium & Rule of Life Scheduler
 * Manages canonical monastic hours, daily routine mapping, and current-hour detection.
 */

import { storage } from "./storage.js";

export class HorariumManager {
  constructor() {
    this.hours = storage.getHorarium();
  }

  getHours() {
    this.hours = storage.getHorarium();
    return this.hours;
  }

  getCurrentMonasticHour() {
    const hours = this.getHours();
    const now = new Date();
    const currentHourDecimal = now.getHours() + (now.getMinutes() / 60);

    // Sort hours chronologically by time
    const sorted = [...hours].sort((a, b) => {
      const [hA, mA] = a.hourTime.split(":").map(Number);
      const [hB, mB] = b.hourTime.split(":").map(Number);
      return (hA + mA / 60) - (hB + mB / 60);
    });

    let activeHour = sorted[sorted.length - 1]; // Default to the last one (e.g. Compline) if before first

    for (let i = 0; i < sorted.length; i++) {
      const [h, m] = sorted[i].hourTime.split(":").map(Number);
      const timeVal = h + (m / 60);
      if (currentHourDecimal >= timeVal) {
        activeHour = sorted[i];
      }
    }

    return activeHour;
  }

  saveCustomHour(hourObj) {
    const current = this.getHours();
    const existingIdx = current.findIndex(h => h.id === hourObj.id);

    if (existingIdx >= 0) {
      current[existingIdx] = hourObj;
    } else {
      current.push(hourObj);
    }

    storage.saveHorarium(current);
    this.hours = current;
    return current;
  }

  deleteHour(id) {
    let current = this.getHours();
    current = current.filter(h => h.id !== id);
    storage.saveHorarium(current);
    this.hours = current;
    return current;
  }

  resetToDefault() {
    this.hours = storage.resetHorariumToDefault();
    return this.hours;
  }
}

export const horarium = new HorariumManager();
