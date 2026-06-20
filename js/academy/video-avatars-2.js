/* =============================================================================
   PROMETHEUS · Academy · Video & Avatars (supplement)
   Adds Veo 3.1, Runway & Kling, and HeyGen avatars alongside the Sora 2 track.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== Google Veo ============================== */
  ACADEMY.register({
    id: "veo",
    title: "Google Veo 3.1 Mastery",
    tagline: "The safest all-rounder — strong realism, native audio, up to 4K.",
    category: "Video & Avatars",
    icon: "🎥",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Mara Quinn", role: "AI Film Director", persona: "cinematic, decisive", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Native audio", "4K"] },
    overview:
      "Google's Veo 3.1 is the safe default for AI video in 2026: strong realism, good motion, native synchronized audio, and high resolution. It generates from text or an image, and is available through Google's Flow and Gemini apps.\n\nThis track teaches Veo prompting (including audio), image-to-video, and how to assemble clips into something watchable.",
    whyItMatters:
      "Video is the highest-engagement medium and the hardest to produce. Veo collapses a shoot into a prompt — with sound included.",
    outcomes: [
      "Write Veo prompts that control subject, camera, and audio",
      "Use image-to-video for control and consistency",
      "Choose resolution/aspect for the platform",
      "Stitch generated clips into a coherent piece",
    ],
    lessons: [
      {
        id: "l1",
        title: "Prompting Veo (with audio)",
        level: "Beginner",
        duration: "11 min",
        summary: "Describe the shot like a director — and the model adds matching sound.",
        sections: [
          { heading: "Shot-language prompts", body: "Veo responds to film language. Specify the subject and action, then the camera (wide shot, slow dolly in, drone), the lighting (golden hour, neon), and the mood. 'A chef plating dessert, slow push-in, warm restaurant lighting, shallow depth of field' reads like a shot list — and Veo shoots it." },
          { heading: "Native audio", body: "A Veo standout is synchronized audio: describe the sound and it generates it with the video — ambient noise, footsteps, even dialogue and lip-sync. Add 'with the sound of rain and distant thunder' or specify a line of dialogue, and the audio comes baked in." },
          { heading: "Keep clips short and specific", body: "Generations are short (several seconds). One clear action per clip beats cramming a whole scene. Plan a sequence as a series of specific shots, then generate each." },
        ],
        keyTakeaways: [
          "Use camera + lighting + mood language, not just a noun.",
          "Describe audio — Veo generates synced sound and dialogue.",
          "One action per short clip; plan sequences as shots.",
        ],
        settings: [
          { name: "Resolution", detail: "Up to 4K on supported tiers; pick by final use." },
          { name: "Aspect ratio", detail: "16:9 for landscape, 9:16 for Shorts/Reels." },
          { name: "Text-to-video / image-to-video", detail: "Start from a prompt or an input image." },
        ],
        promptPlaybook: [
          { label: "Cinematic shot + audio", prompt: "A lone astronaut walking across red desert dunes at sunset, slow tracking shot from behind, long shadows, cinematic, with the sound of wind and crunching sand and a low ambient drone.", why: "Subject + camera + light + explicit audio uses Veo's native sound." },
          { label: "Dialogue clip", prompt: "Close-up of a barista smiling, saying 'Your usual?' with natural lip-sync, cozy cafe ambience in the background, soft morning light.", why: "Veo can generate synced dialogue and ambience together." },
        ],
        proTips: [
          "Always describe the soundscape — it's a Veo advantage most people skip.",
          "Storyboard a sequence as 4-6 specific shots, then generate each.",
        ],
        pitfalls: [
          "Cramming a multi-action scene into one clip.",
          "Ignoring audio and getting silent or mismatched sound.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Veo prompt for a single cinematic shot that explicitly includes camera movement and audio.",
          starter: "A surfer paddling out at dawn, low water-level tracking shot, soft pink light, with the sound of gentle waves and seagulls.",
          hint: "Subject + camera move + lighting + explicit sound.",
          success: "Strong Veo prompts specify subject, camera movement, lighting/mood, and an explicit soundscape.",
        },
        narration:
          "Google's Veo is the safe default for AI video — strong realism, smooth motion, high resolution, and the big one: native, synchronized audio. To get the most out of it, prompt like a director. Don't just name a subject; describe the camera — a slow push-in, a drone shot — the lighting, and the mood, like a shot list. Then describe the sound, because Veo generates it with the video: wind, footsteps, even a line of dialogue with lip-sync. Keep each clip short with one clear action, and plan a scene as a sequence of specific shots. Describe the picture and the sound together, and Veo hands you a finished, audible clip.",
      },
      {
        id: "l2",
        title: "Image-to-video & consistency",
        level: "Intermediate",
        duration: "11 min",
        summary: "Start from a still you control for predictable, on-brand motion.",
        sections: [
          { heading: "Why start from an image", body: "Text-to-video is a roll of the dice on the look; image-to-video pins it down. Generate or supply a still you love (your product, your character, your scene), then animate it. You control the composition and style, and Veo adds motion." },
          { heading: "Reference-driven control", body: "Use reference images for subjects and style so clips share a consistent look across a sequence. Establishing the same character/product per shot is how you build a watchable, coherent piece rather than disconnected clips." },
          { heading: "Direct the motion", body: "When animating a still, describe the motion you want: 'gentle camera push-in, hair moving in the breeze, steam rising'. Specific motion direction keeps the animation purposeful instead of random." },
        ],
        keyTakeaways: [
          "Image-to-video gives control over look and composition.",
          "References keep subjects/style consistent across shots.",
          "Describe the exact motion to animate a still well.",
        ],
        settings: [
          { name: "Image input", detail: "Provide a starting frame to control composition/style." },
          { name: "Reference images", detail: "Maintain subject/style consistency across a sequence." },
        ],
        promptPlaybook: [
          { label: "Animate a product still", prompt: "[image: product on marble] Slow 180-degree orbit around the bottle, soft studio light, subtle condensation droplets forming, shallow depth of field.", why: "Controls the look via the still, then directs precise motion." },
        ],
        proTips: [
          "Perfect the still first (in Midjourney/Firefly), then animate — easier than fixing video.",
          "Reuse the same reference across shots for a consistent character/product.",
        ],
        pitfalls: [
          "Animating a weak still — motion won't save a bad frame.",
          "Vague motion prompts that produce drifting, aimless movement.",
        ],
        exercise: {
          type: "reflect",
          brief: "Plan a 5-shot product video. Which still would you animate per shot, and how would you keep the product consistent?",
          hint: "One controlled still per shot + a reference for consistency.",
          success: "Good plans use controlled stills per shot and a reference to keep the product consistent across the sequence.",
        },
      },
      {
        id: "l3",
        title: "From clips to a finished piece",
        level: "Advanced",
        duration: "10 min",
        summary: "Assemble, score, and caption short generations into something watchable.",
        sections: [
          { heading: "Sequence and edit", body: "Generate your shots, then assemble them in an editor (or a tool like Descript) in narrative order. Even AI video needs editing: trim, order, and pace the clips so they tell a story rather than play as a reel of tests." },
          { heading: "Sound design", body: "Veo's native audio handles a lot, but you can layer music (Suno) and clean voiceover (ElevenLabs) for polish. Good sound is half of perceived video quality — don't neglect it." },
          { heading: "Captions and format", body: "Add captions (most social video is watched muted) and export in the right aspect ratio per platform. A captioned, well-paced 30-second clip outperforms a longer, soundless one." },
        ],
        keyTakeaways: [
          "Edit clips into a narrative; pacing matters.",
          "Layer music + voiceover for polish.",
          "Caption and format per platform.",
        ],
        features: [
          { name: "Editor (Descript/CapCut/etc.)", detail: "Assemble, trim, caption, and export clips." },
          { name: "Audio stack", detail: "Veo native audio + Suno music + ElevenLabs voiceover." },
        ],
        promptPlaybook: [
          { label: "Shot list (planning)", prompt: "Plan a 30-second product teaser as 6 shots: hook close-up, product reveal, 2 benefit shots, lifestyle shot, logo end card. For each, write the Veo prompt incl. camera and audio.", why: "Planning the sequence first makes the clips assemble into a story." },
        ],
        proTips: [
          "Write the shot list before generating — it saves credits and gives coherence.",
          "Caption everything; design for muted viewing.",
        ],
        pitfalls: [
          "Stringing random clips with no edit or pacing.",
          "Forgetting captions and platform aspect ratios.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a 6-shot list for a 30-second video, with a one-line Veo prompt per shot.",
          starter: "30s teaser, 6 shots: 1) hook... 2) reveal... (give each a Veo prompt with camera + audio).",
          hint: "Plan the narrative shots, then a prompt each.",
          success: "Strong answers plan a coherent shot sequence with specific, audio-aware Veo prompts per shot.",
        },
      },
    ],
    quiz: [
      { q: "A standout Veo feature is…", options: ["No audio", "Native synchronized audio", "Only 480p", "Text only"], answer: 1, why: "Veo generates synced sound and dialogue with the video." },
      { q: "Why use image-to-video?", options: ["Less control", "Control composition/style, then add motion", "It's slower for no reason", "To remove audio"], answer: 1, why: "Starting from a still pins down the look." },
      { q: "Best practice for clips?", options: ["One long everything-clip", "Short clips, one action each, planned as shots", "No planning", "Ignore pacing"], answer: 1, why: "Short, specific shots assemble into a coherent piece." },
      { q: "Half of perceived video quality is…", options: ["Resolution only", "Sound design", "File size", "Length"], answer: 1, why: "Music, voiceover, and clean audio dramatically lift quality." },
    ],
    resources: [
      { label: "Shot list first", note: "Plan the sequence before generating to save credits and add coherence." },
      { label: "Audio stack", note: "Combine Veo audio with Suno music and ElevenLabs voiceover." },
    ],
  });

  /* ============================== Runway & Kling ============================== */
  ACADEMY.register({
    id: "runway-kling",
    title: "Runway & Kling: Control + Value",
    tagline: "Fine creative control (Runway) and top-tier value (Kling).",
    category: "Video & Avatars",
    icon: "🎞",
    color: "teal",
    level: "Intermediate → Advanced",
    difficulty: "Core",
    estTime: "~65 min",
    instructor: { name: "Mara Quinn", role: "AI Film Director", persona: "hands-on, precise", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Motion control", "Storyboards"] },
    overview:
      "When you need granular control, Runway (Gen-4.5) offers camera moves, motion brush, and reference-driven consistency. When you want top perceived quality at a great price, Kling (3.0) leads — with strong motion and a multi-shot storyboard mode.\n\nThis track covers Runway's control tools, Kling's strengths, and how to choose between them and the other models.",
    whyItMatters:
      "No single video model wins everything. Knowing each tool's edge lets you pick the right one per shot and budget.",
    outcomes: [
      "Use Runway's motion brush and camera controls",
      "Leverage Kling's quality, motion, and storyboard mode",
      "Maintain consistency with references",
      "Choose the right model per shot and budget",
    ],
    lessons: [
      {
        id: "l1",
        title: "Runway: granular control",
        level: "Intermediate",
        duration: "11 min",
        summary: "Direct exactly what moves and how the camera flies.",
        sections: [
          { heading: "Motion brush", body: "Runway's motion brush lets you paint which parts of a frame move and in what direction — make only the water ripple, only the hair blow, the clouds drift. This local control is what separates a precise result from a whole-frame guess." },
          { heading: "Camera controls & references", body: "Set explicit camera moves (pan, tilt, zoom, orbit) and use reference images to keep characters and styles consistent across shots. Runway is the pro pick when you need the shot to do a specific thing." },
          { heading: "Iterate on a shot", body: "Treat Runway like a controllable camera: generate, adjust the motion/camera, regenerate. The control surface rewards iteration toward an exact vision rather than rerolling blindly." },
        ],
        keyTakeaways: [
          "Motion brush controls what moves, locally.",
          "Explicit camera moves + references for consistency.",
          "Iterate the controls toward an exact shot.",
        ],
        settings: [
          { name: "Motion brush", detail: "Paint regions and directions of movement." },
          { name: "Camera controls", detail: "Pan/tilt/zoom/orbit directives." },
          { name: "References", detail: "Keep characters/style consistent across shots." },
        ],
        promptPlaybook: [
          { label: "Controlled motion", prompt: "Static café scene; use motion brush so only the steam from the cup rises and the person's hair sways slightly; subtle slow zoom-in; everything else still.", why: "Local motion control yields a precise, believable shot." },
        ],
        proTips: [
          "Move less, not more — selective motion looks more real than animating everything.",
          "Lock a character reference for multi-shot consistency.",
        ],
        pitfalls: [
          "Animating the whole frame and getting warpy artifacts.",
          "Skipping references, so characters drift between shots.",
        ],
        exercise: {
          type: "reflect",
          brief: "Describe a shot where motion brush would beat a plain text-to-video prompt. What exactly would you animate?",
          hint: "Pick a scene where only one element should move.",
          success: "Good answers identify a shot needing selective, local motion that text-to-video can't control precisely.",
        },
        narration:
          "When you need the shot to do something specific, Runway is the pro's tool. Its motion brush lets you paint exactly which parts of the frame move — only the water ripples, only the hair sways, the rest stays still. That local control is the difference between a precise result and a whole-frame guess. Add explicit camera moves — pan, tilt, orbit — and reference images to keep your character consistent across shots, and you're directing, not gambling. One rule that makes AI video look real: move less, not more. Selective, purposeful motion beats animating everything. Treat Runway like a controllable camera, and iterate toward the exact shot in your head.",
      },
      {
        id: "l2",
        title: "Kling: quality, motion & storyboards",
        level: "Intermediate",
        duration: "10 min",
        summary: "Top perceived quality and a multi-shot mode at a great price.",
        sections: [
          { heading: "Why Kling", body: "Kling 3.0 is regularly rated at or near the top for perceived quality and realism — especially complex motion like hair, fabric, and liquids — often at a lower price than rivals. It's the strong value pick when you want great-looking video without the highest cost." },
          { heading: "Multi-shot storyboard", body: "Kling's storyboard mode chains multiple shots with audio sync across cuts, so you can build a short sequence in one place rather than stitching isolated clips. Great for narrative content." },
          { heading: "Image-to-video strength", body: "Kling is strong at animating stills, so the image-to-video workflow (control the frame, then add motion) works especially well — pair it with a great still from Midjourney or Flux." },
        ],
        keyTakeaways: [
          "Kling leads on perceived quality/value, complex motion.",
          "Storyboard mode chains shots with audio across cuts.",
          "Excellent image-to-video animation.",
        ],
        settings: [
          { name: "Mode/tier", detail: "Standard vs. Pro tiers trade speed/quality/price." },
          { name: "Storyboard", detail: "Multi-shot sequence with synced audio across cuts." },
        ],
        promptPlaybook: [
          { label: "Complex motion shot", prompt: "A dancer spinning in a flowing red dress, fabric and hair moving naturally, dramatic side lighting, slow-motion, cinematic.", why: "Plays to Kling's strength with fabric/hair/liquid motion." },
        ],
        proTips: [
          "Use Kling for shots heavy on natural motion (cloth, water, hair).",
          "Feed it a strong still for image-to-video; it animates well.",
        ],
        pitfalls: [
          "Paying premium prices elsewhere for shots Kling nails affordably.",
          "Ignoring storyboard mode and hand-stitching everything.",
        ],
        exercise: {
          type: "reflect",
          brief: "Which of your shots would you route to Kling specifically (complex motion or value), and why?",
          hint: "Think cloth/water/hair motion or budget-sensitive volume.",
          success: "Good answers route motion-heavy or budget-sensitive shots to Kling with clear reasoning.",
        },
      },
      {
        id: "l3",
        title: "Choosing your video model",
        level: "Advanced",
        duration: "9 min",
        summary: "Match Sora, Veo, Runway, and Kling to each job.",
        sections: [
          { heading: "The router", body: "A practical 2026 rule of thumb: Veo for the safe all-round pick with native audio; Kling for top quality-per-dollar and complex motion; Runway for granular control (motion brush, camera); Sora for cinematic, story-led work. Many pros use several and pick per shot." },
          { heading: "Cost & limits", body: "Video generation is expensive relative to text/images, and pricing differs a lot per model and per second. Draft on cheaper tiers, finalize the keepers on the best model, and budget by the shot." },
          { heading: "A multi-tool workflow", body: "A realistic pipeline: still in Midjourney/Flux, animate in Kling/Runway/Veo, voiceover in ElevenLabs, music in Suno, assemble and caption in an editor. Best-of-breed per step beats forcing one tool to do everything." },
        ],
        keyTakeaways: [
          "Veo all-round; Kling value/motion; Runway control; Sora cinematic.",
          "Draft cheap, finalize on the best model; budget per shot.",
          "Use a best-of-breed multi-tool pipeline.",
        ],
        promptPlaybook: [
          { label: "Pick the model", prompt: "I need [shot description] with [audio? control? budget?] priorities. Recommend Veo, Kling, Runway, or Sora and explain in 3 bullets.", why: "Forces a model choice grounded in the shot's real needs." },
        ],
        proTips: [
          "Keep a personal cheat-sheet of which model wins which shot type.",
          "Finalize only your selected shots on premium tiers to control cost.",
        ],
        pitfalls: [
          "Loyalty to one model for every shot.",
          "Finalizing everything on the most expensive option.",
        ],
        exercise: {
          type: "reflect",
          brief: "For a 30-second promo, assign each of 4 shot types to a model (Veo/Kling/Runway/Sora) and justify.",
          hint: "Match audio/control/quality/cost needs to each model's edge.",
          success: "Good answers route shots to models by their strengths (audio, control, value, cinematic) with reasoning.",
        },
      },
    ],
    quiz: [
      { q: "Runway's signature control tool is…", options: ["Motion brush", "A spreadsheet", "Auto-captions", "A drum machine"], answer: 0, why: "Motion brush paints local, directional movement." },
      { q: "Kling is best known for…", options: ["Worst quality", "Top perceived quality/value + complex motion", "Text only", "No motion"], answer: 1, why: "Kling leads on quality-per-dollar and natural motion." },
      { q: "Veo's edge in the router is…", options: ["No audio", "Safe all-rounder with native audio", "Only stills", "Only control"], answer: 1, why: "Veo balances realism, audio, and resolution." },
      { q: "Smart cost strategy?", options: ["Finalize everything on premium", "Draft cheap, finalize keepers on the best", "Never draft", "Ignore cost"], answer: 1, why: "Drafting cheap and finalizing selectively controls spend." },
    ],
    resources: [
      { label: "Model cheat-sheet", note: "Note which model wins which shot type for fast routing." },
      { label: "Best-of-breed pipeline", note: "Still -> animate -> voiceover -> music -> edit/caption." },
    ],
  });

  /* ============================== HeyGen avatars ============================== */
  ACADEMY.register({
    id: "heygen-avatars",
    title: "AI Avatars & Talking-Head Video (HeyGen)",
    tagline: "Turn a script into a lifelike presenter — in 175+ languages.",
    category: "Video & Avatars",
    icon: "🧑‍💼",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~75 min",
    instructor: { name: "Mara Quinn", role: "Avatar Video Producer", persona: "polished, efficient", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Talking-head", "Dubbing"] },
    overview:
      "HeyGen turns a script into a realistic talking-head video — a digital presenter that speaks your words with natural lip-sync. It powers course lessons (like this platform's avatar instructors), marketing, training, and personalized video at scale, and dubs into 175+ languages.\n\nThis track covers creating avatars, scripting for them, voice and dubbing, and producing faceless or branded presenter content.",
    whyItMatters:
      "On-camera video is the highest-trust format and the hardest to produce. Avatars let you publish presenter videos without a camera, a studio, or reshoots.",
    outcomes: [
      "Create and use realistic avatars from a script",
      "Write scripts that avatars deliver naturally",
      "Clone your own avatar/voice ethically",
      "Localize videos into many languages with dubbing",
    ],
    lessons: [
      {
        id: "l1",
        title: "Script-to-video with avatars",
        level: "Beginner",
        duration: "11 min",
        summary: "Type a script, pick a presenter, get a finished talking-head video.",
        sections: [
          { heading: "How it works", body: "Choose an avatar (a stock digital human or your own), pick a voice, paste your script, and HeyGen generates a video of that presenter speaking it with synced lips and natural gestures. No camera, no teleprompter, no reshoots when you change a word — just edit the text and regenerate." },
          { heading: "Where it shines", body: "Avatars are ideal for course lessons, product explainers, onboarding/training, announcements, and personalized sales videos. Anywhere a talking head adds trust but filming is impractical, an avatar fills the gap fast." },
          { heading: "Backgrounds & scenes", body: "Add backgrounds, slides, captions, and B-roll around the avatar to make a polished video, not just a floating head. Treat the avatar as your presenter and build the rest of the scene around them." },
        ],
        keyTakeaways: [
          "Script + avatar + voice = a finished talking-head video.",
          "Great for courses, explainers, training, and personalized sales.",
          "Add backgrounds/slides/captions for a polished result.",
        ],
        settings: [
          { name: "Avatar selection", detail: "Stock digital humans or a custom/cloned avatar." },
          { name: "Voice + language", detail: "Pick a voice and language; pair with your script." },
          { name: "Scene elements", detail: "Backgrounds, slides, captions, B-roll around the avatar." },
        ],
        promptPlaybook: [
          { label: "Lesson script structure", prompt: "Hook (a surprising claim) -> why it matters -> 3 clear points with examples -> a quick recap -> one call to action. Keep sentences short and spoken; address the viewer as 'you'.", why: "A spoken-friendly structure makes avatar delivery feel natural." },
        ],
        proTips: [
          "Write for the ear: short sentences, contractions, direct address.",
          "Change the script and regenerate — never reshoot.",
        ],
        pitfalls: [
          "Pasting dense written prose that sounds robotic when spoken.",
          "A bare talking head with no scene; add visual support.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a 45-second avatar lesson script on one AI tip, using a spoken-friendly structure.",
          starter: "Hook: Most people use AI backwards. Here's the fix... (then why it matters, 3 short points, recap, CTA).",
          hint: "Hook -> why -> points -> recap -> CTA; short spoken sentences.",
          success: "Strong scripts use a hook, clear points, a recap, and a CTA in short, spoken-friendly sentences.",
        },
        narration:
          "HeyGen turns a script into a lifelike presenter. Pick an avatar — a stock digital human or a clone of yourself — choose a voice, paste your script, and it generates a talking-head video with natural lip-sync. Change a word? Edit the text and regenerate. No camera, no studio, no reshoots. That makes avatars perfect for course lessons, explainers, training, and personalized sales videos — anywhere a face builds trust but filming is impractical. The craft is writing for the ear: short sentences, contractions, talk to 'you'. Then build a real scene around the presenter with backgrounds, slides, and captions. It's the fastest way to publish presenter video at scale.",
      },
      {
        id: "l2",
        title: "Your avatar & voice (ethically)",
        level: "Intermediate",
        duration: "11 min",
        summary: "Clone yourself to scale your presence — with consent and quality.",
        sections: [
          { heading: "Custom avatars", body: "HeyGen can create an avatar of you from recorded footage, so your digital twin can present content you don't have time to film. Record clean source footage (good lighting, neutral background, natural delivery) for the best likeness." },
          { heading: "Voice cloning + consent", body: "Pair your avatar with a clone of your voice for a fully personal presenter. As always: only clone yourself or someone who has given explicit consent. Your digital likeness is yours to scale — and only yours to use." },
          { heading: "Interactive & streaming avatars", body: "Beyond pre-rendered videos, avatars can be interactive/real-time for demos, kiosks, and assistants. This turns a presenter into a responsive agent — a face for a chatbot or a live help experience." },
        ],
        keyTakeaways: [
          "Create a custom avatar from clean source footage.",
          "Clone voice only with consent; your likeness is yours.",
          "Interactive avatars enable real-time presenter experiences.",
        ],
        settings: [
          { name: "Custom avatar capture", detail: "Record clean, well-lit footage for a faithful avatar." },
          { name: "Voice clone", detail: "Match your avatar with your cloned voice (consent required)." },
        ],
        features: [
          { name: "Interactive avatars", detail: "Real-time presenter for demos, kiosks, assistants." },
        ],
        proTips: [
          "Record avatar footage with even lighting and minimal movement for a clean twin.",
          "Keep a consistent avatar + voice as your brand's on-screen identity.",
        ],
        pitfalls: [
          "Creating an avatar/voice of someone without explicit consent.",
          "Low-quality source footage producing an uncanny avatar.",
        ],
        exercise: {
          type: "reflect",
          brief: "Plan your custom avatar: what content would your digital twin present, and how would you capture good source footage?",
          hint: "Pick repetitive/scalable content; plan clean lighting and delivery.",
          success: "Good answers pick scalable presenter content and plan clean, consistent source capture, with consent implied (self).",
        },
      },
      {
        id: "l3",
        title: "Localization & scale",
        level: "Advanced",
        duration: "10 min",
        summary: "Translate your presenter into 175+ languages and produce at volume.",
        sections: [
          { heading: "Dubbing & translation", body: "HeyGen can translate and dub videos into 175+ languages while keeping the presenter and adjusting lip-sync to the new language. One recording becomes a globally localized library — a massive reach unlock for courses and marketing." },
          { heading: "Personalized video at scale", body: "Generate many variants from one template — personalized sales or onboarding videos that greet each recipient by name/company. Wire it via API/automation to produce hundreds without manual work." },
          { heading: "Quality and authenticity", body: "Have native speakers review important dubs, and be transparent that content is AI-presented where appropriate. Polish (captions, pacing, scene) still matters — an avatar video competes with real ones, so produce it like one." },
        ],
        keyTakeaways: [
          "Dub one video into 175+ languages with adjusted lip-sync.",
          "Personalize video at scale via templates/API.",
          "Review important dubs; keep production quality high.",
        ],
        features: [
          { name: "Multi-language dubbing", detail: "Translate + re-lip-sync into many languages." },
          { name: "API / templates", detail: "Generate personalized videos at volume." },
        ],
        promptPlaybook: [
          { label: "Localization plan", prompt: "List my top 5 audience languages, then a checklist to localize a course video: translate script, dub, native-speaker review, localized captions/thumbnail.", why: "Turns 'go global' into a concrete, quality-gated plan." },
        ],
        proTips: [
          "Start with your top 2-3 markets; expand once the workflow is smooth.",
          "Localize captions and thumbnails too, not just the spoken audio.",
        ],
        pitfalls: [
          "Publishing unreviewed dubs in key markets.",
          "Treating avatar video as lower-effort — quality still wins.",
        ],
        exercise: {
          type: "reflect",
          brief: "Which 3 languages would you localize into first, and what's your quality-check before publishing?",
          hint: "Pick by audience; review with native speakers + localized captions.",
          success: "Good answers pick languages by audience and include native-speaker review and localized captions/thumbnails.",
        },
      },
    ],
    quiz: [
      { q: "HeyGen primarily creates…", options: ["Music", "Realistic talking-head videos from a script", "Spreadsheets", "3D games"], answer: 1, why: "It turns scripts into lifelike presenter videos." },
      { q: "The rule for cloning your avatar/voice is…", options: ["Anyone is fine", "Only with consent (yourself or permitted)", "Clone celebrities", "No rules"], answer: 1, why: "Likeness/voice cloning requires consent." },
      { q: "How should you write avatar scripts?", options: ["Dense written prose", "For the ear: short, spoken sentences", "No structure", "Only bullet points"], answer: 1, why: "Spoken-friendly writing makes delivery natural." },
      { q: "A major HeyGen scale feature is…", options: ["No languages", "Dubbing into 175+ languages", "Only English", "Static images"], answer: 1, why: "It localizes one video into many languages with lip-sync." },
    ],
    resources: [
      { label: "Write for the ear", note: "Short, spoken sentences and direct address make avatars natural." },
      { label: "Localize fully", note: "Translate audio plus captions and thumbnails for each market." },
    ],
  });
})();
