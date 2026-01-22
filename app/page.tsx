'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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

// Menu Image Display Component
const MenuImageDisplay = ({ src, currentPage }: { src: string; currentPage: number }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <>
      {!imageError ? (
        <div className="relative w-full h-full flex items-center justify-center min-h-0">
          <Image
            src={src}
            alt={`Menu page ${currentPage}`}
            width={2000}
            height={2800}
            className="object-contain w-auto h-auto"
            style={{ 
              maxWidth: 'calc(100vw - 4rem)',
              maxHeight: 'calc(100vh - 4rem)',
              width: 'auto',
              height: 'auto'
            }}
            sizes="(max-width: 768px) 100vw, 95vw"
            priority
            quality={100}
            unoptimized={false}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center p-8 max-w-md bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-white mb-2 font-sans">メニュー画像を読み込めません</p>
            <p className="text-sm text-white/80 mb-4 font-sans">画像ファイルを配置してください</p>
            <p className="text-xs text-white/60 font-mono bg-black/30 px-3 py-1 rounded inline-block">
              /public/images/menu/menu-page-0{currentPage}.jpg
            </p>
          </div>
        </div>
      )}
      {imageLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm text-white font-sans">読み込み中...</p>
          </div>
        </div>
      )}
    </>
  )
}

// Menu Modal Component
const MenuModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4

  const menuImages = [
    '/images/menu/menu-page-01.jpg.png',
    '/images/menu/menu-page-02.jpg.png',
    '/images/menu/menu-page-03.jpg.png',
    '/images/menu/menu-page-04.jpg.png',
  ]

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages))
      } else if (e.key === 'ArrowRight') {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1))
      }
    }

    // モーダルが開いているときはbodyのスクロールを無効化
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, totalPages])

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-2"
          onClick={onClose}
        >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full h-full max-w-[98vw] max-h-[98vh] bg-transparent overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-colors shadow-xl"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-colors shadow-xl"
          aria-label="Previous page"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center bg-black/70 hover:bg-black/90 backdrop-blur-sm rounded-full transition-colors shadow-xl"
          aria-label="Next page"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Menu Image */}
        <div className="relative w-full h-full bg-transparent overflow-auto flex items-center justify-center p-2">
          <div className="relative w-full h-full flex items-center justify-center">
            <MenuImageDisplay 
              src={menuImages[currentPage - 1]} 
              currentPage={currentPage}
            />
          </div>
        </div>

        {/* Page Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl">
            <span className="text-sm font-sans text-white font-medium">
              {currentPage} / {totalPages}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)

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
        "dayOfWeek": ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
            className="font-annam text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight mb-4 md:mb-6 text-balance"
          >
            V U E L T A
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-vuelta-text-light tracking-wider uppercase mb-4 md:mb-6"
          >
            Where "Welcome Back" Meets "Nice to Meet You"
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-sans text-sm sm:text-base text-vuelta-text-light mb-8 md:mb-12 px-2"
          >
            International Guests Welcome • We'll Do Our Best to Communicate • Located in Hiroshima City Center
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 md:mb-24"
          >
            <a
              href="https://www.instagram.com/vuelta_bar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-2.5 sm:py-3 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-sans text-xs sm:text-sm tracking-wider uppercase w-full sm:w-auto text-center"
            >
              Reserve via DM
            </a>
            <a
              href="#menu"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light hover:text-vuelta-text transition-all duration-300 font-sans text-xs sm:text-sm tracking-wider uppercase w-full sm:w-auto text-center"
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
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <svg className="w-6 h-6 text-vuelta-gold opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
            <span className="text-xs text-vuelta-text-light font-sans tracking-wider uppercase">Scroll</span>
          </div>
        </motion.div>
      </section>

      {/* Brand Concept Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <FadeInUp>
            <div className="space-y-8">
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-vuelta-gold">
                About VUELTA
              </h2>
              <div className="space-y-4 sm:space-y-6 text-vuelta-text-light font-sans text-base sm:text-lg leading-relaxed">
                <p className="text-lg sm:text-xl text-vuelta-gold-light font-semibold">
                  A crossroads in Hiroshima where "Welcome Back" meets "Nice to Meet You"
                </p>
                <p>
                  VUELTA—pronounced "Buelta"—comes from Spanish, meaning reunion, return, and cycle. 
                  But here in Hiroshima, it's become something else entirely.
                </p>
                <p>
                  This city draws people from everywhere. Travelers looking for something real, locals who've been here forever. 
                  We wanted a place where those worlds could actually meet. Not just coexist, but really connect. 
                  That's what VUELTA is about.
                </p>
                <div className="space-y-4 pt-4 border-t border-vuelta-gray">
                  <p>
                    <span className="text-vuelta-gold font-semibold">If you're visiting:</span> Skip the tourist traps. 
                    This is where Hiroshima locals actually hang out. Grab a seat, order a drink, and see what happens. 
                    You might end up chatting with someone who's lived here their whole life.
                  </p>
                  <p>
                    <span className="text-vuelta-gold font-semibold">If you're local:</span> Come for the drinks, stay for the conversations. 
                    You'll meet travelers with stories from places you've never been, and maybe find yourself seeing your own city through fresh eyes.
                  </p>
                </div>
                <p className="text-vuelta-gold-light italic">
                  When those moments click—that's when people say "I'm coming back." That's VUELTA.
                </p>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
                alt="VUELTA bar interior"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500" />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-vuelta-gray">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-vuelta-gold">
              Our Mission
            </h2>
            <p className="font-annam text-2xl sm:text-3xl md:text-4xl font-light mb-8 md:mb-12 text-vuelta-gold-light italic">
              Food is the Invitation,<br />
              People are the Destination
            </p>
            <div className="space-y-4 sm:space-y-6 text-vuelta-text font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
              <p>
                Sure, we make good drinks. But honestly? That's just the excuse to get people in the door.
              </p>
              <p>
                What we're really here for is the conversations. The connections. The moments when someone walks in alone and leaves with a new friend. 
                That's what makes this place special—not the cocktails, but the people sharing them.
              </p>
              <p className="text-vuelta-gold-light text-lg sm:text-xl pt-4">
                We want you to remember who you met here, not just what you drank.
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
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">
                Signature Cocktails
              </h2>
              <p className="font-sans text-vuelta-text-light uppercase tracking-wider text-sm mb-6">
                Crafted with Precision
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuModalOpen(true)
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-sans text-xs uppercase tracking-wider group cursor-pointer"
              >
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full Menu
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeInUp>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Shell We?', description: 'Oyster Shell Gin, Lemon, Soda, Smoke Salt', price: '¥750', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
              { name: 'The OKONOMIYAKI', description: 'Dashi Vodka, Roasted Cabbage, Burnt Sauce, Tomato', price: '¥900', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
              { name: 'AKI AMBER', description: 'Hojicha Gin, Sake, Hassaku, Soda', price: '¥800', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
              { name: 'Miyajima Velvet', description: 'Signature blend', price: '¥1,200', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
              { name: 'Salty Tax', description: 'Gin, Salted Lemon Cordial', price: '¥700', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
              { name: 'The Emigrant', description: 'Coffee Infused Shochu, Cane Sugar', price: '¥600', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
            ].map((item, index) => {
              const CocktailCard = () => {
                const [imageError, setImageError] = useState(false)
                
                return (
                  <FadeInUp delay={index * 0.1}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-square bg-vuelta-light overflow-hidden mb-4 rounded-lg">
                        {!imageError ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => setImageError(true)}
                            unoptimized={false}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 border border-vuelta-gold/30 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <span className="text-vuelta-gold text-2xl">🥃</span>
                              </div>
                              <span className="text-vuelta-text-light text-xs">{item.name}</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500 pointer-events-none" />
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
              }
              
              return <CocktailCard key={index} />
            })}
          </div>
          
          {/* Full Menu Link */}
          <FadeInUp delay={0.6}>
            <div className="text-center mt-16 pt-12 border-t border-vuelta-light">
              <p className="font-sans text-sm text-vuelta-text-light mb-4 uppercase tracking-wider">
                Explore Our Complete Selection
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsMenuModalOpen(true)
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-sans text-sm uppercase tracking-wider group cursor-pointer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full Menu
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* For International Guests Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-vuelta-gray">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-vuelta-gold">
              Welcome International Guests
            </h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-8 mt-8 md:mt-12">
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">We'll Do Our Best</h3>
                <p className="text-vuelta-text font-sans">
                  Our bartenders may not speak perfect English, but they'll do their best to communicate with you. We're here to help and share the real Hiroshima experience!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Cards Accepted</h3>
                <p className="text-vuelta-text font-sans">
                  We accept major credit cards (Visa, Mastercard, AMEX) and cash. No need to worry about payment methods.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <svg className="w-16 h-16 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Free Wi-Fi</h3>
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
      <section id="reservation" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <FadeInUp>
              <div className="space-y-8">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
                  Visit Us
                </h2>
                <div className="space-y-6 font-sans text-vuelta-text-light">
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Address
                    </h3>
                    <p className="text-lg">
                      730-0051<br />
                      Kakee Building 2F<br />
                      3-3-5 Ote-machi, Naka-ku<br />
                      Hiroshima, Japan
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Access
                    </h3>
                    <p className="text-lg space-y-1">
                      <span className="block">🚇 Nearest Station: Hondori Station (5 min walk)</span>
                      <span className="block">🚶 Walking: 5 minutes from Hondori Station</span>
                      <span className="block">📍 Located in the heart of Hiroshima city center</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Hours (JST)
                    </h3>
                    <p className="text-lg">
                      Wed - Mon: 18:00 - 02:00<br />
                      <span className="text-vuelta-text-light">Closed on Tuesdays</span><br />
                      <span className="text-sm text-vuelta-text-light">*Last order: 01:30</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Capacity
                    </h3>
                    <p className="text-lg">
                      15 seats<br />
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
                    src="https://www.google.com/maps?q=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F&output=embed"
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
              <h3 className="font-annam text-2xl mb-4">VUELTA</h3>
              <p className="font-sans text-sm text-vuelta-text-light mb-3">
                A crossroads in Hiroshima
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
              <ul className="space-y-2 font-sans text-sm text-vuelta-text-light">
                <li><a href="#menu" className="hover:text-vuelta-gold transition-colors">Menu</a></li>
                <li><a href="#reservation" className="hover:text-vuelta-gold transition-colors">Reservation</a></li>
                <li><a href="#" className="hover:text-vuelta-gold transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                Follow Us
              </h4>
              <ul className="space-y-2 font-sans text-sm text-vuelta-text-light">
                <li>
                  <a 
                    href="https://www.instagram.com/vuelta_bar" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-vuelta-gold transition-colors inline-flex items-center gap-2"
                  >
                    Instagram
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-vuelta-gray text-center">
            <p className="font-sans text-xs text-vuelta-text-light">
              © 2026 VUELTA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Menu Modal */}
      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
    </main>
  )
}
