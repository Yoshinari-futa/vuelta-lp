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
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

const STRIPE_LINK = 'https://buy.stripe.com/cNi7sK0NG9yL7k5cMk6Zy02'

// Header — 英語トップ / と同一（ハンバーガー＋言語切替）

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
    "description": "Monthly subscription for one free drink per day at Bar VUELTA cocktail bar in Hiroshima.",
    "image": `${SITE_ORIGIN}/images/ogp.png`,
    "brand": { "@type": "Brand", "name": "Bar VUELTA" },
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
      <SiteHeader lang="en" />

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
                    When you arrive at Bar VUELTA, show your QR code at the counter. Takes just a second.
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
                Start your FIRST DRINK PASS today and make every visit to Bar VUELTA a little more special.
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
            <SiteFooter lang="en" />
    </>
  )
}
