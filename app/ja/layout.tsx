import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vuelta.jp'),
  title: 'VUELTA 広島｜中電前すぐのクラフトカクテルバー',
  description: '広島市中区大手町のスピークイージー風カクテルバー。中電前駅徒歩1分。広島レモン・桜尾ジンなど地元素材を使ったシグネチャーカクテル。女性一人でも入りやすい隠れ家空間。水〜火 18:00-02:00（木曜定休）',
  keywords: 'カクテルバー 広島, VUELTA, 広島 バー, 隠れ家バー 広島, スピークイージー 広島, 中電前 バー, 広島市中区 バー, クラフトカクテル, 女性一人 バー 広島, 広島 おしゃれバー',
  openGraph: {
    title: 'VUELTA 広島｜中電前すぐのクラフトカクテルバー',
    description: '「おかえり」と「はじめまして」が交差する場所。広島の地元素材を使ったクラフトカクテルと、女性一人でも入りやすい隠れ家空間。',
    type: 'website',
    locale: 'ja_JP',
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
    title: 'VUELTA 広島',
    description: 'VUELTAでミクソロジーの芸術を体験',
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
