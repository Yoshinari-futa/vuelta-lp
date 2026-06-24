import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import Script from 'next/script'
import './globals.css'
import LanguageSelector from './components/LanguageSelector'
import CustomCursor from './components/CustomCursor'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

// BTAnnamNeue-Regular font configuration
const annamNeue = localFont({
  src: './fonts/BTAnnamNeue-Regular.otf',
  variable: '--font-annam',
  weight: '400',
  display: 'swap',
})

// 日本語フォント設定
const japaneseFont = localFont({
  src: './fonts/これ.ttf',
  variable: '--font-asebi',
  weight: '400',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a3a2e' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vuelta.jp'),
  title: 'Bar VUELTA｜広島大手町のクラフトカクテルバー 中電前駅から徒歩1分',
  description: 'Bar VUELTAは広島大手町のクラフトカクテルバー。中電前駅徒歩1分。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテルを、デートや記念日、女性一人でも訪れやすい落ち着いた空間で。英語対応、ウォークインOK。18:00–02:00／木曜定休。',
  keywords: '広島 バー, 広島 カクテル, 広島 カクテルバー, 大手町 バー, 中電前 バー, 広島 おすすめ バー, クラフトカクテル 広島, 広島 デート バー, 広島 記念日 バー, Bar VUELTA, VUELTA, ヴエルタ, cocktail bar Hiroshima, English speaking bar Hiroshima',
  openGraph: {
    title: 'Bar VUELTA｜広島大手町のクラフトカクテルバー 中電前駅から徒歩1分',
    description: 'Bar VUELTAは広島大手町のクラフトカクテルバー。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテル。中電前駅徒歩1分。英語対応、ウォークインOK。',
    type: 'website',
    url: 'https://www.vuelta.jp',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
    siteName: 'Bar VUELTA',
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
        alt: '広島のクラフトカクテルバー VUELTA - 大手町、中電前駅徒歩1分',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vuelta_bar',
    title: 'Bar VUELTA｜広島大手町のクラフトカクテルバー 中電前駅から徒歩1分',
    description: '広島大手町のクラフトカクテルバー。桜尾ジンや広島レモンなど地元食材のシグネチャーカクテル。英語対応、ウォークインOK。',
    images: ['/images/ogp.png'],
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.vuelta.jp',
    languages: {
      'en': 'https://www.vuelta.jp',
      'ja': 'https://www.vuelta.jp/ja',
    },
  },
  verification: {
    google: 'EjQ9UGSszHoiZkwYj1Z7_6vG5mhB49uW-e_3WvuVALQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 言語属性: ミドルウェアが設定した x-pathname を読み、/ja 配下なら "ja"、それ以外は "en"
  const pathname = headers().get('x-pathname') ?? ''
  const lang = pathname.startsWith('/ja') ? 'ja' : 'en'

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body className={`${playfair.variable} ${inter.variable} ${annamNeue.variable} ${japaneseFont.variable} font-sans antialiased`}>
        {/* Google tag (gtag.js) - Google Ads AW-18075065916 + GA4 G-HJ7LZN0WLL */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18075065916"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18075065916');
            gtag('config', 'G-HJ7LZN0WLL');
          `}
        </Script>
        <CustomCursor />
        <LanguageSelector />
        {children}
        {/* 酒類広告ポリシー対応: 全ページ共通の飲酒注意表示（Google広告アルコールポリシー要件） */}
        <div className="bg-black text-center text-[11px] text-white/40 py-3 px-4 tracking-wider">
          20歳未満の飲酒は法律で禁じられています。飲酒は20歳になってから。
        </div>
      </body>
    </html>
  )
}
