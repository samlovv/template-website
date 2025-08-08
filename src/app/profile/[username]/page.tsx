import React from 'react'
import { notFound } from "next/navigation"
import UserProfile from '@/components/UserProfile'
import ProfileCategorySelector from '@/components/ProfileCategorySelector'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'


type Params = Promise<{ username: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { username } = await params
  return {
    title: `${username}'s Profile | TemplateUI`,
    description: `Explore ${username}'s templates and creations on TemplateUI.`,
  }
}

const UserPage = async({ params }: { params: Params }) => {
    const { username } = await params

  // Fetch user by username
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/username?username=${username}`)
  if (!user.ok) {
    notFound()
  }
  const userData = await user.json()

    
  return (
    <div className='mt-20 flex'>
        <div className='w-1/4 hidden lg:flex'>
            <ProfileCategorySelector/>
        </div>
        <UserProfile userData={userData} />
    </div>
  )
}

export default UserPage
