import '@app/globals.css'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import type { Metadata } from 'next'
import { Palanquin } from 'next/font/google'

const palanquin = Palanquin({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: 'Royal RPG',
  description: 'Minecraft server\'s official website.',
  keywords: ["Minecraft", "Itemshop", "RoyalRPG"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${palanquin.className} bg-black-2 select-none `}>
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  )
}
