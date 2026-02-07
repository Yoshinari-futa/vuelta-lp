import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

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
}

export const metadata: Metadata = {
  title: 'VUELTA BAR In Hiroshima | English Friendly',
  description: 'Experience the art of mixology at VUELTA, Hiroshima\'s premier cocktail bar. English spoken, international guests welcome. Signature cocktails, intimate atmosphere, located in the heart of Hiroshima city center.',
  keywords: 'cocktail bar Hiroshima, VUELTA, Hiroshima bar, English speaking bar Hiroshima, premium cocktails, mixology Hiroshima, international bar Japan',
  openGraph: {
    title: 'VUELTA BAR In Hiroshima',
    description: 'Where "Welcome Back" meets "Nice to Meet You". Experience authentic Hiroshima hospitality with world-class cocktails.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vuelta-bar.com',
    siteName: 'VUELTA BAR',
    images: [
      {
        url: '/icon.png',
        width: 500,
        height: 500,
        alt: 'VUELTA BAR Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VUELTA BAR In Hiroshima',
    description: 'Experience the art of mixology at VUELTA',
    images: ['/icon.png'],
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
    canonical: 'https://vuelta-bar.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} ${annamNeue.variable} ${japaneseFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
