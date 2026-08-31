/**
 * Monastic Audio Synthesis Engine
 * Zero-dependency procedural sound generator using Web Audio API.
 * Produces authentic Cathedral Bells, Tibetan Singing Bowls, Step Chimes, and Ambient Soundscapes.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.ambientGain = null;
    this.ambientNodes = [];
    this.isMuted = false;
    this.volume = 0.75;
    this.ambientVolume = 0.35;
    this.currentAmbient = "none";
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : this.ambientVolume, this.ctx.currentTime);
        this.ambientGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  setAmbientVolume(val) {
    this.ambientVolume = Math.max(0, Math.min(1, val));
    if (this.ambientGain && this.ctx && !this.isMuted) {
      this.ambientGain.gain.setTargetAtTime(this.ambientVolume, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(this.isMuted ? 0 : this.ambientVolume, this.ctx.currentTime, 0.05);
    }
    return this.isMuted;
  }

  /**
   * Cathedral Church Bell Synthesis
   * Modeled with physical strike tone, hum tone (subharmonic), tierce (minor 3rd), quint, and nominal.
   */
  playCathedralBell(fundamental = 220) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const partials = [
      { mult: 0.5, gain: 0.4, decay: 6.0 },   // Hum tone
      { mult: 1.0, gain: 0.8, decay: 4.5 },   // Prime / Fundamental
      { mult: 1.189, gain: 0.6, decay: 3.5 }, // Tierce (Minor third)
      { mult: 1.5, gain: 0.5, decay: 3.0 },   // Quint
      { mult: 2.0, gain: 0.4, decay: 2.2 },   // Nominal / Octave
      { mult: 2.76, gain: 0.25, decay: 1.5 }, // Superquint
      { mult: 4.0, gain: 0.15, decay: 0.8 }   // Strike high shimmer
    ];

    partials.forEach(({ mult, gain, decay }) => {
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(fundamental * mult, now);

      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(gain * 0.4, now + 0.015);
      pGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(pGain);
      pGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  }

  /**
   * Tibetan / Monastic Singing Bowl
   * Multi-frequency resonant acoustic sound with slow, shimmering beating tone.
   */
  playTibetanBowl(fundamental = 293.66) { // D4
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const modes = [
      { freq: fundamental, gain: 0.6, decay: 7.0 },
      { freq: fundamental * 2.76, gain: 0.35, decay: 5.5 },
      { freq: fundamental * 5.4, gain: 0.15, decay: 4.0 }
    ];

    modes.forEach(({ freq, gain, decay }) => {
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();

      // Subtle LFO modulation for organic beating
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(2.5, now);
      lfoGain.gain.setValueAtTime(freq * 0.015, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + decay + 0.2);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(gain * 0.35, now + 0.08); // Gentle bowl strike
      pGain.gain.exponentialRampToValueAtTime(0.00005, now + decay);

      osc.connect(pGain);
      pGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay + 0.2);
    });
  }

  /**
   * Soft Step Transition Chime (Two-tone interval)
   */
  playSoftChime() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25]; // C5, E5
    notes.forEach((freq, i) => {
      const startTime = now + (i * 0.12);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 2.0);
    });
  }

  /**
   * Breath guide subtle audio cue
   */
  playBreathCue(isInhale) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const startFreq = isInhale ? 220 : 330;
    const endFreq = isInhale ? 330 : 220;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.4);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  /**
   * Ambient Soundscape Manager
   */
  setAmbientSound(type) {
    this.stopAmbient();
    this.currentAmbient = type;
    if (type === "none" || !type) return;

    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (type === "chapel-drone") {
      // Warm contemplative organ / chapel resonance drone
      const freqs = [110, 164.81, 220, 329.63]; // A2, E3, A3, E4 chord
      freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 2.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ambientGain);

        osc.start(now);
        this.ambientNodes.push({ osc, gain });
      });
    } else if (type === "monastery-rain") {
      // Generative soft rain against stone
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      // Pink noise algorithm
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 2.0);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambientGain);

      whiteNoise.start(now);
      this.ambientNodes.push({ osc: whiteNoise, gain });
    }
  }

  stopAmbient() {
    if (this.ambientNodes && this.ambientNodes.length > 0) {
      const now = this.ctx ? this.ctx.currentTime : 0;
      this.ambientNodes.forEach(node => {
        try {
          if (node.gain && this.ctx) {
            node.gain.gain.linearRampToValueAtTime(0, now + 0.5);
          }
          setTimeout(() => {
            if (node.osc && node.osc.stop) {
              node.osc.stop();
            }
          }, 600);
        } catch (e) {
          // Ignore audio stopping errors
        }
      });
      this.ambientNodes = [];
    }
    this.currentAmbient = "none";
  }
}

export const sound = new AudioEngine();
