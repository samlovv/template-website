import React from 'react'
import ProfileComp from '@/components/ProfileComp'
import ProfileCategorySelector from '@/components/ProfileCategorySelector'


export const metadata = {
  title: 'Your Profile | TemplateUI',
  description: 'Manage your templates, update your profile, and view your contributions to the template gallery.',
}

const Profile = () => {
  return (
    <div className='mt-20 flex'>
      <div className='w-1/4 hidden lg:flex'>
        <ProfileCategorySelector/>
      </div>
      <ProfileComp/>
    </div>
  )
}

export default Profile
