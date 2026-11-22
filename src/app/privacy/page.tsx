import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import { pageMeta } from '@/lib/meta'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'How TextSnapy handles data: your text stays in your browser, no accounts, optional cookieless analytics and how Google AdSense advertising uses cookies.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <p className="lede">
        Short version: TextSnapy does not ask who you are, and the text you type is processed in your browser, not on our servers.
      </p>
      <p>
        This policy explains what information is involved when you use TextSnapy (the “site”, “we”, “us”). If anything is unclear,
        contact <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>1. Content you create</h2>
      <p>
        Text, focal words and settings you enter in the editor are used by JavaScript running in your browser to draw frames and
        encode your video. They are not transmitted to us or to any third party. Exported videos are created on your device and
        saved wherever you choose.
      </p>
      <p>
        <strong>Shareable links.</strong> If you click “Copy shareable link”, your text and settings are encoded into that URL.
        Anyone with the link can see them, and when the link is opened, it is requested from our host like any other page address
        (see section 3). Only share links you’re comfortable sharing.
      </p>

      <h2>2. Storage on your device</h2>
      <ul>
        <li>
          <strong>Local storage</strong> keeps your most recent design so it survives a refresh. It never leaves your device; you
          can clear it at any time through your browser settings.
        </li>
        <li>
          <strong>Session storage</strong> may hold a short referral label (for example “direct” or the referring website’s domain)
          for the current tab, used only if analytics are enabled.
        </li>
      </ul>
      <p>
        These are strictly functional and are not used to identify you. See the <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2>3. Hosting and server logs</h2>
      <p>
        The site is hosted on Vercel. Like any web host, Vercel processes technical data needed to deliver pages – such as IP
        address, user agent, requested URL and timestamps – and may keep it in logs for security and reliability for a limited
        period. We don’t use these logs to profile visitors.
      </p>

      <h2>4. Analytics</h2>
      <p>
        We use Vercel Web Analytics and may use other privacy-focused, cookieless analytics (such as Umami or Plausible) to
        understand which pages and features are used. Page addresses are recorded without query strings, so the content of
        shareable links is never sent. If enabled, these record aggregated events such as page views, template selected, export completed, device type
        (mobile, tablet or desktop), referring website and approximate country derived from your IP address – which is not
        stored. They never receive the text you type. Analytics are skipped entirely if your browser sends a Do Not Track or
        Global Privacy Control signal.
      </p>

      <h2>5. Advertising</h2>
      <p>
        The site uses Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your
        prior visits to this website or other websites. Google’s use of advertising cookies enables it and its partners to serve
        ads to you based on your visits to this and other sites on the Internet, and to measure ads and prevent fraud. You can
        learn more in{' '}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
          how Google uses information from sites that use its services
        </a>{' '}
        and manage personalised ads at{' '}
        <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
          Google Ad Settings
        </a>
        . You can also opt out of some third-party vendors’ use of cookies for personalised advertising at{' '}
        <a href="https://optout.aboutads.info" rel="noopener noreferrer" target="_blank">
          aboutads.info
        </a>{' '}
        or, in Europe,{' '}
        <a href="https://www.youronlinechoices.eu" rel="noopener noreferrer" target="_blank">
          youronlinechoices.eu
        </a>
        . Visitors in the European Economic Area, the United Kingdom and Switzerland will be asked for consent through a
        Google-certified consent message before personalised ads or non-essential cookies are used.
      </p>

      <h2>6. Email</h2>
      <p>
        If you email us, we receive your email address and whatever you include in the message. We use it only to reply and keep
        the correspondence for as long as needed to deal with your request.
      </p>

      <h2>7. Children</h2>
      <p>
        The site is not directed at children under 13 (or the minimum age required in your country) and we do not knowingly
        collect personal information from them.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Depending on where you live – for example under the GDPR, UK GDPR, California law or India’s Digital Personal Data
        Protection Act – you may have rights to access, correct or delete personal data, or to object to certain processing.
        Because we don’t hold accounts or the content you create, there is usually very little data to act on, but we will respond
        to any request sent to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>

      <h2>9. Security</h2>
      <p>
        The site is served only over HTTPS with a strict Content Security Policy and other protective headers. No method of
        transmission or storage is perfectly secure, but keeping your content on your own device removes most of the risk.
      </p>

      <h2>10. Changes</h2>
      <p>
        We’ll update this page if our practices change, and revise the date at the top. Significant changes will be noted on the
        site.
      </p>
    </LegalPage>
  )
}
