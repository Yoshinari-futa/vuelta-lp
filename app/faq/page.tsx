import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_ORIGIN, RESERVATION_URL } from '@/lib/site-seo'
import { faqsByCategory, faqEntries } from '@/lib/faqData'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

// ── SEO Metadata ──────────────────────────
export const metadata: Metadata = {
  title: 'FAQ — Bar VUELTA | Craft Cocktail Bar in Hiroshima',
  description:
    'Everything you need to know before visiting Bar VUELTA in Hiroshima: opening hours, reservations, English support, signature cocktails, tipping, payment, access from Chuden-mae and the Peace Memorial Park.',
  keywords:
    'Bar VUELTA FAQ, Hiroshima bar questions, Hiroshima cocktail bar English, bar near Peace Memorial Park, late night bar Hiroshima, bar open Sunday Hiroshima',
  alternates: {
    canonical: `${SITE_ORIGIN}/faq`,
    languages: {
      en: `${SITE_ORIGIN}/faq`,
      ja: `${SITE_ORIGIN}/ja/faq`,
      'x-default': `${SITE_ORIGIN}/faq`,
    },
  },
  openGraph: {
    title: 'FAQ — Bar VUELTA Craft Cocktail Bar in Hiroshima',
    description:
      'Opening hours, reservations, English support, signature cocktails, payment and access. All your questions about Bar VUELTA answered.',
    url: `${SITE_ORIGIN}/faq`,
    siteName: 'Bar VUELTA',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'Bar VUELTA — Craft Cocktail Bar in Hiroshima',
      },
    ],
  },
}

// ── Structured Data (JSON-LD) ─────────────
function FaqJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/faq#faq`,
    url: `${SITE_ORIGIN}/faq`,
    inLanguage: 'en',
    about: {
      '@type': 'BarOrPub',
      '@id': `${SITE_ORIGIN}/#bar`,
      name: 'Bar VUELTA',
    },
    mainEntity: faqEntries.map((f) => ({
      '@type': 'Question',
      name: f.en.q,
      url: `${SITE_ORIGIN}/faq#${f.id}`,
      acceptedAnswer: { '@type': 'Answer', text: f.en.a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_ORIGIN}/faq` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function FaqPage() {
  const groups = faqsByCategory()
  return (
    <>
      <FaqJsonLd />
      <BreadcrumbJsonLd />

      <SiteHeader lang="en" />
      <a href="#main-content" className="skip-link">
        Skip to FAQ
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-vuelta-text outline-none">
        {/* Hero */}
        <header className="pt-24 pb-10 md:pt-32 md:pb-14 px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← Bar VUELTA
          </Link>
          <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            FAQ
          </h1>
          <p className="font-annam text-vuelta-gold text-base sm:text-lg tracking-wider mt-3">
            Everything to Know Before You Visit.
          </p>
          <p className="font-sans text-vuelta-text-light text-xs sm:text-sm mt-3 max-w-md mx-auto">
            Bar VUELTA is a craft cocktail bar in Otemachi, Naka-ku, Hiroshima — a 1-minute
            walk from the Chuden-mae tram stop. Open 18:00 to 02:00, closed Thursdays.
          </p>
        </header>

        {/* Category index */}
        <nav aria-label="FAQ categories" className="max-w-3xl mx-auto px-4 sm:px-6 mb-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {groups.map(({ category }) => (
              <li key={category.key}>
                <a
                  href={`#${category.key}`}
                  className="font-annam text-xs uppercase tracking-[.2em] text-vuelta-text-light hover:text-vuelta-gold transition-colors"
                >
                  {category.titleEn}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          {groups.map(({ category, entries }) => (
            <section key={category.key} id={category.key} className="mb-14 md:mb-16 scroll-mt-24">
              <h2 className="font-annam text-2xl sm:text-3xl tracking-wide border-b border-vuelta-gold/30 pb-2 mb-8">
                {category.titleEn}
              </h2>
              <div className="space-y-8">
                {entries.map((f) => (
                  <article key={f.id} id={f.id} className="scroll-mt-24">
                    <h3 className="font-japanese text-base sm:text-lg font-medium mb-2">
                      {f.en.q}
                    </h3>
                    <p className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed">
                      {f.en.a}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* Contact fallback + CTA */}
          <div className="border-t border-vuelta-light pt-10 text-center">
            <p className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed max-w-xl mx-auto mb-8">
              Did not find your answer? Ask us on Instagram or simply drop by — walk-ins are
              always welcome.
            </p>
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-vuelta-gold text-white rounded-full hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider uppercase"
            >
              Reserve a Seat
            </a>
          </div>
        </div>
      </main>
      <SiteFooter lang="en" />
    </>
  )
}
