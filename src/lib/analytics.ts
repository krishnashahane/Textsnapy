/*
 * Privacy-first event layer. Nothing is sent unless a provider is configured,
 * Do Not Track / Global Privacy Control are honoured, and no user text ever
 * leaves the browser – only event names and coarse properties.
 */

export type EventName =
  | 'page_view'
  | 'generator_started'
  | 'template_selected'
  | 'generation_completed'
  | 'export_completed'
  | 'share_clicked'
  | 'template_remixed'

type Props = Record<string, string | number | boolean>

const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? '').trim()

export const analyticsConfig = {
  provider: provider === 'umami' || provider === 'plausible' ? provider : '',
  src: (process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? '').trim(),
  id: (process.env.NEXT_PUBLIC_ANALYTICS_ID ?? '').trim(),
}

export const analyticsEnabled = () => !!analyticsConfig.provider && !!analyticsConfig.src

declare global {
  interface Window {
    umami?: { track: (name: string, data?: Props) => void }
    plausible?: (name: string, opts?: { props?: Props }) => void
  }
}

function optedOut(): boolean {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean }
  return n.doNotTrack === '1' || n.globalPrivacyControl === true
}

export function deviceType(): 'mobile' | 'tablet' | 'desktop' {
  const w = Math.min(window.screen.width, window.innerWidth)
  const coarse = window.matchMedia('(pointer: coarse)').matches
  return coarse && w < 600 ? 'mobile' : coarse && w < 1100 ? 'tablet' : 'desktop'
}

/** First-touch referral for this tab session: utm_source, else referrer host. */
export function referralSource(): string {
  try {
    const cached = sessionStorage.getItem('ts:ref')
    if (cached) return cached
    const utm = new URLSearchParams(location.search).get('utm_source')
    let ref = 'direct'
    if (utm) ref = utm.slice(0, 40).replace(/[^\w.-]/g, '')
    else if (document.referrer) {
      const host = new URL(document.referrer).hostname
      if (host !== location.hostname) ref = host
    }
    sessionStorage.setItem('ts:ref', ref)
    return ref
  } catch {
    return 'unknown'
  }
}

export function track(name: EventName, props: Props = {}) {
  if (typeof window === 'undefined' || !analyticsEnabled() || optedOut()) return
  const data: Props = { ...props, device: deviceType(), referral_source: referralSource() }
  try {
    if (analyticsConfig.provider === 'umami') window.umami?.track(name, data)
    else if (analyticsConfig.provider === 'plausible') window.plausible?.(name, { props: data })
  } catch {
    // Analytics must never break the product.
  }
}
