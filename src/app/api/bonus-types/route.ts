import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// GET - Tüm prim tiplerini listele (Prisma)
export async function GET(req: NextRequest) {
  try {
    console.log("Prim tipleri istendi - Prisma kullanılıyor");
    
    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    // URL'den aktiflik filtresi al
    const url = new URL(req.url);
    const onlyActive = url.searchParams.get("active") === "true";
    
    // Prim tiplerini Prisma'dan getir
    let whereClause = {};
    if (onlyActive) {
      whereClause = { isActive: true };
    }
    
    const bonusTypes = await prisma.bonusType.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`${bonusTypes.length} prim tipi Prisma'dan getirildi`);
    return NextResponse.json(bonusTypes);
  } catch (error: any) {
    console.error("Prim tipleri Prisma'dan getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni prim tipi ekle (Prisma)
export async function POST(req: NextRequest) {
  try {
    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    const body = await req.json();
    console.log("Yeni prim tipi oluşturma isteği - Prisma kullanılıyor:", body);
    
    // Gerekli alanların kontrolü
    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: "Ad ve kod alanları zorunludur" },
        { status: 400 }
      );
    }
    
    // Aynı kodla başka bir prim tipi var mı kontrol et - Prisma'da
    const existingType = await prisma.bonusType.findFirst({
      where: { code: body.code }
    });
    
    if (existingType) {
      return NextResponse.json(
        { error: `'${body.code}' kodu ile bir prim tipi zaten mevcut` },
        { status: 400 }
      );
    }
    
    // Yeni prim tipi oluştur - Prisma'da
    const newBonusType = await prisma.bonusType.create({
      data: {
        id: uuidv4(), // UUID ekle
        name: body.name,
        code: body.code,
        isDefault: false, // Kullanıcı tarafından eklenenler varsayılan olamaz
        isActive: true,
      }
    });
    
    console.log("Prim tipi Prisma'da başarıyla oluşturuldu:", newBonusType.id);
    return NextResponse.json(newBonusType, { status: 201 });
  } catch (error: any) {
    console.error("Prim tipi Prisma'da eklenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 