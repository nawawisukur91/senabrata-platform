import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; // Sekarang ini gak bakal error lagi!
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        fullName: true, 
        role: true,
        isVerified: true,
        profilePicture: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.fullName || "User Senabrata",
      role: user.role === "USER" ? "Strategic Partner" : user.role,
      isVerified: user.isVerified,
      image: user.profilePicture
    });
    
  } catch (error) {
    console.error("🚨 DATABASE ERROR:", error);
    return NextResponse.json({ error: "Protocol Failure" }, { status: 500 });
  }
}