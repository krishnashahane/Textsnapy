export const MAX_TEXT = 1200
export const MAX_FOCUS = 40

/** Deterministic PRNG (mulberry32). Same seed → same frames, so previews match exports. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Strip control characters (keeps tab/newline), collapse runs of whitespace.
export function cleanText(input: string, max: number): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/[ \t]+/g, ' ')
    .slice(0, max)
}

export const words = (text: string) => text.split(/\s+/).filter(Boolean)

const STOP = new Set(
  `a an and are as at be been but by can could did do does for from had has have he her his how i if in into is it its
  just me more most my no not of on or our out over she so some than that the their them then there these they this to
  too up us was we were what when where which while who why will with would you your yours very only all every each
  about after before because been being both few many much never nobody someone something until upon whole time way
  one two three get got make made said says say like also even still back down off own same such`.split(/\s+/),
)

export const bare = (w: string) => w.replace(/^[^\p{L}\p{N}$£€₹#@]+|[^\p{L}\p{N}%]+$/gu, '')

/** Pick the word most likely to carry the line's meaning. */
export function suggestFocus(text: string): string {
  const ws = words(text)
  let best = ''
  let bestScore = -Infinity
  ws.forEach((raw, i) => {
    const w = bare(raw)
    if (!w || STOP.has(w.toLowerCase())) return
    let score = Math.min(w.length, 10)
    if (/\d/.test(w) || /^[$£€₹]/.test(w)) score += 3
    if (i > 0 && /^\p{Lu}/u.test(w) && !/[.!?]$/.test(ws[i - 1] ?? '')) score += 3
    if (w.length > 2 && w === w.toUpperCase() && /\p{L}/u.test(w)) score += 2
    // Later words tend to be the payoff of a sentence.
    score += (i / Math.max(ws.length, 1)) * 2
    if (score > bestScore) {
      bestScore = score
      best = w
    }
  })
  return best || bare(ws[0] ?? '') || 'TextSnapy'
}

/** Word pool for surrounding copy: the user's own words first, padded with template filler. */
export function buildPool(text: string, corpus: string, focus: string): string[] {
  const user = words(text)
  const filler = words(corpus)
  const pool = user.length >= 40 ? user : [...user, ...filler, ...user, ...filler]
  const f = focus.trim().toLowerCase()
  // Keep the focal word out of the background so it only ever appears once per frame.
  const out = pool.filter((w) => bare(w).toLowerCase() !== f)
  return out.length ? out : ['·']
}

export function applyCase(s: string, c: 'none' | 'upper' | 'lower'): string {
  return c === 'upper' ? s.toUpperCase() : c === 'lower' ? s.toLowerCase() : s
}
