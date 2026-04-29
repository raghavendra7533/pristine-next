'use client'
import { useEffect, useRef, useState } from 'react'

/* ─── Data ─────────────────────────────────────────────────────────────── */
const TOOLS = [
  { name: 'ZoomInfo',    domain: 'zoominfo.com'   },
  { name: 'Apollo',      domain: 'apollo.io'       },
  { name: 'Clay',        domain: 'clay.com'        },
  { name: 'Smartlead',   domain: 'smartlead.ai'    },
  { name: 'Amplemarket', domain: 'amplemarket.com' },
  { name: 'Outreach',    domain: 'outreach.io'     },
  { name: 'Salesloft',   domain: 'salesloft.com'   },
  { name: 'Lusha',       domain: 'lusha.com'       },
  { name: 'Hunter',      domain: 'hunter.io'       },
  { name: 'Clearbit',    domain: 'clearbit.com'    },
  { name: 'Instantly',   domain: 'instantly.ai'    },
  { name: 'Lemlist',     domain: 'lemlist.com'     },
]

const BILL_ITEMS = [
  { name: 'ZoomInfo',    domain: 'zoominfo.com',   price: 1250 },
  { name: 'Apollo',      domain: 'apollo.io',       price: 399  },
  { name: 'Clay',        domain: 'clay.com',        price: 299  },
  { name: 'Amplemarket', domain: 'amplemarket.com', price: 800  },
  { name: 'Outreach',    domain: 'outreach.io',     price: 400  },
  { name: 'Smartlead',   domain: 'smartlead.ai',    price: 94   },
]
const BILL_TOTAL = BILL_ITEMS.reduce((s, i) => s + i.price, 0) // 3242

// Straight horizontal cut at 50%
const CUT_Y   = 50
const topClip = `polygon(0% 0%, 100% 0%, 100% ${CUT_Y}%, 0% ${CUT_Y}%)`
const botClip = `polygon(0% ${CUT_Y}%, 100% ${CUT_Y}%, 100% 100%, 0% 100%)`

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)) }
function mapRange(v: number, a: number, b: number, c: number, d: number) {
  return c + (d - c) * clamp((v - a) / (b - a))
}

/* ─── Logo card (competitor grid) ──────────────────────────────────────── */
function LogoCard({ name, domain, opacity, blur, scale, ty }: {
  name: string; domain: string; opacity: number; blur: number; scale: number; ty: number
}) {
  return (
    <div
      style={{ opacity, transform: `scale(${scale}) translateY(${ty}px)`, filter: blur > 0 ? `blur(${blur}px)` : undefined, willChange: 'opacity, transform, filter' }}
      className="flex flex-col items-center gap-3 select-none"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt={name} width={36} height={36} className="w-9 h-9 object-contain" />
      </div>
      <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium tracking-wide">{name}</span>
    </div>
  )
}

