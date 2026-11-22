import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import EditorLoader from '@/components/EditorLoader'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Create a Text Match Cut Video',
  description:
    'Open the TextSnapy editor: type a line, lock a focal word, pick one of fifteen styles and export an HD MP4 or WebM. Free and private – rendered in your browser.',
  path: '/create',
})

export default function CreatePage() {
  return (
    <div className="container page page--tight">
      <Breadcrumbs items={[{ href: '/create', label: 'Create' }]} />
      <header className="page-head page-head--row">
        <h1>Create a text match cut</h1>
        <p className="muted">
          Your work saves automatically in this browser. New here? <Link href="/guides/how-to-make-a-text-match-cut">Read the 2-minute tutorial</Link>.
        </p>
      </header>
      <EditorLoader />
      <section className="prose narrow section" aria-labelledby="create-tips-h">
        <h2 id="create-tips-h">Getting a clean export</h2>
        <p>
          Keep the line short and the focal word specific. Names, numbers and the last noun of a sentence hold the eye better than
          verbs or filler words. Tap a word in your sentence to lock it, or shift-click to lock a phrase of up to four words.
        </p>
        <p>
          Pacing does most of the work. Four to six cuts per second reads as serious, seven to nine as energetic and ten or more
          as frantic. Most hooks land in three to six seconds; the editor allows anything from two to fifteen.
        </p>
        <h2>Formats and sizes</h2>
        <ul>
          <li>
            <strong>9:16</strong> for Reels, Shorts and TikTok, <strong>1:1</strong> for feed posts, <strong>16:9</strong> for
            YouTube and slides.
          </li>
          <li>720p or 1080p, at 30 or 60 frames per second.</li>
          <li>
            MP4 (H.264) where your browser can encode it – current Chrome, Edge and Safari – otherwise WebM. Instagram and TikTok
            want MP4, so export from one of those browsers if you see a WebM file.
          </li>
        </ul>
        <h2>Saving and sharing</h2>
        <p>
          Your latest design is kept in this browser’s local storage, so a refresh won’t lose it. <em>Copy shareable link</em>{' '}
          puts your text and settings into a URL you can reopen later or send to a collaborator – anyone with the link can read
          the text, so share it with care. The small “made with textsnapy” credit is optional and can be switched off before you
          export.
        </p>
        <p>
          For platform-specific upload tips, see the <Link href="/guides/reels-shorts-tiktok-workflow">posting workflow guide</Link>
          , or browse the <Link href="/examples">examples</Link> for settings that work.
        </p>
      </section>
    </div>
  )
}
