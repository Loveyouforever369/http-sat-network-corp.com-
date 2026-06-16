# The Capital Bridge Graphic Design Course

A plain-language, hands-on course that takes **anybody** — no design background needed — from
zero to confidently building detailed, on-brand graphics for Capital Bridge. Work top to bottom,
or jump to a module. Every module has: *what you'll learn*, *the idea in plain words*, *do this now*.

Pair it with two things in this folder:
- **`studio.html`** — the no-code Graphic Design Studio. Open it in a browser and build a card by
  filling in boxes and dragging sliders. This is where you practice.
- **`graphics-showcase.html`** — finished examples of the 3D card system to aim for.

> **Honest note:** the original reference video could not be opened in this environment (the network
> proxy blocks YouTube). This course is built from design fundamentals and our own brand system, not
> from that video. When you make the video reachable (or paste its transcript/screenshots), the
> techniques in it can be folded in. Learning *style and technique* from any reference is fair game;
> copying someone's exact artwork, footage, or cloning a real person's voice without consent is not.

---

## Module 0 — Orientation: how design actually works

**The idea in plain words.** Good design isn't talent or taste — it's a small set of rules applied
consistently. If you can follow a recipe, you can design. The whole game is: make the most important
thing obvious, keep everything aligned, and don't use a color/size/space without a reason.

**The five questions before any graphic:**
1. Who's looking at it? 2. What's the *one* thing it must do? 3. Where does it live (hero, card,
social)? 4. What are the limits (size, brand, motion)? 5. What's the single focal point?

**Do this now.** Open `studio.html`. Don't change anything yet — just hover the preview card and
watch how depth and light react. That "feel" is the target.

## Module 1 — The design system (your box of LEGO)

**Plain words.** Pros don't pick colors and sizes fresh each time. They reuse a fixed set of
"tokens." Ours, from the live site:

- **Colors:** emerald `#0d7a5f`, deep emerald `#094b3a`, coral `#e0603c`, gold `#bd8419`,
  teal `#1a9d8f`, plum `#7a4a7e`, on cream `#f6f1e7`.
- **Fonts:** Fraunces (headlines), Plus Jakarta Sans (body), JetBrains Mono (numbers/code).
- **Spacing:** multiples of 8 (8, 16, 24, 32…). **Radius:** ~12–18px. **Shadow:** soft, low.

**Do this now.** In the Studio, change the **Accent** dropdown through each brand color. Notice it
always looks "right" — because every option is from the system.

## Module 2 — Typography (words as picture)

**Plain words.** Two fonts max. One for big headlines (ours: Fraunces), one for everything else
(Plus Jakarta Sans). Make the headline clearly bigger and heavier than the body. Keep body lines
short (a sentence or two wide) and give lines room to breathe (line-height ~1.6).

**Do this now.** In the Studio, type a long title and a long description. Watch how the layout
holds. Shorten the title to 1–3 words — see how much stronger it reads.

## Module 3 — Color & contrast (so people can actually read it)

**Plain words.** Use one dominant color, one support color, one accent — roughly **60/30/10**.
Text must contrast strongly with its background (dark text on light, light text on dark). If you
squint and the text fades, the contrast is too low.

**Do this now.** Set the accent to gold, then to deep emerald. Notice gold needs darker text to
stay readable while emerald carries white text easily. That's contrast doing its job.

## Module 4 — Layout, grid & hierarchy (where the eye goes)

**Plain words.** Put things on an invisible grid so edges line up. Rank importance with size and
space: biggest/most-spaced = most important. The eye should land on the focal point first, then
travel in the order you intend.

**Do this now.** Greyscale test: imagine the card with no color. Can you still tell what's most
important? If yes, your hierarchy is solid. If not, make the title bigger or add space.

## Module 5 — Components (cards, badges, buttons)

**Plain words.** A *component* is a reusable block. Our hero component is the **service card**:
icon → tag → title → description → metric. Same recipe every time = instant brand recognition.

**Do this now.** Build a card in the Studio for each Capital Bridge service (Debt Relief, ROI
Planner, Credit Check…). Keep the recipe identical; only the content changes.

## Module 6 — Icons & simple illustration

**Plain words.** You don't need to draw. Emoji work as quick icons; for production use a clean icon
set (Lucide, Phosphor) or simple SVG shapes. One icon per card, same visual weight across the set.

**Do this now.** Swap the card's icon emoji to match the service. Keep them all a similar style
(all flat, or all the same family) so the set feels unified.

## Module 7 — Depth & 3D (what makes it "detailed")

**Plain words.** Flat becomes "3D" with four tricks: **layering** (things overlap), **light** (a
consistent highlight/shadow direction), **perspective** (slight tilt), and **parallax** (front
elements move more than back ones). Our cards do all four — the icon and tag "pop" toward you on hover.

**Do this now.** In the Studio, raise the **Tilt** and **Depth/Pop** sliders. Watch the icon lift
off the card. Then pull them back to taste — depth is seasoning, not the meal.

## Module 8 — Motion (movement with manners)

**Plain words.** Motion should feel natural and quick. Entrances ease *out* (fast then settle);
ambient loops ease *in and out*. Keep UI motion 150–400ms. Always offer a still version for people
who prefer reduced motion (our files already do this automatically).

**Do this now.** Toggle the **Animated accent bar** on and off. Subtle motion adds life; too much
distracts. Find the line.

## Module 9 — Build it for real (hands-on)

**Do this now (15 min).** In the Studio, create a brand-new "Working Capital" card:
title, tag, a one-line description, a metric (e.g. `48hr` / "funding decision"), the right accent,
and tasteful depth. When it looks finished, press **Copy HTML**.

## Module 10 — Ship it to the site

**Plain words.** The Studio's **Copy HTML** / **Download** gives you a self-contained block. To put
it on the live site, the card markup drops into the services grid in `index.html` (the Overview tab).
Ask me and I'll integrate it cleanly and make it responsive.

## Module 11 — Learning from references (the right way)

**Plain words.** The fastest way to grow is to study work you admire — but study the *recipe*, not
the *pixels*. Sample the palette, note the type and spacing, feel the motion, then rebuild it your
way. Never paste someone's protected artwork/footage, and never clone a real person's voice or face
without their permission. Recreate, don't copy.

## Module 12 — Recommended learning paths

Reliable, well-regarded places to go deeper (general recommendations — watch them yourself; I can
pull a fresh, curated list on request):
- **Fundamentals & theory:** typography, color, and layout primers from established design educators.
- **Vector & layout:** official Figma and Adobe Illustrator learn channels.
- **3D:** Blender's own learning portal (the classic "donut" beginner series) and Spline's docs for
  web-friendly 3D.
- **Motion:** Lottie/Rive docs for shipping animation to the web.

## Capstone — A mini brand moment

Design, in the Studio, a **3-card row** plus a one-line hero headline for a Capital Bridge campaign
(your choice of service). Use one accent family, identical card recipe, consistent icons, and tasteful
depth. Export it and send it to me — I'll review it against the §7 checklist in the specialist manual
and help you put it live.

---

*Next step you control:* make the reference video reachable (allowlist `youtube.com` +
`googlevideo.com`) or paste its transcript/screenshots, and I'll tune the Studio's defaults and the
card style to match it precisely.
