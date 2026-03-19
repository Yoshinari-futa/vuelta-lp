'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
  downloadLabel?: string
  closeLabel?: string
}

export default function MenuModal({ isOpen, onClose, downloadLabel = 'Download PDF', closeLabel = 'Close' }: MenuModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-4xl h-[85vh] md:h-[90vh] bg-vuelta-text rounded-xl overflow-hidden shadow-2xl ring-2 ring-vuelta-gold/50"
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-vuelta-text border-b border-vuelta-gold/30">
              <h3 className="font-annam text-lg text-vuelta-gold tracking-wider">VUELTA Menu</h3>
              <div className="flex items-center gap-3">
                <a
                  href="/VUELTA-menu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans text-vuelta-gold/80 hover:text-vuelta-gold transition-colors uppercase tracking-wider flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {downloadLabel}
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-vuelta-gold/80 hover:text-vuelta-gold hover:bg-vuelta-gold/10 transition-all"
                  aria-label={closeLabel}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 min-h-0 bg-white">
              <iframe
                src="/VUELTA-menu.pdf#view=FitH"
                className="w-full h-full"
                title="VUELTA Menu"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
