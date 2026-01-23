import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MarketplacePage() {
  // 1. Ambil semua data sapi dari database
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc' // Sapi terbaru muncul di atas
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              SENABRATA <span className="text-green-600">MARKET</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium">Katalog Sapi Premium & Terpercaya</p>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
             <p className="text-green-700 text-xs font-bold uppercase tracking-widest">Total Koleksi</p>
             <p className="text-xl font-black text-green-600">{products.length} Ekor</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        {/* Grid Katalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            // Format Harga Rupiah di dalam loop
            const hargaRupiah = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(Number(product.price));

            return (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className="group bg-white rounded-[32px] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Visual Placeholder */}
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-500">🐂</span>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {product.lineage || "Premium"}
                    </p>
                  </div>
                </div>

                {/* Info Sapi */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-slate-800 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-slate-400 text-xs font-bold italic underline decoration-green-300">
                      {product.location || "Pusat"}
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-end justify-between">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Harga</p>
                      <p className="text-lg font-black text-green-600 tracking-tight">{hargaRupiah}</p>
                    </div>
                    <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:bg-green-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Jika Sapi Kosong */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-300">
            <p className="text-5xl mb-4">🏜️</p>
            <h2 className="text-xl font-bold text-slate-800">Belum ada sapi di kandang</h2>
            <p className="text-slate-400 mt-2">Segera tambahkan koleksi sapi Anda di database!</p>
          </div>
        )}
      </main>
    </div>
  );
}