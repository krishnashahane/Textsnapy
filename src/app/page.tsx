import Link from 'next/link'
import CtaBand from '@/components/CtaBand'
import EditorLoader from '@/components/EditorLoader'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import TemplateGrid from '@/components/TemplateGrid'
import { HOME_FAQ } from '@/content/faq'
import { TOOLS } from '@/content/tools'
import { pageMeta } from '@/lib/meta'
import { absoluteUrl, site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'TextSnapy – Free Text Match Cut Generator for Reels, Shorts & TikTok',
  absoluteTitle: true,
  description: site.description,
  path: '/',
})

const steps = [
  { n: '1', h: 'Write a line', p: 'A hook, a quote, a product name. Your words become the background of every cut.' },
  { n: '2', h: 'Lock one word', p: 'Tap the word that matters. It stays pinned to the same pixel while everything else changes.' },
  { n: '3', h: 'Choose a style', p: 'Fifteen original looks – from archive paper to neon HUD – each fully adjustable.' },
  { n: '4', h: 'Export & post', p: 'Render an HD MP4 on your own device and send it straight to Reels, Shorts or TikTok.' },
]

const uses = [
  { h: 'Hooks that stop the scroll', p: 'One word, repeated across twenty pages in two seconds, says “this matters” before a viewer can swipe.' },
  { h: 'Series intros', p: 'Save a look as a link and reuse it every episode. Change the word, keep the identity.' },
  { h: 'Explainers & lessons', p: 'Introduce the key term of a lesson – “inflation”, “recursion” – so it sticks.' },
  { h: 'Launches & teasers', p: 'Let a product name or date hold still while the world moves around it.' },
]

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.name,
          url: absoluteUrl('/'),
          publisher: { '@type': 'Organization', name: site.name, url: absoluteUrl('/'), logo: absoluteUrl('/icon.svg') },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: site.name,
          url: absoluteUrl('/'),
          description: site.description,
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Any (web browser)',
          browserRequirements: 'Requires a modern browser with JavaScript and Canvas support.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }}
      />
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            One word holds still.
            <br />
            <em>Everything else cuts.</em>
          </h1>
          <p className="hero__lede">
            {site.tagline} Type a line, lock the word that matters and export an HD video for Reels, Shorts or TikTok – no account,
            nothing uploaded.
          </p>
          <div className="hero__cta">
            <a href="#editor" className="btn btn--primary btn--lg">
              Start creating
            </a>
            <Link href="/examples" className="btn btn--ghost btn--lg">
              See examples
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--editor" aria-label="Editor">
        <div className="container">
          <EditorLoader />
        </div>
      </section>

      <section className="section" aria-labelledby="styles-h">
        <div className="container">
          <div className="section__head">
            <h2 id="styles-h">Fifteen styles to start from</h2>
            <p>Hover to preview. Every style is a starting point – change the font, colours, rhythm and sound to make it yours.</p>
          </div>
          <TemplateGrid limit={8} />
          <p className="section__more">
            <Link href="/templates" className="link-arrow">
              Browse all fifteen styles
            </Link>
          </p>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="how-h">
        <div className="container">
          <div className="section__head">
            <h2 id="how-h">How it works</h2>
            <p>From blank page to finished clip in about thirty seconds.</p>
          </div>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.n}>
                <span className="steps__n">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="use-h">
        <div className="container split">
          <div>
            <h2 id="use-h">What creators use it for</h2>
            <p className="muted">
              A match cut is punctuation, not prose. It works best at the moments you want remembered.
            </p>
          </div>
          <dl className="uses">
            {uses.map((u) => (
              <div key={u.h}>
                <dt>{u.h}</dt>
                <dd>{u.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="about-h">
        <div className="container prose-cols">
          <div>
            <h2 id="about-h">What is a text match cut?</h2>
            <p>
              In film, a match cut joins two shots that share a shape or movement, so the change of scene feels seamless. A text
              match cut applies that idea to typography: one word sits in exactly the same place on every frame, while the page,
              font and surrounding sentences change several times a second.
            </p>
            <p>
              Because the eye is drawn to the only thing that doesn’t move, the focal word lands with unusual force. That is why the
              effect has become a staple opener on short-form video.{' '}
              <Link href="/guides/what-is-a-text-match-cut">Read the full explainer</Link>.
            </p>
          </div>
          <div>
            <h2>Private by design</h2>
            <p>
              Most video tools upload your project to render it. TextSnapy doesn’t. Every frame is drawn on a canvas in your
              browser and encoded with your device’s own video encoder, so your words stay on your device and exports don’t wait in
              a queue.
            </p>
            <p>
              Your latest design is saved locally so a refresh never loses work. <Link href="/privacy">How we handle data</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="tools-h">
        <div className="container">
          <div className="section__head">
            <h2 id="tools-h">Made for the way you post</h2>
          </div>
          <ul className="link-grid">
            {TOOLS.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`}>
                  <strong>{t.title}</strong>
                  <span>{t.lede.split('. ')[0]}.</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--rule" aria-labelledby="faq-h">
        <div className="container narrow">
          <h2 id="faq-h">Common questions</h2>
          <Faq items={HOME_FAQ} />
        </div>
      </section>

      <CtaBand href="#editor" label="Make yours now" />
    </>
  )
}
