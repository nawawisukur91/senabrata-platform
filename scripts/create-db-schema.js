const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

const createTablesSQL = `
DROP TABLE IF EXISTS "product" CASCADE;
DROP TABLE IF EXISTS "CharityLog" CASCADE;

CREATE TABLE IF NOT EXISTS "product" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weight VARCHAR(255),
  height VARCHAR(255),
  lineage VARCHAR(255),
  location VARCHAR(255),
  description TEXT,
  "mitraName" VARCHAR(255),
  img VARCHAR(255),
  category VARCHAR(255),
  stock INTEGER DEFAULT 1,
  "totalStock" INTEGER DEFAULT 1,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "CharityLog" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(10, 2) NOT NULL,
  message TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO "product" (name, price, description, stock, "totalStock")
VALUES 
  ('Sample Rice', 15000, 'High quality rice from Java', 100, 100),
  ('Sample Corn', 8000, 'Fresh corn from local farmers', 50, 50);

COMMIT;
`;

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('Creating database schema...');
    await client.query(createTablesSQL);
    console.log('✓ Database schema created successfully');
    
    // Verify tables exist
    const result = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('product', 'CharityLog')
    `);
    console.log('✓ Tables verified:', result.rows.map(r => r.table_name).join(', '));
  } catch (error) {
    console.error('✗ Error creating schema:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();
