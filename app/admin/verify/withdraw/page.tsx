"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Import fungsi yang kita buat tadi
import { getPendingWithdrawals, processWithdrawalAction } from './actions';

export default function WithdrawalManagement() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getPendingWithdrawals();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleAction = async (id: string, type: "APPROVE" | "REJECT") => {
    if (type === "REJECT" && !confirm("Tolak penarikan ini?")) return;
    
    setIsProcessing(id);
    const result = await processWithdrawalAction(id, type);
    
    if (result.success) {
      alert(type === "APPROVE" ? "✅ Berhasil Disetujui!" : "❌ Berhasil Ditolak!");
      loadData();
    } else {
      alert("⚠️ Error: " + result.error);
    }
    setIsProcessing(null);
  };

  return (
    <div className="min-h-screen bg-white pt-32 px-8 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => router.back()} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Withdrawal <span className="text-green-600">Secure</span></h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-green-600" /></div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {requests.map((req) => (
                <div key={req.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase italic">{req.user?.fullName || 'No Name'}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">{req.user?.bankAccount || 'No Bank Data'}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <p className="text-lg font-black text-slate-900">Rp {req.amount.toLocaleString('id-ID')}</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleAction(req.id, "REJECT")} disabled={!!isProcessing} className="p-4 bg-slate-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                        <XCircle size={18} />
                      </button>
                      <button onClick={() => handleAction(req.id, "APPROVE")} disabled={!!isProcessing} className="p-4 bg-slate-900 text-green-500 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-xl">
                        {isProcessing === req.id ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && <div className="p-20 text-center text-slate-400 font-bold uppercase text-[10px]">Semua Beres, Bos!</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}