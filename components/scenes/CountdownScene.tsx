'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '@/components/SceneWrapper'
import FloralCorners from '@/components/FloralCorners'

interface Props {
  active: boolean
  onBirthdayArrived: () => void
}

function pad(n: number) { return String(n).padStart(2, '0') }

interface TimeLeft { days: number; hours: number; mins: number; secs: number }

function getTimeLeft(): TimeLeft {
  const now = new Date()
  // ✏️ UPDATE: Change month (3 = April, 0-indexed) and day to the birthday date
  const year = (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() >= 20))
    ? now.getFullYear() + 1 : now.getFullYear()
  const target = new Date(year, 3, 20, 0, 0, 0)
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 }
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
  }
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  const prevRef = useRef(value)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (prevRef.current !== value) {
      setAnimating(true)
      setTimeout(() => setAnimating(false), 300)
      prevRef.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.span
        animate={animating ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="font-serif text-5xl md:text-7xl font-light leading-none"
        style={{
          color: 'var(--gold)',
          textShadow: '0 0 40px rgba(201,169,110,.4), 0 0 80px rgba(201,169,110,.15)',
          fontFamily: 'var(--font-serif)',
        }}
      >
        {pad(value)}
      </motion.span>
      <span className="text-xs tracking-widest uppercase"
        style={{ color: 'var(--gold2)', opacity: 0.5, fontFamily: 'var(--font-body)' }}>
        {label}
      </span>
    </div>
  )
}

export default function CountdownScene({ active, onBirthdayArrived }: Props) {
  // Keep SSR and first client render deterministic to avoid hydration mismatch.
  // Real countdown starts immediately after mount.
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    if (!active) return
    setTime(getTimeLeft())
    const id = setInterval(() => {
      const t = getTimeLeft()
      setTime(t)
      if (t.days === 0 && t.hours === 0 && t.mins === 0 && t.secs === 0) {
        clearInterval(id)
        setTimeout(onBirthdayArrived, 600)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [active, onBirthdayArrived])

  return (
    <SceneWrapper active={active}
      className="bg-[radial-gradient(ellipse_at_50%_60%,#1e0a2e_0%,#0d0612_70%)]">
      <FloralCorners />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={`petal-${i}`}
            className="absolute text-lg md:text-xl"
            style={{ left: `${8 + i * 9}%`, top: '-8%', opacity: 0.35 }}
            animate={{ y: ['0vh', '118vh'], x: [0, i % 2 === 0 ? 14 : -14, 0], rotate: [0, 120, 240] }}
            transition={{ duration: 9 + (i % 4), repeat: Infinity, ease: 'linear', delay: i * 0.45 }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌺' : '🌷'}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col items-center gap-8 px-4"
      >
        {/* ✏️ UPDATE: Change this subtitle text */}
        <p className="tracking-[.4em] uppercase text-sm md:text-base"
          style={{ color: 'var(--gold2)', opacity: 0.7, fontFamily: 'var(--font-body)' }}>
          A special day is coming
        </p>

        <div className="flex items-start gap-4 md:gap-10">
          <TimerUnit value={time.days}  label="Days" />
          <span className="blink text-4xl md:text-6xl font-light mt-1" style={{ color: 'var(--gold)', opacity: 0.4, fontFamily: 'var(--font-serif)' }}>:</span>
          <TimerUnit value={time.hours} label="Hours" />
          <span className="blink text-4xl md:text-6xl font-light mt-1" style={{ color: 'var(--gold)', opacity: 0.4, fontFamily: 'var(--font-serif)' }}>:</span>
          <TimerUnit value={time.mins}  label="Minutes" />
          <span className="blink text-4xl md:text-6xl font-light mt-1" style={{ color: 'var(--gold)', opacity: 0.4, fontFamily: 'var(--font-serif)' }}>:</span>
          <TimerUnit value={time.secs}  label="Seconds" />
        </div>

        {/* ✏️ UPDATE: Change this bottom subtitle */}
        <p className="font-serif italic text-sm md:text-lg"
          style={{ color: 'var(--rose)', opacity: 0.6, fontFamily: 'var(--font-serif)' }}>
          Until someone extraordinary was born
        </p>
      </motion.div>
    </SceneWrapper>
  )
}
