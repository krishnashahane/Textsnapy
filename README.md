# TextSnapy

Free, browser-based text match-cut generator. Type a line, lock a focal word in place, and export a cinematic kinetic-typography video for Reels, Shorts and TikTok.

**Live:** [textsnapy.com](https://www.textsnapy.com)

- No sign-up, no uploads — text is rendered and encoded entirely in the browser.
- 15 templates (documentary, breaking news, finance, cinematic, newspaper, minimal and more).
- 9:16, 1:1 and 16:9 output at 720p or 1080p, 30 or 60 fps.
- MP4 (H.264) via WebCodecs, falling back to WebM (VP9/VP8), then MediaRecorder on older browsers.
- Shareable links that restore a design from the URL.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, statically generated) · React 19 · TypeScript
- [Mediabunny](https://mediabunny.dev) for MP4/WebM encoding and muxing
- Vitest for engine tests
- Hosted on Vercel

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local   # optional – see Configuration
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the dev server                               |
| `npm run build`     | Production build                                   |
| `npm start`         | Serve the production build                         |
| `npm run lint`      | ESLint                                             |
| `npm run typecheck` | Generate route types and run `tsc`                 |
| `npm test`          | Run engine tests (Vitest)                          |
| `npm run check`     | Typecheck, lint, test and build — run before a PR  |

## Project structure

```
src/
├── app/          Routes: home, /create, /templates, /examples, /guides, /faq,
│                 tool landing pages, legal pages, sitemap, robots, ads.txt
├── components/   Shared UI (header, footer, ad slot, analytics, JSON-LD)
├── content/      Copy for tools, guides, examples and FAQ
├── editor/       Editor UI and state hook
├── engine/       Rendering, templates, audio, share-link state and video export
└── lib/          Site config, metadata, fonts, analytics and ads helpers
```

## Configuration

All settings are optional environment variables (see [`.env.example`](.env.example)). Never commit `.env.local`.

| Variable                                   | Purpose                                                        |
| ------------------------------------------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                     | Public origin for canonical URLs, sitemap and Open Graph       |
| `NEXT_PUBLIC_CONTACT_EMAIL`                | Contact address shown on Contact, About and legal pages        |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER`           | `umami` or `plausible` (empty disables)                        |
| `NEXT_PUBLIC_ANALYTICS_SRC` / `_ID`        | Script URL and site ID for that provider                       |
| `NEXT_PUBLIC_ADSENSE_CLIENT`               | AdSense publisher ID (`ca-pub-…`); enables loader and ads.txt  |
| `NEXT_PUBLIC_ADS_ENABLED`                  | `true` to render manual ad slots                               |
| `NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE`         | Slot ID for the in-article ad unit                             |

## Privacy

- User text never leaves the browser. Shareable links carry settings in the URL query, which analytics strip before sending.
- Vercel Web Analytics is cookieless; it and any optional provider are skipped under Do Not Track or Global Privacy Control.
- A strict Content Security Policy and security headers are set in [`next.config.ts`](next.config.ts).

## License

[MIT](LICENSE)
