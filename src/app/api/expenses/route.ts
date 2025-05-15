import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Veritabanı bağlantısını ve URL'yi logla
    console.log('Giderler API - Veritabanı URL:', process.env.DATABASE_URL);
    
    // Bağlantı testi
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Giderler API - Veritabanı testi başarılı:', dbTest);
    
    // Gider sayısını kontrol et
    const count = await prisma.expense.count();
    console.log(`Giderler API - Expense tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      return NextResponse.json([]);
    }
    
    // Giderleri getir
    const expenses = await prisma.expense.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        expenseDate: true,
        category: true,
        status: true,
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
    
    console.log(`Giderler API - ${expenses.length} gider getirildi.`);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedExpenses = expenses.map(expense => ({
      ...expense,
      amount: expense.amount ? Number(expense.amount.toString()) : 0
    }));
    
    return NextResponse.json(processedExpenses);
    
  } catch (error) {
    console.error('Giderler API hatası:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 