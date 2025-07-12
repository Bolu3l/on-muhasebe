// Vercel serverless için optimize edilmiş Prisma client
import { PrismaClient } from '../generated/prisma';

// Global PrismaClient instance - hem development hem production için
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prisma client factory function
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

// Singleton pattern - hem development hem production için
export const prisma = globalForPrisma.prisma || createPrismaClient();

// Global'e kaydet - hot reload ve serverless için
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown için
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
} 