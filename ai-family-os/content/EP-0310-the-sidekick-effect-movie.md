# EP-0310 — "The Sidekick Effect" — Flagship Intro Movie (production plan)

The flagship film that introduces the whole brand: what the AI Family does for everyone. Absorbs the
uploaded **Visual Direction plan** + our **Video Forge** + live 2026 long-form research. Goes on all
socials (with cut-downs). Host framing: narrated (warm, trusted voice) with the **6 customer characters**
(see `config/customer-personas.json`) living the transformation, and the **cast** (Luna/Sage/Cipher/…)
as the "sidekicks."

## Honest length call (read first)
The upload asks for a **40-minute** intro movie; the uploaded storyboard is **~3 minutes**. 2026 research
is blunt: a 40-min AI film = **hundreds of character-locked clips, batch-generated + assembled** — a
multi-week production. **Recommended path:**
1. **Ship the 3–4 min hero film first** (highest ROI, works on every platform, is the website hero). ← do this now
2. **Extend to a long-form "feature" (20–40 min)** as **chapters** — one per character + a method chapter —
   released as a YouTube long-form + a series. Same assets, more of them.
Don't block the launch on 40 minutes. The hero cut *is* the launch; the feature is the follow-up.

## The concept
**Title:** "The Sidekick Effect" (alt: "AI That Feels Like Your Business Partner").
**Aesthetic (Neo-Humanist Futurism):** warm, hopeful, human-first — "Her" intimacy + A24 emotion + Apple polish.
Warm golds/ambers, deep teals, rich skin tones; cool holographic neon *only* on AI interfaces. Golden-hour
+ volumetric light. Shallow DOF, intimate close-ups. AI shown as an **elegant extension of the person**,
never a replacement. Every scene ends on human connection/relief. (This bridges cleanly to our house
palette: void-navy/gold/ember/teal.)

## Structure — the 3–4 min hero (then chaptered to feature)
- **Act 1 — The Universal Pain (0:00–0:35):** intercut all 6 characters in their "before" (overwhelm). VO:
  "In 2026, ambitious people are working harder than ever — but the tools meant to help are adding to the chaos."
- **Act 2 — The Discovery (0:35–1:30):** each meets their AI sidekick in a simple human moment (Sarah + Mike in depth).
- **Act 3 — The Transformation (1:30–2:20):** fast inspiring "after" cuts; quantified results as elegant on-screen text
  ("14 hrs/week reclaimed", "+$8K/mo", "22% less waste").
- **Act 4 — The Invitation (2:20–end):** all characters together; VO: "…when AI stops feeling like another tool and
  starts feeling like a trusted sidekick who knows your voice, your values, your vision." Logo + tagline + CTA (quiz/call).
- **Feature version (20–40 min):** Act 1 (10m: the real state of SMBs) → 6 character chapters (~3–4m each: full arc) →
  Method chapter (our sense→think→make→check→remember→teach loop) → Invitation. Each chapter is a standalone episode too.

## The consistency method (the hard part — solved)
From 2026 research + our Video Forge + `config/character-bible.json` design-sheet approach:
1. **Lock a character reference sheet per person** (face + full-body + wardrobe + style) — the design sheet.
2. **Identity-lock in the generator:** Runway Gen-4 "Subject-Scene-Style" triads with `@Character` refs, or LTX
   **Elements** / Kling 3.0 identity lock. Save once, tag `@Sarah` etc. across every shot.
3. **Hybrid render:** design/lock in Runway → animate physics/motion in Kling (or Seedance 2.0, 15s clips) → this
   keeps the face stable across the dark-office, golden-hour, and school-pickup shots.
4. **Continuation trick:** feed the previous clip as reference so environment/motion flow as one piece.
5. **Batch → consistency review → assemble → color-grade** (the long-form pipeline). Fewer, longer clips = fewer breaks.
6. **"no subtitles / no music" on raw gens;** add captions + score in the edit (our video-editor skill).

## Per-character scenes (from the upload — ready for gen)
- **Sarah** (solopreneur): 2am cluttered office overwhelm → golden-hour first win (voice-trained repurposer) → calm client
  call, closes laptop, picks up daughter in golden LA light.
- **Mike** (Main Street): busy service/waste stress → reviewing holographic inventory + review agent while chatting with a
  regular → relaxed at close, ratings up/waste down, texts team "great job."
- **Sam / Chris / Pat / Steve:** sleek team knowledge base / creative studio mood-boards / secure compliant doc review /
  startup loft fast-cuts. (Unified prompt template below.)
**Unified shot prompt template:** "[character ref] in [LA-inspired environment], [time/lighting], interacting with an
elegant subtle holographic AI that feels like a trusted extension of themselves. [action from their arc]. Warm hopeful
cinematic lighting, premium photorealistic, shallow DOF, emotional beat, high-end brand-film quality --ar 16:9 --stylize 200".

## Tool stack (reconciled — upload + our Tool Lab + research)
- **Stills / character lock:** Midjourney/Nano Banana Pro (aesthetic) → Runway Gen-4 refs / GPT Image 2 (design sheets).
- **Motion:** Runway Gen-4, **Kling 3.0** (physics + lip-sync), Seedance 2.0 (15s clips), LTX-2.3 (4K + native audio), Higgsfield (all-in-one).
- **Voice:** ElevenLabs / IndexTTS-2 (narrator + character voices). **Music:** Suno/Udio ("hopeful cinematic modern") or Epidemic/Artlist.
- **Edit/assemble:** Descript (drivable from here) / DaVinci Resolve / CapCut. **Verify free tiers before relying.**
- Runs on the user's machine / n8n (render is gated in the sandbox); our `automation/WORK-ORDERS.md` + `n8n-blueprint.md` drive it.

## Social cut-downs (one film → everywhere)
9:16 verticals of each character's "aha" moment (Reels/TikTok/Shorts); a 30–60s "pain montage" teaser; quote cards of the
quantified results; the full hero on YouTube + website hero; the feature chapters as a weekly series.

## Guardian checklist
- [ ] Quantified results shown are **illustrative examples** (label them) until we have real client numbers — no fabricated stats.
- [ ] AI hosts/voices disclosed. Characters are composites/personas, not real individuals. Keep the tone anti-hype.

## Source
Uploaded Visual Direction plan (2026-07-01) + `config/customer-personas.json` + `content/the-video-forge.html` +
Tavily long-form research (Runway Gen-4, Kling 3.0, LTX Elements, aimagicx/atlascloud guides, 2026-07-01).
