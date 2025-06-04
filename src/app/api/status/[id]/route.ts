import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await req.json();

  const updated = await prisma.template.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json({ data: updated });
}
