import { NextResponse } from 'next/server';
import { receiptExpenseOperations } from '@/lib/supabase-db';
import { validateRequestData } from '@/lib/api-utils';

// GET tüm fiş giderlerini getir veya filtrele (Supabase)
export async function GET(request: Request) {
  try {
    console.log('Fiş giderleri istendi - Supabase kullanılıyor');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Tüm makbuzları Supabase'den getir
    let receipts = await receiptExpenseOperations.getAll();
    
    // Kategori filtreleme (client-side filtering)
    if (category) {
      receipts = receipts.filter((receipt: any) => receipt.category === category);
    }
    
    // Decimal alanları dönüştür - string olarak döndür
    const formattedReceipts = receipts.map((receipt: any) => ({
      ...receipt,
      amount: receipt.amount ? Number(receipt.amount.toString()) : 0,
      taxAmount: receipt.taxAmount ? Number(receipt.taxAmount.toString()) : 0,
      taxRate: receipt.taxRate ? Number(receipt.taxRate.toString()) : 0,
      totalAmount: receipt.totalAmount ? Number(receipt.totalAmount.toString()) : 0
    }));
    
    console.log(`${formattedReceipts.length} fiş gideri Supabase'den getirildi`);
    return NextResponse.json(formattedReceipts);
  } catch (error: any) {
    console.error('Fiş giderleri Supabase\'den alınırken hata oluştu:', error);
    return NextResponse.json({ error: 'Fiş giderleri alınamadı' }, { status: 500 });
  }
}

// POST yeni fiş gideri ekle
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Gerekli alanları doğrula
    const requiredFields = ['title', 'amount', 'expenseDate', 'category'];
    const validationResult = validateRequestData(data, requiredFields);
    
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: `Eksik veri: ${validationResult.missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Tarih formatını kontrol et ve düzelt
    let expenseDate = data.expenseDate;
    if (typeof expenseDate === 'string') {
      expenseDate = new Date(expenseDate);
    }
    
    // Tutar hesaplamalarını kontrol et
    const amount = parseFloat(data.amount);
    const taxRate = data.taxRate ? parseFloat(data.taxRate) : 0;
    const taxAmount = data.taxAmount ? parseFloat(data.taxAmount) : (amount * taxRate) / 100;
    const totalAmount = amount + taxAmount;
    
    // Fiş giderini Supabase'e ekle
    const receipt = await receiptExpenseOperations.create({
      title: data.title,
      description: data.description || null,
      amount: amount,
      date: expenseDate.toISOString(), // expenseDate yerine date kullan (DB schema'ya göre)
      category: data.category,
      receiptNumber: data.receiptNumber || null,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      paymentMethod: data.paymentMethod || 'cash',
      supplierId: data.supplierId || null,
      receiptImageUrl: data.receiptImageUrl || null,
      isVerified: data.isVerified || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return NextResponse.json(receipt, { status: 201 });
  } catch (error) {
    console.error('Fiş gideri eklenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Fiş gideri eklenemedi' }, { status: 500 });
  }
}

// PUT fiş giderini güncelle
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // ID kontrolü
    if (!data.id) {
      return NextResponse.json({ error: 'ID bilgisi gerekli' }, { status: 400 });
    }
    
    // Fiş giderinin var olduğunu kontrol et - Supabase'de
    let existingReceipt;
    try {
      existingReceipt = await receiptExpenseOperations.getById(data.id);
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Fiş gideri bulunamadı' }, { status: 404 });
      }
      throw error;
    }
    
    if (!existingReceipt) {
      return NextResponse.json({ error: 'Fiş gideri bulunamadı' }, { status: 404 });
    }
    
    // Tarih formatını kontrol et ve düzelt
    let expenseDate = data.expenseDate;
    if (typeof expenseDate === 'string') {
      expenseDate = new Date(expenseDate);
    }
    
    // Tutar hesaplamalarını güncelle
    const amount = data.amount ? parseFloat(data.amount) : Number(existingReceipt.amount);
    const taxRate = data.taxRate !== undefined ? parseFloat(data.taxRate) : Number(existingReceipt.taxRate);
    const taxAmount = data.taxAmount !== undefined 
      ? parseFloat(data.taxAmount) 
      : (amount * taxRate) / 100;
    const totalAmount = amount + taxAmount;
    
    // Fiş giderini Supabase'de güncelle
    const updatedReceipt = await receiptExpenseOperations.update(data.id, {
      title: data.title || existingReceipt.title,
      description: data.description !== undefined ? data.description : existingReceipt.description,
      amount: amount,
      date: expenseDate ? expenseDate.toISOString() : existingReceipt.date,
      category: data.category || existingReceipt.category,
      receiptNumber: data.receiptNumber !== undefined ? data.receiptNumber : existingReceipt.receiptNumber,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      paymentMethod: data.paymentMethod || existingReceipt.paymentMethod,
      supplierId: data.supplierId !== undefined ? data.supplierId : existingReceipt.supplierId,
      receiptImageUrl: data.receiptImageUrl !== undefined ? data.receiptImageUrl : existingReceipt.receiptImageUrl,
      isVerified: data.isVerified !== undefined ? data.isVerified : existingReceipt.isVerified,
      updatedAt: new Date().toISOString()
    });
    
    return NextResponse.json(updatedReceipt);
  } catch (error) {
    console.error('Fiş gideri güncellenirken hata oluştu:', error);
    return NextResponse.json({ error: 'Fiş gideri güncellenemedi' }, { status: 500 });
  }
}

// DELETE fiş giderini sil
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID parametresi gerekli' }, { status: 400 });
    }
    
    // Fiş giderinin var olduğunu kontrol et - Supabase'de
    let receipt;
    try {
      receipt = await receiptExpenseOperations.getById(id);
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Fiş gideri bulunamadı' }, { status: 404 });
      }
      throw error;
    }
    
    if (!receipt) {
      return NextResponse.json({ error: 'Fiş gideri bulunamadı' }, { status: 404 });
    }
    
    // Fiş giderini Supabase'den sil
    await receiptExpenseOperations.delete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fiş gideri silinirken hata oluştu:', error);
    return NextResponse.json({ error: 'Fiş gideri silinemedi' }, { status: 500 });
  }
} 