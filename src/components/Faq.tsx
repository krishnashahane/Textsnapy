import type { ReactNode } from 'react'

export type QA = { q: string; a: ReactNode }

export default function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q} className="faq__item">
          <summary>
            <span>{it.q}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <div className="faq__a">{it.a}</div>
        </details>
      ))}
    </div>
  )
}
