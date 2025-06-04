import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET() {

    const session = await getServerSession(authOptions);

    


    const templates = await prisma.template.findMany({ 
        where:{
            userId: session?.user.id,
        },
        select: {
            id: true,
            status: true,
            previewUrl: true,
            category: true,
            tailwind: true,
        },
            orderBy: {
            createdAt: 'desc'
        } })
    return NextResponse.json(templates)
}
