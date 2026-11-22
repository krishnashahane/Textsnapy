import { fontWeight, FONTS } from './fonts'
import { getTemplate, type Template } from './templates'
import { applyCase, buildPool, rng } from './text'
import { DIMENSIONS, type FontId, type Settings } from './types'

export type FontResolver = (id: FontId) => string
type Ctx = CanvasRenderingContext2D

const makeCanvas = (w: number, h: number) => {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

const ctx2d = (c: HTMLCanvasElement) => {
  const ctx = c.getContext('2d', { alpha: true })
  if (!ctx) throw new Error('Canvas 2D is not available in this browser.')
  return ctx
}

let filterSupport: boolean | undefined
function supportsFilter(): boolean {
  if (filterSupport === undefined) {
    const ctx = makeCanvas(1, 1).getContext('2d')
    if (ctx && 'filter' in ctx) {
      ctx.filter = 'blur(1px)'
      filterSupport = ctx.filter === 'blur(1px)'
    } else filterSupport = false
  }
  return filterSupport
}

let grainTile: HTMLCanvasElement | undefined
function grain(): HTMLCanvasElement {
  if (grainTile) return grainTile
  const size = 192
  const c = makeCanvas(size, size)
  const ctx = ctx2d(c)
  const img = ctx.createImageData(size, size)
  const r = rng(42)
  for (let i = 0; i < img.data.length; i += 4) {
    const v = r() * 255
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v
    img.data[i + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  return (grainTile = c)
}

/** Duration of the closing "word only" beat. */
export const holdTime = (s: Settings) => (s.endHold ? Math.min(0.9, s.duration * 0.2) : 0)
export const cutCount = (s: Settings) => Math.max(1, Math.ceil((s.duration - holdTime(s)) * s.cps))

/** Times (seconds) at which a new cut starts – used for sound sync. */
export function cutTimes(s: Settings): number[] {
  const n = cutCount(s)
  return Array.from({ length: n }, (_, i) => i / s.cps).concat(s.endHold ? [n / s.cps] : [])
}

export function outputSize(s: Settings, scale = 1) {
  const d = DIMENSIONS[s.aspect]
  // Video encoders need even dimensions.
  const even = (n: number) => Math.max(2, Math.round((n * scale) / 2) * 2)
  return { w: even(d.w), h: even(d.h) }
}

class WordStream {
  private i: number
  constructor(
    private pool: string[],
    start: number,
  ) {
    this.i = Math.floor(start * pool.length)
  }
  next(): string {
    const w = this.pool[this.i % this.pool.length] ?? ''
    this.i++
    return w
  }
}

interface Look {
  bg: string
  fg: string
}

/**
 * Draws TextSnapy frames onto a canvas.
 * Background and surrounding copy are cached per cut; only the focal word and
 * camera transform are drawn every frame, which keeps 60fps previews cheap.
 */
export class Renderer {
  readonly canvas: HTMLCanvasElement
  private ctx: Ctx
  private layer: HTMLCanvasElement
  private lctx: Ctx
  private bgCache = new Map<string, HTMLCanvasElement>()
  private s!: Settings
  private tpl!: Template
  private pool: string[] = []
  private w = 0
  private h = 0
  private u = 1
  private fpx = 80
  private cut = -1
  private dirty = true

  constructor(
    canvas: HTMLCanvasElement,
    private font: FontResolver,
  ) {
    this.canvas = canvas
    this.ctx = ctx2d(canvas)
    this.layer = makeCanvas(2, 2)
    this.lctx = ctx2d(this.layer)
  }

  configure(s: Settings, scale = 1) {
    const { w, h } = outputSize(s, scale)
    if (w !== this.w || h !== this.h) {
      this.w = this.canvas.width = this.layer.width = w
      this.h = this.canvas.height = this.layer.height = h
      this.bgCache.clear()
    }
    if (this.s && (this.s.background !== s.background || this.s.bg !== s.bg)) this.bgCache.clear()
    this.s = s
    this.tpl = getTemplate(s.template)
    this.pool = buildPool(s.text, this.tpl.corpus, s.focus)
    this.u = Math.min(w, h) / 1080
    this.fpx = 80 * this.u * s.fontSize
    this.invalidate()
  }

  invalidate() {
    this.dirty = true
    this.bgCache.clear()
  }

  /** Resolve once every font this configuration can draw with has loaded. */
  async loadFonts(): Promise<void> {
    if (typeof document === 'undefined' || !document.fonts) return
    const ids = new Set<FontId>([this.s.font, 'inter', ...(this.s.fontMix ? this.tpl.fontPool : [])])
    await Promise.all(
      [...ids].map((id) =>
        document.fonts.load(`${fontWeight(id, this.s.weight)} 40px ${this.font(id)}`).catch(() => []),
      ),
    )
    this.invalidate()
  }

  private fontStr(id: FontId, px: number, weight = this.s.weight) {
    return `${fontWeight(id, weight)} ${px.toFixed(1)}px ${this.font(id)}, ${FONTS[id].fallback}`
  }

  private setType(ctx: Ctx, id: FontId, px: number, weight?: number) {
    ctx.font = this.fontStr(id, px, weight)
    if ('letterSpacing' in ctx) ctx.letterSpacing = `${(this.s.tracking * px).toFixed(2)}px`
  }

  private look(cut: number): Look {
    const { bg, fg, bgCycle } = this.s
    if (!bgCycle) return { bg, fg }
    const pairs: Look[] = [{ bg, fg }, ...this.tpl.palette.filter(([b]) => b !== bg).map(([b, f]) => ({ bg: b, fg: f }))]
    return pairs[cut % pairs.length] as Look
  }

  private background(look: Look): HTMLCanvasElement {
    const key = look.bg
    const hit = this.bgCache.get(key)
    if (hit) return hit
    const c = makeCanvas(this.w, this.h)
    const ctx = ctx2d(c)
    const { w, h } = this
    ctx.fillStyle = look.bg
    ctx.fillRect(0, 0, w, h)
    const kind = this.s.background
    if (kind === 'paper' || kind === 'grain') {
      const pat = ctx.createPattern(grain(), 'repeat')
      if (pat) {
        ctx.globalAlpha = kind === 'paper' ? 0.09 : 0.06
        ctx.globalCompositeOperation = 'overlay'
        ctx.fillStyle = pat
        ctx.fillRect(0, 0, w, h)
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }
    }
    if (kind === 'paper' || kind === 'vignette') {
      const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.hypot(w, h) * 0.6)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(1, kind === 'paper' ? 'rgba(60,40,10,0.22)' : 'rgba(0,0,0,0.6)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }
    if (this.bgCache.size > 6) this.bgCache.clear()
    this.bgCache.set(key, c)
    return c
  }

  private focusText() {
    return applyCase(this.s.focus.trim() || ' ', this.s.textCase)
  }

  private focusBox(ctx: Ctx) {
    this.setType(ctx, this.s.font, this.fpx)
    const fw = ctx.measureText(this.focusText()).width
    const cx = this.s.posX * this.w
    const base = this.s.posY * this.h + this.fpx * 0.34
    return { x0: cx - fw / 2, x1: cx + fw / 2, base, fw }
  }

  private rowFont(r: () => number): FontId {
    if (!this.s.fontMix) return this.s.font
    const pool = this.tpl.fontPool
    return pool[Math.floor(r() * pool.length)] ?? this.s.font
  }

  /** Words flowing left from `endX` and right from `startX` on one baseline. */
  private drawAround(ctx: Ctx, stream: WordStream, y: number, endX: number, startX: number, limit = Infinity) {
    const space = ctx.measureText(' ').width
    const left: string[] = []
    let used = 0
    while (endX - used > -space && left.length < limit) {
      const w = applyCase(stream.next(), this.s.textCase)
      left.unshift(w)
      used += ctx.measureText(w).width + space
    }
    let x = endX - used
    for (const w of left) {
      ctx.fillText(w, x, y)
      x += ctx.measureText(w).width + space
    }
    x = startX + space
    for (let n = 0; x < this.w && n < limit; n++) {
      const w = applyCase(stream.next(), this.s.textCase)
      ctx.fillText(w, x, y)
      x += ctx.measureText(w).width + space
    }
  }

  private drawRow(ctx: Ctx, stream: WordStream, x: number, y: number, maxX: number) {
    const space = ctx.measureText(' ').width
    while (x < maxX) {
      const w = applyCase(stream.next(), this.s.textCase)
      const ww = ctx.measureText(w).width
      if (x + ww > maxX && maxX < this.w) break
      ctx.fillText(w, x, y)
      x += ww + space
    }
  }

  private blurFor(amount: number) {
    return this.s.blur > 0 && supportsFilter() ? `blur(${(this.s.blur * amount * 9 * this.u).toFixed(2)}px)` : 'none'
  }

  private renderLayer(cut: number) {
    const ctx = this.lctx
    const { w, h, fpx, s } = this
    const r = rng(s.seed * 1009 + cut * 7919 + 17)
    const look = this.look(cut)
    const stream = new WordStream(this.pool, r())
    ctx.clearRect(0, 0, w, h)
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = look.fg
    const box = this.focusBox(ctx)
    const pad = fpx * 0.45

    const focalRow = (font: FontId, limit?: number) => {
      ctx.filter = this.blurFor(0.35)
      ctx.globalAlpha = Math.min(1, s.dim + 0.15)
      this.setType(ctx, font, fpx)
      this.drawAround(ctx, stream, box.base, box.x0 - pad + ctx.measureText(' ').width, box.x1 + pad - ctx.measureText(' ').width, limit)
    }

    if (s.layout === 'page') {
      const lh = fpx * s.lineHeight
      const offset = r() * fpx * 4
      focalRow(this.rowFont(r))
      ctx.filter = this.blurFor(1)
      ctx.globalAlpha = s.dim
      for (const dir of [-1, 1]) {
        for (let y = box.base + dir * lh; y > -lh && y < h + lh; y += dir * lh) {
          this.setType(ctx, this.rowFont(r), fpx)
          this.drawRow(ctx, stream, -offset - r() * fpx * 2, y, w + fpx)
        }
      }
    } else if (s.layout === 'caption') {
      const font = this.rowFont(r)
      focalRow(font, 1 + Math.floor(r() * 2))
      ctx.filter = this.blurFor(1)
      ctx.globalAlpha = s.dim * 0.45
      const lh = fpx * s.lineHeight
      for (const dir of [-1, 1]) {
        this.setType(ctx, font, fpx)
        const y = box.base + dir * lh
        const words = [stream.next(), stream.next(), stream.next()].map((x) => applyCase(x, s.textCase)).join(' ')
        ctx.textAlign = 'center'
        ctx.fillText(words, s.posX * w + (r() - 0.5) * fpx * 2, y)
        ctx.textAlign = 'start'
      }
    } else {
      this.renderNewspaper(ctx, r, stream, box, look, focalRow)
    }
    ctx.filter = 'none'
    ctx.globalAlpha = 1
  }

  private renderNewspaper(
    ctx: Ctx,
    r: () => number,
    stream: WordStream,
    box: { base: number },
    look: Look,
    focalRow: (font: FontId) => void,
  ) {
    const { w, h, fpx, s } = this
    const margin = w * 0.05
    const ruleW = Math.max(1, 2 * this.u)
    const rule = (y: number) => {
      ctx.globalAlpha = s.dim * 0.8
      ctx.fillRect(margin * 0.5, y, w - margin, ruleW)
    }
    focalRow(this.rowFont(r))
    ctx.globalAlpha = s.dim
    rule(box.base - fpx * 1.05)
    rule(box.base + fpx * 0.42)

    type Block = { kind: 'head' | 'body'; size: number; lines: number; cols: number; font: FontId; height: number }
    const make = (): Block => {
      const head = r() < 0.38
      const size = head ? fpx * (0.75 + r() * 0.55) : fpx * (0.34 + r() * 0.12)
      const lines = head ? 1 + Math.floor(r() * 2) : 3 + Math.floor(r() * 5)
      const cols = head ? 1 : (w > h ? 3 : 2) + Math.floor(r() * 2)
      const lead = head ? 1.08 : 1.32
      return { kind: head ? 'head' : 'body', size, lines, cols, font: this.rowFont(r), height: size * lead * lines + fpx * 0.45 }
    }
    const draw = (b: Block, top: number) => {
      ctx.filter = this.blurFor(1)
      ctx.globalAlpha = b.kind === 'head' ? s.dim : s.dim * 0.85
      this.setType(ctx, b.font, b.size, b.kind === 'head' ? 800 : 400)
      const gap = fpx * 0.5
      const colW = (w - margin * 2 - gap * (b.cols - 1)) / b.cols
      const lead = b.kind === 'head' ? 1.08 : 1.32
      for (let c = 0; c < b.cols; c++) {
        const x = margin + c * (colW + gap)
        for (let l = 0; l < b.lines; l++) this.drawRow(ctx, stream, x, top + b.size * (0.9 + l * lead), x + colW)
        if (c > 0) {
          ctx.filter = 'none'
          ctx.globalAlpha = s.dim * 0.5
          ctx.fillRect(x - gap / 2, top, ruleW, b.size * lead * b.lines)
          ctx.globalAlpha = s.dim * 0.85
          ctx.filter = this.blurFor(1)
        }
      }
      ctx.filter = 'none'
      rule(top + b.height - fpx * 0.25)
    }
    ctx.fillStyle = look.fg
    let up = box.base - fpx * 1.05 - fpx * 0.2
    while (up > 0) {
      const b = make()
      up -= b.height
      draw(b, up)
    }
    let down = box.base + fpx * 0.42 + fpx * 0.3
    while (down < h) {
      const b = make()
      draw(b, down)
      down += b.height
    }
  }

  private drawFocus(ctx: Ctx) {
    const { s, fpx } = this
    const { x0, base, fw } = this.focusBox(ctx)
    const padX = fpx * 0.16
    const top = base - fpx * 0.86
    const height = fpx * 1.12
    ctx.globalAlpha = 1
    ctx.filter = 'none'
    ctx.fillStyle = s.accent
    switch (s.highlight) {
      case 'marker': {
        const sk = fpx * 0.05
        ctx.beginPath()
        ctx.moveTo(x0 - padX + sk, top)
        ctx.lineTo(x0 + fw + padX + sk * 0.4, top + sk * 0.5)
        ctx.lineTo(x0 + fw + padX - sk, top + height)
        ctx.lineTo(x0 - padX - sk * 0.3, top + height - sk * 0.4)
        ctx.closePath()
        ctx.fill()
        break
      }
      case 'invert':
        ctx.fillRect(x0 - padX, top, fw + padX * 2, height)
        break
      case 'box':
        ctx.strokeStyle = s.accent
        ctx.lineWidth = Math.max(2, fpx * 0.06)
        ctx.strokeRect(x0 - padX, top, fw + padX * 2, height)
        break
      case 'underline':
        ctx.fillRect(x0, base + fpx * 0.12, fw, Math.max(2, fpx * 0.08))
        break
    }
    ctx.fillStyle = s.focusColor
    ctx.fillText(this.focusText(), x0, base)
  }

  private drawCredit(ctx: Ctx, fg: string) {
    const px = 26 * this.u
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.font = `600 ${px}px ${this.font('inter')}, system-ui, sans-serif`
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    ctx.fillStyle = fg
    ctx.globalAlpha = 0.55
    ctx.textAlign = 'right'
    const bottom = this.s.aspect === '9:16' ? this.h * 0.16 : this.h * 0.05
    ctx.fillText('made with textsnapy', this.w - px * 1.4, this.h - bottom)
    ctx.restore()
  }

  /** Draw the frame at time `t` (seconds). */
  frame(t: number) {
    const { s, ctx, w, h } = this
    const hold = holdTime(s)
    const n = cutCount(s)
    const holdStart = s.duration - hold
    const inHold = s.endHold && t >= holdStart
    const cut = Math.min(n - 1, Math.max(0, Math.floor(t * s.cps)))
    if (cut !== this.cut || this.dirty) {
      this.renderLayer(cut)
      this.cut = cut
      this.dirty = false
    }
    const look = this.look(cut)
    const sinceCut = inHold ? t - holdStart : t - cut / s.cps
    const tr = Math.max(0, 1 - sinceCut / (0.14 / s.speed))

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = 1
    ctx.drawImage(this.background(look), 0, 0)

    const p = Math.min(1, t / s.duration)
    const k = 3 * s.speed
    let z = 1 + s.zoom * 0.7 * ((1 - Math.exp(-k * p)) / (1 - Math.exp(-k)))
    let dx = 0
    let dy = 0
    if (s.transition === 'punch') z *= 1 + 0.09 * tr * tr
    if (s.transition === 'shake' && tr > 0) {
      const jr = rng(cut * 131 + Math.floor(t * 60))
      dx = (jr() - 0.5) * 0.05 * w * tr
      dy = (jr() - 0.5) * 0.03 * h * tr
    }
    const ax = s.posX * w
    const ay = s.posY * h
    ctx.setTransform(z, 0, 0, z, ax - ax * z + dx, ay - ay * z + dy)

    const textAlpha = inHold ? Math.max(0, 1 - sinceCut / 0.18) : 1
    if (textAlpha > 0) {
      ctx.globalAlpha = textAlpha
      ctx.drawImage(this.layer, 0, 0)
    }
    // Dip hides the outgoing copy but never the focal word – that is the match.
    if (tr > 0 && s.transition === 'dip') {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalAlpha = 0.8 * tr
      ctx.drawImage(this.background(look), 0, 0)
      ctx.setTransform(z, 0, 0, z, ax - ax * z + dx, ay - ay * z + dy)
    }
    ctx.textBaseline = 'alphabetic'
    this.drawFocus(ctx)

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    if (tr > 0 && s.transition === 'flash') {
      // Fast cut rates get a softer flash to stay well clear of photosensitivity limits.
      ctx.globalAlpha = 0.5 * tr * Math.min(1, 3 / s.cps)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)
    }
    ctx.globalAlpha = 1
    if (s.credit) this.drawCredit(ctx, look.fg)
  }
}
