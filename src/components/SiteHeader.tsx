import Link from 'next/link'
import { nav } from '@/lib/site'
import { LogoMark } from './Logo'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand" aria-label="TextSnapy home">
          <LogoMark />
          <span>TextSnapy</span>
        </Link>
        <nav aria-label="Main" className="site-nav">
          <ul>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/create" className="btn btn--primary btn--sm">
          Create video
        </Link>
      </div>
    </header>
  )
}
