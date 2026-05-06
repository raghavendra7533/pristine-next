'use client'

import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'

function FaqItem({ faq, isOpen, onToggle, index }: {
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full flex justify-between items-center py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-slate-800 dark:text-white">
          {faq.q}
        </span>
        <Icon
          icon={isOpen ? 'solar:minus-circle-linear' : 'solar:add-circle-linear'}
          width={20}
          className="flex-shrink-0 text-slate-400 dark:text-slate-500"
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        style={{ height, opacity: isOpen ? 1 : 0, overflow: 'hidden', transition: 'height 300ms ease, opacity 300ms ease' }}
      >
        <div ref={contentRef}>
          <p className="pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

const FAQS = [
  {
    q: 'How is this different from Apollo or ZoomInfo?',
    a: 'Pristine replaces them, not integrates with them. One login, one bill, one workflow. No CSV exports, no tool-hopping, no Clay tables gluing it together.',
  },
  {
    q: 'Is the data actually verified, or just aggregated?',
    a: "Real-time SMTP pings on every contact before export. 90% deliverability, not a batch-refreshed promise. If it bounces, you don't see it.",
  },
  {
    q: 'Do I need an ops engineer or RevOps person to run this?',
    a: "No. The whole point. Type what you want in plain English, get a verified list, write sequences from the same screen. No spreadsheets, no API keys, no ops dependency.",
  },
  {
    q: 'Can I import my existing sequences or contacts?',
    a: "Yes. We support imports from Apollo, ZoomInfo exports, and CSV. Our team helps with migration (included).",
  },
  {
    q: 'How does pricing work?',
    a: "All-in-one pricing: no per-credit surprises, no seat tax for every tool in your stack. Contact us for a custom quote based on your team size.",
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mb-12 text-center">
          Questions we get a lot
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
