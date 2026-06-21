/* =============================================================================
   PROMETHEUS · Core Application
   Router, progress engine, holographic skill tree, avatar lesson viewer, and
   the mounting points for the per-module Trainings (trainings.js) and Games
   (games.js). Pure vanilla JS, zero build step, Vercel-static friendly.
   ============================================================================= */

/* -----------------------------------------------------------------------------
   CONFIG — the single place to wire live integrations. Everything runs in a
   self-contained DEMO mode until you fill these in. See /README.md
   and /api-reference/ for the matching serverless routes.
----------------------------------------------------------------------------- */
const CONFIG = {
  // AI Prompt Sandbox. Point this at your deployed serverless route (which holds
  // your Anthropic/OpenAI keys server-side — never put model keys in the browser).
  sandbox: {
    endpoint: "", // e.g. "/api/sandbox"  (see api-reference/sandbox.ts)
    model: "claude (via your backend)",
  },
  // HeyGen avatar video. Map a moduleId -> a hosted lesson video URL, or wire
  // api-reference/heygen.ts to generate on demand.
  heygen: {
    endpoint: "", // e.g. "/api/heygen"
    videos: {},   // e.g. { m1: "https://.../lesson1.mp4" }
  },
  // Stripe — the static-friendly path is Payment Links (no backend needed).
  stripe: {
    paymentLinks: {}, // e.g. { operator: "https://buy.stripe.com/...", architect: "https://buy.stripe.com/..." }
  },
  // ElevenLabs Multilingual v2 narration (per-character voices). Wire a backend
  // route that streams TTS; map characters → voice ids.
  elevenlabs: {
    endpoint: "",            // e.g. "/api/narrate"
    voices: {},              // e.g. { architect: "voiceIdA", catalyst: "voiceIdB", byte: "voiceIdC" }
  },
  // Cinematic B-roll behind the avatar (InVideo AI / Sora 2 / Veo 3.1 renders).
  // Map a moduleId → a hosted MP4 URL and the lesson stage plays it as backdrop.
  broll: {},                 // e.g. { m1: "https://.../m1-broll.mp4" }
  // AI dubbing — translate narration & subtitles. 175+ langs when wired to a
  // dubbing API (e.g. ElevenLabs Dubbing / HeyGen). UI selector sets this.
  dubbing: { lang: "en", endpoint: "" },
  // Asset pipeline (reference only): Crreo AI for stylized deep-dive transitions
  // (Cyberpunk/Anime/Watercolor), Magnific for studio-quality upscaling.
  assets: { crreo: "", magnific: "" },
};
window.CONFIG = CONFIG;

/* -----------------------------------------------------------------------------
   Tiny DOM helpers
----------------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* -----------------------------------------------------------------------------
   Progress engine — persisted in localStorage. The shape mirrors schema.sql
   (user_progress + quiz_scores) so it ports cleanly to Supabase later.
----------------------------------------------------------------------------- */
const STORE_KEY = "prometheus.progress.v1";

