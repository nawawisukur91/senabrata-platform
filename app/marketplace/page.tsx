import { prisma } from "@/lib/prisma";
import MarketplaceClient from "./MarketplaceClient";
export default async function MarketplacePage() {
  // AMBIL DATA DARI DATABASE ASLI
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-20 font-sans">
      {/* Panggil file tampilan dan kasih datanya */}
      <MarketplaceClient initialProducts={products} />
    </div>
  );
}