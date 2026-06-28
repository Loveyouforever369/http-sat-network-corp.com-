# Absorbing Perplexity's Work — learn, reconcile, align

Perplexity (our research family member) built a parallel **"Prometheus AI Training"** brand in its
own session: a 6-layer OS, an agent lineup, free-tool research, 10 n8n templates, Canva assets, and
a season calendar. This is the honest review — **what it did great, what it got wrong, and how we
absorb the gold into the AI Family OS** without fragmenting. Locked into memory 2026-06-27.

## ✅ What Perplexity did GREAT (adopt)
1. **The 6-layer system framing** — command center · knowledge base · workflow engine · visual stack ·
   automation stack · training layer. Clean mental model; maps onto what we've built. *Adopted as our
   layer labels.*
2. **Operator/Teacher dual mode** — every workflow has an "explain mode." *Adopted* — matches our
   Behind-the-Build + the "remember/teach" loop. Strong idea.
3. **10 concrete n8n templates** — real, copy-pasteable automations. *Adopted verbatim-ish* →
   `automation/n8n-templates.md` (re-cast to our family roles).
4. **Visual prompt framework** — Objective → Audience → Format → Emotion → Composition → Production +
   negative prompts. *Adopted* into `config/character-bible.json` + the video-editor skill.
5. **1→many distribution** (one hero → 10 shorts + 3 carousels + 2 threads + 1 Reddit + 1 log).
   *Adopted* — sharpens our `social-channels.md`.
6. **New free tools surfaced** — Fathom, Granola, Phygital+, NotebookLM, Gemini Flash. *Added* to
   `free-tools-to-get.md`.
7. **It actually produced assets** (thumbnails, banners, carousels, character art, music prompts) —
   proof the pipeline works end to end.

## ⛔ What Perplexity got WRONG (our lessons — don't repeat)
1. **Brand-name fragmentation.** It launched "**Prometheus AI Training**" (@PrometheusAITraining) — a
   *different* brand from "The AI Family." Two names = split audience + diluted SEO. **Fix:** one
   brand. Decision below. (Locked: don't spin a second brand name mid-build.)
2. **Character-lineup drift.** Its 5 (Atlas/Cipher/Forge/Echo/Watcher) **conflict with our canon** —
   e.g. it made **Cipher a researcher** (ours is the *builder*; **Sage** is research), and invented
   **Forge** (builder) + **Watcher** (guardian) that duplicate our Cipher + Guardian. This is exactly
   our locked **name↔ID drift** lesson. **Fix:** `config/family.json` is the only source of truth;
   mapping below.
3. **Same unshipped bottleneck.** It built every asset but the brand still "goes live in 30 seconds of
   recording" — i.e. nothing actually published. Same gate we've named: **render/record + auth is the
   real bottleneck, not more assets.** Don't mistake "assets built" for "published."
4. **Tool claims need verifying.** Some figures/tools (e.g. "Gemini 3.5 Flash launched May 2026")
   are Perplexity's claims — *verify before stating as fact* (our correction-needs-a-source rule).
5. **Free-tier reality** — Leonardo/Suno hit daily cooldowns mid-build. Plan around caps (our
   "automate the daily free drip" note) instead of getting blocked.

## 🔗 Brand + character reconciliation (the alignment)
**One brand, one canon.** Recommended: **"The AI Family"** is the cast; **Prometheus** is the origin/
flagship character (the spark). If a punchier umbrella is wanted, "**Prometheus AI** — the AI Family"
works — but pick ONE handle everywhere. Do **not** run @PrometheusAITraining *and* @TheAIFamily as
separate brands.

**Character map (Perplexity → our canon in `config/family.json`):**
| Perplexity | Role it gave | Our canonical member | Note |
|---|---|---|---|
| Atlas | Strategist | **Atlas** (MBR-0015, business/strategy) | ✅ aligned |
| Echo | Communicator | **Echo** (MBR-0007, voice) | ✅ aligned |
| Cipher | Researcher | **Sage** (MBR-0010) does research | ⚠ ours: **Cipher = builder** (MBR-0003) |
| Forge | Builder | **Cipher** (MBR-0003, builder) | merge Forge → Cipher |
| Watcher | Guardian | **Guardian** (MBR-0008) | merge Watcher → Guardian |
| (the Operator) | the human | **the user** (leader) + Grandpa Vellum orchestrates | ✅ |

We keep our richer cast (Vellum, Prometheus, Nova, Luna, Mom Social, Uncle n8n, Soundtrack…) and fold
Perplexity's 5 into it via the map above. Visual identity locked in `config/character-bible.json`.

## What we absorbed this round (artifacts)
- `automation/n8n-templates.md` — the 10 workflows, re-cast to our family.
- `config/character-bible.json` — locked appearance + color + voice per member (consistency).
- `docs/free-tools-to-get.md` — added Fathom, Granola, Phygital+, NotebookLM, Gemini Flash.
- This doc — the lessons, in memory.

## The one honest takeaway
Perplexity proved the *production* works and handed us great structure — but it repeated our biggest
truth: **a brand isn't live until something ships.** We absorb its plan, keep our canon, and push the
single needle that matters — render + publish one piece.
