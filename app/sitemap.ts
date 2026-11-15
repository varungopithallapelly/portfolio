import type { MetadataRoute } from 'next'
import { projects } from '@/lib/data'

const base = 'https://varunthallapelly.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(p => ({ url: `${base}${p.href}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.7 })),
  ]
}
