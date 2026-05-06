'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const peoplePhrases = [
  'Find CMOs at Series A companies with $10M+ ARR...',
  'Search for VPs of Sales in London...',
  'Find React Engineers with 5+ years experience...',
  'Show me Founders who recently raised funds...',
  'Find Marketing Directors using HubSpot...',
]

const companyPhrases = [
  'Show me SaaS startups in San Francisco...',
  'List e-commerce brands using Shopify Plus...',
  'Find B2B fintech companies with $50M+ funding...',
  'Show me companies hiring for Enterprise Sales...',
  'List healthcare companies in New York...',
]

export default function SearchPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'people' | 'company'>('people')
  const [placeholder, setPlaceholder] = useState('')
  const queryRef = useRef<HTMLTextAreaElement>(null)
  const phraseIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const phrases = tab === 'people' ? peoplePhrases : companyPhrases
    phraseIdx.current = 0
    charIdx.current = 0
    deleting.current = false
    setPlaceholder('')

    function loop() {
      const phrase = phrases[phraseIdx.current]
      if (!deleting.current) {
        charIdx.current++
        setPlaceholder(phrase.slice(0, charIdx.current))
        if (charIdx.current === phrase.length) {
          deleting.current = true
          timeoutId.current = setTimeout(loop, 1800)
          return
        }
      } else {
        charIdx.current--
        setPlaceholder(phrase.slice(0, charIdx.current))
        if (charIdx.current === 0) {
          deleting.current = false
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length
        }
      }
      timeoutId.current = setTimeout(loop, deleting.current ? 40 : 60)
    }

    timeoutId.current = setTimeout(loop, 400)
    return () => { if (timeoutId.current) clearTimeout(timeoutId.current) }
  }, [tab])

  function handleSearch() {
    const q = queryRef.current?.value.trim() || placeholder
    const params = new URLSearchParams({ query: q, type: tab })
    router.push(`/results?${params.toString()}`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24">

        <div className="w-full max-w-2xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
              700M+ verified contacts
            </p>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Search in plain English
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400">
              Describe who you're looking for. Pristine finds them.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700 ring-4 ring-slate-50/50 dark:ring-slate-800/20">
            <div className="flex flex-col">
              <div className="pt-5 px-5 pb-3">
                <div className="relative flex items-start gap-3">
                  <div className="mt-1 text-slate-400 dark:text-slate-500">
                    <Icon icon="solar:magic-stick-3-linear" width={20} />
                  </div>
                  <textarea
                    ref={queryRef}
                    autoFocus
                    className="placeholder:text-slate-400 dark:placeholder:text-slate-600 border-none resize-none leading-relaxed text-lg font-medium text-slate-600 dark:text-slate-200 bg-transparent w-full p-0 focus:outline-none"
                    rows={3}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSearch()
                      }
                    }}
                  />
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 p-0.5 bg-slate-100/80 dark:bg-slate-800 rounded-lg self-start sm:self-center">
                  {(['people', 'company'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        tab === t
                          ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Icon icon={t === 'people' ? 'solar:user-circle-linear' : 'solar:buildings-2-linear'} width={14} />
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleSearch}
                  className="sm:w-auto hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 transition-all hover:translate-y-px flex gap-2 text-sm font-semibold text-white bg-slate-900 w-full rounded-lg py-2.5 px-6 shadow-lg items-center justify-center"
                >
                  Search
                  <Icon icon="solar:arrow-right-linear" width={14} />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-600">
            Press Enter to search · Shift+Enter for new line
          </p>
        </div>

      </main>
      <Footer />
    </>
  )
}
