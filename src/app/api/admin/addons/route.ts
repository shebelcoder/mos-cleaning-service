import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const addons = await prisma.addon.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(addons);
}

export async function POST(req: Request) {
  const body = await req.json();
  const addon = await prisma.addon.create({
    data: {
      name: body.name,
      price: body.price,
      isActive: body.isActive ?? true,
    },
  });
  return NextResponse.json(addon, { status: 201 });
}
