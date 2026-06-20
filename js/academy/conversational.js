/* =============================================================================
   PROMETHEUS · Academy · Conversational AI
   ChatGPT, Claude, Gemini, Perplexity. Reflects the 2026 landscape
   (GPT-5 era, Claude Opus 4.6 + Claude Code, Gemini 3, Perplexity Deep Research).
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== ChatGPT ============================== */
  ACADEMY.register({
    id: "chatgpt",
    title: "ChatGPT Mastery (GPT-5 era)",
    tagline: "Run the world's most popular AI like a power operator, not a tourist.",
    category: "Conversational AI",
    icon: "💬",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~90 min",
    instructor: { name: "Nova Reyes", role: "LLM Specialist", persona: "fast, practical, allergic to fluff", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Hands-on", "Graded exercises"] },
    overview:
      "ChatGPT is the default AI for hundreds of millions of people — which means most users only scratch the surface. This track takes you to the operator level: the model picker, custom instructions, memory, Projects, voice, Canvas, image generation, and Deep Research.\n\nYou'll learn not just what each feature does, but exactly when to reach for it and how to prompt it so the first answer is the right one.",
    whyItMatters:
      "ChatGPT is where most people's AI habits form. Build great habits here and every other tool feels familiar; build lazy ones and you'll fight the model forever.",
    outcomes: [
      "Pick the right model for the job instead of defaulting blindly",
      "Configure custom instructions and memory so every chat starts smarter",
      "Use Projects, Canvas, voice, and Deep Research deliberately",
      "Write prompts that get a usable answer on the first try",
    ],
    lessons: [
      {
        id: "l1",
        title: "The model picker & how GPT-5 routes",
        level: "Beginner",
        duration: "9 min",
        summary: "Stop using one model for everything — match the model's effort to the task.",
        sections: [
          { heading: "One name, several brains", body: "Modern ChatGPT presents a small menu of models that trade speed for depth. A fast default handles everyday questions instantly; a heavier 'thinking' or reasoning mode pauses to work through hard problems and is far stronger on math, code, and multi-step analysis. The GPT-5 generation adds automatic routing that tries to send each message to the right one — but you can still override it, and knowing when to is the whole skill." },
          { heading: "When to force the thinking model", body: "Reach for the reasoning mode whenever a wrong answer is expensive or the task has several steps: debugging code, planning a project, analyzing a contract, doing math. It is slower and you have fewer messages of it on lower tiers, so save it for problems that deserve the horsepower." },
          { heading: "When the fast model wins", body: "For quick rewrites, brainstorming, format changes, and casual questions, the fast model is better — you get instant answers and don't burn your reasoning quota. Speed is a feature; use it." },
        ],
        keyTakeaways: [
          "Fast model for simple/iterative work; thinking model for hard, multi-step, or costly tasks.",
          "Auto-routing helps, but override it when stakes are high.",
          "Heavier models have tighter usage limits — spend them where they matter.",
        ],
        settings: [
          { name: "Model picker", detail: "Top of the chat. Default/fast for everyday; the thinking/reasoning option for hard problems." },
          { name: "Usage limits", detail: "Reasoning models have lower message caps on Plus/free tiers — plan around them." },
        ],
        features: [
          { name: "Auto routing (GPT-5)", detail: "Sends each message to a fast or thinking model automatically; you can still pick manually." },
        ],
        proTips: [
          "If an answer feels shallow on something important, resend with the thinking model and the same prompt — quality often jumps.",
          "Start a fresh chat per distinct task; long mixed threads dilute the model's focus.",
        ],
        pitfalls: [
          "Using the heaviest model for trivial questions and hitting your cap by noon.",
          "Assuming 'auto' always picks right — it doesn't on ambiguous prompts.",
        ],
        exercise: {
          type: "reflect",
          brief: "List three tasks from your week and decide, for each, whether you'd use the fast model or the thinking model — and why.",
          hint: "Multi-step or costly-if-wrong → thinking; quick or iterative → fast.",
          success: "Good answers match effort to stakes: reasoning for code/planning/analysis, fast for rewrites/brainstorming/format changes.",
        },
        narration:
          "Most people pick a ChatGPT model once and never think about it again. Don't be most people. There's a fast model for everyday questions and a heavier thinking model that pauses to reason through hard problems — and it's dramatically better at code, math, and planning. The GPT-5 generation tries to route your message automatically, but you can override it, and that's the skill. Force the thinking model whenever a wrong answer is expensive or the task has several steps. Use the fast model for quick rewrites and brainstorming, because speed is its own feature and the heavy model has tighter limits. Match the effort to the task, start a fresh chat for each new job, and you'll get better answers while everyone else waits on the wrong model.",
      },
      {
        id: "l2",
        title: "Custom instructions & memory",
        level: "Beginner",
        duration: "11 min",
        summary: "Configure ChatGPT once so every future chat starts already knowing you.",
        sections: [
          { heading: "Custom instructions = your defaults", body: "In Settings, Custom Instructions let you tell ChatGPT who you are and how you want it to respond — permanently, across every chat. This is the highest-leverage five minutes you'll spend: instead of re-explaining your role and preferences each time, you set them once." },
          { heading: "Write them like a brief", body: "Two boxes: what you'd like the model to know about you, and how you'd like it to respond. Be specific and testable: 'I'm a solo founder in B2B SaaS. Lead with the answer, then a short why. Be concise, skip disclaimers, use plain English, and ask one clarifying question only if truly blocked.'" },
          { heading: "Memory", body: "Separately, ChatGPT can remember facts across conversations — your projects, preferences, ongoing work. Curate it: open the memory settings, delete stale or wrong entries, and say 'remember that…' for things worth persisting. Turn memory off (or use a temporary chat) for sensitive or client-confidential work." },
        ],
        keyTakeaways: [
          "Custom instructions set your response defaults for every chat.",
          "Be specific and testable — 'concise, lead with the answer' beats 'be helpful'.",
          "Curate memory; disable it for confidential work.",
        ],
        settings: [
          { name: "Custom Instructions", detail: "Settings → Personalization. Two prompts: about you + how to respond. Applies to all chats." },
          { name: "Memory", detail: "Settings → Personalization → Memory. Review, edit, or clear saved facts; toggle off when needed." },
          { name: "Temporary chat", detail: "A chat that isn't saved and doesn't read or write memory — ideal for sensitive one-offs." },
        ],
        features: [
          { name: "'Remember that…'", detail: "An explicit instruction that pins a fact to memory for future chats." },
        ],
        promptPlaybook: [
          { label: "Custom-instruction block (paste into Settings)", prompt: "About me: solo founder, B2B SaaS, non-technical but fluent. How to respond: lead with the direct answer, then a 1-2 line why. Be concise, no filler or disclaimers, plain English, bold key terms. Ask one clarifying question only if truly blocked.", why: "Upgrades every future chat at once — no more re-explaining yourself." },
        ],
        proTips: [
          "Keep a few custom-instruction blocks in a notes file (founder, coder, writer) and swap them when you switch hats.",
          "Review memory monthly — a stale 'I'm planning a launch in March' quietly skews answers in June.",
        ],
        pitfalls: [
          "Vague instructions ('be professional') — the model can't act on what isn't testable.",
          "Leaving memory on while pasting a client's confidential data.",
        ],
        exercise: {
          type: "reflect",
          brief: "Draft your own custom-instruction block: one line about you, one on response style, one explicit 'don't'.",
          hint: "Make every line testable — length, tone, what to avoid.",
          success: "Strong blocks state your context, a concrete response style, and clear don'ts — tight enough that the key rules stand out.",
        },
        narration:
          "Here's the highest-leverage five minutes in ChatGPT: custom instructions. In settings you can tell the model who you are and how you want it to answer — permanently, for every chat. Write it like a brief: your role, and your preferences, stated so specifically they're testable. 'Lead with the answer, then a short why. Be concise. Plain English. Ask before assuming.' Now you never re-explain yourself again. Separately, memory lets ChatGPT remember facts across conversations — but treat it like a garden. Prune it. Delete what's stale, pin what matters with 'remember that', and switch to a temporary chat for anything confidential. Configure the tool once, and it starts every conversation already knowing how you think.",
      },
      {
        id: "l3",
        title: "Projects, Canvas, voice & images",
        level: "Intermediate",
        duration: "12 min",
        summary: "The features that turn ChatGPT from a chatbot into a workspace.",
        sections: [
          { heading: "Projects = a workspace with shared context", body: "A Project bundles chats, files, and a custom prompt for one ongoing thing — a client, a codebase, a book. Upload the reference docs once and every chat inside the Project already knows them, so you stop re-pasting context. Use one Project per major thread of work." },
          { heading: "Canvas = side-by-side editing", body: "Canvas opens a document or code panel beside the chat so you can edit directly, ask for targeted changes ('tighten the third paragraph'), and track versions — far better than scrolling a long chat for long-form writing or code." },
          { heading: "Voice = think out loud", body: "Advanced voice mode is a real-time spoken conversation. It's ideal for brainstorming on a walk, rehearsing a pitch, practicing a language, or rubber-ducking a problem hands-free. Talking is often faster than typing for messy, exploratory thinking." },
          { heading: "Image generation & vision", body: "ChatGPT can generate images from a description and read images you upload — annotate a screenshot, extract text, get a chart explained, or iterate on a visual by describing edits in plain language." },
        ],
        keyTakeaways: [
          "Projects give a whole workstream shared context — upload once.",
          "Canvas beats chat scrolling for long docs and code.",
          "Voice is the fastest tool for messy, exploratory thinking.",
        ],
        settings: [
          { name: "Project files & instructions", detail: "Attach reference docs and a custom prompt to the Project; all its chats inherit them." },
          { name: "Advanced voice", detail: "The voice icon in the app; supports natural, interruptible spoken conversation." },
        ],
        features: [
          { name: "Canvas", detail: "A side panel for editing text/code with targeted edits and versions." },
          { name: "Vision (image input)", detail: "Upload images for analysis, OCR, chart reading, or visual iteration." },
        ],
        promptPlaybook: [
          { label: "Project system prompt", prompt: "This Project is [client/codebase/book]. Always assume [stack/brand voice/audience]. The attached files are the source of truth — prefer them over general knowledge, and cite which file you used.", why: "Sets shared context so every chat in the Project starts informed." },
          { label: "Canvas targeted edit", prompt: "In the canvas, cut this to 120 words, keep the opening line, and make the tone more direct. Don't touch the final paragraph.", why: "Precise, scoped edits beat 'rewrite this' for long-form work." },
        ],
        proTips: [
          "Spin up a Project for anything you'll touch more than twice — the shared context compounds.",
          "Use voice to draft messily out loud, then switch to text/Canvas to refine.",
        ],
        pitfalls: [
          "Dumping unrelated tasks into one Project — context bleeds and answers blur.",
          "Generating images for things that need real accuracy (exact text, logos, charts) — verify or use a dedicated tool.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Project system prompt for an ongoing piece of work you have (a client, a side project, a course you're writing).",
          starter: "This Project is my [thing]. Always assume [audience/constraints]. The attached files are the source of truth — prefer them and tell me which file you used. Respond concisely.",
          hint: "Name the workstream, set persistent assumptions, and point to the files as the source of truth.",
          success: "A strong Project prompt names the workstream, sets durable assumptions, and prioritizes attached files over generic knowledge.",
        },
        narration:
          "Three features turn ChatGPT from a chatbot into a workspace. First, Projects: bundle the chats, files, and a custom prompt for one ongoing thing — a client, a codebase, a book — and every chat inside already knows the context. Upload once, never re-paste. Second, Canvas: a document or code panel beside the chat, where you make targeted edits like 'tighten the third paragraph' instead of scrolling forever. Third, voice: a real-time spoken conversation that's perfect for brainstorming on a walk or rehearsing a pitch, because talking is faster than typing when your thinking is still messy. And it generates and reads images too. Use Projects for anything you'll touch more than twice, and the context compounds every session.",
      },
      {
        id: "l4",
        title: "Deep Research, GPTs & Tasks",
        level: "Advanced",
        duration: "12 min",
        summary: "Put ChatGPT to work on long research, repeatable jobs, and scheduled automations.",
        sections: [
          { heading: "Deep Research", body: "Deep Research sends ChatGPT to browse many sources over several minutes and return a long, cited report. Give it a specific question, the scope, and the output you want ('compare the top 4 CRMs for a 10-person agency; table of price, key features, best-for; cite sources'). It trades speed for depth — perfect for buying decisions, market scans, and literature reviews." },
          { heading: "Custom GPTs", body: "A custom GPT is a saved, configured version of ChatGPT with its own instructions, knowledge files, and sometimes actions. Build one for a job you do repeatedly — a brand-voice writer, a resume reviewer, a SQL helper — and reuse it instead of re-prompting. Share it with your team for consistency." },
          { heading: "Tasks (scheduling)", body: "Tasks let ChatGPT run on a schedule — a morning news brief, a weekly report reminder, a recurring check. It's the bridge from 'I ask' to 'it shows up,' and a gentle on-ramp to automation before you reach for n8n or Zapier." },
          { heading: "Verify what matters", body: "Even cited research can misread a source. For anything load-bearing, open the citation and confirm the claim. Use ChatGPT to find and synthesize fast — then trust, but verify." },
        ],
        keyTakeaways: [
          "Deep Research = slow, cited, thorough — give it scope and an output format.",
          "Build a custom GPT for any repeatable job; share for team consistency.",
          "Tasks schedule recurring runs — your first taste of automation.",
        ],
        settings: [
          { name: "Deep Research", detail: "A tool/toggle in the composer; expect minutes, not seconds, and a cited report." },
          { name: "GPT builder", detail: "Explore → Create. Add instructions, knowledge files, and optional actions." },
          { name: "Tasks", detail: "Schedule recurring prompts that run automatically and notify you." },
        ],
        features: [
          { name: "Custom GPTs", detail: "Reusable, configured assistants for specific repeatable work." },
        ],
        promptPlaybook: [
          { label: "Deep Research brief", prompt: "Research and compare the best [category] for [my situation]. Cover [criteria A, B, C]. Output a markdown table plus a 5-bullet recommendation. Cite every source and flag anything uncertain.", why: "Scope + criteria + output format turns a vague crawl into a usable report." },
          { label: "Custom GPT instructions", prompt: "You are my brand-voice writer for [brand]. Always: punchy, concrete, no clichés, short sentences. Never: emojis, hashtags, 'in today's world'. Ask for the goal and audience, then draft 3 options.", why: "Encodes a repeatable job once so you stop re-explaining the brief." },
        ],
        proTips: [
          "Kick off Deep Research, then go do something else — it works in the background for minutes.",
          "Turn your best recurring prompt into a custom GPT the third time you paste it.",
        ],
        pitfalls: [
          "Treating a cited report as automatically true — spot-check the load-bearing claims.",
          "Over-building GPTs you'll use once; only save the jobs you actually repeat.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Deep Research brief for a real decision you're facing. Include scope, criteria, and the exact output format.",
          starter: "Research and compare [options] for [my situation]. Criteria: [A, B, C]. Output: a markdown comparison table + a 5-bullet recommendation, with sources cited and uncertainties flagged.",
          hint: "Be specific about scope, the criteria that matter to you, and the output shape.",
          success: "Great research briefs constrain scope, name decision criteria, demand a clear output format, and require citations.",
        },
      },
    ],
    quiz: [
      { q: "When should you override auto-routing and force the thinking model?", options: ["For every message", "For quick rewrites", "For multi-step or costly-if-wrong tasks", "Never"], answer: 2, why: "Reasoning models earn their slower speed on code, planning, math, and analysis." },
      { q: "What do custom instructions do?", options: ["Set response defaults for every chat", "Delete your history", "Upgrade your plan", "Train the base model"], answer: 0, why: "They persist your role and preferences across all conversations." },
      { q: "Best feature for one ongoing client with shared files?", options: ["A new chat each time", "A Project", "Voice mode", "Temporary chat"], answer: 1, why: "Projects attach files + a prompt so every chat inside starts with context." },
      { q: "Deep Research is best described as…", options: ["Instant answers", "Slow, cited, thorough reports", "An image generator", "A scheduler"], answer: 1, why: "It browses many sources over minutes and returns a cited report." },
    ],
    resources: [
      { label: "Your instruction library", note: "Keep swappable custom-instruction blocks for each role you play." },
      { label: "Verify load-bearing claims", note: "Open citations from Deep Research before acting on anything important." },
    ],
  });

  /* ============================== Claude ============================== */
  ACADEMY.register({
    id: "claude",
    title: "Claude Mastery (Opus 4.6 & Claude Code)",
    tagline: "The thinking person's AI — best-in-class for writing, analysis, and code.",
    category: "Conversational AI",
    icon: "🧠",
    color: "violet",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~85 min",
    instructor: { name: "The Architect", role: "Systems & Reasoning Guide", persona: "calm, rigorous, deep", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Best for code", "Huge context"] },
    overview:
      "Claude, from Anthropic, is the model many professionals reach for when the work is serious — long documents, careful reasoning, and especially code. In 2026 the Opus 4.6 generation leads on clean code output, reads roughly a million tokens of context, and powers Claude Code, an agentic coding tool that works in your terminal.\n\nThis track covers chatting with Claude well, Projects and Artifacts, its enormous context window, and the agentic power of Claude Code.",
    whyItMatters:
      "When accuracy, nuance, and code quality matter, Claude is often the strongest pick. Knowing its strengths lets you route the right work to the right model.",
    outcomes: [
      "Know when Claude beats other assistants and why",
      "Use Projects and Artifacts for real deliverables",
      "Exploit the ~1M-token context window without wasting it",
      "Understand Claude Code's agentic workflow at a high level",
    ],
    lessons: [
      {
        id: "l1",
        title: "Why Claude, and how it thinks",
        level: "Beginner",
        duration: "9 min",
        summary: "Claude's strengths — reasoning, long context, and code — and how to prompt for them.",
        sections: [
          { heading: "Where Claude shines", body: "Claude is widely regarded as the best model for coding and a top choice for long-form writing and careful analysis. It tends to follow instructions faithfully, write in a natural voice, and reason carefully — which is why developers and writers gravitate to it. The Opus tier is the heavyweight; lighter tiers (Sonnet, Haiku) trade some depth for speed and cost." },
          { heading: "Extended thinking", body: "Claude can 'think' before answering on hard problems, reasoning step by step internally. For complex tasks, explicitly invite it: 'Think it through carefully before answering.' You'll trade a little speed for noticeably better results on analysis and code." },
          { heading: "It rewards clear, complete prompts", body: "Claude responds well to structure and context. Give it the role, the goal, the constraints, and the source material, and it will use them faithfully. Vague prompts get careful-but-generic answers; specific prompts get gold." },
        ],
        keyTakeaways: [
          "Claude leads on code and excels at long-form writing and analysis.",
          "Invite extended thinking for hard problems.",
          "It faithfully uses structure and context you provide — so provide it.",
        ],
        settings: [
          { name: "Model tier", detail: "Opus for the hardest work; Sonnet for fast, capable daily use; Haiku for speed/volume." },
        ],
        features: [
          { name: "Extended thinking", detail: "Step-by-step internal reasoning for complex tasks; ask for it explicitly." },
        ],
        proTips: [
          "Paste the full source and say 'use only this' — Claude is excellent at staying grounded in provided text.",
          "For code, describe the goal and constraints and let Claude propose the approach before it writes.",
        ],
        pitfalls: [
          "Using the heaviest model for trivial tasks when a faster tier would do.",
          "Under-specifying — Claude won't guess your unstated constraints.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt asking Claude to review a block of text for logical inconsistencies, inviting it to think carefully first.",
          starter: "You are a meticulous editor. Think carefully, then review the text between the tags for logical inconsistencies and unsupported claims. List each issue with the sentence it appears in, then suggest a fix.\n<text>[paste]</text>",
          hint: "Set the role, invite careful thinking, and define a structured output.",
          success: "Strong Claude prompts set a clear role, invite step-by-step reasoning, ground the model in provided text, and define the output shape.",
        },
        narration:
          "If ChatGPT is the everyperson's AI, Claude is the one professionals reach for when the work is serious. It's widely considered the best model for code, and it's superb at long-form writing and careful analysis — it follows instructions faithfully and writes in a natural voice. The Opus tier is the heavyweight; Sonnet and Haiku trade depth for speed. On hard problems, invite Claude to think it through before answering — you'll trade a little time for a noticeably better result. Most of all, Claude rewards clear, complete prompts: give it the role, the goal, the constraints, and the source material, and it uses every piece faithfully. Vague in, careful-but-generic out. Specific in, gold out.",
      },
      {
        id: "l2",
        title: "Projects, Artifacts & the million-token window",
        level: "Intermediate",
        duration: "12 min",
        summary: "Turn Claude into a workspace that holds entire codebases and books in mind.",
        sections: [
          { heading: "The ~1M token context window", body: "Claude Opus can hold roughly a million tokens — about 700,000 words — in a single context. That means you can paste an entire codebase, a long contract, or a book and ask questions across all of it. It's a genuinely different way to work: bring the material to the model instead of summarizing it down." },
          { heading: "Projects", body: "Claude Projects store knowledge and a custom prompt for an ongoing effort, so every conversation starts with your documents and rules in context. Ideal for a client account, a research corpus, or a product you keep iterating on." },
          { heading: "Artifacts", body: "When Claude produces something substantial — code, a document, a chart, even a small working app — it appears in an Artifact panel beside the chat, where it renders live and updates as you refine it. It's the cleanest way to iterate on a real deliverable." },
        ],
        keyTakeaways: [
          "Paste whole codebases/documents — the context window is huge.",
          "Projects keep your docs + rules in context across chats.",
          "Artifacts render real deliverables live as you iterate.",
        ],
        settings: [
          { name: "Project knowledge", detail: "Attach files + a custom prompt to a Project; all chats inherit them." },
        ],
        features: [
          { name: "Artifacts", detail: "A live side panel for code, docs, charts, and mini-apps that updates as you refine." },
          { name: "Large context", detail: "Opus reads ~1M tokens — entire repos or books at once." },
        ],
        promptPlaybook: [
          { label: "Whole-codebase question", prompt: "Here is my codebase. Map the data flow from the API route to the database for the checkout feature, name every file involved, and flag anything that looks fragile.\n[paste files]", why: "The huge window lets Claude reason across the whole repo, not a snippet." },
          { label: "Artifact deliverable", prompt: "Draft a one-page client proposal as an artifact: problem, solution, timeline, price. Use the brand voice in the Project files. Then I'll refine it with you.", why: "Artifacts make iterating on a real document fast and visual." },
        ],
        proTips: [
          "Even with a giant window, lead with your question — put the ask first, the 200 pages after.",
          "Keep one Project per client/codebase so its knowledge stays clean.",
        ],
        pitfalls: [
          "Pasting huge context for a tiny question that didn't need it — it's slower and costlier.",
          "Letting a Project accumulate unrelated files until its context gets noisy.",
        ],
        exercise: {
          type: "reflect",
          brief: "Identify one document or codebase you'd love to 'talk to' end-to-end. What three questions would you ask Claude about all of it at once?",
          hint: "Think cross-document questions you can't answer with search alone.",
          success: "Good answers pick genuinely large material and ask synthesis questions (data flow, contradictions, summaries) that need the whole thing in context.",
        },
        narration:
          "Claude's superpower is memory of the moment: Opus can hold about a million tokens — roughly seven hundred thousand words — in a single conversation. So instead of summarizing a codebase down to fit, you paste the whole thing and ask questions across all of it. Projects make that durable: attach your documents and rules once, and every chat starts informed. And when Claude builds something real — code, a document, a chart, a small app — it appears in an Artifact beside the chat and renders live as you refine it. One tip even with that giant window: put your question first and the two hundred pages after. Bring the material to the model, and let it reason over everything at once.",
      },
      {
        id: "l3",
        title: "Claude Code: agentic coding",
        level: "Advanced",
        duration: "13 min",
        summary: "Claude in your terminal — reading, editing, running, and shipping real code.",
        sections: [
          { heading: "What it is", body: "Claude Code is an agentic coding tool that runs in your terminal (and IDEs). Rather than copy-pasting snippets, you give it a goal and it explores your project, edits multiple files, runs commands and tests, and iterates — with you approving along the way. It's the clearest example of 'directing' rather than 'doing.'" },
          { heading: "Plan, then act", body: "The reliable workflow is to make it plan first: 'Before changing anything, outline the steps and the files you'll touch.' You review the plan, correct wrong assumptions cheaply, then let it execute. Small, reviewed diffs beat one giant blind change." },
          { heading: "MCP & tools", body: "Through the Model Context Protocol, Claude Code can connect to external tools and data — your issue tracker, docs, databases — under your control. That turns it from a code editor into an operator that can act across your stack with guardrails." },
          { heading: "Subagents for big jobs", body: "For large tasks it can spin up focused subagents that each handle a piece in parallel, then report back — useful for sweeping a large codebase or running independent workstreams at once." },
        ],
        keyTakeaways: [
          "Claude Code edits files, runs commands, and tests — you direct and approve.",
          "Make it plan before it acts; review small diffs.",
          "MCP connects it to your tools with guardrails; subagents parallelize big jobs.",
        ],
        settings: [
          { name: "Permission/approval mode", detail: "Control how much the agent can do before asking — keep a human gate for risky actions." },
          { name: "MCP servers", detail: "Connect external tools/data the agent may use, scoped to what you allow." },
        ],
        features: [
          { name: "Agentic edits + run", detail: "Multi-file edits, command execution, and test loops in your real project." },
          { name: "Subagents", detail: "Parallel focused agents for large or independent tasks." },
        ],
        promptPlaybook: [
          { label: "Plan-first task", prompt: "Goal: add rate limiting to our API. Before editing, list the steps, the files you'll change, and any assumptions. Wait for my 'go' before writing code.", why: "Catches wrong assumptions while they're cheap to fix." },
          { label: "Scoped bug fix", prompt: "Tests in checkout.test.ts are failing. Investigate, explain the root cause in 3 lines, propose the smallest fix, then apply it and re-run the tests.", why: "Tight scope + root-cause-first keeps the agent surgical, not sprawling." },
        ],
        proTips: [
          "Keep changes small and run tests often — review each diff before approving.",
          "Write a project rules file so the agent follows your conventions automatically.",
        ],
        pitfalls: [
          "Letting it make sweeping changes without a plan or review — hard to audit.",
          "Granting broad tool/permission access for a task that didn't need it.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a 'plan-first' instruction for a coding task you'd hand an agent. Force a plan and a human gate before any edits.",
          starter: "Goal: [task]. Before changing anything, outline the steps, the files you'll touch, and your assumptions. Do not edit until I reply 'go'. Then make small, reviewable changes and run the tests.",
          hint: "Demand a plan, a list of files, surfaced assumptions, and an explicit go-ahead.",
          success: "A great agent prompt states the goal, forces a plan + assumptions before edits, and keeps a human gate with small reviewable diffs.",
        },
      },
    ],
    quiz: [
      { q: "What is Claude most known for being best at?", options: ["Image generation", "Coding", "Music", "Video"], answer: 1, why: "Claude (Opus tier) is widely regarded as the strongest model for clean code." },
      { q: "Roughly how much context can Claude Opus hold?", options: ["~1,000 tokens", "~10,000 tokens", "~1,000,000 tokens", "Unlimited"], answer: 2, why: "About a million tokens — entire codebases or books at once." },
      { q: "Best practice with Claude Code before big changes?", options: ["Let it edit everything immediately", "Make it plan and confirm first", "Turn off tests", "Use the smallest model"], answer: 1, why: "Plan → confirm → execute with small reviewed diffs is the reliable workflow." },
      { q: "What does MCP give an agent like Claude Code?", options: ["Faster typing", "Secure, scoped access to external tools/data", "A bigger screen", "Free credits"], answer: 1, why: "The Model Context Protocol connects tools/data under your control with guardrails." },
    ],
    resources: [
      { label: "Project rules file", note: "Encode your conventions so Claude Code follows them automatically." },
      { label: "Route by strength", note: "Send code and careful analysis to Claude; keep a fast model for quick tasks." },
    ],
  });

  /* ============================== Gemini ============================== */
  ACADEMY.register({
    id: "gemini",
    title: "Google Gemini Mastery",
    tagline: "AI wired into Google — your data, your apps, real-time answers.",
    category: "Conversational AI",
    icon: "✦",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~75 min",
    instructor: { name: "Sofia Lang", role: "Workspace AI Guide", persona: "bright, organized, helpful", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Lives in Google", "Real-time data"] },
    overview:
      "Gemini is Google's AI, and its edge is integration: it lives inside Search, Gmail, Docs, Sheets, and Android, and it taps Google's real-time data. The Gemini 3 generation is a top-tier model with a very large context window and strong multimodal skills.\n\nThis track shows how to use Gemini as a standalone assistant and as a layer across your Google workflow, plus Gems and Deep Research.",
    whyItMatters:
      "If you live in Gmail, Docs, and Chrome, Gemini removes the copy-paste tax — the AI is already where your work is.",
    outcomes: [
      "Use Gemini for real-time, source-grounded answers",
      "Leverage Gemini inside Gmail, Docs, and Sheets",
      "Build Gems (custom assistants) for repeatable tasks",
      "Run Deep Research and use the huge context window",
    ],
    lessons: [
      {
        id: "l1",
        title: "Gemini's edge: integration & real-time data",
        level: "Beginner",
        duration: "9 min",
        summary: "Why Gemini is different — it's woven into Google and sees current information.",
        sections: [
          { heading: "It lives where you work", body: "Gemini isn't only a separate app — it's embedded across Google. In Gmail it drafts and summarizes; in Docs it writes and rewrites; in Sheets it builds formulas and tables; on Android and in Chrome it's a tap away. The value is removing the copy-paste round-trip between your work and a chatbot." },
          { heading: "Real-time, grounded answers", body: "Because it's Google, Gemini can pull current information and ground answers in Search, which helps for recent events, prices, and facts that change. When you need 'what's true right now,' Gemini's live grounding is a strength." },
          { heading: "Multimodal and large context", body: "The Gemini 3 generation handles text, images, audio, and video, and carries a very large context window — useful for long documents, transcripts, and mixed-media inputs in one go." },
        ],
        keyTakeaways: [
          "Gemini's superpower is being inside Google apps.",
          "It grounds answers in real-time Search data.",
          "Strong multimodal + very large context.",
        ],
        settings: [
          { name: "Model selector", detail: "Pick a faster vs. a deeper 'Pro/Thinking' Gemini for harder tasks." },
          { name: "Workspace extensions", detail: "Enable Gmail/Docs/Drive access so Gemini can reference your content (with permission)." },
        ],
        features: [
          { name: "Search grounding", detail: "Answers backed by current Google results, with links." },
        ],
        proTips: [
          "Ask Gemini for recent/changing facts where real-time grounding pays off.",
          "Enable the Workspace extensions so it can act on your actual emails and docs.",
        ],
        pitfalls: [
          "Assuming grounding makes it infallible — still verify important claims.",
          "Forgetting to enable app access, then wondering why it can't see your docs.",
        ],
        exercise: {
          type: "reflect",
          brief: "Name three tasks you'd route to Gemini specifically because of its Google integration or real-time data.",
          hint: "Think Gmail drafting, Docs editing, Sheets formulas, current-events research.",
          success: "Good answers pick tasks that benefit from living in Google apps or needing current information.",
        },
        narration:
          "Every big AI is racing on raw intelligence, so Gemini leans on something the others can't easily copy: it's Google. It lives inside Gmail, Docs, Sheets, Chrome, and Android, so it drafts your email and edits your document right where you already are — no copy-paste round trip. And because it's Google, it grounds answers in real-time Search, which matters for anything recent or changing — prices, news, fresh facts. The Gemini 3 generation is genuinely top-tier, handles images, audio, and video, and carries a very large context window. So when the job is 'what's true right now' or 'do this inside my Google workflow,' Gemini is often the cleanest choice. Just remember to switch on the Workspace extensions so it can actually see your stuff.",
      },
      {
        id: "l2",
        title: "Gemini across Workspace",
        level: "Intermediate",
        duration: "12 min",
        summary: "Make Gmail, Docs, and Sheets do the work for you.",
        sections: [
          { heading: "Gmail", body: "Gemini drafts replies in your voice, summarizes long threads, and finds the answer buried in your inbox. Use 'Help me write' for a first draft, then tighten it — and ask it to summarize a 40-message thread before a meeting." },
          { heading: "Docs", body: "In Docs, Gemini drafts sections, rewrites for tone, builds outlines, and generates tables. Treat it as a co-writer: give it the brief and the audience, generate, then edit in place." },
          { heading: "Sheets", body: "Gemini turns plain-English requests into formulas, helps clean and categorize data, and can build starter tables and tracking templates — a fast on-ramp for people who don't love spreadsheets." },
        ],
        keyTakeaways: [
          "Gmail: draft, summarize threads, find answers.",
          "Docs: co-writer for drafting, tone, outlines, tables.",
          "Sheets: plain-English formulas and data cleanup.",
        ],
        features: [
          { name: "Help me write", detail: "In-app drafting in Gmail and Docs." },
          { name: "Side panel", detail: "Ask Gemini about the current email/doc/sheet with its context in view." },
        ],
        promptPlaybook: [
          { label: "Summarize a thread (Gmail)", prompt: "Summarize this thread in 5 bullets: the decision, open questions, who owes what, and the single next step. Then draft a reply that confirms the next step.", why: "Turns a sprawling thread into action in one shot." },
          { label: "Formula from English (Sheets)", prompt: "Write a formula that flags rows where status is 'overdue' AND amount > 1000, and returns 'escalate', else ''. Tell me which cell to put it in.", why: "Skips the syntax hunt — describe the logic, get the formula." },
        ],
        proTips: [
          "Use the side panel so Gemini already has the current doc/email in context — no pasting.",
          "Ask for tone explicitly in Docs ('make it warmer, shorter, less corporate').",
        ],
        pitfalls: [
          "Sending AI-drafted email without a read-through — voice and facts still need a human check.",
          "Trusting a generated formula on critical data without testing it on a few rows.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a prompt for Gemini in Gmail that summarizes a long thread AND drafts the reply, with a clear output structure.",
          starter: "Summarize this thread in 5 bullets (decision, open questions, owners, risks, next step), then draft a concise reply confirming the next step in a friendly, professional tone.",
          hint: "Ask for a structured summary plus a drafted action, and specify tone.",
          success: "Strong prompts request a structured summary and a concrete drafted action, with tone and format specified.",
        },
        narration:
          "Gemini earns its keep inside Workspace. In Gmail, it drafts replies in your voice, summarizes a forty-message thread into five bullets, and digs the answer out of your inbox. In Docs, treat it like a co-writer: give it the brief and the audience, let it draft, then edit in place and ask for tone — warmer, shorter, less corporate. In Sheets, you describe the logic in plain English and it writes the formula, cleans the data, and builds the tracker. The trick is to use the side panel so Gemini already sees the email or document you're in — no pasting required. Draft with it, then read before you send. It removes the busywork; you keep the judgment.",
      },
      {
        id: "l3",
        title: "Gems & Deep Research",
        level: "Advanced",
        duration: "11 min",
        summary: "Custom assistants and long, cited research the Google way.",
        sections: [
          { heading: "Gems = custom Gemini assistants", body: "A Gem is a saved, customized version of Gemini with its own instructions and (optionally) reference files — Google's take on custom GPTs. Build a Gem for a recurring role: a brand-voice editor, a meeting-notes summarizer, a coding helper. Reuse it instead of re-prompting." },
          { heading: "Deep Research", body: "Gemini's Deep Research browses the web across many sources and returns a structured, cited report. Give it a precise question and the output you want; it's strong for market scans and decisions, and benefits from Google's reach." },
          { heading: "Audio Overviews & multimodal", body: "Gemini can turn documents into a spoken 'audio overview' and reason over images, audio, and video. Feed it a long PDF and get a narrated summary, or hand it a screenshot and ask what's wrong." },
        ],
        keyTakeaways: [
          "Gems = reusable custom assistants for recurring roles.",
          "Deep Research returns cited, structured reports.",
          "Multimodal: turn docs into audio, reason over media.",
        ],
        settings: [
          { name: "Gem manager", detail: "Create/edit Gems with custom instructions and reference files." },
          { name: "Deep Research mode", detail: "A research toggle that browses widely and returns a cited report." },
        ],
        features: [
          { name: "Audio Overviews", detail: "Spoken summaries generated from your documents." },
        ],
        promptPlaybook: [
          { label: "Build a Gem", prompt: "You are my weekly-report Gem. Each time, ask for this week's wins, metrics, and blockers, then output a 6-line update: progress, numbers, risks, next steps. Tone: crisp and factual.", why: "Encodes a recurring task once so it runs the same way every week." },
          { label: "Deep Research brief", prompt: "Research [topic/decision] for [my situation]. Compare [criteria]. Output a table + a 5-bullet recommendation, cite sources, and flag uncertainties.", why: "Scope + criteria + format makes the report usable, not just long." },
        ],
        proTips: [
          "Build a Gem the third time you paste the same instructions.",
          "Pair Deep Research with a verification pass on the claims that drive your decision.",
        ],
        pitfalls: [
          "Treating audio overviews/research as final truth — verify what matters.",
          "Over-engineering Gems you'll rarely use.",
        ],
        exercise: {
          type: "reflect",
          brief: "Describe a Gem you'd build for a weekly recurring task. What would it always ask you, and what would it always output?",
          hint: "Define its fixed inputs and fixed output format.",
          success: "Good answers define a clear recurring role with consistent inputs and a fixed, useful output shape.",
        },
      },
    ],
    quiz: [
      { q: "Gemini's clearest advantage over rivals is…", options: ["It's the only AI with images", "Deep integration with Google apps + real-time data", "It never makes mistakes", "It's always free"], answer: 1, why: "Living inside Gmail/Docs/Search and grounding in real-time data is its edge." },
      { q: "What is a 'Gem'?", options: ["A paid token", "A custom, reusable Gemini assistant", "A Google phone", "A spreadsheet"], answer: 1, why: "Gems are Gemini's custom assistants — like custom GPTs." },
      { q: "Best Gemini use among these?", options: ["Summarizing a long Gmail thread", "Rendering a 3D game", "Editing raw video footage frame-by-frame", "Mining crypto"], answer: 0, why: "Gemini's Workspace integration makes inbox/doc tasks a sweet spot." },
      { q: "Deep Research returns…", options: ["A one-word answer", "A cited, structured report", "An image", "A spreadsheet macro"], answer: 1, why: "It browses widely and returns a cited report." },
    ],
    resources: [
      { label: "Enable Workspace extensions", note: "Let Gemini reference your Gmail/Docs/Drive to remove copy-paste." },
      { label: "Gem library", note: "Save a Gem for each recurring role you have." },
    ],
  });

  /* ============================== Perplexity ============================== */
  ACADEMY.register({
    id: "perplexity",
    title: "Perplexity & AI Research",
    tagline: "The answer engine that shows its work — research you can trust and cite.",
    category: "Conversational AI",
    icon: "🔎",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Dr. Aria Vance", role: "Research Guide", persona: "curious, exacting, source-obsessed", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Cited answers", "Research-first"] },
    overview:
      "Perplexity is an 'answer engine': ask a question and it searches the live web, then writes a concise answer with citations you can click. It's the antidote to AI that confidently makes things up — every claim points to a source.\n\nThis track covers asking well, Focus and Spaces, Deep Research, and a verification workflow that turns Perplexity into a serious research partner.",
    whyItMatters:
      "For research, facts, and decisions, sourced answers beat eloquent guesses. Perplexity is built for exactly that.",
    outcomes: [
      "Get concise, cited answers and actually check the sources",
      "Use Focus modes and Spaces to control scope",
      "Run Deep Research for thorough, cited reports",
      "Build a fast, trustworthy research workflow",
    ],
    lessons: [
      {
        id: "l1",
        title: "The answer engine mindset",
        level: "Beginner",
        duration: "8 min",
        summary: "Why citations change everything — and how to ask for the best ones.",
        sections: [
          { heading: "Answers with receipts", body: "Unlike a pure chatbot, Perplexity searches the live web for each question and writes an answer with numbered citations. The point isn't just the answer — it's that you can click each source and verify. That transparency makes it ideal for research, fact-checking, and any decision you'll defend." },
          { heading: "Ask like a researcher", body: "Be specific and add constraints: timeframe ('in the last 6 months'), region, and the kind of source you trust ('prefer primary sources / peer-reviewed / official docs'). The more precise the question, the better the sources it pulls." },
          { heading: "Follow-ups keep context", body: "Perplexity threads keep context, so you can drill down: ask the broad question, then narrow ('now just the pricing', 'only EU data'). Treat it as a conversation with a research assistant, not a single search box." },
        ],
        keyTakeaways: [
          "Every answer is cited — always click through on what matters.",
          "Specific questions with constraints pull better sources.",
          "Use follow-ups to drill down within a thread.",
        ],
        settings: [
          { name: "Model selector (Pro)", detail: "Pro lets you choose the underlying model powering answers for harder questions." },
        ],
        features: [
          { name: "Inline citations", detail: "Numbered, clickable sources attached to each claim." },
        ],
        proTips: [
          "Add 'prefer primary/official sources and note the date of each' to raise source quality.",
          "When a claim matters, open at least two cited sources — don't trust a single link.",
        ],
        pitfalls: [
          "Reading the summary and skipping the sources — the summary can still misread them.",
          "Vague questions that pull SEO blog spam instead of primary sources.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a research question for Perplexity with a timeframe and a source-quality constraint.",
          starter: "What are the most credible findings from the last 12 months on [topic]? Prefer primary and peer-reviewed sources, note each source's date, and flag any disagreement between them.",
          hint: "Add timeframe, source preference, and ask it to flag disagreement.",
          success: "Strong research prompts add a timeframe, request high-quality sources with dates, and ask the engine to surface disagreement.",
        },
        narration:
          "Perplexity flips the script on AI's biggest flaw — confident made-up answers — by showing its work. Ask a question and it searches the live web, then writes a concise answer with numbered citations you can click. The answer is useful; the receipts are the point. To get the best out of it, ask like a researcher: add a timeframe, a region, and the kind of source you trust — primary, peer-reviewed, official. And keep going: threads hold context, so you ask the big question, then narrow to just the pricing, or just the EU data. One discipline separates good researchers from lazy ones — when a claim matters, open the sources and read them. Perplexity makes that one click away.",
      },
      {
        id: "l2",
        title: "Focus, Spaces & Deep Research",
        level: "Intermediate",
        duration: "11 min",
        summary: "Control where it searches and scale up to thorough, cited reports.",
        sections: [
          { heading: "Focus modes", body: "Focus narrows the search to a domain — the broad web, academic papers, or specific source types — so you get the right kind of evidence. Use academic focus for science and medicine, and web for general questions. Matching focus to the question keeps junk out of your answers." },
          { heading: "Spaces", body: "A Space is a workspace where you can set custom instructions and add your own files, then ask questions against both the web and your documents. Great for an ongoing research project, a course, or a topic you return to — your context lives in one place." },
          { heading: "Deep Research", body: "Deep Research runs many searches, reads across sources for minutes, and produces a long, structured, cited report. In 2026 Perplexity's Deep Research is notably strong (powered by frontier models). Give it scope and an output format, then verify the load-bearing claims." },
        ],
        keyTakeaways: [
          "Focus matches the source type to the question.",
          "Spaces hold custom instructions + your files for ongoing work.",
          "Deep Research = long, cited reports; still verify what matters.",
        ],
        settings: [
          { name: "Focus selector", detail: "Choose web vs. academic vs. other source scopes per query." },
          { name: "Space instructions & files", detail: "Set persistent rules and upload documents for a research workspace." },
        ],
        features: [
          { name: "Deep Research", detail: "Multi-search, multi-minute, cited report generation." },
        ],
        promptPlaybook: [
          { label: "Academic-focus question", prompt: "(Academic focus) Summarize the current evidence on [topic]. Give the consensus, the main disagreements, and 3 key papers with dates. Note effect sizes where reported.", why: "Academic focus + structure yields evidence, not blog opinions." },
          { label: "Deep Research report", prompt: "Produce a research report comparing [options] for [use case]. Sections: overview, comparison table, risks, recommendation. Cite all sources and flag low-confidence claims.", why: "Defined sections + citations make a long report actually usable." },
        ],
        proTips: [
          "Create a Space per ongoing topic so your instructions and files persist.",
          "Use academic focus for anything health-, science-, or finance-related.",
        ],
        pitfalls: [
          "Running broad web focus for scientific questions and getting shallow sources.",
          "Accepting a Deep Research conclusion without checking its key citations.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick a topic you research often. Which Focus would you use, and what files would you add to a Space for it?",
          hint: "Match focus to the evidence you need; add your own reference docs.",
          success: "Good answers match Focus to the question type and add genuinely useful reference files to the Space.",
        },
      },
    ],
    quiz: [
      { q: "What makes Perplexity different from a plain chatbot?", options: ["It writes code", "It searches the live web and cites sources", "It generates video", "It has no limits"], answer: 1, why: "It's an answer engine — live search plus clickable citations." },
      { q: "Best Focus mode for a medical/science question?", options: ["Web", "Academic", "Social", "Shopping"], answer: 1, why: "Academic focus pulls papers and higher-quality evidence." },
      { q: "What is a Space?", options: ["A paid tier", "A workspace with custom instructions + your files", "A video tool", "A phone app"], answer: 1, why: "Spaces persist instructions and documents for ongoing research." },
      { q: "The one discipline that makes Perplexity trustworthy?", options: ["Reading only the summary", "Clicking and verifying the cited sources", "Raising temperature", "Using web focus always"], answer: 1, why: "Citations only help if you actually check them on what matters." },
    ],
    resources: [
      { label: "Source-quality clause", note: "Add 'prefer primary/official sources and note dates' to your questions." },
      { label: "Topic Spaces", note: "Keep a Space per recurring research area with its own files and rules." },
    ],
  });
})();
