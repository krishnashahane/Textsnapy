import { describe, expect, it } from 'vitest'
import { decodeShare, encodeShare, sanitize } from './state'
import { TEMPLATES, templateSettings } from './templates'
import { buildPool, cleanText, rng, suggestFocus } from './text'
import { fileName } from './export'
import { EXAMPLES } from '@/content/examples'
import { TEMPLATE_MAP } from './templates'
import { cutCount, cutTimes } from './render'

describe('text', () => {
  it('suggests a meaningful focal word', () => {
    expect(suggestFocus('Every file told the same story: someone knew the truth.')).not.toMatch(/^(the|same|every)$/i)
    expect(suggestFocus('the and of')).toBe('the')
    expect(suggestFocus('')).toBe('TextSnapy')
  })
  it('strips control and bidi characters', () => {
    expect(cleanText('a\u0000b‮c', 100)).toBe('abc')
    expect(cleanText('x'.repeat(50), 10)).toHaveLength(10)
  })
  it('keeps the focal word out of the filler pool', () => {
    expect(buildPool('the truth is out', 'filler words here', 'truth').some((w) => w.includes('truth'))).toBe(false)
  })
  it('rng is deterministic', () => {
    const a = rng(5)
    const b = rng(5)
    expect([a(), a()]).toEqual([b(), b()])
  })
})

describe('state', () => {
  it('every template produces valid settings', () => {
    for (const t of TEMPLATES) {
      const s = templateSettings(t.id)
      expect(sanitize(s)).toEqual(s)
      expect(t.sample.text.toLowerCase()).toContain(t.sample.focus.toLowerCase())
    }
  })
  it('round-trips share links including unicode', () => {
    const s = { ...templateSettings('meme'), text: 'नमस्ते — 🚀 test', focus: '🚀', cps: 13 }
    expect(decodeShare(encodeShare(s))).toEqual(s)
  })
  it('rejects or repairs hostile input', () => {
    expect(decodeShare('not base64!')).toBeNull()
    expect(decodeShare('x'.repeat(5000))).toBeNull()
    const s = sanitize({ template: '../../etc', cps: 1e9, bg: 'red;background:url(x)', font: 'evil', text: 42, __proto__: { x: 1 } })
    expect(s.template).toBe('newspaper')
    expect(s.cps).toBe(15)
    expect(s.bg).toMatch(/^#[0-9a-f]{6}$/)
    expect(s.font).toBe(templateSettings('newspaper').font)
  })
})

describe('content', () => {
  it('examples reference real templates and focal words from their text', () => {
    for (const e of EXAMPLES) {
      expect(TEMPLATE_MAP.has(e.template)).toBe(true)
      expect(e.text.toLowerCase()).toContain(e.focus.toLowerCase())
    }
  })
})

describe('timing', () => {
  it('cut count follows cps and hold', () => {
    const s = { ...templateSettings('minimal'), cps: 10, duration: 4, endHold: false }
    expect(cutCount(s)).toBe(40)
    expect(cutTimes({ ...s, endHold: true }).length).toBe(cutCount({ ...s, endHold: true }) + 1)
  })
  it('builds safe file names', () => {
    expect(fileName({ ...templateSettings('minimal'), focus: '../Ünïcode <x>' }, 'mp4')).toBe('textsnapy-unicode-x-9x16.mp4')
  })
})
