import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

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

// Düzenli işlem ekleme (POST metodu)
export async function POST(request: Request) {
  try {
    // Gelen veriyi al
    const data = await request.json();
    console.log('Düzenli İşlem Ekleme - Gelen veri:', data);
    
    // Veri doğrulama
    // Zorunlu alanlar
    if (!data.title || !data.title.trim()) {
      return NextResponse.json({ message: 'Başlık alanı zorunludur.' }, { status: 400 });
    }
    
    // Başlık uzunluğu kontrolü
    if (data.title.length > 100) {
      return NextResponse.json({ message: 'Başlık en fazla 100 karakter olabilir.' }, { status: 400 });
    }
    
    // Tutar kontrolü
    const amount = Number(data.amount);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ message: 'Geçerli bir tutar girmelisiniz.' }, { status: 400 });
    }
    
    // Tarih formatları kontrolü
    const startDate = new Date(data.startDate);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json({ message: 'Geçerli bir başlangıç tarihi girmelisiniz.' }, { status: 400 });
    }
    
    // Bitiş tarihi varsa kontrol et
    let endDate = null;
    if (data.endDate) {
      endDate = new Date(data.endDate);
      if (isNaN(endDate.getTime())) {
        return NextResponse.json({ message: 'Geçerli bir bitiş tarihi girmelisiniz.' }, { status: 400 });
      }
      
      // Bitiş tarihi başlangıç tarihinden sonra olmalı
      if (endDate < startDate) {
        return NextResponse.json({ message: 'Bitiş tarihi başlangıç tarihinden önce olamaz.' }, { status: 400 });
      }
    }
    
    // Türü kontrol et
    if (!['expense', 'income'].includes(data.type)) {
      return NextResponse.json({ message: 'Geçersiz tür: sadece "expense" veya "income" olabilir.' }, { status: 400 });
    }
    
    // Sıklık kontrolü
    if (!['weekly', 'monthly', 'quarterly', 'annually'].includes(data.frequency)) {
      return NextResponse.json({ 
        message: 'Geçersiz sıklık: sadece "weekly", "monthly", "quarterly" veya "annually" olabilir.' 
      }, { status: 400 });
    }
    
    // Veri hazırlama
    const recurringTransaction = {
      id: randomUUID(), // Unique ID oluşturulması gerekiyor
      title: data.title.trim(),
      amount: amount,
      type: data.type,
      frequency: data.frequency,
      startDate: startDate,
      endDate: endDate,
      isActive: data.isActive === undefined ? true : Boolean(data.isActive),
      category: data.category || 'diğer',
      description: data.description || null,
      contactId: data.contactId || null,
      paymentMethod: data.paymentMethod || null,
      dayOfMonth: data.dayOfMonth ? Number(data.dayOfMonth) : null,
      dayOfWeek: data.dayOfWeek ? Number(data.dayOfWeek) : null,
      updatedAt: new Date(), // Şemada required olduğu için eklenmeli
    };
    
    // Veritabanına kaydet
    const result = await prisma.recurringTransaction.create({
      data: recurringTransaction
    });
    
    console.log('Düzenli İşlem başarıyla eklendi:', result.id);
    
    return NextResponse.json({ 
      message: 'Düzenli işlem başarıyla eklendi.', 
      id: result.id 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Düzenli işlem ekleme hatası:', error);
    
    // Hata ayrıntısı varsa göster
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Düzenli işlem eklenirken bir hata oluştu.';
      
    // Hata mesajını ayrıştır ve daha açıklayıcı mesajlar oluştur
    if (errorMessage.includes('invalid input syntax')) {
      return NextResponse.json({ 
        message: 'Veri tipi hatası: Lütfen girdiğiniz değerleri kontrol edin.' 
      }, { status: 400 });
    }
    
    if (errorMessage.includes('not match the expected pattern')) {
      return NextResponse.json({ 
        message: 'Bir veya daha fazla alan beklenen formatta değil. Lütfen tüm alanları kontrol edin.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 