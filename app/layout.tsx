import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
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
  title: 'VUELTA | Craft Cocktail Bar in Hiroshima — Cocktails, Tacos & Local Spirits',
  description: 'VUELTA is a speakeasy-style craft cocktail bar in central Hiroshima. Signature cocktails made with local Hiroshima ingredients, authentic tacos, and a relaxed bar where locals and travelers meet. 1 min from Chuden-mae. English spoken, walk-ins welcome. Wed–Tue 18:00–02:00.',
  keywords: 'bar in Hiroshima, bars in Hiroshima, cocktail bar Hiroshima, VUELTA, Hiroshima bar near me, Mexican bar Hiroshima, tacos Hiroshima, English speaking bar Hiroshima, speakeasy Hiroshima, craft cocktails, Hiroshima nightlife, tequila bar Hiroshima, best bar Hiroshima',
  openGraph: {
    title: 'VUELTA | Craft Cocktail Bar in Hiroshima',
    description: 'Hiroshima\'s speakeasy craft cocktail bar. Local-ingredient cocktails, authentic Mexican-inspired tacos, and an English-friendly night out in Hiroshima.',
    type: 'website',
    url: 'https://www.vuelta.jp',
    locale: 'en_US',
    alternateLocale: ['ja_JP'],
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
        alt: 'VUELTA — Craft Cocktail Bar in Hiroshima',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vuelta_bar',
    title: 'VUELTA | Craft Cocktail Bar in Hiroshima',
    description: 'Speakeasy craft cocktail bar in Hiroshima. Local-ingredient cocktails, tacos, tequila. English-friendly. Walk-ins welcome.',
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
      'x-default': 'https://www.vuelta.jp',
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
  return (
    <html lang="en" className="scroll-smooth">
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
