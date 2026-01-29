"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { ShoppingCart, Zap, TrendingUp, Search, Package, Store } from 'lucide-react';
import { LayoutGrid,Beef,Wheat, Wrench, Box, Shirt, Milk } from 'lucide-react';

const categories = [
  { name: "Semua", icon: <LayoutGrid size={22} /> },
  { name: "Hewan Ternak", icon: <Beef size={22} /> },
  { name: "Bahan Pangan", icon: <Wheat size={22} /> },
  { name: "Tools", icon: <Wrench size={22} /> },
  { name: "Input Produksi", icon: <Box size={22} /> },
  { name: "Merchandise", icon: <Shirt size={22} /> },
  { name: "Olahan", icon: <Milk size={22} /> },
];



export default function MarketplaceClient({ initialProducts }: { initialProducts: any[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // --- 🛡️ LOGIKA PROTEKSI JALUR MASUK ---
  const handleProteksiAksi = (e: React.MouseEvent, targetPath?: string, isCart: boolean = false, product?: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      alert("Mohon Maaf , demi keamanan transaksi & kelengkapan data pengiriman, silakan Login/Daftar dulu ya!");
      router.push('/login');
      return;
    }

    // Jika sudah login:
    if (isCart && product) {
      executeAddToCart(product);
    } else if (targetPath) {
      router.push(targetPath);
    }
  };

  // --- LOGIC ADD TO CART (Hanya jalan setelah lolos proteksi) ---
  const executeAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('senabrata_cart') || '[]');
    const isExist = existingCart.find((item: any) => item.id === product.id);

    if (isExist) {
      alert("Sudah ada di keranjang, Boss!");
      return;
    }

    const newCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem('senabrata_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} berhasil masuk kandang! 🐂💨`);
  };

  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0 
    }).format(price);
  };

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, initialProducts]);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER & SEARCH & BUKA TOKO */}
      <div className="pt-28 px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-slate-900 italic tracking-tighter uppercase">
            Sena<span className="text-green-600">Market</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Exclusive Mitra Assets</p>
        </div>

        <div className="flex flex-1 max-w-2xl gap-4 items-center justify-end">
          <div className="relative group flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-12 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-green-600 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 🏪 TOMBOL BUKA TOKO (NEW) */}
          <button 
            onClick={(e) => handleProteksiAksi(e, '/dashboard/seller/setup')}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-green-600 transition-all shadow-lg group shrink-0"
          >
            <Store size={16} className="text-green-500 group-hover:text-white" />
            <span className="text-[9px] font-black uppercase tracking-widest italic hidden md:block">Buka Toko</span>
          </button>
        </div>
      </div>

      <div className="px-6 md:px-10 max-w-7xl mx-auto mt-10">
        {/* HERO BANNER */}
        <div className="bg-gradient-to-br from-[#064e3b] to-[#1e3a8a] rounded-[3.5rem] p-10 relative overflow-hidden shadow-2xl mb-12 group">
          <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <TrendingUp size={300} color="white" />
          </div>
          <div className="relative z-10">
            <h2 className="text-white text-5xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Panen Raya<br/><span className="text-green-400">Investasi</span>
            </h2>
            <p className="text-blue-100 font-bold mt-6 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
              <Zap size={14} className="fill-yellow-400 text-yellow-400" /> 
              Aset terverifikasi sistem Senabrata Capital
            </p>
          </div>
        </div>

        {/* CATEGORIES SCROLL */}
        <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center min-w-[90px] transition-all duration-300 ${
                activeCategory === cat.name ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-2xl mb-3 shadow-xl transition-all ${
                activeCategory === cat.name ? 'bg-slate-950 text-white' : 'bg-white border border-slate-100 text-slate-600'
              }`}>
                {cat.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-6">
          {filteredProducts.length > 0 ? filteredProducts.map((p) => (
            <div key={p.id} className="relative group">
              {/* Klik Produk untuk Detail juga diproteksi */}
              <div 
                onClick={(e) => handleProteksiAksi(e, `/products/${p.id}`)}
                className="cursor-pointer"
              >
                <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden mb-4 relative shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  {p.img ? (
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-200">
                      <Package size={48} />
                    </div>
                  )}
                  
                  {/* FLOATING CART BUTTON (PROTECTED) */}
                  <button 
                    onClick={(e) => handleProteksiAksi(e, undefined, true, p)}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-white text-slate-950 rounded-2xl flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-600 hover:text-white z-20"
                  >
                    <ShoppingCart size={20} />
                  </button>

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">
                      {p.category}
                    </span>
                  </div>
                </div>
                
                <div className="px-2">
                  <h4 className="text-[11px] font-black text-slate-800 uppercase italic tracking-tighter line-clamp-1 mb-1">{p.name}</h4>
                  <p className="text-green-600 font-black text-sm mb-3">{formatIDR(p.price)}</p>
                  
                  {/* STOCK PROGRESS */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-950 transition-all duration-1000" 
                      style={{ width: `${(p.stock / (p.totalStock || 1)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stock</span>
                    <span className="text-[8px] font-black text-slate-900 uppercase">{p.stock} Units</span>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-32 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 italic animate-pulse">
                Aset belum tersedia di kategori ini
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}