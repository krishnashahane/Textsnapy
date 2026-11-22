import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { GUIDES } from '@/content/guides'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Guides – Text Match Cuts & Kinetic Typography',
  description:
    'Tutorials and explainers on text match cuts: what they are, how to make one, how the effect works, ideas for using it and how to post to Reels, Shorts and TikTok.',
  path: '/guides',
})

export default function GuidesPage() {
  return (
    <>
      <div className="container page narrow">
        <Breadcrumbs items={[{ href: '/guides', label: 'Guides' }]} />
        <header className="page-head">
          <h1>Guides</h1>
          <p className="lede">Short, practical reading on the text match cut – from the idea behind it to getting it onto your feed.</p>
        </header>
        <ol className="guide-list">
          {GUIDES.map((g, i) => (
            <li key={g.slug}>
              <span className="guide-list__n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h2>
                <p>{g.description}</p>
                <p className="muted small">{g.minutes} min read</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
