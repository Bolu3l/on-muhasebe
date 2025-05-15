import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Tüm izin isteklerini getir
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const employeeId = url.searchParams.get("employeeId");
    const status = url.searchParams.get("status");
    const type = url.searchParams.get("type");

    // Filtre koşullarını oluştur
    const where: any = {};
    
    if (employeeId) {
      where.employeeId = employeeId;
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    const leaveRequests = await prisma.leaveRequest.findMany({
      where,
      include: {
        employee: {
          select: {
            name: true,
            position: true,
            department: true
          }
        }
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("İzin istekleri getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin istekleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni izin isteği oluştur
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Zorunlu alanları kontrol et
    if (!body.employeeId || !body.startDate || !body.endDate || !body.type) {
      return NextResponse.json(
        { error: "Çalışan ID, başlangıç tarihi, bitiş tarihi ve izin türü zorunlu alanlardır" },
        { status: 400 }
      );
    }

    // Çalışanın varlığını kontrol et
    const employee = await prisma.employee.findUnique({
      where: { id: body.employeeId }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Bu ID'ye sahip bir çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Tarih kontrolü
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    
    if (endDate < startDate) {
      return NextResponse.json(
        { error: "Bitiş tarihi, başlangıç tarihinden önce olamaz" },
        { status: 400 }
      );
    }

    // İzin gün sayısını hesapla
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Başlangıç ve bitiş günü dahil

    // İzin isteği oluştur
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: body.employeeId,
        startDate,
        endDate,
        days,
        type: body.type,
        status: body.status || "PENDING",
        notes: body.notes || null,
      }
    });

    return NextResponse.json(leaveRequest, { status: 201 });
  } catch (error) {
    console.error("İzin isteği oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "İzin isteği oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
} 