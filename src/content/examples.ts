import type { Settings } from '@/engine/types'

export interface Example {
  id: string
  title: string
  useCase: string
  note: string
  template: string
  text: string
  focus: string
  overrides?: Partial<Settings>
}

/** Ready-made starting points. Shown in the editor and on /examples with before/after demos. */
export const EXAMPLES: Example[] = [
  {
    id: 'history-hook',
    title: 'History channel hook',
    useCase: 'Documentary & explainers',
    note: 'A slow 5 cuts per second on typewritten paper gives viewers time to read fragments, which makes the pages feel like real evidence.',
    template: 'documentary',
    text: 'Historians agree that the treaty changed the map of Europe, but almost nobody remembers the man who wrote it.',
    focus: 'treaty',
  },
  {
    id: 'product-launch',
    title: 'Product launch teaser',
    useCase: 'Brand & marketing',
    note: 'A luxury serif with a slow dip transition. Low cut rate plus blur keeps attention on the product name instead of the filler copy.',
    template: 'luxury',
    text: 'Introducing Aurora, a watch designed to be quiet on the wrist and impossible to forget.',
    focus: 'Aurora',
  },
  {
    id: 'finance-tip',
    title: 'Money tip for Shorts',
    useCase: 'Finance creators',
    note: 'Monospace "terminal" pages and a green marker on the key term. Nine cuts per second lands roughly on 16th notes at 135 BPM.',
    template: 'finance',
    text: 'The earlier you start investing, the more time compound interest has to do the heavy lifting for you.',
    focus: 'compound',
  },
  {
    id: 'match-day',
    title: 'Match-day graphic',
    useCase: 'Sports pages & clubs',
    note: 'Caption layout with cycling team colours and a punch on every cut. Short and loud – made for the first second of a reel.',
    template: 'sports',
    text: 'Ninety minutes stand between this squad and the first final in the club history.',
    focus: 'FINAL',
  },
  {
    id: 'newsletter-promo',
    title: 'Newsletter promo',
    useCase: 'Writers & publishers',
    note: 'Newspaper columns that rebuild on every cut. The inverted block on the focal word reads clearly even at phone size.',
    template: 'newspaper',
    text: 'Every Sunday morning one essay lands in your inbox, and this week it is about the future of slow news.',
    focus: 'Sunday',
  },
  {
    id: 'true-crime',
    title: 'True-crime cold open',
    useCase: 'Podcasts & storytelling',
    note: 'Heavy blur and a cold accent colour keep the background unreadable on purpose – only the single word survives.',
    template: 'mystery',
    text: 'The house was locked, the lights were off, and the only witness swore she never heard a thing.',
    focus: 'witness',
  },
  {
    id: 'study-reel',
    title: 'Study-with-me opener',
    useCase: 'Lifestyle & education',
    note: 'Pastel colour cycling with a gentle drift. Four cuts per second keeps it calm enough for a lo-fi soundtrack.',
    template: 'aesthetic',
    text: 'A quiet desk, a warm drink and three hours of deep focus before the city wakes up.',
    focus: 'focus',
  },
  {
    id: 'patch-notes',
    title: 'Patch-notes reveal',
    useCase: 'Gaming channels',
    note: 'Neon on near-black with a shake on each cut. Upper-case grotesk reads like a HUD without copying any game UI.',
    template: 'gaming',
    text: 'The new season drops tonight with a brand new map, two heroes and a ranked reset nobody saw coming.',
    focus: 'season',
  },
]

export const EXAMPLE_MAP = new Map(EXAMPLES.map((e) => [e.id, e]))
