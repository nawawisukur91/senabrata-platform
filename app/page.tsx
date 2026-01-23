export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
     

      {/* HERO SECTION */}
      <div className="relative h-[400px] w-full bg-green-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" 
          alt="Fresh Green Field" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight uppercase">
            Platform Pangan <span className="text-slate-400">Masa Depan</span> 
          </h1>
          <p className="text-lg opacity-80 max-w-xl font-medium tracking-wide">Transparansi Harga, Kualitas Unggulan, Petani Sejahtera.</p>
        </div>
      </div>

      {/* 3 KOLOM STATISTIK (Warna Hijau Gradasi) */}
      <div className="flex flex-col md:flex-row w-[90%] mx-auto text-white shadow-2xl relative z-10 -mt-16 rounded-3xl overflow-hidden border-4 border-white">
        <div className="flex-1 bg-green-600 p-10 flex items-center justify-center gap-5 border-r border-white/20 hover:bg-green-500 transition-all">
          <div className="text-3xl bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center">📈</div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Update Harga</p>
            <h2 className="text-2xl font-black">Rp 45.200</h2>
          </div>
        </div>

        <div className="flex-1 bg-green-700 p-10 flex items-center justify-center gap-5 border-r border-white/20 hover:bg-green-600 transition-all">
          <div className="text-3xl bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center">👨‍🌾</div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Mitra Aktif</p>
            <h2 className="text-2xl font-black">1.284 Petani</h2>
          </div>
        </div>

        <div className="flex-1 bg-green-800 p-10 flex items-center justify-center gap-5 hover:bg-green-700 transition-all">
          <div className="text-3xl bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center">📦</div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Produk Unggul</p>
            <h2 className="text-2xl font-black">856 Komoditas</h2>
          </div>
        </div>
      </div>

      {/* PRODUK UNGGULAN (Gaya Shopee) */}
      <div className="max-w-7xl mx-auto px-10 py-24">
        <div className="flex justify-between items-center mb-10">
          <div className="border-l-8 border-green-700 pl-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Rekomendasi <span className="text-green-700">Pilihan</span></h2>
            <p className="text-slate-500 text-sm font-medium">Hasil bumi terbaik langsung dari lahan mitra kami</p>
          </div>
          <button className="text-green-700 font-bold text-sm bg-green-50 px-6 py-2 rounded-full hover:bg-green-100 transition">Lihat Semua</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[
            { nama: 'Cabai Rawit Merah', harga: '45.000', asal: 'Kediri', img: 'https://images.unsplash.com/photo-1588252303782-cb80119f706b?q=80&w=400&auto=format&fit=crop' },
            { nama: 'Beras Pandan Wangi', harga: '18.500', asal: 'Cianjur', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400&auto=format&fit=crop' },
            { nama: 'Jagung Pipil Kering', harga: '8.200', asal: 'Lampung', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=400&auto=format&fit=crop' },
            { nama: 'Bawang Merah Super', harga: '32.000', asal: 'Brebes', img: 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=400&auto=format&fit=crop' },
            { nama: 'Kopi Robusta', harga: '65.000', asal: 'Temanggung', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400&auto=format&fit=crop' },
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group">
              <div className="h-44 overflow-hidden relative">
                 <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10 shadow-lg">PREMIUM</div>
                <img src={prod.img} alt={prod.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-slate-800 line-clamp-2 h-10 mb-2 group-hover:text-green-700 transition-colors">{prod.nama}</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-green-700 font-black text-lg">Rp {prod.harga}</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">📍 {prod.asal}</span>
                    <div className="flex text-orange-400 text-[10px]">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-green-950 text-white py-12 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black">SENABRATA <span className="text-green-500">FARM</span></div>
          <p className="text-[10px] opacity-40 tracking-[0.4em] uppercase text-center md:text-right">Digitalizing Local Agriculture © 2026</p>
        </div>
      </footer>
    </div>
  );
}