import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json({ message: "Email atau Password salah!" }, { status: 401 });
    }

    let redirectTo = "/marketplace"; 
    if (user.category === "INVESTOR") redirectTo = "/dashboard/portofolio"; 
    else if (user.category === "SELLER") redirectTo = "/dashboard/finance";

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, fullName: user.fullName, category: user.category },
      redirectTo 
    }, { status: 200 });

    // 🟢 SUNTIKAN COOKIE UNTUK SATPAM (MIDDLEWARE)
    response.cookies.set("token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/", // Agar bisa dibaca di seluruh folder app
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}