import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const investments = await prisma.investment.findMany({
      where: {
        status: "ACTIVE",
      },
      // 🟢 INI KUNCINYA: Biar data User-nya ikut kebawa
      include: {
        user: {
          select: {
            fullName: true,
            financeId: true,
            category: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(investments);
  } catch (error: any) {
    console.error("❌ API ERROR:", error.message);
    return NextResponse.json({ 
      error: "Gagal ambil data", 
      details: error.message 
    }, { status: 500 });
  }
}