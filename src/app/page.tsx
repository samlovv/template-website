import Header from '@/components/Header'
import React from 'react'
import LastTwo from '@/components/LastTwo';




const Home = async() => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/last`)
  const templates = await res.json()
  
          
  return (
    <div className='w-full '>
      <Header/>
      <div>
        <LastTwo data={templates}/>
      </div>
      
      
    </div>
  )
}

export default  Home
