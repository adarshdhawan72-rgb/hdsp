'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'
import FloralCorners from '@/components/FloralCorners'
import { stopBirthdaySong } from '@/lib/effects'

interface Props { active: boolean }

export default function FinalScene({ active }: Props) {
  useEffect(() => {
    if (!active) return
    // Let the final heading/subtitle animation settle, then fade out the song.
    const id = window.setTimeout(() => stopBirthdaySong(2200), 6500)
    return () => window.clearTimeout(id)
  }, [active])

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_50%,#1e0a2e_0%,#0d0612_100%)]">
      <FloralCorners />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center px-6"
      >
        {/* ✏️ UPDATE: Change the final message */}
        <motion.h1
          className="font-serif italic"
          style={{
            fontSize: 'clamp(1.4rem, 5vw, 2.8rem)',
            color: 'var(--gold2)',
            letterSpacing: '.05em',
            fontFamily: 'var(--font-serif)',
          }}
          animate={{
            textShadow: [
              '0 0 40px rgba(201,169,110,.3)',
              '0 0 80px rgba(201,169,110,.6), 0 0 150px rgba(232,160,191,.2)',
              '0 0 40px rgba(201,169,110,.3)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          &ldquo;This is just the beginning…&rdquo;
        </motion.h1>

        {/* ✏️ UPDATE: Change the subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 tracking-[.2em] uppercase text-xs"
          style={{ color: 'var(--rose)', fontFamily: 'var(--font-body)' }}
        >
          With all the love in the universe
        </motion.p>

        {/* Decorative stars */}
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-gold text-xs"
            style={{
              left: `${20 + i * 15}%`,
              top: `${40 + (i % 3) * 8}%`,
              color: 'var(--gold)',
              opacity: 0.2,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>
    </SceneWrapper>
  )
}
