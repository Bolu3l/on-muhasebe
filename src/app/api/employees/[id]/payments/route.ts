import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Belirli bir çalışanın maaş ve prim ödemelerini getir
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

    // URL'den filtreleme parametrelerini al
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const type = url.searchParams.get("type");

    // Filtre koşullarını oluştur
    const where: any = {
      employeeId: id
    };
    
    if (startDate || endDate) {
      where.paymentDate = {};
      
      if (startDate) {
        where.paymentDate.gte = new Date(startDate);
      }
      
      if (endDate) {
        where.paymentDate.lte = new Date(endDate);
      }
    }

    if (type) {
      where.type = type;
    }

    // Ödemeleri getir
    const payments = await prisma.salaryPayment.findMany({
      where,
      include: {
        bonusType: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        paymentDate: 'desc'
      }
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Ödemeler getirilirken hata:", error);
    return NextResponse.json(
      { error: "Ödemeler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Belirli bir çalışan için yeni ödeme ekle
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

    // Çalışanın varlığını kontrol et
    const employee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Zorunlu alanları kontrol et
    if (!body.paymentDate || !body.amount) {
      return NextResponse.json(
        { error: "Ödeme tarihi ve miktar zorunlu alanlardır" },
        { status: 400 }
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

    // Ödeme oluştur
    const payment = await prisma.salaryPayment.create({
      data: {
        employeeId: id,
        paymentDate: new Date(body.paymentDate),
        amount,
        taxAmount,
        netAmount,
        type: body.type || "SALARY", // SALARY, BONUS, ALLOWANCE, ADVANCE, OTHER
        notes: body.description || null, // description alanını notes'a map ediyoruz
        paymentMethod: body.paymentMethod || null,
        status: body.status || "PAID"
      }
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Ödeme eklenirken hata:", error);
    return NextResponse.json(
      { error: "Ödeme eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 