"use client";

import React, { useState, useEffect } from 'react';
import { 
  Wallet, Landmark, Calculator, FileText, ChevronDown, 
  CheckCircle2, Play, ShieldCheck, Crown, MapPin, Fingerprint, Banknote, TrendingUp
} from 'lucide-react';

// --- 1. DEFINISI TIPE DATA (Biar TypeScript Gak Marah) ---
interface Project {
  id: string;
  title: string;
  location: string;
  roi: number;
  target: number;
  current: number;
  duration: string;
}

interface LoanPartner {
  id: string;
  bankName: string;
  loanName: string;
  limitAmount: string;
  interest: string;
  applyUrl: string;
  isActive: boolean;
}

const InvestorIdentityCard = () => {
  const userData = {
    name: "ADITYA SENABRATA",
    memberId: "SNB-VVIP-2026-001",
    rank: "Diamond Mitra",
    location: "Malang, Indonesia"
  };

  return (
    <div className="relative group perspective-1000 w-full mb-8 h-56 cursor-pointer">
      <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-[30px] opacity-50 group-hover:opacity-80 transition-opacity"></div>
      <div className="relative h-full w-full bg-[#0f172a] rounded-[2.5rem] border border-white/10 p-6 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-green-500/50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md relative shadow-inner">
             <div className="absolute inset-0.5 border border-black/5 rounded-sm"></div>
          </div>
          <div className="flex items-center gap-1.5 text-green-500">
            <Crown size={14} className="animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest">{userData.rank}</span>
          </div>
        </div>
        <div className="mt-6 relative z-10">
          <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1">Account Member ID</p>
          <h2 className="text-lg font-black text-white tracking-[0.15em] font-mono">{userData.memberId}</h2>
        </div>
        <div className="mt-auto pt-6 flex justify-between items-end relative z-10">
          <div>
            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">VVIP Investor</p>
            <h3 className="text-sm font-black text-white italic uppercase">{userData.name}</h3>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 backdrop-blur-md">
             <Fingerprint size={12} className="text-green-500" />
             <span className="text-[8px] font-black text-white italic">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FinancePage() {
  const [tab, setTab] = useState('Investasi');
  const [amount, setAmount] = useState(1000000);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loanPartners, setLoanPartners] = useState<LoanPartner[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // --- LOGIKA LOAD DATA (DISINKRONKAN KE API BARU) ---
  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Ambil data investasi (Project)
      const resProj = await fetch('/api/product'); 
      const dataProj = await resProj.json();
      
      const formattedProj: Project[] = Array.isArray(dataProj) ? dataProj.map((p: any) => ({
        id: String(p.id),
        title: p.nama || p.title || "Proyek Tani",
        location: p.asal || p.location || "Indonesia",
        roi: Number(p.roi) || 12, // Default 12% kalau kosong
        target: Number(p.target) || 50000000,
        current: Number(p.current) || 0,
        duration: p.duration || "4 Bulan"
      })) : [];

      // Ambil data pinjaman (Loan)
      const resLoans = await fetch('/api/loan');
      const dataLoans = await resLoans.json();

      setProjects(formattedProj);
      setLoanPartners(Array.isArray(dataLoans) ? dataLoans : []);
      
      if (formattedProj.length > 0) setSelectedProject(formattedProj[0]);
    } catch (err) {
      console.error("Sync Error Sayang:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAllData(); }, []);

  const handleInvestment = async () => {
    if (!selectedProject || !paymentMethod) return;
    try {
      const res = await fetch('/api/product', { // Kirim ke API product/investment
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProject.id,
          amount: amount,
          paymentMethod: paymentMethod
        })
      });
      if (res.ok) {
        alert("Investasi Berhasil, Sayang!");
        setShowPayment(false);
        loadAllData();
      }
    } catch (err) {
      alert("Gagal koneksi database!");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black italic text-green-600 animate-pulse">SYNCHRONIZING SENACAPITAL...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* MODAL PEMBAYARAN */}
      {showPayment && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowPayment(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl">
            <h3 className="text-2xl font-black text-slate-900 italic uppercase mb-8 tracking-tighter">Konfirmasi Pembayaran</h3>
            <div className="bg-slate-50 p-6 rounded-3xl mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase">Total Dana</p>
                <p className="text-3xl font-black text-green-600">Rp {amount.toLocaleString()}</p>
            </div>
            <div className="space-y-3 mb-8">
                {['BCA VA', 'Mandiri VA', 'BNI VA'].map(bank => (
                    <button 
                        key={bank} 
                        onClick={() => setPaymentMethod(bank)} 
                        className={`w-full p-4 rounded-2xl text-left font-black text-[11px] border-2 transition-all ${paymentMethod === bank ? 'border-green-600 bg-green-50' : 'border-slate-100'}`}
                    >
                        {bank}
                    </button>
                ))}
            </div>
            <button onClick={handleInvestment} className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">Konfirmasi & Bayar</button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* HEADER TAB */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-[0.8] mb-4">Sena<span className="text-green-600">Capital</span></h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] italic text-left">Elite Financial Ecosystem</p>
          </div>
          <div className="flex bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100">
            <button onClick={() => setTab('Investasi')} className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase transition-all ${tab === 'Investasi' ? 'bg-[#1e3a8a] text-white shadow-lg' : 'text-slate-400'}`}>Investasi</button>
            <button onClick={() => setTab('Pinjaman')} className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase transition-all ${tab === 'Pinjaman' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400'}`}>Pinjaman</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <InvestorIdentityCard />
            
            {/* SMART CALCULATOR BOX */}
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-white/5 rotate-12">
                <Calculator size={120} />
              </div>

              <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-2 relative z-10">
                <Calculator size={20} className="text-green-500" /> Smart Calculator
              </h3>

              <div className="space-y-6 relative z-10">
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Objek {tab}</label>
                  <select 
                    value={selectedProject?.id || ''}
                    onChange={(e) => {
                      const proj = projects.find(p => p.id === e.target.value);
                      if (proj) setSelectedProject(proj);
                    }}
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 mt-2 text-[11px] font-black text-white outline-none cursor-pointer focus:ring-1 focus:ring-green-500"
                  >
                    {tab === 'Investasi' 
                        ? projects.map(p => <option key={p.id} value={p.id}>{p.title} (ROI {p.roi}%)</option>)
                        : loanPartners.map(l => <option key={l.id} value={l.id}>{l.loanName} ({l.bankName})</option>)
                    }
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Nominal Dana (IDR)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-xl font-black text-green-400 outline-none mt-2" 
                  />
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                  {tab === 'Investasi' ? (
                    <>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Estimasi Bersih</p>
                      <p className="text-3xl font-black text-white italic tracking-tighter">
                        Rp { Math.floor(amount + (amount * (selectedProject?.roi || 0) / 100) - (amount * 0.01)).toLocaleString() }
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Estimasi Cicilan per Bulan</p>
                      <p className="text-3xl font-black text-white italic tracking-tighter">
                        Rp { Math.floor((amount / 12) + (amount * 0.009)).toLocaleString() }
                      </p>
                    </>
                  )}
                </div>

                <button 
                  onClick={() => setShowPayment(true)} 
                  className="w-full bg-green-600 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-green-500 active:scale-95 transition-all"
                >
                  {tab === 'Investasi' ? 'Eksekusi Investasi' : 'Ajukan Pinjaman'}
                </button>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {tab === 'Investasi' ? (
                projects.length > 0 ? projects.map(proj => (
                    <div 
                      key={proj.id} 
                      onClick={() => setSelectedProject(proj)} 
                      className={`p-10 rounded-[4rem] transition-all cursor-pointer border-2 group ${selectedProject?.id === proj.id ? 'bg-white border-[#1e3a8a] shadow-2xl scale-[1.01]' : 'bg-white/50 border-transparent opacity-60'}`}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-[9px] font-black text-green-600 uppercase tracking-[0.3em] mb-2">{proj.location}</p>
                                <h4 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">{proj.title}</h4>
                            </div>
                            <span className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black italic uppercase">ROI {proj.roi}%</span>
                        </div>
                        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                            <div className="h-full bg-[#1e3a8a] rounded-full transition-all duration-1000" style={{ width: `${(proj.current / proj.target) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-4">
                           <p className="text-[9px] font-black text-slate-400 uppercase italic">Terkumpul: Rp {proj.current.toLocaleString()}</p>
                           <p className="text-[9px] font-black text-slate-900 uppercase italic">Target: Rp {proj.target.toLocaleString()}</p>
                        </div>
                    </div>
                )) : <div className="text-center p-20 font-black uppercase text-slate-300 border-4 border-dashed rounded-[4rem]">No Projects Found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loanPartners.length > 0 ? loanPartners.map((loan) => (
                    <div 
                      key={loan.id} 
                      onClick={() => window.open(loan.applyUrl, '_blank')} 
                      className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-xl group hover:scale-[1.05] transition-all cursor-pointer hover:border-green-500"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <Banknote size={24} />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase italic">{loan.bankName}</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{loan.loanName}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Limit {loan.limitAmount}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-black text-slate-900">{loan.interest}/bln</p>
                        <ChevronDown size={16} className="-rotate-90 text-slate-300 group-hover:text-green-600" />
                      </div>
                    </div>
                  )) : <div className="col-span-2 text-center p-20 font-black uppercase text-slate-300 border-4 border-dashed rounded-[4rem]">No Partners Found</div>}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}