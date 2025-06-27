import { NextResponse } from 'next/server';
import { expenseOperations } from '@/lib/supabase-db';
import crypto from 'crypto';

export async function GET() {
  try {
    console.log('Giderler API - Supabase kullanılıyor');
    
    // Giderleri Supabase'den getir
    const expenses = await expenseOperations.getAll();
    
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

export async function POST(request: Request) {
  try {
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
    
    // Eksik alanları varsayılan değerlerle doldur
    const expenseData = {
      id: crypto.randomUUID(), // Yeni bir ID oluştur
      title: data.title,
      description: data.description || '',
      amount: amount,
      expenseDate: new Date(data.expenseDate),
      category: data.category || 'diğer',
      paymentMethod: data.paymentMethod || 'nakit',
      status: data.status || 'pending',
      receiptUrl: data.receiptUrl || null,
      supplierId: data.supplierId || null,
      updatedAt: new Date()
    };
    
    const expense = await expenseOperations.create(expenseData);
    
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