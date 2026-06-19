# 🔥 Prometheus

**The immersive AI-director training platform.** From doers of tasks to directors of workflows — taught by three AI-avatar characters, practiced in a live prompt sandbox, and tested with seven arcade-style games.

This is a **self-contained, zero-build static app** at the root of this repo. It runs offline in any modern browser and deploys to Vercel (or any static host) in seconds.

---

## ▶️ Run it locally

No build step. From the repo root, either:

```bash
# Option A — just open it
open index.html        # macOS  (or double-click the file)

# Option B — serve it (recommended; needed for the live API integrations)
python3 -m http.server 8000
# → http://localhost:8000
```

## 🚀 Deploy to Vercel

```bash
vercel deploy --prod      # from the repo root
```

Or import the GitHub repo at vercel.com/new (Framework: **Other**, no build command) — it deploys as a static site automatically. A `vercel.json` is included (clean URLs + security headers).

---

## 🧭 What's inside

| Module | Lesson | Training | Game |
|---|---|---|---|
| **01 · The Paradigm Shift** | From Doers to Directors | Prompt Sandbox (graded /100 on Role·Task·Constraints·Output) | **Hallucination Hunter** |
| **02 · Vibe Coding & Instant Apps** | Generators vs. Living Systems | Scaffold an MVP (v0 → Cursor → Lovable) | **Prompt-to-Prod** |
| **03 · The Wealth Engine** | Clay & the Outbound Engine | Build a 6-step Clay waterfall | **The Credit Optimizer** |
| **04 · Agentic Orchestration** | Zapier vs. Gumloop/n8n | Build a Meeting Prep Agent | **Fix the Flow** |
| **05 · Faceless Media** | Automated Content Empires | Faceless Video Studio | **The Viral Editor** |
| **06 · Advanced Operations** | Deep Dives: Waterfalls · MCP · Living Software | MCP Gateway builder | **Chaos Engineering Sandbox** |

**Bonus game:** Module 1 also unlocks **The Prompt Debugger** (fix "AI slop" until it scores). All 7 games are also playable from the **Arcade** tab.

### Characters (HeyGen-ready cast)
Lessons are hosted by three AI-avatar instructors, each with a cinematic backdrop and voice:
- **The Architect** — backend & system design (deep, methodical) · server-room stage
- **The Catalyst** — marketing, sales & outbound (energetic) · bright agency stage
- **Byte** — beginner guide & sandbox assistant (warm, encouraging)

### Signature systems
- **Dynamic Learning Paths** — fail a game and the relevant character addresses you **by name** with a 30-second refresher (a personalized HeyGen video renders here once wired).
- **Adaptive soundscape** — generative Web Audio: ambient during lessons, a driving pulse during games (mute toggle in the nav).
- **AI dubbing selector** — language picker in the nav (wire a dubbing API for 175+ languages).

Plus: a holographic **skill tree** dashboard with progress rings, XP/mastery tracking, animated WebGL/canvas background, an avatar lesson player with character backdrops + B-roll layer + synced cinematic subtitles, an Arcade, and a pricing page.

### File map
```
. (repo root)
├── index.html            # app shell + views
├── vercel.json           # static deploy config
├── schema.sql            # Postgres + Drizzle schema (mirrors localStorage)
├── css/styles.css        # the full sci-fi visual system
├── js/
│   ├── data.js           # curriculum + characters + game design (source of truth)
│   ├── background.js      # animated neural-constellation background
│   ├── app.js            # router, skill tree, lesson player, arcade, learning paths, CONFIG
│   ├── audio.js          # adaptive Web Audio soundscape engine
│   ├── sandbox.js        # Prompt Sandbox + AI wiring + /100 grader
│   ├── trainings.js      # hands-on trainings (incl. MCP Gateway) + shared drag UI
│   └── games.js          # all 7 games
└── api-reference/
    ├── sandbox.ts        # Next.js route for live Claude/GPT (template)
    └── heygen.ts         # Next.js route for HeyGen avatar video (template)
```

---

## 🔌 Going live (demo mode → production)

Everything works in **demo mode** out of the box. Each integration is one config switch in `js/app.js` (`CONFIG`):

