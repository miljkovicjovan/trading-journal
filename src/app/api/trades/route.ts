import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // or wherever your Prisma client is

export async function GET() {
  const trades = await prisma.trade.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ trades });
}
