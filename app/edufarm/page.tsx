"use client";

import React, { useState, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import {
    BookOpen, Download, Lock, ChevronLeft, ChevronRight,
    Settings, Share2, ZoomIn, ShoppingCart, CheckCircle,
    FileText, PlayCircle, Trophy, X
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- SUB-KOMPONEN SIDEBAR ---
const SidebarIcon = ({ icon, active = false, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}
    >
        {icon}
    </button>
);

// --- KOMPONEN MODAL (UNTUK PIALA & SETTINGS) ---
const ActionModal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black italic uppercase text-slate-900 tracking-tighter">{title}</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- SUB-KOMPONEN BENEFIT ---
const BenefitItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle size={10} className="text-emerald-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 italic">{text}</span>
    </div>
);

// --- KOMPONEN HALAMAN BUKU ---
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode; number: number }>((props, ref) => {
    return (
        <div className="bg-white border-l border-slate-100 shadow-inner overflow-hidden w-full h-full" ref={ref}>
            <div className="p-10 h-full flex flex-col justify-between border-r border-slate-50">
                <div className="prose prose-slate">{props.children}</div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest italic">SenaFarm Edu</span>
                    <span className="text-[9px] font-bold text-slate-300 italic">Halaman {props.number}</span>
                </div>
            </div>
        </div>
    );
});
Page.displayName = "Page";

// --- KOMPONEN SERTIFIKAT MEWAH ---
const CertificatePreview = ({ userName = "Investor Hebat" }) => (
    <div className="relative w-full aspect-[1.4/1] bg-white p-1 border-[16px] border-double border-emerald-900 rounded-sm shadow-2xl overflow-hidden font-serif">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
            <Trophy size={300} className="text-emerald-900" />
        </div>

        <div className="relative h-full border border-emerald-200 p-8 flex flex-col items-center justify-between text-center">
            {/* Header */}
            <div>
                <h2 className="text-emerald-800 text-3xl font-black uppercase tracking-[0.2em] mb-1">Certificate of Completion</h2>
                <div className="w-48 h-[2px] bg-emerald-600 mx-auto" />
                <p className="mt-4 text-xs font-sans font-bold uppercase tracking-widest text-slate-500">Diberikan secara resmi kepada:</p>
            </div>

            {/* Nama User */}
            <div>
                <h1 className="text-5xl font-extrabold text-slate-900 mb-2 italic px-4 border-b-2 border-slate-100 min-w-[300px]">
                    {userName}
                </h1>
                <p className="text-sm text-slate-600 font-sans mt-4 italic">
                    Telah berhasil menyelesaikan seluruh rangkaian materi edukasi premium:
                </p>
                <p className="text-lg font-black text-emerald-700 uppercase tracking-tighter mt-1 font-sans">
                    Strategi Agribisnis 2026: Data-Driven Farming
                </p>
            </div>

            {/* Footer / Tanda Tangan */}
            <div className="w-full flex justify-between items-end px-10">
                <div className="text-left">
                    <p className="text-[10px] font-sans font-bold uppercase text-slate-400">Tanggal Terbit</p>
                    <p className="text-sm font-bold text-slate-800">28 Januari 2026</p>
                </div>

                {/* Seal/Stempel Digital */}
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-100 shadow-lg rotate-12">
                    <CheckCircle size={32} className="text-white" />
                </div>

                <div className="text-right">
                    <p className="text-[10px] font-sans font-bold uppercase text-slate-400">CEO Senabrata Capital</p>
                    <div className="w-32 h-[1px] bg-slate-300 my-1" />
                    <p className="text-sm font-black text-slate-900 italic">SenaFarm Official</p>
                </div>
            </div>
        </div>
    </div>
);

