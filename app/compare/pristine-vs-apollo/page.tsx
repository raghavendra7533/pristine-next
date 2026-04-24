'use client'
// app/compare/pristine-vs-apollo/page.tsx
import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const enrichmentRows = [
  ['Data source', 'Parallel query across Apollo, Wiza, Explorium', 'Apollo proprietary database'],
  ['Email verification', 'Real-time SMTP verification on every lookup', 'Stored verification; export credits consumed'],
  ['Enrichment trigger', 'Live at query time', 'Batch or on-demand, credits deducted'],
  ['Multi-source fallback', 'Yes — best field per source wins', 'No — single database result'],
  ['Credit cost', 'Flat — Pristine absorbs provider costs', 'Per export and per enrichment action'],
]

const featureRows = [
  ['Prospecting interface', 'Natural language AI search', 'Filter-based with 65+ parameters'],
  ['Data enrichment', 'Parallel multi-source waterfall', 'Apollo database; credits deducted per export'],
  ['Buying signals', 'Native — job changes, funding, tech stack', 'Intent data available on paid tiers'],
  ['Sales intelligence', 'Opportunity Playbook — structured pre-call brief', 'Not available; reps research manually'],
  ['AI personalization', 'Per-prospect content generation in campaign builder', 'AI email suggestions (basic)'],
  ['Campaign builder', 'Native sequencer integrated with prospect data', 'Sequences available; basic branching'],
  ['CRM sync', 'Salesforce, HubSpot, Pipedrive', 'Salesforce, HubSpot, Pipedrive'],
  ['Pricing model', 'Transparent credits — see cost before you run', 'Free tier + paid plans; credits for exports'],
  ['Target segment', 'B2B teams, $1M–$30M revenue, active outbound', 'SMB to mid-market; broad user base'],
  ['Setup time', 'Log in and search', 'Quick — large self-serve user base'],
]

