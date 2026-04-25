'use client'
// app/compare/pristine-vs-zoominfo/page.tsx
import Link from 'next/link'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const enrichmentRows = [
  ['Data freshness', 'Batch crawl and partner contributions; some lag', 'Live query across providers at search time'],
  ['Email verification', 'Database-stored; accuracy varies by record age', 'Real-time SMTP verification on every lookup'],
  ['Phone coverage', 'Large direct-dial database', 'Multi-source waterfall; verified before delivery'],
  ['Enrichment method', 'Single-source database snapshot', 'Parallel query across Apollo, Wiza, Explorium'],
  ['Unverified records', 'Included in results; bounce risk on export', 'Filtered out; no unverified guesses delivered'],
]

const approachRows: [string, string, string][] = [
  ['Data quality', 'Live query at search time: freshest data per field', 'Batch database snapshot: records age between refreshes'],
  ['Pricing model', 'Flat monthly: prospecting, enrichment, signals, outreach included', 'Seat licenses + export credits + intent add-on + Engage + Chorus'],
  ['GTM flexibility', 'Prospecting, signals, AI personalization, and campaigns in one workflow', 'Modular: database, intent, sequencing, and CI each priced separately'],
  ['AI personalization', 'Opportunity Playbook: structured pre-call brief before every call', 'AI Copilot (beta); generates account summaries'],
  ['Setup time', 'Log in and search', 'Implementation, training, RevOps configuration'],
]

const featureRows: [string, string, string][] = [
  ['Prospecting interface', 'Natural language AI search', 'Filter-based with 300+ parameters; training required'],
  ['Data enrichment', 'Parallel multi-source waterfall', 'Single-source database; waterfall in premium tier'],
  ['Buying signals', 'Native: surfaced inside prospecting workflow', 'Paid add-on; separate intent dashboard'],
  ['Sales intelligence', 'Opportunity Playbook: structured pre-call brief', 'Not available natively; reps research manually'],
  ['AI personalization', 'Per-prospect content generation in campaign builder', 'AI Copilot (beta); generates summaries'],
  ['Campaign builder', 'Native sequencer integrated with prospect data', 'Engage module; billed separately or bundled'],
  ['Conversation intelligence', 'Not in scope', 'Chorus (separate license)'],
  ['CRM sync', 'Salesforce, HubSpot, Pipedrive', 'Salesforce, Dynamics, HubSpot'],
  ['Pricing model', 'Flat monthly', 'Seat licenses + export credits + add-ons'],
  ['Target segment', 'B2B teams, $1M–$30M revenue, active outbound', 'Enterprise and upper mid-market'],
  ['Setup time', 'Log in and search', 'Implementation, training, RevOps configuration'],
]

