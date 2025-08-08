import Header from '@/components/Header'
import React from 'react'
import LastTwo from '@/components/LastTwo';




const Home = async() => {
  
  // Fetch the last two templates
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/last`)
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }
  const templates = await data.json();
  

  // Fetch user and template counts
  const counts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/count`)
  if (!counts.ok) {
    throw new Error('Failed to fetch counts');
  }
  const countsData = await counts.json();
  
  
          
  return (
    <div className='w-full '>
      <Header data={countsData}/>
      <div>
        <LastTwo data={templates}/>
      </div>
    </div>
  )
}

export default  Home
