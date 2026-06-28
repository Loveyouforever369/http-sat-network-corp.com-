# Setup — Open-Generative-AI (own the render engine, free)

The repo that cracks our render bottleneck: **github.com/Anil-matcha/Open-Generative-AI**
(21k★, MIT, self-hosted, 200+ image/video models — Flux, Kling, Sora, Veo, Wan, Seedance).
Self-host it on your machine and the 15 queued videos can render here instead of being blocked.

> Honest note: the **app is free + MIT** (you run the UI). Generating through the 200+ models likely
> routes via a unified model API (the repo lists `muapi`) or your own provider keys — some have free
> tiers, some cost per render. So "free" = the studio + open models you self-host; premium models may
> need a key. **Verify each step against the repo's current README** — these are general Node steps.

## Prerequisites (Windows)
- **Node.js 18+** and **Git**. (Easiest on Windows: install Node from nodejs.org; use **WSL2/Ubuntu** if a step wants `make`/bash.)
- A code editor (VS Code) is handy but optional.

## Install + run (general — confirm with the README)
```bash
git clone https://github.com/Anil-matcha/Open-Generative-AI.git
cd Open-Generative-AI
npm install            # install dependencies (or pnpm/yarn if the README says so)
cp .env.example .env   # if present — add any model/API keys here
npm run dev            # start the local studio (often http://localhost:3000)
```
Open the local URL in your browser → you have the studio. Add keys in `.env` for whichever models
you want (start with the free/open ones: Flux, Wan).

## Wire it into our pipeline
1. `node tools/build-work-orders.js` → open `automation/WORK-ORDERS.md`.
2. For **RQ-001** (The Living System): copy the narration beats; generate one clip per beat in
   Open-Generative-AI (use a consistent character ref per `config/character-bible.json`).
3. Voice the narration (engine per `config/voice-map.json` — Grandpa Vellum → IndexTTS-2).
4. Assemble + caption (Descript/CapCut), add the music cue, export long mp4 + 3–6 vertical Shorts.
5. Host the mp4 somewhere public (Drive/S3) → **send me the URL** + "YouTube authed" → I fire
   `upload_video` and return the video ID. Or push via Postiz to the other channels.
6. Mark the queue item `published` + paste the ID (honesty rule: no ID = not published).

## Or fully automate it (n8n)
Point the n8n flow in `automation/n8n-blueprint.md` at your local Open-Generative-AI endpoint for the
"visuals" node → the whole `render-queue.json` runs on a schedule.

## After your first real render
Update `config/tool-ratings.json`: flip **Open-Generative-AI** from `untested` → `works` (🟢) with a
one-line note on what worked, or `blocked` (🔴) + the reason. That's how it enters the Tool Lab for real.

## If you get stuck
Paste the README's install section or any error here and I'll turn it into exact, corrected steps
(I can't open the repo's files from this sandbox — scope-locked to your repo — but I can debug from text).
