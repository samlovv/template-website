import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const templateId = parseInt(params.id);

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
