// HAPUS "use client" - Ini wajib Server Component biar aman panggil Prisma
import React from 'react';
import Link from 'next/link';
import { prisma } from "@/lib/prisma"; 
import { MapPin, Store, AlertCircle } from 'lucide-react';

export default async function PenjualDirectoryPage() {
  // 🟢 REAL DATABASE CALL: Ambil data dari tabel 'mitras' di Supabase
  // Pastikan kamu sudah jalankan 'npx prisma db push' ya sayang
  const daftarPenjual = await prisma.mitra.findMany({
    orderBy: { mitraName: 'asc' }
  });

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-green-600 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block italic">
            Senabrata Official Sellers
          </span>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Direktori <span className="text-green-600">Penjual</span> <br/> Hasil Tani.
          </h1>
        </div>

        {/* --- LOGIKA TAMPILAN --- */}
        {daftarPenjual.length > 0 ? (
          /* JIKA ADA DATA DI DATABASE */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {daftarPenjual.map((penjual) => (
              <Link href={`/mitra-directory/${penjual.id}`} key={penjual.id} className="group">
                <div className="bg-white border border-slate-100 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 transition-all duration-500 group-hover:shadow-2xl group-hover:border-green-600/30 group-hover:-translate-y-2 relative overflow-hidden">
                  
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center overflow-hidden group-hover:bg-green-600 transition-all duration-500 shadow-inner">
                    {penjual.logoUrl ? (
                      <img src={penjual.logoUrl} alt={penjual.mitraName} className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors" />
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                      <span className="text-xs font-black text-green-600 italic">★ {penjual.rating.toFixed(1)}</span>
                      <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{penjual.status}</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic leading-tight group-hover:text-green-600 transition-colors">
                      {penjual.mitraName}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                      <MapPin size={10} className="text-green-600" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                        {penjual.city || 'Lokasi'}, {penjual.province || 'Indonesia'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* JIKA DATABASE KOSONG (REAL CONDITION) */
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="text-slate-200" size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Database Masih Kosong</h3>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2 max-w-xs">
              Belum ada penjual yang terdaftar di database Senabrata. <br/> Silakan tambahkan data melalui Admin Panel atau Prisma Studio.
            </p>
            
            {/* Tombol bantu buat kamu cek Prisma Studio */}
            <div className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic">
              Waiting for Real Data...
            </div>
          </div>
        )}

      </div>
    </div>
  );
}