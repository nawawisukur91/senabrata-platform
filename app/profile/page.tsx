"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  
  // 🟢 STATE UTAMA
  const [activeTab, setActiveTab] = useState('identity');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 📋 STATE FORM DATA
  const [profileData, setProfileData] = useState({
    fullName: '',
    nik: '',
    birthDate: '',
    occupation: '',
    role: 'investor', // default
    bankName: 'BCA',
    bankAccount: '',
    bankHolder: ''
  });

  // 🚀 FUNGSI TOMBOL "MULAI" (SMART JUMP)
  const handleStartProcess = () => {
    setIsVerifying(true);
    
    // Simulasi Sinkronisasi Database
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      
      const targetRole = profileData.role;
      alert(`Data Tersimpan! Mengalihkan Anda sebagai ${targetRole.toUpperCase()}...`);

      // LOGIKA LONCAT HALAMAN BERDASARKAN ROLE
      if (targetRole === 'investor') {
        router.push('/marketplace');      // Ke Katalog Sapi/Lahan
      } else if (targetRole === 'mitra') {
        router.push('/dashboard-mitra');   // Ke Panel Kelola Aset
      } else if (targetRole === 'nasabah') {
        router.push('/pengajuan-modal');   // Ke Form Pinjam Modal
      }
    }, 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- SECTION 1: HEADER USER --- */}
        <div className="bg-slate-900 rounded-[3rem] p-10 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-green-600 p-1 relative">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.fullName || 'User'}`} className="w-full h-full rounded-full bg-slate-700" alt="Avatar"/>
              {isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full shadow-lg border-4 border-slate-900 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{profileData.fullName || "Nama Lengkap"}</h2>
                <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${isVerified ? 'bg-green-600 text-white' : 'bg-yellow-500 text-slate-900'}`}>
                  {isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">
                Role: <span className="text-green-500">{profileData.role}</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: TABS NAVIGATION --- */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'identity', label: 'Identitas & Peran' },
            { id: 'finance', label: 'Rekening Bank' },
            { id: 'assets', label: 'Portofolio' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-slate-900 text-white shadow-xl -translate-y-1' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- SECTION 3: CONTENT BOX --- */}
        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-sm min-h-[500px]">
          
          {/* --- TAB IDENTITAS --- */}
          {activeTab === 'identity' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 italic border-b border-slate-50 pb-6">Personal Kependudukan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nama Sesuai KTP</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-all" placeholder="Andri Wijaya" onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nomor NIK (16 Digit)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-all" placeholder="3271xxxxxxxxxxxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Tanggal Lahir</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Pekerjaan Saat Ini</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:bg-white transition-all" placeholder="Contoh: Pengusaha" />
                </div>

                {/* DROPDOWN ROLE BERDAMPINGAN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Daftar Sebagai (Role)</label>
                  <div className="relative">
                    <select 
                      value={profileData.role}
                      onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none focus:border-green-600 appearance-none cursor-pointer"
                    >
                      <option value="investor">💰 INVESTOR (Tanam Modal)</option>
                      <option value="mitra">🤝 MITRA (Pengelola Aset)</option>
                      <option value="nasabah">🚜 NASABAH (Pengajuan Modal)</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center pt-6 px-4">
                   <p className="text-[9px] font-bold text-slate-400 uppercase italic leading-relaxed">Pilih peran sesuai kebutuhan Anda di ekosistem Senabrata Capital.</p>
                </div>
              </div>

              {/* UPLOAD KTP BOX */}
              <div className="relative group mt-4">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className={`p-12 border-2 border-dashed rounded-[2.5rem] transition-all flex flex-col items-center justify-center gap-4 ${selectedImage ? 'border-green-600 bg-green-50/20' : 'border-slate-200 bg-slate-50 group-hover:bg-slate-100'}`}>
                  {selectedImage ? (
                    <img src={selectedImage} alt="KTP" className="h-40 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300" />
                  ) : (
                    <div className="text-center">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a48.324 48.324 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /></svg>
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Klik atau Seret Foto KTP di Sini</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* --- TAB DATA REKENING --- */}
          {activeTab === 'finance' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 italic border-b border-slate-50 pb-6">Informasi Rekening Bank</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Pilih Bank</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900 outline-none appearance-none">
                    <option>BCA (Bank Central Asia)</option>
                    <option>Bank Mandiri</option>
                    <option>BNI</option>
                    <option>BRI</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nomor Rekening</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900" placeholder="8092xxxxxx" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Nama Pemilik Rekening (Sesuai KTP)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 px-6 text-sm font-bold text-slate-900" placeholder="A/N Andri Wijaya" />
                </div>
              </div>
            </div>
          )}

          {/* --- TAB PORTOFOLIO --- */}
          {activeTab === 'assets' && (
            <div className="text-center py-20 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-300"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.1c.827.158 1.604-.445 1.604-1.285V6.745c0-.78-.511-1.459-1.277-1.648a48.737 48.737 0 00-5.882-.659m-7.955 13.5V6.744m0 12.006a48.585 48.585 0 01-5.855-2.438c-.61-.341-1.017-1-1.017-1.713V4.993c0-.829.576-1.546 1.39-1.613a48.738 48.738 0 0112.895 0c.814.067 1.39 1.784 1.39 1.613V16.63c0 .712-.406 1.37-1.017 1.713a48.469 48.469 0 01-1.63 1.015" /></svg>
              </div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Belum Ada Aset Terdaftar</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Silahkan tekan tombol mulai untuk mengaktifkan akun Anda.</p>
            </div>
          )}

        </div>

        {/* --- TOMBOL SAKTI MULAI (FIXED ACTION) --- */}
        <button 
          onClick={handleStartProcess}
          disabled={isVerifying}
          className={`w-full mt-10 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] shadow-2xl transition-all flex items-center justify-center gap-4 ${
            isVerifying ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-slate-900 hover:bg-green-600 text-white active:scale-95'
          }`}
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              MENYIMPAN DATA...
            </>
          ) : (
            'SIMPAN & MULAI SEKARANG'
          )}
        </button>

      </div>
    </div>
  );
}