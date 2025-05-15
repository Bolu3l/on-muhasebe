import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Prisma istemcisini logla
    console.log('Prisma istemcisi:', prisma);
    
    // Veritabanı bağlantısını test et
    console.log('Veritabanı bağlantısı test ediliyor...');
    console.log('Veritabanı URL:', process.env.DATABASE_URL);
    
    // Doğrudan veritabanı sorgusu yap
    const dbTest = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('Veritabanı zaman sorgusu sonucu:', dbTest);
    
    // Fatura kayıtlarını getir
    const invoices = await prisma.invoice.findMany({
      take: 3
    });
    
    // Ham veriyi logla
    console.log('Ham fatura verileri:', JSON.stringify(invoices));
    
    // Sonucu döndür
    return NextResponse.json({
      status: "success",
      message: "Veritabanı bağlantısı başarılı",
      dbTime: dbTest,
      invoiceCount: invoices.length,
      invoices: invoices.map(invoice => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.totalAmount.toString(), // Decimal tipini string'e çevir
        createdAt: invoice.createdAt
      }))
    });
  } catch (error) {
    console.error('DB-CHECK API hatası:', error);
    return NextResponse.json({
      status: "error",
      message: "Veritabanı bağlantısı başarısız",
      error: String(error)
    }, { status: 500 });
  }
} 