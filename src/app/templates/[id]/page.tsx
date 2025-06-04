
/* import {prisma} from "@/lib/prisma"
import TemplateEdit from '@/components/TemplateEdit'


export default async function Template({ params }: { params: { id: string } }) {
  const {id} =  await params
  const template = await prisma.template.findUnique({ where: { id:  Number(id) } })
  if (!template) return <div>Not found</div>

  return (
    <div className="p-4 mt-50">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <TemplateEdit lang="html" value={template.html} onChange={() => {}} />
          <TemplateEdit lang="css" value={template.css} onChange={() => {}} />
        </div>
        <div>
          <iframe className="w-full h-[400px] border" srcDoc={`<style>${template.css}</style>${template.html}`} />
        </div>
      </div>
    </div>
  )
} */

import ProfileCategorySelector from '@/components/ProfileCategorySelector'
import TemplateEdit from '@/components/TemplateEdit'
import React from 'react'

const Template = async({params} : {params: {id: string}}) => {

    const {id} = await params

  return (
    <div className='mt-20  lg:flex'>
      <div className='w-1/5 mt-9 hidden lg:flex'>
        <ProfileCategorySelector/>
      </div>
      <div className='lg:w-4/5'>
        <TemplateEdit id ={id} />
      </div>
      
    </div>
  )
}

export default Template
