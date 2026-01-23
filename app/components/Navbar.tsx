"use client";

import React, { useState } from 'react';

export default function Navbar() {
  // State untuk buka/tutup menu di HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simulasi status login
  const isLoggedIn = false; 

  const handleNavigation = (item: { name: string, link: string, private: boolean }) => {
    console.log(`[SENABRATA SECURITY]: User mencoba akses ${item.name}`);
    
    // Tutup menu mobile setelah klik (opsional agar bersih)
    setIsMobileMenuOpen(false);

    if (item.private && !isLoggedIn) {
      alert("Maaf Boss, area ini rahasia! Silakan login dulu ya.");
      window.location.href = '/login';
    } else {
      window.location.href = item.link;
    }
  };

  const navItems = [
    { name: 'Marketplace', link: '/marketplace', private: false },
    { name: 'Pusat Kontrol', link: '/dashboard', private: true },
    { name: 'Finance', link: '/finance', private: true },
    { name: 'Mitra Tani', link: '/mitra-directory', private: true },
    { name: 'Cerita Kita', link: '/story', private: false },
    { name: 'Product', link: '/products', private: false }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] p-4 md:p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* BAR UTAMA */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl px-6 md:px-8 py-3 rounded-[2rem] md:rounded-[2.5rem] flex justify-between items-center relative z-[1001]">
          
          {/* LOGO AREA */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavigation({ name: 'Home', link: '/', private: false })}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden">
                <img 
                src="/Logo.png" 
                alt="Senabrata Logo" 
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
                />
            </div>
            <div className="flex flex-col text-left">
                <h1 className="text-base md:text-lg font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Sena<span className="text-green-600">brata</span>
                </h1>
                <p className="text-[7px] md:text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mt-1">
                Farm & Capital
                </p>
            </div>
          </div>

          {/* MENU DESKTOP (Muncul di layar besar) */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavigation(item)}
                className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-green-600 transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-green-600 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* KANAN: TOMBOL PORTAL & HAMBURGER */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = '/login'}
              className="hidden sm:block bg-slate-950 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] font-black uppercase hover:bg-green-600 transition-all active:scale-95"
            >
              Portal
            </button>

            {/* TOMBOL HAMBURGER (Cuma di Mobile) */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU MOBILE */}
        <div className={`lg:hidden absolute left-4 right-4 mt-2 transition-all duration-500 ease-in-out origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
            <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-[2rem] shadow-2xl p-6 flex flex-col gap-4 overflow-hidden">
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => handleNavigation(item)}
                  className="w-full text-left py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-50 flex items-center justify-between hover:bg-green-50 hover:text-green-600 rounded-xl transition-all"
                >
                  {item.name}
                  {item.private && <span className="text-[8px] text-green-600 font-black italic tracking-normal">Private</span>}
                </button>
              ))}
              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full mt-4 bg-slate-950 text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
              >
                Client Portal Login
              </button>
            </div>
        </div>
      </div>
    </nav>
  );
}