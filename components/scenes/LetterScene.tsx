'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'
import FloralCorners from '@/components/FloralCorners'

interface Props {
  active: boolean
  onComplete: () => void
}

// ✏️ UPDATE: Edit your heartfelt letter message here
const LETTER_CONTENT = `On this beautiful day that marks another year of you being in this world — I want you to know that your presence makes everything brighter.

You carry a warmth that lights up every room, a laughter that sounds like the best music, and a heart so generous it leaves everyone around you feeling seen and loved.

This birthday isn't just a celebration of the day you were born — it's a celebration of everything you've become, everything you are, and everything you are still becoming.

May this year bring you adventures that take your breath away, quiet moments that fill your soul, and dreams that exceed even your wildest imagination.

You deserve every beautiful thing this world has to offer — and so much more.

Happy Birthday, Shubhangi. 🌸`

// ✏️ UPDATE: Change the signature here
const LETTER_SIGNATURE = '— With endless love ✦'

export default function LetterScene({ active, onComplete }: Props) {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sideFlowers = Array.from({ length: 12 }, (_, i) => ({
    emoji: ['🌸', '🌺', '🌷', '💮', '🏵️'][i % 5],
    topOffset: i * 7,
    drift: i % 2 === 0 ? 18 : -18,
    duration: 4.8 + (i % 4) * 0.6,
    delay: i * 0.22,
  }))

  useEffect(() => {
    if (active) {
      setEnvelopeOpen(false)
      setModalOpen(false)
    }
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [active])

  const handleEnvelopeClick = () => {
    if (!envelopeOpen) {
      setEnvelopeOpen(true)
      openTimerRef.current = setTimeout(() => setModalOpen(true), 600)
    } else {
      setModalOpen(true)
    }
  }

  const handleClose = () => {
    setModalOpen(false)
    closeTimerRef.current = setTimeout(onComplete, 400)
  }

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_40%,#1a0a2e_0%,#0d0612_80%)]">
      <FloralCorners />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-6"
      >
        <p className="tracking-[.3em] uppercase text-xs"
          style={{ color: 'var(--gold2)', opacity: 0.7, fontFamily: 'var(--font-body)' }}>
          A letter for you ✦
        </p>

        {/* Envelope */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer"
          style={{ filter: 'drop-shadow(0 20px 50px rgba(201,169,110,.25))' }}
          onClick={handleEnvelopeClick}
        >
          <div className="relative w-[200px] h-[140px]">
            {/* Body */}
            <div className="absolute inset-0 rounded-sm"
              style={{ background: 'linear-gradient(135deg,#fdf8f0,#f5e8d0)' }}>
              {/* Bottom lines */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-[5px]">
                <div className="h-px bg-[rgba(150,120,80,.25)]" />
                <div className="h-px bg-[rgba(150,120,80,.25)] w-[70%]" />
                <div className="h-px bg-[rgba(150,120,80,.25)]" />
              </div>
              {/* Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs"
                style={{ background: 'radial-gradient(circle,#c9a96e,#9a7a3e)', boxShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
                ✦
              </div>
            </div>

            {/* Flap */}
            <motion.div
              animate={envelopeOpen ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
              className="absolute top-0 left-0 right-0 h-[70px] origin-top"
              style={{
                background: 'linear-gradient(135deg,#f5e0c0,#e8d0a8)',
                clipPath: 'polygon(0 0, 100% 0, 50% 65%)',
                transformStyle: 'preserve-3d',
              }}
            />
          </div>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.7, 0.35, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif italic text-sm"
          style={{ color: 'var(--rose)', fontFamily: 'var(--font-serif)' }}
        >
          Click to open the envelope
        </motion.p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,.85)' }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Left side flower fall */}
              {sideFlowers.map((f, i) => (
                <motion.span
                  key={`lf-${i}`}
                  className="absolute left-2 md:left-6 text-xl md:text-2xl"
                  style={{ top: `-${f.topOffset}%`, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.2))' }}
                  animate={{ y: ['0vh', '120vh'], x: [0, f.drift, 0], rotate: [0, 110, 240], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: f.duration, repeat: Infinity, ease: 'linear', delay: f.delay }}
                >
                  {f.emoji}
                </motion.span>
              ))}
              {/* Right side flower fall */}
              {sideFlowers.map((f, i) => (
                <motion.span
                  key={`rf-${i}`}
                  className="absolute right-2 md:right-6 text-xl md:text-2xl"
                  style={{ top: `-${f.topOffset + 4}%`, filter: 'drop-shadow(0 6px 10px rgba(0,0,0,.2))' }}
                  animate={{ y: ['0vh', '120vh'], x: [0, -f.drift, 0], rotate: [0, -110, -240], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: f.duration + 0.3, repeat: Infinity, ease: 'linear', delay: f.delay + 0.15 }}
                >
                  {f.emoji}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.3, 0.64, 1] }}
              className="relative rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 md:p-10"
              style={{ background: 'linear-gradient(135deg,#fdf8f0,#f5e8d0)' }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-lg opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: '#9c7060', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>

              {/* ✏️ UPDATE: Change the modal header */}
              <h2 className="text-center mb-3"
                style={{ fontFamily: 'var(--font-script)', fontSize: '2rem', color: '#7c3050' }}>
                My Dearest Shubhangi
              </h2>

              <div className="mx-auto w-14 h-px my-4"
                style={{ background: 'linear-gradient(90deg,transparent,#c9a96e,transparent)' }} />

              <p className="whitespace-pre-line leading-relaxed"
                style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#4a2a30', lineHeight: 1.9 }}>
                {LETTER_CONTENT}
              </p>

              <p className="text-right mt-6"
                style={{ fontFamily: 'var(--font-script)', fontSize: '1.3rem', color: '#9c4060' }}>
                {LETTER_SIGNATURE}
              </p>

              <div className="text-center mt-6">
                <button
                  onClick={handleClose}
                  className="px-7 py-2.5 rounded-full text-sm tracking-widest transition-all hover:bg-amber-100"
                  style={{ border: '1px solid #c9a96e', color: '#9a6a3e', background: 'transparent', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                >
                  Close ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneWrapper>
  )
}
