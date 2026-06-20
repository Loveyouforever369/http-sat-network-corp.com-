/* =============================================================================
   PROMETHEUS · Academy Core
   -----------------------------------------------------------------------------
   The Academy is an unlimited, data-driven library of deep "Mastery Tracks" —
   each a multi-lesson course on a top AI tool or discipline, taught with real
   in-browser narration (js/narrator.js) and the platform's design system.

   Content files (js/academy/*.js) each call ACADEMY.register({...}) one or more
   times. This file owns: the registry, light schema defaults, category grouping,
   search, and a self-contained progress + XP engine (separate from the module
   skill-tree engine in app.js, but it feeds the same nav XP badge).

   ---- TRACK SCHEMA ----------------------------------------------------------
   ACADEMY.register({
     id, title, tagline, category, icon, color,            // color ∈ blue|purple|teal|violet|gold
     level, difficulty, estTime,
     instructor: { name, role, persona, voiceLang },        // voiceLang e.g. "en-US"
     overview, whyItMatters,
     outcomes: [str],
     lessons: [{
       id, title, level, duration, summary,
       sections:        [{ heading, body }],                // body may contain \n\n paragraphs
       keyTakeaways:    [str],
       promptPlaybook:  [{ label, prompt, why }],
       settings:        [{ name, detail }],
       features:        [{ name, detail }],
       business:        [str],
       life:            [str],
       proTips:         [str],
       pitfalls:        [str],
       exercise:        { type:"prompt"|"reflect", brief, starter, hint, success },
       narration        // full spoken script; if omitted it is built from sections
     }],
     quiz:      [{ q, options:[str], answer:idx, why }],
     resources: [{ label, note }]
   });
   ============================================================================= */
(function () {
  const A = (window.ACADEMY = window.ACADEMY || {});
  A.tracks = A.tracks || [];
  A._byId = A._byId || {};

  /* Order categories appear in the Academy. Unknown categories append after. */
  A.categoryOrder = [
    "Foundations",
    "Conversational AI",
    "Image & Design",
    "Video & Avatars",
    "Audio, Voice & Music",
    "Automation & Agents",
    "Vibe Coding",
    "Business & Life Playbooks",
  ];

  A.register = function (track) {
    if (!track || !track.id) { console.warn("ACADEMY: track missing id", track); return; }
    if (A._byId[track.id]) { console.warn("ACADEMY: duplicate track id", track.id); return; }
    // defaults so the renderer never breaks on a partial track
    track.color = track.color || "purple";
    track.icon = track.icon || "✦";
    track.category = track.category || "Foundations";
    track.lessons = (track.lessons || []).map((l, i) => Object.assign({
      id: l.id || ("l" + (i + 1)),
      level: l.level || track.level || "Core",
      duration: l.duration || "8 min",
      sections: l.sections || [],
    }, l));
    track.instructor = track.instructor || { name: "Your Guide", role: "AI Instructor", voiceLang: "en-US" };
    A.tracks.push(track);
    A._byId[track.id] = track;
    return track;
  };

  A.get = function (id) { return A._byId[id] || null; };
  A.all = function () { return A.tracks.slice(); };
  A.lessonCount = function () { return A.tracks.reduce((s, t) => s + (t.lessons ? t.lessons.length : 0), 0); };

  A.categories = function () {
    const present = {};
    A.tracks.forEach((t) => { (present[t.category] = present[t.category] || []).push(t); });
    const ordered = [];
    A.categoryOrder.forEach((c) => { if (present[c]) { ordered.push([c, present[c]]); delete present[c]; } });
    Object.keys(present).forEach((c) => ordered.push([c, present[c]]));
    return ordered; // [ [categoryName, [tracks...]], ... ]
  };

  /* Build a clean spoken script for a lesson if the author didn't supply one. */
  A.lessonNarration = function (track, lesson) {
    if (lesson.narration) return lesson.narration;
    const intro = `${lesson.title}. `;
    const body = (lesson.sections || []).map((s) => `${s.heading}. ${s.body}`).join(" ");
    const tips = (lesson.proTips && lesson.proTips.length) ? " Pro tip: " + lesson.proTips[0] : "";
    return (intro + body + tips).replace(/\s+/g, " ").trim();
  };

  /* Full plain-text of a lesson, used for the teleprompter + narration sync. */
  A.lessonText = function (track, lesson) { return A.lessonNarration(track, lesson); };

  /* ---------------------------------------------------------------------------
     Progress + XP engine (self-contained; persisted separately from app.js).
  --------------------------------------------------------------------------- */
  const KEY = "prometheus.academy.v1";
  const XP_PER_LESSON = 60;
  const XP_PER_QUIZ = 80;

  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.done) return s; } catch (e) {}
    return { done: {}, quiz: {} };
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(A.state)); } catch (e) {} }
  A.state = load();

  A.isLessonDone = function (trackId, lessonId) { return !!A.state.done[`${trackId}:${lessonId}`]; };
  A.completeLesson = function (trackId, lessonId) {
    const k = `${trackId}:${lessonId}`;
    const first = !A.state.done[k];
    A.state.done[k] = true; save();
    if (first && window.PROM && PROM.toast) PROM.toast(`+${XP_PER_LESSON} XP · Lesson complete`, "xp", "✦");
    A.refreshBadge();
    return first;
  };
  A.setQuizScore = function (trackId, score) {
    A.state.quiz[trackId] = Math.max(score, A.state.quiz[trackId] || 0); save(); A.refreshBadge();
  };
  A.trackDoneCount = function (track) {
    return (track.lessons || []).filter((l) => A.isLessonDone(track.id, l.id)).length;
  };
  A.trackPct = function (track) {
    const n = (track.lessons || []).length || 1;
    return Math.round((A.trackDoneCount(track) / n) * 100);
  };
  A.xp = function () {
    let xp = Object.values(A.state.done).filter(Boolean).length * XP_PER_LESSON;
    Object.values(A.state.quiz).forEach((sc) => { if (sc >= 70) xp += XP_PER_QUIZ; });
    return xp;
  };
  A.totalLessonsDone = function () { return Object.values(A.state.done).filter(Boolean).length; };
  A.masteryPct = function () {
    const total = A.lessonCount() || 1;
    return Math.round((A.totalLessonsDone() / total) * 100);
  };
  A.reset = function () { A.state = { done: {}, quiz: {} }; save(); A.refreshBadge(); };

  /* Keep the nav XP badge in sync (app.js owns the element; we just nudge it). */
  A.refreshBadge = function () { if (window.updateXPBadge) try { window.updateXPBadge(); } catch (e) {} };
})();
