import { hit, renderSoundtrack } from './audio'
import { cutTimes, outputSize, Renderer, type FontResolver } from './render'
import type { Settings } from './types'

export type Quality = '720' | '1080'

export interface ExportOptions {
  quality: Quality
  fps: 30 | 60
  signal: AbortSignal
  onProgress: (p: number) => void
}

export interface ExportResult {
  blob: Blob
  ext: 'mp4' | 'webm'
  withAudio: boolean
  width: number
  height: number
}

export class ExportError extends Error {}

const scaleFor = (q: Quality) => (q === '1080' ? 1 : 2 / 3)

export const canUseWebCodecs = () =>
  typeof window !== 'undefined' && 'VideoEncoder' in window && 'VideoFrame' in window

const canRecord = () =>
  typeof window !== 'undefined' &&
  'MediaRecorder' in window &&
  typeof HTMLCanvasElement.prototype.captureStream === 'function'

export const exportSupported = () => canUseWebCodecs() || canRecord()

function aborted(signal: AbortSignal) {
  if (signal.aborted) throw new DOMException('Export cancelled', 'AbortError')
}

async function prepare(s: Settings, font: FontResolver, q: Quality) {
  const canvas = document.createElement('canvas')
  const r = new Renderer(canvas, font)
  r.configure(s, scaleFor(q))
  await r.loadFonts()
  return { r, canvas, ...outputSize(s, scaleFor(q)) }
}

async function withWebCodecs(s: Settings, font: FontResolver, o: ExportOptions): Promise<ExportResult | null> {
  const mb = await import('mediabunny')
  const { r, canvas, w, h } = await prepare(s, font, o.quality)

  let ext: 'mp4' | 'webm' = 'mp4'
  let vcodec = await mb.getFirstEncodableVideoCodec(['avc'], { width: w, height: h })
  if (!vcodec) {
    ext = 'webm'
    vcodec = await mb.getFirstEncodableVideoCodec(['vp9', 'vp8'], { width: w, height: h })
  }
  if (!vcodec) return null

  const soundtrack = await renderSoundtrack(s.sound, cutTimes(s), s.duration, s.endHold)
  const acodec = soundtrack
    ? await mb.getFirstEncodableAudioCodec(ext === 'mp4' ? ['aac', 'opus'] : ['opus'], { numberOfChannels: 2, sampleRate: 48000 })
    : null

  const output = new mb.Output({
    format: ext === 'mp4' ? new mb.Mp4OutputFormat({ fastStart: 'in-memory' }) : new mb.WebMOutputFormat(),
    target: new mb.BufferTarget(),
  })
  // ~8 Mbps at 1080p/30 – well above what Reels/Shorts/TikTok re-encode to, without bloated files.
  const bitrate = Math.round((w * h * (o.fps === 60 ? 45 : 30) * 0.13) / 1000) * 1000
  const video = new mb.CanvasSource(canvas, { codec: vcodec, bitrate, keyFrameInterval: 2 })
  output.addVideoTrack(video, { frameRate: o.fps })
  const audio = soundtrack && acodec ? new mb.AudioBufferSource({ codec: acodec, bitrate: mb.QUALITY_HIGH }) : null
  if (audio) output.addAudioTrack(audio)

  try {
    await output.start()
    const frames = Math.round(s.duration * o.fps)
    for (let i = 0; i < frames; i++) {
      aborted(o.signal)
      r.frame(i / o.fps)
      await video.add(i / o.fps, 1 / o.fps)
      if (i % 4 === 0) o.onProgress((i + 1) / frames)
    }
    video.close()
    if (audio && soundtrack) {
      await audio.add(soundtrack)
      audio.close()
    }
    await output.finalize()
  } catch (e) {
    await output.cancel().catch(() => {})
    throw e
  }
  const buf = output.target.buffer
  if (!buf) throw new ExportError('The encoder finished without producing a file.')
  o.onProgress(1)
  return { blob: new Blob([buf], { type: ext === 'mp4' ? 'video/mp4' : 'video/webm' }), ext, withAudio: !!audio, width: w, height: h }
}

const RECORDER_TYPES = [
  'video/mp4;codecs=avc1.42E01F,mp4a.40.2',
  'video/mp4',
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm',
]

/** Real-time fallback for browsers without WebCodecs. */
async function withRecorder(s: Settings, font: FontResolver, o: ExportOptions): Promise<ExportResult> {
  const mime = RECORDER_TYPES.find((t) => MediaRecorder.isTypeSupported(t))
  if (!mime) throw new ExportError('This browser cannot record video. Try the latest Chrome, Edge, Safari or Firefox.')
  const { r, canvas, w, h } = await prepare(s, font, o.quality)
  const stream = canvas.captureStream(o.fps)

  let actx: AudioContext | null = null
  if (s.sound !== 'off' && 'AudioContext' in window) {
    actx = new AudioContext()
    await actx.resume().catch(() => {})
    const dest = actx.createMediaStreamDestination()
    const start = actx.currentTime + 0.05
    const times = cutTimes(s)
    times.forEach((t, i) => actx && hit(actx, dest, s.sound, start + t, s.endHold && i === times.length - 1))
    dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t))
  }

  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: o.quality === '1080' ? 10_000_000 : 6_000_000 })
  const chunks: Blob[] = []
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  const done = new Promise<void>((res, rej) => {
    rec.onstop = () => res()
    rec.onerror = () => rej(new ExportError('Recording failed. Keep this tab in front while exporting.'))
  })

  try {
    rec.start(250)
    const t0 = performance.now()
    await new Promise<void>((res, rej) => {
      const tick = () => {
        if (o.signal.aborted) return rej(new DOMException('Export cancelled', 'AbortError'))
        const t = (performance.now() - t0) / 1000
        r.frame(Math.min(t, s.duration - 1e-3))
        o.onProgress(Math.min(1, t / s.duration))
        if (t >= s.duration) res()
        else requestAnimationFrame(tick)
      }
      tick()
    })
  } finally {
    if (rec.state !== 'inactive') rec.stop()
    stream.getTracks().forEach((t) => t.stop())
    actx?.close().catch(() => {})
  }
  await done
  aborted(o.signal)
  const type = mime.split(';')[0] ?? 'video/webm'
  return { blob: new Blob(chunks, { type }), ext: type === 'video/mp4' ? 'mp4' : 'webm', withAudio: !!actx, width: w, height: h }
}

export async function exportVideo(s: Settings, font: FontResolver, o: ExportOptions): Promise<ExportResult> {
  if (canUseWebCodecs()) {
    const res = await withWebCodecs(s, font, o)
    if (res) return res
  }
  if (canRecord()) return withRecorder(s, font, o)
  throw new ExportError('Video export is not supported in this browser. Try the latest Chrome, Edge, Safari or Firefox.')
}

export function fileName(s: Settings, ext: string): string {
  const slug = s.focus
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
  return `textsnapy-${slug || 'video'}-${s.aspect.replace(':', 'x')}.${ext}`
}
