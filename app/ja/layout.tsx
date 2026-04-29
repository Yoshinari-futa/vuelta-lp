import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vuelta.jp'),
  title: '広島のカクテルバー VUELTA｜大手町・中電前駅徒歩1分の隠れ家クラフトカクテルバー',
  description: '広島・大手町のクラフトカクテルバーVUELTA。中電前駅徒歩1分。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテルを、デート・記念日や女性一人でも訪れやすい隠れ家空間で。英語対応・ウォークインOK。18:00–02:00／木曜定休。',
  keywords: '広島 バー, 広島 カクテル, 広島 カクテルバー, 大手町 バー, 中電前 バー, 隠れ家バー 広島, 広島 おすすめ バー, クラフトカクテル 広島, 広島 デート バー, 広島 記念日 バー, 紙屋町 バー, 本通 バー, 八丁堀 バー, VUELTA, ヴエルタ',
  openGraph: {
    title: '広島のカクテルバー VUELTA｜大手町・中電前駅徒歩1分の隠れ家クラフトカクテルバー',
    description: '広島・大手町のクラフトカクテルバーVUELTA。桜尾ジンや広島レモンなど地元食材を使ったシグネチャーカクテルが楽しめる隠れ家バー。中電前駅徒歩1分。英語対応・ウォークインOK。',
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
        alt: '広島のクラフトカクテルバー VUELTA - 大手町・中電前駅徒歩1分',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vuelta_bar',
    title: '広島のカクテルバー VUELTA｜大手町・中電前駅徒歩1分',
    description: '広島・大手町の隠れ家クラフトカクテルバー。桜尾ジン・広島レモンなど地元食材のシグネチャーカクテル。デート・記念日にも。英語対応・ウォークインOK。',
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
