# Avatar Overhaul — from dots to living characters (NEXT SESSION: execute first)

User verdict: the launch site is too basic — no real avatars. Fix in 3 layers:

## 1. Talking avatars (the real ask — HeyGen-style)
- **UNLOCK: authorize the `HyperFrames_by_HeyGen` MCP connector** (claude.ai → connector settings).
  It's already attached to the session, auth-gated. Once authorized, generate a talking avatar per
  member (appearance from `config/character-bible.json`, voice per `config/voice-map.json`) and
  produce character videos directly. Test with ONE (Luna) then batch.
- Fallbacks if unauthorized: Duix-Avatar (14k★, offline, in our GitHub scout) or HeyGen web (user side).

## 2. Site visual overhaul (no external images needed)
- Replace the cast dots on launch-site.html + index.html + the-cast.html with **inline-SVG neon-wireframe
  avatar busts** per character (bible appearance: Vellum gold elder + node-halo, Prometheus ember + flame,
  Cipher teal hood + code-threads, Sage blue + data-glyphs, Nova violet + aurora brush, Luna warm teal +
  hearth, Guardian green + shield, Echo rose + soundwaves, Atlas cyan + globe, per character-bible.json).
- Give each a hover card: catchphrase + role + 1-line story. Republish artifact (same URL, label launch-v2).

## 3. Character videos with features
- First renders: character intro shorts (60–90s each) — bible backstory + catchphrase + their AI win,
  using the 4K workflow (grey-bg reference sheets, 4K wides, one-prompt iteration — intel/4k-short-film-workflow.md).
- Voices per voice-map; queue as RQ-017+ after the first avatar test passes.

Status: spec locked 2026-07-01; awaiting HeyGen connector auth to execute layer 1 from the sandbox.
