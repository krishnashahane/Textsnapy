import Link from 'next/link'
import type { ReactNode } from 'react'
import type { QA } from '@/components/Faq'

export interface Tool {
  slug: string
  short: string
  title: string
  metaTitle: string
  description: string
  template: string
  lede: string
  sections: { h: string; body: ReactNode }[]
  faq: QA[]
}

export const TOOLS: Tool[] = [
  {
    slug: 'text-match-cut-generator',
    short: 'Text match cut generator',
    title: 'Text Match Cut Generator',
    metaTitle: 'Text Match Cut Generator – Free, No Sign-up',
    description:
      'Make a text match-cut video in your browser: type a line, lock one word in place and export an HD MP4. Free, no watermark lock-in, nothing uploaded.',
    template: 'newspaper',
    lede: 'Type a sentence, choose the word that should stay perfectly still, and TextSnapy rebuilds everything around it several times a second. Export a ready-to-post MP4 in under a minute.',
    sections: [
      {
        h: 'What this generator actually does',
        body: (
          <>
            <p>
              A text match cut is a rapid sequence of frames – pages, headlines, captions – where one word sits in exactly the same
              place on every frame. Everything else changes. Because your eye locks onto the only thing that doesn’t move, that word
              lands with far more weight than it would as a plain caption.
            </p>
            <p>
              Doing this by hand in a video editor means building dozens of text layers and nudging each one until the focal word
              lines up to the pixel. This generator does the alignment for you: it measures the focal word in the chosen font, pins
              its centre to a fixed anchor point, and flows surrounding words out to the left and right of it on every cut.
            </p>
          </>
        ),
      },
      {
        h: 'How to make one in four steps',
        body: (
          <ol>
            <li>
              <strong>Write your line.</strong> Paste a quote, hook or script line. Your own words are used to fill the background,
              so the video stays on-topic.
            </li>
            <li>
              <strong>Lock the focal word.</strong> TextSnapy suggests one automatically (it skips filler words and favours names,
              numbers and the payoff at the end of a sentence). Tap any other word to change it, or shift-click for a short phrase.
            </li>
            <li>
              <strong>Pick a style.</strong> Fifteen starting points cover documentary, news, finance, sports, luxury and more. Every
              setting stays editable.
            </li>
            <li>
              <strong>Export.</strong> Choose 720p or 1080p, 30 or 60 fps, and download an MP4 (or WebM in browsers that can’t
              encode MP4).
            </li>
          </ol>
        ),
      },
      {
        h: 'Choosing a good focal word',
        body: (
          <>
            <p>
              The effect works best when the focal word is the one idea you want viewers to remember. A few patterns that reliably
              work:
            </p>
            <ul>
              <li>
                <strong>The noun that names the topic</strong> – “treaty”, “inflation”, “Aurora”.
              </li>
              <li>
                <strong>A number</strong> – “$40k”, “3am”, “1969”. Digits are visually distinct from the words around them.
              </li>
              <li>
                <strong>An emotional payoff</strong> – “betrayal”, “free”, “finally”. Put it near the end of your sentence and it
                works as a hook and a punchline at once.
              </li>
            </ul>
            <p>
              Avoid very long words in vertical video: at large sizes they can run into the edges of a 9:16 frame. If that happens,
              reduce <em>Size</em> in the Type tab or switch to a condensed font such as Anton or Bebas Neue.
            </p>
          </>
        ),
      },
      {
        h: 'Settings that matter most',
        body: (
          <>
            <p>
              <strong>Cuts per second</strong> sets the rhythm. Around 4–6 feels deliberate and readable; 8–12 feels urgent; above
              12 the background becomes a blur of texture. <strong>Duration</strong> is usually best between 3 and 6 seconds for a
              hook. <strong>Zoom</strong> slowly pushes in towards the focal word, which adds tension without moving it off its
              anchor.
            </p>
            <p>
              If you want to sync cuts to music, the <Link href="/kinetic-typography-generator">kinetic typography guide</Link> has
              a simple tempo-to-cut-rate table.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: 'Is the text match cut generator really free?',
        a: 'Yes. There is no account, no trial and no export limit. The optional “made with textsnapy” credit can be switched off before exporting.',
      },
      {
        q: 'Can I use my exports commercially?',
        a: 'Yes – you own what you make. The fonts are open-licensed and the cut sounds are generated in your browser, so there are no third-party samples in the file. Make sure the words you type are yours to use.',
      },
      {
        q: 'Why does my focal word stay in the same place even when I zoom?',
        a: 'The zoom is anchored on the focal word’s centre point, so the camera pushes in around it rather than past it. That is what keeps the “match” intact.',
      },
    ],
  },
  {
    slug: 'kinetic-typography-generator',
    short: 'Kinetic typography generator',
    title: 'Kinetic Typography Generator',
    metaTitle: 'Kinetic Typography Generator – Animated Text Videos Online',
    description:
      'Create kinetic typography videos online. Rhythmic cuts, punch-ins and zoom that sync to music, rendered in your browser and exported as HD MP4.',
    template: 'motivation',
    lede: 'Kinetic typography is text that moves with intent – timed to a voice, a beat or an edit. This generator focuses on the fastest version of it: rhythmic cuts around a single anchored word.',
    sections: [
      {
        h: 'Kinetic type, briefly',
        body: (
          <>
            <p>
              Moving text has been part of film for as long as there have been title sequences, but the term “kinetic typography”
              usually describes text whose motion carries meaning: a word that shakes because it is angry, a line that slows down
              because it is important. On social video it has become shorthand for fast, beat-matched text edits.
            </p>
            <p>
              TextSnapy doesn’t try to be a full motion-graphics suite. It does one kinetic technique – the match cut – very well,
              with enough motion controls (zoom, punch-in, shake, dip and flash) to make it feel designed rather than templated.
            </p>
          </>
        ),
      },
      {
        h: 'Matching cuts to a beat',
        body: (
          <>
            <p>
              Cuts land on the beat when the cut rate is a simple multiple of the song’s tempo. Divide the BPM by 60 to get beats
              per second, then multiply by how many cuts you want per beat:
            </p>
            <div className="table-wrap">
              <table>
                <caption>Cuts per second for common tempos</caption>
                <thead>
                  <tr>
                    <th scope="col">Tempo</th>
                    <th scope="col">1 cut per beat</th>
                    <th scope="col">2 per beat (8th notes)</th>
                    <th scope="col">4 per beat (16th notes)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>90 BPM</td>
                    <td>1.5</td>
                    <td>3</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>120 BPM</td>
                    <td>2</td>
                    <td>4</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>135 BPM</td>
                    <td>2.25</td>
                    <td>4.5</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>150 BPM</td>
                    <td>2.5</td>
                    <td>5</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The cut-rate slider uses whole numbers, so pick the closest value and line up the first cut with the downbeat when you
              place the clip in your editor. Over a 4–6 second clip, a fraction of a cut per second of drift is not noticeable.
            </p>
          </>
        ),
      },
      {
        h: 'Which motion to use when',
        body: (
          <ul>
            <li>
              <strong>Hard cut</strong> – the purest version. Best with a strong beat or voice-over.
            </li>
            <li>
              <strong>Punch in</strong> – a quick scale bump on each cut. Adds energy without visual noise; great for motivation and
              sports.
            </li>
            <li>
              <strong>Shake</strong> – short camera jitter. Use sparingly: gaming, memes, dramatic reveals.
            </li>
            <li>
              <strong>Dip</strong> – the outgoing page fades towards the background while the focal word stays solid. Calmer; suits
              luxury, cinematic and aesthetic styles.
            </li>
            <li>
              <strong>Flash</strong> – a white flash on each cut. Keep the cut rate at 3 per second or lower; faster flashing can
              trigger photosensitive seizures, so TextSnapy softens it automatically and warns you.
            </li>
          </ul>
        ),
      },
      {
        h: 'Keeping it readable',
        body: (
          <p>
            Movement competes with reading. If your audience needs to read the background (a documentary page, a fake-but-plausible
            memo), slow the cut rate down to 4–5 and keep zoom low. If the background is only texture, raise the cut rate, add blur
            and lower the background opacity so the focal word wins.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'Can I add my own music?',
        a: 'TextSnapy adds optional cut sounds, not music. Export the video, then add a licensed track in CapCut, Instagram, TikTok or YouTube’s audio library so it stays properly licensed.',
      },
      {
        q: 'Does it work offline?',
        a: 'Once the page and fonts have loaded, rendering and export run entirely on your device, so a flaky connection won’t interrupt an export.',
      },
      {
        q: 'What frame rate should I export?',
        a: '30 fps is the safe default for every platform. Choose 60 fps for very fast cut rates (10+) so each cut gets more frames and feels smoother.',
      },
    ],
  },
  {
    slug: 'newspaper-text-effect',
    short: 'Newspaper text effect',
    title: 'Newspaper Text Effect',
    metaTitle: 'Newspaper Text Effect Generator – Headline Match Cuts',
    description:
      'Generate a newspaper text effect video: columns, rules and serif headlines that rebuild on every cut while your word stays locked. Free HD export.',
    template: 'newspaper',
    lede: 'Columns, hairline rules and stacked serif headlines that rebuild on every cut – with your word printed in the same spot on every page.',
    sections: [
      {
        h: 'Why the newspaper look works',
        body: (
          <p>
            Print layouts carry authority. Dense columns, rules and headline type signal “this was reported”, even when the viewer
            can only read a fragment. Flashing through many of those pages while one word stays put suggests the same idea turning
            up everywhere – a feeling that is hard to create with a single caption.
          </p>
        ),
      },
      {
        h: 'How the layout is built',
        body: (
          <>
            <p>The Newspaper layout generates a new page for every cut from three kinds of blocks:</p>
            <ul>
              <li>
                <strong>Headlines</strong> – one or two lines of large, heavy type at varying sizes.
              </li>
              <li>
                <strong>Body columns</strong> – two to four narrow columns of small text with vertical rules between them, the way a
                broadsheet sets copy.
              </li>
              <li>
                <strong>Rules</strong> – thin horizontal lines that separate stories, plus a ruled band around your focal line.
              </li>
            </ul>
            <p>
              Blocks are stacked above and below your focal line until the frame is full, so a 9:16 frame gets more stories and a
              16:9 frame gets more columns. Turn on <em>Mix fonts</em> to let headlines alternate between Playfair Display,
              Cormorant Garamond, Instrument Serif and Inter.
            </p>
          </>
        ),
      },
      {
        h: 'Getting an authentic print feel',
        body: (
          <ul>
            <li>
              Use the <strong>Paper</strong> background for a warm stock with subtle grain and darker edges.
            </li>
            <li>
              The <strong>Solid block</strong> highlight reverses the focal word out of a dark band – a common print device for
              emphasis.
            </li>
            <li>
              The <strong>Typewriter</strong> sound gives each new page a short mechanical clack.
            </li>
            <li>Keep the cut rate around 6–8 so viewers catch glimpses of headlines without being able to read whole stories.</li>
          </ul>
        ),
      },
      {
        h: 'A note on real publications',
        body: (
          <p>
            The pages are generated from your words and neutral filler, not from real newspapers, and there are no mastheads or
            logos. Please keep it that way in what you publish: don’t add the name or branding of a real outlet, and don’t present
            invented headlines as genuine news. Satire and storytelling are fine when the context makes clear what they are.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'Can I make the background text readable?',
        a: 'Yes. Lower the cut rate to 3–4, raise “Background text opacity” to 100% and set blur to zero. Paste a longer paragraph so the columns contain your own copy.',
      },
      {
        q: 'Does the newspaper effect work in 16:9?',
        a: 'It does – wide frames get three or four columns per story instead of two or three.',
      },
    ],
  },
  {
    slug: 'documentary-text-effect',
    short: 'Documentary text effect',
    title: 'Documentary Text Effect',
    metaTitle: 'Documentary Text Effect – Archive-Style Match Cut Videos',
    description:
      'Create a documentary-style text effect: typewritten archive pages on warm paper with a slow push-in on one key word. Free, private, exports HD MP4.',
    template: 'documentary',
    lede: 'Typewritten pages, warm paper and a slow push-in. The archive look for history explainers, true crime and investigative storytelling.',
    sections: [
      {
        h: 'Where this style fits',
        body: (
          <p>
            Documentary editors often cut between scanned letters, reports and clippings while the narration names a single person
            or place. The documentary template recreates that rhythm: each cut is a new “document”, your key word stays highlighted
            in the same spot, and the background is just legible enough to feel like evidence.
          </p>
        ),
      },
      {
        h: 'Recommended settings',
        body: (
          <ul>
            <li>
              <strong>5 cuts per second</strong> or slower – documentary pacing is deliberate.
            </li>
            <li>
              <strong>5–6 seconds</strong> long, so it can sit under a full narrated sentence.
            </li>
            <li>
              <strong>Zoom 30–40%</strong> with motion speed below 1× for a slow push-in.
            </li>
            <li>
              <strong>A little blur</strong> (10–20%) to separate the focal line from the page without hiding it.
            </li>
            <li>
              <strong>Mixed fonts</strong> – Special Elite, IBM Plex Mono and Cormorant make each page look like it came from a
              different file.
            </li>
          </ul>
        ),
      },
      {
        h: 'Writing copy that reads like a document',
        body: (
          <>
            <p>
              Because the background is built from your own words first, it pays to paste more than one sentence. A paragraph of
              narration, a timeline or a list of dates and places will produce pages that feel specific to your story rather than
              generic filler.
            </p>
            <p>
              Keep it honest: if your video is non-fiction, don’t use the effect to imply that a fabricated document is a real
              record. Treat the pages as atmosphere, and show real sources separately.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: 'Which font looks most like a typewriter?',
        a: 'Special Elite. For a cleaner, more modern “report” look, use IBM Plex Mono.',
      },
      {
        q: 'Can I use it in a long-form YouTube video?',
        a: 'Yes. Export in 16:9 at 1080p and drop it into your timeline as a B-roll insert.',
      },
    ],
  },
  {
    slug: 'text-effect-for-reels',
    short: 'Text effect for Reels',
    title: 'Text Effect for Instagram Reels',
    metaTitle: 'Text Effect for Instagram Reels – Vertical 1080×1920 Exports',
    description:
      'Make a scroll-stopping text effect for Instagram Reels. Vertical 1080×1920 MP4, safe-zone friendly positioning and styles built for the first second.',
    template: 'social-captions',
    lede: 'A vertical, 1080×1920 text match cut built to stop the scroll in the first second of a Reel – and to stay clear of Instagram’s on-screen buttons.',
    sections: [
      {
        h: 'Format and length',
        body: (
          <p>
            Reels are vertical. Export at <strong>9:16, 1080p</strong> and you get a 1080×1920 MP4, which Instagram accepts without
            re-cropping. As an opener, keep the text effect short – three to five seconds – and cut straight into your main clip, or
            use it as the whole Reel with a trending sound added inside Instagram.
          </p>
        ),
      },
      {
        h: 'Staying clear of the interface',
        body: (
          <>
            <p>
              Instagram overlays your caption, username and audio label along the bottom of a Reel, and the like/comment/share column
              down the right-hand side. Exact sizes change with app versions and phone shapes, so treat these as rough guides:
            </p>
            <ul>
              <li>Keep the focal word roughly in the middle third of the frame vertically.</li>
              <li>
                Avoid the bottom fifth of the frame, and give the right edge some breathing room – a <em>Horizontal position</em> of
                45–50% works well.
              </li>
              <li>The optional TextSnapy credit sits above the bottom overlay on vertical exports, so it isn’t hidden.</li>
            </ul>
          </>
        ),
      },
      {
        h: 'Styles that suit Reels',
        body: (
          <ul>
            <li>
              <Link href="/create?t=social-captions">Social captions</Link> – clean bold type, good over a talking-head intro.
            </li>
            <li>
              <Link href="/create?t=motivation">Motivation</Link> – large condensed caps with colour cycling.
            </li>
            <li>
              <Link href="/create?t=aesthetic">Aesthetic</Link> – soft pastels for lifestyle and study content.
            </li>
            <li>
              <Link href="/create?t=meme">Meme</Link> – loud and fast for humour accounts.
            </li>
          </ul>
        ),
      },
      {
        h: 'Uploading',
        body: (
          <p>
            On a phone, use <em>Share video</em> after exporting to send the file straight to Instagram, or save it to your camera
            roll first. On desktop, download the MP4 and upload it from instagram.com or Meta Business Suite. If your browser
            produced a WebM file instead of MP4, re-export from Chrome, Edge or Safari – Instagram prefers MP4.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'Will Instagram reduce the quality?',
        a: 'Instagram re-encodes every upload. Starting from a clean 1080p file with large, high-contrast type gives the best result after compression.',
      },
      {
        q: 'Can I make a 1:1 version for the feed too?',
        a: 'Switch the format to 1:1 and export again. The focal word stays anchored; the layout reflows to fill the square.',
      },
    ],
  },
  {
    slug: 'text-effect-for-shorts',
    short: 'Text effect for Shorts',
    title: 'Text Effect for YouTube Shorts',
    metaTitle: 'Text Effect for YouTube Shorts – Free Vertical Text Animation',
    description:
      'Create a text effect for YouTube Shorts: a vertical match-cut animation that loops cleanly, exports as 1080×1920 MP4 and works as an intro or a full Short.',
    template: 'finance',
    lede: 'Vertical match-cut text that works as a Shorts hook, a recurring series intro, or a complete Short on its own.',
    sections: [
      {
        h: 'Hooks, intros and loops',
        body: (
          <>
            <p>
              Shorts autoplay and loop, so the first frame and the last frame both matter. Two techniques help:
            </p>
            <ul>
              <li>
                <strong>Finish on the word.</strong> With this setting on, the last beat holds the focal word alone. When the Short
                loops back to the busy first frame, the word is already in place, so the loop feels intentional.
              </li>
              <li>
                <strong>Use the same template for a series.</strong> Copy the shareable link once you’ve designed your look; open it
                for each new episode and just change the text. Viewers start recognising your intro.
              </li>
            </ul>
          </>
        ),
      },
      {
        h: 'Specs to export',
        body: (
          <p>
            Choose 9:16 at 1080p. For very fast cut rates, 60 fps keeps each cut crisp. The MP4 uses the H.264 codec, which YouTube
            processes quickly. Shorts can now be up to three minutes long, but a text-effect hook usually works best at three to six
            seconds before you cut to the main content.
          </p>
        ),
      },
      {
        h: 'Good fits for Shorts',
        body: (
          <ul>
            <li>
              <strong>Finance and business:</strong> lock the key term or number (“compound”, “40%”) in the Finance style.
            </li>
            <li>
              <strong>Gaming:</strong> the Gaming style’s neon HUD look with shake transitions.
            </li>
            <li>
              <strong>Explainers:</strong> Minimal or Documentary for a calmer, more credible tone.
            </li>
          </ul>
        ),
      },
    ],
    faq: [
      {
        q: 'Does YouTube accept WebM?',
        a: 'Yes, YouTube accepts WebM as well as MP4, so either export will upload. MP4 is still the safest choice if you also post the same file elsewhere.',
      },
      {
        q: 'Can I add a voice-over?',
        a: 'Export with the cut sound off, then record your voice-over in the YouTube Shorts editor or any video app.',
      },
    ],
  },
  {
    slug: 'text-animation-generator',
    short: 'Text animation generator',
    title: 'Text Animation Generator',
    metaTitle: 'Text Animation Generator – Free Online, Exports MP4',
    description:
      'A free online text animation generator. Choose a style, animate a line of text with cuts, zoom and transitions, and export an HD MP4 – right in your browser.',
    template: 'cinematic',
    lede: 'Animate a line of text without learning a motion-graphics app. Fifteen styles, full control over type, colour and motion, and an HD export rendered on your own device.',
    sections: [
      {
        h: 'What you can animate',
        body: (
          <p>
            TextSnapy animates a single idea at a time: one line of text with one anchored word. That constraint is deliberate. It
            means every control is relevant, the preview is instant, and you can go from a blank page to a finished clip in under a
            minute. If you need multi-scene titles or character-by-character animation, a full editor like DaVinci Resolve or
            After Effects is a better tool – and a TextSnapy clip still drops neatly into either.
          </p>
        ),
      },
      {
        h: 'The controls, explained',
        body: (
          <dl className="deflist">
            <dt>Type</dt>
            <dd>Font, size, weight, letter spacing, line spacing and case. Mix fonts makes each background line use a different typeface.</dd>
            <dt>Layout</dt>
            <dd>Page (full-bleed lines), Newspaper (columns and headlines) or Caption (a few words around the focal word), plus highlight style and position.</dd>
            <dt>Colour</dt>
            <dd>Background treatment (solid, paper, vignette, film grain), four colours and optional colour cycling per cut.</dd>
            <dt>Motion</dt>
            <dd>Cuts per second, duration, zoom, motion speed, background blur, transition and an optional final hold on the word.</dd>
            <dt>Sound</dt>
            <dd>Tick, click, typewriter or bass thump on each cut – synthesised in the browser, so it’s royalty-free.</dd>
          </dl>
        ),
      },
      {
        h: 'Accessibility and comfort',
        body: (
          <>
            <p>
              Fast-moving text can be uncomfortable for some viewers. A few habits make your animation easier on everyone:
            </p>
            <ul>
              <li>Keep high contrast between the focal word and its highlight.</li>
              <li>Avoid flash transitions above three per second – the editor warns you when you get close.</li>
              <li>Repeat the key message in your caption or description so it’s available as plain text to screen readers.</li>
            </ul>
            <p>
              If your system is set to reduce motion, TextSnapy’s preview starts paused – you can still press play whenever you like.
            </p>
          </>
        ),
      },
      {
        h: 'Privacy by design',
        body: (
          <p>
            Your text is rendered to a canvas and encoded into video by your browser. Nothing you type is sent to a server, and your
            latest design is saved only in your browser’s local storage. See the <Link href="/privacy">privacy policy</Link> for
            details.
          </p>
        ),
      },
    ],
    faq: [
      {
        q: 'Do I need to install anything?',
        a: 'No. It runs in any current version of Chrome, Edge, Safari or Firefox on desktop or mobile.',
      },
      {
        q: 'Why is export faster in some browsers?',
        a: 'Browsers with the WebCodecs API (Chrome, Edge, recent Safari and Firefox) encode frames as fast as your device allows. Others fall back to real-time recording, so a five-second clip takes about five seconds.',
      },
    ],
  },
]

export const TOOL_MAP = new Map(TOOLS.map((t) => [t.slug, t]))
