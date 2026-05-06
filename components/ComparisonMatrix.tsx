import { Icon } from '@iconify/react'
import Link from 'next/link'

type CellValue =
  | { type: 'check'; text: string }
  | { type: 'cross'; text: string }
  | { type: 'text'; text: string }

type Row = {
  feature: string
  pristine: CellValue
  zoominfo: CellValue
  clay: CellValue
  apollo: CellValue
}

const rows: Row[] = [
  {
    feature: 'Database size',
    pristine:  { type: 'check', text: '700M+ contacts' },
    zoominfo:  { type: 'text',  text: '~250M contacts' },
    clay:      { type: 'cross', text: 'Enrichment only' },
    apollo:    { type: 'text',  text: '~275M contacts' },
  },
  {
    feature: 'Data accuracy',
    pristine:  { type: 'check', text: '90% verified' },
    zoominfo:  { type: 'text',  text: '~70% verified' },
    clay:      { type: 'cross', text: 'Source-dependent' },
    apollo:    { type: 'text',  text: '~75% verified' },
  },
  {
    feature: 'Search',
    pristine:  { type: 'check', text: 'Natural language AI' },
    zoominfo:  { type: 'cross', text: 'Filter columns' },
    clay:      { type: 'cross', text: 'Filter columns' },
    apollo:    { type: 'cross', text: 'Filter columns' },
  },
  {
    feature: 'Email verification',
    pristine:  { type: 'check', text: 'Real-time SMTP' },
    zoominfo:  { type: 'cross', text: 'None' },
    clay:      { type: 'cross', text: 'None' },
    apollo:    { type: 'cross', text: 'Basic (not real-time)' },
  },
  {
    feature: 'Outreach sequences',
    pristine:  { type: 'check', text: 'Built-in' },
    zoominfo:  { type: 'cross', text: 'Needs separate tool' },
    clay:      { type: 'cross', text: 'None' },
    apollo:    { type: 'cross', text: 'Basic' },
  },
  {
    feature: 'Strategy-led copy',
    pristine:  { type: 'check', text: 'AI from company reports' },
    zoominfo:  { type: 'cross', text: 'No' },
    clay:      { type: 'cross', text: 'No' },
    apollo:    { type: 'cross', text: 'No' },
  },
  {
    feature: 'Ops overhead',
    pristine:  { type: 'check', text: 'Zero: prompt and go' },
    zoominfo:  { type: 'cross', text: 'High' },
    clay:      { type: 'cross', text: 'Very high (Clay tables)' },
    apollo:    { type: 'text',  text: 'Medium' },
  },
  {
    feature: 'Pricing model',
    pristine:  { type: 'check', text: 'All-in-one' },
    zoominfo:  { type: 'cross', text: '$15K–$40K/yr per seat' },
    clay:      { type: 'cross', text: 'Per-credit' },
    apollo:    { type: 'cross', text: 'Per-credit' },
  },
]

function Cell({ value }: { value: CellValue }) {
  if (value.type === 'check') {
    return (
      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
        <Icon icon="solar:check-circle-bold" width={16} className="flex-shrink-0" />
        {value.text}
      </div>
    )
  }
  if (value.type === 'cross') {
    return (
      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 text-sm">
        <Icon icon="solar:close-circle-linear" width={16} className="flex-shrink-0 text-slate-300 dark:text-slate-700" />
        {value.text}
      </div>
    )
  }
  return <span className="text-sm text-slate-500 dark:text-slate-400">{value.text}</span>
}

export function ComparisonMatrix() {
  return (
    <section className="bg-white dark:bg-slate-950 pt-24 pb-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-4">
            How Pristine stacks up
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Named. Side by side. No asterisks.
          </p>
        </div>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-950">
          {/* Header row */}
          <div className="grid grid-cols-5 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <div className="p-5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center">
              Feature
            </div>
            {/* Pristine — highlighted */}
            <div className="p-5 bg-slate-50 dark:bg-slate-900 border-x border-indigo-100 dark:border-indigo-900/40 flex items-center">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Pristine</span>
            </div>
            {['ZoomInfo', 'Clay', 'Apollo'].map((name) => (
              <div key={name} className="p-5 flex items-center text-sm font-semibold text-slate-400 dark:text-slate-500">
                {name}
              </div>
            ))}
          </div>

          {/* Data rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-5 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
              >
                <div className="p-5 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  {row.feature}
                </div>
                {/* Pristine cell — highlighted column */}
                <div className="p-5 bg-slate-50/60 dark:bg-slate-900/60 border-x border-indigo-100 dark:border-indigo-900/40 flex items-center">
                  <Cell value={row.pristine} />
                </div>
                <div className="p-5 flex items-center"><Cell value={row.zoominfo} /></div>
                <div className="p-5 flex items-center"><Cell value={row.clay} /></div>
                <div className="p-5 flex items-center"><Cell value={row.apollo} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact-us"
            className="px-8 py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg shadow-slate-900/20 dark:shadow-none transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            Book a Custom Demo
            <Icon icon="solar:arrow-right-linear" width={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
