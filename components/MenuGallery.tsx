'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MENU_GALLERY_IMAGES } from '@/lib/menuGallery'

type Locale = 'en' | 'ja'

const copy: Record<
  Locale,
  { title: string; subtitle: string; back: string; textMenu: string }
> = {
  en: {
    title: 'Full menu',
    subtitle: 'Official menu boards as served in the bar.',
    back: 'Back to home',
    textMenu: 'Text menu (searchable)',
  },
  ja: {
    title: 'フルメニュー',
    subtitle: '店内メニューと同じ掲示用デザインです。',
    back: 'トップへ',
    textMenu: 'テキスト版メニュー',
  },
}

export default function MenuGallery({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const menuHref = locale === 'ja' ? '/ja/menu' : '/menu'
  const homeHref = locale === 'ja' ? '/ja' : '/'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-vuelta-gray/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link href={homeHref} className="transition-opacity hover:opacity-80 shrink-0" aria-label="VUELTA Home">
            <Image
              src="/images/vuelta-logo.png"
              alt="VUELTA"
              width={200}
              height={68}
              className="h-7 md:h-8 w-auto object-contain"
              priority
            />
          </Link>
          <Link
            href={menuHref}
            className="font-annam text-xs text-vuelta-gold tracking-wider uppercase border border-vuelta-gold/40 hover:bg-vuelta-gold hover:text-white px-3 py-2 rounded transition-colors"
          >
            {t.textMenu}
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 md:pt-28 pb-16 md:pb-24">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-vuelta-text-light mb-8">
          <Link href={homeHref} className="hover:text-vuelta-gold transition-colors">
            {t.back}
          </Link>
          <span aria-hidden className="text-vuelta-gray">/</span>
          <Link href={menuHref} className="hover:text-vuelta-gold transition-colors">
            {t.textMenu}
          </Link>
          </nav>

          <header className="mb-10 md:mb-12">
          <h1 className="font-annam text-3xl md:text-4xl font-light text-vuelta-gold tracking-tight mb-2">
            {t.title}
          </h1>
          <p className="text-vuelta-text-light text-sm">{t.subtitle}</p>
          </header>

          <div className="space-y-12 md:space-y-16">
          {MENU_GALLERY_IMAGES.map((item) => (
            <figure key={item.src} className="space-y-3">
              <figcaption className="font-annam text-sm md:text-base text-vuelta-gold tracking-wider uppercase">
                {locale === 'ja' ? item.titleJa : item.titleEn}
              </figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element -- 大判メニュー画像はネイティブで可変サイズ表示 */}
              <img
                src={item.src}
                alt={locale === 'ja' ? item.titleJa : item.titleEn}
                className="w-full h-auto rounded-lg border border-vuelta-gray/30 shadow-sm bg-white"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
          </div>
        </div>
      </main>
    </>
  )
}
