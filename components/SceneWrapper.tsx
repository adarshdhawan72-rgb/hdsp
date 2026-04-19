'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface SceneWrapperProps {
  active: boolean
  children: ReactNode
  className?: string
}

export default function SceneWrapper({ active, children, className = '' }: SceneWrapperProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {active && (
        <motion.div
          key="scene"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 1.05, ease: [0.22, 0.61, 0.36, 1] }}
          className={`fixed inset-0 flex flex-col items-center justify-center z-10 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
