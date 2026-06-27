#!/usr/bin/env node
// AI Family OS — system health check (one command, runs before any big push).
// Ties the whole spine together: config graph + tool registry + referenced files.
//   node tools/health.js
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const checks = [];
function ok(name, detail) { checks.push({ name, pass: true, detail }); }
function bad(name, detail) { checks.push({ name, pass: false, detail }); }

// 1) config graph validator
try { execFileSync('node', [path.join(__dirname, 'validate.js')], { stdio: 'pipe' }); ok('config graph', 'family.json references resolve'); }
catch (e) { bad('config graph', (e.stdout || e.message || '').toString().trim().split('\n').pop()); }

// 2) tool lab validator
try { execFileSync('node', [path.join(__dirname, 'tool-lab.js')], { stdio: 'pipe' }); ok('tool lab', 'tool-ratings.json structure valid'); }
catch (e) { bad('tool lab', (e.stdout || e.message || '').toString().trim().split('\n').pop()); }

// 3) every episode script referenced in family.json exists on disk
try {
  const fam = JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'family.json'), 'utf8'));
  const eps = fam.episodes || [];
  const missing = eps.filter(e => e.script && !fs.existsSync(path.join(ROOT, e.script))).map(e => `${e.id}→${e.script}`);
  if (missing.length) bad('episode scripts', `${missing.length} missing: ${missing.join(', ')}`);
  else ok('episode scripts', `${eps.filter(e => e.script).length} script files present`);
} catch (e) { bad('episode scripts', e.message); }

// 4) leader's-desk files exist (the session-start reading list)
const desk = ['docs/MASTER-PLAN.md', 'docs/MISTAKES-AND-LESSONS.md', 'docs/ORCHESTRATOR-PREFLIGHT.md', 'CLAUDE.md', 'LEARNINGS.md'];
const deskMissing = desk.filter(f => !fs.existsSync(path.join(ROOT, f)));
if (deskMissing.length) bad("leader's desk", `missing: ${deskMissing.join(', ')}`);
else ok("leader's desk", `${desk.length} core docs present`);

// report
console.log('AI Family OS — system health\n');
checks.forEach(c => console.log(`  ${c.pass ? '🟢' : '🔴'} ${c.name.padEnd(16)} ${c.detail || ''}`));
const failed = checks.filter(c => !c.pass).length;
console.log(`\n${failed ? '🔴' : '🟢'} ${checks.length - failed}/${checks.length} checks passed.` + (failed ? ' Fix the red ones before pushing.' : ' System healthy.'));
process.exit(failed ? 1 : 0);
