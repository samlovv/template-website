import React from 'react'
import Image from 'next/image';
import tailwindsvg from "@/assets/icons/tailwind-css-svgrepo-com.svg"
import csssvg from "@/assets/icons/css3-svgrepo-com.svg"

import {
  LayoutDashboard,
  Square,
  Monitor,
  Megaphone,
  Layers,
  MessageSquare,
  CreditCard,
  FileText,
  Newspaper,
  Users,
  HelpCircle,
  Images,
  ListOrdered,
  BarChart2,
  SquareStack,
  LogIn,
  Mail,
  Calendar, X
} from "lucide-react";

type Props = {
  tailwind: boolean,
  setTailwind: React.Dispatch<React.SetStateAction<boolean>>;
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories = [
  { name: "Navbar", icon: LayoutDashboard, value: "Navbar" },
  { name: "Footer", icon: Square, value: "Footer" },
  { name: "Hero", icon: Monitor, value: "Hero" },
  { name: "CTA", icon: Megaphone, value: "CTA" },
  { name: "Features", icon: Layers, value: "Features" },
  { name: "Testimonials", icon: MessageSquare, value: "Testimonials" },
  { name: "Pricing", icon: CreditCard, value: "Pricing" },
  { name: "Forms", icon: FileText, value: "Forms" },
  { name: "Blog", icon: Newspaper, value: "Blog" },
  { name: "Team", icon: Users, value: "Team" },
  { name: "FAQ", icon: HelpCircle, value: "FAQ" },
  { name: "Gallery", icon: Images, value: "Gallery" },
  { name: "Steps", icon: ListOrdered, value: "Steps" },
  { name: "Stats", icon: BarChart2, value: "Stats" },
  { name: "Cards", icon: SquareStack, value: "Cards" },
  { name: "Login", icon: LogIn, value: "Login" },
  { name: "Contact", icon: Mail, value: "Contact" },
  { name: "Timeline", icon: Calendar, value: "Timeline" },
];

const CodeType = ({ tailwind, setTailwind, category, setCategory, setVisibility }: Props) => {
  return (
    <div className='fixed h-screen w-full bg-black/70 z-100 place-content-center flex items-center justify-center'>
      <div className='w-full max-w-6xl h-[90vh] bg-[#191919] relative rounded-3xl shadow-xl inset-shadow-2xs p-5 md:p-10 overflow-y-scroll'>
        <X className='cursor-pointer absolute top-5 right-5 w-6 hidden md:flex h-6 md:w-9 md:h-9' onClick={() => setVisibility(false)} />
        <h1 className='font-semibold text-[20px] sm:text-[30px] md:text-[42px] text-center mt-5'>What are you making ?</h1>
        
        <div className="border-b-2 border-black/10 grid mt-10 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[55vh] px-2 md:px-10 overflow-y-auto overflow-x-hidden">
          {Categories.map(({ name, icon: Icon, value }) => {
            const isActive = category === value
            return (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`flex flex-col cursor-pointer items-center justify-center gap-2 p-4 rounded-xl border transition-all
                  ${isActive ? 'border-blue-500 scale-[0.95] bg-[#1E1E1E]' : 'border-neutral-700 bg-neutral-900 hover:border-neutral-600'}
                `}
              >
                <Icon className={`w-12 h-12 md:w-16 md:h-16 ${isActive ? 'text-blue-500' : 'text-neutral-400'}`} />
                <span className={`text-xs md:text-sm ${isActive ? 'text-white' : 'text-neutral-400'} mt-2 md:mt-3`}>{name}</span>
              </button>
            )
          })}
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mt-6 md:mt-10 justify-end'>
          <h1 className='text-[18px] md:text-[20px]'>Technology</h1>
          <div className="flex font-sans items-center divide-x-1 divide-[#5e5e5e]">
            {/* CSS Option */}
            <label className={`transition-all duration-130 flex items-center gap-2 rounded-l-xl cursor-pointer  bg-[#1E1E1E]  p-2 px-4 ${!tailwind ? 'border-2 border-blue-500 bg-black hover:bg-[#0c0c0c]' : "hover:border-white hover:bg-[#2c2c2c] border-1 border-[#5e5e5e]"}`}>
              <Image src={csssvg} height={21} width={21} alt='css icon' />
              <input
                type="radio"
                name="style"
                checked={!tailwind}
                onChange={() => setTailwind(false)}
                className="hidden"
              />
              <span className="text-base md:text-lg text-white font-sans">CSS</span>
            </label>

            {/* Tailwind Option */}
            <label className={`transition-all duration-130 flex items-center gap-2 rounded-r-xl cursor-pointer  bg-[#1E1E1E]  p-2 px-4 ${tailwind ? 'border-2 border-blue-500 bg-black hover:bg-[#0c0c0c]' : "hover:border-white hover:bg-[#2c2c2c] border-1 border-[#5e5e5e]"}`}>
              <Image src={tailwindsvg} height={21} width={21} alt='tailwind icon' />
              <input
                type="radio"
                name="style"
                checked={tailwind}
                onChange={() => setTailwind(true)}
                className="hidden"
              />
              <span className="text-base md:text-lg text-white font-sans">Tailwind CSS</span>
            </label>
          </div>

          <button onClick={() => setVisibility(false)} className='transition-all duration-150 text-[16px] md:text-[18px] bg-blue-500 p-2 px-6 rounded-lg cursor-pointer hover:bg-blue-400'>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default CodeType
