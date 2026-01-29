"use client";

import React from 'react';
import { 
  TrendingUp, Users, ArrowUpRight, 
  Activity, Zap 
} from 'lucide-react';

export default function CEODashboard() {
  return (
    // Background Pure White
    <div className="min-h-screen bg-white pt-32 pl-4 pr-10 pb-20 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
      
      {/* HEADER: Clean & Bold */}
      <div className="px-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
          Strategic <span className="text-green-600">Overview</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">
          Senabrata Strategic System v1.0 • Master Control Active
        </p>
      </div>

      {/* --- ROW 1: STATISTIC CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
        {[
          { label: 'Total Capital Flow', value: 'Rp 14.2B', trend: '+12.5%', color: 'text-emerald-600' },
          { label: 'Active Investors', value: '1,284', trend: '+3.2%', color: 'text-blue-600' },
          { label: 'Market Orders', value: '856', trend: '+18.7%', color: 'text-orange-600' },
          { label: 'Security Health', value: '99.9%', trend: 'Stable', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic mb-1 group-hover:text-slate-600 transition-colors">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black text-slate-900 tracking-tighter italic">{stat.value}</p>
              <span className={`text-[9px] font-black ${stat.color} bg-slate-50 px-3 py-1 rounded-full italic border border-slate-100`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- ROW 2: MAIN CONTENT --- */}
      <div className="grid grid-cols-12 gap-8 px-2">
        
        {/* LEFT: SYSTEM RADAR */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-[#020617] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full" />
            <div className="relative z-10 flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">System Activity Radar</h2>
                <p className="text-[9px] text-emerald-500/70 font-bold uppercase tracking-[0.3em] mt-2">Realtime Surveillance Active</p>
              </div>
              <Activity className="text-emerald-500 animate-pulse" size={28} />
            </div>

            <div className="space-y-8 relative z-10">
              {[
                { name: 'Investment Automated Process', progress: '85%', color: 'bg-emerald-500' },
                { name: 'E-Commerce Self-Checkout', progress: '92%', color: 'bg-blue-500' },
                { name: 'Digital Signature Verification', progress: '78%', color: 'bg-orange-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic text-slate-500">
                    <span>{item.name}</span>
                    <span className="text-white">{item.progress}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-1000`} style={{ width: item.progress }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LIVE LOG */}
          <div className="bg-white rounded-[3.5rem] p-10 border border-slate-200/60 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic mb-10 flex items-center gap-3">
              <Zap size={14} className="text-yellow-500 fill-yellow-500" /> Live Operational Log
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50/40 rounded-[2rem] group hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer border border-transparent hover:border-slate-800">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white group-hover:bg-white/10 rounded-2xl flex items-center justify-center font-black text-slate-400 group-hover:text-white text-xs border border-slate-100 transition-colors">0{i+1}</div>
                    <div>
                      <p className="text-xs font-black uppercase italic">Investor #{9928 + i} Signed Agreement</p>
                      <p className="text-[9px] text-slate-400 group-hover:text-slate-500 font-bold uppercase mt-1 italic tracking-widest">Verified • 2 mins ago</p>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-300 group-hover:text-emerald-400 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: EQUITY & HEALTH --- */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200/60 shadow-sm relative overflow-hidden group hover:border-green-600/30 transition-all">
            <TrendingUp size={200} className="absolute -bottom-16 -right-16 text-slate-50 opacity-50 group-hover:scale-125 transition-all duration-1000" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] italic mb-6 text-slate-400">Total Equity Value</h3>
            <p className="text-5xl font-black tracking-tighter italic mb-8 relative z-10">Rp 8.24B</p>
            <button className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-green-600 transition-all shadow-xl relative z-10">
              Withdrawal Management
            </button>
          </div>

          <div className="bg-white rounded-[3.5rem] p-12 border border-slate-200/60 shadow-sm text-center">
            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] italic mb-12 text-left">Platform Health</h3>
            <div className="relative inline-flex items-center justify-center mb-10">
                <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 border-t-emerald-500 animate-[spin_4s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-emerald-500 fill-emerald-500 animate-pulse" size={40} />
                </div>
            </div>
            <p className="text-2xl font-black italic text-slate-900 uppercase tracking-tighter">100% Automated</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Optimal Security Standards</p>
          </div>
        </div>

      </div>
    </div>
  );
}