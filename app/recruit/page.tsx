'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isRecruitPage = pathname === '/recruit'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gold/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="transition-opacity hover:opacity-80"
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

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 border-r border-vuelta-gold/30 pr-4">
              <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase">EN</span>
              <span className="text-vuelta-gray/60 text-xs">/</span>
              <a
                href="/ja"
                className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-wider uppercase"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('vuelta-language', 'ja')
                  router.push('/ja')
                }}
              >
                JA
              </a>
            </div>
            <div className="hidden md:flex items-center gap-8">
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link 
                href="/#menu" 
                className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
              >
                Menu
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link 
                href="/#about" 
                className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
              >
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link 
                href="/#manager" 
                className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
              >
                Manager
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link 
                href="/#reservation" 
                className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
              >
                Visit Us
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <Link
                href="/recruit"
                className="font-annam text-xs text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.15em] uppercase font-semibold block"
              >
                Recruit
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <a
                href="https://www.instagram.com/vuelta_bar"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-xs tracking-[0.15em] uppercase block"
              >
                Reserve via DM
              </a>
            </motion.div>
          </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-vuelta-gold transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-vuelta-gold transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-vuelta-gold transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden mt-6 pt-6 border-t border-vuelta-gold/20"
          >
            <div className="flex flex-col">
              <Link href="/#menu" className="font-annam text-sm text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Menu</Link>
              <Link href="/#about" className="font-annam text-sm text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/#manager" className="font-annam text-sm text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Manager</Link>
              <Link href="/#reservation" className="font-annam text-sm text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Visit Us</Link>
              <Link href="/recruit" className="font-annam text-sm text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Recruit</Link>
              <a href="https://www.instagram.com/vuelta_bar" target="_blank" rel="noopener noreferrer" className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center mt-4 pt-4 border-t border-vuelta-gold/20" onClick={() => setIsMenuOpen(false)}>Reserve via DM</a>
            </div>
          </motion.nav>
        )}
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

// Number component for stylish numbering
const Number = ({ num }: { num: string }) => (
  <span className="font-annam text-6xl md:text-8xl font-light text-vuelta-gold/5 leading-none select-none">
    {num}
  </span>
)


