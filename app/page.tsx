'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isRecruitPage = pathname === '/recruit'

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b ${isRecruitPage ? 'border-vuelta-gold/20' : 'border-vuelta-gray/50'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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
            />
          </a>
          
          <div className="flex items-center gap-4">
            {/* EN/JA - Desktop only (mobile: shown in menu below) */}
            <div className="hidden md:flex items-center gap-2 border-r border-vuelta-gray/40 pr-4 min-w-[3rem] flex-shrink-0">
              <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">EN</span>
              <span className="text-vuelta-gray/60 text-xs flex-shrink-0">/</span>
              <a
                href="/ja"
                className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center inline-block"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('vuelta-language', 'ja')
                  router.push('/ja')
                }}
              >
                JA
              </a>
            </div>

            {/* Hamburger Menu Button - All Devices */}
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

        {/* Menu - All Devices */}
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
                {/* EN/JA - Mobile only: shown below menu bar */}
                <div className="md:hidden flex items-center gap-2 py-3 min-h-[44px] border-b border-vuelta-gray/20 mb-2">
                  <span className="font-annam text-sm text-vuelta-gold tracking-wider uppercase">EN</span>
                  <span className="text-vuelta-gray/60 text-xs">/</span>
                  <a
                    href="/ja"
                    className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase"
                    onClick={(e) => {
                      e.preventDefault()
                      localStorage.setItem('vuelta-language', 'ja')
                      router.push('/ja')
                      setIsMenuOpen(false)
                    }}
                  >
                    JA
                  </a>
                </div>
                <a href={isRecruitPage ? "/#about" : "#about"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#about'); setIsMenuOpen(false) }}>About</a>
                <a href={isRecruitPage ? "/#menu" : "#menu"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#menu'); setIsMenuOpen(false) }}>Menu</a>
                <a href={isRecruitPage ? "/#manager" : "#manager"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#manager'); setIsMenuOpen(false) }}>Manager</a>
                <a href={isRecruitPage ? "/#reservation" : "#reservation"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#reservation'); setIsMenuOpen(false) }}>Visit Us</a>
                <a href="/recruit" className={`font-annam text-sm transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center ${isRecruitPage ? 'text-vuelta-gold' : 'text-vuelta-text-light hover:text-vuelta-gold'}`} onClick={() => setIsMenuOpen(false)}>Recruit</a>
                <a href="https://www.instagram.com/vuelta_bar" target="_blank" rel="noopener noreferrer" className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center mt-4 pt-4 border-t border-vuelta-gray/20" onClick={() => setIsMenuOpen(false)}>Reserve via DM</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

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

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "VUELTA",
    "description": "Premium cocktail bar in Hiroshima where international guests and locals meet. Experience authentic Hiroshima hospitality with world-class cocktails.",
    "image": [
      "https://vuelta-bar.com/images/vuelta-logo.png"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3-3-5 Ote-machi, Naka-ku, Kakee Building 2F",
      "addressLocality": "Hiroshima",
      "addressRegion": "Hiroshima Prefecture",
      "postalCode": "730-0051",
      "addressCountry": "JP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.3950",
      "longitude": "132.4550"
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
    "url": "https://vuelta-bar.com",
    "sameAs": [
      "https://www.instagram.com/vuelta_bar"
    ],
    "acceptsReservations": true,
    "paymentAccepted": "Cash, Credit Card"
  }

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
      <Header />
      
      <div id="main-content" tabIndex={-1}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24" aria-label="Hero section">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-vuelta-gray to-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBoMTAwdjEwMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="flex flex-col items-center">
            {/* Text Content */}
            <div className="text-center mb-6 md:mb-12 w-full px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-annam text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4 md:mb-6 text-balance"
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
                className="font-sans text-sm sm:text-base md:text-lg text-vuelta-text-light mb-6 md:mb-4 leading-relaxed max-w-2xl mx-auto px-2"
              >
                International guests welcome. We do our best to communicate. Located in Hiroshima city center.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-6 md:mb-12 w-full max-w-md sm:max-w-none mx-auto px-4"
              >
                <a
                  href="https://www.instagram.com/vuelta_bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                  aria-label="Reserve via Instagram DM"
                >
                  Reserve via DM
                </a>
                <a
                  href="#menu"
                  onClick={(e) => handleAnchorClick(e, '#menu')}
                  className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center bg-vuelta-gold text-white hover:bg-vuelta-gold-light hover:text-vuelta-text transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                  aria-label="View Menu section"
                >
                  View Menu
                </a>
              </motion.div>
            </div>

            {/* Image - Below VUELTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="w-full max-w-5xl"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-vuelta-gray group">
                <Image
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80"
                  alt="VUELTA interior - Cocktail bar"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                  priority
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

      {/* Brand Concept Section */}
      <section id="about" className="py-12 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20" aria-label="About VUELTA">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <FadeInUp>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-2 sm:gap-4">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-vuelta-gold">
                  About<span className="inline-block w-2 sm:w-4 md:w-8"></span>V U E L T A
                </h2>
              </div>
              <div className="space-y-6 md:space-y-8 text-vuelta-text-light font-sans text-sm sm:text-base md:text-lg leading-relaxed">
                <p className="text-xl text-vuelta-gold-light font-semibold leading-relaxed">
                  In Hiroshima<br />
                  where welcome back meets nice to meet you.
                </p>
                <p className="leading-loose">
                  VUELTA means reunion, return, and cycle in Spanish.<br />
                  But for us, it means something more special.
                </p>
                <p className="leading-loose">
                  Hiroshima is an international city of peace and culture,<br />
                  welcoming diverse people from around the world.<br />
                  We create a place where international visitors and locals intersect,<br />
                  experiencing the true essence of Hiroshima<br />
                  while locals gather to feel new connections and warmth.
                </p>
                <div className="space-y-6 pt-6 border-t border-vuelta-gray">
                  <div>
                    <p className="text-vuelta-gold font-semibold mb-2">For international guests.</p>
                    <p className="leading-relaxed">
                      Want to know where locals really go?<br />
                      This is it.<br />
                      Experience the real Hiroshima.<br />
                      Not tourist spots, but sharing laughter side by side with locals at a genuine neighborhood bar.
                    </p>
                  </div>
                  <div>
                    <p className="text-vuelta-gold font-semibold mb-2">For locals.</p>
                    <p className="leading-relaxed">
                      Feel new inspiration and connections<br />
                      while experiencing a Western worldview in your everyday life.
                    </p>
                  </div>
                </div>
                <p className="text-vuelta-gold-light italic leading-relaxed pt-4">
                  Where these two lives intersect,<br />
                  the feeling of I want to come back is born.<br />
                  That is VUELTA.
                </p>
              </div>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group rounded-lg">
              <Image
                src="/images/interior.png"
                alt="VUELTA interior - Kakee Building entrance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500" />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-32 px-4 sm:px-6 bg-vuelta-gray">
        <div className="max-w-4xl mx-auto text-left">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-vuelta-gold px-4">
              Our Mission
            </h2>
            <p className="font-annam text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-8 md:mb-12 text-vuelta-gold-light italic px-4">
              Food is the Invitation, People are the Destination.
            </p>
            <div className="space-y-6 md:space-y-8 text-vuelta-text font-sans text-base sm:text-lg leading-relaxed w-full px-4">
              <p className="leading-loose">
                The cocktails and drinks we serve are merely an invitation to bring guests here.
              </p>
              <p className="leading-loose">
                What guests truly seek as their destination is the people waiting there. You. And the warm atmosphere you create.
              </p>
              <p className="text-vuelta-gold-light text-xl pt-6 leading-relaxed">
                Our goal is to create it was great to meet you beyond it was delicious.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-12 md:py-32 px-4 sm:px-6 bg-vuelta-gray scroll-mt-20" aria-label="Menu">
        <div className="max-w-7xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-12 md:mb-20 px-4">
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4">
                Menu
              </h2>
              <p className="font-sans text-vuelta-text-light uppercase tracking-wider text-xs sm:text-sm">
                Crafted with Precision.
              </p>
            </div>
          </FadeInUp>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Shell We?', description: 'The ocean\'s bounty captured in a glass. Oyster shell vodka meets fresh lemon in a refreshing harmony, elevated by crisp soda. A taste of Hiroshima\'s coastal essence.', price: '¥750', image: '/images/cocktails/shellwe.jpg.png' },
              { name: 'The OKONOMIYAKI', description: 'Hiroshima\'s soul food, reimagined as a cocktail. The umami depth of dashi, the rich complexity of Otafuku sauce, and the natural sweetness of tomato create an authentic local flavor you won\'t find anywhere else.', price: '¥900', image: '/images/cocktails/okonomiyaki.jpg.png' },
              { name: 'Carnitas', description: 'Slow-cooked pork shoulder, tender and flavorful. Served with fresh tortillas, salsa, and traditional accompaniments. A taste of authentic Mexican cuisine.', price: '2 for ¥880', image: '/images/cocktails/e0d84016-b589-4ef5-8415-b00fc1c2bd83.png' },
            ].map((item, index) => {
              return (
                <FadeInUp key={index} delay={index * 0.1}>
                  <div className="group cursor-pointer relative" role="article" aria-label={`${item.name} cocktail`}>
                    <div className="relative aspect-square bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white overflow-hidden mb-4 rounded-lg focus-within:ring-2 focus-within:ring-vuelta-gold focus-within:ring-offset-2" style={{ minHeight: '400px' }}>
                      {item.image && !imageErrors[index] ? (
                        <>
                          <Image
                            src={item.image}
                            alt={`${item.name} cocktail`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={index < 2 ? 'eager' : 'lazy'}
                            onError={() => {
                              setImageErrors(prev => ({ ...prev, [index]: true }))
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" aria-hidden="true">
                            <span className="text-white font-annam text-2xl bg-vuelta-gold/95 px-6 py-3 rounded-lg backdrop-blur-sm shadow-lg">{item.price}</span>
                          </div>
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
                    <h3 className="font-annam text-2xl mb-2 group-hover:text-vuelta-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="font-sans text-vuelta-text-light text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeInUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* Meet the Manager Section */}
      <section id="manager" className="py-12 md:py-32 px-4 sm:px-6 scroll-mt-20" aria-label="Meet the Manager">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-vuelta-gold px-4">
              Meet the Manager
            </h2>
            <div className="mt-8 md:mt-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white border-2 border-vuelta-gold/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-vuelta-gold/10 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left lg:text-center space-y-3 md:space-y-4 px-4">
                  <h3 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-gold">
                    Yuta Miyake
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-vuelta-text-light uppercase tracking-wider mb-2">
                    Manager • Born and raised in Hiroshima
                  </p>
                  <div className="space-y-3 md:space-y-4 font-sans text-base sm:text-lg text-vuelta-text-light leading-relaxed">
                    <p>
                      Hey, I'm Yuta. Most people call me Yuji. Born here, grew up here. Hiroshima's my whole life.
                    </p>
                    <p>
                      I really want to show you the <span className="text-vuelta-gold font-semibold">real Hiroshima</span> where we actually hang out, not the tourist stuff. The places that make this city what it is.
                    </p>
                    <p className="text-vuelta-gold-light italic">
                      I'm still learning English, but I'm trying my best. Come sit down. Let's make it work together.
                    </p>
                  </div>
                  <div className="pt-4">
                    <a
                      href="https://www.instagram.com/yuji_miyake"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm uppercase tracking-wider group"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Meet @yuji_miyake
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
      <section className="py-12 md:py-32 px-4 sm:px-6 bg-vuelta-gray" aria-label="Welcome International Guests">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-vuelta-gold px-4">
              Welcome International Guests
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">We'll Do Our Best</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base">
                  Our bartenders may not speak perfect English, but they'll do their best to communicate with you. We're here to help and share the real Hiroshima experience!
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Cards Accepted</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base">
                  We accept major credit cards (Visa, Mastercard, AMEX) and cash. No need to worry about payment methods.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-annam text-xl sm:text-2xl font-light text-vuelta-gold">Free Wi-Fi</h3>
                <p className="text-vuelta-text font-sans text-sm sm:text-base">
                  Stay connected with our free Wi-Fi. Perfect for sharing your VUELTA experience on social media.
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-12 p-4 sm:p-6 bg-white rounded-lg border border-vuelta-gray">
              <p className="text-vuelta-text font-sans text-base sm:text-lg leading-relaxed mb-4">
                <span className="font-semibold text-vuelta-gold">Want to know where locals really go?</span> This is it. VUELTA is where real Hiroshima locals gather. Not a tourist spot, but a genuine local bar where you can experience authentic Japanese hospitality.
              </p>
              <p className="text-vuelta-text font-sans text-base sm:text-lg leading-relaxed">
                <span className="font-semibold text-vuelta-gold">First time in Hiroshima?</span> Our bartenders will do their best to recommend local spots and share stories about this beautiful city, even if communication takes a bit of effort. We're not just a bar. We're your connection to real Hiroshima life.
              </p>
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
                    <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                      Address
                    </h3>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
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
                    <div className="space-y-3 text-base sm:text-lg">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span>Nearest Station: Chuden-mae Station (1 min walk)</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                          <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <span>Walking: 1 minute from Chuden-mae Station</span>
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
                    <p className="text-base sm:text-lg">
                      Wed, Fri - Tue: 18:00 - 02:00<br />
                      <span className="text-vuelta-text-light">Closed on Thursdays</span><br />
                      <span className="text-sm text-vuelta-text-light">Last order: 01:30.</span>
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
                    <p className="text-base sm:text-lg mb-3">
                      We'll do our best to communicate in English! Please send us a DM on Instagram.<br />
                      <span className="text-sm text-vuelta-text-light">Walk-ins welcome, but reservations recommended for groups.</span>
                    </p>
                    <a
                      href="https://www.instagram.com/vuelta_bar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2"
                      aria-label="Reserve via Instagram DM"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
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
                <div className="relative aspect-[4/3] bg-vuelta-gray overflow-hidden rounded-lg group cursor-pointer">
                  <iframe
                    src="https://www.google.com/maps?q=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F&hl=ja&z=17&output=embed"
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm"
                    aria-label="Open VUELTA location in Google Maps"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://www.instagram.com/vuelta_bar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-colors rounded-lg font-annam text-sm"
                    aria-label="Reserve via Instagram DM"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Reserve via DM</span>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 sm:px-6 border-t border-vuelta-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <Image
                src="/images/vuelta-logo.png"
                alt="VUELTA"
                width={200}
                height={68}
                className="h-10 w-auto mb-4 object-contain opacity-80"
              />
              <p className="font-sans text-sm text-vuelta-text-light mb-3">
                Experience the art of mixology.
              </p>
              <p className="font-sans text-xs text-vuelta-text-light">
                We'll Do Our Best to Communicate. International Guests Welcome.<br />
                Free Wi-Fi Available. Where Locals Really Go.
              </p>
            </div>
            <div>
              <h4 className="font-annam text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                Quick Links
              </h4>
              <ul className="space-y-3 font-annam text-sm">
                <li>
                  <a 
                    href="#menu" 
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-annam font-medium flex-1">Menu</span>
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
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-annam font-medium flex-1">About</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="/recruit" 
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-annam font-medium flex-1">Recruit</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-annam text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                Follow Us
              </h4>
              <ul className="space-y-3 font-annam text-sm">
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
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-annam font-medium flex-1">@vuelta_bar</span>
                    <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/yuji_miyake"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                      <svg className="w-3 h-3 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-annam font-medium flex-1">@yuji_miyake</span>
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
              © 2026 VUELTA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed CTA Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
      >
        <a
          href="https://www.instagram.com/vuelta_bar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 bg-vuelta-gold text-white rounded-full shadow-lg hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider uppercase"
          aria-label="Reserve via Instagram DM"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Reserve via DM</span>
        </a>
      </motion.div>

      {/* Fixed CTA Button - Desktop */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="hidden md:block fixed bottom-8 right-8 z-50"
      >
        <a
          href="https://www.instagram.com/vuelta_bar"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-4 bg-vuelta-gold text-white rounded-full shadow-xl hover:bg-vuelta-gold-light hover:shadow-2xl transition-all duration-300 font-annam text-sm tracking-wider uppercase"
          aria-label="Reserve via Instagram DM"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Reserve via DM</span>
        </a>
      </motion.div>
      </div>
    </main>
  )
}

