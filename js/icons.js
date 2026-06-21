/* =============================================================================
   PROMETHEUS · Icon System
   A cohesive, OS-independent inline-SVG icon set (thin-stroke, lucide-style)
   that replaces emojis everywhere — the single biggest upgrade from "amateur"
   to "premium." All icons share one 24×24 grid, currentColor strokes, and
   round joins, so they read as one designed family.

     PROM.icon(name, size)   -> svg markup string
     PROM.iconFor(emoji)     -> best icon name for a legacy emoji
     PROM.iconEmoji(emoji,sz)-> svg for an emoji (icon() ∘ iconFor())
   Plus an auto-pass that swaps any <i data-icon="name"> in static HTML.
   ============================================================================= */
(function () {
  // inner SVG markup (paths) for each icon, on a 24×24 grid
  const P = {
    brain: '<path d="M9 4.5A2.5 2.5 0 0 0 6.5 7 2.5 2.5 0 0 0 5 12a2.5 2.5 0 0 0 2 4 2.2 2.2 0 0 0 4 0V6.5A2 2 0 0 0 9 4.5Z"/><path d="M15 4.5A2.5 2.5 0 0 1 17.5 7 2.5 2.5 0 0 1 19 12a2.5 2.5 0 0 1-2 4 2.2 2.2 0 0 1-4 0"/>',
    chat: '<path d="M21 11.5a8 8 0 0 1-11.5 7.2L3 21l1.4-5.1A8 8 0 1 1 21 11.5Z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m21 16-5-5L5 20"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.9-.9 1.9-2 0-1.6 1.3-2 2.6-2H18a3 3 0 0 0 3-3c0-5-4-9-9-9Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15" cy="8" r="1"/>',
    wand: '<path d="m4 20 11-11"/><path d="m13 7 4 4"/><path d="M17 3v3M22 6h-3M19.5 9.5 21 11"/>',
    film: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18M3 15h18M9 3l-1.5 18M15 3l-1.5 18"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 18v3"/>',
    volume: '<path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>',
    mute: '<path d="M11 5 6.5 9H3v6h3.5L11 19V5Z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    bot: '<rect x="4" y="8" width="16" height="11" rx="3.5"/><path d="M12 8V4.5M9.5 4.5h5"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/>',
    workflow: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4.5A2.5 2.5 0 0 1 17 9v5"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M4.2 7l2.6 1.5M17.2 15.5l2.6 1.5M4.2 17l2.6-1.5M17.2 8.5l2.6-1.5"/>',
    wrench: '<path d="M15 4.5a4 4 0 0 0-5.3 5.1L4 15.3 6 17l1.7 1.7 5.7-5.7A4 4 0 0 0 18.5 8l-2.6 2.6-2-2L16.5 6Z"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2.5"/><path d="M8 20h8M12 16v4"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    command: '<path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6Z"/>',
    mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v4"/>',
    chart: '<path d="M4 4v16h16"/><rect x="7.5" y="11" width="2.6" height="6" rx=".6"/><rect x="12" y="7.5" width="2.6" height="9.5" rx=".6"/><rect x="16.5" y="13.5" width="2.6" height="3.5" rx=".6"/>',
    trending: '<path d="m3 17 6-6 4 4 8-8"/><path d="M16 7h5v5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 13h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
    dollar: '<circle cx="12" cy="12" r="9"/><path d="M14.8 8.7A3 3 0 0 0 12 7c-1.6 0-2.9.9-2.9 2.2 0 2.8 5.8 1.6 5.8 4.5C14.9 15 13.6 16 12 16a3 3 0 0 1-2.8-1.7M12 5.5v2M12 16v2"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5"/>',
    book: '<path d="M6 3h13v15H6.5A1.5 1.5 0 0 0 5 19.5V5a2 2 0 0 1 1-2Z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/>',
    graduation: '<path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z"/><path d="M6.5 10.7v4.6c0 1.2 2.5 2.7 5.5 2.7s5.5-1.5 5.5-2.7v-4.6M21 9v5"/>',
    shield: '<path d="M12 3 5 6v5c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6l-7-3Z"/>',
    scales: '<path d="M12 3v18M7.5 21h9M6 7.5h12M12 4.5 6 7.5M12 4.5 18 7.5"/><path d="M3 13 6 7.5 9 13a3 3 0 0 1-6 0ZM15 13l3-5.5 3 5.5a3 3 0 0 1-6 0Z"/>',
    home: '<path d="m3 10.5 9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-3.5h4V21"/>',
    rocket: '<path d="M12 3c2.8 1 5 4 5 7.5 0 1.8-.7 3.5-1.7 4.8L14 21h-4l-1.3-5.7C7.7 14 7 12.3 7 10.5 7 7 9.2 4 12 3Z"/><circle cx="12" cy="9.5" r="1.6"/><path d="M9 18c-1.6.4-2.5 2-2.5 3.5M15 18c1.6.4 2.5 2 2.5 3.5"/>',
    flame: '<path d="M12 2.5c1.3 3-2 4.4-2 7.5a2 2 0 1 0 4 0c0-1 .3-1.9 1-2.9 1.8 2 3 4.2 3 7.1a6 6 0 1 1-12 0c0-4.1 2.7-6.4 6-11.7Z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5 2 2-5.5 5-2Z"/>',
    sparkle: '<path d="M12 3.2 13.9 9 20 10.8 13.9 12.6 12 18.4 10.1 12.6 4 10.8 10.1 9 12 3.2Z"/>',
    zap: '<path d="M13 2.5 4.5 13.5H10l-1 8 8.5-11H12l1-8Z"/>',
    pen: '<path d="M14 4.5 19.5 10 9 20.5l-5 1 1-5L14 4.5Z"/><path d="m12.5 6 5.5 5.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4-4"/>',
    heart: '<path d="M12 20S3.5 14.8 3.5 8.9A4.4 4.4 0 0 1 12 6.8a4.4 4.4 0 0 1 8.5 2.1C20.5 14.8 12 20 12 20Z"/>',
    leaf: '<path d="M4 20c0-9 7-15 16-15 0 11-7 16-16 15Z"/><path d="M4 20 13 11"/>',
    dna: '<path d="M5 3c0 6 14 9 14 18M19 3c0 6-14 9-14 18M7.5 6h9M7.5 18h9M9 9.5h6M9 14.5h6"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    play: '<path d="M7 4.5 19 12 7 19.5V4.5Z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16 9"/>',
    warning: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4.5M12 17.5h.01"/>',
    bulb: '<path d="M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.4 1 2.5h6c0-1.1.3-1.9 1-2.5A6 6 0 0 0 12 3Z"/><path d="M9.5 19h5M10.5 21.5h3"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h7M15 17h5"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="13" cy="17" r="2"/>',
  };

  // legacy emoji -> icon name
  const MAP = {
    "🧠": "brain", "💬": "chat", "💁": "chat", "🖼": "image", "🎨": "palette", "🪄": "wand",
    "🎬": "film", "🎥": "film", "🎞": "film", "🎙": "mic", "🔊": "volume", "🎵": "music",
    "🤖": "bot", "🔗": "workflow", "⚙️": "gear", "⚙": "gear", "🛠": "wrench", "🛠️": "wrench", "🧩": "workflow",
    "💻": "code", "🖥": "monitor", "🖥️": "monitor", "⌨️": "keyboard", "⌨": "keyboard", "⌘": "command", "🖱": "mouse", "🖱️": "mouse",
    "📊": "chart", "📈": "trending", "💼": "briefcase", "🧑‍💼": "user", "💰": "dollar", "📣": "megaphone",
    "📓": "book", "📒": "book", "🎓": "graduation", "🛡": "shield", "🛡️": "shield", "⚖️": "scales", "⚖": "scales",
    "🏠": "home", "🏗": "building", "🏗️": "building", "🚀": "rocket", "🔥": "flame", "🧭": "compass",
    "✦": "sparkle", "✨": "sparkle", "✧": "sparkle", "🌱": "leaf", "⚡": "zap", "✒️": "pen", "✍️": "pen", "✎": "pen", "✏️": "pen",
    "🔎": "search", "🔍": "search", "🩺": "heart", "🧬": "dna", "💳": "card", "🗄️": "database", "🗄": "database", "▶": "play", "▶️": "play",
  };

  function icon(name, size) {
    const inner = P[name] || P.sparkle;
    const s = size || 24;
    return '<svg class="ic ic-' + name + '" viewBox="0 0 24 24" width="' + s + '" height="' + s +
      '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner + '</svg>';
  }
  function iconFor(emoji) { return MAP[(emoji || "").trim()] || "sparkle"; }
  function iconEmoji(emoji, size) { return icon(iconFor(emoji), size); }

  function applyDataIcons(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-icon]").forEach((el) => {
      if (el.dataset.iconDone) return;
      const name = el.getAttribute("data-icon");
      const size = parseInt(el.getAttribute("data-size"), 10) || 22;
      el.innerHTML = icon(name, size);
      el.dataset.iconDone = "1";
    });
  }

  const API = { icon, iconFor, iconEmoji, applyDataIcons, iconNames: Object.keys(P) };
  if (window.PROM) Object.assign(window.PROM, API); else window.PROM = API;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => applyDataIcons());
  else applyDataIcons();
})();
