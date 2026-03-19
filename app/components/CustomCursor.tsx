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
      const ease = 0.18
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
        {/* Outer glow */}
        <div
          className={`absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${
            isHovering ? 'scale-150 opacity-100' : 'scale-100 opacity-80'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(26,58,46,0.15) 0%, transparent 70%)',
            boxShadow: isHovering
              ? '0 0 40px rgba(26,58,46,0.4), inset 0 0 20px rgba(26,58,46,0.1)'
              : '0 0 20px rgba(26,58,46,0.25)',
          }}
        />
        {/* Main ring */}
        <div
          className={`absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${
            isHovering ? 'scale-125' : 'scale-100'
          }`}
          style={{
            border: '1.5px solid rgba(26,58,46,0.9)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1) inset',
          }}
        />
        {/* Center dot */}
        <div
          className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
            isHovering ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
          style={{
            background: 'radial-gradient(circle at 30% 30%, #2d4a3e, #1a3a2e)',
            boxShadow: '0 0 8px rgba(26,58,46,0.8), 0 0 16px rgba(26,58,46,0.4)',
          }}
        />
      </div>
    </div>
  )
}
