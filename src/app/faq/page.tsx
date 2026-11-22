import Breadcrumbs from '@/components/Breadcrumbs'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { FAQ, FAQ_ITEMS } from '@/content/faq'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'FAQ – Formats, Privacy, Licensing',
  description: 'Answers about TextSnapy: accounts, pricing, privacy, export formats, watermarks, commercial use, mobile support and sharing designs.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <div className="container page narrow">
        <Breadcrumbs items={[{ href: '/faq', label: 'FAQ' }]} />
        <header className="page-head">
          <h1>Frequently asked questions</h1>
          <p className="lede">Can’t find what you need? Get in touch through the contact page.</p>
        </header>
        <Faq items={FAQ_ITEMS} />
      </div>
    </>
  )
}
