import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try{
    const {html, css, tailwind, category} = await req.json()

    const post = await prisma.template.create({
      data:{
        html,
        css,
        tailwind,
        userId: session.user.id,
        category,
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error){
    return NextResponse.json(
      { error: 'Ошибка при создании поста' },
      { status: 500 })
  }
  
}

export async function GET() {
  /* const templates = await prisma.template.findMany({ 
    where:{
      status: "Verified"
    },
    orderBy: { 
      createdAt: 'desc'
     },
    include: {
      user:{
        select:{
          nickname: true
        }
      }
    } }) */
   const templates = await prisma.template.findMany({
      where: { status: 'Verified' },
      select: {
        id: true,
        previewUrl: true,
        category: true,
        tailwind: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
  return NextResponse.json(templates)
}

