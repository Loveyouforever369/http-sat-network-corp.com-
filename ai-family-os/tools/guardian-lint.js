#!/usr/bin/env node
// AI Family OS — Guardian, as code.
// Scans content/*.html and enforces the honesty rule automatically: any NARRATED page must
// disclose the AI host/voice. Also warns on missing reduced-motion + a call-to-action.
//   node tools/guardian-lint.js
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'content');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));

const DISCLOSE = /AI[- ]generated|AI host|AI[- ]generated host|AI voice|AI-generated host & voice/i;
const NARRATED = /narrateBtn|speechSynthesis|id=["']narr["']/;
const REDUCED  = /prefers-reduced-motion/;
const CTA      = /Subscribe|Follow the|Follow @|#join|book a free|Book a free|Follow along|Join /i;

let fails = 0, warns = 0;
console.log('Guardian lint — content/*.html\n');
files.forEach(f => {
  const html = fs.readFileSync(path.join(DIR, f), 'utf8');
  const narrated = NARRATED.test(html);
  const issues = [];
  if (narrated && !DISCLOSE.test(html)) { issues.push('FAIL: narrated page missing AI disclosure'); fails++; }
  if (!REDUCED.test(html)) { issues.push('warn: no prefers-reduced-motion'); warns++; }
  if (!CTA.test(html)) { issues.push('warn: no clear CTA'); warns++; }
  const mark = issues.some(i => i.startsWith('FAIL')) ? '✗' : issues.length ? '⚠' : '✓';
  console.log(`  ${mark} ${f}${narrated ? ' (narrated)' : ''}`);
  issues.forEach(i => console.log(`        ${i}`));
});

console.log(`\n${fails ? '🔴' : '🟢'} ${files.length} pages · ${fails} fail · ${warns} warn.` +
  (fails ? ' Add the AI disclosure before publishing.' : ' Honesty rule satisfied.'));
process.exit(fails ? 1 : 0);
