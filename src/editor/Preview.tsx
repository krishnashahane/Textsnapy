'use client'

import { useEffect, useRef, useState } from 'react'
import { hit } from '@/engine/audio'
import { cutCount, holdTime, outputSize, Renderer } from '@/engine/render'
import type { Settings } from '@/engine/types'
import { resolveFont } from '@/lib/videoFonts'

interface Props {
  settings: Settings
  /** Longest side of the preview canvas in device pixels. */
  maxSide?: number
  autoPlay?: boolean
  muted: boolean
  onToggleMute?: () => void
  onReshuffle?: () => void
  /** Phones: pin a mini preview to the corner while the controls below are being edited. */
  dock?: boolean
}

export default function Preview({ settings, maxSide = 960, autoPlay = true, muted, onToggleMute, onReshuffle, dock = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<Renderer | null>(null)
  const settingsRef = useRef(settings)
  const mutedRef = useRef(muted)
  const audioRef = useRef<AudioContext | null>(null)
  const clock = useRef({ t: 0, last: 0 })
  const [playing, setPlaying] = useState(autoPlay)
  const [visible, setVisible] = useState(true)
  const [docked, setDocked] = useState(false)
  const slotRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mutedRef.current = muted
    if (!muted && !audioRef.current && 'AudioContext' in window) audioRef.current = new AudioContext()
    if (!muted) audioRef.current?.resume().catch(() => {})
  }, [muted])

  useEffect(() => () => void audioRef.current?.close().catch(() => {}), [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- respect OS setting on mount
      setPlaying(false)
    }
    const slot = slotRef.current
    if (!slot) return
    const editor = slot.closest('.editor')
    const phone = window.matchMedia('(max-width: 959px)')
    let inSlot = true
    let above = false
    let inEditor = true
    const sync = () => {
      const d = dock && phone.matches && !inSlot && above && inEditor
      setDocked(d)
      setVisible(inSlot || d)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === slot) {
            inSlot = e.isIntersecting
            above = e.boundingClientRect.bottom < 0
          } else inEditor = e.isIntersecting
        }
        sync()
      },
      { threshold: 0.05 },
    )
    io.observe(slot)
    if (editor) io.observe(editor)
    phone.addEventListener('change', sync)
    return () => {
      io.disconnect()
      phone.removeEventListener('change', sync)
    }
  }, [dock])

  // (Re)configure on every settings change; fonts may arrive later and trigger a redraw.
  useEffect(() => {
    settingsRef.current = settings
    const canvas = canvasRef.current
    if (!canvas) return
    try {
      if (!rendererRef.current) rendererRef.current = new Renderer(canvas, resolveFont)
      const { w, h } = outputSize(settings)
      const r = rendererRef.current
      r.configure(settings, Math.min(1, maxSide / Math.max(w, h)))
      r.frame(Math.min(clock.current.t, settings.duration))
      let live = true
      r.loadFonts().then(() => live && r.frame(Math.min(clock.current.t, settingsRef.current.duration)))
      return () => {
        live = false
      }
    } catch (e) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- surface a failed canvas init once
      setError(e instanceof Error ? e.message : 'Preview failed to start.')
    }
  }, [settings, maxSide])

  useEffect(() => {
    if (!playing || !visible) return
    let raf = 0
    let lastCut = -1
    clock.current.last = performance.now()
    const loop = (now: number) => {
      const s = settingsRef.current
      const c = clock.current
      c.t += (now - c.last) / 1000
      c.last = now
      if (c.t >= s.duration) {
        c.t %= s.duration
        lastCut = -1
      }
      const n = cutCount(s)
      const cut = c.t >= s.duration - holdTime(s) && s.endHold ? n : Math.min(n - 1, Math.floor(c.t * s.cps))
      if (cut !== lastCut) {
        const ac = audioRef.current
        if (!mutedRef.current && ac && ac.state === 'running' && s.sound !== 'off') hit(ac, ac.destination, s.sound, ac.currentTime, cut === n)
        lastCut = cut
      }
      rendererRef.current?.frame(c.t)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${c.t / s.duration})`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing, visible])

  const { w, h } = outputSize(settings)

  return (
    <div className="preview">
      <div ref={slotRef} className="preview__slot" style={{ aspectRatio: `${w} / ${h}`, '--ar': w / h } as React.CSSProperties}>
        <div className={`preview__stage${docked ? ' is-docked' : ''}`}>
          <canvas
            ref={canvasRef}
            className="preview__canvas"
            role="img"
            aria-label={`Live preview: "${settings.focus}" held in place while the surrounding text cuts ${settings.cps} times per second.`}
          />
          {error && <p className="preview__error" role="alert">{error}</p>}
          <div className="preview__bar" aria-hidden="true">
            <div ref={progressRef} className="preview__progress" />
          </div>
          {docked && (
            <button
              type="button"
              className="preview__undock"
              aria-label="Back to full preview"
              onClick={() => slotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            />
          )}
        </div>
      </div>
      <div className="preview__controls">
        <button type="button" className="icon-btn" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>
        {onReshuffle && (
          <button type="button" className="icon-btn" onClick={onReshuffle} title="Regenerate the surrounding text">
            <ShuffleIcon />
            <span>Regenerate</span>
          </button>
        )}
        {onToggleMute && (
          <button type="button" className="icon-btn" onClick={onToggleMute} aria-pressed={!muted} disabled={settings.sound === 'off'}>
            {muted || settings.sound === 'off' ? <MuteIcon /> : <SoundIcon />}
            <span>{settings.sound === 'off' ? 'No sound' : muted ? 'Sound off' : 'Sound on'}</span>
          </button>
        )}
      </div>
    </div>
  )
}

const svg = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true } as const
const PlayIcon = () => (
  <svg {...svg}>
    <path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none" />
  </svg>
)
const PauseIcon = () => (
  <svg {...svg}>
    <path d="M8 5v14M16 5v14" strokeWidth={3} />
  </svg>
)
const ShuffleIcon = () => (
  <svg {...svg}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
)
const SoundIcon = () => (
  <svg {...svg}>
    <path d="M11 5 6 9H3v6h3l5 4zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
)
const MuteIcon = () => (
  <svg {...svg}>
    <path d="M11 5 6 9H3v6h3l5 4zM22 9l-6 6M16 9l6 6" />
  </svg>
)
