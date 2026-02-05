'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRecruitPage = pathname === '/recruit'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gold/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/"
            className="font-annam text-xl md:text-2xl text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-wider"
          >
            V U E L T A
          </Link>

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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4 border-t border-vuelta-gold/20"
          >
            <div className="flex flex-col gap-4 pt-4">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/#menu" 
                  className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Menu
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/#about" 
                  className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/#manager" 
                  className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manager
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/#reservation" 
                  className="font-annam text-xs text-vuelta-gold/80 hover:text-vuelta-gold transition-colors tracking-[0.15em] uppercase block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Visit Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link
                  href="/recruit"
                  className="font-annam text-xs text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.15em] uppercase font-semibold block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recruit
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <a
                  href="https://www.instagram.com/vuelta_bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-xs tracking-[0.15em] uppercase text-center block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reserve via DM
                </a>
              </motion.div>
            </div>
          </motion.div>
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
  return (
    <main className="min-h-screen bg-white">
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
                <h1 className="font-annam text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-vuelta-gold mb-8 leading-[0.9]">
                  RECRUIT
                </h1>
                <div className="h-px w-24 bg-vuelta-gold mb-12"></div>
                <p className="font-japanese text-base sm:text-lg md:text-xl text-vuelta-gold/80 leading-relaxed mb-12">
                  VUELTAで、<span className="text-vuelta-gold font-medium">一緒に働きませんか？</span><br />
                  広島のクロスロードで、<br />
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
              <p className="font-japanese text-base sm:text-lg md:text-xl text-vuelta-gold/80 leading-relaxed">
                <span className="text-vuelta-gold font-medium">一緒に働きたい仲間</span>を<br />
                募集しています
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 md:py-32 px-4 sm:px-6 md:px-12 bg-vuelta-gold text-white">
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
              <div className="space-y-6 font-japanese text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
                <p>
                  <span className="text-white font-medium">「おかえり」と「はじめまして」が交差する、広島のクロスロード。</span><br />
                  VUELTAは、ただのバーではありません。<br />
                  世界中から訪れる人々と、地元の人々が出会う場所です。
                </p>
                <p>
                  私たちが提供するタコスやカクテルは、<br />
                  ゲストをこの交差点に招くための<span className="text-white font-medium">「招待状」</span>です。<br />
                  ゲストが本当に求めているのは、<br />
                  そこで待つあなたという<span className="text-white font-medium">「人」</span>と、<br />
                  あなたが生み出す温かい空気です。
                </p>
                <p>
                  私たちのゴールは、<br />
                  <span className="text-white font-medium">「美味しかった」の先にある、「あなたに会えてよかった」</span>を創造することです。
                </p>
                <p>
                  食べることが好きな人、<br />
                  レストランやバーの雰囲気が好きな人、<br />
                  そんな人を歓迎します。
                </p>
                <p>
                  英語を話せない人も<span className="text-white font-medium">大歓迎</span>です。<br />
                  大切なのは、<span className="text-white font-medium">人と向き合う姿勢</span>です。
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
      <section className="py-12 md:py-32 px-4 sm:px-6 md:px-12">
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
            {/* Bartender Position */}
            <FadeInUp delay={0.1}>
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 border-b border-vuelta-gold/20 pb-12 md:pb-16">
                <div className="md:col-span-2">
                  <h3 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-gold mb-4">
                    Bartender
                  </h3>
                  <p className="font-japanese text-sm text-vuelta-gold/60 tracking-[0.15em] mb-6">
                    バーテンダー
                  </p>
                </div>
                <div className="md:col-span-3 space-y-8">
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Responsibilities / 業務内容
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>カクテル・ドリンクの調製と提供</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>ゲストとのコミュニケーション</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>バーの清潔さと整理整頓</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>在庫管理のサポート</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Requirements / 応募条件
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>飲食が好きな人</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>カクテル作りとおもてなしへの情熱</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>チームワークと前向きな姿勢</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>英語を話せない人も大歓迎です</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>経験は歓迎しますが必須ではありません。研修を提供します。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Server Position */}
            <FadeInUp delay={0.2}>
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 border-b border-vuelta-gold/20 pb-12 md:pb-16">
                <div className="md:col-span-2">
                  <h3 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-gold mb-4">
                    Server / Staff
                  </h3>
                  <p className="font-japanese text-sm text-vuelta-gold/60 tracking-[0.15em] mb-6">
                    サーバー・スタッフ
                  </p>
                </div>
                <div className="md:col-span-3 space-y-8">
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Responsibilities / 業務内容
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>ゲストのご案内とサービス提供</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>オーダー受けとメニュー提案</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>カスタマーサービスの提供</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>作業スペースの清潔さと整理</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Requirements / 応募条件
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>飲食が好きな人</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>フレンドリーで外向的な性格</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>多様なゲストと働くことへの興味</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>成長への意欲</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>英語を話せない人も大歓迎です</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Kitchen / Butcher Position */}
            <FadeInUp delay={0.3}>
              <div className="grid md:grid-cols-5 gap-8 md:gap-12 pb-12 md:pb-16">
                <div className="md:col-span-2">
                  <h3 className="font-annam text-2xl sm:text-3xl md:text-4xl font-light text-vuelta-gold mb-4">
                    Kitchen / Butcher
                  </h3>
                  <p className="font-japanese text-sm text-vuelta-gold/60 tracking-[0.15em] mb-6">
                    キッチン・ブッチャー
                  </p>
                </div>
                <div className="md:col-span-3 space-y-8">
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Responsibilities / 業務内容
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>タコスの調理と提供</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>肉のカットと加工</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>食材の準備と品質管理</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>キッチン・作業スペースの清潔さと衛生管理</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>在庫管理と発注のサポート</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs text-vuelta-gold/60 tracking-[0.2em] uppercase mb-4">
                      Requirements / 応募条件
                    </h4>
                    <ul className="space-y-3 font-japanese text-base text-vuelta-gold/90 leading-relaxed">
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>飲食が好きな人</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>料理への情熱と向上心</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>タコスやメキシコ料理、肉の加工の経験（歓迎）</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>衛生管理への意識と責任感</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>チームワークとコミュニケーション能力</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>英語を話せない人も大歓迎です</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-vuelta-gold/40 mt-1">—</span>
                        <span>経験は歓迎しますが必須ではありません。研修を提供します。</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-32 px-4 sm:px-6 md:px-12 bg-vuelta-gold/5">
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
                    <p className="font-japanese text-base text-vuelta-gold/80 leading-relaxed">
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
                    <p className="font-japanese text-base text-vuelta-gold/80 leading-relaxed">
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
                    <p className="font-japanese text-base text-vuelta-gold/80 leading-relaxed">
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
                    <p className="font-japanese text-base text-vuelta-gold/80 leading-relaxed">
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
      <section className="py-12 md:py-32 px-4 sm:px-6 md:px-12">
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
              <h3 className="font-annam text-2xl mb-4 text-vuelta-gold">V U E L T A</h3>
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
