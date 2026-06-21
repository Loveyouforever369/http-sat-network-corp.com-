/* =============================================================================
   PROMETHEUS · Home Hero — neural constellation
   A lightweight, premium animated backdrop for the home hero: drifting nodes
   linked by fading edges with the occasional signal pulse — reads as "AI" and
   gives the landing real depth. DPR-aware, pauses off-screen / when hidden,
   and fully disabled under prefers-reduced-motion.
   ============================================================================= */
(function () {
  function init() {
    const hero = document.querySelector("#view-home .hero") || document.querySelector(".hero");
    if (!hero || hero.querySelector(".hero-canvas")) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const c = document.createElement("canvas");
    c.className = "hero-canvas";
    c.setAttribute("aria-hidden", "true");
    hero.insertBefore(c, hero.firstChild);
    const ctx = c.getContext("2d");

    let w = 0, h = 0, dpr = 1, nodes = [], pulses = [], raf = null, running = false;
    const LINK = 132;        // px link distance
    const PURPLE = [176, 107, 255], CYAN = [53, 214, 238];

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = hero.getBoundingClientRect();
      w = Math.max(320, r.width || hero.offsetWidth || window.innerWidth);
      h = Math.max(280, r.height || hero.offsetHeight || 480);
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.max(34, Math.round((w * h) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      const a = nodes[(Math.random() * nodes.length) | 0];
      // pick a nearby node as the target
      let best = null, bd = LINK * LINK;
      for (const b of nodes) {
        if (b === a) continue;
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
        if (d < bd && Math.random() < 0.4) { best = b; bd = d; }
      }
      if (best) pulses.push({ a, b: best, t: 0, sp: 0.012 + Math.random() * 0.02 });
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const t = 1 - dist / LINK;
            const col = t > 0.5 ? PURPLE : CYAN;
            ctx.strokeStyle = "rgba(" + col[0] + "," + col[1] + "," + col[2] + "," + (t * 0.32).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const a of nodes) {
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(206,216,255,0.55)"; ctx.fill();
      }
      // signal pulses traveling along an edge
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]; p.t += p.sp;
        if (p.t >= 1) { pulses.splice(k, 1); continue; }
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, "rgba(120,230,255,0.9)"); g.addColorStop(1, "rgba(120,230,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      }
      if (Math.random() < 0.04) spawnPulse();
      raf = requestAnimationFrame(frame);
    }

    function start() { if (running || reduce) return; running = true; size(); frame(); }
    function stop() { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

    if (reduce) { size(); frame(); return; } // draw a single static field, no animation

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(size, 180); });
    document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => { es.forEach((e) => e.isIntersecting ? start() : stop()); }, { threshold: 0.02 })
        .observe(hero);
    } else start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
