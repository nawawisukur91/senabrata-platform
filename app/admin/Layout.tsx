"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Kelola User', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Direktori Mitra', icon: <Store size={20} />, path: '/admin/mitra' },
    { name: 'Investasi', icon: <TrendingUp size={20} />, path: '/admin/investments' },
    { name: 'Super Access', icon: <ShieldCheck size={20} />, path: '/admin/super-dashboard' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-[#020617] transition-all duration-300 flex flex-col fixed h-full z-30 shadow-2xl`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-white font-black text-xl italic tracking-tighter uppercase">
              Sena<span className="text-green-500">brata</span>
            </h1>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                  isActive ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}>
                  <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-green-500'}`}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest italic">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          <Link href="/api/auth/signout" className="flex items-center gap-4 px-4 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Logout Account</span>}
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Senabrata Management System v1.0</p>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-900 uppercase italic">Super Admin Access</p>
                <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest leading-none">Status: Online</p>
             </div>
             <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-green-500 shadow-inner overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
             </div>
          </div>
        </header>
        
        <div className="p-10">
          {children}
        </div>
      </main>

    </div>
  );
}