const faqs = [
  {
    q: 'Pristine uses Apollo as an enrichment source. Why switch?',
    a: "Pristine queries Apollo alongside Wiza and Explorium simultaneously, and returns the highest-confidence result per field — not just what Apollo has. If you are using Apollo directly, you are getting Apollo's result. Pristine gets you Apollo's result when it is the best available, and a better result when it is not. Beyond data, Pristine adds the Opportunity Playbook, buying signals integrated into prospecting, and AI personalization at campaign level — none of which Apollo provides.",
  },
  {
    q: "What about Apollo's free tier?",
    a: "Apollo's free tier is genuinely useful for getting started. The limitations show up when you need volume, freshness, and intelligence. Export credits run out. The data is a snapshot — not live. There is no pre-call intelligence layer. Pristine is built for teams that have outgrown the free-tier workflow and need a platform that scales without duct tape.",
  },
  {
    q: 'Does Pristine replace Apollo in my stack?',
    a: "For most outbound workflows, yes. Pristine handles prospecting, enrichment, buying signals, AI personalization, and sequencing. Apollo's strengths — a large database and a well-known free tier — are most relevant early in your outbound journey. If you are running active campaigns and want better data quality, pre-call intelligence, and flat pricing, Pristine is a direct replacement.",
  },
  {
    q: "How does pricing compare?",
    a: "Apollo's paid plans are credit-based — you pay per export, per enrichment action, and for higher-tier features. Costs compound as your team scales. Pristine's pricing is flat: you see what a campaign costs before you run it, and there is no per-credit billing for standard enrichment or signals.",
  },
  {
    q: 'Can I see Pristine working on my ICP before deciding?',
    a: 'Yes. Book a demo and we will run Pristine against your actual ICP in real time — no curated lists, no staged data. You will see enrichment quality, signal coverage, and the Opportunity Playbook output for accounts you care about.',
  },
]

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
      {items.map(({ q, a }, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{q}</span>
            <span className={`shrink-0 w-5 h-5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-400" />
              </svg>
            </span>
          </button>
          <div className={`grid transition-all duration-300 ease-in-out ${open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-6 pb-5">{a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PristineVsApolloPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-6">

          {/* Hero */}
          <section className="py-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/Untitled Design 500x500.png" alt="Pristine" className="w-8 h-8 object-contain" />
              <span className="text-xs font-semibold text-slate-400 tracking-widest">VS</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.logo.dev/apollo.io?token=pk_R0FhQgSqRMmR86Lw1NOJNg" alt="Apollo" className="w-8 h-8 object-contain" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
              Apollo is where outbound starts.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-3">Pristine is where it starts working.</p>
            <p className="text-base text-slate-400 dark:text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
              Apollo gives you a large database and a sequencer. Pristine adds live enrichment across multiple providers, buying signals where you prospect, and a pre-call brief for every account — without the credit math.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link href="/contact" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                See Pristine in action
              </Link>
              <Link href="#comparison" className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 text-sm font-semibold transition-colors">
                Compare features ↓
              </Link>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="rounded-2xl p-5 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">3×</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">enrichment sources</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Apollo, Wiza, and Explorium queried simultaneously — best field per source wins.</div>
              </div>
              <div className="rounded-2xl p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">0</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">export credits</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Flat pricing. No per-export billing. No credit refills mid-campaign.</div>
              </div>
              <div className="rounded-2xl p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Live</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">data at query time</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Not a cached snapshot. Pristine queries providers the moment you search.</div>
              </div>
              <div className="rounded-2xl p-5 bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">pre-call playbook</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">AI-generated brief with discovery questions, pitch, and next steps before every call.</div>
              </div>
            </div>
          </section>

          {/* Apollo's position */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Where Apollo Fits — and Where It Stops</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>Apollo built its reputation on a large database and a generous free tier. For teams just starting outbound, it is often the right first tool — low barrier, quick to search, easy to connect a sequencer. We use Apollo as one of our enrichment providers for exactly this reason: the coverage is real.</p>
              <p>The limitations show when you need more than a contact record. Apollo's data is a snapshot — records age between refreshes, and you discover the bounce rate on delivery. There is no pre-call intelligence, no structured buying signal layer integrated into prospecting, and no AI personalization at campaign level. Export credits compound as your team scales, and the pricing stops feeling flat fast.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Pristine is what comes next. Live enrichment across three providers, buying signals where the list is built, and a brief that tells your rep what to say before the call starts.</p>
            </div>
          </section>

          {/* Enrichment */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Using Apollo Through Pristine Is Better Than Using Apollo Directly</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              <p>When you search in Apollo, you get Apollo's result. When you search in Pristine, you get Apollo's result when it is the best available — and a better result from Wiza or Explorium when it is not. Every field is resolved independently, by the source with the highest confidence for that contact.</p>
              <p>On top of that: Pristine absorbs the provider costs. You pay a flat credit. Apollo charges you per export and per enrichment action. At volume, that difference compounds.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Apollo</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichmentRows.map(([label, apollo, pristine], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{apollo}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sales Intelligence */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Apollo Does Not Have</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>Apollo tells you who to reach out to. It does not tell you why now, what to ask, or what to say when they pick up. That research happens in a separate tab — or it does not happen at all, and the call is wasted.</p>
              <p>Pristine's Opportunity Playbook generates a full account brief before every call. Strategic priorities and pain points, discovery questions organised by type, a value pitch mapped to the prospect's situation, and recommended next steps. The rep walks into the call prepared — not because they spent 30 minutes on LinkedIn, but because the brief was already there.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Apollo gets your rep to the conversation. Pristine gets them through it.</p>
            </div>
          </section>

          {/* Feature Comparison */}
          <section id="comparison" className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Apollo</th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map(([label, pristine, apollo], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{apollo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Who Switches */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Who Switches to Pristine</h2>
            <div className="space-y-6">
              {[
                {
                  role: 'Teams that have outgrown the Apollo free tier',
                  body: 'and are hitting export credit limits, dealing with stale data, and manually stitching together context for every call. Pristine is built for the next stage — live data, signals, and intelligence all in one place.',
                },
                {
                  role: 'SDRs spending 30 minutes on pre-call research',
                  body: "who piece together account context from LinkedIn, news alerts, and Slack before every meeting. The Opportunity Playbook replaces that entirely. The brief exists before the calendar invite.",
                },
                {
                  role: 'RevOps teams auditing deliverability',
                  body: 'who are seeing bounce rates climb and stale job titles on sequences. Live multi-source enrichment at query time consistently outperforms stored single-source databases on deliverability.',
                },
              ].map(({ role, body }) => (
                <div key={role} className="flex gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{role}</span> {body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Frequently Asked Questions</h2>
            <Accordion items={faqs} />
          </section>

          {/* CTA */}
          <section className="py-20 border-t border-slate-100 dark:border-slate-800 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Better data. Better intel. One platform.
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Pristine queries Apollo — and two other providers — at the same time, and adds the intelligence layer Apollo does not have. See it on your ICP.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                Book a demo
              </Link>
              <Link href="/stack-audit" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500 text-sm font-semibold transition-colors">
                See pricing
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
