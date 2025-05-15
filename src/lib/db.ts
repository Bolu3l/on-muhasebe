// Bu dosya veritabanı bağlantısını yönetir
// Burada kendi veritabanı türünüze göre bağlantı kodunu ayarlayabilirsiniz
// Örnek olarak, yaygın kullanılan Prisma ORM kullanımını gösteriyorum

import { PrismaClient } from '@prisma/client';

// PrismaClient instance global olarak tutulur
// Bu, hot reload sırasında birden fazla bağlantı oluşturulmasını önler
const globalForPrisma = global as unknown as { prisma: PrismaClient };

console.log('Prisma istemcisi oluşturuluyor...');
console.log('Veritabanı URL:', process.env.DATABASE_URL);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

console.log('Prisma istemcisi oluşturuldu.');

// Geliştirme ortamında, hot reload sırasında birden fazla bağlantı oluşmamasını sağlar
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 