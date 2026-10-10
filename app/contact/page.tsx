import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_ORIGIN, RESERVATION_URL, CONTACT_EMAIL } from '@/lib/site-seo'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata: Metadata = {
  title: 'Contact — Bar VUELTA | Craft Cocktail Bar in Hiroshima',
  description:
    'Contact Bar VUELTA in Hiroshima. Email us about private hire for small groups, special requests, or any questions.',
  alternates: {
    canonical: `${SITE_ORIGIN}/contact`,
    languages: {
      en: `${SITE_ORIGIN}/contact`,
      ja: `${SITE_ORIGIN}/ja/contact`,
      'x-default': `${SITE_ORIGIN}/contact`,
    },
  },
  openGraph: {
    title: 'Contact — Bar VUELTA',
    description: 'Private hire, special requests, or a question. Email us.',
    url: `${SITE_ORIGIN}/contact`,
    siteName: 'Bar VUELTA',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_ORIGIN}/images/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'Bar VUELTA — Craft cocktail bar in Hiroshima',
      },
    ],
  },
}

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Bar VUELTA Inquiry')}`

const TOPICS = [
  { en: 'Private hire', body: 'Small groups welcome. Tell us the date, how many of you, and roughly what time.' },
  { en: 'Requests', body: 'An anniversary, an allergy, anything you would like us to know before you come.' },
  { en: 'Questions', body: 'Anything about the bar.' },
]

export default function ContactPage() {
  return (
    <>
      <SiteHeader lang="en" />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-vuelta-text outline-none">
        <header className="pt-24 pb-10 md:pt-32 md:pb-14 px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← Bar VUELTA
          </Link>
          <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            Contact
          </h1>
          <p className="font-japanese text-vuelta-text-light text-sm sm:text-base mt-6 max-w-md mx-auto leading-relaxed">
            Private hire for a small group, a special request, or just a question. Send us an email.
          </p>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
          <dl className="border-t border-vuelta-gold/30">
            {TOPICS.map((t) => (
              <div key={t.en} className="border-b border-vuelta-gold/30 py-6 sm:py-7 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="mb-2 sm:mb-0">
                  <span className="block font-annam text-base sm:text-lg tracking-wide text-vuelta-gold">{t.en}</span>
                </dt>
                <dd className="font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed sm:pt-0.5">
                  {t.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="text-center mt-14">
            <p className="font-annam text-xs uppercase tracking-[.3em] text-vuelta-text-light mb-4">Email</p>
            <a
              href={MAILTO}
              className="font-annam text-lg sm:text-2xl tracking-wide text-vuelta-gold border-b border-vuelta-gold/40 pb-1 hover:border-vuelta-gold transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="font-japanese text-xs sm:text-sm text-vuelta-text-light leading-relaxed mt-10">
              For a table tonight, the
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-vuelta-gold underline underline-offset-4 decoration-vuelta-gold/30 hover:decoration-vuelta-gold mx-1"
              >
                booking page
              </a>
              is quicker.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter lang="en" />
    </>
  )
}
