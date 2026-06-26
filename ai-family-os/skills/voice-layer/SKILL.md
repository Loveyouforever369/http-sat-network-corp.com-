---
name: voice-layer
description: >-
  The voice and audio doctrine for the Agent OS. Use this skill automatically whenever a
  task involves voice agents, phone/call automation (inbound receptionists, outbound
  callers, lead-reply systems), text-to-speech, voiceover, audio narration for decks or
  video, voice cloning, transcription, or choosing/wiring any speech tool — even when not
  named. It encodes the engine choices (ElevenLabs for narration; Retell/Vapi on n8n for
  live agents), the MCP-vs-Agent-OS reframe, the routing of which tool does which job, the
  component truth (STT+LLM+TTS), and honest verify-before-relying rules.
---

# Voice Layer — Operating Doctrine

The voice and audio standard for every project. Two distinct jobs with different stacks —
never conflate them: **audio narration** (text → spoken audio) and **live voice agents**
(real-time phone conversations).

## The one reframe that prevents mistakes
Voice agents for the Agent OS **do not live as Claude.ai chat connectors.** They wire into
the **n8n core** via API + webhook — that is the production path. MCP is for letting Claude
(here or in Claude Code) *drive and build* them. Two layers: **engine in n8n, control via
MCP.** State this whenever someone asks "do I have the right MCP for voice agents" — the
question is half-wrong; the engine belongs in n8n.

## The component truth (say it when comparing platforms)
Every voice platform is the same three bricks: **speech-to-text → an LLM → text-to-speech.**
The platform's real value is **orchestration + latency**, not the bricks. **ElevenLabs is
the voice-quality brick sitting underneath most of them** — adding it raises quality even
when Retell or Vapi runs on top. So never frame these as either/or where they're actually
layered.

---

## Job 1 — Audio narration (text → audio)

**Engine: ElevenLabs.** Studio TTS, voice cloning, transcription, audio isolation. Free
tier ~10k credits/month. Pick the path by surface:

- **Claude Desktop / Claude Code / Cursor** — official local MCP via `uvx`:
  ```json
  { "mcpServers": { "ElevenLabs": {
      "command": "uvx", "args": ["elevenlabs-mcp"],
      "env": { "ELEVENLABS_API_KEY": "<your-key>" } } } }
  ```
  (Install `uv`; Windows needs Developer Mode in the client; credits required per call.)
- **Claude.ai web** — the web app uses URL-based remote connectors, **not** local `uvx`
  servers. Add a *hosted* ElevenLabs MCP endpoint via the connectors UI, or route through
  the existing Zapier connector. Verify the current hosted URL + auth first.
- **Inside the Agent OS (n8n)** — skip MCP; call the **ElevenLabs API directly** from an
  HTTP node for batch voiceover (text in → MP3 out → storage / attach to video).

**Routing for narration:**
- Sellable voiceover → **ElevenLabs** (MCP or n8n API).
- Multilingual spokesperson **video** → **HeyGen**.
- Quick social VO / B-roll → **Invideo**.
- Cleanup / denoise / transcription of recorded audio → **Descript** or **Adobe
  `media_enhance_speech`**.
- Throwaway draft narration inside an HTML deck → **Web Speech API** (free, browser-native,
  robotic — label it draft-grade, never sellable).

---

## Job 2 — Live voice agents (real-time calls)

Runs in **n8n via webhook.** Standard loop:
`call → voice platform (STT·LLM·TTS·telephony) → events webhook → n8n parses transcript →
updates CRM/Calendar + memory → triggers follow-up → all logged.`

**Platform pick (re-verify pricing/latency before committing):**
- **Retell — default.** Fastest to production, HIPAA included, no platform fee on its
  ~$0.07/min base, ~620ms latency, no-code builder + SDK, native n8n. Ships same day.
- **Vapi** — when you want to own every component and mix STT/LLM/TTS providers yourself.
  ~$0.05/min orchestration + provider costs; 1–3 days to first live call.
- **ElevenLabs Agents** — only when voice quality *is* the product; pairs with Job 1's
  engine. Telephony still needs Twilio/SIP; HIPAA gated to Enterprise.
- **LiveKit / Pipecat** — fully self-hosted real-time stack (the "own it" path).
- **Testing/eval:** **Cekura MCP** lets Claude Code trigger voice-agent test runs against
  Retell/Vapi/LiveKit/ElevenLabs — wire it into the commit gate.

**Always:** add guardrails + a clean human handoff. Capability without intent alignment is
a liability, not a feature. Never send client PII to a model/provider that can't hold it.

---

## The buying rule
One narration engine (**ElevenLabs**) + one live platform (**Retell**) covers ~95% of all
voice needs across the agency. Add Vapi/LiveKit only when a specific job demands provider
control or self-hosting — not because a list said to. Re-verify every free tier, per-minute
price, and HIPAA gate on the live provider page before committing budget or client data.
