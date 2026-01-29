// Gunakan path absolut untuk memanggil Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Menjalankan Protokol Seeding Terakhir...');
  
  try {
    // 1. Tes Koneksi
    await prisma.$connect();
    console.log('🔗 Koneksi ke Supabase Oke!');

    // 2. Isi Data Mitra (Hanya kolom yang 100% ada di schema)
    const m1 = await prisma.mitra.upsert({
      where: { email: 'admin@senabrata.com' },
      update: {},
      create: {
        name: 'Senabrata Inti Pusat',
        email: 'admin@senabrata.com',
        status: 'ACTIVE',
        isVerified: true,
        address: 'Kantor Pusat Senabrata'
      }
    });
    console.log('✅ Mitra Pusat Berhasil Masuk!');

    // 3. Isi Data Produk
    await prisma.product.create({
      data: {
        name: 'Produk Tester Senabrata',
        price: 150000,
        stock: 10,
        category: 'Sample',
        mitraName: m1.name
      }
    });
    console.log('✅ Produk Tester Berhasil Masuk!');

  } catch (error) {
    console.error('❌ Waduh, "Beliau" Ngambek Lagi:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();