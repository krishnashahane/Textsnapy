import type { MetadataRoute } from 'next'
import { GUIDES } from '@/content/guides'
import { TOOLS } from '@/content/tools'
import { absoluteUrl, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: absoluteUrl(path),
    lastModified: site.contentUpdated,
    changeFrequency,
    priority,
  })
  return [
    page('/', 1, 'weekly'),
    page('/create', 0.9, 'weekly'),
    page('/templates', 0.8),
    page('/examples', 0.8),
    ...TOOLS.map((t) => page(`/${t.slug}`, 0.8)),
    page('/guides', 0.7),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7)),
    page('/faq', 0.6),
    page('/about', 0.4, 'yearly'),
    page('/contact', 0.4, 'yearly'),
    page('/privacy', 0.2, 'yearly'),
    page('/cookies', 0.2, 'yearly'),
    page('/terms', 0.2, 'yearly'),
    page('/disclaimer', 0.2, 'yearly'),
  ]
}
