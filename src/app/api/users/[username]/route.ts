import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { username: string } }) {
  const { username } = await params
  try {
    const user = await prisma.user.findUnique({
      where: { nickname: username },
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