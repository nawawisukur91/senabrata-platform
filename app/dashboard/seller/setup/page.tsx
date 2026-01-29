"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { 
  Store, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Camera, 
  Truck,
  CheckCircle2
} from 'lucide-react';
import { registerSellerAction, sendOtpAction } from "./actions";

export default function SellerSetupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [ktpPreview, setKtpPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    shopName: '', // Akan dipetakan ke farmName di Prisma
    address: '',
    phoneNumber: '', // Penting untuk OTP WhatsApp
    bankAccount: '',
    bankName: '',
    description: '',
    ktpPhoto: null as File | null,
    otpCode: ''
  });

  // 🪄 CSS MAGIC: Versi Fix Typo & Smooth Transition
  const blurInputClasses = `
    w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold outline-none 
    transition-all duration-500 
    placeholder:text-slate-300 placeholder:slate-[3px] 
    focus:placeholder:text-slate-900 focus:placeholder:slate-0 
    hover:placeholder:text-green-500 hover:placeholder:slate-[1px]
    focus:ring-2 focus:ring-green-600 text-slate-900
  `;

  const handleKtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, ktpPhoto: file });
      setKtpPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (step === 1) {
      // Step 1: Kirim OTP Real ke WhatsApp
      try {
        const res = await sendOtpAction(formData.phoneNumber);
        if (res.success) {
          setStep(2);
        } else {
          alert(res.message);
        }
      } catch (err) {
        alert("Gagal mengirim OTP.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Step 2: Registrasi Final
    try {
      const result = await registerSellerAction(formData);
      if (result.success) {
        alert("Selamat Sayang! Toko kamu sedang diverifikasi Admin.");
        router.push('/dashboard');
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="w-16 h-16 bg-green-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-green-900/20">
            {step === 1 ? <Store size={32} /> : <ShieldCheck size={32} />}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              {step === 1 ? "Setup " : "Security "}
              <span className="text-green-600">{step === 1 ? "Mitra Tani" : "Check"}</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              {step === 1 ? "Lengkapi data untuk mulai berjualan" : "Masukkan kode OTP untuk verifikasi"}
            </p>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* SECTION 1: INFORMASI BISNIS */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-green-600" size={20} />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Informasi Bisnis</h2>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Nama Toko / Kelompok Tani</label>
                  <input required className={blurInputClasses} placeholder="Contoh: Berkah Tani Makmur" onChange={(e) => setFormData({...formData, shopName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Nomor WhatsApp (Aktif)</label>
                  <input required className={blurInputClasses} placeholder="0812xxxxxx" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Deskripsi Usaha</label>
                  <textarea className={`${blurInputClasses} min-h-[100px] py-6`} placeholder="Hasil tani apa saja yang kamu jual?" onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>

            {/* SECTION 2: VERIFIKASI KTP */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <Camera className="text-green-600" size={20} />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Verifikasi Identitas</h2>
              </div>
              <div className="relative group overflow-hidden rounded-[2rem]">
                <input type="file" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer" onChange={handleKtpChange} />
                <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 transition-all group-hover:border-green-600">
                  {ktpPreview ? (
                    <img src={ktpPreview} className="max-h-48 rounded-xl shadow-lg animate-in zoom-in duration-300" alt="KTP Preview" />
                  ) : (
                    <>
                      <Camera size={40} className="text-slate-300 mb-4 transition-transform group-hover:scale-110" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Foto KTP Asli</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: LOGISTIK */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-green-600" size={20} />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Titik Penjemputan</h2>
              </div>
              <div className="grid gap-6">
                <input required className={blurInputClasses} placeholder="Alamat Lengkap Sesuai KTP..." onChange={(e) => setFormData({...formData, address: e.target.value})} />
                <div className="flex items-center gap-3 text-orange-500 bg-orange-50 p-4 rounded-2xl">
                  <Truck size={16} />
                  <p className="text-[9px] font-bold uppercase leading-tight">Digunakan untuk penjemputan logistik oleh tim Senabrata.</p>
                </div>
              </div>
            </div>

            {/* SECTION 4: REKENING */}
            <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="text-green-600" size={20} />
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Pencairan Dana</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required className={blurInputClasses} placeholder="Nama Bank (BCA/Mandiri)" onChange={(e) => setFormData({...formData, bankName: e.target.value})} />
                <input required className={blurInputClasses} placeholder="Nomor Rekening" onChange={(e) => setFormData({...formData, bankAccount: e.target.value})} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-950 text-white py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] hover:bg-green-600 transition-all shadow-2xl flex items-center justify-center gap-4 group">
              {loading ? "Sedang Mengirim OTP..." : "Verifikasi WhatsApp & Daftar"}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP VERIFICATION */
          <div className="bg-white p-12 rounded-[4rem] shadow-2xl text-center space-y-8 animate-in zoom-in duration-500 border border-slate-50">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase italic">Konfirmasi <span className="text-green-600">OTP</span></h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">Masukkan 6 digit kode yang kami kirim ke WhatsApp kamu.</p>
            </div>
            <input 
              type="text" maxLength={6} required 
              className="w-full bg-slate-50 border-none rounded-3xl py-6 px-4 text-4xl text-center font-black tracking-[0.5em] focus:ring-2 focus:ring-green-600 outline-none text-slate-900"
              placeholder="000000"
              onChange={(e) => setFormData({...formData, otpCode: e.target.value})}
            />
            <button onClick={handleSubmit} disabled={loading} className="w-full bg-green-600 text-white py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:bg-slate-900 transition-all">
              {loading ? "Memverifikasi..." : "Aktifkan Toko Sekarang"}
            </button>
            <button onClick={() => setStep(1)} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-500 block mx-auto">Salah Nomor? Ganti Data</button>
          </div>
        )}
      </div>
    </div>
  );
}