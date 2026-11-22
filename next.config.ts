import type { NextConfig } from 'next'
import { adsenseSrc } from './src/lib/ads'

const dev = process.env.NODE_ENV !== 'production'
const adsOn = !!adsenseSrc
const analyticsSrc = (process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? '').trim()
const analyticsOrigin = /^https:\/\//.test(analyticsSrc) ? new URL(analyticsSrc).origin : ''

// Google's published AdSense hosts. Added whenever the AdSense loader is on the page.
const adHosts = adsOn
  ? [
      'https://pagead2.googlesyndication.com',
      'https://*.googlesyndication.com',
      'https://*.doubleclick.net',
      'https://*.google.com',
      'https://*.googleadservices.com',
      'https://fundingchoicesmessages.google.com',
      'https://*.gstatic.com',
      'https://*.adtrafficquality.google',
      'https://*.googletagservices.com',
    ]
  : []

const csp = [
  "default-src 'self'",
  // Next.js inlines its bootstrap scripts; statically rendered pages cannot carry per-request nonces.
  `script-src 'self' 'unsafe-inline' ${dev ? "'unsafe-eval'" : ''} ${analyticsOrigin} ${adHosts.join(' ')}`,
  // Google's consent message (required for EEA/UK visitors) styles itself with Google Fonts.
  `style-src 'self' 'unsafe-inline' ${adsOn ? 'https://fonts.googleapis.com' : ''}`,
  `img-src 'self' data: blob: ${adsOn ? 'https:' : ''}`,
  `font-src 'self' ${adsOn ? 'https://fonts.gstatic.com' : ''}`,
  "media-src 'self' blob:",
  `connect-src 'self' ${analyticsOrigin} ${adHosts.join(' ')}`,
  "worker-src 'self' blob:",
  `frame-src ${adsOn ? adHosts.join(' ') : "'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
]
  .map((d) => d.replace(/\s+/g, ' ').trim())
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
]

const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    // Single-hop, permanent redirects for common alternate paths.
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'textsnapy.vercel.app' }],
        destination: 'https://www.textsnapy.com/:path*',
        permanent: true,
      },
      // The apex redirects to www here rather than at the domain level, so /ads.txt can answer 200 on the root domain AdSense checks.
      { source: '/', has: [{ type: 'host', value: 'textsnapy.com' }], destination: 'https://www.textsnapy.com/', permanent: true },
      {
        source: '/:path((?!(?:ads|robots)\\.txt$).+)',
        has: [{ type: 'host', value: 'textsnapy.com' }],
        destination: 'https://www.textsnapy.com/:path',
        permanent: true,
      },
      { source: '/editor', destination: '/create', permanent: true },
      { source: '/generator', destination: '/create', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-use', destination: '/terms', permanent: true },
      { source: '/cookie-policy', destination: '/cookies', permanent: true },
    ]
  },
}

export default config