const PROM = {
  data: window.PROMETHEUS_DATA,
  state: load(),

  /* split a module's XP across its 3 activities */
  xpFor(module, activity) {
    if (activity === "lesson") return Math.round(module.xp * 0.34);
    if (activity === "training") return Math.round(module.xp * 0.33);
    if (activity === "bonus") return (module.bonusGame && module.bonusGame.xp) || 120;
    return module.xp - Math.round(module.xp * 0.34) - Math.round(module.xp * 0.33); // game = remainder
  },

  isDone(moduleId, activity) {
    return !!this.state.done[`${moduleId}:${activity}`];
  },
  moduleMastered(m) {
    return ["lesson", "training", "game"].every((a) => this.isDone(m.id, a));
  },
  moduleUnlocked(index) {
    if (index === 0) return true;
    const prev = this.data.modules[index - 1];
    return this.isDone(prev.id, "lesson"); // finishing the lesson opens the next module
  },
  totalXP() {
    return Object.entries(this.state.done).reduce((sum, [key, v]) => {
      if (!v) return sum;
      const [mid, act] = key.split(":");
      const m = this.data.modules.find((x) => x.id === mid);
      return m ? sum + this.xpFor(m, act) : sum;
    }, 0);
  },
  coreDoneCount() {
    return Object.entries(this.state.done).filter(([k, v]) => v && /:(lesson|training|game)$/.test(k)).length;
  },
  maxXP() {
    return this.data.totalXP + this.data.modules.reduce((s, m) => s + (m.bonusGame ? this.xpFor(m, "bonus") : 0), 0);
  },
  masteryPct() {
    return Math.round((this.coreDoneCount() / this.data.totalActivities) * 100);
  },

  complete(moduleId, activity, extra) {
    const key = `${moduleId}:${activity}`;
    const first = !this.state.done[key];
    this.state.done[key] = true;
    if (extra && typeof extra.score === "number") this.state.scores[key] = extra.score;
    save(this.state);
    const m = this.data.modules.find((x) => x.id === moduleId);
    if (first && m) toast(`+${this.xpFor(m, activity)} XP · ${activity[0].toUpperCase() + activity.slice(1)} complete`, "xp", "✦");
    updateXPBadge();
  },

  /* Registries populated by sandbox.js / trainings.js / games.js */
  trainings: {},
  games: {},

  /* Interval/timeout tracking so games clean up on tab switch */
  _timers: [],
  addTimer(id) { this._timers.push(id); return id; },
  clearTimers() { this._timers.forEach((id) => { clearInterval(id); clearTimeout(id); }); this._timers = []; },
};
window.PROM = PROM;

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.done) return { done: s.done, scores: s.scores || {} };
  } catch (e) {}
  return { done: {}, scores: {} };
}
function save(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* -----------------------------------------------------------------------------
   Toast + Modal
----------------------------------------------------------------------------- */
let toastTimer;
function toast(msg, kind = "", icon = "✓") {
  let t = $("#toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
  t.className = "toast " + kind;
  t.innerHTML = `<span class="toast-ic">${icon}</span><span>${esc(msg)}</span>`;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}
function modal(html) {
  let b = $("#modal-backdrop");
  if (!b) {
    b = document.createElement("div"); b.id = "modal-backdrop"; b.className = "modal-backdrop";
    document.body.appendChild(b);
    b.addEventListener("click", (e) => { if (e.target === b) closeModal(); });
  }
  b.innerHTML = `<div class="panel modal" style="position:relative">
    <button class="modal-close" aria-label="Close">×</button>${html}</div>`;
  b.classList.add("show");
  $(".modal-close", b).addEventListener("click", closeModal);
}
function closeModal() { const b = $("#modal-backdrop"); if (b) b.classList.remove("show"); }
window.PROM.toast = toast; window.PROM.modal = modal; window.PROM.closeModal = closeModal; window.PROM.esc = esc;

/* -----------------------------------------------------------------------------
   Dynamic Learning Paths — on a fail, the relevant Character addresses the
   learner by name and offers a refresher. (HeyGen renders a real personalized
   avatar video here when CONFIG.heygen is wired.)
----------------------------------------------------------------------------- */
try { PROM.userName = localStorage.getItem("prometheus.name") || ""; } catch (e) { PROM.userName = ""; }

function askName(then) {
  modal(`<h3>Before we continue…</h3>
    <p>I'll keep you moving and tailor tips to you. What should I call you?</p>
    <input class="txt" id="iv-name" placeholder="Your first name" maxlength="24" autocomplete="given-name" />
    <div class="sb-actions" style="margin-top:14px"><button class="btn btn-primary" id="iv-name-go" style="justify-content:center;flex:1">Continue</button></div>`);
  const submit = () => {
    const v = ($("#iv-name") || {}).value ? $("#iv-name").value.trim() : "";
    if (v) { PROM.userName = v; try { localStorage.setItem("prometheus.name", v); } catch (e) {} }
    closeModal(); then();
  };
  const b = $("#iv-name-go"); if (b) b.addEventListener("click", submit);
  const inp = $("#iv-name"); if (inp) { inp.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); }); setTimeout(() => inp.focus(), 50); }
}

