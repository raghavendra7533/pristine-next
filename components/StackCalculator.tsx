import Image from 'next/image'
import Link from 'next/link'

const LOGO_TOKEN = 'pk_R0FhQgSqRMmR86Lw1NOJNg'

const TOOLS = [
  { name: 'ZoomInfo',     domain: 'zoominfo.com',     cost: 3000 },
  { name: 'Clay',         domain: 'clay.com',          cost: 299  },
  { name: 'Outreach',     domain: 'outreach.io',       cost: 400  },
  { name: 'OpenAI/ChatGPT', domain: 'openai.com',     cost: 200  },
]

const HEADCOUNT_COST = 4000

const TOTAL = TOOLS.reduce((s, t) => s + t.cost, 0) + HEADCOUNT_COST

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
            Most sales teams are duct-taping multiple tools together that overlap, overcharge, and still don&apos;t talk to each other. ZoomInfo for data. Clay for enrichment. Outreach for sequences. OpenAI to write the emails. And then a GTM engineer or ops hire to keep it all from falling apart. That&apos;s the bill nobody shows you in the demo. Pristine replaces all of them. One agent, one price. Simple to use -- no GTM engineering needed.
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

        {/* Right — thermal receipt */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm" style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.18)) drop-shadow(0 1px 4px rgba(0,0,0,0.10))', transform: 'rotate(2.5deg)' }}>
            <div
              className="bg-[#fdf6e3] px-6 py-9 font-mono text-[13px] text-[#1a1a0a]"
              style={{
                backgroundImage: [
                  /* receipt lines */ 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.035) 31px, rgba(0,0,0,0.035) 32px)',
                  /* aged tint */     'radial-gradient(ellipse at 30% 20%, rgba(180,140,60,0.06) 0%, transparent 60%)',
                  /* corner shadow */ 'radial-gradient(ellipse at 90% 90%, rgba(0,0,0,0.04) 0%, transparent 50%)',
                ].join(', '),
                clipPath: `polygon(
                  0% 1.4%,  2% 0%,    4% 1.8%,  6% 0.4%,  8% 2%,    11% 0.2%, 13% 1.6%, 16% 0%,
                  18% 2.2%, 21% 0.6%, 23% 1.8%, 26% 0%,   28% 1.4%, 31% 0.3%, 33% 2%,   36% 0.5%,
                  38% 1.8%, 41% 0%,   43% 1.6%, 46% 0.4%, 48% 2%,   51% 0.2%, 53% 1.8%, 56% 0%,
                  58% 2.2%, 61% 0.6%, 63% 1.4%, 66% 0%,   68% 2%,   71% 0.4%, 73% 1.8%, 76% 0.2%,
                  78% 2%,   81% 0%,   83% 1.6%, 86% 0.4%, 88% 2%,   91% 0.2%, 93% 1.8%, 96% 0%,
                  98% 1.4%, 100% 0.6%,
                  100% 98.8%,
                  98% 100%, 95% 98.2%, 92% 100%, 89% 98.6%, 87% 100%, 84% 98.2%, 81% 100%,
                  78% 98.4%, 75% 100%, 72% 98.2%, 69% 100%, 66% 98.6%, 63% 100%, 60% 98.2%,
                  57% 100%, 54% 98.4%, 51% 100%, 48% 98.2%, 45% 100%, 42% 98.6%, 39% 100%,
                  36% 98.2%, 33% 100%, 30% 98.4%, 27% 100%, 24% 98.2%, 21% 100%, 18% 98.6%,
                  15% 100%, 12% 98.2%, 9% 100%,  6% 98.4%,  3% 100%,  0% 98.8%
                )`,
              }}
            >
              <div className="border-t border-dashed border-[#c8c8a0] my-3" />

              {/* Column headers */}
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#888877] mb-2">
                <span>Tool</span>
                <span>Monthly</span>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] my-3" />

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
                {/* Headcount tax divider */}
                <div className="flex flex-col items-center my-1">
                  <div className="w-full border-t border-dashed border-amber-400/60" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 bg-[#fdf6e3] px-2 -mt-[9px]">
                    * HEADCOUNT TAX *
                  </span>
                </div>

                {/* Headcount row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-[#555544]">
                      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <span className="truncate text-[12px]">GTM Engineer / Ops</span>
                  </div>
                  <span className="shrink-0 text-[12px] font-semibold tabular-nums">{fmt(HEADCOUNT_COST)}/mo</span>
                </div>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] my-4" />

              {/* Totals */}
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-black uppercase tracking-widest">Total / mo</span>
                <span className="text-[15px] font-black tabular-nums">{fmt(TOTAL)}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-[11px] font-black uppercase tracking-widest">Total / yr</span>
                <span className="text-[20px] font-black tabular-nums text-red-600 dark:text-red-400">{fmt(TOTAL * 12)}</span>
              </div>

              <div className="border-t border-dashed border-[#c8c8a0] my-4" />

              <div className="text-center text-[9px] text-[#888877] tracking-wide leading-relaxed">
                Replace all of them with Pristine.<br />One agent, one price. No ops headcount required.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
