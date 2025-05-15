import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Belirli bir izni getir
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; leaveId: string } }
) {
  try {
    const { id, leaveId } = params;

    // İznin var olup olmadığını ve belirtilen çalışana ait olup olmadığını kontrol et
    const leaveRequest = await prisma.leaveRequest.findFirst({
      where: {
        id: leaveId,
        employeeId: id,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "İzin bulunamadı veya bu çalışana ait değil" },
        { status: 404 }
      );
    }

    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error("İzin getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzni güncelle
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; leaveId: string } }
) {
  try {
    const { id, leaveId } = params;
    const body = await req.json();

    // İznin var olup olmadığını ve belirtilen çalışana ait olup olmadığını kontrol et
    const existingLeave = await prisma.leaveRequest.findFirst({
      where: {
        id: leaveId,
        employeeId: id,
      },
    });

    if (!existingLeave) {
      return NextResponse.json(
        { error: "İzin bulunamadı veya bu çalışana ait değil" },
        { status: 404 }
      );
    }

    // Güncelleme öncesi izin bakiyesini iade et (yıllık veya hastalık izni için)
    if (
      (existingLeave.type === "ANNUAL" || existingLeave.type === "SICK") &&
      existingLeave.status === "APPROVED"
    ) {
      const leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: id },
      });

      if (leaveBalance) {
        if (existingLeave.type === "ANNUAL") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              annualLeaveUsed: Math.max(
                0,
                leaveBalance.annualLeaveUsed - existingLeave.days
              ),
            },
          });
        } else if (existingLeave.type === "SICK") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              sickLeaveUsed: Math.max(
                0,
                leaveBalance.sickLeaveUsed - existingLeave.days
              ),
            },
          });
        }
      }
    }

    // Tarihleri ve gün sayısını güncelle
    let startDate = existingLeave.startDate;
    let endDate = existingLeave.endDate;
    let days = existingLeave.days;

    if (body.startDate) {
      startDate = new Date(body.startDate);
    }

    if (body.endDate) {
      endDate = new Date(body.endDate);
    }

    // Eğer tarihler değiştiyse gün sayısını yeniden hesapla
    if (body.startDate || body.endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil
    }

    // İzni güncelle
    const updatedLeave = await prisma.leaveRequest.update({
      where: { id: leaveId },
      data: {
        ...(body.startDate && { startDate }),
        ...(body.endDate && { endDate }),
        ...(body.type && { type: body.type }),
        ...(body.notes !== undefined && { notes: body.notes }),
        days, // Hesaplanan gün sayısı
        status: "APPROVED", // Düzenlenen izinler de otomatik onaylı
        approvedAt: new Date(),
        approvedBy: "Yönetici (Düzenlendi)",
      },
    });

    // İzin bakiyesini tekrar güncelle (yıllık veya hastalık izni için)
    if (updatedLeave.type === "ANNUAL" || updatedLeave.type === "SICK") {
      const leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: id },
      });

      if (leaveBalance) {
        if (updatedLeave.type === "ANNUAL") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              annualLeaveUsed: leaveBalance.annualLeaveUsed + updatedLeave.days,
              lastUpdated: new Date(),
            },
          });
        } else if (updatedLeave.type === "SICK") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              sickLeaveUsed: leaveBalance.sickLeaveUsed + updatedLeave.days,
              lastUpdated: new Date(),
            },
          });
        }
      }
    }

    // Çalışanın izinde olduğunu güncelleyelim
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün başlangıcı

    // İzin bugün içindeyse çalışanın durumunu izinde olarak ayarla
    if (startDate <= today && endDate >= today) {
      await prisma.employee.update({
        where: { id },
        data: {
          status: "ON_LEAVE",
        },
      });
    }

    return NextResponse.json(updatedLeave);
  } catch (error) {
    console.error("İzin güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - İzni sil
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; leaveId: string } }
) {
  try {
    const { id, leaveId } = params;

    // İznin var olup olmadığını ve belirtilen çalışana ait olup olmadığını kontrol et
    const leaveRequest = await prisma.leaveRequest.findFirst({
      where: {
        id: leaveId,
        employeeId: id,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "İzin bulunamadı veya bu çalışana ait değil" },
        { status: 404 }
      );
    }

    // İzin bakiyesini iade et (yıllık veya hastalık izni için)
    if (
      (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK") &&
      leaveRequest.status === "APPROVED"
    ) {
      const leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: id },
      });

      if (leaveBalance) {
        if (leaveRequest.type === "ANNUAL") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              annualLeaveUsed: Math.max(
                0,
                leaveBalance.annualLeaveUsed - leaveRequest.days
              ),
              lastUpdated: new Date(),
            },
          });
        } else if (leaveRequest.type === "SICK") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              sickLeaveUsed: Math.max(
                0,
                leaveBalance.sickLeaveUsed - leaveRequest.days
              ),
              lastUpdated: new Date(),
            },
          });
        }
      }
    }

    // İzni sil
    await prisma.leaveRequest.delete({
      where: { id: leaveId },
    });

    // Çalışanın durumunu güncelle
    // İzin bugünü kapsıyorsa ve silindiyse, çalışanın başka aktif izni var mı kontrol et
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      leaveRequest.startDate <= today &&
      leaveRequest.endDate >= today &&
      leaveRequest.status === "APPROVED"
    ) {
      // Çalışanın başka aktif izni var mı kontrol et
      const activeLeave = await prisma.leaveRequest.findFirst({
        where: {
          employeeId: id,
          status: "APPROVED",
          startDate: { lte: today },
          endDate: { gte: today },
          id: { not: leaveId }, // Silinecek izni hariç tut
        },
      });

      // Aktif izin yoksa çalışanı tekrar aktif yap
      if (!activeLeave) {
        await prisma.employee.update({
          where: { id },
          data: {
            status: "ACTIVE",
          },
        });
      }
    }

    return NextResponse.json({ message: "İzin başarıyla silindi" });
  } catch (error) {
    console.error("İzin silinirken hata:", error);
    return NextResponse.json(
      { error: "İzin silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 