import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

// GET - Tüm çalışanları getir
export async function GET(req: NextRequest) {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Çalışanlar getirilirken hata:", error);
    return NextResponse.json(
      { error: "Çalışanlar getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni çalışan ekle
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Zorunlu alanları kontrol et
    if (!body.name || !body.position || !body.department || !body.startDate || !body.salary) {
      return NextResponse.json(
        { error: "Ad, pozisyon, departman, başlangıç tarihi ve maaş zorunlu alanlardır" },
        { status: 400 }
      );
    }

    // Maaşı sayısal değere dönüştür
    const salaryNumber = parseFloat(body.salary);
    if (isNaN(salaryNumber)) {
      return NextResponse.json(
        { error: "Maaş geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Decimal tipini kullan
    const salaryDecimal = new Decimal(salaryNumber);

    // Yeni çalışan oluştur
    const employee = await prisma.employee.create({
      data: {
        name: body.name,
        position: body.position,
        department: body.department,
        startDate: new Date(body.startDate),
        salary: salaryDecimal,
        email: body.email || null,
        phone: body.phone || null,
        address: body.address || null,
        taxId: body.taxId || null,
        socialSecurityNumber: body.socialSecurityNumber || null,
        bankAccount: body.bankAccount || null,
        status: body.status || "ACTIVE"
      }
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Çalışan eklenirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 