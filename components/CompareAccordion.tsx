'use client'

import { useState } from 'react'

export function CompareAccordion({ items }: { items: { q: string; a: string }[] }) {
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
