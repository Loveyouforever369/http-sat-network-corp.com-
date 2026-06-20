/* =============================================================================
   PROMETHEUS · Academy · Image & Design
   Midjourney v7, Flux & Ideogram, Adobe Firefly & Canva, and conversational
   image editing (Gemini "Nano Banana" / ChatGPT). Reflects the 2026 landscape.
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== Midjourney ============================== */
  ACADEMY.register({
    id: "midjourney",
    title: "Midjourney Mastery (v7)",
    tagline: "Direct a world-class image model with words and a handful of parameters.",
    category: "Image & Design",
    icon: "🎨",
    color: "purple",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~90 min",
    instructor: { name: "Iris Vale", role: "AI Art Director", persona: "visual, exacting, inspiring", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Parameter playbooks", "Style control"] },
    overview:
      "Midjourney makes the most beautiful images of any mainstream model — but beauty on demand takes craft. The difference between a muddy result and a stunning one is prompt structure plus a few well-chosen parameters.\n\nThis track teaches the anatomy of a Midjourney prompt, the parameters that actually matter (--ar, --stylize, --chaos, --sref, --cref), the web editor and personalization, and repeatable workflows for brand and product work.",
    whyItMatters:
      "Visuals sell. The ability to generate on-brand, original imagery in minutes — without a photographer or stock site — is leverage for any business or creator.",
    outcomes: [
      "Structure prompts that consistently produce strong images",
      "Use the key parameters deliberately instead of guessing",
      "Lock a consistent style and character across many images",
      "Build a repeatable workflow for brand, product, and content visuals",
    ],
    lessons: [
      {
        id: "l1",
        title: "Anatomy of a Midjourney prompt",
        level: "Beginner",
        duration: "11 min",
        summary: "Subject, context, style, and technicals — the four layers of a great prompt.",
        sections: [
          { heading: "Think in layers", body: "A strong image prompt stacks four things: the subject (what it is), the context (setting, action, mood), the style (medium, artists/era, lighting), and technicals (camera, lens, composition). 'A red fox' is weak; 'a red fox curled in fresh snow at golden hour, cinematic, shallow depth of field, 85mm, soft rim light' is direction." },
          { heading: "Be concrete, then add mood", body: "Lead with the concrete scene, then layer adjectives for atmosphere. Specific nouns and verbs anchor the image; mood words (serene, ominous, nostalgic) tune the feeling. Avoid contradictory styles in one prompt — 'photorealistic watercolor anime' confuses the model." },
          { heading: "Aspect ratio sets the frame", body: "Always set --ar to match the use: --ar 16:9 for hero banners and video stills, --ar 9:16 for phone/Stories, --ar 1:1 for avatars, --ar 3:2 for prints. The frame changes the composition the model chooses, so decide it up front." },
        ],
        keyTakeaways: [
          "Stack subject + context + style + technicals.",
          "Concrete scene first, mood second; avoid clashing styles.",
          "Set --ar to the final use before anything else.",
        ],
        settings: [
          { name: "--ar W:H", detail: "Aspect ratio. 16:9 banners, 9:16 vertical, 1:1 avatars, 3:2 prints." },
          { name: "Prompt order", detail: "Front-load the most important elements; Midjourney weights early words more." },
        ],
        promptPlaybook: [
          { label: "Cinematic scene", prompt: "a lone lighthouse on a storm-battered cliff at dusk, dramatic clouds, crashing waves, cinematic lighting, volumetric fog, ultra-detailed, 35mm --ar 16:9", why: "Subject + context + style + technical + frame, in priority order." },
          { label: "Clean product shot", prompt: "matte black wireless headphones on a smooth concrete pedestal, soft studio lighting, minimal, product photography, subtle reflection --ar 1:1", why: "Concrete subject, controlled lighting, square frame for catalog/social." },
        ],
        proTips: [
          "Write prompts like a photo director's brief, not a sentence — comma-separated phrases work great.",
          "Generate 4, pick the closest, then refine — don't expect the first grid to be final.",
        ],
        pitfalls: [
          "Vague subjects ('something cool') — the model fills the void randomly.",
          "Stacking contradictory styles; pick one visual language per image.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Midjourney prompt for a hero banner for an AI startup. Include subject, context, style, technicals, and an aspect ratio.",
          starter: "a glowing neural network sculpture floating in a dark minimalist studio, electric blue and violet light, volumetric haze, futuristic, cinematic, ultra-detailed, 35mm --ar 16:9",
          hint: "Layer subject + setting + style + camera, and add --ar 16:9 for a banner.",
          success: "Strong prompts stack a concrete subject, a vivid context, a coherent style, technical/camera cues, and an aspect ratio that fits the use.",
        },
        narration:
          "A great Midjourney image starts as a great brief. Think in four layers. The subject — what it actually is. The context — the setting, the action, the mood. The style — the medium, the era, the lighting. And the technicals — the camera, the lens, the composition. 'A red fox' is nothing; 'a red fox curled in fresh snow at golden hour, cinematic, shallow depth of field, eighty-five millimeter, soft rim light' is direction. Lead with the concrete scene, then layer mood words to tune the feeling — but never stack clashing styles like photorealistic watercolor anime. And always set your aspect ratio first with the ar parameter, because the frame changes the composition the model reaches for. Direct it like a photographer, and it shoots like one.",
      },
      {
        id: "l2",
        title: "The parameters that matter",
        level: "Intermediate",
        duration: "12 min",
        summary: "Stylize, chaos, raw, weird, no — the dials that change everything.",
        sections: [
          { heading: "--stylize (--s): house style vs. your words", body: "Stylize controls how much Midjourney applies its own aesthetic. Low (--s 0 to 100) sticks closer to your literal prompt; high (--s 250 to 1000) makes it prettier but more 'Midjourney' and less faithful. For brand work where accuracy matters, lower it; for art, raise it." },
          { heading: "--chaos (--c): variety of the grid", body: "Chaos sets how different the four results are from each other. Low chaos gives consistent, safe variations; high chaos (--c 50 to 100) gives wild, divergent options — great for exploration when you don't know what you want yet." },
          { heading: "--raw and --weird", body: "--style raw reduces Midjourney's automatic beautification for a more literal, photographic result — useful for realism and precise control. --weird (--w) injects offbeat, unconventional aesthetics when you want something that doesn't look like everything else." },
          { heading: "--no: negative prompting", body: "Use --no to remove unwanted elements: '--no text, watermark, extra fingers, blur'. It's the cleanest way to subtract problems without rewriting the whole prompt." },
        ],
        keyTakeaways: [
          "--stylize: low = faithful, high = pretty-but-loose.",
          "--chaos: high = divergent exploration, low = consistent.",
          "--style raw for realism; --no to subtract unwanted elements.",
        ],
        settings: [
          { name: "--stylize / --s", detail: "0-1000. Lower for brand accuracy, higher for artistry. Default is mid." },
          { name: "--chaos / --c", detail: "0-100. Raise for variety when exploring, lower for consistency." },
          { name: "--style raw", detail: "Less auto-beautification; more literal/photographic control." },
          { name: "--no", detail: "Negative prompt: list elements to exclude (text, watermark, blur)." },
          { name: "--weird / --w", detail: "0-3000. Unconventional, offbeat aesthetics." },
        ],
        promptPlaybook: [
          { label: "Faithful + realistic", prompt: "candid photo of a barista latte-art pour, morning light through a cafe window, 50mm --style raw --s 80 --ar 3:2 --no text, watermark", why: "Low stylize + raw keeps it literal and photographic; --no cleans artifacts." },
          { label: "Wild exploration", prompt: "concept art of a floating city powered by light --c 60 --s 600 --ar 16:9", why: "High chaos + stylize generates four very different, imaginative directions." },
        ],
        proTips: [
          "Change ONE parameter at a time so you learn what each does to your image.",
          "Save go-to parameter combos as snippets (brand = --style raw --s 100; art = --s 500 --c 30).",
        ],
        pitfalls: [
          "Cranking --s high then wondering why the result ignored your details.",
          "Over-stuffing --no with everything — list only what actually appears.",
        ],
        exercise: {
          type: "prompt",
          brief: "Take a subject and write two versions: one tuned for brand accuracy, one for artistic exploration, using the right parameters.",
          starter: "Brand: product on white, studio lighting --style raw --s 80 --ar 1:1 --no shadow, text\nArt: the same product reimagined as liquid metal sculpture --s 650 --c 50 --ar 1:1",
          hint: "Accuracy = low stylize + raw + --no; exploration = high stylize + chaos.",
          success: "Great answers use low --stylize/--style raw for faithful brand output and higher --stylize/--chaos for divergent artistic options.",
        },
      },
      {
        id: "l3",
        title: "Consistency: --sref, --cref & personalization",
        level: "Advanced",
        duration: "12 min",
        summary: "Lock a style and a character across a whole campaign.",
        sections: [
          { heading: "Style references (--sref)", body: "Pass an image URL after --sref and Midjourney mimics its style — palette, texture, mood — across new subjects. This is how you make 10 images that look like one brand. You can blend multiple refs and weight them with --sw (style weight) for fine control." },
          { heading: "Character / omni references (--cref / --oref)", body: "Character reference keeps the same person or character consistent across scenes — vital for storytelling, mascots, and series content. Provide a reference image and Midjourney carries the identity into new poses and settings." },
          { heading: "Personalization", body: "Midjourney can learn your taste from your ratings and apply it with a personalization flag, biasing results toward what you tend to like. Combined with style refs, it makes 'your look' the default." },
          { heading: "The web editor & retexture", body: "The web app adds an editor: inpaint regions, expand the canvas, vary specific areas, and retexture an image while keeping its shapes. Generate, then edit surgically instead of rerolling from scratch." },
        ],
        keyTakeaways: [
          "--sref locks a visual style across many images.",
          "--cref keeps a character consistent across scenes.",
          "Personalization + the editor make iteration fast and on-brand.",
        ],
        settings: [
          { name: "--sref <url>", detail: "Style reference; add --sw 0-1000 to control how strongly it applies." },
          { name: "--cref <url>", detail: "Character reference for consistent identity across images." },
          { name: "Editor (web)", detail: "Inpaint, expand, vary region, retexture — surgical edits." },
        ],
        promptPlaybook: [
          { label: "Brand-consistent set", prompt: "product lifestyle scene, person using the app in a sunlit kitchen --sref https://your-brand-image.jpg --sw 200 --ar 4:5", why: "The style ref carries your palette/mood across every new scene." },
          { label: "Consistent character", prompt: "the same mascot fox, now giving a presentation on stage, confident --cref https://your-fox.jpg --ar 16:9", why: "Character ref keeps the identity stable across poses and settings." },
        ],
        proTips: [
          "Build a small library of --sref images that define each brand/look you produce.",
          "Use the editor to fix one bad hand or extend a background instead of rerolling the whole grid.",
        ],
        pitfalls: [
          "Expecting perfect character identity every time — refine with the editor and reroll the best.",
          "Mixing too many style refs at once; the look turns muddy.",
        ],
        exercise: {
          type: "reflect",
          brief: "Plan a 5-image brand set. What single --sref look would unify them, and which images would need --cref for a consistent person/mascot?",
          hint: "One style ref for the whole set; character ref where a recurring figure appears.",
          success: "Good plans use one style reference to unify the set and apply character reference only where a recurring person/mascot must stay consistent.",
        },
      },
    ],
    quiz: [
      { q: "What does --ar control?", options: ["Art style", "Aspect ratio / frame", "Randomness", "Resolution only"], answer: 1, why: "Aspect ratio sets the frame and influences composition." },
      { q: "You need brand-accurate, literal output. Which settings?", options: ["High --stylize", "--style raw + lower --stylize", "Max --chaos", "--weird 3000"], answer: 1, why: "Raw + low stylize keeps the model faithful to your prompt." },
      { q: "How do you keep the same character across scenes?", options: ["--ar", "--no", "--cref", "--chaos"], answer: 2, why: "Character reference carries identity into new images." },
      { q: "--chaos high does what?", options: ["More consistent grid", "More divergent, varied results", "Removes text", "Upscales"], answer: 1, why: "High chaos maximizes variety across the four results." },
    ],
    resources: [
      { label: "Parameter snippets", note: "Save your brand and art parameter combos for instant reuse." },
      { label: "--sref library", note: "Keep reference images that define each look you produce." },
    ],
  });

  /* ============================== Flux & Ideogram ============================== */
  ACADEMY.register({
    id: "flux-ideogram",
    title: "Flux & Ideogram: Open Image Power",
    tagline: "Prompt-faithful generation and the best text-in-image in the game.",
    category: "Image & Design",
    icon: "🖼",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Iris Vale", role: "AI Art Director", persona: "technical, resourceful", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Text in images", "Open models"] },
    overview:
      "When you need an image that follows the prompt exactly — or one with readable text like a poster or logo — Midjourney isn't always the answer. Flux (from Black Forest Labs) is prized for prompt adherence and realism, and Ideogram is the leader at rendering legible text and typography.\n\nThis track covers when to use each, how to prompt them, and how open models unlock automation and fine control via tools like ComfyUI and Replicate.",
    whyItMatters:
      "Posters, ads, logos, and thumbnails need words that read correctly and layouts that match the brief. Flux and Ideogram deliver exactly where general art models struggle.",
    outcomes: [
      "Choose Flux vs. Ideogram vs. Midjourney for the job",
      "Generate images with accurate, readable text",
      "Prompt Flux for high prompt-adherence and realism",
      "Understand how open models enable automation and control",
    ],
    lessons: [
      {
        id: "l1",
        title: "Text in images with Ideogram",
        level: "Beginner",
        duration: "10 min",
        summary: "Posters, logos, and thumbnails with words that actually read.",
        sections: [
          { heading: "Why text is hard", body: "Most image models smear text into gibberish because they treat letters as shapes, not language. Ideogram is engineered for typography, so it renders headlines, logos, and labels that are actually legible — a genuine superpower for marketing and design." },
          { heading: "Quote the exact text", body: "Put the words you want in quotes and state where they go: 'a bold poster with the headline \"LAUNCH DAY\" at the top, sans-serif, high contrast'. Being explicit about the string and placement dramatically improves accuracy." },
          { heading: "Magic Prompt & styles", body: "Ideogram's Magic Prompt expands a short idea into a richer prompt; toggle it off when you want literal control. Style presets and references help match a brand look while keeping text crisp." },
        ],
        keyTakeaways: [
          "Ideogram is the go-to for legible text in images.",
          "Quote the exact words and state placement.",
          "Magic Prompt expands ideas; disable for literal control.",
        ],
        settings: [
          { name: "Magic Prompt", detail: "Auto-expands your prompt; turn off for precise, literal results." },
          { name: "Aspect ratio / style", detail: "Set the frame and a style preset to match the use and brand." },
        ],
        promptPlaybook: [
          { label: "Event poster", prompt: "minimalist event poster, headline \"AI SUMMIT 2026\" centered in bold sans-serif, subtitle \"June 20 - San Francisco\" below, electric blue on near-black, lots of negative space", why: "Quoted text + placement + style yields a usable, readable poster." },
          { label: "Logo concept", prompt: "clean wordmark logo reading \"PROMETHEUS\", geometric sans-serif, subtle flame motif in the P, monochrome, vector-style", why: "Ideogram renders the actual letters of a wordmark accurately." },
        ],
        proTips: [
          "Keep on-image text short — a headline and a subtitle read far better than a paragraph.",
          "Generate several and pick the cleanest letterforms; minor fixes are easy in Canva/Photoshop.",
        ],
        pitfalls: [
          "Asking for long paragraphs of text — accuracy drops with length.",
          "Forgetting to quote the exact string, so the model improvises words.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write an Ideogram prompt for a YouTube thumbnail with a 3-word headline and a clear style.",
          starter: "bold YouTube thumbnail, headline \"AI CHANGED EVERYTHING\" in heavy white sans-serif with a thin glow, dramatic dark background, one bright focal element, high contrast --ar 16:9",
          hint: "Quote the short headline, state placement and style, set 16:9.",
          success: "Strong prompts quote a short headline, specify placement/style, and use a 16:9 frame for thumbnails.",
        },
        narration:
          "Here's a problem every creator hits: most image models turn text into gibberish, because they see letters as shapes, not language. Ideogram is built differently — it renders real, legible typography, which makes it the tool for posters, logos, labels, and thumbnails. The trick is simple: put the exact words in quotes and say where they go. 'A bold poster with the headline LAUNCH DAY at the top, sans-serif, high contrast.' Keep the on-image text short — a headline and a subtitle, not a paragraph — and accuracy stays high. Use Magic Prompt to flesh out an idea, or switch it off when you want literal control. When words need to read correctly, reach for Ideogram.",
      },
      {
        id: "l2",
        title: "Flux: adherence & realism",
        level: "Intermediate",
        duration: "11 min",
        summary: "When you need the image to match the prompt precisely.",
        sections: [
          { heading: "Prompt adherence", body: "Flux is known for following complex prompts faithfully — multiple subjects, specific spatial relationships, exact details. When Midjourney 'beautifies' away your requirements, Flux tends to keep them. Write detailed, structured prompts and Flux honors them." },
          { heading: "The Flux family", body: "Flux comes in tiers: a fast/cheap variant for drafts, a balanced 'dev' model, and a top 'pro/ultra' tier for final quality. Match the tier to the stage — draft fast, finalize on the best model. Access is via web apps, Replicate, and other hosts." },
          { heading: "Realism & people", body: "Flux is strong at photorealistic people and scenes with fewer of the classic AI tells. For realism, specify camera, lighting, and skin/texture detail, and keep the style consistent rather than piling on art adjectives." },
        ],
        keyTakeaways: [
          "Flux = high prompt adherence; it keeps your specifics.",
          "Use cheap tiers to draft, the pro tier to finalize.",
          "Great for photorealism — specify camera, light, texture.",
        ],
        settings: [
          { name: "Model tier", detail: "Fast/draft vs. dev vs. pro/ultra — match to the stage of work." },
          { name: "Guidance / steps (advanced hosts)", detail: "On ComfyUI/Replicate, tune guidance and steps for fidelity vs. speed." },
        ],
        promptPlaybook: [
          { label: "Precise multi-subject scene", prompt: "a wooden desk with, from left to right: a green succulent, a silver laptop showing a blue dashboard, and a white coffee mug; soft window light from the right; photorealistic; 35mm", why: "Explicit left-to-right layout is exactly where Flux's adherence shines." },
          { label: "Photoreal portrait", prompt: "studio portrait of a confident founder, natural skin texture, soft key light with subtle rim light, neutral grey backdrop, 85mm, shallow depth of field", why: "Camera + lighting cues drive Flux toward convincing realism." },
        ],
        proTips: [
          "Be explicit about spatial layout ('to the left of', 'in the background') — Flux respects it.",
          "Draft on a fast tier, then regenerate the winner on the pro tier for final quality.",
        ],
        pitfalls: [
          "Treating Flux like Midjourney with vague art words — it rewards specificity instead.",
          "Finalizing on the cheapest tier when quality matters.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Flux prompt that places three specific objects in a defined layout with realistic lighting.",
          starter: "a marble kitchen counter with, left to right: a bowl of lemons, an open cookbook, and a steaming espresso cup; warm morning light from the left; photorealistic; 50mm; shallow depth of field",
          hint: "Name the objects and their explicit positions, plus camera and lighting.",
          success: "Great Flux prompts specify subjects, explicit spatial layout, and camera/lighting cues to leverage its prompt adherence.",
        },
      },
      {
        id: "l3",
        title: "Open models: ComfyUI & automation",
        level: "Advanced",
        duration: "11 min",
        summary: "Why open weights unlock control, scale, and pipelines.",
        sections: [
          { heading: "Why open models matter", body: "Because Flux and similar models are openly available, you can run them via APIs (Replicate, Fal) or locally, wire them into automations, batch-generate hundreds of variants, and control every knob. Closed apps are easier; open models are more powerful and programmable." },
          { heading: "ComfyUI in one minute", body: "ComfyUI is a node-based canvas for image pipelines: load a model, add prompt nodes, control resolution and steps, chain in upscalers and inpainting, and reuse the whole graph as a template. It's the 'pro studio' for people who want exact, repeatable control." },
          { heading: "Automation & batch", body: "Via an API you can generate product shots for a whole catalog, A/B test ad creatives at volume, or plug image generation into an n8n/Make workflow. This is where image AI stops being a toy and becomes infrastructure." },
        ],
        keyTakeaways: [
          "Open models = control, scale, and programmability.",
          "ComfyUI gives node-based, repeatable pipelines.",
          "APIs let you batch and automate generation in workflows.",
        ],
        features: [
          { name: "API access (Replicate/Fal)", detail: "Call models programmatically for batch + automation." },
          { name: "ComfyUI graphs", detail: "Reusable node pipelines: model + prompt + upscale + inpaint." },
        ],
        promptPlaybook: [
          { label: "Batch brief (conceptual)", prompt: "Generate 20 variations of: 'minimalist app icon, rounded square, electric-blue gradient, white lightning glyph, soft shadow' — vary the glyph and gradient angle.", why: "Batch exploration via API surfaces options no single prompt would." },
        ],
        proTips: [
          "Start in a hosted app; graduate to ComfyUI/API only when you need scale or exact control.",
          "Template your ComfyUI graph so every project starts from a known-good pipeline.",
        ],
        pitfalls: [
          "Jumping to ComfyUI before you've mastered prompting — complexity without payoff.",
          "Batch-generating without a quality gate — volume of mediocre isn't useful.",
        ],
        exercise: {
          type: "reflect",
          brief: "Name a repetitive image task in your work that an open-model API + automation could batch (e.g. product shots, ad variants, thumbnails).",
          hint: "Look for 'same template, many inputs' tasks.",
          success: "Good answers identify a templated, high-volume image task where batching via API/automation saves real time.",
        },
      },
    ],
    quiz: [
      { q: "Best tool for a poster with readable text?", options: ["Midjourney", "Ideogram", "A random model", "None can do text"], answer: 1, why: "Ideogram leads at legible typography in images." },
      { q: "Flux is especially known for…", options: ["Ignoring prompts", "High prompt adherence + realism", "Only anime", "Text only"], answer: 1, why: "Flux follows detailed prompts faithfully and does strong realism." },
      { q: "Why use open models via API/ComfyUI?", options: ["They're prettier by default", "Control, scale, and automation", "They need no prompt", "They're always free"], answer: 1, why: "Open weights unlock programmability, batching, and exact control." },
      { q: "To get accurate words in an image you should…", options: ["Hope for the best", "Quote the exact text and state placement", "Use max chaos", "Write a paragraph"], answer: 1, why: "Quoting the string and giving placement boosts text accuracy." },
    ],
    resources: [
      { label: "Tool router", note: "Text/logos → Ideogram; precise/realistic → Flux; painterly/art → Midjourney." },
      { label: "ComfyUI templates", note: "Keep a known-good graph per project type once you scale." },
    ],
  });

  /* ============================== Firefly & Canva ============================== */
  ACADEMY.register({
    id: "firefly-canva",
    title: "Adobe Firefly & Canva: Commercial-Safe Design",
    tagline: "Generate, edit, and ship on-brand design at scale — safely.",
    category: "Image & Design",
    icon: "✒️",
    color: "blue",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~75 min",
    instructor: { name: "Iris Vale", role: "AI Design Lead", persona: "brand-savvy, efficient", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Commercial-safe", "Design at scale"] },
    overview:
      "For business work, two things matter beyond beauty: commercial safety and integration with real design tools. Adobe Firefly is trained on licensed content and is designed to be commercially safe, and it lives inside Photoshop (Generative Fill/Expand). Canva's Magic Studio brings AI to fast, on-brand design for everyone.\n\nThis track covers Firefly generation and editing, Photoshop's generative tools, and Canva's Magic Studio for content at scale.",
    whyItMatters:
      "Marketing and brand teams can't ship images of uncertain provenance. Firefly's commercial safety plus Canva's brand controls make AI design usable in a real business.",
    outcomes: [
      "Use Firefly for commercially safe generation and edits",
      "Master Generative Fill and Expand in Photoshop",
      "Produce on-brand content at volume with Canva Magic Studio",
      "Keep a consistent brand system across AI-made assets",
    ],
    lessons: [
      {
        id: "l1",
        title: "Firefly & commercial safety",
        level: "Beginner",
        duration: "10 min",
        summary: "Why provenance matters and how Firefly is built for business.",
        sections: [
          { heading: "Commercial safety", body: "Adobe trained Firefly on Adobe Stock and licensed/public-domain content, and positions its output as commercially safe — important for brands that can't risk imagery derived from unlicensed work. For client and commercial projects, that provenance is a feature, not a footnote." },
          { heading: "Generation & references", body: "Firefly's web app generates images from prompts and supports structure and style references — match a layout or a look from a reference while changing the content. It also offers generative editing and, increasingly, video and design features." },
          { heading: "Content Credentials", body: "Firefly attaches Content Credentials (provenance metadata) to outputs, so you can demonstrate how an asset was made — useful for transparency and compliance in regulated or brand-sensitive contexts." },
        ],
        keyTakeaways: [
          "Firefly is designed to be commercially safe.",
          "Use structure/style references to match layout or look.",
          "Content Credentials document provenance.",
        ],
        settings: [
          { name: "Structure reference", detail: "Match the composition/layout of a reference image." },
          { name: "Style reference", detail: "Match the look/palette of a reference while changing content." },
        ],
        features: [
          { name: "Content Credentials", detail: "Provenance metadata attached to generated assets." },
        ],
        promptPlaybook: [
          { label: "On-brand hero image", prompt: "a diverse team collaborating in a bright modern office, natural light, optimistic, editorial photography style, lots of copy space on the left", why: "Editorial style + copy space makes it drop-in ready for a marketing banner." },
        ],
        proTips: [
          "For client work, prefer Firefly when provenance and licensing must be defensible.",
          "Use style references to keep a campaign visually consistent.",
        ],
        pitfalls: [
          "Assuming any AI image is automatically safe to use commercially — provenance varies by tool.",
          "Ignoring brand palette/voice; AI output still needs art direction.",
        ],
        exercise: {
          type: "reflect",
          brief: "List two projects where commercial safety/provenance would make you choose Firefly over a general art model.",
          hint: "Think client deliverables, ads, anything published under a brand.",
          success: "Good answers pick commercial/brand contexts where licensing and provenance genuinely matter.",
        },
        narration:
          "For business design, beautiful isn't enough — it has to be safe to use. Adobe Firefly is trained on licensed and public-domain content and built to be commercially safe, which matters enormously when you're shipping work under a client's brand. It generates from prompts, supports structure and style references so you can match a layout or a look, and attaches Content Credentials that document how each asset was made. So when provenance has to be defensible — ads, client deliverables, anything published — Firefly is the responsible default. Pair it with style references to keep a whole campaign consistent, and you get AI speed without the licensing anxiety.",
      },
      {
        id: "l2",
        title: "Generative Fill & Expand in Photoshop",
        level: "Intermediate",
        duration: "11 min",
        summary: "The two AI tools that change everyday photo work forever.",
        sections: [
          { heading: "Generative Fill", body: "Select any region in Photoshop, type what you want, and Firefly fills it convincingly — remove an object, add an element, replace a background. It matches lighting and perspective, blending edits into the original. It's the fastest way to fix or enhance a real photo." },
          { heading: "Generative Expand", body: "Extend the canvas beyond the original frame and Firefly invents plausible surroundings — turn a square into a banner, or give a cramped photo breathing room. Perfect for repurposing one image into many aspect ratios." },
          { heading: "Prompt the selection", body: "Edits are local: the selection plus a short prompt. 'Remove the trash can', 'add soft clouds', 'extend the beach to the right'. Small, targeted edits beat regenerating the whole image — you keep everything that already works." },
        ],
        keyTakeaways: [
          "Generative Fill edits a selected region from a text prompt.",
          "Generative Expand invents new canvas for any aspect ratio.",
          "Keep edits local and targeted; preserve what works.",
        ],
        settings: [
          { name: "Selection + prompt", detail: "Marquee/lasso a region, then describe the change." },
          { name: "Leave prompt empty", detail: "Empty Generative Fill removes/heals a selection using context." },
        ],
        promptPlaybook: [
          { label: "Repurpose to a banner", prompt: "[Generative Expand the sides] extend the scene naturally to a 16:9 frame, keep the subject centered", why: "One photo becomes a wide banner without reshooting." },
          { label: "Clean a product photo", prompt: "[Select the background] replace with a soft neutral studio gradient, matching the existing light direction", why: "Local edit fixes the background while keeping the product untouched." },
        ],
        proTips: [
          "Empty-prompt Generative Fill is the best object remover available.",
          "Expand once into multiple ratios (1:1, 4:5, 16:9) to repurpose a single hero shot.",
        ],
        pitfalls: [
          "Selecting too tightly — give the fill a little margin to blend.",
          "Over-editing until it looks fake; stop when it's believable.",
        ],
        exercise: {
          type: "reflect",
          brief: "Take a photo you have and plan three edits: one removal (Fill), one addition (Fill), one reframe (Expand).",
          hint: "Think object removal, adding an element, and extending to a new aspect ratio.",
          success: "Good plans use Generative Fill for local add/remove and Generative Expand to reframe for a new use.",
        },
      },
      {
        id: "l3",
        title: "Canva Magic Studio at scale",
        level: "Intermediate",
        duration: "11 min",
        summary: "On-brand design for non-designers — and bulk content for teams.",
        sections: [
          { heading: "Magic Studio basics", body: "Canva's Magic Studio bundles AI across design: Magic Design turns a prompt or asset into full layouts, Magic Write drafts copy, Magic Media generates images/video, and Magic Edit/Grab edits photos. It's the fastest path from idea to a finished, shareable design." },
          { heading: "Brand Kit keeps it on-brand", body: "Set your logos, fonts, and color palette in a Brand Kit and apply them in one click. AI generations and templates snap to your brand, so non-designers produce consistent, professional output." },
          { heading: "Bulk & repurpose", body: "Canva's Bulk Create and Resize turn one design into dozens — many products from a spreadsheet, or one graphic resized for every platform. This is content-at-scale for social and marketing teams without a designer in the loop for every asset." },
        ],
        keyTakeaways: [
          "Magic Studio = AI design, copy, images, and edits in one place.",
          "Brand Kit makes everything snap to your brand.",
          "Bulk Create + Resize scale one design into many.",
        ],
        settings: [
          { name: "Brand Kit", detail: "Logos, fonts, colors applied in one click across designs." },
          { name: "Resize", detail: "Reformat a design to every platform's dimensions instantly." },
        ],
        features: [
          { name: "Magic Design / Write / Media", detail: "Generate layouts, copy, and images/video from prompts." },
          { name: "Bulk Create", detail: "Generate many variants from a data table." },
        ],
        promptPlaybook: [
          { label: "Magic Design brief", prompt: "Create a 5-slide Instagram carousel teaching '3 AI prompts that save an hour a day', bold minimalist style, brand colors, big headlines, one tip per slide.", why: "A clear structure + style + brand yields a near-final carousel fast." },
          { label: "Magic Write caption", prompt: "Write 3 punchy captions for this carousel, each under 150 characters, with a hook and one CTA, no hashtags.", why: "Generates ready-to-post copy matched to the design." },
        ],
        proTips: [
          "Set the Brand Kit first; every generation then stays on-brand automatically.",
          "Design once, Resize to every platform — don't rebuild per channel.",
        ],
        pitfalls: [
          "Shipping template output that still looks generic — tweak to stand out.",
          "Skipping the Brand Kit, then fixing colors/fonts by hand on every asset.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Canva Magic Design prompt for a piece of content you need this week, including format, topic, style, and brand cues.",
          starter: "Create a 5-slide LinkedIn carousel on '[topic]', clean modern style, brand colors, one idea per slide, bold headlines and a final CTA slide.",
          hint: "Specify format, topic, style, structure, and brand.",
          success: "Strong Canva prompts specify the format, topic, style, slide structure, and brand cues for near-final output.",
        },
      },
    ],
    quiz: [
      { q: "Why pick Firefly for client/commercial work?", options: ["It's the only AI", "Designed to be commercially safe (licensed training)", "It's free", "It makes video only"], answer: 1, why: "Firefly's licensed training and Content Credentials make it commercially defensible." },
      { q: "Generative Fill in Photoshop does what?", options: ["Edits a selected region from a prompt", "Only crops", "Generates music", "Schedules posts"], answer: 0, why: "Select a region, describe the change, and Firefly fills it to match." },
      { q: "Best way to keep Canva output on-brand?", options: ["Fix colors by hand each time", "Set a Brand Kit", "Use random templates", "Avoid templates"], answer: 1, why: "A Brand Kit applies your logos, fonts, and colors in one click." },
      { q: "Generative Expand is for…", options: ["Removing text", "Extending the canvas to new aspect ratios", "Writing copy", "Tuning chaos"], answer: 1, why: "It invents plausible new canvas to reframe an image." },
    ],
    resources: [
      { label: "Brand Kit first", note: "Set brand assets before generating so everything stays consistent." },
      { label: "One image, many ratios", note: "Use Expand/Resize to repurpose a single hero into every format." },
    ],
  });

  /* ============================== Conversational image editing ============================== */
  ACADEMY.register({
    id: "gemini-image-editing",
    title: "AI Image Editing: Gemini (Nano Banana) & ChatGPT",
    tagline: "Edit images by chatting — keep what works, change only what you ask.",
    category: "Image & Design",
    icon: "🪄",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~65 min",
    instructor: { name: "Iris Vale", role: "AI Image Editor", persona: "playful, precise", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Conversational edits", "Consistency"] },
    overview:
      "The newest image breakthrough isn't generating from scratch — it's editing by conversation. Google's Gemini native image model (nicknamed 'Nano Banana') and ChatGPT's image tools let you upload a picture and change it with plain language while keeping everything else consistent.\n\nThis track teaches conversational editing, character/product consistency, and practical edits for marketing, e-commerce, and everyday life.",
    whyItMatters:
      "Most real work is editing, not creating: fix this product photo, put my character in a new scene, restyle this room. Conversational editing makes that a sentence, not a Photoshop session.",
    outcomes: [
      "Edit images with natural-language instructions",
      "Keep a character or product consistent across edits",
      "Combine multiple images into one coherent result",
      "Apply it to product photos, marketing, and personal projects",
    ],
    lessons: [
      {
        id: "l1",
        title: "Editing by conversation",
        level: "Beginner",
        duration: "10 min",
        summary: "Upload, describe the change, iterate — no tools, no layers.",
        sections: [
          { heading: "The new workflow", body: "Upload an image and just say what to change: 'make it nighttime', 'remove the person on the left', 'change the shirt to red', 'put this product on a marble counter'. The model edits only what you asked and keeps the rest consistent — no selections, no masks, no layers." },
          { heading: "Iterate in turns", body: "Editing is a conversation: make one change, look, then refine — 'a bit warmer', 'now add soft morning light', 'undo the hat'. Small sequential edits give you control and predictability, like art-directing a retoucher." },
          { heading: "Be specific about what stays", body: "Tell it what to preserve: 'keep her face and pose exactly the same, only change the background'. Naming what should NOT change is as important as naming what should." },
        ],
        keyTakeaways: [
          "Describe the change; the model edits locally and keeps the rest.",
          "Iterate in small turns for control.",
          "Say what should stay the same, not just what changes.",
        ],
        promptPlaybook: [
          { label: "Background swap", prompt: "Keep the subject, pose, and lighting exactly the same. Replace only the background with a softly blurred modern office.", why: "Naming what to preserve prevents the model from changing the subject." },
          { label: "Restyle a room", prompt: "Same room and camera angle. Restyle it as warm Scandinavian minimalist: light wood, cream tones, a few plants. Keep the window where it is.", why: "Anchors (angle, window) keep the edit believable and useful." },
        ],
        proTips: [
          "One change per turn when precision matters — it's easier to steer.",
          "Always state the anchors that must not change (face, layout, product shape).",
        ],
        pitfalls: [
          "Asking for five changes at once, then not knowing which instruction caused a problem.",
          "Forgetting to lock identity, so a person's face subtly shifts.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a conversational edit that changes a background while explicitly preserving the subject.",
          starter: "Keep the person, their pose, and the lighting identical. Replace only the background with a sunlit beach at golden hour, softly out of focus.",
          hint: "State the change and, just as clearly, what must stay the same.",
          success: "Strong edit prompts specify the single change and explicitly name the elements that must be preserved.",
        },
        narration:
          "The biggest shift in image AI isn't making pictures from nothing — it's editing the ones you have, just by talking. Upload a photo and say what to change: make it nighttime, remove the person on the left, put this product on a marble counter. Google's Gemini image model — the one people nicknamed Nano Banana — and ChatGPT's image tools edit only what you asked and keep the rest consistent. No masks, no layers. Work in turns: one change, look, refine — a bit warmer, add morning light, undo the hat. And here's the pro move most people miss: say what should stay the same. 'Keep her face and pose exactly, change only the background.' Name the anchors, and the edits stay believable.",
      },
      {
        id: "l2",
        title: "Consistency & combining images",
        level: "Intermediate",
        duration: "11 min",
        summary: "Keep a character or product identical across scenes, and fuse multiple inputs.",
        sections: [
          { heading: "Character & product consistency", body: "The standout strength of the latest editors is keeping the same subject consistent across many images — your mascot, your model, your product — in new poses and settings. Provide the reference and ask for the new scene; the identity carries over. This unlocks real campaigns and storytelling." },
          { heading: "Multi-image fusion", body: "You can feed several images and combine them: put this person in that location wearing these shoes, or place this product into that lifestyle scene. The model blends them with consistent lighting and perspective." },
          { heading: "E-commerce & marketing", body: "These edits map directly to money: generate a product in ten lifestyle settings from one photo, create model shots without a shoot, or localize a campaign by swapping backgrounds. Fast, consistent, on-brand visuals at a fraction of the cost." },
        ],
        keyTakeaways: [
          "Latest editors keep a subject consistent across scenes.",
          "Fuse multiple images into one coherent result.",
          "Directly useful for e-commerce and marketing visuals.",
        ],
        features: [
          { name: "Subject consistency", detail: "Carry the same character/product into new scenes." },
          { name: "Multi-image input", detail: "Combine person + place + product into one image." },
        ],
        promptPlaybook: [
          { label: "Product in lifestyle scenes", prompt: "Using this product photo, place the exact same bottle (same label and shape) on a bathroom shelf in soft morning light, then on a spa stone, then on a marble vanity. Keep the product identical in all three.", why: "One product photo becomes a whole lifestyle set, consistently." },
          { label: "Fuse inputs", prompt: "Put the person from image 1 into the cafe from image 2, wearing the jacket from image 3. Match the cafe's lighting on the person.", why: "Combines three references into a believable single scene." },
        ],
        proTips: [
          "Provide a clean, well-lit reference of the subject — better input, better consistency.",
          "Generate a batch of scenes from one product photo to fill a catalog or feed.",
        ],
        pitfalls: [
          "Expecting perfect consistency on tiny details (logos/text) — verify and touch up.",
          "Combining images with clashing light; ask the model to match lighting explicitly.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick a product or character you have. List five scenes you'd generate from one reference to build a consistent set.",
          hint: "Same subject, five different believable settings/uses.",
          success: "Good answers reuse one reference across five varied scenes that would form a coherent, on-brand set.",
        },
      },
    ],
    quiz: [
      { q: "The core idea of conversational image editing is…", options: ["Drawing masks manually", "Describing changes in plain language", "Writing code", "Only generating from scratch"], answer: 1, why: "You say what to change; the model edits locally and keeps the rest." },
      { q: "Besides the change, what should you always specify?", options: ["The file size", "What must stay the same", "The model version", "The price"], answer: 1, why: "Naming anchors (face, pose, product shape) keeps edits believable." },
      { q: "A standout strength of the latest editors is…", options: ["Music", "Subject/character consistency across scenes", "Spreadsheets", "Code review"], answer: 1, why: "Keeping the same subject consistent unlocks campaigns and stories." },
      { q: "A direct business use is…", options: ["Mining crypto", "One product photo into many lifestyle scenes", "Writing legal contracts", "Hosting video calls"], answer: 1, why: "Consistent product edits replace expensive multi-scene shoots." },
    ],
    resources: [
      { label: "Anchor your edits", note: "Always state what must NOT change to keep results believable." },
      { label: "One photo, many scenes", note: "Build a consistent product/character set from a single reference." },
    ],
  });
})();
