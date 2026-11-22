export const ASPECTS = ['9:16', '1:1', '16:9'] as const
export type Aspect = (typeof ASPECTS)[number]

export const FONT_IDS = [
  'inter',
  'playfair',
  'instrument',
  'plexmono',
  'elite',
  'anton',
  'bebas',
  'cormorant',
  'grotesk',
  'archivo',
] as const
export type FontId = (typeof FONT_IDS)[number]

export const LAYOUTS = ['page', 'newspaper', 'caption'] as const
export type Layout = (typeof LAYOUTS)[number]

export const HIGHLIGHTS = ['marker', 'box', 'underline', 'ink', 'invert', 'none'] as const
export type Highlight = (typeof HIGHLIGHTS)[number]

export const BACKGROUNDS = ['solid', 'paper', 'vignette', 'grain'] as const
export type Background = (typeof BACKGROUNDS)[number]

export const TRANSITIONS = ['cut', 'flash', 'punch', 'shake', 'dip'] as const
export type Transition = (typeof TRANSITIONS)[number]

export const SOUNDS = ['off', 'tick', 'click', 'thump', 'type'] as const
export type Sound = (typeof SOUNDS)[number]

export const CASES = ['none', 'upper', 'lower'] as const
export type TextCase = (typeof CASES)[number]

export interface Settings {
  template: string
  text: string
  focus: string
  aspect: Aspect
  layout: Layout
  font: FontId
  fontMix: boolean
  fontSize: number
  weight: number
  tracking: number
  lineHeight: number
  textCase: TextCase
  posX: number
  posY: number
  background: Background
  bg: string
  fg: string
  accent: string
  focusColor: string
  bgCycle: boolean
  highlight: Highlight
  dim: number
  cps: number
  duration: number
  speed: number
  zoom: number
  blur: number
  transition: Transition
  endHold: boolean
  sound: Sound
  seed: number
  credit: boolean
}

export type NumericKey = {
  [K in keyof Settings]: Settings[K] extends number ? K : never
}[keyof Settings]

export const DIMENSIONS: Record<Aspect, { w: number; h: number }> = {
  '9:16': { w: 1080, h: 1920 },
  '1:1': { w: 1080, h: 1080 },
  '16:9': { w: 1920, h: 1080 },
}
