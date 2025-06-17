import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const template = await prisma.template.findUnique({
    where: { id: Number(id) },
    include: {
      user: {
        select: {
          nickname: true,
          image: true,
        },
      },
    },
  });

  if (!template) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(template);
}
