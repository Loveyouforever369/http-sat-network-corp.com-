/* =============================================================================
   PROMETHEUS · Animated Background
   A lightweight canvas "neural constellation": drifting nodes connected by
   glowing lines that react to the cursor. Pure canvas — no dependency, no build,
   degrades gracefully on low-power devices and respects reduced-motion.
   ============================================================================= */
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h, dpr, nodes = [], mouse = { x: -9999, y: -9999 }, raf = null;

  const COLORS = ["168,85,247", "34,211,238", "139,92,246", "59,130,246"];

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }

  function makeNodes() {
    // density scales with viewport but is capped for performance
    const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
  }

  const LINK = 150;
  function frame() {
    ctx.clearRect(0, 0, w, h);
    const link = LINK * dpr;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      // cursor attraction
      const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 180 * dpr) {
        n.x += (mdx / md) * 0.4;
        n.y += (mdy / md) * 0.4;
      }

      // node glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.c},0.9)`;
      ctx.shadowColor = `rgba(${n.c},0.9)`;
      ctx.shadowBlur = 8 * dpr;
      ctx.fill();
      ctx.shadowBlur = 0;

      // links
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const d = Math.hypot(dx, dy);
        if (d < link) {
          const a = (1 - d / link) * 0.28;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(${n.c},${a})`;
          ctx.lineWidth = 0.7 * dpr;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  function start() {
    size(); makeNodes();
    if (reduceMotion) { frame(); cancelAnimationFrame(raf); return; } // draw one static frame
    if (raf) cancelAnimationFrame(raf);
    frame();
  }

  addEventListener("resize", () => { size(); makeNodes(); }, { passive: true });
  addEventListener("mousemove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, { passive: true });
  addEventListener("mouseout", () => { mouse.x = mouse.y = -9999; });

  start();
})();
