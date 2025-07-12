import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';
import { validateRequestData } from '@/lib/api-utils';

// GET tüm fiş giderlerini getir veya filtrele (Prisma)
export async function GET(request: Request) {
  try {
    console.log('Fiş giderleri istendi - Prisma kullanılıyor');
    
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
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Kullanıcının fiş giderlerini getir
    let whereClause: any = { userId: decoded.userId };
    
    // Kategori filtreleme
    if (category) {
      whereClause.category = category;
    }
    
    const receipts = await prisma.receiptExpense.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    // Decimal alanları dönüştür
    const formattedReceipts = receipts.map((receipt: any) => ({
      ...receipt,
      amount: receipt.amount ? Number(receipt.amount.toString()) : 0,
      taxAmount: receipt.taxAmount ? Number(receipt.taxAmount.toString()) : 0,
      taxRate: receipt.taxRate ? Number(receipt.taxRate.toString()) : 0,
      totalAmount: receipt.totalAmount ? Number(receipt.totalAmount.toString()) : 0
    }));
    
    console.log(`${formattedReceipts.length} fiş gideri Prisma'dan getirildi`);
    return NextResponse.json(formattedReceipts);
  } catch (error: any) {
    console.error('Fiş giderleri Prisma\'dan alınırken hata oluştu:', error);
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

    // Fiş giderini Prisma'ya ekle
    const receipt = await prisma.receiptExpense.create({
      data: {
        userId: decoded.userId,
        companyId: companyId,
        title: data.title,
        description: data.description || null,
        amount: amount,
        expenseDate: expenseDate,
        category: data.category,
        receiptNumber: data.receiptNumber || null,
        taxRate: taxRate,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        paymentMethod: data.paymentMethod || 'cash',
        contactId: data.contactId || null,
        receiptImageUrl: data.receiptImageUrl || null,
        isVerified: data.isVerified || false,
      }
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
      expenseDate: expenseDate ? expenseDate.toISOString() : existingReceipt.expenseDate,
      category: data.category || existingReceipt.category,
      receiptNumber: data.receiptNumber !== undefined ? data.receiptNumber : existingReceipt.receiptNumber,
      taxRate: taxRate,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
      paymentMethod: data.paymentMethod || existingReceipt.paymentMethod,
      contactId: data.contactId !== undefined ? data.contactId : existingReceipt.contactId,
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