import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";

// GET - Belirli bir prim tipini getir (Prisma)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Prim tipi detayları istendi - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    const bonusType = await prisma.bonusType.findUnique({
      where: { id: id }
    });
    
    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim tipi bulunamadı" },
        { status: 404 }
      );
    }
    
    console.log(`Prim tipi detayları Prisma'dan başarıyla getirildi: ${id}`);
    return NextResponse.json(bonusType);
  } catch (error: any) {
    console.error("Prim tipi Prisma'dan getirilirken hata:", error);
    
    return NextResponse.json(
      { error: "Prim tipi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Prim tipini güncelle (Prisma)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Prim tipi güncelleme isteği - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    // Prim tipinin varlığını kontrol et
    const bonusType = await prisma.bonusType.findUnique({
      where: { id: id }
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
    
    // Prim tipini Prisma'da güncelle
    const updatedBonusType = await prisma.bonusType.update({
      where: { id: id },
      data: updateData
    });
    
    console.log(`Prim tipi Prisma'da başarıyla güncellendi: ${id}`);
    return NextResponse.json(updatedBonusType);
  } catch (error: any) {
    console.error("Prim tipi Prisma'da güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Prim tipini sil (yalnızca varsayılan olmayanlar) (Prisma)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Prim tipi silme isteği - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    // Prim tipinin varlığını kontrol et
    const bonusType = await prisma.bonusType.findUnique({
      where: { id: id }
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
    
    // Prim tipini Prisma'dan sil
    await prisma.bonusType.delete({
      where: { id: id }
    });
    
    console.log(`Prim tipi Prisma'dan başarıyla silindi: ${id}`);
    return NextResponse.json(
      { message: "Prim tipi başarıyla silindi" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Prim tipi Prisma'dan silinirken hata:", error);
    return NextResponse.json(
      { error: "Prim tipi silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 