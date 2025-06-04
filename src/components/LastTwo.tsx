'use client'

import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CodeXml } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);

type Template = {
  id: number;
  category: string;
  tailwind: boolean;
  component: React.ReactNode;
  userId: string;
  user: User[];
  previewUrl: string;
};

type User = {
  nickname: string;
}



const LastTwo = () => {

  


    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [templates, setTemplates] = useState<Template[]>([])
    const textR = useRef(null)

     useEffect(()=>{
        const getTemplate = async()=>{
          const res = await fetch('/api/templates/last')
          const templates = await res.json()
          
          
          setTemplates(templates)
        }
        getTemplate()
      },[])
      
 
      useGSAP(()=>{
        gsap.from(textR.current, {
          opacity: 0,
          y:30,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textR.current,
            start: "top bottom",   // когда верх box достигает 80% экрана
            toggleActions: "play none none none", // опционально
            markers: false      // true — для отладки
          },
        });
      })

      


  return (
    <div className='py-14  w-full lg:px-[120px] md:px-[80px] px-[15px] rounded-2xl  flex flex-col gap-15'>
        <div>
            <h1 ref={textR} className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold'>Latest New Posts</h1>
        </div>
      <div  className='flex pb-9 items-center flex-col relative gap-18'>
              {templates.map((t:any)=>(
                <div  key={t.id} className='relative w-full'>
                <Link  href={`/templates/${t.id}`} className="w-full aspect-[5/2]  flex justify-center items-center bg-[#cbcbcb] p-2  rounded-xl shadow" onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}>
                  <div className="relative w-full select-none pointer-events-none aspect-[5/2]">
                    <Image
                      src={t?.previewUrl}
                      alt="templatepreview"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                          {hoveredId === t.id? (<button className='flex bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                          
                </Link>
                <div className='absolute flex justify-between w-full px-2 bottom-[-34px] float-right mt-3 font-sans text-lg'><span className='text-[16px]'>{t.user.nickname}</span><span className='text-[#9c9c9c] text-[16px]'>{t.category}</span></div>
              </div>))}
              <Link href='/templates' className='transition-all duration-150 bg-gradient-to-r p-4 px-9 text-sm sm:text-md md:text-lg bottom-[175px] lg:bottom-[135px] from-fuchsia-500 to-violet-400 font-bold rounded-md hover:translate-y-[-6px] shadow-lg shadow-purple-500/50 hover:shadow-purple-500'>Browse All</Link>
            </div>
    </div>
  )
}

export default LastTwo
