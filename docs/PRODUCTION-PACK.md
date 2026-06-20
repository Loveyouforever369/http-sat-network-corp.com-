# 🎬 Prometheus — Media Production Pack

Everything you (or a future automated pass) need to drop **studio narration, section films, and realistic images** into the live Academy. The app already has the **slots** — this pack has the **prompts + settings** to fill them.

> Why a pack instead of generated files? This build environment's firewall blocks the image/video tools' hosts and can't host their output. So the assets are authored where they belong (your Firefly / OpenART / ElevenLabs account), then the URLs drop into the slots below.

---

## 1) The drop-in slots (where assets plug in)

| Asset | Slot | File |
|------|------|------|
| Per-section **film** | `ACADEMY.sectionVideo["<Category>"] = "<url>"` | `js/academy/section-video.js` |
| Per-section **realistic image** | `ACADEMY.sectionImage["<Category>"] = "<url>"` | `js/academy/section-video.js` |
| Per-lesson **pro narration** (ElevenLabs MP3) | add `audioUrl: "<url>"` to that lesson object | `js/academy/*.js` |
| **Intro film** (Invideo/OpenART) | `FILM_URL` constant | `js/intro.js` |

Category names (use exactly): `Foundations`, `Conversational AI`, `Image & Design`, `Video & Avatars`, `Audio, Voice & Music`, `Automation & Agents`, `Vibe Coding`, `Business & Life Playbooks`.

Host images/MP4s anywhere public (Cloudflare R2/Pages, S3, GitHub raw, a CDN) and paste the URL. After editing, re-run `bash scripts/deploy-pages.sh "add section media"`.

---

## 2) 🔊 ElevenLabs narration

The app narrates every lesson in-browser already. For **studio voiceover**, render each lesson's `narration` text (it's in the track data) and the intro script (below) in ElevenLabs, then set `audioUrl`.

**Global settings (narration):** Model **Eleven Multilingual v2** (or v3 for expressiveness). Stability **45–55**, Similarity **80**, Style **0–15**, Speaker Boost **on**. Lower stability ~35 for the high-energy voices.

**Voice casting by instructor persona** (pick library voices that match):

| Instructor | Used in | Voice character |
|-----------|---------|-----------------|
| Byte | Foundations, Productivity, Everyday Life | warm, friendly, encouraging (mid) |
| Nova Reyes | ChatGPT | fast, bright, confident (female) |
| The Architect | Claude, AI Engineering, Agents, Legal | deep, calm, authoritative (male) |
| Dr. Aria Vance | Perplexity, NotebookLM | precise, curious, measured (female) |
| Sofia Lang | Gemini, Marketing, Sales, Real Estate | warm professional, energizing (female) |
| Iris Vale | Image & Design | crisp, art-director cadence |
| Mara Quinn | Video & Avatars | cinematic, decisive |
| Theo Sound | Audio/Voice/Music | warm, detail-driven |
| Kai Mercer | Automation, Make/Zapier, Data, Finance | methodical, clear (male) |
| Dev Rao | Vibe Coding | pragmatic, sharp |
| The Catalyst | AI Agency | high-energy, hype |

**Tip:** Keep one voice per instructor for continuity. Use the **Dubbing** feature to localize.

---

## 3) 🎥 Per-section films (OpenART / Veo / Kling, or Invideo)

For each section, generate a 20–40s film (assemble 4 short shots, or feed the script to Invideo). Brand look: **dark, futuristic, cinematic, volumetric light, neon accents** (purple `#a855f7`, electric `#22d3ee`, gold `#f5c518`). 16:9, subtle slow camera, captions.

Shot prompts (OpenART → pick Veo 3.1 for native audio or Kling for motion):

**Foundations** (accent purple)
1. `Macro: a single glowing word "PROMPT" forming from particles on a dark grid, volumetric purple light, slow push-in, cinematic`
2. `A vague scribble morphs into a clean structured diagram (Role · Task · Constraints · Output), holographic UI, dark studio`
3. `A figure at a console, screens snapping into focus around them, electric-blue glow`
4. `Text resolves: "Become the director" — neon, cinematic, slow dolly`

