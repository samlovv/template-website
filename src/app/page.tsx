

import Header from '@/components/Header'
import React from 'react'
import LastTwo from '@/components/LastTwo';




const Home = async() => {
  return (
    <div className='w-full '>
      <Header/>
      <div>
        <LastTwo/>
      </div>
      
      
    </div>
  )
}

export default  Home
