import { NextRequest, NextResponse } from "next/server";
import { employeeOperations } from "@/lib/supabase-db";
import crypto from 'crypto';

// GET - Tüm çalışanları Supabase'den getir
export async function GET() {
  try {
    console.log('Employee GET API çağrıldı - Supabase kullanılıyor');
    
    const employees = await employeeOperations.getAll();
    
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

// POST - Yeni çalışan ekle (Supabase'e kaydet)
export async function POST(req: NextRequest) {
  try {
    console.log('Employee POST API çağrıldı - Supabase kullanılıyor');
    
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

    // Tarihi parse et
    const startDate = new Date(body.startDate);
    console.log('Start date:', startDate);

    // Çalışan verilerini hazırla
    const employeeData = {
      id: crypto.randomUUID(), // Yeni ID oluştur
      name: body.name,
      position: body.position,
      department: body.department,
      startDate: startDate.toISOString(),
      salary: salaryNumber,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
      taxId: body.taxId || null,
      socialSecurityNumber: body.socialSecurityNumber || null,
      bankAccount: body.bankAccount || null,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('Employee data:', JSON.stringify(employeeData, null, 2));
    
    // Supabase ile çalışan oluştur
    const employee = await employeeOperations.create(employeeData);

    console.log('Çalışan başarıyla Supabase\'e kaydedildi:', employee.id);
    return NextResponse.json(employee, { status: 201 });
    
  } catch (error) {
    console.error("Employee Supabase kayıt hatası:", error);
    console.error("Error message:", error instanceof Error ? error.message : 'Bilinmeyen hata');
    
    return NextResponse.json(
      { 
        error: "Çalışan Supabase'e kaydedilirken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 