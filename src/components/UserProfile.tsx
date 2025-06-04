'use client'

import React from 'react'
import { useState, useEffect} from 'react'
import Image from 'next/image'
import DefaultPic from "@/assets/photo/default.jpg"
import clsx from 'clsx'
import { StickyNote } from 'lucide-react'
import Link from 'next/link'
import { CodeXml } from 'lucide-react'
import { useLoading } from './loading-context'


type Props ={
    username: string;
}
type Template = {
    id: number;
    category: string;
    tailwind: boolean;
}

type User ={
    name: string;
    nickname: string;
    image: string;
}


const UserProfile = ({username}: Props) => {

    const tabs = ["Posts"];
    const [activeTab, setActiveTab] = useState("Posts");
    const [user, setUser] = useState<User | null>(null)
    const [templates, setTemplates] = useState<Template[]>([])
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const {show, hide} = useLoading()
    
    useEffect(()=>{
        show();
        async function fetchUser(){
            const res = await fetch(`/api/users/${username}`);
            const data = await res.json();
            setUser(data)
            setTemplates(data.posts)
        }
        fetchUser();
        hide();
    }, [])
  return (
    <div className="min-h-screen w-full lg:w-4/6 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <div className="">
          {/* Профиль */}
          <div className="flex items-start md:items-center lg:items-end mt-15 gap-8 mb-10">
            <div className="w-20 lg:w-40 md:w-30 md:h-30 h-20 lg:h-40 relative">
              <Image
                src={user?.image || DefaultPic}
                alt="avatar"
                fill
                className="rounded-2xl object-contain"

              /> 
            </div>
            <div className='flex flex-col'>
              <h1 className="lg:text-4xl text-xl truncate  font-semibold mb-2 text-wrap w-50 md:w-80 lg:w-120">{user?.name}</h1>
              <p className="lg:text-xl text-lg text-gray-400">{user?.nickname}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-20 mb-8 border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 sm:px-8 py-2 text-lg cursor-pointer font-sans",
                  activeTab === tab
                    ? "bg-white/15 rounded-md border-white text-white"
                    : "text-gray-500 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content per tab */}
          <div className={` rounded-lg w-full flex items-center justify-center min-h-[500px] text-center text-gray-400 bg-[#0a0a0a]`}>
            {activeTab === "Posts" && (
              <div className="w-full">
                {Array.isArray(templates) && templates.length > 0 ? 
                <div  className='flex flex-col gap-18'>
                  {templates.map((t:any)=>(
                    <div  key={t.id} className='relative w-full '>
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
                      
                              {hoveredId === t.id? (<button className='flex text-white bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                              
                    </Link>
                    <div className='absolute flex justify-between w-full px-2 bottom-[-34px] float-right mt-3 font-sans text-lg'><span className='text-[#9c9c9c] text-[16px]'>{t.category}</span></div>
                  </div>))}
                </div>
                : 
                <div className="rounded-xl border border-gray-700/50 w-full min-h-[500px] flex flex-col justify-center items-center gap-8 md:gap-13">
                  <StickyNote className="sm:w-30 w-25 h-25 sm:h-30" />
                  <p className="text-lg sm:text-2xl">No Public Posts Yet</p>
                </div>}
                
                
              </div>
            )}
            
          </div>
        </div>
      </main>

    </div>
  )
}

export default UserProfile
