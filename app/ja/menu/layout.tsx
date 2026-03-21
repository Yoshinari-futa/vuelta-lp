import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'メニュー | VUELTA 広島',
  description: 'VUELTAのフルメニュー。広島の牡蠣や地元食材を使ったシグネチャーカクテル。広島市中心部。',
  openGraph: {
    title: 'メニュー | VUELTA 広島',
    description: 'VUELTAのフルメニュー。シグネチャーカクテルと丁寧に作られたドリンク。',
    type: 'website',
    url: 'https://vuelta-bar.com/ja/menu',
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/vuelta-logo.png',
        width: 900,
        height: 306,
        alt: 'VUELTA Logo',
      },
    ],
  },
  alternates: {
    canonical: 'https://vuelta-bar.com/ja/menu',
    languages: {
      'en': 'https://vuelta-bar.com/menu',
      'ja': 'https://vuelta-bar.com/ja/menu',
    },
  },
}

export default function MenuLayoutJA({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
