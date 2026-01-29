"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(data: {
  productId: string;
  totalAmount: number;
  resi: string;
  bankId: string;
  logisticId: string;
}) {
  try {
    // 1. Ambil User ID (Contoh: Hardcode dulu atau ambil dari session kalau sudah ada auth)
    // Untuk testing, kita cari user pertama di DB atau sesuaikan dengan sistem auth Boss
    const firstUser = await prisma.user.findFirst();
    if (!firstUser) throw new Error("User tidak ditemukan");

    // 2. Simpan ke Tabel Order (Field disamakan dengan Schema Boss)
    const order = await (prisma as any).order.create({
      data: {
        userId: firstUser.id,
        productId: data.productId,
        quantity: 1,
        totalPrice: data.totalAmount, // Sesuai schema Boss
        resiNumber: data.resi,        // Sesuai schema Boss
        bankId: data.bankId,          // Sesuai tambahan kita
        logisticId: data.logisticId,  // Sesuai tambahan kita
        status: "PENDING",
        paymentStatus: "UNPAID",
      }
    });

    // 3. Potong Stok Produk (Opsional, tapi penting biar gak oversold)
    await prisma.product.update({
      where: { id: data.productId },
      data: { stock: { decrement: 1 } }
    }).catch(() => console.log("Gagal potong stok, mungkin field stock belum ada"));

    revalidatePath('/dashboard/orders');
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Gagal simpan order:", error);
    return { success: false };
  }
}