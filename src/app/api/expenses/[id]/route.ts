import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';

// Belirli ID'ye sahip gideri getir (Prisma)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider detayları istendi - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    // Kullanıcının giderini getir
    const expense = await prisma.expense.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi giderini görebilsin
      }
    });
    
    if (!expense) {
      return NextResponse.json({ error: 'Gider bulunamadı' }, { status: 404 });
    }

    // Decimal değerleri sayıya dönüştür
    const processedExpense = {
      ...expense,
      amount: expense.amount ? Number(expense.amount.toString()) : 0,
      vatAmount: expense.vatAmount ? Number(expense.vatAmount.toString()) : 0,
      totalAmount: expense.totalAmount ? Number(expense.totalAmount.toString()) : 0
    };
    
    console.log(`Gider detayları Prisma'dan başarıyla getirildi: ${id}`);
    return NextResponse.json(processedExpense);
  } catch (error: any) {
    console.error('Gider detayları Prisma\'dan alınırken hata oluştu:', error);
    
    return NextResponse.json(
      { error: 'Gider detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip gideri sil (Prisma)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider silme isteği - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    // Giderin var olup olmadığını ve kullanıcının gideri olup olmadığını kontrol et
    const expense = await prisma.expense.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi giderini silebilsin
      }
    });
    
    if (!expense) {
      return NextResponse.json({ error: 'Silinecek gider bulunamadı' }, { status: 404 });
    }
    
    // Gideri Prisma'dan sil
    await prisma.expense.delete({
      where: { id: id }
    });
    
    console.log(`Gider Prisma'dan başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gider başarıyla silindi',
      id 
    });
  } catch (error: any) {
    console.error('Gider Prisma\'dan silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Gider silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 