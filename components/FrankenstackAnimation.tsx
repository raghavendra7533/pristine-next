'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Receipt data ───────────────────────────────────────────────────────── */
const LOGO_TOKEN = 'pk_R0FhQgSqRMmR86Lw1NOJNg'

const TOOLS_BILL = [
  { name: 'ZoomInfo',       domain: 'zoominfo.com', cost: 3000 },
  { name: 'Clay',           domain: 'clay.com',     cost: 299  },
  { name: 'Outreach',       domain: 'outreach.io',  cost: 400  },
  { name: 'OpenAI/ChatGPT', domain: 'openai.com',   cost: 200  },
]

const HEADCOUNT_COST = 4000
const TOTAL = TOOLS_BILL.reduce((s, t) => s + t.cost, 0) + HEADCOUNT_COST

function fmt(n: number) { return '$' + Math.round(n).toLocaleString() }

/* ─── Animation data ─────────────────────────────────────────────────────── */
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
const DURATION = 15000

/* ─── Main ──────────────────────────────────────────────────────────────── */
export function FrankenstackAnimation() {
  const [progress, setProgress] = useState(0)
  const [isDark,   setIsDark]   = useState(false)

  useEffect(() => {
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
      if (p < 1) rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          playing = true
          rafId = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 }
    )

    const el = document.getElementById('frankenstack-animation')
    if (el) observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Act 1 — Tool-hopping: 0 → 0.40 ── */
  const HOP_N   = HOP_STEPS.length
  const hopSlot = clamp(progress / 0.40) * HOP_N
  const showHop = progress <= 0.44

  function hopCardOpacity(i: number) {
    if (!showHop || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 0
    const frac    = hopSlot - Math.floor(hopSlot)
    const fadeIn  = (i === 0 && progress < 0.001) ? 1 : mapRange(frac, 0, 0.2, 0, 1)
    const fadeOut = i < HOP_N - 1 ? mapRange(frac, 0.75, 1.0, 1, 0) : 1
    return fadeIn * fadeOut
  }
  function hopCardScale(i: number) {
    if (!showHop || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 0.88
    return mapRange(hopSlot - Math.floor(hopSlot), 0, 0.2, 0.88, 1)
  }
  function hopCardY(i: number) {
    if (!showHop || i !== Math.min(Math.floor(hopSlot), HOP_N - 1)) return 16
    return mapRange(hopSlot - Math.floor(hopSlot), 0, 0.2, 16, 0)
  }

  /* ── Act 2 — One platform reveal: 0.44 → 0.74 ── */
  const act2FadeOut    = mapRange(progress, 0.72, 0.78, 1, 0)
  const act2Base       = mapRange(progress, 0.44, 0.48, 0, 1) * act2FadeOut
  const textOpacity    = mapRange(progress, 0.44, 0.54, 0, 1)
  const textBlur       = mapRange(progress, 0.44, 0.52, 8, 0)
  const arrowOpacity   = mapRange(progress, 0.52, 0.60, 0, 1)
  const arrowY         = mapRange(progress, 0.52, 0.60, 14, 0)
  const markOpacity    = mapRange(progress, 0.58, 0.68, 0, 1)

  /* ── Act 3 — Receipt with counting numbers: 0.78 → 1.0 ── */
  const receiptOpacity = mapRange(progress, 0.78, 0.88, 0, 1)
  const receiptY       = mapRange(progress, 0.78, 0.88, 40, 0)
  // Numbers count up across 0.84 → 0.96
  const countT         = clamp((progress - 0.84) / (0.96 - 0.84))
  // Circle draws in 0.96 → 1.0
  const circleT        = clamp((progress - 0.96) / (1.0 - 0.96))

  return (
    <section className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

        {/* Left — animation panel */}
        <div className="w-full lg:w-1/2 order-1">
          <div
            id="frankenstack-animation"
            className="relative overflow-visible h-[300px] sm:h-[380px] md:h-[440px]"
          >

            {/* Act 1 — Tool-hopping cards */}
            {showHop && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {HOP_STEPS.map((step, i) => (
                  <div
                    key={step.name}
                    className="absolute flex flex-col items-center gap-4 text-center"
                    style={{
                      opacity: hopCardOpacity(i),
                      transform: `scale(${hopCardScale(i)}) translateY(${hopCardY(i)}px)`,
                      willChange: 'opacity, transform',
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                      Step {i + 1} of {HOP_N}
                    </p>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 shadow-lg">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${step.domain}&sz=64`}
                          alt={step.name}
                          width={28}
                          height={28}
                          className="w-7 h-7 object-contain"
                        />
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

            {/* Act 3 — Receipt with counting numbers */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none"
              style={{
                opacity: receiptOpacity,
                transform: `translateY(${receiptY}px)`,
                willChange: 'opacity, transform',
              }}
            >
              <div
                className="w-full max-w-[280px] sm:max-w-sm"
                style={{
                  filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.18)) drop-shadow(0 1px 4px rgba(0,0,0,0.10))',
                  transform: 'rotate(2.5deg)',
                }}
              >
                <div
                  className="bg-[#fdf6e3] px-5 py-7 font-mono text-[12px] text-[#1a1a0a]"
                  style={{
                    backgroundImage: [
                      'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.035) 31px, rgba(0,0,0,0.035) 32px)',
                      'radial-gradient(ellipse at 30% 20%, rgba(180,140,60,0.06) 0%, transparent 60%)',
                      'radial-gradient(ellipse at 90% 90%, rgba(0,0,0,0.04) 0%, transparent 50%)',
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
                  <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#888877] mb-2">
                    <span>Tool</span>
                    <span>Monthly</span>
                  </div>
                  <div className="border-t border-dashed border-[#c8c8a0] my-3" />

                  <div className="flex flex-col gap-3">
                    {TOOLS_BILL.map((t) => (
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
                          <span className="truncate text-[11px]">{t.name}</span>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold tabular-nums">
                          {fmt(t.cost * countT)}/mo
                        </span>
                      </div>
                    ))}

                    <div className="flex flex-col items-center my-1">
                      <div className="w-full border-t border-dashed border-amber-400/60" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-[#fdf6e3] px-2 -mt-[9px]">
                        * HEADCOUNT TAX *
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-[#555544]">
                          <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        <span className="truncate text-[11px]">GTM Engineer / Ops</span>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold tabular-nums">
                        {fmt(HEADCOUNT_COST * countT)}/mo
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-[#c8c8a0] my-3" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-black uppercase tracking-widest">Total / mo</span>
                    <span className="text-[13px] font-black tabular-nums">{fmt(TOTAL * countT)}</span>
                  </div>

                  {/* Yearly total with pencil oval */}
                  <div className="relative flex justify-between items-baseline mt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Total / yr</span>
                    <span className="text-[18px] font-black tabular-nums text-red-600">
                      {fmt(TOTAL * 12 * countT)}
                    </span>
                    <svg
                      className="absolute overflow-visible pointer-events-none"
                      style={{ inset: '-8px -10px', width: 'calc(100% + 20px)', height: 'calc(100% + 16px)', opacity: circleT > 0 ? 1 : 0 }}
                    >
                      <defs>
                        <filter id="pencil-rough" x="-10%" y="-30%" width="120%" height="160%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" seed="2" result="noise"/>
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
                        </filter>
                      </defs>
                      <ellipse
                        cx="50%"
                        cy="50%"
                        rx="52%"
                        ry="60%"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        pathLength="1"
                        strokeDasharray="1.07"
                        strokeDashoffset={1.07 - 1.07 * circleT}
                        transform="rotate(-15, 50%, 50%)"
                        filter="url(#pencil-rough)"
                      />
                    </svg>
                  </div>

                  <div className="border-t border-dashed border-[#c8c8a0] my-3" />

                  <div className="text-center text-[9px] text-[#888877] tracking-wide leading-relaxed">
                    Replace all of them with Pristine.<br />One agent, one price.
                  </div>
                </div>
              </div>
            </div>

            {/* Act 2 — One platform reveal */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10 pointer-events-none select-none"
              style={{ opacity: act2Base, willChange: 'opacity' }}
            >
              <div
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${mapRange(textOpacity, 0, 1, 10, 0)}px)`,
                  filter: textBlur > 0 ? `blur(${textBlur}px)` : undefined,
                  willChange: 'opacity, transform, filter',
                }}
                className="flex items-center gap-3"
              >
                {HOP_STEPS.map((tool) => (
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

              <div
                style={{ opacity: arrowOpacity, transform: `translateY(${arrowY}px)`, willChange: 'opacity, transform' }}
                className="flex flex-col items-center gap-1"
              >
                <svg width="1" height="28" viewBox="0 0 1 28" fill="none" className="opacity-25 dark:opacity-20">
                  <line x1="0.5" y1="0" x2="0.5" y2="28" stroke="currentColor" strokeWidth="1" className="text-slate-400 dark:text-slate-500" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 dark:text-slate-500 opacity-40">
                  <path d="M8 3v10M3.5 9l4.5 4.5L12.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div
                style={{ opacity: markOpacity, willChange: 'opacity' }}
                className="flex flex-col items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={isDark ? '/assets/Pristine Data AI Logo.svg' : '/assets/Pristine Data Footer Logo.svg'}
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
            What is your GTM stack really costing you?
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-slate-950 dark:text-white mb-6 leading-tight">
            Tools may look separate. The bill is not.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Most teams pay for data enrichment, sequencing, AI writing, and GTM engineering work to hold it all together. Pristine gets it done from one seat.
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

      </div>
    </section>
  )
}
