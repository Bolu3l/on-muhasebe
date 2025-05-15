import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { convertDecimalFields } from '@/lib/utils';

export async function GET() {
  try {
    // Veritabanı bağlantısını test et
    const dbTest = await prisma.$queryRaw`SELECT NOW() as current_time`;
    
    // Temel veri sayılarını al
    const invoiceCount = await prisma.invoice.count();
    const expenseCount = await prisma.expense.count();
    const recurringCount = await prisma.recurringTransaction.count();
    
    // İlk kayıtları örnek olarak getir
    const firstInvoice = await prisma.invoice.findFirst({
      select: {
        id: true,
        invoiceNumber: true,
        totalAmount: true
      }
    });
    
    const firstExpense = await prisma.expense.findFirst({
      select: {
        id: true,
        title: true,
        amount: true
      }
    });
    
    const firstRecurring = await prisma.recurringTransaction.findFirst({
      select: {
        id: true,
        title: true,
        amount: true
      }
    });

    // Decimal alanları doğru şekilde dönüştür
    const convertedInvoice = firstInvoice ? convertDecimalFields(firstInvoice) : null;
    const convertedExpense = firstExpense ? convertDecimalFields(firstExpense) : null;
    const convertedRecurring = firstRecurring ? convertDecimalFields(firstRecurring) : null;
    
    return NextResponse.json({
      status: "success",
      message: "Veritabanı bağlantısı başarılı",
      dbTime: dbTest,
      counts: {
        invoices: invoiceCount,
        expenses: expenseCount,
        recurring: recurringCount
      },
      examples: {
        invoice: convertedInvoice,
        expense: convertedExpense,
        recurring: convertedRecurring
      }
    });
  } catch (error) {
    console.error('API test hatası:', error);
    return NextResponse.json({
      status: "error",
      message: "Veritabanı bağlantısı başarısız",
      error: String(error)
    }, { status: 500 });
  }
} 