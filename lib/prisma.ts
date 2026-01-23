import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Mencegah multiple instances Prisma Client di development
const prismaClientSingleton = () => {
  try {
    // Mask the password when logging the DATABASE_URL
    const raw = process.env.DATABASE_URL ?? ''
    const masked = raw.replace(/:(.*)@/, ':<hidden_password>@')
    console.info('[prisma] connecting with', masked)

    // Create a Postgres adapter factory using the connection string
    const pgAdapter = new PrismaPg({ connectionString: raw })

    return new PrismaClient({ adapter: pgAdapter })
  } catch (e: any) {
    console.error('[prisma] initialization failed:')
    console.error('name:', e?.name)
    console.error('message:', e?.message)
    if (e?.stack) console.error('stack:', e.stack)
    console.error('[prisma] diagnostics:')
    console.error('- Confirm `.env` DATABASE_URL is correct and matches Supabase project')
    console.error("- Check network/firewall and that Supabase project is active")
    console.error("- If you're behind a corporate VPN, try disabling it")
    console.error("- If needed, run: npx prisma db push to reproduce the error locally")
    throw e
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma