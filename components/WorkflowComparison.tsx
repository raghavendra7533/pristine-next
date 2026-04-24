// Iconify web-component type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { icon: string; width?: string | number; class?: string }, HTMLElement>
    }
  }
}

export function WorkflowComparison() {
  return (
    <section className="overflow-hidden bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-b pt-24 pb-24 relative">
      <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="md:text-4xl text-3xl font-semibold text-slate-900 dark:text-white tracking-tight mb-4">
            Stop building &ldquo;Franken-stacks&rdquo;
          </h2>
          <p className="leading-relaxed md:text-lg text-base text-slate-700 dark:text-slate-400">
            Connecting disparate tools like ZoomInfo, Clay, Amplemarket, and Smartlead is expensive and brittle. Reduce or eliminate GTM engineering.
          </p>
        </div>

        <div className="flex flex-col gap-12">

          {/* THE OLD WAY */}
          <div className="relative bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 overflow-hidden shadow-sm">
            <div className="dark:bg-slate-800 dark:border-slate-800 text-[10px] dark:text-slate-400 uppercase font-bold text-slate-500 tracking-widest bg-slate-200/50 border-slate-200/50 rounded-br-2xl border-r border-b pt-2 pr-4 pb-2 pl-4 absolute top-0 left-0">
              The &ldquo;Modern&rdquo; Stack (Fragmented)
            </div>

            <div className="w-full py-6 px-4">
              <div className="flex flex-col xl:flex-row items-stretch justify-center gap-6 w-full max-w-7xl mx-auto px-4 py-2">

                {/* INPUTS */}
                <div className="flex flex-col gap-3 w-full xl:w-64 shrink-0">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1 text-center xl:text-left">Input Sources</div>

                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-200/60 dark:border-indigo-900/40 hover:border-indigo-300 rounded-xl p-3 flex items-center justify-between shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">ICP/Persona</span>
                      <span className="text-[10px] text-indigo-600/80 dark:text-indigo-400 font-medium">Target Definition</span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0 ml-2">
                      <iconify-icon icon="solar:user-id-bold" width="14" />
                    </div>
                  </div>
                  {[
                    { label: 'Event Data', sub: 'Conference & Webinar', icon: 'solar:ticket-bold' },
                    { label: 'Competitor Customers', sub: 'Technographics', icon: 'solar:shield-warning-bold' },
                    { label: 'Intent Signals', sub: 'ZoomInfo / LinkedIn', icon: 'solar:users-group-rounded-bold' },
                  ].map(({ label, sub, icon }) => (
                    <div key={label} className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-900/40 hover:border-amber-300 rounded-xl p-3 flex items-center justify-between shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">{label}</span>
                        <span className="text-[10px] text-amber-600/80 dark:text-amber-400 font-medium">{sub}</span>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 ml-2">
                        <iconify-icon icon={icon} width="14" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONNECTOR → */}
                <div className="flex items-center justify-center text-slate-300 dark:text-slate-600 xl:self-center py-2 xl:py-0">
                  <iconify-icon icon="solar:arrow-right-linear" class="hidden xl:block text-2xl" />
                  <iconify-icon icon="solar:arrow-down-linear" class="xl:hidden text-2xl" />
                </div>

                {/* PROCESS GRID */}
                <div className="flex-1 w-full bg-slate-50/80 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-4 md:p-5 relative">
                  <div className="absolute -top-2.5 left-4 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-400 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 uppercase tracking-widest shadow-sm">Expensive Engineering</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 h-full content-center">
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-indigo-200/50 dark:border-indigo-900/40 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">Data Normalisation</span>
                      <div className="flex items-center justify-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:settings-minimalistic-bold" class="text-indigo-500" width="12" />
                        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">Clay</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-purple-200/50 dark:border-purple-900/40 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">ICP Qualification</span>
                      <div className="flex items-center justify-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:magic-stick-3-bold" class="text-purple-500" width="12" />
                        <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">OpenAI</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-purple-200/50 dark:border-purple-900/40 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">Deep Research</span>
                      <div className="flex items-center justify-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:magic-stick-3-bold" class="text-purple-500" width="12" />
                        <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">Perplexity</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-blue-200/50 dark:border-blue-900/40 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">Buying Committee</span>
                      <div className="flex items-center justify-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:database-bold" class="text-blue-500" width="12" />
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">ZoomInfo</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-emerald-200/50 dark:border-emerald-900/40 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">Verify Contact</span>
                      <div className="flex items-center justify-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:shield-check-bold" class="text-emerald-500" width="12" />
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Amplemarket</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 shadow-sm border border-purple-200/50 dark:border-purple-900/40 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between gap-2 h-24">
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 leading-tight text-center">Account Journey</span>
                      <div className="flex items-center justify-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-md py-1 px-2 w-full mt-auto">
                        <iconify-icon icon="solar:magic-stick-3-bold" class="text-purple-500" width="12" />
                        <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">Gemini</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONNECTOR → */}
                <div className="flex items-center justify-center text-slate-300 dark:text-slate-600 xl:self-center py-2 xl:py-0">
                  <iconify-icon icon="solar:arrow-right-linear" class="hidden xl:block text-2xl" />
                  <iconify-icon icon="solar:arrow-down-linear" class="xl:hidden text-2xl" />
                </div>

                {/* OUTPUTS */}
                <div className="flex flex-col gap-3 w-full xl:w-64 shrink-0 xl:justify-center">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-1 text-center xl:text-left">Destinations</div>
                  <div className="bg-slate-100/50 dark:bg-slate-800/30 border border-dashed border-slate-300/60 dark:border-slate-700/40 rounded-xl p-4 shadow-sm flex flex-col gap-3 cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                        <iconify-icon icon="solar:code-square-bold" width="18" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-300">Manually Built</span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">Campaigns</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">Custom setup required for each campaign. Engineering time needed.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* THE PRISTINE WAY */}
          <div className="relative bg-slate-900 rounded-3xl p-1 overflow-hidden shadow-2xl ring-1 ring-slate-900/5 group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-1000" />

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 bg-slate-900 rounded-[22px] p-8 md:p-12 relative items-center justify-between">

              <div className="absolute top-0 left-0 px-6 py-2 bg-slate-800 rounded-br-2xl text-[10px] font-bold text-indigo-400 uppercase tracking-widest border-r border-b border-slate-700">
                The Pristine Way
              </div>

              {/* INPUT */}
              <div className="flex flex-col gap-3 w-full md:w-auto relative z-10 mt-4 md:mt-0">
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 text-slate-300 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-slate-800 flex items-center justify-center text-amber-600 text-[10px]">
                      <iconify-icon icon="solar:ticket-bold" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-slate-800 flex items-center justify-center text-blue-600 text-[10px]">
                      <iconify-icon icon="solar:shield-warning-bold" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-slate-800 flex items-center justify-center text-indigo-600 text-[10px]">
                      <iconify-icon icon="solar:global-bold" />
                    </div>
                  </div>
                  <span className="text-sm font-semibold">Events &amp; Competitors</span>
                </div>
              </div>

              {/* ARROW */}
              <div className="hidden md:flex flex-1 items-center justify-center relative">
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                <div className="text-indigo-400 bg-slate-900 border border-slate-700 rounded-full p-2 absolute shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ color: 'rgb(129,140,248)' }}>
                    <path fill="currentColor" d="M3.845 3.845a2.883 2.883 0 0 0 0 4.077L5.432 9.51l.038-.04l4-4l.04-.038l-1.588-1.587a2.883 2.883 0 0 0-4.077 0m6.723 2.645l-.038.04l-4 4l-.04.038l9.588 9.588a2.884 2.884 0 0 0 4.078-4.078zM16.1 2.307a.483.483 0 0 1 .9 0l.43 1.095a.48.48 0 0 0 .272.274l1.091.432a.486.486 0 0 1 0 .903l-1.09.432a.5.5 0 0 0-.273.273L17 6.81a.483.483 0 0 1-.9 0l-.43-1.095a.5.5 0 0 0-.273-.273l-1.09-.432a.486.486 0 0 1 0-.903l1.09-.432a.5.5 0 0 0 .273-.274zm3.867 6.823a.483.483 0 0 1 .9 0l.156.399c.05.125.148.224.273.273l.398.158a.486.486 0 0 1 0 .902l-.398.158a.5.5 0 0 0-.273.273l-.156.4a.483.483 0 0 1-.9 0l-.157-.4a.5.5 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.902l.398-.158a.5.5 0 0 0 .272-.273zM5.133 15.307a.483.483 0 0 1 .9 0l.157.4a.48.48 0 0 0 .272.273l.398.157a.486.486 0 0 1 0 .903l-.398.158a.48.48 0 0 0-.272.273l-.157.4a.483.483 0 0 1-.9 0l-.157-.4a.48.48 0 0 0-.272-.273l-.398-.158a.486.486 0 0 1 0-.903l.398-.157a.48.48 0 0 0 .272-.274z" />
                  </svg>
                </div>
              </div>
              <div className="md:hidden flex flex-col items-center text-indigo-500 opacity-50">
                <iconify-icon icon="solar:arrow-down-linear" width="24" />
              </div>

              {/* CENTRAL BRAIN */}
              <div className="flex-1 text-center relative w-full md:w-auto">
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-indigo-500/40 p-8 rounded-2xl shadow-2xl shadow-indigo-900/30 relative overflow-hidden group-hover:border-indigo-500/70 transition-colors min-w-[160px]">
                  <div className="absolute inset-0 bg-indigo-500/8 animate-pulse" />
                  <div className="flex items-center justify-center mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/Pristine Data AI Logo.svg" alt="Pristine Data AI" className="h-14" />
                  </div>
                  <p className="text-xs text-slate-400">Zero GTM Engineering Required</p>
                </div>
              </div>

              {/* ARROW */}
              <div className="hidden md:flex flex-1 items-center justify-center relative">
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
                <div className="text-emerald-400 bg-slate-900 border border-slate-700 rounded-full p-2 absolute shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ color: 'rgb(52,211,153)' }}>
                    <path fill="currentColor" fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10m-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47l2.235-2.235L14.97 8.97a.75.75 0 0 1 1.06 0" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="md:hidden flex flex-col items-center text-emerald-500 opacity-50">
                <iconify-icon icon="solar:arrow-down-linear" width="24" />
              </div>

              {/* OUTPUT */}
              <div className="w-full md:w-auto relative z-10">
                <div className="bg-gradient-to-b from-emerald-900/40 to-slate-900/80 backdrop-blur border border-emerald-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-3 text-center">Pre-Built Themes</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: 'solar:hand-shake-bold', label: 'Sales Outreach' },
                      { icon: 'solar:users-group-rounded-bold', label: 'Lead Nurture' },
                      { icon: 'solar:flag-bold', label: 'Competitor Takeout' },
                      { icon: 'solar:calendar-bold', label: 'Event Outreach' },
                    ].map(({ icon, label }) => (
                      <div key={label} className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-center hover:bg-emerald-500/20 transition-colors cursor-default">
                        <iconify-icon icon={icon} class="text-emerald-400 mb-1" width="16" />
                        <span className="text-[10px] font-semibold text-emerald-300 block">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
