'use client'

import { useState } from 'react'
import StarsCanvas from '@/components/StarsCanvas'
import CakeScene from '@/components/scenes/CakeScene'
import GiftBoxScene from '@/components/scenes/GiftBoxScene'
import PhotoScene from '@/components/scenes/PhotoScene'
import LetterScene from '@/components/scenes/LetterScene'
import FinalScene from '@/components/scenes/FinalScene'
type SceneId = 'cake' | 'gift' | 'photo' | 'letter' | 'final'

export default function Home() {
  const [scene, setScene] = useState<SceneId>('cake')

  return (
    <main className="fixed inset-0 h-full w-full overflow-hidden bg-black">
      <StarsCanvas />

      <CakeScene active={scene === 'cake'} onComplete={() => setScene('gift')} />
      <GiftBoxScene active={scene === 'gift'} onComplete={() => setScene('photo')} />
      <PhotoScene active={scene === 'photo'} onComplete={() => setScene('letter')} />
      <LetterScene active={scene === 'letter'} onComplete={() => setScene('final')} />
      <FinalScene active={scene === 'final'} />
    </main>
  )
}
