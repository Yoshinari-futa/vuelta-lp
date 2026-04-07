'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  const handleRetry = () => {
    reset()
    router.refresh()
  }

  const handleHardReload = () => {
    window.location.reload()
  }

  const goHome = () => {
    window.location.assign('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <h2 className="font-annam text-2xl md:text-4xl text-vuelta-gold mb-4">
          Something went wrong!
        </h2>
        <p className="font-sans text-vuelta-text-light mb-2 leading-relaxed">
          Sorry, an error occurred while loading the page.
        </p>
        <p className="font-sans text-sm text-vuelta-text-light/80 mb-8">
          ページの読み込み中にエラーが発生しました。再試行するか、トップへお戻りください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
          <button
            type="button"
            onClick={handleRetry}
            className="px-6 py-3 min-h-[48px] bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors font-annam rounded touch-manipulation"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={handleHardReload}
            className="px-6 py-3 min-h-[48px] border border-vuelta-gold text-vuelta-gold hover:bg-vuelta-gold/10 transition-colors font-annam rounded touch-manipulation"
          >
            再読み込み
          </button>
        </div>
        <div className="mt-8 pt-8 border-t border-vuelta-gray/30">
          <button
            type="button"
            onClick={goHome}
            className="text-vuelta-gold font-annam text-sm underline underline-offset-4 hover:text-vuelta-gold-light touch-manipulation"
          >
            トップページへ
          </button>
          <span className="text-vuelta-text-light/50 mx-2">|</span>
          <Link
            href="/ja"
            className="text-vuelta-gold font-annam text-sm underline underline-offset-4 hover:text-vuelta-gold-light"
          >
            日本語トップ
          </Link>
        </div>
      </div>
    </div>
  )
}
