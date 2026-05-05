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
            Most sales teams are running 3–5 tools that overlap, overcharge, and still don&apos;t talk to each other. ZoomInfo for data. Apollo for sequences. LinkedIn for prospecting. That&apos;s three bills, three logins, and three ops headaches — every single month.
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

        {/* Right — receipt */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <div
              className="bg-[#fffef5] dark:bg-[#1a1a0e] rounded-sm shadow-[0_2px_16px_rgba(0,0,0,0.10)] px-6 py-7 font-mono text-[13px] text-[#1a1a0a] dark:text-[#e8e8d8]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.04) 31px, rgba(0,0,0,0.04) 32px)' }}
            >
              {/* Header */}
              <div className="text-center mb-5">
                <div className="text-[11px] font-black tracking-[0.15em] uppercase">* PRISTINE DATA AI *</div>
                <div className="text-[9px] text-[#888877] tracking-[0.12em] mt-0.5 uppercase">GTM Stack Cost Audit</div>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] dark:border-[#444430] my-3" />

              {/* Column headers */}
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#888877] mb-2">
                <span>Tool</span>
                <span>Monthly</span>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] dark:border-[#444430] my-3" />

              {/* Line items */}
              <div className="flex flex-col gap-3">
                {TOOLS.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Image
                        src={`https://img.logo.dev/${t.domain}?token=${LOGO_TOKEN}&size=32`}
                        alt={t.name}
                        width={16}
                        height={16}
                        className="rounded-sm shrink-0"
                        unoptimized
                      />
                      <span className="truncate text-[12px]">{t.name}</span>
                    </div>
                    <span className="shrink-0 text-[12px] font-semibold tabular-nums">{fmt(t.cost)}/mo</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] dark:border-[#444430] my-4" />

              {/* Totals */}
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-black uppercase tracking-widest">Total / mo</span>
                <span className="text-[15px] font-black tabular-nums">{fmt(TOTAL)}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-[11px] font-black uppercase tracking-widest">Total / yr</span>
                <span className="text-[20px] font-black tabular-nums text-red-600 dark:text-red-400">{fmt(TOTAL * 12)}</span>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] dark:border-[#444430] my-4" />

              <div className="text-center text-[9px] text-[#888877] tracking-wide leading-relaxed">
                Replace all three with Pristine.<br />One bill. One agent.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
