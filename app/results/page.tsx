'use client'

// Static-export compatible — reads query params client-side via useSearchParams.
// Must be wrapped in <Suspense> (see bottom export).

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const PEOPLE = [
  { name: 'Sarah K.',   title: 'CMO',                  company: 'Accelify Inc.', location: 'San Francisco, CA', email: '●●●●@accelify.com' },
  { name: 'James R.',   title: 'VP of Sales',           company: 'Novareach',     location: 'Austin, TX',        email: '●●●●@novareach.io'  },
  { name: 'Priya M.',   title: 'Head of Growth',        company: 'Stacklane',     location: 'New York, NY',      email: '●●●●@stacklane.com' },
  { name: 'Daniel W.',  title: 'CRO',                  company: 'Fieldsync',     location: 'Chicago, IL',       email: '●●●●@fieldsync.com' },
  { name: 'Amara T.',   title: 'Demand Gen Manager',    company: 'Liftbase',      location: 'London, UK',        email: '●●●●@liftbase.io'   },
  { name: 'Ryan C.',    title: 'Director of Marketing', company: 'Corevault',     location: 'Seattle, WA',       email: '●●●●@corevault.com' },
]

const COMPANIES = [
  { name: 'Accelify Inc.', industry: 'SaaS',       headcount: '50–200',   revenue: '$10M–$50M',  location: 'San Francisco, CA', techStack: ['HubSpot', 'Salesforce'] },
  { name: 'Novareach',     industry: 'Sales Tech',  headcount: '10–50',    revenue: '$1M–$10M',   location: 'Austin, TX',        techStack: ['Apollo', 'Outreach']    },
  { name: 'Stacklane',     industry: 'MarTech',     headcount: '200–500',  revenue: '$50M–$100M', location: 'New York, NY',      techStack: ['Marketo', 'Clay']       },
  { name: 'Fieldsync',     industry: 'RevOps',      headcount: '50–200',   revenue: '$10M–$50M',  location: 'Chicago, IL',       techStack: ['Gong', 'Salesloft']     },
  { name: 'Liftbase',      industry: 'B2B SaaS',    headcount: '10–50',    revenue: '$1M–$10M',   location: 'London, UK',        techStack: ['Instantly', 'Apollo']   },
  { name: 'Corevault',     industry: 'Cloud Infra', headcount: '500–1000', revenue: '$100M+',     location: 'Seattle, WA',       techStack: ['ZoomInfo', 'Outreach']  },
]

const TOTAL_PEOPLE    = '11,249'
const TOTAL_COMPANIES = '4,872'

// ---------------------------------------------------------------------------
// Suggested searches shown on the no-results state
// ---------------------------------------------------------------------------

const SUGGESTED_PEOPLE = [
  'CMOs at SaaS companies with $10M+ ARR',
  'VP of Sales in Series B startups in New York',
  'Demand Gen Managers using HubSpot',
  'CROs at B2B fintech companies',
  'Founders who recently raised a Series A',
]

const SUGGESTED_COMPANIES = [
  'SaaS startups in San Francisco with 50–200 employees',
  'B2B MarTech companies using Salesforce',
  'RevOps tools companies with $10M–$50M revenue',
  'E-commerce brands hiring for Enterprise Sales',
  'Cloud infrastructure companies in Seattle',
]

// A query is considered "bad" (no results) when it looks like gibberish —
// currently triggered for "aaaa". Swap this for real validation later.
function isBadQuery(q: string) {
  return q.trim().toLowerCase() === 'aaaa'
}

// ---------------------------------------------------------------------------
// No-results state
// ---------------------------------------------------------------------------

