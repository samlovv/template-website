import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const templates = await prisma.template.findMany({ 
    where:{
      status: "Verified"
    },
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
    orderBy: { 
      createdAt: 'desc'
     },
    take: 2 })
  return NextResponse.json(templates)
}

