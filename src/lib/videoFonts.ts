import {
  Anton,
  Archivo_Black,
  Bebas_Neue,
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Inter,
  Instrument_Serif,
  Playfair_Display,
  Space_Grotesk,
  Special_Elite,
} from 'next/font/google'
import type { FontResolver } from '@/engine/render'
import type { FontId } from '@/engine/types'

// Self-hosted at build time; nothing is fetched from Google at runtime.
// preload:false – each file downloads only when the canvas first draws with it.
const inter = Inter({ subsets: ['latin'], display: 'swap', preload: false, weight: 'variable' })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', preload: false, weight: 'variable' })
const instrument = Instrument_Serif({ subsets: ['latin'], display: 'swap', preload: false, weight: '400' })
const plexmono = IBM_Plex_Mono({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '500', '600', '700'] })
const elite = Special_Elite({ subsets: ['latin'], display: 'swap', preload: false, weight: '400' })
const anton = Anton({ subsets: ['latin'], display: 'swap', preload: false, weight: '400' })
const bebas = Bebas_Neue({ subsets: ['latin'], display: 'swap', preload: false, weight: '400' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], display: 'swap', preload: false, weight: ['400', '500', '600', '700'] })
const grotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', preload: false, weight: 'variable' })
const archivo = Archivo_Black({ subsets: ['latin'], display: 'swap', preload: false, weight: '400' })

const families: Record<FontId, string> = {
  inter: inter.style.fontFamily,
  playfair: playfair.style.fontFamily,
  instrument: instrument.style.fontFamily,
  plexmono: plexmono.style.fontFamily,
  elite: elite.style.fontFamily,
  anton: anton.style.fontFamily,
  bebas: bebas.style.fontFamily,
  cormorant: cormorant.style.fontFamily,
  grotesk: grotesk.style.fontFamily,
  archivo: archivo.style.fontFamily,
}

export const resolveFont: FontResolver = (id) => families[id]
