/* =============================================================================
   PROMETHEUS · Adaptive Soundscape Engine
   -----------------------------------------------------------------------------
   Generative, asset-free background audio via the Web Audio API. Two moods that
   the app switches automatically:
     • "ambient"  — slow cinematic synth pads (lessons, dashboard, history)
     • "intense"  — same pads + a faster pulse (games & timed trainings)
   Honors autoplay policy (starts on first user gesture) and prefers-reduced-
   motion. For real ElevenLabs narration / AI music, see CONFIG.elevenlabs.
   ============================================================================= */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let ctx = null, master = null, pad = null, lfo = null, pulseTimer = null;
  let started = false, enabled = true, mode = "ambient";

  // pad chord (Hz) — a moody minor 9th, very sci-fi
  const CHORD = [110, 164.81, 220, 277.18, 329.63];

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);

    // low-pass to keep it soft + an LFO gently sweeping the cutoff
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 6;
    filter.connect(master);

    lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 320;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
    lfo.start();

    pad = ctx.createGain(); pad.gain.value = 0.5; pad.connect(filter);
    CHORD.forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 8;
      const g = ctx.createGain(); g.gain.value = 0.18 / CHORD.length * (i === 0 ? 2 : 1);
      o.connect(g); g.connect(pad); o.start();
    });
  }

  function pulse() {
    clearInterval(pulseTimer);
    if (mode !== "intense" || !ctx) return;
    const tempo = 360; // ms between hits → driving rhythm during games
    pulseTimer = setInterval(() => {
      if (!enabled || !ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 55;
      o.connect(g); g.connect(master);
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.start(t); o.stop(t + 0.24);
    }, tempo);
  }

  function fadeTo(v, secs = 1.2) {
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(v, ctx.currentTime, secs / 3);
  }

  const api = {
    get enabled() { return enabled; },
    start() {
      if (started || reduce) return;
      started = true;
      try { build(); fadeTo(enabled ? 0.06 : 0); pulse(); } catch (e) { started = false; }
    },
    setMode(m) {
      mode = m === "intense" ? "intense" : "ambient";
      if (!started) return;
      fadeTo(enabled ? (mode === "intense" ? 0.08 : 0.06) : 0, 1.0);
      pulse();
    },
    toggle() {
      enabled = !enabled;
      if (!started && enabled) api.start();
      fadeTo(enabled ? (mode === "intense" ? 0.08 : 0.06) : 0, 0.4);
      if (ctx && ctx.state === "suspended") ctx.resume();
      return enabled;
    },
  };

  if (window.PROM) PROM.audio = api; else window.PROM = { audio: api };

  // Kick off on first user gesture (required by browser autoplay policy)
  const kick = () => { api.start(); window.removeEventListener("pointerdown", kick); window.removeEventListener("keydown", kick); };
  window.addEventListener("pointerdown", kick, { once: false });
  window.addEventListener("keydown", kick, { once: false });
})();
