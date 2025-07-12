import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import crypto from 'crypto';

// GET - Tüm çalışanları Prisma'dan getir
export async function GET(request: Request) {
  try {
    console.log('Employee GET API çağrıldı - Prisma kullanılıyor');
    
    // Auth token'ını kontrol et
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    // Kullanıcının çalışanlarını getir
    const employees = await prisma.employee.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    });
    
    // Decimal alanları dönüştür
    const processedEmployees = employees.map((employee: any) => ({
      ...employee,
      salary: employee.salary ? Number(employee.salary.toString()) : 0
    }));
    
    console.log(`${processedEmployees.length} çalışan bulundu`);
    return NextResponse.json(processedEmployees);
    
  } catch (error) {
    console.error("Employee GET API hatası:", error);
    return NextResponse.json({
      status: "error",
      message: "Çalışanlar getirilirken hata oluştu",
      error: String(error)
    }, { status: 500 });
  }
}

// POST - Yeni çalışan ekle (Prisma'ya kaydet)
export async function POST(req: NextRequest) {
  try {
    console.log('Employee POST API çağrıldı - Prisma kullanılıyor');
    
    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }
    
    // Kullanıcının ilk şirketini al
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { companies: true }
    });
    
    if (!user || user.companies.length === 0) {
      return NextResponse.json({ error: 'Kullanıcı veya şirket bulunamadı' }, { status: 404 });
    }
    
    const companyId = user.companies[0].id;
    
    const body = await req.json();
    console.log('Gelen form verisi:', JSON.stringify(body, null, 2));
    
    // Zorunlu alanları kontrol et
    if (!body.firstName || !body.lastName || !body.position || !body.department || !body.startDate || !body.salary || !body.tcNumber) {
      console.log('Zorunlu alan eksik!');
      return NextResponse.json(
        { error: "Ad, soyad, TC kimlik no, pozisyon, departman, başlangıç tarihi ve maaş zorunlu alanlardır" },
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
      userId: decoded.userId,
      companyId: companyId,
      firstName: body.firstName,
      lastName: body.lastName,
      tcNumber: body.tcNumber,
      sgkNumber: body.sgkNumber || null,
      position: body.position,
      department: body.department,
      startDate: startDate,
      endDate: body.endDate ? new Date(body.endDate) : null,
      salary: salaryNumber,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
      status: 'ACTIVE',
    };
    
    console.log('Employee data:', JSON.stringify(employeeData, null, 2));
    
    // Prisma ile çalışan oluştur
    const employee = await prisma.employee.create({
      data: employeeData as any
    });

    console.log('Çalışan başarıyla Prisma\'ya kaydedildi:', employee.id);
    return NextResponse.json(employee, { status: 201 });
    
  } catch (error) {
    console.error("Employee Prisma kayıt hatası:", error);
    console.error("Error message:", error instanceof Error ? error.message : 'Bilinmeyen hata');
    
    return NextResponse.json(
      { 
        error: "Çalışan Prisma'ya kaydedilirken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 