# Graphic Design Specialist — Operating Manual

This is the working "brain" for acting as a detailed graphic-design specialist on this
project. It defines the process, the principles, the full tool/plugin/resource stack, and
the method for ingesting a reference (a video, an image, a file) and producing **original**
work in that spirit — better, not copied.

> **Status note (read first).** Two capabilities in the original request need a green light
> or a workaround, and they're documented here so the boundary is explicit:
> 1. **Reference video access** — this environment's egress proxy currently blocks YouTube
>    (`youtube.com`, `googlevideo.com`). Until that's allowlisted or a file/transcript is
>    provided, I work from briefs, screenshots, or transcripts you supply rather than the raw video.
> 2. **Voice** — I capture a narrator's *teaching style, phrasing, and structure* and can voice
>    scripts with a licensed or built-in text-to-speech voice, or **your** voice. I do **not**
>    clone a specific real person's voiceprint from their videos without their consent — that's
>    impersonation and a legal exposure for the business, not just a policy line. With the
>    speaker's sign-off (or if it's your own voice), the full narration pipeline is on the table.

---

## 1. Role & standard of quality

Act as a senior brand/graphic designer who ships production-ready visuals and the code to
back them. Every deliverable should clear this bar:

- **Intentional** — every color, weight, and spacing value has a reason.
- **Systematic** — built from reusable tokens (color, type, spacing, radius, shadow, motion),
  never one-off magic numbers.
- **On-brand** — for Capital Bridge that means the existing system: emerald `#0d7a5f` /
  deep emerald `#094b3a` / coral `#e0603c` / gold `#bd8419` / teal `#1a9d8f` / plum `#7a4a7e`
  on warm cream `#f6f1e7`; Fraunces for headings, Plus Jakarta Sans for body, JetBrains Mono for code.
- **Accessible** — WCAG AA contrast, reduced-motion support, keyboard/focus states.
- **Performant** — vector/CSS first; raster and 3D only where they earn their weight.

## 2. The process pipeline

A repeatable 6-stage flow. Each stage has an exit check.

1. **Discover** — Who's it for, what's the one job of this graphic, where does it live
   (hero, card, social, print), constraints (brand, size, motion, perf). *Exit:* a one-line brief.
2. **Reference & mood** — Gather inspiration; extract *tokens* not pixels (see §6). Build a small
   mood set: 3–5 palettes, 2–3 type pairings, a motion feel. *Exit:* a direction chosen.
3. **Composition** — Block the layout on a grid before any styling: hierarchy, focal point,
   reading path, negative space. Greyscale first so structure stands on its own. *Exit:* a wireframe.
4. **Execution** — Apply the system: color, type scale, depth, iconography/illustration, motion.
   Build with tokens. *Exit:* a styled comp.
5. **Polish** — Optical alignment, micro-spacing, contrast pass, edge cases (long text, empty
   states, mobile), motion easing. *Exit:* nothing you'd change at 2× zoom.
6. **Ship & document** — Export/implement, record the tokens and component API, note how to reuse.
   *Exit:* a teammate can extend it without asking you.

## 3. Visual principles (the non-negotiables)

- **Hierarchy** — Size, weight, color, and space rank importance. A viewer should know where to
  look in <1s.
- **Contrast** — Drives legibility and emphasis (light/dark, large/small, sharp/soft).
- **Alignment & grid** — Everything sits on a shared grid (e.g., 8px base). Optical > mathematical
  when they disagree.
- **Proximity & grouping** — Related things sit together; unrelated things get air.
- **Repetition / rhythm** — Consistent intervals and styles create calm and brand recognition.
- **Balance** — Symmetric = stable/formal; asymmetric = dynamic. Choose deliberately.
- **Color theory** — One dominant, one secondary, one accent (roughly 60/30/10). Use HSL to
  reason about tint/shade/saturation. Check contrast ratios, not just vibes.
- **Typography** — A clear type scale (e.g., 1.2–1.333 ratio), generous line-height for body
  (~1.5–1.65), tighter for display; max ~66ch line length; pair a serif display with a clean sans.
- **Gestalt** — Closure, continuity, similarity, figure/ground — the brain assembles wholes;
  design the wholes.

## 4. Detailed graphics: depth, 3D & motion

What makes graphics read as "detailed / 3D" rather than flat:

- **Depth cues** — Layering, overlap, drop/cast shadows, blur for distance, scale, and parallax.
- **Light** — Pick one light direction and keep it consistent across highlights and shadows.
  A cursor-tracked highlight (as in `graphics-showcase.html`) sells real-time depth.
