/**
 * 公式サイトのドメイン・住所系SEOの単一ソース。
 * 英語/日本語の JSON-LD で値を重複させない（vuelta-bar.com 等の混入防止）。
 */
export const SITE_ORIGIN = 'https://vuelta.jp' as const

/** 郵便番号 */
export const POSTAL_CODE = '730-0051' as const

/** 表記用（県名〜建物番号まで） */
export const STORE_ADDRESS_JA_LINE =
  '広島県広島市中区大手町3-3-5 掛江ビル201' as const

const ADDRESS_FOR_MAPS = `${POSTAL_CODE} ${STORE_ADDRESS_JA_LINE}` as const

/** Google マップ「ここへ行く」検索用 */
export const MAPS_SEARCH_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_FOR_MAPS)}` as const

/** 埋め込み地図 iframe 用 */
export const MAPS_EMBED_URL =
  `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FOR_MAPS)}&hl=ja&z=17&output=embed` as const

export const BAR_LOGO_IMAGE_URL = `${SITE_ORIGIN}/images/vuelta-logo.png` as const

export function barStructuredDataUrl(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja` : SITE_ORIGIN
}

export function barStructuredDataId(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja#bar` : `${SITE_ORIGIN}/#bar`
}
