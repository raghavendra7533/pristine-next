export function TestimonialSection() {
  return (
    <section className="hidden py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Customer stories
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-slate-950 dark:text-white">
            Don&apos;t take our word for it.
          </h2>
        </div>

        {/* Quote card */}
        <div className="flex gap-8 items-start">
          {/* Big decorative quote mark */}
          <span className="hidden md:block text-[80px] leading-none font-serif text-slate-200 dark:text-slate-800 select-none mt-[-8px] shrink-0">&ldquo;</span>

          <div>
            <blockquote className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Both surprised and shocked at the results, and at how quickly this was turned around. The quality of our existing data was worse than we thought.
            </blockquote>

            <footer className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                VP
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">VP of Data</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">1,000-person SaaS company</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#f59e0b">
                    <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75z" />
                  </svg>
                ))}
              </div>
            </footer>
          </div>
        </div>

      </div>
    </section>
  )
}
