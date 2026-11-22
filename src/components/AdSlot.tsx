'use client'

import { useEffect, useRef } from 'react'
import { ads, type AdSlotName } from '@/lib/ads'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/**
 * A clearly labelled, reserved ad unit. Renders nothing until AdSense is configured,
 * and is only placed after substantial content – never beside editor controls.
 */
export default function AdSlot({ name }: { name: AdSlotName }) {
  const slot = ads.slots[name]
  const pushed = useRef(false)

  useEffect(() => {
    if (!ads.enabled || !slot || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Blocked or failed – the page is fine without it.
    }
  }, [slot])

  if (!ads.enabled || !slot) return null
  return (
    <aside className="ad" aria-label="Advertisement">
      <span className="ad__label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 250 }}
        data-ad-client={ads.client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
