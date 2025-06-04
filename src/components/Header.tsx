"use client"

import React from 'react'
import Image from 'next/image'
import Button1 from './Button1'
import { useState, useEffect, useRef } from 'react'
import {Gift, PanelTopDashed, Users} from 'lucide-react'
import Link from 'next/link'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);



const Header = () => {

  const [usercount, setUserCount] = useState(0)
  const [tempcount, setTempCount] = useState(0)
  const percent= 100

  const textRef = useRef(null)
  const numberR = useRef(null)
  const percentR = useRef(null)
  const userCR = useRef(null)
  

  useEffect(()=>{
    const getNumberOfTemplates = async()=>{
      const res = await fetch('/api/templates/count')
      const templates = await res.json()
      setTempCount(templates.templates)
      setUserCount(templates.users)

    }
    getNumberOfTemplates()
  },[])

  useGSAP(()=>{
    gsap.from(textRef.current, {
      opacity: 0,
      y:80,
      duration: 1.5,
      ease: 'power3.out'
    });

    gsap.fromTo(percentR.current, 
    { textContent: 0 },
    {
      duration: 1.6,
      textContent: percent,
      roundProps: 'textContent',
      ease: 'power1.out',
      scrollTrigger: {
        trigger: percentR.current,
        start: "top bottom",   // когда верх box достигает 80% экрана
        toggleActions: "play none none none", // опционально
        markers: false      // true — для отладки
      },
    });
    
  })

  useGSAP(() =>{
    gsap.fromTo(numberR.current,{textContent: 0},
       {
        duration: 1,
        textContent: tempcount,
        roundProps: 'textContent',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: percentR.current,
          start: "top bottom",   // когда верх box достигает 80% экрана
          toggleActions: "play none none none", // опционально
          markers: false      // true — для отладки
        },
      })
    },
    { dependencies: [tempcount] } // 🚀 Перезапуск при изменении числа
  )

  useGSAP(() =>{
    gsap.fromTo(userCR.current,{textContent: 0},
       {
        duration: 1,
        textContent: usercount,
        roundProps: 'textContent',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: percentR.current,
          start: "top bottom",   // когда верх box достигает 80% экрана
          toggleActions: "play none none none", // опционально
          markers: false      // true — для отладки
        },
      })
    },[usercount])

  



  return (
    <div className=' w-full lg:px-[120px] md:px-[80px] px-[15px]'>
      <div className='relative min-h-screen text-center items-center w-full flex justify-center'>
        <div className='flex flex-col items-center'>
          <h1 ref={textRef} className='text-center md:text-6xl sm:text-5xl text-4xl lg:text-7xl xl:text-8xl w-9/10 font-semibold'><span className='underline text-[#2f0]'>Opensource Templates</span> for any idea</h1>
          <h2 className='mt-8 flex md:text-[16px] text-[10px] sm:text-[13px] flex-col text-[#c1c1c1]'><span>Community-built library of UI sections.</span><span>Copy as HTML/CSS, Tailwind.</span></h2>
        </div>
      
        
        <Link href='/templates' className='transition-all duration-150 bg-gradient-to-r p-4 px-9 text-sm sm:text-md md:text-lg bottom-[175px] lg:bottom-[135px] from-fuchsia-500 to-violet-400 absolute font-bold rounded-md hover:translate-y-[-6px] shadow-lg shadow-purple-500/50 hover:shadow-purple-500'>Browse now</Link>
      </div>
      <div className='flex gap-1.5 lg:gap-6  my-22 w-full items-center justify-around'>
        <div className='flex gap-3 flex-col text-center items-center'>
          <PanelTopDashed className='lg:w-12 lg:h-12 w-7 h-7 md:h-9 md:w-9 text-[#9d9d9d]'/>
          <span ref={numberR} className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>{tempcount}</span>
          <span className='text-[12px]  lg:text-lg  text-[#9d9d9d]'>Community-made UI elements</span>
        </div>
        <div className='flex gap-3 flex-col text-center items-center'>
          <Gift className='lg:w-12 lg:h-12 w-7 h-7 md:h-9 md:w-9 text-[#9d9d9d]'/>
          <span  className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'><span ref={percentR} data-value={percent} >{percent}</span>%</span>
          <span className='text-[12px] lg:text-lg  text-[#9d9d9d]'>Free for personal and commercial use</span>
        </div>
        <div className='flex gap-3 flex-col text-center items-center'>
          <Users className='lg:w-12 lg:h-12 w-7 h-7 md:h-9 md:w-9 text-[#9d9d9d]'/>
          <span ref={userCR} className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold'>{usercount}</span>
          <span className='text-[12px] lg:text-lg  text-[#9d9d9d]'>Contributors to the community</span>
        </div>
      </div>
      <div>
        
      </div>

      
    </div>
  )
}

export default Header
