"use client";

import React from 'react';

export default function DashboardPage() {
  // Data simulasi transaksi
  const transactions = [
    { id: "TX-9901", date: "22 Jan 2026", user: "Andri Wijaya", amount: "+ Rp 50.000.000", type: "Inbound", status: "Success" },
    { id: "TX-9902", date: "21 Jan 2026", user: "Budi Santoso", amount: "- Rp 15.000.000", type: "Outbound", status: "Pending" },
    { id: "TX-9903", date: "20 Jan 2026", user: "Siti Aminah", amount: "+ Rp 25.000.000", type: "Inbound", status: "Success" },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- HEADER DASHBOARD --- */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
              Finance <span className="text-green-600">Analytics.</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">Monitoring Aset & Arus Kas Senabrata</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-slate-200">
               Tambah Modal +
             </button>
          </div>
        </div>

        {/* --- GRID UTAMA --- */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          <div className="xl:col-span-3 space-y-8">
            {/* 🟢 BARIS 1: KOTAK STATISTIK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Cash on Hand</p>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic">Rp 2.450.000.000</h4>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm border-l-4 border-l-green-600">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Net Profit Margin</p>
                <h4 className="text-2xl font-black text-green-600 tracking-tighter italic">18.4%</h4>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Total Asset Value</p>
                <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic">15.8M</h4>
              </div>
            </div>

            {/* 🟢 BARIS 2: GRAFIK GARIS (SVG) */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xs font-black uppercase tracking-widest italic tracking-tighter">Performance History</h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">Inflow</span>
                   </div>
                </div>
              </div>
              
              <div className="relative h-60 w-full">
                <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                  {/* Garis Grid Horizontal */}
                  <line x1="0" y1="50" x2="1000" y2="50" stroke="#F8FAFC" strokeWidth="1" />
                  <line x1="0" y1="100" x2="1000" y2="100" stroke="#F8FAFC" strokeWidth="1" />
                  <line x1="0" y1="150" x2="1000" y2="150" stroke="#F8FAFC" strokeWidth="1" />
                  
                  {/* Garis Grafik */}
                  <path
                    d="M0,180 Q 150,150 250,160 T 450,80 T 650,110 T 850,40 T 1000,60"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0,180 Q 150,150 250,160 T 450,80 T 650,110 T 850,40 T 1000,60 V 200 H 0 Z"
                    fill="url(#gradDashboard)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="gradDashboard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="white" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between mt-6 px-2 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>Mei</span><span>Jun</span>
                </div>
              </div>
            </div>

            {/* 🟢 BARIS 3: TABEL TRANSAKSI */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50">
                  <h3 className="text-xs font-black uppercase tracking-widest italic">Recent Activities</h3>
               </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 italic">ID</th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 italic">User</th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 italic">Amount</th>
                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 italic">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-6 text-[11px] font-bold text-slate-400">{tx.id}</td>
                      <td className="p-6 text-[11px] font-black text-slate-900 uppercase italic">{tx.user}</td>
                      <td className={`p-6 text-[11px] font-black ${tx.type === 'Inbound' ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</td>
                      <td className="p-6">
                        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[8px] font-black uppercase italic tracking-tighter">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🔴 KOLOM KANAN: ALOKASI ASET */}
          <div className="space-y-8">
             <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/20 rounded-full blur-[80px]"></div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-green-500 mb-10 italic">Asset Mix</h3>
                
                <div className="space-y-8">
                   <div>
                      <div className="flex justify-between text-[10px] mb-3 font-black uppercase italic tracking-widest">
                        <span>Peternakan</span>
                        <span>45%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 w-[45%]"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] mb-3 font-black uppercase italic tracking-widest">
                        <span>Pertanian</span>
                        <span>35%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-[35%]"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-[10px] mb-3 font-black uppercase italic tracking-widest">
                        <span>Tanah</span>
                        <span>20%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-600 w-[20%]"></div>
                      </div>
                   </div>
                </div>

                <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-[9px] text-slate-400 leading-relaxed font-medium italic">
                     Seluruh aset dikelola secara profesional oleh tim Senabrata di lapangan.
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}