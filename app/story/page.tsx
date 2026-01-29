"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getAllStories } from '@/app/admin/content/actions'; 
import { PlayCircle, Image as ImageIcon, Calendar, User as UserIcon, X, Maximize2, ArrowRight } from 'lucide-react';

export default function StoryPage() {
  const router = useRouter();
  const [filterType, setFilterType] = useState('all');
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStories() {
      try {
        setLoading(true);
        const data = await getAllStories();
        setStories(data || []);
      } catch (error) {
        console.error("Gagal menarik data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  // 🟡 PETA FILTERING: Membedakan Video Dokumentasi & Foto Bukti Fisik
  const filteredStories = useMemo(() => {
    return stories.filter(s => {
      const isVideo = !!s.youtubeVideoId;
      const isImage = !s.youtubeVideoId && (s.thumbnail || s.type === 'image');
      
      if (filterType === 'all') return true;
      if (filterType === 'video') return isVideo;
      if (filterType === 'image') return isImage;
      return false;
    });
  }, [filterType, stories]);

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      
      {/* 🟢 HEADER & FILTER */}
      <div className="pt-32 pb-12 px-6 max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Cerita <span className="text-green-600">Kita</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
              <span className="w-8 h-[1px] bg-green-500"></span> Transparansi & Bukti Nyata Senabrata
            </p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner">
            {['all', 'video', 'image'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filterType === type 
                  ? 'bg-white text-slate-950 shadow-md scale-105' 
                  : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {type === 'all' ? 'Semua' : type === 'video' ? '🎬 Dokumentasi' : '📸 Bukti Pengiriman'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🟢 GRID CONTENT */}
      <div className="max-w-[1500px] mx-auto px-6 mb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="font-black italic text-slate-400 uppercase tracking-widest text-[10px]">Menyusun Bukti Transparansi...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-32 border-4 border-dashed border-slate-50 rounded-[4rem]">
             <p className="text-slate-300 font-black italic uppercase tracking-[0.3em]">Data sedang dalam proses sinkronisasi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredStories.map((story) => (
              <div key={story.id} className="group flex flex-col animate-in fade-in duration-500">
                
                {/* MEDIA BOX */}
                <div 
                  className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden bg-slate-900 mb-5 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  onClick={() => !story.youtubeVideoId && setSelectedImage(story.thumbnail)}
                >
                  {story.youtubeVideoId ? (
                    <div className="relative w-full h-full">
                       <img 
                        src={`https://img.youtube.com/vi/${story.youtubeVideoId}/maxresdefault.jpg`} 
                        className="w-full h-full object-cover opacity-80"
                        alt="Video Thumbnail"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle size={40} className="text-white opacity-90 group-hover:scale-110 transition-transform" fill="currentColor" />
                       </div>
                       <a 
                        href={`https://youtube.com/watch?v=${story.youtubeVideoId}`} 
                        target="_blank" 
                        className="absolute inset-0 z-10"
                       />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                       <img 
                        src={story.thumbnail || "/placeholder.jpg"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt="Bukti Pengiriman"
                       />
                       <div className="absolute top-4 left-4 bg-green-600 text-[7px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                         Verified Delivery
                       </div>
                       <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 size={24} className="text-white" />
                       </div>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex gap-4 px-2">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex-shrink-0 flex items-center justify-center font-black text-[9px] text-green-500 italic border border-slate-800 shadow-lg">
                    SB
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[13px] font-black text-slate-900 leading-tight line-clamp-2 uppercase italic tracking-tighter group-hover:text-green-600 transition-colors">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                       <span className="flex items-center gap-1"><UserIcon size={10}/> {story.author || "Admin"}</span>
                       <span className="flex items-center gap-1"><Calendar size={10}/> {new Date(story.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🟢 BANNER CTA (AKSES MENUJU INVESTASI) */}
      <div className="max-w-[1500px] mx-auto px-6 pb-20">
        <div className="relative bg-slate-950 rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border border-white/5 shadow-2xl shadow-green-900/10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-600/20 rounded-full blur-[100px]"></div>
          <div className="relative z-10">
            <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Kedaulatan Pangan Indonesia</span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.85] mb-10">
              Jangan Cuma Jadi <span className="text-green-600">Saksi</span>,<br/>
              Jadilah <span className="text-slate-200 underline decoration-green-600 underline-offset-8">Pemilik Aset</span>.
            </h2>
            <button 
              onClick={() => router.push('/register')}
              className="group bg-green-600 text-white px-14 py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-slate-950 transition-all duration-500 flex items-center gap-4 mx-auto shadow-xl shadow-green-900/40"
            >
              Mulai Pendaftaran Investasi
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 MODAL ZOOM FOTO (BUAT TRUST) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <button onClick={() => setSelectedImage(null)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
            <X size={40} />
          </button>
          <img src={selectedImage} className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" alt="Preview Bukti" />
          <p className="absolute bottom-10 text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Original Evidence Content - Senabrata Capital</p>
        </div>
      )}

    </div>
  );
}