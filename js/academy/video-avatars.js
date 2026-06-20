/* =============================================================================
   PROMETHEUS · Academy · Video & Avatars
   Four tracks: Sora 2, Google Veo 3.1, Runway Gen-4.5 + Kling 3.0, HeyGen Avatars
   Current as of June 2026.
   ============================================================================= */

// ─── TRACK 1: SORA 2 ─────────────────────────────────────────────────────────
(function () {
  if (!window.ACADEMY) return;
  ACADEMY.register({
    id: "sora",
    title: "Sora 2 Mastery",
    tagline: "Cinematic AI video with physics-accurate motion and synchronized audio — from a single prompt.",
    category: "Video & Avatars",
    icon: "🎬",
    color: "violet",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~80 min",
    instructor: {
      name: "Mara Quinn",
      role: "AI Film Director",
      persona: "Cinematic, decisive, and obsessed with the gap between a mediocre clip and a stunning one — she teaches you to close it.",
      voiceLang: "en-US"
    },
    hero: { tags: ["Updated for 2026", "Hands-on", "Real prompts included"] },
    overview: "Sora 2 is OpenAI's flagship video generation model — built for filmmakers, marketers, and storytellers who need cinematic quality without a crew. It produces 15-to-25-second clips with physics-accurate motion, consistent lighting, and synchronized audio including dialogue, ambient sound, and score — all from a structured natural-language prompt.\n\nThis track teaches you the exact prompting architecture Sora 2 responds to best: how to separate subject, camera, lighting, and audio into distinct layers; how to use image-to-video and the video extension endpoint; and how to work within its real-world constraints — including the API deprecation timeline and the consumer access limitations that affect where and how you can actually run it.",
    whyItMatters: "Sora 2 set the bar for prompt-to-cinematic-quality in 2025 and remains the reference model for understanding how to write structured video prompts. Even as the API sunsets in late 2026, the prompting discipline you build here transfers directly to every other video tool in this category.",
    outcomes: [
      "You will be able to write a structured Sora 2 prompt that separates subject, motion, camera, lighting, and audio into clear layers.",
      "You will be able to use the image-to-video and video extension endpoints via the API.",
      "You will be able to choose the right resolution and duration for your use case and understand the physics consistency trade-offs.",
      "You will be able to apply the four-layer prompt framework to any other AI video tool.",
      "You will be able to identify Sora 2 limitations — temporal length, access restrictions, API sunset — and route around them."
    ],
    lessons: [
      {
        id: "s-l1",
        title: "How Sora 2 Thinks: Model Architecture and Access",
        level: "Beginner",
        duration: "12 min",
        summary: "Understand what Sora 2 actually is, where you can run it, and what the API deprecation means for your workflow.",
        sections: [
          {
            heading: "What Makes Sora 2 Different",
            body: "Sora 2 is a diffusion transformer that models video as a sequence of spacetime patches — not individual frames. This means it maintains physics consistency across the clip: a coffee cup stays the same size as the camera moves, water splashes realistically, and fabric folds follow gravity. It is qualitatively different from earlier frame-by-frame models.\n\nThe model generates video and audio in a single pass. You do not add audio separately — dialogue, ambient sound, and music are inferred from the same prompt that drives the visuals. This unified generation is its core structural advantage over most competitors."
          },
          {
            heading: "Where You Can Actually Use It in 2026",
            body: "Consumer access to Sora 2 is limited. The ChatGPT Plus and Pro tiers include a usage-capped video generation feature, but the full API is the only path to programmatic control. The Videos API supports three endpoints: POST /v1/videos (create), POST /v1/videos/characters (upload reference clips for consistency), and POST /v1/videos/extensions (extend an existing clip).\n\nCritically: OpenAI has announced the Sora 2 API will be deprecated on September 24, 2026. Plan your production pipelines accordingly. The prompting skills you build are model-agnostic and transfer immediately."
          },
          {
            heading: "Resolution and Duration Trade-offs",
            body: "Sora 2 supports clips from 5 to 25 seconds. Shorter clips (5-10 seconds) are faster to generate and show less temporal drift — the tendency of motion to become inconsistent toward the end of a clip. Longer clips (15-25 seconds) require more prompt specificity to maintain coherence.\n\nResolution choices affect detail fidelity. Higher resolutions produce sharper texture and lighting transitions but take longer to generate and cost more API tokens. For social content, 1080p at 10 seconds is the sweet spot. For cinematic preview work, 1080p at 20 seconds is the standard."
          }
        ],
        keyTakeaways: [
          "Sora 2 is a unified video+audio model — audio is not added post-generation.",
          "The API deprecates September 24, 2026; use it now and plan your migration.",
          "Shorter clips maintain physics consistency more reliably than 20-25 second clips.",
          "The character reference endpoint is the only way to maintain subject identity across clips."
        ],
        promptPlaybook: [
          {
            label: "Architecture orientation prompt",
            prompt: "A cinematic 10-second video of a glass marble rolling across a wooden table and falling off the edge in slow motion. Tight tracking shot following the marble. Warm side lighting creates a sharp shadow. The sound of wood grain under glass rolling, then silence, then a distant crack on the floor.",
            why: "Tests Sora 2's physics simulation directly — the marble shadow, rolling resistance, and impact sound all require the unified spacetime model to get right. Use this as a benchmark prompt when evaluating any new model."
          }
        ],
        settings: [
          {
            name: "Duration (5-25 seconds)",
            detail: "Set via the 'duration' parameter in the API. For social content use 8-10 seconds. For cinematic previews use 15-20 seconds. Beyond 20 seconds, add explicit mid-clip scene anchors in your prompt to reduce drift."
          },
          {
            name: "Resolution (720p / 1080p)",
            detail: "Set via the 'resolution' parameter. 1080p is the recommended default for any deliverable content. 720p is faster for iteration and draft review."
          }
        ],
        features: [
          {
            name: "Video Extension Endpoint",
            detail: "POST /v1/videos/extensions accepts an existing video ID and a continuation prompt. Use it to extend a successful clip rather than regenerating from scratch — saves time and preserves the established visual style."
          },
          {
            name: "Character Reference Upload",
            detail: "POST /v1/videos/characters allows you to upload a short reference clip of a person or object. Subsequent generation calls can reference that character ID to maintain visual consistency across clips."
          }
        ],
        business: [
          "Generate cinematic product reveal clips for campaigns without hiring a director or crew.",
          "Build API-driven video pipelines that auto-generate personalized clips at scale before the September 2026 deprecation."
        ],
        life: [
          "Turn a personal memory described in text into a short cinematic clip as a keepsake.",
          "Create visually polished video content for personal projects without learning video editing software."
        ],
        proTips: [
          "Always specify the audio explicitly — Sora 2 generates silence if you do not describe what should be heard.",
          "Use the phrase 'smooth camera movement' to suppress the jittery motion common in rushed prompts.",
          "For image-to-video, describe BOTH the static visual AND the motion you want — the model needs both signals."
        ],
        pitfalls: [
          "Omitting camera direction produces random, often unmotivated motion — always specify whether the camera is static, tracking, or dollying.",
          "Prompting for complex dialogue scenes without a character reference clip produces inconsistent face morphology across frames.",
          "Assuming the API will remain available past September 2026 — migrate pipelines now."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Sora 2 prompt for a 10-second product reveal video. You are revealing a matte-black fountain pen on a marble desk. You need a cinematic feel and synchronized audio.",
          starter: "A cinematic 10-second video of ...",
          hint: "Include: subject description, a specific camera movement, lighting quality, and at least two audio elements. Separate each layer clearly in your prompt.",
          success: "The prompt explicitly names subject, camera motion (not just 'cinematic'), lighting quality, and audio elements. It is specific enough that two different people reading it would picture the same shot."
        },
        narration: "Welcome to your first lesson on Sora 2. Before you write a single prompt, you need to understand what makes this model fundamentally different from anything that came before it. Sora 2 does not generate frames one at a time. It models your scene as a block of space and time simultaneously — which is why a marble rolling across a table actually respects physics, and why the audio you hear was not added afterward. It was generated alongside the video in the same pass. This matters for how you prompt. When you describe a scene, you are not writing a static image caption. You are writing a scene specification — subject, motion, camera, lighting, audio. Each layer is a separate signal the model reads. Collapse them into a vague sentence and you get a vague video. Right now, Sora 2 is accessible via the API and through limited ChatGPT tiers. Know this: the API sunsets September 24, 2026. That is not a reason to skip it — it is a reason to build your skills and migrate early. Everything you learn here transfers directly to Veo 3.1, Runway, and Kling."
      },
      {
        id: "s-l2",
        title: "The Four-Layer Prompt Framework",
        level: "Beginner",
        duration: "14 min",
        summary: "Master the structured prompt architecture that Sora 2 responds to best: subject, camera, lighting, audio.",
        sections: [
          {
            heading: "Why Structure Beats Length",
            body: "Longer prompts do not automatically produce better videos. Sora 2 responds to clarity of intent across four distinct layers: what is happening (subject and action), how we see it (camera), how it is lit (lighting), and what we hear (audio). A 30-word prompt that addresses all four layers outperforms a 100-word wall of adjectives every time.\n\nThink of each layer as a separate instruction to a different crew member: the actor, the camera operator, the gaffer, and the sound designer. Your prompt is the director's briefing."
          },
          {
            heading: "Layer 1: Subject and Action",
            body: "Describe who or what is in the frame and what they are doing — with specificity. 'A woman walking' is weak. 'A woman in a red wool coat walking briskly across a rain-slicked cobblestone street, glancing over her shoulder' is strong. Sora 2 uses the verb you choose to infer motion speed and physics, so action verbs are load-bearing words.\n\nFor objects, describe material and surface — 'a glass vase' versus 'a vase' produces meaningfully different refraction and shadow behavior."
          },
          {
            heading: "Layer 2: Camera",
            body: "Specify camera behavior explicitly. The options are: static (locked off), tracking shot (follows the subject), dolly (moves through space), drone/aerial, close-up, wide establishing, or a named shot type like 'over-the-shoulder.' Combine movement with starting position: 'Low-angle tracking shot following the subject from left to right' is a complete camera instruction.\n\nIf you omit camera direction, Sora 2 defaults to a mid-distance, slightly drifting shot that rarely serves your creative intent."
          },
          {
            heading: "Layers 3 and 4: Lighting and Audio",
            body: "Lighting language borrowed from cinematography works well: golden hour, overcast diffused light, harsh midday sun, neon city glow, candlelit interior. These descriptions activate learned associations with real film footage in the training data.\n\nFor audio, be explicit about ambience, foreground sounds, and music separately. 'Ambient street noise, distant sirens, and a sparse piano melody' gives the model three distinct audio channels to synthesize. 'Moody audio' gives it nothing useful."
          }
        ],
        keyTakeaways: [
          "Structure beats length — four clear layers outperform verbose unfocused prompts.",
          "Action verbs determine motion physics — choose them carefully.",
          "Camera direction is mandatory; omitting it produces unmotivated drift.",
          "Describe audio as three channels: ambience, foreground sounds, music."
        ],
        promptPlaybook: [
          {
            label: "Four-layer street scene",
            prompt: "A cinematic 15-second video of a woman in a red wool coat walking briskly across a rain-slicked cobblestone street at dusk, glancing over her shoulder. Low-angle tracking shot moves with her from left to right. Wet pavement reflects amber streetlamp glow; light rain streaks through lamplight. Ambient street noise, distant traffic, light rain on stone, and a sparse melancholic piano melody.",
            why: "Each of the four layers is explicit and specific. The camera direction, lighting source, and three-channel audio description give the model unambiguous instructions. This prompt consistently produces cinematic results."
          },
          {
            label: "Minimal four-layer product shot",
            prompt: "A 10-second video of a matte-black fountain pen placed on a white marble surface. Static macro shot, slowly pulling back to reveal the full desk. Soft diffused studio lighting from camera left. The subtle sound of a pen placed on stone, then silence.",
            why: "Demonstrates that the framework works at any length — this is 50 words but all four layers are covered. The 'slowly pulling back' camera instruction gives the model a clear motion arc."
          }
        ],
        settings: [
          {
            name: "Aspect ratio (16:9 / 9:16 / 1:1)",
            detail: "Set via the 'aspect_ratio' parameter. 16:9 is standard cinematic. 9:16 is required for vertical social (Reels, TikTok, Shorts). Specify this before generating — cropping after reduces quality."
          }
        ],
        features: [
          {
            name: "Style modifiers",
            detail: "Append a style tag at the end of your prompt — 'Shot on 35mm film,' 'anime style,' 'Studio Ghibli-inspired,' 'documentary handheld.' These activate strong stylistic biases and consistently shift the visual output. Test one style modifier at a time to understand its effect."
          }
        ],
        business: [
          "Apply the four-layer framework to brief video production agencies — it produces more accurate creative briefs than mood boards alone.",
          "Train your marketing team to use this structure for consistent brand-aligned video generation across campaigns."
        ],
        life: [
          "Use the framework to visualize a travel destination before booking — describe it as a scene and generate a preview clip.",
          "Write four-layer prompts as a creative journaling practice for capturing visual ideas."
        ],
        proTips: [
          "Write your prompt in a text editor, then read each layer aloud as if briefing a crew member — if you stumble, the layer is unclear.",
          "Save successful four-layer prompts as templates and swap only the subject layer for rapid variations.",
          "The style modifier is the fifth optional layer — add it last and only once the first four are locked."
        ],
        pitfalls: [
          "Stacking multiple camera movements in one prompt ('dolly in then pan right then tilt up') confuses the model — pick one movement per clip.",
          "Using abstract emotional adjectives as substitutes for specific descriptions — 'emotional' is not a layer."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Sora 2 prompt using the four-layer framework for a 12-second video of a chef plating a dish in a professional kitchen. Each layer must be explicitly present.",
          hint: "Label each layer in your draft (Subject / Camera / Lighting / Audio) before removing the labels. This forces deliberate coverage.",
          success: "The finished prompt contains a specific action verb, a named camera movement, a lighting source or quality word, and at least two distinct audio elements — all in under 80 words."
        },
        narration: "The single biggest improvement most people can make to their Sora 2 output costs them nothing except clarity. You are going to stop writing prompts as paragraphs and start writing them as four distinct layers. Here is what I mean. When a film director walks onto set, they brief four different people: the actor gets the character and the action. The camera operator gets the shot type and the movement. The gaffer gets the lighting setup. The sound designer gets the ambience and the score. Your prompt is that briefing. If you only talk to the actor and forget the camera operator, you get a great performance in a randomly framed shot. Layer one is subject and action — be specific about what is moving and how fast. Layer two is camera — pick one movement and name it. Layer three is lighting — borrow language from cinematography, not interior design. Layer four is audio — describe three channels: ambience, foreground sound, and music. Four layers, under eighty words, every time. That discipline will take your output from forgettable to striking."
      },
      {
        id: "s-l3",
        title: "Image-to-Video and Scene Extension",
        level: "Intermediate",
        duration: "15 min",
        summary: "Use Sora 2's image input and video extension endpoints to build multi-shot sequences with consistent subjects.",
        sections: [
          {
            heading: "Image-to-Video: Giving the Model a Visual Anchor",
            body: "When you provide an image as input alongside a text prompt, Sora 2 uses that image as the first frame of the generated video. This is the primary mechanism for subject consistency — instead of describing a person in text and hoping the model interprets them correctly, you show the model exactly who or what the subject is.\n\nFor best results, your image should be high-resolution, well-lit, and show the subject in a neutral pose without strong camera distortion. The model carries forward the colors, lighting tone, and subject appearance from the reference image."
          },
          {
            heading: "Writing the Motion Prompt for Image-to-Video",
            body: "When using image-to-video, your prompt must describe motion rather than appearance — the image handles appearance. If your image shows a woman standing in a kitchen, your text prompt should say 'She reaches forward and begins kneading bread dough, flour rising in a soft cloud. Camera slowly zooms in on her hands. Kitchen ambience and the rhythmic sound of dough on wood.' The appearance is already established; you are now directing the action.\n\nA common mistake is repeating the visual description from the image in the text prompt. This wastes your prompt budget on information the model already has."
          },
          {
            heading: "Video Extension: Continuing a Strong Clip",
            body: "The POST /v1/videos/extensions endpoint takes an existing video ID and a continuation prompt. The model uses the final frames of your clip as the new first frame, applying the same subject appearance, lighting, and camera style to the continuation.\n\nThis is how you build multi-shot sequences: generate a strong establishing shot, extend it into a closer shot, extend again for a reaction or detail. Each extension maintains visual continuity without regenerating from scratch. The continuation prompt should describe what happens next — not re-describe what already happened."
          }
        ],
        keyTakeaways: [
          "Image-to-video uses your image as the first frame — remove visual description from your text prompt and focus on motion.",
          "The extension endpoint chains clips while preserving subject appearance and lighting continuity.",
          "Build sequences by extension rather than regeneration — faster and more consistent.",
          "Always reference the video ID returned by the create endpoint when calling the extension endpoint."
        ],
        promptPlaybook: [
          {
            label: "Image-to-video motion prompt",
            prompt: "She reaches forward and begins kneading bread dough on a floured wooden surface, flour lifting in a soft cloud. Camera slowly zooms toward her hands. Kitchen ambience, the rhythmic thud of dough on wood, and a warm acoustic guitar melody in the background.",
            why: "Written for use with a reference image of a woman in a kitchen. The prompt contains zero visual description — all motion, camera, and audio. The image supplies everything else."
          },
          {
            label: "Video extension continuation prompt",
            prompt: "The camera cuts to a close-up of the finished loaf cooling on a wire rack, steam rising gently. Static shot. Warm afternoon light through a window. The sound of a timer clicking off and the quiet of a satisfied kitchen.",
            why: "Describes only what happens after the previous clip ends. The model carries forward the kitchen environment, lighting tone, and audio character from the base clip."
          }
        ],
        settings: [
          {
            name: "Image input (image-to-video)",
            detail: "Accepted formats: JPEG, PNG, WebP. Maximum resolution 4096px on longest edge. The image is used as the starting frame — not a style reference. Ensure the subject is clearly visible and the composition matches your intended starting shot."
          }
        ],
        features: [
          {
            name: "Character reference clips",
            detail: "POST /v1/videos/characters accepts a short video clip (3-10 seconds) of a person or object. Returns a character_id you can include in subsequent video generation calls. This is the most reliable way to maintain face consistency across a multi-clip project."
          }
        ],
        business: [
          "Build a product demo sequence: image-to-video for the first shot, extensions for close-ups and detail reveals — no reshoots.",
          "Use character reference clips to create a consistent brand spokesperson across multiple campaign videos without a recurring studio booking."
        ],
        life: [
          "Animate a still photograph from a family event into a short motion clip using image-to-video.",
          "Extend a strong generated clip into a longer personal creative film using the extension endpoint."
        ],
        proTips: [
          "Save successful video IDs immediately — you cannot retrieve them later in all API implementations, and you need the ID to call the extension endpoint.",
          "For character consistency, upload a 5-second walking reference clip rather than a static image — the model learns motion as well as appearance."
        ],
        pitfalls: [
          "Describing the appearance of the subject in your text prompt when using image-to-video — you are wasting characters the model ignores in favor of the image.",
          "Extending a clip that already has temporal drift — the drift compounds. Only extend clips where the first clip is clean and consistent."
        ],
        exercise: {
          type: "prompt",
          brief: "You have a high-resolution image of a barista behind a coffee bar. Write the image-to-video motion prompt that would animate this image into a 10-second clip of the barista pulling an espresso shot.",
          hint: "Write zero visual description — the image already covers that. Focus entirely on: action, camera movement, and audio. Under 60 words.",
          success: "The prompt contains only motion, camera, and audio direction. No physical description of the barista or the coffee bar. The action is specific enough to produce consistent results across multiple generations."
        },
        narration: "Image-to-video is where Sora 2 becomes genuinely useful for professional work, because it solves the hardest problem in AI video: keeping your subject consistent across shots. When you give the model an image, you are handing it the first frame. Your job in the text prompt changes completely — you are no longer describing what the subject looks like. The image does that. You are now purely a motion director. Every word in your prompt should answer one of three questions: what is moving and how, where is the camera and how is it moving, what do we hear. That is it. And once you have a strong clip, do not regenerate it — extend it. The extension endpoint chains from the final frames of your existing clip, so the subject, lighting, and camera style all carry forward. You build a sequence the way a real editor builds one: shot by shot, each one motivated by the one before it. This is how you go from a single AI clip to a coherent multi-shot scene."
      },
      {
        id: "s-l4",
        title: "Audio Prompting and Style Control",
        level: "Intermediate",
        duration: "13 min",
        summary: "Direct Sora 2's unified audio generation to produce synchronized dialogue, sound design, and music.",
        sections: [
          {
            heading: "Understanding Unified Audio Generation",
            body: "Sora 2 generates audio in the same pass as the video — not as a post-process. This means the audio is temporally synchronized with the visual events: a door slamming in the video produces the slam sound at the exact right frame. This synchronization is the key advantage over tools that layer audio separately.\n\nThe trade-off is that you cannot control audio and video independently. If you want a very specific music track, you will need to replace the generated audio in post. But for ambient sound, sound effects, and general tonal music, the unified generation is faster and more coherent than any post-production workflow."
          },
          {
            heading: "Three-Channel Audio Architecture",
            body: "Think of Sora 2 audio as three mixing channels that you describe separately in your prompt: the ambient layer (the sonic environment — a forest, a busy street, a quiet library), the foreground sound layer (specific triggered sounds — footsteps, a coffee machine, breaking glass), and the music layer (style, instrumentation, tempo, mood).\n\nDescribe each channel with the specificity of a sound designer's brief. 'Sparse piano melody in a minor key' is a better instruction than 'sad music.' 'The rhythmic hiss of espresso extraction followed by milk steaming' is better than 'coffee shop sounds.'"
          },
          {
            heading: "Style Control: Visual Registers",
            body: "Sora 2 responds strongly to cinematographic style references. Append one style modifier per prompt — do not stack more than two. Effective style tags include: 'Shot on 16mm film with visible grain,' '1970s Technicolor palette,' 'handheld documentary style,' 'Studio Ghibli-inspired animation,' 'architectural visualization rendering,' and 'high-speed slow motion at 240fps.'\n\nStyle modifiers work because the training data includes labeled film footage and photography. You are activating learned associations, not describing visual properties from scratch."
          }
        ],
        keyTakeaways: [
          "Audio is generated in-sync with video — temporal alignment is automatic.",
          "Describe audio as three separate channels: ambient, foreground, music.",
          "Use music descriptors that include instrumentation and tempo, not just mood.",
          "Apply no more than two style modifiers per prompt — stacking degrades coherence."
        ],
        promptPlaybook: [
          {
            label: "Three-channel audio product clip",
            prompt: "A 15-second cinematic video of a luxury watch being placed on a black velvet surface in a minimalist studio. Slow push-in from mid-shot to macro on the watch face. Hard directional spotlight from camera right creates a sharp glint on the crystal. Ambient silence broken only by the soft click of the watch being set down, the faint tick of the movement, and a single sustained cello note that slowly fades.",
            why: "Three audio channels are explicit: ambient silence (environment), the click and tick (foreground triggers), and the cello note (music). Each channel is specific. The result is a sound design that feels composed, not generated."
          },
          {
            label: "Style-controlled documentary clip",
            prompt: "A 12-second video of an elderly fisherman mending a net on a wooden dock at dawn. Handheld documentary style with slight natural motion blur. Overcast flat morning light, muted blue-green palette. Ambient sound of small waves against wood, distant seabirds, and the scrape of netting on dock planks. No music.",
            why: "'Handheld documentary style' is a single, precise style modifier. 'No music' is an explicit instruction that prevents the model from adding an unwanted score. The ambient and foreground channels are both described."
          }
        ],
        settings: [
          {
            name: "Audio generation (on / off)",
            detail: "Audio is generated by default. To produce a silent video, explicitly write 'No audio' or 'Silent' at the end of your prompt. This is useful when you plan to add custom music or voiceover in post-production."
          }
        ],
        features: [
          {
            name: "Slow motion control",
            detail: "Prompt for slow motion using frame rate language: 'high-speed footage at 120fps,' 'ultra-slow motion at 240fps.' The model interprets these as visual tempo instructions and adjusts motion rendering accordingly. Use slow motion for impact moments — product launches, action beats, emotional close-ups."
          }
        ],
        business: [
          "Generate complete video ads with synchronized sound effects without a sound designer — describe the three audio channels in the prompt.",
          "Use 'No audio' when generating clips for a video library that will be scored with licensed music."
        ],
        life: [
          "Prompt for ambient soundscapes in your generated clips to use as focus or meditation backgrounds.",
          "Add specific music style instructions to personal creative clips to achieve the emotional register you want."
        ],
        proTips: [
          "The word 'silence' is a powerful audio prompt element — use it deliberately to create tension or elegance.",
          "Specify music instrumentation rather than genre: 'acoustic fingerpicked guitar' beats 'folk music' every time.",
          "For dialogue clips, describe the vocal quality and delivery style in addition to what is said."
        ],
        pitfalls: [
          "Assuming the model will generate appropriate music without instruction — it defaults to a generic ambient score that rarely fits.",
          "Describing audio only as an emotional adjective ('dramatic audio') without any sonic specificity."
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Sora 2 prompt for a 12-second video of rain falling on a city street at night. Emphasize the audio design — all three channels must be explicitly described. No music.",
          hint: "For the ambient layer: what does the city rain environment sound like as a constant? For the foreground layer: what specific sound events happen during the clip? For music: explicit 'No music' instruction.",
          success: "The prompt contains distinct ambient, foreground, and music channel instructions. The foreground layer describes at least two specific triggered sound events. 'No music' is explicitly stated."
        },
        narration: "Here is the thing most people get wrong about Sora 2's audio. They treat it as an afterthought — a sentence at the end of the prompt that says 'cinematic audio' or 'ambient sounds.' And then they wonder why the audio feels generic and detached from the visuals. The reason Sora 2 audio works when it works is that it is generated in the same pass as the video. A car door slamming in the video produces the slam at the exact right frame — not because someone synced it, but because the model learned that these events go together. Your job is to specify what events should happen in the audio, not just the mood. Think about it as three channels on a mixing board. The ambient layer is the sonic environment — rain, traffic, an empty room, the hum of a server room. The foreground layer is the triggered events — footsteps, a phone ringing, glass breaking. And the music layer is instrumentation, tempo, and emotional register. Describe each one separately. 'Cinematic audio' tells the model nothing. 'Sparse cello in a minor key, rain on glass, and the soft click of a keyboard' tells the model exactly what to build."
      },
      {
        id: "s-l5",
        title: "Limitations, Workarounds, and Migration Planning",
        level: "Advanced",
        duration: "12 min",
        summary: "Know where Sora 2 breaks, how to route around its constraints, and how to migrate to successor tools before the September 2026 deprecation.",
        sections: [
          {
            heading: "Real Limitations You Will Hit",
            body: "Sora 2 has four limitations that affect production work. First, temporal drift: clips longer than 15 seconds tend to develop inconsistencies — objects change size subtly, lighting shifts without motivation, faces morph. The fix is to work in shorter clips and chain them with the extension endpoint. Second, text rendering: Sora 2 cannot reliably render legible text within a video frame. If you need text on screen, add it in post-production. Third, complex multi-character scenes with dialogue produce face inconsistency without character reference clips. Fourth, the API deprecates September 24, 2026 — this is a hard production deadline."
          },
          {
            heading: "Routing Around the Constraints",
            body: "Temporal drift is the most disruptive limitation in practice. The professional workaround is the modular approach: generate all clips at 8-12 seconds maximum, chain with the extension endpoint for continuity, and assemble the sequence in a video editor. This also gives you more editorial control than a single long clip.\n\nFor text in video, use Sora 2 for the visual environment, then composite text layers in DaVinci Resolve, Premiere, or CapCut. For complex multi-character scenes, pre-generate character reference clips for all named characters before production begins."
          },
          {
            heading: "Migration Path to Successor Tools",
            body: "The four-layer framework you built in this track transfers directly to Veo 3.1, Runway Gen-4.5, and Kling 3.0. The core skills — structured prompting, image-to-video, extension sequences, audio description — are model-agnostic. Your investment in learning Sora 2 is not lost when the API sunsets.\n\nFor teams with active API pipelines: audit your use cases against the alternatives now. Veo 3.1 via Vertex AI is the closest equivalent for cinematic realism and native audio. Runway Gen-4.5 is superior for controlled, precise motion. Kling 3.0 offers the best perceived quality-to-cost ratio for high-volume production."
          }
        ],
        keyTakeaways: [
          "Clips beyond 15 seconds reliably produce temporal drift — stay under 12 seconds for cleanest results.",
          "Text rendering in video frames is unreliable — composite in post.",
          "Character reference clips are mandatory for multi-character dialogue scenes.",
          "The API deprecates September 24, 2026 — your migration plan should be active now."
        ],
        promptPlaybook: [
          {
            label: "Short-clip modular sequence opener",
            prompt: "A cinematic 8-second video of a city skyline at dawn, wide establishing aerial shot slowly descending. Pale peach and gold sky, city lights still on below. Ambient city rumble, distant birds, and a single sustained string note.",
            why: "Eight seconds stays well within the temporal consistency window. This is designed as the first clip in a modular sequence — the aerial descent naturally motivates a cut to street level in the next extension call."
          }
        ],
        settings: [
          {
            name: "Prompt adherence vs. creativity (implicit)",
            detail: "Sora 2 does not expose an explicit creativity/temperature slider in the standard API. To increase adherence, be more specific and prescriptive. To allow more creative interpretation, use fewer constraints and broader descriptors. The model's default leans toward creative interpretation when instructions are vague."
          }
        ],
        features: [
          {
            name: "Remix via extension",
            detail: "The extension endpoint can shift style mid-sequence by changing the continuation prompt's style modifier. Use this to transition from a handheld documentary style to a polished wide shot within the same subject line — a useful technique for narrative films and content series."
          }
        ],
        business: [
          "Audit your current Sora 2 API usage against the September 2026 deadline and document which use cases map to Veo 3.1 versus Runway Gen-4.5.",
          "Build your prompt library now — it is the most portable asset from a Sora 2 workflow."
        ],
        life: [
          "Keep all your successful prompt templates in a personal prompt library — they will work on successor tools with minimal adaptation.",
          "Use the modular clip approach to build a personal short film before the API closes."
        ],
        proTips: [
          "When temporal drift appears in a clip, use that clip's last clean frame as an image input for a fresh generation rather than extending the drifted clip.",
          "Document your character reference clip IDs in a shared team log — they expire if unused and cannot be recovered."
        ],
        pitfalls: [
          "Treating the September 2026 deprecation as a distant deadline — production migrations take longer than you expect.",
          "Attempting to fix temporal drift by adding more descriptive detail to the prompt — drift is a model behavior, not a prompt problem. Shorter clips fix it."
        ],
        exercise: {
          type: "reflect",
          brief: "Map your three most common Sora 2 use cases to the three successor tools covered in this Academy (Veo 3.1, Runway Gen-4.5, Kling 3.0). For each use case, write one sentence explaining why you chose that tool as the migration target.",
          hint: "Consider: does your use case require native audio? Fine motion control? High volume at low cost? Let the answer drive the tool choice.",
          success: "Each use case is mapped to a specific tool with a clear rationale — not just 'it seems similar' but 'it wins on audio sync / motion control / cost per clip.'"
        },
        narration: "Every tool has a ceiling, and knowing where Sora 2's ceiling sits is as valuable as knowing its strengths. Temporal drift is the one you will hit most often in real production work. Past fifteen seconds, the model starts losing track of itself — objects shift size, lighting creeps, faces change. The fix is not a better prompt. The fix is staying under twelve seconds per clip and chaining them. Think in shots, not in continuous takes. The second constraint is text. Sora 2 cannot reliably render legible words inside a video frame. Add text in post, always. Third: the API closes September 24, 2026. That is not hypothetical, it is scheduled. If you have production pipelines running on Sora 2, you need a migration plan today, not in August. The good news is that everything you have learned in this track — the four-layer framework, the image-to-video approach, the audio channel thinking — is model-agnostic. Veo 3.1 responds to the same structure. Runway and Kling do too. Your prompting skills are the durable asset. The model is just the current execution environment."
      }
    ],
    quiz: [
      {
        q: "Which Sora 2 API endpoint allows you to continue a clip from its final frame?",
        options: [
          "POST /v1/videos/characters",
          "POST /v1/videos/extensions",
          "POST /v1/videos/remix",
          "POST /v1/videos/stitch"
        ],
        answer: 1,
        why: "The extension endpoint (POST /v1/videos/extensions) accepts an existing video ID and a continuation prompt, using the final frames of the existing clip as the visual anchor for the new generation."
      },
      {
        q: "What is the primary reason to keep Sora 2 clips under 15 seconds?",
        options: [
          "API cost increases exponentially beyond 15 seconds",
          "Audio generation is not supported for longer clips",
          "Temporal drift — the model loses visual consistency in longer clips",
          "The extension endpoint does not work on clips over 15 seconds"
        ],
        answer: 2,
        why: "Temporal drift is a model-level behavior that increases with clip length. Staying under 12-15 seconds and chaining clips via the extension endpoint is the professional workaround."
      },
      {
        q: "When writing an image-to-video prompt, which of the following should you NOT include?",
        options: [
          "Camera movement direction",
          "Audio channel descriptions",
          "Physical description of the subject's appearance",
          "Action verbs describing what the subject does"
        ],
        answer: 2,
        why: "The input image already establishes the subject's appearance. Repeating that description in the text prompt wastes your prompt budget on information the model already has from the image."
      },
      {
        q: "How should you structure the audio layer of a Sora 2 prompt for best results?",
        options: [
          "One emotional adjective such as 'dramatic' or 'melancholic'",
          "Three channels: ambient environment, foreground sound events, and music/score",
          "A reference to a named artist or film score",
          "Audio genre only — the model infers specific sounds from the genre"
        ],
        answer: 1,
        why: "Three-channel audio description — ambient layer, foreground triggered sounds, and music with instrumentation and tempo — gives the model specific, actionable instructions for each layer of the audio mix."
      },
      {
        q: "The Sora 2 Videos API is scheduled to be deprecated on which date?",
        options: [
          "March 15, 2026",
          "June 30, 2026",
          "September 24, 2026",
          "December 31, 2026"
        ],
        answer: 2,
        why: "OpenAI announced the Sora 2 Videos API deprecation date as September 24, 2026. Production pipelines should be migrated to successor tools before this date."
      }
    ],
    resources: [
      {
        label: "OpenAI Video Generation API documentation",
        note: "The primary reference for endpoint parameters, accepted formats, and usage limits. Read the deprecation notice section carefully if you are building production pipelines."
      },
      {
        label: "Sora 2 Prompting Guide (OpenAI Cookbook)",
        note: "OpenAI's own prompting guide with worked examples. The examples are the most reliable source of prompt patterns that have been validated against the actual model."
      },
      {
        label: "AI Video Generation comparison benchmarks (Artificial Analysis)",
        note: "Independent leaderboard that scores text-to-video models on quality, prompt adherence, and consistency. Use it to validate migration decisions as the landscape shifts post-September 2026."
      }
    ]
  });
})();
