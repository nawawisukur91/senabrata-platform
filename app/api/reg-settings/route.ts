import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🟢 GET: Mengambil isi Syarat & Ketentuan untuk modal di Register
export async function GET() {
  try {
    const setting = await prisma.regSetting.findUnique({
      where: { id: "terms_and_conditions" },
    });

    if (!setting) {
      return NextResponse.json(
        { content: "Syarat & Ketentuan belum dikonfigurasi oleh Admin." },
        { status: 200 }
      );
    }

    return NextResponse.json(setting, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching reg-settings:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data protokol", error: error.message },
      { status: 500 }
    );
  }
}

// 🔵 POST/PATCH: Opsional, jika kamu ingin update dari Dashboard Admin nanti
export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    const updatedSetting = await prisma.regSetting.upsert({
      where: { id: "terms_and_conditions" },
      update: { content },
      create: {
        id: "terms_and_conditions",
        content: content,
      },
    });

    return NextResponse.json(updatedSetting, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal memperbarui Syarat & Ketentuan" },
      { status: 500 }
    );
  }
}