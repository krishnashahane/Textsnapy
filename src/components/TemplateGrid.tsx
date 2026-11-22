import Link from 'next/link'
import { TEMPLATES } from '@/engine/templates'
import TemplatePoster from './TemplatePoster'

export default function TemplateGrid({ limit }: { limit?: number }) {
  const list = limit ? TEMPLATES.slice(0, limit) : TEMPLATES
  return (
    <ul className="tgrid">
      {list.map((t) => (
        <li key={t.id}>
          <Link href={`/create?t=${t.id}`} className="tcard">
            <TemplatePoster template={t.id} label={`${t.name} style preview with the word “${t.sample.focus}” highlighted`} />
            <span className="tcard__name">{t.name}</span>
            <span className="tcard__blurb">{t.blurb}</span>
            <span className="tcard__cta">Remix this style →</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
