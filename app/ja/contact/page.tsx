import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_ORIGIN, RESERVATION_URL, CONTACT_EMAIL } from '@/lib/site-seo'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'

export const metadata: Metadata = {
  title: 'お問い合わせ — Bar VUELTA | 広島のクラフトカクテルバー',
  description:
    'Bar VUELTAへのお問い合わせ。少人数での貸切、ご要望、ご質問はメールでご連絡ください。',
  alternates: {
    canonical: `${SITE_ORIGIN}/ja/contact`,
    languages: {
      en: `${SITE_ORIGIN}/contact`,
      ja: `${SITE_ORIGIN}/ja/contact`,
      'x-default': `${SITE_ORIGIN}/contact`,
    },
  },
  openGraph: {
    title: 'お問い合わせ — Bar VUELTA',
    description: '少人数での貸切、ご要望、ご質問はメールでご連絡ください。',
    url: `${SITE_ORIGIN}/ja/contact`,
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

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Bar VUELTA お問い合わせ')}`

const TOPICS = [
  { en: 'Private hire', ja: '少人数の貸切', body: '日にちと人数、だいたいの時間を書いてもらえると話が早いです。' },
  { en: 'Requests', ja: 'ご要望', body: '記念日のこと、苦手な食材やアレルギーのこと。来る前に伝えておきたいことがあれば。' },
  { en: 'Questions', ja: 'ご質問', body: 'お店のことなら、なんでも。' },
]

export default function ContactPageJa() {
  return (
    <>
      <SiteHeader lang="ja" />
      <a href="#main-content" className="skip-link">
        本文へスキップ
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-vuelta-text outline-none">
        <header className="pt-24 pb-10 md:pt-32 md:pb-14 px-4 sm:px-6 text-center">
          <Link
            href="/ja"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← Bar VUELTA
          </Link>
          <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            Contact
          </h1>
          <p className="font-japanese text-vuelta-gold text-base sm:text-lg tracking-wider mt-3">
            お問い合わせ
          </p>
          <p className="font-japanese text-vuelta-text-light text-sm sm:text-base mt-6 max-w-md mx-auto leading-relaxed">
            少人数での貸切や、ちょっとしたご要望、聞いてみたいことがあれば、メールでご連絡ください。
          </p>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
          <dl className="border-t border-vuelta-gold/30">
            {TOPICS.map((t) => (
              <div key={t.en} className="border-b border-vuelta-gold/30 py-6 sm:py-7 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="mb-2 sm:mb-0">
                  <span className="block font-annam text-xs uppercase tracking-[.25em] text-vuelta-text-light">{t.en}</span>
                  <span className="block font-japanese text-base sm:text-lg text-vuelta-gold mt-1">{t.ja}</span>
                </dt>
                <dd className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed sm:pt-5">
                  {t.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="text-center mt-14">
            <p className="font-annam text-xs uppercase tracking-[.3em] text-vuelta-text-light mb-4">Email</p>
            <a
              href={MAILTO}
              className="font-annam text-lg sm:text-2xl tracking-wide text-vuelta-gold border-b border-vuelta-gold/40 pb-1 hover:border-vuelta-gold transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="font-japanese text-xs sm:text-sm text-vuelta-text-light leading-relaxed mt-10">
              今夜のご予約は
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vuelta-gold underline underline-offset-4 decoration-vuelta-gold/30 hover:decoration-vuelta-gold mx-1"
              >
                予約ページ
              </a>
              からが早いです。
            </p>
          </div>
        </div>
      </main>
      <SiteFooter lang="ja" />
    </>
  )
}
