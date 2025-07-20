import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: number }>;

export async function POST(req: NextRequest, { params }: { params: Params}) {
  const id = await params;
  const templateId = Number(id.id);

  if (isNaN(templateId)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.template.update({
      where: { id: templateId },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: 'View count incremented' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
