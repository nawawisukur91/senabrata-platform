"use server"

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

// 1. Fungsi buat ambil data dari database pake Prisma
export async function getPendingWithdrawals() {
  try {
    const data = await prisma.transaction.findMany({
      where: {
        type: "WITHDRAW",
        status: "PENDING",
      },
      include: {
        user: true, // Ini buat narik data fullName & balance dari tabel users
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  } catch (error) {
    console.error("Error get data:", error);
    return [];
  }
}

// 2. Fungsi buat eksekusi Approve atau Reject
export async function processWithdrawalAction(id: string, action: "APPROVE" | "REJECT") {
  try {
    // Pakai $transaction biar kalau satu gagal, semua batal (aman buat duit!)
    const result = await prisma.$transaction(async (tx) => {
      const trx = await tx.transaction.findUnique({
        where: { id },
        include: { user: true }
      });

      if (!trx || trx.status !== "PENDING") throw new Error("Transaksi sudah tidak valid.");

      if (action === "REJECT") {
        await tx.transaction.update({
          where: { id },
          data: { status: "FAILED" }
        });
      } else {
        // Logika Approve
        if (trx.user.balance < trx.amount) throw new Error("Saldo investor tidak mencukupi!");

        // Potong Saldo User
        await tx.user.update({
          where: { id: trx.userId },
          data: { balance: { decrement: trx.amount } }
        });

        // Update Status Transaksi
        await tx.transaction.update({
          where: { id },
          data: { status: "SUCCESS" }
        });
      }

      // Refresh data di halaman tanpa reload browser
      revalidatePath("/admin/verify/withdraw");
      
      // Kita kembalikan objek sukses yang punya properti error (tapi null)
      return { success: true, error: null };
    });

    return result;
  } catch (error: any) {
    // Bagian gagal tetap pakai style kamu tapi pastikan error.message ada
    return { success: false, error: error.message || "Gagal memproses transaksi" };
  }
}