"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { 
  User, Mail, Phone, MapPin, ShieldCheck, Camera, 
  Wallet, Briefcase, Bell, Lock, Gift, Package, 
  Truck, CheckCircle, Receipt, CreditCard, Landmark 
} from 'lucide-react';

export default function UnifiedProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('identitas');
  const [loading, setLoading] = useState(false);

  // 1. Logic Penentuan Role (Disesuaikan dengan Database)
  const userRole = (session?.user as any)?.role || "Investor"; // Default ke Investor buat ngetes

  // 2. Mapping Tab sesuai Frekuensi User
  const getTabsByRole = (role: string) => {
    const rolesMap: Record<string, any[]> = {
      investor: [
        { id: 'identitas', label: 'Identitas Pribadi', icon: <User size={14}/> },
        { id: 'aset', label: 'Aset Investasi', icon: <Briefcase size={14}/> },
        { id: 'withdraw', label: 'Withdraw Hasil', icon: <Wallet size={14}/> },
        { id: 'keamanan', label: 'Keamanan', icon: <Lock size={14}/> },
        { id: 'notifikasi', label: 'Update Saham', icon: <Bell size={14}/> },
      ],
      penjual: [
        { id: 'identitas', label: 'Identitas Farm', icon: <Landmark size={14}/> },
        { id: 'etalase', label: 'Pengaturan Produk', icon: <Package size={14}/> },
        { id: 'withdraw', label: 'Cairkan Penjualan', icon: <Wallet size={14}/> },
        { id: 'keamanan', label: 'Keamanan', icon: <Lock size={14}/> },
        { id: 'notifikasi', label: 'Pesanan Masuk', icon: <Bell size={14}/> },
      ],
      pembeli: [
        { id: 'identitas', label: 'Identitas & Alamat', icon: <User size={14}/> },
        { id: 'voucher', label: 'Voucher Saya', icon: <Gift size={14}/> },
        { id: 'dikemas', label: 'Sedang Dikemas', icon: <Package size={14}/> },
        { id: 'dikirim', label: 'Dalam Pengiriman', icon: <Truck size={14}/> },
        { id: 'sampai', label: 'Selesai & Testimoni', icon: <CheckCircle size={14}/> },
      ],
      nasabah: [
        { id: 'identitas', label: 'Identitas', icon: <User size={14}/> },
        { id: 'angsuran', label: 'Detail Angsuran', icon: <Receipt size={14}/> },
        { id: 'pinjaman', label: 'Limit Pinjaman', icon: <CreditCard size={14}/> },
        { id: 'keamanan', label: 'Autentikasi Data', icon: <ShieldCheck size={14}/> },
        { id: 'notifikasi', label: 'Tagihan & Bayar', icon: <Bell size={14}/> },
      ]
    };
    return rolesMap[role.toLowerCase()] || rolesMap['investor'];
  };

  const currentTabs = getTabsByRole(userRole);

  return (
    <div className="min-h-screen bg-[#fcfdfe] pb-24">
      {/* --- HERO BANNER --- */}
      <div className="h-64 md:h-80 w-full bg-gradient-to-br from-[#020617] via-[#064e3b] to-[#172554] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="relative -mt-32 md:-mt-40">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-8 md:p-14 border border-white/50">
            
            {/* --- TOP PROFILE INFO --- */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-emerald-400 rounded-[2.8rem] opacity-75 blur-sm"></div>
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] overflow-hidden border-4 border-white relative z-10 bg-slate-50">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400" className="w-full h-full object-cover" alt="Profile" />
                </div>
                <button className="absolute -bottom-2 -right-2 z-20 bg-[#0f172a] text-white p-3.5 rounded-2xl shadow-xl hover:bg-emerald-600 border-2 border-white transition-all active:scale-90"><Camera size={20} /></button>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <h1 className="text-4xl md:text-6xl font-black italic uppercase text-[#0f172a] tracking-tighter leading-none">
                    {session?.user?.name || "Abex"} <span className="text-emerald-600">Zibriell.</span>
                  </h1>
                  <div className="bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 flex items-center gap-2">
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">{userRole} Star+</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] italic">Connected to Senabrata Net • 2026</p>
              </div>
            </div>

            {/* --- DYNAMIC TABS (THE SUNTIKAN) --- */}
            <div className="flex gap-3 mt-16 border-b border-slate-50 overflow-x-auto pb-4 no-scrollbar">
               {currentTabs.map((tab) => (
                 <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'bg-[#0f172a] text-white shadow-xl shadow-blue-900/20 translate-y-[-2px]' 
                    : 'text-slate-400 hover:text-[#0f172a] hover:bg-slate-50'
                  }`}
                 >
                   {tab.icon} {tab.label}
                 </button>
               ))}
            </div>

            {/* --- CONTENT AREA (Sesuai Frekuensi Tab) --- */}
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              
              {activeTab === 'identitas' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-tighter italic flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-emerald-500"></div> Data Diri
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Field label="Nama Lengkap" value={session?.user?.name || ""} />
                      <Field label="Email" value={session?.user?.email || ""} />
                      <Field label="Nomor WhatsApp" value="+62 812-3456-7890" />
                      <Field label="NIK / KTP" value="3271XXXXXXXXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h3 className="text-sm font-black text-[#0f172a] uppercase tracking-tighter italic flex items-center gap-3">
                      <div className="w-8 h-[2px] bg-blue-500"></div> Alamat & Domisili
                    </h3>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-blue-500 transition-all h-40 resize-none shadow-inner"
                      placeholder="Masukkan alamat lengkap pengiriman/farm/kantor..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'aset' && <PlaceholderBox title="Portofolio Aset" desc="Lihat performa saham dan investasi tani kamu." color="bg-emerald-500" />}
              {activeTab === 'withdraw' && <PlaceholderBox title="Withdraw Center" desc="Cairkan saldo hasil investasi/penjualan kamu." color="bg-blue-600" />}
              {activeTab === 'angsuran' && <PlaceholderBox title="Detail Angsuran" desc="Pantau sisa cicilan dan histori pembayaran kamu." color="bg-red-500" />}
              {activeTab === 'voucher' && <PlaceholderBox title="Voucher Belanja" desc="Gunakan voucher kamu untuk belanja hasil tani." color="bg-amber-500" />}
              {activeTab === 'keamanan' && <PlaceholderBox title="Security Center" desc="Atur PIN, 2FA, dan Keamanan Autentik." color="bg-slate-900" />}

            </div>

            {/* --- FOOTER ACTIONS --- */}
            <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
               <button className="px-10 py-5 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-all">Discard Changes</button>
               <button onClick={() => {setLoading(true); setTimeout(() => setLoading(false), 2000)}} className="bg-gradient-to-r from-blue-700 to-emerald-600 text-white px-14 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all italic">
                 {loading ? "Syncing..." : "Update Settings"}
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Helper Kecil biar Kodingan Rapi
function Field({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 block">{label}</label>
      <input defaultValue={value} className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-emerald-500 outline-none transition-all shadow-sm" />
    </div>
  );
}

function PlaceholderBox({ title, desc, color }: { title: string, desc: string, color: string }) {
  return (
    <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center space-y-4 shadow-inner">
      <div className={`w-16 h-1 w-1 ${color} rounded-full`}></div>
      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{title}</h2>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
      <button className="mt-4 bg-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-900 hover:text-white transition-all">Open Module →</button>
    </div>
  );
}