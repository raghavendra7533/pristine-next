import Image from 'next/image'
import Link from 'next/link'

const LOGO_TOKEN = 'pk_R0FhQgSqRMmR86Lw1NOJNg'

const TOOLS = [
  { name: 'ZoomInfo',           domain: 'zoominfo.com', cost: 5000 },
  { name: 'Apollo.io',          domain: 'apollo.io',    cost: 1200 },
  { name: 'LinkedIn Sales Nav', domain: 'linkedin.com', cost: 1600 },
]

const TOTAL = TOOLS.reduce((s, t) => s + t.cost, 0)

function fmt(n: number) {
  return '$' + n.toLocaleString()
}

function getMonthYear() {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function StackCalculator() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left — copy */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            What you&apos;re actually paying
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-slate-950 dark:text-white mb-6">
            Your GTM stack is costing you more than you think.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Most sales teams are running 3–5 tools that overlap, overcharge, and still don&apos;t talk to each other. ZoomInfo for data. Apollo for sequences. LinkedIn for prospecting. That&apos;s three bills, three logins, and three ops headaches every single month.
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            Pristine replaces all of them. One agent. One price. 700M verified contacts with real-time enrichment and AI-written outreach built in.
          </p>
          <Link
            href="/stack-audit"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-lg transition-all hover:translate-y-px"
          >
            Get your Stack Audit done now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.917 7h8.166M7.583 4l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right — invoice card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

            {/* Dark header */}
            <div className="bg-slate-800 dark:bg-slate-900 px-6 py-5 flex items-start justify-between">
              <div>
                <div className="text-white font-bold text-lg tracking-tight">Monthly Invoice</div>
                <div className="text-slate-400 text-sm mt-0.5">GTM Stack — {getMonthYear()}</div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-700 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2h6l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#94a3b8" strokeWidth="1.25" strokeLinejoin="round"/>
                  <path d="M10 2v3h3M6 8h4M6 11h3" stroke="#94a3b8" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Line items */}
            <div className="bg-white dark:bg-slate-950 px-6 py-4 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {TOOLS.map((t) => (
                <div key={t.name} className="flex items-center justify-between py-3.5 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 overflow-hidden bg-white">
                      <Image
                        src={`https://img.logo.dev/${t.domain}?token=${LOGO_TOKEN}&size=32`}
                        alt={t.name}
                        width={20}
                        height={20}
                        unoptimized
                      />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-[14px] truncate">{t.name}</span>
                  </div>
                  <span className="text-slate-800 dark:text-slate-200 text-[14px] font-semibold tabular-nums shrink-0">{fmt(t.cost)}/mo</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-white dark:bg-slate-950 px-6 pb-6">
              <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Monthly Spend</div>
                  <div className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">{fmt(TOTAL * 12)}/yr</div>
                </div>
                <div className="text-3xl font-black tabular-nums text-red-500">{fmt(TOTAL)}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
