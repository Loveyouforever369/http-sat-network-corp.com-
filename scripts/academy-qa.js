/* =============================================================================
   Academy QA harness (Node)
   Loads js/academy/_core.js + every content file in a sandbox that mimics the
   browser global (window === globalThis), then validates the registered tracks
   against the schema. Run: node scripts/academy-qa.js
   Exit code 1 if any file errors or any track is structurally invalid.
   ============================================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "js", "academy");

// Sandbox where `window` is the global object (so `window.ACADEMY = …` exposes
// a bare `ACADEMY` global, exactly like a browser).
const sandbox = {};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.console = console;
sandbox.document = { querySelector: () => null, querySelectorAll: () => [], createElement: () => ({ style: {}, appendChild() {}, classList: { add() {}, remove() {}, toggle() {} } }) };
sandbox.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
sandbox.matchMedia = () => ({ matches: false });
vm.createContext(sandbox);

const problems = [];
function load(file) {
  const full = path.join(DIR, file);
  const code = fs.readFileSync(full, "utf8");
  try { vm.runInContext(code, sandbox, { filename: file }); }
  catch (e) { problems.push(`RUNTIME ERROR in ${file}: ${e.message}`); }
}

// _core must load first; then all other content files (alpha order, skip _*).
load("_core.js");
const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".js") && !f.startsWith("_")).sort();
files.forEach(load);

const A = sandbox.ACADEMY;
if (!A || !Array.isArray(A.tracks)) { console.error("✗ ACADEMY did not initialize"); process.exit(1); }

// ---- schema validation ----
const COLORS = ["blue", "purple", "teal", "violet", "gold"];
const ids = new Set();
let lessonTotal = 0;

A.tracks.forEach((t) => {
  const where = `track "${t.id}"`;
  if (!t.id) problems.push(`${where}: missing id`);
  if (ids.has(t.id)) problems.push(`${where}: duplicate id`);
  ids.add(t.id);
  if (!t.title) problems.push(`${where}: missing title`);
  if (!t.category) problems.push(`${where}: missing category`);
  if (!COLORS.includes(t.color)) problems.push(`${where}: color "${t.color}" not in ${COLORS.join("/")}`);
  if (!t.instructor || !t.instructor.name) problems.push(`${where}: missing instructor.name`);
  if (!Array.isArray(t.lessons) || !t.lessons.length) { problems.push(`${where}: no lessons`); return; }
  const lids = new Set();
  t.lessons.forEach((l, i) => {
    const lw = `${where} lesson #${i + 1} (${l.id || "?"})`;
    if (!l.id) problems.push(`${lw}: missing id`);
    if (lids.has(l.id)) problems.push(`${lw}: duplicate lesson id`);
    lids.add(l.id);
    if (!l.title) problems.push(`${lw}: missing title`);
    if (!Array.isArray(l.sections) || !l.sections.length) problems.push(`${lw}: no sections`);
    (l.sections || []).forEach((s, si) => { if (!s.heading || !s.body) problems.push(`${lw} section #${si + 1}: missing heading/body`); });
    if (l.exercise && l.exercise.type && !["prompt", "reflect"].includes(l.exercise.type)) problems.push(`${lw}: exercise.type "${l.exercise.type}" invalid`);
    (l.promptPlaybook || []).forEach((p, pi) => { if (!p.prompt) problems.push(`${lw} playbook #${pi + 1}: missing prompt`); });
    lessonTotal++;
  });
  (t.quiz || []).forEach((q, qi) => {
    const qw = `${where} quiz #${qi + 1}`;
    if (!q.q) problems.push(`${qw}: missing question`);
    if (!Array.isArray(q.options) || q.options.length < 2) problems.push(`${qw}: needs >=2 options`);
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options || []).length) problems.push(`${qw}: answer index out of range`);
  });
});

// ---- report ----
const byCat = {};
A.tracks.forEach((t) => { (byCat[t.category] = byCat[t.category] || []).push(t); });
console.log("\n=== ACADEMY QA REPORT ===");
console.log(`Files loaded : ${["_core.js"].concat(files).join(", ")}`);
console.log(`Tracks       : ${A.tracks.length}`);
console.log(`Lessons      : ${lessonTotal}`);
Object.keys(byCat).forEach((c) => {
  console.log(`\n  ${c}`);
  byCat[c].forEach((t) => console.log(`    • ${t.id.padEnd(22)} ${String(t.lessons.length).padStart(2)} lessons  — ${t.title}`));
});
console.log("");

if (problems.length) {
  console.log(`✗ ${problems.length} problem(s):`);
  problems.forEach((p) => console.log("   - " + p));
  process.exit(1);
} else {
  console.log("✓ All tracks valid. Schema OK.");
}
