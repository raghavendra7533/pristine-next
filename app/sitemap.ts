import { MetadataRoute } from 'next'
import { blogs } from '@/lib/blogs'

export const dynamic = 'force-static'

const BASE = 'https://pristinedata.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                                    changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about-us`,                            changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact-us`,                          changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/integrations`,                        changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/stack-audit`,                         changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/results`,                             changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,                                changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/methodology`,                         changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/compare/pristine-vs-clay`,            changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-zoominfo`,        changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-apollo`,          changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/pristine-vs-amplemarket`,     changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/privacy`,                             changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,                               changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
