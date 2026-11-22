import Breadcrumbs from '@/components/Breadcrumbs'
import TemplateGrid from '@/components/TemplateGrid'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Text Effect Templates – 15 Match Cut Styles',
  description:
    'Fifteen original text match-cut styles: documentary, breaking news, finance, sports, luxury, cinematic, motivation, mystery, meme, gaming, captions, newspaper, aesthetic, dramatic and minimal.',
  path: '/templates',
})

export default function TemplatesPage() {
  return (
    <>
      <div className="container page">
        <Breadcrumbs items={[{ href: '/templates', label: 'Templates' }]} />
        <header className="page-head">
          <h1>Templates</h1>
          <p className="lede">
            Fifteen original styles, each a complete starting point: typefaces, layout, colour, rhythm and sound. Pick one, then
            change anything. Hover or focus a card to see it move; open it to remix it with your own words.
          </p>
        </header>
        <TemplateGrid />
        <section className="prose narrow section">
          <h2>How styles work</h2>
          <p>
            A style sets defaults – it never locks anything. When you switch styles in the editor, your text and focal word are kept
            and only the look changes. Use <em>Reset style</em> to return to a style’s defaults after experimenting, and{' '}
            <em>Copy shareable link</em> to save your customised version as a URL you can reopen or send to a collaborator.
          </p>
          <h2>Choosing one</h2>
          <p>
            Match the style to the tone of what follows, not just the topic. A finance video about a scam might suit Mystery better
            than Finance; a gentle product launch might suit Aesthetic better than Luxury. When in doubt, Minimal never fights with
            your content.
          </p>
        </section>
      </div>
    </>
  )
}
