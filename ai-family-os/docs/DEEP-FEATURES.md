# Deep Features — making the agent OS run smoothly

The features that turn a pile of scripts into a *system that runs itself*. Honest status
on each: ✅ shipped, 🟡 partial, 🧪 proposed (designed, not yet built). Newest thinking on top.

## ✅ Shipped (2026-06-27, round 4)

- **Render→publish automation** — `tools/build-work-orders.js` extracts each queued video's exact
  narration + voice + targets into `automation/WORK-ORDERS.md` (13 copy-paste sheets), and
  `automation/n8n-blueprint.md` is the node-by-node workflow to render + publish the whole queue on
  the user's machine. Turns "blocked render" into a turnkey, one-run pipeline.

## ✅ Shipped (2026-06-27, round 3)

- **Mission Control** — `content/mission-control.html`. One hub to launch every external tool, open
  every page, and read system status. Solves "stop hopping between sites." (Auto-generation from
  config is the proposed next step.)
- **Business showcase** — `content/for-business.html` (EP-0305, Atlas): the crew as hireable roles,
  the busywork we automate, the honest agency-vs-AI math. Queued RQ-007.

## ✅ Shipped (2026-06-27, round 2)

- **Render-queue handoff** — `config/render-queue.json` + `tools/render-queue.js` (was proposed #4).
  The bridge over the render gate: a work order the user's machine / n8n executes (6 items queued).
- **Per-member voice map** — `config/voice-map.json` (was proposed #5). Each character → a specific
  Voice-Lab engine + style, wired into the render queue and health check.
- **Delegation playbook** — `docs/DELEGATION.md`. Crew→subagent roles + the "good habits" + the
  honest spend-limit lesson. Subagent delegation works but is monthly-capped.
- **Video-editor skill** — `skills/video-editor/SKILL.md`. Editing grammar + tool map (Descript
  drivable here; OpenCut/CapCut local) + a train-yourself feedback loop.
- **Agent stack catalog** — `docs/agent-stack-catalog.md`. The 14-tool open-source stack mapped to
  our organs, with verify-before-install honesty.
- **Guardian-lint** — `tools/guardian-lint.js` (was proposed #6). Auto-enforces the AI-disclosure
  rule on every narrated page; caught + fixed 3 real gaps (index, the-cast, story). Wired into health.
- **Memory index** — `tools/index-docs.js` → `docs/INDEX.md` (was proposed #8). The Librarian's
  delegated chore: a self-updating map of the whole OS.
- **Local-trio wiring** — `docs/local-trio-setup.md` (OpenCut + voicebox + OpenMontage) + registry
  entries; **free-tools shopping list** `docs/free-tools-to-get.md`.
- **Health check** now runs 6 checks (config · tool lab · scripts · desk · pipeline · guardian-lint).

## ✅ Shipped (round 1)

### 1. The Tool Lab — `config/tool-ratings.json` + `tools/tool-lab.js`
A living registry of every tool we've **actually tested**, with status (🟢 works / 🟡 partial /
🔴 blocked) and a rating for our use case. Blocked tools must carry a *lesson* so we never
waste cycles re-trying a dead end. This is the OS's memory of its own hands.
Run: `node tools/tool-lab.js`.

### 2. System health check — `tools/health.js`
One command that runs the config validator + the Tool Lab validator, confirms every
referenced episode script exists, and confirms the leader's-desk docs exist. Green/red in
one screen. Run it before every push. Run: `node tools/health.js`.

### 3. The leader's desk + lesson-locking routine
`CLAUDE.md` now loads the plan, the mistakes ledger, and the pre-flight at session start, and
codifies the routine: new lesson → `MISTAKES-AND-LESSONS.md` → (if behavioral) `ORCHESTRATOR-PREFLIGHT.md`
→ (if teachable) a Behind-the-Build episode. The system gets sharper every session by design.

## 🧪 Proposed next (designed — build in priority order)

### 4. Render-queue manifest — `config/render-queue.json`  ⭐ highest leverage
The bridge over our single hardest gate (video render is blocked from the sandbox). A manifest
listing each page awaiting render: source HTML, the narration `script[]`, the target voice,
and the destination (YT/Shorts/etc.). The user's machine / n8n reads it, renders, drops clip
URLs back into each page's `AUDIO[]`, and fires `upload_video`. Turns "blocked" into a clean handoff.

### 5. Per-member voice map — `config/voice-map.json`
Assign every member a specific voice from the Voice Lab (`intel/voice-tools-2026-06.md`) —
e.g. Grandpa Vellum → a warm low IndexTTS-2 voice, Luna → Qwen3-TTS designed voice. Kills the
"everyone sounds the same / robotic" problem and makes characters instantly recognizable by ear.

### 6. Auto-disclosure + source lint — `tools/guardian-lint.js`
Guardian as code: scan every `content/*.html` for the required "AI-generated host & voice"
disclosure and a sources line; flag any page missing them before publish. Makes honesty automatic.

### 7. Content calendar — `config/calendar.json` + `tools/next-up.js`
What posts, where, when. `next-up.js` prints today's drops across channels so the daily loop
has a single source of truth instead of ad-hoc decisions.

### 8. Memory index — `tools/index-docs.js`
Auto-generate `docs/INDEX.md` mapping every doc/episode/skill so a fresh session (or a new
family member) can find anything in one file. Memory you can navigate.

### 9. Council cross-check log — `logs/council/*.md`
When a real multi-model review happens, record it (model, prompt, verdict). Stops us from ever
*claiming* a council review that didn't occur — and builds a dataset of our own decisions.

### 10. Pipeline dry-run — `--dry-run` on the spine scripts
Print exactly what each pipeline *would* do without firing external calls. Safe rehearsal
before a live run; pairs with `health.js` as the pre-flight.

## The principle
Every deep feature answers one of three questions: *Does it work? (health) · What did we learn?
(memory) · Where does it run? (handoff).* Build features that make those answers automatic, and
the OS runs smoothly without a human holding it up.
