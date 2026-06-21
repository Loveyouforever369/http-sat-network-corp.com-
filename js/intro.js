/* =============================================================================
   PROMETHEUS · Cinematic Intro Experience
   A narrated, auto-advancing, in-browser "intro film" — cinematic scenes with
   motion + a teleprompter caption, synced to the narration engine (narrator.js).
   No external video tool required; runs fully on a static deploy. Launch via
   PROM.playIntro(). A lesson-style audioUrl slot is supported for a future
   full-length ElevenLabs/voiceover render.
   ============================================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => (window.PROM ? PROM.esc(s) : String(s));

  /* ---- Scene script (a ~7-10 min narrated journey) ---- */
  const SCENES = [
    { accent: "purple", icon: "🔥", kicker: "PROMETHEUS",
      title: "The rules just<br>changed.",
      chips: ["2026", "The AI era"],
      narration: "For all of history, value came from doing the work yourself. That era is ending. When a machine can do the task in seconds, your hands are no longer the bottleneck. The people who win now are the ones who direct the machines." },
    { accent: "electric", icon: "🧭", kicker: "THE SHIFT",
      title: "From doer<br>to <span class='g'>director</span>.",
      chips: ["Orchestrate, don't execute"],
      narration: "A doer earns once, for one task, capped by their own hours. A director designs a system that runs a thousand times while they sleep. This is the single most valuable shift you can make — and it is learnable." },
    { accent: "gold", icon: "🎓", kicker: "WELCOME",
      title: "The AI Mastery<br>Academy.",
      chips: ["8 domains", "47 tracks", "123 lessons"],
      narration: "Welcome to Prometheus — an immersive academy that takes you from curious to commanding across every major AI tool. Eight domains. Forty-seven deep tracks. One hundred and twenty-three narrated lessons. Beginner to advanced, all in one place." },
    { accent: "teal", icon: "💬", kicker: "DOMAIN 01",
      title: "Talk to the<br>frontier models.",
      chips: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
      narration: "Master the assistants running the world: ChatGPT, Claude, Gemini, and Perplexity. Not just what to type — their settings, their memory, their projects, and exactly how to prompt each one to get director-grade output on the first try." },
    { accent: "violet", icon: "🎨", kicker: "DOMAIN 02 · 03",
      title: "Create anything<br>you can describe.",
      chips: ["Images", "Video", "Voice", "Music"],
      narration: "Generate stunning images with Midjourney and Flux. Direct cinematic video with Veo, Kling, and Runway. Clone a voice and narrate in any language with ElevenLabs. Compose full songs with Suno. If you can describe it, you can make it." },
    { accent: "teal", icon: "🤖", kicker: "DOMAIN 04",
      title: "Automate the<br>busywork away.",
      chips: ["n8n", "Make", "Zapier", "Agents + MCP"],
      narration: "Wire your tools together so they think and act on their own. Build workflows in n8n, Make, and Zapier, then graduate to autonomous agents that pursue goals — the engineering backbone of the AI era." },
    { accent: "blue", icon: "💻", kicker: "DOMAIN 05",
      title: "Build software<br>by talking.",
      chips: ["Cursor", "Claude Code", "v0", "Lovable"],
      narration: "This is vibe coding. Describe what you want and watch it get built — with Cursor, Claude Code, v0, and Lovable. You stop writing every line and start directing the system that writes it for you." },
    { accent: "gold", icon: "📈", kicker: "DOMAIN 06",
      title: "Win in business<br>&amp; in life.",
      chips: ["Marketing", "Sales", "Productivity", "Everyday life"],
      narration: "Then turn it into results — a one-person content engine, an outbound machine that fills your pipeline, hours reclaimed every week, and an AI tutor, planner, and coach for everyday life." },
    { accent: "electric", icon: "🔊", kicker: "HOW IT WORKS",
      title: "Press play.<br>Learn hands-free.",
      chips: ["Real narration", "Prompt playbooks", "Graded exercises"],
      narration: "Every lesson narrates itself aloud, with a teleprompter that follows along. Copy battle-tested prompts straight into your tools. Practice in graded exercises. Knowledge that actually sticks." },
    { accent: "purple", icon: "✦", kicker: "THE PROMISE",
      title: "Become the<br><span class='g'>director</span> of AI.",
      chips: ["Leverage, not labor"],
      narration: "Tools will keep changing. The ability to direct them does not. Learn that, and you are not using AI — you are commanding it. That is the leverage that compounds for the rest of your career." },
    { accent: "gold", icon: "🚀", kicker: "BEGIN", end: true,
      title: "Your ascent<br>starts now.",
      chips: [],
      narration: "Your ascent starts now. Step into the Academy, pick a track, and press play. Let's begin." },
  ];

  let state = null; // { i, overlay, sub, playing }

  function ensureOverlay() {
    let ov = $("#intro-overlay");
    if (ov) return ov;
    ov = document.createElement("div");
    ov.id = "intro-overlay";
    ov.innerHTML =
      '<canvas id="intro-canvas"></canvas>' +
      '<div class="intro-stage" id="intro-stage"></div>' +
      '<div class="intro-caption" id="intro-caption"></div>' +
      '<div class="intro-dots" id="intro-dots"></div>' +
      '<div class="intro-controls">' +
        '<button class="intro-btn" id="intro-prev" title="Previous">⏮</button>' +
        '<button class="intro-btn lg" id="intro-play" title="Play / pause">❚❚</button>' +
        '<button class="intro-btn" id="intro-next" title="Next">⏭</button>' +
      '</div>' +
      '<button class="intro-voice-btn" id="intro-voice" title="Choose narrator voice">' + ((window.PROM && PROM.icon) ? PROM.icon("mic", 15) : "") + ' Voice</button>' +
      '<div class="intro-voice-panel" id="intro-voice-panel" style="display:none"></div>' +
      '<button class="intro-skip" id="intro-skip">Skip intro ▶▶</button>' +
      '<button class="intro-close" id="intro-close" title="Close">✕</button>';
    document.body.appendChild(ov);
    $("#intro-prev", ov).addEventListener("click", () => go(state.i - 1));
    $("#intro-next", ov).addEventListener("click", () => go(state.i + 1));
    $("#intro-play", ov).addEventListener("click", togglePlay);
    $("#intro-skip", ov).addEventListener("click", close);
    $("#intro-close", ov).addEventListener("click", close);
    $("#intro-voice", ov).addEventListener("click", toggleVoicePanel);
    document.addEventListener("keydown", onKey);
    return ov;
  }

  function onKey(e) {
    if (!state) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") go(state.i + 1);
    else if (e.key === "ArrowLeft") go(state.i - 1);
    else if (e.key === " ") { e.preventDefault(); togglePlay(); }
  }

  function sentences(t) {
    return String(t || "").replace(/\s+/g, " ").match(/[^.!?…]+[.!?…]+(?:["')\]]+)?|\S[^.!?…]*$/g) || [t];
  }

  function renderDots() {
    const wrap = $("#intro-dots");
    wrap.innerHTML = SCENES.map((s, k) => '<span class="dot' + (k === state.i ? " active" : k < state.i ? " done" : "") + '" data-k="' + k + '"></span>').join("");
    $$(".dot", wrap).forEach((d) => d.addEventListener("click", () => go(+d.dataset.k)));
  }

  function renderScene() {
    const sc = SCENES[state.i];
    const stage = $("#intro-stage");
    const segs = sentences(sc.narration);
    stage.className = "intro-stage accent-" + sc.accent;
    stage.innerHTML =
      '<div class="intro-scene active">' +
        '<div class="intro-orb">' + ((window.PROM && PROM.iconEmoji) ? PROM.iconEmoji(sc.icon, 40) : esc(sc.icon)) + '</div>' +
        '<div class="intro-kicker">' + esc(sc.kicker) + '</div>' +
        '<h1 class="intro-title">' + sc.title + '</h1>' +
        (sc.chips && sc.chips.length ? '<div class="intro-chips">' + sc.chips.map((c) => '<span>' + esc(c) + '</span>').join("") + '</div>' : "") +
        (sc.end ? '<button class="btn btn-gold intro-cta" id="intro-enter">Enter the Academy</button>' : "") +
      '</div>';
    const cap = $("#intro-caption");
    cap.innerHTML = segs.map((s, i) => '<span class="intro-seg" data-seg="' + i + '">' + esc(s) + ' </span>').join("");
    if (sc.end) { const b = $("#intro-enter"); if (b) b.addEventListener("click", () => { close(); if (window.PROM && PROM.go) PROM.go("academy"); }); }
    renderDots();
    state._segs = segs;
  }

  function speakScene() {
    const sc = SCENES[state.i];
    const N = window.PROM && PROM.narrator;
    if (N && N.supported) {
      N.speak(state._segs, {
        lang: "en-US",
        onSegment: (idx) => {
          $$(".intro-seg").forEach((sp, k) => { sp.classList.toggle("active", k === idx); sp.classList.toggle("past", k < idx); });
          const a = $('.intro-seg[data-seg="' + idx + '"]'); if (a) a.scrollIntoView({ block: "nearest", behavior: "smooth" });
        },
        onEnd: () => { if (state && state.playing && !sc.end) advanceTimer(600); },
      });
    } else {
      // No speech: auto-advance on a timed reading pace.
      if (!sc.end) advanceTimer(Math.max(4500, state._segs.join(" ").length * 45));
    }
  }

  function advanceTimer(ms) {
    clearTimeout(state._t);
    state._t = setTimeout(() => { if (state && state.playing) go(state.i + 1); }, ms);
  }

  function go(i) {
    if (!state) return;
    if (i < 0) i = 0;
    if (i >= SCENES.length) { return; } // stay on last; user clicks Enter/close
    clearTimeout(state._t);
    if (window.PROM && PROM.narrator) PROM.narrator.stop();
    state.i = i;
    renderScene();
    if (state.playing) speakScene();
  }

  function togglePlay() {
    if (!state) return;
    state.playing = !state.playing;
    $("#intro-play").textContent = state.playing ? "❚❚" : "▶";
    if (state.playing) speakScene();
    else { if (window.PROM && PROM.narrator) PROM.narrator.pause(); clearTimeout(state._t); }
  }

  /* lightweight starfield/particle canvas for cinematic depth */
  function startCanvas() {
    const c = $("#intro-canvas"); if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = c.getContext("2d");
    let w, h, dpr, stars, raf;
    function size() { dpr = Math.min(devicePixelRatio || 1, 2); w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr; c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px"; }
    function make() { stars = Array.from({ length: Math.min(160, (innerWidth * innerHeight) / 9000 | 0) }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2, r: (Math.random() * 1.6 + 0.4) * dpr })); }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.z * 0.35 * dpr; if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
        ctx.globalAlpha = 0.25 + s.z * 0.6; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fillStyle = "#bcd1ff"; ctx.fill();
      }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(frame);
    }
    size(); make();
    addEventListener("resize", () => { size(); make(); }, { passive: true });
    if (reduce) { frame(); cancelAnimationFrame(raf); } else frame();
    state._canvasStop = () => cancelAnimationFrame(raf);
  }

  function toggleVoicePanel() {
    const panel = $("#intro-voice-panel"); if (!panel) return;
    if (panel.style.display !== "none") { panel.style.display = "none"; return; }
    const N = window.PROM && PROM.narrator; if (!N) return;
    const pf = N.getPref();
    const edge = (N.getEdgeVoices ? N.getEdgeVoices() : []).map((v) => '<option value="edge:' + v.id + '" ' + ((pf.provider === "edge" && pf.edgeVoice === v.id) ? "selected" : "") + '>' + v.label + '</option>').join("");
    const polly = N.getPollyVoices().map((v) => '<option value="polly:' + v.id + '" ' + ((pf.provider === "polly" && pf.pollyVoice === v.id) ? "selected" : "") + '>' + v.label + '</option>').join("");
    panel.innerHTML =
      '<div class="intro-voice-card">' +
        '<div class="ivc-title">Narrator voice</div>' +
        '<select id="iv-sel" class="ac-narr-select">' +
          '<option value="elevenlabs" ' + (pf.provider === "elevenlabs" ? "selected" : "") + '>✨ ElevenLabs (best)</option>' +
          '<optgroup label="Neural voices (recommended)">' + edge + '</optgroup>' +
          '<optgroup label="Standard voices">' + polly + '</optgroup>' +
          '<option value="browser" ' + (pf.provider === "browser" ? "selected" : "") + '>Browser voice</option>' +
        '</select>' +
        '<div id="iv-el" style="display:none;margin-top:8px">' +
          '<input class="txt" id="iv-el-key" placeholder="ElevenLabs API key" autocomplete="off">' +
          '<input class="txt" id="iv-el-voice" placeholder="Voice ID — e.g. 21m00Tcm4TlvDq8ikWAM" autocomplete="off" style="margin-top:8px">' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" id="iv-apply" style="width:100%;justify-content:center;margin-top:10px">Apply &amp; play</button>' +
      '</div>';
    panel.style.display = "block";
    const sel = $("#iv-sel", panel), elBox = $("#iv-el", panel);
    const showEl = () => { elBox.style.display = (sel.value === "elevenlabs" && !N.hasElevenLabs()) ? "block" : "none"; };
    showEl(); sel.addEventListener("change", showEl);
    $("#iv-apply", panel).addEventListener("click", () => {
      const v = sel.value;
      if (v === "elevenlabs") {
        if (!N.hasElevenLabs()) {
          const k = ($("#iv-el-key", panel) || {}).value || "", vid = ($("#iv-el-voice", panel) || {}).value || "";
          if (!k.trim() || !vid.trim()) return;
          N.setElevenLabs(k.trim(), vid.trim());
        } else N.setProvider("elevenlabs");
      } else if (v === "browser") N.setProvider("browser");
      else if (v.indexOf("edge:") === 0) N.setEdgeVoice(v.replace(/^edge:/, ""));
      else { N.setPollyVoice(v.replace(/^polly:/, "")); }
      panel.style.display = "none";
      if (state) { state.playing = true; const pb = $("#intro-play"); if (pb) pb.textContent = "❚❚"; speakScene(); }
    });
  }

  function open() {
    const ov = ensureOverlay();
    state = { i: 0, playing: true };
    ov.classList.add("show");
    document.body.style.overflow = "hidden";
    if (window.PROM && PROM.audio && PROM.audio.setMode) try { PROM.audio.setMode("ambient"); } catch (e) {}
    startCanvas();
    renderScene();
    // small delay so the canvas + DOM settle, and the click gesture enables speech
    setTimeout(speakScene, 250);
  }

  function close() {
    if (!state) return;
    clearTimeout(state._t);
    if (state._canvasStop) state._canvasStop();
    if (window.PROM && PROM.narrator) PROM.narrator.stop();
    const ov = $("#intro-overlay");
    if (ov) ov.classList.remove("show");
    document.body.style.overflow = "";
    state = null;
  }

  if (window.PROM) PROM.playIntro = open; else window.PROM = { playIntro: open };
})();
