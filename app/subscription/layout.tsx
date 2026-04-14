import type { Metadata } from 'next'
import { SITE_ORIGIN } from '@/lib/site-seo'

export const metadata: Metadata = {
  title: 'First Drink Pass — VUELTA | Monthly Cocktail Subscription',
  description:
    'Subscribe for a monthly welcome drink at VUELTA in Hiroshima. Craft cocktail bar near Chuden-mae Station. Cancel anytime.',
  alternates: {
    canonical: `${SITE_ORIGIN}/subscription`,
    languages: {
      en: `${SITE_ORIGIN}/subscription`,
      ja: `${SITE_ORIGIN}/ja/subscription`,
      'x-default': `${SITE_ORIGIN}/subscription`,
    },
  },
  openGraph: {
    title: 'First Drink Pass — VUELTA',
    description: 'Monthly welcome drink at VUELTA, Hiroshima.',
    url: `${SITE_ORIGIN}/subscription`,
    siteName: 'VUELTA',
    locale: 'en_US',
    type: 'website',
    images: [{ url: `${SITE_ORIGIN}/images/ogp.png`, width: 1200, height: 630, alt: 'VUELTA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Drink Pass — VUELTA',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
  robots: { index: true, follow: true },
}

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_ORIGIN}` },
      { "@type": "ListItem", "position": 2, "name": "First Drink Pass", "item": `${SITE_ORIGIN}/subscription` }
    ]
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  )
}
