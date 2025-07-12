import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// GET - Tüm müşterileri getir
export async function GET(req: NextRequest) {
  try {
    console.log('Müşteriler API - Prisma kullanılıyor');
    
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
    
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('active');
    
    // Kullanıcının müşterilerini getir
    let whereClause: any = { userId: decoded.userId };
    
    // Aktif müşteri filtresi
    if (isActive === 'true') {
      whereClause.isActive = true;
    }
    
    const customers = await prisma.customer.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`${customers.length} müşteri getirildi`);
    return NextResponse.json(customers);
    
  } catch (error) {
    console.error("Müşteriler API hatası:", error);
    return NextResponse.json({
      status: "error",
      message: "Müşteriler getirilirken hata oluştu",
      error: String(error)
    }, { status: 500 });
  }
}

// POST - Yeni müşteri ekle
export async function POST(req: NextRequest) {
  try {
    console.log('Müşteri POST API çağrıldı');
    
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
    if (!body.name) {
      return NextResponse.json(
        { error: "Müşteri adı zorunludur" },
        { status: 400 }
      );
    }

    // CustomerType enum değerini kontrol et
    const mapCustomerType = (type: string) => {
      switch(type?.toUpperCase()) {
        case 'INDIVIDUAL': return 'INDIVIDUAL';
        case 'CORPORATE': return 'CORPORATE';
        case 'GOVERNMENT': return 'GOVERNMENT';
        default: return 'INDIVIDUAL';
      }
    };

    // Müşteri verilerini hazırla
    const customerData = {
      id: uuidv4(),
      userId: decoded.userId,
      companyId: companyId,
      customerCode: body.customerCode || `MUS-${Date.now()}`, // Otomatik kod
      name: body.name,
      companyName: body.companyName || null,
      taxNumber: body.taxNumber || null,
      taxOffice: body.taxOffice || null,
      mersisNo: body.mersisNo || null,
      address: body.address || null,
      district: body.district || null,
      city: body.city || null,
      postalCode: body.postalCode || null,
      country: body.country || 'Türkiye',
      phone: body.phone || null,
      mobile: body.mobile || null,
      email: body.email || null,
      website: body.website || null,
      sector: body.sector || null,
      customerType: mapCustomerType(body.customerType),
      priceList: body.priceList || null,
      paymentTerms: body.paymentTerms || null,
      paymentMethod: body.paymentMethod || null,
      creditLimit: body.creditLimit ? parseFloat(body.creditLimit) : null,
      discountRate: body.discountRate ? parseFloat(body.discountRate) : 0,
      currency: body.currency || 'TRY',
      contactPerson: body.contactPerson || null,
      contactTitle: body.contactTitle || null,
      notes: body.notes || null,
      isActive: true,
    };
    
    console.log('Müşteri verisi:', JSON.stringify(customerData, null, 2));
    
    // Müşteri oluştur
    const customer = await prisma.customer.create({
      data: customerData as any
    });

    console.log('Müşteri başarıyla oluşturuldu:', customer.id);
    return NextResponse.json(customer, { status: 201 });
    
  } catch (error) {
    console.error("Müşteri oluşturma hatası:", error);
    return NextResponse.json(
      { 
        error: "Müşteri oluşturulurken bir hata oluştu",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 