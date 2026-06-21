/* =============================================================================
   PROMETHEUS · Academy Renderer
   Renders the Academy landing, track pages, and the long-form lesson reader with
   a live narration teleprompter (js/narrator.js), copy-able prompt playbooks, and
   graded exercises that reuse the Prompt Sandbox grader (PROM.ai.gradePrompt).
   Mounts into #view-academy. Entry point: PROM.openAcademy().
   ============================================================================= */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => (window.PROM ? PROM.esc(s) : String(s));
  // SVG icon for a (possibly legacy emoji) glyph; falls back to the raw glyph
  const ic = (glyph, size) => (window.PROM && PROM.iconEmoji) ? PROM.iconEmoji(glyph, size) : esc(glyph);
  const icName = (name, size) => (window.PROM && PROM.icon) ? PROM.icon(name, size) : "";
  const A = window.ACADEMY;

  let filter = { cat: "all", q: "" };
  let unsubState = null;

  function mountEl() { return $("#view-academy"); }
  function stopNarration() { if (window.PROM && PROM.narrator) PROM.narrator.stop(); if (unsubState) { unsubState(); unsubState = null; } }

  function sentences(t) {
    if (Array.isArray(t)) return t.slice();
    return String(t || "").replace(/\s+/g, " ").match(/[^.!?…]+[.!?…]+(?:["')\]]+)?|\S[^.!?…]*$/g) || [];
  }
  function paras(body) { return String(body || "").split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join(""); }
  function chip(t) { return `<span class="chip">${esc(t)}</span>`; }

  /* ===========================================================================
     LANDING
  =========================================================================== */
  function openAcademy() {
    stopNarration();
    const root = mountEl();
    if (!A || !A.tracks.length) { root.innerHTML = `<div class="ac-empty">Academy content is loading…</div>`; return; }
    const cats = A.categories();
    const totalTracks = A.tracks.length, totalLessons = A.lessonCount();
    const mastery = A.masteryPct();

    const filters = [`<button class="ac-filter ${filter.cat === "all" ? "active" : ""}" data-cat="all">All</button>`]
      .concat(cats.map(([c]) => `<button class="ac-filter ${filter.cat === c ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)).join("");

    root.innerHTML = `
      <div class="ac-hero panel">
        <div class="section-eyebrow center" style="text-align:center">// The AI Mastery Academy</div>
        <h1>Master <span class="gradient-text">every</span> AI tool</h1>
        <p>Deep, narrated, up-to-date training on the tools running the 2026 AI economy — how they work, exactly how to prompt them, their settings and features, and how to leverage them in business and life. Beginner to advanced. Press play and learn hands-free.</p>
        <div class="ac-hero-stats">
          <div class="ac-hero-stat"><div class="num gradient-text">${totalTracks}</div><div class="lbl">Mastery Tracks</div></div>
          <div class="ac-hero-stat"><div class="num gradient-text">${totalLessons}</div><div class="lbl">Lessons</div></div>
          <div class="ac-hero-stat"><div class="num gradient-text">${mastery}%</div><div class="lbl">Your mastery</div></div>
          <div class="ac-hero-stat"><div class="num gradient-text">${A.categories().length}</div><div class="lbl">Domains</div></div>
        </div>
      </div>

      <div class="ac-toolbar">
        <div class="ac-search"><span class="ac-search-ic">${icName("search", 17)}</span><input id="ac-q" type="text" placeholder="Search tools, skills, topics…" value="${esc(filter.q)}"></div>
      </div>
      <div class="ac-filters" style="margin-bottom:26px">${filters}</div>

      <div id="ac-results"></div>`;

    $("#ac-q", root).addEventListener("input", (e) => { filter.q = e.target.value; renderResults(); });
    $$(".ac-filter", root).forEach((b) => b.addEventListener("click", () => { filter.cat = b.dataset.cat; $$(".ac-filter", root).forEach((x) => x.classList.toggle("active", x === b)); renderResults(); }));
    renderResults();
  }

  function matchTrack(t) {
    if (filter.cat !== "all" && t.category !== filter.cat) return false;
    const q = filter.q.trim().toLowerCase();
    if (!q) return true;
    const hay = [t.title, t.tagline, t.category, t.overview, (t.outcomes || []).join(" "), (t.lessons || []).map((l) => l.title).join(" ")].join(" ").toLowerCase();
    return hay.includes(q);
  }

  /* Generative SVG cover art per section (creative, self-contained, no external tool). */
  const CAT_ART = {
    "Foundations": ["#a855f7", "compass"],
    "Conversational AI": ["#2dd4bf", "chat"],
    "Image & Design": ["#8b5cf6", "palette"],
    "Video & Avatars": ["#f5c518", "film"],
    "Audio, Voice & Music": ["#22d3ee", "volume"],
    "Automation & Agents": ["#3b82f6", "workflow"],
    "Vibe Coding": ["#38bdf8", "code"],
    "Business & Life Playbooks": ["#f5c518", "trending"],
  };
  function categoryBanner(c) {
    const art = CAT_ART[c] || ["#a855f7", "sparkle"];
    const hex = art[0], glyph = art[1];
    const seed = c.replace(/[^a-z]/gi, "").toLowerCase();
    const vid = (A.sectionVideo || {})[c];
    const img = (A.sectionImage || {})[c];
    return `<div class="ac-cat-banner" style="--b:${hex}">
      ${img ? `<img class="ac-cat-img" src="${esc(img)}" alt="" loading="lazy"><div class="ac-cat-img-shade"></div>` : ""}
      <svg class="ac-cat-svg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="cg-${seed}" cx="16%" cy="34%" r="85%">
          <stop offset="0%" stop-color="${hex}" stop-opacity="0.55"/>
          <stop offset="55%" stop-color="${hex}" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="${hex}" stop-opacity="0"/>
        </radialGradient></defs>
        <rect width="1200" height="300" fill="#0a0c1c"/>
        <rect width="1200" height="300" fill="url(#cg-${seed})"/>
        <g fill="none" stroke="${hex}" stroke-opacity="0.16">
          <circle cx="1010" cy="150" r="58"/><circle cx="1010" cy="150" r="110"/><circle cx="1010" cy="150" r="166"/><circle cx="1010" cy="150" r="228"/>
        </g>
      </svg>
      <div class="ac-cat-banner-inner">
        <span class="ac-cat-glyph">${icName(glyph, 30)}</span>
        <div><div class="ac-cat-bk">Section</div><div class="ac-cat-btitle">${esc(c)}</div></div>
        ${vid ? `<a class="btn btn-ghost btn-sm ac-cat-watch" href="${esc(vid)}" target="_blank" rel="noopener">${icName("film", 16)} Watch film</a>` : ""}
      </div>
    </div>`;
  }

  function renderResults() {
    const root = mountEl();
    const wrap = $("#ac-results", root); if (!wrap) return;
    const cats = A.categories().map(([c, list]) => [c, list.filter(matchTrack)]).filter(([, list]) => list.length);
    if (!cats.length) { wrap.innerHTML = `<div class="ac-empty">No tracks match “${esc(filter.q)}”. Try another search.</div>`; return; }
    wrap.innerHTML = cats.map(([c, list]) => `
      <section class="ac-cat">
        ${categoryBanner(c)}
        <div class="ac-cat-head"><h2>${esc(c)}</h2><span class="count">${list.length} track${list.length > 1 ? "s" : ""}</span><span class="ac-cat-line"></span></div>
        <div class="ac-grid">${list.map(cardHTML).join("")}</div>
      </section>`).join("");
    $$(".ac-card", wrap).forEach((c) => c.addEventListener("click", () => openTrack(c.dataset.id)));
  }

  function cardHTML(t) {
    const pct = A.trackPct(t), done = A.trackDoneCount(t), n = (t.lessons || []).length;
    const all = n && done === n;
    return `<div class="ac-card panel ${all ? "done-all" : ""}" data-id="${esc(t.id)}">
      ${all ? `<span class="ac-done-badge">★ Mastered</span>` : ""}
      <div class="ac-card-top">
        <div class="ac-orb ${esc(t.color)}">${ic(t.icon, 26)}</div>
        <div><div class="ac-cat-tag">${esc(t.category)}</div><h3>${esc(t.title)}</h3></div>
      </div>
      <p class="ac-tagline">${esc(t.tagline || "")}</p>
      <div class="ac-meta">${chip(t.level || "Core")}${chip(n + " lessons")}${t.estTime ? chip(t.estTime) : ""}</div>
      <div class="ac-prog"><span style="width:${pct}%"></span></div>
      <div class="ac-prog-label">${done}/${n} complete${pct ? " · " + pct + "%" : ""}</div>
    </div>`;
  }

  /* ===========================================================================
     TRACK PAGE
  =========================================================================== */
  function openTrack(trackId) {
    stopNarration();
    const t = A.get(trackId); if (!t) return openAcademy();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const root = mountEl();
    const initials = (t.instructor.name || "AI").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const nextLesson = (t.lessons.find((l) => !A.isLessonDone(t.id, l.id)) || t.lessons[0]) || null;
    const startLabel = A.trackDoneCount(t) ? "Continue ▸" : "Start track ▸";

    root.innerHTML = `
      <a class="back-link" id="ac-back">← All tracks</a>
      <div class="ac-track-hero panel">
        <div class="ac-instructor">
          <div class="ac-avatar" id="ac-track-av">${esc(initials)}</div>
          <div class="who"><div class="nm">${esc(t.instructor.name)}</div><div class="rl">${esc(t.instructor.role || "")}</div></div>
        </div>
        <div>
          <div class="ac-cat-tag">${esc(t.category)} · ${esc(t.level || "Core")}</div>
          <h1>${esc(t.title)}</h1>
          <div class="ac-tagline">${esc(t.tagline || "")}</div>
          <div class="ac-overview">${esc(t.overview || "")}</div>
          ${t.outcomes && t.outcomes.length ? `<ul class="ac-outcomes">${t.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>` : ""}
          ${nextLesson ? `<button class="btn btn-primary" id="ac-start">${startLabel}</button>` : ""}
        </div>
      </div>

      <div class="ac-block-title">Lessons</div>
      <div class="ac-lesson-list">${t.lessons.map((l, i) => lessonRow(t, l, i)).join("")}</div>

      ${t.quiz && t.quiz.length ? `<div class="ac-block-title">Knowledge check</div><div id="ac-quiz"></div>` : ""}
      ${t.resources && t.resources.length ? `<div class="ac-block-title">Resources</div>
        <div class="ac-deflist">${t.resources.map((r) => `<div class="ac-def"><div class="dt">${esc(r.label)}</div><div class="dd">${esc(r.note)}</div></div>`).join("")}</div>` : ""}`;

    $("#ac-back", root).addEventListener("click", openAcademy);
    if (nextLesson) $("#ac-start", root).addEventListener("click", () => openLesson(t.id, nextLesson.id));
    $$(".ac-lesson-row", root).forEach((row) => row.addEventListener("click", () => openLesson(t.id, row.dataset.lesson)));
    if (t.quiz && t.quiz.length) renderQuiz(t);
  }

  function lessonRow(t, l, i) {
    const done = A.isLessonDone(t.id, l.id);
    return `<div class="ac-lesson-row ${done ? "done" : ""}" data-lesson="${esc(l.id)}">
      <div class="lx-num">${done ? "✓" : i + 1}</div>
      <div><div class="lx-title">${esc(l.title)}</div><div class="lx-sum">${esc(l.summary || "")}</div></div>
      <div class="lx-meta">${chip(l.level)}${chip(l.duration)}</div>
    </div>`;
  }

  function renderQuiz(t) {
    const host = $("#ac-quiz"); if (!host) return;
    let answered = 0, correct = 0;
    host.innerHTML = `<div class="ac-quiz panel">${t.quiz.map((q, qi) => `
      <div class="ac-q" data-qi="${qi}">
        <div class="qq">${qi + 1}. ${esc(q.q)}</div>
        <div class="ac-opts">${q.options.map((o, oi) => `<button class="ac-opt" data-oi="${oi}">${esc(o)}</button>`).join("")}</div>
      </div>`).join("")}
      <div id="ac-quiz-score" class="dim" style="margin-top:6px">Answer all ${t.quiz.length} to score this track.</div></div>`;

    $$(".ac-q", host).forEach((qEl, qi) => {
      const q = t.quiz[qi]; let locked = false;
      $$(".ac-opt", qEl).forEach((opt, oi) => opt.addEventListener("click", () => {
        if (locked) return; locked = true; answered++;
        const isRight = oi === q.answer;
        if (isRight) correct++;
        opt.classList.add(isRight ? "correct" : "wrong");
        if (!isRight) { const right = $$(".ac-opt", qEl)[q.answer]; if (right) right.classList.add("correct"); }
        const why = document.createElement("span"); why.className = "why"; why.textContent = "→ " + q.why;
        $$(".ac-opt", qEl)[q.answer].appendChild(why);
        if (answered === t.quiz.length) {
          const pct = Math.round((correct / t.quiz.length) * 100);
          A.setQuizScore(t.id, pct);
          const s = $("#ac-quiz-score");
          s.innerHTML = `<strong style="color:${pct >= 70 ? "var(--teal)" : "var(--gold)"}">${correct}/${t.quiz.length} correct · ${pct}%</strong> ${pct >= 70 ? "— passed! " + icName("sparkle", 15) : "— review the lessons and retry."}`;
        }
      }));
    });
  }

  /* ===========================================================================
     LESSON READER
  =========================================================================== */
  function openLesson(trackId, lessonId) {
    stopNarration();
    const t = A.get(trackId); if (!t) return openAcademy();
    const idx = t.lessons.findIndex((l) => l.id === lessonId);
    const l = t.lessons[idx]; if (!l) return openTrack(trackId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const root = mountEl();
    const initials = (t.instructor.name || "AI").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const script = A.lessonNarration(t, l);
    const segs = sentences(script);

    const blocks = [];
    // sections
    (l.sections || []).forEach((s) => blocks.push(`<div class="ac-section"><h4>${esc(s.heading)}</h4>${paras(s.body)}</div>`));
    // takeaways
    if (l.keyTakeaways && l.keyTakeaways.length) blocks.push(callout("takeaways", "Key takeaways", l.keyTakeaways, "sparkle"));
    // prompt playbook
    if (l.promptPlaybook && l.promptPlaybook.length) {
      blocks.push(`<div class="ac-block-title">Prompt playbook</div><div class="ac-pb">${l.promptPlaybook.map(pbCard).join("")}</div>`);
    }
    // settings
    if (l.settings && l.settings.length) blocks.push(`<div class="ac-block-title">Settings to know</div><div class="ac-deflist">${defs(l.settings)}</div>`);
    // features
    if (l.features && l.features.length) blocks.push(`<div class="ac-block-title">Key features</div><div class="ac-deflist">${defs(l.features)}</div>`);
    // use cases
    if ((l.business && l.business.length) || (l.life && l.life.length)) {
      blocks.push(`<div class="ac-block-title">How to leverage it</div><div class="ac-twocol">
        ${l.business && l.business.length ? callout("tips", "In business", l.business, "briefcase") : ""}
        ${l.life && l.life.length ? callout("takeaways", "In life", l.life, "leaf") : ""}
      </div>`);
    }
    // tips / pitfalls
    if ((l.proTips && l.proTips.length) || (l.pitfalls && l.pitfalls.length)) {
      blocks.push(`<div class="ac-twocol">
        ${l.proTips && l.proTips.length ? callout("tips", "Pro tips", l.proTips, "check") : ""}
        ${l.pitfalls && l.pitfalls.length ? callout("pitfalls", "Pitfalls to avoid", l.pitfalls, "warning") : ""}
      </div>`);
    }
    // exercise
    if (l.exercise) blocks.push(exerciseHTML(l.exercise));

    const prev = t.lessons[idx - 1], next = t.lessons[idx + 1];
    const done = A.isLessonDone(t.id, l.id);

    root.innerHTML = `
      <div class="ac-reader">
        <a class="back-link" id="ac-back">← ${esc(t.title)}</a>
        <div class="ac-reader-head">
          <div class="tag-row">${chip("Lesson " + (idx + 1) + " / " + t.lessons.length)}${chip(l.level)}${chip(l.duration)}</div>
          <h1>${esc(l.title)}</h1>
          <div class="avatar-meta" style="padding:0">
            <div class="am-orb" id="ac-read-av">${esc(initials)}</div>
            <div><div class="am-name">${esc(t.instructor.name)} <span class="dim" style="font-weight:500">· narrating</span></div>
            <div class="am-role"><span class="co-ic">${icName("mic", 14)}</span> Natural neural narration · choose ✨ ElevenLabs for studio quality</div></div>
          </div>
        </div>

        <div class="ac-narrator panel">
          <div class="ac-narr-controls">
            <button class="ac-narr-btn" id="nr-play" aria-label="Play narration">▶</button>
            <button class="ac-narr-btn sm" id="nr-stop" aria-label="Stop">■</button>
            <div class="ac-narr-status" id="nr-status">Press play to listen</div>
            <span class="ac-narr-spacer"></span>
            <select class="ac-narr-select" id="nr-voice" title="Narrator voice"></select>
            <select class="ac-narr-select" id="nr-rate" title="Speed" style="max-width:80px">
              <option value="0.9">0.9×</option><option value="1" selected>1.0×</option><option value="1.1">1.1×</option><option value="1.25">1.25×</option>
            </select>
          </div>
          <div class="ac-tele" id="nr-tele">${segs.map((s, i) => `<span class="ac-seg" data-seg="${i}">${esc(s)} </span>`).join("")}</div>
          <div class="ac-narr-note" id="nr-note"></div>
        </div>

        ${blocks.join("")}

        <div class="ac-reader-nav">
          ${prev ? `<button class="btn btn-ghost" id="nr-prev">← ${esc(trim(prev.title))}</button>` : `<span></span>`}
          <button class="btn btn-primary" id="nr-complete">${done ? "✓ Completed — " : "Mark complete"}${next ? "Next ▸" : "Finish ▸"}</button>
        </div>
      </div>`;

    $("#ac-back", root).addEventListener("click", () => openTrack(t.id));
    if (prev) $("#nr-prev", root).addEventListener("click", () => openLesson(t.id, prev.id));
    $("#nr-complete", root).addEventListener("click", () => {
      A.completeLesson(t.id, l.id);
      if (next) openLesson(t.id, next.id); else openTrack(t.id);
    });

    wireCopy(root);
    wireExercise(root, l);
    wireNarrator(root, t, l, segs);
  }

  function trim(s) { return s && s.length > 22 ? s.slice(0, 20) + "…" : s; }
  function callout(kind, title, items, iconName) {
    const head = (iconName ? `<span class="co-ic">${icName(iconName, 16)}</span>` : "") + esc(title);
    return `<div class="ac-callout ${kind}"><h5>${head}</h5><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
  }
  function defs(arr) { return arr.map((d) => `<div class="ac-def"><div class="dt">${esc(d.name)}</div><div class="dd">${esc(d.detail)}</div></div>`).join(""); }
  function pbCard(p, i) {
    return `<div class="ac-pb-card">
      <div class="ac-pb-head"><span class="lbl">${esc(p.label || "Prompt")}</span><button class="ac-pb-copy" data-copy="${i}">⧉ Copy</button></div>
      <div class="ac-pb-prompt" data-prompt="${i}">${esc(p.prompt)}</div>
      ${p.why ? `<div class="ac-pb-why">${esc(p.why)}</div>` : ""}
    </div>`;
  }

  function wireCopy(root) {
    $$(".ac-pb-copy", root).forEach((btn) => btn.addEventListener("click", () => {
      const i = btn.dataset.copy;
      const txt = ($(`.ac-pb-prompt[data-prompt="${i}"]`, root) || {}).textContent || "";
      const ok = () => { btn.textContent = "✓ Copied"; btn.classList.add("copied"); setTimeout(() => { btn.textContent = "⧉ Copy"; btn.classList.remove("copied"); }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok).catch(() => fallbackCopy(txt, ok));
      else fallbackCopy(txt, ok);
    }));
  }
  function fallbackCopy(txt, ok) {
    try { const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); ok(); } catch (e) {}
  }

  /* ---- exercise ---- */
  function exerciseHTML(ex) {
    const isPrompt = ex.type === "prompt";
    return `<div class="ac-exercise" id="ac-ex">
      <h4><span class="co-ic">${icName(isPrompt ? "pen" : "brain", 17)}</span> ${isPrompt ? "Try it — graded" : "Reflect"}</h4>
      <div class="brief">${esc(ex.brief)}</div>
      <textarea class="sb-input" id="ac-ex-input" placeholder="${esc(isPrompt ? "Write your prompt here…" : "Write your answer here…")}" style="min-height:110px">${esc(ex.starter || "")}</textarea>
      <div class="sb-actions">
        ${isPrompt ? `<button class="btn btn-primary" id="ac-ex-grade"><span class="bico">${icName("zap", 16)}</span> Grade my prompt</button>` : `<button class="btn btn-primary" id="ac-ex-check">Reveal model answer</button>`}
        ${ex.hint ? `<button class="btn btn-ghost btn-sm" id="ac-ex-hint"><span class="bico">${icName("bulb", 15)}</span> Hint</button>` : ""}
      </div>
      <div id="ac-ex-out"></div>
    </div>`;
  }
  function wireExercise(root, l) {
    const ex = l.exercise; if (!ex) return;
    const out = $("#ac-ex-out", root);
    if (ex.hint) { const h = $("#ac-ex-hint", root); if (h) h.addEventListener("click", () => { out.innerHTML = `<div class="sb-response"><span class="resp-label">Hint</span>${esc(ex.hint)}</div>`; }); }
    if (ex.type === "prompt") {
      const g = $("#ac-ex-grade", root); if (!g) return;
      g.addEventListener("click", () => {
        const val = ($("#ac-ex-input", root) || {}).value || "";
        if (!val.trim()) { out.innerHTML = `<div class="sb-response"><span class="resp-label">Write something first</span>Draft a prompt, then grade it.</div>`; return; }
        const res = (window.PROM && PROM.ai) ? PROM.ai.gradePrompt(val) : { total: 0, pillars: [] };
        const color = res.total >= 85 ? "var(--teal)" : res.total >= 70 ? "var(--electric)" : res.total >= 50 ? "var(--gold)" : "#fb7185";
        out.innerHTML = `<div class="grade-wrap">
          <div class="grade-score" style="color:${color}">${res.total}<span style="font-size:1.1rem;color:var(--text-faint)">/100</span></div>
          <div class="grade-bar"><div class="grade-fill" id="ac-gfill"></div></div>
        </div>
        <div class="rubric-list">${(res.pillars || []).map((p) => `<div class="rubric-item"><span class="rb-ic ${p.pass ? "pass" : "fail"}">${p.pass ? "✓" : "!"}</span><span><strong>${p.name}</strong> · ${p.score}/25 — <span class="dim">${esc(p.tip)}</span></span></div>`).join("")}</div>
        ${ex.success ? `<div class="sb-response" style="margin-top:14px"><span class="resp-label">What great looks like</span>${esc(ex.success)}</div>` : ""}`;
        requestAnimationFrame(() => { const f = $("#ac-gfill", root); if (f) f.style.width = res.total + "%"; });
      });
    } else {
      const c = $("#ac-ex-check", root); if (!c) return;
      c.addEventListener("click", () => { out.innerHTML = `<div class="sb-response"><span class="resp-label">Model answer</span>${esc(ex.success || "Nice work — compare your thinking to the lesson's key points.")}</div>`; });
    }
  }

  /* ---- narrator wiring ---- */
  function promptElevenKey(then) {
    if (!(window.PROM && PROM.modal)) return;
    PROM.modal(`<h3>Use your ElevenLabs voice</h3>
      <p class="dim" style="font-size:.9rem">Paste your ElevenLabs <strong>API key</strong> and a <strong>Voice ID</strong>. It's stored only in this browser and sent directly to ElevenLabs from your device. (For a public production site, use a serverless proxy instead of a browser key.)</p>
      <input class="txt" id="el-key" placeholder="API key (xi-api-key)" autocomplete="off" style="margin-bottom:10px">
      <input class="txt" id="el-voice" placeholder="Voice ID — e.g. 21m00Tcm4TlvDq8ikWAM" autocomplete="off" style="margin-bottom:6px">
      <p class="dim" style="font-size:.78rem;margin-bottom:12px">Find a Voice ID in ElevenLabs → Voices → (voice) → "ID".</p>
      <div class="sb-actions"><button class="btn btn-ghost" onclick="PROM.closeModal()">Cancel</button><button class="btn btn-primary" id="el-save" style="flex:1;justify-content:center">Save &amp; use</button></div>`);
    const s = document.getElementById("el-save");
    if (s) s.addEventListener("click", () => {
      const k = (document.getElementById("el-key") || {}).value || "";
      const v = (document.getElementById("el-voice") || {}).value || "";
      if (!k.trim() || !v.trim()) return;
      PROM.narrator.setElevenLabs(k.trim(), v.trim());
      PROM.closeModal();
      if (then) then();
    });
  }

  function wireNarrator(root, t, l, segs) {
    const N = window.PROM && PROM.narrator;
    const playBtn = $("#nr-play", root), stopBtn = $("#nr-stop", root), status = $("#nr-status", root);
    const tele = $("#nr-tele", root), note = $("#nr-note", root);
    const voiceSel = $("#nr-voice", root), rateSel = $("#nr-rate", root);
    const av = $("#ac-read-av", root);

    if (!N) {
      if (note) note.textContent = "Narration unavailable.";
      if (playBtn) { playBtn.disabled = true; playBtn.style.opacity = ".5"; }
    } else {
      const elOn = N.hasElevenLabs && N.hasElevenLabs();
      if (note) note.textContent = elOn
        ? "Using your ElevenLabs voice. Change voice or speed below."
        : "Natural neural voice by default — no setup. Want studio quality? Choose ✨ ElevenLabs and paste your key once; it applies everywhere, including the intro.";
      const pf = N.getPref();
      const edgeOpts = (N.getEdgeVoices ? N.getEdgeVoices() : []).map((v) => `<option value="edge:${esc(v.id)}" ${pf.provider === "edge" && pf.edgeVoice === v.id ? "selected" : ""}>${esc(v.label)}</option>`).join("");
      const pollyOpts = N.getPollyVoices().map((v) => `<option value="polly:${esc(v.id)}" ${pf.provider === "polly" && pf.pollyVoice === v.id ? "selected" : ""}>${esc(v.label)}</option>`).join("");
      voiceSel.innerHTML =
        `<option value="elevenlabs" ${pf.provider === "elevenlabs" ? "selected" : ""}>✨ ElevenLabs${elOn ? "" : " — add key"}</option>` +
        `<optgroup label="Neural voices (recommended)">${edgeOpts}</optgroup>` +
        `<optgroup label="Standard voices">${pollyOpts}</optgroup>` +
        `<option value="browser" ${pf.provider === "browser" ? "selected" : ""}>Browser voice (offline)</option>`;
      voiceSel.addEventListener("change", () => {
        const v = voiceSel.value;
        if (v === "elevenlabs") {
          if (N.hasElevenLabs()) { N.setProvider("elevenlabs"); if (N.state() !== "idle") startPlay(); }
          else promptElevenKey(() => startPlay());
        } else if (v === "browser") { N.setProvider("browser"); if (N.state() !== "idle") startPlay(); }
        else if (v.indexOf("edge:") === 0) { N.setEdgeVoice(v.replace(/^edge:/, "")); if (N.state() !== "idle") startPlay(); }
        else { N.setPollyVoice(v.replace(/^polly:/, "")); if (N.state() !== "idle") startPlay(); }
      });
      rateSel.addEventListener("change", () => { N.setRate(parseFloat(rateSel.value)); if (N.state() !== "idle") startPlay(); });
    }

    function highlight(i) {
      $$(".ac-seg", tele).forEach((sp, k) => { sp.classList.toggle("active", k === i); sp.classList.toggle("past", k < i); });
      const active = $(`.ac-seg[data-seg="${i}"]`, tele);
      if (active) active.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    function setUI(stateName) {
      if (stateName === "playing") { playBtn.textContent = "❚❚"; status.classList.add("on"); status.innerHTML = `<span class="live-dot"></span>Narrating <span class="ac-eq"><i></i><i></i><i></i><i></i><i></i></span>`; if (av) av.classList.add("speaking"); }
      else if (stateName === "paused") { playBtn.textContent = "▶"; status.classList.remove("on"); status.textContent = "Paused"; if (av) av.classList.remove("speaking"); }
      else { playBtn.textContent = "▶"; status.classList.remove("on"); status.textContent = "Press play to listen"; if (av) av.classList.remove("speaking"); $$(".ac-seg", tele).forEach((sp) => sp.classList.remove("active", "past")); }
    }
    function startPlay() {
      N.speak(segs, { lang: (t.instructor && t.instructor.voiceLang) || "en-US", audioUrl: l.audioUrl, onSegment: highlight, onEnd: () => setUI("idle") });
    }

    if (N && N.supported) {
      if (unsubState) unsubState();
      unsubState = N.onState(setUI);
      playBtn.addEventListener("click", () => {
        const st = N.state();
        if (st === "idle") startPlay();
        else N.toggle();
      });
      stopBtn.addEventListener("click", () => N.stop());
    }
  }

  /* expose */
  if (window.PROM) { PROM.openAcademy = openAcademy; PROM.academyOpenTrack = openTrack; PROM.academyOpenLesson = openLesson; }
  else window.PROM = { openAcademy: openAcademy };
})();
