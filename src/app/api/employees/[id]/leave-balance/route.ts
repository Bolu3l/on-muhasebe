import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// GET - Personelin izin bakiyesini getir (Prisma)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`İzin bakiyesi istendi - Prisma kullanılıyor, EmployeeID: ${id}`);

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

    // Önce çalışanın var olup olmadığını kontrol et - Prisma'da
    const employee = await prisma.employee.findUnique({
      where: { id: id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // İzin bakiyesini Prisma'dan getir
    let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
      where: { employeeId: id }
    });

    // Eğer izin bakiyesi yoksa, varsayılan değerlerle oluştur
    if (!leaveBalance) {
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await prisma.employeeLeaveBalance.create({
        data: {
          id: uuidv4(),
          employeeId: id,
          year: currentYear,
          annualLeaveTotal: 14, // Türkiye'de yasal olarak en az 14 gün
          annualLeaveUsed: 0,
          sickLeaveTotal: 5,
          sickLeaveUsed: 0,
          lastUpdated: new Date()
        }
      });
    }

    console.log(`İzin bakiyesi Prisma'dan başarıyla getirildi`);
    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi Prisma'dan getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzin bakiyesini güncelle (Prisma)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`İzin bakiyesi güncelleme - Prisma kullanılıyor, EmployeeID: ${id}`, body);

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

    // Önce çalışanın var olup olmadığını kontrol et - Prisma'da
    const employee = await prisma.employee.findUnique({
      where: { id: id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // İzin bakiyesini Prisma'dan kontrol et
    let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
      where: { employeeId: id }
    });

    if (!leaveBalance) {
      // İzin bakiyesi yoksa, yeni oluştur
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await prisma.employeeLeaveBalance.create({
        data: {
          id: uuidv4(),
          employeeId: id,
          year: currentYear,
          annualLeaveTotal: body.annualLeaveTotal !== undefined ? body.annualLeaveTotal : 14,
          annualLeaveUsed: body.annualLeaveUsed !== undefined ? body.annualLeaveUsed : 0,
          sickLeaveTotal: body.sickLeaveTotal !== undefined ? body.sickLeaveTotal : 5,
          sickLeaveUsed: body.sickLeaveUsed !== undefined ? body.sickLeaveUsed : 0,
          lastUpdated: new Date()
        }
      });
    } else {
      // İzin bakiyesi varsa, güncelle - Prisma
      const updateData: any = {
        lastUpdated: new Date()
      };
      
      if (body.year !== undefined) updateData.year = body.year;
      if (body.annualLeaveTotal !== undefined) updateData.annualLeaveTotal = body.annualLeaveTotal;
      if (body.annualLeaveUsed !== undefined) updateData.annualLeaveUsed = body.annualLeaveUsed;
      if (body.sickLeaveTotal !== undefined) updateData.sickLeaveTotal = body.sickLeaveTotal;
      if (body.sickLeaveUsed !== undefined) updateData.sickLeaveUsed = body.sickLeaveUsed;
      
      leaveBalance = await prisma.employeeLeaveBalance.update({
        where: { employeeId: id },
        data: updateData
      });
    }

    console.log(`İzin bakiyesi Prisma'da başarıyla güncellendi`);
    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi Prisma'da güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 