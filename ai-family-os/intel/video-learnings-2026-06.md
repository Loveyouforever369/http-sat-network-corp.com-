# Video Learnings — transcribed from the best AI-video creators (2026-06-27)

Gathered + transcribed top AI-video tutorials via Tavily and mined the workflows. These upgrade the
Video Forge + character consistency. Sourced; verify free tiers before relying.

## ⭐ Tao Prompts (186k subs) — "The ONLY 3 Tools for ANY AI Video" (transcribed)
The cleanest character-consistent pipeline. Source: youtube `JQzF5LP4VTs`.
1. **Claude (prompt writer)** → write a **DESIGN SHEET** prompt that locks the *character + visual style*.
   Attach a **reference-image grid** of the subject → the AI can place that exact person in every shot.
   **Iterate the style in Claude** ("too gray/dreary → bolder, vivid colors") until locked *before* generating.
2. **GPT Image 2** → generate the **design sheet** (character+style reference), then the **storyboard**
   (the shot sequence). Storyboard *before* animating = art-direct cheaply.
3. **Seedance 2.0** → animate: "text with reference," upload the storyboard, **tag the image**, and
   **attach the design sheet** so it keeps character + style. Add **"no subtitles, no music"** to every
   generation (add captions + music yourself in the edit).

**Why it's gold (adopt):** the **design sheet + reference grid** IS character consistency done right —
our `config/character-bible.json` appearance descriptors ARE our design sheets. Lock the sheet, storyboard,
then animate. This is the missing step that makes a cast look identical every episode.

## 🧱 The 5-Layer Prompt Framework (James 99 / Medium) — every viral faceless video
One prompt per layer, repeatable across niches: **Hook → Script → Voiceover → Visuals → Retention.**
- Hook = first-15-second retention test · Script = view-duration curve · Voiceover = ElevenLabs w/ niche settings ·
  Visuals = section-by-section B-roll · **Retention edit** = an 8–15 move "punch list" per 8-min video
  (raises avg view duration 30–90s — the biggest algorithm lever).
- Mantra: **"Skill compounds, tools don't."** (= our doctrine: the process is the edge.)

## 🎬 Format-specific workflows (overseeros) + the "biggest mistake" each
- **Documentary:** story research → outline → cinematic script → VO → AI scenes → music → edit → dramatic thumb.
  *Mistake:* turning history into random facts. *Fix:* build tension around decisions + consequences.
- **Tutorial:** problem → step outline → screen rec → VO → captions → chapters. *Rule:* clarity beats cinematic.
- **Product review:** criteria → honest script → comparison table → disclosure. *Rule:* say who should NOT buy.
- **Psychology:** emotional problem → pattern → real examples → calm visuals → useful insight.

## 🧰 The "one tool per job" stack (r/ReelFarmer) — nothing redundant
Scripts: ChatGPT/Claude · Production all-in-one: AITuber.app · Standalone cinematic clips: Seedance/Kling/Veo ·
Voice: ElevenLabs · Music: Suno · Edit: CapCut/Descript · Thumbnails: **GPT Image 2** (best text-on-thumb) /
Nano Banana (fast concepts) · SEO: **VidIQ** (the step most skip → then don't rank).

## 👀 Creators to keep learning from
- **Tao Prompts** — cinematic AI video, character consistency, camera movement (start: "How to Create AI Films Better Than 99%").
- **AI Video School** — story structure, AI directing, long-form film.
- **Curious Refuge** — AI filmmaking craft.

## How we adopt this (locked)
1. **Add the design-sheet step** to the Forge: character-bible descriptor → GPT Image 2 design sheet +
   reference grid → storyboard → Seedance/Open-Generative-AI animate. (Upgrades `skills/video-editor` + the Forge.)
2. **Adopt the 5-layer prompt framework** as our script standard (Hook/Script/Voice/Visuals/Retention),
   and add the **retention punch-list** pass before publish.
3. **Always** "no subtitles/no music" on raw gens; captions + Soundtrack Director music in edit.
4. **VidIQ for SEO** — titles/tags/metadata before publish (clarity, not stuffing).
5. Follow Tao Prompts / AI Video School; transcribe one creator video per week (the self-improvement loop).

## Sources
Tavily search + extract 2026-06-27: youtube `JQzF5LP4VTs` (Tao Prompts), james-palm.medium.com (5-layer),
overseeros.com (format workflows), reddit r/ReelFarmer (tool stack), openart.ai (creators list).
