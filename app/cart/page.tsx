"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, ArrowRight, ShieldCheck, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data dari LocalStorage saat halaman dibuka
  useEffect(() => {
    const savedCart = localStorage.getItem('senabrata_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Update LocalStorage tiap kali ada barang yang dihapus
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('senabrata_cart', JSON.stringify(updatedCart));
    // Trigger event agar Navbar tahu ada perubahan
    window.dispatchEvent(new Event("storage"));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  if (!isLoaded) return null; // Cegah hydration error

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em] mb-2 italic">Shopping Cart</p>
          <h1 className="text-5xl font-black text-[#1e3a8a] italic uppercase tracking-tighter leading-none">Keranjangmu <span className="text-slate-300">({cartItems.length})</span></h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-20 rounded-[4rem] text-center border border-dashed border-slate-200 shadow-inner">
            <div className="text-7xl mb-6 opacity-20 text-slate-400 font-serif italic">Empty</div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">Keranjang Kosong</h2>
            <Link href="/marketplace" className="mt-8 inline-block bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all">
               Mulai Belanja →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 md:p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group hover:shadow-xl transition-all">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner italic">
                    {item.img || "📦"}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic tracking-widest">{item.category}</span>
                    <h3 className="text-2xl font-black text-slate-800 uppercase italic mt-2">{item.name}</h3>
                    <p className="text-[#1e3a8a] font-black mt-2 italic text-lg text-xl">Rp {item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-4 bg-red-50 text-red-500 rounded-3xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-10 rounded-[4rem] shadow-2xl sticky top-32">
                <h4 className="font-black italic uppercase text-sm mb-8 tracking-[0.2em] border-b border-white/10 pb-6 text-green-400">Order Summary</h4>
                <div className="space-y-4 mb-10 text-[11px] font-bold italic opacity-70 uppercase tracking-widest">
                  <div className="flex justify-between"><span>Subtotal</span><span>Rp {subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Service Fee (5%)</span><span>Rp {serviceFee.toLocaleString()}</span></div>
                </div>
                <div className="mb-12">
                  <p className="text-[10px] font-black uppercase opacity-50 mb-1">Total Payment</p>
                  <p className="text-4xl font-black italic tracking-tighter">Rp {total.toLocaleString()}</p>
                </div>
                {/* Arahkan ke checkout item pertama atau kembangkan ke bulk checkout */}
                <Link href={`/checkout/${cartItems[0]?.id}`} className="block w-full bg-green-500 hover:bg-green-400 text-white py-6 rounded-[2rem] font-black uppercase italic tracking-widest text-center shadow-2xl transition-all active:scale-95 text-[10px]">
                  Lanjut Pembayaran <ArrowRight className="inline ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}