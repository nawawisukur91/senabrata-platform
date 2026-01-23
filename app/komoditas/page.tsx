export default function KomoditasPage() {
  const addMargin = (price: number) => {
    const finalPrice = price + (price * 0.05); // Tambah 5% Cuannn
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(finalPrice);
  };

  const products = [
    { name: "Sapi Limousin Grade A", market: 44000, status: "Standar Ekspor" },
    { name: "Jagung Manis Super", market: 4800, status: "Kualitas Industri" }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 uppercase italic">Standarisasi Komoditas</h1>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-4">Panduan Harga Jual Terstandarisasi Senabrata</p>
      </div>

      <div className="grid gap-6 max-w-2xl mx-auto">
        {products.map((p, i) => (
          <div key={i} className="bg-slate-900 p-10 rounded-[3rem] text-white flex justify-between items-center relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[8px] font-black text-green-500 uppercase tracking-widest mb-2">{p.status}</p>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">{p.name}</h3>
            </div>
            <div className="text-right relative z-10">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Harga Standar</p>
              <p className="text-2xl font-black text-green-500 italic">{addMargin(p.market)}</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-3xl group-hover:bg-green-600/20 transition-all"></div>
          </div>
        ))}
      </div>
    </div>
  );
}