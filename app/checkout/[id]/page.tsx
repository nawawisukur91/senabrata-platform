'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // AMBIL DATA ASLI DARI API/DATABASE
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Gagal ambil data sapi", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 font-bold">
      Menyiapkan Kandang Digital... 🐂
    </div>
  );

  if (!product) return <div className="text-center py-20">Sapi tidak ditemukan!</div>;

  const hargaFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleKonfirmasi = () => {
    if (!paymentMethod) return alert("Pilih metode pembayaran dulu, Boss!");
    
    const nomorWA = "628123456789"; // GANTI DENGAN NOMOR WA BOSS
    const pesan = `Halo Admin Senabrata!%0A%0ASaya mau pesan:* ${product.name}*%0AHarga: *${hargaFormatted}*%0AMetode Bayar: *${paymentMethod}*%0A%0AMohon diproses ya!`;
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* KOLOM KIRI: RINGKASAN PRODUK */}
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="text-8xl mb-6 bg-slate-50 w-40 h-40 flex items-center justify-center rounded-full shadow-inner border border-slate-100">
            {product.img || "🐂"}
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{product.name}</h2>
          <p className="text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-full text-xs mt-2">
            ID: {params.id.substring(0, 8)}...
          </p>
          
          <div className="mt-8 p-6 bg-green-50 rounded-[32px] border border-green-100 w-full relative overflow-hidden">
            <p className="text-green-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Total Tagihan</p>
            <p className="text-3xl font-black text-green-700">{hargaFormatted}</p>
            {/* Dekorasi mini */}
            <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">💎</div>
          </div>
        </div>

        {/* KOLOM KANAN: PEMBAYARAN */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-green-500 text-slate-900 w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
              Metode Pembayaran
            </h3>
            
            <div className="space-y-3">
              {['Transfer Bank BCA', 'Mandiri Virtual Account', 'QRIS (Gopay/OVO/Dana)', 'Bayar di Tempat (COD)'].map((method) => (
                <label 
                  key={method}
                  className={`flex items-center p-5 rounded-[24px] border-2 cursor-pointer transition-all duration-300 ${
                    paymentMethod === method ? 'border-green-500 bg-green-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-800/50'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    className="hidden" 
                    onChange={() => setPaymentMethod(method)}
                  />
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${paymentMethod === method ? 'border-green-500' : 'border-slate-600'}`}>
                    {paymentMethod === method && <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                  </div>
                  <span className={`font-bold ${paymentMethod === method ? 'text-white' : 'text-slate-400'}`}>{method}</span>
                </label>
              ))}
            </div>

            <button 
              onClick={handleKonfirmasi}
              className="w-full mt-12 bg-green-500 hover:bg-green-400 text-slate-900 font-black py-5 rounded-[24px] transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              Konfirmasi & Bayar
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            
            <p className="text-center text-slate-500 text-[10px] mt-6 leading-relaxed">
              Transaksi aman & terenkripsi. Dengan menekan tombol, <br/>Anda akan diarahkan ke layanan WhatsApp kami.
            </p>
          </div>

          {/* Aksesoris Mewah Background */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}