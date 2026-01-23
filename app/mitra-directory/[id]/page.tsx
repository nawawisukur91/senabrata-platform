"use client";

export default function ShopPage({ params }: { params: { id: string } }) {
  // Data simulasi toko mitra
  const shopInfo = {
    name: "Farm Sejahtera Group",
    owner: "Bpk. H. Ahmad",
    rating: 4.9,
    joined: "2024",
    location: "Cianjur, Jawa Barat",
    products: [
      { id: 1, name: "Sapi Limousin Super", price: 25000000, img: "🐂" },
      { id: 2, name: "Pupuk Kompos Organik", price: 15000, img: "🌱" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER TOKO (Ala Shopee) */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg">
            🏠
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{shopInfo.name}</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">{shopInfo.location} • Aktif sejak {shopInfo.joined}</p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
               <span className="bg-slate-900 text-white text-[8px] font-black px-4 py-2 rounded-full uppercase">Verified Seller</span>
               <span className="bg-green-100 text-green-700 text-[8px] font-black px-4 py-2 rounded-full uppercase">Rating: {shopInfo.rating}</span>
            </div>
          </div>
          <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all">
            Chat Penjual
          </button>
        </div>

        {/* LIST PRODUK TOKO TERSEBUT */}
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 italic border-b pb-4">Etalase Produk</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shopInfo.products.map((p) => (
            <div key={p.id} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] hover:shadow-xl transition-all cursor-pointer group">
              <div className="h-40 bg-slate-50 rounded-[2rem] flex items-center justify-center text-5xl mb-6 group-hover:scale-105 transition-transform">
                {p.img}
              </div>
              <h4 className="font-black text-slate-900 uppercase italic text-sm">{p.name}</h4>
              <p className="text-green-600 font-black text-lg mt-2">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(p.price)}
              </p>
              <button className="w-full mt-4 py-3 bg-slate-50 text-slate-400 text-[8px] font-black uppercase rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                Detail Produk
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}