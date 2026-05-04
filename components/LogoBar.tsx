const LOGOS = [
  'SingleGrain',
  'Maveriq',
  'Frontline',
  'Aquila Cloud',
  'Nexla',
  'Lister Ventures',
  'Dezign Pro',
]

export function LogoBar() {
  return (
    <div className="border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-5 px-6">
      <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto scrollbar-none">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 flex-shrink-0 whitespace-nowrap">
          Trusted by
        </span>
        {LOGOS.map((name) => (
          <span
            key={name}
            className="flex-shrink-0 whitespace-nowrap text-sm font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 bg-slate-50 dark:bg-slate-800"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
