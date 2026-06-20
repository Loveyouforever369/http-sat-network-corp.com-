/* =============================================================================
   PROMETHEUS · Academy · Business & Life Playbooks
   Applied tracks that combine the tools from the rest of the Academy into
   results: marketing, sales, productivity, everyday life, and agency-building.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== AI for Marketing ============================== */
  ACADEMY.register({
    id: "ai-marketing",
    title: "AI for Marketing & Content",
    tagline: "A one-person content engine that fills every channel.",
    category: "Business & Life Playbooks",
    icon: "📣",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~85 min",
    instructor: { name: "Sofia Lang", role: "AI Growth Strategist", persona: "energizing, results-driven", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Playbook", "Tool combos"] },
    overview:
      "Marketing is where AI pays off fastest. With the right system, one person can research, write, design, and distribute content across every channel — on brand and at volume.\n\nThis track is a playbook: build a brand voice the AI reuses, run a content engine, and repurpose one idea into a week of posts, combining ChatGPT/Claude, Perplexity, Midjourney/Ideogram, and automation.",
    whyItMatters:
      "Attention is the scarce resource. AI lets a small team produce the volume and consistency that used to require a department.",
    outcomes: [
      "Codify a reusable brand voice for AI to write in",
      "Run a research -> draft -> design -> distribute engine",
      "Repurpose one asset into a week of channel-ready content",
      "Combine the right tools for each marketing job",
    ],
    lessons: [
      {
        id: "l1",
        title: "Build a brand voice the AI reuses",
        level: "Beginner",
        duration: "10 min",
        summary: "Codify your voice once so every AI draft sounds like you.",
        sections: [
          { heading: "Why voice first", body: "Generic AI content is forgettable because the model defaults to the average of the internet. The fix is a brand-voice spec: tone, vocabulary, do's and don'ts, and examples. Paste it into every chat (or a custom GPT/Gem/Project) and output instantly sounds like your brand, not a robot." },
          { heading: "Extract voice from what works", body: "Don't invent your voice from scratch — feed the AI your best posts and ask it to reverse-engineer the style guide: sentence length, tone, recurring phrases, what you avoid. Then refine. Your past wins become a reusable asset." },
          { heading: "Store it where it's reused", body: "Put the voice spec into a ChatGPT custom GPT, a Claude Project, or a Gemini Gem so it's applied automatically. The goal: never re-explain your brand again." },
        ],
        keyTakeaways: [
          "A brand-voice spec turns generic output into on-brand content.",
          "Reverse-engineer the spec from your best existing work.",
          "Store it in a GPT/Project/Gem so it's auto-applied.",
        ],
        features: [
          { name: "Custom GPT / Project / Gem", detail: "Stores your brand voice + reference content for reuse." },
          { name: "Voice extraction", detail: "Have the model derive a style guide from your best posts." },
        ],
        promptPlaybook: [
          { label: "Reverse-engineer your voice", prompt: "Here are 5 of my best posts. Reverse-engineer my brand voice into a style guide: tone, sentence length, vocabulary, recurring devices, and a 'never do' list. Then write one new post on [topic] in that exact voice.", why: "Turns proven content into a reusable, testable voice spec." },
        ],
        proTips: [
          "Include a 'never do' list (clichés, emojis, hashtags) — constraints define a voice.",
          "Re-test the spec quarterly as your brand evolves.",
        ],
        pitfalls: [
          "Publishing default AI tone — it reads generic and erodes brand.",
          "A vague voice spec ('be engaging') the model can't act on.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that extracts your brand voice from sample posts and produces a reusable style guide.",
          starter: "Analyze these posts and produce my brand voice guide: tone, sentence length, vocabulary, signature moves, and a 'never do' list. Then draft a post on [topic] in that voice.",
          hint: "Ask for a structured style guide plus a sample applying it.",
          success: "Strong prompts derive a structured, testable voice guide and demonstrate it on a new piece.",
        },
        narration:
          "The reason most AI content flops is simple: by default the model writes like the average of the entire internet. The fix is to codify your brand voice once. Tone, vocabulary, the moves you make, and a 'never do' list — clichés, emojis, whatever's not you. And don't invent it from scratch: feed the AI your five best posts and have it reverse-engineer the style guide, then refine. Now store that spec where it's reused automatically — a custom GPT, a Claude Project, a Gemini Gem — and every future draft sounds like your brand, not a robot. Voice first. Everything else in your content engine rides on it.",
      },
      {
        id: "l2",
        title: "The content engine",
        level: "Intermediate",
        duration: "12 min",
        summary: "Research, draft, design, and distribute as a repeatable system.",
        sections: [
          { heading: "Research with receipts", body: "Start with Perplexity or Deep Research to gather current, cited facts and angles on your topic. Grounding your content in real research beats hallucinated 'thought leadership' and gives you data points competitors miss." },
          { heading: "Draft with voice", body: "Feed the research + your brand-voice spec to Claude or ChatGPT to draft the piece. Because the model has facts and a voice, the draft is 80% there — you edit for taste, not from scratch." },
          { heading: "Design and distribute", body: "Generate visuals with Midjourney/Ideogram (or Canva for on-brand templates), then schedule across channels. Wire the repetitive parts (posting, cross-posting, formatting) with n8n/Make so distribution runs itself." },
        ],
        keyTakeaways: [
          "Research (Perplexity) -> draft (Claude/ChatGPT) -> design (Midjourney/Canva) -> distribute (automation).",
          "Grounding in research beats generic 'thought leadership'.",
          "Automate distribution so the system runs without you.",
        ],
        features: [
          { name: "Perplexity / Deep Research", detail: "Current, cited facts and angles to ground content." },
          { name: "Canva / Midjourney / Ideogram", detail: "On-brand visuals and text-in-image graphics." },
          { name: "n8n / Make", detail: "Automate scheduling, cross-posting, and formatting." },
        ],
        promptPlaybook: [
          { label: "Research-to-draft", prompt: "Using the cited research below and my brand voice, write a 700-word article on [topic] with a strong hook, 3 subheads, one data point per section, and a CTA. Research: [paste].", why: "Facts + voice produce a near-final draft, not generic filler." },
        ],
        proTips: [
          "Keep a swipe file of hooks that worked; feed it to the model as examples.",
          "Batch a week of content in one session, then schedule it.",
        ],
        pitfalls: [
          "Skipping research and publishing confident-but-empty content.",
          "Manual posting forever instead of automating distribution.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that turns pasted research + your voice into a structured article with a hook and CTA.",
          starter: "Using the research and my brand voice, write a [length] piece on [topic]: hook, 3 subheads, one data point each, and a clear CTA. Research: [paste].",
          hint: "Combine research input, voice, structure, and a CTA.",
          success: "Strong prompts fuse research and voice into a structured, near-final draft with a hook and CTA.",
        },
      },
      {
        id: "l3",
        title: "Repurpose one idea into a week",
        level: "Advanced",
        duration: "11 min",
        summary: "Turn a single asset into channel-native content everywhere.",
        sections: [
          { heading: "One pillar, many pieces", body: "Create one substantial 'pillar' asset (a video, article, or talk), then atomize it: a Twitter/X thread, a LinkedIn post, an Instagram carousel, a YouTube Short, a newsletter blurb. Each is rewritten for that channel's format, not copy-pasted." },
          { heading: "Channel-native rewriting", body: "Ask the AI to adapt, not duplicate: punchy and list-driven for X, story + lesson for LinkedIn, a 7-second hook for Shorts. The same idea, dressed for each room. This is the faceless-empire pattern applied to any brand." },
          { heading: "Systematize it", body: "Make the repurposing a template/automation: drop in the pillar, get the variants. Pair with a content calendar so you publish consistently. Volume plus consistency is what compounds reach." },
        ],
        keyTakeaways: [
          "One pillar asset -> many channel-native pieces.",
          "Adapt to each channel's format; never copy-paste.",
          "Templatize/automate the repurposing for consistency.",
        ],
        promptPlaybook: [
          { label: "Atomize a pillar", prompt: "From this article, create: a 6-tweet X thread (curiosity hooks), a LinkedIn post (story + lesson + CTA), a 5-slide carousel outline, and a 30-second Short script. Match each channel's native style. Article: [paste].", why: "One input becomes a week of channel-ready content in one shot." },
        ],
        proTips: [
          "Lead every piece with the single best hook from the pillar.",
          "Repurpose the same idea across weeks with new angles — don't burn it once.",
        ],
        pitfalls: [
          "Cross-posting identical text everywhere — each platform punishes it.",
          "Creating pillars but never atomizing them.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a repurposing prompt that turns one asset into 4 channel-native formats.",
          starter: "From this [asset], create an X thread, a LinkedIn post, a carousel outline, and a Short script — each in that platform's native style. [paste]",
          hint: "Name the 4 formats and require channel-native adaptation.",
          success: "Strong prompts produce multiple channel-native formats from one asset, not duplicated text.",
        },
      },
    ],
    quiz: [
      { q: "The first step to non-generic AI content is…", options: ["Bigger model", "A reusable brand-voice spec", "More hashtags", "Posting faster"], answer: 1, why: "Voice turns average output into on-brand content." },
      { q: "Best tool to ground content in current facts?", options: ["Midjourney", "Perplexity/Deep Research", "Canva", "Suno"], answer: 1, why: "Cited research beats hallucinated claims." },
      { q: "Repurposing means…", options: ["Copy-paste everywhere", "Adapt one idea to each channel's format", "Post once", "Only video"], answer: 1, why: "Channel-native adaptation outperforms duplicated text." },
      { q: "How do you make distribution scale?", options: ["Do it by hand forever", "Automate it with n8n/Make", "Skip it", "Only email"], answer: 1, why: "Automation turns publishing into a system." },
    ],
    resources: [
      { label: "Voice spec + swipe file", note: "Keep your brand voice and winning hooks ready to paste." },
      { label: "Pillar-to-pieces template", note: "Standardize how one asset becomes a week of content." },
    ],
  });

  /* ============================== AI for Sales ============================== */
  ACADEMY.register({
    id: "ai-sales",
    title: "AI for Sales & Outbound",
    tagline: "A pipeline that researches, personalizes, and follows up for you.",
    category: "Business & Life Playbooks",
    icon: "💼",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~80 min",
    instructor: { name: "Sofia Lang", role: "AI Sales Engineer", persona: "sharp, persuasive", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Outbound", "Personalization at scale"] },
    overview:
      "AI changes sales from a numbers grind into a precision system: find the right accounts, enrich them with data, personalize outreach at scale, and never drop a follow-up.\n\nThis track combines research tools, enrichment (Clay), and LLM personalization into an outbound engine — plus call prep and CRM hygiene that keep deals moving.",
    whyItMatters:
      "Generic blast emails are dead. AI lets you send personalized, relevant outreach at volume — the only outbound that still works.",
    outcomes: [
      "Build a targeted lead list and enrich it",
      "Personalize outreach at scale with real signals",
      "Automate follow-up sequences that don't feel robotic",
      "Use AI for call prep and CRM hygiene",
    ],
    lessons: [
      {
        id: "l1",
        title: "Targeting & enrichment",
        level: "Beginner",
        duration: "11 min",
        summary: "Right accounts + real data beats spraying everyone.",
        sections: [
          { heading: "Define the ideal customer", body: "Start narrow: the exact profile that buys fastest (industry, size, role, trigger). AI can help you articulate the ICP from your best closed deals, then build a list that matches. Precision at the top of the funnel saves everything downstream." },
          { heading: "Enrich with a waterfall", body: "Use a tool like Clay to enrich each lead — find emails and data by querying cheap providers first and falling back to pricier ones only on a miss. You get high coverage without burning budget, and rich fields to personalize on." },
          { heading: "Find the 'why now'", body: "The best outreach references a real, timely reason: a hiring spree, funding, a product launch, a tech change. AI web research (Claygent, Perplexity) surfaces these signals so every message has a genuine hook." },
        ],
        keyTakeaways: [
          "Narrow ICP first — precision beats volume.",
          "Waterfall enrichment maximizes data per dollar.",
          "Find a real 'why now' signal for every lead.",
        ],
        features: [
          { name: "Clay", detail: "Spreadsheet + APIs: waterfall enrichment and AI columns." },
          { name: "AI web research", detail: "Surface intent signals (hiring, funding, launches)." },
        ],
        promptPlaybook: [
          { label: "Derive ICP from wins", prompt: "Here are my last 10 closed-won deals with firmographics. Identify the patterns and write a tight ICP (industry, size, role, trigger) plus 3 disqualifiers.", why: "Turns real wins into a precise targeting filter." },
        ],
        proTips: [
          "Disqualify aggressively — a smaller, perfect list converts better.",
          "Store the 'why now' signal as a field so personalization can use it.",
        ],
        pitfalls: [
          "Buying a giant generic list and blasting it.",
          "Personalizing with fluff ('love your work') instead of a real signal.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that derives your ICP and disqualifiers from your best deals.",
          starter: "From these closed-won deals, extract the common ICP (industry, size, role, trigger) and list 3 clear disqualifiers.",
          hint: "Ask for patterns + a usable ICP + disqualifiers.",
          success: "Strong prompts turn real deal data into a precise ICP and explicit disqualifiers.",
        },
        narration:
          "Modern outbound isn't about volume — it's about precision. Start by defining the exact profile that buys fastest, and let AI derive that ideal customer from your best closed deals. Then enrich your list with a tool like Clay, which finds emails and data by asking the cheap providers first and only paying for the pricier ones on a miss — high coverage without torching your budget. And here's the part that makes outreach actually land: find the 'why now'. A hiring spree, fresh funding, a product launch. AI research surfaces those signals so every message has a real, timely hook. Narrow list, rich data, genuine reason to reach out — that's the foundation everything else builds on.",
      },
      {
        id: "l2",
        title: "Personalization at scale",
        level: "Intermediate",
        duration: "12 min",
        summary: "Messages that feel 1:1 — generated for thousands.",
        sections: [
          { heading: "The personalization formula", body: "A great cold message: a specific observation (the 'why now'), a relevant value statement, and one clear ask. AI can generate this per lead using the enriched fields — so each email references that company's real situation, at scale." },
          { heading: "Templates with variables", body: "Build a message template with {{first_name}}, {{trigger}}, {{pain}} and let the AI fill them from your data — but vary the wording so it doesn't read as a mail merge. The art is scale that still feels human." },
          { heading: "Quality gate", body: "Personalization at scale fails when it's confidently wrong. Spot-check a sample, and have the AI flag low-confidence personalization for human review. One embarrassing mistake costs more than the time saved." },
        ],
        keyTakeaways: [
          "Observation + value + one ask = a message that converts.",
          "Templatize with variables, but vary the wording.",
          "Always quality-gate AI personalization.",
        ],
        promptPlaybook: [
          { label: "Personalized cold email", prompt: "Write a 75-word cold email to {{name}}, {{role}} at {{company}}. Open with this real signal: {{trigger}}. Offer: {{value}}. One CTA: a 15-min call. Friendly, no jargon, no 'I hope this finds you well'. Output subject + body.", why: "Uses real fields for genuine personalization with tight constraints." },
        ],
        proTips: [
          "Lead with them, not you — the first line should be about their world.",
          "Keep it under ~80 words; long cold emails don't get read.",
        ],
        pitfalls: [
          "Mail-merge that obviously reads as automated.",
          "Shipping unverified personalization that's wrong about the prospect.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a personalized cold-email prompt using variables for name, role, company, trigger, and value.",
          starter: "Write a 75-word cold email to {{name}} ({{role}} at {{company}}). Open with {{trigger}}. Offer {{value}}. One CTA: a short call. No jargon. Output subject + body.",
          hint: "Use variables, set length/tone constraints, and one CTA.",
          success: "Strong prompts personalize from real fields, stay short, and end with one clear CTA.",
        },
      },
      {
        id: "l3",
        title: "Follow-up, call prep & CRM",
        level: "Advanced",
        duration: "10 min",
        summary: "Win the deals you already started — automatically.",
        sections: [
          { heading: "Sequences that persist", body: "Most deals are won in the follow-up. Build a multi-touch sequence (value-add, not 'just bumping this') and automate it so no lead goes cold. AI can draft each step to add a new angle instead of nagging." },
          { heading: "AI call prep", body: "Before every call, have AI assemble a one-pager: who they are, recent company news, likely pain points, and 3 smart questions. Walk in informed without an hour of manual research." },
          { heading: "CRM hygiene", body: "AI can summarize calls into CRM notes, suggest next steps, and flag stale deals. A clean CRM is where forecasting and follow-up live — let AI do the data entry humans hate." },
        ],
        keyTakeaways: [
          "Automated, value-add follow-up wins deals.",
          "AI call prep = an instant, informed one-pager.",
          "Let AI keep the CRM clean and current.",
        ],
        features: [
          { name: "Automation (n8n/Make/CRM)", detail: "Sequence follow-ups and log activity automatically." },
          { name: "Meeting notes AI", detail: "Summarize calls into CRM notes + next steps." },
        ],
        promptPlaybook: [
          { label: "Call prep one-pager", prompt: "Build a pre-call brief for my meeting with {{name}} at {{company}}: who they are, 2 recent company developments, likely pains for their role, and 3 sharp discovery questions.", why: "Walk into every call prepared in 30 seconds." },
        ],
        proTips: [
          "Every follow-up should add value (a resource, an idea), not just 'checking in'.",
          "Summarize calls immediately with AI while context is fresh.",
        ],
        pitfalls: [
          "Giving up after one or two touches.",
          "A messy CRM that makes follow-up and forecasting impossible.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a call-prep prompt that produces an informed one-pager for an upcoming meeting.",
          starter: "Create a pre-call brief for {{name}} at {{company}}: background, 2 recent developments, role-specific pains, and 3 discovery questions.",
          hint: "Ask for background, recent signals, pains, and smart questions.",
          success: "Strong prompts yield a concise, informed pre-call brief with tailored discovery questions.",
        },
      },
    ],
    quiz: [
      { q: "Modern outbound wins by…", options: ["Mass generic blasts", "Precision targeting + real personalization", "No follow-up", "Buying huge lists"], answer: 1, why: "Relevant, personalized outreach at volume is what still converts." },
      { q: "Waterfall enrichment means…", options: ["One provider only", "Cheap providers first, fall back on misses", "No enrichment", "Random data"], answer: 1, why: "It maximizes coverage per dollar." },
      { q: "A great cold message contains…", options: ["Five asks", "Observation + value + one ask", "Only your pitch", "No CTA"], answer: 1, why: "Specific signal, relevant value, single clear ask." },
      { q: "Where are most deals won?", options: ["First touch", "The follow-up", "Cold list", "Never"], answer: 1, why: "Persistent, value-add follow-up closes deals." },
    ],
    resources: [
      { label: "Why-now field", note: "Store a real trigger per lead so personalization is genuine." },
      { label: "Value-add sequences", note: "Every follow-up should give something, not just nudge." },
    ],
  });

  /* ============================== AI for Productivity ============================== */
  ACADEMY.register({
    id: "ai-productivity",
    title: "AI for Personal Productivity",
    tagline: "Reclaim hours a week — inbox, meetings, planning, and decisions.",
    category: "Business & Life Playbooks",
    icon: "⚡",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Byte", role: "Productivity Guide", persona: "calm, encouraging", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Time back", "Everyday workflows"] },
    overview:
      "The fastest ROI from AI isn't a moonshot — it's the hours you get back each week. Tamed inbox, summarized meetings, faster planning, and clearer decisions.\n\nThis track is a practical playbook for using AI on the work you already do, so you spend time on what only you can do.",
    whyItMatters:
      "Time is the one resource you can't make more of. AI on your daily admin is the highest-frequency, lowest-risk win available.",
    outcomes: [
      "Tame email and turn messages into action",
      "Capture and summarize meetings automatically",
      "Plan your day/week with AI as a thinking partner",
      "Use AI to make better, faster decisions",
    ],
    lessons: [
      {
        id: "l1",
        title: "Inbox & communication",
        level: "Beginner",
        duration: "10 min",
        summary: "From inbox dread to inbox done.",
        sections: [
          { heading: "Summarize and triage", body: "Use AI (in Gmail/Outlook or pasted) to summarize long threads, extract the actual ask, and draft replies in your voice. The skill is turning a wall of messages into a short list of decisions and actions." },
          { heading: "Draft, don't agonize", body: "Most email anxiety is starting. Ask AI for a first draft with the right tone — 'firm but friendly decline', 'warm follow-up' — then edit. Going from blank to draft is where the time vanishes." },
          { heading: "Templates for repeats", body: "For messages you send often (intros, scheduling, FAQs), save AI-built templates and personalize per send. Repetitive comms should never start from zero." },
        ],
        keyTakeaways: [
          "Summarize threads into decisions + actions.",
          "Get a tone-correct first draft, then edit.",
          "Template repetitive messages.",
        ],
        features: [
          { name: "Gemini/Copilot in mail", detail: "Summarize and draft inside Gmail/Outlook." },
          { name: "Saved prompts/templates", detail: "Reusable drafts for common messages." },
        ],
        promptPlaybook: [
          { label: "Thread to action", prompt: "Summarize this email thread in 4 bullets (decision, open questions, who owes what, next step), then draft a reply confirming the next step in a friendly, concise tone.", why: "Converts a long thread into clarity and a sent reply." },
        ],
        proTips: [
          "Batch email in 2-3 blocks a day; use AI to clear each block fast.",
          "Keep a personal 'tone library' (decline, nudge, thank-you) as prompts.",
        ],
        pitfalls: [
          "Sending AI drafts unread — voice and facts still need you.",
          "Over-automating sensitive/relationship emails.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that summarizes a thread and drafts a reply in your tone.",
          starter: "Summarize this thread (decision, questions, owners, next step), then draft a concise, friendly reply confirming the next step.",
          hint: "Structured summary + drafted action + tone.",
          success: "Strong prompts produce a structured summary and a tone-correct drafted reply.",
        },
        narration:
          "The fastest win with AI isn't fancy — it's your inbox. Drop a long thread in and ask for four bullets: the decision, the open questions, who owes what, and the next step. Suddenly a wall of email is a short list of actions. Then beat the blank page: ask for a first draft in the right tone — firm but friendly, warm follow-up — and just edit. That leap from nothing to draft is where your time disappears, so let AI take it. And for the messages you send constantly — intros, scheduling, FAQs — save templates and personalize per send. Batch your email, clear each block with AI, and reclaim the hours the inbox quietly steals.",
      },
      {
        id: "l2",
        title: "Meetings, notes & knowledge",
        level: "Intermediate",
        duration: "11 min",
        summary: "Never take manual notes again — and actually find them later.",
        sections: [
          { heading: "Capture automatically", body: "AI notetakers join calls (or transcribe recordings) and produce summaries, decisions, and action items with owners. You stay present in the conversation instead of scribbling, and walk out with a clean record." },
          { heading: "Turn talk into tasks", body: "Pipe the action items into your task manager — manually or via automation — so decisions become tracked work, not forgotten audio. The value of a meeting is what happens after it." },
          { heading: "A second brain", body: "Tools like NotebookLM let you load your documents, notes, and transcripts and ask questions across all of them — even get an audio overview. Your accumulated knowledge becomes searchable and conversational instead of buried." },
        ],
        keyTakeaways: [
          "AI notetakers capture summaries + action items.",
          "Route actions into your task system.",
          "Use NotebookLM to query your own knowledge base.",
        ],
        features: [
          { name: "AI notetakers", detail: "Auto transcribe + summarize meetings into actions." },
          { name: "NotebookLM", detail: "Load your docs; ask questions; get audio overviews." },
        ],
        promptPlaybook: [
          { label: "Meeting to actions", prompt: "From this transcript, list decisions, action items (with owner + due date), and risks. Then draft a 5-line recap email to attendees.", why: "Converts a recording into tracked actions and a recap." },
        ],
        proTips: [
          "Standardize your meeting-notes format so summaries are consistent and scannable.",
          "Feed past notes into NotebookLM to answer 'what did we decide about X?'.",
        ],
        pitfalls: [
          "Capturing notes nobody ever revisits — route actions out.",
          "Recording without consent — tell participants.",
        ],
        exercise: {
          type: "reflect",
          brief: "Design your meeting workflow: capture -> summarize -> route actions -> store for retrieval. Which tools at each step?",
          hint: "Notetaker -> summary format -> task manager -> NotebookLM.",
          success: "Good answers define an end-to-end capture-to-retrieval workflow with a tool at each step.",
        },
      },
      {
        id: "l3",
        title: "Planning & decisions",
        level: "Advanced",
        duration: "10 min",
        summary: "Use AI as a thinking partner, not just a doer.",
        sections: [
          { heading: "Plan your day/week", body: "Give AI your tasks, priorities, deadlines, and energy patterns, and ask for a realistic time-blocked plan. It's great at turning a chaotic list into a sequenced schedule — and at saying what to cut." },
          { heading: "Decision support", body: "For tough calls, use AI to structure the decision: list options, criteria, pros/cons, and second-order effects. Ask it to argue both sides and surface what you're missing. It won't decide for you, but it makes you decide better." },
          { heading: "Reflection & review", body: "Use AI for weekly reviews: paste what you did, and ask for patterns, wins, and one improvement. A consistent review loop, made effortless, compounds into real growth." },
        ],
        keyTakeaways: [
          "AI turns a task list into a realistic time-blocked plan.",
          "Use it to structure decisions and argue both sides.",
          "Make weekly reviews effortless and consistent.",
        ],
        promptPlaybook: [
          { label: "Time-block my day", prompt: "Here are my tasks, deadlines, and meetings. I focus best in the morning. Build a realistic time-blocked schedule, protect 2 deep-work hours, and tell me what to cut or defer.", why: "Turns an overwhelming list into a doable, prioritized day." },
          { label: "Decision structurer", prompt: "Help me decide [decision]. List options, my criteria, pros/cons, second-order effects, and argue both sides. End with the key question I should answer to choose.", why: "Improves the decision instead of outsourcing it." },
        ],
        proTips: [
          "Tell the AI your energy patterns — plans that ignore them fail.",
          "For big decisions, have it steelman the option you're leaning against.",
        ],
        pitfalls: [
          "Outsourcing the decision instead of using AI to think better.",
          "Plans with no slack — leave buffer for reality.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that builds a realistic time-blocked day from your tasks and protects deep work.",
          starter: "Given these tasks, deadlines, and meetings, build a time-blocked day. I focus best in [time]. Protect 2 deep-work hours and tell me what to cut.",
          hint: "Provide tasks + energy patterns; ask for blocks + cuts.",
          success: "Strong prompts yield a realistic, prioritized schedule that protects focus and trims overload.",
        },
      },
    ],
    quiz: [
      { q: "Fastest, lowest-risk AI win?", options: ["A moonshot project", "Daily admin: inbox, meetings, planning", "Nothing", "Only coding"], answer: 1, why: "High-frequency daily tasks return time immediately." },
      { q: "After an AI notetaker summarizes a meeting, you should…", options: ["Ignore it", "Route action items into your task system", "Delete it", "Re-record"], answer: 1, why: "A meeting's value is the tracked follow-through." },
      { q: "NotebookLM is best for…", options: ["Generating video", "Q&A over your own documents/notes", "Sending email", "Mining crypto"], answer: 1, why: "It makes your knowledge base searchable and conversational." },
      { q: "Using AI for decisions means…", options: ["It decides for you", "It structures options and argues both sides", "Skipping the decision", "Guessing"], answer: 1, why: "AI improves your thinking; you still choose." },
    ],
    resources: [
      { label: "Tone & template library", note: "Keep reusable prompts for common messages and reviews." },
      { label: "Capture-to-action", note: "Always route meeting actions into a tracked system." },
    ],
  });

  /* ============================== AI for Everyday Life ============================== */
  ACADEMY.register({
    id: "ai-everyday-life",
    title: "AI for Everyday Life",
    tagline: "A tutor, coach, chef, and planner in your pocket.",
    category: "Business & Life Playbooks",
    icon: "🌱",
    color: "violet",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Byte", role: "Life Skills Guide", persona: "warm, supportive", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Real life", "Safe + practical"] },
    overview:
      "AI isn't just for work. Used well, it's a patient tutor, a planning partner, a budgeting helper, and a kitchen sidekick — quietly improving everyday life.\n\nThis track shows practical, safe ways to use AI for learning, health habits, money, home, travel, and communication, with clear limits on where to involve a professional.",
    whyItMatters:
      "The biggest life upgrades are small daily ones. AI lowers the friction on learning, planning, and decisions that used to feel like chores.",
    outcomes: [
      "Learn any subject with AI as a personal tutor",
      "Plan meals, travel, and home projects faster",
      "Use AI for budgeting and big-purchase decisions",
      "Know where AI helps and where to consult a professional",
    ],
    lessons: [
      {
        id: "l1",
        title: "Learn anything with an AI tutor",
        level: "Beginner",
        duration: "11 min",
        summary: "The most patient, personalized teacher you'll ever have.",
        sections: [
          { heading: "Teach me like I'm…", body: "Ask AI to explain any concept at your level — 'explain compound interest like I'm 12', then 'now at college level'. Have it use analogies, check your understanding with questions, and adjust. It's a tutor with infinite patience and no judgment." },
          { heading: "Active learning", body: "Don't just read answers — ask the AI to quiz you, make flashcards, give practice problems, and explain your mistakes. Learning sticks when you retrieve, not just review. Turn the AI into a drill partner." },
          { heading: "Languages & skills", body: "Practice conversation in a new language (use voice mode), get instant corrections, or learn an instrument's theory step by step. AI is ideal for low-stakes practice and immediate feedback." },
        ],
        keyTakeaways: [
          "Ask for explanations at your exact level, with analogies.",
          "Use AI to quiz and drill you — active recall beats rereading.",
          "Great for language practice and skill theory with feedback.",
        ],
        promptPlaybook: [
          { label: "Personal tutor", prompt: "Be my tutor for [topic]. Explain it simply with an analogy, then ask me 3 questions to check understanding, correct my answers, and go one level deeper based on how I do.", why: "Adaptive, interactive teaching beats a static explanation." },
          { label: "Quiz me", prompt: "Quiz me on [topic] with 10 increasingly hard questions, one at a time. After each, tell me if I'm right and explain why.", why: "Active recall makes learning stick." },
        ],
        proTips: [
          "Ask 'what am I misunderstanding?' — AI is great at finding your gap.",
          "Use voice mode for language practice; speaking beats reading.",
        ],
        pitfalls: [
          "Passively reading AI answers without testing yourself.",
          "Trusting AI on exact facts/figures without checking for important topics.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a tutor prompt for something you want to learn, with explanation + a comprehension check.",
          starter: "Be my tutor for [topic]. Explain it with an analogy, quiz me with 3 questions, correct me, and adapt the difficulty.",
          hint: "Ask for level-appropriate explanation + interactive checks.",
          success: "Strong prompts request adaptive, interactive teaching with comprehension checks, not just an explanation.",
        },
        narration:
          "The most underrated use of AI is as a tutor — patient, personalized, and never judgmental. Ask it to explain anything at your level: 'explain compound interest like I'm twelve,' then 'now at college level.' But don't stop at reading answers, because that's not how learning sticks. Make it quiz you, give practice problems, and explain your mistakes — active recall is the magic. Want a language? Practice out loud in voice mode and get instant corrections. Learning an instrument? Step through the theory. And one power question for any subject: 'what am I misunderstanding?' AI is remarkably good at finding the exact gap in your thinking and closing it.",
      },
      {
        id: "l2",
        title: "Home, meals & travel",
        level: "Beginner",
        duration: "10 min",
        summary: "Turn everyday planning chores into quick conversations.",
        sections: [
          { heading: "Meal planning", body: "Give AI your dietary needs, what's in the fridge, and time constraints, and get a week of meals plus a grouped shopping list. 'Use up the chicken and spinach, 3 dinners under 30 minutes, kid-friendly' — done in seconds." },
          { heading: "Travel planning", body: "AI builds itineraries around your interests, budget, and pace, suggests neighborhoods, and drafts packing lists. Pair with a research tool (Perplexity) for current prices and hours, and verify bookings yourself." },
          { heading: "Home projects", body: "From 'how do I unclog this' to 'plan a small garden bed for this sun exposure', AI gives step-by-step guidance and materials lists. Upload a photo and ask what's wrong or how to arrange a room." },
        ],
        keyTakeaways: [
          "Meal plans + shopping lists from your constraints and fridge.",
          "Itineraries tailored to interests/budget; verify with research.",
          "Step-by-step help for home/DIY, including from photos.",
        ],
        promptPlaybook: [
          { label: "Week of meals", prompt: "Plan 5 dinners for 2 adults and a toddler, under 30 minutes each, using chicken, rice, and what's in season. Give recipes and a shopping list grouped by store aisle.", why: "Constraints + fridge contents = a usable plan and list." },
        ],
        proTips: [
          "Tell it your real constraints (time, budget, dislikes) for usable plans.",
          "Verify current prices/hours/bookings with a live research tool.",
        ],
        pitfalls: [
          "Trusting AI on current prices/availability without checking.",
          "Skipping safety steps on DIY (electrical, gas) — consult a pro.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick a recurring life chore (meals, travel, errands). How would you template an AI prompt to handle it weekly?",
          hint: "Fixed constraints + variable inputs each week.",
          success: "Good answers template a repeatable prompt with stable constraints and weekly-variable inputs.",
        },
      },
      {
        id: "l3",
        title: "Money, health & knowing the limits",
        level: "Intermediate",
        duration: "11 min",
        summary: "Helpful for everyday decisions — with clear, safe boundaries.",
        sections: [
          { heading: "Budgeting & purchases", body: "AI can build a simple budget from your income and expenses, explain financial concepts, and compare big purchases (criteria, pros/cons, total cost). It's a great explainer and organizer — but it is not a licensed financial advisor, and shouldn't pick your investments." },
          { heading: "Health habits — carefully", body: "AI can help with general wellness: meal ideas, workout structure, habit plans, and explaining medical terms in plain language. It is not a doctor: never use it to diagnose or treat, don't share sensitive data carelessly, and consult a professional for anything real. Treat it as a knowledgeable friend, not a clinician." },
          { heading: "Know when to escalate", body: "For legal, medical, financial, and safety matters, use AI to understand and prepare questions — then talk to a qualified professional. The smart pattern is 'AI to learn, expert to decide' on anything high-stakes." },
        ],
        keyTakeaways: [
          "Great for budgeting/explaining; not a financial advisor.",
          "Useful for general wellness; never for diagnosis/treatment.",
          "High-stakes = AI to learn, professional to decide.",
        ],
        promptPlaybook: [
          { label: "Compare a big purchase", prompt: "Help me decide between [option A] and [option B] for [need]. Compare on [criteria], include total cost of ownership, and list questions I should answer before buying.", why: "Structures the decision without pretending to be an advisor." },
        ],
        proTips: [
          "Use AI to prepare smart questions for your doctor/accountant/lawyer.",
          "Never paste sensitive personal/financial/health data into tools you don't trust.",
        ],
        pitfalls: [
          "Treating AI output as medical, legal, or financial advice.",
          "Sharing sensitive data without checking privacy settings.",
        ],
        exercise: {
          type: "reflect",
          brief: "Name one money/health task you'd use AI for and one you'd take to a professional, and explain the line.",
          hint: "AI for learning/organizing; pro for diagnosis/advice/high-stakes.",
          success: "Good answers use AI for understanding/organizing and reserve diagnosis/advice/high-stakes decisions for professionals.",
        },
      },
    ],
    quiz: [
      { q: "Best way to learn with AI?", options: ["Read answers passively", "Have it quiz and drill you (active recall)", "Avoid questions", "Only watch videos"], answer: 1, why: "Active recall makes learning stick." },
      { q: "For current prices/hours when planning travel, you should…", options: ["Trust AI fully", "Verify with a live research tool", "Guess", "Skip it"], answer: 1, why: "Models can be out of date; verify time-sensitive facts." },
      { q: "AI and health: the right stance is…", options: ["Use it to diagnose", "General info only; consult a professional", "Replace your doctor", "Share all medical data anywhere"], answer: 1, why: "AI helps you understand; professionals diagnose and treat." },
      { q: "Smart pattern for high-stakes decisions?", options: ["AI decides", "AI to learn, expert to decide", "Ignore experts", "No research"], answer: 1, why: "Use AI to prepare, professionals to decide." },
    ],
    resources: [
      { label: "Templated chores", note: "Reusable prompts for meals, travel, and errands save weekly time." },
      { label: "Know the line", note: "AI to learn and organize; professionals for medical/legal/financial calls." },
    ],
  });

  /* ============================== Build an AI Agency ============================== */
  ACADEMY.register({
    id: "ai-agency",
    title: "Build an AI Automation Agency",
    tagline: "Turn these skills into income — productized AI services for clients.",
    category: "Business & Life Playbooks",
    icon: "🏗",
    color: "purple",
    level: "Intermediate → Advanced",
    difficulty: "Advanced",
    estTime: "~85 min",
    instructor: { name: "The Catalyst", role: "Agency Builder", persona: "ambitious, systems-driven", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Monetize", "Productized services"] },
    overview:
      "Everything in this Academy is a sellable skill. Businesses know they need AI but lack the time and expertise — that gap is your opportunity. An AI automation agency installs the workflows, content engines, and agents you've learned to build.\n\nThis track covers picking a niche and offer, finding clients, delivering reliably, and pricing for recurring revenue.",
    whyItMatters:
      "The fastest way to internalize these tools is to get paid to deploy them. A lean AI service business is one of the most accessible opportunities of the era.",
    outcomes: [
      "Choose a niche and a productized offer",
      "Find and close your first clients",
      "Deliver automations reliably and hand them off",
      "Price for retainers and recurring revenue",
    ],
    lessons: [
      {
        id: "l1",
        title: "Niche & productized offer",
        level: "Intermediate",
        duration: "11 min",
        summary: "Sell a specific outcome to a specific business — not 'AI consulting'.",
        sections: [
          { heading: "Pick a niche", body: "Specificity sells. 'AI automations for dental clinics' beats 'AI for business' — you understand their workflows, your marketing is sharper, and referrals compound. Pick an industry you know or can learn, with money and repetitive processes." },
          { heading: "Productize the offer", body: "Don't sell hours; sell a packaged outcome: 'We install a system that replies to every new lead in 60 seconds, for $X setup + $Y/month.' A clear, repeatable offer is easier to sell and deliver than bespoke consulting." },
          { heading: "Find the painful, repetitive work", body: "The best first offers automate a specific, painful, repetitive task: lead response, appointment reminders, review requests, reporting. Solve one expensive headache completely before expanding." },
        ],
        keyTakeaways: [
          "Niche down to a specific industry.",
          "Sell a productized outcome, not hours.",
          "Target painful, repetitive, valuable tasks first.",
        ],
        promptPlaybook: [
          { label: "Find offers in a niche", prompt: "Act as an automation consultant for [industry]. List the 7 most common repetitive, time-consuming workflows, and for each propose an AI automation, the tools, and the business value in dollars/hours.", why: "Generates a menu of concrete, sellable offers for a niche." },
        ],
        proTips: [
          "Choose a niche with budget and clear, repeatable processes.",
          "Lead with one flagship offer; expand only after you can deliver it in your sleep.",
        ],
        pitfalls: [
          "'AI for everyone' positioning that resonates with no one.",
          "Selling vague consulting instead of a concrete outcome.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that surfaces 7 automatable workflows + offers for a niche you'd target.",
          starter: "As an automation consultant for [industry], list 7 repetitive workflows, an AI automation for each, the tools, and the dollar/hour value.",
          hint: "Name the niche; ask for workflows + offers + value.",
          success: "Strong prompts produce specific, valuable, sellable automation offers for a defined niche.",
        },
        narration:
          "Here's the opportunity: every business knows it needs AI, and almost none has the time or skill to set it up. That gap is your agency. But don't sell 'AI consulting' — sell a specific outcome to a specific niche. 'AI automations for dental clinics' beats 'AI for business' every time, because you learn their workflows, your marketing gets sharper, and referrals snowball. Then productize it: not hours, but a package — 'we install a system that replies to every lead in sixty seconds, this much to set up, this much a month.' Start with one painful, repetitive, expensive task and solve it completely. A specific niche plus a productized offer is a business you can actually sell and deliver.",
      },
      {
        id: "l2",
        title: "Finding & closing clients",
        level: "Intermediate",
        duration: "11 min",
        summary: "Use your own outbound and content skills to land clients.",
        sections: [
          { heading: "Eat your own cooking", body: "Use the sales and marketing playbooks on yourself: a targeted list in your niche, personalized outreach referencing their real workflow gaps, and content that demonstrates expertise. You're the proof that the systems work." },
          { heading: "Lead with a demo or audit", body: "Offer a free 'automation audit' or build a quick demo of their lead-response flow. Showing beats telling — a working demo of their process automated is the best close there is." },
          { heading: "Prove ROI in their language", body: "Frame everything in time and money: 'this saves your front desk 10 hours a week and recovers X missed leads.' Decision-makers buy outcomes, not technology." },
        ],
        keyTakeaways: [
          "Use your own outbound/content to get clients.",
          "Lead with a free audit or a working demo.",
          "Sell ROI in hours and dollars, not features.",
        ],
        features: [
          { name: "Your own outbound engine", detail: "Apply the sales track to your agency's pipeline." },
          { name: "Demo/audit", detail: "Show a working automation of their process to close." },
        ],
        promptPlaybook: [
          { label: "Audit outreach", prompt: "Write a 70-word outreach to a [niche] owner offering a free 20-minute automation audit. Reference a common time-sink in their industry. One CTA: book a call. No jargon.", why: "Specific, value-first outreach that books audits." },
        ],
        proTips: [
          "Build one impressive demo you can tailor quickly per prospect.",
          "Collect a testimonial and a measured result from client #1 — it sells client #2.",
        ],
        pitfalls: [
          "Pitching features instead of outcomes.",
          "Waiting until you're 'ready' instead of landing a first client and learning.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write an outreach offering a free audit to a prospect in your niche, referencing a real pain.",
          starter: "Write a 70-word note to a [niche] owner offering a free automation audit, referencing [common time-sink]. One CTA: a short call.",
          hint: "Value-first, specific pain, one CTA.",
          success: "Strong outreach is short, references a real industry pain, and offers a concrete next step.",
        },
      },
      {
        id: "l3",
        title: "Deliver, retain & price",
        level: "Advanced",
        duration: "11 min",
        summary: "Reliable delivery and recurring revenue turn gigs into a business.",
        sections: [
          { heading: "Deliver reliably", body: "Use the automation and agent skills (n8n/Make/Zapier, MCP) to build robust systems with error handling and monitoring. Document each build and how it's maintained — reliability is your reputation." },
          { heading: "Price for recurring revenue", body: "The model that builds a business: a setup fee for the build plus a monthly retainer for hosting, monitoring, tweaks, and new automations. Recurring revenue smooths cash flow and rewards the ongoing value you provide." },
          { heading: "Systematize and scale", body: "Turn each successful build into a reusable template you can redeploy for the next client in the niche. Templates plus SOPs let you (and eventually a small team) deliver faster at higher margins — the path from freelancer to agency." },
        ],
        keyTakeaways: [
          "Deliver robust, monitored, documented systems.",
          "Setup fee + monthly retainer = recurring revenue.",
          "Templatize builds to scale margins.",
        ],
        features: [
          { name: "Automation stack", detail: "n8n/Make/Zapier + agents/MCP for reliable client systems." },
          { name: "Templates + SOPs", detail: "Reusable builds and processes to scale delivery." },
        ],
        promptPlaybook: [
          { label: "Package & price", prompt: "Help me package my [automation] offer for [niche]: a clear scope, a setup fee, a monthly retainer (what it includes), and 3 pricing tiers with the value each delivers.", why: "Turns a service into a clear, sellable, recurring offer." },
        ],
        proTips: [
          "Always include monitoring + a maintenance retainer — automations need upkeep.",
          "Reuse templates across clients in the same niche to boost margin.",
        ],
        pitfalls: [
          "One-off project pricing with no recurring revenue.",
          "Shipping fragile automations with no monitoring or docs.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt that packages and prices your agency offer with a setup fee and retainer tiers.",
          starter: "Package my [automation] offer for [niche]: scope, setup fee, monthly retainer (what's included), and 3 tiers with the value each delivers.",
          hint: "Scope + setup fee + retainer + tiers + value.",
          success: "Strong answers define a clear scope, a setup fee, a retainer with inclusions, and value-based tiers.",
        },
      },
    ],
    quiz: [
      { q: "The strongest agency positioning is…", options: ["AI for everyone", "A specific niche + productized outcome", "Hourly consulting", "No focus"], answer: 1, why: "Specificity sells and compounds via referrals." },
      { q: "Best way to close a client?", options: ["List features", "A free audit or working demo of their process", "Cold pitch only", "Wait to be found"], answer: 1, why: "Showing a working automation beats telling." },
      { q: "The pricing model that builds a business is…", options: ["One-off only", "Setup fee + monthly retainer", "Free", "Hourly forever"], answer: 1, why: "Recurring revenue rewards ongoing value and smooths cash flow." },
      { q: "How do you scale delivery?", options: ["Reinvent each build", "Templatize builds + SOPs", "Avoid documentation", "Never hire"], answer: 1, why: "Reusable templates raise speed and margin." },
    ],
    resources: [
      { label: "Flagship offer", note: "Master one productized offer before expanding." },
      { label: "Retainer + monitoring", note: "Recurring revenue plus upkeep is the real business." },
    ],
  });
})();
