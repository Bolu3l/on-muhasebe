import { NextRequest, NextResponse } from "next/server";

// Prisma import yok - sadece test için

// Mock data 
const mockEmployees = [
  {
    id: 'emp-1',
    name: 'Ahmet Yılmaz',
    position: 'Muhasebeci',
    department: 'Muhasebe',
    startDate: '2023-01-15',
    salary: 15000,
    email: 'ahmet@example.com',
    phone: '555-0101',
    address: 'İstanbul',
    taxId: '12345678901',
    socialSecurityNumber: '123456789',
    bankAccount: 'TR123456789',
    status: 'ACTIVE',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'emp-2',
    name: 'Ayşe Demir',
    position: 'Satış Temsilcisi',
    department: 'Satış',
    startDate: '2023-03-20',
    salary: 12000,
    email: 'ayse@example.com',
    phone: '555-0102',
    address: 'Ankara',
    taxId: '12345678902',
    socialSecurityNumber: '123456790',
    bankAccount: 'TR123456790',
    status: 'ACTIVE',
    createdAt: '2023-03-20T10:00:00Z',
    updatedAt: '2023-03-20T10:00:00Z'
  }
];

// GET endpoint - Mock employees listesi döndür
export async function GET() {
  try {
    console.log('Employee GET API çağrıldı');
    
    // Mock data döndür
    return NextResponse.json(mockEmployees);
    
  } catch (error) {
    console.error("Employee GET API hatası:", error);
    return NextResponse.json({
      status: "error",
      message: "Employees GET API hatası",
      error: String(error)
    }, { status: 500 });
  }
}

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