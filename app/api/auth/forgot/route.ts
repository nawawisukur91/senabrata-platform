import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto"; // Library bawaan Node.js untuk bikin token acak
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Kita tetap kasih respon sukses demi keamanan (biar hacker gak tau email mana yg terdaftar)
      return NextResponse.json({ message: "Jika email terdaftar, instruksi reset akan dikirim." });
    }

    // 2. Generate Token Acak & Waktu Kadaluarsa (30 Menit)
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 menit dari sekarang

    // 3. Simpan Token ke Database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpires: expires,
      },
    });

    // 4. Konfigurasi Pengirim Email (SMTP)
    // GANTI user & pass dengan email khusus buat sistem kamu ya sayang
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Masukkan di file .env nanti
        pass: process.env.EMAIL_PASS, // Masukkan di file .env nanti
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/update-password?token=${token}`;

    // 5. Kirim Emailnya
    await transporter.sendMail({
      from: '"Senabrata System" <no-reply@senabrata.com>',
      to: email,
      subject: "Reset Password Request - Senabrata Capital",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Halo, ${user.username || 'Investor'}!</h2>
          <p>Kamu meminta untuk reset password. Link ini hanya berlaku selama <b>30 menit</b>.</p>
          <a href="${resetUrl}" style="background: #16a34a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 10px;">Reset Password Sekarang</a>
          <p>Jika kamu tidak meminta ini, abaikan saja email ini.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Email reset berhasil dikirim!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal mengirim email reset." }, { status: 500 });
  }
}