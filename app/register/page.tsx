"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 🟢 Tambahkan ini untuk pindah halaman

export default function RegisterPage() {
  const router = useRouter(); // 🟢 Inisialisasi router

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Tampilkan pesan selamat
    alert(`Berhasil! Selamat bergabung, ${formData.firstName}. Silahkan login untuk masuk ke Dashboard Mitra.`);

    // 2. 🟢 RESET FORM: Mengosongkan kembali semua kotak input
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    });

    // 3. 🟢 REDIRECT: Pindah ke halaman login setelah 1 detik
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
      {/* --- KIRI: VISUAL BRANDING --- */}
      <div className="hidden md:flex md:w-[40%] bg-slate-950 relative overflow-hidden items-center p-20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-600/20 rounded-full blur-[100px] -mr-40 -mt-20"></div>
        <div className="relative z-10 text-white">
          <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic">Senabrata Strategic Partner</span>
          <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Kelola <br/>
            <span className="text-green-600">Masa Depan</span> <br/>
            Pangan.
          </h2>
        </div>
      </div>

      {/* --- KANAN: FORM PENDAFTARAN --- */}
      <div className="flex-1 flex items-center justify-center p-10 bg-white text-slate-900">
        <div className="w-full max-w-md">
          
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Create <span className="text-green-600 font-outline-2">Account</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 italic">Isi data lengkap untuk menjadi mitra strategis.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">Nama Depan</label>
                <input 
                  type="text" 
                  required
                  value={formData.firstName} // 🟢 Hubungkan value dengan state
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="Contoh: Andri"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">Nama Belakang</label>
                <input 
                  type="text" 
                  required
                  value={formData.lastName} // 🟢 Hubungkan value dengan state
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="Wijaya"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">Email Aktif</label>
              <input 
                type="email" 
                required
                value={formData.email} // 🟢 Hubungkan value dengan state
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                placeholder="andri@email.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">WhatsApp Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400">+62</span>
                <input 
                  type="tel" 
                  required
                  value={formData.phone} // 🟢 Hubungkan value dengan state
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="8123456789"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1 italic">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password} // 🟢 Hubungkan value dengan state
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-slate-900 placeholder:text-slate-300 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="••••••••" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-black uppercase hover:text-green-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-green-600" />
              <p className="text-[10px] text-slate-500 font-bold uppercase leading-tight tracking-widest">
                Saya menyetujui <span className="text-green-600 underline cursor-pointer hover:text-slate-900">syarat & ketentuan</span>.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-black py-4.5 rounded-xl text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-green-600 transition-all active:scale-95 mt-4"
            >
              Konfirmasi Pendaftaran
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}