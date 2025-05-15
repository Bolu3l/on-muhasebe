import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Tüm prim tiplerini listele
export async function GET(req: NextRequest) {
  try {
    // URL'den aktiflik filtresi al
    const url = new URL(req.url);
    const onlyActive = url.searchParams.get("active") === "true";
    
    // Prim tiplerini getir
    const bonusTypes = await prisma.bonusType.findMany({
      where: onlyActive ? { isActive: true } : {},
      orderBy: { 
        name: 'asc'
      },
    });
    
    return NextResponse.json(bonusTypes);
  } catch (error) {
    console.error("Prim tipleri getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni prim tipi ekle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Gerekli alanların kontrolü
    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Ad ve kod alanları zorunludur" },
        { status: 400 }
      );
    }
    
    // Aynı kodla başka bir prim tipi var mı kontrol et
    const existingType = await prisma.bonusType.findFirst({
      where: { code: body.code },
    });
    
    if (existingType) {
      return NextResponse.json(
        { error: `'${body.code}' kodu ile bir prim tipi zaten mevcut` },
        { status: 400 }
      );
    }
    
    // Yeni prim tipi oluştur
    const newBonusType = await prisma.bonusType.create({
      data: {
        name: body.name,
        code: body.code,
        isDefault: false, // Kullanıcı tarafından eklenenler varsayılan olamaz
        isActive: true,
      },
    });
    
    return NextResponse.json(newBonusType, { status: 201 });
  } catch (error) {
    console.error("Prim tipi eklenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 