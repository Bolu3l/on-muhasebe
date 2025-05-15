import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Tüm çalışanların izin durumlarını güncelle
export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün başlangıcı
    
    // 1. Önce tüm aktif izinleri bulalım (bugün devam eden izinler)
    const activeLeaves = await prisma.leaveRequest.findMany({
      where: {
        status: "APPROVED",
        startDate: { lte: today }, // İzin bugün veya daha önce başlamış
        endDate: { gte: today },   // İzin bugün veya daha sonra bitiyor
      },
      include: {
        employee: true
      }
    });
    
    // 2. İzinde olan çalışanların ID'lerini toplama
    const employeesOnLeave = activeLeaves.map(leave => leave.employeeId);
    
    // 3. Bu çalışanları "ON_LEAVE" olarak güncelle
    if (employeesOnLeave.length > 0) {
      await prisma.employee.updateMany({
        where: {
          id: { in: employeesOnLeave },
          status: { not: "ON_LEAVE" } // Sadece zaten izinde olmayanları güncelle
        },
        data: {
          status: "ON_LEAVE"
        }
      });
    }
    
    // 4. Daha önce izinde olup artık izni bitenleri bulalım
    const employeesBackFromLeave = await prisma.employee.findMany({
      where: {
        status: "ON_LEAVE",
        id: { notIn: employeesOnLeave } // Bugün izinde olmayan çalışanlar
      }
    });
    
    // 5. İzni biten çalışanları "ACTIVE" olarak güncelle
    if (employeesBackFromLeave.length > 0) {
      await prisma.employee.updateMany({
        where: {
          id: { in: employeesBackFromLeave.map(emp => emp.id) }
        },
        data: {
          status: "ACTIVE"
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      updated: {
        markedOnLeave: employeesOnLeave.length,
        markedActive: employeesBackFromLeave.length
      }
    });
    
  } catch (error) {
    console.error("İzin durumları güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin durumları güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 