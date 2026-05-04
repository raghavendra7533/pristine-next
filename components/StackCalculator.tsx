'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

// Approximate list prices as of Q1 2026 — update periodically
// perSeat: true = multiplied by rep count; custom = excluded from total
const TOOLS: { name: string; domain: string; price: number; perSeat: boolean; custom?: boolean }[] = [
  { name: 'ZoomInfo',    domain: 'zoominfo.com',    price: 1250, perSeat: true  },
  { name: 'Apollo',      domain: 'apollo.io',       price: 79,   perSeat: true  },
  { name: 'Clay',        domain: 'clay.com',        price: 299,  perSeat: false },
  { name: 'Amplemarket', domain: 'amplemarket.com', price: 300,  perSeat: true  },
  { name: 'Outreach',    domain: 'outreach.io',     price: 0,    perSeat: false, custom: true },
  { name: 'Smartlead',   domain: 'smartlead.ai',    price: 94,   perSeat: true  },
]

export function StackCalculator() {
  const [reps, setReps] = useState(3)
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(TOOLS.map((t) => [t.name, true]))
  )

  function toggleTool(name: string) {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const monthlyTotal = TOOLS.reduce((sum, tool) => {
    if (!checked[tool.name] || tool.custom) return sum
    return sum + (tool.perSeat ? tool.price * reps : tool.price)
  }, 0)

  const yearlyTotal = monthlyTotal * 12

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
            What&apos;s your GTM stack actually costing you?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Drag the slider. Check the boxes. See the number.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">

            {/* Left: Inputs */}
            <div className="p-8 flex flex-col gap-8">
              {/* Reps slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Sales reps
                  </label>
                  <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                    {reps} {reps === 1 ? 'rep' : 'reps'}
                  </span>
                </div>
                {/* Max 20 covers SMB and mid-market teams — adjust if needed */}
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1</span><span>20</span>
                </div>
              </div>

              {/* Tool checkboxes */}
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Tools in your stack
                </p>
                <div className="flex flex-col gap-2">
                  {TOOLS.map((tool) => (
                    <label
                      key={tool.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 cursor-pointer hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked[tool.name]}
                          onChange={() => toggleTool(tool.name)}
                          className="accent-indigo-500 w-4 h-4"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`}
                          alt={tool.name}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {tool.name}
                        </span>
                        {tool.custom ? (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">custom</span>
                        ) : tool.perSeat ? (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">per seat</span>
                        ) : (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">flat rate</span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                        {tool.custom
                          ? 'Custom'
                          : `$${(tool.perSeat ? tool.price * reps : tool.price).toLocaleString()}/mo`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Output + CTA */}
            <div className="p-8 flex flex-col justify-between gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mb-4">
                  Your current stack costs
                </p>
                <div className="font-black tabular-nums leading-none mb-2 text-5xl text-red-500 tracking-tight">
                  ${monthlyTotal.toLocaleString()}
                  <span className="text-base font-semibold text-slate-400 dark:text-slate-500 ml-1">/mo</span>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-sm tabular-nums">
                  ${yearlyTotal.toLocaleString()}/yr
                </p>
                <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Switch to Pristine — one bill, everything included.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/stack-audit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-100 bg-gradient-to-br from-indigo-500 to-violet-500"
                >
                  Get your free GTM stack audit
                  <Icon icon="solar:arrow-right-linear" width={14} />
                </Link>
                <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">
                  Free · No credit card · Takes 2 minutes
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
