import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import { pageMeta } from '@/lib/meta'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Contact',
  description: 'Contact TextSnapy with bug reports, feature requests, privacy questions or legal notices.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <LegalPage title="Contact" path="/contact" updated={false}>
      <p className="lede">The fastest way to reach TextSnapy is by email.</p>
      <p className="contact-email">
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
      <h2>Reporting a bug</h2>
      <p>To help reproduce the problem, please include:</p>
      <ul>
        <li>your browser and version, and your device (for example “Safari 18 on iPhone 15”);</li>
        <li>what you expected and what happened instead, including any error message;</li>
        <li>if you can, a shareable link to the design (use “Copy shareable link” in the editor).</li>
      </ul>
      <h2>Privacy and legal requests</h2>
      <p>
        For questions about the <Link href="/privacy">privacy policy</Link>, data requests, or to report content or a copyright concern,
        email the same address with “Privacy” or “Legal” in the subject line.
      </p>
      <h2>Response times</h2>
      <p>TextSnapy is run independently, so replies can take a few days. Every message is read.</p>
    </LegalPage>
  )
}
