# n8n Blueprint — the render→publish loop (runs on your machine)

Turns the whole queue into one automated run. n8n lives on your machine (self-hosted), where
render + publish are reachable — the cloud sandbox can't do these. This is the wiring diagram.

## Inputs (already generated here)
- `config/render-queue.json` — what to render (13 items, `status: ready-to-render`).
- `config/voice-map.json` — the voice/engine/style per member.
- `automation/WORK-ORDERS.md` — the extracted narration + voice + targets (run `node tools/build-work-orders.js`).

## The flow (node by node)
1. **Manual / Schedule Trigger** — run on demand, or daily (respects free-tool daily caps).
2. **Read render-queue** (Read Binary File → JSON) → filter `status == "ready-to-render"`.
3. **Loop** over items (Split In Batches), then per item:
   1. **Voice** — call the member's engine from `voice-map` (voicebox local API / ElevenLabs / IndexTTS-2 Space) with the narration lines → audio clips.
   2. **Visuals** — generate per beat: Meta AI (draft) → Google Flow (final, consistent character + audio), or Wan/Kling. One short clip per narration line.
   3. **Assemble** — OpenMontage stitches clips + audio to the script; or Descript.
   4. **Caption + music** — OpenCut/Descript: burn captions, add the `music` cue, brand lower-third.
   5. **Export** — long mp4 (16:9) + 3–6 vertical Shorts (9:16) from the best beats.
   6. **Upload** —
      - YouTube: **Zapier `upload_video`** (the enabled action) with the long mp4.
      - Shorts/FB/IG/TikTok/X/LinkedIn: **Postiz** with the verticals + caption/hashtags from the `EP-*` file.
      - (Optional) Discord: `scripts/discord-post.js`.
   7. **Write back** — set the item's `status: published` + the returned **video/post IDs** in `render-queue.json`.
4. **Done** — notify (email/Discord) with the list of published IDs.

## One-time setup
- Authorize **YouTube** in Zapier; connect channels in **Postiz**; set keys for your chosen voice + video tools.
- Point n8n at this repo (or sync `render-queue.json` + `WORK-ORDERS.md` to the machine).

## The honesty rule (in the workflow)
- A node must **not** mark `published` unless the upload returned an ID. No ID → leave `ready-to-render` and log the error.
- Keep a human approval node before the first live publish; remove it once you trust the run.

## Fastest manual version (no n8n yet)
Open `automation/WORK-ORDERS.md`, take RQ-001's narration, voice it, render the beats on Meta AI →
Flow, caption in CapCut/Descript, upload. Then send me the mp4 URL + "YouTube authed" and I fire
`upload_video` from here. Each item you finish, flip its status + paste the ID.
