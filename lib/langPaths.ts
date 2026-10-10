/** 英語URL ↔ 日本語URL の対になっているページ（言語切替で対応ページへ移る） */
export const PAIRED_PATHS: Record<string, string> = {
  '/subscription': '/ja/subscription',
  '/faq': '/ja/faq',
  '/contact': '/ja/contact',
}

/** 日本語の対応ページ。対が無ければ日本語トップ */
export const toJa = (path: string) => PAIRED_PATHS[path] ?? '/ja'

/** 英語の対応ページ。対が無ければ英語トップ */
export const toEn = (path: string) =>
  Object.keys(PAIRED_PATHS).find((en) => PAIRED_PATHS[en] === path) ?? '/'
