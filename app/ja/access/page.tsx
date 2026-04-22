import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BAR_LOGO_IMAGE_URL,
  MAPS_EMBED_URL,
  MAPS_SEARCH_URL,
  POSTAL_CODE,
  RESERVATION_URL,
  SITE_ORIGIN,
  STORE_ADDRESS_JA_LINE,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_SCHEMA,
  STORE_PHONE_TEL_HREF,
  barSameAsUrls,
} from '@/lib/site-seo'

export const metadata: Metadata = {
  title: 'アクセス・営業時間｜VUELTA 広島のクラフトカクテルバー',
  description:
    '広島の隠れ家カクテルバー VUELTA（ブエルタ）へのアクセス。中電前駅から徒歩1分。住所・営業時間・定休日・駐車場・電話番号・ご予約はこちら。',
  keywords:
    'VUELTA アクセス, ブエルタ 広島 地図, 中電前 バー, 広島 バー アクセス, 広島 カクテルバー 地図, 広島市中区 バー 営業時間',
  alternates: {
    canonical: `${SITE_ORIGIN}/ja/access`,
    languages: {
      en: `${SITE_ORIGIN}/access`,
      ja: `${SITE_ORIGIN}/ja/access`,
      'x-default': `${SITE_ORIGIN}/access`,
    },
  },
  openGraph: {
    title: 'アクセス・営業時間｜VUELTA 広島のクラフトカクテルバー',
    description:
      '中電前駅から徒歩1分。VUELTA（ブエルタ）へのアクセス・営業時間・駐車場情報。',
    url: `${SITE_ORIGIN}/ja/access`,
    siteName: 'VUELTA',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'VUELTA 広島 - クラフトカクテルバー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'アクセス・営業時間｜VUELTA 広島',
    description: '中電前駅から徒歩1分。住所・営業時間・ご予約はこちら。',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
  robots: { index: true, follow: true },
}

function AccessJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_ORIGIN}/ja` },
        { '@type': 'ListItem', position: 2, name: 'アクセス', item: `${SITE_ORIGIN}/ja/access` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BarOrPub',
      '@id': `${SITE_ORIGIN}/ja/access#bar`,
      name: 'VUELTA',
      alternateName: ['ブエルタ', 'VUELTA Craft Cocktail Bar'],
      url: `${SITE_ORIGIN}/ja/access`,
      description:
        '広島・中電前駅徒歩1分のスピークイージー風クラフトカクテルバー。桜尾ジンや広島レモンなど地元食材のシグネチャーカクテルと、本格タコス・メキシカンのバーフードを楽しめる隠れ家。',
      image: [BAR_LOGO_IMAGE_URL, `${SITE_ORIGIN}/images/interior.png`],
      logo: BAR_LOGO_IMAGE_URL,
      telephone: STORE_PHONE_SCHEMA,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '広島県広島市中区大手町3-3-5 掛江ビル201',
        addressLocality: '広島市',
        addressRegion: '広島県',
        postalCode: POSTAL_CODE,
        addressCountry: 'JP',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '34.3886', longitude: '132.4530' },
      hasMap: MAPS_SEARCH_URL,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'],
          opens: '18:00',
          closes: '02:00',
        },
      ],
      priceRange: '¥¥',
      currenciesAccepted: 'JPY',
      servesCuisine: ['クラフトカクテル', 'メキシカン料理', 'タコス', 'バーフード', '広島ローカル'],
      menu: `${SITE_ORIGIN}/menu`,
      sameAs: barSameAsUrls(),
      acceptsReservations: true,
      knowsLanguage: ['ja', 'en'],
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function AccessPageJa() {
  return (
    <>
      <AccessJsonLd />

      <a href="#main-content" className="skip-link">
        メインコンテンツへスキップ
      </a>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-white text-vuelta-text outline-none"
      >
        {/* Top bar */}
        <header className="pt-24 pb-8 md:pt-28 md:pb-10 px-4 sm:px-6 text-center">
          <Link
            href="/ja"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← VUELTA
          </Link>
          <h1 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide">
            広島のクラフトカクテルバー VUELTAへのアクセス
          </h1>
          <p className="font-annam text-vuelta-gold text-xs sm:text-sm uppercase tracking-[.3em] mt-3">
            Access &amp; Hours
          </p>
          <p className="font-sans text-vuelta-text-light text-sm sm:text-base mt-4 max-w-xl mx-auto">
            中電前駅から徒歩1分。広島市中心部の隠れ家バーへご案内します。
          </p>
        </header>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="space-y-7">
              <section aria-labelledby="address-heading">
                <h2
                  id="address-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  住所
                </h2>
                <a
                  href={MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
                >
                  〒{POSTAL_CODE}
                  <br />
                  {STORE_ADDRESS_JA_LINE}
                </a>
              </section>

              <section aria-labelledby="transit-heading">
                <h2
                  id="transit-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  最寄り駅・道順
                </h2>
                <ul className="space-y-3 text-base sm:text-lg text-vuelta-text-light list-none">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">広島電鉄</strong>：中電前駅から徒歩1分。
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">広島駅から</strong>：広電（1号線／3号線／7号線）で約15分、「中電前」下車。
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">徒歩</strong>：平和記念公園から徒歩約15分、広島市中心部。
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">駐車場</strong>：専用駐車場はございません。徒歩2〜3分圏内にコインパーキングがございます。
                    </span>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="hours-heading">
                <h2
                  id="hours-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  営業時間
                </h2>
                <dl className="text-base sm:text-lg text-vuelta-text-light grid grid-cols-[max-content,1fr] gap-x-6 gap-y-1">
                  <dt>水曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt className="text-vuelta-text-light">木曜</dt>
                  <dd className="text-vuelta-text-light">定休日</dd>
                  <dt>金曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>土曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>日曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>月曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>火曜</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                </dl>
                <p className="text-sm text-vuelta-text-light mt-2">
                  ラストオーダー 01:00／木曜定休
                </p>
              </section>

              <section aria-labelledby="phone-heading">
                <h2
                  id="phone-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  電話番号
                </h2>
                <a
                  href={STORE_PHONE_TEL_HREF}
                  className="text-base sm:text-lg hover:text-vuelta-gold transition-colors"
                >
                  {STORE_PHONE_DISPLAY}
                </a>
              </section>

              <section aria-labelledby="reserve-heading" className="pt-2">
                <h2
                  id="reserve-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  ご予約
                </h2>
                <p className="text-base sm:text-lg text-vuelta-text-light mb-4">
                  ウォークイン歓迎。グループや確実なお席をご希望の場合はオンラインまたはお電話でご予約ください。
                </p>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <a
                    href={RESERVATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    オンライン予約
                  </a>
                  <a
                    href={STORE_PHONE_TEL_HREF}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    {STORE_PHONE_DISPLAY} に電話
                  </a>
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-vuelta-gray text-vuelta-text hover:border-vuelta-gold hover:text-vuelta-gold transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    メニューを見る
                  </Link>
                </div>
              </section>
            </div>

            {/* Right: Map */}
            <div className="space-y-4 md:sticky md:top-24">
              <div className="relative aspect-[4/3] bg-vuelta-gray overflow-hidden rounded-lg">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="VUELTA 場所の地図"
                  aria-label="VUELTA 場所の地図"
                />
              </div>
              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors underline underline-offset-4"
              >
                Google マップで開く
              </a>
            </div>
          </div>

          {/* Brand closing line */}
          <p className="mt-20 text-center font-annam text-lg sm:text-xl text-vuelta-text-light max-w-2xl mx-auto">
            広島の夜をもっと特別に。カクテルとタコスが楽しめる、隠れ家のようなバーです。
          </p>
        </div>
      </main>
    </>
  )
}