### 1. AI Prompt Sandbox (Claude / OpenAI)
- Deploy `api-reference/sandbox.ts` as a serverless route (`app/api/sandbox/route.ts`) on Vercel.
- Add `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables.
- Set `CONFIG.sandbox.endpoint = "/api/sandbox"`.
- **Never put model API keys in the browser** — the route keeps them server-side.

### 2. HeyGen Avatar Instructors
- Simplest: pre-render lessons and map URLs: `CONFIG.heygen.videos = { m1: "https://.../m1.mp4" }`. The lesson player swaps the animated avatar for the real video automatically.
- Or generate on demand with `api-reference/heygen.ts` + `HEYGEN_API_KEY`.

### 3. ElevenLabs narration (Multilingual v2)
- Wire a TTS route and set `CONFIG.elevenlabs = { endpoint: "/api/narrate", voices: { architect, catalyst, byte } }`.
- The lesson player already labels each character's voice; point playback at the stream when ready.

### 4. Cinematic B-roll (InVideo AI · Sora 2 · Veo 3.1)
- Render movie-like background clips per concept, then map: `CONFIG.broll = { m1: "https://.../m1-broll.mp4" }`.
- The lesson stage plays it as a backdrop behind the avatar automatically.
- Stylized deep-dive transitions (Crreo AI: Cyberpunk/Anime/Watercolor) and studio upscaling (Magnific) are asset-pipeline steps — produce the clips/images, then reference them via `CONFIG.broll` / image assets.

### 5. AI dubbing (175+ languages)
- The nav language selector sets `CONFIG.dubbing.lang`. Wire `CONFIG.dubbing.endpoint` to an AI dubbing API (e.g. ElevenLabs Dubbing / HeyGen) to translate narration + subtitles with lip-sync.

### 6. Stripe Payments
- Create **Stripe Payment Links** (no backend needed for static hosting).
- Add them: `CONFIG.stripe.paymentLinks = { operator: "https://buy.stripe.com/...", architect: "..." }`.

### 7. Accounts + Database (optional, the full stack)
- Progress is saved in `localStorage` using the exact shape of `schema.sql`.
- To go multi-device: stand up Supabase, run `schema.sql`, wire Drizzle (schema included in the file), add Better Auth, and swap the `localStorage` reads/writes in `app.js` (`load`/`save`) for DB calls keyed to the signed-in user.

---

## 🛠 Tech notes
- Pure vanilla JS (no framework, no bundler) → nothing to build, nothing to break.
- Drag-and-drop works with mouse **and** ▲▼ buttons (touch-friendly).
- Respects `prefers-reduced-motion`.
- The whole experience is data-driven from `js/data.js` — add a module or change a game by editing that one file.

---

## 🎓 The AI Mastery Academy

A deep, data-driven course library bolted onto Prometheus. Every track teaches a
top AI tool or discipline beginner → advanced, with **real in-browser narration**
(Web Speech API), copy-able **prompt playbooks**, **settings & features**
deep-dives, business + life use cases, and graded exercises.

**Architecture**

| File | Role |
|------|------|
| `js/narrator.js` | Narration engine. Web Speech API with sentence-synced teleprompter; plays a pre-rendered `audioUrl` (e.g. ElevenLabs) when a lesson supplies one. |
| `js/academy/_core.js` | Registry + schema defaults + self-contained progress/XP engine (feeds the nav XP badge). |
| `js/academy/*.js` | Content files. Each calls `ACADEMY.register({...})` once per track. Add a file (and a `<script>` tag) to grow the library — it scales without limit. |
| `js/academy.js` | Renderer: landing (search + filters), track pages, the long-form lesson reader, quizzes. |
| `css/academy.css` | Academy visual system (extends `css/styles.css`). |
| `scripts/academy-qa.js` | `node scripts/academy-qa.js` — loads every track in a sandbox and validates the schema. |

**Add a track:** create `js/academy/your-file.js`, register tracks against the
schema documented at the top of `js/academy/_core.js`, add a `<script>` tag in
`index.html`, then run `node scripts/academy-qa.js`.

**Go live with studio narration:** drop an `audioUrl` (an ElevenLabs render) on any
lesson and the narrator plays it instead of the browser voice — synced to the
teleprompter automatically.
