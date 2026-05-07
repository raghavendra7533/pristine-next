// After deploying, submit https://pristinedata.ai/sitemap.xml to:
// - Google Search Console: https://search.google.com/search-console
// - Bing Webmaster Tools: https://www.bing.com/webmasters

import { MetadataRoute } from 'next'
import { blogs } from '@/lib/blogs'

export const dynamic = 'force-static'

const BASE = 'https://pristinedata.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                                    changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about-us`,                            changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact-us`,                          changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/integrations`,                        changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/stack-audit`,                         changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/results`,                             changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`,                                changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/methodology`,                         changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/compare/pristine-vs-clay`,            changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-zoominfo`,        changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-apollo`,          changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-amplemarket`,     changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/privacy`,                             changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/terms`,                               changeFrequency: 'monthly', priority: 0.6 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
