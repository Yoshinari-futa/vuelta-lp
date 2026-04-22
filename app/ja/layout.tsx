import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vuelta.jp'),
  title: 'VUELTA（ブエルタ）｜広島の隠れ家カクテルバー｜広島食材のカクテルとタコス',
  description: '広島・中電前徒歩1分のスピークイージー風カクテルバー。桜尾ジン・広島レモンなど地元食材のシグネチャーカクテルと本格タコスを楽しめる隠れ家。水〜火 18:00–02:00（木曜定休）。広島の夜を特別に。',
  keywords: 'カクテルバー 広島, VUELTA, ブエルタ, 広島 バー, 隠れ家バー 広島, スピークイージー 広島, 中電前 バー, 広島 タコス, メキシカンバー 広島, テキーラ 広島, クラフトカクテル 広島, 広島市中区 バー, 広島 デートバー',
  openGraph: {
    title: 'VUELTA｜広島のクラフトカクテルバー',
    description: '広島の食材で仕立てるシグネチャーカクテルと、メキシカンのソウルフード。「おかえり」と「はじめまして」が交差する、広島の夜の居場所。',
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_US'],
    url: 'https://www.vuelta.jp/ja',
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
        alt: 'VUELTA 広島 - クラフトカクテルバー',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VUELTA｜広島のクラフトカクテルバー',
    description: '広島の食材で仕立てるシグネチャーカクテルと、本格タコス。中電前すぐの隠れ家バー。',
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
    canonical: 'https://www.vuelta.jp/ja',
    languages: {
      'en': 'https://www.vuelta.jp',
      'ja': 'https://www.vuelta.jp/ja',
      'x-default': 'https://www.vuelta.jp',
    },
  },
}

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
