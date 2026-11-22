import {
  ASPECTS,
  BACKGROUNDS,
  CASES,
  FONT_IDS,
  HIGHLIGHTS,
  LAYOUTS,
  SOUNDS,
  TRANSITIONS,
  type NumericKey,
  type Settings,
} from './types'
import { TEMPLATE_MAP, templateSettings, DEFAULT_TEMPLATE } from './templates'
import { MAX_FOCUS, MAX_TEXT, cleanText } from './text'

export const RANGES: Record<NumericKey, { min: number; max: number; step: number }> = {
  fontSize: { min: 0.5, max: 2, step: 0.05 },
  weight: { min: 300, max: 900, step: 100 },
  tracking: { min: -0.05, max: 0.3, step: 0.01 },
  lineHeight: { min: 0.9, max: 2, step: 0.05 },
  posX: { min: 0.15, max: 0.85, step: 0.01 },
  posY: { min: 0.12, max: 0.88, step: 0.01 },
  dim: { min: 0.1, max: 1, step: 0.05 },
  cps: { min: 2, max: 15, step: 1 },
  duration: { min: 2, max: 15, step: 0.5 },
  speed: { min: 0.25, max: 2, step: 0.05 },
  zoom: { min: 0, max: 1, step: 0.05 },
  blur: { min: 0, max: 1, step: 0.05 },
  seed: { min: 1, max: 999_999, step: 1 },
}

const ENUMS = {
  aspect: ASPECTS,
  layout: LAYOUTS,
  font: FONT_IDS,
  highlight: HIGHLIGHTS,
  background: BACKGROUNDS,
  transition: TRANSITIONS,
  sound: SOUNDS,
  textCase: CASES,
} as const

const COLORS = ['bg', 'fg', 'accent', 'focusColor'] as const
const BOOLS = ['fontMix', 'bgCycle', 'endHold', 'credit'] as const

const HEX = /^#[0-9a-f]{6}$/i

export function clamp(key: NumericKey, v: number): number {
  const r = RANGES[key]
  const n = Math.min(r.max, Math.max(r.min, v))
  return key === 'seed' || key === 'cps' || key === 'weight' ? Math.round(n) : Math.round(n * 1000) / 1000
}

/**
 * Turn untrusted input (URL, localStorage) into valid settings.
 * Unknown keys are dropped; anything malformed falls back to the template value.
 */
export function sanitize(raw: unknown): Settings {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const tid = typeof o.template === 'string' && TEMPLATE_MAP.has(o.template) ? o.template : DEFAULT_TEMPLATE
  const s = templateSettings(tid)

  if (typeof o.text === 'string') s.text = cleanText(o.text, MAX_TEXT)
  if (typeof o.focus === 'string') s.focus = cleanText(o.focus, MAX_FOCUS).replace(/\n/g, ' ').trim()

  for (const k of Object.keys(RANGES) as NumericKey[]) {
    const v = o[k]
    if (typeof v === 'number' && Number.isFinite(v)) s[k] = clamp(k, v)
  }
  for (const k of Object.keys(ENUMS) as (keyof typeof ENUMS)[]) {
    const v = o[k]
    if (typeof v === 'string' && (ENUMS[k] as readonly string[]).includes(v)) (s as unknown as Record<string, string>)[k] = v
  }
  for (const k of COLORS) {
    const v = o[k]
    if (typeof v === 'string' && HEX.test(v)) s[k] = v.toLowerCase()
  }
  for (const k of BOOLS) {
    const v = o[k]
    if (typeof v === 'boolean') s[k] = v
  }
  return s
}

const toB64Url = (s: string) => {
  const bytes = new TextEncoder().encode(s)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const fromB64Url = (s: string) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

/** Encode only what differs from the template so links stay short. */
export function encodeShare(s: Settings): string {
  const base = templateSettings(s.template)
  const diff: Record<string, unknown> = { template: s.template }
  for (const k of Object.keys(s) as (keyof Settings)[]) if (s[k] !== base[k]) diff[k] = s[k]
  return toB64Url(JSON.stringify(diff))
}

export const MAX_SHARE = 4096

export function decodeShare(param: string | null): Settings | null {
  if (!param || param.length > MAX_SHARE || !/^[A-Za-z0-9_-]+$/.test(param)) return null
  try {
    return sanitize(JSON.parse(fromB64Url(param)))
  } catch {
    return null
  }
}

export function shareUrl(origin: string, s: Settings): string {
  return `${origin}/create?s=${encodeShare(s)}`
}
