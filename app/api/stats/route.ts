import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan path prisma kamu

export async function GET() {
    try {
        // 1. Hitung total Mitra yang sudah diverifikasi
        const activeMitraCount = await prisma.mitra.count({
            where: { isVerified: true }
        });

        // 2. Hitung total produk di marketplace
        const totalItemsCount = await prisma.product.count();

        // 3. Ambil rata-rata harga produk (Index Harga)
        const averagePrice = await prisma.product.aggregate({
            _avg: {
                price: true,
            },
        });

        return NextResponse.json({
            priceIndex: averagePrice._avg.price?.toLocaleString('id-ID') || "0",
            activeMitra: activeMitraCount.toLocaleString('id-ID'),
            totalItems: totalItemsCount.toLocaleString('id-ID'),
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}