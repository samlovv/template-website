"use client";

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import {CodeXml, Eye, Bookmark} from 'lucide-react'
 
type FawTemplate = {
  createdAt: Date;
  template: Template;
  templateId: number;
  userId: string;
}

type Template = {
  category: string;
  id: number;
  previewUrl: string;
  user: {
    nickname: string;
  };
  _count: {
    savedBy: number; // количество сохранений
  };

}

const FavoritesComp = ({data} : {data : any}) => {

  const [favorites, setFavorites] = useState<FawTemplate[]>([]);

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setFavorites(data);
    }
    console.log(data);
  }, [data]);



  return (
    <div className='w-full md:pr-9 mx-4 mb-9 md:mx-auto md:w-3/4 mt-12 flex flex-col gap-4'>
      <h1 className='md:text-4xl text-2xl font-bold text-center mb-4'>My Favorites</h1>
        <div  className='flex flex-col  gap-18 '>
      {favorites.map((t:any)=>(
                <div  key={t.templateId} className='relative'>
                <Link  href={`/templates/${t.templateId}`} className="w-full aspect-[5/2]  flex justify-center items-center bg-[#cbcbcb] p-2  rounded-xl shadow" onMouseEnter={() => setHoveredId(t.template.id)}
                onMouseLeave={() => setHoveredId(null)}>
                  <div className="relative w-full select-none pointer-events-none aspect-[5/2]">
                    <Image
                      src={t?.template.previewUrl}
                      alt="templatepreview"
                      loading="lazy"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  
                          {hoveredId === t.template.id? (<button className='flex bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                          
                </Link>
                <div className='absolute flex justify-between w-full px-2 bottom-[-40px] float-right font-sans items-center text-lg'>
                  <div className='flex gap-6'><span className='sm:text-[16px] text-[13px]'>{t.template.user.nickname}</span><span className='text-[#b4b4b4] sm:text-[16px] text-[13px]'>{t.template.category}</span></div>
                  <div className='flex items-center gap-7'><span className='sm:text-[16px] text-[13px] flex gap-1 text-[#b4b4b4]'>{t.template.view} views</span>
                  <div className='flex items-center'>
                    <span className='sm:text-[16px] text-[13px]'>{t.template._count.savedBy}</span> <button className='transition-all cursor-pointer rounded-md p-2 hover:bg-white/20'><Bookmark/></button>
                    </div></div></div>
              </div>))}
    </div>
    </div>
  )
}

export default FavoritesComp
