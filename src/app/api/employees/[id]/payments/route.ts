import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";
import { v4 as uuidv4 } from 'uuid';

// GET - Belirli bir çalışanın maaş ve prim ödemelerini getir (Prisma)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan ödemeleri istendi - Prisma kullanılıyor, ID: ${id}`);

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

    // Önce çalışanın var olup olmadığını kontrol et - Prisma'da
    const employee = await prisma.employee.findUnique({
      where: { id: id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // URL'den filtreleme parametrelerini al
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const status = url.searchParams.get("status");

    // Filtreleme koşullarını hazırla
    let whereClause: any = { employeeId: id };
    
    if (startDate) {
      whereClause.paymentDate = { 
        ...whereClause.paymentDate,
        gte: new Date(startDate) 
      };
    }
    
    if (endDate) {
      whereClause.paymentDate = { 
        ...whereClause.paymentDate,
        lte: new Date(endDate) 
      };
    }

    if (status) {
      whereClause.status = status;
    }

    // Çalışanın tüm ödemelerini Prisma'dan getir
    const payments = await prisma.salaryPayment.findMany({
      where: whereClause,
      orderBy: { paymentDate: 'desc' }
    });

    // Decimal değerleri sayıya dönüştür ve API formatına uygun hale getir
    const processedPayments = payments.map((payment: any) => ({
      ...payment,
      amount: payment.grossSalary ? Number(payment.grossSalary.toString()) : 0, // grossSalary'yi amount olarak döndür
      taxAmount: payment.incomeTax ? Number(payment.incomeTax.toString()) : 0, // incomeTax'i taxAmount olarak döndür
      netAmount: payment.netSalary ? Number(payment.netSalary.toString()) : 0,
      grossSalary: payment.grossSalary ? Number(payment.grossSalary.toString()) : 0,
      incomeTax: payment.incomeTax ? Number(payment.incomeTax.toString()) : 0,
      socialSecurity: payment.socialSecurity ? Number(payment.socialSecurity.toString()) : 0,
      unemploymentInsurance: payment.unemploymentInsurance ? Number(payment.unemploymentInsurance.toString()) : 0,
      bonus: payment.bonus ? Number(payment.bonus.toString()) : 0,
      // Uyumluluk için type alanını ekle
      type: payment.bonus && Number(payment.bonus.toString()) > 0 ? "BONUS" : "SALARY"
    }));

    console.log(`${processedPayments.length} ödeme Prisma'dan getirildi`);
    return NextResponse.json(processedPayments);
  } catch (error: any) {
    console.error("Ödemeler Prisma'dan getirilirken hata:", error);
    return NextResponse.json(
      { error: "Ödemeler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Belirli bir çalışan için yeni ödeme ekle (Prisma)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Yeni ödeme ekleme isteği - Prisma kullanılıyor, Çalışan ID: ${id}`, body);

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

    // Çalışanın varlığını kontrol et - Prisma'da
    const employee = await prisma.employee.findUnique({
      where: { id: id }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Zorunlu alanları kontrol et
    if (!body.paymentDate || !body.amount) {
      return NextResponse.json(
        { error: "Ödeme tarihi ve miktar zorunlu alanlardır" },
        { status: 400 }
      );
    }

    // Miktar ve vergi miktarını sayısal değere dönüştür
    const amount = parseFloat(body.amount);
    const taxAmount = body.taxAmount ? parseFloat(body.taxAmount) : 0;
    const socialSecurity = body.socialSecurity ? parseFloat(body.socialSecurity) : 0;
    const unemploymentInsurance = body.unemploymentInsurance ? parseFloat(body.unemploymentInsurance) : 0;
    const bonus = body.bonus ? parseFloat(body.bonus) : 0;
    
    if (isNaN(amount)) {
      return NextResponse.json(
        { error: "Miktar geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Net tutarı hesapla
    const netAmount = amount - taxAmount - socialSecurity - unemploymentInsurance + bonus;

    // Ödeme dönemini belirle
    const paymentDate = new Date(body.paymentDate);
    const paymentPeriod = `${paymentDate.getFullYear()}-${(paymentDate.getMonth() + 1).toString().padStart(2, '0')}`;

    // Status değerini enum'a uygun hale getir
    const mapStatus = (status: string) => {
      switch(status?.toUpperCase()) {
        case 'PENDING': return 'PENDING';
        case 'PAID': return 'PAID';
        case 'CANCELLED': return 'CANCELLED';
        default: return 'PAID';
      }
    };

    // Ödeme verilerini hazırla
    const paymentData = {
      id: uuidv4(),
      employeeId: id,
      companyId: employee.companyId,
      grossSalary: amount,
      incomeTax: taxAmount,
      socialSecurity: socialSecurity,
      unemploymentInsurance: unemploymentInsurance,
      netSalary: netAmount,
      bonus: bonus,
      paymentDate: paymentDate,
      paymentPeriod: paymentPeriod,
      status: mapStatus(body.status),
      notes: body.description || body.notes || null
    };

    // Ödeme oluştur - Prisma'da
    const payment = await prisma.salaryPayment.create({
      data: paymentData as any
    });

    // Decimal değerleri sayıya dönüştür ve API formatına uygun hale getir
    const processedPayment = {
      ...payment,
      amount: payment.grossSalary ? Number(payment.grossSalary.toString()) : 0,
      taxAmount: payment.incomeTax ? Number(payment.incomeTax.toString()) : 0,
      netAmount: payment.netSalary ? Number(payment.netSalary.toString()) : 0,
      grossSalary: payment.grossSalary ? Number(payment.grossSalary.toString()) : 0,
      incomeTax: payment.incomeTax ? Number(payment.incomeTax.toString()) : 0,
      socialSecurity: payment.socialSecurity ? Number(payment.socialSecurity.toString()) : 0,
      unemploymentInsurance: payment.unemploymentInsurance ? Number(payment.unemploymentInsurance.toString()) : 0,
      bonus: payment.bonus ? Number(payment.bonus.toString()) : 0,
      type: payment.bonus && Number(payment.bonus.toString()) > 0 ? "BONUS" : "SALARY"
    };

    console.log(`Ödeme Prisma'da başarıyla oluşturuldu: ${payment.id}`);
    return NextResponse.json(processedPayment, { status: 201 });
  } catch (error: any) {
    console.error("Ödeme Prisma'da eklenirken hata:", error);
    return NextResponse.json(
      { error: "Ödeme eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 