**Conversational AI** (teal)
1. `Four glowing orbs (assistants) around a person at a round holographic table, teal light, cinematic`
2. `Close-up of a chat UI streaming a confident answer with citations, dark mode, shallow depth of field`
3. `A brain-trust of light beams converging into one mind, futuristic`

**Image & Design** (violet)
1. `A sentence of text dissolving into a stunning photorealistic image, paint-to-photo morph, gallery lighting`
2. `An art director swiping through generated variations on a glass wall, violet neon`
3. `A brand image rendering in 4K with parameter sliders glowing beside it`

**Video & Avatars** (gold)
1. `A still photo coming alive into cinematic motion, film-set lighting, gold accents`
2. `A lifelike AI avatar presenter speaking to camera in a futuristic studio`
3. `A storyboard of shots assembling on a timeline, neon, cinematic`

**Audio, Voice & Music** (electric)
1. `A waveform of light pulsing in a dark studio, electric-blue, volumetric`
2. `A whisper turning into a glowing voiceover waveform; then notes forming a song`
3. `A globe with language tags lighting up (dubbing), cinematic`

**Automation & Agents** (blue)
1. `Nodes connecting on a dark canvas, data pulses flowing between apps, blue neon`
2. `An autonomous agent (glowing core) reasoning and dispatching tasks at night`
3. `An inbox/CRM clearing itself, hands-free, time-lapse, cinematic`

**Vibe Coding** (cyan)
1. `A developer describing an app aloud as code and UI assemble themselves, cyan glow`
2. `An app building live in a browser from a single prompt, futuristic`
3. `Idea sketch → working product, morph transition, cinematic`

**Business & Life Playbooks** (gold)
1. `A one-person command center of dashboards (marketing, sales, life), gold neon`
2. `A pipeline filling itself with leads; a calendar reclaiming hours, time-lapse`
3. `A person stepping back as systems run around them, confident, cinematic`

Then: `ACADEMY.sectionVideo["Foundations"] = "https://...";` etc.

---

## 4) 🖼 Realistic images per section (creative image tool)

Use **Adobe Firefly** (commercial-safe), **Leonardo**, **Ideogram**, or **Canva Magic Media** — not Midjourney, per your call. Aspect **16:9**, photoreal, cohesive dark-neon brand. Paste each into `ACADEMY.sectionImage[...]`.

- **Foundations** — `Photorealistic dark futuristic workspace, a glowing holographic prompt-structure diagram floating above a desk, volumetric purple light, cinematic, 16:9, ultra-detailed`
- **Conversational AI** — `Photorealistic scene: a person at a sleek desk surrounded by four softly glowing AI assistant orbs, teal ambient light, depth of field, cinematic, 16:9`
- **Image & Design** — `Photorealistic art studio of the future, a giant screen rendering a vivid image from text, violet neon, creative, 16:9`
- **Video & Avatars** — `Photorealistic film studio, a lifelike digital avatar presenter under cinematic gold key light, cameras and screens, 16:9`
- **Audio, Voice & Music** — `Photorealistic dark audio studio, glowing waveform hologram and a microphone, electric-blue volumetric light, cinematic, 16:9`
- **Automation & Agents** — `Photorealistic control room with flowing data nodes on glass screens connecting apps, blue neon, cinematic, 16:9`
- **Vibe Coding** — `Photorealistic developer desk where an app UI assembles itself on screen from spoken words, cyan glow, futuristic, 16:9`
- **Business & Life Playbooks** — `Photorealistic personal command center of glowing dashboards for marketing, sales and life, warm gold neon, cinematic, 16:9`

Style suffix to append to any: `, professional photography, sharp focus, cohesive dark UI aesthetic, subtle film grain, no text, no watermark`.

---

## 5) Intro film script (already wired to `FILM_URL` in `js/intro.js`)

Re-render in OpenART/Invideo anytime; the in-site narrated intro (`PROM.playIntro()`) is independent and always works. Script:

> What if you could direct artificial intelligence the way a film director runs a set? Meet Alex — drowning in busywork. Then Alex found Prometheus, the AI Mastery Academy… *(full script in `js/intro.js` SCENES + the Invideo generation).*  

Render it, then update `FILM_URL`.

---

*Generated as part of the Prometheus build. Re-deploy after any edit with `bash scripts/deploy-pages.sh "msg"`.*
