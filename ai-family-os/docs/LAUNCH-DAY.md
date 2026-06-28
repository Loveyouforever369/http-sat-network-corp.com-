# LAUNCH DAY — one runbook, here to live everywhere

The single sequence to take The AI Family public. Everything is built + staged; this is the order of
operations. Time estimate: ~one focused session for the first video, then it repeats on rails.

> Honest gates (only these need YOU): a rendered video FILE, channel connections, and one-time auths.
> The sandbox can't do those. Everything else is done and committed.

## Phase 0 — One-time setup (~30–45 min, once)
- [ ] **Render engine:** self-host Open-Generative-AI (`docs/open-generative-ai-setup.md`) — free, owns rendering. *(Or skip and use Meta AI→Flow free in-browser.)*
- [ ] **YouTube:** authorize the channel in Zapier (enables `upload_video`).
- [ ] **Other socials:** connect YouTube, TikTok, Instagram, Facebook, X, LinkedIn in **Postiz**.
- [ ] **Discord:** set `FAMILY_DISCORD_WEBHOOK` env var (for `scripts/discord-post.js`).
- [ ] **Handles:** claim **@TheAIFamily** everywhere (brand decision: The AI Family; Prometheus = flagship character).

## Phase 1 — Render the first video (~20–30 min)
- [ ] `node tools/build-work-orders.js` → open `automation/WORK-ORDERS.md`.
- [ ] Take **RQ-001 (The Living System)** — narration + voice are pre-extracted.
- [ ] Voice it (IndexTTS-2 / ElevenLabs / Kokoro per `config/voice-map.json`).
- [ ] Visuals: one clip per beat (Open-Generative-AI or Meta AI→Flow), consistent character per `config/character-bible.json`.
- [ ] Caption + music (Descript/CapCut), export long mp4 (16:9) + 3–6 Shorts (9:16).

## Phase 2 — Publish the first one (the proof) (~10 min)
- [ ] Host the mp4 at a public URL → **send it to me + "YouTube authed"** → I fire `upload_video`, return the video ID.
- [ ] Push the Shorts + caption (from `content/launch-posts.md`) via Postiz to TikTok/Reels/Shorts/FB.
- [ ] Fire the launch bank: `node scripts/discord-post.js` (Discord) + schedule the X/LinkedIn posts.
- [ ] Mark RQ-001 `published` + paste IDs (no ID = not published).

## Phase 3 — Roll the rest (rails)
- [ ] Repeat Phase 1–2 down the queue (RQ-002…RQ-015) — or run the **n8n flow** (`automation/n8n-blueprint.md` + `n8n-templates.md`) to batch it.
- [ ] Follow the **first-week schedule** in `content/launch-posts.md` (1 long + daily shorts).
- [ ] Turn on the daily chores: `tools/health.js`, `build-work-orders.js`, the n8n posters.

## Phase 4 — Measure + improve (weekly)
- [ ] Track per platform: views, watch time, saves, follows, DMs, booked calls.
- [ ] Weekly operator review → what hook/visual won → update prompts + the Tool Lab.
- [ ] Lock every result: win → `LEARNINGS.md`; miss → `MISTAKES-AND-LESSONS.md`; tool → `tool-ratings.json`.

## What's already DONE (staged + committed — the "launch" from our side)
- ✅ 15 pages (full funnel) · 26 episodes · **15 videos queued** with narration + voice extracted.
- ✅ Mission Control hub · Tool Lab · Guardian-lint · health 6/6 · character bible · 10 n8n workflows.
- ✅ Launch post bank (every platform) · publish runbook · render handoff · setup guide.

## The single highest-leverage action right now
**Render RQ-001 and send me the mp4 URL + "YouTube authed."** That one move flips us from
"staged" to "live," and everything after it is just repeating the rails. Everything is ready and waiting.
