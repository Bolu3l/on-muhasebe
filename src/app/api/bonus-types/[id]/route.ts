import { NextRequest, NextResponse } from "next/server";
import { bonusTypeOperations } from "@/lib/supabase-db";

// GET - Belirli bir prim tipini getir (Supabase)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Prim tipi detayları istendi - Supabase kullanılıyor, ID: ${id}`);
    
    const bonusType = await bonusTypeOperations.getById(id);
    
    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    console.log(`Prim tipi detayları Supabase'den başarıyla getirildi: ${id}`);
    return NextResponse.json(bonusType);
  } catch (error: any) {
    console.error("Prim tipi Supabase'den getirilirken hata:", error);
    
    // Supabase no rows returned error
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Prim tipi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Prim tipini güncelle (Supabase)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Prim tipi güncelleme isteği - Supabase kullanılıyor, ID: ${id}`);
    
    // Prim tipinin varlığını kontrol et
    let bonusType;
    try {
      bonusType = await bonusTypeOperations.getById(id);
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Prim tipi bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }
    
    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    // Varsayılan prim tipleri için sınırlamalar
    if (bonusType.isDefault) {
      // İsim değişikliğine izin ver ama kod değişikliğine izin verme
      if (body.code && body.code !== bonusType.code) {
        return NextResponse.json(
          { error: "Varsayılan prim tiplerinin kodu değiştirilemez" },
          { status: 400 }
        );
      }
    }
    
    // Güncelleme verilerini hazırla
    const updateData: any = {
      updatedAt: new Date().toISOString()
    };
    if (body.name) updateData.name = body.name;
    if (!bonusType.isDefault && body.code) updateData.code = body.code;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    
    // Prim tipini Supabase'de güncelle
    const updatedBonusType = await bonusTypeOperations.update(id, updateData);
    
    console.log(`Prim tipi Supabase'de başarıyla güncellendi: ${id}`);
    return NextResponse.json(updatedBonusType);
  } catch (error: any) {
    console.error("Prim tipi Supabase'de güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Prim tipini sil (yalnızca varsayılan olmayanlar) (Supabase)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Prim tipi silme isteği - Supabase kullanılıyor, ID: ${id}`);
    
    // Prim tipinin varlığını kontrol et
    let bonusType;
    try {
      bonusType = await bonusTypeOperations.getById(id);
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Prim tipi bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }
    
    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    // Varsayılan prim tipleri silinemez
    if (bonusType.isDefault) {
      return NextResponse.json(
        { error: "Varsayılan prim tipleri silinemez" },
        { status: 400 }
      );
    }
    
    // Prim tipini Supabase'den sil
    await bonusTypeOperations.delete(id);
    
    console.log(`Prim tipi Supabase'den başarıyla silindi: ${id}`);
    return NextResponse.json(
      { message: "Prim tipi başarıyla silindi" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Prim tipi Supabase'den silinirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 