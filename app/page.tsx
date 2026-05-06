import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { WorkflowComparison } from '@/components/WorkflowComparison'
import { FeaturesSection } from '@/components/FeaturesSection'
import { StatsSection } from '@/components/StatsSection'
import { StackCalculator } from '@/components/StackCalculator'
import { ComparisonMatrix } from '@/components/ComparisonMatrix'
import { FaqSection } from '@/components/FaqSection'
import { TestimonialSection } from '@/components/TestimonialSection'

export const metadata: Metadata = {
  title: 'Pristine Data AI - Replace ZoomInfo, Clay, and Amplemarket',
  description: 'Search 700M contacts, verify them in real time, and send strategy-led outreach. No Clay tables. No ops engineer. No $35K ZoomInfo seat.',
  alternates: { canonical: 'https://pristinedata.ai' },
  openGraph: {
    title: 'Pristine Data AI - Replace ZoomInfo, Clay, and Amplemarket',
    description: 'Search 700M contacts, verify them in real time, and send strategy-led outreach. One agent. One bill.',
    url: 'https://pristinedata.ai',
    siteName: 'Pristine Data AI',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pristine Data AI' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pristine Data AI - Replace ZoomInfo, Clay, and Amplemarket',
    description: 'Search 700M contacts, verify them in real time, and send strategy-led outreach. One agent. One bill.',
    images: ['/og-image.png'],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Pristine Data AI different from Apollo or ZoomInfo?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pristine replaces them, not integrates with them. One login, one bill, one workflow. No CSV exports, no tool-hopping, no Clay tables gluing it together.' },
    },
    {
      '@type': 'Question',
      name: 'Is the data actually verified, or just aggregated?',
      acceptedAnswer: { '@type': 'Answer', text: 'Real-time SMTP pings on every contact before export. 90% deliverability, not a batch-refreshed promise. If it bounces, you don\'t see it.' },
    },
    {
      '@type': 'Question',
      name: 'Do I need an ops engineer or RevOps person to run Pristine?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Type what you want in plain English, get a verified list, write sequences from the same screen. No spreadsheets, no API keys, no ops dependency.' },
    },
    {
      '@type': 'Question',
      name: 'Can I import my existing sequences or contacts?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We support imports from Apollo, ZoomInfo exports, and CSV. Our team helps with migration (included).' },
    },
    {
      '@type': 'Question',
      name: 'How does Pristine Data AI pricing work?',
      acceptedAnswer: { '@type': 'Answer', text: 'All-in-one pricing: no per-credit surprises, no seat tax for every tool in your stack. Contact us for a custom quote based on your team size.' },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Pristine Data AI',
            applicationCategory: 'BusinessApplication',
            description: 'Replace ZoomInfo, Clay, and Amplemarket. One agent. One bill. 700M+ verified contacts, AI-powered search, and automated outreach.',
            url: 'https://pristinedata.ai',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar />
      <main>
        <Hero />
        <WorkflowComparison />
        <FeaturesSection />
        <StatsSection />
        <TestimonialSection />
        <StackCalculator />
        <ComparisonMatrix />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
