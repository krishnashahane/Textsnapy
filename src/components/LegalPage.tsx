import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import { site } from '@/lib/site'

export default function LegalPage({ title, path, children, updated = true }: { title: string; path: string; children: ReactNode; updated?: boolean }) {
  return (
    <div className="container page narrow">
      <Breadcrumbs items={[{ href: path, label: title }]} />
      <article className="prose">
        <header className="page-head">
          <h1>{title}</h1>
          {updated && <p className="muted small">Last updated {site.legalUpdated}</p>}
        </header>
        {children}
      </article>
    </div>
  )
}
