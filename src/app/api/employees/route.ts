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
    console.log('Employee POST API çağrıldı');
    
    const body = await req.json();
    console.log('Gelen form verisi:', JSON.stringify(body, null, 2));
    
    // Zorunlu alanları kontrol et
    if (!body.name || !body.position || !body.department || !body.startDate || !body.salary) {
      console.log('Zorunlu alan eksik!');
      return NextResponse.json(
        { error: "Ad, pozisyon, departman, başlangıç tarihi ve maaş zorunlu alanlardır" },
        { status: 400 }
      );
    }

    // Maaşı sayısal değere dönüştür
    const salaryNumber = parseFloat(body.salary);
    console.log('Maaş değeri:', salaryNumber);
    
    if (isNaN(salaryNumber)) {
      console.log('Maaş değeri sayısal değil!');
      return NextResponse.json(
        { error: "Maaş geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Decimal tipini kullan
    console.log('Decimal tipine dönüştürülüyor...');
    const salaryDecimal = new Decimal(salaryNumber);
    console.log('Decimal değer:', salaryDecimal);

    // Yeni çalışan oluştur
    console.log('Prisma create işlemi başlatılıyor...');
    const employeeData = {
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
    };
    
    console.log('Employee data:', JSON.stringify(employeeData, null, 2));
    
    const employee = await prisma.employee.create({
      data: employeeData
    });

    console.log('Çalışan başarıyla oluşturuldu:', employee.id);
    return NextResponse.json(employee, { status: 201 });
    
  } catch (error) {
    console.error("Çalışan eklenirken DETAYLI hata:", error);
    console.error("Hata mesajı:", error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error("Hata stack:", error instanceof Error ? error.stack : 'Stack yok');
    
    return NextResponse.json(
      { 
        error: "Çalışan eklenirken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
} 