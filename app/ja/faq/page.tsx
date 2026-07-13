import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_ORIGIN, RESERVATION_URL } from '@/lib/site-seo'
import { faqsByCategory, faqEntries } from '@/lib/faqData'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

// ── SEO Metadata ──────────────────────────
export const metadata: Metadata = {
  title: 'よくある質問 — Bar VUELTA | 広島のクラフトカクテルバー',
  description:
    '広島市中区大手町のクラフトカクテルバー Bar VUELTAのよくある質問。営業時間、予約、看板カクテル、チャージ、支払い方法、中電前からのアクセス、深夜営業、日曜月曜の営業までまとめてお答えします。',
  keywords:
    'Bar VUELTA よくある質問, ブエルタ 広島, 広島 バー 深夜, 広島 バー 日曜, 広島 カクテルバー, 中電前 バー, 平和記念公園 バー',
  alternates: {
    canonical: `${SITE_ORIGIN}/ja/faq`,
    languages: {
      en: `${SITE_ORIGIN}/faq`,
      ja: `${SITE_ORIGIN}/ja/faq`,
      'x-default': `${SITE_ORIGIN}/faq`,
    },
  },
  openGraph: {
    title: 'よくある質問 — Bar VUELTA 広島のクラフトカクテルバー',
    description:
      '営業時間、予約、看板カクテル、チャージ、支払い方法、アクセス。Bar VUELTAへのご質問にまとめてお答えします。',
    url: `${SITE_ORIGIN}/ja/faq`,
    siteName: 'Bar VUELTA',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'Bar VUELTA — 広島のクラフトカクテルバー',
      },
    ],
  },
}

// ── Structured Data (JSON-LD) ─────────────
function FaqJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/ja/faq#faq`,
    url: `${SITE_ORIGIN}/ja/faq`,
    inLanguage: 'ja',
    about: {
      '@type': 'BarOrPub',
      '@id': `${SITE_ORIGIN}/ja#bar`,
      name: 'Bar VUELTA',
    },
    mainEntity: faqEntries.map((f) => ({
      '@type': 'Question',
      name: f.ja.q,
      url: `${SITE_ORIGIN}/ja/faq#${f.id}`,
      acceptedAnswer: { '@type': 'Answer', text: f.ja.a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/ja` },
      { '@type': 'ListItem', position: 2, name: 'よくある質問', item: `${SITE_ORIGIN}/ja/faq` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function FaqPageJa() {
  const groups = faqsByCategory()
  return (
    <>
      <FaqJsonLd />
      <BreadcrumbJsonLd />

      <SiteHeader lang="ja" />
      <a href="#main-content" className="skip-link">
        よくある質問へ移動
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-vuelta-text outline-none">
        {/* Hero */}
        <header className="pt-24 pb-10 md:pt-32 md:pb-14 px-4 sm:px-6 text-center">
          <Link
            href="/ja"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← Bar VUELTA
          </Link>
          <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            FAQ
          </h1>
          <p className="font-japanese text-vuelta-gold text-base sm:text-lg tracking-wider mt-3">
            よくある質問
          </p>
          <p className="font-japanese text-vuelta-text-light text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Bar VUELTAは広島市中区大手町のクラフトカクテルバー。路面電車「中電前」から徒歩1分、
            18:00から深夜2:00まで営業（木曜定休）です。
          </p>
        </header>

        {/* Category index */}
        <nav aria-label="質問カテゴリ" className="max-w-3xl mx-auto px-4 sm:px-6 mb-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {groups.map(({ category }) => (
              <li key={category.key}>
                <a
                  href={`#${category.key}`}
                  className="font-japanese text-xs tracking-[.15em] text-vuelta-text-light hover:text-vuelta-gold transition-colors"
                >
                  {category.titleJa}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          {groups.map(({ category, entries }) => (
            <section key={category.key} id={category.key} className="mb-14 md:mb-16 scroll-mt-24">
              <h2 className="font-japanese text-xl sm:text-2xl font-medium tracking-wide border-b border-vuelta-gold/30 pb-2 mb-8">
                {category.titleJa}
              </h2>
              <div className="space-y-8">
                {entries.map((f) => (
                  <article key={f.id} id={f.id} className="scroll-mt-24">
                    <h3 className="font-japanese text-base sm:text-lg font-medium mb-2">
                      {f.ja.q}
                    </h3>
                    <p className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed">
                      {f.ja.a}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* Contact fallback + CTA */}
          <div className="border-t border-vuelta-light pt-10 text-center">
            <p className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed max-w-xl mx-auto mb-8">
              知りたいことが見つからなかった場合は、Instagramでお気軽にお尋ねください。
              もちろん、ふらっとお立ち寄りいただくのも歓迎です。
            </p>
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-vuelta-gold text-white rounded-full hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider uppercase"
            >
              予約する
            </a>
          </div>
        </div>
      </main>
      <SiteFooter lang="ja" />
    </>
  )
}
