import Header from '@/components/Header'
import React from 'react'
import LastTwo from '@/components/LastTwo';




const Home = async() => {
  
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/last`)
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }
  const templates = await data.json();
  
  
          
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