function NoResults({ query, isPeople }: { query: string; isPeople: boolean }) {
  const suggestions = isPeople ? SUGGESTED_PEOPLE : SUGGESTED_COMPANIES
  const type        = isPeople ? 'people' : 'company'

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">

      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-6">
        <Icon icon="solar:magnifer-bug-bold" className="text-slate-400 dark:text-slate-500" width={32} />
      </div>

      {/* Headline */}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight mb-3">
        No results for{' '}
        <span className="text-rose-500 dark:text-rose-400">&ldquo;{query}&rdquo;</span>
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10">
        That search didn&apos;t match anything in our database. Try being more specific. Our AI works best with job titles, company types, locations, or tools.
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Try one of these</span>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
      </div>

      {/* Suggestion buttons */}
      <ul className="flex flex-col gap-2.5">
        {suggestions.map((s) => (
          <li key={s}>
            <Link
              href={`/results?query=${encodeURIComponent(s)}&type=${type}`}
              className="group flex items-center justify-between w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/20 transition-all text-left"
            >
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                {s}
              </span>
              <Icon
                icon="solar:arrow-right-linear"
                className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 shrink-0 ml-3 transition-colors"
                width={16}
              />
            </Link>
          </li>
        ))}
      </ul>

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" width={14} />
          Back to home
        </Link>
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Inner page (needs Suspense boundary for static export + useSearchParams)
// ---------------------------------------------------------------------------

function ResultsInner() {
  const sp       = useSearchParams()
  const query    = sp.get('query') ?? 'your search'
  const isPeople = (sp.get('type') ?? 'people') !== 'company'
  const noResults = isBadQuery(query)

  const total   = isPeople ? TOTAL_PEOPLE    : TOTAL_COMPANIES
  const label   = isPeople ? 'contacts'      : 'companies'
  const records = isPeople ? PEOPLE          : COMPANIES

  const visible = records.slice(0, 3)
  const blurred = records.slice(3, 6)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-40">

        {/* ----------------------------------------------------------------
            Ambient background (matches dark pages on the site)
        ---------------------------------------------------------------- */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[100px]" />
        </div>

        {/* No-results state — full-page centred, no table */}
        {noResults && <NoResults query={query} isPeople={isPeople} />}

        {!noResults && (
        <div className="max-w-6xl mx-auto px-6">

          {/* --------------------------------------------------------------
              Back link
          -------------------------------------------------------------- */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Icon icon="solar:arrow-left-linear" width={16} />
              Back to home
            </Link>
          </div>

          {/* --------------------------------------------------------------
              Section header
          -------------------------------------------------------------- */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Icon icon={isPeople ? 'solar:user-circle-bold' : 'solar:buildings-2-bold'} width={12} />
              AI Lead Results
            </span>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
                  Results for{' '}
                  <span className="text-indigo-600 dark:text-indigo-400">&ldquo;{query}&rdquo;</span>
                </h1>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Found{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{total} {label}</span>
                  {' '}(showing 6 as a free preview)
                </p>
              </div>

              {/* CTA buttons (desktop) */}
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-all">
                  <Icon icon="solar:key-bold" width={14} />
                  Sign Up Free
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-lg transition-colors">
                  <Icon icon="solar:calendar-bold" width={14} />
                  Book a Demo
                </a>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------
              Results table
          -------------------------------------------------------------- */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl">

            {/* Table wrapper — horizontal scroll on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* ---- thead ---- */}
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 w-8">#</th>

                    {isPeople ? (
                      <>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Name</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Title</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Company</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Location</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email</th>
                      </>
                    ) : (
                      <>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Company</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Industry</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Headcount</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Revenue</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Location</th>
                        <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Tech Stack</th>
                      </>
                    )}
                  </tr>
                </thead>

                {/* ---- Visible rows (1–3) ---- */}
                <tbody>
                  {visible.map((record, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-4 text-xs text-slate-400 dark:text-slate-600 font-mono">{i + 1}</td>

                      {isPeople ? (
                        <>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-900 dark:text-white">{(record as typeof PEOPLE[number]).name}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof PEOPLE[number]).title}</td>
                          <td className="px-5 py-4">
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{(record as typeof PEOPLE[number]).company}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                              <Icon icon="solar:map-point-wave-linear" width={13} />
                              {(record as typeof PEOPLE[number]).location}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg">
                              {(record as typeof PEOPLE[number]).email}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-900 dark:text-white">{(record as typeof COMPANIES[number]).name}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof COMPANIES[number]).industry}</td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof COMPANIES[number]).headcount}</td>
                          <td className="px-5 py-4">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">{(record as typeof COMPANIES[number]).revenue}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                              <Icon icon="solar:map-point-wave-linear" width={13} />
                              {(record as typeof COMPANIES[number]).location}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(record as typeof COMPANIES[number]).techStack.map((t) => (
                                <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>

                {/* ---- Blurred rows (4–6) — non-interactive teaser ---- */}
                <tbody
                  className="pointer-events-none select-none"
                  style={{ filter: 'blur(4px)', opacity: 0.45 }}
                  aria-hidden="true"
                >
                  {blurred.map((record, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 dark:border-slate-800/60"
                    >
                      <td className="px-5 py-4 text-xs text-slate-400 dark:text-slate-600 font-mono">{i + 4}</td>

                      {isPeople ? (
                        <>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-900 dark:text-white">{(record as typeof PEOPLE[number]).name}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof PEOPLE[number]).title}</td>
                          <td className="px-5 py-4">
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{(record as typeof PEOPLE[number]).company}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                              <Icon icon="solar:map-point-wave-linear" width={13} />
                              {(record as typeof PEOPLE[number]).location}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg">
                              {(record as typeof PEOPLE[number]).email}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-900 dark:text-white">{(record as typeof COMPANIES[number]).name}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof COMPANIES[number]).industry}</td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400">{(record as typeof COMPANIES[number]).headcount}</td>
                          <td className="px-5 py-4">
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">{(record as typeof COMPANIES[number]).revenue}</span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                              <Icon icon="solar:map-point-wave-linear" width={13} />
                              {(record as typeof COMPANIES[number]).location}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(record as typeof COMPANIES[number]).techStack.map((t) => (
                                <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Lock banner at the bottom of the table */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <Icon icon="solar:lock-bold" className="text-indigo-500 dark:text-indigo-400" width={16} />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Showing <span className="font-semibold text-slate-900 dark:text-white">3</span> of{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{total}</span> {label}.{' '}
                  Sign up free to unlock the full list.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-all"
                >
                  <Icon icon="solar:key-bold" width={13} />
                  Sign Up Free
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <Icon icon="solar:calendar-bold" width={13} />
                  Book a Demo
                </a>
              </div>
            </div>

          </div>
          {/* end table card */}

        </div>
        )}

      </main>

      <Footer />
    </>
  )
}

// ---------------------------------------------------------------------------
// Page export — Suspense is required by Next.js static export when a child
// component calls useSearchParams()
// ---------------------------------------------------------------------------

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsInner />
    </Suspense>
  )
}
