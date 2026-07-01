import type { MetadataRoute } from 'next'

/**
 * AI 検索・回答系クローラーを明示的に許可する（AI Overview / ChatGPT / Claude / Perplexity 等）。
 * ワイルドカードで既に許可されているが、Google-Extended・Applebot-Extended のように
 * 「AI 学習・回答での利用可否」を専用 UA で判断するものへ意図を明示する。
 */
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
      },
    ],
    sitemap: 'https://www.vuelta.jp/sitemap.xml',
  }
}
