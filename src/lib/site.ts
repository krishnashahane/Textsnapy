const env = (v: string | undefined) => (v ?? '').trim()

const url = env(process.env.NEXT_PUBLIC_SITE_URL) || 'https://www.textsnapy.com'

export const site = {
  name: 'TextSnapy',
  url: url.replace(/\/+$/, ''),
  tagline: 'Create cinematic text match-cut videos in seconds.',
  description:
    'Free browser-based text match-cut generator. Type a line, lock a focal word in place and export a cinematic kinetic-typography video for Reels, Shorts and TikTok. No sign-up, nothing uploaded.',
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || 'developerkrishna17@gmail.com',
  legalUpdated: '22 November 2026',
  /** Bump when page content changes; feeds sitemap lastmod. */
  contentUpdated: '2026-11-22',
} as const

export const absoluteUrl = (path = '/') => `${site.url}${path === '/' ? '' : path}`

export const nav = [
  { href: '/create', label: 'Create' },
  { href: '/templates', label: 'Templates' },
  { href: '/examples', label: 'Examples' },
  { href: '/guides', label: 'Guides' },
  { href: '/faq', label: 'FAQ' },
] as const