/* ─── Invoice / bill visual ─────────────────────────────────────────────── */
function BillFace({ counter }: { counter: number }) {
  return (
    <div className="w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden select-none" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Header */}
      <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-white text-xs font-bold tracking-widest uppercase">Monthly Invoice</p>
          <p className="text-slate-400 text-[10px] mt-0.5">GTM Stack — April 2025</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
        </div>
      </div>

      {/* Line items */}
      <div className="px-5 py-3 flex flex-col gap-1">
        {BILL_ITEMS.map((item) => (
          <div key={item.name} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=32`} alt={item.name} width={14} height={14} className="w-3.5 h-3.5 object-contain" />
              </div>
              <span className="text-slate-600 text-xs font-medium">{item.name}</span>
            </div>
            <span className="text-slate-700 text-xs font-semibold tabular-nums">${item.price.toLocaleString()}/mo</span>
          </div>
        ))}
      </div>

      {/* Divider + total */}
      <div className="mx-5 border-t-2 border-dashed border-slate-200" />
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold">Monthly Waste</p>
          <p className="text-slate-300 text-[9px] mt-0.5">${(BILL_TOTAL * 12).toLocaleString()}/yr</p>
        </div>
        <span
          className="font-black tabular-nums"
          style={{ fontSize: '1.6rem', color: '#ef4444', letterSpacing: '-0.04em' }}
        >
          ${counter.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

/* ─── Easing ────────────────────────────────────────────────────────────── */
const BILL_H = 440

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
function easeInQuart(t: number) { return t * t * t * t }

/* ─── Scissors emoji ────────────────────────────────────────────────────── */
function ScissorIcon({ openAngle }: { openAngle: number }) {
  return (
    <div
      style={{
        fontSize: 32,
        lineHeight: 1,
        transform: `rotate(${-90 + openAngle * 0.4}deg)`,
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
        userSelect: 'none',
      }}
    >
      ✂️
    </div>
  )
}

/* ─── Bill with scissors cut ─────────────────────────────────────────────── */
function ScissorsCut({ counter, tearProgress }: { counter: number; tearProgress: number }) {
  // Phase 1 (0 → 0.74): scissors travel left → right with eased movement
  const rawX      = clamp(tearProgress / 0.74)
  const scissorsX = easeInOutCubic(rawX)                          // smooth acceleration / deceleration

  // 4 deliberate snips — opens fully between each snip, closes as blades meet
  const openAngle = 16 * Math.max(0, Math.sin(scissorsX * Math.PI * 4))

  // Gentle vertical wobble — scissors naturally drift slightly up/down while cutting
  const wobbleY   = Math.sin(scissorsX * Math.PI * 9) * 2

  // Phase 2 (0.74 → 1.0): bottom half falls with gravity
  const fallT     = clamp((tearProgress - 0.74) / 0.26)
  const fallP     = easeInQuart(fallT)                            // accelerates like gravity
  const botTY     = fallP * 280
  const botRot    = fallP * 14                                    // rotates as it falls
  const botTX     = fallP * 20                                    // slight horizontal drift
  const botOpacity = Math.pow(1 - fallT, 1.5)                    // opacity holds longer then drops

  // Top half: upward spring + fade together with bottom
  const topTY      = -easeInOutCubic(fallT) * 22
  const topOpacity = Math.pow(1 - fallT, 1.2)

  // Scissors exit: show until fully offscreen
  const showScissors = rawX < 1

  return (
    <div className="relative w-80" style={{ height: BILL_H, overflow: 'visible' }}>

      {/* ── Top half ── */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: topClip,
          transform: `translateY(${topTY}px)`,
          opacity: topOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <div style={{ height: BILL_H }}><BillFace counter={counter} /></div>
      </div>

      {/* ── Bottom half ── */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: botClip,
          transform: `translate(${botTX}px, ${botTY}px) rotate(${botRot}deg)`,
          transformOrigin: '50% 0%',
          opacity: botOpacity,
          willChange: 'transform, opacity',
          filter: fallP > 0.04
            ? `drop-shadow(0 ${fallP * 24}px ${fallP * 48}px rgba(0,0,0,0.15))`
            : undefined,
        }}
      >
        <div style={{ height: BILL_H }}><BillFace counter={counter} /></div>
      </div>

      {/* ── Cut trail line ── */}
      {showScissors && (
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ top: `${CUT_Y}%`, transform: 'translateY(-0.5px)', height: 2 }}
        >
          {/* Red cut line behind scissors */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${scissorsX * 100}%`,
              background: 'linear-gradient(90deg, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0.9) 100%)',
              borderRadius: 1,
            }}
          />
          {/* Glow at cutting point */}
          <div
            style={{
              position: 'absolute', top: -2, bottom: -2,
              left: `calc(${scissorsX * 100}% - 6px)`,
              width: 12, borderRadius: 6,
              background: 'rgba(239,68,68,0.7)',
              boxShadow: '0 0 8px 3px rgba(239,68,68,0.5)',
            }}
          />
        </div>
      )}

      {/* ── Scissors icon — pivot tip tracks the cut point ── */}
      {showScissors && (
        <div
          className="absolute pointer-events-none"
          style={{
            // Pivot of the SVG is at x=24, y=22 — align that to cut line
            left:  `calc(${scissorsX * 100}% - 24px)`,
            top:   `calc(${CUT_Y}%   - 22px + ${wobbleY}px)`,
            willChange: 'left, top',
          }}
        >
          <ScissorIcon openAngle={openAngle} />
        </div>
      )}
    </div>
  )
}

