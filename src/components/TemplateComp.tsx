"use client"

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useLoading } from './loading-context'
import {CodeXml, Eye, Bookmark} from 'lucide-react'
import tailwindsvg from "@/assets/icons/tailwind-css-svgrepo-com.svg"
import csssvg from "@/assets/icons/css3-svgrepo-com.svg"
import Image from 'next/image'
import CategorySelector from './CategorySelector'
import { useSearchParams } from "next/navigation";
import gsap from 'gsap'
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react'
import toast, { Toaster } from 'react-hot-toast';

gsap.registerPlugin(useGSAP, TextPlugin, ScrollTrigger);



type Template = {
  id: number;
  category: string;
  tailwind: boolean;
  component: React.ReactNode;
  userId: string;
  user: User[];
  previewUrl: string;
  view: number;
  _count: {
    savedBy: number; // количество сохранений
  };
};

type User = {
  nickname: string;
}


const TemplateComp = ({data} : {data: any}) => {

  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [templates, setTemplates] = useState<Template[]>([])
  const {show, hide} = useLoading()
  const [filter, setFilter] = useState<'tailwind' | 'css' | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const cardRefs = useRef<(any)[]>([]);
   

  useEffect(()=>{
    if(data) {
      setTemplates(data); 
    }
  },[data])

  
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");


  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const save = async (id: string) => {
    
      show();
      const res = await axios.post(`/api/templates/save/${id}`);
      const data = await res.data;
      hide();
      if (data.message === 'Saved') {
        toast.success('Template saved successfully!' , {position: 'bottom-left'});
      } else if (data.message === 'Deleted') {
        toast.success('Template deleted from favorites. ', {position: 'bottom-left'});
      } else {
        toast.error('An error occurred while saving the template.' , {position: 'bottom-left'});
      }

      
  }


  const filteredTemplates = templates.filter((template) => {
    const categoryMatch = selectedCategory === "All" || template.category === selectedCategory;
    const techMatch =
      filter === "all" ||
      (filter === "tailwind" && template.tailwind) ||
      (filter === "css" && !template.tailwind);

    return categoryMatch && techMatch;
  });

  useGSAP(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

    // Сброс начального состояния
    gsap.set(cards, { opacity: 0, y: 40 });

    // Анимация
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [templates, filter, selectedCategory]);


 




  return (
    <div className='pt-10'>
      <Toaster toastOptions={{
      className: '',
      style: {
        border: '1px solid #505050',
        padding: '20px',
        color: '#fff',
        backgroundColor: '#101010',
        fontSize: '16px',
      },}}/>
      <div className='flex md:flex-row flex-col'>
        <div className='md:w-1/4 '>
          <CategorySelector selected={selectedCategory} setSelected = {setSelectedCategory}/>
        </div>
        <div className='w-full md:w-3/4  flex flex-col gap-4 '>
          <div className="flex font-sans items-center divide-x-1 float-end divide-[#5e5e5e]">
              <label className={`transition-all duration-130 flex items-center gap-2 rounded-l-xl cursor-pointer  bg-[#1E1E1E]  p-2 sm:px-4 px-2 ${filter== 'all' ? 'border-2 border-blue-500 bg-black hover:bg-[#0c0c0c]' : "hover:border-white hover:bg-[#2c2c2c] border-1 border-[#5e5e5e]"}`}>
                <input
                  type="radio"
                  name="style"
                  onChange={() => setFilter('all')}
                  className="hidden"
                />
                <span className="sm:text-base text-sm md:text-lg text-white font-sans">All</span>
              </label>
              {/* CSS Option */}
              <label className={`transition-all duration-130 flex items-center gap-2 cursor-pointer  bg-[#1E1E1E]  p-2 sm:px-4 px-2 ${filter=="css" ? 'border-2 border-blue-500 bg-black hover:bg-[#0c0c0c]' : "hover:border-white hover:bg-[#2c2c2c] border-1 border-[#5e5e5e]"}`}>
                <Image src={csssvg} className='w-5 h-5 md:h-7 md:w-7' alt='css icon' />
                <input
                  type="radio"
                  name="style"
                  onChange={() => setFilter('css')}
                  className="hidden"
                />
                <span className="sm:text-base text-sm md:text-lg text-white font-sans">CSS</span>
              </label>

              {/* Tailwind Option */}
              <label className={`transition-all duration-130 flex items-center gap-2 rounded-r-xl cursor-pointer  bg-[#1E1E1E]  p-2 sm:px-4 px-2 ${filter=='tailwind' ? 'border-2 border-blue-500 bg-black hover:bg-[#0c0c0c]' : "hover:border-white hover:bg-[#2c2c2c] border-1 border-[#5e5e5e]"}`}>
                <Image src={tailwindsvg} className='w-5 h-5 md:h-7 md:w-7' alt='tailwind icon' />
                <input
                  type="radio"
                  name="style"
                  onChange={() => setFilter('tailwind')}
                  className="hidden"
                />
                <span className="sm:text-base text-sm md:text-lg text-white font-sans">Tailwind CSS</span>
              </label>
            </div>
            <div  className='flex flex-col gap-18 '>
              {filteredTemplates.map((t:any, index)=>(
                <div ref={(el) => { cardRefs.current[index] = el;}}  key={t.id} className='relative'>
                <Link  href={`/templates/${t.id}`} className="w-full aspect-[5/2]  flex justify-center items-center bg-[#cbcbcb] p-2  rounded-xl shadow" onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}>
                  <div className="relative w-full select-none pointer-events-none aspect-[5/2]">
                    <Image
                      src={t?.previewUrl}
                      alt="templatepreview"
                      loading="lazy"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                          {hoveredId === t.id? (<button className='flex bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                          
                </Link>
                <div className='absolute flex justify-between w-full px-2 bottom-[-40px] float-right font-sans items-center text-lg'>
                  <div className='flex gap-6'><span className='sm:text-[16px] text-[13px]'>{t.user.nickname}</span><span className='text-[#b4b4b4] sm:text-[16px] text-[13px]'>{t.category}</span></div>
                  <div className='flex items-center gap-7'><span className='sm:text-[16px] text-[13px] flex gap-1 text-[#b4b4b4]'>{t.view} views</span>
                  <div className='flex items-center'>
                    <span className='sm:text-[16px] text-[13px]'>{t._count.savedBy}</span> <button className='transition-all cursor-pointer rounded-md p-2 hover:bg-white/20' onClick={()=>save(t.id)}><Bookmark/></button>
                    </div></div></div>
              </div>))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default TemplateComp
