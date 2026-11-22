'use client'

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next'

/**
 * Vercel Web Analytics: cookieless, first-party (/_vercel/insights), no cross-site tracking.
 * Holds it to the same promises as the Privacy Policy:
 *  - skipped entirely under Do Not Track / Global Privacy Control;
 *  - query strings and hashes are stripped, because shareable links carry the user's text in `?s=`
 *    and that text must never leave the browser.
 */
function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  if (typeof navigator !== 'undefined') {
    const n = navigator as Navigator & { globalPrivacyControl?: boolean }
    if (n.doNotTrack === '1' || n.globalPrivacyControl === true) return null
  }
  try {
    const url = new URL(event.url)
    url.search = ''
    url.hash = ''
    return { ...event, url: url.toString() }
  } catch {
    return null
  }
}

export default function VercelAnalytics() {
  return <Analytics beforeSend={beforeSend} />
}
