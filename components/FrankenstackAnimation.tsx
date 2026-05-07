'use client'
import { useEffect, useState } from 'react'

/* ─── Data ──────────────────────────────────────────────────────────────── */
const HOP_STEPS = [
  { name: 'ZoomInfo',    domain: 'zoominfo.com',    action: 'Pull prospect list',     pain: 'Export CSV manually' },
  { name: 'Clay',        domain: 'clay.com',        action: 'Enrich & normalize',     pain: 'Wait for enrichment' },
  { name: 'Amplemarket', domain: 'amplemarket.com', action: 'Score & prioritize',     pain: 'Upload CSV again'    },
  { name: 'Outreach',    domain: 'outreach.io',     action: 'Write & send sequences', pain: 'Sync back to CRM'    },
]

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)) }
function mapRange(v: number, a: number, b: number, c: number, d: number) {
  return c + (d - c) * clamp((v - a) / (b - a))
}
/* ─── Duration ──────────────────────────────────────────────────────────── */
const DURATION = 9000

/* ─── Main ──────────────────────────────────────────────────────────────── */
export function FrankenstackAnimation() {
  const [progress, setProgress] = useState(0)
  const [isDark,   setIsDark]   = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  // Play once when scrolled into view, then stop
  useEffect(() => {
    let rafId: number
    let startTime: number | null = null
    let playing = false

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const p = Math.min((now - startTime) / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          playing = true
          rafId = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    const el = document.getElementById('frankenstack-animation')
    if (el) observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  const dark = mounted && isDark

  /* ── Timing: Act 2 (0→0.58), Act 4 (0.63→1.0) ── */
  const HOP_N   = HOP_STEPS.length
  const hopSlot = clamp(progress / 0.58) * HOP_N
  const hopBase = progress <= 0.60 ? 1 : 0

  function hopCardOpacity(i: number) {
    if (hopBase !== 1 || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 0
    const frac    = hopSlot - Math.floor(hopSlot)
    const fadeIn  = mapRange(frac, 0, 0.2, 0, 1)
    const fadeOut = i < HOP_N - 1 ? mapRange(frac, 0.75, 1.0, 1, 0) : 1
    return fadeIn * fadeOut
  }
  function hopCardScale(i: number) {
    if (hopBase !== 1 || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 0.88
    return mapRange(hopSlot - Math.floor(hopSlot), 0, 0.2, 0.88, 1)
  }
  function hopCardY(i: number) {
    if (hopBase !== 1 || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 16
    return mapRange(hopSlot - Math.floor(hopSlot), 0, 0.2, 16, 0)
  }

  const textOpacity = mapRange(progress, 0.63, 0.73, 0, 1)
  const textBlur    = mapRange(progress, 0.63, 0.71, 8, 0)
  const subOpacity  = mapRange(progress, 0.73, 0.83, 0, 1)
  const subY        = mapRange(progress, 0.73, 0.83, 14, 0)
  const markOpacity = mapRange(progress, 0.83, 0.95, 0, 1)

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

        {/* Left — animation panel (no box) */}
        <div className="w-full lg:w-1/2 order-1">
          <div id="frankenstack-animation" className="relative overflow-hidden" style={{ height: 440 }}>

            {/* ── Act 2: tool-hopping ── */}
            {hopBase === 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {HOP_STEPS.map((step, i) => (
                  <div
                    key={step.name}
                    className="absolute flex flex-col items-center gap-4 text-center"
                    style={{ opacity: hopCardOpacity(i), transform: `scale(${hopCardScale(i)}) translateY(${hopCardY(i)}px)`, willChange: 'opacity, transform' }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                      Step {i + 1} of {HOP_N}
                    </p>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://www.google.com/s2/favicons?domain=${step.domain}&sz=64`} alt={step.name} width={28} height={28} className="w-7 h-7 object-contain" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{step.name}</p>
                        <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">{step.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40 rounded-full px-3.5 py-1.5">
                      <span className="text-rose-400 text-xs">↳</span>
                      <span className="text-rose-500 dark:text-rose-400 text-xs font-semibold">{step.pain}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Act 4: reveal ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 pointer-events-none select-none">

              {/* Competitor logos — horizontal row */}
              <div
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${mapRange(textOpacity, 0, 1, 10, 0)}px)`,
                  filter: textBlur > 0 ? `blur(${textBlur}px)` : undefined,
                  willChange: 'opacity, transform, filter',
                }}
                className="flex items-center gap-3"
              >
                {HOP_STEPS.map((tool, i) => (
                  <div key={tool.name} className="flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-[14px] bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                        alt={tool.name}
                        width={26}
                        height={26}
                        className="w-[26px] h-[26px] object-contain opacity-60"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-tight">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div
                style={{ opacity: subOpacity, transform: `translateY(${subY}px)`, willChange: 'opacity, transform' }}
                className="flex flex-col items-center gap-1"
              >
                <svg width="1" height="28" viewBox="0 0 1 28" fill="none" className="opacity-25 dark:opacity-20">
                  <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-500" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 dark:text-slate-500 opacity-40">
                  <path d="M8 3v10M3.5 9l4.5 4.5L12.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Pristine logo */}
              <div
                style={{ opacity: markOpacity, willChange: 'opacity' }}
                className="flex flex-col items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dark ? '/assets/Pristine Data AI Logo.svg' : '/assets/Pristine Data Footer Logo.svg'}
                  alt="Pristine Data AI"
                  className="h-9"
                />
                <span className="text-[11px] font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
                  One platform
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Right — headline copy */}
        <div className="w-full lg:w-1/2 order-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            Sound familiar?
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-slate-950 dark:text-white mb-6 leading-tight">
            If your GTM stack looks like this, you&apos;re paying for six tools to do one job.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            ZoomInfo for data. Clay for enrichment. Amplemarket for scoring. Outreach for sequences.
            That&apos;s four bills, four logins, four ops headaches — every single month — and they
            still don&apos;t talk to each other.
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Pristine replaces all of them. One agent. One price. 700M verified contacts with
            real-time enrichment and AI-written outreach built in.
          </p>
        </div>

      </div>
    </section>
  )
}
