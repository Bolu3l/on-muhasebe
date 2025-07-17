import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";

// GET - Müşteri detayını getir
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    const customer = await prisma.customer.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId
      }
    });

    if (!customer) {
      return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Müşteri detayı API hatası:", error);
    return NextResponse.json({
      error: "Müşteri detayı getirilirken hata oluştu",
      details: String(error)
    }, { status: 500 });
  }
}

// PUT - Müşteri güncelle
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    const body = await req.json();

    // Müşterinin varlığını ve sahipliğini kontrol et
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId
      }
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });
    }

    // Müşteriyi güncelle
    const updatedCustomer = await prisma.customer.update({
      where: { id: params.id },
      data: {
        name: body.name || existingCustomer.name,
        companyName: body.companyName !== undefined ? body.companyName : existingCustomer.companyName,
        taxNumber: body.taxNumber !== undefined ? body.taxNumber : existingCustomer.taxNumber,
        taxOffice: body.taxOffice !== undefined ? body.taxOffice : existingCustomer.taxOffice,
        mersisNo: body.mersisNo !== undefined ? body.mersisNo : existingCustomer.mersisNo,
        address: body.address !== undefined ? body.address : existingCustomer.address,
        district: body.district !== undefined ? body.district : existingCustomer.district,
        city: body.city !== undefined ? body.city : existingCustomer.city,
        postalCode: body.postalCode !== undefined ? body.postalCode : existingCustomer.postalCode,
        country: body.country || existingCustomer.country,
        phone: body.phone !== undefined ? body.phone : existingCustomer.phone,
        mobile: body.mobile !== undefined ? body.mobile : existingCustomer.mobile,
        email: body.email !== undefined ? body.email : existingCustomer.email,
        website: body.website !== undefined ? body.website : existingCustomer.website,
        sector: body.sector !== undefined ? body.sector : existingCustomer.sector,
        customerType: body.customerType || existingCustomer.customerType,
        priceList: body.priceList !== undefined ? body.priceList : existingCustomer.priceList,
        paymentTerms: body.paymentTerms !== undefined ? body.paymentTerms : existingCustomer.paymentTerms,
        paymentMethod: body.paymentMethod !== undefined ? body.paymentMethod : existingCustomer.paymentMethod,
        creditLimit: body.creditLimit !== undefined ? (body.creditLimit ? parseFloat(body.creditLimit) : null) : existingCustomer.creditLimit,
        discountRate: body.discountRate !== undefined ? parseFloat(body.discountRate) : existingCustomer.discountRate,
        currency: body.currency || existingCustomer.currency,
        contactPerson: body.contactPerson !== undefined ? body.contactPerson : existingCustomer.contactPerson,
        contactTitle: body.contactTitle !== undefined ? body.contactTitle : existingCustomer.contactTitle,
        notes: body.notes !== undefined ? body.notes : existingCustomer.notes,
        isActive: body.isActive !== undefined ? body.isActive : existingCustomer.isActive,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Müşteri güncelleme hatası:", error);
    return NextResponse.json({
      error: "Müşteri güncellenirken hata oluştu",
      details: String(error)
    }, { status: 500 });
  }
}

// DELETE - Müşteri sil
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Müşterinin varlığını ve sahipliğini kontrol et
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        id: params.id,
        userId: decoded.userId
      }
    });

    if (!existingCustomer) {
      return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });
    }

    // Müşteriyle ilişkili fatura var mı kontrol et
    const relatedInvoices = await prisma.invoice.findMany({
      where: {
        customerId: params.id
      }
    });

    if (relatedInvoices.length > 0) {
      return NextResponse.json({ 
        error: 'Bu müşteriye ait faturalar bulunmaktadır. Önce faturaları silmelisiniz.' 
      }, { status: 400 });
    }

    // Müşteriyi sil
    await prisma.customer.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Müşteri başarıyla silindi' });
  } catch (error) {
    console.error("Müşteri silme hatası:", error);
    return NextResponse.json({
      error: "Müşteri silinirken hata oluştu",
      details: String(error)
    }, { status: 500 });
  }
} 