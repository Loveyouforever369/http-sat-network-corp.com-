/* =============================================================================
   PROMETHEUS · Academy · Vibe Coding (supplement)
   Adds Claude Code, v0/Lovable/Bolt, and Replit & AI IDEs alongside Cursor.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== Claude Code ============================== */
  ACADEMY.register({
    id: "claude-code",
    title: "Claude Code: Agentic Terminal Coding",
    tagline: "Hand the work to an agent that reads, edits, runs, and ships your code.",
    category: "Vibe Coding",
    icon: "⌨️",
    color: "violet",
    level: "Intermediate → Advanced",
    difficulty: "Advanced",
    estTime: "~85 min",
    instructor: { name: "Dev Rao", role: "AI Engineering Lead", persona: "pragmatic, sharp", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Agentic", "MCP + subagents"] },
    overview:
      "Claude Code is an agentic coding tool that lives in your terminal (and IDEs). You describe a goal; it explores the project, edits files, runs commands and tests, and iterates — while you steer and approve. Powered by Claude's top-tier coding models, it's the clearest example of directing AI rather than copy-pasting from it.\n\nThis track covers the agentic workflow, planning, rules, MCP, and subagents.",
    whyItMatters:
      "This is software development's new default: you set direction and review; the agent does the typing. Learning to drive it well is a career-defining skill.",
    outcomes: [
      "Run the plan -> approve -> execute -> test loop",
      "Write a rules file so the agent follows your conventions",
      "Connect tools/data via MCP safely",
      "Use subagents to parallelize large tasks",
    ],
    lessons: [
      {
        id: "l1",
        title: "The agentic coding workflow",
        level: "Intermediate",
        duration: "12 min",
        summary: "Direct, don't type: goal in, reviewed diffs out.",
        sections: [
          { heading: "From autocomplete to agent", body: "Most AI coding is autocomplete. Claude Code is an agent: give it a goal ('add password reset'), and it reads relevant files, proposes a plan, edits across the codebase, runs the tests, and fixes failures — looping until done. Your job shifts from writing lines to setting direction and reviewing changes." },
          { heading: "Plan first", body: "The reliable pattern is to make it plan before it codes: 'Before changing anything, outline the steps and the files you'll touch, and list assumptions.' You catch misunderstandings while they're cheap, then approve and let it execute. Small, reviewable diffs beat one giant blind change." },
          { heading: "Stay in the loop", body: "Review each change, run the app, and give targeted feedback ('good, but handle the empty-state case'). The agent is fast; your judgment is the quality gate. Commit working increments so you can always roll back." },
        ],
        keyTakeaways: [
          "It's an agent: plan, edit, run, test, iterate toward a goal.",
          "Make it plan and confirm before editing.",
          "Review diffs, commit increments, keep judgment in the loop.",
        ],
        settings: [
          { name: "Plan/approve flow", detail: "Ask for a plan + assumptions before edits; approve, then execute." },
          { name: "Permissions", detail: "Control what the agent can run/change before asking." },
        ],
        promptPlaybook: [
          { label: "Plan-first feature", prompt: "Goal: add CSV export to the reports page. Before editing, list the steps, the files you'll change, and any assumptions. Wait for my 'go', then make small commits and run the tests.", why: "Surfaces assumptions early and keeps changes reviewable." },
          { label: "Root-cause a bug", prompt: "The login test is failing intermittently. Investigate, explain the root cause in 3 lines, propose the smallest fix, then apply it and re-run until green.", why: "Root-cause-first keeps the agent surgical, not sprawling." },
        ],
        proTips: [
          "Keep changes small; review and commit often so rollback is easy.",
          "Tell it to run the tests and not stop until they pass.",
        ],
        pitfalls: [
          "Approving huge multi-file changes you didn't read.",
          "No plan step, so the agent guesses wrong and sprawls.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a plan-first instruction for a real coding task, forcing a plan + a human gate before edits.",
          starter: "Goal: [task]. Before changing anything, list steps, files, and assumptions. Don't edit until I say 'go'; then small commits and run tests.",
          hint: "Demand plan + files + assumptions + explicit go-ahead.",
          success: "Strong prompts state the goal, force a plan and assumptions before edits, and keep small, reviewable, tested diffs.",
        },
        narration:
          "Claude Code isn't autocomplete — it's an agent. You give it a goal, like 'add password reset,' and it reads the relevant files, proposes a plan, edits across the codebase, runs the tests, and fixes what breaks, looping until it's done. Your job changes: you set direction and review, it does the typing. The reliable pattern is plan first — make it outline the steps, the files, and its assumptions before it touches anything, so you catch misunderstandings while they're cheap. Then approve, and let it execute in small, reviewable diffs. Stay in the loop: run the app, give targeted feedback, commit working increments. The agent brings speed; you bring judgment. Together that's the new default for building software.",
      },
      {
        id: "l2",
        title: "Rules, context & MCP",
        level: "Advanced",
        duration: "12 min",
        summary: "Teach the agent your project, and connect it to tools safely.",
        sections: [
          { heading: "A rules/memory file", body: "Give the agent a project rules file (conventions, stack, do's and don'ts, how to run tests). It then follows your standards automatically on every task — like onboarding a new developer once instead of repeating yourself. Keep it concise and high-signal." },
          { heading: "Manage context", body: "Point the agent at the right files and docs rather than letting it guess. Reference specific paths, keep tasks scoped, and clear context between unrelated jobs. Focused context produces focused, correct changes." },
          { heading: "MCP for tools & data", body: "Via the Model Context Protocol, Claude Code can connect to external tools and data — your issue tracker, docs, a database, design files — under your control. That lets it act across your stack (open a ticket, query data) with permissions you set, not just edit files." },
        ],
        keyTakeaways: [
          "A rules file makes the agent follow your conventions automatically.",
          "Curate context: point at the right files; scope tasks.",
          "MCP connects tools/data with permissions you control.",
        ],
        settings: [
          { name: "Rules file", detail: "Project conventions, stack, test commands, do's/don'ts." },
          { name: "MCP servers", detail: "Connect issue trackers, docs, DBs, etc., scoped to what you allow." },
        ],
        promptPlaybook: [
          { label: "Rules file seed", prompt: "Create a project rules file: we use TypeScript + React + Tailwind, tests run with 'npm test', prefer small pure functions, no new dependencies without asking, and match existing file structure.", why: "Encodes conventions so every future task follows them." },
        ],
        proTips: [
          "Start the rules file small; add a rule each time the agent gets something wrong.",
          "Expose only the MCP tools a task needs — least privilege.",
        ],
        pitfalls: [
          "No conventions, so output drifts from your codebase style.",
          "Granting broad tool/data access for a narrow task.",
        ],
        exercise: {
          type: "reflect",
          brief: "Draft 5 rules you'd put in your project's agent rules file.",
          hint: "Stack, test command, dependency policy, structure, style.",
          success: "Good answers list concrete, high-signal conventions (stack, tests, deps, structure, style).",
        },
      },
      {
        id: "l3",
        title: "Subagents & big refactors",
        level: "Advanced",
        duration: "11 min",
        summary: "Parallelize large work and tackle whole-codebase changes.",
        sections: [
          { heading: "Subagents", body: "For large jobs, Claude Code can spawn focused subagents that each handle a piece in parallel — sweep a big codebase, run independent workstreams, or research while coding — then report back. It's delegation inside the agent, useful when one linear pass would be slow." },
          { heading: "Large-context refactors", body: "Backed by Claude's huge context, it can reason across many files at once — rename across a codebase, migrate an API, or modernize patterns — with a plan and tests guarding each step. Big refactors become tractable when the agent can see the whole picture." },
          { heading: "Guardrails at scale", body: "The bigger the change, the more you need plans, small commits, and a clean test suite. Let the agent move fast, but gate risky operations and keep every step reviewable and revertible. Speed without guardrails is how you ship a mess." },
        ],
        keyTakeaways: [
          "Subagents parallelize large or independent work.",
          "Large context enables whole-codebase refactors.",
          "Scale demands plans, small commits, and tests.",
        ],
        features: [
          { name: "Subagents", detail: "Parallel focused agents for big/independent tasks." },
          { name: "Large-context reasoning", detail: "Refactor across many files coherently." },
        ],
        promptPlaybook: [
          { label: "Guarded refactor", prompt: "Plan a migration from REST to our new API client across the codebase. List affected files, do it in small batches, run tests after each batch, and pause if any test fails.", why: "Batches + tests keep a large refactor safe and reviewable." },
        ],
        proTips: [
          "Refactor in batches with tests between — never one giant commit.",
          "Use subagents for genuinely parallel work, not simple tasks.",
        ],
        pitfalls: [
          "A massive refactor with no tests or checkpoints.",
          "Over-parallelizing trivial tasks and losing oversight.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick a large change you'd want done. How would you batch it and what tests would gate each step?",
          hint: "Break into batches; define the test that must pass per batch.",
          success: "Good answers batch a large change and define a passing test gate per batch.",
        },
      },
    ],
    quiz: [
      { q: "Claude Code is best described as…", options: ["Autocomplete", "An agent that plans, edits, runs, and tests", "An image tool", "A chat-only bot"], answer: 1, why: "It executes the agentic plan-act-test loop in your project." },
      { q: "Most reliable workflow?", options: ["Edit everything instantly", "Plan -> approve -> execute -> test", "No tests", "One giant commit"], answer: 1, why: "Plan and confirm before editing; keep diffs small and tested." },
      { q: "A rules file is for…", options: ["Nothing", "Encoding your conventions so the agent follows them", "Slowing it down", "Storing secrets"], answer: 1, why: "It makes the agent match your stack and standards automatically." },
      { q: "Subagents help when…", options: ["Tasks are trivial", "Work is large or parallelizable", "You want fewer commits", "Never"], answer: 1, why: "They split big/independent work across focused agents." },
    ],
    resources: [
      { label: "Grow the rules file", note: "Add a rule each time the agent gets something wrong." },
      { label: "Batch + test", note: "Do big refactors in small, test-gated batches." },
    ],
  });

  /* ============================== v0, Lovable & Bolt ============================== */
  ACADEMY.register({
    id: "v0-lovable",
    title: "v0, Lovable & Bolt: App From a Prompt",
    tagline: "Describe an app; get a working, deployable product.",
    category: "Vibe Coding",
    icon: "✨",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~75 min",
    instructor: { name: "Dev Rao", role: "Product Prototyper", persona: "fast, product-minded", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Prompt-to-app", "Full-stack"] },
    overview:
      "A new class of tools builds whole apps from a description. v0 (by Vercel) generates polished UI; Lovable and Bolt scaffold full-stack apps — frontend, backend, auth, database — that you can deploy. They turn ideas into working products in an afternoon.\n\nThis track covers each tool's sweet spot, the prompt-to-app workflow, adding a backend, and shipping.",
    whyItMatters:
      "The barrier between idea and working software is collapsing. Non-engineers can ship MVPs; engineers can prototype 10x faster.",
    outcomes: [
      "Generate polished UI with v0",
      "Build full-stack apps with Lovable/Bolt",
      "Add auth and a database for a real MVP",
      "Iterate and deploy a working product",
    ],
    lessons: [
      {
        id: "l1",
        title: "v0: UI from a description",
        level: "Beginner",
        duration: "10 min",
        summary: "Generate clean, production-style components and pages fast.",
        sections: [
          { heading: "What v0 does", body: "v0 by Vercel generates UI — components and pages — from a text description or an image, in modern React/Tailwind. It's the fastest way to get a polished, on-trend interface you can copy into a project or iterate on visually." },
          { heading: "Prompt the UI", body: "Describe the component, its content, and the vibe: 'a pricing section with 3 tiers, the middle one highlighted, dark glassy theme, subtle glow'. Specific layout + style yields usable output; vague prompts yield generic blocks." },
          { heading: "Iterate visually", body: "Refine in turns ('make it 4 columns', 'add a FAQ below', 'tighten spacing'), then export the code. v0 is excellent for design exploration and front-end scaffolding before wiring logic." },
        ],
        keyTakeaways: [
          "v0 generates modern React/Tailwind UI from a prompt or image.",
          "Specify layout + content + style for usable output.",
          "Iterate visually, then export the code.",
        ],
        promptPlaybook: [
          { label: "Component prompt", prompt: "A dashboard metrics row: 4 glassy cards (Users, Revenue, Churn, MRR), each with a big number, label, and a small up/down trend pill; dark theme, subtle neon glow; responsive.", why: "Concrete components + content + style produce a drop-in UI." },
        ],
        proTips: [
          "Feed a screenshot/mockup as the prompt for a closer match.",
          "Use v0 for the front end, then wire data with Cursor/Claude Code.",
        ],
        pitfalls: [
          "Vague prompts ('make a nice page') giving generic results.",
          "Treating generated UI as final without accessibility/data wiring.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a v0 prompt for a landing-page hero with a headline, subtext, two buttons, and a style.",
          starter: "A hero section: bold headline, one-line subtext, primary + ghost buttons, dark gradient background with a subtle grid, centered, responsive.",
          hint: "Describe components, content, layout, and style.",
          success: "Strong v0 prompts specify the components, content, layout, and visual style.",
        },
        narration:
          "v0, from Vercel, turns a description into polished interface — components and pages in modern React and Tailwind, generated from text or even a screenshot. It's the fastest path to a good-looking front end. The trick is specificity: don't say 'make a nice page,' say 'a pricing section, three tiers, the middle one highlighted, dark glassy theme, subtle glow.' Layout, content, and style in, usable UI out. Then iterate visually — four columns, add an FAQ, tighten the spacing — and export the code. Use v0 to design and scaffold the front end, then wire the data and logic with Cursor or Claude Code. Idea to interface in minutes.",
      },
      {
        id: "l2",
        title: "Lovable & Bolt: full-stack apps",
        level: "Intermediate",
        duration: "12 min",
        summary: "Scaffold a real, deployable app — including the backend.",
        sections: [
          { heading: "Beyond UI", body: "Lovable and Bolt build full-stack apps from a prompt: UI plus backend logic, and integrations like auth and a database. You describe the product and they generate a working app you can preview live and keep refining in chat." },
          { heading: "Add auth & data", body: "A real MVP needs accounts and storage. These tools integrate auth and a database (commonly Supabase) so users can sign in and data persists. Ask for it explicitly: 'add email auth and a projects table, gate the dashboard.'" },
          { heading: "Iterate in plain language", body: "Refine by describing changes ('add a settings page', 'let users invite teammates'). Review what changed, test it, and redirect — the same describe-review-redirect loop as all vibe coding, but at the whole-app level." },
        ],
        keyTakeaways: [
          "Lovable/Bolt scaffold full-stack apps from a prompt.",
          "Add auth + a database for a real MVP (e.g. Supabase).",
          "Iterate in plain language; review and redirect.",
        ],
        features: [
          { name: "Full-stack scaffold", detail: "UI + backend + integrations from a description." },
          { name: "Auth + database", detail: "Sign-in and persistence (often Supabase) on request." },
        ],
        promptPlaybook: [
          { label: "MVP brief", prompt: "Build a client portal: email auth, each user sees only their projects, a projects table with status, and an admin view. Clean dashboard UI. Use Supabase for auth + data.", why: "States the product, the data model, and the integrations to scaffold a real MVP." },
        ],
        proTips: [
          "Specify the data model and who-sees-what up front — it shapes the whole app.",
          "Build in small features and test each before piling on.",
        ],
        pitfalls: [
          "Asking for a huge app in one prompt; build iteratively.",
          "Ignoring security (who can see/edit what) until late.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write an MVP brief for a small app, including auth, a data model, and the key screens.",
          starter: "Build [app]: email auth, [data model], screens for [list], each user sees only their own data. Use Supabase for auth + database.",
          hint: "Product + auth + data model + screens + access rules.",
          success: "Strong briefs define the product, auth, data model, screens, and access rules for a deployable MVP.",
        },
      },
      {
        id: "l3",
        title: "Ship, then own the code",
        level: "Advanced",
        duration: "10 min",
        summary: "Deploy your app — and know when to graduate to real control.",
        sections: [
          { heading: "Deploy", body: "These tools deploy to the web with a click (v0/Lovable via Vercel-style hosting; Bolt in-browser), so you get a live URL fast. Connect a custom domain and you've shipped. For many MVPs and internal tools, that's all you need." },
          { heading: "Know the limits", body: "Prompt-to-app tools are fantastic for prototypes, MVPs, and standard apps, but complex or highly custom products eventually need real engineering control. Recognize when you're fighting the tool — that's the signal to move into the code." },
          { heading: "Own the output", body: "Export the codebase and continue in Cursor or Claude Code when you outgrow the builder. Because the output is real React/backend code, you're not locked in — vibe-code the 0-to-1, then engineer the 1-to-100." },
        ],
        keyTakeaways: [
          "One-click deploy gives a live URL fast.",
          "Great for MVPs/standard apps; complex needs real control.",
          "Export and continue in Cursor/Claude Code — no lock-in.",
        ],
        promptPlaybook: [
          { label: "Pre-launch checklist", prompt: "Review my app for launch: auth works, only owners can see their data, forms validate, errors are handled, and the empty/loading states exist. List what's missing.", why: "Catches the gaps prompt-to-app tools often leave before you ship." },
        ],
        proTips: [
          "Ship the MVP, get real users, then decide what to engineer properly.",
          "Move to code the moment you're fighting the builder on custom logic.",
        ],
        pitfalls: [
          "Shipping without checking access control and error states.",
          "Forcing a complex product into a no-code tool past its limits.",
        ],
        exercise: {
          type: "reflect",
          brief: "For an app you'd build, list what you'd ship via Lovable/Bolt vs. what would push you into real code.",
          hint: "Standard CRUD/MVP vs. complex/custom logic.",
          success: "Good answers ship standard MVP scope in the builder and move complex/custom logic into engineered code.",
        },
      },
    ],
    quiz: [
      { q: "v0's sweet spot is…", options: ["Backend only", "Generating polished UI from a prompt/image", "Databases", "Video"], answer: 1, why: "v0 produces modern front-end UI fast." },
      { q: "Lovable/Bolt differ from v0 because they…", options: ["Only do UI", "Build full-stack apps incl. backend/auth/db", "Can't deploy", "Are image tools"], answer: 1, why: "They scaffold complete, deployable apps." },
      { q: "For a real MVP you should add…", options: ["Nothing", "Auth + a database", "Only colors", "More prompts"], answer: 1, why: "Accounts and persistence make it a usable product." },
      { q: "When do you graduate to real code?", options: ["Never", "When the product gets complex/custom", "Immediately", "Only for UI"], answer: 1, why: "Export and engineer once you outgrow the builder." },
    ],
    resources: [
      { label: "Build iteratively", note: "Small features, tested one at a time, beat one giant prompt." },
      { label: "No lock-in", note: "Export to Cursor/Claude Code when you outgrow the builder." },
    ],
  });

  /* ============================== Replit & AI IDEs ============================== */
  ACADEMY.register({
    id: "replit-ai-ides",
    title: "Replit Agent & AI IDEs",
    tagline: "Build and deploy from the browser — and choose the right AI IDE.",
    category: "Vibe Coding",
    icon: "🛠",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~65 min",
    instructor: { name: "Dev Rao", role: "AI IDE Guide", persona: "practical, encouraging", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Browser-based", "Deploy included"] },
    overview:
      "Replit Agent builds and runs apps entirely in the browser — describe what you want, and it scaffolds, codes, and deploys, no local setup. Alongside Cursor and Claude Code, a family of AI IDEs (like Windsurf) compete on how they blend agents into the editor.\n\nThis track covers Replit's build-and-deploy flow and how to choose your AI coding environment.",
    whyItMatters:
      "The right environment removes friction. For many people, building in the browser with deploy built in is the smoothest path from idea to live app.",
    outcomes: [
      "Build and deploy an app with Replit Agent",
      "Compare Cursor, Claude Code, Windsurf, and Replit",
      "Pick the right AI IDE for your level and project",
      "Keep ownership and good habits regardless of tool",
    ],
    lessons: [
      {
        id: "l1",
        title: "Replit Agent: build in the browser",
        level: "Beginner",
        duration: "10 min",
        summary: "No setup — describe, build, run, deploy, all in one tab.",
        sections: [
          { heading: "Zero-setup building", body: "Replit runs in the browser with no local install. Replit Agent takes a description and scaffolds the app, writes code, installs dependencies, runs it, and can deploy it — so a beginner can go from idea to a live URL without ever touching a terminal setup." },
          { heading: "Build-run-fix loop", body: "Describe a feature, let the agent build it, run it in the live preview, and report what's wrong in plain language. The agent fixes and re-runs. It's vibe coding with the whole environment (editor, runtime, hosting) in one place." },
          { heading: "Great for learning & MVPs", body: "Because everything's integrated and shareable, Replit is excellent for learning to build, prototyping ideas, and small apps you want live quickly. You can also drop into the real code to learn as you go." },
        ],
        keyTakeaways: [
          "Replit Agent builds, runs, and deploys in the browser — no setup.",
          "Describe -> build -> preview -> fix loop.",
          "Ideal for learning, prototyping, and quick MVPs.",
        ],
        settings: [
          { name: "Agent prompt", detail: "Describe the app/feature; the agent scaffolds and codes it." },
          { name: "Deploy", detail: "Publish to a live URL from the same environment." },
        ],
        promptPlaybook: [
          { label: "Build an app", prompt: "Build a habit tracker: add habits, check them off daily, show a streak per habit, store data so it persists, clean mobile-friendly UI. Then deploy it.", why: "A clear feature list + persistence + deploy gets a usable app." },
        ],
        proTips: [
          "Describe features one at a time and test in the live preview.",
          "Peek at the generated code to learn how it works.",
        ],
        pitfalls: [
          "Asking for a giant app at once instead of iterating.",
          "Never looking at the code, so you can't fix or extend it.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Replit Agent prompt for a small app with persistence and a deploy step.",
          starter: "Build [small app] with [2-3 features], persist the data, mobile-friendly UI, then deploy to a live URL.",
          hint: "Feature list + persistence + deploy.",
          success: "Strong prompts give a concrete feature list, require persistence, and ask to deploy.",
        },
        narration:
          "Replit removes the most annoying barrier to building: setup. It runs entirely in the browser, and Replit Agent takes your description, scaffolds the app, writes the code, installs everything, runs it, and can deploy it to a live URL — no terminal gymnastics. You work in a build-run-fix loop: describe a feature, watch it appear in the live preview, say what's wrong in plain language, and it fixes and re-runs. Because the editor, the runtime, and hosting all live in one tab, it's perfect for learning, prototyping, and shipping small apps fast. And you can always peek at the real code to learn how it works — building and learning at the same time.",
      },
      {
        id: "l2",
        title: "Choosing your AI IDE",
        level: "Intermediate",
        duration: "11 min",
        summary: "Cursor vs. Claude Code vs. Windsurf vs. Replit — pick by need.",
        sections: [
          { heading: "The landscape", body: "Cursor is an AI-first code editor (great Tab, Composer/Agent, you keep a local IDE). Claude Code is a terminal/IDE agent for deep agentic work. Windsurf and similar IDEs blend agents into the editor with their own flow. Replit is browser-based with build+deploy included. They overlap, but each has a sweet spot." },
          { heading: "Match to your level & project", body: "New to code or want zero setup? Replit. Building real software locally with fine control? Cursor. Big agentic tasks, refactors, terminal/CI work? Claude Code. Want an integrated agent IDE? Windsurf. Many pros use Cursor + Claude Code together." },
          { heading: "It's about the workflow", body: "The tool matters less than the workflow: describe clearly, plan before big changes, review diffs, test often, commit increments. Good habits make any of these tools shine — and bad habits make all of them risky." },
        ],
        keyTakeaways: [
          "Cursor = local AI editor; Claude Code = agentic; Replit = browser+deploy; Windsurf = agent IDE.",
          "Pick by your level, control needs, and project.",
          "Workflow and habits matter more than the specific tool.",
        ],
        promptPlaybook: [
          { label: "Pick the IDE", prompt: "I'm [level], building [project type], and want [setup-free / local control / heavy agentic work]. Recommend Replit, Cursor, Claude Code, or Windsurf and explain in 3 bullets.", why: "Forces a choice grounded in your real situation." },
        ],
        proTips: [
          "Try two and keep the one that fits your brain — they're free/cheap to sample.",
          "Whatever you pick, adopt the plan-review-test loop.",
        ],
        pitfalls: [
          "Tool-hopping instead of getting good at one workflow.",
          "Choosing by hype rather than your level and project.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick your AI IDE for your next project and justify it on level, control, and project type.",
          hint: "Match setup-free/local/agentic needs to a tool.",
          success: "Good answers choose a tool justified by the learner's level, control needs, and project type.",
        },
      },
      {
        id: "l3",
        title: "Own the output & good habits",
        level: "Advanced",
        duration: "9 min",
        summary: "Stay in control as AI writes more of your code.",
        sections: [
          { heading: "Understand what ships", body: "AI can write code you don't understand — that's a risk. Ask it to explain changes, keep diffs small and reviewable, and learn the patterns it uses. You're accountable for what you ship, even when an agent wrote it." },
          { heading: "Version control always", body: "Commit early and often, with clear messages, so you can review and roll back. Git is your safety net when an agent makes a change you don't like — non-negotiable regardless of tool." },
          { heading: "Test and secure", body: "Have the agent write tests, and check the basics: input validation, auth/access control, secrets kept out of the client, error handling. AI speeds you up; these habits keep you from shipping fast and breaking things." },
        ],
        keyTakeaways: [
          "Understand and review what the AI ships — you're accountable.",
          "Commit early/often; Git is your safety net.",
          "Insist on tests, validation, access control, and secret hygiene.",
        ],
        proTips: [
          "Ask 'explain this change and its risks' on anything you don't fully follow.",
          "Make the agent write tests for new logic by default.",
        ],
        pitfalls: [
          "Shipping AI code you don't understand or test.",
          "No version control, so mistakes are unrecoverable.",
        ],
        exercise: {
          type: "reflect",
          brief: "List your non-negotiable habits when coding with AI (review, git, tests, security). Why each?",
          hint: "Tie each habit to a risk it prevents.",
          success: "Good answers tie review, version control, testing, and security habits to the specific risks they mitigate.",
        },
      },
    ],
    quiz: [
      { q: "Replit Agent's main advantage is…", options: ["Local setup required", "Browser-based build + deploy, no setup", "Image generation", "No code access"], answer: 1, why: "It builds, runs, and deploys in the browser with zero setup." },
      { q: "Choose Cursor when you want…", options: ["No editor", "A local AI-first IDE with fine control", "Only deploy", "Only chat"], answer: 1, why: "Cursor is a local AI editor with strong control." },
      { q: "What matters more than the specific tool?", options: ["The logo", "Your workflow and habits", "The price only", "The color theme"], answer: 1, why: "Plan-review-test habits make any AI IDE shine." },
      { q: "A non-negotiable habit with AI code is…", options: ["No git", "Commit often + review diffs", "Skip tests", "Ship blindly"], answer: 1, why: "Version control and review keep you in control." },
    ],
    resources: [
      { label: "Plan-review-test", note: "The workflow that makes any AI IDE reliable." },
      { label: "Git + tests", note: "Your safety net as AI writes more of the code." },
    ],
  });
})();
