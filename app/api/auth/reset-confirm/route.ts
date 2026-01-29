import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 1. Cari user yang punya token ini DAN belum expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: {
          gt: new Date(), // "gt" artinya Greater Than (waktu sekarang < waktu expired)
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token tidak valid atau sudah expired (30 menit lewat)." },
        { status: 400 }
      );
    }
 
    // 2. UPDATE DATABASE (Password baru & Force Logout)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: password, // Sesuai rencana kita: simpan teks mentah dulu
        resetToken: null,   // Hapus token biar gak bisa dipake lagi
        resetTokenExpires: null,
        // ✨ Trik Force Logout: Kita naikin versinya
        sessionVersion: { increment: 1 }, 
        lastPasswordUpdate: new Date(),
      },
    });

    // 3. Setup Email Notifikasi (Tukang Pos)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Kirim Email Notifikasi "Password Berubah"
    await transporter.sendMail({
      from: '"Senabrata Security" <security@senabrata.com>',
      to: user.email,
      subject: "⚠️ Password Akun Anda Telah Diperbarui",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #16a34a;">Password Berhasil Diubah!</h2>
          <p>Halo <b>${user.username || 'Investor'}</b>,</p>
          <p>Kami memberitahukan bahwa password akun Senabrata kamu baru saja diperbarui.</p>
          <p>Jika ini <b>BUKAN</b> kamu, segera amankan akun dengan klik tombol di bawah untuk mengunci akun dan mengeluarkan semua perangkat:</p>
          <a href="${process.env.NEXTAUTH_URL}/secure-account?email=${user.email}" 
             style="display: inline-block; background: #dc2626; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
             SAYA TIDAK MELAKUKAN INI!
          </a>
          <p style="color: #666; font-size: 12px; mt-10;">Abaikan pesan ini jika memang kamu yang melakukan perubahan.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memproses data." }, { status: 500 });
  }
}