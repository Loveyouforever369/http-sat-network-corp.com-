/* =============================================================================
   PROMETHEUS · Narration Engine (multi-provider)
   -----------------------------------------------------------------------------
   Replaces the robotic browser voice with natural AI voices, in priority order:

     1. ElevenLabs / pre-rendered audio  — if a lesson supplies `audioUrl`
        (studio quality; drop in an ElevenLabs render and it wins automatically).
     2. Amazon Polly (DEFAULT)           — natural voices via a free, no-key,
        CORS-friendly TTS service. The visitor's browser fetches the MP3, so no
        API key and no server are needed. Per-sentence playback keeps the
        teleprompter in sync; the next sentence is prefetched for smooth flow.
     3. Browser Web Speech (FALLBACK)    — only if Polly can't be reached.

   Public API is unchanged (speak/pause/resume/stop/toggle/state/onState) plus
   provider + voice controls. Persists choices in localStorage.
   ============================================================================= */
(function () {
  const synth = window.speechSynthesis || null;
  const WEBSPEECH = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  const PREF_KEY = "prometheus.narrator.v2";
  let pref = loadPref();

  // Curated natural Polly voices (served key-free via StreamElements TTS).
  const POLLY_VOICES = [
    { id: "Matthew", label: "Matthew · warm US male" },
    { id: "Joanna", label: "Joanna · clear US female" },
    { id: "Brian", label: "Brian · UK male" },
    { id: "Amy", label: "Amy · UK female" },
    { id: "Joey", label: "Joey · US male" },
    { id: "Salli", label: "Salli · US female" },
    { id: "Russell", label: "Russell · AU male" },
    { id: "Nicole", label: "Nicole · AU female" },
  ];
  const POLLY_URL = (text, voice) =>
    "https://api.streamelements.com/kappa/v2/speech?voice=" + encodeURIComponent(voice || "Matthew") +
    "&text=" + encodeURIComponent(text);

  let voices = [];               // web-speech voices (fallback only)
  let current = null;            // active job { segs, i, opts, provider, next }
  let mode = "idle";             // idle | playing | paused
  let audioEl = null;            // active <audio> for audioUrl/polly
  let keepAlive = null;
  const stateSubs = new Set();

  function loadPref() {
    try { return Object.assign({ provider: "polly", pollyVoice: "Matthew", voiceURI: "", rate: 1 }, JSON.parse(localStorage.getItem(PREF_KEY)) || {}); }
    catch (e) { return { provider: "polly", pollyVoice: "Matthew", voiceURI: "", rate: 1 }; }
  }
  function savePref() { try { localStorage.setItem(PREF_KEY, JSON.stringify(pref)); } catch (e) {} }

  function refreshVoices() { if (!WEBSPEECH) return []; voices = synth.getVoices() || []; return voices; }
  if (WEBSPEECH) { refreshVoices(); if (typeof synth.onvoiceschanged !== "undefined") synth.onvoiceschanged = refreshVoices; }
  function bestVoice(lang) {
    if (!voices.length) refreshVoices();
    const L = (lang || "en").toLowerCase().slice(0, 2);
    const pool = voices.filter((v) => (v.lang || "").toLowerCase().startsWith(L));
    const list = pool.length ? pool : voices;
    const score = (v) => { let s = 0; const n = (v.name || "").toLowerCase(); if (/natural|neural|google|microsoft|premium|enhanced|samantha|aria|jenny/.test(n)) s += 5; if (!v.localService) s += 2; return s; };
    return list.slice().sort((a, b) => score(b) - score(a))[0] || null;
  }

  function segment(text) {
    if (Array.isArray(text)) return text.map((s) => String(s).trim()).filter(Boolean);
    return String(text || "").replace(/\s+/g, " ").match(/[^.!?…]+[.!?…]+(?:["')\]]+)?|\S[^.!?…]*$/g) || [];
  }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, +n || 0)); }
  function setMode(m) { mode = m; stateSubs.forEach((cb) => { try { cb(m); } catch (e) {} }); }

  /* ---------------- provider: Polly (default) ---------------- */
  function pollyPlay() {
    if (!current || mode !== "playing") return;
    const segs = current.segs, opts = current.opts, i = current.i;
    if (i >= segs.length) { finish(); return; }
    const voice = pref.pollyVoice || "Matthew";
    let a;
    if (current.next && current.next.i === i && current.next.audio) a = current.next.audio;
    else a = new Audio(POLLY_URL(segs[i], voice));
    audioEl = a;
    try { a.playbackRate = clamp(pref.rate || opts.rate || 1, 0.6, 1.6); } catch (e) {}
    if (opts.onSegment) { try { opts.onSegment(i, segs.length); } catch (e) {} }
    // prefetch next sentence for smooth flow
    if (i + 1 < segs.length) { try { const n = new Audio(); n.preload = "auto"; n.src = POLLY_URL(segs[i + 1], voice); current.next = { i: i + 1, audio: n }; } catch (e) { current.next = null; } }
    else current.next = null;
    a.onended = () => { if (mode === "playing") { current.i++; pollyPlay(); } };
    a.onerror = () => pollyFallback();
    a.play().catch(() => pollyFallback());
  }
  function pollyFallback() {
    // Polly unreachable — finish this job on the browser voice from where we are.
    if (!current) return;
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl = null; }
    if (!WEBSPEECH) { finish(); return; }
    current.provider = "browser";
    startKeepAlive();
    runSpeech();
  }

  /* ---------------- provider: Web Speech (fallback) ---------------- */
  function runSpeech() {
    if (!current || mode !== "playing") return;
    const segs = current.segs, opts = current.opts;
    if (current.i >= segs.length) { finish(); return; }
    const u = new SpeechSynthesisUtterance(segs[current.i]);
    const v = voices.find((x) => x.voiceURI === pref.voiceURI) || bestVoice(opts.lang);
    if (v) { u.voice = v; u.lang = v.lang; } else if (opts.lang) u.lang = opts.lang;
    u.rate = clamp(pref.rate || opts.rate || 1, 0.6, 1.6);
    if (opts.onSegment) { try { opts.onSegment(current.i, segs.length); } catch (e) {} }
    u.onend = () => { if (mode === "playing") { current.i++; runSpeech(); } };
    u.onerror = () => { if (mode === "playing") { current.i++; runSpeech(); } };
    try { synth.speak(u); } catch (e) { current.i++; runSpeech(); }
  }
  function startKeepAlive() { stopKeepAlive(); keepAlive = setInterval(() => { if (mode === "playing" && synth && synth.speaking && !synth.paused) { try { synth.pause(); synth.resume(); } catch (e) {} } }, 9000); }
  function stopKeepAlive() { if (keepAlive) { clearInterval(keepAlive); keepAlive = null; } }

  /* ---------------- provider: pre-rendered audioUrl (ElevenLabs) ---------------- */
  function audioUrlPlay() {
    const segs = current.segs, opts = current.opts;
    audioEl = new Audio(opts.audioUrl);
    try { audioEl.playbackRate = clamp(pref.rate || 1, 0.6, 1.6); } catch (e) {}
    audioEl.ontimeupdate = () => {
      if (!audioEl || !audioEl.duration || !opts.onSegment) return;
      const idx = Math.min(segs.length - 1, Math.floor((audioEl.currentTime / audioEl.duration) * segs.length));
      opts.onSegment(idx, segs.length);
    };
    audioEl.onended = () => finish();
    audioEl.onerror = () => { audioEl = null; current.provider = "polly"; pollyPlay(); }; // fall through to Polly
    audioEl.play().catch(() => {});
  }

  function finish() { const cb = current && current.opts.onEnd; cleanup(); setMode("idle"); if (cb) { try { cb(); } catch (e) {} } }
  function cleanup() {
    stopKeepAlive();
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl.onended = audioEl.onerror = audioEl.ontimeupdate = null; audioEl = null; }
    if (WEBSPEECH) { try { synth.cancel(); } catch (e) {} }
    if (current) current.next = null;
  }

  const api = {
    supported: true, // audio playback is universal; Polly works without Web Speech
    pollyVoices: POLLY_VOICES,
    getPollyVoices() { return POLLY_VOICES.slice(); },
    getVoices() { return refreshVoices(); },
    getPref() { return Object.assign({}, pref); },
    setProvider(p) { pref.provider = (p === "browser" || p === "polly") ? p : "polly"; savePref(); },
    setPollyVoice(v) { pref.pollyVoice = v || "Matthew"; savePref(); },
    setVoice(uri) { pref.voiceURI = uri || ""; savePref(); },
    setRate(r) { pref.rate = clamp(r, 0.6, 1.6); savePref(); },
    state() { return mode; },
    onState(cb) { stateSubs.add(cb); return () => stateSubs.delete(cb); },

    speak(text, opts = {}) {
      this.stop();
      current = { segs: segment(text), i: 0, opts: opts || {}, provider: pref.provider, next: null };
      if (!current.segs.length) return false;
      setMode("playing");
      if (opts.audioUrl) { current.provider = "audio"; audioUrlPlay(); return true; }
      if (pref.provider === "browser" && WEBSPEECH) { current.provider = "browser"; startKeepAlive(); setTimeout(runSpeech, 50); return true; }
      // default: Polly natural voice
      current.provider = "polly";
      pollyPlay();
      return true;
    },
    pause() {
      if (mode !== "playing") return;
      if (audioEl) { try { audioEl.pause(); } catch (e) {} }
      else if (WEBSPEECH) { try { synth.pause(); } catch (e) {} }
      stopKeepAlive();
      setMode("paused");
    },
    resume() {
      if (mode !== "paused") return;
      if (audioEl) { audioEl.play().catch(() => {}); }
      else if (WEBSPEECH) { try { synth.resume(); } catch (e) {} startKeepAlive(); }
      setMode("playing");
    },
    toggle() { if (mode === "playing") this.pause(); else if (mode === "paused") this.resume(); },
    stop() { if (mode === "idle" && !audioEl) { cleanup(); return; } cleanup(); current = null; setMode("idle"); },
  };

  if (window.PROM) PROM.narrator = api; else window.PROM = { narrator: api };
})();
