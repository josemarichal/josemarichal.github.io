/**
 * Guided Practice Studio Engine
 * Handles timers, step transitions, breathing visualizations, audio synchronization, and post-session reflections.
 */

import { sound } from "./audio.js";
import { storage } from "./storage.js";

export class PracticeEngine {
  constructor(options = {}) {
    this.onTick = options.onTick || (() => {});
    this.onStepChange = options.onStepChange || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onBreathCycle = options.onBreathCycle || (() => {});

    this.activeDiscipline = null;
    this.currentStepIndex = 0;
    this.totalSteps = 0;
    this.stepTimeRemaining = 0;
    this.totalTimeRemaining = 0;
    this.totalDuration = 0;
    this.isPaused = false;
    this.isRunning = false;
    this.timerId = null;

    // Breath Prayer settings
    this.breathState = "idle"; // 'inhale', 'hold-in', 'exhale', 'hold-out'
    this.breathPhaseTimer = null;
    this.breathCadence = { inhale: 4, holdIn: 2, exhale: 5, holdOut: 2 };
    this.currentPhraseIndex = 0;
  }

  startPractice(discipline, customDurationSec = null) {
    this.stopPractice();
    this.activeDiscipline = discipline;
    this.currentStepIndex = 0;
    this.isPaused = false;
    this.isRunning = true;

    // Determine steps and durations
    const steps = (discipline.steps && discipline.steps.length > 0)
      ? discipline.steps
      : [
          {
            title: "Entering Stillness & Setting Intention",
            durationSec: 60,
            guidance: "Quiet your thoughts, take a slow deep breath, and dedicate this practice to God."
          },
          {
            title: "Main Contemplation",
            durationSec: (discipline.durationMin || 10) * 60 - 120,
            guidance: discipline.longDesc || discipline.shortDesc
          },
          {
            title: "Closing & Gratitude",
            durationSec: 60,
            guidance: "Rest in gratitude and offer your prayer of thanksgiving before returning to the day."
          }
        ];

    this.steps = steps;
    this.totalSteps = steps.length;

    // Adjust if custom duration provided
    if (customDurationSec && customDurationSec > 0) {
      const stepPortion = Math.floor(customDurationSec / this.totalSteps);
      this.steps = steps.map(s => ({
        ...s,
        durationSec: stepPortion
      }));
    }

    this.totalDuration = this.steps.reduce((sum, s) => sum + s.durationSec, 0);
    this.totalTimeRemaining = this.totalDuration;
    this.stepTimeRemaining = this.steps[0].durationSec;

    // Play starting chime based on settings
    const settings = storage.getSettings();
    if (settings.soundEnabled) {
      if (settings.bellType === "cathedral-bell") {
        sound.playCathedralBell();
      } else {
        sound.playTibetanBowl();
      }
    }

    this.startBreathCycle();
    this.startTimer();
    this.onStepChange(this.getCurrentState());
  }

  startTimer() {
    if (this.timerId) clearInterval(this.timerId);

    this.timerId = setInterval(() => {
      if (this.isPaused || !this.isRunning) return;

      this.stepTimeRemaining--;
      this.totalTimeRemaining--;

      if (this.stepTimeRemaining <= 0) {
        this.nextStep(false);
      } else {
        this.onTick(this.getCurrentState());
      }
    }, 1000);
  }

