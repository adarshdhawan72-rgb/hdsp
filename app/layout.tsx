import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Happy Birthday Shubhangi 🌸',
  description: 'A special birthday experience crafted with love.',
  // ✏️ UPDATE: Change the OG image path if you have one
  openGraph: {
    title: 'Happy Birthday Shubhangi 🌸',
    description: 'A special birthday experience crafted with love.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden bg-dark">{children}</body>
    </html>
  )
}
