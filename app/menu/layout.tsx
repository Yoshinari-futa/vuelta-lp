import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu | VUELTA In Hiroshima',
  description: 'Explore our full cocktail menu at VUELTA. Signature cocktails featuring Hiroshima oysters, local ingredients, and crafted with precision. Located in Hiroshima city center.',
  openGraph: {
    title: 'Menu | VUELTA In Hiroshima',
    description: 'Explore our full cocktail menu at VUELTA. Signature cocktails and crafted beverages.',
    type: 'website',
    url: 'https://vuelta-bar.com/menu',
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
    canonical: 'https://vuelta-bar.com/menu',
    languages: {
      'en': 'https://vuelta-bar.com/menu',
      'ja': 'https://vuelta-bar.com/ja/menu',
    },
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
