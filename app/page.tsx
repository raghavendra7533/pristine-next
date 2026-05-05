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

export const metadata: Metadata = {
  title: 'Pristine Data AI - Replace ZoomInfo, Clay, and Amplemarket',
  description: 'Search 700M contacts, verify them in real time, and send strategy-led outreach. No Clay tables. No ops engineer. No $40K ZoomInfo seat.',
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
      <Navbar />
      <main>
        <Hero />
        <WorkflowComparison />
        <FeaturesSection />
        <StatsSection />
        <StackCalculator />
        <ComparisonMatrix />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
