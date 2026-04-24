'use client'
// app/compare/pristine-vs-amplemarket/page.tsx
import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const enrichmentRows = [
  ['Data source', 'Parallel query across Apollo, Wiza, Explorium', 'Proprietary database, single source'],
  ['Email verification', 'Real-time SMTP verification on every lookup', 'Stored verification; accuracy decays over time'],
  ['Enrichment trigger', 'Live at query time', 'Batch or on import'],
  ['Multi-source fallback', 'Yes — best field per source', 'No — single database result'],
  ['Setup required', 'None', 'Import, map fields, configure sequences'],
]

const featureRows = [
  ['Prospecting interface', 'Natural language AI search', 'Filter-based search with preset parameters'],
  ['Data enrichment', 'Parallel multi-source waterfall', 'Built-in database; limited external enrichment'],
  ['Buying signals', 'Native — job changes, funding, tech stack', 'Basic signals; no real-time trigger layer'],
  ['Sales intelligence', 'Opportunity Playbook — structured pre-call brief', 'Not available; reps research manually'],
  ['AI personalization', 'Per-prospect content generation in campaign builder', 'AI-assisted email suggestions'],
  ['Multichannel outreach', 'Email + push to Smartlead / Instantly', 'Email, LinkedIn, phone — native'],
  ['Conversation intelligence', 'Not in scope', 'Built-in call dialer and tracking'],
  ['CRM sync', 'Salesforce, HubSpot, Pipedrive', 'Salesforce, HubSpot, Pipedrive'],
  ['Pricing model', 'Transparent credits — see cost before you run', 'Per-seat; scales with team size'],
  ['Target segment', 'B2B teams, $1M–$30M revenue, active outbound', 'Mid-market and enterprise sales teams'],
  ['Setup time', 'Log in and search', 'Onboarding, training, sequence configuration'],
]

const faqs = [
  {
    q: 'Does Pristine replace Amplemarket entirely?',
    a: "For outbound-focused teams, largely yes. Pristine covers prospecting, enrichment, buying signals, AI personalization, and sequencing in one place. Amplemarket's main advantages are its native multichannel dialer and deeper LinkedIn automation. If your team's primary motion is email-led outbound with rich pre-call intelligence, Pristine is a stronger fit.",
  },
  {
    q: 'How does Pristine handle multichannel outreach?',
    a: 'Pristine focuses on email outreach natively, with direct integrations to Smartlead and Instantly for high-volume sending. LinkedIn and phone outreach are handled through your existing tools. Amplemarket bundles these channels natively, which is an advantage for teams that need LinkedIn automation in the same platform.',
  },
  {
    q: "What makes Pristine's data better?",
    a: "Pristine queries Apollo, Wiza, and Explorium in parallel at the moment you search — not from a cached database. Each field is resolved by whichever source has the highest confidence for that contact. Amplemarket's database is proprietary and single-source. On deliverability and data freshness, parallel live enrichment consistently outperforms stored databases.",
  },
  {
    q: 'What is the pricing difference?',
    a: "Amplemarket prices per seat and scales with team size — a common model that works well for large teams but creates a seat tax on anyone who isn't a daily power user. Pristine's credit pricing is transparent: you see the cost of a campaign before you run it, and you don't pay for seats that aren't active.",
  },
  {
    q: 'Can I see Pristine on my actual ICP before deciding?',
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

export default function PristineVsAmplemarketPage() {
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
              <img src="https://img.logo.dev/amplemarket.com?token=pk_R0FhQgSqRMmR86Lw1NOJNg" alt="Amplemarket" className="w-8 h-8 object-contain" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
              Amplemarket does a lot. Does it do the right things?
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-3">Multichannel outreach is table stakes. Pre-call intelligence is not.</p>
            <p className="text-base text-slate-400 dark:text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
              Amplemarket bundles sequencing, dialing, and LinkedIn into one platform. Pristine adds what most sales platforms skip — live enrichment, buying signals, and a structured brief before every call.
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
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Live</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">enrichment at query time</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Not a stored database. Pristine queries providers the moment you search.</div>
              </div>
              <div className="rounded-2xl p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">3×</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">enrichment sources</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Apollo, Wiza, and Explorium queried in parallel — best result per field wins.</div>
              </div>
              <div className="rounded-2xl p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">pre-call playbook</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Discovery questions, pitch, and next steps — AI-generated before every call.</div>
              </div>
              <div className="rounded-2xl p-5 bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">0</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">seat taxes</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Credit pricing — you only pay for what you actually run, not who has a login.</div>
              </div>
            </div>
          </section>

          {/* What Amplemarket Gets Right */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Amplemarket Gets Right</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>Amplemarket is a genuinely well-built platform. It bundles email sequencing, a native phone dialer, LinkedIn automation, and AI-assisted copy generation in a single interface. For teams running true multichannel outbound — where reps are dialing and messaging on LinkedIn as well as email — having all three channels in one tool removes real friction.</p>
              <p>The problem is not what Amplemarket does. It is what it does not do before the sequence starts. The data your rep is working from comes from Amplemarket's own database. There is no live enrichment at query time, no buying signal layer integrated into the prospecting workflow, and no structured pre-call intelligence.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Your rep finds the contact in Amplemarket. Then they open another tab to figure out what to say. Pristine closes that gap.</p>
            </div>
          </section>

          {/* Enrichment */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Live Data vs. a Stored Database</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              <p>Amplemarket maintains its own proprietary contact database. When you search, you query that database. If a contact changed roles three months ago, you may get the old title. The email may still deliver — or it may not.</p>
              <p>Pristine queries Apollo, Wiza, and Explorium in parallel at the moment you search. Every field is resolved by whichever source has the highest confidence for that specific contact at that specific moment. You get a verified email or nothing — Pristine does not hand you a guess and let you discover the bounce rate later.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amplemarket</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichmentRows.map(([label, amp, pristine], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{amp}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sales Intelligence */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Happens Before the Call</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>Amplemarket helps your rep send the sequence and dial the number. It does not tell them what to say when the prospect picks up. That research happens in a separate tab, or it does not happen at all.</p>
              <p>Pristine's Opportunity Playbook generates a full account brief before every call — strategic priorities and pain points for the account, discovery questions organised by type, a value pitch mapped to the prospect's specific situation, and recommended next steps for the deal stage. The rep does not assemble this. It exists before the calendar invite.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">A rep who walks in prepared closes more calls than a rep who walked in fast. That is the gap Pristine fills.</p>
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
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amplemarket</th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map(([label, pristine, amp], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{amp}</td>
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
                  role: 'SDRs tired of manual pre-call research',
                  body: 'who spend 20–30 minutes before every call piecing together context from LinkedIn and Google. The Opportunity Playbook replaces that work entirely — before the calendar invite is even sent.',
                },
                {
                  role: 'Sales leaders who want signal-driven outbound',
                  body: "who need buying signals — job changes, funding, tech stack shifts — surfaced where the list is being built, not buried in a separate dashboard nobody checks.",
                },
                {
                  role: 'RevOps teams evaluating data quality',
                  body: 'who are seeing high bounce rates and stale titles on outbound campaigns. Live multi-source enrichment at query time delivers measurably better deliverability than single-source stored databases.',
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
              Find the right account. Know what to say. Close.
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              Pristine handles prospecting, enrichment, signals, and pre-call intelligence in one place. No extra tabs. No separate research step.
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
