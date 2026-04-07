'use client'

import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL_HREF } from '@/lib/site-seo'

const strings = {
  en: {
    heading: 'Phone',
  },
  ja: {
    heading: '電話',
  },
} as const

export function PhoneContactBlock({ locale }: { locale: 'en' | 'ja' }) {
  const t = strings[locale]

  return (
    <div>
      <a
        href={STORE_PHONE_TEL_HREF}
        title={`${STORE_PHONE_TEL_HREF} — tap on phone to call`}
        className="group block cursor-pointer rounded-lg -mx-1 px-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-vuelta-gold focus-visible:ring-offset-2"
      >
        <span className="block text-vuelta-gold mb-2 uppercase tracking-wider text-sm font-semibold">
          {t.heading}
        </span>
        <span className="block text-base sm:text-lg text-vuelta-text-light group-hover:text-vuelta-gold transition-colors underline decoration-vuelta-text-light/40 underline-offset-2 group-hover:decoration-vuelta-gold">
          {STORE_PHONE_DISPLAY}
        </span>
      </a>
    </div>
  )
}
