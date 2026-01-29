"use client";
import React, { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  // Fungsi buat ambil data asli dari database (via API nanti)
  // Untuk sekarang kita simulasi tampilannya dulu
  const mockProducts = [
    { id: '1', name: 'Sapi Limousin Jumbo', price: 28000000, isPriority: true, mitra: 'Farm Maju' },
    { id: '2', name: 'Pupuk Cair Organik', price: 125000, isPriority: false, mitra: 'Agro Jaya' },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] pt-28 pb-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1e3a8a] italic uppercase tracking-tighter">Control Center</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Manajemen Aset & Iklan Sultan</p>
          </div>
          <button className="bg-[#1e3a8a] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase italic shadow-lg hover:scale-105 transition-all">
            + Tambah Produk Baru
          </button>
        </div>

        {/* TABEL PENGUASA */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Produk</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Mitra</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Status Sultan</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-slate-800 uppercase italic text-sm">{p.name}</p>
                    <p className="text-[10px] font-bold text-blue-600">Rp {p.price.toLocaleString()}</p>
                  </td>
                  <td className="p-6 font-bold text-slate-500 text-xs">{p.mitra}</td>
                  <td className="p-6">
                    {p.isPriority ? (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black uppercase italic">⭐ Sultan Active</span>
                    ) : (
                      <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase italic">Reguler</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button className="bg-blue-50 text-blue-600 p-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all">📝</button>
                      <button className="bg-red-50 text-red-600 p-2 rounded-xl hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                      <button className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-yellow-400 hover:text-white transition-all">
                        {p.isPriority ? 'Un-Sultan' : 'Make Sultan'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}