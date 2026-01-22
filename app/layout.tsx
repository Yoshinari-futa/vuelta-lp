import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// BTAnnamNeue-Regular font configuration
const annamNeue = localFont({
  src: './fonts/BTAnnamNeue-Regular.otf',
  variable: '--font-annam',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'V U E L T A - Premium Cocktail Bar in Hiroshima | English Friendly',
  description: 'Experience the art of mixology at V U E L T A, Hiroshima\'s premier cocktail bar. English spoken, international guests welcome. Signature cocktails, intimate atmosphere, located in the heart of Hiroshima city center.',
  keywords: 'cocktail bar Hiroshima, V U E L T A, Hiroshima bar, English speaking bar Hiroshima, premium cocktails, mixology Hiroshima, international bar Japan',
  openGraph: {
    title: 'V U E L T A - Premium Cocktail Bar in Hiroshima',
    description: 'Where "Welcome Back" meets "Nice to Meet You". Experience authentic Hiroshima hospitality with world-class cocktails.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V U E L T A - Premium Cocktail Bar in Hiroshima',
    description: 'Experience the art of mixology at V U E L T A',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} ${annamNeue.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
