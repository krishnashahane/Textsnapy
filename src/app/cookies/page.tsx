import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Cookie Policy',
  description: 'Which cookies and browser storage TextSnapy uses, why, and how to control them.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" path="/cookies">
      <p className="lede">TextSnapy itself sets no cookies. This page explains the browser storage it uses and the cookies Google sets for advertising.</p>
      <h2>What we use</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Purpose</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>textsnapy:draft:v1</code>
              </td>
              <td>Local storage</td>
              <td>Saves your latest design so you don’t lose it on refresh. Strictly functional.</td>
              <td>Until you clear it</td>
            </tr>
            <tr>
              <td>
                <code>ts:ref</code>
              </td>
              <td>Session storage</td>
              <td>Remembers how you arrived (e.g. “direct”) for aggregate analytics, only if analytics are enabled.</td>
              <td>Until the tab closes</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Analytics</h2>
      <p>We use Vercel Web Analytics, which sets no cookies and does not track you across websites. Any other analytics we use are cookieless too, and all are skipped when your browser sends Do Not Track or Global Privacy Control.</p>
      <h2>Advertising cookies</h2>
      <p>
        The site uses Google AdSense. Google and its partners may set third-party cookies to serve, measure and (where you
        consent) personalise ads, and to prevent fraud. In the EEA, UK and Switzerland, a consent message will ask for your choice before these are used,
        and you can change your choice at any time from the link the message provides. More detail is in the{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <h2>Controlling storage</h2>
      <p>
        You can delete or block cookies and site data in your browser settings. Blocking local storage won’t stop the editor
        working; your design just won’t be remembered between visits.
      </p>
    </LegalPage>
  )
}
