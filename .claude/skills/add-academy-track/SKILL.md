---
name: add-academy-track
description: >
  Add a new deep "mastery track" to the Prometheus AI Mastery Academy (this
  repo). Use whenever the user wants to teach/train on a new AI tool, agent, or
  discipline — "add a track on X", "turn this tool into a lesson/course",
  "master X and make content for it". Produces a schema-valid js/academy/*.js
  file, wires it into index.html, and validates with the QA harness.
---

# Add an Academy Track

The Academy (`js/academy/*.js`) is an unlimited, data-driven course library.
Each file calls `ACADEMY.register({...})` once per track. Adding a track is the
core way this project grows: **every tool we master becomes a track.**

## Steps

1. **Study first.** Read `js/academy/_core.js` (the schema) and one strong
   existing track (`js/academy/vibe-coding.js` or `conversational.js`) to match
   voice and depth. Do not invent the schema from memory.
2. **Author** `js/academy/<your-file>.js`:
   ```js
   (function () {
     if (!window.ACADEMY) return;
     ACADEMY.register({ /* track object — see schema below */ });
   })();
   ```
3. **Wire it in:** add `<script src="js/academy/<your-file>.js"></script>` in
   `index.html` alongside the other `js/academy/*` tags (~lines 181–191).
4. **Validate:** run `node scripts/academy-qa.js`. It must print
   **"✓ All tracks valid. Schema OK."** Fix any reported problem and re-run.
5. **Commit** to the active branch. Do not open a PR unless asked.

## Track schema (from `js/academy/_core.js`)

```
ACADEMY.register({
  id, title, tagline, category, icon, color,   // color ∈ blue|purple|teal|violet|gold
  level, difficulty, estTime,
  instructor: { name, role, persona, voiceLang }, // voiceLang e.g. "en-US"
  overview, whyItMatters,
  outcomes: [str],
  lessons: [{
    id, title, level, duration, summary,
    sections:       [{ heading, body }],         // body may contain \n\n paragraphs
    keyTakeaways:   [str],
    promptPlaybook: [{ label, prompt, why }],
    settings:       [{ name, detail }],
    features:       [{ name, detail }],
    business:       [str],
    life:           [str],
    proTips:        [str],
    pitfalls:       [str],
    exercise:       { type:"prompt"|"reflect", brief, starter, hint, success },
    narration                                    // full spoken script (optional but expected)
  }],
  quiz:      [{ q, options:[str], answer:idx, why }],
  resources: [{ label, note }]
});
```

## Hard rules the QA harness enforces

- `color` must be one of `blue purple teal violet gold`.
- Track needs `id` (unique), `title`, `category`, `instructor.name`, and ≥1 lesson.
- Each lesson needs a unique `id`, a `title`, and ≥1 `section`; every section
  needs both `heading` and `body`.
- Each `promptPlaybook` entry needs a `prompt`.
- Each quiz item needs `q`, ≥2 `options`, and an in-range `answer` index.
- Prefer a `category` already in `_core.js` `categoryOrder` so it groups nicely:
  Foundations, Conversational AI, Image & Design, Video & Avatars,
  Audio Voice & Music, Automation & Agents, Vibe Coding, Business & Life Playbooks.

## Quality bar (match existing tracks — non-negotiable)

- **Specific and current**, never generic. Real settings, real feature names,
  real commands. Anti-fluff.
- **No fabricated metrics** ("87% fewer bugs", invented benchmarks/star counts).
  Verifiable or clearly hedged claims only.
- Every lesson: 3 strong `sections`, `keyTakeaways`, at least one
  `promptPlaybook` entry, `settings`, `features`, `proTips`, `pitfalls`, an
  `exercise`, and a full `narration` (the platform's signature — write it as
  spoken prose, ~150–200 words).
- 4–6 lessons for a substantial tool; add a `quiz` (4–5 Qs) and `resources`.

## JS string gotchas

- Use double-quoted strings with `\n\n` for paragraph breaks (see existing files).
- Inside double-quoted strings, quote inner phrases with `'single quotes'`.
- Avoid unescaped double quotes and stray backticks inside strings.

## Done = QA green + wired + committed

The track is not finished until `node scripts/academy-qa.js` passes, the
`<script>` tag is in `index.html`, and the change is committed.
