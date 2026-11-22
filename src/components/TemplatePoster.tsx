'use client'

import { useEffect, useRef, useState } from 'react'
import { Renderer } from '@/engine/render'
import { templateSettings } from '@/engine/templates'
import type { Settings } from '@/engine/types'
import { resolveFont } from '@/lib/videoFonts'

interface Props {
  template: string
  text?: string
  focus?: string
  overrides?: Partial<Settings>
  /** Loop continuously while on screen instead of only on hover. */
  autoplay?: boolean
  label: string
}

/** Small live render of a template. Draws one still frame, animates on hover/focus or while visible. */
export default function TemplatePoster({ template, text, focus, overrides, autoplay = false, label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const animate = visible && (hover || autoplay) && !reduced

  useEffect(() => {
    const el = ref.current
    if (!el || !visible) return
    const base = templateSettings(template, text && focus ? { text, focus } : undefined)
    const s: Settings = { ...base, ...overrides, aspect: overrides?.aspect ?? '9:16', credit: false }
    const r = new Renderer(el, resolveFont)
    r.configure(s, 0.3)
    const still = Math.min(s.duration * 0.4, 1.2)
    r.frame(still)
    let live = true
    let raf = 0
    r.loadFonts().then(() => {
      if (!live) return
      r.frame(still)
      if (!animate) return
      const t0 = performance.now()
      const loop = (now: number) => {
        r.frame(((now - t0) / 1000) % s.duration)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })
    return () => {
      live = false
      cancelAnimationFrame(raf)
    }
  }, [template, text, focus, overrides, visible, animate])

  return (
    <canvas
      ref={ref}
      className="poster"
      role="img"
      aria-label={label}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    />
  )
}
