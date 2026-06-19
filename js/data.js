/* =============================================================================
   PROMETHEUS · Curriculum + Game Design Data
   -----------------------------------------------------------------------------
   Single source of truth. Follows the 5-module plan exactly: every module has
   a LESSON (avatar video + transcript), a TRAINING (hands-on simulation) and a
   GAME (gamified test). The UI renders entirely from this structure, and
   /schema.sql mirrors it so the static build can graduate to the
   full Next.js + Supabase + Drizzle + Vercel stack with no data rework.
   ============================================================================= */

const PROMETHEUS_DATA = {
  meta: {
    name: "Prometheus",
    tagline: "From doers to directors. Master the AI workflow era.",
    version: "1.0.0",
  },

  /* Subscription tiers — wired to Stripe in js/sandbox.js (CONFIG.stripe). */
  tiers: [
    { id: "initiate", name: "Initiate", price: 0, cadence: "forever", accent: "blue",
      blurb: "Open the gate. Foundations + the full platform feel.",
      perks: ["Module 1 · The Paradigm Shift", "Holographic skill tree", "Prompt Sandbox (demo mode)", "Hallucination Hunter game"],
      cta: "Start free" },
    { id: "operator", name: "Operator", price: 49, cadence: "/month", accent: "purple", featured: true,
      blurb: "The full arsenal. Every module, avatar, training & game.",
      perks: ["All 5 modules unlocked", "Avatar instructors (HeyGen)", "Live Prompt Sandbox (Claude + GPT)", "All 5 arcade-style games", "Certificates of mastery"],
      cta: "Become an Operator" },
    { id: "architect", name: "Architect", price: 199, cadence: "/month", accent: "gold",
      blurb: "For builders monetizing at scale. Done-with-you systems.",
      perks: ["Everything in Operator", "Wealth Engine blueprints + templates", "Monthly 1:1 architecture review", "Private agency playbook vault", "Priority avatar request queue"],
      cta: "Go Architect" },
  ],

  /* Cast — ultra-realistic AI avatar instructors (HeyGen). Each lesson is hosted
     by one of these characters; the player styles the stage to match. */
  characters: {
    architect: {
      name: "The Architect", discipline: "Backend & System Design",
      look: "Sharp minimalist attire in a dim, futuristic server room",
      voice: "Deep · calm · methodical · authoritative", portrait: "AR",
      backdrop: "stage-architect", accent: "blue",
    },
    catalyst: {
      name: "The Catalyst", discipline: "Marketing, Sales & Outbound AI",
      look: "Modern streetwear against a bright, bustling agency backdrop",
      voice: "Energetic · fast-paced · hype", portrait: "CA",
      backdrop: "stage-catalyst", accent: "gold",
    },
    byte: {
      name: "Byte", discipline: "Beginner Guide & Sandbox Assistant",
      look: "Friendly, highly expressive digital human",
      voice: "Warm · empathetic · encouraging", portrait: "BY",
      backdrop: "stage-byte", accent: "teal",
    },
  },

  modules: [
    /* ====================== MODULE 1 ====================== */
    {
      id: "m1",
      code: "01",
      title: "The Paradigm Shift",
      subtitle: "From Doers to Directors",
      tagline: "The era of manual execution is ending.",
      color: "blue",
      icon: "◈",
      xp: 300,
      summary:
        "The evolution of work — from doers who execute by hand to directors who orchestrate AI agents. Learn the anatomy of a perfect prompt and train your eye to catch AI hallucinations.",
      lesson: {
        title: "From Doers to Directors",
        duration: "14 min",
        level: "Foundations",
        character: "byte",
        avatar: { name: "Dr. Aria Vance", role: "AI Historian", voice: "Aria · Calm Authority", portrait: "AV" },
        summary: "How the era of 'doers' is ending and the era of 'directors' — orchestrating fleets of AI agents — has begun.",
        sections: [
          { heading: "The End of the Doer", body: "For all of history, value came from doing the task yourself — typing the email, building the spreadsheet, writing the code. That era is closing. When a machine can do the task in seconds, your hands are no longer the bottleneck." },
          { heading: "The Rise of the Director", body: "The new high-value role is the director: someone who designs the system, briefs the agents, and owns the outcome. You stop being the one who does the work and become the one who orchestrates the work being done." },
          { heading: "Why This Pays More", body: "A doer earns once, for one task, capped by their own hours. A director designs a workflow that runs a thousand times while they sleep. Leverage — not labor — is what compounds." },
        ],
        transcript: [
          { t: 0, text: "Welcome to Prometheus. I'm Aria, and this is the shift that changes everything." },
          { t: 5, text: "For all of history, value meant doing the task with your own hands." },
          { t: 11, text: "But when a machine does the task in seconds, your hands stop being the bottleneck." },
          { t: 18, text: "The new role is the director — you design the system and brief the agents." },
          { t: 25, text: "A doer earns once. A director builds a workflow that runs while they sleep." },
          { t: 32, text: "By the end of Prometheus, you will be the director. Let's begin." },
        ],
      },
      training: {
        type: "prompt-sandbox",
        title: "The Anatomy of a Perfect Prompt",
        objective: "Learn the four pillars of a perfect prompt — Role, Task, Constraints, Output — then write one. The AI grades you out of 100 on clarity and constraints.",
        scenario: "Write a prompt that gets an AI to draft a cold outreach email to a SaaS founder offering an automation audit.",
        rubric: ["Role", "Task", "Constraints", "Output"],
        starterPrompt: "You are a B2B copywriter. Write a 90-word cold email to a SaaS founder offering a free automation audit. Constraints: friendly but concise, one clear CTA, no jargon, reference their growth. Output: subject line + body, plain text.",
        tips: [
          "ROLE — tell the model who it is ('You are a senior B2B copywriter').",
          "TASK — state exactly what to produce ('write a 90-word cold email').",
          "CONSTRAINTS — set the rules ('friendly, one CTA, no jargon, under 90 words').",
          "OUTPUT — define the shape ('return a subject line + body in plain text').",
        ],
      },
      game: {
        type: "hallucination-hunter",
        title: "Hallucination Hunter",
        tagline: "Click the confident lies before time runs out.",
        howTo: "Each round shows AI-generated text. Click every sentence that is confidently stated but factually wrong. Score points for catches, lose points for false flags.",
        timePerRound: 22,
        rounds: [
          {
            topic: "The Solar System",
            sentences: [
              { text: "The Sun is the star at the center of our solar system.", hallucination: false },
              { text: "Mars has fourteen moons, the largest of which is Titan.", hallucination: true, why: "Mars has only two moons (Phobos and Deimos). Titan orbits Saturn." },
              { text: "Jupiter is the largest planet in the solar system.", hallucination: false },
              { text: "Venus is the closest planet to the Sun.", hallucination: true, why: "Mercury is the closest planet to the Sun, not Venus." },
              { text: "Earth completes one orbit around the Sun in about 365 days.", hallucination: false },
            ],
          },
          {
            topic: "World History",
            sentences: [
              { text: "The Great Wall of China was built over many centuries.", hallucination: false },
              { text: "World War II ended in 1945.", hallucination: false },
              { text: "Albert Einstein invented the telephone in 1876.", hallucination: true, why: "Alexander Graham Bell is credited with the telephone; Einstein was a physicist." },
              { text: "The printing press was popularized by Johannes Gutenberg.", hallucination: false },
              { text: "The Roman Empire was founded in the year 1500.", hallucination: true, why: "Rome's empire began around 27 BCE — well over a thousand years earlier." },
            ],
          },
          {
            topic: "Artificial Intelligence",
            sentences: [
              { text: "Large language models are trained to predict the next token.", hallucination: false },
              { text: "The Transformer architecture was introduced in a 2017 paper on attention.", hallucination: false },
              { text: "GPT stands for 'General Processing Transistor'.", hallucination: true, why: "GPT stands for 'Generative Pre-trained Transformer'." },
              { text: "An AI hallucination is when a model states false information confidently.", hallucination: false },
              { text: "Neural networks contain exactly one billion neurons by law.", hallucination: true, why: "There is no such law; network size varies enormously by model." },
            ],
          },
        ],
      },
      bonusGame: {
        type: "prompt-debugger",
        title: "The Prompt Debugger",
        tagline: "Fix the slop. Make the AI sing.",
        difficulty: "Beginner",
        howTo: "Here's the 'AI slop' a lazy prompt produced. Rewrite the prompt in the terminal — add a role, constraints, a tone, and negative prompts (what to avoid) — until it scores high enough to ship a perfect output.",
        brief: "Get the AI to write ONE punchy LinkedIn hook for an AI automation agency owner.",
        weakPrompt: "write a linkedin post about my business",
        slop: "Sure! 😊 Here is a great LinkedIn post about your business!\n\n\"In today's fast-paced world, businesses need to leverage cutting-edge solutions to stay ahead. Our company is passionate about delivering value and synergy to all our valued customers. Contact us today to learn more!\" #business #success #innovation",
        targetScore: 80,
        perfectOutput: "Your competitors reply to new leads in 6 hours.\nMine reply in 60 seconds — automatically, 24/7.\n\nHere's the exact 3-step system I install for agencies 👇",
        tips: [
          "ROLE — 'You are a senior B2B copywriter who writes scroll-stopping hooks.'",
          "TASK — 'Write ONE LinkedIn hook (max 25 words) for an AI automation agency.'",
          "CONSTRAINTS — 'Lead with a concrete number, one idea, no hashtags.'",
          "NEGATIVE PROMPTS — 'Avoid clichés like synergy, cutting-edge, fast-paced, valued customers, emojis.'",
          "OUTPUT — 'Return only the hook, plain text.'",
        ],
      },
    },

    /* ====================== MODULE 2 ====================== */
    {
      id: "m2",
      code: "02",
      title: "Vibe Coding & Instant Apps",
      subtitle: "Build software without writing it",
      tagline: "From manual coding to living systems.",
      color: "purple",
      icon: "❖",
      xp: 360,
      summary:
        "Move from manual coding to vibe coding. Understand the gap between raw code generators and deployed 'living systems', practice scaffolding an MVP with v0, Cursor and Lovable, then race to deploy in the Prompt-to-Prod puzzle.",
      lesson: {
        title: "Vibe Coding & Living Systems",
        duration: "16 min",
        level: "Intermediate",
        character: "byte",
        avatar: { name: "Nova Reyes", role: "Vibe Coding Lead", voice: "Nova · Energetic", portrait: "NR" },
        summary: "The difference between basic code generators that hand you raw files and 'living systems' that ship deployed apps with built-in memory and agents.",
        sections: [
          { heading: "Generators vs. Living Systems", body: "Basic code generators output raw React files you still have to wire up and deploy yourself. 'Living systems' like Taskade Genesis hand you a deployed app with built-in memory and agents — the difference between a pile of lumber and a furnished house." },
          { heading: "The Vibe Coding Stack", body: "v0 by Vercel drafts beautiful UI components from a description. Cursor and Lovable scaffold full applications — frontend, backend, auth — from intent. You direct; they build." },
          { heading: "You Direct, It Builds", body: "Your job shifts from writing every line to describing outcomes, reviewing the result, and redirecting. Taste and clarity replace syntax as the skills that matter." },
        ],
        transcript: [
          { t: 0, text: "Coding just changed forever. This is vibe coding." },
          { t: 5, text: "Basic generators give you raw files you still have to deploy yourself." },
          { t: 12, text: "Living systems hand you a deployed app — with memory and agents built in." },
          { t: 19, text: "v0 drafts your UI. Cursor and Lovable scaffold the whole app." },
          { t: 26, text: "You stop writing every line. You describe, review, redirect." },
        ],
      },
      training: {
        type: "guided-build",
        title: "Scaffold an MVP Dashboard",
        objective: "Practice the vibe-coding workflow: design a component with v0, then prompt Cursor/Lovable to scaffold a full-stack MVP dashboard. Write each prompt and compare against a model answer.",
        steps: [
          { tool: "v0 by Vercel", goal: "Generate the UI for a metrics card component.", prompt: "A glassy dark-mode metrics card: big number, label, small up/down trend pill, subtle neon glow. Responsive.", model: "v0 returns a styled React component with props for value, label, and trend — copy it straight into your project." },
          { tool: "Cursor", goal: "Scaffold the dashboard page that uses the card.", prompt: "Build a dashboard page with a responsive grid of 4 metric cards (users, revenue, churn, MRR) pulling from a /api/metrics route. TypeScript + Tailwind.", model: "Cursor generates the page, the grid layout, the API route stub, and types — wired together." },
          { tool: "Lovable + Supabase", goal: "Add auth and a database so it's a real MVP.", prompt: "Add Supabase email auth and a 'metrics' table; protect the dashboard so only signed-in users see it; seed demo data.", model: "Lovable provisions auth, creates the table, gates the route, and seeds rows — a deployable MVP." },
        ],
      },
      game: {
        type: "prompt-to-prod",
        title: "Prompt-to-Prod",
        tagline: "Drag the tools into the right order to ship.",
        howTo: "You're given a business problem. Drag the correct sequence of tools/prompts into the pipeline — design, then build, then data, then deploy — to successfully ship the app.",
        rounds: [
          {
            problem: "Build a client portal where customers log in and view their projects.",
            correctOrder: ["v0 — design the UI", "Cursor — build the logic", "Supabase — add auth + database", "Vercel — deploy to production"],
            distractors: ["Photoshop — mock a logo", "Excel — track tasks by hand"],
          },
          {
            problem: "Ship a landing page that captures emails into a database.",
            correctOrder: ["v0 — design the landing page", "Lovable — wire the form", "Supabase — store the leads", "Vercel — deploy live"],
            distractors: ["Figma — endless redesign", "Print flyers"],
          },
        ],
      },
    },

    /* ====================== MODULE 3 ====================== */
    {
      id: "m3",
      code: "03",
      title: "The Wealth Engine",
      subtitle: "B2B Sales & AI Outbound",
      tagline: "Pipelines that fill themselves.",
      color: "teal",
      icon: "▲",
      xp: 420,
      summary:
        "Build high-converting outbound engines with Clay — a spreadsheet with API superpowers. Master 6-step waterfall enrichment (Apollo → Findymail → Datagma), deploy Claygent to scrape intent signals, then optimize your data credits in the arcade.",
      lesson: {
        title: "Clay & the Outbound Engine",
        duration: "18 min",
        level: "Advanced",
        character: "catalyst",
        avatar: { name: "Sofia Lang", role: "GTM Engineer", voice: "Sofia · Warm Pro", portrait: "SL" },
        summary: "The mechanics of building high-converting outbound sales engines, using Clay as a spreadsheet with API superpowers.",
        sections: [
          { heading: "A Spreadsheet With API Superpowers", body: "Clay looks like a spreadsheet, but every column can be a live API call or an AI step. You build a list of prospects, then add columns that enrich, score, and write personalized copy across thousands of rows." },
          { heading: "Waterfall Enrichment", body: "Instead of asking one provider for an email, Clay asks provider 1; on a miss it falls to provider 2, then 3. Chaining providers like Apollo → Findymail → Datagma pushes match rates far beyond any single tool — and you only pay for hits." },
          { heading: "Claygent: Your Web Scout", body: "Claygent is an AI agent inside Clay that scrapes the web for specific intent signals — hiring sprees, funding, tech changes — so every outreach can reference a real, timely reason to reach out." },
        ],
        transcript: [
          { t: 0, text: "This is the wealth engine: outbound that fills your pipeline automatically." },
          { t: 6, text: "Clay looks like a spreadsheet, but every column is an API call." },
          { t: 13, text: "The superpower is the waterfall — ask one provider, miss, fall to the next." },
          { t: 21, text: "Apollo, then Findymail, then Datagma. Match rates soar, and you only pay for hits." },
          { t: 29, text: "And Claygent scours the web for the perfect reason to reach out." },
        ],
      },
      training: {
        type: "waterfall-builder",
        title: "Build a 6-Step Clay Waterfall",
        objective: "Assemble a 6-step Clay enrichment workflow. Order the steps so you query the cheapest provider first and fall back only when needed, then add Claygent to scrape intent signals.",
        correctSteps: [
          "Import lead list (company + name)",
          "Find email — Apollo (try first, cheapest)",
          "Fallback — Findymail (on Apollo miss)",
          "Fallback — Datagma (on Findymail miss)",
          "Claygent — scrape company for intent signals",
          "AI — write personalized opener & score fit",
        ],
        note: "Why this order? Cheap providers first conserves credits; expensive ones only run on a miss. Enrichment before personalization means the AI has real data to work with.",
      },
      game: {
        type: "credit-optimizer",
        title: "The Credit Optimizer",
        tagline: "Find the most emails without bankrupting your credits.",
        howTo: "You have 500 leads and a strict budget of Data Credits. Order your enrichment tools into a waterfall — each tool only queries the leads the previous one missed, and you pay per query. Cheaper-first conserves credits for the hard cases. Maximize emails found without bankrupting your credit pool.",
        budget: 1800,
        leads: 500,
        providers: [
          { name: "Apollo", cost: 1, hitRate: 0.50, note: "Cheap, broad coverage. Run first." },
          { name: "Clearbit", cost: 2, hitRate: 0.40, note: "Mid-cost, good on the misses." },
          { name: "Claygent", cost: 5, hitRate: 0.45, note: "AI web research — pricey, catches hard cases. Run last." },
        ],
        optimalOrder: ["Apollo", "Clearbit", "Claygent"],
      },
    },

    /* ====================== MODULE 4 ====================== */
    {
      id: "m4",
      code: "04",
      title: "Agentic Orchestration",
      subtitle: "Workflows that think & act",
      tagline: "Connect apps so they reason on their own.",
      color: "violet",
      icon: "⬡",
      xp: 440,
      summary:
        "Connect applications so they think and act autonomously. Learn the gap between trigger-action tools like Zapier and AI-native platforms like Gumloop and n8n, build a Meeting Prep Agent, then debug a broken flow against the clock.",
      lesson: {
        title: "Zapier vs. AI-Native Orchestration",
        duration: "17 min",
        level: "Advanced",
        character: "architect",
        avatar: { name: "Kai Mercer", role: "Orchestration Architect", voice: "Kai · Methodical", portrait: "KM" },
        summary: "Connecting applications so they think and act autonomously — and the difference between simple trigger-action tools and AI-native reasoning platforms.",
        sections: [
          { heading: "Trigger-Action vs. Reasoning", body: "Tools like Zapier are linear: when X happens, do Y. Powerful, but they don't think. AI-native platforms like Gumloop and n8n add reasoning — a node can decide, branch, summarize, and choose what to do next." },
          { heading: "Nodes That Decide", body: "In Gumloop and n8n you drag nodes onto a canvas and connect them, but some of those nodes are AI: classify this, summarize that, decide the route. Your automation stops being a straight line and starts being a system that adapts." },
          { heading: "Autonomy With Guardrails", body: "Give an agentic workflow tools, a goal, and checkpoints. It can pull data, reason over it, and act — while you keep a human gate where the stakes are high." },
        ],
        transcript: [
          { t: 0, text: "Let's make your apps think, not just react." },
          { t: 5, text: "Zapier is linear — when X happens, do Y. It doesn't reason." },
          { t: 12, text: "Gumloop and n8n add AI nodes that decide, branch, and summarize." },
          { t: 20, text: "Your workflow stops being a straight line and becomes a system that adapts." },
          { t: 27, text: "Give it tools, a goal, and a human gate where it matters." },
        ],
      },
      training: {
        type: "node-mapper",
        title: "Build a Meeting Prep Agent",
        objective: "Build a simulated Meeting Prep Agent in Gumloop. Connect the nodes so that, before a scheduled meeting, the agent pulls calendar data, searches the CRM, and sends a Slack summary.",
        nodes: [
          { id: "trigger", label: "Trigger: 30 min before meeting", fixed: true },
          { id: "calendar", label: "Pull event from Google Calendar" },
          { id: "crm", label: "Search CRM for the attendee" },
          { id: "ai", label: "AI: summarize who they are & talking points" },
          { id: "slack", label: "Send summary to Slack" },
        ],
        correctOrder: ["trigger", "calendar", "crm", "ai", "slack"],
        note: "Order matters: you need the event before you can look up the attendee, the CRM data before the AI can summarize, and the summary before you can send it.",
      },
      game: {
        type: "fix-the-flow",
        title: "Fix the Flow",
        tagline: "60 seconds to find the broken node and rewire it.",
        howTo: "A workflow has a data bottleneck — one node points at the wrong API endpoint. Find the broken node, then pick the correct endpoint to rewire it before the timer hits zero.",
        timeLimit: 60,
        rounds: [
          {
            flowName: "Lead Reply Automation",
            nodes: [
              { id: "n1", label: "Webhook: new lead", endpoint: "POST /leads/incoming", broken: false },
              { id: "n2", label: "Enrich lead", endpoint: "GET /enrich/company", broken: false },
              { id: "n3", label: "Draft reply (AI)", endpoint: "GET /weather/today", broken: true },
              { id: "n4", label: "Send email", endpoint: "POST /email/send", broken: false },
            ],
            correctEndpoint: "POST /ai/generate",
            options: ["POST /ai/generate", "GET /weather/today", "DELETE /users", "GET /stock/price"],
          },
          {
            flowName: "Meeting Prep Agent",
            nodes: [
              { id: "n1", label: "Trigger: before meeting", endpoint: "CRON 30m-before", broken: false },
              { id: "n2", label: "Get calendar event", endpoint: "GET /random/cat-fact", broken: true },
              { id: "n3", label: "Search CRM", endpoint: "GET /crm/contact", broken: false },
              { id: "n4", label: "Post to Slack", endpoint: "POST /slack/message", broken: false },
            ],
            correctEndpoint: "GET /calendar/event",
            options: ["GET /random/cat-fact", "GET /calendar/event", "POST /payments", "GET /news/today"],
          },
        ],
      },
    },

    /* ====================== MODULE 5 ====================== */
    {
      id: "m5",
      code: "05",
      title: "Faceless Media",
      subtitle: "Automated Content Empires",
      tagline: "Publish at scale without a camera.",
      color: "gold",
      icon: "✦",
      xp: 400,
      summary:
        "Build automated media empires. Use tools like Crreo AI to generate full 10–15 minute YouTube videos from a single script — no timeline editing — then repurpose one transcript into a thread, a post, and a Short in the Viral Editor.",
      lesson: {
        title: "The Faceless Media Empire",
        duration: "15 min",
        level: "Monetization",
        character: "catalyst",
        avatar: { name: "Mara Quinn", role: "Content Systems Coach", voice: "Mara · Inspiring", portrait: "MQ" },
        summary: "How to build automated media empires — generating full 10–15 minute YouTube videos from a single script with no timeline editing skills.",
        sections: [
          { heading: "Script In, Video Out", body: "Tools like Crreo AI turn a single script into a complete 10–15 minute YouTube video — visuals, voiceover, pacing — with no timeline editing. The skill moves from editing to directing the style." },
          { heading: "One Asset, Many Channels", body: "Every long video is raw material. The same script becomes a Short, a Twitter thread, and a LinkedIn post. One creation, many channels — that's how a faceless empire scales." },
          { heading: "Systematize the Output", body: "Pick a niche, build a repeatable script template, generate on a schedule, and repurpose automatically. Volume plus consistency is the whole game." },
        ],
        transcript: [
          { t: 0, text: "Welcome to the faceless media empire — publishing at scale, no camera." },
          { t: 6, text: "Tools like Crreo AI turn one script into a full 15-minute video." },
          { t: 13, text: "No timeline editing — you direct the style, the AI assembles it." },
          { t: 20, text: "Then every video becomes a Short, a thread, and a post." },
          { t: 27, text: "One creation, many channels. That's how the empire scales." },
        ],
      },
      training: {
        type: "video-studio",
        title: "Generate a Faceless Video",
        objective: "Write a short script and direct the production: pick a visual style, an AI voiceover, and the pacing. Watch how your choices assemble into a cohesive faceless video plan.",
        scriptPlaceholder: "Hook: Most people use AI wrong. Here are 3 prompts that change everything...",
        styles: ["Cinematic B-roll", "Whiteboard explainer", "Retro VHS", "Clean motion graphics"],
        voices: ["Deep narrator", "Bright & upbeat", "Calm documentary", "Energetic creator"],
        pacings: ["Fast (Shorts)", "Medium (YouTube)", "Slow (documentary)"],
      },
      game: {
        type: "viral-editor",
        title: "The Viral Editor",
        tagline: "Turn one transcript into three viral formats.",
        howTo: "You're given a raw transcript. Drag the strongest hooks and points into each format — a Twitter thread, a LinkedIn post, and a YouTube Short — to maximize your Engagement Score. The right line in the right format scores big.",
        transcriptTitle: "Why most automations fail",
        snippets: [
          { id: "s1", text: "Most automations fail because they automate a broken process.", best: "twitter" },
          { id: "s2", text: "Here's the 3-step fix I use with every client...", best: "twitter" },
          { id: "s3", text: "I saved a roofing company 20 hours a week with one workflow.", best: "linkedin" },
          { id: "s4", text: "The lesson: fix the process first, then automate it.", best: "linkedin" },
          { id: "s5", text: "Stop automating chaos. Watch this.", best: "short" },
          { id: "s6", text: "This 7-second hook tripled my views.", best: "short" },
          { id: "s7", text: "Um, so anyway, that's basically the whole thing I guess.", best: null },
        ],
        formats: [
          { id: "twitter", label: "Twitter / X Thread", hint: "Punchy, list-driven, curiosity hooks." },
          { id: "linkedin", label: "LinkedIn Post", hint: "Story + result + lesson, professional." },
          { id: "short", label: "YouTube Short", hint: "A 7-second pattern-interrupt hook." },
        ],
      },
    },

    /* ====================== MODULE 6 ====================== */
    {
      id: "m6",
      code: "06",
      title: "Advanced Operations",
      subtitle: "Enterprise AI engineering",
      tagline: "Where most courses stop, you begin.",
      color: "blue",
      icon: "⌬",
      xp: 480,
      summary:
        "The deep end. Enterprise-grade waterfall enrichment with Claygent web research, giving agents secure tool access via the Model Context Protocol, and building self-running 'living software' with Workspace DNA — then debugging a live outage against the clock.",
      lesson: {
        title: "Deep Dives: Waterfalls, MCP & Living Software",
        duration: "24 min",
        level: "Expert",
        character: "architect",
        avatar: { name: "The Architect", role: "Systems Architect", voice: "Architect · Deep Authority", portrait: "AR" },
        summary: "Three operations most courses ignore — advanced waterfall enrichment, the Model Context Protocol, and living software with Workspace DNA.",
        sections: [
          { heading: "Deep Dive 1 · Advanced Waterfall Enrichment", body: "Enterprise outbound stacks 150+ data providers sequentially: if Apollo misses an email, Clearbit catches it, then Claygent — an AI web research agent — scrapes SEC filings and press releases for hyper-personalized hooks. You pay only for hits and personalize at a depth manual research can't match." },
          { heading: "Deep Dive 2 · Mastering MCP (Model Context Protocol)", body: "MCP gives AI agents secure, governed access to external tools. You deploy an MCP Gateway that authenticates the agent, enforces tool permissions, and routes calls to Jira, Slack, Stripe, and internal databases — moving past chat into true enterprise automation." },
          { heading: "Deep Dive 3 · Living Software & Workspace DNA", body: "Beyond one-shot code generators, 'living systems' (e.g. Taskade Genesis) have Workspace DNA — memory and intelligence that read real-time databases and run 24/7 background automations. You build apps that keep working after you close the laptop." },
        ],
        transcript: [
          { t: 0, text: "Welcome to the deep end. I'm the Architect." },
          { t: 5, text: "First: waterfall enrichment. Stack providers so a miss always has a backup." },
          { t: 12, text: "Then Claygent scrapes filings and press releases for the perfect hook." },
          { t: 19, text: "Next, MCP — a gateway that gives your agent secure access to real tools." },
          { t: 27, text: "Finally, living software: apps with memory that run 24/7 on their own." },
          { t: 34, text: "Master these and you're not using AI — you're engineering with it." },
        ],
      },
      training: {
        type: "mcp-gateway",
        title: "Deploy an MCP Gateway",
        objective: "Wire a secure MCP Gateway between an AI agent and enterprise tools. Order the steps so every tool call is authenticated and policy-checked before it ever reaches Jira, Slack, Stripe, or your database.",
        correctSteps: [
          "AI agent issues a tool request",
          "MCP Gateway authenticates the agent",
          "Gateway checks tool permissions & policy",
          "Gateway routes to the tool (Jira / Slack / Stripe / DB)",
          "Tool result returns through the gateway",
          "Gateway logs the call for audit",
        ],
        note: "Why this order? The gateway is the trust boundary: authenticate first, authorize against policy second, and only then touch a real tool. Logging every call keeps the whole thing auditable.",
      },
      game: {
        type: "chaos-engineering-sandbox",
        title: "Chaos Engineering Sandbox",
        tagline: "Trace the outage. Merge the fix. Beat the clock.",
        difficulty: "Advanced",
        howTo: "An outage was injected into your live pipeline. Read the logs, open the file with the failing dependency, then choose the correct fix to merge — before the timer hits zero. Open the wrong file and you lose time.",
        timeLimit: 75,
        logs: [
          "12:04:01 INFO  webhook/lead.ts → new lead accepted (id 8842)",
          "12:04:01 INFO  api/enrich.ts → calling clearbit.v1/find …",
          "12:04:31 ERROR api/enrich.ts:42 → ECONNREFUSED clearbit.v1 (timeout 30s)",
          "12:04:31 WARN  queue/worker.ts → enrich retry 3/3 failed, job parked",
          "12:04:32 INFO  api/score.ts → awaiting enrich result … (blocked)",
          "12:04:32 ERROR pipeline stalled: 412 leads queued, 0 processed",
        ],
        files: [
          { id: "f1", name: "api/enrich.ts", broken: true, hint: "calls clearbit.v1 — the endpoint throwing ECONNREFUSED" },
          { id: "f2", name: "api/score.ts", broken: false, hint: "only blocked because enrich never returns" },
          { id: "f3", name: "queue/worker.ts", broken: false, hint: "correctly retried 3x then parked the job" },
          { id: "f4", name: "lib/db.ts", broken: false, hint: "healthy — no DB errors in the logs" },
        ],
        fixes: [
          "Point enrich.ts at the healthy clearbit.v2 endpoint and add an Apollo fallback on timeout",
          "Delete the queue so jobs stop parking",
          "Increase the score.ts timeout to 10 minutes",
          "Restart the leads webhook",
        ],
        correctFix: "Point enrich.ts at the healthy clearbit.v2 endpoint and add an Apollo fallback on timeout",
      },
    },
  ],
};

/* Derived helpers shared across the app. */
PROMETHEUS_DATA.totalModules = PROMETHEUS_DATA.modules.length;
PROMETHEUS_DATA.totalActivities = PROMETHEUS_DATA.modules.length * 3; // lesson + training + game each
PROMETHEUS_DATA.totalXP = PROMETHEUS_DATA.modules.reduce((s, m) => s + m.xp, 0);

if (typeof window !== "undefined") window.PROMETHEUS_DATA = PROMETHEUS_DATA;
