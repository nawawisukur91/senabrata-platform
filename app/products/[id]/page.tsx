import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

// Cache this page for 1 hour, revalidate every 60 seconds when requested
export const revalidate = 60;

// Generate static pages for top products at build time
export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true },
      take: 10, // Pre-generate top 10 products
    });
    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error('[generateStaticParams] Error:', error);
    return [];
  }
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Ambil ID dengan aman (Next.js 15+ logic)
  const { id } = await params;

  // 2. Proteksi Format UUID (Biar gak Error Syntax di Database)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  if (!isUUID) return notFound();

  try {
    // 3. Tarik data dari database
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    // 4. Jika data tidak ditemukan
    if (!product) return notFound();

    // 5. FORMAT HARGA (Sudah diperbaiki dengan Number() agar TypeScript Happy)
    const hargaRupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(product.price));

    // 6. FORMAT BERAT
    const beratSapi = product.weight 
      ? new Intl.NumberFormat("id-ID").format(Number(product.weight)) + " kg" 
      : "Berat belum terdata";

    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navigasi Top */}
        <div className="max-w-6xl mx-auto p-6">
          <Link href="/products" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-green-600 transition-all group">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            BACK TO CATALOG
          </Link>
        </div>

        <main className="max-w-6xl mx-auto px-6 pb-24">
          <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 overflow-hidden border border-white">
            <div className="flex flex-col lg:flex-row">
              
              {/* SISI KIRI: Visual Produk */}
              <div className="lg:w-1/2 bg-slate-100 flex items-center justify-center p-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>
                <div className="relative z-10">
                  <span className="text-[160px] drop-shadow-2xl select-none">🐂</span>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-2xl shadow-xl border border-slate-100 whitespace-nowrap">
                    <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase text-center">Quality Grade</p>
                    <p className="text-sm font-black text-green-600 text-center uppercase">Premium Cattle</p>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: Detail & Transaksi */}
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <div className="inline-block bg-orange-100 text-orange-600 text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
                      {product.lineage || "EXOTIC BREED"}
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                      {product.name}
                    </h1>
                  </div>

                  <div className="space-y-1">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Harga Spesial</p>
                    <p className="text-5xl font-black text-green-600 tracking-tighter">
                      {hargaRupiah}
                    </p>
                  </div>

                  {/* Spesifikasi Sapi */}
                  <div className="grid grid-cols-2 gap-6 py-8 border-y border-slate-100">
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Estimasi Berat</p>
                      <p className="text-2xl font-black text-slate-800 tracking-tight">{beratSapi}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Lokasi Kandang</p>
                      <p className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">{product.location || "Pusat"}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 pt-4">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 rounded-[24px] shadow-2xl shadow-green-200 transition-all hover:scale-[1.02] active:scale-95 text-lg">
                      BELI SEKARANG
                    </button>
                    // Ganti tombol WhatsApp lama dengan ini:
                    <a 
                      href={`https://wa.me/6281234567890?text=Halo%20Senabrata,%20saya%20tertarik%20dengan%20sapi%20${product.name}%20dengan%20ID%20${product.id}`}
                      target="_blank"
                      className="w-full bg-white border-2 border-slate-200 text-slate-500 font-bold py-5 rounded-[24px] hover:border-green-600 hover:text-green-600 transition-all text-center"
                    >
                      HUBUNGI WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Card */}
          <div className="mt-10 text-center">
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em]">
              Product Authentication ID: <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-600">{product.id}</span>
            </p>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Critical Error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-pulse">📡</div>
          <h2 className="text-xl font-black text-slate-800">GANGGUAN KONEKSI</h2>
          <p className="text-slate-400 text-sm">Gagal mengambil data dari Supabase.<br/>Mohon periksa internet atau refresh kembali.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-green-600 text-white font-black rounded-full text-sm">TRY AGAIN</button>
        </div>
      </div>
    );
  }
}