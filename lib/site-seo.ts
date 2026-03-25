/**
 * 公式サイトのドメイン・住所系SEOの単一ソース。
 * 英語/日本語の JSON-LD で値を重複させない（vuelta-bar.com 等の混入防止）。
 */
export const SITE_ORIGIN = 'https://vuelta.jp' as const

/** 広島市大手町エリア（Google マップと一致） */
export const POSTAL_CODE = '733-0051' as const

export const BAR_LOGO_IMAGE_URL = `${SITE_ORIGIN}/images/vuelta-logo.png` as const

export function barStructuredDataUrl(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja` : SITE_ORIGIN
}

export function barStructuredDataId(locale: 'en' | 'ja'): string {
  return locale === 'ja' ? `${SITE_ORIGIN}/ja#bar` : `${SITE_ORIGIN}/#bar`
}
