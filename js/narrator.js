/* =============================================================================
   PROMETHEUS · Narration Engine
   -----------------------------------------------------------------------------
   Real, in-browser narration for every Academy lesson — no backend, works on a
   static GitHub Pages / Vercel deploy out of the box.

   Two engines, same API:
     1. Web Speech API (SpeechSynthesis) — default. Speaks sentence-by-sentence
        (short utterances dodge the Chrome ~15s cut-off bug) and reports the
        active sentence so the reader can highlight it like a teleprompter.
     2. Pre-rendered audio — if a lesson supplies `audioUrl` (e.g. an ElevenLabs
        Multilingual v2 render), we play that <audio> instead for studio-grade
        voiceover. Drop the file in and it upgrades automatically.

   Honors prefers-reduced-motion-agnostic (audio is opt-in via a button), keeps a
   gentle keep-alive so long lessons don't stall, and persists the user's chosen
   voice + speed in localStorage.
   ============================================================================= */
(function () {
  const synth = window.speechSynthesis || null;
  const SUPPORTED = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  const PREF_KEY = "prometheus.narrator.v1";
  let pref = loadPref();

  let voices = [];
  let current = null;        // { segs, i, opts } the active job
  let mode = "idle";         // 'idle' | 'playing' | 'paused'
  let audioEl = null;        // active <audio> when in audio mode
  let keepAlive = null;
  const stateSubs = new Set();

  function loadPref() {
    try { return Object.assign({ voiceURI: "", rate: 1, pitch: 1 }, JSON.parse(localStorage.getItem(PREF_KEY)) || {}); }
    catch (e) { return { voiceURI: "", rate: 1, pitch: 1 }; }
  }
  function savePref() { try { localStorage.setItem(PREF_KEY, JSON.stringify(pref)); } catch (e) {} }

  /* ---- voices load asynchronously in most browsers ---- */
  function refreshVoices() {
    if (!SUPPORTED) return [];
    voices = synth.getVoices() || [];
    return voices;
  }
  if (SUPPORTED) {
    refreshVoices();
    if (typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = refreshVoices;
  }

  /* Pick the best default voice for a language: prefer natural/neural/cloud
     voices, then a local English voice, then anything. */
  function bestVoice(lang) {
    if (!voices.length) refreshVoices();
    const L = (lang || "en").toLowerCase().slice(0, 2);
    const byLang = voices.filter((v) => (v.lang || "").toLowerCase().startsWith(L));
    const pool = byLang.length ? byLang : voices;
    const score = (v) => {
      let s = 0;
      const n = (v.name || "").toLowerCase();
      if (/natural|neural|premium|enhanced|google|microsoft|samantha|aria|jenny|guy|siri/.test(n)) s += 5;
      if (!v.localService) s += 2;            // cloud voices usually richer
      if (/female|aria|jenny|samantha|sonia|libby|emma|ava/.test(n)) s += 1;
      return s;
    };
    return pool.slice().sort((a, b) => score(b) - score(a))[0] || null;
  }

  /* Split a script into speakable sentences while keeping it readable. */
  function segment(text) {
    if (Array.isArray(text)) return text.map((s) => String(s).trim()).filter(Boolean);
    return String(text || "")
      .replace(/\s+/g, " ")
      .match(/[^.!?…]+[.!?…]+(?:["')\]]+)?|\S[^.!?…]*$/g) || [];
  }

  function setMode(m) {
    mode = m;
    stateSubs.forEach((cb) => { try { cb(m); } catch (e) {} });
  }

  /* ---- Web Speech sentence runner ---- */
  function runSpeech() {
    if (!current || mode !== "playing") return;
    const { segs, opts } = current;
    if (current.i >= segs.length) { finish(); return; }
    const u = new SpeechSynthesisUtterance(segs[current.i]);
    const v = voices.find((x) => x.voiceURI === pref.voiceURI) || bestVoice(opts.lang);
    if (v) { u.voice = v; u.lang = v.lang; }
    if (opts.lang && !v) u.lang = opts.lang;
    u.rate = clamp(pref.rate || opts.rate || 1, 0.6, 1.6);
    u.pitch = clamp(pref.pitch || opts.pitch || 1, 0.5, 1.5);
    if (opts.onSegment) { try { opts.onSegment(current.i, segs.length); } catch (e) {} }
    u.onend = () => { if (mode === "playing") { current.i++; runSpeech(); } };
    u.onerror = () => { if (mode === "playing") { current.i++; runSpeech(); } };
    try { synth.speak(u); } catch (e) { current.i++; runSpeech(); }
  }

  function startKeepAlive() {
    stopKeepAlive();
    keepAlive = setInterval(() => {
      if (mode === "playing" && synth && synth.speaking && !synth.paused) {
        // Chrome stalls long sessions; a no-op pause/resume keeps it flowing.
        try { synth.pause(); synth.resume(); } catch (e) {}
      }
    }, 9000);
  }
  function stopKeepAlive() { if (keepAlive) { clearInterval(keepAlive); keepAlive = null; } }

  function finish() {
    const cb = current && current.opts.onEnd;
    cleanup();
    setMode("idle");
    if (cb) { try { cb(); } catch (e) {} }
  }
  function cleanup() {
    stopKeepAlive();
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl.onended = audioEl.ontimeupdate = null; audioEl = null; }
    if (SUPPORTED) { try { synth.cancel(); } catch (e) {} }
  }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, +n || 0)); }

  const api = {
    supported: SUPPORTED,
    refreshVoices,
    getVoices() { return refreshVoices(); },
    getPref() { return Object.assign({}, pref); },
    setVoice(uri) { pref.voiceURI = uri || ""; savePref(); },
    setRate(r) { pref.rate = clamp(r, 0.6, 1.6); savePref(); },
    state() { return mode; },
    onState(cb) { stateSubs.add(cb); return () => stateSubs.delete(cb); },

    /* Speak a string or array of sentences. Options:
       { lang, rate, pitch, audioUrl, onSegment(i,total), onEnd } */
    speak(text, opts = {}) {
      this.stop();
      // Pre-rendered audio path (e.g. ElevenLabs render) — best quality.
      if (opts.audioUrl) {
        audioEl = new Audio(opts.audioUrl);
        const segs = segment(text);
        audioEl.onloadedmetadata = () => {};
        audioEl.ontimeupdate = () => {
          if (!audioEl || !audioEl.duration || !opts.onSegment) return;
          const idx = Math.min(segs.length - 1, Math.floor((audioEl.currentTime / audioEl.duration) * segs.length));
          opts.onSegment(idx, segs.length);
        };
        audioEl.onended = () => finish();
        current = { segs, i: 0, opts };
        setMode("playing");
        audioEl.play().catch(() => { /* needs a gesture; caller triggers on click so fine */ });
        return true;
      }
      if (!SUPPORTED) return false;
      refreshVoices();
      current = { segs: segment(text), i: 0, opts };
      if (!current.segs.length) return false;
      setMode("playing");
      startKeepAlive();
      // a tiny delay lets cancel() settle on some browsers
      setTimeout(runSpeech, 60);
      return true;
    },

    pause() {
      if (mode !== "playing") return;
      if (audioEl) audioEl.pause();
      else if (SUPPORTED) { try { synth.pause(); } catch (e) {} }
      stopKeepAlive();
      setMode("paused");
    },
    resume() {
      if (mode !== "paused") return;
      if (audioEl) audioEl.play().catch(() => {});
      else if (SUPPORTED) { try { synth.resume(); } catch (e) {} startKeepAlive(); }
      setMode("playing");
    },
    toggle() {
      if (mode === "playing") this.pause();
      else if (mode === "paused") this.resume();
    },
    stop() {
      if (mode === "idle" && !audioEl) { cleanup(); return; }
      cleanup();
      current = null;
      setMode("idle");
    },
  };

  if (window.PROM) PROM.narrator = api; else window.PROM = { narrator: api };
})();
