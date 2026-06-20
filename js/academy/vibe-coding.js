/* =============================================================================
   PROMETHEUS · Academy · Vibe Coding
   Four tracks: Cursor, Claude Code, v0/Lovable/Bolt, Replit/Windsurf.
   Content current as of June 2026.
   ============================================================================= */

// ─── TRACK 1: CURSOR MASTERY ────────────────────────────────────────────────
(function () {
  if (!window.ACADEMY) return;
  ACADEMY.register({
    id: "cursor",
    title: "Cursor Mastery",
    tagline: "Turn your IDE into an AI pair programmer that ships production code.",
    category: "Vibe Coding",
    icon: "💻",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~90 min",
    instructor: {
      name: "Dev Rao",
      role: "AI Engineering Lead",
      persona: "pragmatic, sharp",
      voiceLang: "en-US"
    },
    hero: { tags: ["Updated for 2026", "Hands-on", "Multi-file editing"] },
    overview:
      "Cursor is a fork of VS Code rebuilt for an AI-native workflow. Every surface — autocomplete, inline edit, multi-file composer, autonomous agent — is designed so the model sees the right context at the right time, without you having to copy-paste code into a chat window.\n\nThis track moves from the basics (Tab completion, Cmd+K inline edits) through Composer multi-file diffs, full Agent mode with terminal access, rules files, and the model picker. By the end you will have a tuned Cursor setup that handles greenfield features, refactors, and debugging loops with minimal friction.",
    whyItMatters:
      "Cursor consistently benchmarks as the fastest path from English description to merged PR for developers who write code daily. Its deep codebase indexing and @-context system mean the model is never flying blind — and that is what separates good AI assistance from great AI assistance.",
    outcomes: [
      "You will be able to configure Tab, Composer, and Agent for your specific stack",
      "You will be able to write .cursorrules and rules files that encode your coding standards",
      "You will be able to use @-context mentions to give the model exactly the right scope",
      "You will be able to choose the right model (Claude, GPT, Gemini) for each task type",
      "You will be able to run multi-file refactors and debug with the agent terminal loop",
      "You will be able to review and accept AI diffs safely without losing control of the codebase"
    ],
    lessons: [
      {
        id: "l1",
        title: "Tab Completion and Inline Editing",
        level: "Beginner",
        duration: "12 min",
        summary: "Cursor Tab predicts your next edit; Cmd+K rewrites a selection — learn both before anything else.",
        sections: [
          {
            heading: "How Cursor Tab actually works",
            body: "Cursor Tab is not ordinary autocomplete. It watches your recent edits and the surrounding file, builds a short-range intent model, and predicts your next move — not just the next token. If you just renamed a variable on line 10, Tab may offer to rename it on lines 14, 22, and 31 without you asking. Accept with Tab, skip with Escape, and cycle through alternatives with Alt+]. The underlying model is fast and cheap; it runs on every keystroke without eating your premium request quota."
          },
          {
            heading: "Cmd+K: inline rewrites",
            body: "Select any block of code, press Cmd+K (Ctrl+K on Windows), and type a plain-English instruction. The model rewrites only the selection and shows a diff you can accept or reject. This is surgical — it does not touch anything outside the selection. Use it for: converting a for-loop to a map, adding error handling, translating a function to another language, or tightening a SQL query. Keep the instruction concrete: 'add null checks for user and user.email' beats 'make this safer.'"
          },
          {
            heading: "When Tab gets it wrong",
            body: "Tab learns from your edits in the current session. If you introduce an unconventional pattern early (say, a custom utility function with an unusual signature), Tab may keep suggesting the wrong shape elsewhere. The fix is to write the correct version once clearly, then let Tab pattern-match from there. You can also press Escape and type the first few characters yourself to guide it back on track."
          }
        ],
        keyTakeaways: [
          "Tab is intent-aware, not just token-aware — it predicts your next edit.",
          "Cmd+K is a surgical rewrite of a selection; it never touches outside the selection.",
          "Concrete instructions to Cmd+K ('add null check') outperform vague ones ('improve this')."
        ],
        promptPlaybook: [
          {
            label: "Cmd+K: add error handling",
            prompt: "Wrap this function in a try/catch. Log the error with console.error and re-throw. Keep the existing return type.",
            why: "Specific constraints (log + re-throw, preserve return type) prevent the model from over-engineering."
          },
          {
            label: "Cmd+K: convert to async/await",
            prompt: "Convert this Promise chain to async/await. Do not change the function signature or the error handling behavior.",
            why: "Anchoring to 'do not change the signature' keeps the diff minimal and reviewable."
          }
        ],
        settings: [
          {
            name: "Tab (Cursor Settings > Features > Cursor Tab)",
            detail: "Enable 'Multi-line edits' so Tab can suggest multi-line completions, not just single lines. Leave 'Auto-import' on for JS/TS projects."
          },
          {
            name: "Keybinding: Cmd+K",
            detail: "Inline edit. Works on a selection or, with nothing selected, on the current line. Add Cmd+Shift+K to open Composer from the same muscle memory."
          }
        ],
        features: [
          {
            name: "Tab ghost text cycling",
            detail: "Alt+] cycles to the next Tab suggestion when the first one is not quite right. Useful when the model offers two plausible completions."
          },
          {
            name: "Cmd+K on terminal selection",
            detail: "You can select output in the integrated terminal and hit Cmd+K to ask the model to explain or fix it — same UX as code."
          }
        ],
        business: [
          "Cut boilerplate writing time by 60-80% on repetitive patterns like CRUD handlers.",
          "Use Cmd+K to enforce your team style guide on copied-in code without a manual rewrite."
        ],
        life: [
          "Building a personal finance script? Tab will complete your pandas DataFrame operations faster than any snippet library.",
          "Learning a new language? Let Tab show you idiomatic patterns while you type."
        ],
        proTips: [
          "Keep files under 400 lines — Tab's short-range context is sharpest on focused files.",
          "After accepting a bad Tab suggestion, immediately Cmd+Z and type the correct version. This re-anchors the session context."
        ],
        pitfalls: [
          "Do not accept Tab blindly in security-sensitive paths (auth, crypto). Always read the diff.",
          "Tab can perpetuate a bug already in the file. If you are fixing a systemic issue, fix the root cause first, then let Tab propagate the pattern."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Cmd+K instruction to refactor a 30-line Express route handler: extract the DB call into a separate async function, add try/catch with a 500 response on error, and add a JSDoc comment to the new function.",
          starter: "Refactor this route handler: extract the database call into ...",
          hint: "A great instruction names the new function, specifies the error response shape, and mentions JSDoc — three concrete tasks.",
          success: "A strong prompt specifies Role (none needed for Cmd+K), Task (extract + wrap + document), Constraints (keep route signature, 500 on error), and Output (inline diff in the same file)."
        },
        narration: "Welcome to Cursor Tab and inline editing — the two features you will use literally every minute in Cursor. Tab is not your old autocomplete. It watches your last few edits, figures out what you are probably doing next, and offers the completion before you even finish typing. Think of it as a pair programmer who has been watching over your shoulder for the last thirty seconds. Accept with Tab, skip with Escape, cycle alternatives with Alt-bracket-right. Then there is Cmd+K — select any block, press Cmd+K, type one sentence of English, and Cursor rewrites only that block. It does not touch anything else. The diff appears right in the editor, you accept or reject. Use this for null checks, async conversions, style fixes, or translating a snippet. The key is to be concrete — not 'improve this' but 'add null checks for user dot email and return early.' Specific instructions produce tight diffs. Tight diffs are safe to merge. That is the whole game."
      },
      {
        id: "l2",
        title: "Composer and Multi-File Edits",
        level: "Intermediate",
        duration: "15 min",
        summary: "Composer is Cursor's multi-file editing panel — open it for any task that touches more than one file.",
        sections: [
          {
            heading: "What Composer is and when to use it",
            body: "Composer (Cmd+Shift+I) is the right tool whenever a task spans multiple files. It holds a richer conversation context than Cmd+K, can open, read, and diff multiple files simultaneously, and presents all proposed changes in a unified review panel before you apply anything. Think of it as a pull-request previewer driven by English. Use it for: adding a new feature end-to-end, renaming a symbol across a codebase, updating an API contract in both the server and client, or generating a new component with its test file alongside."
          },
          {
            heading: "Writing a good Composer prompt",
            body: "The model in Composer has access to your codebase index and any @-mentions you add, but it still needs a clear spec. Lead with the goal, then constraints, then the expected file surface: 'Add a /users/:id/avatar endpoint to the Express server in src/routes/users.ts. Store the uploaded file with multer using the existing multer config in src/lib/upload.ts. Return { url } on success, { error } on failure. Write a Jest test in src/__tests__/users.test.ts covering both branches.' That single prompt gives the model a goal, two context anchors, a response contract, and a test requirement.\n\nReview every diff in the Composer panel before clicking Apply. The model occasionally adds an import you did not expect or touches a file you did not mention. The review step is non-negotiable."
          },
          {
            heading: "Iterating inside a Composer session",
            body: "Composer sessions are persistent — you can reply to the model, reject a diff, or ask for a revision without losing the prior context. If the first diff is 80% right, accept the parts you like by clicking the file-level checkboxes and rejecting the rest. Then type a follow-up: 'The route is good. The test is missing an assertion for a 400 when no file is attached. Add that.' This incremental loop is faster than starting over and produces smaller, safer diffs."
          }
        ],
        keyTakeaways: [
          "Composer = multi-file; Cmd+K = single selection. Use the right tool.",
          "Include @-mentions for key context files so the model is never guessing your architecture.",
          "Always review the diff panel before applying — catch unexpected file changes early."
        ],
        promptPlaybook: [
          {
            label: "Add a new API endpoint end-to-end",
            prompt: "Add a POST /api/v1/invites endpoint. Route file: @src/routes/invites.ts (create if missing). Auth middleware is already on the router in @src/routes/index.ts. Write to the invites table using the Prisma client from @src/lib/db.ts. Return { id, email, expiresAt } on success, { error } on 400/500. Add a Vitest test in @src/tests/invites.test.ts covering the happy path and missing-email validation.",
            why: "@-mentions anchor the model to real files. Specifying return shapes prevents the model from inventing its own API contract."
          },
          {
            label: "Rename a module across the codebase",
            prompt: "Rename the module 'userService' to 'accountService' across the entire codebase. Update all imports, all usages, and the file name src/services/userService.ts -> src/services/accountService.ts. Do not change any logic — only identifiers and file names.",
            why: "'Do not change any logic' is a critical constraint that keeps the diff reviewable."
          }
        ],
        settings: [
          {
            name: "Composer (Cmd+Shift+I)",
            detail: "Open Composer in a side panel. Toggle 'Long context mode' in the Composer header for tasks that need to read many files — it uses a larger, slower model pass."
          },
          {
            name: "@-context mentions",
            detail: "Type @ inside any Composer or chat prompt to attach: @file (specific file), @folder (all files in a directory), @codebase (full index search), @docs (linked docs), @git (recent diff or commit). Use @file for targeted context, @codebase for symbol search."
          }
        ],
        features: [
          {
            name: "Unified diff panel",
            detail: "Before applying, every changed file appears in a scrollable diff. You can accept or reject at the file level or the hunk level."
          },
          {
            name: "Composer history",
            detail: "Previous Composer sessions are saved. Revisit them via the history icon — useful for reconstructing what changed and why."
          }
        ],
        business: [
          "Scaffold an entire new microservice (routes, models, tests, config) in one Composer session — a task that used to take half a day.",
          "Run a cross-codebase rename safely: Composer finds all usages the IDE symbol-rename would miss (string literals in SQL, config files)."
        ],
        life: [
          "Building a side project? Describe the feature in plain English and Composer handles the boilerplate across React component, API route, and type definitions.",
          "Migrating a personal script from one library to another? Composer can rewrite all call sites in one shot."
        ],
        proTips: [
          "Use @folder/src/routes when adding a new route — it gives the model all sibling routes as style examples.",
          "After a large Composer apply, run your test suite immediately. The model may have introduced a subtle import cycle."
        ],
        pitfalls: [
          "Avoid giving Composer a task that requires understanding runtime behavior (e.g., 'fix the bug that happens when I click Save'). Use Agent mode for that.",
          "Do not paste a 500-line spec into the Composer prompt. Break it into feature-sized tasks."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Composer prompt to add a dark-mode toggle to a React app. The toggle should persist preference to localStorage, apply a 'dark' class to <html>, and have a corresponding test.",
          starter: "Add a dark-mode toggle to this React app ...",
          hint: "Mention the specific component file, the localStorage key name, and the CSS class. Include @src/App.tsx and @src/App.test.tsx as context.",
          success: "A strong prompt names the target files with @-mentions, specifies the storage key and class name (constraints), and asks for a test covering both toggle states (output)."
        },
        narration: "Composer is where Cursor shifts from pair programmer to junior engineer on your team. You open it with Cmd+Shift+I, describe a task that touches several files, and the model drafts all the changes at once — routes, components, tests, types — in a diff panel you review before anything is written to disk. The key to great Composer output is specificity plus @-mentions. When you write @src/lib/db.ts in your prompt, the model reads that exact file and builds on your real patterns instead of inventing conventions. After you get a draft, do not feel pressured to accept everything at once. Click the file-level checkboxes, accept what is right, reject what is off, and type a follow-up. That incremental loop is where the real speed is. Composer is not magic — it is a structured way to keep the model informed and the diffs reviewable. Master it and multi-file features stop feeling like a grind."
      },
      {
        id: "l3",
        title: "Agent Mode and Terminal Loops",
        level: "Intermediate",
        duration: "15 min",
        summary: "Agent mode runs autonomously: it reads files, writes code, executes terminal commands, and loops until the task is done.",
        sections: [
          {
            heading: "Composer vs Agent: the key difference",
            body: "Composer shows you a diff and waits for approval. Agent mode (toggle 'Agent' in the Composer header, or Cmd+I) removes the approval gate on each step: the model can run shell commands, read their output, fix the error it caused, and keep going. This makes it dramatically more powerful for tasks with a feedback loop — running a failing test and fixing it, installing a missing package and retrying a build, or iterating on a linting error. The tradeoff is that you are not reviewing each step in real time."
          },
          {
            heading: "What to delegate to Agent mode",
            body: "Agent mode shines on self-contained tasks with a clear success criterion the model can verify itself. Great examples: 'Get the test suite green — it is currently failing on 3 tests,' 'Install and configure Prettier and ESLint with our existing config file,' 'Debug why the build script throws a ENOENT on CI — the logs are in build.log,' or 'Migrate all usages of the deprecated axios.get to the new fetchJson helper.' In each case the model can run something, read the result, and know when it is done.\n\nAvoid Agent mode for tasks without a clear terminal success state: 'make the UI look better' or 'improve performance generally' will loop indefinitely or terminate early on a guess."
          },
          {
            heading: "Staying in control",
            body: "Even in Agent mode you can interrupt at any time. Watch the activity feed on the left — every tool call (file read, shell command, file write) is listed. If you see the agent about to run something destructive, click Stop. For sensitive projects, enable 'Require approval for shell commands' in Cursor Settings > Agent to get a confirmation prompt before each terminal execution. This hybrid is often the right default: let it think and write freely, but gate the terminal."
          }
        ],
        keyTakeaways: [
          "Agent mode is Composer with a terminal and no approval gate per step.",
          "Give it a task with a verifiable exit condition ('tests pass', 'build succeeds').",
          "Use 'Require approval for shell commands' as a safety net on production codebases."
        ],
        promptPlaybook: [
          {
            label: "Fix a failing test suite",
            prompt: "The test suite is failing. Run `npm test` to see the failures, then fix them. Do not change any test assertions — only fix the implementation. Stop when all tests pass.",
            why: "'Do not change test assertions' is a critical guardrail that prevents the model from deleting failing tests."
          },
          {
            label: "Set up a linting and formatting pipeline",
            prompt: "Install ESLint and Prettier. Use the existing @.eslintrc.json and @.prettierrc as your config. Add 'lint' and 'format' scripts to package.json. Run `npm run lint` to verify zero errors. Fix any errors you introduce.",
            why: "Anchoring to existing config files prevents the agent from inventing new rules."
          }
        ],
        settings: [
          {
            name: "Agent mode toggle (Composer header)",
            detail: "Switch between Composer (diff-and-approve) and Agent (autonomous loop) in the same panel. Default to Agent for debugging tasks, Composer for feature additions."
          },
          {
            name: "Require approval for shell commands (Settings > Agent)",
            detail: "Recommended on for any project with a production database or deployment pipeline. The agent pauses and shows you the exact command before running."
          }
        ],
        features: [
          {
            name: "Activity feed / tool call log",
            detail: "Every file read, write, and shell execution is listed in real time. Use this to understand what the agent is doing and when to intervene."
          },
          {
            name: "Background Agent (Cursor Pro)",
            detail: "Runs an agent task in a cloud sandbox in the background while you continue working. Surfaces results as a completed diff when done. Best for long refactors."
          }
        ],
        business: [
          "Delegate 'fix all TypeScript errors after a major-version upgrade' to the agent — it will iterate faster than a human.",
          "Agent mode can triage a bug report end-to-end: read the stack trace, find the offending line, patch it, and confirm the fix with a test run."
        ],
        life: [
          "Have a personal Python script that breaks every time a library updates? Point Agent at the error log and let it fix the import changes.",
          "Learning TDD? Ask Agent to write the failing test first, then watch it implement until green — a live demonstration of the cycle."
        ],
        proTips: [
          "Paste the exact error message or stack trace into the Agent prompt. Concrete failure output beats 'it is broken.'",
          "For long agent runs, open a second Cursor window on a different branch so you can keep working."
        ],
        pitfalls: [
          "Agent mode can create a cycle where it patches a test to make it pass rather than fixing the real bug. Anchor with 'do not modify test files.'",
          "Running `git push` or `kubectl apply` in agent mode without approval enabled is dangerous. Always gate destructive commands."
        ],
        exercise: {
          type: "prompt",
          brief: "Write an Agent mode prompt to migrate a JavaScript project from CommonJS (require/module.exports) to ES Modules (import/export). The project uses Node 20 and has a test suite.",
          starter: "Migrate this project from CommonJS to ES Modules ...",
          hint: "Specify the Node version, mention package.json changes needed (type: module), mention the test runner, and include a verification step.",
          success: "A strong prompt specifies the migration scope, the package.json flag required, the test command to verify correctness, and a constraint not to change business logic."
        },
        narration: "Agent mode is the version of Cursor that keeps working after you stop typing. You give it a task, it opens files, writes code, runs your terminal commands, reads the output, fixes what broke, and loops — all without you clicking approve between each step. This is the tool to reach for when the task has a feedback loop: a test suite that needs to go green, a build that is throwing an error, a linting run with hundreds of violations. The model can verify its own work by running the same command you would run. The discipline is in how you prompt it. Give it a concrete success criterion — tests pass, zero lint errors, build exits with code zero — and a hard constraint on what it cannot touch. Without that, it will drift. And if you are nervous about shell commands running unsupervised, flip on 'Require approval for shell commands' in settings. You get the autonomous loop with a pause before anything dangerous. That is a genuinely good default."
      },
      {
        id: "l4",
        title: "Rules Files and .cursorrules",
        level: "Intermediate",
        duration: "12 min",
        summary: "Encode your coding standards, architecture patterns, and team conventions so every AI interaction respects them.",
        sections: [
          {
            heading: "What rules files are",
            body: "Cursor supports two kinds of persistent instructions. The older .cursorrules file (project root) is prepended to every prompt in the project — it is always-on context. The newer Rules system (Settings > Rules, or .cursor/rules/*.mdc files) is more granular: you can scope a rule to a file glob (e.g., apply only to src/api/**), set it as always-on or 'on when referenced', and give it a human-readable name. In 2026 the Rules system is preferred; .cursorrules still works but is being phased toward the new format."
          },
          {
            heading: "What to put in rules",
            body: "Rules files are most valuable for three things: architecture constraints ('all database access goes through the repository layer in src/repos/'), style conventions that go beyond a linter ('always use named exports, never default exports'), and project-specific knowledge the model cannot infer ('our API returns { data, error, meta } — never { result } or { payload }'). Keep each rule short and specific. A 10-rule file of sharp, concrete constraints outperforms a 100-line essay of vague guidance.\n\nAvoid putting things in rules that belong in code: type definitions, interface contracts, and example data should live in actual source files and be @-mentioned when relevant."
          },
          {
            heading: "Practical rules structure",
            body: "A solid starting set: one rule for stack constraints (framework, ORM, test runner), one for naming conventions (files, functions, components), one for error handling patterns, one for the API response shape, and one for what the model should never do ('never use any TypeScript type', 'never install lodash — use native array methods'). Review and trim the rules file every few weeks. Stale rules confuse the model more than no rules."
          }
        ],
        keyTakeaways: [
          ".cursor/rules/ MDC files are the 2026 preferred format — glob-scoped and named.",
          "Sharp, concrete rules (5-15 lines) outperform long prose instructions.",
          "Rules encode what a new developer would need to know on day one — not what the linter already catches."
        ],
        promptPlaybook: [
          {
            label: "Project rules file starter",
            prompt: "# Stack\n- Framework: Next.js 15 App Router\n- Styling: Tailwind CSS + shadcn/ui\n- ORM: Prisma + PostgreSQL\n- Testing: Vitest + React Testing Library\n\n# Architecture\n- All DB access through src/repos/*.ts repository functions. Never call prisma.* directly in route handlers or components.\n- Server Actions live in src/actions/*.ts. They validate with Zod before calling repos.\n- API responses: { data: T | null, error: string | null }\n\n# Conventions\n- Named exports only — no default exports.\n- No 'any' TypeScript type. Use 'unknown' and narrow it.\n- Imports are sorted: external packages first, then internal @/ paths.\n\n# Never\n- Do not install new npm packages without noting it in a comment.\n- Do not use moment.js — use date-fns.",
            why: "Short, concrete, structured by category. Every line is a rule the model can apply to a specific decision."
          }
        ],
        settings: [
          {
            name: ".cursor/rules/ directory (MDC format)",
            detail: "Create *.mdc files here. Each file has a YAML frontmatter block with 'name', 'description', and 'globs' fields. The body is the rule text in Markdown. Glob-scoped rules fire only on matching files."
          },
          {
            name: ".cursorrules (legacy, project root)",
            detail: "Still supported. Plain text, always prepended to every prompt. Good for a quick-start project; migrate to .cursor/rules/ when the file grows beyond ~50 lines."
          }
        ],
        features: [
          {
            name: "Rule scoping by glob",
            detail: "A rule scoped to 'src/api/**' fires when the model is editing an API file but not when it is editing a React component. This prevents irrelevant rules from consuming context."
          },
          {
            name: "Rules referenced in prompt",
            detail: "Set a rule to 'Agent requested' mode and reference it by name in a prompt ('follow @rule:api-conventions') to activate it on demand without making it always-on."
          }
        ],
        business: [
          "A shared .cursor/rules/ committed to the repo means every developer on the team gets the same AI behavior without any individual setup.",
          "Rules enforce architecture decisions at the point of writing, not just at code review."
        ],
        life: [
          "Solo project? A rules file is your own memory — it keeps the AI consistent across sessions even as the codebase grows.",
          "Learning a new framework? Write rules that enforce the idiomatic patterns as you discover them."
        ],
        proTips: [
          "Version your rules file in git. When AI output quality drifts, check if a rules change introduced ambiguity.",
          "Test a new rule by asking Composer to write a small feature and checking whether the output respects it before committing the rule."
        ],
        pitfalls: [
          "Rules that contradict each other are worse than no rules. 'Always use async/await' and 'Prefer Promise chaining for short callbacks' will confuse the model.",
          "Do not put API keys, secrets, or internal system names in rules files — they are committed to the repo."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a .cursorrules or rules file entry for a React + TypeScript SaaS app. It should cover: the component library, the state management approach, the error handling convention, and two things the model must never do.",
          starter: "# Stack\n- Components: ...",
          hint: "Five focused sections, each 1-3 lines. The 'Never' section should be the most specific — include exact identifiers where possible.",
          success: "A strong rules entry names real libraries, describes the architecture pattern with enough specificity that the model can apply it to a new file, and includes at least one hard prohibition with a reason."
        },
        narration: "Rules files are how you make Cursor remember who you are across every session. Without them, every Composer and Agent prompt starts from scratch — the model does not know you use Prisma instead of raw SQL, named exports instead of defaults, or that you committed to a specific folder structure two months ago. A rules file changes that. It is prepended to every prompt, silently, so the model always has your architectural context. Keep rules short and specific. The question to ask for each line is: would a new developer need to know this on day one to avoid writing something wrong? If yes, it belongs in the rules. If the linter catches it anyway, leave it out. And in 2026, use the dot-cursor-slash-rules directory over the legacy dot-cursorrules file — you get glob scoping, so your API conventions only fire on API files and your component rules only fire on components. That is sharper context, which is sharper output."
      },
      {
        id: "l5",
        title: "Model Picker and @-Context Mastery",
        level: "Advanced",
        duration: "15 min",
        summary: "Choose the right model for each task type and feed it exactly the context it needs — the two levers that control output quality.",
        sections: [
          {
            heading: "The model picker: what is available in 2026",
            body: "Cursor's model picker exposes frontier models directly: Claude Sonnet 4.5 and Opus 4 (Anthropic), GPT-4.1 and GPT-4.1 mini (OpenAI), and Gemini 2.5 Pro (Google). Each has a different price per request against your Cursor Pro quota. Fast models (GPT-4.1 mini, Claude Sonnet) are good for Tab, quick Cmd+K edits, and short Composer tasks. Frontier models (Claude Opus 4, Gemini 2.5 Pro) are worth the cost for complex multi-file reasoning, large context refactors, and tasks where quality matters more than speed. Switch models per task in the Composer dropdown — you are not locked in."
          },
          {
            heading: "Claude vs GPT vs Gemini: practical task routing",
            body: "Claude Opus 4 is the strongest choice for tasks requiring careful reasoning across a large codebase: 'find all the places where we violate our layering constraint' or 'explain this 500-line legacy module and suggest a refactor plan.' Its instruction-following on complex, multi-part prompts is excellent. GPT-4.1 is fast and highly reliable for mechanical tasks: code translations, format conversions, and straightforward feature additions where speed matters. Gemini 2.5 Pro has the largest context window of the three and handles full-repository tasks better than the others when you need to @codebase across many files.\n\nNo model is best at everything. The habit to build is: start with a fast model, escalate to a frontier model only when the output quality is not meeting the bar."
          },
          {
            heading: "@-context: feeding the model the right information",
            body: "The @-context system is Cursor's most underused feature. @file attaches a specific file. @folder attaches every file in a directory. @codebase triggers a semantic search against the indexed codebase and returns the most relevant chunks — useful when you do not know which file contains what. @docs attaches a linked documentation source (you can add your own in Settings > Docs). @git attaches a diff, commit, or branch comparison — powerful for 'explain what changed in the last three commits' or 'write a changelog for this PR.' Use @-mentions surgically: attaching a whole @folder when you only need one file burns context and dilutes the model's focus."
          }
        ],
        keyTakeaways: [
          "Match model to task: fast models for mechanical work, frontier models for complex reasoning.",
          "Claude Opus 4 leads on complex multi-file tasks; Gemini 2.5 Pro leads on largest-context needs.",
          "@codebase for 'find it for me'; @file for 'here is exactly what you need'; @git for diff and history context."
        ],
        promptPlaybook: [
          {
            label: "Large codebase audit (Gemini 2.5 Pro + @codebase)",
            prompt: "Using @codebase, find all places where we call third-party payment APIs directly in React components (not in a service layer). List each file and line number. Then suggest how to centralize these calls into a single payments service.",
            why: "@codebase semantic search across the entire index + a frontier model with large context = reliable audit of a pattern you cannot find with grep."
          },
          {
            label: "Understand a legacy module (Claude Opus 4 + @file)",
            prompt: "Read @src/billing/legacyInvoice.js carefully. Explain what this module does, what business rules are encoded in it, what the five most fragile parts are, and what a safe refactor path looks like. Be specific about line numbers.",
            why: "Claude Opus 4's instruction-following on multi-part, open-ended analysis prompts is exceptionally reliable."
          }
        ],
        settings: [
          {
            name: "Model picker (Composer dropdown)",
            detail: "Select per-session. Cursor Pro gives a monthly quota of 'premium' requests (frontier models). Unlimited 'standard' requests use faster, cheaper models. Check Settings > Billing to see your split."
          },
          {
            name: "Docs integration (Settings > Docs)",
            detail: "Link any documentation URL (your internal docs, a library's API reference). Cursor indexes it and makes it available as @docs/your-doc-name in prompts."
          }
        ],
        features: [
          {
            name: "@git context",
            detail: "Type @git in a Composer prompt to attach recent commits, a specific commit hash, or a branch diff. Use 'Generate a changelog from @git main..HEAD' before a release."
          },
          {
            name: "Codebase indexing status",
            detail: "Check Cursor Settings > Codebase — if indexing is stale or incomplete, @codebase results degrade. Re-index after large merges or initial clone."
          }
        ],
        business: [
          "Use @git main..feature-branch + Claude Opus 4 to generate a first-draft PR description automatically.",
          "Use @docs/internal-api + a fast model to answer 'how do I call the notifications endpoint' without leaving the editor."
        ],
        life: [
          "Building a side project solo? Use @codebase weekly to audit for pattern inconsistencies before they calcify.",
          "Starting a new open-source contribution? @git the last 20 commits to understand project conventions before writing a line."
        ],
        proTips: [
          "For a task involving 3+ files you know exactly, prefer multiple @file mentions over @codebase — the explicit context is more precise.",
          "When Opus or Gemini give a worse answer than Sonnet on a simple task, the likely cause is context bloat. Trim the @-mentions."
        ],
        pitfalls: [
          "@folder on a large src/ directory can consume most of the context window before your prompt even starts. Use it only on small, tightly scoped directories.",
          "Switching models mid-session in Composer sometimes causes the model to lose track of earlier conversation turns. For long sessions, stick to one model."
        ],
        exercise: {
          type: "prompt",
          brief: "Design a Cursor workflow for the following task: you have inherited a 10,000-line Python monolith. You need to understand its architecture, find all places it writes to disk, and produce a refactor plan. Write out the @-context choices, the model choice, and two specific prompts you would use.",
          starter: "Step 1 — understand architecture: Model: ... Context: @... Prompt: ...",
          hint: "Think about sequencing: understand first, then find patterns, then plan. Each step might warrant a different model and context scope.",
          success: "A strong answer sequences the work (audit then find then plan), uses @codebase or @folder for the discovery phase, escalates to a frontier model for the reasoning phase, and writes prompts with specific deliverables."
        },
        narration: "The model picker and @-context are the two dials that separate a Cursor novice from an expert. Most people pick one model and leave it there forever, and attach @codebase to everything. Both habits leave quality on the table. Here is the real approach. Match the model to the cognitive load of the task. Fast models — Claude Sonnet, GPT-4.1 mini — handle mechanical work: format conversions, quick edits, boilerplate. Frontier models — Claude Opus 4, Gemini 2.5 Pro — are worth the quota spend when you need genuine reasoning: understanding a legacy module, planning a refactor, auditing an architecture. And for @-context: be surgical. If you know the file, use @file. If you need the model to search for something, use @codebase. If you are in a post-PR conversation, use @git. Attaching an entire @folder when you need one file is like handing someone a novel to find a paragraph — technically possible, but it dilutes what they notice. Sharp context, right model, clear prompt. That is the formula."
      },
      {
        id: "l6",
        title: "Debugging and Advanced Workflows",
        level: "Advanced",
        duration: "15 min",
        summary: "Use Cursor's full stack — Agent, terminal, git context, and model selection — to debug production issues and manage large refactors.",
        sections: [
          {
            heading: "The AI debugging loop",
            body: "The most effective debugging pattern in Cursor: paste the full stack trace into an Agent prompt, attach @file for the suspected file, and ask the agent to reproduce the error by running the failing test or script, locate the root cause, and fix it — stopping before it deploys anything. This loop works because the agent can run the code, read the new error, narrow the hypothesis, and iterate — exactly the loop a developer does manually, but faster. The key addition is 'stopping before it deploys' — always scope the agent's permission boundary to local execution."
          },
          {
            heading: "Large refactors: planning before code",
            body: "For any refactor touching more than ten files, do a planning pass first. Open Composer with Claude Opus 4 and your @-context, and ask for a refactor plan only — no code yet. Review the plan, correct the approach, identify files the model missed. Only after you have agreed on the plan do you ask the model to execute it, ideally in phases: 'Implement phase 1: migrate the data layer. Do not touch the presentation layer yet.'\n\nThis two-pass approach (plan then execute) dramatically reduces the chance of the model going off in the wrong direction on a large change. A wrong plan costs 2 minutes to fix; a wrong 200-file refactor costs 2 hours to untangle."
          },
          {
            heading: "Git workflow integration",
            body: "Use @git context to: generate PR descriptions from a branch diff, understand what a colleague changed ('explain the diff on main..@git/their-branch'), write a migration guide for a breaking change, or detect unintended regressions ('compare @git HEAD~1..HEAD and flag any function signatures that changed'). Cursor's @git support makes it a lightweight code review assistant alongside its coding features. Combine @git with a short Agent prompt after each feature to auto-generate the commit message and PR body."
          }
        ],
        keyTakeaways: [
          "Paste full stack traces — the agent needs the exact error, not a paraphrase.",
          "Plan then execute on large refactors: one model pass for the plan, a separate session for execution.",
          "@git turns Cursor into a code-review assistant, not just a code-writing assistant."
        ],
        promptPlaybook: [
          {
            label: "Debug a failing test",
            prompt: "The following test is failing: [paste test name and error]. Run `npx vitest run src/__tests__/payments.test.ts` to see the full output. Find the root cause in @src/services/payments.ts. Fix only the implementation — do not change the test. Confirm the fix by re-running the test.",
            why: "Exact test command, exact file scope, and the 'do not change the test' constraint make this a tight, safe debugging loop."
          },
          {
            label: "Pre-PR refactor plan",
            prompt: "Before writing any code: read @src/legacy/order-pipeline.ts and @src/repos/orders.ts. Produce a step-by-step plan to migrate the inline SQL in order-pipeline.ts to use the repository layer in orders.ts. List every function that needs to change, the order of changes, and risks. Do not make any edits yet.",
            why: "'Do not make any edits yet' is the single most important phrase for a planning pass — it prevents premature code generation."
          }
        ],
        settings: [
          {
            name: "Notepads (Cursor > Notepads)",
            detail: "Persistent scratch space attached to a project. Use a Notepad to store your refactor plan, then @Notepad/refactor-plan in Agent prompts to keep the agent aligned to the agreed approach."
          },
          {
            name: "Auto-run mode (Agent settings)",
            detail: "When enabled, the agent runs commands without asking. Disable for production codebases; enable for sandboxed personal projects where speed matters more than safety."
          }
        ],
        features: [
          {
            name: "Inline error lens",
            detail: "Cursor underlines runtime errors it detects via the LSP and offers a 'Fix with AI' quick action. Good for type errors and import issues; less reliable for logic bugs."
          },
          {
            name: "Shadow workspace",
            detail: "Cursor runs a background process that applies AI suggestions to a shadow copy of your files to pre-validate them. When the shadow run fails, Cursor flags the suggestion before you accept it."
          }
        ],
        business: [
          "Use the planning pass to produce an engineering spec from a PM's feature request — then execute phase by phase.",
          "Run a weekly 'codebase audit' Agent prompt that checks for TODO comments, unhandled Promises, and missing error boundaries."
        ],
        life: [
          "Debugging a personal automation script at midnight? The Agent loop will find the typo in your cron expression faster than you will.",
          "Managing a personal portfolio site? Use @git to write your project changelog automatically for each month's updates."
        ],
        proTips: [
          "After a long Agent session, run `git diff` inside Cursor to review everything that changed — the diff view is cleaner than the activity log.",
          "For a multi-day refactor, commit your plan as a PLAN.md file and @-mention it in every Agent session to stay anchored."
        ],
        pitfalls: [
          "The agent will sometimes 'fix' a test by changing the assertion. Always grep for unexpected test file changes after a debug session.",
          "Planning passes are only useful if you actually read and correct the plan. Do not rubber-stamp a 20-step plan from the model without scrutiny."
        ],
        exercise: {
          type: "reflect",
          brief: "Describe your personal workflow for the next time you encounter a bug in a codebase you own. Which Cursor features would you use, in what order, and what guardrails would you put in place?",
          hint: "Think about: how you provide the error context, which model you choose, whether you use Agent or Composer, and what the agent is explicitly not allowed to touch.",
          success: "A strong answer sequences context gathering (paste error + @file) before action (Agent fix loop), specifies model choice, and includes at least one constraint on what the agent cannot change."
        },
        narration: "The full Cursor workflow comes together in debugging and large refactors. For debugging, the pattern is: give the agent the exact error — the full stack trace, not your interpretation of it — attach the specific file with @file, and let it run the failing test, read the output, and loop. It will find most bugs faster than you will because it never gets tired of reading stack traces. For large refactors, add a planning pass before you let it write a line of code. Ask for the plan only, read it, correct it, and only then say execute phase one. This two-step discipline is what separates a clean refactor from a three-hour untangling session. And use @git constantly. It turns Cursor into a code review tool, a changelog generator, and a regression spotter. Cursor is not just an editor that writes code for you — it is an editor that understands your codebase's history. Use that."
      }
    ],
    quiz: [
      {
        q: "What is the key difference between Composer mode and Agent mode in Cursor?",
        options: [
          "Composer uses a better model than Agent",
          "Composer shows a diff for approval before applying; Agent runs autonomously including terminal commands",
          "Agent only works on single files; Composer works on multiple files",
          "Composer requires a Cursor Pro subscription; Agent is free"
        ],
        answer: 1,
        why: "Composer proposes diffs and waits for your approval. Agent removes that gate and can execute terminal commands in a loop until the task is done."
      },
      {
        q: "Which @-context mention triggers a semantic search across the entire indexed codebase?",
        options: ["@file", "@folder", "@codebase", "@docs"],
        answer: 2,
        why: "@codebase runs a vector search against Cursor's codebase index and returns the most semantically relevant chunks. @file and @folder require you to specify the exact path."
      },
      {
        q: "What is the 2026 preferred format for Cursor rules files?",
        options: [
          ".cursorrules in the project root",
          ".cursor/rules/*.mdc files with YAML frontmatter",
          "A rules section inside cursor.config.json",
          "Comments prefixed with // cursor: in each source file"
        ],
        answer: 1,
        why: ".cursor/rules/*.mdc files support glob scoping and named rules — they are more granular and maintainable than the legacy .cursorrules flat file."
      },
      {
        q: "When is Claude Opus 4 the better model choice over a faster model in Cursor?",
        options: [
          "For every task, to maximize output quality",
          "Only for tasks longer than 1000 lines of code",
          "For complex multi-file reasoning, architecture analysis, and large-context refactor planning",
          "Only when working with Python files"
        ],
        answer: 2,
        why: "Frontier models like Opus 4 earn their cost on tasks requiring careful reasoning across large context. Mechanical tasks (format conversions, quick edits) are better served by faster, cheaper models."
      }
    ],
    resources: [
      {
        label: "Cursor documentation (docs.cursor.com)",
        note: "Read the Composer, Agent, and Rules sections specifically — the feature set evolves quickly and the docs track each release."
      },
      {
        label: "Your team's .cursor/rules/ directory",
        note: "The best resource is often your own codebase. Review what rules exist, test them, and iterate. A rules file owned by the team is worth more than any tutorial."
      },
      {
        label: "Cursor changelog",
        note: "Cursor ships weekly. The changelog is short and worth skimming — new features often change the optimal workflow significantly."
      }
    ]
  });
})();
