import Link from 'next/link'
import type { ReactNode } from 'react'

export interface Guide {
  slug: string
  short: string
  title: string
  description: string
  published: string
  minutes: number
  body: ReactNode
}

export const GUIDES: Guide[] = [
  {
    slug: 'what-is-a-text-match-cut',
    short: 'What is a text match cut?',
    title: 'What Is a Text Match Cut? The Effect, Explained',
    description:
      'A text match cut keeps one word perfectly still while everything around it changes. Here is where the idea comes from, why it grabs attention and when to use it.',
    published: '2026-10-03',
    minutes: 5,
    body: (
      <>
        <p>
          A <strong>text match cut</strong> is a short, fast sequence of frames in which a single word or phrase stays in exactly the
          same position on screen while everything around it – the page, the font, the surrounding sentences, sometimes the colours –
          changes on every cut. The viewer’s eye fixes on the one element that doesn’t move, so that word is read, felt and
          remembered.
        </p>

        <h2>Where the idea comes from</h2>
        <p>
          In film editing, a <em>match cut</em> joins two shots that share a shape, movement or composition, so the transition feels
          continuous even though the scene has changed. Classic examples match a spinning object to a planet, or a closing door to a
          closing eye. The text version applies the same principle to typography: the shared element is a word, held in the same
          spot, and the “scenes” are pages of different text.
        </p>
        <p>
          The effect became popular on short-form video because it is both legible on a phone and quick to grab attention. It
          communicates a single idea in under a second, which is roughly how long a viewer gives a video before deciding whether to
          keep watching.
        </p>

        <h2>Why it works</h2>
        <ul>
          <li>
            <strong>Motion contrast.</strong> Our visual system is drawn to change, but when almost everything changes, the stable
            element becomes the anomaly – and anomalies get attention.
          </li>
          <li>
            <strong>Repetition without boredom.</strong> The viewer sees the same word ten or twenty times in a few seconds, but in a
            new context each time, so it doesn’t feel repetitive.
          </li>
          <li>
            <strong>Implied scale.</strong> Seeing a word appear across “many” documents suggests it is everywhere – in the news, in
            the archive, in every conversation.
          </li>
        </ul>

        <h2>The anatomy of a good one</h2>
        <ol>
          <li>
            <strong>An anchor point.</strong> The focal word’s centre never moves. Even when the camera zooms, it zooms around that
            point.
          </li>
          <li>
            <strong>A consistent focal style.</strong> Same font, same size, same highlight on every frame. Only the context changes.
          </li>
          <li>
            <strong>Believable context.</strong> Surrounding text that looks like it belongs – columns for a newspaper look, a
            typewriter for an archive, captions for social.
          </li>
          <li>
            <strong>Rhythm.</strong> A steady cut rate, often synced to music, between about 4 and 12 cuts per second.
          </li>
          <li>
            <strong>A landing.</strong> Many versions end by clearing everything except the word, giving the viewer a beat to read it
            on its own.
          </li>
        </ol>

        <h2>When to use it – and when not to</h2>
        <p>
          It is ideal for hooks, title cards, chapter breaks, product names and one-line takeaways. It is less suited to anything
          that needs to be read in full: if the viewer must take in a whole sentence, show the sentence plainly. And because it
          moves fast, use it as a moment within a video rather than for minutes at a time.
        </p>
        <p>
          Ready to try it? The <Link href="/text-match-cut-generator">text match cut generator</Link> builds one from a single line
          of text, or read <Link href="/guides/how-to-make-a-text-match-cut">how to make a text match cut</Link> for a step-by-step
          walkthrough.
        </p>
      </>
    ),
  },
  {
    slug: 'how-to-make-a-text-match-cut',
    short: 'How to make one',
    title: 'How to Make a Text Match Cut (Step-by-Step Tutorial)',
    description:
      'A practical tutorial: write the line, choose the focal word, pick a style, tune pacing and export a vertical MP4 – plus how to do it manually in a video editor.',
    published: '2026-10-03',
    minutes: 7,
    body: (
      <>
        <p>
          This tutorial walks through making a text match cut in TextSnapy from start to finish, then explains how the same effect
          is built by hand in a traditional editor so you understand what the tool is doing for you.
        </p>

        <h2>1. Start with one sentence</h2>
        <p>
          Write the line you want viewers to remember. Good candidates are a hook (“Nobody tells you this about renting”), a thesis
          (“Every empire falls the same way”) or a product line (“Introducing Aurora”). Paste it into the text box in the{' '}
          <Link href="/create">editor</Link>.
        </p>
        <p>
          The editor uses your own words to fill the background of each cut, padding with neutral filler copy matched to the style
          when your text is short. Pasting a whole paragraph gives you a background that is entirely your own.
        </p>

        <h2>2. Choose the focal word</h2>
        <p>
          TextSnapy suggests a word automatically – it ignores filler words like “the” and “with”, and prefers names, numbers and
          words near the end of the sentence, where the payoff usually sits. Tap any word in your sentence to choose it instead, or
          shift-click to select a short phrase of up to four words. You can also type a word that isn’t in the sentence at all.
        </p>

        <h2>3. Pick a style</h2>
        <p>
          Styles are complete starting points: font, layout, colours, motion and sound. Choosing one keeps your text and focal word
          and restyles everything else. A few pairings to start with:
        </p>
        <ul>
          <li>History, true crime or explainers → Documentary or Mystery</li>
          <li>News commentary or newsletters → Newspaper or Breaking news</li>
          <li>Money, business or tech → Finance or Minimal</li>
          <li>Gym, sport or motivation → Sports or Motivation</li>
        </ul>

        <h2>4. Tune the pacing</h2>
        <p>
          Open the <em>Motion</em> tab. Cuts per second is the most important setting. As a rule of thumb, slow (4–6) reads as
          serious, medium (7–9) as energetic, and fast (10+) as frantic. Duration of 3–6 seconds suits most hooks. Add zoom for a
          slow push-in, and turn on <em>Finish on the word</em> if you want a clean final beat.
        </p>

        <h2>5. Check the format</h2>
        <p>
          Pick 9:16 for Reels, Shorts and TikTok, 1:1 for feed posts, or 16:9 for YouTube and presentations. The focal word stays
          anchored at the same relative position when you switch, and the background reflows to fill the new frame.
        </p>

        <h2>6. Export and post</h2>
        <p>
          Press <em>Export video</em>. Rendering happens on your device; on most computers a five-second 1080p clip takes a few
          seconds. Download the MP4, or on mobile use <em>Share video</em> to send it straight to an app. The{' '}
          <Link href="/guides/reels-shorts-tiktok-workflow">posting workflow guide</Link> covers each platform.
        </p>

        <h2>Doing it manually (for comparison)</h2>
        <p>If you want to build one in Premiere Pro, Final Cut, DaVinci Resolve or CapCut, the process looks like this:</p>
        <ol>
          <li>Create a text layer with your focal word and position it where you want it. Lock that layer.</li>
          <li>
            For each cut, create a new text layer (or image of a page) whose copy contains the focal word, and position it so the
            word overlaps the locked one exactly. A guide or ruler helps.
          </li>
          <li>Trim every background layer to the same length – for example 3 frames at 30 fps for 10 cuts per second.</li>
          <li>Hide the focal word inside each background layer (or cover it with the locked layer) so the alignment is perfect.</li>
          <li>Add keyframed scale to the whole stack, anchored on the word, for the push-in.</li>
        </ol>
        <p>
          Twenty cuts means twenty carefully aligned layers. That’s the tedium TextSnapy removes – it does the measuring and
          alignment automatically for every frame.
        </p>
      </>
    ),
  },
  {
    slug: 'how-text-match-cuts-work',
    short: 'How it works',
    title: 'How Text Match Cuts Work Under the Hood',
    description:
      'The maths behind anchoring a word, generating context around it, and rendering and encoding HD video entirely inside a web browser.',
    published: '2026-10-03',
    minutes: 6,
    body: (
      <>
        <p>
          This page explains how TextSnapy builds each frame and turns those frames into a video file without uploading anything.
          It’s useful if you are curious, if you want to recreate the effect elsewhere, or if you want to understand why some
          browsers export faster than others.
        </p>

        <h2>Anchoring the focal word</h2>
        <p>
          Every frame starts from an anchor point – by default the centre of the frame, adjustable with the position sliders. The
          renderer measures the focal word in its font and size, then places it so the middle of the word sits exactly on the
          anchor. Because the word is drawn with the same font, size and highlight on every frame, its pixels are identical from cut
          to cut.
        </p>

        <h2>Building context around it</h2>
        <p>
          Next, the renderer fills the rest of the frame. On the focal line, words flow outward: leftwards from just before the focal
          word and rightwards from just after it, so the gaps look like ordinary word spacing. Other lines start at random offsets
          so each page looks different. The words come from your text first, then from filler copy written for each style.
        </p>
        <p>
          A seeded random number generator makes every choice – which words, which font, where a line starts. The same seed always
          produces the same frames, which is why the exported video matches the preview exactly, and why <em>Regenerate</em> (which
          changes the seed) gives you a fresh set of pages.
        </p>

        <h2>Making it fast enough to preview</h2>
        <p>
          Drawing a page of text is cheap, but blurring it is not. So the background of each cut is drawn once into an off-screen
          layer and reused for every frame until the next cut. Each frame then only composites that layer, draws the focal word and
          applies the zoom or transition. That keeps the preview smooth on phones.
        </p>

        <h2>Zoom without losing the match</h2>
        <p>
          The zoom is a scale transform centred on the anchor point. Scaling around a point leaves that point where it is, so the
          focal word grows but doesn’t drift. The amount follows an ease-out curve – quick at first, then settling – controlled by
          the Zoom and Motion speed sliders.
        </p>

        <h2>Encoding video in the browser</h2>
        <p>Exports use one of two paths, picked automatically:</p>
        <ul>
          <li>
            <strong>WebCodecs.</strong> In browsers that support it, each frame is rendered at full resolution, handed to the
            browser’s built-in H.264 (or VP9) encoder, and written into an MP4 or WebM container with the open-source Mediabunny
            library. This runs faster than real time and is frame-accurate.
          </li>
          <li>
            <strong>MediaRecorder.</strong> Older browsers record the canvas in real time instead. It works, but the tab needs to
            stay in front for the duration of the clip.
          </li>
        </ul>
        <p>
          The cut sounds are synthesised with the Web Audio API – short filtered noise bursts and pitched tones – and rendered
          offline so they line up with cuts to the sample.
        </p>

        <h2>Why nothing is uploaded</h2>
        <p>
          All of the above happens in your browser tab. There is no server-side rendering queue, which is why TextSnapy can be free
          without accounts or upload limits, and why your text stays private.
        </p>
      </>
    ),
  },
  {
    slug: 'text-match-cut-ideas',
    short: 'Use cases & ideas',
    title: '12 Text Match Cut Ideas for Creators, Brands and Educators',
    description:
      'Practical ways to use the text match cut effect – hooks, series intros, product teasers, lesson openers and more – with the settings that suit each one.',
    published: '2026-10-03',
    minutes: 6,
    body: (
      <>
        <p>
          The text match cut is a short, sharp device. These are situations where it earns its place, with a starting style for
          each. Every idea links to the editor with that style loaded.
        </p>

        <h2>For storytellers</h2>
        <ol>
          <li>
            <strong>Documentary cold open.</strong> Lock the name of the person or place your story is about. Slow cuts on paper.{' '}
            <Link href="/create?t=documentary">Documentary</Link>
          </li>
          <li>
            <strong>True-crime reveal.</strong> Heavy blur and a single cold word – “witness”, “alibi”, “motive”.{' '}
            <Link href="/create?t=mystery">Mystery</Link>
          </li>
          <li>
            <strong>Chapter titles.</strong> Use 16:9 and the same style for every chapter of a long video so they feel like a set.{' '}
            <Link href="/create?t=cinematic">Cinematic</Link>
          </li>
        </ol>

        <h2>For educators and explainers</h2>
        <ol start={4}>
          <li>
            <strong>Key-term opener.</strong> Introduce the concept of the lesson – “photosynthesis”, “inflation”, “recursion”.{' '}
            <Link href="/create?t=minimal">Minimal</Link>
          </li>
          <li>
            <strong>Myth vs fact.</strong> Lock “myth” for one clip and “fact” for the next, using the same layout.{' '}
            <Link href="/create?t=newspaper">Newspaper</Link>
          </li>
          <li>
            <strong>Number of the day.</strong> Finance and science creators: a single figure, highlighted in green.{' '}
            <Link href="/create?t=finance">Finance</Link>
          </li>
        </ol>

        <h2>For brands and small businesses</h2>
        <ol start={7}>
          <li>
            <strong>Product name teaser.</strong> Slow, spacious, serif. Let the name breathe before the reveal.{' '}
            <Link href="/create?t=luxury">Luxury</Link>
          </li>
          <li>
            <strong>Sale or launch date.</strong> Lock the date or the discount; cycle your brand colours on each cut.{' '}
            <Link href="/create?t=motivation">Motivation</Link>
          </li>
          <li>
            <strong>Newsletter or podcast promo.</strong> Lock the day it ships (“Sunday”) or the episode topic.{' '}
            <Link href="/create?t=newspaper">Newspaper</Link>
          </li>
        </ol>

        <h2>For social-first creators</h2>
        <ol start={10}>
          <li>
            <strong>POV hooks.</strong> “POV: it’s 3am and…” with the time locked in place. <Link href="/create?t=meme">Meme</Link>
          </li>
          <li>
            <strong>Game update recap.</strong> Lock the season or patch name; shake on every cut.{' '}
            <Link href="/create?t=gaming">Gaming</Link>
          </li>
          <li>
            <strong>Match-day graphic.</strong> Opponent, score or “FINAL” in team colours. <Link href="/create?t=sports">Sports</Link>
          </li>
        </ol>

        <h2>A few things to avoid</h2>
        <ul>
          <li>Using the effect for long stretches – it’s a punctuation mark, not a paragraph.</li>
          <li>Making the background look like a real publication or document you don’t have rights to.</li>
          <li>Fast flashing transitions, which can be harmful for viewers with photosensitive epilepsy.</li>
        </ul>
        <p>
          See these ideas rendered on the <Link href="/examples">examples page</Link>.
        </p>
      </>
    ),
  },
  {
    slug: 'reels-shorts-tiktok-workflow',
    short: 'Reels, Shorts & TikTok workflow',
    title: 'Posting Text Effects to Reels, Shorts and TikTok: A Practical Workflow',
    description:
      'How to export a text match cut and get it onto Instagram Reels, YouTube Shorts and TikTok – formats, file types, adding licensed music and staying clear of on-screen buttons.',
    published: '2026-10-03',
    minutes: 6,
    body: (
      <>
        <p>
          All three platforms want the same thing – a vertical MP4 – but they differ in how you add sound, where their buttons sit
          and how you get the file onto your phone. Here’s a workflow that works for each.
        </p>

        <h2>The common export</h2>
        <ul>
          <li>
            <strong>Format:</strong> 9:16 at 1080p, which gives a 1080×1920 file.
          </li>
          <li>
            <strong>Frame rate:</strong> 30 fps unless you use 10+ cuts per second, in which case try 60.
          </li>
          <li>
            <strong>File type:</strong> MP4 (H.264). If your browser can only produce WebM, re-export from Chrome, Edge or Safari for
            Instagram and TikTok. YouTube accepts both.
          </li>
          <li>
            <strong>Position:</strong> keep the focal word in the middle third. All three apps place text and buttons along the
            bottom and right-hand edges.
          </li>
        </ul>

        <h2>Getting the file to your phone</h2>
        <p>
          If you made the video on your phone, tap <em>Share video</em> after export to open the system share sheet and send it
          directly to the app, or save it to Photos/Gallery first. If you made it on a computer, download the MP4 and either upload
          from the platform’s website or move it to your phone with AirDrop, Nearby Share or a cloud drive.
        </p>

        <h2>Instagram Reels</h2>
        <ol>
          <li>Create a new Reel and pick the exported video from your camera roll.</li>
          <li>Add music from Instagram’s audio library – tracks there are licensed for use on the platform.</li>
          <li>Write a caption that repeats the key message as text, for accessibility and search.</li>
        </ol>

        <h2>YouTube Shorts</h2>
        <ol>
          <li>Upload from the YouTube app (Create → Upload a video) or YouTube Studio on desktop.</li>
          <li>Videos that are vertical and three minutes or shorter are treated as Shorts automatically.</li>
          <li>Add sound in the Shorts editor if you exported without one. Turn on <em>Finish on the word</em> for a cleaner loop.</li>
        </ol>

        <h2>TikTok</h2>
        <ol>
          <li>Tap + then Upload, and choose your video.</li>
          <li>Pick a sound from TikTok’s library. For business accounts, use the Commercial Music Library.</li>
          <li>Use TikTok’s own text tool sparingly on top – your match cut already carries the message.</li>
        </ol>

        <h2>Using it as an intro inside a longer edit</h2>
        <p>
          Import the MP4 into CapCut, Premiere Pro, DaVinci Resolve or iMovie and place it at the start of your timeline. Export
          with the cut sound off if you plan to add your own music, and cut from the final held word straight into your first shot
          for a clean transition.
        </p>

        <h2>Music and rights</h2>
        <p>
          TextSnapy’s cut sounds are generated in your browser and are yours to use. Music is a different matter: add songs inside
          each platform’s editor, where they’re licensed for that platform, rather than baking commercial tracks into the file.
        </p>
      </>
    ),
  },
]

export const GUIDE_MAP = new Map(GUIDES.map((g) => [g.slug, g]))
