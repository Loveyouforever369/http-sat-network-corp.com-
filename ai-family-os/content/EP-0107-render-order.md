# EP-0107 — Render & Publish Order (turnkey)

Everything needed to produce and post this episode in one action each. Created because
the live render hit a transient permission-stream drop (connectors flapping this session).

## A) Video render — Invideo (fire when connectors are stable)
**Tool:** `Invideo · generate-video-from-script`
- **platform:** youtube  *(make a second pass with platform=instagram for the vertical Short)*
- **vibe:** warm, friendly, plain-English educational, trustworthy
- **targetAudience:** homeowners (everyday people, non-technical)
- **topic:** 3 ways AI helps homeowners lower their bills this month
- **script (VO, ready):**
  > Your house is quietly overcharging you — and three free AI tools can fix it this week. No tech skills needed. I'm Luna, from the AI Family. Let's save you some money.
  > One: your energy bill. New AI energy assistants read your usage and tell you, in plain English, when you're wasting money and whether a cheaper plan exists.
  > Two: the subscriptions you forgot about. AI money assistants scan your statements, surface every recurring charge, and even draft the cancel-or-negotiate message for you.
  > Three, the big one: before you accept any home quote — roof, HVAC, or solar — paste it into an AI and ask, "Is this fair, and what should I ask?" That one habit can save you thousands. Always get it in writing and verify the contractor's license.
  > Energy, subscriptions, big quotes — three places AI puts money back in your pocket this month. Follow the AI Family for one every week, and book a free 15-minute home-AI call with the link below.

**Alt — branded host version (when HeyGen is reachable):** render Luna as the on-screen
avatar reading the same VO; cozy-home backdrop; warm teal/gold. Pairs with an ElevenLabs
"Luna" voice once wired.

## B) Publish packet — paste into Postiz (publishing happens on your side; see note)
- **YouTube title:** Your House Is Overcharging You — 3 Free AI Fixes (No Tech Skills)
- **YouTube description:**
  > Three practical, free ways AI saves homeowners money this month — energy, subscriptions, and contractor quotes — in plain English from the AI Family. Book a free 15-min home-AI setup call: [LINK]. (AI-generated host & voice.)
- **Tags:** AI for homeowners, save money on bills, smart home, AI tools 2026, AI Family, home automation
- **FB/IG/TikTok caption:**
  > Your home is quietly overcharging you 💸 3 free AI fixes anyone can do this week 👇 Full video + free setup call — link in bio. #AIforHome #Homeowners #SaveMoney #SmartHome #AIFamily
- **Thumbnail brief (Canva):** Luna pointing at a shrinking "$"; bold text "YOUR HOME IS OVERCHARGING YOU"; warm teal/gold, high contrast.
- **Channels:** YouTube + Shorts, Facebook, Instagram, TikTok.

## C) Guardian gate (before publish) — from EP-0107
- [ ] Tool claims stay generic/honest (no guaranteed-$ promises)
- [ ] Contractor segment keeps the "verify license / get it in writing" caveat
- [ ] AI host/voice disclosed in the description
- [ ] CTA link live

## Honest publishing note
There is **no Postiz / YouTube / Facebook / Instagram publish tool wired into this Claude
environment** — so I can *create* the video and packet, but the *post* step happens on your
side (drop the video into Postiz and use this packet), OR we build a **Zapier** bridge so a
publish can be triggered from here. Creating ≠ posting in this setup; that's the honest line.
