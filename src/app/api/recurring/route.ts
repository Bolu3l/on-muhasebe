import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET(request: Request) {
  try {
    console.log('Düzenli İşlemler API - Prisma kullanılıyor');
    
    // Auth token'ını kontrol et
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    // Kullanıcının düzenli işlemlerini getir
    const transactions = await prisma.recurringTransaction.findMany({
      where: { userId: decoded.userId },
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
    // Auth token'ını kontrol et
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    // Kullanıcının ilk şirketini al
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { companies: true }
    });
    
    if (!user || user.companies.length === 0) {
      return NextResponse.json({ error: 'Kullanıcı veya şirket bulunamadı' }, { status: 404 });
    }
    
    const companyId = user.companies[0].id;
    
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
    
    // Türü kontrol et - küçük harften büyük harfe dönüştür
    const validTypes = ['expense', 'income'];
    if (!validTypes.includes(data.type?.toLowerCase())) {
      return NextResponse.json({ message: 'Geçersiz tür: sadece "expense" veya "income" olabilir.' }, { status: 400 });
    }
    
    // Sıklık kontrolü
    const validFrequencies = ['weekly', 'monthly', 'quarterly', 'annually'];
    if (!validFrequencies.includes(data.frequency?.toLowerCase())) {
      return NextResponse.json({ 
        message: 'Geçersiz sıklık: sadece "weekly", "monthly", "quarterly" veya "annually" olabilir.' 
      }, { status: 400 });
    }
    
    // Veri hazırlama
    const recurringTransaction = {
      id: randomUUID(), // Unique ID oluştur
      userId: decoded.userId,
      companyId: companyId,
      title: data.title.trim(),
      amount: amount,
      type: data.type?.toLowerCase() || 'expense',
      frequency: data.frequency?.toLowerCase() || 'monthly',
      startDate: startDate,
      endDate: endDate,
      isActive: data.isActive === undefined ? true : Boolean(data.isActive),
      category: data.category || 'diğer',
      description: data.description || null,
      contactId: data.contactId || null,
      paymentMethod: data.paymentMethod || null,
      dayOfMonth: data.dayOfMonth ? Number(data.dayOfMonth) : null,
      dayOfWeek: data.dayOfWeek ? Number(data.dayOfWeek) : null,
    };
    
    // Prisma'ya kaydet
    const result = await prisma.recurringTransaction.create({
      data: recurringTransaction as any
    });
    
    console.log('Düzenli İşlem başarıyla Prisma\'ya eklendi:', result.id);
    
    return NextResponse.json({ 
      message: 'Düzenli işlem başarıyla eklendi.', 
      id: result.id 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Düzenli işlem Prisma ekleme hatası:', error);
    
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

// Düzenli işlem silme (DELETE metodu)
export async function DELETE(request: Request) {
  try {
    // Auth token'ını kontrol et
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ message: 'ID parametresi gereklidir.' }, { status: 400 });
    }
    
    console.log('Düzenli İşlem Silme - ID:', id);
    
    // Önce işlemin var olup olmadığını ve kullanıcının işlemi olup olmadığını kontrol et
    const transaction = await prisma.recurringTransaction.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi işlemini silebilsin
      }
    });
    
    if (!transaction) {
      return NextResponse.json({ message: 'Silinecek düzenli işlem bulunamadı' }, { status: 404 });
    }
    
    // Prisma'dan sil
    await prisma.recurringTransaction.delete({
      where: { id: id }
    });
    
    console.log('Düzenli İşlem başarıyla Prisma\'dan silindi:', id);
    
    return NextResponse.json({ 
      message: 'Düzenli işlem başarıyla silindi.',
      id: id 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Düzenli işlem Prisma silme hatası:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Düzenli işlem silinirken bir hata oluştu.';
      
    return NextResponse.json({ 
      message: errorMessage,
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}