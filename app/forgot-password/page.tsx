"use client";

import { useState } from "react";
import Link from "next/link"; // Pakai Link biar lebih smooth pindahnya

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("📩 Link reset sudah dikirim ke email kamu, Sayang. Cek segera ya!");
      } else {
        const err = await res.json();
        setMessage(err.error || "Waduh, ada masalah saat kirim email.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan koneksi sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[30px] shadow-2xl border border-slate-100 text-center">
        <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter mb-2">
          Forgot <span className="text-green-600">Access?</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
          Masukkan email akun Senabrata kamu untuk menerima link pemulihan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              // ✨ SUNTIKAN WARNA DINAMIS: default abu (text-slate-400), focus jadi hitam (focus:text-slate-900)
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-5 text-sm font-bold text-slate-400 focus:text-slate-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-slate-300 placeholder:font-medium disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email terdaftar kamu..."
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-green-600 transition-all active:scale-95 disabled:bg-slate-300"
          >
            {loading ? "SENDING LINK..." : "SEND RECOVERY LINK"}
          </button>
        </form>
        
        {message && (
          <div className="mt-8 flex justify-center">
            <p className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full animate-pulse shadow-sm ${
              message.includes("Gagal") || message.includes("masalah") 
                ? "bg-red-50 text-red-500 border border-red-100" 
                : "bg-green-50 text-green-600 border border-green-100"
            }`}>
              {message}
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link 
            href="/login" 
            className="text-[10px] font-black text-slate-400 uppercase hover:text-slate-900 transition-colors tracking-widest"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}