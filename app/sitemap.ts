import type { MetadataRoute } from 'next'

/** 公開ドメイン（www）。サイトマップ用URLは GSC / ドメイン設定と揃える */
const SITE_WWW = 'https://www.vuelta.jp'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_WWW}/`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_WWW}/ja`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_WWW}/menu`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_WWW}/access`,
      lastModified: new Date('2026-04-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_WWW}/ja/access`,
      lastModified: new Date('2026-04-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_WWW}/subscription`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_WWW}/ja/subscription`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_WWW}/recruit`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_WWW}/tokushoho`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
