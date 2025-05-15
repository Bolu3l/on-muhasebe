import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Belirli ID'ye sahip faturayı getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura detayları istendi, ID: ${id}`);
    
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        InvoiceFile: true,
        customer: true,
        items: true
      }
    });
    
    if (!invoice) {
      return NextResponse.json({ error: 'Fatura bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json(invoice);
  } catch (error) {
    console.error('Fatura detayları alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Fatura detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip faturayı sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura silme isteği, ID: ${id}`);
    
    // Faturanın var olup olmadığını kontrol et
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        InvoiceFile: true
      }
    });
    
    if (!invoice) {
      return NextResponse.json({ error: 'Silinecek fatura bulunamadı' }, { status: 404 });
    }
    
    // Faturayı sil (Önce ilişkili dosyalar da silinecek - cascade)
    await prisma.invoice.delete({
      where: { id }
    });
    
    console.log(`Fatura başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Fatura başarıyla silindi',
      id 
    });
  } catch (error) {
    console.error('Fatura silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Fatura silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 