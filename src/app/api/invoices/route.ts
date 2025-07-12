import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    console.log('Faturalar API - Prisma kullanılıyor');
    
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
    
    // Kullanıcının faturalarını getir
    const invoices = await prisma.invoice.findMany({
      where: { userId: decoded.userId },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Faturalar API - ${invoices.length} fatura getirildi.`);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedInvoices = invoices.map(invoice => ({
      ...invoice,
      amount: invoice.amount ? Number(invoice.amount.toString()) : 0,
      vatAmount: invoice.vatAmount ? Number(invoice.vatAmount.toString()) : 0,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0
    }));
    
    return NextResponse.json(processedInvoices);
    
  } catch (error: any) {
    console.error('Faturalar API hatası:', error);
    console.error('Error type:', typeof error);
    console.error('Error toString:', error?.toString());
    console.error('Error JSON:', JSON.stringify(error, null, 2));
    
    return NextResponse.json({ 
      error: error?.message || error?.toString() || 'Bilinmeyen hata',
      errorType: typeof error,
      errorString: error?.toString(),
      errorJSON: JSON.stringify(error, null, 2),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
    
    // Kullanıcının ilk şirketini al
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { companies: true }
    });
    
    if (!user || user.companies.length === 0) {
      return NextResponse.json({ error: 'Kullanıcı veya şirket bulunamadı' }, { status: 404 });
    }
    
    const companyId = user.companies[0].id;
    
    const data = await request.json();
    console.log('Fatura oluşturma için alınan veriler:', JSON.stringify(data, null, 2));
    
    // Gerekli alanları kontrol edelim
    if (!data.invoiceNumber) {
      return NextResponse.json({ error: 'Fatura numarası gereklidir' }, { status: 400 });
    }
    
    const invoiceId = uuidv4();
    
    // Tarih alanlarını doğrulama ve düzeltme
    let invoiceDate = null;
    if (data.invoiceDate) {
      try {
        if (typeof data.invoiceDate === 'string' && data.invoiceDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
          const [year, month, day] = data.invoiceDate.split('-').map(Number);
          const normalizedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
            invoiceDate = new Date(`${normalizedDate}T00:00:00.000Z`);
            
            if (isNaN(invoiceDate.getTime())) {
              console.error('API - Tarih dönüşümü başarısız:', data.invoiceDate);
              invoiceDate = null;
            }
          }
        } else {
          invoiceDate = new Date(data.invoiceDate);
          if (isNaN(invoiceDate.getTime())) {
            console.error('API - Geçersiz fatura tarihi:', data.invoiceDate);
            invoiceDate = null;
          }
        }
      } catch (e) {
        console.error('API - Fatura tarihi dönüştürme hatası:', e);
      }
    }
    
    let dueDate = null;
    if (data.dueDate) {
      try {
        if (typeof data.dueDate === 'string' && data.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
          const [year, month, day] = data.dueDate.split('-').map(Number);
          const normalizedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
            dueDate = new Date(`${normalizedDate}T00:00:00.000Z`);
            
            if (isNaN(dueDate.getTime())) {
              console.error('API - Vade tarihi dönüşümü başarısız:', data.dueDate);
              dueDate = null;
            }
          }
        } else {
          dueDate = new Date(data.dueDate);
          if (isNaN(dueDate.getTime())) {
            console.error('API - Geçersiz vade tarihi:', data.dueDate);
            dueDate = null;
          }
        }
      } catch (e) {
        console.error('API - Vade tarihi dönüştürme hatası:', e);
      }
    }
    
    // Tutar bilgilerini doğrulama
    let totalAmount = 0;
    if (data.totalAmount !== undefined && data.totalAmount !== null) {
      try {
        if (typeof data.totalAmount === 'string') {
          totalAmount = parseFloat(data.totalAmount);
        } else {
          totalAmount = data.totalAmount;
        }
      } catch (e) {
        console.error('API - Toplam tutar dönüştürme hatası:', e);
      }
    }
    
    // Mal hizmet tutarı
    let amount = 0;
    if (data.amount !== undefined && data.amount !== null) {
      try {
        if (typeof data.amount === 'string') {
          amount = parseFloat(data.amount);
        } else {
          amount = data.amount;
        }
        console.log('API - İşlenen mal hizmet tutarı:', amount);
      } catch (e) {
        console.error('API - Mal hizmet tutarı dönüştürme hatası:', e);
      }
    }
    
    // KDV oranı
    let taxRate = 0;
    if (data.taxRate !== undefined && data.taxRate !== null) {
      try {
        if (typeof data.taxRate === 'string') {
          // KDV oranı yüzde olarak gelirse (örn: %18 veya 18%)
          const cleanTaxRate = data.taxRate.replace(/[^\d.,]/g, '');
          taxRate = parseFloat(cleanTaxRate);
        } else {
          taxRate = data.taxRate;
        }
        console.log('API - İşlenen KDV oranı:', taxRate);
      } catch (e) {
        console.error('API - KDV oranı dönüştürme hatası:', e);
      }
    }
    
    // KDV tutarı
    let taxAmount = 0;
    if (data.taxAmount !== undefined && data.taxAmount !== null) {
      try {
        if (typeof data.taxAmount === 'string') {
          taxAmount = parseFloat(data.taxAmount);
        } else {
          taxAmount = data.taxAmount;
        }
        console.log('API - İşlenen KDV tutarı:', taxAmount);
      } catch (e) {
        console.error('API - KDV tutarı dönüştürme hatası:', e);
      }
    }
    
    // Müşteri/Satıcı bilgilerini kontrol et
    const issuerName = data.issuerName || '';
    const recipientName = data.recipientName || '';
    
    console.log('API - Satıcı ve alıcı bilgileri:', { issuerName, recipientName });
    
    // Status değerini enum'a uygun hale getir
    const mapStatus = (status: string) => {
      switch(status?.toLowerCase()) {
        case 'draft': return 'DRAFT';
        case 'sent': return 'SENT';
        case 'accepted': return 'ACCEPTED';
        case 'rejected': return 'REJECTED';
        case 'cancelled': return 'CANCELLED';
        default: return 'DRAFT';
      }
    };
    
    // Type değerini enum'a uygun hale getir
    const mapType = (type: string) => {
      switch(type?.toLowerCase()) {
        case 'incoming': return 'INCOMING';
        case 'outgoing': return 'OUTGOING';
        default: return 'OUTGOING';
      }
    };

    // İlk olarak faturayı oluşturalım
    const invoice = await prisma.invoice.create({
      data: {
        id: invoiceId,
        userId: decoded.userId,
        companyId: companyId,
        invoiceNumber: data.invoiceNumber,
        invoiceType: mapType(data.type),
        invoiceDate: invoiceDate || new Date(),
        dueDate: dueDate,
        amount: amount,
        vatAmount: taxAmount,
        totalAmount: totalAmount,
        status: mapStatus(data.status),
        notes: data.notes || 'OCR ile taranmış fatura',
        customerId: data.customerId || null,
      }
    });
    
    console.log('Fatura oluşturuldu:', invoice.id, 'Veri:', {
      invoiceNumber: invoice.invoiceNumber,
      // issuerName: invoice.issuerName,
      // recipientName: invoice.recipientName,
      totalAmount: invoice.totalAmount,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate
    });
    
    // Eğer taranmış dosya bilgisi varsa, Supabase Storage'a yükleyelim
    let invoiceFile = null;
    
    if (data.tempFileId && data.tempFileName) {
      try {
        // Supabase Storage'a dosya yükleme işlemi burada yapılacak
        // Şimdilik sadece dosya kaydını oluşturalım
        const { supabase } = await import('@/lib/supabase');
        
        // Dosya kaydını oluştur
        const { data: fileData, error: fileError } = await supabase
          .from('invoice_files')
          .insert({
            id: uuidv4(),
            filename: data.tempFileName.substring(data.tempFileName.indexOf('-') + 1),
            fileKey: data.tempFileName,
            fileSize: data.fileSize || 0,
            mimeType: data.fileType || 'application/pdf',
            invoiceId: invoice.id,
            uploadDate: new Date(),
            updatedAt: new Date()
          })
          .select()
          .single();
        
        if (fileError) {
          console.error('Dosya kaydı oluşturma hatası:', fileError);
        } else {
          invoiceFile = fileData;
          console.log('Fatura dosyası kaydedildi:', invoiceFile.id);
        }
      } catch (fileError) {
        console.error('Dosya işleme hatası:', fileError);
        // Dosya işleme hatası, ama fatura zaten oluşturuldu, devam edelim
      }
    }
    
    // Başarılı cevap döndür
    return NextResponse.json({
      success: true,
      message: 'Fatura başarıyla oluşturuldu',
      invoiceId: invoice.id,
      fileId: invoiceFile?.id,
      invoiceData: {
        invoiceNumber: invoice.invoiceNumber,
        issuerName: invoice.issuerName,
        recipientName: invoice.recipientName,
        amount: invoice.amount,
        taxRate: invoice.taxRate,
        taxAmount: invoice.taxAmount,
        totalAmount: invoice.totalAmount,
        invoiceDate: invoice.invoiceDate,
        dueDate: invoice.dueDate
      }
    });
    
  } catch (error) {
    console.error('Fatura oluşturma hatası:', error);
    return NextResponse.json({
      error: 'Fatura oluşturulurken bir hata oluştu',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 