#!/usr/bin/env node
// AI Family - post to a Discord channel via webhook (Node 18+, cross-platform / n8n-ready).
// Runs where Discord is reachable. The Claude cloud sandbox CANNOT reach discord.com
// (network policy: 403 on CONNECT) - so run this on your machine, n8n, or a function.
//
// Usage:
//   FAMILY_DISCORD_WEBHOOK="https://discord.com/api/webhooks/XXX/YYY" \
//   node tools/discord-post.js "Homefront EP-0107 is live" "3 ways AI lowers your home bills" "https://..."
'use strict';

async function main() {
  const webhook = process.env.FAMILY_DISCORD_WEBHOOK;
  const [title, message, url] = process.argv.slice(2);
  if (!webhook) { console.error('Set FAMILY_DISCORD_WEBHOOK.'); process.exit(1); }
  if (!title || !message) { console.error('Usage: node discord-post.js "<title>" "<message>" [url]'); process.exit(1); }

  const embed = { title, description: message, color: 0xf5b942 };
  if (url) embed.url = url;
  const body = JSON.stringify({ username: 'The AI Family', embeds: [embed] });

  const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  if (res.ok || res.status === 204) {
    console.log('OK posted to Discord:', title);
  } else {
    console.error('Discord post failed:', res.status, await res.text());
    process.exit(1);
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
