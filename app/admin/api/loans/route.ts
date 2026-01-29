import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const loans = await prisma.loanPartner.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(loans);
  } catch (err) {
    return NextResponse.json({ error: "Gagal ambil data bank" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newLoan = await prisma.loanPartner.create({
      data: {
        bankName: body.bankName,
        loanName: body.loanName,
        limitAmount: body.limitAmount,
        interest: body.interest,
        applyUrl: body.applyUrl,
        isActive: true
      }
    });
    return NextResponse.json(newLoan);
  } catch (err) {
    return NextResponse.json({ error: "Gagal tambah bank" }, { status: 500 });
  }
}