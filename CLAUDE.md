# CLAUDE.md — Prometheus project memory

> This file is auto-read by Claude Code at the start of every session. It is the
> real, durable "memory" for this project. (Claude cannot self-train or remember
> across sessions any other way — committed files like this one are the mechanism.)

## What this repo is

**Prometheus** — an immersive AI-education platform. A **zero-build, vanilla-JS
static app** at the repo root that runs offline in any browser and deploys to
Vercel as a static site. Two halves:

1. **The 6-module course** (`js/data.js` → `js/app.js`) — lesson + hands-on
   training + arcade game per module, hosted by three avatar characters
   (The Architect, The Catalyst, Byte).
2. **The AI Mastery Academy** (`js/academy/*.js`) — an *unlimited, data-driven*
   library of deep "mastery tracks," each a multi-lesson course on one AI tool,
   with real in-browser narration. **This is the growth engine** — every new
   tool we master becomes a track.

Goal of the whole project: **learn, teach, train, and inform people on how AI
actually works — deeply — using the family of agents as the curriculum.**

## Architecture (where things live)

| Path | Role |
|------|------|
| `index.html` | App shell + views + every `<script>` tag (academy files are listed here) |
| `js/data.js` | Source of truth for the 6 modules, characters, pricing tiers |
| `js/app.js` | Router, skill tree, lesson player, arcade, **`CONFIG`** (all live-integration switches) |
| `js/academy/_core.js` | Academy registry + **track schema** + XP engine |
| `js/academy/*.js` | One content file per group of tracks; each calls `ACADEMY.register({...})` |
| `js/academy.js` | Academy renderer (landing, track pages, lesson reader, quizzes) |
| `js/narrator.js` | Narration engine (Web Speech API; plays `audioUrl` if a lesson supplies one) |
| `scripts/academy-qa.js` | **Validator** — `node scripts/academy-qa.js`. Must pass before commit. |
| `css/styles.css`, `css/academy.css` | Visual system |
| `api-reference/*.ts` | Serverless route templates (sandbox, heygen) for going live |
| `docs/AGENT-OS.md` | **The operating model**: supervisor + agent crew + post/ship partners + role assignments |
| `.claude/skills/add-academy-track/` | Reusable skill: how to add a new track end-to-end |

## How to add an Academy track (the core build loop)

1. Create `js/academy/<file>.js` → call `ACADEMY.register({...})` (schema is
   documented at the top of `js/academy/_core.js`).
2. Add a `<script src="js/academy/<file>.js"></script>` line in `index.html`
   (with the other `js/academy/*` tags, ~lines 181–191).
3. Run `node scripts/academy-qa.js` → must print **"✓ All tracks valid."**
4. Commit. (Full step-by-step + the quality bar lives in
   `.claude/skills/add-academy-track/SKILL.md`.)

**Track color** must be one of: `blue purple teal violet gold`.
**Quality bar:** match the existing tracks (`vibe-coding.js`, `conversational.js`)
— specific, current, anti-fluff; real settings/features; a `promptPlaybook`,
`proTips`, `pitfalls`, an `exercise`, and a full `narration` per lesson; a quiz.

## Operating model (the "AI Family")

- **Claude Code (this assistant) = the Supervisor / Director.** Studies the
  codebase, refines the product, writes content, runs QA, commits. Learns the
  tools and turns each into a track and a skill.
- **The coding agents = the crew** (Aider, Cline, Roo Code, OpenHands, Goose,
  Gemini CLI, Continue, Codex CLI) — documented in the
  `open-source-coding-agents` Academy track and assigned jobs in `docs/AGENT-OS.md`.
- **MCP tools in this session = the partners who can post/ship** — e.g. Vercel
  (deploy), GitHub (PRs), Gmail (draft email), Canva/Gamma (design), Descript/
  InVideo (video), Lovable/Replit/Base44 (apps). **Honest status of each is in
  `docs/AGENT-OS.md` — most need the user to authorize/connect them first.**

## Guardrails (do not violate)

- **No fabricated metrics** in anything customer-facing ("87% fewer bugs", fake
  testimonials, invented star counts). Use real, verifiable, or clearly-hedged
  claims only. The existing content is honest — keep it that way.
- **API keys are server-side only.** Never put a model/API key in browser JS.
  Integrations flip on via `CONFIG` in `js/app.js` pointing at serverless routes.
- **No cloning a real, identifiable person's voice or likeness** (e.g. a named
  actor) for commercial/marketing use. Use original or properly-licensed voices.
- **Posting/emailing is not automatic here.** This container has no SMTP or
  social API keys. Produce ready-to-ship assets; the user posts or connects a
  partner tool. Say so plainly rather than implying something was sent.
- Business contacts in CTAs: **phone 725-314-9140**, **email
  michaelparks011@gmail.com**.

## Lessons learned — corrections (never repeat these)

> **Standing rule: whenever you fix a mistake, append it here** with the date and
> the fix. This file is auto-read at the start of every session, so logging a
> mistake once is how "future Claude" avoids repeating it. Keep entries short:
> what went wrong → what to do instead.

- **2026-06-23 — This sandbox can't deploy to hosting providers.** No
  `vercel`/`wrangler` CLI, no API tokens, and outbound to `api.vercel.com` /
  `api.cloudflare.com` is blocked (HTTP 403). The Vercel MCP `deploy_to_vercel`
  only returns *advice*, it doesn't push. → Don't promise to deploy from here.
  Keep the repo deploy-ready and give the user exact steps; the deploy runs on
  their side.
- **2026-06-23 — Production branch ≠ default branch.** The repo default branch
  is `claude/lending-platform-major-overhaul-NW144` (a *different* project); our
  site is on `claude/sweet-knuth-gem84c`. → When wiring any host, explicitly set
  its production branch to `claude/sweet-knuth-gem84c`, or it deploys the wrong site.
- **2026-06-23 — Read before Edit.** The Edit tool fails if the file wasn't Read
  in this session. → Read the file (or the target region) before editing it.
- **2026-06-23 — Don't estimate Academy counts.** I guessed "19 tracks/66
  lessons"; the real total was 30/101. → Get track/lesson counts from
  `node scripts/academy-qa.js`, never from memory.

## Run / deploy

```bash
python3 -m http.server 8000   # local: http://localhost:8000
node scripts/academy-qa.js    # validate academy content
vercel deploy --prod          # static deploy (or import repo at vercel.com/new)
```

## Branch

Active development branch: `claude/sweet-knuth-gem84c`. Commit and push there.
Do not open a PR unless the user asks.

## Current state (update as we go)

- Academy: **30 tracks, 101 lessons** (per `node scripts/academy-qa.js`).
  Newest: **Open-Source AI Coding Agents & Terminals**
  (`js/academy/coding-agents.js`, 6 lessons) — Aider, Cline, Roo Code,
  OpenHands, Goose, Gemini CLI, Continue, Codex CLI.
- Next candidates: a member-role pass (`docs/AGENT-OS.md`), social content kits
  per track, and wiring real narration `audioUrl`s when a TTS partner is connected.
