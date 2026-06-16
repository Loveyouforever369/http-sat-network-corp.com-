# PROMETHEUS // OS — Avatar Edition

A cinematic, narrated AI-literacy briefing (42 screens, 7 chapters) — hosted by a
**procedural holographic AI host** (a live wireframe-sphere core, rendered entirely
in SVG/CSS — no video file), with a futuristic heads-up interface and a read-along
deep-dive transcript on every slide.

**Open:** `prometheus.html` (single self-contained file — no build, no server needed).

---

## What's new in this edition

| Upgrade | What it does |
| --- | --- |
| **Procedural AI host core** | A holographic wireframe-sphere entity (rotating meridians, energy core, scan beam, audio-reactive voice ripples) is docked on every slide with a live `● NARRATING` status and equalizer. It pulses to the narration's amplitude and settles to standby between slides. No uploaded video is used. |
| **Cinematic boot intro** | On the title screen the host core powers up full-screen with a typed boot console (`initializing host core … voice synthesis online …`), then narrates the opening and docks to the corner. |
| **Futuristic visuals** | An animated FX background (receding perspective grid, drifting particles, vertical data-streams), top telemetry HUD with a live mission clock and chapter readout, corner brackets, scan-sweeps over every diagram, and staggered slide entrances. |
| **Deep-dive transcript** | Press **D** (or the `≡` button) to slide open the full narration for the current slide as elegant, readable text — the "more vivid explanation," in writing — plus the key on-slide points. |
| **Voice signature** | The voice modal plays your authentic 48-second voice **signature** (`assets/voice/voice-signature.wav`) — the reference used for cloning. |

## Controls

- **→ ← / Space** — move between slides
- **P** — pause / resume the narration
- **D** — open / close the deep-dive transcript
- **F** — fullscreen
- **↻** — auto-advance (slides follow the voice)
- Hover the avatar and tap **▾** to minimize / expand the host

## Narrate every slide in *your* real voice

The deck ships narrating with a built-in host voice. Two ways to make it **your** voice —
both keep your audio entirely on your device (nothing is uploaded anywhere):

### A. Record it yourself — the Record Studio (no account, works offline)
1. Open the deck and click the **🎙 button** in the control bar (or press **R**).
2. Allow your microphone. The studio shows each slide's script — press **● REC**, read it,
   press **■ STOP**. Use **review / redo** to get it right, then **next ›**.
3. When you've recorded the slides you want, hit **✓ Done — play the deck in my voice**.
   The avatar now narrates in your recordings and reacts to your real voice.

Recordings are saved in your browser (IndexedDB) and **survive a refresh**. Use
**⬇ Save backups** to download them as `slide-01.webm`, `slide-02.webm`, … Best in
Chrome, Edge, or Firefox; if recording is blocked, open the deck over `http(s)`/localhost
(a `file://` page can have the mic disabled in some browsers).

### B. AI clone of your voice (ElevenLabs)
1. In ElevenLabs → *Add Voice → Instant Voice Clone*, upload `assets/voice/calaif_voice_sample.wav`.
2. *Use my voice → Download script* exports every slide's narration, numbered.
3. Render each block in your cloned voice as `slide-01.mp3`, `slide-02.mp3`, … and load them
   via *Use my voice → Load voice files*.

## Assets

```
prometheus.html                      the presentation (single file; the AI host is pure SVG/CSS)
assets/voice/voice-signature.wav     48s compact voice signature (in-page player)
assets/voice/calaif_voice_sample.wav full 5½-min reference for voice cloning
```

## Notes

- Best viewed in a desktop browser (Chrome/Edge/Safari) with sound on; headphones
  recommended. The host's audio-reactive waveform and the title self-intro use the
  Web Audio API and the avatar clip's own audio.
- All animation respects `prefers-reduced-motion`.
