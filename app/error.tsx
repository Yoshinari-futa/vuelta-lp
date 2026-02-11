'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="font-annam text-2xl md:text-4xl text-vuelta-gold mb-4">
          Something went wrong!
        </h2>
        <p className="font-annam text-vuelta-text-light mb-8">
          Sorry, an error occurred while loading the page.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors font-annam rounded"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
