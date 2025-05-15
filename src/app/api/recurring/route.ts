import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Veritabanı bağlantısını ve URL'yi logla
    console.log('Düzenli İşlemler API - Veritabanı URL:', process.env.DATABASE_URL);
    
    // Bağlantı testi
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Düzenli İşlemler API - Veritabanı testi başarılı:', dbTest);
    
    // Düzenli işlem sayısını kontrol et
    const count = await prisma.recurringTransaction.count();
    console.log(`Düzenli İşlemler API - RecurringTransaction tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      return NextResponse.json([]);
    }
    
    // Düzenli işlemleri getir
    const transactions = await prisma.recurringTransaction.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        type: true,
        category: true,
        frequency: true,
        startDate: true,
        endDate: true,
        isActive: true,
        Contact: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Düzenli İşlemler API - ${transactions.length} düzenli işlem getirildi.`);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedTransactions = transactions.map(transaction => ({
      ...transaction,
      amount: transaction.amount ? Number(transaction.amount.toString()) : 0
    }));
    
    return NextResponse.json(processedTransactions);
    
  } catch (error) {
    console.error('Düzenli İşlemler API hatası:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 