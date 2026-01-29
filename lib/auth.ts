import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Kita pakai label 'username' secara internal agar fleksibel
        username: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 🟢 SUNTIKAN 1: Pastikan data masuk (kita pakai credentials.username dari form login baru)
        if (!credentials?.username || !credentials?.password) return null;

        // 🟢 SUNTIKAN 2: Gunakan findFirst dengan OR (Email atau Username)
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.username },
              { username: credentials.username }
            ]
          }
        });

        if (!user || !user.password) return null;

        // ✅ Tetap pakai rencana awal: Bandingkan password mentah langsung
        const isPasswordCorrect = credentials.password === user.password;
        
        if (!isPasswordCorrect) return null;

        // 🟢 SUNTIKAN 3: Return data yang konsisten
        return {
          id: user.id,
          email: user.email,
          // Prioritas: Username dulu baru FullName
          name: user.username || user.fullName || "User", 
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.username = user.name; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).name = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};