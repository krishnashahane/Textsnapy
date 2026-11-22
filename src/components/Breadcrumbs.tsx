import Link from 'next/link'
import { absoluteUrl } from '@/lib/site'
import JsonLd from './JsonLd'

export type Crumb = { href: string; label: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ href: '/', label: 'Home' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
        }}
      />
    </>
  )
}
