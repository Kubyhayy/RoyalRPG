import Hero from '@components/Hero'
import Shop from '@components/Shop'
import Footer from '@components/Footer'
import Image from 'next/image'

export default function Home() {
  return (
    <main className=''>
      <Hero />
      <Shop />
    </main>
  )
}
