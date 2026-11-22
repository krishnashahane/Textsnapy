import LegalPage from '@/components/LegalPage'
import { pageMeta } from '@/lib/meta'

export const metadata = pageMeta({
  title: 'Disclaimer',
  description: 'Important limitations on TextSnapy’s content, generated videos, third-party platforms and advertising.',
  path: '/disclaimer',
})

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer">
      <h2>General information</h2>
      <p>
        Guides and articles on TextSnapy are provided for general information about video creation. Platform features,
        specifications and policies (for Instagram, YouTube, TikTok and others) change often; check the platform’s own help pages
        before relying on any specific detail.
      </p>
      <h2>Generated content</h2>
      <p>
        Background text in videos is assembled automatically from the words you provide and from neutral filler copy. It is
        decorative and not intended to be accurate, factual or to represent any real publication, document or person. You are
        responsible for how you use and present your videos.
      </p>
      <h2>No affiliation</h2>
      <p>
        TextSnapy is independent and is not affiliated with, endorsed by or sponsored by Instagram, Meta, YouTube, Google, TikTok,
        ByteDance or any other platform mentioned on this site. Their names are used only to describe compatibility.
      </p>
      <h2>Advertising</h2>
      <p>
        Advertisements on the site are provided by Google AdSense and its partners. An ad appearing on
        TextSnapy is not an endorsement of the product or service advertised.
      </p>
      <h2>External links</h2>
      <p>We link to other websites for convenience and are not responsible for their content or practices.</p>
    </LegalPage>
  )
}
