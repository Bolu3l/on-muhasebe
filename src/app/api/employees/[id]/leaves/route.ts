import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// GET - Personel izin taleplerini getir (Prisma)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`İzin talepleri istendi - Prisma kullanılıyor, EmployeeID: ${id}`);

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

    // Önce çalışanın var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et - Prisma'da
    const employee = await prisma.employee.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi çalışanının izin taleplerini görebilsin
      }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // İzin taleplerini Prisma'dan getir
    const leaveRequests = await prisma.leaveRequest.findMany({
      where: { employeeId: id },
      orderBy: { createdAt: 'desc' }
    });

    console.log(`${leaveRequests.length} izin talebi Prisma'dan getirildi`);
    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("İzin talepleri Prisma'dan getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin talepleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni izin talebi oluştur (Prisma)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Yeni izin talebi oluşturma - Prisma kullanılıyor, EmployeeID: ${id}`, body);

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

    // Gerekli alanların kontrolü
    if (!body.startDate || !body.endDate || !body.type) {
      return NextResponse.json(
        { error: "Başlangıç tarihi, bitiş tarihi ve izin türü gereklidir" },
        { status: 400 }
      );
    }

    // Çalışanın var olup olmadığını ve kullanıcıya ait olup olmadığını kontrol et - Prisma'da
    const employee = await prisma.employee.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi çalışanının izin talebini oluşturabilsin
      }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // LeaveType enum değerini kontrol et
    const mapLeaveType = (type: string) => {
      switch(type?.toUpperCase()) {
        case 'ANNUAL': return 'ANNUAL';
        case 'SICK': return 'SICK';
        case 'MATERNITY': return 'MATERNITY';
        case 'PATERNITY': return 'PATERNITY';
        case 'BEREAVEMENT': return 'BEREAVEMENT';
        case 'UNPAID': return 'UNPAID';
        case 'OTHER': return 'OTHER';
        default: return 'OTHER';
      }
    };

    // Gün sayısını hesapla
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil

    // İzin talebi verilerini hazırla
    const leaveRequestData = {
      id: uuidv4(),
      employeeId: id,
      startDate: startDate,
      endDate: endDate,
      days: days,
      type: mapLeaveType(body.type),
      status: 'APPROVED', // İzin direkt onaylı olarak kaydedilir
      notes: body.notes || null,
      approvedAt: new Date(),
      approvedBy: body.approvedBy || "Yönetici"
    };

    // İzni doğrudan onaylı olarak oluştur - Prisma'da
    const leaveRequest = await prisma.leaveRequest.create({
      data: leaveRequestData as any
    });

    // İzin bakiyesini güncelle (Yıllık izin veya Hastalık izni için) - Prisma
    if (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK") {
      // İzin bakiyesini Prisma'dan getir
      let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: id }
      });

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await prisma.employeeLeaveBalance.create({
          data: {
            id: uuidv4(),
            employeeId: id,
            year: currentYear,
            annualLeaveTotal: 14,  // Türkiye'de yasal olarak en az 14 gün
            annualLeaveUsed: 0,
            sickLeaveTotal: 5,
            sickLeaveUsed: 0,
            lastUpdated: new Date()
          }
        });
      }

      // İzin tipine göre bakiyeyi güncelle - Prisma
      if (leaveRequest.type === "ANNUAL") {
        await prisma.employeeLeaveBalance.update({
          where: { employeeId: id },
          data: {
            annualLeaveUsed: leaveBalance.annualLeaveUsed + days,
            lastUpdated: new Date()
          }
        });
      } else if (leaveRequest.type === "SICK") {
        await prisma.employeeLeaveBalance.update({
          where: { employeeId: id },
          data: {
            sickLeaveUsed: leaveBalance.sickLeaveUsed + days,
            lastUpdated: new Date()
          }
        });
      }
    }

    // Çalışanın izinde olduğunu güncelleyelim - Prisma
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün başlangıcı

    // İzin bugün başlıyorsa ve bugün veya daha sonra bitiyorsa
    // (yani bugün izin aralığı içindeyse) çalışanın durumunu izinde olarak ayarla
    if (startDate <= today && endDate >= today) {
      await prisma.employee.update({
        where: { id: id },
        data: {
          status: "ON_LEAVE"
        }
      });
    }

    console.log(`İzin talebi Prisma'da başarıyla oluşturuldu: ${leaveRequest.id}`);
    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error("İzin Prisma'da oluşturulurken hata:", error);
    console.error("Error details:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { 
        error: "İzin oluşturulurken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// PATCH - İzin talebini güncelle (onaylama/reddetme işlemi için) - Prisma
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = params.id;
    const body = await req.json();
    console.log(`İzin talebi güncelleme - Prisma kullanılıyor, EmployeeID: ${employeeId}`, body);

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

    if (!body.leaveRequestId) {
      return NextResponse.json(
        { error: "İzin talebi ID'si gereklidir" },
        { status: 400 }
      );
    }

    // İzin talebini Prisma'dan getir
    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id: body.leaveRequestId },
      include: {
        employee: true // Employee bilgilerini de dahil et
      }
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

    // İzin talebinin kullanıcının çalışanına ait olduğunu kontrol et
    if (leaveRequest.employee.userId !== decoded.userId) {
      return NextResponse.json(
        { error: "Bu izin talebi size ait değil" },
        { status: 403 }
      );
    }

    // Status değerini enum'a uygun hale getir
    const mapLeaveStatus = (status: string) => {
      switch(status?.toUpperCase()) {
        case 'PENDING': return 'PENDING';
        case 'APPROVED': return 'APPROVED';
        case 'REJECTED': return 'REJECTED';
        case 'CANCELLED': return 'CANCELLED';
        default: return 'PENDING';
      }
    };

    // İzin talebini Prisma'da güncelle
    const updateData: any = {
      status: mapLeaveStatus(body.status)
    };

    if (body.status === "APPROVED") {
      updateData.approvedAt = new Date();
      updateData.approvedBy = body.approvedBy || "Sistem";
    }

    if (body.notes) {
      updateData.notes = body.notes;
    }

    const updatedLeaveRequest = await prisma.leaveRequest.update({
      where: { id: body.leaveRequestId },
      data: updateData
    });

    // İzin onaylandıysa ve ANNUAL veya SICK tipindeyse izin bakiyesini güncelle - Prisma
    if (body.status === "APPROVED" && (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // İzin bakiyesini Prisma'dan getir
      let leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: employeeId }
      });

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await prisma.employeeLeaveBalance.create({
          data: {
            id: uuidv4(),
            employeeId: employeeId,
            year: currentYear,
            annualLeaveTotal: 14,
            annualLeaveUsed: 0,
            sickLeaveTotal: 5,
            sickLeaveUsed: 0,
            lastUpdated: new Date()
          }
        });
      }

      // İzin tipine göre bakiyeyi güncelle - Prisma
      if (leaveRequest.type === "ANNUAL") {
        await prisma.employeeLeaveBalance.update({
          where: { employeeId: employeeId },
          data: {
            annualLeaveUsed: leaveBalance.annualLeaveUsed + leaveRequest.days,
            lastUpdated: new Date()
          }
        });
      } else if (leaveRequest.type === "SICK") {
        await prisma.employeeLeaveBalance.update({
          where: { employeeId: employeeId },
          data: {
            sickLeaveUsed: leaveBalance.sickLeaveUsed + leaveRequest.days,
            lastUpdated: new Date()
          }
        });
      }
    } else if (body.status === "REJECTED" && leaveRequest.status === "APPROVED" &&
              (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // Daha önce onaylanmış bir izin reddedilirse, bakiyeyi geri al - Prisma
      const leaveBalance = await prisma.employeeLeaveBalance.findUnique({
        where: { employeeId: employeeId }
      });

      if (leaveBalance) {
        if (leaveRequest.type === "ANNUAL") {
          await prisma.employeeLeaveBalance.update({
            where: { employeeId: employeeId },
            data: {
              annualLeaveUsed: Math.max(0, leaveBalance.annualLeaveUsed - leaveRequest.days),
              lastUpdated: new Date()
            }
          });
        } else if (leaveRequest.type === "SICK") {
          await prisma.employeeLeaveBalance.update({
            where: { employeeId: employeeId },
            data: {
              sickLeaveUsed: Math.max(0, leaveBalance.sickLeaveUsed - leaveRequest.days),
              lastUpdated: new Date()
            }
          });
        }
      }
    }

    console.log(`İzin talebi Prisma'da başarıyla güncellendi: ${body.leaveRequestId}`);
    return NextResponse.json(updatedLeaveRequest);
  } catch (error) {
    console.error("İzin talebi Prisma'da güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin talebi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 