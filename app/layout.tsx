import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
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
  title: '広島のカクテルバー VUELTA｜大手町、中電前駅徒歩1分のクラフトカクテルバー',
  description: '広島大手町のクラフトカクテルバーVUELTA。中電前駅徒歩1分。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテルを、デートや記念日、女性一人でも訪れやすい落ち着いた空間で。英語対応、ウォークインOK。18:00–02:00／木曜定休。',
  keywords: '広島 バー, 広島 カクテル, 広島 カクテルバー, 大手町 バー, 中電前 バー, 広島 おすすめ バー, クラフトカクテル 広島, 広島 デート バー, 広島 記念日 バー, VUELTA, ヴエルタ, cocktail bar Hiroshima, English speaking bar Hiroshima',
  openGraph: {
    title: '広島のカクテルバー VUELTA｜大手町、中電前駅徒歩1分のクラフトカクテルバー',
    description: '広島大手町のクラフトカクテルバーVUELTA。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテル。中電前駅徒歩1分。英語対応、ウォークインOK。',
    type: 'website',
    url: 'https://www.vuelta.jp',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
    siteName: 'VUELTA',
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
    title: '広島のカクテルバー VUELTA｜大手町、中電前駅徒歩1分',
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
        <CustomCursor />
        <LanguageSelector />
        {children}
      </body>
    </html>
  )
}
