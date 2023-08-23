"use client";
import { useState } from 'react'
import "@app/globals.css"
import { NavbarLinks } from '@constants'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/20/solid'

const Navbar = () => {

  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  return (
    <header className='padding-x w-full py-4 z-10 '>
      <nav className='max-container flex max-lg:flex-col items-center gap-x-0 max-lg:justify-between relative'>
        <p className='font-righteous text-white text-2xl tracking-[5px] self-start'>RoyalRPG</p>
        <ul className='hidden lg:flex gap-x-16 items-center mx-auto'>
          {NavbarLinks.map((item, index) => (
            <li key={index}>
              <Link className='text-grey text-lg tracking-widest font-montserrat' href={item.route}>{item.name.toUpperCase()}</Link>
            </li>
          ))}
        </ul>

        <Bars3Icon width={25} height={25} className='lg:hidden  fill-white cursor-pointer absolute right-0 top-0' type='button' onClick={() => { setIsMenuExpanded((prev) => !prev) }} />

        <ul className='w-full mt-4 lg:hidden absolute z-10 top-6'>
          {isMenuExpanded && (
            NavbarLinks.map((link, index) => (
              <li key={index} className='first:rounded-t-[20px] last:rounded-b-[20px] h-10 bg-black-3 py-2  last:mb-0 text-center'>
                <a
                  href={link.route}
                  className=' text-grey text-lg font-montserrat cursor-pointer px-4'>
                  <img className='inline-block mr-2 align-middle' src={link.icon} alt={`${link.name} icon`} height={18} width={18} />
                  {link.name}
                </a>
              </li>
            ))

          )}
        </ul>


      </nav>
    </header>
  )
}

export default Navbar