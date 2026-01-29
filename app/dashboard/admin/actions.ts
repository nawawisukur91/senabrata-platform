"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveMitra(userId: string) {
    try {
        // 1. Update status di Database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { status: "VERIFIED" },
        });

        // 2. Kirim Notifikasi WA via Fonnte
        // Kita pakai fungsi yang sudah kita buat sebelumnya atau fetch langsung
        if (updatedUser.phoneNumber) {
            await fetch("https://api.fonnte.com/send", {
                method: "POST",
                headers: {
                    Authorization: process.env.FONNTE_TOKEN || "",
                },
                body: new URLSearchParams({
                    target: updatedUser.phoneNumber,
                    message: `Selamat Pak/Bu ${updatedUser.username}! Akun Senabrata Capital Anda telah diverifikasi. Sekarang Anda dapat melanjutkan transaksi di marketplace kami.`,
                }),
            });
        }

        // 3. Refresh halaman biar data yang PENDING hilang dari list
        revalidatePath("/dashboard/admin");

        return { success: true };
    } catch (error) {
        console.error("Gagal approve mitra:", error);
        return { success: false, error: "Gagal memproses verifikasi" };
    }
}