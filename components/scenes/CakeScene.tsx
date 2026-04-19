'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'
import { launchConfetti, playBirthdaySong } from '@/lib/effects'

interface Props {
  active: boolean
  onComplete: () => void
}

export default function CakeScene({ active, onComplete }: Props) {
  const [showWish, setShowWish] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [blown, setBlown] = useState(false)
  const [smoke, setSmoke] = useState<number[]>([])
  const smokeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) return
    playBirthdaySong()
    setShowWish(false); setShowBtn(false); setBlown(false); setSmoke([])
    const t1 = setTimeout(() => setShowWish(true), 3200)
    const t2 = setTimeout(() => setShowBtn(true), 3800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      if (smokeTimer.current) clearTimeout(smokeTimer.current)
      if (confettiTimer.current) clearTimeout(confettiTimer.current)
      if (completeTimer.current) clearTimeout(completeTimer.current)
    }
  }, [active])

  const handleBlow = () => {
    if (blown) return
    setBlown(true)
    // Smoke particles
    setSmoke(Array.from({ length: 6 }, (_, i) => i))
    smokeTimer.current = setTimeout(() => setSmoke([]), 2000)
    confettiTimer.current = setTimeout(() => {
      launchConfetti(140)
      completeTimer.current = setTimeout(onComplete, 1500)
    }, 900)
  }

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_60%,#1e0a2e_0%,#0d0612_80%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Cake SVG */}
        <div className="relative" style={{ filter: 'drop-shadow(0 20px 40px rgba(201,169,110,.2))' }}>
          <svg width="240" height="220" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b83a6a"/>
                <stop offset="100%" stopColor="#8c2050"/>
              </linearGradient>
              <linearGradient id="bottomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9c2a5a"/>
                <stop offset="100%" stopColor="#6c1040"/>
              </linearGradient>
            </defs>

            {/* Candle flame */}
            <AnimatePresence>
              {!blown && (
                <motion.g exit={{ scaleY: 0, opacity: 0 }} style={{ transformOrigin: '120px 38px' }}>
                  <motion.ellipse cx="120" cy="28" rx="12" ry="16" fill="#FF8C00" opacity=".25"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} />
                  <ellipse cx="120" cy="28" rx="7" ry="10" fill="#FFD700" opacity=".9"/>
                  <ellipse cx="120" cy="30" rx="4" ry="6" fill="#FFF4A0"/>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Smoke */}
            {blown && smoke.map(i => (
              <motion.ellipse key={i}
                cx={116 + Math.random() * 8} cy={24 - i * 4}
                rx={3 + i * 2} ry={3 + i * 1}
                fill={`rgba(200,200,200,${0.4 - i * 0.06})`}
                initial={{ y: 0, scale: 1, opacity: 0.6 }}
                animate={{ y: -50, scale: 3, opacity: 0 }}
                transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
              />
            ))}

            {/* Candle */}
            <rect x="114" y="38" width="12" height="30" rx="2" fill="#fdf5ee" stroke="#ddb080" strokeWidth=".5"/>

            {/* Top tier */}
            <ellipse cx="120" cy="78" rx="45" ry="12" fill="#9c2a5a" stroke="#7c1a4a" strokeWidth=".5"/>
            <rect x="75" y="78" width="90" height="40" fill="url(#topGrad)"/>
            <ellipse cx="120" cy="118" rx="45" ry="12" fill="#b83a6a" opacity=".7"/>
            <path d="M75 82 Q88 70 102 82 Q116 70 130 82 Q144 70 158 78" stroke="#f5e0f0" strokeWidth="3" fill="none" strokeLinecap="round"/>

            {/* Bottom tier */}
            <ellipse cx="120" cy="118" rx="60" ry="14" fill="#7c1a4a" stroke="#5c0a34" strokeWidth=".5"/>
            <rect x="60" y="118" width="120" height="50" fill="url(#bottomGrad)"/>
            <ellipse cx="120" cy="168" rx="60" ry="14" fill="#9c2a5a" opacity=".5"/>
            <path d="M60 122 Q75 108 90 122 Q105 108 120 122 Q135 108 150 122 Q165 108 178 118" stroke="#f5e0f0" strokeWidth="3" fill="none" strokeLinecap="round"/>

            {/* Decorations */}
            <circle cx="90" cy="145" r="4" fill="#c9a96e" opacity=".9"/>
            <circle cx="120" cy="148" r="4" fill="#e8a0bf" opacity=".9"/>
            <circle cx="150" cy="145" r="4" fill="#c9a96e" opacity=".9"/>
            <circle cx="105" cy="155" r="3" fill="#f5d0e8" opacity=".7"/>
            <circle cx="135" cy="155" r="3" fill="#f5d0e8" opacity=".7"/>

            {/* Plate */}
            <ellipse cx="120" cy="168" rx="70" ry="10" fill="#2a1a3a" stroke="#c9a96e" strokeWidth=".5" opacity=".6"/>
          </svg>
        </div>

        {/* ✏️ UPDATE: Change "Happy Birthday" text */}
        <div className="text-center">
          <span className="font-serif text-xl md:text-2xl" style={{ color: 'var(--gold2)' }}>
            Happy Birthday{' '}
          </span>
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={active ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
              background: 'linear-gradient(135deg,#e8a0bf,#f8c8df,#c9709f)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
            }}
          >
            {/* ✏️ UPDATE: Change the name here */}
            Shubhangi
          </motion.span>
        </div>

        {/* Make a wish */}
        <AnimatePresence>
          {showWish && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.8, y: 0 }}
              className="font-serif italic"
              style={{ color: 'var(--gold2)', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}
            >
              {/* ✏️ UPDATE: Change this text */}
              Make a wish ✦
            </motion.p>
          )}
        </AnimatePresence>

        {/* Blow button */}
        <AnimatePresence>
          {showBtn && !blown && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleBlow}
              className="px-8 py-3 rounded-full font-body text-sm tracking-widest"
              style={{
                border: '1px solid var(--gold)',
                color: 'var(--gold)',
                background: 'transparent',
                letterSpacing: '.15em',
                fontFamily: 'var(--font-body)',
              }}
            >
              {/* ✏️ UPDATE: Change button text */}
              Blow the Candle 🕯️
            </motion.button>
          )}
          {blown && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif italic text-lg"
              style={{ color: 'var(--rose)', fontFamily: 'var(--font-serif)' }}
            >
              ✨ Wish granted!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </SceneWrapper>
  )
}
