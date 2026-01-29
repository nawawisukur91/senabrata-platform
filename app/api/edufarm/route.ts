import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Nanti di database kamu bisa buat tabel 'DigitalProduct'
        // Untuk sekarang, kita kasih data "asli" dari server biar gak error
        const ebookData = {
            id: "ebook-01",
            title: "Strategi Agribisnis 2026: Cabai Merah",
            price: 49000,
            previewUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2192",
            totalPage: 152,
            isLocked: true, // Default terkunci sebelum bayar
            modules: [
                "Rahasia Pemupukan Fase Generatif",
                "Analisis ROI & Break Even Point",
                "Sistem Irigasi Tetes Otomatis",
                "Targeting Pasar Ekspor & Retail"
            ]
        };

        return NextResponse.json(ebookData);
    } catch (error) {
        return NextResponse.json({ error: "Gagal memuat materi" }, { status: 500 });
    }
}