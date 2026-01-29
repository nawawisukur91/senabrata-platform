"use client";

import React, { useState } from 'react';
import { Save, Youtube, BookOpen, Loader2, LayoutDashboard } from 'lucide-react';
import { updateAdminContent } from './actions'; // Asumsi action tadi ditaruh di sini

export default function ContentManagement() {
  const [loading, setLoading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [article, setArticle] = useState('');

  const handleSave = async () => {
    setLoading(true);
    const result = await updateAdminContent({ 
      youtube: youtubeUrl, 
      edufarm: article 
    });

    if (result.success) {
      alert("✅ Konten berhasil diperbarui, Bos!");
    } else {
      alert("⚠️ Gagal: " + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 px-8 pb-20">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">
            Content <span className="text-blue-600">Command</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
            Admin Operational Area • Senabrata Capital
          </p>
        </div>

        <div className="grid gap-8">
          
          {/* YOUTUBE SECTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                <Youtube size={20} />
              </div>
              <h2 className="font-black text-slate-900 uppercase italic tracking-tight text-lg">Cerita Kita Video</h2>
            </div>
            <input 
              type="text" 
              placeholder="Masukkan Link YouTube (Contoh: https://youtube.com/watch?v=...)"
              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>

          {/* EDUFARM SECTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <BookOpen size={20} />
              </div>
              <h2 className="font-black text-slate-900 uppercase italic tracking-tight text-lg">Artikel Edufarm</h2>
            </div>
            <textarea 
              rows={8}
              placeholder="Tulis artikel edukasi pertanian/investasi di sini..."
              className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-sm font-medium focus:ring-2 focus:ring-green-500 transition-all"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            />
          </div>

          {/* SAVE BUTTON */}
          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full p-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase italic tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Simpan Perubahan Konten
          </button>

        </div>
      </div>
    </div>
  );
}