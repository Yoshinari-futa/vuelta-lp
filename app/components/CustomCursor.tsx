'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isActive, setIsActive] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const posRef = useRef({ x: -100, y: -100 })
  const hasMovedRef = useRef(false)
  const rafRef = useRef<number>()

  useEffect(() => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouchDevice() || prefersReducedMotion()) return

    setIsActive(true)
    document.documentElement.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseRef.current = { x: clientX, y: clientY }
      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        posRef.current = { x: clientX, y: clientY }
      }
    }

    const animate = () => {
      const { x: mx, y: my } = mouseRef.current
      const pos = posRef.current
      // 0.5 = 素早く追従（遅延を最小限に、違和感を軽減）
      const ease = 0.5
      pos.x += (mx - pos.x) * ease
      pos.y += (my - pos.y) * ease
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const relatedTarget = e.relatedTarget as HTMLElement
      if (!relatedTarget?.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!isActive) return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-0 h-0"
        style={{ willChange: 'transform', transform: 'translate(-100px, -100px)' }}
      >
        {/* 外側のリング（ドットとの間にギャップ、白いグロー） */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${
            isHovering ? 'scale-125' : 'scale-100'
          }`}
          style={{
            width: 20,
            height: 20,
            border: '1px solid #1a1f1c',
            boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.2)',
          }}
        />
        {/* 中央のドット */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a1f1c]"
          style={{ width: 6, height: 6 }}
        />
      </div>
    </div>
  )
}
