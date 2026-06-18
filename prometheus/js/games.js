/* =============================================================================
   PROMETHEUS · Games (the gamified tests)
   - hallucination-hunter (M1)  click the confident lies, against the clock
   - prompt-to-prod       (M2)  order the tools to ship the app
   - credit-optimizer     (M3)  route a waterfall to find emails on a budget
   - fix-the-flow         (M4)  find the broken node, rewire the endpoint, 60s
   - viral-editor         (M5)  repurpose a transcript into 3 viral formats
   ============================================================================= */
(function () {
  const esc = PROM.esc;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  function head(g, statsHtml) {
    return `<div class="game-head">
      <div class="game-title-wrap"><h3>✦ ${esc(g.title)}</h3><p>${esc(g.tagline)}</p></div>
      <div class="game-stats">${statsHtml || ""}</div></div>`;
  }
  function passXP(m) { return PROM.xpFor(m, "game"); }

  /* ===========================================================================
     M1 · HALLUCINATION HUNTER
  =========================================================================== */
  PROM.games["hallucination-hunter"] = function (mount, m, onComplete) {
    const g = m.game;
    let round = 0, score = 0, timeLeft = g.timePerRound, picks = new Set(), locked = false, timer = null;

    function render() {
      const r = g.rounds[round];
      picks = new Set(); locked = false; timeLeft = g.timePerRound;
      mount.innerHTML = `
        <div class="panel game-shell">
          ${head(g, `
            <div class="gstat">Round <span class="gv">${round + 1}/${g.rounds.length}</span></div>
            <div class="gstat">Score <span class="gv" id="hh-score">${score}</span></div>
            <div class="gstat timer">Time <span class="gv" id="hh-time">${timeLeft}s</span></div>`)}
          <div class="how-to">${esc(g.howTo)}</div>
          <div class="tag-row"><span class="chip done">Topic: ${esc(r.topic)}</span></div>
          <div class="hh-text" id="hh-text">
            ${r.sentences.map((s, i) => `<button class="hh-sentence" data-i="${i}">${esc(s.text)}</button>`).join("")}
          </div>
          <button class="btn btn-primary" id="hh-submit" style="justify-content:center;width:100%">Lock in answers</button>
        </div>`;

      $$(".hh-sentence", mount).forEach((b) => b.addEventListener("click", () => {
        if (locked) return;
        const i = +b.dataset.i;
        if (picks.has(i)) { picks.delete(i); b.style.borderColor = ""; b.style.background = ""; }
        else { picks.add(i); b.style.borderColor = "var(--gold)"; b.style.background = "rgba(245,197,24,.12)"; }
      }));
      $("#hh-submit", mount).addEventListener("click", evaluate);

      clearInterval(timer);
      timer = PROM.addTimer(setInterval(() => {
        timeLeft--; const el = $("#hh-time", mount); if (el) el.textContent = timeLeft + "s";
        if (timeLeft <= 0) evaluate();
      }, 1000));
    }

    function evaluate() {
      if (locked) return; locked = true; clearInterval(timer);
      const r = g.rounds[round];
      r.sentences.forEach((s, i) => {
        const el = $(`.hh-sentence[data-i="${i}"]`, mount);
        const picked = picks.has(i);
        if (s.hallucination && picked) { el.className = "hh-sentence correct"; score += 10; if (s.why) el.innerHTML += `<span class="hh-why">✓ ${esc(s.why)}</span>`; }
        else if (s.hallucination && !picked) { el.className = "hh-sentence missed"; if (s.why) el.innerHTML += `<span class="hh-why">Missed: ${esc(s.why)}</span>`; }
        else if (!s.hallucination && picked) { el.className = "hh-sentence wrong"; score = Math.max(0, score - 5); }
      });
      const sc = $("#hh-score", mount); if (sc) sc.textContent = score;
      const btn = $("#hh-submit", mount);
      btn.textContent = round < g.rounds.length - 1 ? "Next round →" : "See results";
      btn.replaceWith(btn.cloneNode(true)); // clear listeners
      $("#hh-submit", mount).addEventListener("click", () => {
        if (round < g.rounds.length - 1) { round++; render(); } else finish();
      });
    }

    function finish() {
      const max = g.rounds.reduce((s, r) => s + r.sentences.filter((x) => x.hallucination).length * 10, 0);
      const pct = Math.round((score / max) * 100);
      const won = pct >= 60;
      mount.innerHTML = `<div class="panel game-shell"><div class="game-overlay">
        <div class="big gradient-text">${score} pts</div>
        <div class="verdict">${won ? "🎯 Sharp eye — you caught the hallucinations." : "Keep training your eye for confident lies."} (${pct}% accuracy)</div>
        <div class="sb-actions" style="justify-content:center">
          <button class="btn btn-ghost" id="hh-retry">↻ Play again</button>
          ${won ? `<button class="btn btn-primary" id="hh-done">Claim +${passXP(m)} XP</button>` : ""}
        </div></div></div>`;
      $("#hh-retry", mount).addEventListener("click", () => { round = 0; score = 0; render(); });
      if (won) $("#hh-done", mount).addEventListener("click", () => { onComplete({ score: pct }); toast("Hallucination Hunter cleared!", "xp", "✦"); $("#hh-done", mount).textContent = "✓ Claimed"; $("#hh-done", mount).disabled = true; });
    }
    render();
  };

  /* ===========================================================================
     M2 · PROMPT-TO-PROD  (tap a tool, tap a slot)
  =========================================================================== */
  PROM.games["prompt-to-prod"] = function (mount, m, onComplete) {
    const g = m.game;
    let round = 0;

    function render() {
      const r = g.rounds[round];
      const chips = PROM.ui.shuffled([...r.correctOrder, ...r.distractors]);
      mount.innerHTML = `
        <div class="panel game-shell">
          ${head(g, `<div class="gstat">Build <span class="gv">${round + 1}/${g.rounds.length}</span></div>`)}
          <div class="how-to">${esc(g.howTo)} <em>Tap a tool, then tap a pipeline slot. Tap a placed tool to send it back.</em></div>
          <div class="sb-objective">🧩 ${esc(r.problem)}</div>
          <div style="font-weight:600;margin:14px 0 8px">Toolbox</div>
          <div class="dnd-pool" id="pool">${chips.map((c) => `<button class="dnd-chip" data-label="${esc(c)}"><span class="grip">⋮⋮</span>${esc(c)}</button>`).join("")}</div>
          <div style="font-weight:600;margin:8px 0">Deployment pipeline</div>
          <div class="dnd-slots" id="slots">
            ${r.correctOrder.map((_, i) => `<div class="dnd-slot" data-slot="${i}"><span class="slot-num">${i + 1}</span></div>`).join("")}
          </div>
          <div class="sb-actions mt-2"><button class="btn btn-primary" id="pp-check">🚀 Deploy</button></div>
          <div id="pp-result"></div>
        </div>`;

      let selected = null;
      function clearSel() { if (selected) selected.style.outline = ""; selected = null; }
      // bind to the freshly-rendered shell (not mount) so re-renders don't stack listeners
      $(".game-shell", mount).addEventListener("click", (e) => {
        const chip = e.target.closest(".dnd-chip");
        const slot = e.target.closest(".dnd-slot");
        if (chip) {
          if (selected === chip) { clearSel(); return; }
          clearSel(); selected = chip; chip.style.outline = "2px solid var(--neon-purple)";
          return;
        }
        if (slot && selected) {
          // if slot occupied, return existing chip to pool
          const existing = slot.querySelector(".dnd-chip");
          if (existing) $("#pool", mount).appendChild(existing);
          slot.appendChild(selected); clearSel();
        }
      });

      $("#pp-check", mount).addEventListener("click", () => {
        let allCorrect = true;
        $$(".dnd-slot", mount).forEach((slot, i) => {
          const chip = slot.querySelector(".dnd-chip");
          const ok = chip && chip.dataset.label === r.correctOrder[i];
          slot.classList.toggle("correct", !!ok);
          slot.classList.toggle("incorrect", !ok);
          if (!ok) allCorrect = false;
        });
        $("#pp-result", mount).innerHTML = allCorrect
          ? `<div class="sb-response"><span class="resp-label">🚀 Shipped!</span>Correct sequence — design, build, data, deploy. That's a real pipeline.</div>`
          : `<div class="sb-response" style="border-color:#fb7185;background:rgba(244,63,94,.06)"><span class="resp-label" style="color:#fb7185">Deploy failed</span>Order matters: design the UI, build the logic, add data/auth, then deploy. Leave the distractors out.</div>`;
        if (allCorrect) {
          if (round < g.rounds.length - 1) { setTimeout(() => { round++; render(); }, 1200); }
          else finish();
        }
      });
    }
    function finish() {
      mount.innerHTML = `<div class="panel game-shell"><div class="game-overlay">
        <div class="big gradient-text">Shipped 🚀</div>
        <div class="verdict">You sequenced every build correctly. That's the vibe-coding pipeline.</div>
        <button class="btn btn-primary" id="pp-done">Claim +${passXP(m)} XP</button>
      </div></div>`;
      $("#pp-done", mount).addEventListener("click", () => { onComplete({ score: 100 }); toast("Prompt-to-Prod cleared!", "xp", "✦"); $("#pp-done", mount).textContent = "✓ Claimed"; $("#pp-done", mount).disabled = true; });
    }
    render();
  };

  /* ===========================================================================
     M3 · THE CREDIT OPTIMIZER
  =========================================================================== */
  PROM.games["credit-optimizer"] = function (mount, m, onComplete) {
    const g = m.game;

    function simulate(order) {
      let remaining = g.leads, spent = 0, found = 0, bankrupt = false;
      const steps = [];
      for (const name of order) {
        const p = g.providers.find((x) => x.name === name);
        const queries = remaining;
        const cost = queries * p.cost;
        if (spent + cost > g.budget) { bankrupt = true; steps.push({ name, queries, cost, hits: 0, over: true }); break; }
        const hits = Math.floor(queries * p.hitRate);
        spent += cost; found += hits; remaining -= hits;
        steps.push({ name, queries, cost, hits });
        if (remaining <= 0) break;
      }
      return { spent, found, bankrupt, steps, remaining };
    }
    const optimal = simulate(g.optimalOrder);

    const items = g.providers.map((p) => ({ id: p.name, label: p.name, sub: `Cost ${p.cost}/query · ${Math.round(p.hitRate * 100)}% hit rate · ${p.note}` }));

    function render() {
      mount.innerHTML = `
        <div class="panel game-shell">
          ${head(g, `
            <div class="gstat">Budget <span class="gv">${g.budget}</span></div>
            <div class="gstat">Leads <span class="gv">${g.leads}</span></div>`)}
          <div class="how-to">${esc(g.howTo)}</div>
          <div style="font-weight:600;margin:6px 0 10px">Order your waterfall (cheapest first conserves credits):</div>
          <div id="co-list"></div>
          <div class="sb-actions mt-2"><button class="btn btn-primary" id="co-run">⚙ Run waterfall</button></div>
          <div id="co-out"></div>
        </div>`;
      const list = PROM.ui.orderList(items);
      $("#co-list", mount).appendChild(list);
      $("#co-run", mount).addEventListener("click", () => {
        const order = PROM.ui.getOrder(list);
        const res = simulate(order);
        const pass = !res.bankrupt && res.found >= optimal.found * 0.9;
        $("#co-out", mount).innerHTML = `
          <div class="co-bars">
            <div class="co-bar-item"><div class="lbl">Emails found</div><div class="val" style="color:var(--teal)">${res.found}<span class="dim" style="font-size:.8rem">/${g.leads}</span></div></div>
            <div class="co-bar-item"><div class="lbl">Credits spent</div><div class="val" style="color:${res.bankrupt ? "#fb7185" : "var(--gold)"}">${res.spent}<span class="dim" style="font-size:.8rem">/${g.budget}</span></div></div>
            <div class="co-bar-item"><div class="lbl">Efficiency</div><div class="val" style="color:var(--electric)">${res.spent ? (res.found / res.spent).toFixed(2) : "0"}<span class="dim" style="font-size:.8rem"> /credit</span></div></div>
          </div>
          <div class="sb-response" style="${res.bankrupt || !pass ? "border-color:#fb7185;background:rgba(244,63,94,.06)" : ""}">
            <span class="resp-label" style="${res.bankrupt || !pass ? "color:#fb7185" : ""}">${res.bankrupt ? "💸 Bankrupt!" : pass ? "✅ Optimized" : "Try a leaner order"}</span>
            ${res.steps.map((s) => `${esc(s.name)} → ${s.over ? `<span style="color:#fb7185">over budget (needed ${s.cost})</span>` : `${s.queries} queries, found ${s.hits} (−${s.cost} credits)`}`).join("<br>")}
            ${res.bankrupt ? "<br><br>Querying an expensive provider on the full list drained your credits. Put the cheapest provider first." : pass ? `<br><br>Great routing — you found ${res.found} emails for ${res.spent} credits.` : "<br><br>You can find more within budget. Cheapest provider first, expensive ones only on the misses."}
          </div>`;
        if (pass) finish(res);
      });
    }
    function finish(res) {
      const out = $("#co-out", mount);
      const btn = document.createElement("button");
      btn.className = "btn btn-primary mt-2"; btn.style.cssText = "justify-content:center;width:100%";
      btn.textContent = `Claim +${passXP(m)} XP`;
      btn.addEventListener("click", () => { onComplete({ score: Math.round((res.found / g.leads) * 100) }); toast("Credit Optimizer cleared!", "xp", "✦"); btn.textContent = "✓ Claimed"; btn.disabled = true; });
      out.appendChild(btn);
    }
    render();
  };

  /* ===========================================================================
     M4 · FIX THE FLOW  (60s per round)
  =========================================================================== */
  PROM.games["fix-the-flow"] = function (mount, m, onComplete) {
    const g = m.game;
    let round = 0, timer = null, timeLeft = g.timeLimit, flagged = null;

    function render() {
      const r = g.rounds[round];
      timeLeft = g.timeLimit; flagged = null;
      mount.innerHTML = `
        <div class="panel game-shell">
          ${head(g, `
            <div class="gstat">Flow <span class="gv">${round + 1}/${g.rounds.length}</span></div>
            <div class="gstat timer">Time <span class="gv" id="ff-time">${timeLeft}s</span></div>`)}
          <div class="how-to">${esc(g.howTo)}</div>
          <div class="tag-row"><span class="chip done">${esc(r.flowName)}</span></div>
          <div class="flow-canvas" id="ff-canvas">
            ${r.nodes.map((n, i) => `${i ? '<span class="flow-arrow">→</span>' : ""}
              <div class="flow-node" data-id="${n.id}">
                <div class="fn-label">${esc(n.label)}</div>
                <div class="fn-endpoint">${esc(n.endpoint)}</div>
              </div>`).join("")}
          </div>
          <div id="ff-fix"></div>
        </div>`;

      $$(".flow-node", mount).forEach((node) => node.addEventListener("click", () => {
        if (flagged) return;
        const r2 = g.rounds[round];
        const data = r2.nodes.find((x) => x.id === node.dataset.id);
        if (data.broken) { node.classList.add("flagged"); flagged = node; showFix(r2, node); }
        else { node.classList.add("wrong"); timeLeft = Math.max(0, timeLeft - 5); const t = $("#ff-time", mount); if (t) t.textContent = timeLeft + "s"; setTimeout(() => node.classList.remove("wrong"), 350); }
      }));

      clearInterval(timer);
      timer = PROM.addTimer(setInterval(() => {
        timeLeft--; const t = $("#ff-time", mount); if (t) t.textContent = timeLeft + "s";
        if (timeLeft <= 0) { clearInterval(timer); fail(); }
      }, 1000));
    }

    function showFix(r, node) {
      $("#ff-fix", mount).innerHTML = `<div class="flow-fix">
        <strong>🔧 Broken node found:</strong> rewire it to the correct endpoint.
        <div class="endpoint-options">${r.options.map((o) => `<button class="ep-btn" data-ep="${esc(o)}">${esc(o)}</button>`).join("")}</div>
      </div>`;
      $$(".ep-btn", mount).forEach((b) => b.addEventListener("click", () => {
        if (b.dataset.ep === r.correctEndpoint) {
          node.classList.remove("flagged"); node.classList.add("correct");
          node.querySelector(".fn-endpoint").textContent = r.correctEndpoint;
          clearInterval(timer);
          $("#ff-fix", mount).innerHTML = `<div class="sb-response"><span class="resp-label">✅ Flow restored</span>Data is flowing again.</div>`;
          setTimeout(() => { if (round < g.rounds.length - 1) { round++; render(); } else win(); }, 1100);
        } else { b.style.borderColor = "#fb7185"; b.style.color = "#fb7185"; timeLeft = Math.max(0, timeLeft - 5); }
      }));
    }
    function win() {
      mount.innerHTML = `<div class="panel game-shell"><div class="game-overlay">
        <div class="big gradient-text">Flows Fixed ⚡</div>
        <div class="verdict">You found every broken node and rewired the pipeline. Debugging mastered.</div>
        <button class="btn btn-primary" id="ff-done">Claim +${passXP(m)} XP</button>
      </div></div>`;
      $("#ff-done", mount).addEventListener("click", () => { onComplete({ score: 100 }); toast("Fix the Flow cleared!", "xp", "✦"); $("#ff-done", mount).textContent = "✓ Claimed"; $("#ff-done", mount).disabled = true; });
    }
    function fail() {
      mount.innerHTML = `<div class="panel game-shell"><div class="game-overlay">
        <div class="big" style="color:#fb7185">Time's up</div>
        <div class="verdict">The bottleneck won this round. Scan endpoints for the one that doesn't belong.</div>
        <button class="btn btn-primary" id="ff-retry">↻ Try again</button>
      </div></div>`;
      $("#ff-retry", mount).addEventListener("click", () => { round = 0; render(); });
    }
    render();
  };

  /* ===========================================================================
     M5 · THE VIRAL EDITOR  (tap a snippet, tap a destination)
  =========================================================================== */
  PROM.games["viral-editor"] = function (mount, m, onComplete) {
    const g = m.game;

    function render() {
      mount.innerHTML = `
        <div class="panel game-shell">
          ${head(g)}
          <div class="how-to">${esc(g.howTo)} <em>Tap a line, then tap a destination. Send filler to the Cutting Room.</em></div>
          <div class="tag-row"><span class="chip done">Transcript: ${esc(g.transcriptTitle)}</span></div>
          <div style="font-weight:600;margin:10px 0 8px">Raw lines</div>
          <div class="dnd-pool" id="ve-pool">${g.snippets.map((s) => `<button class="dnd-chip" data-id="${s.id}" style="max-width:100%;text-align:left"><span class="grip">⋮⋮</span>${esc(s.text)}</button>`).join("")}</div>
          <div class="studio-grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));display:grid;gap:14px;margin-top:10px">
            ${g.formats.map((f) => `<div class="panel sb-panel" style="padding:14px"><div class="field-label">${esc(f.label)}</div><div class="dim" style="font-size:.78rem;margin-bottom:8px">${esc(f.hint)}</div><div class="dnd-pool" data-zone="${f.id}" style="min-height:80px"></div></div>`).join("")}
            <div class="panel sb-panel" style="padding:14px"><div class="field-label">🗑 Cutting Room</div><div class="dim" style="font-size:.78rem;margin-bottom:8px">Weak/filler lines go here.</div><div class="dnd-pool" data-zone="cut" style="min-height:80px"></div></div>
          </div>
          <div class="sb-actions mt-2"><button class="btn btn-primary" id="ve-score">📊 Calculate engagement</button></div>
          <div id="ve-out"></div>
        </div>`;

      let selected = null;
      const clearSel = () => { if (selected) selected.style.outline = ""; selected = null; };
      // bind to the freshly-rendered shell (not mount) so re-renders don't stack listeners
      $(".game-shell", mount).addEventListener("click", (e) => {
        const chip = e.target.closest(".dnd-chip");
        const zone = e.target.closest("[data-zone], #ve-pool");
        if (chip) { if (selected === chip) return clearSel(); clearSel(); selected = chip; chip.style.outline = "2px solid var(--neon-purple)"; return; }
        if (zone && selected) { zone.appendChild(selected); clearSel(); }
      });

      $("#ve-score", mount).addEventListener("click", () => {
        let score = 0; const breakdown = [];
        g.snippets.forEach((s) => {
          const chip = $(`.dnd-chip[data-id="${s.id}"]`, mount);
          const zone = chip.closest("[data-zone]");
          const placed = zone ? zone.dataset.zone : "pool";
          let pts = 0, note = "";
          if (s.best === null) { if (placed === "cut") { pts = 15; note = "correctly cut"; } else if (placed === "pool") { pts = 0; note = "leave it or cut it"; } else { pts = -10; note = "filler hurts engagement"; } }
          else if (placed === s.best) { pts = 25; note = "perfect fit"; }
          else if (placed === "cut") { pts = -5; note = "you cut a good line"; }
          else if (placed === "pool") { pts = 0; note = "unused"; }
          else { pts = 5; note = "usable, but better elsewhere"; }
          score += pts; breakdown.push(`${pts >= 0 ? "+" : ""}${pts} · ${note}`);
        });
        score = Math.max(0, score);
        const max = g.snippets.filter((s) => s.best).length * 25 + 15;
        const pct = Math.round((score / max) * 100);
        const won = pct >= 70;
        $("#ve-out", mount).innerHTML = `
          <div class="co-bars"><div class="co-bar-item"><div class="lbl">Engagement score</div><div class="val gradient-text">${score}</div></div>
          <div class="co-bar-item"><div class="lbl">Of possible</div><div class="val" style="color:var(--electric)">${pct}%</div></div></div>
          <div class="sb-response" style="${won ? "" : "border-color:var(--gold);background:rgba(245,197,24,.06)"}">
            <span class="resp-label">${won ? "🔥 Viral-ready" : "Recut for more reach"}</span>
            Match each line to where it lands hardest: punchy lists → Twitter, story+result → LinkedIn, 7-second hooks → Shorts, filler → cut.
          </div>`;
        if (won) {
          const btn = document.createElement("button"); btn.className = "btn btn-primary mt-2"; btn.style.cssText = "justify-content:center;width:100%"; btn.textContent = `Claim +${passXP(m)} XP`;
          btn.addEventListener("click", () => { onComplete({ score: pct }); toast("Viral Editor cleared!", "xp", "✦"); btn.textContent = "✓ Claimed"; btn.disabled = true; });
          $("#ve-out", mount).appendChild(btn);
        }
      });
    }
    render();
  };

  function toast(msg, k, ic) { PROM.toast(msg, k, ic); }
})();
