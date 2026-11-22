import { ImageResponse } from 'next/og'

export const alt = 'TextSnapy – one word holds still, everything else cuts.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const lines = [
  'the archive was sealed for eleven years and nobody',
  'signed the second page of the report before the',
  'every record told the same',
  'witness described a grey car and a closed gate at',
  'the county office shows the land changed hands twice',
]

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#0e0d0c', display: 'flex', flexDirection: 'column', padding: 64, color: '#ece6da' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.32, fontSize: 40 }}>
          {lines.map((l, i) =>
            i === 2 ? (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 1 }}>
                <span>{l}</span>
                <span style={{ background: '#f5d547', color: '#141210', padding: '0 14px', fontWeight: 700 }}>truth</span>
              </div>
            ) : (
              <span key={l}>{l}</span>
            ),
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>TextSnapy</div>
          <div style={{ fontSize: 34, color: '#b9b2a5' }}>Create cinematic text match-cut videos in seconds.</div>
        </div>
      </div>
    ),
    size,
  )
}
