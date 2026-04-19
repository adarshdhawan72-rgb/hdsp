'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'
import FloralCorners from '@/components/FloralCorners'
import { launchConfetti } from '@/lib/effects'

interface Props {
  active: boolean
  onComplete: () => void
}

export default function GiftBoxScene({ active, onComplete }: Props) {
  const [opened, setOpened] = useState(false)
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (active) setOpened(false)
    return () => {
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current)
    }
  }, [active])

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    launchConfetti(80)
    completeTimerRef.current = setTimeout(onComplete, 1800)
  }

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_40%,#2a0a3e_0%,#0d0612_70%)]">
      <FloralCorners />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Title */}
        <p className="tracking-[.3em] uppercase text-sm"
          style={{ color: 'var(--gold2)', opacity: 0.8, fontFamily: 'var(--font-body)' }}>
          Your gift awaits…
        </p>

        {/* Gift box */}
        <motion.div
          animate={{ y: opened ? 0 : [0, -14, 0] }}
          transition={opened ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-[200px] h-[200px] cursor-pointer select-none"
          onClick={handleOpen}
          style={{ filter: 'drop-shadow(0 20px 60px rgba(201,169,110,.2))' }}
        >
          {/* Floral corners around gift frame */}
          {[
            { emoji: '🌸', cls: '-left-7 -top-7', rotate: -16 },
            { emoji: '🌺', cls: '-right-7 -top-7', rotate: 20 },
            { emoji: '🌷', cls: '-left-7 -bottom-7', rotate: -24 },
            { emoji: '💮', cls: '-right-7 -bottom-7', rotate: 18 },
          ].map((f, i) => (
            <motion.span
              key={i}
              className={`absolute ${f.cls} text-3xl`}
              animate={{ y: [0, -4, 0], rotate: [f.rotate, f.rotate + 4, f.rotate] }}
              transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 6px 14px rgba(232,160,191,.35))' }}
            >
              {f.emoji}
            </motion.span>
          ))}

          {/* Lid */}
          <motion.div
            animate={opened ? { y: -180, rotateX: -70, opacity: 0 } : { y: 0, rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute top-[30px] left-0 right-0 h-[50px] rounded-sm z-10"
            style={{
              background: 'linear-gradient(135deg,#9c2a5a 0%,#6a1040 60%,#8c2050 100%)',
              boxShadow: '0 -4px 20px rgba(0,0,0,.4)',
              transformOrigin: '50% 100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Bow */}
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[60px] h-[32px]">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 w-[26px] h-[22px] rounded-[50%_50%_0_50%]"
                style={{
                  background: 'linear-gradient(135deg,#d4b47e,#f0e0b0,#c9a96e)',
                  boxShadow: '0 0 10px rgba(201,169,110,.6)',
                  transform: 'rotate(-20deg)',
                  transformOrigin: 'right bottom',
                }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute right-0 w-[26px] h-[22px] rounded-[50%_50%_50%_0]"
                style={{
                  background: 'linear-gradient(135deg,#d4b47e,#f0e0b0,#c9a96e)',
                  boxShadow: '0 0 10px rgba(201,169,110,.6)',
                  transform: 'rotate(20deg)',
                  transformOrigin: 'left bottom',
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full"
                style={{ background: 'radial-gradient(circle,#f0e0b0,#c9a96e)', boxShadow: '0 0 8px rgba(201,169,110,.8)' }}
              />
            </div>
          </motion.div>

          {/* Box body */}
          <div className="absolute bottom-0 left-[10px] right-[10px] h-[160px] rounded-sm"
            style={{
              background: 'linear-gradient(135deg,#7c1a4a 0%,#4a0d2e 60%,#6a1540 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1)',
            }}
          >
            {/* Ribbons */}
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[20px] h-full"
              style={{ background: 'linear-gradient(90deg,#c9a96e,#e8d5b0,#c9a96e)', boxShadow: '0 0 15px rgba(201,169,110,.5)' }} />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[20px]"
              style={{ background: 'linear-gradient(180deg,#c9a96e,#e8d5b0,#c9a96e)', boxShadow: '0 0 15px rgba(201,169,110,.5)' }} />
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-sm"
              style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(201,169,110,.15) 0%,transparent 70%)' }} />
          </div>

          {/* Glow burst on open */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ scale: 0, opacity: 0.9 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(201,169,110,.6) 0%,transparent 70%)' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.7, 0.35, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif italic text-sm"
          style={{ color: 'var(--gold2)', fontFamily: 'var(--font-serif)' }}
        >
          Tap to open ✦
        </motion.p>
      </motion.div>
    </SceneWrapper>
  )
}
