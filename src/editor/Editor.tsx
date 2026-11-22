'use client'

import { useEffect, useRef, useState } from 'react'
import { EXAMPLES } from '@/content/examples'
import { FONTS } from '@/engine/fonts'
import { RANGES } from '@/engine/state'
import { TEMPLATES, templateSettings } from '@/engine/templates'
import { MAX_TEXT } from '@/engine/text'
import { FONT_IDS, type Aspect, type Background, type Highlight, type Layout, type Settings, type Sound, type TextCase, type Transition } from '@/engine/types'
import ExportPanel from './ExportPanel'
import { ColorField, Segmented, Select, Slider, Toggle } from './Fields'
import FocusPicker from './FocusPicker'
import Preview from './Preview'
import { useEditor } from './useEditor'

const TABS = ['Type', 'Layout', 'Colour', 'Motion', 'Sound'] as const
type Tab = (typeof TABS)[number]

const ASPECT_OPTS: { value: Aspect; label: string; title: string }[] = [
  { value: '9:16', label: '9:16', title: 'Reels, Shorts, TikTok, Stories' },
  { value: '1:1', label: '1:1', title: 'Instagram & LinkedIn feed' },
  { value: '16:9', label: '16:9', title: 'YouTube, X, presentations' },
]

const pct = (v: number) => `${Math.round(v * 100)}%`

