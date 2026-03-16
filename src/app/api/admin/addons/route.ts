import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const addons = await prisma.addon.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(addons);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, price } = await req.json();
  if (!name || price === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const addon = await prisma.addon.create({
    data: { name, price: parseFloat(price) },
  });
  return NextResponse.json(addon, { status: 201 });
}