export default function EduFarmPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [hasAccess, setHasAccess] = useState(false);
    const [viewMode, setViewMode] = useState("flipbook"); // flipbook, single, video
    const [activeModal, setActiveModal] = useState<string | null>(null); // 'trophy' atau 'settings'
    const bookRef = useRef<any>(null);

    const FREE_PAGES_LIMIT = 3;

    const handlePurchase = () => {
        router.push("/register?redirect=edufarm&item=chili-2026");
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Strategi Agribisnis 2026',
                    url: window.location.href,
                });
            } catch (err) { console.log("Share cancelled"); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link disalin ke clipboard!");
        }
    };

    const onPageFlip = useCallback((e: any) => {
        setCurrentPage(e.data);
    }, []);

    const isActuallyLocked = !hasAccess && currentPage >= FREE_PAGES_LIMIT;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-500/30">

            {/* 1. SIDEBAR KONTROL */}
            <aside className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-20 hidden md:flex flex-col items-center py-8 border-r border-slate-200 bg-white z-50">
                <div
                    onClick={() => { setViewMode("flipbook"); setActiveModal(null); }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-12 shadow-xl cursor-pointer transition-all ${viewMode === "flipbook" ? 'bg-slate-900 text-white shadow-slate-300' : 'bg-slate-100 text-slate-400'}`}
                >
                    <BookOpen size={24} />
                </div>

                <nav className="flex flex-col gap-4">
                    <SidebarIcon
                        icon={<FileText size={20} />}
                        active={viewMode === "single"}
                        onClick={() => { setViewMode("single"); setActiveModal(null); }}
                    />
                    <SidebarIcon
                        icon={<PlayCircle size={20} />}
                        active={viewMode === "video"}
                        onClick={() => { setViewMode("video"); setActiveModal(null); }}
                    />
                    <SidebarIcon
                        icon={<Trophy size={20} />}
                        active={activeModal === 'trophy'}
                        onClick={() => setActiveModal('trophy')}
                    />

                    <div className="h-[1px] w-8 bg-slate-100 my-4" />

                    <SidebarIcon
                        icon={<Settings size={20} />}
                        active={activeModal === 'settings'}
                        onClick={() => setActiveModal('settings')}
                    />

                    <button
                        onClick={handleShare}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500 border-2 border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <Share2 size={20} />
                    </button>
                </nav>
            </aside>

            {/* 2. MODALS */}
            <ActionModal
                isOpen={activeModal === 'trophy'}
                onClose={() => setActiveModal(null)}
                title="Pencapaian Kamu"
            >
                <div className="space-y-4 text-center">
                    <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-emerald-200">
                            <Trophy size={28} />
                        </div>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Status Belajar</p>
                        <p className="text-xl font-black text-slate-900 italic">3 / 10 Materi</p>
                    </div>
                    <p className="text-sm text-slate-500 italic px-4">Selesaikan semua halaman modul untuk klaim sertifikat resmi SenaFarm.</p>
                    <button className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest cursor-not-allowed">Klaim Sertifikat</button>
                </div>
            </ActionModal>

            <ActionModal
                isOpen={activeModal === 'settings'}
                onClose={() => setActiveModal(null)}
                title="Pengaturan"
            >
                <div className="space-y-3">
                    <button onClick={() => router.push('/register')} className="w-full p-4 hover:bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between transition-all group">
                        <div className="flex items-center gap-3">
                            <Settings size={18} className="text-slate-400 group-hover:rotate-90 transition-transform" />
                            <span className="text-sm font-bold text-slate-700 italic">Lengkapi Data Pengiriman</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                    </button>
                    <button className="w-full p-4 hover:bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between transition-all">
                        <div className="flex items-center gap-3">
                            <Download size={18} className="text-slate-400" />
                            <span className="text-sm font-bold text-slate-700 italic">Unduh Invoice Pembelian</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300" />
                    </button>
                </div>
            </ActionModal>

            {/* 3. MAIN CONTENT AREA */}
            <main className="md:ml-20 min-h-screen pt-[64px]">
                <section className="p-6 md:p-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* DYNAMIC VIEWER */}
                    <div className="lg:col-span-8 group relative">

                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] italic mb-1 block">Module Series</span>
                                <h1 className="text-2xl font-black italic uppercase text-slate-900">
                                    {viewMode === "video" ? "Video Tutorial" : viewMode === "single" ? "Full Article View" : "Strategi Agribisnis 2026"}
                                </h1>
                            </div>
                            {viewMode === "flipbook" && (
                                <div className="text-[10px] font-bold text-slate-400 italic bg-slate-100 px-3 py-1 rounded-full">
                                    Hal {currentPage + 1}
                                </div>
                            )}
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-slate-100/50 rounded-[3rem] p-4 md:p-10 border border-slate-200 shadow-inner min-h-[600px] overflow-hidden">

                            {viewMode === "video" ? (
                                <div className="w-full relative group">
                                    {/* Kontainer Video/Slideshow */}
                                    <div className="w-full aspect-video bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-800 relative">

                                        {/* Animasi Background (Seolah-olah video lagi loading/preview) */}
                                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80')] bg-cover bg-center animate-pulse" />

                                        {/* Overlay Gelap */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                                        {/* Konten Tengah */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                            {!hasAccess ? (
                                                <>
                                                    {/* Tampilan Sebelum Beli (The Teaser) */}
                                                    <div className="relative mb-6">
                                                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-bounce cursor-pointer hover:scale-110 transition-transform"
                                                            onClick={handlePurchase}>
                                                            <PlayCircle size={40} fill="currentColor" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-2">
                                                        Masterclass: <span className="text-emerald-400">Teknik Irigasi 2026</span>
                                                    </h3>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
                                                        Preview Mode: Auto-Switching Pages...
                                                    </p>

                                                    {/* Progress Bar Slideshow Palsu */}
                                                    <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                                                        <div className="h-full bg-emerald-500 animate-[progress_3s_infinite]" style={{ width: '100%' }} />
                                                    </div>
                                                </>
                                            ) : (
                                                /* Tampilan Setelah Beli (Video Player) */
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <iframe
                                                        className="w-full h-full"
                                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Ganti dengan ID video kamu nanti
                                                        title="SenaFarm Video"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Status Tag */}
                                        <div className="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                            Exclusive Content
                                        </div>
                                    </div>

                                    {/* Info Tambahan di Bawah Video */}
                                    <div className="mt-6 p-6 bg-white border border-slate-200 rounded-[2rem] flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900 uppercase italic">Modul Pendamping</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">PDF Terlampir (12.4 MB)</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handlePurchase}
                                            className="bg-slate-900 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            ) : viewMode === "single" ? (
                                /* --- TAMPILAN SINGLE PAGE / ARTIKEL YANG SUPER LICIN --- */
                                <div className="w-full bg-white rounded-[2rem] p-6 md:p-12 shadow-xl overflow-y-auto max-h-[750px] scroll-smooth selection:bg-emerald-100">
                                    <article className="prose prose-emerald lg:prose-lg max-w-none">
                                        {/* Header Artikel */}
                                        <div className="border-b-4 border-emerald-500 w-20 mb-8" />
                                        <h2 className="text-4xl font-black uppercase text-slate-900 tracking-tighter mb-4 leading-tight">
                                            Strategi Agribisnis 2026: <br />
                                            <span className="text-emerald-600 italic">Data-Driven Farming</span>
                                        </h2>

                                        <p className="text-slate-500 font-medium italic leading-relaxed mb-8">
                                            Oleh Tim Riset Senabrata Capital • 5 Menit Membaca
                                        </p>

                                        {/* Konten dengan spasi yang lebih lega biar enak dibaca */}
                                        <div className="space-y-6 text-slate-600 font-medium italic leading-loose">
                                            <p>
                                                Pertanian modern di tahun 2026 bukan lagi tentang menebak cuaca, melainkan tentang membaca data presisi.
                                                Dengan integrasi teknologi sensor tanah dan AI, kita bisa menekan biaya pupuk hingga 30%.
                                            </p>

                                            <div className="my-10 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-center group hover:border-emerald-500 transition-colors">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                                    <ZoomIn className="text-emerald-500" />
                                                </div>
                                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Visualisasi Data ROI Premium</p>
                                                <p className="text-[10px] mt-2 text-slate-300">Hanya tersedia untuk akun terverifikasi</p>
                                            </div>

                                            <p>
                                                Analisis pasar menunjukkan bahwa komoditas cabai merah akan tetap menjadi primadona.
                                                Namun, tantangan utamanya adalah rantai pasok. Itulah kenapa SenaFarm hadir...
                                            </p>

                                            {/* Filler teks biar bisa dicoba scroll-nya */}
                                            <p>
                                                Keberlanjutan adalah kunci. Investasi pada sistem irigasi tetes otomatis
                                                memang besar di awal, namun *payback period* hanya berkisar antara 14-18 bulan.
                                            </p>

                                            <p>
                                                Jangan lupa untuk selalu memantau indeks harga harian di dashboard Senabrata
                                                agar tidak terjebak dalam fluktuasi harga tengkulak yang tidak stabil.
                                            </p>
                                        </div>
                                    </article>
                                </div>
                            ) : (
                                <>
                                    {/* @ts-ignore */}
                                    <HTMLFlipBook
                                        width={450} height={600} size="stretch"
                                        minWidth={315} maxWidth={1000}
                                        minHeight={400} maxHeight={1533}
                                        flippingTime={1000} useMouseEvents={true}
                                        swipeDistance={30} showPageCorners={true}
                                        maxShadowOpacity={0.3} disableFlipByClick={false}
                                        onFlip={onPageFlip}
                                        className={`shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-1000 ${isActuallyLocked ? 'blur-xl grayscale pointer-events-none' : ''}`}
                                        ref={bookRef}
                                    >
                                        <div className="bg-emerald-600 p-12 flex flex-col justify-center items-center text-center shadow-2xl">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6"><BookOpen className="text-white" size={32} /></div>
                                            <h1 className="text-4xl font-black italic uppercase text-white leading-none mb-4">Mastering<br />Agri-Profit</h1>
                                            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-100 uppercase italic">SenaFarm Premium</p>
                                        </div>

                                        <Page number={1}>
                                            <h3 className="text-2xl font-black italic uppercase text-emerald-600 mb-6">Introduction</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium mb-4 italic">Dunia pertanian 2026 bukan lagi soal cangkul, tapi soal data dan presisi.</p>
                                        </Page>

                                        <Page number={2}>
                                            <h3 className="text-2xl font-black italic uppercase text-emerald-600 mb-6">Market Analysis</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium italic">Cabai merah diprediksi akan mengalami lonjakan harga sebesar 40% pada kuartal ketiga...</p>
                                        </Page>

                                        <Page number={3}>
                                            <div className="flex flex-col items-center justify-center h-full text-center opacity-20">
                                                <Lock size={48} className="mb-4 text-slate-300" />
                                                <h3 className="text-xl font-black italic uppercase text-slate-400">Halaman Inti Terkunci</h3>
                                            </div>
                                        </Page>
                                    </HTMLFlipBook>

                                    {isActuallyLocked && (
                                        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md p-10 text-center transition-all duration-500">
                                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                                                <Lock size={40} className="text-emerald-600" />
                                            </div>
                                            <h3 className="text-3xl font-black italic uppercase text-slate-900 mb-4 tracking-tighter">Ups! Halaman Terbatas</h3>
                                            <button onClick={handlePurchase} className="group flex items-center gap-4 bg-emerald-600 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-tighter hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/20">
                                                <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                                                Beli Sekarang — Rp 49.000
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {viewMode === "flipbook" && (
                            <div className="flex justify-center gap-6 mt-8">
                                <button
                                    onClick={() => bookRef.current?.pageFlip().flipPrev()}
                                    className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-lg transition-all active:scale-90"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => bookRef.current?.pageFlip().flipNext()}
                                    className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-emerald-600 shadow-lg transition-all active:scale-90"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* SIDE INFO */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                            <h4 className="text-emerald-600 text-[10px] font-black uppercase tracking-widest italic mb-6">Materi Utama</h4>
                            <div className="flex flex-col gap-5">
                                <BenefitItem text="Rahasia Pemupukan Fase Generatif" />
                                <BenefitItem text="Analisis ROI & Break Even Point" />
                                <BenefitItem text="Sistem Irigasi Tetes Otomatis" />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200 overflow-hidden relative group">
                            <Trophy className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform" />
                            <h4 className="text-white font-black italic uppercase text-lg mb-2">Sertifikasi Mitra</h4>
                            <p className="text-slate-400 text-xs mb-6">Dapatkan sertifikat resmi setelah menyelesaikan modul ini.</p>
                            <button className="text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Lihat Contoh Sertifikat</button>
                        </div>
                        <ActionModal isOpen={activeModal === 'trophy'} onClose={() => setActiveModal(null)} title="Sertifikat Digital">
                            <div className="space-y-6">
                                {/* Tampilan Sertifikat Kecil */}
                                <div className="scale-[0.6] origin-top -mb-28">
                                    <CertificatePreview userName="User SenaFarm" />
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-slate-500 italic mb-4">
                                        Selesaikan semua halaman (3/10) untuk mengunduh versi PDF resolusi tinggi.
                                    </p>
                                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                        <Download size={18} /> Unduh Sertifikat (Segera)
                                    </button>
                                </div>
                            </div>
                        </ActionModal>
                    </div>

                </section>
            </main>
        </div>
    );
}