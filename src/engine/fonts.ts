import type { FontId } from './types'

export interface FontMeta {
  label: string
  /** Weights the font file actually ships. Single-weight fonts ignore the weight control. */
  weights: readonly number[]
  fallback: string
}

export const FONTS: Record<FontId, FontMeta> = {
  inter: { label: 'Inter', weights: [400, 500, 600, 700, 800, 900], fallback: 'system-ui, sans-serif' },
  playfair: { label: 'Playfair Display', weights: [400, 500, 600, 700, 800, 900], fallback: 'Georgia, serif' },
  instrument: { label: 'Instrument Serif', weights: [400], fallback: 'Georgia, serif' },
  plexmono: { label: 'IBM Plex Mono', weights: [400, 500, 600, 700], fallback: 'ui-monospace, monospace' },
  elite: { label: 'Special Elite', weights: [400], fallback: '"Courier New", monospace' },
  anton: { label: 'Anton', weights: [400], fallback: 'Impact, sans-serif' },
  bebas: { label: 'Bebas Neue', weights: [400], fallback: 'Impact, sans-serif' },
  cormorant: { label: 'Cormorant Garamond', weights: [400, 500, 600, 700], fallback: 'Georgia, serif' },
  grotesk: { label: 'Space Grotesk', weights: [400, 500, 600, 700], fallback: 'system-ui, sans-serif' },
  archivo: { label: 'Archivo Black', weights: [400], fallback: 'Impact, sans-serif' },
}

/** Snap a requested weight to the nearest weight the font provides. */
export function fontWeight(id: FontId, wanted: number): number {
  const ws = FONTS[id].weights
  let best = ws[0] ?? 400
  for (const w of ws) if (Math.abs(w - wanted) < Math.abs(best - wanted)) best = w
  return best
}
