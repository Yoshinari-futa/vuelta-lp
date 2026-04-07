import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  SITE_ORIGIN,
  POSTAL_CODE,
  STORE_ADDRESS_JA_LINE,
  STORE_PHONE_DISPLAY,
} from '@/lib/site-seo'
import { blurDataUrl } from '@/lib/blurPlaceholders'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | VUELTA',
  description: '株式会社VUELTAの特定商取引法に基づく表記（販売事業者・連絡先・支払方法等）',
  alternates: {
    canonical: `${SITE_ORIGIN}/tokushoho`,
    languages: {
      ja: `${SITE_ORIGIN}/tokushoho`,
      'x-default': `${SITE_ORIGIN}/tokushoho`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '特定商取引法に基づく表記 | VUELTA',
    description: '株式会社VUELTAの特定商取引法に基づく表記',
    url: `${SITE_ORIGIN}/tokushoho`,
    siteName: 'VUELTA',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'VUELTA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '特定商取引法に基づく表記 | VUELTA',
    description: '株式会社VUELTAの特定商取引法に基づく表記',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
}

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">
        本文へスキップ
      </a>
      {/* Header */}
      <header className="site-header-fixed fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gray/50">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="transition-opacity hover:opacity-80" aria-label="VUELTA Home">
            <Image
              src="/images/vuelta-logo.png"
              alt="VUELTA"
              width={250}
              height={85}
              className="h-8 md:h-10 w-auto object-contain"
              priority
              placeholder="blur"
              blurDataURL={blurDataUrl('/images/vuelta-logo.png')}
            />
          </Link>
          <Link
            href="/"
            className="font-sans text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors"
          >
            &larr; Back
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main id="main-content" tabIndex={-1} className="pt-28 pb-20 px-4 sm:px-6 outline-none">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-japanese text-2xl sm:text-3xl tracking-wide text-vuelta-text mb-12 text-center">
            特定商取引法に基づく表記
          </h1>

          <div className="divide-y divide-vuelta-gray">
            <Row label="販売業者" value="株式会社VUELTA" />
            <Row label="通信販売業務責任者" value="三宅 悠太" />
            <Row label="所在地">
              <span>〒{POSTAL_CODE}<br />{STORE_ADDRESS_JA_LINE}</span>
            </Row>
            <Row label="電話番号" value={STORE_PHONE_DISPLAY} />
            <Row label="メールアドレス" value="head_office@vuelta-hr.com" />
            <Row label="URL">
              <a
                href={SITE_ORIGIN}
                className="text-vuelta-gold hover:text-vuelta-gold-light underline underline-offset-2 break-all transition-colors"
              >
                {SITE_ORIGIN}
              </a>
            </Row>
            <Row label="商品の名称" value="VUELTA サブスクリプション（月額会員プラン）" />
            <Row label="販売価格">
              <span>
                各プランの価格は商品ページに表示された金額（税込）となります。
                <br />送料等の付加費用はありません。
              </span>
            </Row>
            <Row label="支払方法" value="クレジットカード（Stripe決済）" />
            <Row label="支払時期" value="お申し込み時に即時決済。以降、毎月同日に自動決済されます。" />
            <Row label="商品の引渡時期" value="決済完了後、直ちにサービスをご利用いただけます。" />
            <Row label="返品・キャンセルについて">
              <span>
                サブスクリプションはいつでもキャンセル可能です。
                <br />キャンセル後も、当月の決済済み期間中はサービスをご利用いただけます。
                <br />デジタルサービスの性質上、決済完了後の返金には原則として対応しておりません。
              </span>
            </Row>
            <Row label="動作環境" value="インターネット接続環境および最新版のウェブブラウザ" />
          </div>

          <p className="mt-14 text-center font-sans text-xs text-vuelta-text-light">
            最終更新日: 2026年4月1日
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-vuelta-gray py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <p className="font-sans text-xs text-vuelta-text-light">
            &copy; {new Date().getFullYear()} VUELTA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/* ── Row component ── */
function Row({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-6">
      <dt className="font-japanese text-sm font-medium text-vuelta-text-light mb-1 sm:mb-0">
        {label}
      </dt>
      <dd className="font-sans text-sm text-vuelta-text sm:col-span-2 leading-relaxed">
        {children ?? value}
      </dd>
    </div>
  )
}
