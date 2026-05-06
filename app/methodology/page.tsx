import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Data Methodology',
  description: 'How Pristine Data AI sources, verifies, and delivers contact data: the processes behind our 700M+ contact database, 90% deliverability guarantee, and real-time SMTP verification.',
  alternates: { canonical: 'https://pristinedata.ai/methodology' },
  openGraph: {
    title: 'Data Methodology | Pristine Data AI',
    description: 'How Pristine Data AI sources, verifies, and delivers contact data.',
    url: 'https://pristinedata.ai/methodology',
    siteName: 'Pristine Data AI',
    type: 'website',
  },
}

const methodologyJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Pristine Data AI: Data Methodology',
  description: 'How Pristine Data AI sources, verifies, and delivers B2B contact data.',
  url: 'https://pristinedata.ai/methodology',
  author: { '@type': 'Organization', name: 'Pristine Data AI', url: 'https://pristinedata.ai' },
  publisher: { '@type': 'Organization', name: 'Pristine Data AI', url: 'https://pristinedata.ai' },
}

const SECTIONS = [
  {
    id: 'database-size',
    label: 'Database size',
    stat: '700M+ contacts',
    heading: 'Where the 700M+ contact figure comes from',
    body: [
      'Pristine aggregates contact records across three primary enrichment providers: Apollo, Wiza, and Explorium. Each provider maintains its own crawled and contributed dataset. Our figure of 700M+ represents the deduplicated union of all three sources after deduplication by email domain and LinkedIn URL.',
      'This number is audited quarterly. Records older than 18 months without a verification event are flagged and excluded from active search results, keeping the searchable database conservative rather than inflated.',
    ],
  },
  {
    id: 'deliverability',
    label: '90% deliverability',
    stat: '90% deliverability',
    heading: 'How we define and measure 90% deliverability',
    body: [
      'Deliverability is measured as the percentage of exported contacts that pass real-time SMTP verification at the moment of export. An email address that fails SMTP handshake is filtered before it reaches the user — you never see a contact we cannot verify.',
      'The 90% figure is a floor, not an average. It reflects our minimum guarantee across all export cohorts. In practice, most campaigns see 92–96% deliverability depending on the ICP searched. We measure this by tracking hard bounces on outbound campaigns sent through Smartlead and Instantly integrations, aggregated across all customer accounts monthly.',
      'Comparison context: industry bounce rate benchmarks for cold email typically run 3–8% on clean lists and 10–20%+ on unverified database exports (source: Smartlead industry report, 2024; Instantly deliverability benchmarks, 2024).',
    ],
  },
  {
    id: 'smtp-verification',
    label: 'Real-time SMTP verification',
    stat: 'Real-time SMTP',
    heading: 'How real-time SMTP verification works',
    body: [
      'When a user exports a contact, Pristine performs a live SMTP handshake against the mail server for that email domain. This is a three-step process: (1) DNS MX record lookup to identify the mail server, (2) SMTP EHLO/HELO handshake to confirm the server is reachable, (3) RCPT TO command to verify the specific mailbox exists — without sending an email.',
      'This process takes 300–800ms per contact and runs in parallel across batches. It is performed at export time, not at ingestion time, which means the verification reflects the current state of the mailbox rather than a cached result from weeks or months prior.',
      'Limitations: SMTP verification cannot detect catch-all domains (domains that accept mail for any address). We flag catch-all domains in the UI so users can decide how to treat them. Catch-all domains represent approximately 8–12% of the B2B contact universe.',
    ],
  },
  {
    id: 'parallel-enrichment',
    label: 'Parallel multi-source enrichment',
    stat: '3× enrichment sources',
    heading: 'How parallel multi-source enrichment works',
    body: [
      'When a user searches, Pristine queries Apollo, Wiza, and Explorium simultaneously. Each provider returns its best available data for each contact. Our resolution layer then selects the highest-confidence value per field — not per provider.',
      'For example: if Apollo has the most recent email for a contact but Explorium has a more current job title, the exported record uses Apollo\'s email and Explorium\'s title. Field-level confidence is scored based on recency, source reputation for that field type, and cross-source agreement.',
      'This approach consistently produces better deliverability and data accuracy than single-source or sequential waterfall lookups, where the first available result wins regardless of quality.',
    ],
  },
  {
    id: 'buying-signals',
    label: 'Buying signals',
    stat: 'Native signals',
    heading: 'How buying signals are sourced and surfaced',
    body: [
      'Pristine monitors three signal categories natively: job changes (sourced via LinkedIn activity feeds and HR data aggregators), funding events (sourced via Crunchbase and PitchBook API feeds, refreshed daily), and technology stack changes (sourced via BuiltWith and Wappalyzer crawl data, refreshed weekly).',
      'Signals are surfaced inside the prospecting workflow — while the user is building a list — rather than in a separate dashboard. A funding event or job change that surfaces after a prospect list is built goes unactioned by most teams. Pristine shows signals at list-build time so the decision to include or exclude a prospect reflects the most current context available.',
    ],
  },
]

export default function MethodologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologyJsonLd) }} />
      <Navbar />
      <main>
        <div className="max-w-3xl mx-auto px-6 py-20">

          {/* Header */}
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">
              Transparency
            </p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              Data Methodology
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              The sources, processes, and definitions behind every number we publish — so you can evaluate our claims, not just take them on faith.
            </p>
          </div>

          {/* Quick-reference stat bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">{s.stat}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
              </a>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-600 tabular-nums w-4">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">{s.label}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pl-7">
                  {s.heading}
                </h2>
                <div className="pl-7 space-y-4">
                  {s.body.map((para, j) => (
                    <p key={j} className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
                {i < SECTIONS.length - 1 && (
                  <div className="mt-16 border-t border-slate-100 dark:border-slate-800" />
                )}
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800">
            <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
              This page is updated when our methodology changes. If you have a question about a specific data point or want to see verification for a particular claim, contact us at{' '}
              <a href="mailto:team@pristinedata.ai" className="text-indigo-500 hover:underline">team@pristinedata.ai</a>.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
