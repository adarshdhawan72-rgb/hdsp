'use client'

const COLORS = ['#C9A96E','#E8D5B0','#E8A0BF','#9B59B6','#3498DB','#E74C3C','#F39C12','#1ABC9C']
const FLOWERS = ['🌸', '🌺', '🌷', '🌹', '💮', '🏵️']
let birthdayAudio: HTMLAudioElement | null = null

export function launchConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div')
      el.className = 'confetti-piece'
      const useFlower = Math.random() < 0.28
      el.style.left = Math.random() * 100 + 'vw'
      if (useFlower) {
        el.textContent = FLOWERS[Math.floor(Math.random() * FLOWERS.length)]
        el.style.background = 'transparent'
        el.style.width = 'auto'
        el.style.height = 'auto'
        el.style.fontSize = (Math.random() * 10 + 14) + 'px'
        el.style.lineHeight = '1'
        el.style.borderRadius = '0'
      } else {
        el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)]
        el.style.width = (Math.random() * 8 + 4) + 'px'
        el.style.height = (Math.random() * 8 + 4) + 'px'
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
      }
      el.style.animationDuration = (Math.random() * 2 + 1.5) + 's'
      el.style.animationDelay = (Math.random() * 0.5) + 's'
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 3000)
    }, i * 15)
  }
}

export function playBirthdaySong() {
  try {
    if (!birthdayAudio) {
      birthdayAudio = new Audio('/happy_birthday.mp3')
      birthdayAudio.volume = 0.7
      birthdayAudio.loop = true
    }
    birthdayAudio.play().catch(() => {
      // Autoplay may be blocked until user interaction.
      console.info('Audio autoplay blocked by browser')
    })
  } catch {
    console.info('Audio not available')
  }
}

export function stopBirthdaySong(fadeMs = 1800) {
  if (!birthdayAudio) return
  const audio = birthdayAudio
  const steps = 12
  const stepMs = Math.max(60, Math.floor(fadeMs / steps))
  const startVolume = audio.volume || 0.7
  let count = 0

  const id = window.setInterval(() => {
    count += 1
    const next = Math.max(0, startVolume * (1 - count / steps))
    audio.volume = next
    if (count >= steps) {
      window.clearInterval(id)
      audio.pause()
      audio.currentTime = 0
      audio.volume = 0.7
    }
  }, stepMs)
}
