import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Ambil Data Produk
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) return notFound();

  // 2. Siapkan wadah data
  let allLogistics = [];
  let allBanks = [];

  try {
    // Gunakan Promise.all untuk kecepatan maksimal
    // Kita cast ke 'any' sebentar supaya Kuya (Turbopack) nggak protes saat inisialisasi awal
    const [logisticsData, banksData] = await Promise.all([
      (prisma as any).logistic.findMany(),
      (prisma as any).bank.findMany({ where: { isActive: true } })
    ]);
    
    allLogistics = logisticsData;
    allBanks = banksData;
  } catch (error) {
    console.error("Prisma Fetching Error, menggunakan data fallback:", error);
    
    // DATA FALLBACK: Biar bisnis Boss nggak berhenti gara-gara db error
    allLogistics = [
      { id: 'slog-1', name: 'SenaLog (Default)', price: 250000, type: 'SPECIAL_ANIMAL' },
      { id: 'jne-1', name: 'JNE Reguler', price: 25000, type: 'REGULAR' }
    ];
    allBanks = [
      { id: 'bca-1', name: 'BCA', code: 'BCA', accountNumber: '8820192931', accountName: 'PT SENABRATA CAPITAL' }
    ];
  }

  // Jika data logistik ternyata kosong di DB, pakai fallback juga
  if (allLogistics.length === 0) {
    allLogistics = [{ id: 'slog-1', name: 'SenaLog (Default)', price: 250000, type: 'SPECIAL_ANIMAL' }];
  }
  
  // Jika data bank ternyata kosong di DB, pakai fallback juga
  if (allBanks.length === 0) {
    allBanks = [{ id: 'bca-1', name: 'BCA', code: 'BCA', accountNumber: '8820192931', accountName: 'PT SENABRATA CAPITAL' }];
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <CheckoutClient 
        product={product} 
        dbLogistics={allLogistics} 
        dbBanks={allBanks} 
      />
    </div>
  );
}