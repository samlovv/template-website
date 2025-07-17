import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


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
        view: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
  return NextResponse.json(templates)
}

