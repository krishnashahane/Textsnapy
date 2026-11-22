import Link from 'next/link'
import type { QA } from '@/components/Faq'

/** Plain-text answers (also used for FAQPage structured data). */
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is TextSnapy?',
    a: 'TextSnapy is a free, browser-based tool for making text match-cut videos – short clips where one word stays perfectly still while the text around it changes several times a second.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. There is no sign-up, login or email capture. Open the editor and start typing.',
  },
  {
    q: 'Is it really free? What’s the catch?',
    a: 'It is free with no export limits. The site is supported by ads served through Google AdSense; the editor works fully with an ad blocker.',
  },
  {
    q: 'Is my text uploaded anywhere?',
    a: 'No. Frames are drawn and encoded into video inside your browser. Your latest design is saved in your browser’s local storage so you don’t lose it on refresh. If you copy a shareable link, your text is included in that link – only share it with people you want to see it.',
  },
  {
    q: 'What formats can I export?',
    a: 'MP4 (H.264) in Chrome, Edge and Safari, and in Firefox where the system supports H.264 encoding; otherwise WebM. Resolutions are 720p or 1080p in 9:16, 1:1 or 16:9, at 30 or 60 fps.',
  },
  {
    q: 'Is there a watermark?',
    a: 'There is an optional, small “made with textsnapy” credit that is on by default. You can switch it off with one click before exporting – nothing is locked behind it.',
  },
  {
    q: 'Can I use the videos commercially?',
    a: 'Yes. You own your exports. Fonts are open-licensed and the cut sounds are synthesised in your browser. You are responsible for the words you type and any music you add later.',
  },
  {
    q: 'Why did my export come out as WebM?',
    a: 'Your browser couldn’t encode H.264 video, so TextSnapy used WebM instead. YouTube accepts WebM; for Instagram and TikTok, export from a current version of Chrome, Edge or Safari to get MP4.',
  },
  {
    q: 'Does it work on my phone?',
    a: 'Yes. The editor is designed for touch screens and exports on modern iOS and Android browsers. Very long, high-frame-rate exports may take longer on older phones.',
  },
  {
    q: 'How long can a video be?',
    a: 'Between 2 and 15 seconds. The effect works best short – most hooks are 3 to 6 seconds.',
  },
  {
    q: 'Can I add my own music?',
    a: 'Add music in your video or social app after exporting. That keeps the music properly licensed for the platform you post to.',
  },
  {
    q: 'How do I share a design with someone?',
    a: 'Use “Copy shareable link”. Anyone who opens it gets your exact text and settings in the editor and can remix it.',
  },
]

export const FAQ_ITEMS: QA[] = FAQ.map(({ q, a }) => ({ q, a: <p>{a}</p> }))

export const HOME_FAQ: QA[] = [
  ...FAQ_ITEMS.slice(1, 5),
  FAQ_ITEMS[5] as QA,
  {
    q: 'Where can I learn more?',
    a: (
      <p>
        Start with <Link href="/guides/what-is-a-text-match-cut">what a text match cut is</Link>, then follow the{' '}
        <Link href="/guides/how-to-make-a-text-match-cut">step-by-step tutorial</Link>. The full <Link href="/faq">FAQ</Link> covers
        formats, privacy and licensing.
      </p>
    ),
  },
]
