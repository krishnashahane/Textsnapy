import { publisherId } from '@/lib/ads'

export const dynamic = 'force-static'

/** Authorised Digital Sellers file. Served once an AdSense publisher id is configured. */
export function GET() {
  if (!publisherId) return new Response('Not found', { status: 404 })
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
