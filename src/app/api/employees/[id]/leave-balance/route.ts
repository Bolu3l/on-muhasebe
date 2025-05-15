import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Personelin izin bakiyesini getir
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

    // İzin bakiyesini getir
    let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
      where: { employeeId: id }
    });

    // Eğer izin bakiyesi yoksa, varsayılan değerlerle oluştur
    if (!leaveBalance) {
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await prisma.employeeLeaveBalance.create({
        data: {
          employeeId: id,
          year: currentYear,
          annualLeaveTotal: 14, // Türkiye'de yasal olarak en az 14 gün
          annualLeaveUsed: 0,
          sickLeaveTotal: 5,
          sickLeaveUsed: 0
        }
      });
    }

    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzin bakiyesini güncelle
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

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

    // İzin bakiyesini kontrol et
    let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
      where: { employeeId: id }
    });

    if (!leaveBalance) {
      // İzin bakiyesi yoksa, yeni oluştur
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await prisma.employeeLeaveBalance.create({
        data: {
          employeeId: id,
          year: currentYear,
          ...(body.annualLeaveTotal !== undefined && { annualLeaveTotal: body.annualLeaveTotal }),
          ...(body.annualLeaveUsed !== undefined && { annualLeaveUsed: body.annualLeaveUsed }),
          ...(body.sickLeaveTotal !== undefined && { sickLeaveTotal: body.sickLeaveTotal }),
          ...(body.sickLeaveUsed !== undefined && { sickLeaveUsed: body.sickLeaveUsed })
        }
      });
    } else {
      // İzin bakiyesi varsa, güncelle
      leaveBalance = await prisma.employeeLeaveBalance.update({
        where: { id: leaveBalance.id },
        data: {
          ...(body.year !== undefined && { year: body.year }),
          ...(body.annualLeaveTotal !== undefined && { annualLeaveTotal: body.annualLeaveTotal }),
          ...(body.annualLeaveUsed !== undefined && { annualLeaveUsed: body.annualLeaveUsed }),
          ...(body.sickLeaveTotal !== undefined && { sickLeaveTotal: body.sickLeaveTotal }),
          ...(body.sickLeaveUsed !== undefined && { sickLeaveUsed: body.sickLeaveUsed }),
          lastUpdated: new Date()
        }
      });
    }

    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 