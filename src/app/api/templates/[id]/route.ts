import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(req:Request, { params }: { params: { id: string } }) {
  const {id} = await params
  const template = await prisma.template.findUnique({ where: { id: Number(id) },
      include: {
      user:{
        select:{
          nickname: true,
          image: true,
        }
      }
    }})
  if (!template) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(template)
}
