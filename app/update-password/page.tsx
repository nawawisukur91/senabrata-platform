"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function UpdatePasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (pass1 !== pass2) {
      alert("Password tidak cocok, Sayang!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-confirm", {
        method: "POST",
        body: JSON.stringify({ token, password: pass1 }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStatus("Password berhasil diubah! Mengalihkan ke login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const err = await res.json();
        setStatus("Gagal: " + (err.error || "Link mungkin sudah expired."));
      }
    } catch (error) {
      setStatus("Gagal: Ada masalah koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-[30px] shadow-2xl border border-slate-100">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
        Update <span className="text-green-600">Password.</span>
      </h2>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-8 italic">
        Tentukan password baru untuk keamanan akun kamu.
      </p>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">New Secret</label>
          <input 
            type="password" 
            placeholder="Masukkan Password Baru..." 
            onChange={(e) => setPass1(e.target.value)}
            // ✨ SUNTIKAN WARNA DINAMIS: default abu-abu (text-slate-400), focus jadi hitam (focus:text-slate-900)
            className="w-full p-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-400 focus:text-slate-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-slate-300 placeholder:font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Confirm Secret</label>
          <input 
            type="password" 
            placeholder="Ulangi Password Baru..." 
            onChange={(e) => setPass2(e.target.value)}
            // ✨ SUNTIKAN WARNA DINAMIS JUGA DISINI ✨
            className="w-full p-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-400 focus:text-slate-900 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all placeholder:text-slate-300 placeholder:font-medium"
          />
        </div>
        
        <button 
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-green-600 transition-all active:scale-95 disabled:bg-slate-300 mt-4"
        >
          {loading ? "PROCESSING..." : "UPDATE PASSWORD NOW"}
        </button>
      </div>
      
      {status && (
        <div className="mt-8 flex justify-center">
          <p className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full animate-pulse shadow-sm ${
            status.includes("Gagal") 
              ? "bg-red-50 text-red-500 border border-red-100" 
              : "bg-green-50 text-green-600 border border-green-100"
          }`}>
            {status}
          </p>
        </div>
      )}
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-black uppercase text-slate-400 tracking-[0.5em] animate-pulse">
        Syncing Access...
      </div>
    }>
      <UpdatePasswordContent />
    </Suspense>
  );
}