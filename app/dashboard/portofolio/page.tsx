"use client";

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, RefreshCcw, BadgeDollarSign, Landmark, 
  ShieldCheck, Zap, ExternalLink, Layers, ChevronRight, ArrowDownCircle
} from 'lucide-react';

export default function PortofolioLuxury() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sponsor, setSponsor] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Data Investasi & Iklan secara paralel dari Prisma API kamu
        const [invRes, adRes] = await Promise.all([
          fetch('/api/invest'),
          fetch('/api/admin/active-sponsor') 
        ]);
        
        const invData = await invRes.json();
        const adData = adRes.ok ? await adRes.json() : null;

        // Fallback kalau DB iklan belum diisi
        setSponsor(adData || {
          title: "Sena-Sure Diamond Protection",
          desc: "Proteksi aset eksklusif dengan jaminan buyback 90% untuk portofolio premium.",
          partner: "Allianz X Senabrata",
          link: "#",
          color: "from-blue-600 to-cyan-500",
          cta: "Upgrade Protection"
        });

        setInvestments(invData);
      } catch (err) { console.error("Database Error:", err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const totalInv = investments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalReturn = investments.reduce((acc, curr) => acc + (curr.expectedReturn || 0), 0);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-32 pb-40 px-4 md:px-10 selection:bg-green-500/30">
      {/* Background Glow - Biar aura triliunernya dapet */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - Ukuran Wealth disesuaikan biar gak sakit mata */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800/50 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-[1px] bg-green-500"></div>
               <p className="text-[9px] font-black tracking-[0.4em] uppercase text-green-500 italic">SenaCapital Vault</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none italic">
              Wealth <span className="text-green-500">.</span>
            </h1>
          </div>
          <button onClick={() => window.location.reload()} className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all group">
            <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform" /> Realtime Sync
          </button>
        </div>

        {/* DIAGRAM TALI (BEZIER FLOW) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-16 bg-slate-900/40 p-1 rounded-[4rem] border border-slate-800 backdrop-blur-3xl">
          <div className="lg:col-span-3 p-12 relative overflow-hidden h-[380px]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-12 flex items-center gap-2">
                <Layers size={14} /> Capital Flow Visualization
            </h3>
            
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-20 opacity-30" preserveAspectRatio="none">
              <path d="M 50 150 C 300 150, 300 50, 600 50" stroke="#22c55e" strokeWidth="2" fill="transparent" />
              <path d="M 50 150 C 300 150, 300 250, 600 250" stroke="#3b82f6" strokeWidth="2" fill="transparent" />
              <circle cx="50" cy="150" r="6" fill="#22c55e" className="animate-ping" />
            </svg>

            <div className="relative z-10 h-full flex justify-between items-center">
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-500 uppercase italic">Your Principal</p>
                <h4 className="text-4xl font-black text-white italic tracking-tighter uppercase">Rp {totalInv.toLocaleString()}</h4>
              </div>
              <div className="text-right flex flex-col gap-20">
                <div>
                  <p className="text-[9px] font-black text-green-500 uppercase italic">Growth Yield</p>
                  <h4 className="text-2xl font-black text-white italic tracking-tighter">+12.4%</h4>
                </div>
                <div>
                  <p className="text-[9px] font-black text-blue-500 uppercase italic">Maturity Value</p>
                  <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">Rp {totalReturn.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-[3.8rem] p-12 flex flex-col justify-center border-l border-slate-800">
             <div className="space-y-10">
               <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2 italic">Active Units</p>
                  <p className="text-5xl font-black text-white italic leading-none">{investments.length}</p>
               </div>
               <div className="h-[1px] bg-slate-800 w-full" />
               <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2 italic">Risk Level</p>
                  <p className="text-2xl font-black text-yellow-500 italic uppercase">Conservative</p>
               </div>
             </div>
          </div>
        </div>

        {/* ASSET LIST - INFINITY SCROLL STYLE */}
        <div className="mb-20">
            <div className="flex items-center gap-4 ml-6 mb-8">
                <ArrowDownCircle className="text-green-500 animate-bounce" size={20} />
                <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Live Assets Breakdown</h3>
            </div>

            {/* Container Scroll - Investor betah scroll puluhan aset */}
            <div className="grid grid-cols-1 gap-4 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {investments.length > 0 ? investments.map((inv) => (
                    <div key={inv.id} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] hover:border-green-500/50 transition-all duration-500 group flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-all">
                                <BadgeDollarSign size={24} />
                            </div>
                            <div>
                                <h5 className="text-lg font-black text-white uppercase italic tracking-tight mb-1">{inv.project}</h5>
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">UNIT-ID: SE-{inv.id}</span>
                            </div>
                        </div>

                        <div className="flex flex-1 justify-between items-center w-full md:w-auto px-6">
                            <div className="text-center md:text-left">
                                <p className="text-[8px] font-black text-slate-500 uppercase italic mb-1">Position</p>
                                <p className="text-sm font-black text-white">Rp {inv.amount.toLocaleString()}</p>
                            </div>
                            <div className="hidden lg:block w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500" style={{ width: `${inv.progress}%` }} />
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-green-500 uppercase italic mb-1">Expected ROI</p>
                                <p className="text-sm font-black text-green-500 italic">Rp {inv.expectedReturn?.toLocaleString()}</p>
                            </div>
                        </div>

                        <button className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-all">
                            <ChevronRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )) : (
                    <div className="p-20 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">No assets detected in current vault</p>
                    </div>
                )}
            </div>
        </div>

        {/* 💰 SPONSOR BADGE - Terkoneksi Database Prisma */}
        {sponsor && (
          <div className="bg-slate-900 border border-slate-800 p-2 rounded-[3.5rem] shadow-2xl group overflow-hidden relative">
            <div className={`bg-gradient-to-r ${sponsor.color || 'from-green-600/10 to-blue-600/10'} rounded-[3.3rem] p-10 flex flex-col md:flex-row items-center gap-10 relative`}>
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="w-20 h-20 bg-slate-950 rounded-[2.5rem] flex items-center justify-center text-green-500 border border-slate-800 shadow-2xl relative z-10">
                <ShieldCheck size={40} className="animate-pulse" />
              </div>

              <div className="flex-1 text-center md:text-left z-10">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                  <span className="text-[8px] font-black bg-white text-black px-4 py-1 rounded-full uppercase italic">Exclusive Partner</span>
                  <h6 className="text-[14px] font-black text-white uppercase tracking-[0.2em] italic">{sponsor.title}</h6>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase italic max-w-2xl leading-relaxed">{sponsor.desc}</p>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-4">Verified Merchant: {sponsor.partner}</p>
              </div>

              <a 
                href={sponsor.link}
                className="bg-white text-black px-12 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-500 hover:text-white transition-all flex items-center gap-3 z-10 shadow-xl active:scale-95"
              >
                {sponsor.cta || 'EXPLORE'} <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Sub-component Loading
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <div className="w-24 h-[2px] bg-slate-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-green-500 animate-[loading_1.5s_infinite]" />
      </div>
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.8em] mt-10 animate-pulse italic">Securing Asset Stream...</p>
    </div>
  );
}