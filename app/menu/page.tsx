import type { Metadata } from 'next'
import Link from 'next/link'
import {
  coverCharge,
  foodCategories,
  signatureCocktails,
  cocktails,
  recommend,
  spiritsCategories,
  type MenuCategory,
  type MenuItem,
} from '@/lib/menuData'
import { RESERVATION_URL, SITE_ORIGIN } from '@/lib/site-seo'

// ── SEO Metadata ──────────────────────────
export const metadata: Metadata = {
  title: 'Menu — VUELTA | Craft Cocktail Bar in Hiroshima',
  description:
    'Explore VUELTA\'s full cocktail and food menu. Signature cocktails crafted with Hiroshima local ingredients — SAKURAO Gin, Kamotsuru Sake, Gansu Tacos, and more. Prices in JPY.',
  keywords:
    'VUELTA menu, Hiroshima cocktail menu, craft cocktails Hiroshima, bar menu Japan, Hiroshima bar food, Japanese whisky, sake Hiroshima',
  alternates: {
    canonical: `${SITE_ORIGIN}/menu`,
    languages: {
      en: `${SITE_ORIGIN}/menu`,
      ja: `${SITE_ORIGIN}/menu`,
      'x-default': `${SITE_ORIGIN}/menu`,
    },
  },
  openGraph: {
    title: 'Menu — VUELTA Craft Cocktail Bar',
    description:
      'Signature cocktails and Hiroshima soul food. The OKONOMIYAKI, Shell We?, Gansu Tacos and more.',
    url: `${SITE_ORIGIN}/menu`,
    siteName: 'VUELTA',
    locale: 'en_US',
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
    title: 'Menu — VUELTA Craft Cocktail Bar',
    description:
      'Signature cocktails and Hiroshima soul food. The OKONOMIYAKI, Shell We?, Gansu Tacos and more.',
    images: [`${SITE_ORIGIN}/images/ogp.png`],
  },
  robots: { index: true, follow: true },
}

// ── BreadcrumbList ────────────────────────
function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ── Structured Data (JSON-LD) ─────────────
function MenuJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'VUELTA Menu',
    description: 'Craft cocktails and Hiroshima soul food',
    url: `${SITE_ORIGIN}/menu`,
    mainEntity: {
      '@type': 'Restaurant',
      name: 'VUELTA',
      url: SITE_ORIGIN,
      servesCuisine: ['Cocktails', 'Japanese Bar Food', 'Hiroshima Local'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kakee Building 201, 3-3-5 Otemachi, Naka-ku',
        addressLocality: 'Hiroshima',
        addressRegion: 'Hiroshima',
        postalCode: '730-0051',
        addressCountry: 'JP',
      },
    },
    hasMenuSection: [
      ...foodCategories.map((cat) => ({
        '@type': 'MenuSection',
        name: cat.title,
        hasMenuItem: cat.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description ?? item.nameJa ?? '',
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'JPY',
          },
        })),
      })),
      {
        '@type': 'MenuSection',
        name: signatureCocktails.title,
        hasMenuItem: signatureCocktails.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description ?? item.ingredients ?? '',
          offers: { '@type': 'Offer', price: item.price, priceCurrency: 'JPY' },
        })),
      },
      {
        '@type': 'MenuSection',
        name: cocktails.title,
        hasMenuItem: cocktails.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.ingredients ?? item.description ?? '',
          offers: { '@type': 'Offer', price: item.price, priceCurrency: 'JPY' },
        })),
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ── Price formatter ───────────────────────
function fmtPrice(item: MenuItem) {
  if (item.priceLabel) return `¥${item.priceLabel}`
  return `¥${item.price.toLocaleString()}`
}

