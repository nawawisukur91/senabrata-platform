import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Mengambil produk yang kategorinya INVESTASI saja
    const projects = await prisma.product.findMany({
      where: { category: "INVESTASI" },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: "Gagal memuat data proyek" }, { status: 500 });
  }
}