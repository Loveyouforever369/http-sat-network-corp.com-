/* =============================================================================
   PROMETHEUS · Prompt Sandbox — serverless route (REFERENCE TEMPLATE)
   -----------------------------------------------------------------------------
   Drop this into a Next.js (App Router) project at: app/api/sandbox/route.ts
   Then set CONFIG.sandbox.endpoint = "/api/sandbox" in /js/app.js.

   It holds your AI provider key SERVER-SIDE — never ship model keys to the
   browser. Uses the official Anthropic SDK by default; an OpenAI variant is
   included below.

   Install:  npm i @anthropic-ai/sdk
   Env:      ANTHROPIC_API_KEY=sk-ant-...     (required)
             ANTHROPIC_MODEL=claude-sonnet-4-6 (optional — any current model id)

   On Vercel, add ANTHROPIC_API_KEY in Project → Settings → Environment Variables.
   ============================================================================= */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

// Model is configurable so you can pick the tier that fits cost/latency.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    if (!prompt || !prompt.trim()) {
      return Response.json({ error: "Missing 'prompt'." }, { status: 400 });
    }

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    // content is a list of blocks; concatenate the text blocks.
    const text = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    return Response.json({ text });
  } catch (err: any) {
    // Typed SDK errors: Anthropic.RateLimitError, Anthropic.AuthenticationError, ...
    const status = err?.status ?? 500;
    return Response.json({ error: err?.message ?? "Sandbox error" }, { status });
  }
}

/* -----------------------------------------------------------------------------
   OPTIONAL — server-side prompt grading with the model itself.
   The static build already grades heuristically; enable this for AI grading by
   POSTing { prompt, grade: true } and returning structured JSON.
----------------------------------------------------------------------------- */
// export async function gradeWithAI(prompt: string) {
//   const res = await client.messages.create({
//     model: MODEL,
//     max_tokens: 512,
//     messages: [{
//       role: "user",
//       content: `Grade this prompt 0-100 on Role, Task, Constraints, Output. ` +
//                `Return ONLY JSON {"total":n,"role":n,"task":n,"constraints":n,"output":n,"tip":"..."}.\n\nPROMPT:\n${prompt}`,
//     }],
//   });
//   const text = res.content.filter((b) => b.type === "text").map((b: any) => b.text).join("");
//   return JSON.parse(text);
// }

/* -----------------------------------------------------------------------------
   OPENAI VARIANT (if you'd rather use GPT) — npm i openai, set OPENAI_API_KEY
----------------------------------------------------------------------------- */
// import OpenAI from "openai";
// const openai = new OpenAI();
// export async function POST(req: Request) {
//   const { prompt } = await req.json();
//   const r = await openai.chat.completions.create({
//     model: process.env.OPENAI_MODEL || "gpt-4o-mini",
//     messages: [{ role: "user", content: prompt }],
//   });
//   return Response.json({ text: r.choices[0]?.message?.content ?? "" });
// }
