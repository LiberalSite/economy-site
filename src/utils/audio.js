// Web Audio API Realistic Drum Roulette Physics Synthesizer

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTickSound(pitch = 1000) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.025);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.025);
  } catch (e) {}
}

export function playRealisticDrumSound(durationMs = 5200) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Schedule realistic mechanical roulette wheel clicks:
    // Slow start -> Rapid spin -> Gradual deceleration to complete halt
    const startTime = Date.now();
    let currentDelay = 140; // start slow

    function scheduleNextClick() {
      const elapsed = Date.now() - startTime;
      if (elapsed >= durationMs) return;

      const progress = elapsed / durationMs; // 0 to 1

      // Frequency / pitch variation
      const pitch = 850 + Math.sin(progress * Math.PI) * 450;
      playTickSound(pitch);

      if (progress < 0.28) {
        // Accelerating: 140ms down to 32ms
        currentDelay = Math.max(32, currentDelay * 0.88);
      } else if (progress < 0.62) {
        // Top speed clicking
        currentDelay = 32 + (Math.random() - 0.5) * 6;
      } else {
        // Decelerating: 32ms up to 340ms
        const decelFactor = (progress - 0.62) / 0.38; // 0 to 1
        currentDelay = 32 + Math.pow(decelFactor, 2.8) * 320;
      }

      setTimeout(scheduleNextClick, currentDelay);
    }

    scheduleNextClick();
  } catch (e) {}
}

export function playWinSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.07);
      gain.gain.setValueAtTime(0.12, now + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.07);
      osc.stop(now + 0.7);
    });
  } catch (e) {}
}

export function playLossSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.35);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {}
}

export const playSound = (type, customDuration = 5200) => {
  if (type === 'click') playTickSound(1200);
  if (type === 'spin') playRealisticDrumSound(customDuration);
  if (type === 'win') playWinSound();
  if (type === 'loss') playLossSound();
};
