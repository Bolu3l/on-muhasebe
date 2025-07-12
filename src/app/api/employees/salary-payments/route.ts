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
            firstName: true,
            lastName: true,
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
    if (!body.employeeId || !body.paymentDate || !body.grossSalary || !body.companyId) {
      return NextResponse.json(
        { error: "Çalışan ID, şirket ID, ödeme tarihi ve brüt maaş zorunlu alanlardır" },
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

    // Brüt maaş ve vergi miktarlarını sayısal değere dönüştür
    const grossSalary = parseFloat(body.grossSalary);
    const incomeTax = body.incomeTax ? parseFloat(body.incomeTax) : 0;
    const socialSecurity = body.socialSecurity ? parseFloat(body.socialSecurity) : 0;
    const unemploymentInsurance = body.unemploymentInsurance ? parseFloat(body.unemploymentInsurance) : 0;
    const bonus = body.bonus ? parseFloat(body.bonus) : 0;
    
    if (isNaN(grossSalary)) {
      return NextResponse.json(
        { error: "Brüt maaş geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Net maaşı hesapla
    const netSalary = grossSalary - incomeTax - socialSecurity - unemploymentInsurance + bonus;

    // Maaş ödemesi oluştur
    const salaryPayment = await prisma.salaryPayment.create({
      data: {
        employeeId: body.employeeId,
        companyId: body.companyId,
        grossSalary,
        incomeTax,
        socialSecurity,
        unemploymentInsurance,
        netSalary,
        bonus,
        paymentDate: new Date(body.paymentDate),
        paymentPeriod: body.paymentPeriod || new Date().toISOString().slice(0, 7), // YYYY-MM format
        status: body.status || "PAID",
        notes: body.notes || null
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