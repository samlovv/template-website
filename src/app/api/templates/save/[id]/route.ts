import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; 
import { prisma } from '@/lib/prisma';


type Params = Promise<{ id: number }>;

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const id = await params;
  const userId = session.user.id;
  const templateId = Number(id.id);
  try {
    // Проверим: уже ли сохранено
    const existing = await prisma.savedTemplate.findUnique({
      where: {
        userId_templateId: {
          userId,
          templateId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Already saved' });
    }

    await prisma.savedTemplate.create({
      data: {
        userId,
        templateId,
      },
    });

    return NextResponse.json({ message: 'Saved' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
