#!/usr/bin/env node
// AI Family OS — the Tool Lab.
// Reads config/tool-ratings.json, validates it, and prints an honest scorecard.
// This is the family's MEMORY of what works and what doesn't, so we never re-try
// a dead end. Run after every edit:  node tools/tool-lab.js
'use strict';
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'config', 'tool-ratings.json');
const STATUSES = ['works', 'partial', 'blocked', 'untested'];
const ICON = { works: '🟢', partial: '🟡', blocked: '🔴', untested: '⚪' };

function fail(msg) { console.error('TOOL LAB — FAILED\n  ' + msg); process.exit(1); }
function stars(n) { n = Math.max(0, Math.min(5, n | 0)); return '★'.repeat(n) + '☆'.repeat(5 - n); }

let data;
try { data = JSON.parse(fs.readFileSync(FILE, 'utf8')); }
catch (e) { fail('Cannot read/parse config/tool-ratings.json: ' + e.message); }

const tools = Array.isArray(data.tools) ? data.tools : fail('Missing "tools" array.');
const errors = [];
const seen = new Set();
tools.forEach((t, i) => {
  const where = `tools[${i}] (${t.name || '?'})`;
  if (!t.name) errors.push(`${where}: missing name`);
  if (seen.has(t.name)) errors.push(`${where}: duplicate name`);
  seen.add(t.name);
  if (!STATUSES.includes(t.status)) errors.push(`${where}: bad status "${t.status}" (use ${STATUSES.join('/')})`);
  if (typeof t.rating !== 'number' || t.rating < 0 || t.rating > 5) errors.push(`${where}: rating must be 0-5`);
  if (!t.note) errors.push(`${where}: missing note (what happened)`);
  if (t.status === 'blocked' && !t.lesson) errors.push(`${where}: blocked tools MUST carry a lesson (why / what to do instead)`);
});
if (errors.length) fail(errors.join('\n  '));

console.log('AI Family OS — Tool Lab scorecard');
console.log(`  registry updated: ${data.updated || '?'}  ·  ${tools.length} tools tested\n`);

const counts = {};
STATUSES.forEach(s => counts[s] = tools.filter(t => t.status === s));
STATUSES.forEach(s => {
  const list = counts[s];
  if (!list.length) return;
  console.log(`${ICON[s]} ${s.toUpperCase()} (${list.length})`);
  list.sort((a, b) => b.rating - a.rating).forEach(t => {
    console.log(`   ${stars(t.rating)}  ${t.name}  ·  ${t.category}`);
    if (s === 'blocked' || s === 'partial') console.log(`        ↳ ${t.lesson || t.note}`);
  });
  console.log('');
});

const usable = counts.works.length + counts.partial.length;
console.log(`Summary: ${counts.works.length} working, ${counts.partial.length} partial, ${counts.blocked.length} blocked, ${counts.untested.length} untested.`);
console.log(`Reliable surface: ${usable}/${tools.length} tools usable from here. Blocked ones run on the user's machine / n8n.`);
console.log('Structure valid. OK');
