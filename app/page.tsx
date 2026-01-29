"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Star, MapPin, Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

// --- 1. KOMPONEN SLIDESHOW ---
function HeroSlideshow() {
  const images = [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
    "https://images.unsplash.com/photo-1434725039720-abb26e22ebe8?q=80&w=2070"
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="Mountain Landscape"
          className={`absolute w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${i === index ? "opacity-60 scale-110" : "opacity-0 scale-100"} animate-[pulse_10s_infinite]`}
        />
      ))}
    </div>
  );
}

// --- 2. INTERFACE ---
interface Product {
  id: string;
  name: string;
  price: number;
  location: string;
  imageUrl: string;
  category?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    priceIndex: "...",
    activeMitra: "...",
    totalItems: "..."
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (!data.error) {
          setStats(data);
        }
      } catch (err) {
        console.error("Gagal ambil stats asli:", err);
      }
    };

    fetchStats();
    // ... fetchProducts kamu yang tadi ...
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // MENGAMBIL DATA ASLI DARI DATABASE (API yang sudah kita buat)
        const response = await fetch('/api/products?limit=5'); // Sesuaikan endpoint API kamu
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Gagal ambil data dari DB, pastikan API /api/products jalan ya Sayang:", error);
      }
    };
    fetchProducts();
  }, []);

  const appLinks = {
    playstore: "https://play.google.com/store/apps/details?id=com.your.app",
    appstore: "https://apps.apple.com/id/app/your-app-id"
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-green-500/30">

      {/* --- HERO SECTION --- */}
      <div className="relative h-[650px] w-full bg-[#020617] overflow-hidden">
        <HeroSlideshow />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 pt-20 z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 px-4 py-2 rounded-full mb-6">
            <Sparkles size={14} className="text-green-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400 italic">The Future of Agri-Wealth</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic leading-[0.8]">
            Senabrata<span className="text-green-500">Farm.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl font-medium tracking-wide italic mb-10">
            Transparansi Harga, Kualitas Unggulan, Petani Sejahtera. <br className="hidden md:block" />
            Mulai kelola aset panganmu secara digital sekarang.
          </p>
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <a href={appLinks.playstore} target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="GP" className="h-10 md:h-12 shadow-lg" /></a>
              <a href={appLinks.appstore} target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="AS" className="h-10 md:h-12 shadow-lg" /></a>
            </div>
          </div>
          <Link href="/story" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/60 hover:text-green-500 transition-all">
            Cek Perjalanan Kita <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
      </div>

      {/* --- STATISTIK --- */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 -mt-24">
        <div className="flex flex-col md:flex-row shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] rounded-[3rem] overflow-hidden border-4 border-[#020617] bg-[#020617]">
          <div className="flex-1 bg-gradient-to-br from-[#10B981] to-[#059669] p-10 flex items-center justify-center gap-6">
            <div className="text-white text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1 italic">Index Harga</p>
              <h2 className="text-3xl font-black tracking-tighter italic">Rp {stats.priceIndex}</h2>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#059669] to-[#065F46] p-10 flex items-center justify-center gap-6 border-x border-white/5">
            <div className="text-white text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1 italic">Mitra Aktif</p>
              <h2 className="text-3xl font-black tracking-tighter italic">{stats.activeMitra}</h2>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#065F46] to-[#022c22] p-10 flex items-center justify-center gap-6">
            <div className="text-white text-left">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1 italic">Komoditas</p>
              <h2 className="text-3xl font-black tracking-tighter italic">{stats.totalItems}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW: WHY CHOOSE US SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
            Why <span className="text-green-600">SenabrataFarm?</span>
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-4 italic">The New Standard of Agriculture Investment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all group">
            <ShieldCheck size={40} className="text-green-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black italic uppercase mb-4">Keamanan Terjamin</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Setiap aset dikelola dengan sistem audit berkala dan asuransi pertanian terpadu.</p>
          </div>
          <div className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all group">
            <Zap size={40} className="text-green-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black italic uppercase mb-4">Hasil Real-Time</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Pantau pertumbuhan komoditas dan fluktuasi harga pasar langsung dari smartphone kamu.</p>
          </div>
          <div className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:shadow-2xl transition-all group">
            <HeartHandshake size={40} className="text-green-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black italic uppercase mb-4">Pemberdayaan Mitra</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Membantu ribuan petani lokal mendapatkan pendanaan adil tanpa jeratan tengkulak.</p>
          </div>
        </div>
      </div>

      {/* --- HARVEST SELECTION (DATABASE DRIVEN) --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
          <div className="border-l-4 border-green-600 pl-6 text-left">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic text-left">
              Harvest <span className="text-green-600 text-3xl">Selection.</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic text-left">Live from our fields across Indonesia</p>
          </div>
          <Link href="/marketplace" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors border-b border-slate-200 pb-2">
            Browse All Commodities
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((prod) => (
            <Link key={prod.id} href={`/marketplace/${prod.id}`} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-50 block">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute top-4 left-4 bg-[#020617] text-white text-[8px] font-black px-3 py-1.5 rounded-full z-10 italic tracking-widest uppercase">{prod.category || "FRESH"}</div>
                <img src={prod.imageUrl || "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=400"} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-sm font-black text-slate-800 uppercase italic line-clamp-2 h-10 group-hover:text-green-600 transition-colors">{prod.name}</h3>
                <div className="flex flex-col gap-4 mt-4">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter italic">Rp {prod.price.toLocaleString('id-ID')}</span>
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase italic flex items-center gap-1">
                      <MapPin size={10} className="text-green-500" /> {prod.location}
                    </span>
                    <div className="flex text-yellow-500 gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {products.length === 0 && (
            <p className="col-span-full text-center text-slate-400 italic py-10">Menghubungkan ke ladang database...</p>
          )}
        </div>
      </div>
    </div>
  );
}