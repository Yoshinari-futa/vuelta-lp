import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BAR_LOGO_IMAGE_URL,
  MAPS_EMBED_URL,
  MAPS_SEARCH_URL,
  POSTAL_CODE,
  RESERVATION_URL,
  SITE_ORIGIN,
  STORE_PHONE_DISPLAY,
  STORE_PHONE_SCHEMA,
  STORE_PHONE_TEL_HREF,
  barSameAsUrls,
  barStructuredDataId,
  barStructuredDataUrl,
} from '@/lib/site-seo'

export const metadata: Metadata = {
  title: 'Access & Hours | VUELTA — Mexican-Inspired Craft Cocktail Bar in Hiroshima',
  description:
    'Directions to VUELTA, a speakeasy-style craft cocktail bar in Hiroshima. 1 minute walk from Chuden-mae Station in central Hiroshima. Hours, phone, reservations, and map.',
  keywords:
    'VUELTA access, VUELTA Hiroshima address, bar near Chuden-mae, bars in Hiroshima, directions, opening hours Hiroshima bar',
  alternates: {
    canonical: `${SITE_ORIGIN}/access`,
    languages: {
      en: `${SITE_ORIGIN}/access`,
      ja: `${SITE_ORIGIN}/ja/access`,
      'x-default': `${SITE_ORIGIN}/access`,
    },
  },
  openGraph: {
    title: 'Access & Hours | VUELTA — Craft Cocktail Bar in Hiroshima',
    description:
      '1 minute from Chuden-mae Station. Address, hours, phone, and reservations for VUELTA in central Hiroshima.',
    url: `${SITE_ORIGIN}/access`,
    siteName: 'VUELTA',
    locale: 'en_US',
    alternateLocale: ['ja_JP'],
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'VUELTA — Craft Cocktail Bar in Hiroshima',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Access & Hours | VUELTA',
    description: '1 min from Chuden-mae Station. Directions, hours & reservations.',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
  robots: { index: true, follow: true },
}

function AccessJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Access', item: `${SITE_ORIGIN}/access` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BarOrPub',
      '@id': barStructuredDataId('en'),
      name: 'VUELTA',
      alternateName: ['VUELTA Craft Cocktail Bar', 'ブエルタ'],
      url: barStructuredDataUrl('en'),
      description:
        'Speakeasy-style craft cocktail bar in central Hiroshima, 1 minute walk from Chuden-mae Station. Local-ingredient cocktails, authentic tacos, and Mexican-inspired bar food.',
      image: [BAR_LOGO_IMAGE_URL, `${SITE_ORIGIN}/images/interior.png`],
      logo: BAR_LOGO_IMAGE_URL,
      telephone: STORE_PHONE_SCHEMA,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3-3-5 Otemachi, Naka-ku, Kakee Building 201',
        addressLocality: 'Hiroshima',
        addressRegion: 'Hiroshima Prefecture',
        postalCode: POSTAL_CODE,
        addressCountry: 'JP',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '34.3886', longitude: '132.4530' },
      hasMap: MAPS_SEARCH_URL,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'],
          opens: '18:00',
          closes: '02:00',
        },
      ],
      priceRange: '¥¥',
      currenciesAccepted: 'JPY',
      servesCuisine: ['Craft Cocktails', 'Mexican', 'Tacos', 'Bar Food', 'Hiroshima Local'],
      menu: `${SITE_ORIGIN}/menu`,
      sameAs: barSameAsUrls(),
      acceptsReservations: true,
      knowsLanguage: ['en', 'ja'],
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function AccessPage() {
  return (
    <>
      <AccessJsonLd />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-white text-vuelta-text outline-none"
      >
        {/* Top bar */}
        <header className="pt-24 pb-8 md:pt-28 md:pb-10 px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← VUELTA
          </Link>
          <h1 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide">
            Access to VUELTA
            <span className="sr-only"> — Mexican-inspired craft cocktail bar in Hiroshima</span>
          </h1>
          <p className="font-annam text-vuelta-gold text-xs sm:text-sm uppercase tracking-[.3em] mt-3">
            Craft Cocktail Bar in Hiroshima
          </p>
          <p className="font-sans text-vuelta-text-light text-sm sm:text-base mt-4 max-w-xl mx-auto">
            1 minute walk from Chuden-mae Station. Here&rsquo;s how to find us.
          </p>
        </header>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="space-y-7">
              <section aria-labelledby="address-heading">
                <h2
                  id="address-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  Address
                </h2>
                <a
                  href={MAPS_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base sm:text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
                >
                  {POSTAL_CODE}
                  <br />
                  Kakee Building 201
                  <br />
                  3-3-5 Otemachi, Naka-ku
                  <br />
                  Hiroshima, Hiroshima Prefecture, Japan
                </a>
              </section>

              <section aria-labelledby="transit-heading">
                <h2
                  id="transit-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  Getting Here
                </h2>
                <ul className="space-y-3 text-base sm:text-lg text-vuelta-text-light list-none">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">Hiroden Tram</strong>: 1 minute on foot
                      from Chuden-mae Station (中電前).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">From Hiroshima Station</strong>: ~15 min
                      by Hiroden tram (lines 1 / 3 / 7) — get off at Chuden-mae.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">On Foot</strong>: ~15 min from Peace
                      Memorial Park, in the heart of central Hiroshima.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-2 h-2 mt-3 rounded-full bg-vuelta-gold" aria-hidden="true" />
                    <span>
                      <strong className="text-vuelta-text">Parking</strong>: No on-site parking.
                      Paid parking is available within a 2&ndash;3 minute walk.
                    </span>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="hours-heading">
                <h2
                  id="hours-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  Hours (JST)
                </h2>
                <dl className="text-base sm:text-lg text-vuelta-text-light grid grid-cols-[max-content,1fr] gap-x-6 gap-y-1">
                  <dt>Wednesday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt className="text-vuelta-text-light">Thursday</dt>
                  <dd className="text-vuelta-text-light">Closed</dd>
                  <dt>Friday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>Saturday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>Sunday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>Monday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                  <dt>Tuesday</dt>
                  <dd>18:00 &ndash; 02:00</dd>
                </dl>
                <p className="text-sm text-vuelta-text-light mt-2">
                  Last order 01:00. Closed on Thursdays.
                </p>
              </section>

              <section aria-labelledby="phone-heading">
                <h2
                  id="phone-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  Phone
                </h2>
                <a
                  href={STORE_PHONE_TEL_HREF}
                  className="text-base sm:text-lg hover:text-vuelta-gold transition-colors"
                >
                  {STORE_PHONE_DISPLAY}
                </a>
              </section>

              <section aria-labelledby="reserve-heading" className="pt-2">
                <h2
                  id="reserve-heading"
                  className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold"
                >
                  Reservations
                </h2>
                <p className="text-base sm:text-lg text-vuelta-text-light mb-4">
                  Walk-ins welcome. For groups or guaranteed seating, reserve ahead.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <a
                    href={RESERVATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    Book Online
                  </a>
                  <a
                    href={STORE_PHONE_TEL_HREF}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    Call {STORE_PHONE_DISPLAY}
                  </a>
                  <Link
                    href="/menu"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-vuelta-gray text-vuelta-text hover:border-vuelta-gold hover:text-vuelta-gold transition-colors rounded-lg font-annam text-sm uppercase tracking-wider"
                  >
                    View Menu
                  </Link>
                </div>
              </section>
            </div>

            {/* Right: Map */}
            <div className="space-y-4 md:sticky md:top-24">
              <div className="relative aspect-[4/3] bg-vuelta-gray overflow-hidden rounded-lg">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                  title="VUELTA Location Map"
                  aria-label="VUELTA location map"
                />
              </div>
              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors underline underline-offset-4"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Brand closing line */}
          <p className="mt-20 text-center font-annam text-lg sm:text-xl text-vuelta-text-light max-w-2xl mx-auto">
            Make your night in Hiroshima unforgettable &mdash; a craft cocktail bar where cocktails and tacos come together.
          </p>
        </div>
      </main>
    </>
  )
}
