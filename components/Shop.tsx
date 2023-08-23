import { ShopItems } from '@constants'
import Image from 'next/image'
import React from 'react'
import BackgroundEclipse from './BackgroundEclipse'
import Link from 'next/link'
import { Item } from '@constants/item'

const Shop = () => {
  return (
    <section className='flex flex-col w-full mt-36 gap-y-10 pb-40 overflow-hidden relative'>
      <header
        style={{
          backgroundImage: "url(/shop-header-background.png), linear-gradient(180deg, #000 93.23%, rgba(13, 13, 13, 0.00) 100%)",
          backgroundSize: "contain",
        }}

        className='w-full h-40 sm:h-96 text-center justify-center flex flex-col items-center gap-y-1 '>
        <p className='tracking-widest sm:tracking-[13px] font-medium font-montserrat text-4xl sm:text-8xl text-white w-full'>SKLEP</p>
        <p className='text-grey hidden sm:block text-base tracking-[0.6px] font-poppins max-w-xl'>Oferujemy usługi absolutnie pozbawione “pay to win”. Nasza polityka zapewnia uczciwą i równą rozgrywkę, gdzie umiejętności graczy mają największe znaczenie, a wspieranie serwera jest dobrowolne i niewpływające na balans gry.</p>
      </header>

      <div className='grid grid-rows-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 items-center mx-auto relative px-6'>
        <ShopItemCard item={ShopItems[0]} />
        <ShopItemCard item={ShopItems[1]} position='lg:translate-y-[10%]' />
        <ShopItemCard item={ShopItems[2]} />
        <ShopItemCard item={ShopItems[3]} />
        <ShopItemCard item={ShopItems[4]} position='lg:translate-y-[10%]' />
        <ShopItemCard item={ShopItems[5]} />
        <BackgroundEclipse reversed={false} color='#4029C7' position='right-0 bottom-0 scale-105' />
        <BackgroundEclipse reversed={true} color='#FFC350' position='right-0 bottom-[7%] scale-100 ' />
      </div>
      {/* <Image src={"/shop-section-bottom-background.svg"} alt='Shop section bottom background' width={1600} height={250} className='object-contain mt-14 self-center' /> */}
    </section>
  )
}



const ShopItemCard = ({ item, position }: {
  item: Item, position?: string
}) => {
  return (
    <Link href={`/shop/${item.id}`} className={`outline-none ${position}`}>
      <div
        style={{
          clipPath: "polygon(0 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 50px 100%, 0 calc(100% - 50px))",
        }}
        className='bg-black-3/[98%] p-6 max-w-[400px] max-h-[500px] relative flex flex-col items-center cursor-pointer transition-all duration-[400ms] hover:bg-purple hover:scale-105 lg:hover:scale-110'
      >
        <p className='text-yellow font-poppins text-2xl font-medium text-center'>{item.name}</p>
        <Image src={item.imageSrc} alt={`${item.name} image`} width={160} height={160} draggable={false} />
        <p className='text-white text-justify text-base tracking-wide font-poppins'>
          {item.description}
        </p>
        <button
          style={{
            backgroundImage: "url(/shop-item-buy-button.svg)",
            width: "200px",
            height: "40px",
            backgroundSize: "95% 95%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className='flex items-center justify-center mt-4  lg:mt-12 outline-none'
        >
          <span className='font-handjet text-center text-white text-xl  inline-block font-semibold  tracking-widest'>{Array.isArray(item.price) ? (item.price[0] + "-" + item.price[1]) : (item.price)}</span>
          <span className='font-handjet text-center text-white text-base inline-block align-baseline'>pln</span>
        </button>
        <Image src={"/thunder-icon.svg"} width={16} height={18} alt='Yellow Thunder Icon Background' loading='lazy' className='absolute left-9 top-14' draggable={false} />
        <Image src={"/thunder-icon.svg"} width={16} height={18} alt='Yellow Thunder Icon Background' loading='lazy' className='absolute left-20  top-44' draggable={false} />
        <Image src={"/thunder-icon.svg"} width={16} height={18} alt='Yellow Thunder Icon Background' loading='lazy' className='absolute right-20 top-20' draggable={false} />
        <Image src={"/thunder-icon.svg"} width={16} height={18} alt='Yellow Thunder Icon Background' loading='lazy' className='absolute left-16 bottom-8' draggable={false} />
        <Image src={"/thunder-icon.svg"} width={16} height={18} alt='Yellow Thunder Icon Background' loading='lazy' className='absolute right-10 bottom-24' draggable={false} />
      </div>
    </Link>
  )
}

export default Shop