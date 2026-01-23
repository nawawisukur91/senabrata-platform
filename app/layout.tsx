import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// IMPORT NAVBAR: Pastikan file Navbar.tsx ada di dalam folder components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senabrata Capital",
  description: "Management System for Investors and Farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg--50`}
      >
        {/* 1. NAVBAR DI ATAS: Melayang di semua halaman */}
        <Navbar />

        {/* 2. MAIN CONTENT: Dikasih pt-28 (padding top) biar gak ketutup Navbar */}
        <main className="pt-0 min-h-screen">
          {children}
        </main>

        {/* 3. OPTIONAL: Footer bisa ditaruh di sini nantinya */}
        <Footer />
      </body>
    </html>
  );
}