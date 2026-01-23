"use client";

import React from 'react';
import Link from 'next/link';

export default function MitraDirectoryPage() {
  // 🟢 DATA SIMULASI (Nantinya data ini ditarik dari Database)
  // ID di sini harus sama dengan folder [id] agar Link berfungsi
  const daftarMitra = [
    { 
      id: 'farm-maju-jaya', 
      name: 'Farm Maju Jaya', 
      location: 'Cianjur, Jawa Barat',
      icon: '🐂',
      specialty: 'Sapi Limousin',
      rating: 4.9
    },
    { 
      id: 'tani-sejahtera-group', 
      name: 'Tani Sejahtera Group', 
      location: 'Subang, Jawa Barat',
      icon: '🌱',
      specialty: 'Jagung & Palawija',
      rating: 4.8
    },
    { 
      id: 'berkah-ternak-etawa', 
      name: 'Berkah Ternak Etawa', 
      location: 'Lampung Tengah',
      icon: '🐐',
      specialty: 'Kambing Perah',
      rating: 4.7
    },
    { 
      id: 'agro-mandiri-abadi', 
      name: 'Agro Mandiri Abadi', 
      location: 'Malang, Jawa Timur',
      icon: '🍎',
      specialty: 'Apel & Hortikultura',
      rating: 5.0
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block italic">
            Senabrata Trusted Partners
          </span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Direktori <span className="text-green-600">Mitra</span> <br/> Terverifikasi.
          </h1>
          <p className="mt-6 text-slate-400 font-bold text-sm max-w-xl leading-relaxed">
            Daftar pengelola aset profesional yang telah melalui tahap verifikasi ketat Senabrata Capital. Pilih mitra untuk melihat etalase produk mereka.
          </p>
        </div>

        {/* --- GRID DAFTAR MITRA (MAPPING) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {daftarMitra.map((mitra) => (
            <Link href={`/mitra-directory/${mitra.id}`} key={mitra.id} className="group">
              <div className="bg-white border border-slate-100 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 transition-all duration-500 group-hover:shadow-2xl group-hover:border-green-600/30 group-hover:-translate-y-2 relative overflow-hidden">
                
                {/* Visual Icon */}
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {mitra.icon}
                </div>

                {/* Content Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <span className="text-xs font-black text-green-600 italic">★ {mitra.rating}</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{mitra.specialty}</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-900 uppercase italic leading-tight group-hover:text-green-600 transition-colors">
                    {mitra.name}
                  </h3>
                  
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                    📍 {mitra.location}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full opacity-50 group-hover:bg-green-50 transition-colors"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="mt-20 p-12 bg-slate-900 rounded-[3.5rem] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           <h4 className="text-white font-black text-2xl uppercase italic mb-4 relative z-10">Ingin Bergabung Sebagai Mitra?</h4>
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 relative z-10">Dapatkan akses ke ribuan investor dan kelola aset Anda secara profesional</p>
           <button className="bg-green-600 hover:bg-green-500 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all relative z-10 active:scale-95">
             Daftar Mitra Sekarang
           </button>
        </div>

      </div>
    </div>
  );
}