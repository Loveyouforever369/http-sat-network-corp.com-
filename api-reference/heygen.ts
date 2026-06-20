/* =============================================================================
   PROMETHEUS · HeyGen Avatar Video — serverless route (REFERENCE TEMPLATE)
   -----------------------------------------------------------------------------
   Drop this into a Next.js (App Router) project at: app/api/heygen/route.ts
   Then set CONFIG.heygen.endpoint = "/api/heygen" in /js/app.js.

   Two ways to feed avatar video into the lesson player:
     (A) Pre-render lessons once, store the MP4 URLs, and map them in
         CONFIG.heygen.videos = { m1: "https://.../m1.mp4", ... }  (simplest).
     (B) Generate on demand via this route (below), then poll for the URL.

   Env:  HEYGEN_API_KEY=...   (from your HeyGen dashboard)
   Docs: https://docs.heygen.com/  — verify the current endpoint + payload shape.
   ============================================================================= */

const HEYGEN_API = "https://api.heygen.com/v2/video/generate";
const HEYGEN_STATUS = "https://api.heygen.com/v1/video_status.get";

export async function POST(req: Request) {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) return Response.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });

  try {
    // The browser sends the lesson's transcript text + chosen avatar/voice ids.
    const { script, avatarId, voiceId } = (await req.json()) as {
      script: string; avatarId?: string; voiceId?: string;
    };

    // 1) Kick off generation. Payload shape per HeyGen v2 — confirm in their docs.
    const gen = await fetch(HEYGEN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": key },
      body: JSON.stringify({
        video_inputs: [{
          character: { type: "avatar", avatar_id: avatarId || "Daisy-inskirt-20220818", avatar_style: "normal" },
          voice: { type: "text", input_text: script, voice_id: voiceId || "2d5b0e6cf36f460aa7fc47e3eee4ba54" },
        }],
        dimension: { width: 1280, height: 720 },
        caption: true, // auto-generated cinematic subtitles
      }),
    });
    const genData = await gen.json();
    const videoId = genData?.data?.video_id;
    if (!videoId) return Response.json({ error: "No video_id returned", raw: genData }, { status: 502 });

    // Return the job id; the client (or a webhook) polls /api/heygen?id=... for the URL.
    return Response.json({ videoId, status: "processing" });
  } catch (err: any) {
    return Response.json({ error: err?.message ?? "HeyGen error" }, { status: 500 });
  }
}

// Poll for the finished MP4: GET /api/heygen?id=<videoId>
export async function GET(req: Request) {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) return Response.json({ error: "HEYGEN_API_KEY not set" }, { status: 500 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Missing ?id" }, { status: 400 });

  const res = await fetch(`${HEYGEN_STATUS}?video_id=${id}`, { headers: { "X-Api-Key": key } });
  const data = await res.json();
  // data.data.status: "processing" | "completed" | "failed"; url present when completed.
  return Response.json({ status: data?.data?.status, url: data?.data?.video_url ?? null });
}
