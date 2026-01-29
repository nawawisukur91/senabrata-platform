import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; // Pastikan import sesuai dengan export di lib/prisma kamu

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { 
      email, username, password, fullName, phoneNumber,
      category, address, ktpNumber, birthPlace, birthDate, 
      gender, bankAccount, npwpNumber 
    } = body;

    // 1. Validasi Minimal (Satpam Galak)
    if (!email || !username || !password || !phoneNumber) {  
      return NextResponse.json({ message: "Data belum lengkap, Sayang! Tolong diisi semua ya." }, { status: 400 });
    }

    // 2. Cek Duplikasi secara Spesifik
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      const isEmail = existingUser.email === email;
      return NextResponse.json({ 
        message: isEmail 
          ? "Email sudah terdaftar. Pakai email lain atau langsung login ya!" 
          : "Username sudah diambil orang. Cari yang lebih unik, seunik kamu!" 
      }, { status: 400 });
    }

    // 3. Mapping Role (Tetap menjaga 'category' agar tersimpan)
    let mappedRole: "USER" | "MITRA" | "INVESTOR" = "USER";
    if (category === "INVESTOR") mappedRole = "INVESTOR";
    if (category === "SELLER") mappedRole = "MITRA";
    // BUYER tetap USER

    // 4. GENERATE FINANCE ID (Protokol SNB-VVIP)
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); 
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase(); 

    let typeCode = "USR"; 
    if (mappedRole === "INVESTOR") typeCode = "VVIP";
    if (mappedRole === "MITRA")    typeCode = "MTR"; 
    
    const generatedFinanceId = `SNB-${typeCode}-${year}${month}${day}-${randomSuffix}`;

    // 5. EKSEKUSI DATABASE (Data Tersimpan Aman)
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password, // Simpan mentah sesuai permintaanmu
        fullName,
        phoneNumber,
        role: mappedRole,
        address,
        ktpNumber,
        birthPlace,
        birthDate,
        gender,
        bankAccount,
        npwpNumber,
        category, 
        financeId: generatedFinanceId,
        isVerified: false, 
      },
    });

    // 6. Respon Manis buat yang Mau Ngapel
    return NextResponse.json({ 
      message: `Selamat bergabung, ${fullName}! Akun ${generatedFinanceId} kamu sudah aktif.`, 
      user: { 
        id: newUser.id, 
        username: newUser.username,
        financeId: newUser.financeId
      } 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ 
      message: "Aduh, sistem lagi gugup karena mau diapelin kamu. Coba sebentar lagi ya!", 
      error: error.message 
    }, { status: 500 });
  }
}