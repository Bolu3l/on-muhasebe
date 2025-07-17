import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';

// Belirli ID'ye sahip faturayı getir (Prisma)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura detayları istendi - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    const invoice = await prisma.invoice.findUnique({
      where: { id: id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            companyName: true,
            taxNumber: true
          }
        },
        contact: {
          select: {
            id: true,
            name: true,
            taxNumber: true
          }
        },
        items: true,
        invoiceFiles: true
      }
    });
    
    if (!invoice) {
      return NextResponse.json({ error: 'Fatura bulunamadı' }, { status: 404 });
    }
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedInvoice = {
      ...invoice,
      amount: invoice.amount ? Number(invoice.amount.toString()) : 0,
      vatAmount: invoice.vatAmount ? Number(invoice.vatAmount.toString()) : 0,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0,
      exchangeRate: invoice.exchangeRate ? Number(invoice.exchangeRate.toString()) : 1,
      items: invoice.items ? invoice.items.map(item => ({
        ...item,
        quantity: item.quantity ? Number(item.quantity.toString()) : 0,
        unitPrice: item.unitPrice ? Number(item.unitPrice.toString()) : 0,
        vatRate: item.vatRate ? Number(item.vatRate.toString()) : 0,
        vatAmount: item.vatAmount ? Number(item.vatAmount.toString()) : 0,
        discountRate: item.discountRate ? Number(item.discountRate.toString()) : 0,
        discountAmount: item.discountAmount ? Number(item.discountAmount.toString()) : 0,
        totalAmount: item.totalAmount ? Number(item.totalAmount.toString()) : 0
      })) : []
    };
    
    console.log(`Fatura detayları Prisma'dan başarıyla getirildi: ${id}`);
    return NextResponse.json(processedInvoice);
  } catch (error) {
    console.error('Fatura detayları Prisma\'dan alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Fatura detayları alınırken hata oluştu' },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip faturayı güncelle (Prisma)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    console.log(`Fatura güncelleme isteği - Prisma kullanılıyor, ID: ${id}`, body);
    
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
    
    // Faturanın var olup olmadığını kontrol et
    const invoice = await prisma.invoice.findUnique({
      where: { id: id }
    });
    
    if (!invoice) {
      return NextResponse.json({ error: 'Güncellenecek fatura bulunamadı' }, { status: 404 });
    }
    
    // Güncelleme verilerini hazırla
    const updateData: any = {};
    
    // Basit alanlar
    if (body.invoiceNumber) updateData.invoiceNumber = body.invoiceNumber;
    if (body.invoiceDate) updateData.invoiceDate = new Date(body.invoiceDate);
    if (body.dueDate) updateData.dueDate = new Date(body.dueDate);
    if (body.notes) updateData.notes = body.notes;
    if (body.isPaid !== undefined) updateData.isPaid = body.isPaid;
    if (body.paymentDate) updateData.paymentDate = new Date(body.paymentDate);
    if (body.customerId) updateData.customerId = body.customerId;
    if (body.contactId) updateData.contactId = body.contactId;
    if (body.currency) updateData.currency = body.currency;
    
    // Decimal alanlar
    if (body.amount !== undefined) updateData.amount = parseFloat(body.amount.toString());
    if (body.vatAmount !== undefined) updateData.vatAmount = parseFloat(body.vatAmount.toString());
    if (body.totalAmount !== undefined) updateData.totalAmount = parseFloat(body.totalAmount.toString());
    if (body.exchangeRate !== undefined) updateData.exchangeRate = parseFloat(body.exchangeRate.toString());
    
    // Enum alanlar
    if (body.invoiceType) {
      const mapInvoiceType = (type: string) => {
        switch(type?.toUpperCase()) {
          case 'INCOMING': return 'INCOMING';
          case 'OUTGOING': return 'OUTGOING';
          default: return 'OUTGOING';
        }
      };
      updateData.invoiceType = mapInvoiceType(body.invoiceType);
    }
    
    if (body.status) {
      const mapStatus = (status: string) => {
        switch(status?.toUpperCase()) {
          case 'DRAFT': return 'DRAFT';
          case 'SENT': return 'SENT';
          case 'ACCEPTED': return 'ACCEPTED';
          case 'REJECTED': return 'REJECTED';
          case 'CANCELLED': return 'CANCELLED';
          default: return 'DRAFT';
        }
      };
      updateData.status = mapStatus(body.status);
    }
    
    // Faturayı Prisma'da güncelle
    const updatedInvoice = await prisma.invoice.update({
      where: { id: id },
      data: updateData
    });
    
    console.log(`Fatura Prisma'da başarıyla güncellendi, ID: ${id}`);
    
    return NextResponse.json(updatedInvoice);
  } catch (error: any) {
    console.error('Fatura Prisma\'da güncellenirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Fatura güncellenirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
}

// Belirli ID'ye sahip faturayı sil (Prisma)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log(`Fatura silme isteği - Prisma kullanılıyor, ID: ${id}`);
    
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
    
    // Faturanın var olup olmadığını kontrol et
    const invoice = await prisma.invoice.findUnique({
      where: { id: id }
    });
    
    if (!invoice) {
      return NextResponse.json({ error: 'Silinecek fatura bulunamadı' }, { status: 404 });
    }
    
    // Faturayı Prisma'dan sil (İlişkili dosyalar cascade ile silinecek)
    await prisma.invoice.delete({
      where: { id: id }
    });
    
    console.log(`Fatura Prisma'dan başarıyla silindi, ID: ${id}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Fatura başarıyla silindi',
      id 
    });
  } catch (error: any) {
    console.error('Fatura Prisma\'dan silinirken hata oluştu:', error);
    return NextResponse.json(
      { 
        error: 'Fatura silinirken hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      },
      { status: 500 }
    );
  }
} 