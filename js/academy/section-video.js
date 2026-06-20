/* =============================================================================
   PROMETHEUS · Academy · Per-section film slots
   Drop an Invideo / OpenArt / hosted video URL per category here and a
   "🎬 Watch film" button appears on that section's banner. Empty = art-only.
   (Per-section films are generated via Invideo, which requires per-call approval.)
   ============================================================================= */
(function () {
  window.ACADEMY = window.ACADEMY || {};
  ACADEMY.sectionVideo = ACADEMY.sectionVideo || {
    // "Foundations": "https://ai.invideo.io/...",
    // "Conversational AI": "https://ai.invideo.io/...",
    // "Image & Design": "https://ai.invideo.io/...",
    // "Video & Avatars": "https://ai.invideo.io/...",
    // "Audio, Voice & Music": "https://ai.invideo.io/...",
    // "Automation & Agents": "https://ai.invideo.io/...",
    // "Vibe Coding": "https://ai.invideo.io/...",
    // "Business & Life Playbooks": "https://ai.invideo.io/...",
  };
  // Per-section realistic images — drop a hosted image URL per category to show a
  // photo banner (overrides the generative SVG art). Generate it in your image
  // tool of choice (Adobe Firefly, Leonardo, Ideogram, Canva) using the prompts in
  // docs/PRODUCTION-PACK.md, host the file, and paste the URL here.
  ACADEMY.sectionImage = ACADEMY.sectionImage || {
    // "Foundations": "https://.../foundations.jpg",
  };
})();
