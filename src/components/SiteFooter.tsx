import Link from 'next/link'
import { TOOLS } from '@/content/tools'
import { GUIDES } from '@/content/guides'
import { site } from '@/lib/site'
import { LogoMark } from './Logo'

const groups = [
  { title: 'Tools', links: TOOLS.map((t) => ({ href: `/${t.slug}`, label: t.short })) },
  {
    title: 'Learn',
    links: [...GUIDES.map((g) => ({ href: `/guides/${g.slug}`, label: g.short })), { href: '/examples', label: 'Examples' }, { href: '/faq', label: 'FAQ' }],
  },
  {
    title: 'TextSnapy',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/templates', label: 'Templates' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/terms', label: 'Terms of Use' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="brand">
            <LogoMark />
            <span>TextSnapy</span>
          </Link>
          <p>{site.tagline} Free, private and made for creators.</p>
          <p className="muted">
            Questions or feedback? <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="site-footer__h">{g.title}</h2>
            <ul>
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container site-footer__base">
        <span>© {new Date().getFullYear()} TextSnapy</span>
        <span>Videos are rendered on your device. Your text never leaves your browser.</span>
      </div>
    </footer>
  )
}
