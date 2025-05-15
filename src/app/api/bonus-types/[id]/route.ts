import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Belirli bir prim türünü getir
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const bonusType = await prisma.bonusType.findUnique({
      where: { id },
    });

    if (!bonusType) {
      return NextResponse.json(
        { error: "Prim türü bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(bonusType);
  } catch (error) {
    console.error("Prim türü getirilirken hata:", error);
    return NextResponse.json(
      { error: "Prim türü getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Prim türünü güncelle
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    // Önce prim türünün var olup olmadığını kontrol et
    const existingBonusType = await prisma.bonusType.findUnique({
      where: { id },
    });

    if (!existingBonusType) {
      return NextResponse.json(
        { error: "Prim türü bulunamadı" },
        { status: 404 }
      );
    }

    // İsim değişiyorsa, aynı isimde başka bir prim türü var mı kontrol et
    if (body.name && body.name !== existingBonusType.name) {
      const nameExists = await prisma.bonusType.findFirst({
        where: {
          name: body.name,
          id: { not: id },
        },
      });

      if (nameExists) {
        return NextResponse.json(
          { error: "Bu isimde bir prim türü zaten mevcut" },
          { status: 400 }
        );
      }
    }

    // Prim türünü güncelle
    const updatedBonusType = await prisma.bonusType.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
      },
    });

    return NextResponse.json(updatedBonusType);
  } catch (error) {
    console.error("Prim türü güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Prim türü güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Prim türünü sil
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Önce prim türünün var olup olmadığını kontrol et
    const existingBonusType = await prisma.bonusType.findUnique({
      where: { id },
    });

    if (!existingBonusType) {
      return NextResponse.json(
        { error: "Prim türü bulunamadı" },
        { status: 404 }
      );
    }

    // Bu prim türüne bağlı ödeme kayıtları var mı kontrol et
    const relatedPayments = await prisma.salaryPayment.count({
      where: { bonusTypeId: id },
    });

    if (relatedPayments > 0) {
      // Prim türünü silmek yerine pasif yap
      const deactivatedBonusType = await prisma.bonusType.update({
        where: { id },
        data: { isActive: false },
      });

      return NextResponse.json({
        message: "Prim türü kullanımda olduğu için pasif hale getirildi",
        bonusType: deactivatedBonusType,
      });
    }

    // İlişkili ödeme kaydı yoksa prim türünü sil
    await prisma.bonusType.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Prim türü başarıyla silindi" });
  } catch (error) {
    console.error("Prim türü silinirken hata:", error);
    return NextResponse.json(
      { error: "Prim türü silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 