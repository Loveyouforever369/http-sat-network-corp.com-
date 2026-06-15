# PROMETHEUS // OS — Avatar Edition

A cinematic, narrated AI-literacy briefing (42 screens, 7 chapters) — now hosted
by **your own robotic AI avatar**, with a futuristic heads-up interface and a
read-along deep-dive transcript on every slide.

**Open:** `prometheus.html` (single self-contained file — no build, no server needed).

---

## What's new in this edition

| Upgrade | What it does |
| --- | --- |
| **Holographic avatar host** | Your robotic-avatar video (`assets/media/avatar.mp4`) is docked on every slide inside a holographic ring with scanlines, an audio-reactive waveform, and a live `● NARRATING` status. It lights up while the narration speaks and settles to standby between slides. |
| **Cinematic host intro** | On the title screen the avatar takes over full-screen and **introduces the briefing in your own recorded voice** (the avatar clip's own audio), then docks to the corner. |
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

## Narrate every slide in *your* real voice (optional, 3 steps)

The deck ships narrating with a built-in host voice (the avatar is the on-screen
narrator). To hear **your** cloned voice on all 42 screens:

1. **Clone** — In ElevenLabs → *Add Voice → Instant Voice Clone*, upload the full
   reference `assets/voice/calaif_voice_sample.wav` (the 5½-minute take included here).
2. **Render** — In the deck, open *Use my voice → Download script*; it exports every
   slide's narration as a numbered text file. Render each block in your cloned voice
   and save them `slide-01.mp3`, `slide-02.mp3`, …
3. **Load** — *Use my voice → Load voice files*, select all the MP3s at once. The deck
   maps them by number and the avatar then lip-syncs to your own voice. Everything
   stays in your browser — nothing is uploaded.

## Assets

```
prometheus.html                      the presentation (single file)
assets/media/avatar.mp4              your robotic AI avatar — the on-screen host
assets/voice/voice-signature.wav     48s compact voice signature (in-page player)
assets/voice/calaif_voice_sample.wav full 5½-min reference for voice cloning
```

## Notes

- Best viewed in a desktop browser (Chrome/Edge/Safari) with sound on; headphones
  recommended. The host's audio-reactive waveform and the title self-intro use the
  Web Audio API and the avatar clip's own audio.
- All animation respects `prefers-reduced-motion`.
