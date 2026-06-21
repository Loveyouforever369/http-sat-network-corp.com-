/* =============================================================================
   PROMETHEUS · Narration Engine (multi-provider, natural voices)
   -----------------------------------------------------------------------------
   No more robotic speech. Voices are tried in quality order, each with a
   bullet-proof fallback so narration can never break:

     1. Pre-rendered audio (audioUrl)  — a lesson can supply a studio render.
     2. ElevenLabs (your key)          — the absolute best; paste a key once.
     3. Edge Neural TTS  (DEFAULT)     — Microsoft's online neural voices
        (Andrew, Aria, Emma, …). Key-free, no server: the visitor's browser
        opens a WebSocket, gets natural neural MP3, and plays it with the
        teleprompter synced. Falls back automatically if unreachable.
     4. Amazon Polly                   — key-free standard voices (fallback).
     5. Browser Web Speech             — last-resort only.

   Public API: speak/pause/resume/stop/toggle/state/onState + provider & voice
   controls. Choices persist in localStorage.
   ============================================================================= */
(function () {
  const synth = window.speechSynthesis || null;
  const WEBSPEECH = !!synth && typeof window.SpeechSynthesisUtterance === "function";
  const CRYPTO_OK = !!(window.crypto && window.crypto.subtle && window.TextEncoder);
  const WS_OK = typeof window.WebSocket === "function";

  const PREF_KEY = "prometheus.narrator.v3";
  let pref = loadPref();

  /* ---- Edge neural voices (key-free, natural) ---- */
  const EDGE_VOICES = [
    { id: "en-US-AndrewNeural", label: "Andrew · warm US male" },
    { id: "en-US-BrianNeural", label: "Brian · easy US male" },
    { id: "en-US-GuyNeural", label: "Guy · US male" },
    { id: "en-US-AriaNeural", label: "Aria · US female" },
    { id: "en-US-EmmaNeural", label: "Emma · US female" },
    { id: "en-US-JennyNeural", label: "Jenny · US female" },
    { id: "en-GB-RyanNeural", label: "Ryan · UK male" },
    { id: "en-GB-SoniaNeural", label: "Sonia · UK female" },
    { id: "en-AU-NatashaNeural", label: "Natasha · AU female" },
  ];
  const EDGE_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  const EDGE_WS = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";

  /* ---- Polly voices (key-free via StreamElements, used as fallback) ---- */
  const POLLY_VOICES = [
    { id: "Matthew", label: "Matthew · US male" },
    { id: "Joanna", label: "Joanna · US female" },
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
  let current = null;            // active job
  let mode = "idle";             // idle | playing | paused
  let audioEl = null;            // active <audio>
  let keepAlive = null;
  const stateSubs = new Set();

  const DEFAULTS = { provider: "edge", edgeVoice: "en-US-AndrewNeural", pollyVoice: "Matthew", voiceURI: "", rate: 1, elKey: "", elVoice: "", elModel: "eleven_multilingual_v2" };
  function loadPref() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(PREF_KEY)) || {}; } catch (e) {}
    // one-time migration: carry an ElevenLabs key from the older v2 store
    if (!saved || !Object.keys(saved).length) {
      try { const v2 = JSON.parse(localStorage.getItem("prometheus.narrator.v2")) || {}; if (v2.elKey) { saved.elKey = v2.elKey; saved.elVoice = v2.elVoice; saved.elModel = v2.elModel; } } catch (e) {}
    }
    return Object.assign({}, DEFAULTS, saved);
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

  /* ---------------- provider: Edge Neural TTS (default, key-free) ---------------- */
  function edgeSecToken() {
    let ticks = BigInt(Math.floor(Date.now() / 1000)) + 11644473600n; // unix -> windows epoch (s)
    ticks -= ticks % 300n;            // round down to 5 minutes
    ticks *= 10000000n;               // seconds -> 100ns intervals
    const bytes = new TextEncoder().encode(ticks.toString() + EDGE_TOKEN);
    return crypto.subtle.digest("SHA-256", bytes).then((buf) =>
      [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase());
  }
  function edgeUuid() { return (Math.random().toString(16) + Math.random().toString(16) + Math.random().toString(16)).replace(/[^a-f0-9]/g, "").slice(0, 32).padEnd(32, "0"); }
  function edgeSsml(text, voice) {
    const safe = String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    return "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>" +
      "<voice name='" + voice + "'><prosody rate='-2%' pitch='0%'>" + safe + "</prosody></voice></speak>";
  }
  function edgePlay() {
    if (!current || mode !== "playing") return;
    if (!CRYPTO_OK || !WS_OK) { edgeFail(); return; }
    const segs = current.segs, opts = current.opts;
    const voice = pref.edgeVoice || "en-US-AndrewNeural";
    const text = segs.join(" ");
    const job = current; // capture
    let ws = null, chunks = [], finished = false;
    const stop = () => { if (job._idle) { clearTimeout(job._idle); job._idle = null; } try { if (ws) ws.close(); } catch (e) {} };
    const bail = () => { if (finished) return; finished = true; stop(); edgeFail(); };
    const arm = () => { if (job._idle) clearTimeout(job._idle); job._idle = setTimeout(() => { if (!finished) bail(); }, 7000); };
    job._edgeStop = stop;
    arm();
    edgeSecToken().then((tok) => {
      if (job !== current || mode === "idle" || finished) { stop(); return; }
      ws = new WebSocket(EDGE_WS + "?TrustedClientToken=" + EDGE_TOKEN + "&Sec-MS-GEC=" + tok + "&Sec-MS-GEC-Version=1-130.0.2849.68");
      ws.binaryType = "arraybuffer";
      job._ws = ws;
      ws.onopen = () => {
        arm();
        ws.send("X-Timestamp:" + new Date().toString() + "\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n" +
          '{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}');
        ws.send("X-RequestId:" + edgeUuid() + "\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:" + new Date().toString() + "\r\nPath:ssml\r\n\r\n" + edgeSsml(text, voice));
      };
      ws.onmessage = (ev) => {
        arm();
        if (typeof ev.data === "string") {
          if (ev.data.indexOf("Path:turn.end") !== -1) { finished = true; stop(); edgeFinish(job, chunks); }
          return;
        }
        try {
          const buf = ev.data, dv = new DataView(buf), hLen = dv.getUint16(0);
          const header = new TextDecoder("utf-8").decode(new Uint8Array(buf, 2, hLen));
          if (header.indexOf("Path:audio") !== -1 && buf.byteLength > 2 + hLen) chunks.push(new Uint8Array(buf, 2 + hLen));
        } catch (e) {}
      };
      ws.onerror = () => bail();
      ws.onclose = () => { if (!finished) bail(); };
    }).catch(() => bail());
  }
  function edgeFinish(job, chunks) {
    if (job !== current || mode !== "playing") return;
    if (!chunks.length) { edgeFail(); return; }
    const segs = current.segs, opts = current.opts;
    const url = URL.createObjectURL(new Blob(chunks, { type: "audio/mpeg" }));
    audioEl = new Audio(url);
    try { audioEl.playbackRate = clamp(pref.rate || 1, 0.6, 1.6); } catch (e) {}
    audioEl.ontimeupdate = () => { if (audioEl && audioEl.duration && opts.onSegment) { const idx = Math.min(segs.length - 1, Math.floor((audioEl.currentTime / audioEl.duration) * segs.length)); opts.onSegment(idx, segs.length); } };
    audioEl.onended = () => { URL.revokeObjectURL(url); finish(); };
    audioEl.onerror = () => { URL.revokeObjectURL(url); edgeFail(); };
    audioEl.play().catch(() => edgeFail());
  }
  function edgeFail() {
    if (!current) return;
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl = null; }
    current.provider = "polly";
    pollyPlay();
  }

  /* ---------------- provider: Polly (fallback) ---------------- */
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
    if (i + 1 < segs.length) { try { const n = new Audio(); n.preload = "auto"; n.src = POLLY_URL(segs[i + 1], voice); current.next = { i: i + 1, audio: n }; } catch (e) { current.next = null; } }
    else current.next = null;
    a.onended = () => { if (mode === "playing") { current.i++; pollyPlay(); } };
    a.onerror = () => pollyFallback();
    a.play().catch(() => pollyFallback());
  }
  function pollyFallback() {
    if (!current) return;
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl = null; }
    if (!WEBSPEECH) { finish(); return; }
    current.provider = "browser";
    startKeepAlive();
    runSpeech();
  }

  /* ---------------- provider: Web Speech (last resort) ---------------- */
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

  /* ---------------- provider: pre-rendered audioUrl ---------------- */
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
    audioEl.onerror = () => { audioEl = null; current.provider = "edge"; edgePlay(); };
    audioEl.play().catch(() => {});
  }

  /* ---------------- provider: ElevenLabs (client-side, your key) ---------------- */
  function elevenFetch(text, el) {
    return fetch("https://api.elevenlabs.io/v1/text-to-speech/" + encodeURIComponent(el.voice) + "?output_format=mp3_44100_128", {
      method: "POST",
      headers: { "xi-api-key": el.key, "Content-Type": "application/json", "Accept": "audio/mpeg" },
      body: JSON.stringify({ text: text, model_id: el.model || "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.12, use_speaker_boost: true } }),
    }).then((r) => { if (!r.ok) throw new Error("elevenlabs " + r.status); return r.blob(); });
  }
  function elevenPlay() {
    const segs = current.segs, opts = current.opts, el = current._el;
    elevenFetch(segs.join(" "), el).then((blob) => {
      if (!current || mode !== "playing") return;
      const url = URL.createObjectURL(blob);
      audioEl = new Audio(url);
      try { audioEl.playbackRate = clamp(pref.rate || 1, 0.6, 1.6); } catch (e) {}
      audioEl.ontimeupdate = () => { if (audioEl && audioEl.duration && opts.onSegment) { const idx = Math.min(segs.length - 1, Math.floor((audioEl.currentTime / audioEl.duration) * segs.length)); opts.onSegment(idx, segs.length); } };
      audioEl.onended = () => { URL.revokeObjectURL(url); finish(); };
      audioEl.onerror = () => { URL.revokeObjectURL(url); elevenFail(); };
      audioEl.play().catch(() => elevenFail());
    }).catch(() => elevenFail());
  }
  function elevenFail() { if (!current) return; if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl = null; } current.provider = "edge"; edgePlay(); }

  function finish() { const cb = current && current.opts.onEnd; cleanup(); setMode("idle"); if (cb) { try { cb(); } catch (e) {} } }
  function cleanup() {
    stopKeepAlive();
    if (current && current._edgeStop) { try { current._edgeStop(); } catch (e) {} }
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl.onended = audioEl.onerror = audioEl.ontimeupdate = null; audioEl = null; }
    if (WEBSPEECH) { try { synth.cancel(); } catch (e) {} }
    if (current) current.next = null;
  }

  const api = {
    supported: true,
    pollyVoices: POLLY_VOICES,
    edgeVoices: EDGE_VOICES,
    getEdgeVoices() { return EDGE_VOICES.slice(); },
    getPollyVoices() { return POLLY_VOICES.slice(); },
    getVoices() { return refreshVoices(); },
    getPref() { return Object.assign({}, pref); },
    setProvider(p) { pref.provider = (p === "browser" || p === "polly" || p === "edge" || p === "elevenlabs") ? p : "edge"; savePref(); },
    setEdgeVoice(v) { pref.edgeVoice = v || "en-US-AndrewNeural"; if (pref.provider !== "edge") pref.provider = "edge"; savePref(); },
    setPollyVoice(v) { pref.pollyVoice = v || "Matthew"; if (pref.provider !== "polly") pref.provider = "polly"; savePref(); },
    setElevenLabs(key, voice, model) { pref.elKey = (key || "").trim(); pref.elVoice = (voice || "").trim(); if (model) pref.elModel = model; pref.provider = "elevenlabs"; savePref(); },
    hasElevenLabs() { const cfg = (window.CONFIG && CONFIG.elevenlabs) || {}; return !!((pref.elKey || cfg.apiKey) && (pref.elVoice || cfg.voiceId)); },
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
      const cfg = (window.CONFIG && CONFIG.elevenlabs) || {};
      const elKey = pref.elKey || cfg.apiKey, elVoice = pref.elVoice || cfg.voiceId;
      if (pref.provider === "elevenlabs" && elKey && elVoice) { current.provider = "elevenlabs"; current._el = { key: elKey, voice: elVoice, model: pref.elModel || cfg.modelId || "eleven_multilingual_v2" }; elevenPlay(); return true; }
      if (pref.provider === "polly") { current.provider = "polly"; pollyPlay(); return true; }
      if (pref.provider === "browser" && WEBSPEECH) { current.provider = "browser"; startKeepAlive(); setTimeout(runSpeech, 50); return true; }
      // default: Edge neural voice (falls back to Polly, then browser)
      current.provider = "edge";
      edgePlay();
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
    stop() { if (mode === "idle" && !audioEl && !current) { cleanup(); return; } cleanup(); current = null; setMode("idle"); },
  };

  if (window.PROM) PROM.narrator = api; else window.PROM = { narrator: api };
})();
