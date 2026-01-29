"use client";
import React, { useState, useEffect } from 'react';
import { createOrder } from './actions'; // <--- Import logic simpan database

export default function CheckoutClient({ 
  product, 
  dbLogistics, 
  dbBanks 
}: { 
  product: any, 
  dbLogistics: any[], 
  dbBanks: any[] 
}) {
  const [selectedLogistic, setSelectedLogistic] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [resiGenerated, setResiGenerated] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // <--- Loading State

  const availableLogistics = product.category === "Hewan Ternak" 
    ? dbLogistics.filter(l => l.type === 'SPECIAL_ANIMAL')
    : dbLogistics.filter(l => l.type === 'REGULAR');

  useEffect(() => {
    if (availableLogistics.length > 0) setSelectedLogistic(availableLogistics[0]);
    if (dbBanks.length > 0) setSelectedBank(dbBanks[0]);
  }, [product.category, dbLogistics, dbBanks]);

  const totalPrice = product.price + (product.price * 0.05) + (selectedLogistic?.price || 0);

  // LOGIC PAY NOW DENGAN DATABASE
  const handlePayNow = async () => {
    if (!selectedBank || !selectedLogistic) return alert("Pilih Bank & Logistik dulu Boss!");
    
    setIsProcessing(true); // Mulai loading
    const newResi = "SNB-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    // 1. Simpan ke Database Supabase
    const result = await createOrder({
      productId: product.id,
      totalAmount: totalPrice,
      resi: newResi,
      bankId: selectedBank.id,
      logisticId: selectedLogistic.id
    });

    if (result.success) {
      setResiGenerated(newResi);
      setShowPayModal(true);
    } else {
      alert("Gagal simpan pesanan. Pastikan tabel 'Order' sudah ada di Prisma Boss!");
    }
    setIsProcessing(false); // Selesai loading
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 pt-32">
      <h1 className="text-4xl font-black text-[#1e3a8a] italic uppercase tracking-tighter mb-10">Checkout Sultan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. DETAIL PRODUK */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex gap-8 items-center">
            <div className="w-28 h-28 bg-slate-50 rounded-3xl flex items-center justify-center text-6xl shadow-inner italic">
              {product.img || "📦"}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic tracking-widest">{product.category}</span>
              <h3 className="text-2xl font-black text-slate-800 uppercase italic mt-2 leading-none">{product.name}</h3>
              <p className="text-[#1e3a8a] font-bold mt-2 italic text-xl">Rp {product.price.toLocaleString()}</p>
            </div>
          </div>

          {/* 2. PILIH EKSPEDISI */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest mb-6 italic">Opsi Pengiriman Resmi</h4>
            <div className="space-y-4">
              {availableLogistics.length > 0 ? availableLogistics.map((log) => (
                <div 
                  key={log.id} 
                  onClick={() => setSelectedLogistic(log)}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${selectedLogistic?.id === log.id ? 'border-[#1e3a8a] bg-blue-50/50 shadow-md' : 'border-slate-50 hover:border-blue-200'}`}
                >
                  <div>
                    <p className="font-black text-slate-800 text-sm uppercase italic">{log.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold italic">{log.type === 'SPECIAL_ANIMAL' ? 'SenaLog Express - Khusus Hewan' : 'Regular Service'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#1e3a8a] italic text-lg">Rp {log.price.toLocaleString()}</p>
                  </div>
                </div>
              )) : (
                <div className="p-6 bg-red-50 rounded-3xl border-2 border-dashed border-red-200 text-red-500 font-black italic text-center uppercase text-xs">Logistik Belum Tersedia</div>
              )}
            </div>
          </div>

          {/* 3. METODE PEMBAYARAN */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest mb-6 italic">Pilih Bank Transfer</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dbBanks.map((bank) => (
                <div 
                  key={bank.id} 
                  onClick={() => setSelectedBank(bank)}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedBank?.id === bank.id ? 'border-[#1e3a8a] bg-blue-50/50 shadow-md scale-[1.02]' : 'border-slate-50 hover:border-blue-200'}`}
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-xs border border-slate-100 shadow-sm">{bank.code}</div>
                  <div>
                    <p className="font-black text-slate-800 text-sm uppercase italic leading-none">{bank.name}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase italic">Verifikasi Otomatis</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. BILL SUMMARY SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-[#1e3a8a] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group sticky top-32">
            <h4 className="font-black italic uppercase text-sm mb-8 tracking-[0.2em] border-b border-white/10 pb-4">Bill Summary</h4>
            <div className="space-y-4 mb-10 text-xs font-bold opacity-70 italic leading-none">
              <div className="flex justify-between"><span>Harga Sapi</span><span>Rp {product.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Biaya Layanan (5%)</span><span>Rp {(product.price * 0.05).toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Ongkos Kirim</span><span>Rp {selectedLogistic?.price.toLocaleString() || "0"}</span></div>
            </div>

            <div className="mb-10">
              <p className="text-[10px] font-black uppercase opacity-50 mb-1">Total Pembayaran</p>
              <p className="text-4xl font-black italic tracking-tighter uppercase">Rp {totalPrice.toLocaleString()}</p>
            </div>

            <button 
              onClick={handlePayNow} 
              disabled={isProcessing}
              className={`w-full ${isProcessing ? 'bg-slate-500' : 'bg-[#00D05A] hover:bg-green-600'} py-6 rounded-[2rem] font-black uppercase italic tracking-widest shadow-2xl transition-all active:scale-95 text-sm`}
            >
               {isProcessing ? 'MENYIMPAN PESANAN...' : 'PAY NOW'}
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL INSTRUKSI PEMBAYARAN --- */}
      {showPayModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl" onClick={() => setShowPayModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[4rem] p-12 relative z-10 shadow-2xl border border-white animate-in zoom-in duration-300">
             <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">💰</div>
                <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-none mb-2">Selesaikan Bayar</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 italic">Resi Otomatis: {resiGenerated}</p>

                <div className="bg-slate-50 p-8 rounded-[3rem] mb-10 text-left border border-slate-100 shadow-inner">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total Tagihan:</p>
                   <p className="text-4xl font-black text-[#1e3a8a] italic mb-8">Rp {totalPrice.toLocaleString()}</p>
                   
                   <div className="space-y-4 border-t border-slate-200 pt-8">
                      <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">Kirim Ke Rekening:</p>
                      <div className="flex flex-col gap-1">
                         <p className="text-2xl font-black text-slate-800 tracking-wider uppercase leading-none">{selectedBank?.name}: {selectedBank?.accountNumber}</p>
                         <p className="text-[11px] font-bold text-slate-500 uppercase italic mt-2">A/N {selectedBank?.accountName}</p>
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => window.location.href = '/dashboard/orders'}
                  className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase italic tracking-widest text-xs shadow-xl hover:bg-blue-800 transition-all active:scale-95"
                >
                  Konfirmasi Sudah Transfer
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}