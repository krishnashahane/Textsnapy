import type { Sound } from './types'

/*
 * Every sound is synthesised from oscillators and noise at runtime, so exports
 * carry no third-party samples and no licensing questions.
 */

const noiseCache = new WeakMap<BaseAudioContext, AudioBuffer>()
function noise(ctx: BaseAudioContext): AudioBuffer {
  let buf = noiseCache.get(ctx)
  if (!buf) {
    buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.25), ctx.sampleRate)
    const d = buf.getChannelData(0)
    let seed = 7
    for (let i = 0; i < d.length; i++) {
      seed = (seed * 16807) % 2147483647
      d[i] = (seed / 2147483647) * 2 - 1
    }
    noiseCache.set(ctx, buf)
  }
  return buf
}

function env(ctx: BaseAudioContext, out: AudioNode, at: number, peak: number, decay: number) {
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(peak, at + 0.002)
  g.gain.exponentialRampToValueAtTime(0.0001, at + decay)
  g.connect(out)
  return g
}

function burst(ctx: BaseAudioContext, out: AudioNode, at: number, type: BiquadFilterType, freq: number, q: number, peak: number, decay: number) {
  const src = ctx.createBufferSource()
  src.buffer = noise(ctx)
  const f = ctx.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  f.Q.value = q
  src.connect(f).connect(env(ctx, out, at, peak, decay))
  src.start(at, Math.random() * 0.1, decay + 0.02)
}

function tone(ctx: BaseAudioContext, out: AudioNode, at: number, from: number, to: number, peak: number, decay: number, type: OscillatorType = 'sine') {
  const o = ctx.createOscillator()
  o.type = type
  o.frequency.setValueAtTime(from, at)
  o.frequency.exponentialRampToValueAtTime(to, at + decay)
  o.connect(env(ctx, out, at, peak, decay))
  o.start(at)
  o.stop(at + decay + 0.02)
}

/** Schedule one hit. `accent` marks the closing beat. */
export function hit(ctx: BaseAudioContext, out: AudioNode, kind: Sound, at: number, accent = false) {
  const a = accent ? 1.6 : 1
  switch (kind) {
    case 'tick':
      tone(ctx, out, at, 2400, 1800, 0.18 * a, 0.03)
      break
    case 'click':
      burst(ctx, out, at, 'highpass', 3500, 0.7, 0.5 * a, 0.018)
      break
    case 'thump':
      tone(ctx, out, at, 150, 48, 0.75 * a, accent ? 0.35 : 0.14)
      burst(ctx, out, at, 'lowpass', 900, 0.8, 0.12 * a, 0.03)
      break
    case 'type':
      burst(ctx, out, at, 'bandpass', 1800 + Math.random() * 600, 3, 0.55 * a, 0.035)
      tone(ctx, out, at, 320, 220, 0.07 * a, 0.02, 'square')
      break
  }
}

/** Render the whole soundtrack offline so exported audio is sample-accurate. */
export async function renderSoundtrack(kind: Sound, times: number[], duration: number, accentLast: boolean): Promise<AudioBuffer | null> {
  if (kind === 'off' || typeof OfflineAudioContext === 'undefined') return null
  const rate = 48000
  const ctx = new OfflineAudioContext(2, Math.ceil(rate * duration), rate)
  const master = ctx.createGain()
  master.gain.value = 0.8
  master.connect(ctx.destination)
  times.forEach((t, i) => {
    if (t < duration) hit(ctx, master, kind, t, accentLast && i === times.length - 1)
  })
  return ctx.startRendering()
}
