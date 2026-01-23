require('dotenv/config');
const { Client } = require('pg');

const sql = `
CREATE TABLE "public"."product" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "weight" TEXT,
  "height" TEXT,
  "lineage" TEXT,
  "location" TEXT,
  "description" TEXT,
  "mitraName" TEXT,
  "img" TEXT,
  "category" TEXT,
  "stock" INTEGER NOT NULL DEFAULT 1,
  "totalStock" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "public"."CharityLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "amount" DOUBLE PRECISION NOT NULL,
  "message" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log('Connected to database');
    await client.query(sql);
    console.log('✓ Tables created successfully');
  } catch (err) {
    console.error('✗ Error:', err.message);
  } finally {
    await client.end();
    process.exit(0);
  }
})();
