import { prisma } from "@/lib/prisma";
import { approveMitra } from "./actions";
import Image from "next/image";

export default async function AdminDashboard() {
    // Query ke model MITRA (bukan User)
    const pendingMitras = await prisma.mitra.findMany({
        where: {
            status: "PENDING",
            isVerified: false
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-white pt-26 pb-12 px-8 md:px-12 text-slate-900">
            <div className="max-w-6xl mx-auto">

                {/* Header Luxury */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-slate-100 pb-8">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-black">
                            MITRA <span className="text-emerald-600 font-light">VERIFICATION</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 uppercase tracking-[0.3em] text-[10px]">
                            Senabrata Capital • Partner Quality Control
                        </p>
                    </div>
                    <div className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold tracking-tighter">
                        {pendingMitras.length} MITRA BARU
                    </div>
                </div>

                {/* List Card Mitra */}
                <div className="grid gap-8">
                    {pendingMitras.map((mitra) => (
                        <div key={mitra.id} className="bg-white border-2 border-slate-100 rounded-3xl p-8 transition-all hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 group">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                                {/* Section 1: Detail Bisnis/Farm */}
                                <div className="lg:col-span-4 space-y-6">
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2 py-1 bg-emerald-50 rounded">Mitra ID</span>
                                        <p className="font-mono text-[11px] text-slate-400 mt-2 truncate">{mitra.id}</p>
                                        <h3 className="text-2xl font-extrabold text-black mt-1 uppercase tracking-tight leading-none">
                                            {mitra.farmName}
                                        </h3>
                                        <p className="text-slate-500 font-medium font-mono text-sm mt-1">@{mitra.username}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">WA</div>
                                            <p className="font-bold text-black text-sm">{mitra.phoneNumber || "-"}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">MAP</div>
                                            <div className="text-sm text-slate-600 leading-relaxed italic">
                                                {mitra.address}, {mitra.city}, {mitra.province}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Dokumen Legal (Foto KTP Mitra) */}
                                <div className="lg:col-span-5 space-y-4 border-x border-slate-100 px-2 lg:px-8">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verifikasi Identitas (KTP)</span>
                                    </div>

                                    <div className="relative aspect-[16/9] w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 group-hover:border-emerald-200 transition-colors flex items-center justify-center shadow-inner">
                                        {mitra.fotoKtp ? (
                                            <Image
                                                src={mitra.fotoKtp}
                                                alt={`KTP ${mitra.farmName}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="text-center p-4">
                                                <p className="text-[10px] font-black text-red-500 uppercase">Foto KTP Tidak Diupload</p>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-center text-slate-400 italic">Pastikan foto jelas dan NIK terbaca sebelum approve</p>
                                </div>

                                {/* Section 3: Keputusan Admin */}
                                <div className="lg:col-span-3 flex flex-col justify-center gap-4">
                                    <form action={async () => {
                                        "use server";
                                        await approveMitra(mitra.id);
                                    }}>
                                        <button
                                            disabled={!mitra.fotoKtp || !mitra.address}
                                            className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-xl 
                        ${(!mitra.fotoKtp || !mitra.address)
                                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                                                    : 'bg-black text-white hover:bg-emerald-600 hover:shadow-emerald-200 active:scale-95'}`}
                                        >
                                            APPROVE PARTNER
                                        </button>
                                    </form>

                                    <button className="w-full py-4 rounded-2xl font-bold text-[10px] tracking-widest text-red-500 border border-red-50 hover:bg-red-50 transition-all uppercase">
                                        Reject / Pending
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}

                    {pendingMitras.length === 0 && (
                        <div className="text-center py-40 border-2 border-dashed border-slate-100 rounded-[40px]">
                            <p className="text-slate-300 font-bold uppercase tracking-[0.4em] text-[10px]">No New Partners</p>
                            <h2 className="text-3xl font-black text-slate-200 mt-4 italic">DATABASE IS CLEAN</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}