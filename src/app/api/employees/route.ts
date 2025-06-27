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
    
    // Environment variables debug
    console.log('DEBUG - Environment Check:');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 20) + '...');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
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

    // Database connection test
    console.log('Database connection test başlatılıyor...');
    try {
      await prisma.$connect();
      console.log('Database connection başarılı');
    } catch (connectionError) {
      console.error('Database connection hatası:', connectionError);
      throw new Error(`Database connection failed: ${connectionError}`);
    }

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
    console.error("DEBUG: Catch bloğu: Çalışan database'e kaydedilirken bir hata oluştu");
    console.error("DEBUG: Error type:", typeof error);
    console.error("DEBUG: Error constructor:", error?.constructor?.name);
    console.error("DEBUG: Error obj:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.error("DEBUG: Error message:", error instanceof Error ? error.message : 'Error message yok');
    console.error("DEBUG: Error stack:", error instanceof Error ? error.stack : 'Stack trace yok');
    console.error("DEBUG: String(error):", String(error));
    
    // Prisma-specific error handling
    if (error && typeof error === 'object' && 'code' in error) {
      console.error("DEBUG: Prisma error code:", (error as any).code);
      console.error("DEBUG: Prisma error meta:", (error as any).meta);
    }
    
    return NextResponse.json(
      { 
        error: "Çalışan database'e kaydedilirken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        databaseUrlExists: !!process.env.DATABASE_URL
      },
      { status: 500 }
    );
  }
} 