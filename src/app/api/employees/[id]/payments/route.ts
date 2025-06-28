import { NextRequest, NextResponse } from "next/server";
import { employeeOperations, salaryPaymentOperations } from "@/lib/supabase-db";

// GET - Belirli bir çalışanın maaş ve prim ödemelerini getir (Supabase)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan ödemeleri istendi - Supabase kullanılıyor, ID: ${id}`);

    // Önce çalışanın var olup olmadığını kontrol et - Supabase'de
    try {
      const employee = await employeeOperations.getById(id);
      if (!employee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // URL'den filtreleme parametrelerini al
    const url = new URL(req.url);
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const type = url.searchParams.get("type");

    // Çalışanın tüm ödemelerini Supabase'den getir
    let payments = await salaryPaymentOperations.getByEmployeeId(id);

    // Client-side filtering uygulanması (Supabase'de karmaşık filter yerine)
    if (startDate) {
      const startDateObj = new Date(startDate);
      payments = payments.filter((payment: any) => new Date(payment.paymentDate) >= startDateObj);
    }
    
    if (endDate) {
      const endDateObj = new Date(endDate);
      payments = payments.filter((payment: any) => new Date(payment.paymentDate) <= endDateObj);
    }

    if (type) {
      payments = payments.filter((payment: any) => payment.type === type);
    }

    // Decimal değerleri sayıya dönüştür
    const processedPayments = payments.map((payment: any) => ({
      ...payment,
      amount: payment.amount ? Number(payment.amount.toString()) : 0,
      taxAmount: payment.taxAmount ? Number(payment.taxAmount.toString()) : 0,
      netAmount: payment.netAmount ? Number(payment.netAmount.toString()) : 0
    }));

    console.log(`${processedPayments.length} ödeme Supabase'den getirildi`);
    return NextResponse.json(processedPayments);
  } catch (error: any) {
    console.error("Ödemeler Supabase'den getirilirken hata:", error);
    return NextResponse.json(
      { error: "Ödemeler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Belirli bir çalışan için yeni ödeme ekle (Supabase)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Yeni ödeme ekleme isteği - Supabase kullanılıyor, Çalışan ID: ${id}`, body);

    // Çalışanın varlığını kontrol et - Supabase'de
    try {
      const employee = await employeeOperations.getById(id);
      if (!employee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
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
    let taxAmount = body.taxAmount ? parseFloat(body.taxAmount) : 0;
    
    if (isNaN(amount)) {
      return NextResponse.json(
        { error: "Miktar geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    if (isNaN(taxAmount)) {
      return NextResponse.json(
        { error: "Vergi miktarı geçerli bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    // Net tutarı hesapla
    const netAmount = amount - taxAmount;

    // Ödeme oluştur - Supabase'de
    const payment = await salaryPaymentOperations.create({
      employeeId: id,
      paymentDate: new Date(body.paymentDate).toISOString(),
      amount,
      taxAmount,
      netAmount,
      type: body.type || "SALARY", // SALARY, BONUS, ALLOWANCE, ADVANCE, OTHER
      notes: body.description || null, // description alanını notes'a map ediyoruz
      paymentMethod: body.paymentMethod || null,
      status: body.status || "PAID",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // Decimal değerleri sayıya dönüştür
    const processedPayment = {
      ...payment,
      amount: payment.amount ? Number(payment.amount.toString()) : 0,
      taxAmount: payment.taxAmount ? Number(payment.taxAmount.toString()) : 0,
      netAmount: payment.netAmount ? Number(payment.netAmount.toString()) : 0
    };

    console.log(`Ödeme Supabase'de başarıyla oluşturuldu: ${payment.id}`);
    return NextResponse.json(processedPayment, { status: 201 });
  } catch (error: any) {
    console.error("Ödeme Supabase'de eklenirken hata:", error);
    return NextResponse.json(
      { error: "Ödeme eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 