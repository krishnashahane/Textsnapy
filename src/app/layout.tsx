import type { Metadata, Viewport } from 'next'
import Analytics from '@/components/Analytics'
import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import VercelAnalytics from '@/components/VercelAnalytics'
import { ads, adsenseSrc } from '@/lib/ads'
import { sans, serif } from '@/lib/uiFonts'
import { site } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'TextSnapy – Free Text Match Cut Generator', template: '%s | TextSnapy' },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US', url: '/' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  ...(adsenseSrc && { other: { 'google-adsense-account': ads.client } }),
}

export const viewport: Viewport = {
  themeColor: '#0e0d0c',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>{adsenseSrc && <script async src={adsenseSrc} crossOrigin="anonymous" />}</head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  )
}
