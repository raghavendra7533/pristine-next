const LOGOS: { name: string; domain?: string; localLogo?: string }[] = [
  { name: 'SingleGrain',      domain: 'singlegrain.com'    },
  { name: 'Maveriq',          domain: 'maveriq.ch'         },
  { name: 'Frontline',        domain: 'frontlineinc.com'   },
  { name: 'Aquila Cloud',     domain: 'aquilaclouds.com'   },
  { name: 'Nexla',            domain: 'nexla.com'          },
  { name: 'Lister Ventures',  domain: 'listerventures.com' },
  { name: 'Dezign Pro',       domain: 'dezign.pro'         },
  { name: 'Hydrolec',         localLogo: '/logos/hydrolec.png' },
]

export function LogoBar() {
  return (
    <div className="border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
          Trusted by
        </span>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {LOGOS.map(({ name, domain, localLogo }) => (
            <div
              key={name}
              className="flex items-center gap-2 whitespace-nowrap border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 bg-slate-50 dark:bg-slate-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={localLogo ?? `https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                alt={name}
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
