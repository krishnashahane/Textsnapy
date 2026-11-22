import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#f5d547', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 70, height: 52, background: '#141210', borderRadius: 8 }} />
      </div>
    ),
    size,
  )
}
