import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import TemplatePoster from '@/components/TemplatePoster'
import { EXAMPLES } from '@/content/examples'
import { encodeShare } from '@/engine/state'
import { getTemplate, templateSettings } from '@/engine/templates'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Text Match Cut Examples – Before & After',
  description:
    'Before-and-after examples of the text match cut effect for documentaries, product launches, finance tips, sports, newsletters, true crime, study reels and gaming. Remix any of them.',
  path: '/examples',
})

export default function ExamplesPage() {
  return (
    <>
      <div className="container page">
        <Breadcrumbs items={[{ href: '/examples', label: 'Examples' }]} />
        <header className="page-head">
          <h1>Examples</h1>
          <p className="lede">
            The same sentence as a plain caption, and as a match cut. Each example notes why its settings were chosen – open any of
            them in the editor and swap in your own words.
          </p>
        </header>
        <ol className="examples">
          {EXAMPLES.map((e) => {
            const link = `/create?s=${encodeShare({ ...templateSettings(e.template, { text: e.text, focus: e.focus }), ...e.overrides })}`
            return (
              <li key={e.id} className="example">
                <div className="example__text">
                  <h2>{e.title}</h2>
                  <p>{e.note}</p>
                  <p className="muted small">
                    {e.useCase} · {getTemplate(e.template).name} style
                  </p>
                  <Link href={link} className="btn btn--primary">
                    Remix this example
                  </Link>
                </div>
                <figure className="example__before">
                  <div className="plain-caption">
                    <p>{e.text}</p>
                  </div>
                  <figcaption>Before: plain caption</figcaption>
                </figure>
                <figure className="example__after">
                  <TemplatePoster
                    template={e.template}
                    text={e.text}
                    focus={e.focus}
                    overrides={e.overrides}
                    autoplay
                    label={`After: ${getTemplate(e.template).name} match cut with “${e.focus}” locked in place`}
                  />
                  <figcaption>After: match cut</figcaption>
                </figure>
              </li>
            )
          })}
        </ol>
      </div>
      <CtaBand title="Got a line of your own?" body="Every example above started as one sentence. Yours can too." />
    </>
  )
}
