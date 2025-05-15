import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Tüm prim türlerini getir
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const onlyActive = url.searchParams.get("active") === "true";
    
    // Filtreleme koşulları
    const where: any = {};
    
    if (onlyActive) {
      where.isActive = true;
    }
    
    // Prim türlerini getir
    const bonusTypes = await prisma.bonusType.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(bonusTypes);
  } catch (error) {
    console.error("Prim türleri getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim türleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni prim türü ekle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Zorunlu alanları kontrol et
    if (!body.name) {
      return NextResponse.json(
        { error: "Prim türü adı zorunlu bir alandır" },
        { status: 400 }
      );
    }
    
    // Aynı isimde prim türü var mı kontrol et
    const existingBonusType = await prisma.bonusType.findFirst({
      where: {
        name: body.name
      }
    });
    
    if (existingBonusType) {
      return NextResponse.json(
        { error: "Bu isimde bir prim türü zaten mevcut" },
        { status: 400 }
      );
    }
    
    // Yeni prim türü oluştur
    const bonusType = await prisma.bonusType.create({
      data: {
        name: body.name,
        description: body.description || null,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true
      }
    });
    
    return NextResponse.json(bonusType, { status: 201 });
  } catch (error) {
    console.error("Prim türü eklenirken hata:", error);
    return NextResponse.json(
      { error: "Prim türü eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 