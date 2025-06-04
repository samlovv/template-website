import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// App Router — здесь строго: (req: Request, context: { params: ... })
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { status } = await req.json();

  const updated = await prisma.template.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json({ data: updated });
}

