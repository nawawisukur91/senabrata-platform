"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  // 🟢 1. GANTI 'email' jadi 'identifier' (Biar bisa diisi email atau username)
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
      title: "Lahan Pertanian",
      desc: "Optimalisasi lahan untuk masa depan."
    },
    {
      url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=1200",
      title: "Peternakan Modern",
      desc: "Kesejahteraan hewan, hasil maksimal."
    },
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200",
      title: "Hasil Bumi",
      desc: "Dari tanah terbaik Indonesia."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🟢 2. KIRIM 'identifier' ke backend. 
      const result = await signIn("credentials", {
        username: formData.identifier, // Dikirim sebagai 'username' ke lib/auth.ts
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        alert("Akses Ditolak! Periksa Kembali User & Password.");
        setFormData(prev => ({ ...prev, password: '' }));
      } else {
        // 💉 SUNTIKAN NAVIGASI 4 JALUR (Mulai dari sini)
        const sessionResponse = await fetch('/api/auth/session');
        const session = await sessionResponse.json();
        const userRole = session?.user?.role;

        alert(`Verifikasi Berhasil! Selamat Datang, ${session?.user?.name}`);

        switch (userRole) {
          case 'SUPER_ADMIN':
            alert("Selamat Datang, Baginda Raja!");
            router.push('/admin/settings');
            break;
          case 'ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'MITRA':
            // Redirect ke Dashboard Seller/Nasabah
            router.push('/mitra-directory/[id]');
            break;
          case 'INVESTOR':
            // Redirect ke Portofolio Investasi
            router.push('/dashboard/portofolio');
            break;
          case 'USER':
            // Pembeli langsung kita suguhkan belanjaan
            router.push('/marketplace');
            break;
          default:
            router.push('/');
            break;
        }
        // 💉 AKHIR SUNTIKAN

        router.refresh(); 
      }
    } catch (err) {
      alert("Aduh, sistem lagi pusing. Coba lagi nanti ya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* --- KIRI: VISUAL SLIDE SHOW --- */}
      <div className="hidden md:flex md:w-[70%] relative overflow-hidden bg-slate-900 items-center p-20">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-50' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.url} 
              alt={slide.title} 
              className="w-full h-full object-cover scale-105 transition-transform duration-[5000ms]"
              style={{ transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-950/80 to-transparent"></div>
        <div className="relative z-10">
          <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block italic">Senabrata Capital System</span>
          <h2 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.85]">
            Membangun <br/> <span className="text-green-600">Ketahanan</span> <br/> Pangan.
          </h2>
          <div className="mt-8 h-1.5 w-24 bg-green-600"></div>
          <p className="text-white text-sm font-bold mt-8 tracking-[0.2em] uppercase opacity-80 italic">
            {slides[currentSlide].desc}
          </p>
        </div>
      </div>

      {/* --- KANAN: FORM LOGIN --- */}
      <div className="flex-1 flex items-center justify-center p-10 bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-20">
        <div className="w-full max-w-xs">
          <div className="mb-12">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Log <span className="text-green-600">In.</span></h1>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mt-3 italic opacity-60">Akses Client Portal Senabrata.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">Username or Email</label>
              <input 
                type="text" 
                required 
                disabled={loading}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all disabled:opacity-50"
                placeholder="adityasnb / aditya@senabrata.com"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Secret Password</label>
                <Link href="/forgot-password" className="text-[8px] font-black text-green-600 uppercase hover:underline transition-all">Forgot?</Link>
              </div>
              
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  disabled={loading}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4.5 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all disabled:opacity-50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[10px] uppercase"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-green-600 transition-all active:scale-95 disabled:bg-slate-300"
            >
              {loading ? "Verifying..." : "Sign In Now"}
            </button>
          </form>

          <div className="text-center mt-16">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">Not a member yet?</p>
            <button 
              onClick={() => router.push('/register')} 
              className="text-slate-900 hover:text-green-600 font-black text-[11px] uppercase tracking-widest border-b-2 border-slate-900 hover:border-green-600 pb-1"
            >
              Daftar Akun Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}