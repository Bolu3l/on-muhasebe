import { NextRequest, NextResponse } from 'next/server';
import { expenseOperations } from '@/lib/supabase-db';

// Belirli ID'ye sahip gideri getir (Supabase)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider detayları istendi - Supabase kullanılıyor, ID: ${id}`);
    
    const expense = await expenseOperations.getById(id);
    
    if (!expense) {
      return NextResponse.json({ error: 'Gider bulunamadı' }, { status: 404 });
    }

    // Decimal değerleri sayıya dönüştür
    const processedExpense = {
      ...expense,
      amount: expense.amount ? Number(expense.amount.toString()) : 0
    };
    
    console.log(`Gider detayları Supabase'den başarıyla getirildi: ${id}`);
    return NextResponse.json(processedExpense);
  } catch (error: any) {
    console.error('Gider detayları Supabase\'den alınırken hata oluştu:', error);
    
    // Supabase no rows returned error
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Gider bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Gider detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip gideri sil (Supabase)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Gider silme isteği - Supabase kullanılıyor, ID: ${id}`);
    
    // Giderin var olup olmadığını kontrol et
    try {
      const expense = await expenseOperations.getById(id);
      if (!expense) {
        return NextResponse.json({ error: 'Silinecek gider bulunamadı' }, { status: 404 });
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Silinecek gider bulunamadı' }, { status: 404 });
      }
      throw error;
    }
    
    // Gideri Supabase'den sil
    await expenseOperations.delete(id);
    
    console.log(`Gider Supabase'den başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gider başarıyla silindi',
      id 
    });
  } catch (error: any) {
    console.error('Gider Supabase\'den silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Gider silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 