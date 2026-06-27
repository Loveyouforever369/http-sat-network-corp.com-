#!/usr/bin/env node
// AI Family OS — turn the render queue into turnkey WORK ORDERS.
// For each ready item it pulls the exact narration out of the source page, attaches the member's
// voice + music + targets, and writes one copy-paste sheet: automation/WORK-ORDERS.md.
// Render is done on the user's machine / n8n (blocked in the sandbox) — this makes it copy-paste.
//   node tools/build-work-orders.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const load = p => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const rq = load('config/render-queue.json');
const vm = load('config/voice-map.json');

function narrationFrom(src) {
  const full = path.join(ROOT, src);
  if (!fs.existsSync(full)) return ['(source missing)'];
  if (!src.endsWith('.html')) return [`(talking-points — use the long cut + Shorts in ${src})`];
  const html = fs.readFileSync(full, 'utf8');
  const m = html.match(/var script=\[([\s\S]*?)\];/);
  if (!m) return ['(no narration script[] found in page)'];
  const lines = m[1].match(/"((?:[^"\\]|\\.)*)"/g) || [];
  return lines.map(s => s.slice(1, -1).replace(/\\"/g, '"'));
}

const ready = (rq.queue || []).filter(i => i.status === 'ready-to-render');
let md = `# WORK ORDERS — render these, then publish (auto-generated)

> \`node tools/build-work-orders.js\` · ${new Date().toISOString().slice(0, 10)} · ${ready.length} items ready.
> Render on your machine / n8n (Meta AI -> Google Flow, or the local trio). Voice per member below.
> Steps each: 1) voice the narration  2) build visuals to the beats  3) caption + music  4) upload  5) record the ID.

`;

ready.forEach(i => {
  const mbr = (i.voice_ref || '').split(':')[1];
  const v = (vm.voices && vm.voices[mbr]) || {};
  const lines = narrationFrom(i.source);
  md += `\n## ${i.id} — ${i.episode} (${i.type})\n`;
  md += `- **Source:** \`${i.source}\`\n`;
  md += `- **Voice:** ${v.name || mbr} → **${v.engine || '?'}** — _${v.style || ''}_ (rate ${v.rate ?? '–'}, pitch ${v.pitch ?? '–'})\n`;
  md += `- **Music:** ${i.music || '–'}\n`;
  md += `- **Targets:** ${(i.targets || []).join(', ')} → **${(i.destinations || []).join(', ')}**\n`;
  md += `- **Narration:**\n`;
  lines.forEach((l, n) => { md += `  ${n + 1}. ${l}\n`; });
  md += `- [ ] voiced  [ ] visuals  [ ] captioned+music  [ ] uploaded  [ ] ID recorded\n`;
});

fs.mkdirSync(path.join(ROOT, 'automation'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'automation', 'WORK-ORDERS.md'), md);
console.log(`build-work-orders: wrote automation/WORK-ORDERS.md — ${ready.length} ready items with narration + voice.`);
