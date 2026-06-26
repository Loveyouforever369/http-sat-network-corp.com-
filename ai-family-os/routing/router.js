// AI Family OS — Router (drop-in n8n Function node)
// Paste this into the "Router" Function node in council-loop.json.
// INPUT  (item.json): { task, difficulty, sensitive, prompt }
//   - task: a key from model-map.json task_routing (e.g. "synthesis", "draft")
//   - difficulty: optional "low" | "high" (escalates to frontier when "high")
//   - sensitive: optional boolean (forces self-hosted)
// OUTPUT (item.json): adds { tier, provider, model, endpoint, key_env, reason }
//
// Doctrine (genesis-grid): 60-80% volume/local, hard 20% frontier, sensitive self-hosted.
// Keep model-map.json as the single source of truth; this only selects from it.

const MAP = {
  tiers: {
    volume:    { provider: "ollama", endpoint: "{{OLLAMA_BASE_URL}}/api/chat", model: "qwen2.5", key_env: null },
    frontier:  { provider: "anthropic", endpoint: "https://api.anthropic.com/v1/messages", model: "claude-opus", key_env: "ANTHROPIC_API_KEY" },
    sensitive: { provider: "ollama", endpoint: "{{OLLAMA_BASE_URL}}/api/chat", model: "qwen2.5", key_env: null }
  },
  task_routing: {
    research_bulk: "volume", classify: "volume", draft: "volume", translate: "volume",
    architecture: "frontier", synthesis: "frontier", hard_bug: "frontier", final_write: "frontier",
    client_data: "sensitive", default: "volume"
  }
};

return items.map((item) => {
  const j = item.json || {};
  const task = (j.task || "default").toLowerCase();

  // 1) sensitivity overrides everything
  let tier = j.sensitive === true ? "sensitive" : (MAP.task_routing[task] || MAP.task_routing.default);

  // 2) explicit high difficulty escalates volume -> frontier (unless sensitive)
  if (tier === "volume" && (j.difficulty || "").toLowerCase() === "high") tier = "frontier";

  const pick = MAP.tiers[tier];
  const reason =
    tier === "sensitive" ? "client/PII data -> self-hosted only" :
    tier === "frontier"  ? `hard task '${task}' -> frontier API` :
                           `volume task '${task}' -> local model`;

  item.json = { ...j, tier, provider: pick.provider, model: pick.model, endpoint: pick.endpoint, key_env: pick.key_env, reason };
  return item;
});
