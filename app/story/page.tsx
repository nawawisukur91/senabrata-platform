"use client";

import React, { useState } from 'react';

export default function StoryPage() {
  // 🟡 STATE: Buat filter (Semua, Video, Foto)
  const [filterType, setFilterType] = useState('all');

  // 🟢 DATA: Ini isi kontennya (Bisa Boss tambah terus ke bawah nanti)
  const stories = [
    {
      id: 1,
      type: "video",
      title: "Update Kandang: Sapi Limousin Super",
      date: "22 Jan 2026",
      desc: "Laporan mingguan kondisi kesehatan sapi di Boyolali.",
      youtubeId: "aLrfY-FYR28", 
      tag: "Live Update",
    },
    {
      id: 2,
      type: "image",
      title: "Panen Raya Cabai Merah Kediri",
      date: "20 Jan 2026",
      desc: "Pengiriman 5 ton cabai pertama ke pasar induk Jakarta.",
      img: "https://images.unsplash.com/photo-1592919016327-51963884ff7a?q=80&w=800",
      tag: "Harvest",
    },
    {
      id: 3,
      type: "video",
      title: "Drone Spraying: Lahan Jagung Lampung",
      date: "18 Jan 2026",
      desc: "Otomasi pemupukan menggunakan teknologi drone modern.",
      youtubeId: "GyEQQdfp1LE",
      tag: "Agrotech",
    },
    {
      id: 4,
      type: "image",
      title: "Pelatihan Mitra Tani Milenial",
      date: "15 Jan 2026",
      desc: "Workshop penggunaan teknologi Senabrata untuk petani muda.",
      img: "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=800",
      tag: "Education",
    },
  ];

  // 🟡 LOGIKA: Filter datanya berdasarkan pilihan Boss
  const filteredStories = filterType === 'all' 
    ? stories 
    : stories.filter(s => s.type === filterType);

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* 🟢 HEADER & FILTER */}
      <div className="pt-32 pb-12 px-6 max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Dokumentasi <span className="text-green-600">Senabrata</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">
              Evidence of Impact & Transparency
            </p>
          </div>

          <div className="flex gap-2">
            {['all', 'video', 'image'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  filterType === type 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {type === 'all' ? 'Semua' : type === 'video' ? '🎬 Video' : '📸 Foto'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 GRID 4 KOLOM (4x1) - Tampilan YouTube Style */}
      <div className="max-w-[1500px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
          {filteredStories.map((story) => (
            <div key={story.id} className="group cursor-pointer flex flex-col">
              
              {/* 🟡 MEDIA AREA (Thumbnail) */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 transition-all group-hover:shadow-xl group-hover:scale-[1.02]">
                {story.type === "video" ? (
                  <iframe 
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${story.youtubeId}`} 
                    title={story.title}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img 
                    src={story.img} 
                    alt={story.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                )}
                
                {/* Badge Label (Video / Image) */}
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-widest">
                  {story.type === 'video' ? 'Video' : 'Image'}
                </div>
              </div>

              {/* 🟡 INFO AREA (Judul & Keterangan) */}
              <div className="flex gap-3 px-1">
                {/* Logo Bulat SB */}
                <div className="w-10 h-10 rounded-full bg-slate-900 flex-shrink-0 flex items-center justify-center font-black text-[10px] text-green-500 border border-slate-800">
                  SB
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-green-600 transition uppercase italic">
                    {story.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">Senabrata Official</p>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium">
                    <span>{story.tag}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 BANNER AJAKAN INVESTASI (CTA) */}
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="relative bg-slate-950 rounded-[3rem] overflow-hidden p-12 md:p-20 text-center shadow-2xl">
          
          {/* Efek Lampu Hijau di Background */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
          
          <div className="relative z-10">
            <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Build Your Portfolio</span>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
              Jangan Cuma <span className="text-green-600">Menonton</span>,<br/>
              Mari Jadi <span className="text-slate-200 underline decoration-green-600 underline-offset-8">Pemilik</span>.
            </h2>
            
            <p className="text-slate-400 mt-8 max-w-xl mx-auto text-sm md:text-base font-medium">
              Dokumentasi di atas adalah bukti kerja nyata kami. Kini giliran Anda mengambil bagian dalam kedaulatan pangan Indonesia.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">
              <button className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-green-900/20 active:scale-95">
                Mulai Investasi Sekarang
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white/10 transition-all">
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}