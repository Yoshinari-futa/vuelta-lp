'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// モバイル追従予約ボタン。ヒーロー表示中と予約セクション表示中は出さない。
// 下スクロール中は隠れ、上スクロールで現れる(常時表示のしつこさ対策)。
export default function MobileReserveCta({
  href,
  label,
  ariaLabel,
}: {
  href: string
  label: string
  ariaLabel: string
}) {
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)
  const reservationInView = useRef(false)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      const pastHero = y > window.innerHeight * 0.75
      if (!pastHero || reservationInView.current) {
        setVisible(false)
      } else if (y < lastY.current - 2) {
        setVisible(true)
      } else if (y > lastY.current + 2) {
        setVisible(false)
      }
      lastY.current = y
    }
    const reservation = document.getElementById('reservation')
    let io: IntersectionObserver | undefined
    if (reservation) {
      io = new IntersectionObserver(
        ([entry]) => {
          reservationInView.current = entry.isIntersecting
          update()
        },
        { threshold: 0.2 }
      )
      io.observe(reservation)
    }
    lastY.current = window.scrollY
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      io?.disconnect()
    }
  }, [])

  return (
    <motion.div
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="js-mobile-cta fixed z-50 md:hidden left-4 right-4 sm:left-1/2 sm:right-auto sm:w-auto sm:max-w-sm sm:-translate-x-1/2"
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))', pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="flex items-center justify-center gap-3 px-6 py-4 min-h-[52px] bg-vuelta-gold text-white rounded-full shadow-lg hover:bg-vuelta-gold-light transition-all duration-300 font-annam text-sm tracking-wider uppercase w-full"
        aria-label={ariaLabel}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3a.75.75 0 0 1 1.5 0v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
        </svg>
        <span>{label}</span>
      </a>
    </motion.div>
  )
}
