import Image from 'next/image'

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
    <section className="py-24 flex flex-col items-center px-6">

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
        What you&apos;re actually paying
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-slate-950 dark:text-white text-center mb-12">
        Your GTM stack bill
      </h2>

      {/* Receipt */}
      <div className="w-full max-w-sm">
        <div
          className="relative bg-[#fffef5] dark:bg-[#1a1a0e] rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.10)] px-6 py-7 font-mono text-[13px] text-[#1a1a0a] dark:text-[#e8e8d8]"
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

          {/* Footer */}
          <div className="text-center text-[9px] text-[#888877] tracking-wide leading-relaxed">
            Replace all three with Pristine.<br />One bill. One agent.
          </div>
        </div>
      </div>

    </section>
  )
}
