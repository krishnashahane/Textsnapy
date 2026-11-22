import Script from 'next/script'
import { analyticsConfig, analyticsEnabled } from '@/lib/analytics'

/**
 * Loads the configured cookieless analytics script. Both supported providers record
 * page_view (including client-side navigations), referrer, device and country themselves.
 */
export default function Analytics() {
  const { provider, src, id } = analyticsConfig
  if (!analyticsEnabled() || !/^https:\/\//.test(src)) return null
  return provider === 'umami' ? (
    <Script src={src} data-website-id={id} data-do-not-track="true" strategy="afterInteractive" />
  ) : (
    <Script src={src} data-domain={id} strategy="afterInteractive" />
  )
}
