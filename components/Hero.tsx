import React from 'react'
import "@app/globals.css"
import Image from 'next/image'
import { FeatureCards } from '@constants'

const Hero = () => {
  return (
    <section className='flex flex-col w-full items-center sm:mt-40 max-md:landscape:mt-10 mt-10 lg:mt-56 relative'>
      <Image src={"/hero-crown.png"} alt='Hero background crown' width={900} height={500} className='object-cover max-sm:scale-90 absolute -z-10 -top-[5vh] sm:-top-[10vh]  opacity-10 blur-[12px] sm:blur-[14px] sm:blur-[16px]' loading='lazy' />
      <div className='flex flex-col items-center sm:gap-y-6 gap-y-3 w-min '>
        <h1
          className='font-palanquin sm:text-8xl text-[10vw] font-semibold tracking-[13px] w-min '>
          <span
            style={{
              background: "linear-gradient(135deg, #FFF 0%, #FFC350 55.72%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className=''
          >
            Royal
          </span>
          <span className='font-palanquin text-white ml-2'>RPG</span>
        </h1>
        <p className='max-sm:hidden text-grey font-palanquin text-[16px] w-[100%] sm:w-[110%] lg:w-[160%]  sm:text-xl  text-center tracking-[2.2px]'>Dołącz do niezwykłych przygód i stań się bohaterem! Wybierz swoją klasę, walcz z bossami, handluj przedmiotami, buduj oszałamiające struktury i poznaj wspaniałych graczy. Czekają na Ciebie nieograniczone możliwości i niesamowita społeczność.</p>
        <p className='sm:hidden text-grey font-palanquin text-[16px] w-[110%] sm:w-[130%] lg:w-[160%]  sm:text-xl  text-center tracking-[2.2px]'>Dołącz do niezwykłych przygód i stań się bohaterem! Czekają na Ciebie nieograniczone możliwości i niesamowita społeczność.</p>
      </div>
      <div className='flex items-center px-4 mt-8 md:mt-14 justify-around max-sm:w-full sm:gap-x-52 max-xs:flex-col max-xs:gap-y-6' >
        <button
          style={{
            background: "linear-gradient(136deg, #FFF 0%, rgba(255, 195, 80, 0.8) 100%)"
          }}
          className='rounded-sm text-black font-medium font-poppins sm:px-9 sm:py-2 sm:text-xl px-4 py-1 text-base'>
          Skontaktuj się
        </button>
        <div className='flex gap-x-2.5 items-center '>
          <Image src={"/discord-white-icon.png"} width={28} height={28} alt='Discord White Icon' className=' cursor-pointer' />
          <p className='font-poppins text-white font-medium text-sm  sm:text-lg md:text-xl cursor-pointer'>Dołącz do discorda</p>
        </div>
      </div>
      <FeaturesCardsSection />
    </section>
  )
}

const FeaturesCardsSection = () => {

  return (
    <section className='mt-24 lg:mt-80 relative grid gap-8 grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  lg:items-center sm:px-4 '>
      <FeatureCard {...FeatureCards[0]} position='sm:self-center' />
      <div className='flex flex-col gap-y-8  lg:-translate-y-[10%]'>
        <FeatureCard {...FeatureCards[1]} />
        <FeatureCard {...FeatureCards[2]} />
      </div>
      <div className='flex flex-col gap-y-8 sm:-translate-y-[25%] xl:translate-y-[10%]'>
        <FeatureCard {...FeatureCards[3]} />
        <FeatureCard {...FeatureCards[4]} />
      </div>  

      <div className='flex flex-col gap-y-8 lg:-translate-y-[25%] xl:-translate-y-[15%]'>
        <FeatureCard {...FeatureCards[5]} />
        <FeatureCard {...FeatureCards[6]} position='' />
      </div>
      <FeatureCard {...FeatureCards[7]} position='sm:-translate-y-1/2 lg:-translate-y-3/4 xl:-translate-y-[33%]  ' />

    </section>
  )
}

const FeatureCard = ({ header, description, imageSrc, position }: { header: string, description: string, imageSrc: string, position?: string }) => {
  return (
    <div className={`flex flex-col p-[20px_25px_40px_25px] gap-y-3.5 border-grey border rounded-2xl max-w-[300px] max-h-[450px] ${position} overflow-hidden shrink-0`}>
      <Image src={imageSrc} alt={`${header} icon`} width={130} height={130} className='bg-contain  float-left' draggable={false} />
      <p className='text-white font-montserrat text-xl font-medium text-start'>{header}</p>
      <p className='text-grey font-medium tracking-[1.4px] font-poppins text-xs text-clip  '>
        {description}
      </p>
    </div>
  )
}

export default Hero