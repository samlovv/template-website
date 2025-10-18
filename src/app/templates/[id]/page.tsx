// ...existing code...
import ProfileCategorySelector from '@/components/ProfileCategorySelector'
import TemplateEdit from '@/components/TemplateEdit'
import { prisma } from '@/lib/prisma'
import React from 'react'

type Params = Promise<{ id: string }>;

const Template = async({ params }: { params: Params }) => {

    const {id} = await params

    const template = await prisma.template.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            nickname: true,
            image: true,
          }
        }
      }
    })

    if (!template) return <div>Not found</div>

  return (
    <div className='mt-20  lg:flex'>
      <div className='w-1/5 mt-9 hidden lg:flex'>
        <ProfileCategorySelector/>
      </div>
      <div className='lg:w-4/5'>
        <TemplateEdit id={id} initialData={template} />
      </div>
      
    </div>
  )
}

export default Template
// ...existing code...