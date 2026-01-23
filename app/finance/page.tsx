"use client";

import React, { useState } from 'react';

export default function FinancePage() {
  const [tab, setTab] = useState('Investasi');
  const [amount, setAmount] = useState(1000000);
  const [showPayment, setShowPayment] = useState(false); // Logika Pop-up
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentType, setPaymentType] = useState(''); // 'bank' atau 'ewallet'
  
  const projects = [
    { id: 1, title: "Penanaman Cabai Keriting", location: "Kediri", roi: 6, target: 50000000, current: 35000000, duration: "4 Bulan" },
    { id: 2, title: "Penggemukan Sapi Limousin", location: "Boyolali", roi: 5, target: 150000000, current: 45000000, duration: "6 Bulan" },
    { id: 3, title: "Budidaya Melon Premium", location: "Jatim", roi: 7, target: 80000000, current: 10000000, duration: "3 Bulan" },
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const handleAdClick = (adName: string) => {
  // NANTINYA: Ini akan kirim data ke Database (API)
  console.log(`Log: Iklan ${adName} diklik. Tambah saldo Adsense Senabrata!`);
  alert(`Menuju Program ${adName}... (Kunjungan Tercatat di Sistem Ads Senabrata)`);
};

  return (
    <div className="min-h-screen bg-[#F4F7F6] p-6 md:p-12 font-sans relative">
      
      {/* POP-UP PEMBAYARAN (MODAL) */}
      {showPayment && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setShowPayment(false)}></div>
    <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
      <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic uppercase">Checkout</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Proyek: <span className="text-green-700">{selectedProject.title}</span></p>
      
      <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100 text-center">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Tagihan</p>
        <p className="text-3xl font-black text-slate-900 mt-1">Rp {amount.toLocaleString()}</p>
      </div>

      <div className="space-y-4 mb-8">
        {/* GRUP BANK */}
        <div className="space-y-2">
          <button 
            onClick={() => setPaymentType(paymentType === 'bank' ? '' : 'bank')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${paymentType === 'bank' ? 'border-green-600 bg-green-50' : 'border-slate-100'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🏦</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Transfer Bank / VA</span>
            </div>
            <span>{paymentType === 'bank' ? '▲' : '▼'}</span>
          </button>
          
          {paymentType === 'bank' && (
            <div className="p-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {['BCA Virtual Account', 'Mandiri VA', 'BNI VA', 'BRI VA', 'Permata Bank'].map((bank) => (
                <button 
                  key={bank}
                  onClick={() => setPaymentMethod(bank)}
                  className={`w-full text-left p-4 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${paymentMethod === bank ? 'bg-green-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GRUP E-WALLET */}
        <div className="space-y-2">
          <button 
            onClick={() => setPaymentType(paymentType === 'ewallet' ? '' : 'ewallet')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${paymentType === 'ewallet' ? 'border-green-600 bg-green-50' : 'border-slate-100'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🤳</span>
              <span className="text-[10px] font-black uppercase tracking-widest">E-Wallet & QRIS</span>
            </div>
            <span>{paymentType === 'ewallet' ? '▲' : '▼'}</span>
          </button>
          
          {paymentType === 'ewallet' && (
            <div className="p-2 grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-300">
              {['QRIS', 'GoPay', 'OVO', 'Dana', 'ShopeePay'].map((wallet) => (
                <button 
                  key={wallet}
                  onClick={() => setPaymentMethod(wallet)}
                  className={`p-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${paymentMethod === wallet ? 'bg-green-700 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {wallet}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        disabled={!paymentMethod}
        className={`w-full font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all ${paymentMethod ? 'bg-slate-900 text-white hover:bg-green-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        onClick={() => alert(`Menghubungkan ke API ${paymentMethod}... Mohon tunggu.`)}
      >
        {paymentMethod ? `Bayar via ${paymentMethod}` : 'Pilih Metode Dulu'}
      </button>
    </div>
  </div>
)}

      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Senabrata <span className="text-green-700">Capital</span>
            </h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Investment & Finance Ecosystem</p>
          </div>
          <button onClick={() => window.location.href = '/dashboard'} className="bg-slate-200 text-slate-900 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300">My Portfolio</button>
        </div>

        {/* SWITCHER TAB */}
        <div className="flex bg-slate-200 p-1.5 rounded-2xl w-fit mb-12 shadow-inner">
          <button onClick={() => setTab('Investasi')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'Investasi' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}>💰 Investasi</button>
          <button onClick={() => setTab('Pinjaman')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'Pinjaman' ? 'bg-green-700 text-white shadow-md' : 'text-slate-500'}`}>🚜 Pinjaman</button>
        </div>

        {tab === 'Investasi' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* KOLOM KIRI: KALKULATOR & INFO */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-2xl border border-white/5">
                <h3 className="text-xl font-black mb-6 italic uppercase tracking-tighter text-green-500">Smart Calculator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pilih Target Proyek</label>
                    <select 
                      value={selectedProject.id}
                      onChange={(e) => {
                        const selected = projects.find(p => p.id === Number(e.target.value));
                        if (selected) setSelectedProject(selected);
                      }}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 mt-2 text-sm font-bold text-white outline-none"
                    >
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title} ({p.roi}%)</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nominal Modal (Rp)</label>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 mt-2 text-xl font-black text-green-400 outline-none"
                    />
                  </div>
                  <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Estimasi Bagi Hasil</p>
                    <p className="text-3xl font-black text-white mt-1">Rp {(amount * (1 + selectedProject.roi/100)).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-white text-slate-950 font-black py-4 rounded-xl hover:bg-green-500 hover:text-white transition-all uppercase tracking-widest text-[10px]"
                  >
                    Mulai Investasi Sekarang
                  </button>
                </div>
              </div>

              {/* LEGALITAS */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic leading-relaxed">Pusat Transparansi & Legalitas</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-green-50 transition-colors border border-slate-100">
                    <span className="text-[9px] font-black text-slate-700 uppercase italic">Laporan Keuangan Q4 2025</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[8px] font-black">PDF</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-green-50 transition-colors border border-slate-100">
                    <span className="text-[9px] font-black text-slate-700 uppercase italic">Izin Operasional & Legal</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[8px] font-black">PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* DAFTAR KARTU (KOLOM KANAN) */}
            <div className="lg:col-span-2 space-y-6">
              {projects.map(proj => (
                <div 
                  key={proj.id} 
                  onClick={() => setSelectedProject(proj)}
                  className={`p-8 rounded-[2.5rem] transition-all cursor-pointer border-2 ${selectedProject.id === proj.id ? 'bg-white border-green-500 shadow-xl' : 'bg-white/50 border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter italic">{proj.title}</h4>
                    <span className="bg-slate-100 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">ROI {proj.roi}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: `${(proj.current/proj.target)*100}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Terkumpul: Rp {proj.current.toLocaleString()}</span>
                    <span className="text-green-700 italic">Tenor: {proj.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
         /* TAB PINJAMAN & PENDAFTARAN BANK */
<div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
  
  {/* LAYOUT UTAMA: 2 KOLOM */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    {/* KOLOM KIRI: FORM PENDAFTARAN (RA KIRI) */}
<div className="lg:col-span-2 space-y-6">
  <div className="mb-8">
    <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">
      Prosedur Pengajuan <span className="text-green-700">Mitra Petani</span>
    </h3>
    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2 text-left">
      Lengkapi data untuk akses pendanaan bank rekanan resmi.
    </p>
  </div>

  <div className="space-y-4">
    {/* STEP 1: PILIH BANK (WARNA TAJAM) */}
    <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm transition-all">
      <button 
        onClick={() => setPaymentType(paymentType === 'step1' ? '' : 'step1')}
        className={`w-full flex items-center justify-between p-7 transition-all ${paymentType === 'step1' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      >
        <div className="flex items-center gap-5 text-left">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black italic shadow-lg ${paymentType === 'step1' ? 'bg-green-500 text-slate-950' : 'bg-slate-100 text-slate-400'}`}>01</span>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${paymentType === 'step1' ? 'text-green-500' : 'text-slate-400'}`}>Tahap Awal</p>
            <p className="text-lg font-black tracking-tighter uppercase italic leading-none">Pilih Bank Rekanan</p>
          </div>
        </div>
        <span className={`text-xs transition-transform duration-300 ${paymentType === 'step1' ? 'rotate-180 text-green-500' : 'text-slate-300'}`}>▼</span>
      </button>

      {paymentType === 'step1' && (
        <div className="p-7 bg-slate-50 grid grid-cols-2 gap-4 animate-in slide-in-from-top-3 duration-300">
          {['BRI KUR', 'MANDIRI', 'BNI 46', 'BPD JATIM'].map((bank) => (
            <button 
              key={bank} 
              onClick={() => setPaymentMethod(bank)} 
              className={`p-5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                paymentMethod === bank 
                ? 'border-green-600 bg-green-600 text-white scale-[1.03] shadow-green-200' 
                : 'border-white bg-white text-slate-400 hover:border-green-300 hover:text-slate-700'
              }`}
            >
              {bank}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* STEP 2: IDENTITAS (WARNA TAJAM) */}
    <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm transition-all">
      <button 
        onClick={() => setPaymentType(paymentType === 'step2' ? '' : 'step2')}
        className={`w-full flex items-center justify-between p-7 transition-all ${paymentType === 'step2' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      >
        <div className="flex items-center gap-5 text-left">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black italic shadow-lg ${paymentType === 'step2' ? 'bg-green-500 text-slate-950' : 'bg-slate-100 text-slate-400'}`}>02</span>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${paymentType === 'step2' ? 'text-green-500' : 'text-slate-400'}`}>Validasi Data</p>
            <p className="text-lg font-black tracking-tighter uppercase italic leading-none">Informasi Identitas</p>
          </div>
        </div>
        <span className={`text-xs transition-transform duration-300 ${paymentType === 'step2' ? 'rotate-180 text-green-500' : 'text-slate-300'}`}>▼</span>
      </button>

      {paymentType === 'step2' && (
        <div className="p-8 bg-slate-50 space-y-4 animate-in slide-in-from-top-3 duration-300">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Nama Lengkap Sesuai KTP</label>
            <input type="text" placeholder="CONTOH: BUDI SANTOSO" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-green-500 text-[11px] font-bold outline-none shadow-sm transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Nomor Induk Kependudukan</label>
            <input type="number" placeholder="16 DIGIT NOMOR KTP" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-green-500 text-[11px] font-bold outline-none shadow-sm transition-all" />
          </div>
        </div>
      )}
    </div>

    {/* STEP 3: KAPASITAS PRODUKSI (WARNA TAJAM) */}
    <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm transition-all">
      <button 
        onClick={() => setPaymentType(paymentType === 'step3' ? '' : 'step3')}
        className={`w-full flex items-center justify-between p-7 transition-all ${paymentType === 'step3' ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      >
        <div className="flex items-center gap-5 text-left">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black italic shadow-lg ${paymentType === 'step3' ? 'bg-green-500 text-slate-950' : 'bg-slate-100 text-slate-400'}`}>03</span>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${paymentType === 'step3' ? 'text-green-500' : 'text-slate-400'}`}>Analisis Lahan</p>
            <p className="text-lg font-black tracking-tighter uppercase italic leading-none">Kapasitas Produksi</p>
          </div>
        </div>
        <span className={`text-xs transition-transform duration-300 ${paymentType === 'step3' ? 'rotate-180 text-green-500' : 'text-slate-300'}`}>▼</span>
      </button>

      {paymentType === 'step3' && (
        <div className="p-8 bg-slate-50 space-y-4 animate-in slide-in-from-top-3 duration-300">
          <select className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-green-500 text-[11px] font-bold outline-none shadow-sm cursor-pointer uppercase">
            <option>Pilih Komoditas Utama</option>
            <option>PADI SAWAH</option>
            <option>CABAI RAWIT</option>
            <option>SAPI POTONG</option>
          </select>
          <input type="text" placeholder="LUAS LAHAN (HEKTAR)" className="w-full p-5 bg-white rounded-2xl border-2 border-transparent focus:border-green-500 text-[11px] font-bold outline-none shadow-sm transition-all" />
        </div>
      )}
    </div>

    {/* TOMBOL SUBMIT FINAL */}
    <button className="w-full mt-6 bg-green-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-slate-950 transition-all shadow-xl shadow-green-100 active:scale-[0.98]">
      Ajukan Pembukaan Rekening & Modal
    </button>
  </div>
</div>
   {/* KOLOM KANAN: SIDEBAR DENGAN TRACKER ADSENSE SENABRATA */}
<div className="lg:col-span-1 space-y-6">
  
  {/* IKLAN 1: ASURANSI */}
  <div 
    onClick={() => handleAdClick('Asuransi Gagal Panen')} // Lacak Klik Asuransi
    className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-9 text-white relative overflow-hidden group cursor-pointer shadow-2xl active:scale-95 transition-all"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000"></div>
    <span className="bg-white/20 text-[8px] font-black px-3 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest border border-white/10">Partner Program</span>
    <h4 className="text-2xl font-black italic tracking-tighter leading-tight mb-4 text-left">Asuransi <br/> Gagal Panen</h4>
    <p className="text-[10px] opacity-70 leading-relaxed font-medium mb-8 text-left">Proteksi penuh dari risiko cuaca ekstrem. Premi disubsidi pemerintah.</p>
    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-left">Pelajari Lebih Lanjut →</button>
  </div>

  {/* IKLAN 2: TABUNGAN */}
  <div 
    onClick={() => handleAdClick('Tabungan Simpedes Tani')} // Lacak Klik Tabungan
    className="bg-white rounded-[3rem] p-9 border-2 border-slate-100 shadow-sm hover:border-green-500 transition-all group cursor-pointer active:scale-95"
  >
    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:rotate-12 transition-transform">🏦</div>
    <h4 className="text-lg font-black text-slate-900 mb-2 italic tracking-tighter text-left">Tabungan <span className="text-green-600">Simpedes Tani</span></h4>
    <p className="text-[10px] text-slate-400 leading-relaxed mb-8 font-bold uppercase tracking-widest text-left">Bebas biaya admin bulanan khusus Mitra Senabrata.</p>
    <button className="w-full py-4 bg-slate-50 group-hover:bg-slate-950 group-hover:text-white rounded-2xl text-[9px] font-black uppercase text-slate-500 transition-all">Cek Syarat →</button>
  </div>

  {/* IKLAN 3: EDUKASI */}
  <div 
    onClick={() => handleAdClick('Video Edukasi Modal')} // Lacak Klik Video
    className="bg-slate-950 rounded-[3rem] p-9 text-white shadow-2xl relative overflow-hidden cursor-pointer active:scale-95 transition-all"
  >
    <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] mb-3 text-left">Senabrata Academy</p>
    <h4 className="text-md font-black italic mb-6 leading-snug text-left">Tips Mengelola Modal KUR Agar Jadi Milyaran.</h4>
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">▶</div>
      <div className="text-left">
        <p className="text-[10px] font-black uppercase tracking-widest">Putar Video</p>
        <p className="text-[8px] text-slate-500 font-bold italic underline">Klik untuk Menonton</p>
      </div>
    </div>
  </div>


    </div>
  </div>
</div>
        )}
      </div>
    </div>
  );
}