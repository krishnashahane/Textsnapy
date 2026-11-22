'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { exportSupported, exportVideo, fileName, type ExportResult, type Quality } from '@/engine/export'
import { shareUrl } from '@/engine/state'
import type { Settings } from '@/engine/types'
import { track } from '@/lib/analytics'
import { resolveFont } from '@/lib/videoFonts'
import { Segmented, Toggle } from './Fields'

type State =
  | { kind: 'idle' }
  | { kind: 'working'; progress: number }
  | { kind: 'done'; result: ExportResult; url: string; name: string; ms: number; source: Settings }
  | { kind: 'error'; message: string }

interface Props {
  settings: Settings
  onCredit: (v: boolean) => void
}

const noSubscribe = () => () => {}

export default function ExportPanel({ settings, onCredit }: Props) {
  const [raw, setState] = useState<State>({ kind: 'idle' })
  // A finished export no longer matches once settings change.
  const state: State = raw.kind === 'done' && raw.source !== settings ? { kind: 'idle' } : raw
  const [quality, setQuality] = useState<Quality>('1080')
  const [fps, setFps] = useState<'30' | '60'>('30')
  const [copied, setCopied] = useState(false)
  const supported = useSyncExternalStore(noSubscribe, exportSupported, () => true)
  const abortRef = useRef<AbortController | null>(null)
  const urlRef = useRef<string | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // Release the previous file whenever a new one is made or the editor unmounts.
  useEffect(
    () => () => {
      abortRef.current?.abort()
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    },
    [],
  )

  const run = async () => {
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    const source = settings
    setState({ kind: 'working', progress: 0 })
    const t0 = performance.now()
    try {
      const result = await exportVideo(settings, resolveFont, {
        quality,
        fps: fps === '60' ? 60 : 30,
        signal: ac.signal,
        onProgress: (progress) => setState({ kind: 'working', progress }),
      })
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      const url = URL.createObjectURL(result.blob)
      urlRef.current = url
      setState({ kind: 'done', result, url, name: fileName(source, result.ext), ms: performance.now() - t0, source })
      track('generation_completed', { template: settings.template, aspect: settings.aspect, format: result.ext, quality })
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return setState({ kind: 'idle' })
      const message = e instanceof Error && e.message ? e.message : 'Something went wrong while encoding.'
      setState({ kind: 'error', message })
    }
  }

  const cancel = () => {
    abortRef.current?.abort()
    setState({ kind: 'idle' })
  }

  const share = async () => {
    const link = shareUrl(window.location.origin, settings)
    track('share_clicked', { template: settings.template, method: 'link' })
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', link)
    }
  }

  const canShareFile =
    state.kind === 'done' &&
    typeof navigator !== 'undefined' &&
    !!navigator.canShare?.({ files: [new File([state.result.blob], state.name, { type: state.result.blob.type })] })

  const shareFile = async () => {
    if (state.kind !== 'done') return
    track('share_clicked', { template: settings.template, method: 'file' })
    try {
      await navigator.share({ files: [new File([state.result.blob], state.name, { type: state.result.blob.type })], title: 'Made with TextSnapy' })
    } catch {
      // User dismissed the share sheet.
    }
  }

  const working = state.kind === 'working'

  return (
    <section id="export" className="export" aria-labelledby="export-h">
      <h3 id="export-h" className="panel-title">
        Export
      </h3>
      {!supported ? (
        <p className="notice notice--warn">
          This browser can’t encode video. Open TextSnapy in a current version of Chrome, Edge, Safari or Firefox to export.
          Your design is saved and will be waiting.
        </p>
      ) : (
        <>
          <div className="export__opts">
            <Segmented
              label="Resolution"
              value={quality}
              onChange={setQuality}
              options={[
                { value: '720', label: '720p' },
                { value: '1080', label: '1080p HD' },
              ]}
            />
            <Segmented
              label="Frame rate"
              value={fps}
              onChange={setFps}
              options={[
                { value: '30', label: '30 fps' },
                { value: '60', label: '60 fps' },
              ]}
            />
          </div>
          <Toggle
            label="Add a small “made with textsnapy” credit"
            hint="Optional. Turn it off any time – exports are free either way."
            checked={settings.credit}
            onChange={onCredit}
          />

          {working ? (
            <div className="export__progress" role="status" aria-live="polite">
              <div className="meter" aria-hidden="true">
                <div className="meter__fill" style={{ transform: `scaleX(${state.progress})` }} />
              </div>
              <div className="export__row">
                <span>Rendering video… {Math.round(state.progress * 100)}%</span>
                <button type="button" className="text-btn" onClick={cancel}>
                  Cancel
                </button>
              </div>
              <p className="field__hint">Rendering happens on your device. Keep this tab open until it finishes.</p>
            </div>
          ) : (
            <button type="button" className="btn btn--primary btn--block" onClick={run}>
              {state.kind === 'done' ? 'Export again' : 'Export video'}
            </button>
          )}

          {state.kind === 'error' && (
            <div className="notice notice--error" role="alert">
              <strong>Export failed.</strong> {state.message}{' '}
              <button type="button" className="text-btn" onClick={run}>
                Try again
              </button>
            </div>
          )}

          {state.kind === 'done' && (
            <div className="export__done" ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
              <video src={state.url} controls loop playsInline className="export__video" style={{ aspectRatio: `${state.result.width} / ${state.result.height}` }} />
              <p className="export__meta">
                <span className="dot" aria-hidden="true" /> Ready · {state.result.ext.toUpperCase()} · {state.result.width}×{state.result.height}
                {settings.sound !== 'off' && !state.result.withAudio && ' · silent (audio encoding unavailable here)'} ·{' '}
                {(state.result.blob.size / 1_000_000).toFixed(1)} MB · {(state.ms / 1000).toFixed(1)}s
              </p>
              <div className="export__actions">
                <a
                  className="btn btn--primary"
                  href={state.url}
                  download={state.name}
                  onClick={() => track('export_completed', { template: settings.template, format: state.result.ext })}
                >
                  Download {state.result.ext.toUpperCase()}
                </a>
                {canShareFile && (
                  <button type="button" className="btn" onClick={shareFile}>
                    Share video
                  </button>
                )}
              </div>
              {state.result.ext === 'webm' && (
                <p className="field__hint">
                  This browser can’t encode MP4, so you got WebM. YouTube accepts WebM; for Instagram or TikTok, export from Chrome,
                  Edge or Safari to get MP4.
                </p>
              )}
            </div>
          )}
        </>
      )}

      <button type="button" className="btn btn--ghost btn--block" onClick={share}>
        {copied ? 'Link copied' : 'Copy shareable link'}
      </button>
      <p className="field__hint">The link contains your text and settings so anyone can open and remix this design.</p>
    </section>
  )
}
