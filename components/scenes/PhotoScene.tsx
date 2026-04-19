'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'

interface Props {
  active: boolean
  onComplete: () => void
}

// ✏️ UPDATE: Replace these with your actual photo filenames in /public/images/
// Format: { src: '/images/your-photo.jpg', caption: 'Your caption here' }
const PHOTOS = [
  { src: '/IMG_20260419_191436.jpg.jpeg', emoji: '🌸', bg: 'linear-gradient(135deg,#2d1040,#5a1060)', caption: 'Beautiful beginnings' },
  { src: '/🌻🌲💌(HEIC)_2.jpg', emoji: '🌊', bg: 'linear-gradient(135deg,#0a2040,#104060)', caption: 'Adventures together' },
  { src: '/Center of attraction 🌻💌(HEIC)_5.jpg', emoji: '🌅', bg: 'linear-gradient(135deg,#401020,#602040)', caption: 'Golden moments' },
  { src: '/IMG_20251022_162402.jpg.jpeg', emoji: '💖', bg: 'linear-gradient(135deg,#2a1030,#4a2050)', caption: 'Sweet memory' },
  { src: '/सजली रंगली ✨❤️_🔥(HEIC).jpg', emoji: '✨', bg: 'linear-gradient(135deg,#102040,#203060)', caption: 'Laughter & joy' },
]

// When you add real photos, use:
// { src: '/images/photo1.jpg', caption: 'Beautiful beginnings' }

export default function PhotoScene({ active, onComplete }: Props) {
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heartTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    setIdx(0)

    // Spawn hearts
    heartTimerRef.current = setInterval(() => {
      const container = containerRef.current
      if (!container) return
      const heart = document.createElement('div')
      heart.className = 'heart'
      heart.style.left = Math.random() * 100 + '%'
      heart.style.animationDuration = (Math.random() * 3 + 3) + 's'
      heart.style.animationDelay = (Math.random() * 1) + 's'
      heart.style.fontSize = (Math.random() * .8 + .8) + 'rem'
      heart.textContent = ['💕','💖','✨','💫','🌸'][Math.floor(Math.random() * 5)]
      container.appendChild(heart)
      setTimeout(() => heart.remove(), 6000)
    }, 700)

    // Auto-advance
    timerRef.current = setInterval(() => {
      setIdx(prev => {
        if (prev >= PHOTOS.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          if (heartTimerRef.current) clearInterval(heartTimerRef.current)
          completeTimerRef.current = setTimeout(onComplete, 1500)
          return prev
        }
        return prev + 1
      })
    }, 2600)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (heartTimerRef.current) clearInterval(heartTimerRef.current)
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    }
  }, [active, onComplete])

  const variants = {
    enter: { opacity: 0, scale: 1.01 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.995 },
  }

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_50%,#1a0a2e_0%,#0d0612_100%)]">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" ref={containerRef} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center gap-5 w-full md:w-auto"
      >
        <p className="tracking-[.3em] uppercase text-xs absolute top-6 left-1/2 -translate-x-1/2 z-20 md:static md:translate-x-0"
          style={{ color: 'var(--gold2)', opacity: 0.7, fontFamily: 'var(--font-body)' }}>
          Moments to remember
        </p>

        {/* Phone frame */}
        <div
          className="relative w-screen h-[100dvh] md:w-[250px] md:h-[500px] overflow-hidden rounded-none md:rounded-[32px] border-0 md:border-[3px] md:border-[#2a2a2a] md:shadow-[0_0_60px_rgba(201,169,110,.15),0_30px_80px_rgba(0,0,0,.7),inset_0_1px_0_rgba(255,255,255,.05)]"
        >
          {/* Notch */}
          <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />

          {/* Photos */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.15, ease: [0.22, 0.61, 0.36, 1] }}
              className="absolute inset-0"
            >
              {PHOTOS[idx].src ? (
                <Image
                  src={encodeURI(PHOTOS[idx].src!)}
                  alt={PHOTOS[idx].caption}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl"
                  style={{ background: PHOTOS[idx].bg }}>
                  {PHOTOS[idx].emoji}
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 50%,rgba(0,0,0,.2) 100%)' }} />

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-0 right-0 text-center text-white z-10 px-4"
                style={{ fontFamily: 'var(--font-script)', fontSize: '1.1rem' }}
              >
                {PHOTOS[idx].caption}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:static md:translate-x-0">
          {PHOTOS.map((_, i) => (
            <motion.div
              key={i}
              animate={i === idx ? { scale: 1.3, backgroundColor: 'var(--gold)' } : { scale: 1, backgroundColor: 'rgba(201,169,110,0.3)' }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </SceneWrapper>
  )
}
