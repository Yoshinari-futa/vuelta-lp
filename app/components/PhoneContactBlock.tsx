'use client'

import { useCallback, useState } from 'react'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL_HREF } from '@/lib/site-seo'

const strings = {
  en: {
    heading: 'Phone',
    copy: 'Copy number',
    copied: 'Copied!',
    devHint: 'Local preview: desktop browsers often do nothing on click. The href below is what mobile uses.',
  },
  ja: {
    heading: '電話',
    copy: '番号をコピー',
    copied: 'コピーしました',
    devHint:
      'ローカル確認用：PCブラウザではクリックしても発信が開かないことがあります。実機スマホで確認するか、下の tel: をご確認ください。',
  },
} as const

export function PhoneContactBlock({ locale }: { locale: 'en' | 'ja' }) {
  const t = strings[locale]
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(STORE_PHONE_DISPLAY)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be denied; user can still use tel: on mobile
    }
  }, [])

  const isDev = process.env.NODE_ENV === 'development'

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

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs font-sans text-vuelta-gold hover:text-vuelta-gold-light underline underline-offset-2 decoration-vuelta-gold/50"
        >
          {copied ? t.copied : t.copy}
        </button>
        <span className="text-xs text-vuelta-text-light/70 font-sans">
          {locale === 'en' ? 'Hover number for tel: URL' : '番号にマウスを乗せると tel: を表示'}
        </span>
      </div>

      {isDev && (
        <p
          className="mt-2 rounded border border-dashed border-vuelta-gold/40 bg-vuelta-gold/5 px-2 py-1.5 font-mono text-[11px] leading-snug text-vuelta-text break-all select-all"
          data-testid="phone-tel-href-dev"
        >
          <span className="text-vuelta-gold">href=</span>
          {STORE_PHONE_TEL_HREF}
          <span className="mt-1.5 block font-sans text-[10px] leading-relaxed text-vuelta-text-light/85">
            {t.devHint}
          </span>
        </p>
      )}
    </div>
  )
}
