import { NavbarLinks, PayMethods } from '@constants'
import { PayMethod } from '@constants/payMethod'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-full relative mt-6 '>
      <span
        style={{
          height: "1px",
          position: 'absolute',
          top: "0",
          left: "0",
          right: "0",
          background: "linear-gradient(90deg, rgba(8, 8, 8, 0.00) 0%, #FFF 51.06%, rgba(8, 8, 8, 0.00) 100%)",
        }
        }
      />

      <footer className='flex max-lg:flex-col max-lg:gap-y-8 justify-between max-container lg:px-10 xl:px-5 pt-10 items-center lg:h-[225px] h-max'>
        <div className='lg:flex lg:flex-col justify-between h-full'>
          <h1 className='font-righteous text-white text-4xl lg:text-2xl tracking-[5px] self-start'>RoyalRPG</h1>
          <span className='hidden lg:block'>
            <Image src={"/discord-white-icon.png"} width={28} height={28} alt='Discord White Icon' className='inline-block cursor-pointer' />
            <p className='font-poppins text-white font-medium text-sm  sm:text-lg md:text-xl cursor-pointer inline-block align-middle ml-2.5'>Discord</p>
          </span>
        </div>
        <div className='flex flex-col justify-between h-full items-center'>
          <ul className='hidden lg:flex gap-x-10 items-center mx-auto'>
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                <Link className='text-grey text-xl tracking-wide font-montserrat' href={item.route}>{item.name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
          <p className='text-grey text-justify font-poppins font-light text-sm max-w-lg px-4 sm:px-0'>Serwer RoyalRPG nie jest w żaden sposób powiązany z Mojang Studios. Wszelkie zakupy dokonane w tym sklepie trafiają do zespołu RoyalRPG.</p>
        </div>
        <div className='flex flex-col items-center justify-between h-full gap-y-5 md:gap-y-8 lg:gap-y-0 pb-8 lg:pb-0'>
          <h1 className='text-end text-white font-montserrat text-2xl font-medium'>Metody płatności</h1>
          <PayMethodsCards />
        </div>
      </footer>
      <LegalInfoSection />
    </section>
  )
}

const LegalInfoSection = () => {
  return (
    <div className='w-full h-16 relative lg:mt-8 pb-20'>
      <span
        style={{
          height: "1px",
          position: 'absolute',
          top: "0",
          left: "0",
          right: "0",
          background: "linear-gradient(90deg, rgba(8, 8, 8, 0.00) 0%, #FFF 51.06%, rgba(8, 8, 8, 0.00) 100%)",
        }
        }
      />
      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-sm:text-center sm:w-max  text-white text-xs sm:text-base font-montserrat tracking-[2px] font-medium'>
        Copyright © 2023 - RoyalRPG.PL Wszelkie prawa zastrzeżone.
      </p>
    </div>
  )
}

const PayMethodsCards = () => {
  return (
    <div className='grid grid-cols-4 grid-rows-1 gap-2 lg:-translate-y-[10%] items-center'>
      <PayMethodCard payMethod={PayMethods[0]} />
      <div className='flex flex-col gap-y-2 -translate-y-[10%]'>
        <PayMethodCard payMethod={PayMethods[1]} />
        <PayMethodCard payMethod={PayMethods[2]} />
      </div>
      <div className='flex flex-col gap-y-2 translate-y-[10%]'>
        <PayMethodCard payMethod={PayMethods[3]} />
        <PayMethodCard payMethod={PayMethods[4]} />
        {/* <span className='lg:block xs:hidden xl:hidden'> */}
        {/* <PayMethodCard payMethod={PayMethods[0]} /> */}
        {/* </span> */}
      </div>
      {/* <span className='xs:block lg:hidden xl:block'> */}
      <PayMethodCard payMethod={PayMethods[0]} />
      {/* </span> */}
    </div>
  )
}

const PayMethodCard = ({ payMethod, position }: { payMethod: PayMethod, position?: string }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${payMethod.imageSrc})`,
        backgroundColor: "#fff",
        backgroundPosition: "center",
        backgroundSize: payMethod.name === "PaysafeCard" ? "contain" : "cover",
      }}
      className={`w-[70px] h-8 sm:w-24 sm:h-10 rounded-md ${position} transition-transform duration-200 hover:scale-110 `}>
    </div>
  )
}

export default Footer