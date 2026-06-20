/* =============================================================================
   PROMETHEUS · Prompt Sandbox + AI Wiring
   - PROM.ai.call(prompt)   → live AI via CONFIG.sandbox.endpoint, else demo mode.
   - PROM.ai.gradePrompt()  → grades a prompt /100 on Role/Task/Constraints/Output.
   - Registers the Module-1 "prompt-sandbox" training (split-screen sandbox).
   ============================================================================= */
(function () {
  const esc = window.PROM ? PROM.esc : (s) => s;

  /* ---------------------------------------------------------------------------
     AI call — live when CONFIG.sandbox.endpoint is set, else a crafted demo.
  --------------------------------------------------------------------------- */
  async function call(prompt, opts = {}) {
    const ep = (window.CONFIG && CONFIG.sandbox.endpoint) || "";
    if (ep) {
      const res = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, ...opts }),
      });
      if (!res.ok) throw new Error("Sandbox endpoint error " + res.status);
      const data = await res.json();
      return data.text || data.content || JSON.stringify(data);
    }
    // DEMO MODE — return a relevant, crafted completion so the UX is fully usable.
    return demoComplete(prompt);
  }

  function demoComplete(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes("cold email") || p.includes("outreach")) {
      return "Subject: A 30-minute idea to win back your nights\n\nHi {{First}},\n\nNoticed {{Company}} is scaling fast — usually that's when the manual busywork starts eating the team's evenings. I help SaaS founders reclaim those hours by auditing one workflow and automating it end-to-end.\n\nWorth a 15-minute look at where you'd save the most time? I'll come with two specific ideas for {{Company}}.\n\n— {{You}}";
    }
    if (p.includes("email")) return "Subject: Quick idea for {{Company}}\n\nHi {{First}}, here's a concise, friendly draft with a single clear call to action…";
    if (p.includes("summary") || p.includes("summarize")) return "• Key point one\n• Key point two\n• Key takeaway and recommended next step.";
    return "Here's a focused response generated from your prompt. (Demo mode — wire CONFIG.sandbox.endpoint to your /api/sandbox route to use a live Claude or GPT model.)";
  }

  /* ---------------------------------------------------------------------------
     Prompt grader — heuristic, transparent, /100 across the four pillars.
  --------------------------------------------------------------------------- */
  function gradePrompt(text) {
    const t = (text || "").trim();
    const low = t.toLowerCase();
    const words = t ? t.split(/\s+/).length : 0;
    const pillars = [];

    // ROLE (25)
    let role = 0;
    if (/\b(you are|act as|you're a|your role is|imagine you|as an? (expert|senior|professional))\b/.test(low)) role += 16;
    if (/\b(senior|expert|professional|specialist|world-class|experienced|b2b|copywriter|engineer|analyst|strategist)\b/.test(low)) role += 9;
    role = Math.min(25, role);
    pillars.push({ name: "Role", score: role, pass: role >= 13, tip: role >= 13 ? "Clear persona set." : "Tell the model who it is, e.g. 'You are a senior B2B copywriter.'" });

    // TASK (25)
    let task = 0;
    const verbs = (low.match(/\b(write|draft|create|generate|summarize|list|build|design|analyze|rewrite|translate|explain|compose|outline|produce)\b/g) || []);
    if (verbs.length) task += 14;
    if (words >= 8) task += 6;
    if (/\b(email|post|plan|report|code|component|thread|brief|message|script|table)\b/.test(low)) task += 5;
    task = Math.min(25, task);
    pillars.push({ name: "Task", score: task, pass: task >= 13, tip: task >= 13 ? "Clear deliverable requested." : "State exactly what to produce with an action verb, e.g. 'write a 90-word email.'" });

    // CONSTRAINTS (25)
    let cons = 0;
    const consCues = (low.match(/\b(under|no more than|at most|limit|max|tone|concise|friendly|formal|no jargon|avoid|must|only|don't|do not|within|exactly|fewer than)\b/g) || []);
    const numbers = (low.match(/\b\d+\s*(words?|sentences?|bullets?|chars?|characters?|points?)\b/g) || []);
    cons += Math.min(16, consCues.length * 6);
    cons += Math.min(9, numbers.length * 6);
    cons = Math.min(25, cons);
    pillars.push({ name: "Constraints", score: cons, pass: cons >= 13, tip: cons >= 13 ? "Good guardrails." : "Add limits: length, tone, what to avoid, e.g. 'under 90 words, friendly, no jargon.'" });

    // OUTPUT (25)
    let out = 0;
    if (/\b(output|format|return|respond with|reply with|give me)\b/.test(low)) out += 12;
    if (/\b(json|markdown|bullet|bullets|table|plain text|subject line|numbered|list|sections?)\b/.test(low)) out += 13;
    out = Math.min(25, out);
    pillars.push({ name: "Output", score: out, pass: out >= 13, tip: out >= 13 ? "Output shape defined." : "Define the format, e.g. 'return a subject line + body in plain text.'" });

    let total = pillars.reduce((s, p) => s + p.score, 0);
    // light penalty for very short prompts
    if (words < 6) total = Math.round(total * 0.6);
    total = Math.max(0, Math.min(100, Math.round(total)));
    return { total, pillars, words };
  }

  PROM.ai = { call, gradePrompt };

  /* ---------------------------------------------------------------------------
     Training: prompt-sandbox (Module 1)
  --------------------------------------------------------------------------- */
  PROM.trainings["prompt-sandbox"] = function (mount, m, onComplete) {
    const T = m.training;
    mount.innerHTML = `
    <div class="how-to"><strong>Training · ${esc(T.title)}.</strong> ${esc(T.objective)}</div>
    <div class="sandbox-grid">
      <div class="panel sb-panel">
        <h3>① Compose your prompt</h3>
        <div class="sb-objective">🎯 ${esc(T.scenario)}</div>
        <textarea class="sb-input" id="sb-input" placeholder="Write your prompt here using Role · Task · Constraints · Output...">${esc(T.starterPrompt)}</textarea>
        <div class="sb-actions">
          <button class="btn btn-primary" id="sb-grade">⚡ Grade my prompt</button>
          <button class="btn btn-ghost" id="sb-run">▶ Run prompt</button>
          <button class="btn btn-ghost btn-sm" id="sb-clear">Clear</button>
        </div>
        <ul class="tips-box">${T.tips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>

      <div class="panel sb-panel">
        <h3>② Results</h3>
        <div id="sb-results"><p class="dim">Grade your prompt to see your score out of 100, or run it to see the AI's response.</p></div>
      </div>
    </div>`;

    const input = $("#sb-input", mount);
    const results = $("#sb-results", mount);

    $("#sb-clear", mount).addEventListener("click", () => { input.value = ""; input.focus(); });

    $("#sb-grade", mount).addEventListener("click", () => {
      const g = PROM.ai.gradePrompt(input.value);
      const color = g.total >= 85 ? "var(--teal)" : g.total >= 70 ? "var(--electric)" : g.total >= 50 ? "var(--gold)" : "#fb7185";
      const verdict = g.total >= 85 ? "Director-grade prompt." : g.total >= 70 ? "Strong — you've got the pillars." : g.total >= 50 ? "Decent start. Tighten the weak pillars." : "Too vague. Add the missing pillars.";
      results.innerHTML = `
        <div class="grade-wrap">
          <div class="grade-score" style="color:${color}">${g.total}<span style="font-size:1.1rem;color:var(--text-faint)">/100</span></div>
          <div class="grade-bar"><div class="grade-fill" id="gfill"></div></div>
          <div class="dim">${verdict}</div>
        </div>
        <div class="rubric-list">
          ${g.pillars.map((p) => `<div class="rubric-item">
            <span class="rb-ic ${p.pass ? "pass" : "fail"}">${p.pass ? "✓" : "!"}</span>
            <span><strong>${p.name}</strong> · ${p.score}/25 — <span class="dim">${esc(p.tip)}</span></span>
          </div>`).join("")}
        </div>`;
      requestAnimationFrame(() => { const f = $("#gfill", mount); if (f) f.style.width = g.total + "%"; });
      if (g.total >= 70) {
        onComplete({ score: g.total });
        toast(`Training passed · ${g.total}/100`, "xp", "✦");
      }
    });

    $("#sb-run", mount).addEventListener("click", async () => {
      const btn = $("#sb-run", mount);
      results.innerHTML = `<div class="sb-response"><span class="resp-label">AI Response</span><span id="sb-stream" class="typing-cursor"></span></div>`;
      btn.disabled = true; btn.textContent = "Running…";
      try {
        const text = await PROM.ai.call(input.value);
        await typeOut($("#sb-stream", mount), text);
      } catch (e) {
        $("#sb-stream", mount).textContent = "⚠ " + e.message;
      } finally {
        const stream = $("#sb-stream", mount); if (stream) stream.classList.remove("typing-cursor");
        btn.disabled = false; btn.textContent = "▶ Run prompt";
      }
    });
  };

  function typeOut(el, text) {
    return new Promise((resolve) => {
      el.textContent = ""; let i = 0;
      const step = () => {
        if (i >= text.length) return resolve();
        el.textContent += text.slice(i, i + 3); i += 3;
        setTimeout(step, 12);
      };
      step();
    });
  }

  // local $ helper (scoped) mirrors app.js
  function $(sel, root = document) { return root.querySelector(sel); }
})();