export default function Editor({ initialTemplate, headingLevel = 2 }: { initialTemplate?: string; headingLevel?: 2 | 3 }) {
  const { settings: s, update, chooseTemplate, replace, notice, dismiss, undo } = useEditor(initialTemplate)
  const [tab, setTab] = useState<Tab>('Type')
  const [muted, setMuted] = useState(true)
  const H = `h${headingLevel}` as 'h2' | 'h3'
  const singleWeight = FONTS[s.font].weights.length === 1
  const flashRisk = s.transition === 'flash' && s.cps > 3
  const rootRef = useRef<HTMLDivElement>(null)
  const [jump, setJump] = useState(false)

  // Phones: offer a shortcut to Export once the user is working in the controls – not over the preview, not at Export itself.
  useEffect(() => {
    const root = rootRef.current
    const exp = root?.querySelector('#export')
    const slot = root?.querySelector('.preview__slot')
    if (!root || !exp || !slot) return
    let inEditor = false
    let inExport = false
    let inPreview = true
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === root) inEditor = e.isIntersecting
        else if (e.target === exp) inExport = e.isIntersecting
        else inPreview = e.isIntersecting
      }
      setJump(inEditor && !inExport && !inPreview)
    })
    io.observe(root)
    io.observe(exp)
    io.observe(slot)
    return () => io.disconnect()
  }, [])

  const set =
    <K extends keyof Settings>(k: K) =>
    (v: Settings[K]) =>
      update({ [k]: v } as Partial<Settings>)

  const loadExample = (id: string) => {
    const ex = EXAMPLES.find((e) => e.id === id)
    if (!ex) return
    replace({ ...templateSettings(ex.template, { text: ex.text, focus: ex.focus }), ...ex.overrides, aspect: s.aspect, credit: s.credit }, `Loaded “${ex.title}”.`)
  }

  return (
    <div className="editor" ref={rootRef}>
      <div className="editor__preview">
        <Preview
          settings={s}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          onReshuffle={() => update({ seed: (s.seed % RANGES.seed.max) + 1 })}
          dock
        />
        <Segmented label="Format" value={s.aspect} onChange={set('aspect')} options={ASPECT_OPTS} />
        <p className="field__hint aspect-hint">{ASPECT_OPTS.find((o) => o.value === s.aspect)?.title}</p>
        <a href="#export" className="btn btn--primary preview-export">
          Export video
          <ArrowDown />
        </a>
      </div>

      <div className="editor__panel">
        {notice && (
          <div className="notice" role="status">
            <span>{notice.message}</span>
            {notice.undo && (
              <button type="button" className="text-btn" onClick={undo}>
                Undo
              </button>
            )}
            <button type="button" className="text-btn" onClick={dismiss} aria-label="Dismiss">
              ×
            </button>
          </div>
        )}

        <section className="panel" aria-labelledby="step-text">
          <H id="step-text" className="panel-title">
            <span className="step">1</span> Write your line
          </H>
          <div className="field">
            <label htmlFor="ts-text" className="sr-only">
              Your text
            </label>
            <textarea
              id="ts-text"
              className="input textarea"
              value={s.text}
              maxLength={MAX_TEXT}
              rows={3}
              placeholder="Type or paste a sentence, quote or script line…"
              onChange={(e) => update({ text: e.target.value })}
            />
            <div className="field__head field__hint">
              <span>Your words fill the background of every cut.</span>
              <span>
                {s.text.length}/{MAX_TEXT}
              </span>
            </div>
          </div>
          <FocusPicker text={s.text} focus={s.focus} onChange={set('focus')} />
          <div className="examples-row">
            <span className="field__label">Try an example</span>
            <div className="examples-row__list">
              {EXAMPLES.slice(0, 5).map((e) => (
                <button key={e.id} type="button" className="pill" onClick={() => loadExample(e.id)}>
                  {e.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" aria-labelledby="step-style">
          <H id="step-style" className="panel-title">
            <span className="step">2</span> Pick a style
          </H>
          <div className="template-pills" role="radiogroup" aria-labelledby="step-style">
            {TEMPLATES.map((t) => {
              const ts = templateSettings(t.id)
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={s.template === t.id}
                  className={`tpill${s.template === t.id ? ' is-on' : ''}`}
                  onClick={() => chooseTemplate(t.id)}
                  title={t.blurb}
                >
                  <span className="tpill__swatch" style={{ background: ts.bg, color: ts.accent }} aria-hidden="true">
                    <i style={{ background: ts.accent }} />
                  </span>
                  {t.name}
                </button>
              )
            })}
          </div>
        </section>

        <section className="panel" aria-labelledby="step-tune">
          <div className="panel-head">
            <H id="step-tune" className="panel-title">
              <span className="step">3</span> Fine-tune
            </H>
            <button type="button" className="text-btn" onClick={() => chooseTemplate(s.template)}>
              Reset style
            </button>
          </div>
          <div className="tabs" role="tablist" aria-label="Customise">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                id={`tab-${t}`}
                aria-selected={tab === t}
                aria-controls="tabpanel"
                tabIndex={tab === t ? 0 : -1}
                className="tab"
                onClick={() => setTab(t)}
                onKeyDown={(e) => {
                  const i = TABS.indexOf(t)
                  const n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
                  if (!n) return
                  const next = TABS[(i + n + TABS.length) % TABS.length] as Tab
                  setTab(next)
                  document.getElementById(`tab-${next}`)?.focus()
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div id="tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="tabpanel">
            {tab === 'Type' && (
              <>
                <Select label="Font" value={s.font} onChange={set('font')} options={FONT_IDS.map((f) => ({ value: f, label: FONTS[f].label }))} />
                <Toggle label="Mix fonts on each cut" hint="Background lines rotate through the style’s typefaces." checked={s.fontMix} onChange={set('fontMix')} />
                <Slider label="Size" {...RANGES.fontSize} value={s.fontSize} onChange={set('fontSize')} format={pct} />
                <Slider
                  label="Weight"
                  {...RANGES.weight}
                  value={s.weight}
                  onChange={set('weight')}
                  disabled={singleWeight}
                  hint={singleWeight ? `${FONTS[s.font].label} comes in one weight.` : undefined}
                />
                <Slider label="Letter spacing" {...RANGES.tracking} value={s.tracking} onChange={set('tracking')} format={(v) => `${(v * 100).toFixed(0)}%`} />
                <Slider label="Line spacing" {...RANGES.lineHeight} value={s.lineHeight} onChange={set('lineHeight')} format={(v) => v.toFixed(2)} />
                <Segmented<TextCase>
                  label="Case"
                  value={s.textCase}
                  onChange={set('textCase')}
                  options={[
                    { value: 'none', label: 'As typed' },
                    { value: 'upper', label: 'UPPER' },
                    { value: 'lower', label: 'lower' },
                  ]}
                />
              </>
            )}
            {tab === 'Layout' && (
              <>
                <Segmented<Layout>
                  label="Layout"
                  value={s.layout}
                  onChange={set('layout')}
                  options={[
                    { value: 'page', label: 'Page' },
                    { value: 'newspaper', label: 'Newspaper' },
                    { value: 'caption', label: 'Caption' },
                  ]}
                />
                <Select<Highlight>
                  label="Focal word highlight"
                  value={s.highlight}
                  onChange={set('highlight')}
                  options={[
                    { value: 'marker', label: 'Highlighter' },
                    { value: 'invert', label: 'Solid block' },
                    { value: 'box', label: 'Outline box' },
                    { value: 'underline', label: 'Underline' },
                    { value: 'ink', label: 'Coloured text' },
                    { value: 'none', label: 'None' },
                  ]}
                />
                <Slider label="Horizontal position" {...RANGES.posX} value={s.posX} onChange={set('posX')} format={pct} />
                <Slider label="Vertical position" {...RANGES.posY} value={s.posY} onChange={set('posY')} format={pct} />
                <Slider label="Background text opacity" {...RANGES.dim} value={s.dim} onChange={set('dim')} format={pct} />
              </>
            )}
            {tab === 'Colour' && (
              <>
                <Select<Background>
                  label="Background"
                  value={s.background}
                  onChange={set('background')}
                  options={[
                    { value: 'solid', label: 'Solid' },
                    { value: 'paper', label: 'Paper' },
                    { value: 'vignette', label: 'Vignette' },
                    { value: 'grain', label: 'Film grain' },
                  ]}
                />
                <div className="color-grid">
                  <ColorField label="Background" value={s.bg} onChange={set('bg')} />
                  <ColorField label="Text" value={s.fg} onChange={set('fg')} />
                  <ColorField label="Highlight" value={s.accent} onChange={set('accent')} />
                  <ColorField label="Focal word" value={s.focusColor} onChange={set('focusColor')} />
                </div>
                <Toggle label="Cycle colours on each cut" hint="Uses this style’s palette." checked={s.bgCycle} onChange={set('bgCycle')} />
              </>
            )}
            {tab === 'Motion' && (
              <>
                <Slider label="Cuts per second" {...RANGES.cps} value={s.cps} onChange={set('cps')} />
                <Slider label="Duration" {...RANGES.duration} value={s.duration} onChange={set('duration')} format={(v) => `${v}s`} />
                <Slider label="Zoom" {...RANGES.zoom} value={s.zoom} onChange={set('zoom')} format={pct} />
                <Slider label="Motion speed" {...RANGES.speed} value={s.speed} onChange={set('speed')} format={(v) => `${v.toFixed(2)}×`} hint="How quickly zoom and transitions play out." />
                <Slider label="Background blur" {...RANGES.blur} value={s.blur} onChange={set('blur')} format={pct} />
                <Select<Transition>
                  label="Transition"
                  value={s.transition}
                  onChange={set('transition')}
                  options={[
                    { value: 'cut', label: 'Hard cut' },
                    { value: 'punch', label: 'Punch in' },
                    { value: 'shake', label: 'Shake' },
                    { value: 'dip', label: 'Dip' },
                    { value: 'flash', label: 'Flash' },
                  ]}
                />
                {flashRisk && (
                  <p className="notice notice--warn">
                    Flashing faster than three times a second can affect people with photosensitive epilepsy. TextSnapy softens it
                    automatically, but consider “Punch in” instead.
                  </p>
                )}
                <Toggle label="Finish on the word" hint="Hold the focal word alone for the last beat." checked={s.endHold} onChange={set('endHold')} />
              </>
            )}
            {tab === 'Sound' && (
              <>
                <Select<Sound>
                  label="Cut sound"
                  value={s.sound}
                  onChange={(v) => {
                    update({ sound: v })
                    if (v !== 'off') setMuted(false)
                  }}
                  options={[
                    { value: 'off', label: 'None' },
                    { value: 'tick', label: 'Tick' },
                    { value: 'click', label: 'Click' },
                    { value: 'type', label: 'Typewriter' },
                    { value: 'thump', label: 'Bass thump' },
                  ]}
                />
                <p className="field__hint">
                  Sounds are synthesised in your browser, so they’re royalty-free and safe to publish. Add music in your video app
                  afterwards.
                </p>
              </>
            )}
          </div>
        </section>

        <ExportPanel settings={s} onCredit={set('credit')} />
      </div>
      {jump && (
        <a href="#export" className="jump-export btn btn--primary">
          Export video
          <ArrowDown />
        </a>
      )}
    </div>
  )
}

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
)
