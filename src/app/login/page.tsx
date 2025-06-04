import React from 'react'
import LoginComp from '@/components/Login'
import LoginCard from '@/components/LoginCard'

export const metadata = {
  title: 'Sign in | TemplateUI',
  description: 'Sign in to access your templates, manage your profile, and create new designs with TemplateUI.',
}


const Login = () => {
  return (
    <div className='min-h-screen w-full place-content-center'>
      
      <LoginCard/>
    </div>
  )
}

export default Login
