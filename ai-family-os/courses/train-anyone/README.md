# Course: Train Anyone — Run the AI Family Operating Method

**Who it's for:** a brand-new person (or a new family member) who needs to go from zero to
shipping honest, on-brand AI content with the family's system. No prior context required.

**Promise:** by the end you can run one full loop — sense → think → make → check → remember →
teach — and know exactly where every capability lives.

---

## Module 0 — The one idea
We're not building a tool. We're building a **living system**: specialized roles, a routing
brain, a quality gate, and a memory of mistakes. Read `content/the-living-system.html` first —
it's the whole philosophy in five minutes. Mission: **build the biggest AI brand by *educating*
people on what AI can really do — and doing it for them.** Audience: homeowners first, business
owners second. Pattern, every time: **educate → show → book a call.**

## Module 1 — The two honesty rules (never break)
1. **A skill is instructions, not powers.** Memory changes *how* we work; it doesn't summon
   models or open apps. Real capability = wiring (MCP, CLIs, API keys, n8n).
2. **Say where a capability lives.** Never claim an action happened that didn't. "I can't yet"
   beats a confident wrong "done." This is why people will trust the brand. (Guardian enforces it.)

## Module 2 — The desk (read these at the start of every session)
- `docs/MASTER-PLAN.md` — where we are, what's next.
- `docs/MISTAKES-AND-LESSONS.md` — every mistake → the locked rule. **Read it so you don't repeat it.**
- `docs/ORCHESTRATOR-PREFLIGHT.md` — the checklist to run *before* acting.
- `CLAUDE.md` — the operating memory that loads automatically.

## Module 3 — Know your hands (tools)
Run `node tools/tool-lab.js`. 🟢 = use freely. 🟡 = works after a setup step. 🔴 = blocked
here, runs on the user's machine / n8n — **don't waste time retrying these.** That scorecard
is the family's memory of what works; trust it before reaching for a tool.

## Module 4 — The house style (how everything looks & sounds)
Every page is **one self-contained HTML file**, zero external deps except Google Fonts:
- Palette: void-navy `#0a0e1a`, gold `#f5b942`, ember `#e2572b`, teal `#54d6c4` + character colors.
- Fonts: Fraunces (display), Sora (body), JetBrains Mono (labels).
- Voice: in-page Web Speech narration with an `AUDIO[]` array hook — drop ElevenLabs / IndexTTS-2
  clips in for the final cut (see `intel/voice-tools-2026-06.md`). Respect `prefers-reduced-motion`.
- Copy clean templates: `content/signal-desk.html`, `content/the-living-system.html`.

## Module 5 — The loop (do this to ship one piece)
1. **Sense** — `Tavily` for anything time-sensitive; favor primary sources.
2. **Think** — pick the host (Luna=homeowners, Atlas=business, Sage=news, Cipher=build).
3. **Make** — write the script (`content/EP-XXXX-*.md`), build the page from a template.
4. **Check** — Guardian pass: every stat sourced, AI host disclosed, no unkept promise.
5. **Remember** — register it in `config/family.json`; run `node tools/health.js` (must be green).
6. **Teach** — if you learned something, append to `MISTAKES-AND-LESSONS.md`.

## Module 6 — Publish (where it actually fires)
- **Discord:** `node scripts/discord-post.js` with `FAMILY_DISCORD_WEBHOOK` — runs on the
  user's machine (blocked from the sandbox).
- **YouTube:** Zapier `upload_video` — needs a rendered file + one-time YT auth (user side).
- Never mark something "posted" without a returned ID. (Tool Lab rule.)

## Hands-on: your first drop (30–45 min)
1. `node tools/health.js` — confirm the system is green.
2. Pick a homeowner pain (e.g. "is this contractor quote fair?").
3. `Tavily` one real, sourced stat.
4. Copy `content/signal-desk.html` → write a 5-point, Luna-hosted page; edit the `script[]`.
5. Register it as an episode in `config/family.json`; run `node tools/health.js` again (green).
6. Add a one-line lesson to `MISTAKES-AND-LESSONS.md` if anything surprised you. Commit.

## Graduation
You can run the loop, you respect the two honesty rules, your health check is green, and you
left the system one lesson smarter than you found it. That's the whole job. Welcome to the family.

---
_Companion course: `courses/playwright-mcp/` (driving a browser as an agent). Master doctrine:
`skills/genesis-grid/`._
