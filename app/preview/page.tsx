"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic Cuan 5%
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

  // Fungsi Filter yang bikin website makin cerdas
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-20 font-sans">
      
      {/* 1. STICKY SEARCH BAR */}
      <div className="fixed top-30 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-blue-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-xl font-black text-[#1e3a8a] italic tracking-tighter hidden md:block">
            SENA<span className="text-green-600">MARKET</span>
          </Link>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Cari Sapi, Bibit, atau Pupuk..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-3 px-12 text-xs font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-3 text-slate-400">🔍</span>
          </div>
          <button className="bg-[#1e3a8a] text-white p-3 rounded-2xl text-xs font-black uppercase tracking-widest px-6 hover:bg-green-700 transition-all shadow-lg">
            Cart 🛒
          </button>
        </div>
      </div>

      {/* 2. PREMIUM AD BAR */}
      <div className="pt-32 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 h-56 md:h-72 bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#1e3a8a] rounded-3xl relative overflow-hidden group shadow-xl">
            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-center">
              <span className="bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4">EXCLUSIVE PROMO</span>
              <h2 className="text-white text-4xl font-black italic tracking-tighter leading-none uppercase">Panen Raya <br/> Investasi</h2>
              <p className="text-blue-200 font-bold text-sm mt-4 max-w-xs italic">Aman, Terpercaya, & Menguntungkan.</p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] opacity-10 text-[18rem] -rotate-12 transition-transform group-hover:rotate-0 duration-700">🚜</div>
          </div>
          <div className="hidden md:flex flex-col gap-3">
            <div className="h-1/2 bg-[#1e3a8a] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg group cursor-pointer border border-blue-400/20">
               <p className="font-black text-xl italic leading-tight uppercase">Modal <br/> Tani</p>
               <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">💰</div>
            </div>
            <div className="h-1/2 bg-[#059669] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg group cursor-pointer border border-green-400/20">
               <p className="font-black text-xl italic leading-tight uppercase">Asuransi <br/> Ternak</p>
               <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🛡️</div>
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
        
        {/* 4. SENA QUICK DEAL (FLASH SALE) */}
        <div className="bg-[#1e3a8a] rounded-t-[2.5rem] p-6 flex justify-between items-center shadow-lg border-b border-blue-400/20">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white p-2 rounded-xl animate-bounce">⚡</div>
            <h2 className="text-white font-black text-2xl italic tracking-tighter uppercase">Quick Deal</h2>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-blue-200 text-[10px] font-bold mr-2 uppercase">Ends In:</p>
            <span className="bg-[#064e3b] text-white px-2 py-1 rounded-lg text-xs font-black border border-green-400/30 tracking-widest">02:44:59</span>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-3 bg-white rounded-b-[2.5rem] shadow-2xl">
          {filteredProducts.length > 0 ? filteredProducts.map((p) => {
            const stockPercent = (p.stock / p.total) * 100;
            return (
              <Link href={`/product/${p.id}`} key={p.id} className="bg-white p-4 rounded-[2rem] hover:shadow-2xl hover:z-10 transition-all border border-transparent hover:border-blue-100 group">
                <div className="aspect-square bg-blue-50/50 rounded-[1.5rem] flex items-center justify-center text-5xl mb-4 group-hover:bg-blue-600 transition-colors duration-500 relative overflow-hidden">
                   <span className="group-hover:scale-125 group-hover:brightness-200 transition-all duration-500 z-10">{p.img}</span>
                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                      {p.stock <= 5 ? 'Hampir Habis' : `${p.stock} Unit`}
                   </span>
                </div>
              </Link>
            );
          }) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-black uppercase italic tracking-widest text-sm">Yah, barang tidak ditemukan, Boss... 🔍</p>
            </div>
          )}
        </div>

        {/* 5. RECOMMENDATION (FOOTER GOODS) */}
        <div className="mt-24">
          <div className="flex items-center gap-6 mb-10">
             <h3 className="text-[#1e3a8a] font-black text-xl uppercase tracking-[0.2em] italic">Rekomendasi Barang</h3>
             <div className="h-[2px] bg-gradient-to-r from-blue-200 via-green-200 to-transparent flex-1"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.map((p, i) => (
              <Link href={`/product/${p.id}`} key={i} className="bg-white p-3 rounded-[2.5rem] hover:shadow-xl transition-all group border border-slate-50 hover:border-green-400">
                <div className="aspect-square bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl group-hover:bg-green-50 transition-colors">
                   <span className="group-hover:rotate-12 transition-transform">{p.img}</span>
                </div>
                <div className="p-3">
                  <h4 className="text-[9px] font-black text-slate-600 line-clamp-1 mb-1 uppercase">{p.name}</h4>
                  <p className="text-[#059669] font-black text-[11px]">{addMargin(p.price).replace(",00", "")}</p>
                  <div className="mt-3 flex items-center justify-between opacity-50 border-t border-slate-50 pt-2 text-[7px] font-black uppercase">
                     <span>📍 {p.mitra}</span>
                     <span>Terjual 50+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}