/* =============================================================================
   PROMETHEUS · Academy · Open-Source AI Coding Agents & Terminals
   The "AI Family" of coding agents: Aider, Cline, Roo Code, OpenHands, Goose,
   Gemini CLI, Continue, Codex CLI. Teaches how an agent actually works, then
   each tool, then how to run them together as a crew — safely.
   Content current as of June 2026. Feature claims are kept to stable behavior;
   no invented benchmarks or metrics.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  ACADEMY.register({
    id: "open-source-coding-agents",
    title: "Open-Source AI Coding Agents & Terminals",
    tagline: "Run a whole family of free, open coding agents — and direct them like a senior engineer.",
    category: "Vibe Coding",
    icon: "⌨️",
    color: "violet",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~110 min",
    instructor: {
      name: "Cipher Vale",
      role: "Terminal Agents Engineer",
      persona: "calm, precise, security-minded",
      voiceLang: "en-US",
    },
    hero: { tags: ["Updated for 2026", "Open-source", "Terminal + IDE", "MCP-ready"] },
    overview:
      "Closed tools like Cursor are excellent, but the fastest-moving frontier in AI coding is open source — agents you can install for free, point at any model, and run on your own machine. This track treats them as a family: Aider in the terminal, Cline and Roo Code in your editor, OpenHands as a full autonomous platform, Goose and Gemini CLI for MCP-powered automation, plus Continue and Codex CLI.\n\nWe start with the part most courses skip: how an AI coding agent actually works under the hood — the perceive-plan-act-observe loop, the repo map, the approval gate, and the sandbox. Once you understand the loop, every tool is just a different shell around the same engine, and you can pick the right one in seconds.",
    whyItMatters:
      "Open agents are free, private, and model-agnostic — you are never locked to one vendor's pricing or roadmap. Learn the loop once and you can adopt any new agent the week it ships. For a business, that means an AI development capability you own, can run on internal code without sending it to a SaaS, and can extend with your own tools through MCP.",
    outcomes: [
      "You will be able to explain the agent loop — perceive, plan, act, observe — and why approvals and sandboxes matter",
      "You will be able to drive Aider in the terminal: add files, use architect/editor mode, and rely on auto-commit",
      "You will be able to run Cline or Roo Code in your editor with Plan/Act mode and safe approval settings",
      "You will be able to decide when a full platform like OpenHands beats a lightweight CLI",
      "You will be able to connect agents to real tools with MCP via Goose and Gemini CLI",
      "You will be able to chain several agents on one task and review their diffs without losing control",
    ],
    lessons: [
      {
        id: "l1",
        title: "How an AI coding agent actually works",
        level: "Beginner",
        duration: "14 min",
        summary: "Before any tool: the loop every coding agent runs, the context it reads, and the two safety dials — approvals and the sandbox.",
        sections: [
          {
            heading: "The loop: perceive, plan, act, observe",
            body: "A coding agent is not autocomplete. It runs a loop. It perceives (reads files, the directory tree, error output), plans (decides the next step toward your goal), acts (edits a file, runs a shell command), and observes (reads what happened — a test result, a stack trace, a compiler error). Then it loops again, using what it observed to refine the next step. This is the entire difference between a chatbot and an agent: the agent closes the feedback loop itself by running things and reading the results. When you understand that an agent is just this loop wrapped in a tool interface, every product — terminal, IDE, cloud — becomes easy to evaluate: how good is it at each of the four steps, and how much control do you keep over the 'act' step?",
          },
          {
            heading: "Context: the repo map and why it matters",
            body: "An agent can only reason about code it can see, and no model can read a million-line repo at once. So good agents build a compressed view — Aider calls it a 'repo map', built with tree-sitter: a list of the files, their key functions and signatures, so the model knows what exists and where, without reading every line. Editor agents lean on the IDE's index and on your explicit @-mentions. The practical lesson is the same one from every AI tool: you control quality by controlling context. Point the agent at the right files, give it the error text verbatim, and tell it what it does not need to touch.",
          },
          {
            heading: "The two safety dials: approvals and the sandbox",
            body: "Because an agent can run commands, two settings decide how safe it is. The approval gate controls whether it pauses for your confirmation before each action — 'suggest' (show me everything first), 'auto-edit' (edit files freely but ask before shell commands), or 'full-auto' (run unattended). The sandbox controls where the action happens — your real working directory, or an isolated container (OpenHands runs in Docker; Codex and Gemini CLI offer OS-level sandboxes) where a bad command cannot harm your system or reach the network. The rule of thumb: the more autonomy you grant, the stronger the sandbox should be. Full-auto on your production checkout with no sandbox is how people lose work.",
          },
        ],
        keyTakeaways: [
          "An agent runs a loop — perceive, plan, act, observe — and closes the feedback loop by running things itself.",
          "Quality is a context problem: a repo map plus the right files and exact error text beats a bigger model.",
          "Approvals control 'should it ask first'; the sandbox controls 'where does it run'. Match autonomy to isolation.",
        ],
        settings: [
          { name: "Approval / autonomy level", detail: "Every agent has one: suggest vs auto-edit vs full-auto (names vary). Start at the most cautious for a new repo, loosen as you trust it." },
          { name: "Sandbox / workspace", detail: "Whether actions run in your real directory or an isolated container. Prefer a sandbox for unattended runs and untrusted code." },
        ],
        features: [
          { name: "Repo map", detail: "A compressed, signatures-only view of the codebase so the model knows what exists without reading every file. Aider's is the clearest example." },
          { name: "Tool calling", detail: "The mechanism that lets the model 'act' — run a shell command, edit a file, fetch a URL. MCP (covered later) is the open standard for adding more tools." },
        ],
        business: [
          "An agent that can run your test suite is a junior engineer that never tires of the red-green loop — point it at flaky CI and let it iterate.",
          "Understanding the loop lets you write a sane internal policy: which approval level and sandbox is required for which repos.",
        ],
        life: [
          "The same loop powers personal automation — fix a broken script by handing the agent the error and letting it iterate.",
          "Once you see the loop, you stop being intimidated by new tools; they are all the same engine in a different shell.",
        ],
        proTips: [
          "When an agent goes in circles, the cause is almost always missing context or a vague success criterion — add the file, add the exact error, define 'done'.",
          "Read the agent's tool-call log, not just its final message. The log shows what it actually did; the message is what it claims it did.",
        ],
        pitfalls: [
          "Granting full autonomy before you trust the agent on a repo. Earn trust on low-stakes tasks first.",
          "Letting an agent run destructive commands (git push --force, rm -rf, kubectl apply) without an approval gate.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick a recent coding task you did by hand. Break it into the agent loop: what would the agent perceive, what would it plan, what actions would it take, and what would it observe to know it succeeded? Then decide the approval level and sandbox you'd require.",
          hint: "The 'observe' step is the success criterion — tests pass, build exits clean, a script prints the right output. If you can't name it, the agent can't either.",
          success: "A strong answer names a concrete, machine-checkable success signal and matches the autonomy level to the risk (cautious + sandboxed for anything touching real data or deploys).",
        },
        narration:
          "Before we touch a single tool, understand the thing they all have in common: the loop. An AI coding agent perceives — it reads your files, the directory tree, the error output. It plans the next step. It acts — edits a file, runs a command. Then it observes what happened: the test passed, the build broke, the stack trace changed. And it loops, using that observation to decide the next move. That self-driven feedback loop is the entire difference between a chatbot and an agent. Two things shape the quality. First, context — an agent can only reason about code it can see, so it builds a compressed repo map of your files and their functions, and you sharpen it by pointing at the right files and pasting the exact error. Second, safety — two dials. Approvals decide whether it asks before acting. The sandbox decides where the action happens — your real folder, or an isolated container that a bad command can't escape. The rule that will keep you safe for the rest of this track: the more autonomy you grant, the stronger the sandbox should be. Learn the loop, and every agent becomes easy to judge.",
      },
      {
        id: "l2",
        title: "Aider: git-native pair programming in the terminal",
        level: "Beginner",
        duration: "16 min",
        summary: "The cleanest way to see the agent loop in the open: Aider edits your repo, commits every change, and works with any model — including local.",
        sections: [
          {
            heading: "Install, add files, and the auto-commit habit",
            body: "Aider is a Python terminal tool: install it with 'pip install aider-chat' (or 'uv tool install aider-chat' / 'brew install aider'), then run 'aider' inside a git repository. You bring files into the chat with '/add path/to/file.py' — only added files are editable, which keeps the agent focused. Aider's signature behavior is that every change it makes is a real git commit with a written message. There is no copy-paste, no mystery edits: you 'git log' and see exactly what changed and why, and '/undo' reverts the last Aider commit instantly. This git-native design is the safest on-ramp to agents because nothing is ever lost.",
          },
          {
            heading: "Architect / editor mode and the repo map",
            body: "Aider has two ways to work. In normal mode one model both reasons and edits. In architect/editor mode ('--architect', or '/architect'), one model acts as the architect — it reasons about the change and writes a plan — and a second model acts as the editor that turns the plan into precise file edits. This separation noticeably improves hard changes: a strong reasoning model plans, a fast model applies. Underneath, Aider builds a repo map with tree-sitter so even on a large project the model knows your functions and signatures without reading every file. You can add a 'CONVENTIONS.md' and '/read' it so your standards ride along in every request.",
          },
          {
            heading: "Any model, including local and free",
            body: "Aider is model-agnostic. '--model' points it at Anthropic, OpenAI, Google, or anything on OpenRouter, and it supports local models through Ollama — so you can run a coding agent fully offline on your own hardware, with your code never leaving the machine. This is a real advantage for private or regulated codebases. Useful in-chat commands: '/ask' to discuss without editing, '/code' to make changes, '/run' to execute a shell command and feed the output back to the model, '/test' to run your test command and auto-fix failures, '/diff' to review, and '/model' to switch mid-session.",
          },
        ],
        keyTakeaways: [
          "Aider commits every change to git with a message — '/undo' reverts instantly, so nothing is ever lost.",
          "Architect/editor mode splits reasoning from editing; it helps most on complex, multi-file changes.",
          "It runs any model, including local via Ollama — a private, offline coding agent for sensitive code.",
        ],
        promptPlaybook: [
          {
            label: "Scoped multi-file change",
            prompt: "/add src/auth/login.py src/auth/session.py\nAdd rate limiting to the login handler: max 5 attempts per email per 15 minutes, return HTTP 429 with a Retry-After header when exceeded. Use the existing Redis client in session.py. Do not change the function signatures. Add a test.",
            why: "Adding only the two relevant files keeps the agent focused; naming the existing client and 'do not change signatures' keeps the diff small and reviewable.",
          },
          {
            label: "Discuss before editing",
            prompt: "/ask Read the files I've added. Before changing anything, explain how session expiry currently works and the three safest places to add rate limiting. Don't write code yet.",
            why: "'/ask' keeps Aider in read-only discussion mode so you agree on the approach before any commit happens.",
          },
        ],
        settings: [
          { name: ".aider.conf.yml (project root)", detail: "Set defaults: model, architect mode, auto-test command, and which files to always read. Commit it so your team shares one config." },
          { name: "--auto-test / --test-cmd", detail: "Give Aider your test command and it runs tests after each change and fixes failures it caused — the agent loop, automated." },
          { name: "--model / --architect", detail: "Choose the model (e.g. a frontier model for architect, a fast model for editor). Combine with '--editor-model' to set the pair explicitly." },
        ],
        features: [
          { name: "Auto-commit + /undo", detail: "Each change is a git commit; '/undo' rolls back the last one. Your git history becomes the agent's audit trail." },
          { name: "Watch mode (--watch-files)", detail: "Aider watches for 'AI!' (do it) and 'AI?' (explain) comments in your editor, so you can drive it from any IDE without leaving your code." },
          { name: "Voice + images + URLs", detail: "Add a screenshot, paste a URL, or speak your request — Aider can use all three as context for a change." },
        ],
        business: [
          "Run Aider with a local model on a private codebase: full AI assistance with zero code leaving your network.",
          "The git-commit-per-change model gives a clean audit trail — useful when a regulated team needs to show what the AI changed and when.",
        ],
        life: [
          "Maintaining an old personal project? '/run python app.py', let Aider read the traceback, and watch it fix the break.",
          "Learning a language? '/ask' Aider to explain idiomatic patterns in files you've added, then '/code' the improvement.",
        ],
        proTips: [
          "Add only the files relevant to the task. A focused chat with 3 files beats a bloated one with 30 — more context is not better context.",
          "Keep a CONVENTIONS.md and '/read' it. It is Aider's version of a rules file and it sharpens every change.",
        ],
        pitfalls: [
          "Running Aider outside a git repo throws away its biggest safety feature. Always 'git init' first.",
          "Letting '/run' execute arbitrary commands unreviewed. Treat '/run' like a shell — read what it's about to do.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write the exact Aider session to add input validation to a single API handler: which file(s) you'd '/add', whether you'd '/ask' first, the change request with one hard constraint, and how you'd verify it.",
          starter: "/add src/api/...\n/ask ...\n",
          hint: "Name the one or two files, discuss with /ask before editing, state a constraint like 'do not change the response shape', and verify with /test or /run.",
          success: "A strong answer adds only the relevant file(s), discusses before editing, includes a concrete constraint, and verifies with a test or run command rather than trusting the diff blindly.",
        },
        narration:
          "Aider is the best place to see an open agent's loop in the clear, because everything it does shows up in git. You install it with pip, run it inside a git repo, and add the files you want it to touch with slash-add. From then on, every single change it makes is a real commit with a written message — so you can read git log and see exactly what it did, and slash-undo rolls back the last change instantly. Nothing is ever lost, which makes Aider the safest way to start. Two features earn their keep. Architect-editor mode splits the work: a strong model reasons and plans, a fast model applies the edits — and on hard changes that pairing is noticeably better. And the repo map, built with tree-sitter, gives the model a compressed view of your whole project so it knows your functions without reading every line. Best of all, Aider is model-agnostic — point it at any provider, or run a local model through Ollama so your code never leaves your machine. Add the right files, discuss with slash-ask before you commit, and let slash-test close the loop. That is professional-grade agent coding, free and private.",
      },
      {
        id: "l3",
        title: "Cline & Roo Code: autonomous agents inside your editor",
        level: "Intermediate",
        duration: "16 min",
        summary: "Bring the agent loop into VS Code with full file, terminal, and browser access — gated by Plan/Act mode, approvals, and checkpoints.",
        sections: [
          {
            heading: "Plan first, then act",
            body: "Cline is an open-source VS Code extension that gives an agent real hands: it can read and write files, run terminal commands, and even drive a browser. Its core discipline is the Plan/Act toggle. In Plan mode the agent investigates and proposes an approach but makes no changes — you read the plan, correct it, and agree. In Act mode it executes that plan step by step. This 'agree on the plan before any edits' pattern is the single most reliable way to keep an editor agent on track, and it mirrors the architect-then-build idea from Aider. You bring your own API key (Anthropic, OpenRouter, and many others), and Cline shows the token count and cost of each task so there are no billing surprises.",
          },
          {
            heading: "Approvals and checkpoints: staying in control",
            body: "Because Cline can run commands, it asks for approval before each action by default — you see the exact file edit or shell command and click approve or reject. As you trust it on a task, you can enable auto-approve for specific action types (e.g. file reads and edits) while still gating terminal commands. The safety net is checkpoints: Cline snapshots your workspace as it works, so if a multi-step task goes wrong you can roll back to any earlier point rather than untangling it by hand. Use a '.clinerules' file in the repo to encode standards the agent should always follow, just like Cursor's rules.",
          },
          {
            heading: "Roo Code: modes and multi-model",
            body: "Roo Code began as a Cline fork and pushes further on customization. Its headline feature is modes — Code, Architect, Ask, Debug, and custom modes you define — where each mode has its own behavior and can use a different model. You might run a frontier reasoning model in Architect mode to plan, then a fast, cheap model in Code mode to implement, then a different model again in Debug mode. Both Cline and Roo are MCP clients (next lesson), so they can call external tools — databases, issue trackers, browsers — beyond the editor. Pick Cline for a clean, focused experience; pick Roo when you want fine-grained control over modes and per-task model routing.",
          },
        ],
        keyTakeaways: [
          "Plan/Act mode — agree on the plan in Plan mode before letting the agent edit in Act mode.",
          "Default to per-action approvals; loosen them gradually and keep checkpoints on so you can roll back.",
          "Roo Code's modes let you route a different model to planning, coding, and debugging.",
        ],
        promptPlaybook: [
          {
            label: "Plan-mode investigation",
            prompt: "Switch to Plan mode. Investigate how user notifications are currently sent in this codebase. Identify every file involved, the email provider in use, and where I would add SMS as a second channel. Produce a step-by-step plan. Do not edit anything yet.",
            why: "Plan mode plus 'do not edit anything yet' forces investigation and a reviewable plan before a single change is made.",
          },
          {
            label: "Act-mode execution with a guardrail",
            prompt: "Switch to Act mode and implement the plan we agreed. Implement phase 1 only — the SMS provider client and its config. Do not modify the email path. Run the existing test suite after and fix anything you break. Ask before running any command that sends a real message.",
            why: "Phasing the work, fencing off the email path, and gating real-send commands keeps an autonomous run safe and reviewable.",
          },
        ],
        settings: [
          { name: "Plan/Act toggle", detail: "At the bottom of the Cline panel. Plan = investigate and propose, no edits. Act = execute. Make agreeing on a plan your default ritual for non-trivial tasks." },
          { name: "Auto-approve settings", detail: "Choose which action types run without a prompt (reads, edits, commands, browser). A good default: auto-approve reads/edits, always confirm terminal commands on real projects." },
          { name: ".clinerules (repo root)", detail: "Always-on instructions: stack, architecture constraints, and a 'never' list. Committed to the repo so the whole team shares it." },
        ],
        features: [
          { name: "Checkpoints", detail: "Workspace snapshots taken as the agent works. Roll back a multi-step task to any prior point instead of manually reverting." },
          { name: "Cost & token meter", detail: "Each task shows tokens used and dollar cost. Watch it to learn which tasks are cheap and which justify a frontier model." },
          { name: "MCP client + marketplace", detail: "Both Cline and Roo connect to MCP servers; Cline includes an in-editor marketplace to install them in a few clicks." },
        ],
        business: [
          "An editor agent with browser access can reproduce a UI bug, read the console error, fix the code, and confirm the fix — a full triage loop a teammate can watch.",
          "A committed .clinerules gives every developer the same AI behavior with zero individual setup.",
        ],
        life: [
          "Building a side project at night? Plan the feature, agree on it, then let Act mode implement it in phases while you review each step.",
          "Use checkpoints fearlessly on experiments — try a bold refactor knowing you can snap back to where you started.",
        ],
        proTips: [
          "Make 'Plan mode first' a hard habit for anything touching more than one file. The two minutes spent reviewing a plan saves an hour of cleanup.",
          "Keep terminal commands gated even after you trust file edits. File edits are reviewable in the diff; a wrong shell command may not be reversible.",
        ],
        pitfalls: [
          "Turning on full auto-approve (including commands) on a repo with a real database or deploy hook. Keep commands gated there.",
          "Skipping Plan mode because the task 'seems simple'. Simple-looking tasks are where the agent quietly touches a file you didn't expect.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write the Plan-mode prompt and then the Act-mode prompt for adding a CSV export button to an existing dashboard. The Act prompt must include phasing and at least one guardrail.",
          starter: "Plan mode: Investigate how the dashboard fetches its data ...",
          hint: "Plan: find the data source and where the button mounts, no edits. Act: implement in a phase, name a path it must not touch, and add a verification step.",
          success: "A strong answer keeps Plan mode read-only, then in Act mode phases the work, fences off unrelated code, and verifies the result before declaring done.",
        },
        narration:
          "Cline brings the agent loop into VS Code and gives it real hands — it can read and write files, run terminal commands, and even control a browser. With that much power, control is everything, and Cline's answer is the Plan-Act toggle. In Plan mode it investigates and proposes an approach but changes nothing; you read the plan, fix it, agree. Then in Act mode it executes, step by step. Agreeing on the plan before any edit is the single most reliable habit for keeping an editor agent on the rails. Two safety features back it up: per-action approvals, so you see each file edit and command before it runs, and checkpoints, which snapshot your workspace so you can roll back a multi-step task instead of untangling it by hand. Roo Code, a Cline cousin, pushes customization further with modes — Architect, Code, Debug, and your own — each able to run a different model, so a strong model plans and a fast one implements. Both are MCP clients, which is our next lesson. Plan first, gate your commands, keep checkpoints on, and an autonomous editor agent becomes a teammate you can actually trust.",
      },
      {
        id: "l4",
        title: "OpenHands: the autonomous software-engineering platform",
        level: "Intermediate",
        duration: "16 min",
        summary: "When you want the agent to own a whole task in an isolated runtime — resolve a GitHub issue end to end — a platform beats a CLI.",
        sections: [
          {
            heading: "What a platform adds over a CLI",
            body: "OpenHands (formerly OpenDevin) is one of the most-starred open-source agent projects, and it is a different shape from Aider or Cline. Instead of assisting you inside your editor, it runs the whole loop inside an isolated runtime — by default a Docker container — where it has its own shell, file system, and browser. You give it a goal ('add pagination to the users API and write tests'), and it works the task to completion in that sandbox, then hands you the diff. The platform shape matters when the task is self-contained and you want strong isolation: the agent can install packages, run builds, and execute freely because it is operating in a container, not on your host.",
          },
          {
            heading: "Issue to pull request",
            body: "OpenHands' standout workflow is resolving a real issue end to end. Connected to a GitHub repo, it can read an issue, reproduce the problem in its sandbox, write the fix, run the tests, and open a pull request for human review — the same path a junior engineer would take. You can run it three ways: a local GUI (point your browser at the container), a CLI/headless mode for scripting and CI, or OpenHands Cloud. The headless mode is what makes it powerful for automation — you can trigger an agent run from a CI job or a webhook and get a draft PR back, with a human always reviewing before merge.",
          },
          {
            heading: "When to reach for it (and when not to)",
            body: "Choose OpenHands when the task is well-specified, self-contained, and benefits from isolation — a bug with a failing test, a small feature with clear acceptance criteria, a dependency upgrade. Its sandbox means you can grant high autonomy without risking your machine. Reach for a lighter tool — Aider or Cline — when you want to stay in the loop edit by edit, or when the task is exploratory and you'll be steering constantly. A platform is a bigger setup (you need Docker and a configured LLM) and a heavier hammer; use it for the nails that deserve it. As with every agent, a human reviews the PR before it merges.",
          },
        ],
        keyTakeaways: [
          "OpenHands runs the full loop inside an isolated Docker runtime — high autonomy without risking your host.",
          "Its signature workflow is issue → reproduce → fix → test → pull request, with a human reviewing the PR.",
          "Use a platform for well-specified, self-contained tasks; use a CLI when you want to steer edit by edit.",
        ],
        promptPlaybook: [
          {
            label: "Self-contained task brief",
            prompt: "Goal: Add cursor-based pagination to GET /api/users (limit + next_cursor). Acceptance: existing tests still pass, plus a new test proving page 2 returns the next set with no overlap. Constraints: do not change the response field names; keep backward compatibility when no cursor is provided. Open a PR when tests are green.",
            why: "A platform agent thrives on explicit acceptance criteria and constraints — they are the success signal it checks itself against before opening the PR.",
          },
        ],
        settings: [
          { name: "Runtime (Docker sandbox)", detail: "OpenHands launches a container as the agent's workspace. Confirm Docker is running; the container is where all 'act' steps execute, isolated from your host." },
          { name: "LLM configuration (~/.openhands)", detail: "Set your model and key. A strong reasoning model is worth it here since the agent runs long, multi-step tasks unattended." },
          { name: "Headless / CLI mode", detail: "Run a task without the GUI for CI and automation. This is the entry point for 'trigger an agent from a webhook, get a draft PR'." },
        ],
        features: [
          { name: "GitHub issue resolver", detail: "Point it at an issue; it reproduces, fixes, tests, and opens a PR. The human reviews and merges." },
          { name: "Isolated browser + shell", detail: "The agent has its own browser and terminal inside the sandbox, so it can install, build, and verify without touching your machine." },
          { name: "MCP support", detail: "Extend the sandboxed agent with external tools via MCP, the same open standard the other agents use." },
        ],
        business: [
          "Wire OpenHands headless into CI to auto-draft fixes for well-labeled issues; engineers review PRs instead of writing boilerplate fixes.",
          "The Docker sandbox is a compliance-friendly story: the agent's actions are contained and auditable, not run loose on a developer's laptop.",
        ],
        life: [
          "Have a backlog of small, clearly-described bugs in a personal repo? Let OpenHands grind through them into PRs you review on the weekend.",
          "It's a safe place to let an agent run with high autonomy — the container is disposable, your machine is untouched.",
        ],
        proTips: [
          "Spend your effort on the acceptance criteria, not the prose. The clearer the 'done' signal, the better a platform agent performs.",
          "Keep tasks self-contained. If a job needs constant human judgment, a CLI agent you steer is the better tool.",
        ],
        pitfalls: [
          "Expecting a platform agent to read your mind on a vague task. Underspecified goals produce confident, wrong PRs.",
          "Merging an agent's PR without review because the tests pass. Tests prove the code runs, not that it does the right thing.",
        ],
        exercise: {
          type: "reflect",
          brief: "Identify one task from your work that is a good fit for OpenHands and one that is a bad fit. For each, explain why in terms of specification, isolation, and how much steering it needs.",
          hint: "Good fit: clear acceptance criteria, self-contained, benefits from a sandbox. Bad fit: exploratory, judgment-heavy, or needs you in the loop on every edit.",
          success: "A strong answer ties the good fit to a clear success signal and self-containment, and the bad fit to ambiguity or a need for constant human steering.",
        },
        narration:
          "OpenHands is a different shape of agent. Aider and Cline assist you inside your editor; OpenHands runs the whole loop inside its own isolated runtime — a Docker container with its own shell, files, and browser. You hand it a goal, and it works the task to completion in that sandbox, then gives you the diff. The shape matters because of isolation: the agent can install packages, run builds, and execute freely without touching your machine, so you can grant it high autonomy safely. Its standout move is resolving a GitHub issue end to end — read the issue, reproduce the bug in the sandbox, write the fix, run the tests, and open a pull request for you to review. Run it as a local app, headless in CI, or in the cloud. The headless mode is the powerful one: trigger an agent from a webhook and get a draft PR back. The judgment call is when to use it. Reach for OpenHands when a task is well-specified, self-contained, and benefits from a sandbox. Reach for a lighter CLI when you want to steer edit by edit. And whatever the agent produces, a human reviews the PR before it merges. Always.",
      },
      {
        id: "l5",
        title: "Goose & Gemini CLI: MCP automation and free, large-context exploration",
        level: "Advanced",
        duration: "16 min",
        summary: "MCP is how agents reach beyond code into your real tools. Goose makes it repeatable with recipes; Gemini CLI brings a generous free tier and huge context.",
        sections: [
          {
            heading: "MCP: the universal connector",
            body: "Everything so far has been an agent editing code. MCP — the Model Context Protocol — is the open standard that lets an agent reach beyond code into real tools: a database, your filesystem, GitHub, a browser, a calendar, a payment API. An MCP 'server' exposes a tool; an MCP 'client' (Cline, Roo, Goose, Gemini CLI, Claude Code, and more) can call it. Because it is a shared standard, a tool you connect once works across every agent that speaks MCP. This is what turns a coding agent into an operations agent — the same loop, now able to query your prod database read-replica, open a Linear ticket, or pull a Figma file.",
          },
          {
            heading: "Goose: recipes, extensions, and subagents",
            body: "Goose, from Block, is an open-source agent (CLI and desktop) built MCP-first. It calls MCP servers 'extensions', and you enable them per session — filesystem, GitHub, a database, your own. Its standout feature is recipes: a recipe is a YAML file that packages a goal, the extensions it needs, and parameters into a repeatable workflow you can share and re-run. Where Aider is great for a one-off change, a Goose recipe is great for the task you do every week — 'pull yesterday's errors, group them, file the top three as issues'. Goose can also spin up subagents to parallelize parts of a job. It is bring-your-own-model (Anthropic, OpenAI, Google, Ollama, and more), so you control cost and privacy.",
          },
          {
            heading: "Gemini CLI: free tier, big context, multimodal",
            body: "Gemini CLI is Google's open-source terminal agent, and its draw is access: signing in with a personal Google account gives a generous free allowance, so anyone can run a capable agent at no cost. It pairs that with a very large context window — useful for loading a whole codebase or a long document in one pass — plus multimodal input (hand it a screenshot of a bug or a UI mockup) and a built-in sandbox for safer execution. It is an MCP client too, and uses a 'GEMINI.md' context file (its version of a rules file). Reach for Gemini CLI when you want broad, low-cost exploration and large-context reading; reach for Goose when you want to package a tool-using workflow you'll run again and again.",
          },
        ],
        keyTakeaways: [
          "MCP is the open standard that lets any compliant agent use the same external tools — connect once, use everywhere.",
          "Goose recipes turn a tool-using workflow into a shareable, repeatable YAML you re-run on demand.",
          "Gemini CLI's free tier, large context, and multimodal input make it the low-cost exploration agent.",
        ],
        promptPlaybook: [
          {
            label: "Goose recipe outline (repeatable ops task)",
            prompt: "Create a recipe named 'triage-errors'. Extensions: the Sentry MCP server and the GitHub MCP server. Parameter: time_window (default 24h). Steps: pull errors in the window, group by root cause, and for the top 3 by frequency, open a GitHub issue with the stack trace and a suggested file to investigate. Ask before opening each issue.",
            why: "Packaging extensions, a parameter, and a clear sequence into a recipe makes a weekly chore a one-command, reviewable workflow.",
          },
          {
            label: "Gemini CLI large-context audit",
            prompt: "Load the whole src/ directory. Find every place we read an environment variable directly instead of going through config.ts. List file and line for each, then propose a single migration to centralize them. Don't edit yet.",
            why: "A large context window lets the agent reason across the entire source tree at once, which is exactly what a 'find this pattern everywhere' audit needs.",
          },
        ],
        settings: [
          { name: "Goose extensions (MCP servers)", detail: "Enable per session or in config. Start with filesystem + GitHub, then add a database or your own server. Each extension is a set of tools the agent may call." },
          { name: "Goose recipes (YAML)", detail: "Define goal, required extensions, and parameters. Commit recipes to a repo so your team shares the same automations." },
          { name: "Gemini CLI auth + GEMINI.md", detail: "Sign in with a Google account for the free tier (or use an API key). Put project standards in GEMINI.md so they apply to every request." },
        ],
        features: [
          { name: "MCP client (both)", detail: "Goose and Gemini CLI both call MCP servers, so the database/GitHub/browser tools you set up are reusable across agents." },
          { name: "Goose subagents", detail: "Delegate parts of a task to parallel subagents — useful for fan-out work like 'check each service for the same misconfig'." },
          { name: "Gemini sandbox + multimodal", detail: "Run code in a sandbox for safety, and feed images (screenshots, mockups) as first-class context." },
        ],
        business: [
          "A shared library of Goose recipes is institutional knowledge as code — onboarding, incident triage, and reporting become one command each.",
          "Gemini CLI's free tier lowers the barrier for a whole team to start using agents before anyone signs a contract.",
        ],
        life: [
          "Automate your own chores: a recipe that summarizes your starred GitHub repos' releases each week, or tidies a downloads folder by type.",
          "Use Gemini CLI's multimodal input to turn a screenshot of a chart into the code that reproduces it.",
        ],
        proTips: [
          "Treat MCP servers like dependencies: enable only the ones a task needs. Fewer tools in scope means clearer agent decisions.",
          "Promote a good one-off Goose session into a recipe the moment you realize you'll do it again. That is where the compounding leverage is.",
        ],
        pitfalls: [
          "Connecting a write-capable MCP server (a database with write access, a deploy tool) without an approval gate. Read-only first.",
          "Assuming 'free' means 'no limits' — the Gemini CLI free tier is generous but has caps; plan heavy automation around them.",
        ],
        exercise: {
          type: "reflect",
          brief: "Name one weekly task in your work that involves a tool other than code (a database, a tracker, email, a dashboard). Sketch it as a Goose recipe: which MCP extensions, what parameters, what steps, and where you'd put an approval gate.",
          hint: "The approval gate belongs on any step that writes or sends — opening tickets, emailing, changing data. Keep reads automatic.",
          success: "A strong answer picks a genuinely repeatable task, lists the specific tools as extensions, and gates the write/send steps while leaving reads automatic.",
        },
        narration:
          "Everything so far has been an agent editing code. Now we connect agents to the rest of your world, and the key that unlocks it is MCP — the Model Context Protocol. MCP is an open standard: a server exposes a tool, like a database or GitHub or a browser, and any agent that speaks MCP can call it. Connect a tool once, and it works across every compliant agent. That is what turns a coding agent into an operations agent. Goose, from Block, is built MCP-first. It calls these tools extensions, and its best feature is recipes — a YAML file that packages a goal, the tools it needs, and parameters into a repeatable workflow you can share and re-run. Aider is for the one-off change; a Goose recipe is for the task you do every week. Gemini CLI, Google's open terminal agent, brings something different: access. Sign in with a Google account and you get a generous free tier, a very large context window for reading whole codebases at once, and multimodal input so you can hand it a screenshot. Use Gemini CLI for broad, cheap exploration; use Goose to package the tool-using workflows you'll run again and again. And one rule for MCP: connect write-capable tools read-only first, and gate anything that writes or sends.",
      },
      {
        id: "l6",
        title: "Run them as a family: chaining agents safely + reviewing AI code",
        level: "Advanced",
        duration: "16 min",
        summary: "No single agent wins everything. Pick the right one per task, chain them, and keep the one non-negotiable habit: review every diff.",
        sections: [
          {
            heading: "Right agent for the job",
            body: "Think of these tools as a crew with specialties, not rivals. Aider is the git-native terminal specialist — best for precise, committed changes on a repo you have open, and for private/local-model work. Cline and Roo are your in-editor agents — best when you want to watch the loop, drive a browser, or stay close to the diff. OpenHands is the platform — best for self-contained tasks you hand off to an isolated runtime, like issue-to-PR. Goose and Gemini CLI are your tool-using and exploration agents — best for MCP-powered automation and large-context reading. Claude Code (its own track here) is the orchestrator you already know. Choosing well is most of the skill: match the task's autonomy, isolation, and tool needs to the agent built for them.",
          },
          {
            heading: "Chaining agents into a pipeline",
            body: "Real work often flows through several agents. A common chain: explore and plan with a large-context agent (Gemini CLI reads the whole module and proposes a refactor plan), implement with a precise editor (Aider or Cline executes the plan in committed, reviewable steps), automate the surrounding chores with a tool agent (a Goose recipe runs the tests, files a ticket, posts a summary), and hand off the self-contained pieces to a platform (OpenHands turns three small issues into three draft PRs overnight). Because they all share git and MCP, the handoffs are clean — one agent's commits and outputs are the next agent's input. You are the director: you decide the sequence and review at each seam.",
          },
          {
            heading: "The one habit that makes it safe: review every diff",
            body: "Speed from agents is real, but it is only an advantage if the code is correct, and a passing test proves the code runs — not that it does the right thing. So the non-negotiable habit is review: read every diff before it merges, the way you would review a teammate's pull request. Watch specifically for the agent that 'fixes' a failing test by weakening the assertion, an unexpected file it touched, a new dependency it added quietly, or a secret it printed to a log. Keep destructive commands behind an approval gate, run unattended work in a sandbox, and let git be your undo button. The directors who win with agents are not the ones who trust blindly — they are the ones who move fast and still read the diff.",
          },
        ],
        keyTakeaways: [
          "The agents are a crew with specialties — choosing the right one per task is most of the skill.",
          "Chain them through git and MCP: explore → plan → implement → automate → hand off, reviewing at each seam.",
          "Review every diff. Tests prove code runs; only review proves it does the right thing.",
        ],
        promptPlaybook: [
          {
            label: "Plan in one agent, implement in another",
            prompt: "Step 1 (Gemini CLI): Load src/billing/. Produce a step-by-step plan to move inline SQL into a repository layer. List every function to change and the order. No edits.\nStep 2 (Aider): /add the files from the plan. Implement phase 1 only — the repository module and its tests. Commit. Do not touch the callers yet.",
            why: "The large-context agent does the cross-file reasoning; the git-native agent makes precise, committed changes. Each does what it is best at.",
          },
          {
            label: "Diff-review checklist prompt",
            prompt: "Before I merge: review your own diff and answer four things explicitly — (1) every file you changed and why, (2) any test assertions you modified, (3) any new dependency you added, (4) anything that could log a secret or hit the network. Be specific with file and line.",
            why: "Forcing the agent to self-report against the exact failure modes you care about surfaces the risky changes for your review instead of burying them.",
          },
        ],
        settings: [
          { name: "Per-repo autonomy policy", detail: "Decide, per repo, the allowed approval level and whether a sandbox is required. Stricter for anything with real data or a deploy path." },
          { name: "Shared rules files", detail: "CONVENTIONS.md (Aider), .clinerules (Cline/Roo), GEMINI.md (Gemini CLI), AGENTS.md (Codex). Keep them consistent so every agent codes to the same standard." },
          { name: "Cost routing", detail: "Frontier model for planning and hard reasoning; fast, cheap model for mechanical edits. Most agents let you set this per mode or per session." },
        ],
        features: [
          { name: "Git as the shared bus", detail: "Commits are how agents hand off cleanly — one agent's committed change is the next one's starting point, and your universal undo." },
          { name: "MCP as the shared toolbox", detail: "A tool you wire up once (database, GitHub, browser) is callable from every MCP-speaking agent in the chain." },
          { name: "Codex CLI & Continue (also in the family)", detail: "Codex CLI is OpenAI's sandboxed terminal agent with suggest/auto-edit/full-auto approval modes and an AGENTS.md context file; Continue brings agent + autocomplete + @-context providers into VS Code and JetBrains. Both fit the same loop and habits." },
        ],
        business: [
          "Document your pipeline once — which agent plans, which implements, which automates — and you have a repeatable AI development process the whole team can run.",
          "A written 'review every diff' policy plus per-repo autonomy rules is the governance story that lets a business adopt agents without fear.",
        ],
        life: [
          "For a personal project, a two-agent chain (plan with one, implement with another) gives you senior-level workflow for free.",
          "Keep a tiny 'agent runbook' note for yourself: which tool you reach for, for which kind of task. It compounds.",
        ],
        proTips: [
          "Standardize your rules files across agents so switching tools doesn't change your code style.",
          "When a chain breaks, check the seam — the handoff between two agents — first. That is where context is most often dropped.",
        ],
        pitfalls: [
          "Trusting a green test suite as proof of correctness. It proves the code ran, not that it solved the problem.",
          "Letting tool sprawl set your strategy. Pick a small default crew you know deeply; add a new agent only when it clearly wins a task.",
        ],
        exercise: {
          type: "reflect",
          brief: "Design your own two- or three-agent pipeline for a real feature you want to build. Name the agent for each stage (explore/plan, implement, automate/hand-off), the rules file you'd share, and the exact point where you review.",
          hint: "Put a review at every seam where one agent hands to the next. Name the model you'd route to planning vs implementation.",
          success: "A strong answer assigns each stage to the agent suited to it, shares a consistent rules file, routes models by cognitive load, and places an explicit human review before anything merges.",
        },
        narration:
          "Here is how it all comes together. Stop thinking of these agents as rivals and start thinking of them as a crew with specialties. Aider is your git-native terminal specialist for precise, committed, private changes. Cline and Roo are your in-editor agents when you want to watch the loop and stay close to the diff. OpenHands is the platform for self-contained tasks you hand to an isolated runtime. Goose and Gemini CLI are your tool-using and large-context explorers. Claude Code is the orchestrator you already know. Choosing the right one for a task is most of the skill. And the real power is chaining them: explore and plan with a big-context agent, implement in precise committed steps with an editor, automate the chores with a Goose recipe, and hand the self-contained pieces to a platform overnight. Because they all share git and MCP, the handoffs are clean. You are the director — you set the sequence and review at every seam. Which brings us to the one habit that makes all of this safe: review every diff. A passing test proves the code runs, not that it's right. Read the changes like you'd review a teammate's pull request — watch for a weakened test, an unexpected file, a quiet new dependency, a logged secret. Gate destructive commands, sandbox unattended runs, and let git be your undo. Move fast, and still read the diff. That is what makes you a director instead of a gambler.",
      },
    ],
    quiz: [
      {
        q: "What makes an AI coding agent different from a chatbot or autocomplete?",
        options: [
          "It uses a larger language model",
          "It closes its own feedback loop — it acts (runs commands, edits files) and observes the result to decide the next step",
          "It only works inside a terminal",
          "It never needs human review",
        ],
        answer: 1,
        why: "An agent runs the perceive-plan-act-observe loop itself: it executes actions and reads the results to refine its next move. That self-driven loop, not model size, is the defining trait.",
      },
      {
        q: "What is Aider's signature safety feature?",
        options: [
          "It runs only in the cloud",
          "It refuses to edit more than one file at a time",
          "Every change is a real git commit, so '/undo' reverts it and git log is a full audit trail",
          "It requires a paid subscription for editing",
        ],
        answer: 2,
        why: "Aider is git-native: each change is committed with a message, '/undo' rolls back the last one, and nothing is ever lost — which is why it's the safest on-ramp to agents.",
      },
      {
        q: "In Cline, what does Plan mode do?",
        options: [
          "It runs the task automatically with no approvals",
          "It investigates and proposes an approach but makes no edits, so you can agree on the plan first",
          "It deletes the previous plan",
          "It switches to a cheaper model",
        ],
        answer: 1,
        why: "Plan mode is read-only investigation: the agent proposes a plan you review and correct before switching to Act mode to execute. Agreeing on the plan first is the key control habit.",
      },
      {
        q: "What does MCP (Model Context Protocol) provide?",
        options: [
          "A faster language model",
          "An open standard so any compliant agent can call the same external tools (databases, GitHub, browsers) — connect once, use everywhere",
          "A way to compress source code",
          "A replacement for git",
        ],
        answer: 1,
        why: "MCP is the universal connector: servers expose tools and any MCP client (Cline, Roo, Goose, Gemini CLI, Claude Code) can call them, so a tool you wire up once is reusable across agents.",
      },
      {
        q: "Why is 'review every diff' the non-negotiable habit when working with agents?",
        options: [
          "Because agents are usually wrong",
          "Because a passing test proves the code runs, not that it does the right thing — and agents can weaken tests, add dependencies, or touch unexpected files",
          "Because git requires it",
          "Because it is faster than reading the code",
        ],
        answer: 1,
        why: "Tests prove execution, not correctness. Reviewing the diff is the only reliable way to catch a weakened assertion, an unexpected file change, a quiet new dependency, or a logged secret before it merges.",
      },
    ],
    resources: [
      { label: "Aider docs (aider.chat)", note: "Read the 'usage' and 'in-chat commands' pages, plus the leaderboard of which models edit code best." },
      { label: "Cline & Roo Code docs", note: "Focus on Plan/Act, auto-approve settings, checkpoints, and the MCP server setup pages." },
      { label: "OpenHands docs (all-hands.dev / GitHub)", note: "Read the getting-started for Docker, then the headless/CLI and GitHub issue-resolver guides." },
      { label: "Goose docs (block.github.io/goose)", note: "Study extensions (MCP) and recipes — recipes are where the repeatable leverage lives." },
      { label: "Gemini CLI & Codex CLI repos", note: "Both are open source; skim the README for auth, sandbox, approval modes, and the context file (GEMINI.md / AGENTS.md)." },
      { label: "Model Context Protocol (modelcontextprotocol.io)", note: "The spec and the server directory. Understanding MCP once pays off across every agent in this track." },
    ],
  });
})();
