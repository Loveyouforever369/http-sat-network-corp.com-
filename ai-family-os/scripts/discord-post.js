#!/usr/bin/env node
// AI Family — post our content bank to Discord via webhook.
// Reads content/discord-queue.md (posts separated by a line of "---") and posts each.
//
// RUNS where Discord is reachable: your machine / n8n. It is BLOCKED from the Claude cloud
// sandbox (network policy: 403 to discord.com), so run it locally against the active webhook.
//
// Usage:
//   FAMILY_DISCORD_WEBHOOK="https://discord.com/api/webhooks/ID/TOKEN" node scripts/discord-post.js
'use strict';
const fs = require('fs');
const path = require('path');

const WEBHOOK = process.env.FAMILY_DISCORD_WEBHOOK;
const QUEUE = path.join(__dirname, '..', 'content', 'discord-queue.md');

async function main() {
  if (!WEBHOOK) { console.error('Set FAMILY_DISCORD_WEBHOOK to your Discord webhook URL.'); process.exit(1); }
  if (!fs.existsSync(QUEUE)) { console.error('Missing content/discord-queue.md'); process.exit(1); }

  const posts = fs.readFileSync(QUEUE, 'utf8')
    .split(/\n-{3,}\n/)
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('#'));   // drop the header/comment lines

  console.log(`AI Family → Discord: ${posts.length} posts queued.`);
  let ok = 0;
  for (let i = 0; i < posts.length; i++) {
    try {
      const r = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'The AI Family', content: posts[i].slice(0, 1900) }),
      });
      if (r.ok || r.status === 204) { ok++; console.log(`  [${i + 1}/${posts.length}] posted`); }
      else { console.log(`  [${i + 1}/${posts.length}] FAILED (HTTP ${r.status})`); }
    } catch (e) { console.log(`  [${i + 1}/${posts.length}] error: ${e.message}`); }
    await new Promise(res => setTimeout(res, 1200)); // gentle rate limit
  }
  console.log(`Done: ${ok}/${posts.length} posted to Discord.`);
}
main().catch(e => { console.error(e.message); process.exit(1); });
