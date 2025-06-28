import { NextRequest, NextResponse } from 'next/server';
import { invoiceOperations } from '@/lib/supabase-db';

// Belirli ID'ye sahip faturayı getir (Supabase)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura detayları istendi - Supabase kullanılıyor, ID: ${id}`);
    
    const invoice = await invoiceOperations.getById(id);
    
    if (!invoice) {
      return NextResponse.json({ error: 'Fatura bulunamadı' }, { status: 404 });
    }
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedInvoice = {
      ...invoice,
      amount: invoice.amount ? Number(invoice.amount.toString()) : 0,
      taxRate: invoice.taxRate ? Number(invoice.taxRate.toString()) : 0,
      taxAmount: invoice.taxAmount ? Number(invoice.taxAmount.toString()) : 0,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0
    };
    
    console.log(`Fatura detayları Supabase'den başarıyla getirildi: ${id}`);
    return NextResponse.json(processedInvoice);
  } catch (error) {
    console.error('Fatura detayları Supabase\'den alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Fatura detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip faturayı güncelle (Supabase)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    console.log(`Fatura güncelleme isteği - Supabase kullanılıyor, ID: ${id}`, body);
    
    // Faturanın var olup olmadığını kontrol et
    try {
      const invoice = await invoiceOperations.getById(id);
      if (!invoice) {
        return NextResponse.json({ error: 'Güncellenecek fatura bulunamadı' }, { status: 404 });
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') { // Supabase: no rows returned
        return NextResponse.json({ error: 'Güncellenecek fatura bulunamadı' }, { status: 404 });
      }
      throw error;
    }
    
    // Faturayı Supabase'de güncelle
    const updatedInvoice = await invoiceOperations.update(id, {
      ...body,
      updatedAt: new Date().toISOString()
    });
    
    console.log(`Fatura Supabase'de başarıyla güncellendi, ID: ${id}`);
    
    return NextResponse.json(updatedInvoice);
  } catch (error: any) {
    console.error('Fatura Supabase\'de güncellenirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Fatura güncellenirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip faturayı sil (Supabase)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura silme isteği - Supabase kullanılıyor, ID: ${id}`);
    
    // Faturanın var olup olmadığını kontrol et
    try {
      const invoice = await invoiceOperations.getById(id);
      if (!invoice) {
        return NextResponse.json({ error: 'Silinecek fatura bulunamadı' }, { status: 404 });
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') { // Supabase: no rows returned
        return NextResponse.json({ error: 'Silinecek fatura bulunamadı' }, { status: 404 });
      }
      throw error;
    }
    
    // Faturayı Supabase'den sil (İlişkili dosyalar cascade ile silinecek)
    await invoiceOperations.delete(id);
    
    console.log(`Fatura Supabase'den başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Fatura başarıyla silindi',
      id 
    });
  } catch (error: any) {
    console.error('Fatura Supabase\'den silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Fatura silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 