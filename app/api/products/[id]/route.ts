import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// --- FUNGSI AMBIL SEMUA PRODUK MITRA ---
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        seller: { select: { fullName: true } } // Biar dapet nama mitranya sekalian
      }
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Gagal ambil produk mitra:", error);
    return NextResponse.json(
      { error: "Gagal menarik data produk dari database" }, 
      { status: 500 }
    );
  }
}

// --- FUNGSI TAMBAH PRODUK BARU ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validasi: Pastikan field utama ada
    if (!body.name || !body.price || !body.sellerId) {
      return NextResponse.json(
        { error: "Nama, Harga, dan Seller ID wajib diisi ya sayang!" }, 
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        stock: Number(body.stock) || 0,
        totalStock: Number(body.totalStock) || Number(body.stock) || 0,
        category: body.category,
        img: body.img || body.image, // Kita terima 'img' atau 'image' tapi simpan ke 'img'
        statusProject: body.statusProject || "OPEN", // Sesuai model Prisma kamu
        sellerId: body.sellerId, // Ini wajib ada (Foreign Key ke User)
        
        // Field tambahan sesuai model berkelas kamu
        weight: body.weight,
        height: body.height,
        lineage: body.lineage,
        location: body.location,
        isPriority: body.isPriority || false,
        
        // Default values untuk field investasi biar gak error
        roi: Number(body.roi) || 0,
        targetAmount: Number(body.targetAmount) || 0,
        currentAmount: 0,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error: any) {
    console.error("Gagal create product:", error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}