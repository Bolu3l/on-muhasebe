import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Personel izin taleplerini getir
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Önce çalışanın var olup olmadığını kontrol et
    const employee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // İzin taleplerini getir
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: { employeeId: id },
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("İzin talepleri getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin talepleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni izin talebi oluştur
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

    // Gerekli alanların kontrolü
    if (!body.startDate || !body.endDate || !body.type) {
      return NextResponse.json(
        { error: "Başlangıç tarihi, bitiş tarihi ve izin türü gereklidir" },
        { status: 400 }
      );
    }

    // Çalışanın var olup olmadığını kontrol et
    const employee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Gün sayısını hesapla
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil

    // İzni doğrudan onaylı olarak oluştur
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: id,
        startDate,
        endDate,
        days,
        type: body.type,
        notes: body.notes || null,
        status: "APPROVED", // İzin direkt onaylı olarak kaydedilir
        approvedAt: new Date(),
        approvedBy: "Yönetici"
      }
    });

    // İzin bakiyesini güncelle (Yıllık izin veya Hastalık izni için)
    if (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK") {
      // İzin bakiyesini getir
      let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: id }
      });

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await prisma.employeeLeaveBalance.create({
          data: {
            employeeId: id,
            year: currentYear,
            annualLeaveTotal: 14,  // Türkiye'de yasal olarak en az 14 gün
            annualLeaveUsed: 0,
            sickLeaveTotal: 5,
            sickLeaveUsed: 0
          }
        });
      }

      // İzin tipine göre bakiyeyi güncelle
      if (leaveRequest.type === "ANNUAL") {
        await prisma.employeeLeaveBalance.update({
          where: { id: leaveBalance.id },
          data: {
            annualLeaveUsed: leaveBalance.annualLeaveUsed + days,
            lastUpdated: new Date()
          }
        });
      } else if (leaveRequest.type === "SICK") {
        await prisma.employeeLeaveBalance.update({
          where: { id: leaveBalance.id },
          data: {
            sickLeaveUsed: leaveBalance.sickLeaveUsed + days,
            lastUpdated: new Date()
          }
        });
      }
    }

    // Çalışanın izinde olduğunu güncelleyelim
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün başlangıcı

    // İzin bugün veya daha önce başlıyorsa ve bugün veya daha sonra bitiyorsa
    // (yani bugün izin aralığı içindeyse) çalışanın durumunu izinde olarak ayarla
    if (startDate <= today && endDate >= today) {
      await prisma.employee.update({
        where: { id },
        data: {
          status: "ON_LEAVE"
        }
      });
    }

    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error("İzin oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "İzin oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzin talebini güncelle (onaylama/reddetme işlemi için)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = params.id;
    const body = await req.json();

    if (!body.leaveRequestId) {
      return NextResponse.json(
        { error: "İzin talebi ID'si gereklidir" },
        { status: 400 }
      );
    }

    // İzin talebini getir
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: body.leaveRequestId }
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "İzin talebi bulunamadı" },
        { status: 404 }
      );
    }

    // İzin talebinin doğru çalışana ait olduğunu kontrol et
    if (leaveRequest.employeeId !== employeeId) {
      return NextResponse.json(
        { error: "Bu izin talebi belirtilen çalışana ait değil" },
        { status: 403 }
      );
    }

    // İzin talebini güncelle
    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: body.leaveRequestId },
      data: {
        status: body.status,
        ...(body.status === "APPROVED" && { approvedAt: new Date() }),
        ...(body.status === "APPROVED" && { approvedBy: body.approvedBy || "Sistem" }),
        ...(body.notes && { notes: body.notes })
      }
    });

    // İzin onaylandıysa ve ANNUAL veya SICK tipindeyse izin bakiyesini güncelle
    if (body.status === "APPROVED" && (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // İzin bakiyesini getir
      let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId }
      });

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await prisma.employeeLeaveBalance.create({
          data: {
            employeeId,
            year: currentYear,
            annualLeaveTotal: 14,
            annualLeaveUsed: 0,
            sickLeaveTotal: 5,
            sickLeaveUsed: 0
          }
        });
      }

      // İzin tipine göre bakiyeyi güncelle
      if (leaveRequest.type === "ANNUAL") {
        await prisma.employeeLeaveBalance.update({
          where: { id: leaveBalance.id },
          data: {
            annualLeaveUsed: leaveBalance.annualLeaveUsed + leaveRequest.days,
            lastUpdated: new Date()
          }
        });
      } else if (leaveRequest.type === "SICK") {
        await prisma.employeeLeaveBalance.update({
          where: { id: leaveBalance.id },
          data: {
            sickLeaveUsed: leaveBalance.sickLeaveUsed + leaveRequest.days,
            lastUpdated: new Date()
          }
        });
      }
    } else if (body.status === "REJECTED" && leaveRequest.status === "APPROVED" &&
              (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // Daha önce onaylanmış bir izin reddedilirse, bakiyeyi geri al
      const leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId }
      });

      if (leaveBalance) {
        if (leaveRequest.type === "ANNUAL") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              annualLeaveUsed: Math.max(0, leaveBalance.annualLeaveUsed - leaveRequest.days),
              lastUpdated: new Date()
            }
          });
        } else if (leaveRequest.type === "SICK") {
          await prisma.employeeLeaveBalance.update({
            where: { id: leaveBalance.id },
            data: {
              sickLeaveUsed: Math.max(0, leaveBalance.sickLeaveUsed - leaveRequest.days),
              lastUpdated: new Date()
            }
          });
        }
      }
    }

    return NextResponse.json(updatedLeaveRequest);
  } catch (error) {
    console.error("İzin talebi güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin talebi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 