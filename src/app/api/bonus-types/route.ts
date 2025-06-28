import { NextRequest, NextResponse } from "next/server";
import { bonusTypeOperations } from "@/lib/supabase-db";
import { v4 as uuidv4 } from 'uuid';

// GET - Tüm prim tiplerini listele (Supabase)
export async function GET(req: NextRequest) {
  try {
    console.log("Prim tipleri istendi - Supabase kullanılıyor");
    
    // URL'den aktiflik filtresi al
    const url = new URL(req.url);
    const onlyActive = url.searchParams.get("active") === "true";
    
    // Prim tiplerini Supabase'den getir
    let bonusTypes = await bonusTypeOperations.getAll();
    
    // Aktif filtresi uygulanacaksa
    if (onlyActive) {
      bonusTypes = bonusTypes.filter(type => type.isActive === true);
    }
    
    console.log(`${bonusTypes.length} prim tipi Supabase'den getirildi`);
    return NextResponse.json(bonusTypes);
  } catch (error: any) {
    console.error("Prim tipleri Supabase'den getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni prim tipi ekle (Supabase)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Yeni prim tipi oluşturma isteği - Supabase kullanılıyor:", body);
    
    // Gerekli alanların kontrolü
    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Ad ve kod alanları zorunludur" },
        { status: 400 }
      );
    }
    
    // Aynı kodla başka bir prim tipi var mı kontrol et - Supabase'de
    const allBonusTypes = await bonusTypeOperations.getAll();
    const existingType = allBonusTypes.find(type => type.code === body.code);
    
    if (existingType) {
      return NextResponse.json(
        { error: `'${body.code}' kodu ile bir prim tipi zaten mevcut` },
        { status: 400 }
      );
    }
    
    // Yeni prim tipi oluştur - Supabase'de
    const newBonusType = await bonusTypeOperations.create({
      id: uuidv4(), // UUID ekle
      name: body.name,
      code: body.code,
      isDefault: false, // Kullanıcı tarafından eklenenler varsayılan olamaz
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    console.log("Prim tipi Supabase'de başarıyla oluşturuldu:", newBonusType.id);
    return NextResponse.json(newBonusType, { status: 201 });
  } catch (error: any) {
    console.error("Prim tipi Supabase'de eklenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 