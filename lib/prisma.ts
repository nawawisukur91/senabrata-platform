// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg' // Pastikan sudah install: npm install pg @types/pg

const prismaClientSingleton = () => {
  try {
    const raw = process.env.DATABASE_URL ?? ''
    
    // Log aman (password disembunyikan)
    const masked = raw.replace(/:(.*)@/, ':<hidden_password>@')
    console.info('[prisma] connecting with', masked)

    // Logika adapter-pg yang lebih stabil
    const pool = new Pool({ connectionString: raw })
    const adapter = new PrismaPg(pool)

    return new PrismaClient({ adapter })
  } catch (e: any) {
    console.error('[prisma] initialization failed:', e.message)
    throw e
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Gunakan globalThis supaya tidak kena "Multiple Instances" pas save-save kodingan (HMR)
export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma