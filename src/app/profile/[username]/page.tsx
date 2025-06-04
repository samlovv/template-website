import React from 'react'
import { notFound } from "next/navigation"
import UserProfile from '@/components/UserProfile'
import ProfileCategorySelector from '@/components/ProfileCategorySelector'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'



export async function generateMetadata({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username)
  return {
    title: `${username}'s Profile | TemplateUI`,
    description: `Explore ${username}'s templates and creations on TemplateUI.`,
  }
}

const UserPage = async({ params }: { params: { username: string } }) => {
    const { username } = await params

    const user = await prisma.user.findUnique({
      where: {
        nickname: username,
      },
    })

    if (!user) {
      notFound() // автоматически показывает 404 страницу
    }

    
    
  return (
    <div className='mt-20 flex'>
        <div className='w-1/4 hidden lg:flex'>
            <ProfileCategorySelector/>
        </div>
        <UserProfile username={username} />
    </div>
  )
}

export default UserPage
