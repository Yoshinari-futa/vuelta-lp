'use client'

import { SITE_ORIGIN, POSTAL_CODE, RESERVATION_URL } from '@/lib/site-seo'
import { MENU_DRIVE_URL } from '@/lib/menuUrl'
import { blurDataUrl } from '@/lib/blurPlaceholders'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const STRIPE_LINK = 'https://buy.stripe.com/cNi7sK0NG9yL7k5cMk6Zy02'

// Header — 英語トップ / と同一（ハンバーガー＋言語切替）
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isRecruitPage = pathname === '/recruit'
  const isEnHome = pathname === '/'
  const isSubscriptionPage = pathname === '/subscription'

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <header className={`site-header-fixed fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b ${isRecruitPage ? 'border-vuelta-gold/20' : 'border-vuelta-gray/50'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="transition-opacity hover:opacity-80"
            aria-label="VUELTA Home"
          >
            <Image
              src="/images/vuelta-logo.png"
              alt="VUELTA"
              width={250}
              height={85}
              className="h-8 md:h-10 w-auto object-contain"
              priority
              placeholder="blur"
              blurDataURL={blurDataUrl('/images/vuelta-logo.png')}
            />
          </a>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-vuelta-gray/40 pr-4 min-w-[3rem] flex-shrink-0">
              <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">EN</span>
              <span className="text-vuelta-gray/60 text-xs flex-shrink-0">/</span>
              <a
                href="/ja"
                className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center inline-block"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('vuelta-language', 'ja')
                  router.push(pathname === '/subscription' ? '/ja/subscription' : '/ja')
                }}
              >
                JA
              </a>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-3 min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded transition-all"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-px transition-all duration-300 ${isRecruitPage ? 'bg-vuelta-gold' : 'bg-vuelta-text'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 ${isRecruitPage ? 'bg-vuelta-gold' : 'bg-vuelta-text'} ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 ${isRecruitPage ? 'bg-vuelta-gold' : 'bg-vuelta-text'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`mt-6 pt-6 border-t ${isRecruitPage ? 'border-vuelta-gold/20' : 'border-vuelta-gray/20'}`}
              aria-label="Main navigation"
            >
              <div className="flex flex-col">
                <a href={isEnHome ? '#about' : '/#about'} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (isEnHome) handleAnchorClick(e, '#about'); setIsMenuOpen(false) }}>About</a>
                <a
                  href={MENU_DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </a>
                <a href={isEnHome ? '#manager' : '/#manager'} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (isEnHome) handleAnchorClick(e, '#manager'); setIsMenuOpen(false) }}>Manager</a>
                <a href={isEnHome ? '#reservation' : '/#reservation'} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (isEnHome) handleAnchorClick(e, '#reservation'); setIsMenuOpen(false) }}>Visit Us</a>
                <a href="/recruit" className={`font-annam text-sm transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center ${isRecruitPage ? 'text-vuelta-gold' : 'text-vuelta-text-light hover:text-vuelta-gold'}`} onClick={() => setIsMenuOpen(false)}>Recruit</a>
                <a href="/subscription" className={`font-annam text-sm transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center ${isSubscriptionPage ? 'text-vuelta-gold' : 'text-vuelta-text-light hover:text-vuelta-gold'}`} onClick={() => setIsMenuOpen(false)}>First Drink Pass</a>
                <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center mt-4 pt-4 border-t border-vuelta-gray/20" onClick={() => setIsMenuOpen(false)}>Reserve via DM</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

// Animation component
const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function SubscriptionPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "FIRST DRINK PASS",
    "description": "Monthly subscription for one free drink per day at VUELTA cocktail bar in Hiroshima.",
    "image": `${SITE_ORIGIN}/images/ogp.png`,
    "brand": { "@type": "Brand", "name": "VUELTA" },
    "offers": {
      "@type": "Offer",
      "price": "1980",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock",
      "url": STRIPE_LINK,
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "JP",
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
        "merchantReturnDays": 0,
        "description": "Digital subscription — cancel anytime, no refunds for the current billing period.",
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "JPY",
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "JP",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "d",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 0,
            "maxValue": 0,
            "unitCode": "d",
          },
        },
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      <main className="min-h-screen bg-white pt-20 md:pt-24">
        {/* Hero */}
        <section className="py-16 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-vuelta-gold/5 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <p className="font-annam text-sm uppercase tracking-[0.3em] text-vuelta-gold mb-4">Membership</p>
              <h1 className="font-annam text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-vuelta-text leading-tight">
                FIRST DRINK PASS
              </h1>
              <p className="font-sans text-lg sm:text-xl text-vuelta-text-light mt-6 max-w-2xl mx-auto leading-relaxed">
                Your first drink, on us — every single visit.<br className="hidden sm:block" />
                A simple monthly pass that makes coming back even better.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Price Card */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <FadeInUp>
              <div className="bg-white rounded-xl border-2 border-vuelta-gold/30 overflow-hidden shadow-lg">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-vuelta-gold/15 to-vuelta-gold/5 px-6 sm:px-10 py-8 sm:py-10 text-center border-b border-vuelta-gold/20">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-annam text-5xl sm:text-6xl md:text-7xl font-light text-vuelta-gold">¥1,980</span>
                    <span className="font-sans text-base sm:text-lg text-vuelta-text-light">/month</span>
                  </div>
                  <p className="font-sans text-sm text-vuelta-text-light mt-3">Cancel anytime. No commitment.</p>
                </div>

                {/* Benefits Grid */}
                <div className="px-6 sm:px-10 py-8 sm:py-10">
                  <div className="grid sm:grid-cols-3 gap-8">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                          <svg className="w-7 h-7 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-annam text-xl font-light text-vuelta-gold">1 Free Drink Daily</h3>
                      <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                        Get one drink free every time you visit. Resets at midnight — a fresh start, every day.
                      </p>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                          <svg className="w-7 h-7 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-annam text-xl font-light text-vuelta-gold">Easy QR Check-in</h3>
                      <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                        Just show your digital pass at the counter. No cards, no stamps — all on your phone.
                      </p>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                          <svg className="w-7 h-7 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-annam text-xl font-light text-vuelta-gold">Safe and Flexible</h3>
                      <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                        Secure payments via Stripe. Cancel anytime with no strings attached.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-20 px-4 sm:px-6 bg-vuelta-gray">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-center mb-10 md:mb-14">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="text-center space-y-4">
                  <div className="font-annam text-5xl md:text-6xl font-light text-vuelta-gold/20 leading-none">01</div>
                  <h3 className="font-annam text-xl font-light text-vuelta-gold">Subscribe</h3>
                  <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                    Sign up online in under a minute. Your digital pass is ready right away.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="font-annam text-5xl md:text-6xl font-light text-vuelta-gold/20 leading-none">02</div>
                  <h3 className="font-annam text-xl font-light text-vuelta-gold">Show Your Pass</h3>
                  <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                    When you arrive at VUELTA, show your QR code at the counter. Takes just a second.
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <div className="font-annam text-5xl md:text-6xl font-light text-vuelta-gold/20 leading-none">03</div>
                  <h3 className="font-annam text-xl font-light text-vuelta-gold">Enjoy Your Drink</h3>
                  <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">
                    That's it. Your first drink is free. Sit back, relax, and enjoy the evening.
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Is It Worth It? */}
        <section className="py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <FadeInUp>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-center mb-8 md:mb-12">
                Is It Worth It?
              </h2>
              <div className="bg-vuelta-gold/5 rounded-lg border border-vuelta-gold/20 p-6 sm:p-8">
                <div className="space-y-4 font-sans text-base text-vuelta-text-light leading-relaxed">
                  <p>
                    If you visit VUELTA <span className="text-vuelta-gold font-semibold">3 times a month</span>, your pass pays for itself.
                    With an average drink price of around ¥800, that's ¥2,400 in free drinks — for just ¥1,980.
                  </p>
                  <p>
                    Come more often? Even better. Visit every week, and you're getting ¥3,200+ worth of drinks for the same flat fee.
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-20 px-4 sm:px-6 bg-vuelta-gray">
          <div className="max-w-3xl mx-auto">
            <FadeInUp>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-center mb-8 md:mb-12">
                Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Can I use it more than once a day?',
                    a: 'The pass covers one free drink per day. If you visit in the evening and come back after midnight, it counts as a new day!',
                  },
                  {
                    q: 'How do I cancel?',
                    a: 'You can cancel anytime from your Stripe account. No cancellation fees, no hassle.',
                  },
                  {
                    q: 'Can I share my pass with a friend?',
                    a: 'The pass is tied to your account and is for personal use. But why not tell your friends to get their own?',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg border border-vuelta-gray p-5 sm:p-6">
                    <h3 className="font-annam text-lg font-light text-vuelta-gold mb-2">{item.q}</h3>
                    <p className="font-sans text-sm text-vuelta-text-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInUp>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light mb-4">
                Ready to Join?
              </h2>
              <p className="font-sans text-base text-vuelta-text-light mb-8 max-w-xl mx-auto">
                Start your FIRST DRINK PASS today and make every visit to VUELTA a little more special.
              </p>
              <a
                href={STRIPE_LINK}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 sm:px-12 py-4 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-base sm:text-lg uppercase tracking-wider group shadow-lg"
              >
                Get Your Pass
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <p className="font-sans text-xs text-vuelta-text-light mt-4">
                Powered by Stripe. Your payment information is always secure.
              </p>
            </FadeInUp>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-vuelta-gray">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/images/vuelta-logo.png"
              alt="VUELTA"
              width={160}
              height={55}
              className="h-8 w-auto object-contain opacity-80"
              placeholder="blur"
              blurDataURL={blurDataUrl('/images/vuelta-logo.png')}
            />
          </Link>
          <div className="flex items-center gap-6 font-annam text-xs text-vuelta-text-light uppercase tracking-wider">
            <Link href="/" className="hover:text-vuelta-gold transition-colors">Home</Link>
            <Link href="/#about" className="hover:text-vuelta-gold transition-colors">About</Link>
            <a href={MENU_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-vuelta-gold transition-colors">Menu</a>
            <a href="https://www.instagram.com/vuelta_bar" target="_blank" rel="noopener noreferrer" className="hover:text-vuelta-gold transition-colors">Instagram</a>
          </div>
          <div className="pt-8 border-t border-vuelta-gray text-center space-y-2">
            <p className="font-sans text-xs text-vuelta-text-light">
              &copy; {new Date().getFullYear()} VUELTA. All rights reserved.
            </p>
            <p className="font-sans text-xs">
              <Link href="/tokushoho" className="text-vuelta-text-light hover:text-vuelta-gold transition-colors">
                特定商取引法に基づく表記
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
