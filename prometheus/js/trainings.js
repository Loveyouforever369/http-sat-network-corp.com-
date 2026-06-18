/* =============================================================================
   PROMETHEUS · Trainings (Modules 2–5) + shared UI helpers
   - PROM.ui.orderList(...)  reusable drag/▲▼ reorderable list (used by games too)
   - guided-build   (M2)  scaffold an MVP with v0 → Cursor → Lovable
   - waterfall-builder (M3) order a 6-step Clay enrichment waterfall
   - node-mapper    (M4)  wire a Gumloop Meeting Prep Agent
   - video-studio   (M5)  direct a faceless video (script + style + voice + pace)
   ============================================================================= */
(function () {
  const esc = PROM.esc;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------------------------------------------------------------------
     Shared: reorderable list with drag-and-drop + ▲▼ buttons (touch-friendly).
     items: [{id, label, sub}]. Returns the list element; read order via getOrder.
  --------------------------------------------------------------------------- */
  PROM.ui = PROM.ui || {};
  PROM.ui.orderList = function (items, shuffle = true) {
    const arr = shuffle ? shuffled(items) : items.slice();
    const wrap = document.createElement("div");
    wrap.className = "dnd-slots";
    arr.forEach((it) => {
      const row = document.createElement("div");
      row.className = "co-provider";
      row.draggable = true;
      row.dataset.id = it.id;
      row.innerHTML = `
        <span class="grip" style="cursor:grab;color:var(--text-faint)">⋮⋮</span>
        <div><div class="co-name">${esc(it.label)}</div>${it.sub ? `<div class="co-meta">${esc(it.sub)}</div>` : ""}</div>
        <span style="margin-left:auto;display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" data-up aria-label="Move up">▲</button>
          <button class="btn btn-ghost btn-sm" data-down aria-label="Move down">▼</button>
        </span>`;
      wrap.appendChild(row);
    });

    // drag events
    let dragEl = null;
    wrap.addEventListener("dragstart", (e) => {
      const row = e.target.closest(".co-provider"); if (!row) return;
      dragEl = row; row.classList.add("dragging");
    });
    wrap.addEventListener("dragend", () => { if (dragEl) dragEl.classList.remove("dragging"); dragEl = null; });
    wrap.addEventListener("dragover", (e) => {
      e.preventDefault();
      const after = afterElement(wrap, e.clientY);
      if (!dragEl) return;
      if (after == null) wrap.appendChild(dragEl);
      else wrap.insertBefore(dragEl, after);
    });
    // ▲▼ buttons
    wrap.addEventListener("click", (e) => {
      const row = e.target.closest(".co-provider"); if (!row) return;
      if (e.target.matches("[data-up]") && row.previousElementSibling) wrap.insertBefore(row, row.previousElementSibling);
      if (e.target.matches("[data-down]") && row.nextElementSibling) wrap.insertBefore(row.nextElementSibling, row);
    });
    return wrap;
  };
  PROM.ui.getOrder = (wrap) => $$(".co-provider", wrap).map((r) => r.dataset.id);

  function afterElement(wrap, y) {
    const els = [...wrap.querySelectorAll(".co-provider:not(.dragging)")];
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) return { offset, element: child };
      return closest;
    }, { offset: -Infinity, element: null }).element;
  }
  function shuffled(a) { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [x[i], x[j]] = [x[j], x[i]]; } return x; }
  PROM.ui.shuffled = shuffled;

  function gameHead(m, statsHtml) {
    return `<div class="game-head">
      <div class="game-title-wrap"><h3>${esc(m.training.title)}</h3><p>${esc(m.training.objective)}</p></div>
      <div class="game-stats">${statsHtml || ""}</div></div>`;
  }

  /* ===========================================================================
     M2 · guided-build — scaffold an MVP with v0 → Cursor → Lovable
  =========================================================================== */
  PROM.trainings["guided-build"] = function (mount, m, onComplete) {
    const T = m.training;
    mount.innerHTML = `
      <div class="panel game-shell">
        ${gameHead(m)}
        <div class="how-to">Write your own prompt for each tool, then reveal a model answer to compare. Complete all three to finish the training.</div>
        <div id="steps" class="studio-grid"></div>
        <button class="btn btn-primary mt-3" id="gb-done" style="justify-content:center" disabled>Complete training · +${PROM.xpFor(m, "training")} XP</button>
      </div>`;
    const steps = $("#steps", mount);
    T.steps.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "panel sb-panel";
      card.innerHTML = `
        <div class="tag-row"><span class="chip">Step ${i + 1}</span><span class="chip done">${esc(s.tool)}</span></div>
        <h3 style="margin:4px 0 8px">${esc(s.goal)}</h3>
        <textarea class="sb-input" placeholder="Write the prompt you'd give ${esc(s.tool)}..." style="min-height:90px"></textarea>
        <div class="sb-actions">
          <button class="btn btn-ghost btn-sm" data-reveal>💡 Reveal model prompt</button>
        </div>
        <div class="sb-response hidden" data-model><span class="resp-label">Model approach · ${esc(s.tool)}</span><strong>Prompt:</strong> ${esc(s.prompt)}<br><br><strong>Result:</strong> ${esc(s.model)}</div>`;
      steps.appendChild(card);
      const done = () => card.dataset.engaged = "1";
      $("textarea", card).addEventListener("input", (e) => { if (e.target.value.trim()) done(); checkAll(); });
      $("[data-reveal]", card).addEventListener("click", () => { $("[data-model]", card).classList.remove("hidden"); done(); checkAll(); });
    });
    function checkAll() {
      const all = $$(".panel.sb-panel", steps).every((c) => c.dataset.engaged === "1");
      $("#gb-done", mount).disabled = !all;
    }
    $("#gb-done", mount).addEventListener("click", () => { onComplete(); toast("MVP scaffolding training complete!", "xp", "✦"); $("#gb-done", mount).textContent = "✓ Completed"; $("#gb-done", mount).disabled = true; });
  };

  /* ===========================================================================
     M3 · waterfall-builder — order a 6-step Clay enrichment waterfall
  =========================================================================== */
  PROM.trainings["waterfall-builder"] = function (mount, m, onComplete) {
    const T = m.training;
    const items = T.correctSteps.map((label, i) => ({ id: String(i), label }));
    mount.innerHTML = `
      <div class="panel game-shell">
        ${gameHead(m)}
        <div class="how-to">Drag the steps (or use ▲▼) into the most credit-efficient order: cheapest provider first, enrichment before personalization. Then check.</div>
        <div id="list-mount"></div>
        <div class="sb-actions mt-2">
          <button class="btn btn-primary" id="wf-check">✓ Check order</button>
        </div>
        <div id="wf-result"></div>
      </div>`;
    const list = PROM.ui.orderList(items);
    $("#list-mount", mount).appendChild(list);
    $("#wf-check", mount).addEventListener("click", () => {
      const order = PROM.ui.getOrder(list).map((id) => items[+id].label);
      const correct = order.every((lbl, i) => lbl === T.correctSteps[i]);
      $$(".co-provider", list).forEach((row, i) => {
        const lbl = items[+row.dataset.id].label;
        row.style.borderColor = lbl === T.correctSteps[i] ? "var(--teal)" : "#fb7185";
      });
      $("#wf-result", mount).innerHTML = correct
        ? `<div class="sb-response"><span class="resp-label">Perfect waterfall</span>${esc(T.note)}</div>`
        : `<div class="sb-response" style="border-color:#fb7185;background:rgba(244,63,94,.06)"><span class="resp-label" style="color:#fb7185">Not quite</span>Remember: cheapest provider first, fall back only on a miss, enrich before you personalize. Adjust and try again.</div>`;
      if (correct) { onComplete({ score: 100 }); toast("Waterfall mastered!", "xp", "✦"); }
    });
  };

  /* ===========================================================================
     M4 · node-mapper — wire a Gumloop Meeting Prep Agent
  =========================================================================== */
  PROM.trainings["node-mapper"] = function (mount, m, onComplete) {
    const T = m.training;
    // the trigger is fixed first; the rest must be ordered
    const movable = T.nodes.filter((n) => !n.fixed);
    const items = movable.map((n) => ({ id: n.id, label: n.label }));
    const triggerNode = T.nodes.find((n) => n.fixed);
    mount.innerHTML = `
      <div class="panel game-shell">
        ${gameHead(m)}
        <div class="how-to">The trigger is locked in first. Drag the remaining nodes into the order the agent should run them. Then check the flow.</div>
        <div class="co-provider" style="border-color:var(--electric);opacity:.9;margin-bottom:10px"><span class="co-rank">⚡</span><div class="co-name">${esc(triggerNode.label)}</div><span class="co-meta" style="margin-left:auto">locked</span></div>
        <div id="list-mount"></div>
        <div class="sb-actions mt-2"><button class="btn btn-primary" id="nm-check">✓ Check flow</button></div>
        <div id="nm-result"></div>
      </div>`;
    const list = PROM.ui.orderList(items);
    $("#list-mount", mount).appendChild(list);
    const correctMovable = T.correctOrder.filter((id) => id !== triggerNode.id);
    $("#nm-check", mount).addEventListener("click", () => {
      const order = PROM.ui.getOrder(list);
      const ok = order.every((id, i) => id === correctMovable[i]);
      $$(".co-provider", list).forEach((row, i) => { row.style.borderColor = row.dataset.id === correctMovable[i] ? "var(--teal)" : "#fb7185"; });
      $("#nm-result", mount).innerHTML = ok
        ? `<div class="sb-response"><span class="resp-label">Agent online</span>${esc(T.note)}</div>`
        : `<div class="sb-response" style="border-color:#fb7185;background:rgba(244,63,94,.06)"><span class="resp-label" style="color:#fb7185">Flow broken</span>You need the event before the attendee, the CRM data before the AI summary, and the summary before Slack. Reorder and retry.</div>`;
      if (ok) { onComplete({ score: 100 }); toast("Meeting Prep Agent built!", "xp", "✦"); }
    });
  };

  /* ===========================================================================
     M5 · video-studio — direct a faceless video
  =========================================================================== */
  PROM.trainings["video-studio"] = function (mount, m, onComplete) {
    const T = m.training;
    const pills = (arr, group) => `<div class="opt-row" data-group="${group}">${arr.map((x, i) => `<button class="opt-pill ${i === 0 ? "" : ""}" data-val="${esc(x)}">${esc(x)}</button>`).join("")}</div>`;
    mount.innerHTML = `
      <div class="panel game-shell">
        ${gameHead(m)}
        <div class="how-to">Write a short script, then direct the production. Your choices assemble into a faceless video render plan — no timeline editing required.</div>
        <div class="studio-grid">
          <div>
            <label class="field-label">📝 Your script</label>
            <textarea class="sb-input" id="vs-script" placeholder="${esc(T.scriptPlaceholder)}"></textarea>
          </div>
          <div><label class="field-label">🎬 Visual style</label>${pills(T.styles, "style")}</div>
          <div><label class="field-label">🎙️ AI voiceover</label>${pills(T.voices, "voice")}</div>
          <div><label class="field-label">⚡ Pacing</label>${pills(T.pacings, "pace")}</div>
        </div>
        <button class="btn btn-primary mt-3" id="vs-gen" style="justify-content:center">🎥 Generate faceless video</button>
        <div id="vs-out"></div>
      </div>`;

    const sel = { style: null, voice: null, pace: null };
    $$(".opt-row", mount).forEach((row) => row.addEventListener("click", (e) => {
      const b = e.target.closest(".opt-pill"); if (!b) return;
      $$(".opt-pill", row).forEach((x) => x.classList.toggle("selected", x === b));
      sel[row.dataset.group] = b.dataset.val;
    }));

    $("#vs-gen", mount).addEventListener("click", () => {
      const script = $("#vs-script", mount).value.trim();
      if (!script) return toast("Write a script first.", "", "✍");
      if (!sel.style || !sel.voice || !sel.pace) return toast("Pick a style, voice and pacing.", "", "🎛");
      const out = $("#vs-out", mount);
      out.innerHTML = `<div class="sb-response"><span class="resp-label">Rendering…</span><div class="grade-bar" style="margin-top:6px"><div class="grade-fill" id="vs-bar" style="width:0"></div></div></div>`;
      let p = 0;
      const bar = $("#vs-bar", mount);
      const iv = setInterval(() => {
        p += 8 + Math.random() * 12; if (p >= 100) { p = 100; clearInterval(iv); finish(); }
        bar.style.width = p + "%";
      }, 140);
      function finish() {
        const mins = sel.pace.includes("Shorts") ? "0:45" : sel.pace.includes("documentary") ? "14:30" : "10:12";
        out.innerHTML = `<div class="sb-response"><span class="resp-label">✅ Faceless video assembled</span>
          <strong>Style:</strong> ${esc(sel.style)} · <strong>Voice:</strong> ${esc(sel.voice)} · <strong>Pacing:</strong> ${esc(sel.pace)}<br>
          <strong>Est. runtime:</strong> ${mins} · <strong>Scenes:</strong> auto-cut from your script · <strong>Captions:</strong> burned-in, synced<br><br>
          <span class="dim">In production this calls your Crreo AI / video API. Wire it where this demo renders.</span></div>`;
        onComplete({ score: 100 }); toast("Faceless video generated!", "xp", "✦");
      }
    });
  };

  function toast(msg, k, ic) { PROM.toast(msg, k, ic); }
})();
