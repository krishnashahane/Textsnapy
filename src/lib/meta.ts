import type { Metadata } from 'next'
import { site } from './site'

const ogImage = { url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name} – one word holds still, everything else cuts.` }

/** Per-page metadata with a self-referencing canonical and matching social cards. */
export function pageMeta({ title, description, path, absoluteTitle }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: site.name, locale: 'en_US', url: path, title, description, images: [ogImage] },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
  }
}
