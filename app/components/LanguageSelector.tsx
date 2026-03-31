'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Language = 'en' | 'ja'

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const currentPath = window.location.pathname
    const savedLanguage = localStorage.getItem('vuelta-language') as Language | null

    // /ja 配下: 言語選択は出さない
    if (currentPath.startsWith('/ja')) {
      if (!savedLanguage) {
        localStorage.setItem('vuelta-language', 'ja')
      }
      setSelectedLanguage('ja')
      setIsVisible(false)

      // EN 保存で日本語URLにいる → 英語の対応ページへ（サブスクはペアでリダイレクト）
      if (savedLanguage === 'en') {
        if (currentPath === '/ja/subscription') {
          router.replace('/subscription')
        } else if (currentPath === '/ja' || currentPath === '/ja/') {
          router.replace('/')
        }
      }
      return
    }

    // /ja 以外
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
      setSelectedLanguage(savedLanguage)
      setIsVisible(false)

      // JA 保存で英語URLにいる → 日本語トップか、対応する /ja ページへ
      if (savedLanguage === 'ja') {
        if (currentPath === '/subscription') {
          router.replace('/ja/subscription')
        } else {
          router.replace('/ja')
        }
      }
    } else {
      setIsVisible(true)
    }
  }, [router])

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
    localStorage.setItem('vuelta-language', lang)
    setIsVisible(false)
    
    if (lang === 'ja') {
      router.push('/ja')
    } else {
      router.push('/')
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* シンプルなオーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[100]"
          />
          
          {/* シンプルな言語選択 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[101] flex items-center justify-center"
          >
            <div className="flex gap-3">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="px-6 py-2 text-sm font-sans text-vuelta-text hover:text-vuelta-gold transition-colors"
              >
                EN
              </button>
              <span className="text-vuelta-gray">/</span>
              <button
                onClick={() => handleLanguageSelect('ja')}
                className="px-6 py-2 text-sm font-sans text-vuelta-text hover:text-vuelta-gold transition-colors"
              >
                JA
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