function interventionTips(m) {
  const t = m && m.training;
  const lines = (t && t.tips) ? t.tips.slice(0, 3)
    : (m && m.bonusGame && m.bonusGame.tips) ? m.bonusGame.tips.slice(0, 3)
    : (t && t.note) ? [t.note]
    : ["Re-watch the lesson, then tackle the activity one step at a time."];
  return lines.map((x) => "• " + esc(x)).join("<br>");
}

function showIntervention(m, ch, topic) {
  const name = PROM.userName || "there";
  modal(`<div class="intervention">
    <div class="iv-avatar ${ch.backdrop}"><span class="iv-portrait">${esc(ch.portrait)}</span><span class="iv-live">● ${esc(ch.name.toUpperCase())}</span></div>
    <h3 style="margin-top:16px">Hey ${esc(name)} — let's nail this 💪</h3>
    <p>${esc(ch.name)} here. I noticed <strong>${esc(topic || (m && m.title) || "this one")}</strong> tripped you up. Here's the 30-second fix, then jump right back in.</p>
    <div class="sb-response"><span class="resp-label">${esc(ch.name)} · refresher</span>${interventionTips(m)}</div>
    <div class="sb-actions" style="margin-top:14px">
      <button class="btn btn-ghost" id="iv-dismiss" style="flex:1;justify-content:center">Got it — retry</button>
      ${m ? `<button class="btn btn-primary" id="iv-refresh" style="flex:1;justify-content:center">↺ Replay lesson</button>` : ""}
    </div>
    <p class="dim" style="font-size:.74rem;margin-top:12px">▶ A custom ${esc(ch.name)} avatar video renders here once HeyGen is connected — addressing you by name (Dynamic Learning Paths).</p>
  </div>`);
  const d = $("#iv-dismiss"); if (d) d.addEventListener("click", closeModal);
  if (m) { const r = $("#iv-refresh"); if (r) r.addEventListener("click", () => { closeModal(); go("module", m.id); }); }
}

function maybeIntervene(moduleId, topic) {
  const m = PROM.data.modules.find((x) => x.id === moduleId) || null;
  const charKey = (m && m.lesson && m.lesson.character) || "catalyst";
  const ch = PROM.data.characters[charKey] || PROM.data.characters.catalyst;
  const run = () => showIntervention(m, ch, topic);
  if (!PROM.userName) askName(run); else run();
}
PROM.maybeIntervene = maybeIntervene;