/* ─── Main ─────────────────────────────────────────────────────────────── */
export function WorkflowComparison() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])

  const dark = mounted && isDark

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total = el.offsetHeight - window.innerHeight
      const p = clamp(scrolled / total)
      setProgress(p)
      window.dispatchEvent(new CustomEvent('pristine:cinematic', { detail: { active: p > 0 && p < 1 } }))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.dispatchEvent(new CustomEvent('pristine:cinematic', { detail: { active: false } }))
    }
  }, [])

  /* ── Derived animation values ── */

  // Act 1: logos visible at start, hold through 0.14, fade out 0.14→0.26
  const logosBase = progress < 0.14 ? 1 : mapRange(progress, 0.14, 0.26, 1, 0)
  const logosBlur = mapRange(progress, 0.14, 0.26, 0, 20)
  function logoOpacity(_i: number) { return logosBase }

  // Act 2: bill slides in 0.26→0.36, counter runs 0.28→0.46
  const billOpacity  = mapRange(progress, 0.26, 0.36, 0, 1)
  const billSlideY   = mapRange(progress, 0.26, 0.36, 60, 0)
  const counterValue = Math.round(mapRange(progress, 0.28, 0.46, 0, BILL_TOTAL))

  // Act 3: scissors cut 0.46→0.68
  const tearProgress = mapRange(progress, 0.46, 0.68, 0, 1)

  // Bill visible only when not fully cut away
  const showBill = progress > 0.26 && progress < 0.70

  // Act 4: reveal text 0.68→0.82
  const textOpacity = mapRange(progress, 0.68, 0.82, 0, 1)
  const textScale   = mapRange(progress, 0.68, 0.82, 0.88, 1)
  const textBlur    = mapRange(progress, 0.68, 0.80, 10, 0)
  const subOpacity  = mapRange(progress, 0.76, 0.90, 0, 1)
  const subY        = mapRange(progress, 0.76, 0.90, 18, 0)
  const markOpacity = mapRange(progress, 0.82, 0.94, 0, 1)

  return (
    <div ref={wrapperRef} style={{ height: '380vh' }}>
      <div className="sticky top-0 flex items-center justify-center bg-white dark:bg-slate-950" style={{ height: '100vh', overflow: 'clip' }}>

        {/* ── Act 1: competitor logos ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 pointer-events-none">

          {/* Header text — fades with logos */}
          <div
            className="text-center px-6"
            style={{
              opacity: logosBase,
              transform: `translateY(${(1 - logosBase) * -16}px)`,
              willChange: 'opacity, transform',
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">
              Sound familiar?
            </p>
            <h3
              className="font-bold tracking-tight text-slate-800 dark:text-white"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
            >
              If your GTM stack looks like this,
            </h3>
            <p className="text-slate-400 dark:text-slate-500 font-medium mt-1" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>
              you&apos;re paying for six tools to do one job.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-x-10 gap-y-12 px-8 md:grid-cols-6 md:gap-x-14">
            {TOOLS.map((tool, i) => (
              <LogoCard
                key={tool.name}
                {...tool}
                opacity={logoOpacity(i)}
                blur={logosBlur}
                scale={1 - logosBlur * 0.004}
                ty={logosBlur * 0.5}
              />
            ))}
          </div>
        </div>

        {/* Radial vignette — covers logos as bill appears, adapts to theme */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 55% 55% at 50% 50%, transparent 0%, ${dark ? `rgba(2,6,23,${mapRange(progress, 0.32, 0.55, 0.0, 0.98)})` : `rgba(255,255,255,${mapRange(progress, 0.32, 0.55, 0.0, 0.98)})`} 100%)` }}
        />

        {/* ── Act 2 + 3: bill with ticker, then torn ── */}
        {showBill && (
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              opacity: billOpacity,
              transform: `translateY(${billSlideY}px)`,
              willChange: 'opacity, transform',
            }}
          >
            {tearProgress > 0.01
              ? <ScissorsCut counter={BILL_TOTAL} tearProgress={tearProgress} />
              : <BillFace counter={counterValue} />
            }
          </div>
        )}

        {/* ── Act 4: reveal text ── */}
        <div className="relative z-10 text-center px-6 pointer-events-none flex flex-col items-center gap-5">
          <div
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
              filter: textBlur > 0 ? `blur(${textBlur}px)` : undefined,
              willChange: 'opacity, transform, filter',
            }}
          >
            {dark ? (
              <h2
                className="font-bold tracking-tighter leading-tight text-white text-center pb-2"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                One platform.{' '}
                <span style={{ background: 'linear-gradient(90deg, #818cf8, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Replaces them all.
                </span>
              </h2>
            ) : (
              <h2
                className="font-bold tracking-tighter leading-tight text-center pb-2"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                  background: 'linear-gradient(90deg, #0f172a 35%, #6366f1 68%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                One platform. Replaces them all.
              </h2>
            )}
          </div>

          <p
            className="text-slate-500 dark:text-slate-400 font-medium max-w-md leading-relaxed"
            style={{
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
              willChange: 'opacity, transform',
            }}
          >
            Stop paying for ZoomInfo, Clay, Amplemarket, and Smartlead separately.
          </p>

          <div style={{ opacity: markOpacity, willChange: 'opacity' }} className="mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dark ? '/assets/Pristine Data AI Logo.svg' : '/assets/Pristine Data Footer Logo.svg'}
              alt="Pristine Data AI"
              className="h-8 opacity-60"
            />
          </div>

          {/* CTA */}
          <div
            style={{ opacity: markOpacity, transform: `translateY(${(1 - markOpacity) * 12}px)`, willChange: 'opacity, transform' }}
            className="flex flex-col items-center gap-3 mt-2"
          >
            <a
              href="/stack-audit"
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              Get your free GTM stack audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-slate-400 dark:text-slate-600 text-[11px]">Free · No credit card · Takes 2 minutes</p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: mapRange(progress, 0, 0.06, 1, 0) }}
        >
          <span className="text-slate-400 dark:text-slate-600 text-[11px] uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent" />
        </div>
      </div>
    </div>
  )
}