// ── Reusable Section Component ────────────
function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <div className="mb-14 md:mb-20">
      <h2 className="font-annam text-2xl sm:text-3xl md:text-4xl tracking-wide mb-1">
        {category.title}
      </h2>
      {category.subtitle && (
        <p className="font-sans text-xs sm:text-sm text-vuelta-text-light mb-6">
          {category.subtitle}
        </p>
      )}
      {!category.subtitle && <div className="mb-6" />}

      <div className="space-y-5">
        {category.items.map((item) => (
          <div key={item.name} className="group">
            {/* Name + Price */}
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-annam text-base sm:text-lg md:text-xl leading-snug">
                {item.name}
              </h3>
              <span className="flex-shrink-0 font-sans text-sm sm:text-base tabular-nums text-vuelta-gold font-medium">
                {fmtPrice(item)}
              </span>
            </div>

            {/* Japanese name */}
            {item.nameJa && (
              <p className="font-asebi text-xs text-vuelta-text-light mt-0.5">
                {item.nameJa}
              </p>
            )}

            {/* Ingredients (cocktails) */}
            {item.ingredients && (
              <p className="font-sans text-xs sm:text-sm text-vuelta-text-light mt-1 tracking-wide">
                {item.ingredients}
              </p>
            )}

            {/* Description */}
            {item.description && (
              <p className="font-sans text-xs sm:text-sm text-vuelta-text-light mt-1 leading-relaxed">
                {item.description}
              </p>
            )}
            {item.descriptionJa && (
              <p className="font-asebi text-xs text-vuelta-text-light mt-0.5 leading-relaxed">
                {item.descriptionJa}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────
export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.vuelta.jp' },
        { name: 'Menu', url: 'https://www.vuelta.jp/menu' },
      ]} />

      <a href="#main-content" className="skip-link">
        Skip to menu
      </a>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-vuelta-text outline-none">
        {/* Hero */}
        <header className="pt-24 pb-10 md:pt-32 md:pb-16 px-4 sm:px-6 text-center">
          <Link
            href="/"
            className="inline-block font-annam text-sm uppercase tracking-[.3em] text-vuelta-text-light hover:text-vuelta-gold transition-colors mb-6"
          >
            ← VUELTA
          </Link>
          <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide">
            Menu
          </h1>
          <p className="font-sans text-vuelta-text-light text-sm sm:text-base mt-3 max-w-md mx-auto">
            All prices in JPY (tax included). Menu may change with seasonal availability.
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          {/* ---- COVER CHARGE ---- */}
          <div className="mb-16">
            <div className="border-b border-vuelta-gold/30 mb-10 pb-2">
              <span className="font-annam text-xs uppercase tracking-[.25em] text-vuelta-gold">
                Cover Charge
              </span>
            </div>
            <MenuSection category={coverCharge} />
          </div>

          {/* ---- FOOD ---- */}
          <div className="mb-20">
            <div className="border-b border-vuelta-gold/30 mb-10 pb-2">
              <span className="font-annam text-xs uppercase tracking-[.25em] text-vuelta-gold">
                Food
              </span>
            </div>
            {foodCategories.map((cat) => (
              <MenuSection key={cat.title} category={cat} />
            ))}
          </div>

          {/* ---- SIGNATURE COCKTAILS ---- */}
          <div className="mb-20">
            <div className="border-b border-vuelta-gold/30 mb-10 pb-2">
              <span className="font-annam text-xs uppercase tracking-[.25em] text-vuelta-gold">
                Drinks
              </span>
            </div>
            <MenuSection category={recommend} />
            <MenuSection category={signatureCocktails} />
            <MenuSection category={cocktails} />
          </div>

          {/* ---- SPIRITS / BEER / WINE ---- */}
          <div className="mb-20">
            <div className="border-b border-vuelta-gold/30 mb-10 pb-2">
              <span className="font-annam text-xs uppercase tracking-[.25em] text-vuelta-gold">
                Spirits and More
              </span>
            </div>
            {spiritsCategories.map((cat) => (
              <MenuSection key={cat.title} category={cat} />
            ))}
          </div>

          {/* ---- PDF Download ---- */}
          <div className="text-center border-t border-vuelta-gray pt-10">
            <p className="font-sans text-vuelta-text-light text-sm mb-4">
              Prefer a printable version?
            </p>
            <a
              href="/VUELTA-menu.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded font-annam text-sm uppercase tracking-wider"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF Menu
            </a>
          </div>

          {/* ---- CTA: Reservation ---- */}
          <div className="text-center mt-16 space-y-3">
            <p className="font-annam text-xl sm:text-2xl">
              Ready to visit?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={RESERVATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded font-annam text-sm uppercase tracking-wider"
                aria-label="Reserve via Instagram DM"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Reserve via DM
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
