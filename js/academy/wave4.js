/* =============================================================================
   PROMETHEUS · Academy · Wave 4 — Industry & Advanced
   Industry playbooks (Legal, Real Estate, Healthcare Ops) + Advanced Agent/MCP
   building. Industry tracks emphasize the analyst-not-advisor line + privacy.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ===================== AI for Legal & Contracts ===================== */
  ACADEMY.register({
    id: "ai-legal",
    title: "AI for Legal & Contracts",
    tagline: "Draft, review, and understand contracts in minutes — with a human lawyer on the line.",
    category: "Business & Life Playbooks",
    icon: "⚖️",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~55 min",
    instructor: { name: "The Architect", role: "Legal-Ops AI Guide", persona: "precise, careful, plain-spoken", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Not legal advice", "Privacy-first"] },
    overview:
      "AI is a superb legal assistant and a dangerous substitute for a lawyer. It can summarize a 60-page contract, flag risky clauses, draft a first version, and explain legalese in plain English — saving hours. But it can be confidently wrong, it isn't licensed, and the stakes are high.\n\nThis track shows how to use AI across contracts and legal research, and exactly where the human-lawyer line is.",
    whyItMatters:
      "Legal work is expensive and slow, and most people sign things they don't understand. AI closes the comprehension gap — as long as a qualified human owns the decisions.",
    outcomes: [
      "Summarize and risk-flag contracts quickly",
      "Draft first-version clauses and documents",
      "Translate legalese into plain English",
      "Keep the human-lawyer line and protect confidentiality",
    ],
    lessons: [
      {
        id: "l1",
        title: "Review & understand contracts",
        level: "Beginner",
        duration: "11 min",
        summary: "Turn dense contracts into clear summaries and risk flags.",
        sections: [
          { heading: "Summarize and flag", body: "Paste a contract (or upload it) and ask AI to summarize it in plain English, list each party's obligations, and flag unusual or risky clauses — auto-renewal, liability, IP assignment, non-competes, indemnification. You get a map of a dense document in minutes, so you know what to focus on." },
          { heading: "Plain-English translation", body: "Ask 'what does this clause actually mean, and what's the worst case for me?'. AI is excellent at decoding legalese and surfacing the practical implications — turning intimidating language into decisions you can reason about." },
          { heading: "Ask the right questions", body: "Use AI to generate the questions you should ask before signing, and the redlines you might request. It won't replace counsel, but it makes you a far more informed client and a faster reviewer." },
        ],
        keyTakeaways: [
          "Summaries + risk flags map a contract fast.",
          "AI decodes legalese into practical implications.",
          "Use it to generate the questions/redlines to raise.",
        ],
        promptPlaybook: [
          { label: "Contract risk review", prompt: "Summarize this contract in plain English. List each party's key obligations, then flag risky or unusual clauses (auto-renewal, liability caps, IP, non-compete, indemnity) with why each matters and a suggested question to raise. This is not legal advice. Contract: [paste]", why: "Maps the document and surfaces what to scrutinize." },
        ],
        proTips: [
          "Ask for the 'worst case for me' on any clause you don't understand.",
          "Have it draft the questions to ask your lawyer — cheaper, faster meetings.",
        ],
        pitfalls: [
          "Treating AI output as legal advice or a substitute for counsel.",
          "Pasting confidential contracts into consumer tools without privacy controls.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a contract-review prompt: plain-English summary, obligations, risk flags, and questions to raise.",
          starter: "Summarize this contract plainly, list obligations, flag risky clauses with why, and give questions to raise. Not legal advice. [paste]",
          hint: "Summary + obligations + risk flags + questions + disclaimer.",
          success: "Strong prompts request a plain summary, obligations, risk flags with reasons, and questions — and note it isn't legal advice.",
        },
        narration:
          "AI is a brilliant legal assistant and a dangerous substitute for a lawyer — and the gap between those is where you stay safe. On the assistant side, it's transformative: paste a sixty-page contract and get a plain-English summary, each party's obligations, and a list of the risky clauses to scrutinize — auto-renewal, liability, IP, non-competes. Ask 'what does this clause mean, and what's the worst case for me?' and it decodes the legalese into decisions you can actually reason about. Use it to generate the questions and redlines to raise. But never treat its output as legal advice, and never paste confidential contracts into a consumer tool without privacy controls. AI makes you an informed client; a licensed human still owns the call.",
      },
      {
        id: "l2",
        title: "Draft, research & the human line",
        level: "Advanced",
        duration: "11 min",
        summary: "First drafts and research — with mandatory verification.",
        sections: [
          { heading: "First-draft drafting", body: "AI can draft NDAs, clauses, policies, and letters from your parameters — a strong starting point you and counsel refine. Give it the specifics (parties, term, jurisdiction intent, must-haves) and it produces a structured first version far faster than starting blank." },
          { heading: "Research — verify everything", body: "AI can explain legal concepts and point you toward relevant areas, but it can hallucinate cases, statutes, and citations — a well-documented failure that has sanctioned real lawyers. Never cite anything from AI without verifying it in an authoritative source. Treat legal 'facts' from a model as leads, not truth." },
          { heading: "The human line & privacy", body: "AI to draft, summarize, and prepare; a licensed attorney to advise and decide on anything that matters. For confidential matters, use tools with no-training/enterprise terms or local models, and redact identifiers. The convenience is never worth a privilege or confidentiality breach." },
        ],
        keyTakeaways: [
          "AI drafts first versions; counsel refines and approves.",
          "Never cite AI legal facts/cases without verifying — hallucination is real.",
          "Confidential matters need privacy controls; humans own decisions.",
        ],
        promptPlaybook: [
          { label: "First-draft clause", prompt: "Draft a mutual NDA first version for [parties] for [purpose]. Include confidentiality, term, exclusions, and return-of-materials. Plain, balanced language. Mark places I must have a lawyer confirm. Not legal advice.", why: "A structured first draft with explicit 'lawyer must confirm' markers." },
        ],
        proTips: [
          "Ask it to mark every spot that needs lawyer confirmation.",
          "Verify any cited case/statute in a real legal database before use.",
        ],
        pitfalls: [
          "Filing or relying on AI-generated citations unverified (lawyers have been sanctioned for this).",
          "Sharing privileged/confidential info with non-private tools.",
        ],
        exercise: {
          type: "reflect",
          brief: "Define your legal-AI rules: what you'd draft/summarize with AI, what always goes to a lawyer, and your privacy controls.",
          hint: "Draft/summarize → AI; advice/filing/citations → verify + lawyer; redact + no-train.",
          success: "Good answers keep AI on drafting/summarizing, route advice/citations to verification + counsel, and set privacy controls.",
        },
      },
    ],
    quiz: [
      { q: "AI's safe role in legal work is…", options: ["Your lawyer", "Assistant: summarize/draft/explain; humans decide", "Filing court documents alone", "Giving binding advice"], answer: 1, why: "It assists; licensed humans advise and decide." },
      { q: "A documented AI legal danger is…", options: ["Too fast", "Hallucinated cases/citations", "Good summaries", "Plain English"], answer: 1, why: "Models invent citations; lawyers have been sanctioned for relying on them." },
      { q: "Before citing AI legal facts you must…", options: ["Nothing", "Verify in an authoritative source", "Trust it", "Add more prompts"], answer: 1, why: "Always verify cases/statutes independently." },
      { q: "For confidential contracts you should…", options: ["Use any free tool", "Use private/no-train tools + redact", "Post publicly", "Email everyone"], answer: 1, why: "Protect privilege/confidentiality with privacy controls." },
    ],
    resources: [
      { label: "Verify citations", note: "Never use an AI-provided case/statute without checking it." },
      { label: "Mark lawyer-confirm spots", note: "Have AI flag everything counsel must approve." },
    ],
  });

  /* ===================== AI for Real Estate ===================== */
  ACADEMY.register({
    id: "ai-real-estate",
    title: "AI for Real Estate",
    tagline: "Listings, leads, and market insight — faster, with a human close.",
    category: "Business & Life Playbooks",
    icon: "🏠",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~55 min",
    instructor: { name: "Sofia Lang", role: "PropTech AI Coach", persona: "energetic, practical", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Listings + leads", "Fair-housing aware"] },
    overview:
      "Real estate runs on content, responsiveness, and relationships — all of which AI supercharges. Write compelling, compliant listings in seconds, follow up with every lead instantly, prep market summaries, and automate the busywork so you spend time with clients.\n\nThis track covers listing copy, lead handling, market research, and the fair-housing and disclosure rules to respect.",
    whyItMatters:
      "Speed-to-lead and great marketing win deals. AI gives a solo agent the output of a team — while you keep the trust that closes.",
    outcomes: [
      "Write compelling, compliant listing copy fast",
      "Automate instant lead follow-up and nurture",
      "Generate market and neighborhood summaries",
      "Respect fair-housing, disclosure, and accuracy rules",
    ],
    lessons: [
      {
        id: "l1",
        title: "Listings & marketing",
        level: "Beginner",
        duration: "10 min",
        summary: "Great property copy and content — on brand and compliant.",
        sections: [
          { heading: "Listing copy in seconds", body: "Feed AI the property facts (beds, baths, features, neighborhood) and get polished listing descriptions in multiple lengths and tones — MLS, Instagram, a luxury brochure. Generate variations, pick the best, and personalize. Hours of writing become minutes." },
          { heading: "Content engine", body: "Repurpose one listing or market update into a week of content: reels scripts, email blasts, neighborhood guides, just-listed/just-sold posts. Pair with image tools for branded graphics. Consistency builds the personal brand that drives referrals." },
          { heading: "Fair-housing compliance", body: "Critical: listing and marketing copy must follow fair-housing law — describe the property, not the ideal buyer, and avoid language about protected classes (e.g., 'perfect for families', 'safe neighborhood'). Have AI draft, then review against compliance — and tell it to avoid steering language." },
        ],
        keyTakeaways: [
          "Generate listing copy in many lengths/tones from facts.",
          "Repurpose into a week of branded content.",
          "Enforce fair-housing: describe the property, not the buyer.",
        ],
        promptPlaybook: [
          { label: "Compliant listing copy", prompt: "Write 3 listing descriptions (MLS 120 words, Instagram caption, luxury brochure) for: [facts]. Describe the property and features only. Follow fair-housing rules — no references to protected classes or who the home is 'perfect for'. No steering language.", why: "Great copy with compliance built into the instruction." },
        ],
        proTips: [
          "Always add the fair-housing constraint to every marketing prompt.",
          "Keep a brand-voice spec so all listings sound like you.",
        ],
        pitfalls: [
          "Fair-housing violations from 'ideal buyer' language — review every piece.",
          "Publishing inaccurate AI-embellished features; verify facts.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a listing-copy prompt with a built-in fair-housing constraint.",
          starter: "Write MLS + social listing copy for [facts]. Property/features only; follow fair-housing — no protected-class or 'perfect for' language.",
          hint: "Facts + multiple formats + explicit fair-housing constraint.",
          success: "Strong prompts produce multi-format copy with an explicit fair-housing/no-steering constraint.",
        },
        narration:
          "Real estate runs on content and responsiveness, and AI supercharges both. Feed it the property facts and get polished listing copy in seconds — an MLS description, an Instagram caption, a luxury brochure — then pick the best and personalize. Turn one listing into a week of content: reels, emails, neighborhood guides, just-listed posts. But here's the non-negotiable: fair-housing law. Your copy must describe the property, not the ideal buyer — no 'perfect for families', no 'safe neighborhood', nothing touching protected classes. So bake that rule right into every prompt: property and features only, no steering language. Great marketing at team-speed, with compliance built in.",
      },
      {
        id: "l2",
        title: "Leads, market research & automation",
        level: "Advanced",
        duration: "11 min",
        summary: "Instant follow-up, sharp market summaries, and workflows that run themselves.",
        sections: [
          { heading: "Speed-to-lead", body: "The agent who responds first usually wins. Use AI + automation to instantly reply to every inquiry, answer common questions, qualify, and book showings — then hand warm leads to you. Combine the sales playbook (personalized outreach, follow-up sequences) with real-estate specifics." },
          { heading: "Market & neighborhood research", body: "Use cited research tools to summarize market trends, comparable sales context, school and amenity info, and neighborhood profiles for buyers — fast, sourced briefings. Verify numbers (prices, days-on-market) against your MLS/authoritative data before relying on them." },
          { heading: "Automate the busywork", body: "Wire workflows (n8n/Make/Zapier): new lead → enrich → instant reply → CRM → follow-up sequence; new listing → generate copy + graphics → schedule posts. Automation gives you back the hours to spend on clients and closings." },
        ],
        keyTakeaways: [
          "Instant AI follow-up wins speed-to-lead.",
          "Cited market/neighborhood briefings — verify the numbers.",
          "Automate lead + listing workflows end to end.",
        ],
        features: [
          { name: "Automation (n8n/Make/Zapier)", detail: "Lead intake → reply → CRM → nurture; listing → content → schedule." },
          { name: "Cited research", detail: "Market/neighborhood summaries with sources to verify." },
        ],
        promptPlaybook: [
          { label: "Instant lead reply", prompt: "Draft a warm, helpful first reply to a buyer inquiry about [listing]. Answer their question, ask 2 qualifying questions (timeline, financing), and offer 3 showing times. Friendly, concise, no pressure.", why: "Captures the lead instantly with qualification built in." },
        ],
        proTips: [
          "Verify market numbers against authoritative MLS data before sharing.",
          "Automate the first reply; personalize the human follow-up.",
        ],
        pitfalls: [
          "Sharing unverified AVM/market numbers as fact.",
          "Over-automating relationship moments that need a human touch.",
        ],
        exercise: {
          type: "reflect",
          brief: "Design your lead workflow: intake → instant reply → qualify → CRM → human handoff. Which tools at each step?",
          hint: "Automation + AI reply + CRM + your personal close.",
          success: "Good answers define an end-to-end speed-to-lead workflow with a human handoff for the close.",
        },
      },
    ],
    quiz: [
      { q: "A must-follow rule in listing copy is…", options: ["Describe the ideal buyer", "Fair-housing: describe the property, not protected classes", "Use 'perfect for families'", "Exaggerate features"], answer: 1, why: "Fair-housing forbids steering and protected-class references." },
      { q: "What wins most deals in lead handling?", options: ["Slow replies", "Speed-to-lead (instant follow-up)", "No follow-up", "Generic blasts"], answer: 1, why: "The first, fastest, relevant responder usually wins." },
      { q: "Before sharing market numbers you should…", options: ["Trust AI", "Verify against authoritative MLS data", "Guess", "Skip it"], answer: 1, why: "AI can be wrong on prices/DOM; verify." },
      { q: "Best use of automation here?", options: ["Replace all human contact", "Intake→reply→CRM→nurture, human closes", "Nothing", "Only email"], answer: 1, why: "Automate busywork; keep humans for relationships/closing." },
    ],
    resources: [
      { label: "Fair-housing clause", note: "Add it to every marketing prompt." },
      { label: "Verify market data", note: "Check prices/DOM against MLS before sharing." },
    ],
  });

  /* ===================== AI for Healthcare Operations ===================== */
  ACADEMY.register({
    id: "ai-healthcare-ops",
    title: "AI for Healthcare Operations",
    tagline: "Cut admin burden in clinics and practices — safely, privately, never clinical advice.",
    category: "Business & Life Playbooks",
    icon: "🩺",
    color: "violet",
    level: "Beginner → Advanced",
    difficulty: "Advanced",
    estTime: "~55 min",
    instructor: { name: "Byte", role: "Health-Ops AI Guide", persona: "careful, compliance-first", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Admin not diagnosis", "Privacy/HIPAA-aware"] },
    overview:
      "Healthcare is buried in administration, and that's exactly where AI helps without touching clinical decisions: drafting documentation, summarizing notes, scheduling, billing support, patient communications, and policy drafting. Used responsibly, it gives clinicians time back.\n\nThis track focuses strictly on OPERATIONS and admin — never diagnosis or treatment — and centers privacy and compliance throughout.",
    whyItMatters:
      "Administrative load drives burnout and cost. AI on the paperwork — with privacy and a human check — returns time to care, without crossing into clinical territory.",
    outcomes: [
      "Use AI for documentation, summaries, and comms (admin only)",
      "Streamline scheduling, billing, and policy drafting",
      "Apply privacy/compliance rules (PHI, HIPAA-style)",
      "Keep AI strictly out of diagnosis/treatment decisions",
    ],
    lessons: [
      {
        id: "l1",
        title: "Admin & documentation (not diagnosis)",
        level: "Beginner",
        duration: "11 min",
        summary: "Reduce paperwork while staying far from clinical decisions.",
        sections: [
          { heading: "Where AI belongs: operations", body: "The safe, high-value zone is administration: drafting and summarizing documentation, turning notes into structured summaries, writing patient communications and reminders, creating policies and training materials, and answering operational FAQs. None of this is clinical decision-making — and that boundary is the whole point." },
          { heading: "The bright clinical line", body: "AI must never diagnose, recommend treatment, interpret results for care decisions, or replace clinical judgment. Those are licensed acts with patient-safety stakes. Use AI to reduce the paperwork around care, while clinicians make every clinical call." },
          { heading: "Human review always", body: "Anything patient-facing or that enters a record gets clinician/staff review before use. AI drafts; qualified humans verify and own. Treat AI output as a first draft, never a final word in a clinical setting." },
        ],
        keyTakeaways: [
          "AI is for operations/admin — documentation, comms, scheduling.",
          "Never diagnosis, treatment, or clinical interpretation.",
          "Human review on anything patient-facing or in the record.",
        ],
        promptPlaybook: [
          { label: "Summarize admin notes", prompt: "Turn these (de-identified) intake notes into a structured administrative summary: reason for visit, scheduling needs, follow-up admin tasks, and missing info to collect. Do NOT provide medical advice, diagnosis, or treatment suggestions.", why: "Pure operational value with the clinical line drawn explicitly." },
        ],
        proTips: [
          "Add 'no medical advice/diagnosis' to every healthcare prompt.",
          "Keep AI on the paperwork; route anything clinical to clinicians.",
        ],
        pitfalls: [
          "Letting AI suggest diagnoses or treatments — out of bounds.",
          "Using patient-facing AI output without clinician review.",
        ],
        exercise: {
          type: "reflect",
          brief: "List 3 admin tasks you'd give AI and 3 clinical tasks you'd never, and the review step for patient-facing output.",
          hint: "Admin (docs/comms/scheduling) vs. clinical (dx/tx); clinician review.",
          success: "Good answers keep AI on admin, exclude clinical tasks, and add clinician review for patient-facing output.",
        },
        narration:
          "Healthcare is buried in paperwork, and that's exactly where AI helps — without ever touching a clinical decision. The safe, high-value zone is operations: drafting and summarizing documentation, writing patient reminders and communications, scheduling, billing support, policies, training. That gives clinicians time back. But there's a bright line you never cross: AI must never diagnose, recommend treatment, or interpret results for care — those are licensed acts with patient-safety stakes. So add 'no medical advice or diagnosis' to every prompt, keep AI on the admin, and route anything clinical to a clinician. And anything patient-facing or going into a record gets human review first. AI drafts the paperwork; humans own the care.",
      },
      {
        id: "l2",
        title: "Privacy, PHI & compliant workflows",
        level: "Advanced",
        duration: "11 min",
        summary: "Protect patient data and build compliant automations.",
        sections: [
          { heading: "PHI is sacred", body: "Protected health information must not go into consumer AI tools. For any workflow touching PHI, use vendors offering HIPAA-style Business Associate Agreements (BAAs) and enterprise/no-training terms, or de-identify data first. The default assumption: never paste patient identifiers into a general chatbot." },
          { heading: "De-identify by default", body: "Where possible, strip identifiers before AI touches the data, and work on de-identified summaries. Build redaction into the workflow so PHI never reaches a non-compliant tool. Least exposure is the core principle." },
          { heading: "Compliant automation", body: "Automations (scheduling reminders, intake, billing follow-up) must run on compliant infrastructure with access controls, audit logs, and a BAA where PHI flows. Document data flows, limit access, and keep humans in the loop on anything sensitive. Convenience never overrides compliance." },
        ],
        keyTakeaways: [
          "Never put PHI in consumer tools; require BAAs/no-train for PHI.",
          "De-identify by default; build redaction into workflows.",
          "Compliant infra: access controls, audit logs, documented flows.",
        ],
        proTips: [
          "Confirm a BAA and no-training terms before any PHI workflow.",
          "Default to de-identified data; add PHI only on compliant systems.",
        ],
        pitfalls: [
          "Pasting PHI into a consumer chatbot — a serious compliance breach.",
          "Automations that move PHI through non-compliant tools.",
        ],
        exercise: {
          type: "reflect",
          brief: "Design a compliant intake-summary workflow: where de-identification happens, which tools are allowed, and the human checkpoint.",
          hint: "Redact first; BAA/no-train tools only; clinician/staff review.",
          success: "Good answers de-identify early, restrict to compliant tools, and add a human checkpoint.",
        },
      },
    ],
    quiz: [
      { q: "AI's safe zone in healthcare is…", options: ["Diagnosis", "Operations/admin (docs, comms, scheduling)", "Treatment plans", "Interpreting scans for care"], answer: 1, why: "Admin is safe; clinical decisions are off-limits." },
      { q: "PHI should…", options: ["Go in any chatbot", "Never enter consumer tools; need BAA/no-train", "Be public", "Be emailed freely"], answer: 1, why: "Protected health info requires compliant, private handling." },
      { q: "Best default for patient data + AI?", options: ["Use real identifiers", "De-identify before AI touches it", "Skip privacy", "Share widely"], answer: 1, why: "De-identification minimizes exposure." },
      { q: "Patient-facing AI output requires…", options: ["Nothing", "Clinician/staff review before use", "Auto-send", "No checks"], answer: 1, why: "Human review protects patients and accuracy." },
    ],
    resources: [
      { label: "BAA + no-train", note: "Required before any workflow that touches PHI." },
      { label: "De-identify first", note: "Strip identifiers before AI sees the data." },
    ],
  });

  /* ===================== Advanced Agent Building & MCP Servers ===================== */
  ACADEMY.register({
    id: "building-agents-advanced",
    title: "Advanced Agent Building & MCP Servers",
    tagline: "Go from using agents to engineering them — tools, multi-agent systems, and your own MCP server.",
    category: "Automation & Agents",
    icon: "🧠",
    color: "purple",
    level: "Advanced",
    difficulty: "Advanced",
    estTime: "~90 min",
    instructor: { name: "The Architect", role: "Agent Systems Engineer", persona: "deep, rigorous, hands-on", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Build, don't just use", "MCP servers"] },
    overview:
      "You've used agents — now build them properly. This track goes deeper than the fundamentals: designing great tools, orchestrating multiple agents, building your own MCP server so any agent can use your systems, and engineering for reliability and cost.\n\nThis is the senior-level discipline behind production agents.",
    whyItMatters:
      "Anyone can prompt an agent; few can engineer one that's reliable, safe, and cheap at scale. That skill is among the most valuable in the AI economy.",
    outcomes: [
      "Design tools and context agents can use well",
      "Orchestrate multi-agent systems (planner/workers)",
      "Build and expose your own MCP server",
      "Engineer for reliability, evals, and cost",
    ],
    lessons: [
      {
        id: "l1",
        title: "Tool design & multi-agent systems",
        level: "Advanced",
        duration: "12 min",
        summary: "Great agents come from great tools and clean orchestration.",
        sections: [
          { heading: "Tools make or break agents", body: "An agent is only as good as its tools. Design each tool with a clear name, a precise description of when to use it, tight typed inputs, and helpful errors. Fewer, well-described tools beat a sprawling toolbox the model misuses. Return concise, structured results — not raw dumps the model must wade through." },
          { heading: "Multi-agent orchestration", body: "For complex jobs, split work: a planner/orchestrator decomposes the goal and delegates to specialized worker agents (research, code, write), then synthesizes. Each agent has a focused role, toolset, and context. This mirrors how this very platform was built — a coordinator spawning specialist sub-agents." },
          { heading: "Context engineering", body: "Give each agent exactly the context it needs — not too little (it guesses) or too much (it drifts and costs more). Use retrieval for knowledge, summaries for long histories, and clear handoffs between agents. Managing context is the core craft of agent reliability." },
        ],
        keyTakeaways: [
          "Design few, well-described, typed tools with concise outputs.",
          "Split complex work: planner + specialized workers.",
          "Engineer context per agent — enough, not too much.",
        ],
        settings: [
          { name: "Tool spec", detail: "Clear name + when-to-use + typed inputs + helpful errors + concise output." },
          { name: "Orchestration pattern", detail: "Planner/orchestrator delegating to focused worker agents." },
        ],
        promptPlaybook: [
          { label: "Orchestrator brief", prompt: "You are an orchestrator. Break this goal into sub-tasks, assign each to a worker (researcher, coder, writer) with the minimal context it needs, run them, then synthesize. Stop when [done criteria].", why: "Encodes the planner/worker pattern with a stop condition." },
        ],
        proTips: [
          "Write tool descriptions for the model, not for humans — 'use this when…'.",
          "Give workers narrow roles; let the orchestrator hold the big picture.",
        ],
        pitfalls: [
          "Dumping 30 tools on one agent — it picks wrong.",
          "Over-stuffing context, raising cost and drift.",
        ],
        exercise: {
          type: "reflect",
          brief: "Design a multi-agent system for a real goal: the orchestrator, 2-3 workers, their tools, and the stop condition.",
          hint: "Planner + focused workers + minimal tools each + done criteria.",
          success: "Good answers define a planner, focused workers with minimal tools, and a clear stop condition.",
        },
        narration:
          "You've used agents — now let's engineer them. The first truth: an agent is only as good as its tools. Design each tool like a product — a clear name, a precise 'use this when' description, tight typed inputs, helpful errors, and concise structured output. Fewer, sharper tools beat a giant toolbox the model fumbles. The second move is orchestration: for complex jobs, a planner agent breaks the goal into pieces and delegates to focused workers — a researcher, a coder, a writer — then synthesizes the results. That's exactly how this platform was built. And the craft that ties it together is context engineering: give each agent enough to act, but not so much it drifts or burns cost. Master tools, orchestration, and context, and you build agents that actually work.",
      },
      {
        id: "l2",
        title: "Build your own MCP server",
        level: "Advanced",
        duration: "12 min",
        summary: "Expose your systems so any agent can use them — safely.",
        sections: [
          { heading: "Why build an MCP server", body: "The Model Context Protocol is the open standard for connecting agents to tools and data. Build an MCP server for your system (your database, your app's actions, your internal API) and any MCP-aware agent — Claude, your own, others — can use it. Build the connector once; use it everywhere." },
          { heading: "What a server exposes", body: "An MCP server exposes tools (actions the agent can call), resources (data the agent can read), and prompts (reusable templates). Define each with clear schemas and descriptions. Keep tools focused and outputs concise — the same tool-design discipline, now as a reusable service." },
          { heading: "Governance & safety", body: "Put a gateway in front: authenticate the agent, authorize each call against policy (least privilege), rate-limit, and log everything for audit. Authenticate, then authorize, then act, then log — never let an agent reach a real system before the policy check. This is what makes agents safe in production." },
        ],
        keyTakeaways: [
          "An MCP server makes your system usable by any MCP agent.",
          "Expose focused tools, readable resources, reusable prompts.",
          "Gateway: authenticate → authorize → act → log.",
        ],
        settings: [
          { name: "Server surface", detail: "Tools (actions), resources (data), prompts (templates), all schema'd." },
          { name: "Gateway policy", detail: "Auth, least-privilege authorization, rate limits, audit logs." },
        ],
        promptPlaybook: [
          { label: "Design your server (planning)", prompt: "Plan an MCP server for [my system]: list the tools (name, when-to-use, inputs, output), the read-only resources, and the gateway policy (auth, permissions, rate limits, logging).", why: "Forces a clean, safe server design before you code it." },
        ],
        proTips: [
          "Start read-only; add write tools behind strict authorization.",
          "Version your tools and keep outputs concise and structured.",
        ],
        pitfalls: [
          "Exposing broad, unscoped write access with no policy layer.",
          "No logging/audit — you can't see what agents did.",
        ],
        exercise: {
          type: "reflect",
          brief: "Sketch an MCP server for a system you know: 3 tools, 1-2 resources, and the gateway policy.",
          hint: "Focused tools + read resources + auth/authorize/log.",
          success: "Good answers define focused tools, useful resources, and a least-privilege gateway with logging.",
        },
      },
      {
        id: "l3",
        title: "Reliability, evals & cost",
        level: "Advanced",
        duration: "11 min",
        summary: "Make agents dependable and affordable at scale.",
        sections: [
          { heading: "Evaluate agents", body: "Agents are non-deterministic, so measure them: build scenario tests with success criteria, track task success rate, cost per task, latency, and failure modes, and re-run on every change. Without evals you're shipping vibes; with them you ship reliability." },
          { heading: "Guardrails & recovery", body: "Add timeouts, retries, max-step limits (so agents don't loop), human-in-the-loop for risky actions, and graceful failure ('I couldn't complete this; here's what I tried'). Treat external content as untrusted to resist injection. Safety and recovery are features, not afterthoughts." },
          { heading: "Cost engineering", body: "Agents can get expensive fast (many model calls). Control it: use cheaper/faster models for simple steps and reserve top models for hard ones, cache results, prune context, and cap steps. Match model power to step difficulty — the single biggest cost lever." },
        ],
        keyTakeaways: [
          "Eval agents on success rate, cost, latency, failures.",
          "Guardrails: timeouts, step limits, human gates, graceful failure.",
          "Route cheap models to easy steps; cap steps and cache.",
        ],
        promptPlaybook: [
          { label: "Agent eval case", prompt: "Define 5 eval scenarios for [agent]: input, expected outcome, and a pass/fail check. Include 2 edge cases and 1 adversarial (injection) case.", why: "A real test suite catches regressions and attacks." },
        ],
        proTips: [
          "Cap max steps so a confused agent can't loop forever or burn budget.",
          "Route by difficulty: cheap model for easy steps, top model for hard ones.",
        ],
        pitfalls: [
          "Shipping agents with no evals or step caps.",
          "Using the most expensive model for every trivial step.",
        ],
        exercise: {
          type: "reflect",
          brief: "Define the reliability + cost plan for an agent: evals, guardrails (limits/human gate), and model routing.",
          hint: "Eval cases + timeouts/step caps/human gate + cheap-vs-top routing.",
          success: "Good answers include eval cases, concrete guardrails, and difficulty-based model routing.",
        },
      },
    ],
    quiz: [
      { q: "An agent is only as good as its…", options: ["Logo", "Tools (and their design)", "Color", "Name length"], answer: 1, why: "Well-designed, focused tools determine agent quality." },
      { q: "What does building an MCP server give you?", options: ["A website", "Any MCP agent can use your system", "Free models", "A GPU"], answer: 1, why: "It exposes your tools/data to any MCP-aware agent." },
      { q: "Correct gateway order?", options: ["Act → log → auth", "Authenticate → authorize → act → log", "Log first", "No policy"], answer: 1, why: "Authenticate, authorize against policy, then act, then log." },
      { q: "The biggest agent cost lever is…", options: ["Font choice", "Routing model power to step difficulty", "More tools", "Longer prompts"], answer: 1, why: "Use cheap models for easy steps, top models only when needed." },
    ],
    resources: [
      { label: "Eval suite", note: "Scenario tests incl. edge + injection cases; re-run on changes." },
      { label: "Step caps + routing", note: "Limit steps; match model power to difficulty to control cost." },
    ],
  });
})();
