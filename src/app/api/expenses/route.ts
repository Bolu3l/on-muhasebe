import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import crypto from 'crypto';
import { validateToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    console.log('Giderler API - Prisma kullanılıyor');
    
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
    
    // Kullanıcının giderlerini getir
    const expenses = await prisma.expense.findMany({
      where: { userId: decoded.userId },
      orderBy: { expenseDate: 'desc' }
    });
    
    console.log(`Giderler API - ${expenses.length} gider getirildi.`);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedExpenses = expenses.map((expense: any) => ({
      ...expense,
      amount: expense.amount ? Number(expense.amount.toString()) : 0,
      vatAmount: expense.vatAmount ? Number(expense.vatAmount.toString()) : 0,
      totalAmount: expense.totalAmount ? Number(expense.totalAmount.toString()) : 0
    }));
    
    return NextResponse.json(processedExpenses);
    
  } catch (error) {
    console.error('Giderler API hatası:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

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
    
    const data = await request.json();
    console.log('Yeni gider verisi:', data);
    
    // Zorunlu alanların kontrolü
    if (!data.title || !data.amount || !data.expenseDate) {
      return NextResponse.json(
        { message: 'Başlık, tutar ve tarih alanları zorunludur' },
        { status: 400 }
      );
    }
    
    // Tutar sayısal değere dönüştürülüyor
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) {
      return NextResponse.json(
        { message: 'Geçersiz tutar değeri' },
        { status: 400 }
      );
    }
    
    // KDV tutarını hesapla
    const vatAmount = data.vatAmount ? parseFloat(data.vatAmount) : 0;
    const totalAmount = amount + vatAmount;
    
    // Status değerini enum'a uygun hale getir
    const mapStatus = (status: string) => {
      switch(status?.toLowerCase()) {
        case 'pending': return 'PENDING';
        case 'approved': return 'APPROVED';
        case 'rejected': return 'REJECTED';
        case 'paid': return 'PAID';
        default: return 'PENDING';
      }
    };

    // Eksik alanları varsayılan değerlerle doldur
    const expenseData = {
      id: crypto.randomUUID(),
      userId: decoded.userId,
      companyId: companyId,
      title: data.title,
      description: data.description || null,
      amount: amount,
      vatAmount: vatAmount,
      totalAmount: totalAmount,
      expenseDate: new Date(data.expenseDate),
      category: data.category || 'diğer',
      paymentMethod: data.paymentMethod || 'nakit',
      status: mapStatus(data.status),
      contactId: data.contactId || null,
      receiptNumber: data.receiptNumber || null,
      isDeductible: data.isDeductible !== undefined ? data.isDeductible : true,
    };
    
    const expense = await prisma.expense.create({
      data: expenseData as any
    });
    
    console.log('Yeni gider oluşturuldu:', expense.id);
    
    return NextResponse.json(expense, { status: 201 });
    
  } catch (error: any) {
    console.error('Gider ekleme hatası:', error);
    
    return NextResponse.json(
      { message: 'Gider eklenirken bir hata oluştu: ' + error.message },
      { status: 500 }
    );
  }
} 