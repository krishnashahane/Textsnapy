import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/AdSlot'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import JsonLd from '@/components/JsonLd'
import { GUIDE_MAP, GUIDES } from '@/content/guides'
import { pageMeta } from '@/lib/meta'
import { absoluteUrl, site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps<'/guides/[slug]'>) {
  const g = GUIDE_MAP.get((await params).slug)
  if (!g) return {}
  return pageMeta({ title: g.title, description: g.description, path: `/guides/${g.slug}` })
}

const fmt = (d: string) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export default async function GuidePage({ params }: PageProps<'/guides/[slug]'>) {
  const g = GUIDE_MAP.get((await params).slug)
  if (!g) notFound()
  const i = GUIDES.indexOf(g)
  const next = GUIDES[(i + 1) % GUIDES.length]
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.title,
          description: g.description,
          datePublished: g.published,
          dateModified: g.published,
          mainEntityOfPage: absoluteUrl(`/guides/${g.slug}`),
          author: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
          publisher: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
        }}
      />
      <div className="container page narrow">
        <Breadcrumbs
          items={[
            { href: '/guides', label: 'Guides' },
            { href: `/guides/${g.slug}`, label: g.short },
          ]}
        />
        <article className="prose">
          <header className="page-head">
            <h1>{g.title}</h1>
            <p className="lede">{g.description}</p>
            <p className="muted small">
              <time dateTime={g.published}>{fmt(g.published)}</time> · {g.minutes} min read
            </p>
          </header>
          {g.body}
          <AdSlot name="article" />
        </article>
        {next && next !== g && (
          <nav className="next-guide" aria-label="Next guide">
            <span className="muted small">Next guide</span>
            <Link href={`/guides/${next.slug}`}>{next.title}</Link>
          </nav>
        )}
      </div>
      <CtaBand />
    </>
  )
}