/* -----------------------------------------------------------------------------
   Router
----------------------------------------------------------------------------- */
const ROUTES = ["home", "dashboard", "pricing", "about", "arcade", "academy"];
function go(view, param, activity) {
  if (window.PROM && PROM.narrator) PROM.narrator.stop(); // never let narration bleed across views
  if (view === "module") renderModule(param, activity);
  if (view === "academy" && PROM.openAcademy) PROM.openAcademy();
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${view}`));
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.go === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (ROUTES.includes(view)) location.hash = view;
  if (view === "dashboard") renderDashboard();
  if (view === "pricing") renderPricing();
  if (view === "arcade") renderArcade();
  if (PROM.audio && view !== "module") PROM.audio.setMode("ambient");
}
window.PROM.go = go;

/* -----------------------------------------------------------------------------
   SVG progress ring
----------------------------------------------------------------------------- */
function ring(pct, size = 92, stroke = 8, color = "url(#ringGrad)") {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return `<svg width="${size}" height="${size}">
    <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/><stop offset="60%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#f5c518"/>
    </linearGradient></defs>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="${stroke}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
  </svg>`;
}

/* -----------------------------------------------------------------------------
   Dashboard — the holographic skill tree
----------------------------------------------------------------------------- */
function renderDashboard() {
  const root = $("#view-dashboard");
  const pct = PROM.masteryPct();
  const xp = PROM.totalXP();

  const nodes = PROM.data.modules.map((m, i) => {
    const unlocked = PROM.moduleUnlocked(i);
    const mastered = PROM.moduleMastered(m);
    const acts = [
      { k: "lesson", label: "Lesson", ic: "▶" },
      { k: "training", label: "Training", ic: "✎" },
      { k: "game", label: "Game", ic: "✦" },
    ];
    const chips = acts.map((a) => {
      const done = PROM.isDone(m.id, a.k);
      return `<span class="chip ${done ? "done" : ""}"><span class="ic">${done ? "✓" : a.ic}</span>${a.label}</span>`;
    }).join("");
    const state = mastered ? "mastered" : unlocked ? "unlocked" : "locked";
    return `<div class="tree-node ${state}" data-mod="${m.id}" data-unlocked="${unlocked}">
      <div class="node-orb ${m.color}" data-open="${m.id}" role="button" tabindex="0" aria-label="${esc(m.title)}">
        ${unlocked ? `<span>${m.icon}</span>` : `<span class="lock">🔒</span>`}
      </div>
      <div class="node-card" data-open="${m.id}">
        <div class="nc-top">
          <span class="mod-code">MODULE ${m.code}</span>
          <span class="mod-sub">· ${esc(m.subtitle)}</span>
          ${mastered ? `<span class="badge-mastered">★ Mastered</span>` : ""}
        </div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.summary)}</p>
        <div class="node-progress">${chips}</div>
      </div>
    </div>`;
  }).join("");

  root.innerHTML = `
    <div class="section-eyebrow">// Your Ascent</div>
    <h2 class="section-title">The <span class="gradient-text">Skill Tree</span></h2>
    <p class="section-sub">Unlock each node as you progress from beginner to AI director. Complete a module's lesson to open the next.</p>

    <div class="tree-header panel" style="padding:22px 26px">
      <div class="mastery-ring">
        <div class="ring-wrap">${ring(pct)}<div class="ring-label">${pct}%</div></div>
        <div class="ring-meta">
          <div class="t">Total Mastery</div>
          <div class="v">${PROM.coreDoneCount()} / ${PROM.data.totalActivities} <span class="dim" style="font-size:.8rem">activities</span></div>
        </div>
      </div>
      <div class="mastery-ring">
        <div class="ring-meta center">
          <div class="t">Experience</div>
          <div class="v" style="color:var(--gold)">${xp.toLocaleString()} <span class="dim" style="font-size:.8rem">/ ${PROM.maxXP().toLocaleString()} XP</span></div>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" id="reset-progress">↺ Reset progress</button>
    </div>

    <div class="skilltree">${nodes}</div>`;

  $$("[data-open]", root).forEach((elm) => {
    elm.addEventListener("click", () => {
      const node = elm.closest(".tree-node");
      if (node && node.dataset.unlocked === "true") go("module", elm.dataset.open);
      else toast("Complete the previous module's lesson to unlock this.", "", "🔒");
    });
    elm.addEventListener("keydown", (e) => { if (e.key === "Enter") elm.click(); });
  });
  $("#reset-progress").addEventListener("click", () => {
    modal(`<h3>Reset all progress?</h3><p>This clears your XP, completed activities and game scores on this device. This can't be undone.</p>
      <div class="sb-actions"><button class="btn btn-ghost" onclick="PROM.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="confirm-reset">Reset everything</button></div>`);
    $("#confirm-reset").addEventListener("click", () => {
      PROM.state = { done: {}, scores: {} }; save(PROM.state); closeModal(); renderDashboard(); updateXPBadge(); toast("Progress reset.", "", "↺");
    });
  });
}

