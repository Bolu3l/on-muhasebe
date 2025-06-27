import { NextResponse } from 'next/server';
import { recurringOperations } from '@/lib/supabase-db';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    console.log('Düzenli İşlemler API - Supabase kullanılıyor');
    
    // Düzenli işlemleri Supabase'den getir
    const transactions = await recurringOperations.getAll();
    
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
      id: randomUUID(), // Unique ID oluştur
      title: data.title.trim(),
      amount: amount,
      type: data.type,
      frequency: data.frequency,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      isActive: data.isActive === undefined ? true : Boolean(data.isActive),
      category: data.category || 'diğer',
      description: data.description || null,
      contactId: data.contactId || null,
      paymentMethod: data.paymentMethod || null,
      dayOfMonth: data.dayOfMonth ? Number(data.dayOfMonth) : null,
      dayOfWeek: data.dayOfWeek ? Number(data.dayOfWeek) : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Supabase'e kaydet
    const result = await recurringOperations.create(recurringTransaction);
    
    console.log('Düzenli İşlem başarıyla Supabase\'e eklendi:', result.id);
    
    return NextResponse.json({ 
      message: 'Düzenli işlem başarıyla eklendi.', 
      id: result.id 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Düzenli işlem Supabase ekleme hatası:', error);
    
    // Hata ayrıntısı varsa göster
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Düzenli işlem eklenirken bir hata oluştu.';
      
    return NextResponse.json({ 
      message: errorMessage,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 