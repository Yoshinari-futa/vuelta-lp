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
    
    // 既に正しい言語のページにいる場合はリダイレクトしない
    const isOnJapanesePage = currentPath.startsWith('/ja')
    const isOnEnglishPage = !isOnJapanesePage && currentPath !== '/ja'
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
      setSelectedLanguage(savedLanguage)
      setIsVisible(false)
      // 保存された言語と現在のページが一致しない場合のみリダイレクト
      if (savedLanguage === 'ja' && !isOnJapanesePage) {
        router.push('/ja')
      } else if (savedLanguage === 'en' && isOnJapanesePage) {
        router.push('/')
      }
    } else {
      // 初回訪問時は言語選択を表示
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
          {/* オーバーレイ - より洗練されたグラデーション */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 bg-gradient-to-br from-black/95 via-black/90 to-vuelta-gray/95 backdrop-blur-md z-[100]"
            onClick={() => setIsVisible(false)}
          />
          
          {/* 言語選択モーダル - より洗練されたデザイン */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white/98 backdrop-blur-xl rounded-none md:rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-vuelta-gray/20">
              {/* 装飾的な背景要素 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-vuelta-gray/5 to-white opacity-50"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vuelta-gold/30 to-transparent"></div>
              
              <div className="relative p-8 md:p-10 text-center">
                {/* ロゴ - コンパクトに */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mb-4"
                >
                  <h2 className="font-annam text-3xl md:text-4xl font-light text-vuelta-text tracking-[0.2em] mb-2">
                    V U E L T A
                  </h2>
                  <div className="w-12 h-px bg-vuelta-gold mx-auto mb-3"></div>
                </motion.div>

                {/* サブタイトル - コンパクトに */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-sans text-[10px] text-vuelta-text-light tracking-[0.3em] uppercase mb-8"
                >
                  Select Language
                </motion.p>

                {/* 言語選択ボタン - コンパクトに */}
                <div className="flex flex-col gap-4">
                  <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect('en')}
                    className="group relative w-full py-3.5 px-6 bg-vuelta-gold text-white font-annam text-sm tracking-[0.2em] uppercase rounded-none md:rounded-lg hover:bg-vuelta-gold-light transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10">English</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.02, x: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect('ja')}
                    className="group relative w-full py-3.5 px-6 bg-white border-2 border-vuelta-gold text-vuelta-gold font-annam text-sm tracking-[0.2em] uppercase rounded-none md:rounded-lg hover:bg-vuelta-gold/5 transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10">Japanese</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-vuelta-gold/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.button>
                </div>

                {/* 装飾的なフッター - コンパクトに */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-vuelta-gray/20"
                >
                  <p className="font-sans text-[9px] text-vuelta-text-light/60 tracking-[0.2em] uppercase">
                    Hiroshima • Cocktail Bar
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