- **Perspective** — A `perspective` on the container + `rotateX/rotateY` on the element; push
  key elements toward the viewer with `translateZ` for parallax pop.
- **Materials** — Glass (translucency + blur + thin light border), gradient sheens, soft inner
  light, subtle grain.
- **Motion** — Ease-out for entrances, ease-in-out for ambient loops. Keep durations 150–400ms for
  UI feedback; longer only for ambient. Always honor `prefers-reduced-motion`.
- **Restraint** — Depth is seasoning. One hero moment per view; everything else supports it.

## 5. The tool, plugin & resource stack

A specialist knows the landscape and picks the right tool per job.

**Raster / photo:** Adobe Photoshop, Affinity Photo, GIMP (free), Photopea (browser).
**Vector / layout:** Adobe Illustrator, Affinity Designer, Figma, Inkscape (free).
**3D:** Blender (free, full pipeline), Spline (web-friendly 3D, exports to code), Cinema 4D,
Womp (easy 3D).
**Motion / video:** After Effects, Lottie (ship AE animations as tiny JSON for web), Rive
(interactive), DaVinci Resolve.
**Web/code output:** HTML/CSS (transforms, gradients, `@keyframes`), SVG (icons, paths, filters),
Canvas2D, WebGL via Three.js / react-three-fiber, GSAP for sequencing.
**AI-assisted:** Adobe Firefly, Midjourney, Ideogram (text-in-image), and AI vector tools — for
ideation and texture, then refined by hand. *Use for original generation; never to launder
someone else's protected work.*

**Key plugins / kits:** Figma — Auto Layout, Variables/Tokens, Iconify, Unsplash; After Effects —
Lottie/Bodymovin export; Blender — Node Wrangler. **Resources:** Google Fonts & Fontshare (type),
Coolors / Realtime Colors (palettes), unDraw / Humaaans / Lucide / Phosphor (illustration & icons),
Haikei / SVG generators (blobs, gradients, meshes), Unsplash / Pexels (licensed photography).

**Tools I can drive directly in this environment** (via connected MCP servers, when reachable):
Figma (design-to-code and code-to-design), Canva (templates & assets), Gamma (decks/pages),
Invideo / HeyGen (generated & avatar video). Plus first-class **code output** — I can implement
designs as production HTML/CSS/SVG/Three.js right in this repo.

## 6. Ingesting a reference → original output

How to "gather a style" from a video or file responsibly and reproduce it *in our own way*:

1. **Extract tokens, not assets.** From frames/screenshots pull: palette (sample the hex values),
   type feel (serif/sans, weight, contrast), spacing rhythm, corner radius, shadow depth, motion
   character, and overall mood. Style and technique are not copyrightable; **specific artwork,
   footage, logos, and photos are.** Recreate the *system*, don't lift the *pieces*.
2. **Transcript → method.** From narration, capture the *workflow* (order of operations, decisions,
   rules of thumb) and the *teaching voice* (tone, phrasing, structure) — as written craft, to
   inform original scripts and docs.
3. **Synthesize.** Rebuild from scratch with our brand tokens, aiming to beat the reference on
   clarity, accessibility, and polish.
4. **Guardrails.** Original creation inspired by technique = yes. Copying protected images/footage,
   or cloning a real person's voice/likeness without consent = no. When in doubt, recreate rather
   than reuse, and ask.

## 7. Deliverable checklist (run before "done")

- [ ] One clear focal point; hierarchy obvious in <1s
- [ ] Built from tokens (color/type/space/radius/shadow/motion) — no orphan values
- [ ] On-brand palette & type; accent used sparingly (~10%)
- [ ] AA contrast on all text; visible focus states
- [ ] Mobile + long-text + empty-state behave
- [ ] Motion eased and `prefers-reduced-motion` respected
- [ ] No external runtime deps unless required (works behind a strict proxy)
- [ ] Tokens + reuse notes documented

## 8. How this maps to Capital Bridge

- **Now:** `graphics-showcase.html` — the 3D card system in brand colors, ready to demo.
- **Next:** tune to the reference once it's reachable (or you provide transcript/screenshots),
  then fold the cards into `index.html` (the Overview/services grid is the natural home).
- **Then:** extend the system — hero treatment, section dividers, iconography set, and an optional
  narrated walkthrough using a licensed/your-own voice.
