/** AdSense is opt-in via env so the site can be reviewed and launched ad-free. */
const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '').trim()

export const ads = {
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' && /^ca-pub-\d{10,20}$/.test(client),
  client,
  slots: {
    article: (process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE ?? '').trim(),
  },
}

export type AdSlotName = keyof typeof ads.slots

/** Site-wide loader in <head>: needed for AdSense verification and Auto ads. */
export const adsenseSrc = /^ca-pub-\d{10,20}$/.test(client)
  ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
  : ''

/** Publisher id for ads.txt (works before ads are switched on, which AdSense review expects). */
export const publisherId = /^ca-pub-\d{10,20}$/.test(client) ? client.replace(/^ca-/, '') : ''
