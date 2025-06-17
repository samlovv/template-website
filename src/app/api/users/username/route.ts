import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
  
  try {
    const user = await prisma.user.findUnique({
      where: { nickname: String(username) },
      include: {
         posts: {
            where:{
                status: 'Verified'
            },
            select: {
              id: true,
              previewUrl: true,
              category: true,
              tailwind: true,
            },
         }
         
        },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}