/* -----------------------------------------------------------------------------
   Module view — Lesson / Training / Game tabs
----------------------------------------------------------------------------- */
let CURRENT = { moduleId: null, activity: "lesson" };

function renderModule(moduleId, activity) {
  const m = PROM.data.modules.find((x) => x.id === moduleId);
  if (!m) return go("dashboard");
  CURRENT = { moduleId, activity: activity || "lesson" };
  const root = $("#view-module");

  const tab = (k, ic, label) => {
    const done = PROM.isDone(m.id, k);
    return `<button class="atab ${CURRENT.activity === k ? "active" : ""} ${done ? "done" : ""}" data-act="${k}">
      <span class="atab-ic">${ic}</span>${label}</button>`;
  };

  root.innerHTML = `
    <a class="back-link" id="back-tree">← Back to skill tree</a>
    <div class="flex-between">
      <div>
        <div class="section-eyebrow">// Module ${m.code} · ${esc(m.subtitle)}</div>
        <h2 class="section-title">${esc(m.title)}</h2>
      </div>
      <div class="node-orb ${m.color}" style="cursor:default">${m.icon}</div>
    </div>
    <p class="section-sub" style="margin-top:10px">${esc(m.summary)}</p>
    <div class="activity-tabs">
      ${tab("lesson", "▶", "Lesson")}
      ${tab("training", "✎", "Training")}
      ${tab("game", "✦", "Game")}
      ${m.bonusGame ? tab("bonus", "◎", "Bonus") : ""}
    </div>
    <div id="activity-mount"></div>`;

  $("#back-tree").addEventListener("click", () => go("dashboard"));
  $$(".atab", root).forEach((b) => b.addEventListener("click", () => {
    CURRENT.activity = b.dataset.act;
    $$(".atab", root).forEach((x) => x.classList.toggle("active", x === b));
    mountActivity(m);
  }));
  mountActivity(m);
}

function mountActivity(m) {
  // Replace the mount with a fresh clone so any delegated listeners from the
  // previous activity are discarded (prevents handler leaks across tab switches).
  let mount = $("#activity-mount");
  const fresh = mount.cloneNode(false);
  mount.replaceWith(fresh);
  mount = fresh;
  stopLessonPlayback();
  PROM.clearTimers();
  if (PROM.audio) PROM.audio.setMode(CURRENT.activity === "game" || CURRENT.activity === "bonus" ? "intense" : "ambient");
  const onComplete = (activity, extra) => {
    PROM.complete(m.id, activity, extra);
    // refresh tab "done" state
    const tabBtn = $(`.atab[data-act="${activity}"]`);
    if (tabBtn) tabBtn.classList.add("done");
  };

  if (CURRENT.activity === "lesson") return renderLesson(mount, m, () => onComplete("lesson"));
  if (CURRENT.activity === "training") {
    const fn = PROM.trainings && PROM.trainings[m.training.type];
    if (fn) return fn(mount, m, (extra) => onComplete("training", extra));
    mount.innerHTML = `<div class="panel game-shell">Training module coming online…</div>`;
    return;
  }
  if (CURRENT.activity === "game") {
    const fn = PROM.games && PROM.games[m.game.type];
    if (fn) return fn(mount, m, (extra) => onComplete("game", extra));
    mount.innerHTML = `<div class="panel game-shell">Game module coming online…</div>`;
    return;
  }
  if (CURRENT.activity === "bonus" && m.bonusGame) {
    const fn = PROM.games && PROM.games[m.bonusGame.type];
    const synth = Object.assign({}, m, { game: m.bonusGame, gameXP: PROM.xpFor(m, "bonus") });
    if (fn) return fn(mount, synth, (extra) => onComplete("bonus", extra));
    mount.innerHTML = `<div class="panel game-shell">Bonus game coming online…</div>`;
  }
}

