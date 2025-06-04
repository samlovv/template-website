// src/app/api/status/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Определяем тип статуса из вашей Prisma-модели
type Status = 'Verified' | 'unVerified' | 'Rejected'; // Замените на ваши реальные значения

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  // 2. Валидация ID
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: "ID must be a number" },
      { status: 400 }
    );
  }

  // 3. Строгая проверка тела запроса
  let body: { status: Status };
  try {
    body = await request.json();
    if (!body.status || !['Verified', 'unVerified', 'Rejected'].includes(body.status)) {
      throw new Error('Invalid status');
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Status must be one of: PENDING, APPROVED, REJECTED" },
      { status: 400 }
    );
  }

  // 4. Типобезопасное обновление
  try {
    const result = await prisma.template.update({
      where: { id },
      data: {
        status: body.status // Теперь тип точно совпадает
      },
      select: { id: true, status: true }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Database operation failed" },
      { status: 500 }
    );
  }
};