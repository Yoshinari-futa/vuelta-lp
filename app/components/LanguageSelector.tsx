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
    // クライアントサイドでのみ実行
    if (typeof window === 'undefined') return
    
    // 現在のパスを確認
    const currentPath = window.location.pathname
    
    // 既に日本語版にいる場合は言語選択を表示しない
    if (currentPath.startsWith('/ja')) {
      const savedLanguage = localStorage.getItem('vuelta-language')
      if (!savedLanguage) {
        localStorage.setItem('vuelta-language', 'ja')
      }
      setSelectedLanguage('ja')
      setIsVisible(false)
      return
    }
    
    // ローカルストレージから言語設定を読み込む
    const savedLanguage = localStorage.getItem('vuelta-language') as Language | null
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
      setSelectedLanguage(savedLanguage)
      setIsVisible(false)
      // 保存された言語と現在のページが一致しない場合のみリダイレクト
      const isOnJapanesePage = currentPath.startsWith('/ja')
      if (savedLanguage === 'ja' && !isOnJapanesePage) {
        router.push('/ja')
      } else if (savedLanguage === 'en' && isOnJapanesePage) {
        router.push('/')
      }
    } else {
      // 初回訪問時は言語選択を表示（ただし、ページコンテンツも表示されるようにする）
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
