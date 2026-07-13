'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { RESERVATION_URL } from '@/lib/site-seo'
import { blurDataUrl } from '@/lib/blurPlaceholders'

type Lang = 'en' | 'ja'

const NAV_LINK_CLASS =
  'font-mono text-[11px] tracking-[0.2em] uppercase text-vuelta-text-light hover:text-vuelta-gold transition-colors'
const MOBILE_LINK_CLASS =
  'font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center'

/**
 * 全ページ共通ヘッダー。
 * デスクトップ: 英字インラインナビ + 緑の予約ボタン + EN/JA 切替
 * モバイル: ハンバーガー展開メニュー
 */
export default function SiteHeader({ lang }: { lang: Lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const home = lang === 'ja' ? '/ja' : '/'
  const passHref = lang === 'ja' ? '/ja/subscription' : '/subscription'
  const isHome = pathname === home
  const reserveLabel = lang === 'ja' ? '予約する' : 'Reserve'

  const anchorHref = (id: string) => (isHome ? `#${id}` : `${home}#${id}`)

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMenuOpen(false)
    if (!isHome) return
    e.preventDefault()
    const element = document.querySelector(`#${id}`)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: elementPosition - headerHeight, behavior: 'smooth' })
    }
  }

  const switchLang = (e: React.MouseEvent<HTMLAnchorElement>, target: Lang) => {
    e.preventDefault()
    if (target === lang) return
    localStorage.setItem('vuelta-language', target)
    if (target === 'ja') {
      router.push(pathname === '/subscription' ? '/ja/subscription' : '/ja')
    } else {
      router.push(pathname === '/ja/subscription' ? '/subscription' : '/')
    }
  }

  return (
    <header className="site-header-fixed fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gray/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={home} className="transition-opacity hover:opacity-80" aria-label="Bar VUELTA Home">
            <Image
              src="/images/vuelta-logo.png"
              alt="Bar VUELTA"
              width={250}
              height={85}
              className="h-8 md:h-10 w-auto object-contain"
              priority
              placeholder="blur"
              blurDataURL={blurDataUrl('/images/vuelta-logo.png')}
            />
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* Desktop inline nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary">
              <a href={anchorHref('about')} className={NAV_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
              <Link href="/menu" className={NAV_LINK_CLASS}>Menu</Link>
              <Link href={passHref} className={NAV_LINK_CLASS}>Pass</Link>
              <a href={anchorHref('reservation')} className={NAV_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'reservation')}>Visit</a>
              <a href={anchorHref('faq')} className={NAV_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'faq')}>FAQ</a>
              <Link href="/recruit" className={NAV_LINK_CLASS}>Recruit</Link>
            </nav>
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-5 py-2 min-h-[36px] bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors font-annam text-[11.5px] tracking-[0.2em] uppercase rounded"
            >
              {reserveLabel}
            </a>

            {/* EN/JA toggle */}
            <div className="flex items-center gap-2 border-r border-vuelta-gray/40 pr-4 min-w-[3rem] flex-shrink-0 md:border-r-0 md:pr-0">
              {lang === 'en' ? (
                <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">EN</span>
              ) : (
                <a href="/" className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center inline-block" onClick={(e) => switchLang(e, 'en')}>EN</a>
              )}
              <span className="text-vuelta-gray/60 text-xs flex-shrink-0">/</span>
              {lang === 'ja' ? (
                <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">JA</span>
              ) : (
                <a href="/ja" className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center inline-block" onClick={(e) => switchLang(e, 'ja')}>JA</a>
              )}
            </div>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex md:hidden flex-col gap-1.5 p-3 min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded transition-all"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-px bg-vuelta-text transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-px bg-vuelta-text transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-px bg-vuelta-text transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mt-6 pt-6 border-t border-vuelta-gray/20 md:hidden"
              aria-label="Main navigation"
            >
              <div className="flex flex-col">
                <a href={anchorHref('about')} className={MOBILE_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'about')}>About</a>
                <Link href="/menu" className={`${MOBILE_LINK_CLASS} touch-manipulation`} onClick={() => setIsMenuOpen(false)}>Menu</Link>
                <a href={anchorHref('reservation')} className={MOBILE_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'reservation')}>Visit Us</a>
                <a href={anchorHref('faq')} className={MOBILE_LINK_CLASS} onClick={(e) => handleAnchorClick(e, 'faq')}>FAQ</a>
                <Link href="/recruit" className={MOBILE_LINK_CLASS} onClick={() => setIsMenuOpen(false)}>Recruit</Link>
                <Link href={passHref} className={MOBILE_LINK_CLASS} onClick={() => setIsMenuOpen(false)}>First Drink Pass</Link>
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-annam text-sm text-vuelta-gold hover:text-vuelta-gold-light transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center mt-4 pt-4 border-t border-vuelta-gray/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {reserveLabel}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
