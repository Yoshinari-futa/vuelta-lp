'use client'

import {
  BAR_LOGO_IMAGE_URL,
  MAPS_EMBED_URL,
  MAPS_SEARCH_URL,
  POSTAL_CODE,
  SITE_ORIGIN,
  STORE_PHONE_SCHEMA,
  RESERVATION_URL,
  barSameAsUrls,
  barStructuredDataId,
  barStructuredDataUrl,
  footerGoogleHref,
  footerTripAdvisorHref,
  isGoogleBusinessProfileConfigured,
} from '@/lib/site-seo'
import { featuredFaqs } from '@/lib/faqData'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { blurDataUrl } from '@/lib/blurPlaceholders'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import MobileReserveCta from './components/MobileReserveCta'

// Header Component

// Animation component with enhanced scroll animations
const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80 // ヘッダーの高さ（px）
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // 営業時間の計算
  const getCurrentHours = () => {
    const now = new Date()
    const day = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours()
    
    // Thursday (4) は閉店
    if (day === 4) return { isOpen: false, status: 'Closed Today' }
    
    // Wed, Fri-Sun, Mon-Tue: 18:00 - 02:00
    if (hour >= 18 || hour < 2) {
      return { isOpen: true, status: 'Open Now' }
    }
    return { isOpen: false, status: 'Opens at 18:00' }
  }

  const hoursStatus = getCurrentHours()

  const faqs = featuredFaqs.map((f) => ({ q: f.en.q, a: f.en.a }))

  // Structured Data for SEO — BarOrPub + WebSite
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "@id": barStructuredDataId('en'),
      "name": "Bar VUELTA",
      "alternateName": "VUELTA Craft Cocktail Bar",
      "url": barStructuredDataUrl('en'),
      "description": "Speakeasy-style craft cocktail bar in Hiroshima city center, 1 min walk from Chuden-mae Station. Signature cocktails using local Hiroshima ingredients like Sakurao Gin and Hiroshima lemon. English spoken, walk-ins welcome.",
      "image": [
        BAR_LOGO_IMAGE_URL,
        `${SITE_ORIGIN}/images/interior.png`,
        `${SITE_ORIGIN}/images/cocktails/okonomiyaki.png`,
        `${SITE_ORIGIN}/images/cocktails/shellwe.png`,
      ],
      "logo": BAR_LOGO_IMAGE_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3-3-5 Otemachi, Naka-ku, Kakee Building 201",
        "addressLocality": "Hiroshima",
        "addressRegion": "Hiroshima Prefecture",
        "postalCode": POSTAL_CODE,
        "addressCountry": "JP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "34.3893126",
        "longitude": "132.4541761"
      },
      "hasMap": "https://www.google.com/maps/place/VUELTA/@34.3893126,132.4516012,17z/data=!3m1!4b1!4m6!3m5!1s0x355aa37721226999:0xf75145855610694e!8m2!3d34.3893126!4d132.4541761!16s%2Fg%2F11n52pm3sh",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
          "opens": "18:00",
          "closes": "02:00"
        }
      ],
      "priceRange": "¥¥",
      "currenciesAccepted": "JPY",
      "servesCuisine": ["Craft Cocktails", "Finger Food", "Tacos"],
      "menu": "https://www.vuelta.jp/menu",
      "sameAs": barSameAsUrls(),
      "telephone": STORE_PHONE_SCHEMA,
      "acceptsReservations": true,
      "smokingAllowed": true,
      "potentialAction": {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": RESERVATION_URL,
          "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
        },
        "result": {
          "@type": "Reservation",
          "name": "Table Reservation"
        }
      },
      "paymentAccepted": "Cash, Credit Card, Electronic Money",
      "areaServed": {
        "@type": "City",
        "name": "Hiroshima"
      },
      "knowsLanguage": ["en", "ja"],
      "foundingDate": "2026-03-15",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": 3
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Bar VUELTA",
      "url": "https://www.vuelta.jp",
      "inLanguage": ["en", "ja"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${barStructuredDataUrl('en')}#faq`,
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Performance Optimization */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      
      {/* Header */}
      <SiteHeader lang="en" />
      
      <div id="main-content" tabIndex={-1}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24" aria-label="Hero section">
        {/* Background */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_0%,rgba(18,41,31,0.06),transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex flex-col items-center">
            {/* Text Content */}
            <div className="text-center mb-6 md:mb-12 w-full px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-annam text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.08em] md:tracking-[0.12em] mb-4 md:mb-6 text-balance"
              >
                V U E L T A
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="font-sans text-base sm:text-lg md:text-xl text-vuelta-text-light tracking-wider uppercase mb-4 md:mb-6 leading-relaxed max-w-3xl mx-auto px-2"
              >
                Where welcome back meets nice to meet you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-sans text-sm sm:text-base md:text-lg text-vuelta-text-light mb-6 md:mb-4 leading-relaxed max-w-2xl mx-auto px-2 text-pretty"
              >
                An intimate craft cocktail bar in central Hiroshima — 1 min from Chuden-mae, walking distance from the Peace Park. Local Japanese spirits, real local stories.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 md:mb-12 w-full max-w-md sm:max-w-none mx-auto px-4"
              >
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                  aria-label="Reserve online"
                >
                  Reserve
                </a>
                <Link
                  href="/menu"
                  className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                  aria-label="View full menu"
                >
                  View Menu
                </Link>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-vuelta-text-light mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-vuelta-gold shadow-[0_0_8px_rgba(26,58,46,0.55)]" aria-hidden="true"></span>
                Open 18:00 – 02:00 / Closed Thu
              </motion.p>
            </div>

            {/* Image - Below VUELTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="w-full max-w-5xl"
            >
              <div className="relative aspect-video rounded-md overflow-hidden shadow-[0_30px_70px_-30px_rgba(18,41,31,0.45)] bg-vuelta-gray group">
                <Image
                  src="/images/hero.png"
                  alt="VUELTA - Pink cocktail with sakura garnish"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ objectPosition: '45% center' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                  priority
                  placeholder="blur"
                  blurDataURL={blurDataUrl('/images/hero.png')}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border border-vuelta-text-light rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-vuelta-text-light rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Info bar — key facts at a glance */}
      <div className="border-y border-vuelta-light/60 bg-white" aria-label="Key information">
        <ul className="flex flex-wrap justify-center items-center px-4 sm:px-6 py-4 list-none">
          <li className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-vuelta-gold px-4 sm:px-7 py-1 whitespace-nowrap">Open 18:00 – 02:00 / Closed Thu</li>
          <li className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">1 min from Chuden-mae</li>
          <li className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">Counter 8 / Standing 8</li>
          <li className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">Walk-ins welcome</li>
          <li className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">English friendly</li>
        </ul>
      </div>

      {/* About Section（旧 Brand Concept + Mission を統合） */}
      <section id="about" className="py-12 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20" aria-label="About VUELTA">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <FadeInUp>
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-vuelta-gold">
                About<span className="inline-block w-2 sm:w-4 md:w-8"></span>V U E L T A
              </h2>
              <div className="space-y-5 md:space-y-6 text-vuelta-text-light font-sans text-base md:text-lg leading-loose text-pretty">
                <p className="text-xl text-vuelta-gold-light font-semibold leading-snug">
                  In Hiroshima — where welcome back meets nice to meet you.
                </p>
                <p>
                  1 minute from Chuden-mae, tucked on the 2nd floor of the Kakee Building. A small counter-led space where you can sip seriously crafted cocktails in calm.
                </p>
                <p>
                  VUELTA means reunion, return, cycle in Spanish. We built this place for travellers and locals to meet over a glass — and feel the real Hiroshima.
                </p>
              </div>
              <div className="pt-6 md:pt-8 border-t border-vuelta-gray space-y-5 md:space-y-6">
                <p className="font-annam text-xl sm:text-2xl md:text-3xl font-light text-vuelta-gold-light italic leading-snug">
                  Food is the Invitation,<br />
                  People are the Destination.
                </p>
                <p className="font-sans text-base md:text-lg leading-loose text-vuelta-text-light text-pretty">
                  SAKURAO Gin from Hatsukaichi, Togouchi whisky, Hiroshima lemon, Kamotsuru sake — local spirits and ingredients, fused with bar culture from around the world. Try our signatures: <span className="text-vuelta-gold font-medium">The OKONOMIYAKI</span> (Hiroshima soul food in a glass) and <span className="text-vuelta-gold font-medium">Shell We?</span> (Hiroshima oysters, the sea in a glass).
                </p>
                <p className="font-sans text-base md:text-lg leading-loose text-vuelta-gold-light text-pretty">
                  The cocktail is the means. Connection is the goal.
                </p>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group rounded-lg">
              <Image
                src="/images/interior.png"
                alt="VUELTA interior - Kakee Building 201 entrance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurDataUrl('/images/interior.png')}
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500" />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-12 md:py-32 px-4 sm:px-6 bg-vuelta-gray scroll-mt-20" aria-label="Menu">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-12 md:mb-20 px-4">
              <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-vuelta-gold mb-3">Signature Cocktails</p>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4">
                Menu
              </h2>
              <p className="font-sans text-vuelta-text-light tracking-wider text-sm sm:text-base">
                Crafted with Precision.
              </p>
            </div>
          </FadeInUp>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto items-stretch">
            {[
              { name: 'Shell We?', description: 'The very first cocktail we created—our origin. Hiroshima\'s oysters, the sea in a glass. The name is a pun: "Shall we?" meets oyster "Shell." SAKURAO Gin and house-made dashi vinegar. Shall we toast?', price: '¥1,600', tag: 'Signature', image: '/images/cocktails/shellwe.png' },
              { name: 'The OKONOMIYAKI', description: 'Hiroshima\'s soul food, reimagined as a cocktail. The umami depth of dashi, Otafuku sauce, and tomato create an authentic local flavor you won\'t find anywhere else.', price: '¥1,200', tag: 'Signature', image: '/images/cocktails/okonomiyaki.png', objectPosition: 'center 55%' },
              { name: '26 hours', description: 'We stay open until the 26th hour—2 AM. Crystal-clear tomato and cucumber, light minerals. Refreshing enough to keep the magic alive until last call.', price: '¥1,250', tag: 'Late pour', image: '/images/cocktails/26hours.png', objectPosition: 'center center' },
              {
                name: 'Spring Bloom Margarita',
                description:
                  'Cherry blossom in a glass—silver tequila, sakura liqueur, and fresh lemon, kissed with sakura petal. A seasonal margarita with Hiroshima heart, often served in a traditional masu.',
                price: '¥1,000',
                tag: 'Seasonal',
                image: '/images/cocktails/sakura-margarita.png',
                objectPosition: 'center 42%',
              },
            ].map((item, index) => {
              return (
                <FadeInUp key={index} delay={index * 0.1}>
                  <div className="group relative h-full flex flex-col bg-white border border-vuelta-light rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(18,41,31,0.35)]" role="article" aria-label={`${item.name} cocktail`}>
                    <div className="relative aspect-square bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white overflow-hidden focus-within:ring-2 focus-within:ring-vuelta-gold focus-within:ring-offset-2">
                      {item.image && !imageErrors[index] ? (
                        <>
                          <Image
                            src={item.image}
                            alt={`${item.name} cocktail`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={index < 2 ? 'eager' : 'lazy'}
                            placeholder="blur"
                            blurDataURL={blurDataUrl(item.image)}
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [index]: true }))
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 border border-vuelta-gold/30 rounded-full mx-auto mb-2 flex items-center justify-center" aria-hidden="true">
                                <span className="text-vuelta-gold text-2xl">🥃</span>
                              </div>
                              <span className="text-vuelta-text-light text-xs">{item.name}</span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" aria-hidden="true">
                            <span className="text-white font-annam text-xl bg-vuelta-gold/90 px-4 py-2 rounded backdrop-blur-sm">{item.price}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      <h3 className="font-annam text-xl sm:text-2xl mb-2 group-hover:text-vuelta-gold transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="font-sans text-vuelta-text-light text-[13.5px] leading-relaxed flex-1">
                        {item.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-dashed border-vuelta-light flex justify-between items-center">
                        <span className="font-mono text-sm tracking-wide text-vuelta-gold tabular-nums">{item.price}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-vuelta-text-light">{item.tag}</span>
                      </div>
                    </div>
                  </div>
                </FadeInUp>
              )
            })}
          </div>
          <div className="text-center mt-10 md:mt-14">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[48px] w-full max-w-sm mx-auto sm:w-auto sm:max-w-none touch-manipulation bg-vuelta-gold text-white hover:bg-vuelta-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-annam text-sm uppercase tracking-wider rounded shadow-lg shadow-vuelta-gold/20"
            >
              <span>View Full Menu</span>
              <svg className="w-5 h-5 opacity-90 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the Manager Section */}
      <section id="manager" className="py-12 md:py-32 px-4 sm:px-6 scroll-mt-20" aria-label="Meet the Manager">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[250px_minmax(0,1fr)] gap-8 md:gap-14 items-center">
            <FadeInUp>
              <div>
                <div className="relative aspect-[3/4] max-w-[250px] mx-auto md:mx-0 overflow-hidden rounded-md shadow-[0_24px_60px_-28px_rgba(18,41,31,0.45)]">
                  <Image
                    src="/images/manager-yuta.png"
                    alt="Yuta Miyake - VUELTA Manager"
                    fill
                    className="object-cover object-center"
                    sizes="250px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={blurDataUrl('/images/manager-yuta.png')}
                  />
                </div>
                <div className="flex justify-between max-w-[250px] mx-auto md:mx-0 pt-3 font-mono text-[10px] tracking-[0.2em] uppercase text-vuelta-text-light">
                  <span>Manager</span>
                  <span>@yuji_miyake</span>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <div className="text-center md:text-left space-y-3 md:space-y-4">
                <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-vuelta-gold">Meet the Manager</p>
                <h3 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light">
                  Yuta Miyake
                </h3>
                <p className="font-mono text-[11px] text-vuelta-gold uppercase tracking-[0.28em]">
                  Manager — born and raised in Hiroshima
                </p>
                <div className="space-y-3 md:space-y-4 font-sans text-base sm:text-lg text-vuelta-text-light leading-relaxed text-pretty max-w-xl md:mx-0 mx-auto">
                  <p>
                    Hey, I'm Yuta — most people call me Yuji. Born and raised here. I'd love to show you the <span className="text-vuelta-gold font-semibold">real Hiroshima</span> we actually hang out in, not the tourist version.
                  </p>
                  <p className="text-vuelta-gold italic">
                    My English is still a work in progress. Come sit down — we'll make it work together.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="https://www.instagram.com/yuji_miyake"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-annam text-sm uppercase tracking-wider rounded group"
                  >
                    Meet @yuji_miyake
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* FIRST DRINK PASS — floating paper ticket */}
      <section className="py-14 md:py-24 px-4 sm:px-6 bg-white" aria-label="First Drink Pass">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-10 md:mb-12">
              <p className="font-annam text-sm uppercase tracking-[0.3em] text-vuelta-gold mb-2">Membership</p>
              <h2 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-text mb-3">
                Your first drink is on us. Every visit.
              </h2>
              <p className="font-sans text-sm text-vuelta-text-light tracking-wide">
                来店のたびに一杯目が無料になる、月額パス。
              </p>
            </div>
            <div className="relative max-w-3xl mx-auto grid sm:grid-cols-[minmax(0,1fr)_190px] bg-white border border-vuelta-light rounded shadow-[0_44px_90px_-36px_rgba(26,58,46,0.42),0_18px_40px_-22px_rgba(26,58,46,0.3)] hover:-translate-y-1.5 hover:shadow-[0_56px_100px_-36px_rgba(26,58,46,0.48),0_24px_48px_-22px_rgba(26,58,46,0.34)] transition-all duration-300">
              <span className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white ring-1 ring-vuelta-light" aria-hidden="true"></span>
              <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white ring-1 ring-vuelta-light" aria-hidden="true"></span>
              <div className="p-8 sm:p-11 text-left">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.34em] text-vuelta-gold mb-2">Membership — First Drink Pass</p>
                <h3 className="font-annam text-3xl sm:text-4xl font-normal tracking-wide mb-3">FIRST DRINK PASS</h3>
                <p className="font-sans text-[15px] text-vuelta-text-light mb-6 max-w-md">
                  One free drink daily for ¥1,980/month. Your new reason to come back. VUELTA means return — this is the ticket.
                </p>
                <Link
                  href="/subscription"
                  className="inline-flex items-center gap-3 px-8 py-3.5 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-annam text-sm uppercase tracking-wider rounded group"
                >
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-dashed border-vuelta-light flex flex-col items-center justify-center gap-1 p-6 font-mono uppercase">
                <span className="text-[10px] tracking-[0.3em] text-vuelta-gold">Admit one, daily</span>
                <span className="text-3xl text-vuelta-text tabular-nums">¥1,980</span>
                <span className="text-[10px] tracking-[0.3em] text-vuelta-gold">per month</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* For International Guests Section */}
      <section className="py-12 md:py-32 px-4 sm:px-6 bg-vuelta-gray" aria-label="Welcome International Guests">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4 text-vuelta-gold px-4">
              Welcome International Guests
            </h2>
            <p className="font-sans text-base sm:text-lg text-vuelta-text-light max-w-2xl mx-auto px-4 leading-relaxed text-pretty">
              Where locals actually go after the Peace Park. Pull up a stool and we'll show you the real Hiroshima.
            </p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-14">
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">English Friendly</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base text-pretty">
                  Our English isn't perfect, but we'll figure it out together.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Cards Accepted</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base text-pretty">
                  Visa, Mastercard, AMEX, and cash all welcome.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Free Wi-Fi</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base text-pretty">
                  Stay connected and share your night with us.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Location/Access Section */}
      <section id="reservation" className="py-12 md:py-32 px-4 sm:px-6 scroll-mt-20" aria-label="Visit Us">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <FadeInUp>
              <div className="space-y-6 md:space-y-8">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-0">
                  Visit Us
                </h2>
                <div className="space-y-5 md:space-y-6 font-sans text-sm sm:text-base text-vuelta-text-light">
                  <div>
                    <p className="font-annam text-2xl sm:text-3xl font-light text-vuelta-text mb-3">Bar VUELTA</p>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Address
                    </h3>
                    <a
                      href={MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
                    >
                      {POSTAL_CODE}<br />
                      Kakee Building 201<br />
                      3-3-5 Otemachi, Naka-ku<br />
                      Hiroshima, Hiroshima Prefecture, Japan
                    </a>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Access
                    </h3>
                    <div className="space-y-3 text-base sm:text-lg">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span>1 minute on foot from Chuden-mae Station — you&apos;ll arrive right here.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span>Located in the heart of Hiroshima city center</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Hours (JST)
                    </h3>
                    <div className="flex gap-1.5 max-w-[340px] mb-3" aria-label="Open every day except Thursday">
                      {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map((d) => (
                        d === 'Thu' ? (
                          <span key={d} className="flex-1 text-center font-mono text-[10.5px] py-2 rounded border border-dashed border-[#d9c3bc] text-[#9c5844] line-through">
                            {d}
                          </span>
                        ) : (
                          <span key={d} className="flex-1 text-center font-mono text-[10.5px] py-2 rounded border border-vuelta-gold/30 bg-vuelta-gold/5 text-vuelta-gold">
                            {d}
                          </span>
                        )
                      ))}
                    </div>
                    <p className="text-lg tabular-nums">
                      18:00 – 02:00<br />
                      <span className="text-sm text-vuelta-text-light">Last order 01:00</span><br />
                      <span className="text-sm text-[#9c5844]">Closed on Thursdays</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Capacity
                    </h3>
                    <p className="text-base sm:text-lg">
                      Counter: 8 seats<br />
                      Standing area: 8 seats<br />
                      <span className="text-sm text-vuelta-text-light">Intimate atmosphere for conversation.</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Reservations
                    </h3>
                    <p className="text-base sm:text-lg mb-4">
                      Walk-ins welcome. For groups or guaranteed seating, book online.<br />
                      <span className="text-sm text-vuelta-text-light">We&apos;ll do our best in English.</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                      {/* Reserve online */}
                      <a
                        href={RESERVATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2"
                        aria-label="Reserve online"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
                        </svg>
                        <span>Reserve</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] bg-vuelta-gray overflow-hidden rounded-lg group cursor-pointer">
                  <iframe
                    src={MAPS_EMBED_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500"
                    title="VUELTA Location"
                    aria-label="VUELTA location map"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-24 px-4 sm:px-6 border-t border-vuelta-gray" aria-label="Frequently asked questions">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light mb-8 md:mb-12 text-center">
            FAQ
          </h2>
          <div className="border-t border-vuelta-light">
            {faqs.map((f, i) => (
              <details key={f.q} className="group border-b border-vuelta-light/70" open={i === 0}>
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-baseline gap-5 py-5 font-annam text-base sm:text-lg tracking-wide">
                  <span>{f.q}</span>
                  <span className="font-mono text-vuelta-gold shrink-0" aria-hidden="true">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&ndash;</span>
                  </span>
                </summary>
                <p className="pb-6 font-sans text-sm sm:text-base text-vuelta-text-light leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
            <div className="mt-8 text-center">
              <Link href="/faq" className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-wider uppercase">
                View All Questions →
              </Link>
            </div>
        </div>
      </section>

      {/* Footer — pine */}
            <SiteFooter lang="en" />

      {/* Fixed CTA Button */}
      <MobileReserveCta href={RESERVATION_URL} label="Reserve" ariaLabel="Reserve online" />

      {/* Fixed CTA Button - Desktop */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="hidden md:block fixed bottom-8 right-8 z-50"
      >
        <a
          href={RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-4 bg-vuelta-gold text-white rounded-full shadow-xl hover:bg-vuelta-gold-light hover:shadow-2xl transition-all duration-300 font-annam text-sm tracking-wider uppercase"
          aria-label="Reserve online"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
          </svg>
          <span>Reserve</span>
        </a>
      </motion.div>
      </div>
    </main>
  )
}

