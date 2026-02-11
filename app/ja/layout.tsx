import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'VUELTA 広島 | 国際的なお客様も大歓迎',
  description: 'VUELTAでミクソロジーの芸術を体験。広島のプレミアムカクテルバー。英語対応、国際的なお客様も大歓迎。シグネチャーカクテル、親密な雰囲気、広島市中心部に位置。',
  keywords: 'カクテルバー 広島, VUELTA, 広島 バー, 英語対応 バー 広島, プレミアムカクテル, ミクソロジー 広島, 国際的なバー 日本',
  openGraph: {
    title: 'VUELTA 広島',
    description: '「おかえり」と「はじめまして」が交差する場所。世界クラスのカクテルと本格的な広島のホスピタリティを体験。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://vuelta-bar.com/ja',
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/vuelta-logo.png',
        width: 900,
        height: 306,
        alt: 'VUELTA ロゴ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VUELTA 広島',
    description: 'VUELTAでミクソロジーの芸術を体験',
    images: ['/images/vuelta-logo.png'],
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
    canonical: 'https://vuelta-bar.com/ja',
    languages: {
      'en': 'https://vuelta-bar.com',
      'ja': 'https://vuelta-bar.com/ja',
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
