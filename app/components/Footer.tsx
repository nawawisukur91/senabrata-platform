"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 font-sans overflow-hidden relative">
      {/* 🟡 DEKORASI: Cahaya hijau halus di pojok footer biar gak kaku */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[120px] -mr-40 -mb-40"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* --- KOLOM 1: BRANDING --- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              Pasar <span className="text-green-600">Sena</span>brata
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Platform investasi komoditas pangan terpercaya. Menghubungkan investor dengan sektor riil pertanian dan peternakan Indonesia.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {['FB', 'IG', 'YT', 'WA'].map((social) => (
                <div key={social} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-green-600 hover:border-green-600 transition-all cursor-pointer">
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* --- KOLOM 2: QUICK LINKS (Navigasi Cepat) --- */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Pasar Komoditas', 'Cerita Kita', 'Peluang Investasi', 'Hubungi Kami'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 text-sm font-bold hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- KOLOM 3: OFFICE (Alamat Kantor) --- */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-8">Office Area</h4>
            <div className="text-slate-400 text-sm font-bold space-y-4">
              <p>Gedung Senabrata Capital, Lantai 12</p>
              <p>Kawasan Bisnis Sudirman, Jakarta Selatan</p>
              <p className="text-white">halo@senabrata.com</p>
              <p className="text-white">+62 812 3456 7890</p>
            </div>
          </div>

          {/* --- KOLOM 4: NEWSLETTER (Langganan Berita) --- */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-500 mb-8">Updates</h4>
            <p className="text-slate-400 text-xs font-medium mb-4">Dapatkan info panen dan peluang terbaru.</p>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Email Anda"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-green-600 transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-green-600 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase">Join</button>
            </div>
          </div>

        </div>

        {/* --- GARIS PEMISAH & COPYRIGHT --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2026 Senabrata Capital. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}