/* -----------------------------------------------------------------------------
   Lesson viewer — avatar instructor + synced subtitles + content
----------------------------------------------------------------------------- */
let lessonState = null;
function stopLessonPlayback() { if (lessonState && lessonState.raf) cancelAnimationFrame(lessonState.raf); lessonState = null; }

function renderLesson(mount, m, onComplete) {
  const L = m.lesson;
  const heygenUrl = CONFIG.heygen.videos[m.id];
  const ch = (L.character && PROM.data.characters[L.character]) || null;
  const broll = CONFIG.broll[m.id];
  const stageClass = ch ? ch.backdrop : "";
  const totalT = L.transcript[L.transcript.length - 1].t + 6;

  const sections = L.sections.map((s) => `
    <div class="lesson-section"><h4>${esc(s.heading)}</h4><p>${esc(s.body)}</p></div>`).join("");

  mount.innerHTML = `
  <div class="split">
    <div class="panel avatar-player">
      <div class="avatar-stage ${stageClass}">
        ${broll ? `<video class="broll" src="${esc(broll)}" autoplay muted loop playsinline></video>` : ""}
        ${heygenUrl
          ? `<video id="heygen-video" src="${esc(heygenUrl)}" playsinline></video>`
          : `<div class="avatar-orb" id="avatar-orb">${esc(ch ? ch.portrait : L.avatar.portrait)}</div>`}
        <span class="live-tag">● ${ch ? esc(ch.name.toUpperCase()) : "AVATAR INSTRUCTOR"}</span>
        <span class="heygen-tag">${heygenUrl ? "HeyGen · live" : broll ? "B-roll · live" : "HeyGen-ready"}</span>
      </div>
      <div class="subtitles" id="subtitles"><span class="sub-idle">Press play to begin the lesson…</span></div>
      <div class="player-bar">
        <button class="play-btn" id="play-btn" aria-label="Play">▶</button>
        <div class="progress-track" id="seek"><div class="progress-fill" id="seek-fill"></div></div>
        <div class="player-time" id="time">0:00 / ${fmt(totalT)}</div>
      </div>
      <div class="avatar-meta">
        <div class="am-orb">${esc(ch ? ch.portrait : L.avatar.portrait)}</div>
        <div>
          <div class="am-name">${ch ? esc(ch.name) : esc(L.avatar.name)}${ch ? ` <span class="dim" style="font-weight:500">· ${esc(ch.discipline)}</span>` : ""}</div>
          <div class="am-role">🎙 ${ch ? esc(ch.voice) : esc(L.avatar.voice)} · ElevenLabs Multilingual v2</div>
        </div>
      </div>
    </div>

    <div class="panel lesson-content">
      <div class="tag-row"><span class="chip">${esc(L.level)}</span><span class="chip">${esc(L.duration)}</span></div>
      <h3>${esc(L.title)}</h3>
      ${sections}
      <button class="btn btn-primary mt-3" id="finish-lesson" style="width:100%;justify-content:center">Mark lesson complete · +${PROM.xpFor(m, "lesson")} XP</button>
    </div>
  </div>`;

  // playback simulation drives subtitle highlighting (and the real <video> if present)
  const video = $("#heygen-video", mount);
  const orb = $("#avatar-orb", mount);
  const subEl = $("#subtitles", mount);
  const fill = $("#seek-fill", mount);
  const timeEl = $("#time", mount);
  const playBtn = $("#play-btn", mount);

  lessonState = { playing: false, t: 0, raf: null, last: 0, done: false };

  function showSub(t) {
    let cur = L.transcript[0];
    for (const line of L.transcript) if (t >= line.t) cur = line;
    subEl.innerHTML = t <= 0
      ? `<span class="sub-idle">Press play to begin the lesson…</span>`
      : `<span class="sub-active">${esc(cur.text)}</span>`;
  }
  function tick(now) {
    if (!lessonState.playing) return;
    const dt = (now - lessonState.last) / 1000; lessonState.last = now;
    lessonState.t += dt;
    if (lessonState.t >= totalT) { lessonState.t = totalT; pause(); if (!lessonState.done) { lessonState.done = true; onComplete(); toast("Lesson complete!", "xp", "✦"); } }
    fill.style.width = (lessonState.t / totalT) * 100 + "%";
    timeEl.textContent = `${fmt(lessonState.t)} / ${fmt(totalT)}`;
    showSub(lessonState.t);
    lessonState.raf = requestAnimationFrame(tick);
  }
  function play() {
    lessonState.playing = true; lessonState.last = performance.now();
    playBtn.textContent = "❚❚"; if (orb) orb.classList.add("speaking");
    if (video) video.play().catch(() => {});
    lessonState.raf = requestAnimationFrame(tick);
  }
  function pause() {
    lessonState.playing = false; playBtn.textContent = "▶"; if (orb) orb.classList.remove("speaking");
    if (video) video.pause(); if (lessonState.raf) cancelAnimationFrame(lessonState.raf);
  }
  playBtn.addEventListener("click", () => (lessonState.playing ? pause() : play()));
  $("#seek", mount).addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    lessonState.t = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * totalT;
    fill.style.width = (lessonState.t / totalT) * 100 + "%"; timeEl.textContent = `${fmt(lessonState.t)} / ${fmt(totalT)}`; showSub(lessonState.t);
    if (video) video.currentTime = lessonState.t;
  });
  $("#finish-lesson", mount).addEventListener("click", () => {
    lessonState.done = true; onComplete(); toast("Lesson complete!", "xp", "✦");
    $("#finish-lesson", mount).textContent = "✓ Lesson complete"; $("#finish-lesson", mount).disabled = true;
  });
}
function fmt(s) { s = Math.floor(s); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }

