"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {Search, ShieldX, StickyNote, CodeXml} from "lucide-react"
import Link from "next/link";






type Template = {
  id: number;
  status: string;
  category: string;
  tailwind: boolean;
  previewUrl: string;
  component: React.ReactNode;
};

export default function ProfilePage() {
  const tabs = ["Posts", "In Review", "Rejected"];
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("Posts");


  
  const [unvtemplates, setUnvTemplates] = useState<Template[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [rtemplates, setRTemplates] = useState<Template[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null);


  
  
  useEffect(()=>{
    const getTemplate = async()=>{
      const res = await fetch('/api/templates/profile/')
      const templates = await res.json()
      
      const verified = templates.filter((p: Template) => p.status === 'Verified');
      const unverified = templates.filter((p: Template) => p.status === 'unVerified');
      const rejected = templates.filter((p: Template) => p.status === 'Rejected');
      
      setTemplates(verified)
      setRTemplates(rejected)
      setUnvTemplates(unverified)
    }
    getTemplate()
  },[])

  
  
  if (status === "loading") return <div className="p-6">Loading...</div>;
  if (!session) return <div className="p-6">You are not logged in.</div>;

  const user = session.user;
  const nickname = user.nickname || user.email?.split("@")[0];


  return (
    <div className="min-h-screen w-full lg:w-4/6 float-right text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <div className="">
          {/* Профиль */}
          <div className="flex items-start md:items-center lg:items-end mt-15 gap-8 mb-10">
            <div className="w-20 lg:w-40 md:w-30 md:h-30 h-20 lg:h-40 relative">
              <Image
                src={user.image || "/default-avatar.png"}
                alt="avatar"
                fill
                className="rounded-2xl object-contain"

              /> 
            </div>
            <div>
              <h1 className="lg:text-4xl text-xl font-semibold mb-2">{user.name}</h1>
              <p className="lg:text-xl text-lg text-gray-400">{nickname}</p>
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
                {templates.length > 0 ? 
                <div  className='flex flex-col gap-18'>
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
                      
                              {hoveredId === t.id? (<button className='text-white flex bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                              
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
            {activeTab === "In Review" && (
              <div className="w-full">
                {unvtemplates.length>0 ? 
                <div  className='flex flex-col gap-18'>
                  {unvtemplates.map((t:any)=>(
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
                      
                              {hoveredId === t.id? (<button className='text-white flex bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                              
                    </Link>
                    <div className='absolute flex justify-between w-full px-2 bottom-[-34px] float-right mt-3 font-sans text-lg'><span className='text-[#9c9c9c] text-[16px]'>{t.category}</span></div>
                  </div>))}
                </div>
                : 
                <div className="rounded-xl border border-gray-700/50 w-full min-h-[500px] flex flex-col justify-center items-center gap-8 md:gap-13">
                  <Search className="sm:w-30 w-25 h-25 sm:h-30" />
                  <p className="text-lg sm:text-2xl">Nothing In Review Yet</p>
                </div>}
                
                
              </div>
            )}
            {activeTab === "Rejected" && (
              <div className="w-full">
                {rtemplates.length > 0 ? 
                <div  className='flex flex-col gap-18'>
                  {rtemplates.map((t:any)=>(
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
                      
                              {hoveredId === t.id? (<button className='flex text-white bg-[#191919] w-36 gap-3 rounded-xl absolute right-4 bottom-4 cursor-pointer hover:bg-[#262626] p-3'><CodeXml/> Get Code </button>): null}
                              
                    </Link>
                    <div className='absolute flex justify-between w-full px-2 bottom-[-34px] float-right mt-3 font-sans text-lg'><span className='text-[#9c9c9c] text-[16px]'>{t.category}</span></div>
                  </div>))}
                </div>
                : 
                <div className="rounded-xl border border-gray-700/50 w-full min-h-[500px] flex flex-col justify-center items-center gap-8 md:gap-13">
                  <ShieldX className="sm:w-30 w-25 h-25 sm:h-30" />
                  <p className="text-lg sm:text-2xl">Nothing Rejected Posts</p>
                </div>}
                
                
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );

}
