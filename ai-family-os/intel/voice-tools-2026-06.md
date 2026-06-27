# Voice Lab — Unique TTS / voice tools, found & rated (2026-06-27)

**Why:** the family's #1 quality bug has been *robotic voices*. This is the scouting
report — unique, mostly open voice tools, pulled live and rated for our use. Echo owns
this layer; Soundtrack Director pairs it with music.

**How gathered (honest):** Hugging Face Hub + Spaces search (authenticated as `kingtut369`)
and a live Tavily web sweep, both run 2026-06-27. Likes/trending are HF figures at pull
time. Ratings are *ours*, for the AI Family use-case (narration + character voices), not
universal scores. Re-verify quarterly — this space moves fast.

## The shortlist (open / self-hostable — the volume tier)

| Tool | What makes it unique | Likes | Our rating | Use it for |
|---|---|---:|:---:|---|
| **Kokoro TTS v1.0** (`hexgrad/Kokoro-TTS`) | Tiny, fast, shockingly natural for its size; runs cheap/local | 3382 | ★★★★★ | Default draft narration; high volume, low cost |
| **Qwen3-TTS** (`Qwen/Qwen3-TTS`) | Voice *design* + cloning + presets in one; strong multilingual | 1991 | ★★★★★ | Character voices; designing a distinct voice per member |
| **IndexTTS-2** (`IndexTeam/IndexTTS-2-Demo`) | **Emotion control** — voice *and* feeling, separately | 816 | ★★★★★ | The robotic-voice fix; emotional narration beats |
| **OmniVoice** (`k2-fsa/OmniVoice`) | Zero-shot voice cloning across **600+ languages** | 1063 | ★★★★☆ | Reaching non-English homeowners/business owners |
| **OpenVoice** (`myshell-ai/OpenVoice`) | Clone a voice from a *short* clip; tone control | 1132 | ★★★★☆ | Consistent recurring character voice from one sample |
| **Chatterbox Multilingual** (`ResembleAI/Chatterbox-Multilingual-TTS`) | 23 languages, clean quality | 402 | ★★★★☆ | Multilingual shorts |
| **VoxCPM** (`openbmb/VoxCPM-Demo`) | Nano model, very low footprint | 634 | ★★★☆☆ | Edge/low-resource fallback |
| **LongCat-AudioDiT-3.5B** (`9r4n4y/LongCat-AudioDiT...`) | Diffusion-transformer TTS, MIT, commercial-use, zero-shot | — | ★★★☆☆ | Experiment — newest architecture, watch it mature |

## The paid / hosted tier (pay for reliability on the hard 10–20%)
From the live web sweep (verify pricing at source — June 2026):
- **ElevenLabs** — still the quality bar for finished narration. Our `AUDIO[]` hook in every
  page is built to drop ElevenLabs (or IndexTTS-2) clips straight in.
- **Cartesia** — low-latency, a common Pipecat/LiveKit TTS plugin.
- **xAI voice stack** — TTS + STT in 25 languages + custom voice cloning, now GA to devs.
- **HeyGen** — avatar + multi-language TTS + lip-sync (avatar video, gated from this sandbox).

## Live-agent orchestration (when voices need to *talk back*)
For Retell/Vapi-style live agents (per `skills/voice-layer/`), the 2026 field:
- **LiveKit** (open-source, WebRTC, max control) · **Pipecat/Daily** (open, Python, vendor-neutral)
  · **Vapi** (managed, no-code Flow Studio) · **Retell** (fast deploy). Engine in n8n, control via MCP.

## Decisions locked
1. **Default draft voice → Kokoro v1.0** (free/local, natural enough for drafts).
2. **Character voices → Qwen3-TTS** (design a unique voice per member) + **OpenVoice** to keep it consistent.
3. **Emotional / hero narration → IndexTTS-2** (emotion control) or **ElevenLabs** for the final cut.
4. **Multilingual reach → OmniVoice / Chatterbox.**
5. Wire chosen engine into **n8n**, render clip files, drop URLs into each page's `AUDIO[]` array.

## Honest limits
- These were found and rated from metadata + descriptions; **not yet A/B listening-tested by us**.
  Next step: render the same 2 lines through Kokoro / Qwen3-TTS / IndexTTS-2 and pick by ear.
- Running any of them = wiring (HF Space API, local GPU, or provider API). A skill names the
  tool; it doesn't summon it. See `skills/voice-layer/`.

## Sources
- Hugging Face Hub + Spaces search (2026-06-27, authed) — likes/trending as shown.
- Tavily web sweep (2026-06-27): assemblyai.com, deepgram.com, cekura.ai, bentoml.com,
  adventuresincre.com (tool roundups), github.com/Zijian-Ni/awesome-ai-agents-2026.
