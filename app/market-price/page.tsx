"use client";

export default function MarketPricesPage() {
  // Fungsi Sakti buat cari cuan 5%
  const addMargin = (price: number) => {
    const finalPrice = price + (price * 0.05);
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(finalPrice);
  };

  const priceData = [
    { name: "Daging Sapi (Karkas)", basePrice: 42000, unit: "kg" },
    { name: "Sapi Bakalan Limousin", basePrice: 18000000, unit: "ekor" },
    { name: "Jagung Pipil Kering", basePrice: 5200, unit: "kg" }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="text-green-600 font-black text-[10px] tracking-[0.4em] uppercase">Official Price Index</span>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic mt-2 mb-8">Update Harga Komoditas</h1>
        
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          {priceData.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <div>
                <h4 className="font-black text-slate-900 uppercase italic text-sm">{item.name}</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Satuan per {item.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-slate-900 italic">{addMargin(item.basePrice)}</p>
                <p className="text-[8px] text-green-600 font-black uppercase tracking-tighter italic">+ Include Service Fee</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}