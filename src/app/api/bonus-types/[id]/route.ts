import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Belirli bir prim tipini getir
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    const bonusType = await prisma.bonusType.findUnique({
      where: { id },
    });
    
    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(bonusType);
  } catch (error) {
    console.error("Prim tipi getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Prim tipini güncelle
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    
    // Prim tipinin varlığını kontrol et
    const bonusType = await prisma.bonusType.findUnique({
      where: { id },
    });
    
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
    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (!bonusType.isDefault && body.code) updateData.code = body.code;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    
    // Prim tipini güncelle
    const updatedBonusType = await prisma.bonusType.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(updatedBonusType);
  } catch (error) {
    console.error("Prim tipi güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Prim tipini sil (yalnızca varsayılan olmayanlar)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    // Prim tipinin varlığını kontrol et
    const bonusType = await prisma.bonusType.findUnique({
      where: { id },
    });
    
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
    
    // Prim tipini sil
    await prisma.bonusType.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { message: "Prim tipi başarıyla silindi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prim tipi silinirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 