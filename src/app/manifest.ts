import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TextSnapy – Text Match Cut Generator',
    short_name: site.name,
    description: site.description,
    start_url: '/create',
    display: 'standalone',
    background_color: '#0e0d0c',
    theme_color: '#0e0d0c',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
