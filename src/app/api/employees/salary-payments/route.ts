import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Tüm maaş ödemelerini getir
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const employeeId = url.searchParams.get("employeeId");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // Filtre koşullarını oluştur
    const where: any = {};
    
    if (employeeId) {
      where.employeeId = employeeId;
    }

    if (startDate || endDate) {
      where.paymentDate = {};
      
      if (startDate) {
        where.paymentDate.gte = new Date(startDate);
      }
      
      if (endDate) {
        where.paymentDate.lte = new Date(endDate);
      }
    }

    const payments = await prisma.salaryPayment.findMany({
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
        paymentDate: 'desc'
      }
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Maaş ödemeleri getirilirken hata:", error);
    return NextResponse.json(
      { error: "Maaş ödemeleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni maaş ödemesi ekle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Zorunlu alanları kontrol et
    if (!body.employeeId || !body.paymentDate || !body.amount) {
      return NextResponse.json(
        { error: "Çalışan ID, ödeme tarihi ve miktar zorunlu alanlardır" },
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

    // Miktar ve vergi miktarını sayısal değere dönüştür
    const amount = parseFloat(body.amount);
    let taxAmount = body.taxAmount ? parseFloat(body.taxAmount) : 0;
    
    if (isNaN(amount)) {
      return NextResponse.json(
        { error: "Miktar geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    if (isNaN(taxAmount)) {
      return NextResponse.json(
        { error: "Vergi miktarı geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Net tutarı hesapla
    const netAmount = amount - taxAmount;

    // Maaş ödemesi oluştur
    const salaryPayment = await prisma.salaryPayment.create({
      data: {
        employeeId: body.employeeId,
        paymentDate: new Date(body.paymentDate),
        amount,
        taxAmount,
        netAmount,
        type: body.type || "SALARY",
        notes: body.notes || null,
        paymentMethod: body.paymentMethod || null,
        status: body.status || "PAID"
      }
    });

    return NextResponse.json(salaryPayment, { status: 201 });
  } catch (error) {
    console.error("Maaş ödemesi eklenirken hata:", error);
    return NextResponse.json(
      { error: "Maaş ödemesi eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 