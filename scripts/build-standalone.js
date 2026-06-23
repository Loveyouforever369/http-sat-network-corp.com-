/* =============================================================================
   Build a single, self-contained HTML file of the whole Prometheus app.
   Inlines every local css/* and js/* reference from index.html so the result
   runs by double-clicking it — no server, no internet, no build tooling.
   Run:  node scripts/build-standalone.js   →   dist/prometheus-standalone.html
   ============================================================================= */
const fs = require("fs");

let html = fs.readFileSync("index.html", "utf8");

const inlineCss = (href) => `<style>\n${fs.readFileSync(href, "utf8")}\n</style>`;
const inlineJs = (src) =>
  `<script>\n${fs.readFileSync(src, "utf8").replace(/<\/script>/gi, "<\\/script>")}\n</script>`;

// Inline local stylesheets (css/*); leave external font links untouched.
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*href="(css\/[^"]+)"[^>]*>/g, (_m, href) => inlineCss(href));
// Inline local scripts (js/*); leave the inline bootstrap script untouched.
html = html.replace(/<script[^>]*src="(js\/[^"]+)"[^>]*><\/script>/g, (_m, src) => inlineJs(src));

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/prometheus-standalone.html", html);
console.log("Wrote dist/prometheus-standalone.html:", (fs.statSync("dist/prometheus-standalone.html").size / 1024).toFixed(0) + " KB");
