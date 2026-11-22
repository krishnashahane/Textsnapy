import Link from 'next/link'

export const metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <div className="container page narrow not-found">
      <h1>
        This page <em>cut</em> away.
      </h1>
      <p className="lede">Error 404. The link may be old or mistyped. Everything else is still where you left it.</p>
      <div className="hero__cta">
        <Link href="/create" className="btn btn--primary btn--lg">
          Open the editor
        </Link>
        <Link href="/" className="btn btn--ghost btn--lg">
          Go home
        </Link>
      </div>
    </div>
  )
}
