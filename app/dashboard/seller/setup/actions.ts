"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Pastikan path-nya benar ya Sayang
import { revalidatePath } from "next/cache";

// --- 1. Fungsi Kirim WhatsApp (Pindahkan ke paling atas biar terbaca) ---
async function sendWhatsAppOTP(phoneNumber: string, otp: string) {
  try {
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Authorization': process.env.FONNTE_TOKEN || '',
      },
      body: new URLSearchParams({
        'target': phoneNumber,
        'message': `[SENABRATA CAPITAL] Kode OTP pendaftaran Mitra kamu adalah: ${otp}.`,
      })
    });
    return response.ok;
  } catch (err) {
    console.error("WhatsApp Error:", err);
    return false;
  }
}

// --- 2. Action Kirim OTP ---
export async function sendOtpAction(phoneNumber: string) {
  // Tambahkan authOptions di sini biar getServerSession gak bingung
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { success: false, message: "Login dulu Sayang!" };

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Pastikan di /lib/prisma.ts kamu export const prisma = new PrismaClient()
    await prisma.mitra.upsert({
      where: { email: session.user.email },
      update: { otpCode: otpCode, phoneNumber: phoneNumber },
      create: {
        email: session.user.email,
        username: session.user.name || "user_" + Date.now(),
        farmName: "Pendaftaran...",
        fotoKtp: "pending",
        otpCode: otpCode,
        phoneNumber: phoneNumber,
        status: "PENDING"
      }
    });

    const sent = await sendWhatsAppOTP(phoneNumber, otpCode);
    if (sent) return { success: true };

    return { success: false, message: "Gagal kirim WhatsApp." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal memproses OTP." };
  }
}

// ... Lanjutin Action berikutnya (registerSellerAction)
// --- 3. Action Utama Registrasi Mitra ---
export async function registerSellerAction(formData: any) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) return { success: false, message: "Login dulu Sayang!" };

    // Cari datanya di Mitra (karena tadi sudah di-upsert di langkah kirim OTP)
    const mitra = await prisma.mitra.findUnique({
      where: { email: session.user.email }
    });

    if (!mitra) return { success: false, message: "Data pendaftaran tidak ditemukan." };

    // Cek OTP
    if (mitra.otpCode !== formData.otpCode) {
      return { success: false, message: "Kode OTP salah, Sayang!" };
    }

    const ktpPath = `https://storage.senabrata.com/ktp/${mitra.id}-${Date.now()}.jpg`;

    // UPDATE data yang tadi sudah ada (Jangan pakai .create lagi biar gak dobel)
    await prisma.mitra.update({
      where: { email: session.user.email },
      data: {
        farmName: formData.shopName,
        address: formData.address,
        city: formData.city || null,
        description: formData.description,
        fotoKtp: ktpPath,
        otpCode: null // Hapus OTP kalau sudah sukses
      }
    });

    // PENTING: Role "MITRA" itu biasanya di tabel User, bukan Mitra
    await prisma.user.update({
      where: { email: session.user.email },
      data: { role: "MITRA" }
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Pendaftaran Berhasil! Tunggu aku ACC ya." };

  } catch (error: any) {
    console.error("Prisma Error:", error);
    return { success: false, message: "Sistem lagi pening nih." };
  }
}