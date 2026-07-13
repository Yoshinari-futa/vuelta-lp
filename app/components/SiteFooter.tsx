import Link from 'next/link'
import {
  footerGoogleHref,
  footerTripAdvisorHref,
  isGoogleBusinessProfileConfigured,
  INSTAGRAM_BAR_URL,
  POSTAL_CODE,
  STORE_ADDRESS_JA_LINE,
} from '@/lib/site-seo'

type Lang = 'en' | 'ja'

const FOOT_LINK_CLASS =
  'font-mono text-[11px] tracking-[0.22em] uppercase text-[#8fa697] hover:text-vuelta-mint-light transition-colors'

/** 全ページ共通の黒緑フッター */
export default function SiteFooter({ lang }: { lang: Lang }) {
  const home = lang === 'ja' ? '/ja' : '/'
  const passHref = lang === 'ja' ? '/ja/subscription' : '/subscription'

  return (
    <footer className="bg-vuelta-pine py-16 md:py-20 px-4 sm:px-6 text-[#e9efe7]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-start gap-10 mb-12">
          <div>
            <p className="font-annam text-2xl tracking-[0.3em]">VUELTA</p>
            <p className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-vuelta-mint/70 mt-3">
              Craft cocktail bar — Hiroshima, Japan
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-4 items-center" aria-label="Footer">
            <Link href="/menu" className={FOOT_LINK_CLASS}>Menu</Link>
            <Link href={`${home}#about`} className={FOOT_LINK_CLASS}>About</Link>
            <Link href={passHref} className={FOOT_LINK_CLASS}>First Drink Pass</Link>
            <Link href="/recruit" className={FOOT_LINK_CLASS}>Recruit</Link>
            <a href={INSTAGRAM_BAR_URL} target="_blank" rel="noopener noreferrer" className={FOOT_LINK_CLASS}>Instagram</a>
            <a href={footerGoogleHref()} target="_blank" rel="noopener noreferrer" className={FOOT_LINK_CLASS}>
              {isGoogleBusinessProfileConfigured() ? 'Google' : 'Google Maps'}
            </a>
            <a href={footerTripAdvisorHref()} target="_blank" rel="noopener noreferrer" className={FOOT_LINK_CLASS}>TripAdvisor</a>
          </nav>
        </div>
        <div className="pt-8 border-t border-white/10 font-sans text-xs text-[#7f9488] leading-relaxed space-y-2">
          {lang === 'ja' ? (
            <p>Bar VUELTA — 〒{POSTAL_CODE} {STORE_ADDRESS_JA_LINE}</p>
          ) : (
            <p>Bar VUELTA — Kakee Building 201, 3-3-5 Otemachi, Naka-ku, Hiroshima {POSTAL_CODE}, Japan</p>
          )}
          <p>We&apos;ll do our best to communicate. International guests welcome. Free Wi-Fi available. Where locals really go.</p>
          <p>
            <Link href="/tokushoho" className="text-[#a9bcae] hover:text-vuelta-mint-light transition-colors underline underline-offset-4 decoration-white/20">
              特定商取引法に基づく表記
            </Link>
            <span className="mx-3">|</span>
            © 2026 Bar VUELTA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
