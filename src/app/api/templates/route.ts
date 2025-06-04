import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateScreenshotAndUpload } from "@/lib/utilts/generatePreview";



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try{
    const {html, css, tailwind, category} = await req.json()

    const preview = await generateScreenshotAndUpload({html, css, tailwind})
    console.log("Preview URL from generate function:", preview);



    const post = await prisma.template.create({
      data:{
        html,
        css,
        tailwind,
        userId: session.user.id,
        category,
        previewUrl: preview ?? undefined,
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
  const templates = await prisma.template.findMany({
      select: {
        id: true,
        previewUrl: true,
        category: true,
        status:true,
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
