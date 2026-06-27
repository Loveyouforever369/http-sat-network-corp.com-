#!/usr/bin/env node
// AI Family OS — render-queue reporter.
// Shows what's waiting to be rendered + which voice each needs. The render itself runs on
// the user's machine / n8n (blocked in the sandbox); this is the work order.
//   node tools/render-queue.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
function load(p) { return JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8')); }

let q, vm;
try { q = load('config/render-queue.json'); vm = load('config/voice-map.json'); }
catch (e) { console.error('render-queue: cannot read config — ' + e.message); process.exit(1); }

const items = q.queue || [];
const byStatus = {};
items.forEach(i => (byStatus[i.status] = byStatus[i.status] || []).push(i));

console.log('AI Family OS — render queue\n');
const ready = byStatus['ready-to-render'] || [];
if (ready.length) {
  console.log(`▶ READY TO RENDER (${ready.length}) — run these on your machine / n8n:`);
  ready.forEach(i => {
    const mbr = (i.voice_ref || '').split(':')[1];
    const v = (vm.voices && vm.voices[mbr]) || {};
    console.log(`   ${i.id}  ${i.episode}  ·  ${i.type}`);
    console.log(`        source: ${i.source}`);
    console.log(`        voice:  ${v.name || mbr} → ${v.engine || '?'} (${v.style || ''})`);
    console.log(`        out:    ${(i.targets || []).join(', ')}  →  ${(i.destinations || []).join(', ')}`);
  });
  console.log('');
}
['rendering', 'rendered', 'published'].forEach(s => {
  const list = byStatus[s] || [];
  if (list.length) console.log(`${s}: ${list.map(i => i.id).join(', ')}`);
});
console.log(`\nTotal ${items.length} items. ${ready.length} ready. Render on the user's machine / n8n; never mark 'published' without a returned ID.`);
