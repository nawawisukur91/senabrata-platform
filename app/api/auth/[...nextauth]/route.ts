import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

// Ini yang bakal ngehandle semua request login/logout
const handler = NextAuth(authOptions);

// Next.js 13/14/15/16 pakai format export GET dan POST
export { handler as GET, handler as POST };