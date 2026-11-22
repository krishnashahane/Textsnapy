import Link from 'next/link'

export default function CtaBand({
  title = 'Your first match cut takes about thirty seconds.',
  body = 'Free, no account, nothing uploaded. Type a line, lock a word, export.',
  href = '/create',
  label = 'Open the editor',
}: {
  title?: string
  body?: string
  href?: string
  label?: string
}) {
  return (
    <section className="cta-band" aria-label="Start creating">
      <div className="container cta-band__inner">
        <div>
          <p className="cta-band__title">{title}</p>
          <p className="cta-band__body">{body}</p>
        </div>
        <Link href={href} className="btn btn--primary btn--lg">
          {label}
        </Link>
      </div>
    </section>
  )
}
