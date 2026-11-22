import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import { pageMeta } from '@/lib/meta'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'About TextSnapy',
  description: 'Why TextSnapy exists, how it is built, how it is funded and who to contact.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <LegalPage title="About TextSnapy" path="/about" updated={false}>
      <p className="lede">
        TextSnapy is a small, independent web tool for making text match-cut videos. It does one effect, and tries to do it
        properly.
      </p>
      <h2>Why it exists</h2>
      <p>
        The text match cut is a simple idea that is surprisingly tedious to build by hand: dozens of text layers, each aligned to
        the pixel. Many online generators that automate it ask for an account, upload your text to a server or lock exports
        behind a watermark. TextSnapy was built to be the opposite – open the page, type, export.
      </p>
      <h2>How it’s built</h2>
      <p>
        Everything runs in your browser. Frames are drawn with the Canvas API, encoded with the WebCodecs API and packaged into a
        video file with the open-source Mediabunny library. Typefaces are open-licensed Google Fonts served from this site, and cut
        sounds are synthesised with the Web Audio API. There is no server-side processing of your content. You can read more in{' '}
        <Link href="/guides/how-text-match-cuts-work">how text match cuts work</Link>.
      </p>
      <h2>How it’s funded</h2>
      <p>
        TextSnapy is free to use. Hosting and development are covered by advertising served through Google AdSense. Ads are
        never disguised as buttons or editor controls, and the tool stays fully usable with an ad blocker. If optional paid features are ever introduced, the core generator will
        stay free.
      </p>
      <h2>Principles</h2>
      <ul>
        <li>No account required, ever, for making and exporting videos.</li>
        <li>Your text stays on your device.</li>
        <li>No dark patterns: the credit on exports is optional and clearly switchable.</li>
        <li>Original templates and copy – nothing copied from other tools.</li>
      </ul>
      <h2>Contact</h2>
      <p>
        Bug reports, feature ideas and questions are welcome at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        See the <Link href="/contact">contact page</Link> for what to include.
      </p>
    </LegalPage>
  )
}
