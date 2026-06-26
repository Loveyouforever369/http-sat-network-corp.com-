# Avatars & Publishing — the plan (honest about what runs vs needs wiring)

This is how the AI Family characters get on screen, and how finished content actually
reaches people. Two honest corrections up front so we don't build on a wrong assumption:

- **Perplexity does not publish or post content.** It's a research/answer engine (and the
  Comet browser). Its real role here is **research & cross-reference** (the Scout/Sage
  job), not distribution. To "send our content out for everyone" we use **Postiz** (and
  email), not Perplexity.
- **Generating a real avatar video spends credits and is approval-gated.** It genuinely
  functions — it's not a mock — but each render needs your tap and HeyGen credits.

---

## 1) AI Avatars — making the characters function

**Engine:** HeyGen (avatar-first, lip-sync, multilingual) — connected via MCP. Synthesia
is the alternative; both are avatar specialists.

**Voice:** ElevenLabs is the quality layer (clone/select a distinct voice per character,
consent-first). Until wired, HeyGen's built-in voices work as drafts.

**Character → avatar/voice map (to lock):**
| Character | On-screen role | Avatar style | Voice |
|---|---|---|---|
| Sage | Signal Desk analyst | calm, observatory backdrop | measured, warm |
| Prometheus | strategist/mentor | cinematic, bronze/teal | resonant, uplifting |
| Cipher | tool-master | neon code foundry | fast, sharp |
| Atlas | builder | industrial automation bay | grounded, concrete |
| Nova | storyteller | luminous studio | bright, expansive |
| Luna | broadcaster | social command center | clear, friendly |
| Guardian | fact-checker | security vault | firm, trustworthy |

**Function path (per episode):**
`content/EP-*.md script → HeyGen (avatar_id + voice + script) → video → Descript (captions/clean) → Guardian gate → publish`

**Proof step (ready to fire):** generate **Sage** reading EP-0001's cold open as the first
real avatar clip. It will: spend HeyGen credits, need your approval tap, return a video URL.

**Needs wiring for full quality:** ElevenLabs voice per character (web: hosted/Pipedream
MCP; n8n: API). Consent + AI-voice disclosure on every published asset (Guardian rule).

---

## 2) Publishing — "send it out for everyone"

**Engine:** **Postiz** (connected, TOOL-101) — one-to-many to YouTube, Facebook,
Instagram, TikTok, LinkedIn, X, Threads, Pinterest. Needs **one-time per-platform auth**.

**Flow:**
`approved content + packaging (titles/desc/caption/thumbnail) → Postiz (schedule/publish to all channels) → log result → metrics back into the Signal Desk`

**Beyond social:**
- **Email** — the Lovable site's `subscribers` table + Gmail/Postiz for broadcasts.
- **The site** — new episodes appear on The AI Family site automatically (Episodes table).

**Guardian gate is mandatory before any publish.** Nothing ships without the fact-check +
AI-disclosure pass. Speed without a check is a faster mistake.

**Where Perplexity actually fits:** research and verification (find the story, cross-check
the claim) — feeding the front of the machine, never the publishing end.

---

## Real vs needs-wiring (honest labels)
- **Runs now:** Postiz publishing (after auth), HeyGen avatar render (credits + tap),
  Tavily/Nimble research, the site's subscriber capture.
- **Needs wiring:** ElevenLabs per-character voices; the n8n auto-publish loop; the
  multi-model council (OpenRouter/Ollama). None are blockers for a first manual run.
