import type { MetadataRoute } from 'next'

/** 公開ドメイン（www）。サイトマップ用URLは GSC / ドメイン設定と揃える */
const SITE_WWW = 'https://www.vuelta.jp'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: `${SITE_WWW}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_WWW}/ja`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
