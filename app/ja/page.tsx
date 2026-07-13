'use client'

import {
  BAR_LOGO_IMAGE_URL,
  MAPS_EMBED_URL,
  MAPS_SEARCH_URL,
  POSTAL_CODE,
  STORE_ADDRESS_JA_LINE,
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
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

// Header Component (日本語版)

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

  const faqs = featuredFaqs.map((f) => ({ q: f.ja.q, a: f.ja.a }))

  // Structured Data for SEO — BarOrPub + WebSite + Breadcrumbs
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "@id": barStructuredDataId('ja'),
      "name": "Bar VUELTA",
      "alternateName": ["ブエルタ", "ヴエルタ", "VUELTA 広島", "広島カクテルバー VUELTA"],
      "url": barStructuredDataUrl('ja'),
      "inLanguage": "ja",
      "description": "広島市中区大手町のクラフトカクテルバー。中電前駅徒歩1分。桜尾ジンや広島レモンなど広島の地酒や地元食材を使ったシグネチャーカクテル。デートや記念日にも、女性一人でも訪れやすい落ち着いた空間。英語対応、ウォークインOK。",
      "image": [BAR_LOGO_IMAGE_URL],
      "logo": BAR_LOGO_IMAGE_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "広島県広島市中区大手町3-3-5 掛江ビル201",
        "addressLocality": "広島市",
        "addressRegion": "広島県",
        "postalCode": POSTAL_CODE,
        "addressCountry": "JP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "34.3893126",
        "longitude": "132.4541761"
      },
      "hasMap": "https://www.google.com/maps/place/VUELTA",
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
      "servesCuisine": ["クラフトカクテル", "フィンガーフード", "タコス"],
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
          "name": "席予約"
        }
      },
      "paymentAccepted": "現金, クレジットカード, 電子マネー",
      "areaServed": {
        "@type": "City",
        "name": "広島市"
      },
      "knowsLanguage": ["ja", "en"],
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
      "inLanguage": ["ja", "en"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${barStructuredDataUrl('ja')}#faq`,
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "ホーム",
          "item": "https://www.vuelta.jp/ja"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "メニュー",
          "item": "https://www.vuelta.jp/menu"
        }
      ]
    }
  ]

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
      <SiteHeader lang="ja" />

      <div id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24" aria-label="ヒーローセクション">
          {/* Background */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(58%_42%_at_50%_0%,rgba(18,41,31,0.06),transparent_70%)]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <div className="flex flex-col items-center">
              {/* Text Content */}
              <div className="text-center mb-6 md:mb-12 w-full px-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="font-annam text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-[0.08em] md:tracking-[0.12em] mb-4 md:mb-6 text-balance"
                  aria-hidden="true"
                >
                  V U E L T A
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-japanese text-base sm:text-lg md:text-xl text-vuelta-text-light font-light leading-snug tracking-wide mb-3 md:mb-5 px-2"
                >
                  広島のクラフトカクテルバー
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="font-japanese text-sm sm:text-base md:text-lg lg:text-xl text-vuelta-text-light leading-relaxed mb-4 md:mb-6 px-2 max-w-3xl mx-auto text-pretty"
                >
                  <p>
                    中電前駅から徒歩1分、掛江ビル2階のちいさなカクテルバー。広島の地酒と地元食材で仕立てるクラフトカクテルを、静かな夜に。
                  </p>
                </motion.div>
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
                    aria-label="オンラインで予約する"
                  >
                    予約する
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
                  className="flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-vuelta-text-light mb-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-vuelta-gold shadow-[0_0_8px_rgba(26,58,46,0.55)]" aria-hidden="true"></span>
                  OPEN 18:00 – 02:00 / CLOSED THU
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
                    alt="広島大手町のクラフトカクテルバー VUELTA — 桜のガーニッシュを添えたシグネチャーカクテル"
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

        {/* Info bar — 主要情報を一列で */}
        <div className="border-y border-vuelta-light/60 bg-white" aria-label="基本情報">
          <ul className="flex flex-wrap justify-center items-center px-4 sm:px-6 py-4 list-none">
            <li className="font-mono text-[10.5px] tracking-[0.18em] text-vuelta-gold px-4 sm:px-7 py-1 whitespace-nowrap">OPEN 18:00 – 02:00 / CLOSED THU</li>
            <li className="font-mono text-[10.5px] tracking-[0.18em] text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">1 MIN WALK FROM CHUDENMAE</li>
            <li className="font-mono text-[10.5px] tracking-[0.18em] text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">COUNTER 8 / STANDING 8</li>
            <li className="font-mono text-[10.5px] tracking-[0.18em] text-vuelta-text-light px-4 sm:px-7 py-1 whitespace-nowrap border-l border-vuelta-light">WALK-INS WELCOME</li>
          </ul>
        </div>

        {/* About Section（旧 Brand Concept + Mission を統合） */}
        <section id="about" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto scroll-mt-20" aria-label="VUELTAについて">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
            <FadeInUp>
              <div className="space-y-6 md:space-y-8">
                <p className="font-japanese text-xs sm:text-sm tracking-[0.2em] text-vuelta-gold">
                  広島大手町のクラフトカクテルバー
                </p>
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-gold">
                  About<span className="inline-block w-2 sm:w-4 md:w-8"></span>V U E L T A
                </h2>
                <div className="space-y-5 md:space-y-6 text-vuelta-text-light font-japanese text-base md:text-lg leading-loose text-pretty">
                  <p>
                    中電前駅から徒歩1分、掛江ビル2階。カウンター中心の小さな空間で、本格的なクラフトカクテルを静かに楽しめます。
                  </p>
                  <p className="text-xl text-vuelta-gold-light font-semibold">
                    おかえりとはじめましてが交差する。
                  </p>
                  <p>
                    VUELTA はスペイン語で「再会、回帰、循環」。広島を訪れる旅人と地元の人が一杯のカクテルを介して出会い、本当の広島を感じてもらう場所です。
                  </p>
                </div>
                <div className="pt-6 md:pt-8 border-t border-vuelta-gray/30 space-y-5 md:space-y-6">
                  <p className="font-annam text-xl sm:text-2xl md:text-3xl font-light text-vuelta-gold-light italic leading-snug">
                    Food is the Invitation,<br />
                    People are the Destination.
                  </p>
                  <p className="font-japanese text-base md:text-lg leading-loose text-vuelta-text-light text-pretty">
                    桜尾ジン、戸河内ウイスキー、広島レモン、賀茂鶴の日本酒。広島の地酒と地元食材を、世界中のバーカルチャーと融合させた一杯に。お好み焼きをグラスに閉じ込めた「The OKONOMIYAKI」、牡蠣に着想を得た「Shell We?」など、この街でしか飲めないシグネチャーをご用意しています。
                  </p>
                  <p className="font-japanese text-base md:text-lg leading-loose text-vuelta-gold-light text-pretty">
                    カクテルは手段、目的は人と人をつなぐこと。それが私たちの使命です。
                  </p>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group">
                <Image
                  src="/images/interior.png"
                  alt="広島大手町のクラフトカクテルバー VUELTA の店内 — 掛江ビル2階、中電前駅徒歩1分"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={blurDataUrl('/images/interior.png')}
                />
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Featured Menu Section */}
        <section id="menu" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 bg-white scroll-mt-20" aria-label="メニュー">
          <div className="max-w-6xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-12 md:mb-16 lg:mb-24 px-4">
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light mb-2 md:mb-3 tracking-wide">
                  Menu
                </h2>
                <p className="font-japanese text-sm sm:text-base text-vuelta-text-light tracking-wide">
                  広島ならではのシグネチャーカクテル
                </p>
              </div>
            </FadeInUp>

            {/* Asymmetric grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 max-w-7xl mx-auto items-stretch">
              {[
                { name: 'Shell We?', alt: '桜尾ジンと広島の牡蠣を使ったシグネチャーカクテル「Shell We?」', description: '当店誕生時に考案した原点の一杯。広島の牡蠣。Shall we?とShell（貝）を掛けた名前。桜尾ジンと自家製出汁酢が旨味を引き立てる。広島の海を五感で、この一杯から。', price: '¥1,600', tag: 'Signature', image: '/images/cocktails/shellwe.png' },
                { name: 'The OKONOMIYAKI', alt: '広島のお好み焼きをグラスに閉じ込めたカクテル「The OKONOMIYAKI」', description: '鉄板の音と湯気の向こうに見える、あの味覚。だしの旨み、オタフクソース、トマトの甘みがグラスでひとつに。広島の食文化を、そのまま飲む体験。', price: '¥1,200', tag: 'Signature', image: '/images/cocktails/okonomiyaki.png', objectPosition: 'center 55%' },
                { name: '26 hours', alt: 'トマトときゅうりの透明感あるクラフトカクテル「26 hours」', description: '閉店は深夜2時。24+2=26時間飲み続けていられる想いを込めた一杯。クリスタルのような透明感。澄んだトマトときゅうりの清涼感、スッと喉を通る軽やかさ。', price: '¥1,250', tag: 'Late pour', image: '/images/cocktails/26hours.png', objectPosition: 'center center' },
                {
                  name: 'Spring Bloom Margarita',
                  alt: '桜リキュールとテキーラの春のマルガリータ「Spring Bloom Margarita」',
                  description:
                    '春の桜をグラスに。テキーラシルバー、桜リキュール、レモン、花びらの香り。伝統の枡（ます）で味わえば、桜の香りにレモンの酸味、テキーラのキレが重なり、春の夜にぴったりの一杯に。',
                  price: '¥1,000',
                  tag: 'Seasonal',
                  image: '/images/cocktails/sakura-margarita.png',
                  objectPosition: 'center 42%',
                },
              ].map((item, index) => {
                return (
                  <FadeInUp key={index} delay={index * 0.1}>
                    <div className="group relative h-full flex flex-col bg-white border border-vuelta-light rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(18,41,31,0.35)]" role="article" aria-label={item.alt}>
                      <div className="relative aspect-square bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white overflow-hidden focus-within:ring-2 focus-within:ring-vuelta-gold focus-within:ring-offset-2">
                        {item.image && !imageErrors[index] ? (
                          <>
                            <Image
                              src={item.image}
                              alt={item.alt}
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
                        <p className="font-japanese text-vuelta-text-light text-[13px] leading-relaxed flex-1">
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

        {/* FIRST DRINK PASS — 浮き上がるチケット */}
        <section className="py-14 md:py-24 px-4 sm:px-6 bg-white" aria-label="First Drink Pass">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <div className="text-center mb-10 md:mb-12">
                <p className="font-annam text-sm uppercase tracking-[0.3em] text-vuelta-gold mb-2">Membership</p>
                <h2 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-text mb-3">
                  Your first drink is on us. Every visit.
                </h2>
                <p className="font-japanese text-sm text-vuelta-text-light tracking-wide">
                  来店のたびに一杯目が無料になる、ウォレットカードのサブスクリプション。
                </p>
              </div>
              <div className="relative max-w-3xl mx-auto grid sm:grid-cols-[minmax(0,1fr)_190px] bg-white border border-vuelta-light rounded shadow-[0_44px_90px_-36px_rgba(26,58,46,0.42),0_18px_40px_-22px_rgba(26,58,46,0.3)] hover:-translate-y-1.5 hover:shadow-[0_56px_100px_-36px_rgba(26,58,46,0.48),0_24px_48px_-22px_rgba(26,58,46,0.34)] transition-all duration-300">
                <span className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white ring-1 ring-vuelta-light" aria-hidden="true"></span>
                <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white ring-1 ring-vuelta-light" aria-hidden="true"></span>
                <div className="p-8 sm:p-11 text-left">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.34em] text-vuelta-gold mb-2">Membership — First Drink Pass</p>
                  <h3 className="font-annam text-3xl sm:text-4xl font-normal tracking-wide mb-3">FIRST DRINK PASS</h3>
                  <p className="font-japanese text-[15px] text-vuelta-text-light mb-6 max-w-md leading-relaxed">
                    月額1,980円で、来店するたびに1杯無料。VUELTAは「再会」という意味 — これはそのためのチケットです。
                  </p>
                  <Link
                    href="/ja/subscription"
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

        {/* こんな夜に — デート/英語対応/ひとり飲み歓迎 */}
        <section className="py-12 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-vuelta-gray/10" aria-label="VUELTAでの過ごし方">
          <div className="max-w-5xl mx-auto text-center">
            <FadeInUp>
              <p className="font-japanese text-xs sm:text-sm tracking-[0.2em] text-vuelta-gold mb-3">
                VUELTAでの夜
              </p>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-gold mb-10 md:mb-14 tracking-wide">
                An Evening at VUELTA
              </h2>
              <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-annam text-base md:text-lg text-vuelta-gold tracking-wider uppercase">
                    Date and Anniversary
                  </h3>
                  <p className="font-japanese text-sm sm:text-base leading-loose text-vuelta-text-light text-pretty">
                    16席の小さな空間。声を張らずに話せる距離感が、二人の会話を邪魔しません。デートや記念日、誕生日に。
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-annam text-base md:text-lg text-vuelta-gold tracking-wider uppercase">
                    English Friendly
                  </h3>
                  <p className="font-japanese text-sm sm:text-base leading-loose text-vuelta-text-light text-pretty">
                    英語対応スタッフが在籍。原爆ドームや宮島観光のあと、広島の夜を地元の人と過ごしたい旅人を歓迎します。メニューは英訳付き。
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-vuelta-gold/10 flex items-center justify-center border border-vuelta-gold/20">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-vuelta-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-annam text-base md:text-lg text-vuelta-gold tracking-wider uppercase">
                    Solo Friendly
                  </h3>
                  <p className="font-japanese text-sm sm:text-base leading-loose text-vuelta-text-light text-pretty">
                    カウンター中心の小さな店。お一人でも肩肘張らず、バーテンダーがその日の気分に合わせた一杯をご提案します。
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Location/Access Section */}
        <section id="reservation" className="py-12 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 scroll-mt-20" aria-label="アクセス">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
              <FadeInUp>
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <p className="font-japanese text-xs sm:text-sm tracking-[0.2em] text-vuelta-gold mb-3">
                    中電前駅から徒歩1分
                  </p>
                  <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light mb-4 md:mb-6 lg:mb-8 tracking-wide">
                    Visit Us
                  </h2>
                  <div className="space-y-5 md:space-y-6 lg:space-y-8 font-japanese text-sm sm:text-base text-vuelta-text-light">
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
                        〒{POSTAL_CODE}<br />
                        {STORE_ADDRESS_JA_LINE}
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
                          <span>中電前駅から徒歩1分で着きます。</span>
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
                        Opening Hours
                      </h3>
                      <div className="flex gap-1.5 max-w-[340px] mb-3" aria-label="木曜以外、毎日営業">
                        {(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const).map((d) => (
                          d === 'THU' ? (
                            <span key={d} className="flex-1 text-center font-mono text-[11px] py-2 rounded border border-dashed border-[#d9c3bc] text-[#9c5844] line-through">
                              {d}
                            </span>
                          ) : (
                            <span key={d} className="flex-1 text-center font-mono text-[11px] py-2 rounded border border-vuelta-gold/30 bg-vuelta-gold/5 text-vuelta-gold">
                              {d}
                            </span>
                          )
                        ))}
                      </div>
                      <p className="text-lg tabular-nums">
                        18:00 – 02:00<br />
                        <span className="text-sm text-vuelta-text-light">Last Order 1:00</span><br />
                        <span className="text-sm text-[#9c5844]">木曜定休</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                        Seating
                      </h3>
                      <p className="text-base sm:text-lg">
                        Counter 8 / Standing 8<br />
                        <span className="text-sm text-vuelta-text-light">会話を楽しめる、親密な小空間。</span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
                        Reservation
                      </h3>
                      <p className="text-base sm:text-lg mb-3">
                        オンラインでご予約いただけます。
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        {/* Square オンライン予約 */}
                        <a
                          href={RESERVATION_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors rounded-lg font-annam text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2"
                          aria-label="オンラインで予約する"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
                          </svg>
                          <span>予約する</span>
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
                      title="VUELTA 場所"
                      aria-label="VUELTA 場所の地図"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-24 px-4 sm:px-8 border-t border-vuelta-gray/30" aria-label="よくある質問">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <p className="font-japanese text-xs sm:text-sm tracking-[0.2em] text-vuelta-gold mb-3">よくある質問</p>
              <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-text tracking-wide">FAQ</h2>
            </div>
            <div className="border-t border-vuelta-light">
              {faqs.map((f, i) => (
                <details key={f.q} className="group border-b border-vuelta-light/70" open={i === 0}>
                  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex justify-between items-baseline gap-5 py-5 font-japanese text-base sm:text-lg font-medium">
                    <span>{f.q}</span>
                    <span className="font-mono text-vuelta-gold shrink-0" aria-hidden="true">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">&ndash;</span>
                    </span>
                  </summary>
                  <p className="pb-6 font-japanese text-sm sm:text-base text-vuelta-text-light leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/ja/faq" className="font-japanese text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-wide">
                すべての質問を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
                <SiteFooter lang="ja" />

        {/* Fixed CTA Button */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="fixed z-50 md:hidden left-4 right-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-sm sm:-translate-x-1/2"
          style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <a
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-vuelta-gold text-white rounded-full shadow-lg hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider uppercase w-full"
            aria-label="オンラインで予約する"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
            </svg>
            <span>予約する</span>
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
            href={RESERVATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-6 py-4 bg-vuelta-gold text-white rounded-full shadow-xl hover:bg-vuelta-gold-light hover:shadow-2xl transition-all duration-300 font-annam text-sm tracking-wider uppercase"
            aria-label="オンラインで予約する"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
            </svg>
            <span>予約する</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </main>
  )
}
