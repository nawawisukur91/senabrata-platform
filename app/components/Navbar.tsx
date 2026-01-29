"use client";

import React, { useState, useEffect } from 'react';
import { User, LayoutDashboard, Wallet, Settings, LogOut, ShoppingCart, Menu, X, ShieldCheck, Bell, Search, ShoppingBag } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { MessageCircle, FileText, Youtube } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const isAdminPath = pathname.startsWith('/admin');
  const loading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  useEffect(() => {
    const updateBadge = () => {
      const savedCart = JSON.parse(localStorage.getItem('senabrata_cart') || '[]');
      setCartCount(savedCart.length);
    };
    updateBadge();
    window.addEventListener('storage', updateBadge);
    return () => window.removeEventListener('storage', updateBadge);
  }, []);

  const handleNavigation = (link: string, isPrivate: boolean) => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsToolsOpen(false);

    if (link.startsWith('/admin')) {
      const userRole = (user as any)?.role;
      if (userRole !== 'SUPER_ADMIN' && userRole !== 'ADMIN') {
        alert("⚠️ AKSES DITOLAK: Area ini hanya untuk Boss Besar!");
        return;
      }
    }

    if (isPrivate && !isLoggedIn) {
      alert("Maaf Boss, silakan login dulu ya Sayang.");
      router.push('/login');
    } else {
      router.push(link);
    }
  };

  const navItems = [
    { name: 'Marketplace', link: '/marketplace', private: false },
    { name: 'EduFarm', link: '/edufarm', private: false },
    { name: 'Finance', link: '/dashboard/finance', private: true },
    { name: 'Mitra Tani', link: '/mitra-directory', private: false },
    { name: 'Cerita Kita', link: '/story', private: false },
  ];

  if (loading) return <div className="h-20" />;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] p-4 md:p-6 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-2">
        <div className={`bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl px-6 md:px-12 py-2.5 rounded-[2.5rem] flex justify-between items-center relative z-[1001] transition-all duration-500 ${isAdminPath ? 'ring-2 ring-green-600/20 shadow-green-900/10' : ''}`}>

          {/* LEFT: LOGO */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => router.push('/')}>
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center overflow-hidden">
                <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="flex flex-col text-left">
                <h1 className="text-sm md:text-base font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                  Sena<span className="text-green-600">brata</span>
                </h1>
                <p className="text-[6px] md:text-[7px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mt-1">
                  {isAdminPath ? 'Strategic Control' : 'Farm & Capital'}
                </p>
              </div>
            </div>
            {isAdminPath && (
              <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-slate-900 rounded-full text-white">
                <ShieldCheck size={10} className="text-green-500" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] italic">Boss Mode</span>
              </div>
            )}
          </div>

          {/* MIDDLE: MENU UTAMA (SELAU MUNCUL JIKA BUKAN ADMIN PATH) */}
          {!isAdminPath && (
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.link, item.private)}
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-green-600 transition-all"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

          {/* MIDDLE: ADMIN TOOLS (HANYA MUNCUL DI ADMIN PATH) */}
          {isAdminPath && (
            <div className="hidden lg:flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search System..." className="bg-slate-50 border-none rounded-full py-2.5 pl-11 pr-6 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-green-500/20 w-56 shadow-inner outline-none" />
              </div>

              {((user as any)?.role === 'SUPER_ADMIN' || (user as any)?.role === 'ADMIN') && (
                <div className="relative">
                  <button onClick={() => setIsToolsOpen(!isToolsOpen)} className="flex items-center gap-3 px-6 py-2.5 bg-slate-900 hover:bg-green-600 text-white rounded-full transition-all shadow-xl group">
                    <LayoutDashboard size={12} className="text-green-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Master Control</span>
                  </button>
                  {isToolsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsToolsOpen(false)}></div>
                      <div className="absolute left-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4">
                        <div className="p-5 bg-slate-900 text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center"><ShieldCheck size={16} /></div>
                          <div><p className="text-[10px] font-black uppercase tracking-widest leading-none">Control Center</p></div>
                        </div>
                        <div className="py-2 max-h-[400px] overflow-y-auto">
                          <MenuButton icon={<ShoppingCart size={12} />} label="Katalog Komoditas" onClick={() => handleNavigation('/admin/master/products', true)} />
                          <MenuButton icon={<User size={12} />} label="Database Investor" onClick={() => handleNavigation('/admin/master/investors', true)} />
                          {/* ... Sisanya tetap sama sesuai codingan aslimu ... */}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* RIGHT: USER TOOLS & LOGIN */}
          <div className="flex items-center gap-4">
            {/* KERANJANG (Selalu Muncul) */}
            <button onClick={() => handleNavigation('/cart', false)} className="relative p-2.5 hover:bg-slate-50 rounded-full transition-all group">
              <ShoppingBag size={18} className="text-slate-900 group-hover:text-green-600" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-green-600 text-white text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`flex items-center gap-2 p-1 pr-4 rounded-full transition-all shadow-lg ${isAdminPath ? 'bg-slate-900' : 'bg-green-600 hover:bg-slate-900'}`}>
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center font-black text-[9px] text-green-600">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left leading-none">
                    <p className="text-[8px] font-black text-white uppercase italic">{user?.name}</p>
                    <p className="text-[6px] font-bold text-white/80 uppercase tracking-widest">{(user as any).role}</p>
                  </div>
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 z-50 overflow-hidden">
                      <div className="p-4 border-b bg-slate-50/50">
                        <p className="text-[10px] font-black text-slate-900 italic uppercase">{user?.name}</p>
                        <p className="text-[7px] font-bold text-green-600 uppercase mt-1">{(user as any).role}</p>
                      </div>
                      <div className="py-2">
                        <MenuButton icon={<User size={12} />} label="View Profile" onClick={() => handleNavigation('/profile', true)} />
                        <MenuButton icon={<LayoutDashboard size={12} />} label="Asset Management" onClick={() => handleNavigation('/dashboard/portofolio', true)} />
                        <div className="h-[1px] bg-slate-50 my-1 mx-4"></div>
                        <button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full text-left px-5 py-3 text-[9px] font-black uppercase text-red-500 hover:bg-red-50 flex items-center gap-3">
                          <LogOut size={12} /> Log Out System
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => router.push('/login')} className="bg-slate-950 text-white px-8 py-2.5 rounded-full text-[9px] font-black uppercase hover:bg-green-600 shadow-xl transition-all">
                Portal
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Helper components (MenuButton, QuickTool) tetap di bawah seperti codingan kamu
function MenuButton({ icon, label, onClick }: { icon: any, label: string, onClick: any }) {
  return (
    <button onClick={onClick} className="w-full text-left px-5 py-3 text-[9px] font-black uppercase text-slate-700 hover:bg-green-50 flex items-center gap-3 transition-colors group">
      <span className="text-slate-400 group-hover:text-green-600">{icon}</span>
      {label}
    </button>
  );
}