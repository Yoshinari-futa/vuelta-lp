import type { Metadata } from 'next'
import { SITE_ORIGIN } from '@/lib/site-seo'

export const metadata: Metadata = {
  title: 'ファーストドリンクパス | VUELTA 広島',
  description:
    '広島・中電前のクラフトカクテルバーVUELTAの月額ウェルカムドリンク。いつでも解約可能。',
  alternates: {
    canonical: `${SITE_ORIGIN}/ja/subscription`,
    languages: {
      en: `${SITE_ORIGIN}/subscription`,
      ja: `${SITE_ORIGIN}/ja/subscription`,
      'x-default': `${SITE_ORIGIN}/subscription`,
    },
  },
  openGraph: {
    title: 'ファーストドリンクパス | VUELTA',
    description: 'VUELTAの月額ウェルカムドリンク',
    url: `${SITE_ORIGIN}/ja/subscription`,
    siteName: 'VUELTA',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: `${SITE_ORIGIN}/images/ogp.png`, width: 1200, height: 630, alt: 'VUELTA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ファーストドリンクパス | VUELTA',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
  robots: { index: true, follow: true },
}

export default function JaSubscriptionLayout({ children }: { children: React.ReactNode }) {
  return children
}
