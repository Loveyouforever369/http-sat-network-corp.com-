# The Design Faculty — AI Avatar Cast (HeyGen / Invideo production package)

A render-ready multi-character narration package. Six original characters, each narrating and
"directing" a domain of graphic design. Use this to produce talking-avatar videos in the
**HeyGen web app** (app.heygen.com) — one avatar per character — then stitch them into a single
lecture. The same scripts also drop into **Invideo**.

> **Why not rendered here:** hosted HeyGen render is disabled for this CLI agent type (verified — a
> `compose` call is rejected by HeyGen with that exact reason), and `api.heygen.com` is blocked by
> this environment's egress proxy. So the avatars are rendered in HeyGen's web app, not from this
> session. The Design Lab's **Cast** tab already performs these scripts live with distinct browser
> voices so you can hear the whole lecture immediately.
>
> **Consent / likeness:** assign each character a **stock HeyGen avatar + stock voice** (or your own,
> with your consent). These are original characters — do not map them onto a real person's
> face/voice without that person's permission.

## How to render (per character) in HeyGen

1. New video → pick a **stock avatar** that fits the character brief below.
2. Choose a **stock voice** matching the "voice" note (tone/pace).
3. Paste the character's **script**.
4. Set the background/accent to the character's brand color; add the on-screen lower-third (name + role).
5. Render. Repeat for all six, then assemble in the order in "Full lecture running order."

A 16:9, ~10–15s clip each → a ~75–90s assembled lecture.

---

## Cast briefs

### 1. Iris — Creative Director & Host
- **Look:** warm, polished, approachable creative director. **Accent:** deep emerald `#094b3a`.
- **Voice:** confident, welcoming, measured (~150 wpm).
- **On-screen:** "IRIS · Creative Director"
- **Script:** "Welcome to the studio. I'm Iris, your creative director. I'll hand you to the specialists — but remember one rule above all: every choice needs a reason. Let's make something the world has to notice."

### 2. Atlas — Layout, Grid & Hierarchy
- **Look:** calm, architectural, precise. **Accent:** emerald `#0d7a5f`.
- **Voice:** deep, steady, grounded.
- **On-screen:** "ATLAS · Layout & Hierarchy"
- **Script:** "Atlas here. Before color, before type, there's structure. Put everything on a grid, then rank it — the biggest, most-spaced element is what they see first. Control the eye's path, and you control the story."

### 3. Nova — Color, Light & Mood
- **Look:** bright, energetic, expressive. **Accent:** coral `#e0603c` → gold `#bd8419`.
- **Voice:** bright, upbeat, warm.
- **On-screen:** "NOVA · Color & Light"
- **Script:** "I'm Nova. Color isn't decoration — it's emotion with a hex code. Pick one hero color, one supporting tone, and one accent for ten percent of the frame. And contrast is kindness: if they can't read it, you didn't design it."

### 4. Quill — Typography & Voice
- **Look:** refined, literary, considered. **Accent:** plum `#7a4a7e`.
- **Voice:** articulate, smooth, slightly slower.
- **On-screen:** "QUILL · Typography"
- **Script:** "I'm Quill. Two typefaces, no more — one to speak, one to sing. Make the headline unmistakably larger, keep lines short, and let the text breathe. Type is a voice; choose its tone on purpose."

### 5. Volt — 3D, Depth & Motion
- **Look:** dynamic, modern, high-energy. **Accent:** gold `#bd8419` → coral `#e0603c`.
- **Voice:** energetic, punchy, faster.
- **On-screen:** "VOLT · 3D & Motion"
- **Script:** "Volt. This is where flat becomes real. Layer your elements, pick one light direction, add a little tilt and parallax — and let motion ease, never snap. Depth is seasoning: a little makes everything taste expensive."

### 6. Sage — AI Tools & Workflow
- **Look:** calm, wise, forward-looking. **Accent:** teal `#1a9d8f` → plum `#7a4a7e`.
- **Voice:** calm, thoughtful, reassuring.
- **On-screen:** "SAGE · AI Tools & Workflow"
- **Script:** "I'm Sage. The modern studio is a partnership — you bring taste, the machine brings speed. Generate ten directions in the time it took to make one, then refine by hand. The tools changed; the eye still decides."

---

## Full lecture running order

1. **Iris** (intro / host) →
2. **Atlas** (structure first) →
3. **Nova** (color) →
4. **Quill** (type) →
5. **Volt** (depth & motion) →
6. **Sage** (AI workflow) → back to **Iris** for a one-line close (optional):
   *"That's the faculty. Now open the Studio — and design something today."*

**Transitions:** quick cross-dissolves; each character's accent color washes in as a lower-third.
**Music:** soft, modern, building. **Captions:** on-brand, high-contrast, short lines.
**Brand:** Fraunces headlines, Plus Jakarta Sans body; palette per character above on cream `#f6f1e7`.
