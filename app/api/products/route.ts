import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Pastikan import prisma kamu sudah benar ya

export async function GET() {
    try {
        // Kita ambil data dari tabel 'Product' di Supabase kamu
        const products = await prisma.product.findMany({
            take: 5, // Ambil 5 saja buat highlight di Home
            orderBy: {
                createdAt: 'desc' // Yang terbaru muncul duluan
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error("Gagal ambil produk:", error);
        return NextResponse.json({ error: "Gagal memuat data dari database" }, { status: 500 });
    }
}