export default function Recruit() {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Bartender and Service Staff - VUELTA",
    "description": "Join VUELTA team. We are looking for passionate people who love food and hospitality. English speakers welcome.",
    "identifier": {
      "@type": "PropertyValue",
      "name": "VUELTA",
      "value": "RECRUIT"
    },
    "datePosted": "2024-01-01",
    "employmentType": "PART_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "VUELTA",
      "sameAs": "https://www.instagram.com/vuelta_bar"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3-3-5 Ote-machi, Naka-ku, Kakee Building 2F",
        "addressLocality": "Hiroshima",
        "addressRegion": "Hiroshima Prefecture",
        "postalCode": "730-0051",
        "addressCountry": "JP"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "JPY",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": 1200,
        "maxValue": 1200,
        "unitText": "HOUR"
      }
    },
    "workHours": "18:00-02:00",
    "url": "https://vuelta-bar.com/recruit"
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />

      {/* Hero Section - Bold & Minimal */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-vuelta-gold/5"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="mb-12">
                <span className="font-sans text-xs text-vuelta-gold/60 tracking-[0.3em] uppercase mb-4 block">
                  Join Us
                </span>
                <h1 className="font-annam text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-vuelta-gold mb-8 leading-[0.9]">
                  RECRUIT
                </h1>
                <div className="h-px w-24 bg-vuelta-gold mb-12"></div>
                <p className="font-japanese text-base sm:text-lg md:text-xl text-vuelta-gold/90 leading-relaxed mb-12">
                  VUELTAで、<span className="text-vuelta-gold font-medium">一緒に働きませんか？</span><br />
                  新しい出会いと繋がりを生み出す場所です。
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="border-t border-vuelta-gold/20 pt-12 mt-12"
            >
              <span className="font-sans text-xs text-vuelta-gold/60 tracking-[0.3em] uppercase mb-4 block">
                We Are Looking For
              </span>
              <p className="font-japanese text-lg sm:text-xl md:text-2xl text-vuelta-gold/90 leading-relaxed">
                <span className="text-vuelta-gold font-medium">一緒に働きたい仲間</span>を<br />
                募集しています
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-40 px-4 sm:px-6 md:px-12 bg-vuelta-gold text-white">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-start gap-4 mb-8">
                  <Number num="01" />
                  <div className="pt-4">
                    <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light mb-6 text-white">
                      Our Philosophy
                    </h2>
                  </div>
                </div>
              </div>
              <div className="space-y-6 font-japanese text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                <p>
                  <span className="text-white font-medium">おかえりとはじめましてが交差する</span><br />
                  VUELTAは、ただのバーではありません。<br />
                  世界中から平和を願う人たちと、地元の人々が出会う場所です。
                </p>
                <p>
                  私たちが提供する飲み物、料理は、<br />
                  ゲストをこの交差点に招くための<span className="text-white font-medium">招待状</span>です。<br />
                  ゲストが本当に求めているのは、<br />
                  そこで待つあなたという<span className="text-white font-medium">人</span>と、<br />
                  あなたが生み出す温かい空気です。
                </p>
                <p>
                  私たちのゴールは、<br />
                  <span className="text-white font-medium">美味しかったの先にある、あなたに会えてよかった</span>を創造することです。<br />
                  ここで働くあなたは、<br />
                  世界中の人々と出会い、<br />
                  言葉を超えた<span className="text-white font-medium">心のつながり</span>を生み出す、<br />
                  大切な存在です。
                </p>
                <p>
                  英語を話せれば、より多くのゲストと深くコミュニケーションが取れます。<br />
                  でも、英語が話せなくても<span className="text-white font-medium">全く問題ありません</span>。<br />
                  大切なのは、英語を話そうとする<span className="text-white font-medium">勇気</span>と、<br />
                  相手を思いやる<span className="text-white font-medium">心</span>です。<br />
                  ここでは、そんなあなたの<span className="text-white font-medium">姿勢</span>が、<br />
                  何よりも価値のあるものになります。
                </p>
                <p>
                  食べることが好きな人、<br />
                  人と出会うことが好きな人、<br />
                  新しい世界を体験したい人、<br />
                  そんなあなたを、私たちは心から歓迎します。
                </p>
                <p className="text-white/60 italic text-xl md:text-2xl mt-8 pt-8 border-t border-white/20">
                  "Food is the Invitation,<br />
                  People are the Destination"
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-16 md:py-40 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="flex items-start gap-4 mb-16">
              <Number num="02" />
              <div className="pt-4">
                <span className="font-sans text-xs text-vuelta-gold/60 tracking-[0.3em] uppercase mb-4 block">
                  Open Positions
                </span>
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-gold mb-2">
                  募集職種
                </h2>
                <div className="h-px w-16 bg-vuelta-gold mt-4"></div>
              </div>
            </div>
          </FadeInUp>

          <div className="space-y-12 md:space-y-16">
            {/* Bartender & Server Position */}
            <FadeInUp delay={0.1}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-5 gap-8 md:gap-12 pb-12 md:pb-16 group"
              >
                <div className="md:col-span-2">
                  <h3 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-gold mb-4 group-hover:text-vuelta-gold-light transition-colors">
                    Bartender & Server
                  </h3>
                  <p className="font-japanese text-sm text-vuelta-gold/70 tracking-[0.15em] mb-6">
                    バーテンダー・ホールスタッフ
                  </p>
                </div>
                <div className="md:col-span-3 space-y-8">
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-6">
                      Compensation / 給与
                    </h4>
                    <div className="space-y-6">
                      <div className="border-l-2 border-vuelta-gold/30 pl-6">
                        <p className="font-japanese text-lg text-vuelta-gold/80 mb-2">
                          アルバイト
                        </p>
                        <p className="font-japanese text-2xl text-vuelta-gold font-medium">
                          時給 1,200円以上
                        </p>
                      </div>
                      <div className="border-l-2 border-vuelta-gold/30 pl-6">
                        <p className="font-japanese text-lg text-vuelta-gold/80 mb-2">
                          社員
                        </p>
                        <p className="font-japanese text-2xl text-vuelta-gold font-medium">
                          月給 25万円以上
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Requirements / 応募条件
                    </h4>
                    <ul className="space-y-4 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>飲食が好きな人</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>カクテル作りとおもてなしへの情熱</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>フレンドリーで外向的な性格</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>多様なゲストと働くことへの興味</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>チームワークと前向きな姿勢</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>成長への意欲</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>英語を話せない人も大歓迎です</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/50 mt-1.5 text-lg">—</span>
                        <span>経験は歓迎しますが必須ではありません。研修を提供します。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeInUp>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-40 px-4 sm:px-6 md:px-12 bg-vuelta-gold/5">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="flex items-start gap-4 mb-16">
              <Number num="03" />
              <div className="pt-4">
                <span className="font-sans text-xs text-vuelta-gold/60 tracking-[0.3em] uppercase mb-4 block">
                  What We Offer
                </span>
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-gold mb-2">
                  私たちが提供するもの
                </h2>
                <div className="h-px w-16 bg-vuelta-gold mt-4"></div>
              </div>
            </div>
          </FadeInUp>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeInUp delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-vuelta-gold/30 flex items-center justify-center">
                    <span className="text-vuelta-gold text-xl">01</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-semibold text-vuelta-gold mb-2 tracking-wide">
                      Training & Development
                    </h4>
                    <p className="font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      カクテル作りから接客まで、<br />
                      実践的なスキルを学べます
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-vuelta-gold/30 flex items-center justify-center">
                    <span className="text-vuelta-gold text-xl">02</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-semibold text-vuelta-gold mb-2 tracking-wide">
                      Diverse Environment
                    </h4>
                    <p className="font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      海外からのお客様と地元の人たちが交わる、<br />
                      多様な環境で働けます
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-vuelta-gold/30 flex items-center justify-center">
                    <span className="text-vuelta-gold text-xl">03</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-semibold text-vuelta-gold mb-2 tracking-wide">
                      Beyond the Bar
                    </h4>
                    <p className="font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      東京での研修や、<br />
                      優れたBAR・レストランでの見学を通じて、<br />
                      新しい視点を学べます
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 border border-vuelta-gold/30 flex items-center justify-center">
                    <span className="text-vuelta-gold text-xl">04</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-lg font-semibold text-vuelta-gold mb-2 tracking-wide">
                      Supportive Team
                    </h4>
                    <p className="font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      チーム全体で支え合い、<br />
                      成長できる環境です
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="py-16 md:py-40 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <FadeInUp>
            <div className="flex items-start gap-4 mb-16">
              <Number num="04" />
              <div className="pt-4">
                <span className="font-sans text-xs text-vuelta-gold/60 tracking-[0.3em] uppercase mb-4 block">
                  How to Apply
                </span>
                <h2 className="font-annam text-3xl sm:text-4xl md:text-5xl font-light text-vuelta-gold mb-2">
                  応募方法
                </h2>
                <div className="h-px w-16 bg-vuelta-gold mt-4"></div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="max-w-3xl">
              <p className="font-japanese text-xl md:text-2xl text-vuelta-gold/90 leading-relaxed mb-12">
                VUELTAで一緒に働きませんか？<br />
                InstagramのDMでお気軽にご連絡ください。
              </p>

              <div className="flex justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/vuelta_bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram DMで応募する</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 sm:px-6 border-t border-vuelta-gold/20">
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
              <p className="font-japanese text-sm text-vuelta-gold/70 mb-3">
                Experience the art of mixology
              </p>
              <p className="font-japanese text-xs text-vuelta-gold/60">
                We'll Do Our Best to Communicate • International Guests Welcome<br />
                Free Wi-Fi Available • Where Locals Really Go
              </p>
            </div>
            <div>
              <h4 className="font-annam text-xs uppercase tracking-wider mb-4 text-vuelta-gold/80">
                Quick Links
              </h4>
              <ul className="space-y-3 font-annam text-sm">
                <li>
                  <Link 
                    href="/#menu" 
                    className="text-vuelta-gold/70 hover:text-vuelta-gold transition-colors font-annam"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/#about" 
                    className="text-vuelta-gold/70 hover:text-vuelta-gold transition-colors font-annam"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/recruit" 
                    className="text-vuelta-gold hover:text-vuelta-gold-light transition-colors font-annam font-semibold"
                  >
                    Recruit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-annam text-xs uppercase tracking-wider mb-4 text-vuelta-gold/80">
                Follow Us
              </h4>
              <ul className="space-y-3 font-annam text-sm">
                <li>
                  <a 
                    href="https://www.instagram.com/vuelta_bar" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vuelta-gold/70 hover:text-vuelta-gold transition-colors font-annam"
                  >
                    @vuelta_bar
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.instagram.com/yuji_miyake"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vuelta-gold/70 hover:text-vuelta-gold transition-colors font-annam"
                  >
                    @yuji_miyake
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-vuelta-gold/20 text-center">
            <p className="font-sans text-xs text-vuelta-gold/60">
              © 2026 VUELTA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
