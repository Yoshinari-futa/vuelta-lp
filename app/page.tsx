'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// Animation component
const FadeInUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "VUELTA",
    "description": "Premium cocktail bar in Hiroshima where international guests and locals meet",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3-3-5 Ote-machi, Naka-ku, Kakee Building 2F",
      "addressLocality": "Hiroshima",
      "postalCode": "730-0051",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.395",
      "longitude": "132.456"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Wednesday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"],
        "opens": "18:00",
        "closes": "02:00"
      }
    ],
    "priceRange": "¥750-¥1,200",
    "servesCuisine": "Cocktails",
    "telephone": "+81-3-1234-5678"
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-vuelta-gray to-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-annam text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 text-balance"
          >
            V U E L T A
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-lg md:text-xl text-vuelta-text-light tracking-wider uppercase mb-6"
          >
            Where "Welcome Back" Meets "Nice to Meet You"
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-base text-vuelta-text-light mb-12"
          >
            International Guests Welcome • We'll Do Our Best to Communicate • Located in Hiroshima City Center
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://www.instagram.com/vuelta_bar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-sans text-sm tracking-wider uppercase"
            >
              Reserve via DM
            </a>
            <a
              href="#menu"
              className="px-8 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light hover:text-vuelta-text transition-all duration-300 font-sans text-sm tracking-wider uppercase"
            >
              View Menu
            </a>
          </motion.div>
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

      {/* Brand Concept Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeInUp>
            <div className="space-y-8">
              <h2 className="font-annam text-5xl md:text-6xl font-light text-vuelta-gold">
                About VUELTA
              </h2>
              <div className="space-y-6 text-vuelta-text-light font-sans text-lg leading-relaxed">
                <p className="text-xl text-vuelta-gold-light font-semibold">
                  A crossroads in Hiroshima where "Welcome Back" meets "Nice to Meet You"
                </p>
                <p>
                  VUELTA (pronounced "Buelta") means "reunion," "return," and "cycle" in Spanish. 
                  But for us, it means something more special.
                </p>
                <p>
                  Hiroshima is an international city of peace and culture, welcoming diverse people from around the world. 
                  We create a crossroads where international visitors and locals intersect, experiencing the true essence of Hiroshima 
                  while locals gather to feel new connections and warmth.
                </p>
                <div className="space-y-4 pt-4 border-t border-vuelta-gray">
                  <p>
                    <span className="text-vuelta-gold font-semibold">For international guests:</span> Want to know where locals really go? This is it. Experience the real Hiroshima—not tourist spots, but sharing laughter side by side with locals at a genuine neighborhood bar.
                  </p>
                  <p>
                    <span className="text-vuelta-gold font-semibold">For locals:</span> Feel new inspiration and connections 
                    while experiencing a Western worldview in your everyday life.
                  </p>
                </div>
                <p className="text-vuelta-gold-light italic">
                  Where these two lives intersect, the feeling of "I want to come back" is born. That is VUELTA.
                </p>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group">
              {/* Image placeholder - bar interior */}
              <div className="absolute inset-0 bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-24 h-24 border-2 border-vuelta-gold/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-vuelta-gold text-4xl">🍸</span>
                    </div>
                    <span className="text-vuelta-text-light text-sm">Bar Interior</span>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500" />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 bg-vuelta-gray">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-5xl md:text-6xl font-light mb-8 text-vuelta-gold">
              Our Mission
            </h2>
            <p className="font-annam text-3xl md:text-4xl font-light mb-12 text-vuelta-gold-light italic">
              Food is the Invitation,<br />
              People are the Destination
            </p>
            <div className="space-y-6 text-vuelta-text font-sans text-lg leading-relaxed max-w-2xl mx-auto">
              <p>
                The cocktails and drinks we serve are merely an "Invitation" to bring guests to this crossroads.
              </p>
              <p>
                What guests truly seek as their "Destination" is the "people" waiting there—you—and the warm atmosphere you create.
              </p>
              <p className="text-vuelta-gold-light text-xl pt-4">
                Our goal is to create "It was great to meet you" beyond "It was delicious."
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-32 px-6 bg-vuelta-gray">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-20">
              <h2 className="font-annam text-5xl md:text-6xl font-light mb-4">
                Signature Cocktails
              </h2>
              <p className="font-sans text-vuelta-text-light uppercase tracking-wider text-sm">
                Crafted with Precision
              </p>
            </div>
          </FadeInUp>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Shell We?', description: 'Oyster Shell Gin, Lemon, Soda, Smoke Salt', price: '¥750' },
              { name: 'The OKONOMIYAKI', description: 'Dashi Vodka, Roasted Cabbage, Burnt Sauce, Tomato', price: '¥900' },
              { name: 'AKI AMBER', description: 'Hojicha Gin, Sake, Hassaku, Soda', price: '¥800' },
              { name: 'Miyajima Velvet', description: 'Signature blend', price: '¥1,200' },
              { name: 'Salty Tax', description: 'Gin, Salted Lemon Cordial', price: '¥700' },
              { name: 'The Emigrant', description: 'Coffee Infused Shochu, Cane Sugar', price: '¥600' },
            ].map((item, index) => {
              return (
                <FadeInUp key={index} delay={index * 0.1}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-square bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white overflow-hidden mb-4 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border border-vuelta-gold/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-vuelta-gold text-2xl">🥃</span>
                        </div>
                        <span className="text-vuelta-text-light text-xs">{item.name}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500 pointer-events-none" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
                        <span className="text-white font-annam text-xl bg-vuelta-gold/90 px-4 py-2 rounded backdrop-blur-sm">{item.price} JPY</span>
                      </div>
                    </div>
                    <h3 className="font-annam text-2xl mb-2 group-hover:text-vuelta-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-vuelta-text-light">{item.description}</p>
                  </div>
                </FadeInUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet the Manager Section */}
      <section id="manager" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-5xl md:text-6xl font-light mb-8 text-vuelta-gold">
              Meet the Manager
            </h2>
            <div className="mt-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white border-2 border-vuelta-gold/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-vuelta-gold/10 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-16 h-16 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-left md:text-center space-y-4">
                  <h3 className="font-annam text-3xl md:text-4xl font-light text-vuelta-gold">
                    Yuta Miyake
                  </h3>
                  <p className="font-sans text-sm text-vuelta-text-light uppercase tracking-wider mb-2">
                    Manager • Born and raised in Hiroshima
                  </p>
                  <div className="space-y-4 font-sans text-lg text-vuelta-text-light leading-relaxed">
                    <p>
                      Hey, I'm Yuta. Most people call me Yuji. Born here, grew up here—Hiroshima's my whole life.
                    </p>
                    <p>
                      I really want to show you the <span className="text-vuelta-gold font-semibold">real Hiroshima</span>—where we actually hang out, not the tourist stuff. The places that make this city what it is.
                    </p>
                    <p className="text-vuelta-gold-light italic">
                      I'm still learning English, but I'm trying my best. Come sit down—let's make it work together.
                    </p>
                  </div>
                  <div className="pt-4">
                    <a
                      href="https://www.instagram.com/yu_ji_b_r"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-sans text-sm uppercase tracking-wider group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Follow @yu_ji_b_r
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* For International Guests Section */}
      <section className="py-32 px-6 bg-vuelta-gray">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-5xl md:text-6xl font-light mb-8 text-vuelta-gold">
              Welcome International Guests
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-8 h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-2xl font-light text-vuelta-gold">We'll Do Our Best</h3>
                <p className="text-vuelta-text font-sans">
                  Our bartenders may not speak perfect English, but they'll do their best to communicate with you. We're here to help and share the real Hiroshima experience!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-8 h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-2xl font-light text-vuelta-gold">Cards Accepted</h3>
                <p className="text-vuelta-text font-sans">
                  We accept major credit cards (Visa, Mastercard, AMEX) and cash. No need to worry about payment methods.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-8 h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-2xl font-light text-vuelta-gold">Free Wi-Fi</h3>
                <p className="text-vuelta-text font-sans">
                  Stay connected with our free Wi-Fi. Perfect for sharing your VUELTA experience on social media.
                </p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-white rounded-lg border border-vuelta-gray">
              <p className="text-vuelta-text font-sans text-lg leading-relaxed mb-4">
                <span className="font-semibold text-vuelta-gold">Want to know where locals really go?</span> This is it. VUELTA is where real Hiroshima locals gather—not a tourist spot, but a genuine local bar where you can experience authentic Japanese hospitality.
              </p>
              <p className="text-vuelta-text font-sans text-lg leading-relaxed">
                <span className="font-semibold text-vuelta-gold">First time in Hiroshima?</span> Our bartenders will do their best to recommend local spots and share stories about this beautiful city, even if communication takes a bit of effort. We're not just a bar—we're your connection to real Hiroshima life.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Location/Access Section */}
      <section id="reservation" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeInUp>
              <div className="space-y-8">
                <h2 className="font-annam text-5xl md:text-6xl font-light">
                  Visit Us
                </h2>
                <div className="space-y-6 font-sans text-vuelta-text-light">
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Address
                    </h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
                    >
                      730-0051<br />
                      Kakee Building 2F<br />
                      3-3-5 Ote-machi, Naka-ku<br />
                      Hiroshima, Japan
                    </a>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Access
                    </h3>
                    <div className="space-y-3 text-lg">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span>Nearest Station: Hondori Station (5 min walk)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span>Walking: 5 minutes from Hondori Station</span>
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
                    <p className="text-lg">
                      Wed, Fri - Tue: 18:00 - 02:00<br />
                      <span className="text-vuelta-text-light">Closed on Thursdays</span><br />
                      <span className="text-sm text-vuelta-text-light">*Last order: 01:30</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Capacity
                    </h3>
                    <p className="text-lg">
                      Counter: 8 seats<br />
                      Standing area: 8 seats<br />
                      <span className="text-sm text-vuelta-text-light">Intimate atmosphere for conversation</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Wi-Fi
                    </h3>
                    <p className="text-lg">
                      Network: <span className="font-mono">VUELTA_GUEST</span><br />
                      Password: <span className="font-mono">19900807</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Reservations
                    </h3>
                    <p className="text-lg mb-3">
                      We'll do our best to communicate in English! Please send us a DM on Instagram.<br />
                      <span className="text-sm text-vuelta-text-light">Walk-ins welcome, but reservations recommended for groups.</span>
                    </p>
                    <a
                      href="https://www.instagram.com/vuelta_bar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-vuelta-gold hover:text-vuelta-gold-light transition-colors font-semibold"
                    >
                      <span>Reserve via Instagram DM</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="space-y-4">
                <div className="relative aspect-[4/3] bg-vuelta-gray overflow-hidden rounded-lg">
                  <iframe
                    src="https://www.google.com/maps?q=34.395,132.456&hl=ja&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                    title="VUELTA Location"
                  />
                </div>
                <div className="text-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-vuelta-gold hover:text-vuelta-gold-light transition-colors text-sm"
                  >
                    <span>Open in Google Maps</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-vuelta-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-annam text-2xl mb-4">V U E L T A</h3>
              <p className="font-sans text-sm text-vuelta-text-light mb-3">
                Experience the art of mixology
              </p>
              <p className="font-sans text-xs text-vuelta-text-light">
                We'll Do Our Best to Communicate • International Guests Welcome<br />
                Free Wi-Fi Available • Where Locals Really Go
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                Quick Links
              </h4>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <a 
                    href="#menu" 
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-medium flex-1">Menu</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/vuelta_bar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-medium flex-1">Reservation via DM</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-medium flex-1">About</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                Follow Us
              </h4>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <a 
                    href="https://www.instagram.com/vuelta_bar" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-4 h-4 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-medium flex-1">@vuelta_bar</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/yu_ji_b_r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-4 h-4 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-medium flex-1">@yu_ji_b_r</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-vuelta-gray text-center">
            <p className="font-sans text-xs text-vuelta-text-light">
              © 2024 VUELTA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
