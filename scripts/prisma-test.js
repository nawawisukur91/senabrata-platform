require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

async function run(){
  try{
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
    const client = new PrismaClient({ adapter });
    await client.$connect();
    console.log('connected');
    await client.$disconnect();
    process.exit(0);
  }catch(e){
    console.error('CONNECT ERROR:', e.name);
    console.error(e.message);
    if(e.stack) console.error(e.stack);
    process.exit(1);
  }
}

run();