  togglePause() {
    if (!this.isRunning) return false;
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  nextStep(isManual = true) {
    if (this.currentStepIndex < this.totalSteps - 1) {
      this.currentStepIndex++;
      this.stepTimeRemaining = this.steps[this.currentStepIndex].durationSec;
      
      const settings = storage.getSettings();
      if (settings.soundEnabled) {
        sound.playSoftChime();
      }

      this.onStepChange(this.getCurrentState());
    } else {
      this.finishPractice();
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.stepTimeRemaining = this.steps[this.currentStepIndex].durationSec;
      this.onStepChange(this.getCurrentState());
    }
  }

  finishPractice() {
    this.stopPractice();
    const settings = storage.getSettings();
    if (settings.soundEnabled) {
      if (settings.bellType === "cathedral-bell") {
        sound.playCathedralBell();
      } else {
        sound.playTibetanBowl();
      }
    }

    if (this.activeDiscipline) {
      const durationCompleted = this.totalDuration - Math.max(0, this.totalTimeRemaining);
      storage.markCompleted(this.activeDiscipline.id, durationCompleted);
      this.onComplete({
        discipline: this.activeDiscipline,
        durationSec: durationCompleted
      });
    }
  }

  stopPractice() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.stopBreathCycle();
  }

  // ==================== BREATH ENGINE ====================

  isBreathDriven() {
    if (!this.activeDiscipline) return false;
    return ["breath-prayer", "hesychasm-jesus-prayer", "centering-prayer"].includes(this.activeDiscipline.id);
  }

  startBreathCycle() {
    this.stopBreathCycle();
    if (!this.isBreathDriven()) return;

    let phaseIndex = 0;
    const phases = [
      { name: "inhale", duration: this.breathCadence.inhale, label: "Inhale slowly" },
      { name: "hold-in", duration: this.breathCadence.holdIn, label: "Hold gently" },
      { name: "exhale", duration: this.breathCadence.exhale, label: "Exhale & release" },
      { name: "hold-out", duration: this.breathCadence.holdOut, label: "Rest in stillness" }
    ];

    const runPhase = () => {
      if (!this.isRunning) return;
      if (this.isPaused) {
        this.breathPhaseTimer = setTimeout(runPhase, 500);
        return;
      }

      const currentPhase = phases[phaseIndex];
      this.breathState = currentPhase.name;

      this.onBreathCycle({
        phase: currentPhase.name,
        label: currentPhase.label,
        duration: currentPhase.duration,
        phrase: this.getActivePhrase()
      });

      phaseIndex = (phaseIndex + 1) % phases.length;
      this.breathPhaseTimer = setTimeout(runPhase, currentPhase.duration * 1000);
    };

    runPhase();
  }

  stopBreathCycle() {
    if (this.breathPhaseTimer) {
      clearTimeout(this.breathPhaseTimer);
      this.breathPhaseTimer = null;
    }
    this.breathState = "idle";
  }

  getActivePhrase() {
    if (!this.activeDiscipline || !this.activeDiscipline.suggestedPhrases) {
      return { inhale: "Receive God's Peace", exhale: "Release all burden" };
    }
    const phrases = this.activeDiscipline.suggestedPhrases;
    return phrases[this.currentPhraseIndex % phrases.length];
  }

  setPhraseIndex(idx) {
    this.currentPhraseIndex = idx;
    this.onBreathCycle({
      phase: this.breathState,
      phrase: this.getActivePhrase(),
      label: ""
    });
  }

  getCurrentState() {
    const currentStep = (this.steps && this.steps[this.currentStepIndex]) ? this.steps[this.currentStepIndex] : null;
    const stepDuration = currentStep ? currentStep.durationSec : 1;
    const stepProgress = Math.max(0, Math.min(1, 1 - (this.stepTimeRemaining / stepDuration)));
    const totalProgress = Math.max(0, Math.min(1, 1 - (this.totalTimeRemaining / (this.totalDuration || 1))));

    return {
      discipline: this.activeDiscipline,
      currentStep,
      stepIndex: this.currentStepIndex,
      totalSteps: this.totalSteps,
      stepTimeRemaining: this.stepTimeRemaining,
      totalTimeRemaining: this.totalTimeRemaining,
      stepProgress,
      totalProgress,
      isPaused: this.isPaused,
      isRunning: this.isRunning,
      isBreath: this.isBreathDriven(),
      breathState: this.breathState,
      phrase: this.getActivePhrase()
    };
  }
}

export const practice = new PracticeEngine();
