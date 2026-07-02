---
name: video-editor
description: >
  The AI Family's video-editing doctrine. Load this whenever cutting, captioning, scoring,
  or assembling a video — turning rendered clips + narration into a finished, on-brand piece.
  Pairs with skills/voice-layer (voices) and content/the-video-forge.html (the pipeline).
---

# Video Editor — the family's editing brain

> A render is raw footage. Editing is where "fine" becomes "finished." This is the grammar
> we cut by, the tools we use, and how we get sharper each time. **Train rule:** after every
> cut, log what worked in `LEARNINGS.md` and any miss in `MISTAKES-AND-LESSONS.md`.

## The honest tool map (what we can actually drive)
- 🟢 **Descript** (MCP, verified reachable here) — text-based editing, auto-captions, transcript
  export, filler-word removal, publish. **Our in-sandbox edit step — but AI-credit-gated** (see Tool Lab).
- ⭐ **CapCut desktop / Clipchamp** — the **free local replacement** (researched 2026-07): unlimited
  1080p watermark-free, auto-captions, TTS, transcription. CapCut = primary; Clipchamp = zero-install
  (built into Windows). Use for all local renders (`intel/descript-alternatives-2026-07.md`).
- 🟡 **OpenCut** (open-source CapCut alt, MCP/headless) & **CapCut** — final polish on the user's
  machine; no watermark/subscription. Catalogued in `docs/agent-stack-catalog.md` (verify before install).
- 🔴 Heavy render/generation (Kling/Wan/Veo/HeyGen) — on the user's machine / n8n, not here.
- Audio/score: **Soundtrack Director** owns it; voices per `config/voice-map.json` (Voice Lab).

## The grammar (how we cut)
1. **Hook in 3 seconds.** First frame = the payoff or the question. Cut the intro.
2. **One idea per beat.** Map cuts to the narration `script[]` beats — one visual change per line.
3. **Captions always.** Most watch on mute. Burn them in; brand lower-third; high contrast.
4. **Pace by platform.** Shorts/TikTok/Reels: fast, ~1.5–3s/shot. YouTube long: let key points breathe.
5. **Music ducks under voice.** Score sets mood; drop it ~6–10 dB under narration; swell on the CTA.
6. **B-roll covers the claim.** Show what the host says (a quote → the quote on screen).
7. **House look.** void-navy / gold / ember / teal; Fraunces + Sora; the character's color per speaker.
8. **End on the CTA.** Subscribe / comment keyword / link. One ask, clearly.

## The workflow (rendered clips → posted)
1. Pull the narration + voice from `config/render-queue.json` + `config/voice-map.json`.
2. Lay narration on the timeline; cut visuals to the beats.
3. Auto-caption (Descript), fix names/terms, style the captions.
4. Add the score (duck under voice), SFX accents on transitions.
5. Color/level pass; confirm 9:16 for verticals, 16:9 for long.
6. Guardian check: AI disclosed, claims sourced, no slop, one CTA.
7. Export; for one long → cut 3–6 vertical Shorts from the best moments.
8. Publish (Zapier/Postiz) — never mark "published" without a returned ID.

## The one rule
> **"AI video isn't dead — low-effort slop is."** Consistent characters, a real script, an
> expressive voice, captions, and a score that fits. That's the whole edge.

## Train yourself (the feedback loop)
- After each cut, note the single edit that most improved it → `LEARNINGS.md`.
- Any caption/sync/pacing miss → `MISTAKES-AND-LESSONS.md` so it's never repeated.
- When a pattern proves out (e.g., a hook style that retains), promote it into this skill.
