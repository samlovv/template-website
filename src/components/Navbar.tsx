"use client"

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import RouteLoading from './RouteLoading'
import Image from 'next/image'
import Templatelogo from '@/assets/icons/Group 1 (2).svg'
import { Plus, ChevronDown, ChevronUp, Rocket, Menu, X, Heart, LogOut, UserRound } from "lucide-react"
import ProfileCard from './ProfileCard'

const Navbar = () => {
  const { data: session } = useSession()

  const [isActive, setIsActive] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => setIsActive(prev => !prev)
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    if (isActive) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isActive])

  return (
    <div className='bg-[#0c0c0c]/90 font-medium backdrop-blur-xl fixed h-20 top-0 left-0 right-0 w-full flex justify-between items-center px-6 md:px-[40px] z-20 border-b border-white/10'>
      <RouteLoading />
      
      {/* Logo */}
      <Link onClick={()=> setIsMobileMenuOpen(false)} href="/" className='text-2xl font-sans font-semibold flex items-end'>
        <Image src={Templatelogo} alt='' width={40} height={40} className='mr-[-9px]' />
        emplateUI
      </Link>

      {/* Desktop menu */}
      <div className='hidden md:flex gap-1  lg:gap-15 items-center relative'>
        <Link href='/create' className='transition-all duration-400 bg-linear-65 from-purple-500 to-pink-500 py-2 lg:py-3 px-2 lg:px-4 flex gap-2 font-semibold rounded-lg shadow-lg shadow-pink-500/50 hover:shadow-pink-500'>
          <Plus /> Create
        </Link>
        <Link href='/templates' className='text-lg transition-all duration-150 hover:bg-white/10 py-2 px-4 rounded-md'>Templates</Link>

        {session ? (
          <button ref={buttonRef} onClick={handleClick} className={`transition-all duration-150 ${isActive ? 'bg-white/10' : "hover:bg-white/10"} text-lg cursor-pointer flex items-center gap-2 py-2 px-4 rounded-md`}>
            {isActive ? <ChevronUp /> : <ChevronDown />}
            {session.user?.nickname}
            <Image alt='profile img' className='rounded-sm' src={String(session.user.image)} height={33} width={33} />
          </button>
        ) : (
          <Link href='/login' className='text-lg transition-all duration-150 bg-white/10 hover:bg-white/15 py-2 px-5 rounded-md flex items-center gap-3'>
            <Rocket />Join the Community
          </Link>
        )}
        {isActive && <ProfileCard />}
      </div>

      {/* Hamburger */}
      <div className='md:hidden'>
        <button onClick={toggleMobileMenu} className='p-2 text-white'>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-20 left-0 w-full bg-[#0c0c0c] border-t border-white/10 flex flex-col gap-4 px-6 py-4 z-30 md:hidden'>
          {session ? (
          <Link onClick={()=> setIsMobileMenuOpen(false)} href='/profile' className='flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-md'>
            <UserRound size={20}/> {session.user?.nickname}
            <Image alt='profile img' className='rounded-sm' src={String(session.user.image)} height={33} width={33} />
          </Link>
        ) : null}
          <Link onClick={()=> setIsMobileMenuOpen(false)} href='/create' className='flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-md'>
            <Plus size={20} /> Create
          </Link>
          <Link onClick={()=> setIsMobileMenuOpen(false)} href='/templates' className='flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-md'>
            📁 Templates
          </Link>
          {session ? (
            <button onClick={() => signOut()} className='flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-md'>
              <LogOut size={20} /> Log Out
            </button>
          ) : (
            <Link onClick={()=> setIsMobileMenuOpen(false)} href='/login' className='flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded-md'>
              <Rocket size={20} /> Login
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
