'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { menuSections } from '../../menu/menuData'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMenuPage = pathname === '/ja/menu'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gray/50">
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
            <div className="flex items-center gap-2 border-r border-vuelta-gray/40 pr-4 min-w-[3rem] flex-shrink-0">
              <Link
                href="/menu"
                className="font-annam text-xs text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-wider uppercase w-5 text-center"
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('vuelta-language', 'en')
                  router.push('/menu')
                }}
              >
                EN
              </Link>
              <span className="text-vuelta-gray/60 text-xs flex-shrink-0">/</span>
              <span className="font-annam text-xs text-vuelta-gold tracking-wider uppercase w-5 text-center">JA</span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-3 min-h-[44px] min-w-[44px] items-center justify-center focus:outline-none focus:ring-2 focus:ring-vuelta-gold focus:ring-offset-2 rounded transition-all"
              aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMenuOpen}
            >
              <span className={`w-6 h-px transition-all duration-300 bg-vuelta-text ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 bg-vuelta-text ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-px transition-all duration-300 bg-vuelta-text ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
                <Link href="/ja#about" className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/ja/menu" className={`font-annam text-sm transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center ${isMenuPage ? 'text-vuelta-gold' : 'text-vuelta-text-light hover:text-vuelta-gold'}`} onClick={() => setIsMenuOpen(false)}>Menu</Link>
                <Link href="/ja#reservation" className="font-annam text-sm text-vuelta-text-light hover:text-vuelta-gold transition-colors tracking-[0.2em] uppercase py-3 min-h-[44px] flex items-center" onClick={() => setIsMenuOpen(false)}>Access</Link>
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

const MenuSection = ({
  section,
  isRecommend = false,
}: {
  section: {
    title: string
    subtitle?: string
    items: readonly {
      name: string
      nameKana?: string
      desc?: string
      ingredients?: string
      price: string
    }[]
  }
  isRecommend?: boolean
}) => (
  <section className={`${isRecommend ? 'bg-vuelta-gray/50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-8 md:py-12 rounded-2xl border-l-4 border-l-vuelta-gold/20' : ''} border-b border-vuelta-gray/50 pb-8 md:pb-12 last:border-0`}>
    <h2 className="font-annam text-xl md:text-2xl text-vuelta-gold tracking-wider uppercase mb-2">
      {section.title}
    </h2>
    {section.subtitle && (
      <p className="text-vuelta-text-light/80 text-sm md:text-base mb-6 max-w-2xl leading-relaxed">{section.subtitle}</p>
    )}
    <ul className={isRecommend ? 'space-y-0' : 'space-y-5 md:space-y-6'}>
      {section.items.map((item, i) => (
        <li
          key={i}
          className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 ${isRecommend ? 'py-6 border-b border-vuelta-gray/20 last:border-0 first:pt-0' : ''}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-annam text-lg md:text-xl text-vuelta-text">
                {item.name}
              </h3>
              {item.nameKana && (
                <span className="text-vuelta-text-light/70 text-sm font-sans">
                  {item.nameKana}
                </span>
              )}
            </div>
            {item.desc && (
              <p className={`text-vuelta-text-light mt-1.5 max-w-xl leading-relaxed ${isRecommend ? 'text-sm md:text-base' : 'text-sm'}`}>
                {item.desc}
              </p>
            )}
            {item.ingredients && (
              <p className="text-vuelta-text-light/60 text-xs mt-2 font-sans italic">
                {item.ingredients}
              </p>
            )}
          </div>
          <span className="font-annam text-vuelta-gold flex-shrink-0 sm:text-right sm:pt-0.5">
            {item.price}
          </span>
        </li>
      ))}
    </ul>
  </section>
)

export default function MenuPageJA() {
  const sections = menuSections.en
  const sectionOrder = ['signatures', 'recommend', 'food', 'beer', 'whisky', 'gin', 'shochu', 'sake'] as const

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 md:pt-24 pb-28 md:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <h1 className="font-annam text-3xl md:text-4xl font-light text-vuelta-gold tracking-tight mb-2">
            Full Menu
          </h1>
          <p className="text-vuelta-text-light text-sm mb-10 md:mb-14">
            Crafted with precision. Wed, Fri–Tue 18:00–02:00. Closed Thursdays.
          </p>

          <div className="space-y-10 md:space-y-14">
            {sectionOrder.map((key) => (
              <MenuSection key={key} section={sections[key]} isRecommend={key === 'signatures'} />
            ))}
          </div>
        </div>
      </div>

      {/* Fixed CTA - Mobile */}
      <div className="fixed z-40 md:hidden left-4 right-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-sm sm:-translate-x-1/2" style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <a
          href="https://www.instagram.com/vuelta_bar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-vuelta-gold text-white rounded-full shadow-xl hover:bg-vuelta-gold-light hover:shadow-2xl transition-all duration-300 font-annam text-sm tracking-wider w-full"
          aria-label="Reserve via DM"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
          </svg>
          <span>Reserve via DM</span>
        </a>
      </div>
    </main>
  )
}
