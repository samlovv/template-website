import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const [userCount, templateCount] = await Promise.all([
      prisma.user.count(),
      prisma.template.count(),
    ]);


   
  
    return NextResponse.json({ users: userCount, templates: templateCount });
}
