#!/usr/bin/env node
// AI Family OS - config validator.
// Verifies the roster / pipeline / episode graph is internally consistent.
// Usage:  node tools/validate.js
'use strict';
const fs = require('fs');
const path = require('path');

const cfgPath = path.join(__dirname, '..', 'config', 'family.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));

const errors = [];
const warns = [];

const setOfIds = arr => new Set((arr || []).map(x => x.id));
const memberIds = setOfIds(cfg.members);
const crewIds = setOfIds(cfg.crews);
const pipeIds = setOfIds(cfg.pipelines);
const memberById = id => (cfg.members || []).find(m => m.id === id);

function dupCheck(arr, label) {
  const seen = new Set();
  for (const x of (arr || [])) {
    if (seen.has(x.id)) errors.push(`Duplicate ${label} id: ${x.id}`);
    seen.add(x.id);
  }
}
['members', 'crews', 'pipelines', 'campaigns', 'signals', 'episodes', 'tools'].forEach(k => dupCheck(cfg[k], k));

// members -> crew
for (const m of cfg.members) {
  if (!crewIds.has(m.crew)) errors.push(`Member ${m.id} (${m.name}) references missing crew ${m.crew}`);
}

// crews -> lead + members, with bidirectional membership consistency
for (const c of cfg.crews) {
  if (!memberIds.has(c.lead)) errors.push(`Crew ${c.id} lead ${c.lead} is not a known member`);
  const lead = memberById(c.lead);
  if (lead && lead.crew !== c.id) warns.push(`Crew ${c.id} lead ${c.lead} has crew ${lead.crew}`);
  for (const mid of (c.members || [])) {
    if (!memberIds.has(mid)) { errors.push(`Crew ${c.id} lists missing member ${mid}`); continue; }
    const m = memberById(mid);
    if (m.crew !== c.id) errors.push(`Crew ${c.id} lists ${mid}, but ${mid}.crew = ${m.crew} (mismatch)`);
  }
}

// pipelines -> steps.member + emits
for (const p of cfg.pipelines) {
  for (const s of (p.steps || [])) {
    if (!memberIds.has(s.member)) errors.push(`Pipeline ${p.id} step references missing member ${s.member}`);
    if (!s.emits) warns.push(`Pipeline ${p.id} has a step with no 'emits'`);
  }
}

// campaigns -> pipelines
for (const c of (cfg.campaigns || [])) {
  for (const pid of (c.pipelines || [])) {
    if (!pipeIds.has(pid)) errors.push(`Campaign ${c.id} references missing pipeline ${pid}`);
  }
}

// signals -> assigned_host + enums
const PRI = new Set(['P0', 'P1', 'P2']);
const SIG_STATUS = new Set(['new', 'studying', 'briefed', 'linked', 'archived']);
for (const s of (cfg.signals || [])) {
  if (!memberIds.has(s.assigned_host)) errors.push(`Signal ${s.id} assigned_host ${s.assigned_host} is not a known member`);
  if (!PRI.has(s.priority)) errors.push(`Signal ${s.id} has invalid priority ${s.priority}`);
  if (!SIG_STATUS.has(s.status)) errors.push(`Signal ${s.id} has invalid status ${s.status}`);
}

// episodes -> host + status enum
const EP_STATUS = new Set(['idea', 'scripted', 'visual', 'voiced', 'scored', 'review', 'published']);
for (const e of (cfg.episodes || [])) {
  if (!memberIds.has(e.host)) errors.push(`Episode ${e.id} host ${e.host} is not a known member`);
  if (!EP_STATUS.has(e.status)) errors.push(`Episode ${e.id} has invalid status ${e.status}`);
}

// tools registry (MCP servers + web-browsing agents)
const TOOL_STATUS = new Set(['documented', 'install-scripted', 'active', 'deprecated']);
for (const t of (cfg.tools || [])) {
  if (!t.id || !/^TOOL-/.test(t.id)) { errors.push(`Tool ${t.id || '(no id)'} has a malformed id`); continue; }
  if (!t.name) errors.push(`Tool ${t.id} is missing a name`);
  if (t.status && !TOOL_STATUS.has(t.status)) warns.push(`Tool ${t.id} status '${t.status}' not in enum`);
  if (t.crew && !crewIds.has(t.crew)) errors.push(`Tool ${t.id} references missing crew ${t.crew}`);
}

console.log('AI Family OS - config validation');
console.log(`  roster: ${cfg.members.length} members, ${cfg.crews.length} crews`);
console.log(`  flow:   ${cfg.pipelines.length} pipelines, ${(cfg.campaigns || []).length} campaigns`);
console.log(`  tools:  ${(cfg.tools || []).length} registered (MCP + web agents)`);
console.log(`  work:   ${(cfg.signals || []).length} signals, ${(cfg.episodes || []).length} episodes`);

if (warns.length) {
  console.log('\nWarnings:');
  warns.forEach(w => console.log('  ! ' + w));
}
if (errors.length) {
  console.log('\nERRORS:');
  errors.forEach(e => console.log('  x ' + e));
  process.exit(1);
}
console.log('\nAll references resolve. Graph is consistent. OK');
