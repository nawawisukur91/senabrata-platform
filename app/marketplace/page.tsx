"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const addMargin = (price: number) => {
    const finalPrice = price + (price * 0.05);
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
    }).format(finalPrice);
  };

  const categories = [
    { name: "Semua", icon: "🌈" },
    { name: "Sapi", icon: "🐂" },
    { name: "Kambing", icon: "🐐" },
    { name: "Lahan", icon: "🏞️" },
    { name: "Pupuk", icon: "📦" },
    { name: "Bibit", icon: "🌱" },
  ];

  const allProducts = [
    { id: 'p1', name: 'Sapi Limousin Jumbo 1 Ton', price: 28000000, stock: 5, total: 20, img: '🐂', category: 'Sapi', mitra: 'Farm Maju' },
    { id: 'p2', name: 'Bibit Jagung Pionir Hibrida', price: 125000, stock: 85, total: 100, img: '🌽', category: 'Bibit', mitra: 'Agro Shop' },
    { id: 'p3', name: 'Pupuk NPK Mutiara 50kg', price: 650000, stock: 12, total: 50, img: '📦', category: 'Pupuk', mitra: 'Tani Jaya' },
    { id: 'p4', name: 'Kambing Boer Jantan Fullblood', price: 7500000, stock: 2, total: 10, img: '🐐', category: 'Kambing', mitra: 'Etawa Farm' },
    { id: 'p5', name: 'Lahan Sawit Produktif 2Ha', price: 150000000, stock: 1, total: 1, img: '🏞️', category: 'Lahan', mitra: 'Sena Estate' },
    { id: 'p6', name: 'Sapi Bakalan Brahman', price: 15000000, stock: 15, total: 30, img: '🐃', category: 'Sapi', mitra: 'Farm Maju' },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-20 font-sans">
      
      {/* 1. FLOATING SEARCH BOX (POJOK KANAN ATAS) */}
      <div className="pt-28 px-4 md:px-10 max-w-7xl mx-auto flex justify-end">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Cari aset..." 
              className="w-44 md:w-60 bg-white/80 backdrop-blur-md border border-white shadow-xl rounded-2xl py-2.5 px-10 text-[10px] font-bold focus:ring-2 focus:ring-[#1e3a8a] focus:w-80 transition-all duration-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-3 text-slate-400 text-xs">🔍</span>
          </div>
          <button className="bg-[#1e3a8a] text-white p-2.5 rounded-2xl shadow-lg flex items-center gap-2 px-4 hover:bg-green-700 transition-all">
            <span className="text-xs">🛒</span>
            <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Cart</span>
          </button>
        </div>
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto mt-4">
        
        <div className="mb-6">
          <h1 className="text-xl font-black text-[#1e3a8a] italic tracking-tighter uppercase">
            Sena<span className="text-green-600">Market</span>
          </h1>
        </div>

        {/* 2. PREMIUM AD BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 h-56 md:h-72 bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#1e3a8a] rounded-3xl relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-center">
              <span className="bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4">EXCLUSIVE PROMO</span>
              <h2 className="text-white text-4xl font-black italic tracking-tighter leading-none uppercase">Panen Raya <br/> Investasi</h2>
              <p className="text-blue-200 font-bold text-sm mt-4 max-w-xs italic text-[11px]">Dapatkan margin tambahan khusus bulan ini.</p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] opacity-10 text-[18rem] -rotate-12 group-hover:rotate-0 transition-all duration-700">🚜</div>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <div className="h-1/2 bg-[#1e3a8a] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg group border border-blue-400/20">
               <p className="font-black text-xl italic leading-tight uppercase">Modal <br/> Tani</p>
               <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">💰</div>
            </div>
            <div className="h-1/2 bg-[#059669] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg group border border-green-400/20">
               <p className="font-black text-xl italic leading-tight uppercase">Asuransi <br/> Ternak</p>
               <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">🛡️</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE CATEGORIES */}
      <div className="max-w-7xl mx-auto mt-10 px-4 md:px-10">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2.5rem] shadow-sm flex justify-between overflow-x-auto gap-4 scrollbar-hide border border-white">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.name)}
              className="flex flex-col items-center min-w-[90px] group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 border shadow-sm ${
                activeCategory === cat.name 
                ? 'bg-[#1e3a8a] text-white border-blue-700 shadow-blue-200 shadow-lg -translate-y-2' 
                : 'bg-white text-slate-600 border-blue-50 hover:border-blue-500'
              }`}>
                {cat.icon}
              </div>
              <span className={`text-[10px] font-black mt-3 uppercase tracking-tighter ${
                activeCategory === cat.name ? 'text-[#1e3a8a]' : 'text-slate-400'
              }`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4 md:px-10">
        
        {/* 4. SENA QUICK DEAL */}
        <div className="bg-[#1e3a8a] rounded-t-[2.5rem] p-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white p-2 rounded-xl animate-bounce">⚡</div>
            <h2 className="text-white font-black text-2xl italic tracking-tighter uppercase">Quick Deal</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#064e3b] text-white px-2 py-1 rounded-lg text-xs font-black border border-green-400/30">02:44:59</span>
          </div>
        </div>

        {/* PRODUCT GRID - FIX NAVIGASI DI SINI */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 bg-white rounded-b-[2.5rem] shadow-2xl">
          {filteredProducts.map((p) => {
            const stockPercent = (p.stock / p.total) * 100;
            return (
              /* DI SINI SAYA UBAH DARI /product/ MENJADI /products/ */
              <Link href={`/products/${p.id}`} key={p.id} className="bg-white p-4 rounded-[2rem] hover:shadow-2xl transition-all border border-transparent hover:border-blue-50 group">
                <div className="aspect-square bg-blue-50/50 rounded-[1.5rem] flex items-center justify-center text-5xl mb-4 group-hover:bg-blue-600 transition-colors duration-500 relative overflow-hidden">
                   <span className="group-hover:scale-125 group-hover:brightness-200 transition-all duration-500 z-10">{p.img}</span>
                </div>
                <h4 className="text-[10px] font-black h-8 line-clamp-2 text-slate-800 leading-tight mb-2 uppercase italic">
                  {p.name}
                </h4>
                <p className="text-[#1e3a8a] font-black text-sm mb-4">
                  {addMargin(p.price).replace(",00", "")}
                </p>
                
                <div className="relative h-4 bg-blue-50 rounded-full overflow-hidden flex items-center justify-center border border-blue-100">
                   <div className="absolute left-0 h-full bg-gradient-to-r from-green-500 to-blue-700" style={{ width: `${stockPercent}%` }}></div>
                   <span className="relative z-10 text-[6px] font-black text-white uppercase italic tracking-widest">
                      {p.stock} Units
                   </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}