import { NextRequest, NextResponse } from "next/server";

// Prisma import yok - sadece test için

// POST - Yeni çalışan ekle (Prisma olmadan test)
export async function POST(req: NextRequest) {
  try {
    console.log('Employee POST API çağrıldı (Prisma olmadan)');
    
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

    // Mock çalışan verisi döndür - Prisma create yapmadan
    console.log('Mock çalışan verisi oluşturuluyor...');
    const mockEmployee = {
      id: 'mock-' + Date.now(),
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
    
    console.log('Mock çalışan oluşturuldu:', mockEmployee.id);
    return NextResponse.json(mockEmployee, { status: 201 });
    
  } catch (error) {
    console.error("API GENEL HATA:", error);
    console.error("Hata mesajı:", error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error("Hata stack:", error instanceof Error ? error.stack : 'Stack yok');
    
    return NextResponse.json(
      { 
        error: "API çalışırken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET endpoint de ekleyelim
export async function GET() {
  try {
    return NextResponse.json({
      status: "success",
      message: "Employee API çalışıyor",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "GET API hatası",
      error: String(error)
    }, { status: 500 });
  }
} 