const faqs = [
  {
    q: 'Does Pristine replace ZoomInfo entirely?',
    a: "For most mid-market outbound teams, yes. If your primary use is prospecting, enrichment, personalization, and outreach, Pristine handles all of it natively. ZoomInfo's strongest advantages: raw database size, conversation intelligence via Chorus, and enterprise-grade lead routing: matter most at scale with dedicated RevOps. If you are paying for a ZoomInfo subscription primarily to get contact data for outbound sequences, Pristine is a direct replacement with more built in.",
  },
  {
    q: "How does Pristine's data quality compare to ZoomInfo's large database?",
    a: "Coverage and freshness are different problems. ZoomInfo has coverage; freshness is harder. Pristine queries live providers at the moment you search, so you get the most current data each source holds: not a cached record from the last batch refresh. On deliverability, parallel multi-source enrichment with real-time SMTP verification consistently outperforms single-source lookups on bounce rate.",
  },
  {
    q: "What about intent data: ZoomInfo's buyer intent is well-known?",
    a: "ZoomInfo's intent product is strong, and we give it fair credit. The difference with Pristine is where signals surface. Pristine shows buying signals: job changes, funding rounds, tech stack shifts: inside the prospecting workflow, while you are deciding who to reach out to. A separate intent dashboard gets checked once a week. A signal visible when you are building the list drives action.",
  },
  {
    q: 'What is the actual price difference?',
    a: "ZoomInfo's pricing depends on seat count, export volume, intent add-ons, and whether you include Engage or Chorus. By the time a mid-market team assembles what they actually need, annual spend routinely runs $20K–$40K or more. Pristine's base pricing starts well below that, with prospecting, enrichment, buying signals, campaign building, and sales intelligence all included.",
  },
  {
    q: 'Can I see Pristine working on my actual ICP before I decide?',
    a: 'Yes. Book a demo and we will run Pristine against your actual ICP in real time. No curated lists, no staged data. You will see enrichment quality, signal coverage, and the Opportunity Playbook output for accounts you care about.',
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

export default function PristineVsZoomInfoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-6">

          {/* Hero */}
          <section className="py-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logos/Untitled Design 500x500.png" alt="Pristine" className="w-8 h-8 object-contain" />
              <span className="text-xs font-semibold text-slate-400 tracking-widest">VS</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.logo.dev/zoominfo.com?token=pk_R0FhQgSqRMmR86Lw1NOJNg" alt="ZoomInfo" className="w-8 h-8 object-contain" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">ZoomInfo Alternative</p>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
              Pristine Data vs ZoomInfo
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-3">You&apos;re paying for a database.<br className="hidden sm:block" /> Your rep is still not closing.</p>
            <p className="text-base text-slate-400 dark:text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto">
              A contact database tells you who to call. Pristine tells you why to call them, what to ask, and what to say: in one platform, without the six-figure contract.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Link href="/contact-us" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                See Pristine in action
              </Link>
              <Link href="#comparison" className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400 text-sm font-semibold transition-colors">
                Compare features ↓
              </Link>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="rounded-2xl p-5 bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">$40K+</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">annual stack cost</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Seats + export credits + intent add-on + Engage + Chorus. Before headcount.</div>
              </div>
              <div className="rounded-2xl p-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Live</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">enrichment at query time</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Not a cached snapshot. Pristine queries providers the moment you search.</div>
              </div>
              <div className="rounded-2xl p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">1</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">pre-call playbook</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">AI-generated brief with discovery questions, pitch, and next steps: before every call.</div>
              </div>
              <div className="rounded-2xl p-5 bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900">
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">0</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">separate intent tabs</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Buying signals surface inside the prospecting workflow: where decisions are made.</div>
              </div>
            </div>
          </section>

          {/* Who Should Choose Which */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Who Should Choose Which?</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 mb-8">If you&apos;re evaluating ZoomInfo or searching for ZoomInfo alternatives in 2025–2026, here&apos;s the honest breakdown.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://img.logo.dev/zoominfo.com?token=pk_R0FhQgSqRMmR86Lw1NOJNg" alt="ZoomInfo" className="w-5 h-5 object-contain" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Choose ZoomInfo if…</p>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'You are enterprise-scale with dedicated RevOps managing lead routing, territory ops, and complex Salesforce workflows.',
                    'You need Chorus for conversation intelligence and want it tightly integrated with your contact data.',
                    'Your compliance team requires SOC 2 and enterprise data agreements that only a large platform provides.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/logos/Untitled Design 500x500.png" alt="Pristine" className="w-5 h-5 object-contain" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Choose Pristine if…</p>
                </div>
                <ul className="space-y-2.5">
                  {[
                    'You want live enrichment at query time, not a database snapshot that may be months out of date.',
                    'Your reps need more than a contact record: they need to know why to call today and what to say when someone picks up.',
                    'You are a mid-market team spending $20K–$40K on ZoomInfo and not using most of what you are paying for.',
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Approach table */}
          <section id="comparison" className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">How They Approach the Problem</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ZoomInfo</th>
                  </tr>
                </thead>
                <tbody>
                  {approachRows.map(([label, pristine, zi], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{zi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* The Database Problem */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">Data quality</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Pristine Data: A ZoomInfo Alternative With Live Enrichment</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>If you&apos;re searching for ZoomInfo alternatives, the data freshness gap is usually the first thing that comes up. ZoomInfo built its reputation on one thing: having the biggest contact database. 70 million direct dials. Impressive on the slide. In practice, your reps are sending sequences to contacts who changed jobs six months ago, and your RevOps team is deduplicating CRM records instead of building pipeline.</p>
              <p>A contact database is a snapshot. The moment someone changes roles, gets promoted, or joins a new company, that record starts decaying. You paid for it. You are still paying for it next quarter. The data does not know that.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Pristine queries live enrichment providers at the moment you search. The contact record you get reflects what those providers know today: not what was cached in a batch refresh last month. And unlike ZoomInfo, the full platform: signals, AI personalization, and outreach: is included in one subscription, not four.</p>
            </div>
          </section>

          {/* Enrichment Architecture */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data That Refreshes When You Search, Not When They Feel Like It</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              <p>ZoomInfo maintains a warehouse. When you search, you are querying that warehouse. If a contact changed roles four months ago, you might get the old title. You often will not know until the bounce comes back.</p>
              <p>Pristine runs enrichment at query time. Every search triggers a parallel waterfall across Apollo, Wiza, and Explorium. You get the most current data each of those providers holds, not a cached version from a batch refresh. The output is a confidence-scored contact record that shows which field came from which source.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Verified emails only. If Pristine cannot verify an address, it moves to the next source. It does not hand you an unverified guess and let you figure out the bounce rate the hard way.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ZoomInfo</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                  </tr>
                </thead>
                <tbody>
                  {enrichmentRows.map(([label, legacy, pristine], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{legacy}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Buying Signals */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">The Intent Signal That Exists Where You&apos;re Actually Working</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>ZoomInfo surfaces buyer intent as a separate module. You get a dashboard showing which accounts are researching topics relevant to you. It is useful. It is also three clicks away from where your SDR is building their outreach list, which means most SDRs do not check it.</p>
              <p>Pristine surfaces buying signals inside the prospecting workflow. When your rep is building a list, they see which accounts have had a recent leadership change, received funding, or shifted their tech stack. The signal appears when the decision to reach out is being made: not in a separate intent dashboard that gets checked on Fridays.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">Intent signals are most useful when they are visible where you are building the list.</p>
            </div>
          </section>

          {/* Sales Intelligence */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What Happens After You Find the Contact</h2>
            <div className="space-y-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>ZoomInfo tells you who to call. Pristine tells you why to call them, what to ask, and what story to tell.</p>
              <p>The Opportunity Playbook generates a full account brief from public data and your CRM context. Before your rep gets on the call, they have the prospect&apos;s strategic priorities, recommended discovery questions organized by type, case studies mapped to the prospect&apos;s industry and stage, a value pitch built around their specific situation, and suggested next steps for the deal stage.</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">A rep walking into a call with a Pristine playbook knows more about that account than most reps know going into their second follow-up. That is the gap that matters.</p>
            </div>
          </section>

          {/* Full Feature Comparison */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Full Feature Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide w-1/3"></th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide">Pristine</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ZoomInfo</th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map(([label, pristine, zi], i) => (
                    <tr key={i} className="border-b last:border-0 border-slate-100 dark:border-slate-800">
                      <td className="px-5 py-3.5 font-medium text-slate-700 dark:text-slate-300 text-sm">{label}</td>
                      <td className="px-5 py-3.5 text-slate-800 dark:text-slate-200 font-medium text-sm">{pristine}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400 text-sm">{zi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Where Each Wins */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Head-to-Head: Where Each Wins</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Where ZoomInfo still leads</h3>
                <ul className="space-y-3">
                  {[
                    'Raw database size: 174M+ verified emails is a genuine network effect',
                    'Conversation intelligence: Chorus is a mature, well-regarded product',
                    'Lead routing and ops automation: purpose-built for RevOps at scale',
                    'Enterprise security and compliance: SOC 2, SSO, RBAC, battle-tested',
                    'CRM native integration depth: especially in Salesforce-heavy orgs',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20 p-6">
                <h3 className="text-sm font-semibold text-indigo-500 uppercase tracking-wide mb-4">Where Pristine wins</h3>
                <ul className="space-y-3">
                  {[
                    'Enrichment quality at query time vs. database snapshot',
                    'Deal-level intelligence that replaces manual call prep',
                    'Buying signals integrated into the prospecting workflow',
                    'AI personalization at campaign level, not just summary level',
                    'Pricing that scales for mid-market without a six-figure contract',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Who Switches */}
          <section className="py-16 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Who Switches to Pristine</h2>
            <div className="space-y-6">
              {[
                {
                  role: 'SDRs and AEs tired of manual call prep',
                  body: 'who spend 20–30 minutes before every call cobbling together context from LinkedIn, Google, and a five-minute Slack to a colleague. The Opportunity Playbook replaces that research with a structured brief that exists before the calendar invite.',
                },
                {
                  role: 'Sales leaders frustrated by disconnected intent data',
                  body: "who pay for intent signals in one tool and prospect in another, meaning buying signals almost never influence which accounts get worked this week. Pristine surfaces signals where the decision is actually made.",
                },
                {
                  role: 'RevOps teams auditing the stack',
                  body: "who are adding up seat licenses, export credits, intent add-ons, and conversation intelligence licenses and finding the total uncomfortable. Tool consolidation is one of the most concrete ROI cases Pristine makes: especially for teams where most reps aren't power users of the current platform.",
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
              The data platform that does the thinking too
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              If you need your SDR to find the right account, understand why to reach out today, and get on the call with something to say: without assembling five vendor contracts: that is what Pristine is built for.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact-us" className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors">
                Book a 10-minute walkthrough
              </Link>
              <Link href="/stack-audit" className="px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-500 text-sm font-semibold transition-colors">
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No slides. Just the product.</p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  )
}
