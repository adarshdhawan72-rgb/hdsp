'use client'

import { motion } from 'framer-motion'

const CLUSTERS = [
  { corner: 'left-0 top-0', items: [
    { e: '🌸', x: 14, y: 8, s: 34, r: -18 },
    { e: '🌹', x: 31, y: 14, s: 30, r: 12 },
    { e: '🌺', x: 9, y: 30, s: 28, r: 22 },
    { e: '🌷', x: 34, y: 35, s: 27, r: -10 },
    { e: '💮', x: 22, y: 28, s: 24, r: 8 },
    { e: '🍃', x: 5, y: 18, s: 20, r: -25 },
    { e: '🌿', x: 39, y: 22, s: 20, r: 18 },
  ] },
  { corner: 'right-0 top-0', items: [
    { e: '🌸', x: 70, y: 9, s: 34, r: 18 },
    { e: '🌹', x: 52, y: 13, s: 30, r: -12 },
    { e: '🌺', x: 76, y: 30, s: 28, r: -22 },
    { e: '🌷', x: 49, y: 35, s: 27, r: 10 },
    { e: '💮', x: 60, y: 28, s: 24, r: -8 },
    { e: '🍃', x: 80, y: 18, s: 20, r: 25 },
    { e: '🌿', x: 44, y: 22, s: 20, r: -18 },
  ] },
  { corner: 'left-0 bottom-0', items: [
    { e: '🌸', x: 14, y: 70, s: 34, r: 18 },
    { e: '🌹', x: 31, y: 58, s: 30, r: -12 },
    { e: '🌺', x: 9, y: 80, s: 28, r: -20 },
    { e: '🌷', x: 34, y: 74, s: 27, r: 12 },
    { e: '💮', x: 22, y: 66, s: 24, r: -6 },
    { e: '🍃', x: 5, y: 86, s: 20, r: 18 },
    { e: '🌿', x: 39, y: 78, s: 20, r: -16 },
  ] },
  { corner: 'right-0 bottom-0', items: [
    { e: '🌸', x: 70, y: 70, s: 34, r: -18 },
    { e: '🌹', x: 52, y: 58, s: 30, r: 12 },
    { e: '🌺', x: 76, y: 80, s: 28, r: 20 },
    { e: '🌷', x: 49, y: 74, s: 27, r: -12 },
    { e: '💮', x: 60, y: 66, s: 24, r: 6 },
    { e: '🍃', x: 80, y: 86, s: 20, r: -18 },
    { e: '🌿', x: 44, y: 78, s: 20, r: 16 },
  ] },
]

export default function FloralCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {CLUSTERS.map((cluster, ci) => (
        <motion.div
          key={ci}
          className={`absolute ${cluster.corner} w-[180px] h-[180px] md:w-[240px] md:h-[240px]`}
          animate={{ y: [0, -4, 0], opacity: [0.72, 0.92, 0.72] }}
          transition={{ duration: 4.5 + ci * 0.45, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,220,235,0.24) 0%, rgba(255,210,228,0.08) 42%, transparent 75%)',
            }}
          />
          {cluster.items.map((item, i) => (
            <motion.span
              key={`${ci}-${i}`}
              className="absolute select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.s}px`,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.18))',
              }}
              animate={{ rotate: [item.r, item.r + 5, item.r], y: [0, -3, 0] }}
              transition={{ duration: 3.2 + i * 0.22, repeat: Infinity, ease: 'easeInOut' }}
            >
              {item.e}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
