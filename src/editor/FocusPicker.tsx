'use client'

import { useId, useMemo } from 'react'
import { bare, MAX_FOCUS, suggestFocus, words } from '@/engine/text'

interface Props {
  text: string
  focus: string
  onChange: (focus: string) => void
}

const MAX_CHIPS = 60

/** Click a word to lock it in place; shift-click extends to a short phrase. */
export default function FocusPicker({ text, focus, onChange }: Props) {
  const id = useId()
  const list = useMemo(() => words(text).slice(0, MAX_CHIPS), [text])
  const target = focus.trim().toLowerCase()

  // Locate the current focus inside the text so the matching chips light up.
  const range = useMemo(() => {
    const parts = target.split(/\s+/)
    for (let i = 0; i <= list.length - parts.length; i++) {
      if (parts.every((p, j) => bare(list[i + j] ?? '').toLowerCase() === p)) return [i, i + parts.length - 1] as const
    }
    return null
  }, [list, target])

  const pick = (i: number, extend: boolean) => {
    let [a, b] = [i, i]
    if (extend && range) [a, b] = [Math.min(range[0], i), Math.max(range[1], i)]
    if (b - a > 3) [a, b] = [i, i]
    const phrase = list
      .slice(a, b + 1)
      .join(' ')
      .replace(/^[^\p{L}\p{N}$£€₹#@]+|[^\p{L}\p{N}%]+$/gu, '')
    onChange(phrase.slice(0, MAX_FOCUS))
  }

  return (
    <div className="focus-picker">
      <div className="field__head">
        <span className="field__label" id={`${id}-l`}>
          Focal word
        </span>
        <button type="button" className="text-btn" onClick={() => onChange(suggestFocus(text))}>
          Suggest
        </button>
      </div>
      {list.length > 0 && (
        <div className="chips" role="group" aria-labelledby={`${id}-l`}>
          {list.map((w, i) => {
            const on = !!range && i >= range[0] && i <= range[1]
            return (
              <button
                key={`${i}-${w}`}
                type="button"
                className={`chip${on ? ' is-on' : ''}`}
                aria-pressed={on}
                onClick={(e) => pick(i, e.shiftKey)}
              >
                {w}
              </button>
            )
          })}
        </div>
      )}
      <label htmlFor={id} className="sr-only">
        Focal word or phrase
      </label>
      <input
        id={id}
        className="input"
        value={focus}
        maxLength={MAX_FOCUS}
        placeholder="Or type any word"
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="field__hint">Tap a word to lock it in place. Shift-click to select up to four words.</p>
    </div>
  )
}
