# Local Trio Setup — OpenCut + voicebox + OpenMontage

The three free, local-first tools we adopt first (from `docs/agent-stack-catalog.md`). They
upgrade the **Video Forge** and **Voice Lab** at zero cost — and they live on **your machine /
n8n**, which is already where our heavy media work runs (the sandbox can't render or clone repos).

> **Verify first (Guardian):** repo URLs are from the source video, not verified by us. Before
> installing, confirm the repo exists, read the README, and check the license. Record the real
> result in `config/tool-ratings.json` afterward (🟢/🔴 + a lesson) — same rule as every tool.

## What each one becomes in our pipeline
| Tool | Forge station it powers | Replaces / beats | Our use |
|---|---|---|---|
| **OpenMontage** | MOTION + CUT | paid agentic video tools | Turn an episode script → an edited video using real footage ("no slop") |
| **voicebox** | VOICE | ElevenLabs (paid) | Local zero-shot voice clone → a distinct voice per character (`config/voice-map.json`) |
| **OpenCut** | CUT | CapCut (closed) | Final polish: captions, trims, transitions; headless/MCP for agent-driven edits |

## Install (on your machine — high level; follow each repo's README)
```bash
# 1) OpenMontage — agentic video production
git clone https://github.com/calesthio/OpenMontage.git && cd OpenMontage && make setup
# 2) OpenCut — open-source CapCut alt (web/desktop; check releases for prebuilt)
git clone https://github.com/OpenCut-app/OpenCut.git    # then follow README (npm i / desktop build)
# 3) voicebox — local voice cloning studio (Tauri + Python; or prebuilt from voicebox.sh)
git clone https://github.com/jamiepine/voicebox.git
```
Add OpenCut's MCP server to your Claude Code config so the family can drive edits directly.

## How it connects to what we already built
1. **Pick a render job** from `config/render-queue.json` (6 are queued: RQ-001…RQ-006).
2. **Voice:** look up the host's engine in `config/voice-map.json`. Point voicebox at that
   character's reference clip → generate the narration from the page's `script[]`.
3. **Assemble:** feed the script + narration to **OpenMontage** → an edited cut.
4. **Polish:** finish in **OpenCut** (captions, brand lower-third, music duck) per `skills/video-editor/SKILL.md`.
5. **Drop** the clip URL into the page's `AUDIO[]` array and/or export the mp4.
6. **Publish** via Zapier `upload_video` (YouTube) / Postiz (others). Update the queue item's
   status + the returned ID. Never mark "published" without an ID.

## n8n wiring (automate the loop)
Trigger → read `render-queue.json` for `status: ready-to-render` → voicebox (voice) → OpenMontage
(assemble) → OpenCut headless (polish) → upload (Zapier/Postiz) → write status + ID back. That
turns the whole forge into a button.

## Status
Registered in `config/tool-ratings.json` as **untested · install-pending** (not yet run by us).
Flip each to 🟢 works (or 🔴 with a lesson) after the first real render on your machine.
