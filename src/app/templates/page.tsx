import TemplateComp from '@/components/TemplateComp'
import React from 'react'
import { Suspense } from "react";

export const metadata = {
  title: 'Templates Gallery | TemplateUI',
  description: 'Explore a collection of modern website templates. Browse, preview, and get inspired by community-generated designs.',
}

const Templates = () => {
  return (
    <div className='my-20 px-6 md:px-12'>
      <Suspense fallback={<div>Loading Templates...</div>}>
        <TemplateComp />
      </Suspense>
    </div>
  )
}

export default Templates
