import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }){  
    
   const { id } = await params;
   const product = await prisma.product.findUnique({
    where: { id: id }, // Pakai variabel id hasil await tadi
    include: {
      seller: { select: { fullName: true } }
    }
  });

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-slate-900 font-sans">
      {/* 🟢 TOP NAV: Minimalis & Sticky */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] ml-2">Back to Catalog</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Senabrata Exclusive Mitra</span>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <ShoppingBag size={20} className="text-slate-400" />
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 🟡 LEFT: GALLERY AREA (Clean & Floating) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/5] w-full rounded-[4rem] overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-white">
              <img 
                src={product.img || "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=1200"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gallery Thumbnails (Static Placeholder) */}
            <div className="grid grid-cols-4 gap-4 px-4">
                {[1,2,3,4].map((i) => (
                    <div key={i} className="aspect-square rounded-3xl bg-white border border-slate-100 p-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <div className="w-full h-full rounded-2xl bg-slate-50"></div>
                    </div>
                ))}
            </div>
          </div>

          {/* 🟡 RIGHT: INFO AREA (Typography Focused) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="space-y-2 mb-8">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1 rounded-full border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  {product.category || "Premium Quality"}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-green-600">
                  <ShieldCheck size={12} /> In Stock
                </span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.85] text-slate-950">
                {product.name}
              </h1>
              <p className="text-slate-400 text-sm font-medium pt-2">Distributed by Senabrata Official Partners</p>
            </div>

            <div className="mb-12">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Investment Price</span>
               <div className="text-5xl font-black text-slate-900 mt-1">
                 Rp {product.price?.toLocaleString('id-ID')}
               </div>
            </div>

            {/* 🛠️ SELECTOR & ACTION */}
            <div className="space-y-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><Minus size={16}/></button>
                        <span className="font-black text-lg">1</span>
                        <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"><Plus size={16}/></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <button className="w-full bg-slate-950 text-white py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.3em] hover:bg-green-600 transition-all duration-500 shadow-2xl shadow-slate-200 active:scale-95">
                        Add to Inventory
                    </button>
                    <button className="w-full bg-white border-2 border-slate-100 text-slate-900 py-6 rounded-[2rem] font-black uppercase text-[12px] tracking-[0.3em] hover:bg-slate-50 transition-all duration-500">
                        Discuss with Mitra
                    </button>
                </div>
            </div>

            {/* 🟢 FEATURES LIST */}
            <div className="mt-12 space-y-6 px-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900"><Truck size={18}/></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Layanan Logistik</p>
                        <p className="text-xs text-slate-500 font-medium">Pengiriman aman dengan standar industri tinggi.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900"><RotateCcw size={18}/></div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Jaminan Kualitas</p>
                        <p className="text-xs text-slate-500 font-medium">QC berlapis langsung dari tim ahli Senabrata.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* 🟡 FOOTER DETAIL (Description Section) */}
        <div className="mt-32 pt-20 border-t border-slate-200">
            <div className="max-w-3xl">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8 italic">Product Specification & Story</h2>
                <div className="prose prose-slate max-w-none prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-500 prose-p:font-medium">
                    <p>{product.description || "Setiap produk mitra Senabrata melalui kurasi ketat untuk memastikan standar kualitas tertinggi. Kami menjembatani teknologi modern dengan kearifan lokal untuk menghasilkan output terbaik bagi ekosistem pertanian Indonesia."}</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}