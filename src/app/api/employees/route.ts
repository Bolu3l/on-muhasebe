import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { EmployeeStatus } from "@prisma/client";

// GET - Tüm çalışanları database'den getir
export async function GET() {
  try {
    console.log('Employee GET API çağrıldı - Database\'den veri çekiliyor');
    
    const employees = await prisma.employee.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    console.log(`${employees.length} çalışan bulundu`);
    return NextResponse.json(employees);
    
  } catch (error) {
    console.error("Employee GET API hatası:", error);
    return NextResponse.json({
      status: "error",
      message: "Çalışanlar getirilirken hata oluştu",
      error: String(error)
    }, { status: 500 });
  }
}

// POST - Yeni çalışan ekle (Database'e kaydet)
export async function POST(req: NextRequest) {
  try {
    console.log('Employee POST API çağrıldı - Database\'e kaydediliyor');
    
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

    // Maaşı sayısal değere dönüştür (Float olduğu için direkt kullanabiliyoruz)
    const salaryNumber = parseFloat(body.salary);
    console.log('Maaş değeri:', salaryNumber);
    
    if (isNaN(salaryNumber)) {
      console.log('Maaş değeri sayısal değil!');
      return NextResponse.json(
        { error: "Maaş geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Tarihi parse et
    const startDate = new Date(body.startDate);
    console.log('Start date:', startDate);

    // Gerçek çalışan database'e kaydet
    console.log('Prisma create işlemi başlatılıyor...');
    const employeeData = {
      name: body.name,
      position: body.position,
      department: body.department,
      startDate: startDate,
      salary: salaryNumber, // Float olduğu için direkt kullan
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
      taxId: body.taxId || null,
      socialSecurityNumber: body.socialSecurityNumber || null,
      bankAccount: body.bankAccount || null,
      status: EmployeeStatus.ACTIVE
    };
    
    console.log('Employee data:', JSON.stringify(employeeData, null, 2));
    
    const employee = await prisma.employee.create({
      data: employeeData
    });

    console.log('Çalışan başarıyla database\'e kaydedildi:', employee.id);
    return NextResponse.json(employee, { status: 201 });
    
  } catch (error) {
    console.error("Employee database kayıt hatası:", error);
    console.error("Hata mesajı:", error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error("Hata stack:", error instanceof Error ? error.stack : 'Stack yok');
    
    return NextResponse.json(
      { 
        error: "Çalışan database'e kaydedilirken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 