/* -----------------------------------------------------------------------------
   Arcade — every game in one place (module games + bonus games)
----------------------------------------------------------------------------- */
function renderArcade() {
  const root = $("#view-arcade");
  const cards = [];
  PROM.data.modules.forEach((m) => {
    if (m.bonusGame) cards.push({ m, activity: "bonus", g: m.bonusGame });
    if (m.game) cards.push({ m, activity: "game", g: m.game });
  });
  root.innerHTML = `
    <div class="section-eyebrow">// Arcade</div>
    <h2 class="section-title">The <span class="gradient-text">Games</span> Arcade</h2>
    <p class="section-sub">Every skill-building game in one place — drag, debug, optimize, and beat the clock. Music shifts into high gear while you play.</p>
    <div class="price-grid">
      ${cards.map(({ m, activity, g }) => {
        const done = PROM.isDone(m.id, activity);
        const diff = g.difficulty || (activity === "bonus" ? "Beginner" : "Core");
        return `<div class="panel arcade-card" data-mod="${m.id}" data-act="${activity}" role="button" tabindex="0">
          <div class="arcade-ic node-orb ${m.color}">✦</div>
          <div class="tag-row" style="margin-top:14px"><span class="chip">${esc(diff)}</span><span class="chip">Module ${m.code}</span>${done ? `<span class="chip done">✓ Cleared</span>` : ""}</div>
          <h3 style="font-size:1.15rem;margin:6px 0">${esc(g.title)}</h3>
          <p class="dim" style="font-size:.88rem;flex:1">${esc(g.tagline || "")}</p>
          <button class="btn btn-primary btn-sm" style="justify-content:center;margin-top:14px">▶ Play</button>
        </div>`;
      }).join("")}
    </div>`;
  $$(".arcade-card", root).forEach((c) => {
    const open = () => go("module", c.dataset.mod, c.dataset.act);
    c.addEventListener("click", open);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
  });
}

