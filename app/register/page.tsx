"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🟢 State untuk Modal Syarat & Ketentuan dari Database
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsContent, setTermsContent] = useState("");

  // 🟢 State lengkap untuk KYC & Kebutuhan Database
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    category: '',
    ktpNumber: '',
    birthPlace: '', 
    birthDate: '',  
    gender: '',     
    address: '',
    bankAccount: '',
    npwpNumber: '',
  });

  // 🟢 Ambil data Syarat & Ketentuan dari model RegSetting
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await fetch('/api/reg-settings');
        const data = await res.json();
        if (data && data.content) {
          setTermsContent(data.content);
        }
      } catch (err) {
        console.error("Gagal load Syarat & Ketentuan:", err);
      }
    };
    fetchTerms();
  }, []);

  const slides = [
    { 
      title: "Sustainable", 
      highlight: "Agriculture", 
      desc: "Investasi cerdas di sektor riil peternakan dan pertanian.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000" 
    },
    { 
      title: "Strategic", 
      highlight: "Investment", 
      desc: "Transparansi penuh dalam pengelolaan aset produktif.",
      img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=2000" 
    },
    { 
      title: "Future", 
      highlight: "Growth", 
      desc: "Membangun ketahanan pangan nasional bersama Senabrata.",
      img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000" 
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // Ini akan mengirim seluruh isi state ke API
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Selamat bergabung di Ekosistem Senabrata, ${formData.fullName}!`);
      router.push('/login');
    } else {
      // Menampilkan pesan error spesifik dari API (misal: "Email sudah terdaftar")
      alert(result.message || "Aduh, pendaftaran gagal nih Boss.");
    }
  } catch (err) {
    console.error("Registrasi Error:", err);
    alert("Terjadi kesalahan koneksi ke server. Coba cek internetmu ya!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* 🔴 SISI KIRI: SLIDESHOW */}
      <div className="hidden md:block md:w-[70%] relative bg-slate-900">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent z-10"></div>
              <img src={slide.img} className="absolute inset-0 w-full h-full object-cover" alt="Sena Slide" />
              <div className="absolute inset-0 flex items-center z-20 px-20">
                <div className="max-w-2xl">
                  <span className="text-green-500 font-black text-[12px] uppercase tracking-[0.6em] mb-6 block italic">Senabrata Strategic Ecosystem</span>
                  <h2 className="text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-6">
                    {slide.title} <br/>
                    <span className="text-green-600">{slide.highlight}.</span>
                  </h2>
                  <p className="text-slate-300 text-sm font-bold tracking-widest uppercase italic opacity-70 border-l-4 border-green-600 pl-6">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🟢 SISI KANAN: FORM PENDAFTARAN */}
      <div className="w-full md:w-[30%] h-screen overflow-y-auto bg-white flex items-center justify-center p-8 lg:p-12 shadow-2xl z-30">
        <div className="w-full max-w-sm py-10">
          
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Create <span className="text-green-600">Account</span></h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 italic leading-relaxed">Bergabung sebagai mitra strategis Senabrata.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Nama Lengkap */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nama Lengkap</label>
              <input 
                type="text" required disabled={loading}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                placeholder="Andri Wijaya"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Username</label>
                <input 
                  type="text" required disabled={loading}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="andri_wk"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email</label>
                <input 
                  type="email" required disabled={loading}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="andri@mail.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* KATEGORI */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Tujuan Pendaftaran</label>
              <select 
                required disabled={loading}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Pilih Tujuan Anda...</option>
                <option value="INVESTOR">Investor (Mulai Investasi)</option>
                <option value="SELLER">Penjual / Mitra (Buka Toko)</option>
                <option value="BUYER">Pembeli (Belanja Hasil Bumi)</option>
              </select>
            </div>

            {/* 🟡 DYNAMIC KYC FIELDS */}
            {formData.category !== "" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nomor KTP (NIK)</label>
                  <input 
                    type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                    placeholder="320xxxxxxxxxxxxx"
                    onChange={(e) => setFormData({...formData, ktpNumber: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Tempat Lahir</label>
                    <input 
                      type="text" required className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                      placeholder="Jakarta"
                      onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Tgl Lahir</label>
                    <input 
                      type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-[10px] font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Jenis Kelamin</label>
                  <select 
                    required className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Pilih...</option>
                    <option value="MALE">Laki-laki</option>
                    <option value="FEMALE">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Alamat Lengkap (Sesuai KTP)</label>
                  <textarea 
                    required className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all min-h-[80px]" 
                    placeholder="Jl. Raya Utama No. 1..."
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Bank (Seller & Investor) */}
            {(formData.category === "SELLER" || formData.category === "INVESTOR") && (
              <div className="space-y-1 animate-in fade-in duration-500">
                <label className="text-[9px] font-black text-green-600 uppercase tracking-widest ml-1 italic">Rekening Bank</label>
                <input 
                  type="text" required className="w-full bg-green-50 border border-green-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="BCA - 1234567890"
                  onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                />
              </div>
            )}

            {/* NPWP (Investor) */}
            {formData.category === "INVESTOR" && (
              <div className="space-y-1 animate-in fade-in duration-500">
                <label className="text-[9px] font-black text-purple-600 uppercase tracking-widest ml-1 italic">Nomor NPWP</label>
                <input 
                  type="text" required className="w-full bg-purple-50 border border-purple-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none transition-all" 
                  placeholder="01.234.567.8-999.000"
                  onChange={(e) => setFormData({...formData, npwpNumber: e.target.value})}
                />
              </div>
            )}

            {/* Kontak & Password */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">WhatsApp Number</label>
              <input 
                type="tel" required disabled={loading}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                placeholder="08123456789"
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} required disabled={loading}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-4 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all" 
                  placeholder="••••••••" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-slate-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* SYARAT DAN KETENTUAN */}
            <div className="flex items-start gap-3 py-2 px-1">
              <input type="checkbox" required className="mt-1 accent-green-600" />
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter leading-tight italic">
                Saya menyetujui seluruh <span 
                  onClick={() => setShowTermsModal(true)} 
                  className="text-green-600 underline cursor-pointer hover:text-slate-900"
                >
                  Syarat & Ketentuan
                </span> Senabrata VVIP Ecosystem.
              </p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-green-600 transition-all active:scale-95 disabled:bg-slate-300"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-6">
              Sudah punya akun? <span onClick={() => router.push('/login')} className="text-green-600 cursor-pointer hover:underline">Masuk di sini</span>
            </p>
          </form>
        </div>
      </div>

      {/* 🛡️ MODAL SYARAT & KETENTUAN (VVIP POP-UP) */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowTermsModal(false)}></div>
          
          <div className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                  Terms & <span className="text-green-600">Conditions</span>
                </h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 italic">Senabrata Strategic Protocol</p>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition-all font-black">✕</button>
            </div>
            
            <div className="p-8 md:p-10 overflow-y-auto text-slate-600 text-[11px] font-bold leading-relaxed whitespace-pre-line">
              {termsContent || (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="animate-pulse uppercase tracking-widest text-[9px]">Menarik Data Protokol...</p>
                </div>
              )}
            </div>
                
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
               <p className="text-[9px] text-slate-400 font-bold uppercase italic tracking-widest">Update Terakhir: 25 Januari 2026</p>
               <button 
                onClick={() => setShowTermsModal(false)}
                className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-green-600 transition-all shadow-lg active:scale-95"
              >
                Saya Mengerti & Setuju
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}