# Find Business Owners in Need — the lead playbook

How we find owners who actually need AI help and turn them into booked calls. Owner: Atlas + Sage
(research) + Mom Social (reach). Pairs with `content/EP-0309-business-outreach.md` (the copy) and n8n
template #8 (qualifier). **Ethics first:** value before pitch, opt-out friendly, follow platform +
anti-spam rules (CAN-SPAM/GDPR); never buy shady lists or scrape private data.

## ICP — who we serve first
- **Local service businesses** (home services, contractors, real-estate, med/dental, fitness, agencies)
  — 1–20 staff, owner-operated, drowning in admin. (Ties to our Homefront audience too.)
- **Solo founders / creators / coaches** who do everything themselves.
- **Signal:** they're busy, repetitive-task-heavy, and not yet automated.

## "In need" signals (how to spot them)
- Slow/late reply to inquiries (DM them after a slow reply — proof they need lead automation).
- Hiring for "social media manager / VA / admin" (they feel the busywork — job posts are a tell).
- Inconsistent posting or "we're so behind on content."
- Manual booking (phone-tag, no online scheduler).
- Asking AI questions publicly in groups/forums ("how do I use AI for…").

## Where to find them (free / low-cost)
- **Facebook groups** — local business + "{city} entrepreneurs" + niche owner groups (answer questions; see `facebook-page-kit.md`).
- **LinkedIn** — search by title (Owner/Founder) + industry + locale; engage before pitching (EP-0309 DM).
- **Reddit** — r/smallbusiness, r/Entrepreneur, niche subs — help first.
- **Local** — Google Maps / directories for service businesses with weak online presence (a real "in need" tell).
- **Inbound** — our content (For Business, How AI Works) pulls them in; the CTA books the call.
- **Job boards** — owners hiring for admin/social = ready for automation.

## Tools (honest)
- **Apollo / Clay** can source + enrich B2B contacts (we have Apollo access) — use **only** with proper
  authorization + compliance; treat contact data as sensitive (don't paste PII into public AI). Start
  with public/opt-in signals before any enrichment.
- **n8n template #3** (enrichment + sequence) + **#8** (lead qualifier) automate the follow-through.

## The flow (find → value → book)
1. **Find** a signal (slow reply / hiring / asking about AI).
2. **Lead with value** — a relevant guide/clip (How AI Works, For Business, contractor-quote) — no pitch.
3. **Soft offer** (EP-0309 DM/email): "want the one workflow I'd start with for {company}? free."
4. **Qualify** (n8n #8): score on budget/authority/need/timeline → hot = Calendly, cold = nurture.
5. **Call** → find the single highest-leverage workflow → show it → set it up with them.
6. **Lock results** → testimonial → case study (n8n turns it into a post/email/proof asset).

## Guardrails (Guardian)
- Value-first, opt-out honored, no guarantees, no spam blasts. Personalize — one real line about *them*.
- Respect each platform's DM/self-promo rules. Quality of fit > volume.

## What's mine vs. yours
- ✅ Done here: ICP, signals, sourcing map, the flow, qualifier logic, outreach copy (EP-0309).
- 🟡 Yours: the accounts to engage from, any Apollo/Clay run you authorize, the actual sends + calls.
