import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/AdSlot'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import EditorLoader from '@/components/EditorLoader'
import Faq from '@/components/Faq'
import { GUIDES } from '@/content/guides'
import { TOOL_MAP, TOOLS } from '@/content/tools'
import { pageMeta } from '@/lib/meta'

export const dynamicParams = false

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[tool]'>) {
  const t = TOOL_MAP.get((await params).tool)
  if (!t) return {}
  return pageMeta({ title: t.metaTitle, description: t.description, path: `/${t.slug}` })
}

export default async function ToolPage({ params }: PageProps<'/[tool]'>) {
  const t = TOOL_MAP.get((await params).tool)
  if (!t) notFound()
  const related = TOOLS.filter((x) => x.slug !== t.slug).slice(0, 4)
  return (
    <>
      <div className="container page">
        <Breadcrumbs items={[{ href: `/${t.slug}`, label: t.short }]} />
        <header className="page-head">
          <h1>{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </header>
        <EditorLoader initialTemplate={t.template} headingLevel={2} />
        <div className="article-layout section">
          <article className="prose">
            {t.sections.map((s) => (
              <section key={s.h}>
                <h2>{s.h}</h2>
                {s.body}
              </section>
            ))}
            <AdSlot name="article" />
            <section>
              <h2>Frequently asked</h2>
              <Faq items={t.faq} />
            </section>
          </article>
          <aside className="aside" aria-label="Related">
            <h2 className="aside__h">Related tools</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${r.slug}`}>{r.title}</Link>
                </li>
              ))}
            </ul>
            <h2 className="aside__h">Guides</h2>
            <ul>
              {GUIDES.slice(0, 3).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>{g.short}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <CtaBand href="#editor" label="Back to the editor" />
    </>
  )
}
