'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

// Header Component (日本語版)
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isRecruitPage = pathname === '/ja/recruit'

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
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b ${isRecruitPage ? 'border-vuelta-gold/20' : 'border-vuelta-gray/50'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/ja"
            className="transition-opacity hover:opacity-80"
            aria-label="VUELTA ホーム"
          >
            <Image
              src="/images/vuelta-logo.png"
              alt="VUELTA"
              width={250}
              height={85}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* EN/JA - Left of menu button (both mobile and desktop) */}
            <div className="flex items-center gap-2 border-r border-vuelta-gray/40 pr-4 min-w-[3rem] flex-shrink-0">
              <a
                href="/"
                className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center inline-block"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('vuelta-language', 'en')
                  router.push('/')
                }}
              >
                EN
              </a>
              <span className="text-vuelta-gray/60 text-xs flex-shrink-0">/</span>
              <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">JA</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-3 min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded transition-all"
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
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
              className="mt-6 pt-6 border-t border-vuelta-gray/20"
              aria-label="メインナビゲーション"
            >
              <div className="flex flex-col">
                <a href={isRecruitPage ? "/ja#about" : "#about"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#about'); setIsMenuOpen(false) }}>About</a>
                <a href={isRecruitPage ? "/ja#menu" : "#menu"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#menu'); setIsMenuOpen(false) }}>Menu</a>
                <a href={isRecruitPage ? "/ja#reservation" : "#reservation"} className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={(e) => { if (!isRecruitPage) handleAnchorClick(e, '#reservation'); setIsMenuOpen(false) }}>Access</a>
                <Link href="/recruit" className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Recruit</Link>
                <a href="https://www.instagram.com/vuelta_bar" target="_blank" rel="noopener noreferrer" className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center mt-4 pt-4 border-t border-vuelta-gray/20" onClick={() => setIsMenuOpen(false)}>Reserve via DM</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

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

export default function HomeJA() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

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

  const getCurrentHours = () => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    
    if (day === 4) return { isOpen: false, status: '本日休業' }
    
    if (hour >= 18 || hour < 2) {
      return { isOpen: true, status: '営業中' }
    }
    return { isOpen: false, status: '18:00 開店' }
  }

  const hoursStatus = getCurrentHours()

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": "VUELTA",
    "description": "広島のプレミアムカクテルバー。国際的なお客様と地元の人々が出会う場所。世界クラスのカクテルと本格的な広島のホスピタリティを体験。",
    "image": [
      "https://vuelta-bar.com/images/vuelta-logo.png"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "広島県広島市中区大手町3-3-5 掛江ビル 2F",
      "addressLocality": "広島",
      "addressRegion": "広島県",
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
    "servesCuisine": "カクテル",
    "url": "https://vuelta-bar.com/ja",
    "sameAs": [
      "https://www.instagram.com/vuelta_bar"
    ],
    "acceptsReservations": true,
    "paymentAccepted": "現金, クレジットカード"
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        メインコンテンツへスキップ
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
        <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24" aria-label="ヒーローセクション">
          {/* Background */}
          <div className="absolute inset-0 bg-white">
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="font-japanese text-sm sm:text-base md:text-lg lg:text-xl text-vuelta-text-light leading-relaxed mb-4 md:mb-6 px-2 max-w-5xl mx-auto space-y-2"
                >
                  <p>
                    <span className="md:hidden">
                      おかえりとはじめましてが交差する。<br />
                      雑居ビル2階に潜む、架空の貿易拠点。
                    </span>
                    <span className="hidden md:inline">
                      おかえりとはじめましてが交差する。雑居ビル2階に潜む、架空の貿易拠点。
                    </span>
                  </p>
                  <p>
                    <span className="md:hidden">
                      世界中の洗練されたバーカルチャーを輸入し、<br />
                      広島のローカルな魂を世界へ輸出する。
                    </span>
                    <span className="hidden md:inline">
                      世界中の洗練されたバーカルチャーを輸入し、広島のローカルな魂を世界へ輸出する。
                    </span>
                  </p>
                </motion.div>
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
                    className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                    aria-label="Reserve via DM"
                  >
                    Reserve via DM
                  </a>
                  <a
                    href="#menu"
                    onClick={(e) => handleAnchorClick(e, '#menu')}
                    className="px-6 sm:px-8 py-3 min-h-[44px] flex items-center justify-center bg-vuelta-gold text-white hover:bg-vuelta-gold-light hover:text-vuelta-text transition-all duration-300 font-annam text-xs sm:text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded w-full sm:w-auto"
                    aria-label="View Menu"
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
                    alt="VUELTA バー内装 - カクテルバー"
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
        <section id="about" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20" aria-label="VUELTAについて">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            <FadeInUp>
              <div className="space-y-6 md:space-y-8 lg:space-y-10">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-vuelta-gold mb-6 md:mb-8">
                  About<span className="inline-block w-2 sm:w-4 md:w-8"></span>V U E L T A
                </h2>
                <div className="space-y-6 md:space-y-8 text-vuelta-text-light font-japanese text-sm sm:text-base md:text-lg leading-loose">
                  <p className="text-xl text-vuelta-gold-light font-semibold">
                    おかえりとはじめましてが交差する。
                  </p>
                  <p>
                    <span className="md:hidden">
                      VUELTAは、スペイン語で<br />
                      再会、回帰、循環を意味します。<br />
                      でも、ここではもっと特別な意味を持っています。<br />
                      広島は、世界中からいろんな人が訪れる街です。<br />
                      私たちは、この街で観光で来る人と地元の人が出会い、<br />
                      本当の広島を感じてもらえる場所を作りました。<br />
                      地元の人も集まる場所です。
                    </span>
                    <span className="hidden md:inline">
                      VUELTAは、スペイン語で再会、回帰、循環を意味します。<br />
                      でも、ここではもっと特別な意味を持っています。<br />
                      広島は、世界中からいろんな人が訪れる街です。<br />
                      私たちは、この街で観光で来る人と地元の人が出会い、本当の広島を感じてもらえる場所を作りました。地元の人も集まる場所です。
                    </span>
                  </p>
                  <div className="space-y-8 pt-8 border-t border-vuelta-gray/30">
                    <div>
                      <h3 className="font-annam text-lg text-vuelta-gold mb-3 tracking-wider uppercase">
                        For International Guests
                      </h3>
                      <p className="text-vuelta-text-light leading-loose">
                        観光地だけじゃなく地元の人と一緒に笑える本当の広島を体験できます。
                      </p>
                    </div>
                    <div>
                      <h3 className="font-annam text-lg text-vuelta-gold mb-3 tracking-wider uppercase">
                        For Locals
                      </h3>
                      <p className="text-vuelta-text-light leading-loose">
                        <span className="md:hidden">
                          いつもの日常だけど海外の雰囲気も感じられる。<br />
                          また新しい出会いがあって人とのつながりを感じられる場所です。
                        </span>
                        <span className="hidden md:inline">
                          いつもの日常だけど海外の雰囲気も感じられる。また新しい出会いがあって人とのつながりを感じられる場所です。
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-vuelta-gold-light italic pt-4">
                    <span className="md:hidden">
                      この二つの人生が交差して、<br />
                      また来たいと思う場所。<br />
                      それがVUELTAです。
                    </span>
                    <span className="hidden md:inline">
                      この二つの人生が交差してまた来たいと思う場所。<br />
                      それがVUELTAです。
                    </span>
                  </p>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group">
                <Image
                  src="/images/interior.png"
                  alt="VUELTA バー内装 - 掛江ビル入口"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-left">
            <FadeInUp>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-12 text-vuelta-gold px-4">
                Our Mission
              </h2>
              <p className="font-annam text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-8 md:mb-12 lg:mb-16 text-vuelta-gold-light italic px-4">
                Food is the Invitation,<br />
                People are the Destination.
              </p>
              <div className="space-y-6 md:space-y-8 text-vuelta-text font-japanese text-sm sm:text-base md:text-lg leading-relaxed w-full px-4">
                <p className="leading-relaxed">
                  <span className="md:hidden">
                    私たちが出す飲み物や料理は<br />
                    この場所に来てもらうための招待状です。<br />
                    広島の海と陸と里から生まれた素材を使い、<br />
                    世界中のバーカルチャーと融合させたカクテル。<br />
                    それらは単なる飲み物ではなく、<br />
                    お客様をこの空間へと導く最初のきっかけです。
                  </span>
                  <span className="hidden md:inline">
                    私たちが出す飲み物や料理はこの場所に来てもらうための招待状です。広島の海と陸と里から生まれた素材を使い、世界中のバーカルチャーと融合させたカクテル。それらは単なる飲み物ではなく、お客様をこの空間へと導く最初のきっかけです。
                  </span>
                </p>
                <p className="leading-relaxed">
                  <span className="md:hidden">
                    しかしお客様が本当に求めているのは<br />
                    そこで待っている人が作る温かい空間や、<br />
                    スタッフとのコミニケーションだと考えています。<br />
                    カウンター越しの会話、<br />
                    隣に座る見知らぬ人との偶然の出会い、<br />
                    スタッフが語るカクテルに込められたストーリー。<br />
                    それらすべてが織りなす、<br />
                    この場所だけの特別な時間。
                  </span>
                  <span className="hidden md:inline">
                    しかしお客様が本当に求めているのはそこで待っている人が作る温かい空間や、<br />
                    スタッフとのコミニケーションだと考えています。カウンター越しの会話、隣に座る見知らぬ人との偶然の出会い、スタッフが語るカクテルに込められたストーリー。
                  </span>
                </p>
                <p className="leading-relaxed hidden md:block">
                  それらすべてが織りなす、<br />
                  この場所だけの特別な時間。
                </p>
                <p className="leading-relaxed">
                  <span className="md:hidden">
                    美味しかったという記憶は、<br />
                    いつか薄れていくかもしれません。<br />
                    しかし、そこで生まれた人とのつながり、<br />
                    会話の温かさ、<br />
                    また来たいと思える居心地の良さ。<br />
                    それらは時間が経っても色褪せない、<br />
                    かけがえのない体験として残ります。
                  </span>
                  <span className="hidden md:inline">
                    美味しかったという記憶は、いつか薄れていくかもしれません。しかし、そこで生まれた人とのつながり、会話の温かさ、また来たいと思える居心地の良さ。それらは時間が経っても色褪せない、かけがえのない体験として残ります。
                  </span>
                </p>
                <p className="text-vuelta-gold-light pt-4 md:pt-6 leading-relaxed">
                  <span className="md:hidden">
                    私たちの目標は美味しかったの先に<br />
                    あるあなたに会えてよかったを生み出すことです。
                  </span>
                  <span className="hidden md:inline">
                    私たちの目標は美味しかったの先にあるあなたに会えてよかったを生み出すことです。
                  </span>
                </p>
                <p className="text-vuelta-gold-light leading-relaxed">
                  カクテルは手段であり、目的は人と人をつなぐこと。それが私たちの使命です。
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Featured Menu Section */}
        <section id="menu" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-white scroll-mt-20" aria-label="メニュー">
          <div className="max-w-6xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-12 md:mb-16 lg:mb-24 px-4">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-6">
                  Menu
                </h2>
              </div>
            </FadeInUp>

            {/* Asymmetric grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
              {[
                { name: 'Shell We?', description: '牡蠣殻を漬け込んだウォッカが、瀬戸内の潮風と波音を運びます。フレッシュレモンの鮮やかな酸味とソーダが、まるで海岸線を歩いているかのような爽快感を生み出します。一口ごとに広がる、広島の海の記憶。', price: '¥750', image: '/images/cocktails/shellwe.jpg.png' },
                { name: 'The OKONOMIYAKI', description: '鉄板の音と湯気の向こうに見える、あの味覚。だしの深い旨み、オタフクソースの懐かしさ、トマトの甘みがグラスの中でひとつになり、一口飲むたびにお好み焼き屋の熱気が蘇ります。広島の食文化を、そのまま飲む体験。', price: '¥900', image: '/images/cocktails/okonomiyaki.jpg.png' },
                { name: 'Carnitas', description: '低温でゆっくり仕上げた豚肩肉が、フォークでほぐれるほどの柔らかさ。焦がした表面の香ばしさと、溶けるような脂の甘み。温めたトルティーヤにのせ、サルサをたっぷり。脂のうまみとスパイスが、カクテルとの相性も抜群。', price: '2個 ¥880', image: '/images/cocktails/e0d84016-b589-4ef5-8415-b00fc1c2bd83.png' },
              ].map((item, index) => {
                return (
                  <FadeInUp key={index} delay={index * 0.1}>
                    <div className="group cursor-pointer relative" role="article" aria-label={`${item.name} カクテル`}>
                      <div className="relative aspect-square bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white overflow-hidden mb-4 sm:mb-6 focus-within:ring-2 focus-within:ring-vuelta-gold focus-within:ring-offset-2 min-h-[280px] sm:min-h-[350px] md:min-h-[400px]">
                        {item.image && !imageErrors[index] ? (
                          <>
                            <Image
                              src={item.image}
                              alt={`${item.name} カクテル`}
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
                      <h3 className="font-annam text-2xl mb-3 group-hover:text-vuelta-gold transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="font-japanese text-vuelta-text-light text-sm leading-loose">
                        {item.description}
                      </p>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>
          </div>
        </section>

        {/* Location/Access Section */}
        <section id="reservation" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 scroll-mt-20" aria-label="アクセス">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <FadeInUp>
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 lg:mb-8">
                    Visit Us
                  </h2>
                  <div className="space-y-5 md:space-y-6 lg:space-y-8 font-japanese text-sm sm:text-base text-vuelta-text-light">
                    <div>
                      <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                        住所
                      </h3>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg hover:text-vuelta-gold transition-colors cursor-pointer block"
                      >
                        〒730-0051<br />
                        掛江ビル 2F<br />
                        広島県広島市中区大手町3-3-5
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
                          <span>最寄り駅: 中電前駅。</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                            <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <span>徒歩: 中電前駅から1分。</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 mt-0.5">
                            <svg className="w-6 h-6 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <span>広島市中心部に位置。</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                        Hours
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
                        <span className="text-sm text-vuelta-text-light">Intimate atmosphere perfect for conversation.</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                        Reservation
                      </h3>
                      <p className="text-base sm:text-lg mb-3">
                        InstagramのDMでご連絡ください。
                      </p>
                      <a
                        href="https://www.instagram.com/vuelta_bar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-japanese text-sm focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2"
                        aria-label="Reserve via DM"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>Reserve via DM</span>
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
                      title="VUELTA 場所"
                      aria-label="VUELTA 場所の地図"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=730-0051+広島市中区大手町3丁目3-5+掛江ビル2F"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-japanese text-sm"
                      aria-label="GoogleマップでVUELTAの場所を開く"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Googleマップで開く</span>
                    </a>
                    <a
                      href="https://www.instagram.com/vuelta_bar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold hover:text-white transition-colors rounded-lg font-japanese text-sm"
                      aria-label="Reserve via DM"
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
        <footer className="py-12 md:py-24 px-4 sm:px-8 border-t border-vuelta-gray/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
              <div>
                <Image
                  src="/images/vuelta-logo.png"
                  alt="VUELTA"
                  width={200}
                  height={68}
                  className="h-10 w-auto mb-6 object-contain opacity-80"
                />
              </div>
              <div>
                <h4 className="font-annam text-sm uppercase tracking-wider mb-6 text-vuelta-gold">
                  Quick Links
                </h4>
                <ul className="space-y-4 font-japanese text-sm">
                  <li>
                    <a 
                      href="#menu" 
                      className="group flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
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
                      className="group flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
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
                    <Link 
                      href="/recruit" 
                      className="group flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
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
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-annam text-sm uppercase tracking-wider mb-4 text-vuelta-gold">
                  Follow Us
                </h4>
                <ul className="space-y-3 font-japanese text-sm">
                  <li>
                    <a 
                      href="https://www.instagram.com/vuelta_bar" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                        <svg className="w-3 h-3 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-japanese font-medium flex-1">@vuelta_bar</span>
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
                      className="group flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg border border-vuelta-gray hover:border-vuelta-gold hover:bg-vuelta-gold/5 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-vuelta-gold/20 to-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20 group-hover:border-vuelta-gold/40 transition-colors">
                        <svg className="w-3 h-3 text-vuelta-gold" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-vuelta-text-light group-hover:text-vuelta-gold transition-colors font-japanese font-medium flex-1">@yuji_miyake</span>
                      <svg className="w-3 h-3 text-vuelta-text-light group-hover:text-vuelta-gold transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-12 border-t border-vuelta-gray/30 text-center">
              <p className="font-japanese text-xs text-vuelta-text-light">
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
          className="fixed z-50 md:hidden left-4 right-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-sm sm:-translate-x-1/2"
          style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <a
            href="https://www.instagram.com/vuelta_bar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-vuelta-gold text-white rounded-full shadow-lg hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider w-full"
            aria-label="Reserve via DM"
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
            className="group flex items-center gap-3 px-6 py-4 bg-vuelta-gold text-white rounded-full shadow-xl hover:bg-vuelta-gold-light hover:shadow-2xl transition-all duration-300 font-annam text-sm tracking-wider"
            aria-label="Reserve via DM"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Reserve via DM</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </main>
  )
}
