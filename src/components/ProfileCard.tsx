import React from 'react'
import Link from 'next/link'
import {UserRound, Bookmark, LogOut} from "lucide-react"
import { signOut } from 'next-auth/react'

const ProfileCard = () => {
  return (
    <div className='absolute right-4 top-14 flex flex-col p-1 rounded-lg divide-y divide-white/10 border-1 border-white/10 items-start w-55 bg-[#181818]'>
      <Link className='flex w-full p-2 py-3 gap-2 items-center rounded-sm pl-4 hover:bg-white/10' href='/profile'><UserRound/>Profile</Link>
      <button className='flex w-full p-2 py-3 gap-2 items-center rounded-sm pl-4 hover:bg-white/10 cursor-pointer' onClick={()=> signOut()}><LogOut/>Log out</button>
    </div>
  )
}

export default ProfileCard
