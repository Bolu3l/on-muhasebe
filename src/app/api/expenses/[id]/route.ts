import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Belirli ID'ye sahip gideri getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider detayları istendi, ID: ${id}`);
    
    const expense = await prisma.expense.findUnique({
      where: { id },
      include: {
        Contact: true
      }
    });
    
    if (!expense) {
      return NextResponse.json({ error: 'Gider bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json(expense);
  } catch (error) {
    console.error('Gider detayları alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Gider detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip gideri sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider silme isteği, ID: ${id}`);
    
    // Giderin var olup olmadığını kontrol et
    const expense = await prisma.expense.findUnique({
      where: { id }
    });
    
    if (!expense) {
      return NextResponse.json({ error: 'Silinecek gider bulunamadı' }, { status: 404 });
    }
    
    // Gideri sil
    await prisma.expense.delete({
      where: { id }
    });
    
    console.log(`Gider başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gider başarıyla silindi',
      id 
    });
  } catch (error) {
    console.error('Gider silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Gider silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 