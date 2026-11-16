// Synthesized Web Audio API SFX Engine (zero external asset failures)
class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private enabled = true;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.08,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  public playClick() {
    this.playTone(540, 0.06, 'triangle', 0.06, 0);
  }

  public playCorrect() {
    this.playTone(523.25, 0.12, 'triangle', 0.09, 0);
    this.playTone(659.25, 0.14, 'triangle', 0.09, 0.08);
    this.playTone(783.99, 0.2, 'sine', 0.1, 0.16);
  }

  public playWrong() {
    this.playTone(260, 0.14, 'sawtooth', 0.05, 0);
    this.playTone(210, 0.22, 'sawtooth', 0.05, 0.11);
  }

  public playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.24, 'triangle', 0.09, idx * 0.09);
    });
  }

  public playBadge() {
    const notes = [587.33, 739.99, 880, 1174.66];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.22, 'sine', 0.09, idx * 0.075);
    });
  }
}

export const soundService = new SoundEffectsService();
