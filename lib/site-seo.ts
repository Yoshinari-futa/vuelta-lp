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

/** 店舗 Instagram（JSON-LD・フッターと共通の固定URL） */
export const INSTAGRAM_BAR_URL = 'https://www.instagram.com/vuelta_bar' as const

/**
 * Google ビジネスプロフィールの公開URL（管理画面の「共有」やマップの店舗ページURL）。
 * 未設定時はフッターは `footerGoogleHref()` が住所のマップ検索にフォールバック。
 */
export const GOOGLE_BUSINESS_PROFILE_URL = (
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ?? ''
).trim()

/**
 * TripAdvisor の店舗ページURL。
 * 未設定時はフッターは `footerTripAdvisorHref()` が店名検索にフォールバック。
 */
export const TRIPADVISOR_LISTING_URL = (
  process.env.NEXT_PUBLIC_TRIPADVISOR_URL ?? ''
).trim()

/** フッター「Google」: ビジネスURL優先、なければ住所の Google マップ検索 */
export function footerGoogleHref(): string {
  return GOOGLE_BUSINESS_PROFILE_URL || MAPS_SEARCH_URL
}

const TRIPADVISOR_SEARCH_FALLBACK =
  'https://www.tripadvisor.com/Search?q=' +
  encodeURIComponent('VUELTA Hiroshima')

/** フッター「TripAdvisor」: 店舗URL優先、なければ検索（店舗ページURLが分かったら env で差し替え） */
export function footerTripAdvisorHref(): string {
  return TRIPADVISOR_LISTING_URL || TRIPADVISOR_SEARCH_FALLBACK
}

export function isGoogleBusinessProfileConfigured(): boolean {
  return Boolean(GOOGLE_BUSINESS_PROFILE_URL)
}

/** BarOrPub の JSON-LD `sameAs` 用（Instagram + 任意で上記2件） */
export function barSameAsUrls(): string[] {
  const urls: string[] = [INSTAGRAM_BAR_URL]
  if (GOOGLE_BUSINESS_PROFILE_URL) urls.push(GOOGLE_BUSINESS_PROFILE_URL)
  if (TRIPADVISOR_LISTING_URL) urls.push(TRIPADVISOR_LISTING_URL)
  return urls
}

export function barStructuredDataUrl(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja` : SITE_ORIGIN
}

export function barStructuredDataId(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja#bar` : `${SITE_ORIGIN}/#bar`
}
