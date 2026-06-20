/* =============================================================================
   PROMETHEUS · Academy · Audio, Voice & Music
   ElevenLabs, Suno & Udio, and voice cloning / audio workflows.
   Reflects the 2026 landscape (expressive TTS, AI music, ethical cloning).
   ============================================================================= */
(function () {
  if (!window.ACADEMY) return;

  /* ============================== ElevenLabs ============================== */
  ACADEMY.register({
    id: "elevenlabs",
    title: "ElevenLabs: Voice, TTS & Dubbing",
    tagline: "Studio-grade AI voices for narration, characters, and 30+ languages.",
    category: "Audio, Voice & Music",
    icon: "🎙",
    color: "purple",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~80 min",
    instructor: { name: "Theo Sound", role: "Audio AI Producer", persona: "warm, detail-driven", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Voice settings", "Dubbing"] },
    overview:
      "ElevenLabs makes the most natural AI voices available — good enough for audiobooks, ads, characters, and yes, course narration like this platform's. The craft is in the voice settings, the input formatting, and using the right feature (TTS, Studio, dubbing, or agents) for the job.\n\nThis track covers generating great speech, the stability/similarity/style controls, ethical voice cloning, and dubbing your content into many languages.",
    whyItMatters:
      "Voice is the most intimate medium. Professional narration used to need a booth and talent; now it's a text box — if you know how to direct it.",
    outcomes: [
      "Generate natural speech and tune the voice settings",
      "Format text so the model reads it expressively",
      "Clone voices responsibly with consent",
      "Dub videos and content into many languages",
    ],
    lessons: [
      {
        id: "l1",
        title: "Great speech & the voice settings",
        level: "Beginner",
        duration: "12 min",
        summary: "Stability, similarity, and style — the three dials that shape every voice.",
        sections: [
          { heading: "Pick a model and a voice", body: "ElevenLabs offers voices from its library plus a choice of models that trade quality for speed and latency. For narration, choose a high-quality model and a voice whose tone fits your content; for real-time apps, a faster, lower-latency model. The voice + model combo sets the baseline before you tune anything." },
          { heading: "The three core settings", body: "Stability controls consistency vs. expressiveness: high is steady and predictable, low is more emotional but can wobble. Similarity (clarity) controls how closely it matches the original voice. Style exaggeration pushes the voice's character — powerful but use sparingly. For audiobooks, moderate stability; for dramatic reads, lower it." },
          { heading: "Direct with the text", body: "Punctuation is direction: commas and periods create natural pauses, ellipses slow it down, and clear sentence structure improves pacing. Write for the ear — short sentences, deliberate punctuation — and the read transforms." },
        ],
        keyTakeaways: [
          "Voice + model set the baseline; pick for quality vs. latency.",
          "Stability = steady vs. expressive; Similarity = match; Style = character.",
          "Punctuation and sentence structure are how you direct pacing.",
        ],
        settings: [
          { name: "Stability", detail: "Higher = consistent/steady; lower = expressive but variable. Narration: moderate." },
          { name: "Similarity / Clarity", detail: "How closely to match the source voice; raise for fidelity." },
          { name: "Style exaggeration", detail: "Amplifies the voice's character; use sparingly to avoid artifacts." },
          { name: "Model choice", detail: "High-quality for narration; low-latency for real-time apps." },
        ],
        promptPlaybook: [
          { label: "Format text for narration", prompt: "Welcome to Prometheus. Today, you'll learn one idea that changes everything... Take a breath. Ready? Let's begin.", why: "Ellipses and short sentences create natural pauses and pacing." },
        ],
        proTips: [
          "Tune one setting at a time and re-listen — small changes matter a lot.",
          "For long content, keep settings consistent across chapters so the voice doesn't drift.",
        ],
        pitfalls: [
          "Cranking style exaggeration high and getting artifacts/instability.",
          "Pasting unpunctuated walls of text and wondering why pacing is flat.",
        ],
        exercise: {
          type: "reflect",
          brief: "For a 5-minute course narration, what stability/similarity/style settings would you start with, and why?",
          hint: "Think steady-but-warm for teaching; moderate stability, high similarity, low style.",
          success: "Good answers pick moderate stability, high similarity, and restrained style for clear, consistent narration, with reasoning.",
        },
        narration:
          "ElevenLabs makes voices so natural they narrate audiobooks and ads — and courses like this one. The craft is in three dials. Stability: high is steady and predictable, low is more emotional but can wobble. Similarity: how closely it matches the original voice. And style: how much it pushes the voice's character — powerful, but a little goes a long way. Pick a quality model and a fitting voice first, then tune. And remember: your punctuation is direction. Commas and periods make pauses, ellipses slow things down, short sentences pace the read. Write for the ear, tune one setting at a time, and you'll turn a text box into a studio.",
      },
      {
        id: "l2",
        title: "Voice cloning, Studio & SFX",
        level: "Intermediate",
        duration: "12 min",
        summary: "Clone a voice (ethically), produce long-form audio, and generate sound effects.",
        sections: [
          { heading: "Voice cloning with consent", body: "ElevenLabs can clone a voice from a sample — instantly from a short clip, or with higher fidelity from more audio. The non-negotiable rule: only clone voices you own or have explicit permission to use. Cloning someone without consent is unethical and often illegal. Used rightly, it lets a creator scale their own voice." },
          { heading: "Studio for long-form", body: "Studio (long-form projects) is for audiobooks, podcasts, and multi-section narration: paste a long script, assign voices per section or character, and manage pacing across a whole project rather than clip by clip. It's how you produce hours of consistent audio." },
          { heading: "Sound effects & design", body: "Beyond speech, ElevenLabs can generate sound effects from text descriptions — footsteps, ambience, UI sounds, whooshes. Combined with voice, you can score a video or game prototype entirely from prompts." },
        ],
        keyTakeaways: [
          "Clone only with ownership/consent — always.",
          "Studio manages long-form, multi-voice projects.",
          "Generate SFX from text to round out productions.",
        ],
        settings: [
          { name: "Instant vs. professional clone", detail: "Quick clone from a short clip; professional clone from more audio for fidelity." },
          { name: "Studio projects", detail: "Long-form editor: per-section voices, pacing, exports." },
        ],
        features: [
          { name: "Sound effects", detail: "Generate SFX/ambience from text prompts." },
        ],
        promptPlaybook: [
          { label: "SFX from text", prompt: "A soft electronic UI confirmation chime, short, clean, two notes rising, subtle reverb.", why: "Describe timbre, length, and motion for a usable sound effect." },
        ],
        proTips: [
          "Record clone samples in a quiet room with consistent tone for the best result.",
          "In Studio, keep one voice per character and reuse it across episodes for continuity.",
        ],
        pitfalls: [
          "Cloning a public figure or colleague without explicit permission — don't.",
          "Mixing noisy and clean samples for a clone, hurting quality.",
        ],
        exercise: {
          type: "reflect",
          brief: "Plan an ethical voice-clone use for your own voice. What consent/ownership applies, and what would you use it for?",
          hint: "Your own voice, your own content; note the consent basis.",
          success: "Good answers use a voice the learner owns/has consent for, with a legitimate use and clear ethical basis.",
        },
      },
      {
        id: "l3",
        title: "Dubbing into many languages",
        level: "Advanced",
        duration: "11 min",
        summary: "Reach a global audience by translating your voice, not just your captions.",
        sections: [
          { heading: "What dubbing does", body: "ElevenLabs Dubbing takes a video or audio file and produces a translated version in another language while preserving the speaker's voice characteristics and timing. Instead of subtitles, your audience hears your content in their language — a massive reach unlock for creators and courses." },
          { heading: "Workflow & review", body: "Upload, pick target languages, and let it transcribe, translate, and re-voice. For quality, review the transcript and translation (idioms and names need a human eye), then export. Treat the AI output as a strong draft you verify, especially for important content." },
          { heading: "Localize, don't just translate", body: "The best results adapt tone and references to the culture, not just the words. For high-stakes markets, have a native speaker review. Pair dubbing with localized thumbnails and titles for full localization." },
        ],
        keyTakeaways: [
          "Dubbing re-voices content in new languages, keeping the voice.",
          "Review transcript/translation for names, idioms, accuracy.",
          "Localize tone and references, not just words.",
        ],
        settings: [
          { name: "Target languages", detail: "Select one or many; preserves voice and timing." },
          { name: "Transcript review", detail: "Edit the transcription/translation before exporting." },
        ],
        promptPlaybook: [
          { label: "Localization note (for review)", prompt: "Adapt idioms to natural [language] equivalents, keep brand/product names unchanged, and match a friendly teaching tone.", why: "Guides the human/AI review toward localization, not literal translation." },
        ],
        proTips: [
          "Start with your top 2-3 audience languages, not all 30 at once.",
          "Keep names and product terms locked; have a native speaker spot-check.",
        ],
        pitfalls: [
          "Publishing machine dubs unreviewed in important markets.",
          "Translating literally and losing idioms or tone.",
        ],
        exercise: {
          type: "reflect",
          brief: "Pick two languages to dub your content into first. How would you verify quality before publishing?",
          hint: "Choose by audience; verify with transcript review + a native speaker.",
          success: "Good answers pick languages by audience and include a transcript/native-speaker review step before publishing.",
        },
      },
    ],
    quiz: [
      { q: "Which setting makes a voice steady vs. expressive?", options: ["Similarity", "Stability", "Style", "Model"], answer: 1, why: "Stability trades expressiveness for consistency." },
      { q: "The non-negotiable rule of voice cloning is…", options: ["Use any voice", "Only clone with ownership/consent", "Clone celebrities", "Ignore consent"], answer: 1, why: "Cloning without consent is unethical and often illegal." },
      { q: "Studio is best for…", options: ["One-line clips", "Long-form, multi-voice projects", "Image generation", "Spreadsheets"], answer: 1, why: "Studio manages audiobooks/podcasts with per-section voices." },
      { q: "Dubbing differs from subtitles because it…", options: ["Only adds text", "Re-voices content in another language", "Removes audio", "Speeds it up"], answer: 1, why: "It produces translated speech in the speaker's voice." },
    ],
    resources: [
      { label: "Tune one dial at a time", note: "Adjust stability/similarity/style separately and re-listen." },
      { label: "Consent first", note: "Only clone voices you own or have explicit permission to use." },
    ],
  });

  /* ============================== Suno & Udio ============================== */
  ACADEMY.register({
    id: "suno-udio",
    title: "AI Music with Suno & Udio",
    tagline: "Full songs from a prompt — melody, vocals, lyrics, and structure.",
    category: "Audio, Voice & Music",
    icon: "🎵",
    color: "gold",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Theo Sound", role: "AI Music Producer", persona: "creative, rhythmic", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Style prompts", "Song structure"] },
    overview:
      "Suno and Udio generate complete songs — instrumentation, vocals, and lyrics — from a text prompt. They're remarkable for jingles, content soundtracks, demos, and just plain fun. The craft is in style prompts and lyric structure tags.\n\nThis track covers writing style prompts, structuring lyrics, refining with stems and extends, and the commercial-rights basics.",
    whyItMatters:
      "Custom music used to mean a composer or a license fee. Now a creator can score every video and make a branded jingle in minutes.",
    outcomes: [
      "Write style prompts that nail a genre and mood",
      "Structure lyrics with section tags for better songs",
      "Refine tracks with extend, stems, and personas",
      "Understand commercial rights before you publish",
    ],
    lessons: [
      {
        id: "l1",
        title: "Style prompts & your first song",
        level: "Beginner",
        duration: "10 min",
        summary: "Describe genre, mood, instruments, and vocals — specifically.",
        sections: [
          { heading: "The style prompt", body: "A song's character comes from the style prompt: genre, mood, tempo, instruments, and vocal type. 'Upbeat indie-pop, bright guitars, female vocals, hand claps, 120 bpm, summery' gives the model a clear target. Vague prompts ('a good song') produce generic results; specific ones produce a vibe." },
          { heading: "Custom mode vs. quick", body: "Quick mode turns a one-line idea into a song; Custom mode lets you supply your own lyrics and a precise style. Use quick to explore, custom to control. For anything you'll publish, custom mode is worth it." },
          { heading: "Iterate", body: "Generate a few takes, keep the best, and refine the style prompt. Music is taste-driven, so expect to roll several times — small wording changes (swap 'lo-fi' for 'cinematic') shift the whole track." },
        ],
        keyTakeaways: [
          "Style prompt = genre + mood + tempo + instruments + vocals.",
          "Quick mode to explore; Custom mode to control.",
          "Generate several, refine the wording, keep the best.",
        ],
        settings: [
          { name: "Custom mode", detail: "Supply your own lyrics + a precise style description." },
          { name: "Style / genre field", detail: "Where you specify the sonic character; be concrete." },
        ],
        promptPlaybook: [
          { label: "Brand jingle style", prompt: "Upbeat corporate-pop, bright synths, claps, optimistic female vocal, catchy 8-second hook, 110 bpm, clean modern production", why: "Specific genre + instruments + vocal + tempo yields a usable jingle." },
          { label: "Content soundtrack", prompt: "Chill lo-fi hip-hop, mellow piano, soft vinyl crackle, no vocals, relaxed 75 bpm, loopable", why: "Instrumental + mood + 'loopable' fits background music for videos." },
        ],
        proTips: [
          "Name 2-3 instruments explicitly — it sharpens the arrangement.",
          "Specify 'no vocals' for background tracks so they don't fight your narration.",
        ],
        pitfalls: [
          "One-word prompts that give generic, forgettable tracks.",
          "Forgetting tempo/mood, so the energy is wrong for your use.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a Suno style prompt for background music for a tech tutorial (no vocals).",
          starter: "Minimal electronic, soft pulsing synth, light percussion, no vocals, focused and modern, 90 bpm, loopable background",
          hint: "Genre + instruments + 'no vocals' + tempo + mood + loopable.",
          success: "Strong prompts specify genre, instruments, vocal choice, tempo, mood, and loopability for the use case.",
        },
        narration:
          "Suno and Udio write whole songs from a prompt — music, vocals, lyrics, the lot. The secret is the style prompt. Don't say 'a good song'; say 'upbeat indie-pop, bright guitars, female vocals, hand claps, one-twenty bpm, summery.' Genre, mood, tempo, instruments, vocal type — the more specific, the more it sounds like a vibe instead of wallpaper. Use quick mode to explore an idea, and custom mode when you want to supply your own lyrics and control the style. Then iterate: generate a few takes, swap a word — 'lo-fi' for 'cinematic' — and the whole track shifts. For background music behind narration, just remember to ask for no vocals.",
      },
      {
        id: "l2",
        title: "Lyrics, structure & refinement",
        level: "Intermediate",
        duration: "11 min",
        summary: "Section tags, custom lyrics, stems, and extending a track.",
        sections: [
          { heading: "Structure tags", body: "Guide the song's arrangement with section tags in the lyrics: [Verse], [Chorus], [Bridge], [Outro], even [Instrumental]. The model uses them to build dynamics — a quiet verse, a big chorus. Structure is what turns a loop into a song." },
          { heading: "Custom lyrics", body: "Write or generate your own lyrics and paste them in. For a branded song, draft lyrics with an LLM ('write a catchy chorus about fast customer support'), then place them under the right section tags. You control the message; the model performs it." },
          { heading: "Stems & extend", body: "Many tools let you download stems (separate vocal/instrument tracks) for mixing, and extend a song to make it longer or add a section. Stems are the bridge to real editing in a DAW; extend helps you reach a target length." },
        ],
        keyTakeaways: [
          "Use [Verse]/[Chorus]/[Bridge] tags to shape arrangement.",
          "Paste custom lyrics for a controlled message.",
          "Stems enable mixing; extend reaches your target length.",
        ],
        settings: [
          { name: "Section tags", detail: "[Verse], [Chorus], [Bridge], [Outro], [Instrumental] guide structure." },
          { name: "Stems / extend", detail: "Export separated tracks; lengthen or add sections." },
        ],
        promptPlaybook: [
          { label: "Structured lyric block", prompt: "[Verse] We were drowning in the inbox, replies a day too late\n[Chorus] Now we answer in a heartbeat, automation at the gate\n[Bridge] Set it once, it runs forever\n[Outro] Faster, smarter, all together", why: "Section tags + on-message lyrics produce a coherent branded song." },
        ],
        proTips: [
          "Draft lyrics with an LLM, then tighten the chorus — it's the part people remember.",
          "Export stems if you'll mix it properly in a DAW.",
        ],
        pitfalls: [
          "No structure tags, so the song meanders without a hook.",
          "Overlong lyrics crammed into a short track.",
        ],
        exercise: {
          type: "prompt",
          brief: "Write a short structured lyric (Verse + Chorus) for a brand or topic, using section tags.",
          starter: "[Verse] ...\n[Chorus] ...",
          hint: "Use [Verse] and [Chorus] tags and keep the chorus catchy and on-message.",
          success: "Good answers use section tags and a memorable, on-message chorus.",
        },
      },
      {
        id: "l3",
        title: "Rights, personas & publishing",
        level: "Advanced",
        duration: "9 min",
        summary: "Own your output, keep a consistent sound, and publish safely.",
        sections: [
          { heading: "Commercial rights", body: "Whether you can monetize AI music depends on your plan and the tool's terms — paid tiers typically grant commercial use, free tiers often don't. Before you publish or run ads over a track, check the current terms for your plan. Don't assume." },
          { heading: "Personas & consistency", body: "Features like personas let you capture a track's vocal/style identity and reuse it, so a series of songs sounds like the same artist or brand. Consistency turns one-off songs into a recognizable sonic brand." },
          { heading: "Originality & safety", body: "Avoid prompting for a specific living artist's voice or copying a real song — aim for a style, not a clone. Keep your prompts about genre and mood, and your output stays original and safe to use." },
        ],
        keyTakeaways: [
          "Commercial rights depend on plan/terms — verify before publishing.",
          "Personas keep a consistent sound across a series.",
          "Prompt styles, not specific artists, to stay original.",
        ],
        proTips: [
          "Upgrade to a commercial plan before using tracks in monetized content.",
          "Save a persona for your brand's signature sound.",
        ],
        pitfalls: [
          "Monetizing free-tier output that doesn't grant commercial rights.",
          "Prompting 'in the voice of [artist]' — avoid imitation of real people.",
        ],
        exercise: {
          type: "reflect",
          brief: "You want to use an AI song in a monetized video. What two things must you check first?",
          hint: "Plan/commercial rights, and originality (no artist cloning).",
          success: "Good answers confirm commercial rights for the plan and ensure the track is original (style, not artist imitation).",
        },
      },
    ],
    quiz: [
      { q: "A strong Suno style prompt includes…", options: ["Just 'a song'", "Genre, mood, tempo, instruments, vocals", "Only lyrics", "A file size"], answer: 1, why: "Specific sonic details produce a distinct track." },
      { q: "What do [Verse]/[Chorus] tags do?", options: ["Nothing", "Guide the song's structure/arrangement", "Set the price", "Add SFX"], answer: 1, why: "Section tags shape dynamics and build a hook." },
      { q: "Before monetizing AI music you must…", options: ["Nothing", "Check commercial rights for your plan", "Use the free tier", "Clone an artist"], answer: 1, why: "Commercial use depends on plan/terms." },
      { q: "To keep a consistent sound across songs, use…", options: ["Random prompts", "A persona", "More chaos", "Subtitles"], answer: 1, why: "Personas capture and reuse a vocal/style identity." },
    ],
    resources: [
      { label: "Check the terms", note: "Confirm commercial rights for your plan before publishing." },
      { label: "Style, not artists", note: "Prompt genres/moods; never imitate a specific living artist." },
    ],
  });

  /* ============================== Voice cloning & audio workflows ============================== */
  ACADEMY.register({
    id: "voice-cloning-audio",
    title: "Voice Cloning, Podcasts & Audio Workflows",
    tagline: "Produce pro audio — podcasts, audiobooks, clips — with an AI studio.",
    category: "Audio, Voice & Music",
    icon: "🔊",
    color: "teal",
    level: "Beginner → Advanced",
    difficulty: "Core",
    estTime: "~70 min",
    instructor: { name: "Theo Sound", role: "Audio Workflow Coach", persona: "practical, ethical", voiceLang: "en-US" },
    hero: { tags: ["Updated for 2026", "Podcasts", "Ethical cloning"] },
    overview:
      "Beyond single voices and songs, AI now powers whole audio workflows: clone your voice to scale narration, produce and edit podcasts by editing text, clean up bad recordings, and slice long audio into shareable clips.\n\nThis track ties the tools together into repeatable production pipelines — done ethically and efficiently.",
    whyItMatters:
      "Audio is booming and labor-intensive. AI collapses the production time so a solo creator can sound like a studio.",
    outcomes: [
      "Clone your voice ethically and use it to scale",
      "Edit podcasts by editing text (Descript-style)",
      "Clean and enhance imperfect recordings",
      "Repurpose long audio into clips and shows",
    ],
    lessons: [
      {
        id: "l1",
        title: "Ethical cloning to scale yourself",
        level: "Beginner",
        duration: "10 min",
        summary: "Turn your own voice into a reusable asset — the right way.",
        sections: [
          { heading: "Why clone your own voice", body: "If you publish a lot — courses, videos, updates — recording everything is a bottleneck. Cloning your own voice lets you 'record' by typing, fix a flubbed line without re-recording, and keep a consistent sound across hundreds of pieces. The key word is your own." },
          { heading: "Consent and disclosure", body: "Only clone a voice you own or have explicit, documented permission to use. For public-facing content, consider disclosing AI narration where appropriate. Ethics here isn't optional — it protects your audience's trust and you legally." },
          { heading: "Quality samples", body: "A good clone starts with a clean sample: quiet room, consistent mic distance and tone, a few minutes of natural speech. Garbage in, garbage out — your clone is only as good as the recording you train it on." },
        ],
        keyTakeaways: [
          "Clone your own voice to remove the recording bottleneck.",
          "Consent + appropriate disclosure are mandatory.",
          "Clean, consistent samples make better clones.",
        ],
        proTips: [
          "Record your clone sample with the same mic you'll use for real, for tonal match.",
          "Keep a 'pronunciation list' for names/terms your clone tends to miss.",
        ],
        pitfalls: [
          "Cloning anyone else without explicit permission.",
          "Training on noisy or inconsistent audio.",
        ],
        exercise: {
          type: "reflect",
          brief: "Describe how you'd capture a high-quality sample of your own voice for cloning, and where you'd disclose AI narration.",
          hint: "Quiet room, consistent mic; disclose where audiences expect a human.",
          success: "Good answers capture clean, consistent samples and disclose AI use where appropriate, all with consent.",
        },
        narration:
          "If you publish a lot, recording everything is the bottleneck. Cloning your own voice fixes that: you 'record' by typing, fix a flubbed line without redoing the take, and keep one consistent sound across hundreds of pieces. The crucial word is your own — only clone a voice you own or have explicit permission to use, and disclose AI narration where your audience would expect a human. The other half is the sample: a quiet room, the same mic you'll really use, a few minutes of natural speech. Garbage in, garbage out. Do it ethically with a clean sample, and your voice becomes a scalable asset instead of a daily chore.",
      },
      {
        id: "l2",
        title: "Edit audio by editing text",
        level: "Intermediate",
        duration: "11 min",
        summary: "Transcript-based editing makes podcast production fast and painless.",
        sections: [
          { heading: "The text-based editing idea", body: "Tools like Descript transcribe your recording, then let you edit the audio by editing the transcript: delete a sentence in the text and it's removed from the audio. Cutting 'ums', tightening rambles, and rearranging segments becomes word processing, not waveform surgery." },
          { heading: "Filler removal & enhancement", body: "One click can remove filler words and awkward pauses; other features enhance voice quality, level audio, and reduce noise. A rough home recording becomes a clean, listenable episode without an audio engineer." },
          { heading: "From recording to published", body: "The pipeline: record, transcribe, edit text, remove filler, enhance, add captions, export. Treat the transcript as the master and the audio follows — it's the fastest path from raw take to publishable show." },
        ],
        keyTakeaways: [
          "Edit audio by editing its transcript.",
          "One-click filler removal + enhancement clean rough takes.",
          "Transcript-as-master is the fastest production path.",
        ],
        features: [
          { name: "Text-based editing", detail: "Delete/rearrange transcript to edit the audio." },
          { name: "Filler/Studio sound", detail: "Remove 'ums', level and de-noise the audio." },
        ],
        proTips: [
          "Record a little extra silence and clean takes — easier to cut than to add.",
          "Use the transcript to also produce show notes and clips.",
        ],
        pitfalls: [
          "Over-editing until speech sounds unnatural/choppy.",
          "Trusting auto-transcription on names without a proofread.",
        ],
        exercise: {
          type: "reflect",
          brief: "Outline your podcast pipeline using text-based editing, from record to publish.",
          hint: "Record -> transcribe -> edit text -> remove filler -> enhance -> export.",
          success: "Good answers lay out a clear transcript-first pipeline ending in a polished, exportable episode.",
        },
      },
      {
        id: "l3",
        title: "Clean audio & repurpose to clips",
        level: "Advanced",
        duration: "10 min",
        summary: "Rescue bad recordings and turn one long piece into many.",
        sections: [
          { heading: "Enhance & rescue", body: "AI audio enhancement can reduce background noise, remove echo, and make a phone or laptop recording sound close to studio quality. It won't fix everything, but it salvages interviews and remote recordings that would otherwise be unusable." },
          { heading: "Repurpose into clips", body: "Long content is raw material. AI tools can find the highlight moments and cut a long episode or video into short, captioned clips for social. One recording becomes a dozen posts — the faceless-empire pattern applied to audio/video." },
          { heading: "Assemble a pipeline", body: "Chain it: record -> enhance -> transcribe -> edit -> generate clips -> caption -> schedule. Each step is an AI tool, and the whole pipeline can be partly automated (n8n/Make) so publishing becomes a system, not a scramble." },
        ],
        keyTakeaways: [
          "AI enhancement rescues noisy/echoey recordings.",
          "Auto-clip long content into many social posts.",
          "Chain the steps into a (partly automated) pipeline.",
        ],
        features: [
          { name: "Audio enhancement", detail: "Noise/echo reduction toward studio quality." },
          { name: "Auto-clipping", detail: "Find highlights and cut captioned short clips." },
        ],
        proTips: [
          "Enhance BEFORE transcribing — cleaner audio transcribes more accurately.",
          "Repurpose every long piece into at least 3-5 clips; don't let content die after one post.",
        ],
        pitfalls: [
          "Expecting enhancement to fix severely clipped/garbled audio.",
          "Publishing clips without captions — most social audio is watched muted.",
        ],
        exercise: {
          type: "reflect",
          brief: "Take one long recording you'd make. List the pipeline steps and how many clips you'd repurpose it into.",
          hint: "Enhance -> transcribe -> edit -> clip -> caption -> schedule; aim for 3-5 clips.",
          success: "Good answers define an end-to-end pipeline and a concrete repurposing target (several captioned clips).",
        },
      },
    ],
    quiz: [
      { q: "Text-based audio editing means…", options: ["Editing waveforms only", "Editing the transcript to edit the audio", "No editing", "Editing video"], answer: 1, why: "Delete text and the corresponding audio is removed." },
      { q: "The rule for cloning a voice is…", options: ["Anyone is fine", "Only with ownership/consent", "Only celebrities", "No rules"], answer: 1, why: "Consent/ownership is mandatory, ethically and legally." },
      { q: "Best order for the best transcription?", options: ["Transcribe then enhance", "Enhance then transcribe", "Neither", "Order doesn't matter"], answer: 1, why: "Cleaner audio transcribes more accurately." },
      { q: "Repurposing long audio means…", options: ["Deleting it", "Cutting it into many captioned clips", "Only one post", "Ignoring captions"], answer: 1, why: "One recording becomes many social clips." },
    ],
    resources: [
      { label: "Transcript-first", note: "Make the transcript your master; audio, notes, and clips follow." },
      { label: "Enhance early", note: "Clean audio before transcribing and clipping for best results." },
    ],
  });
})();
