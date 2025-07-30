import Header from '@/components/Header'
import React from 'react'
import LastTwo from '@/components/LastTwo';




const Home = async() => {
  
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/last`)
  
  
          
  return (
    <div className='w-full '>
      <Header/>
      <div>
        <LastTwo data={data}/>
      </div>
      
      
    </div>
  )
}

export default  Home