/* -----------------------------------------------------------------------------
   Pricing
----------------------------------------------------------------------------- */
function renderPricing() {
  const root = $("#view-pricing");
  const cards = PROM.data.tiers.map((t) => `
    <div class="panel price-card ${t.featured ? "featured" : ""}">
      ${t.featured ? `<span class="featured-tag">Most popular</span>` : ""}
      <div class="tier-name" style="color:${t.accent === "gold" ? "var(--gold)" : t.accent === "purple" ? "var(--neon-purple)" : "var(--electric)"}">${esc(t.name)}</div>
      <div class="tier-blurb">${esc(t.blurb)}</div>
      <div class="price">${t.price === 0 ? "Free" : "$" + t.price}<span class="cad"> ${esc(t.cadence)}</span></div>
      <ul class="perks">${t.perks.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <button class="btn ${t.featured ? "btn-primary" : t.accent === "gold" ? "btn-gold" : "btn-ghost"}" data-tier="${t.id}" style="justify-content:center">${esc(t.cta)}</button>
    </div>`).join("");

  root.innerHTML = `
    <div class="section-eyebrow center" style="text-align:center">// Choose your tier</div>
    <h2 class="section-title center" style="text-align:center">Fuel your <span class="gradient-text">ascent</span></h2>
    <p class="section-sub" style="margin:0 auto 36px;text-align:center">Start free. Upgrade when you're ready to unlock every avatar lesson, live sandbox and game.</p>
    <div class="price-grid">${cards}</div>`;

  $$("[data-tier]", root).forEach((b) => b.addEventListener("click", () => checkout(b.dataset.tier)));
}

function checkout(tierId) {
  const link = CONFIG.stripe.paymentLinks[tierId];
  if (link) { window.location.href = link; return; }
  modal(`<h3>Checkout — demo mode</h3>
    <p>Stripe isn't wired yet. The static-friendly path is a <strong>Stripe Payment Link</strong> — no backend required.</p>
    <p>Create a link in your Stripe dashboard, then add it to <code>CONFIG.stripe.paymentLinks.${esc(tierId)}</code> in <code>js/app.js</code> and this button goes live instantly.</p>
    <button class="btn btn-primary" onclick="PROM.closeModal()" style="justify-content:center;width:100%">Got it</button>`);
}

/* -----------------------------------------------------------------------------
   XP badge in nav
----------------------------------------------------------------------------- */
function updateXPBadge() {
  const el = $("#nav-xp-val");
  const academyXP = (window.ACADEMY && ACADEMY.xp) ? ACADEMY.xp() : 0;
  if (el) el.textContent = (PROM.totalXP() + academyXP).toLocaleString();
}
window.updateXPBadge = updateXPBadge;

/* -----------------------------------------------------------------------------
   Boot
----------------------------------------------------------------------------- */
function boot() {
  $$(".nav-btn").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  $$("[data-go]").forEach((b) => { if (!b.classList.contains("nav-btn")) b.addEventListener("click", () => go(b.dataset.go)); });

  // Adaptive soundscape toggle
  const snd = $("#sound-toggle");
  if (snd) snd.addEventListener("click", () => {
    const on = PROM.audio ? PROM.audio.toggle() : false;
    snd.innerHTML = (window.PROM && PROM.icon) ? PROM.icon(on ? "volume" : "mute", 20) : (on ? "🔊" : "🔇");
    snd.classList.toggle("muted", !on);
    snd.title = on ? "Mute soundscape" : "Unmute soundscape";
  });

  // AI dubbing / language selector (integration point)
  const lang = $("#lang-select");
  if (lang) lang.addEventListener("change", () => {
    CONFIG.dubbing.lang = lang.value;
    toast(`Dubbing → ${lang.options[lang.selectedIndex].text} · connect AI dubbing to go live`, "", "🌐");
  });

  updateXPBadge();
  const hash = location.hash.replace("#", "").split("/")[0];
  go(ROUTES.includes(hash) ? hash : "home");
}
// Defer with setTimeout(0) so later <script> tags (trainings/games) finish
// registering into PROM before the first view mounts.
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else setTimeout(boot, 0);
