import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const TEMP_STORAGE_PATH = process.env.INVOICE_STORAGE_PATH || path.join(process.cwd(), 'storage', 'invoices');

export async function GET() {
  try {
    // Veritabanı bağlantısını ve URL'yi logla
    console.log('Faturalar API - Veritabanı URL:', process.env.DATABASE_URL);
    
    // Bağlantı testi
    const dbTest = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Faturalar API - Veritabanı testi başarılı:', dbTest);
    
    // Fatura sayısını kontrol et
    const count = await prisma.invoice.count();
    console.log(`Faturalar API - Invoice tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      return NextResponse.json([]);
    }
    
    // Faturaları getir
    const invoices = await prisma.invoice.findMany({
      select: {
        id: true,
        invoiceNumber: true,
        amount: true,          // Mal hizmet tutarı
        taxRate: true,         // KDV oranı
        taxAmount: true,       // KDV tutarı
        totalAmount: true,
        invoiceDate: true,
        dueDate: true,
        status: true,
        type: true,
        issuerName: true,
        recipientName: true,
        customer: {
          select: {
            id: true,
            name: true
          }
        },
        InvoiceFile: true
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Faturalar API - ${invoices.length} fatura getirildi.`);
    
    // Tarih ve müşteri bilgilerini logla
    if (invoices.length > 0) {
      console.log('İlk fatura örneği:', {
        invoiceNumber: invoices[0].invoiceNumber,
        issuerName: invoices[0].issuerName,
        recipientName: invoices[0].recipientName,
        invoiceDate: invoices[0].invoiceDate,
        amount: invoices[0].amount,
        taxRate: invoices[0].taxRate,
        taxAmount: invoices[0].taxAmount,
        totalAmount: invoices[0].totalAmount
      });
    }
    
    // Fatura tiplerini kontrol et
    const typeCounts = {
      incoming: invoices.filter(inv => inv.type === 'incoming').length,
      outgoing: invoices.filter(inv => inv.type === 'outgoing').length,
      unknown: invoices.filter(inv => !inv.type).length
    };
    console.log('Fatura tipleri:', typeCounts);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedInvoices = invoices.map(invoice => ({
      ...invoice,
      amount: invoice.amount ? Number(invoice.amount.toString()) : 0,
      taxRate: invoice.taxRate ? Number(invoice.taxRate.toString()) : 0,
      taxAmount: invoice.taxAmount ? Number(invoice.taxAmount.toString()) : 0,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0
    }));
    
    return NextResponse.json(processedInvoices);
    
  } catch (error) {
    console.error('Faturalar API hatası:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
        // ISO tarih formatını kontrol et (YYYY-MM-DD)
        // String olarak gelen tarih değerini doğrudan kullanabiliriz
        if (typeof data.invoiceDate === 'string' && data.invoiceDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
          const [year, month, day] = data.invoiceDate.split('-').map(Number);
          
          // Tarihi normalize et - ay ve gün için iki basamak kullan
          const normalizedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          // Geçerli bir tarih mi kontrol et
          if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
            // Prisma için yeni Date nesnesi oluştur
            invoiceDate = new Date(`${normalizedDate}T00:00:00.000Z`);
            
            if (isNaN(invoiceDate.getTime())) {
              console.error('API - Tarih dönüşümü başarısız:', data.invoiceDate);
              invoiceDate = null;
            } else {
              console.log('API - İşlenen fatura tarihi:', invoiceDate, 'Orijinal:', data.invoiceDate);
            }
          } else {
            console.error('API - Geçersiz tarih değerleri:', { day, month, year });
          }
        } else {
          // Eski yöntem - data.invoiceDate bir Date nesnesi oluşturmaya çalış
          invoiceDate = new Date(data.invoiceDate);
          if (isNaN(invoiceDate.getTime())) {
            console.error('API - Geçersiz fatura tarihi:', data.invoiceDate);
            invoiceDate = null;
          } else {
            console.log('API - İşlenen fatura tarihi (yedek yöntem):', invoiceDate);
          }
        }
      } catch (e) {
        console.error('API - Fatura tarihi dönüştürme hatası:', e);
      }
    }
    
    let dueDate = null;
    if (data.dueDate) {
      try {
        // ISO tarih formatını kontrol et (YYYY-MM-DD)
        if (typeof data.dueDate === 'string' && data.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
          const [year, month, day] = data.dueDate.split('-').map(Number);
          
          // Tarihi normalize et
          const normalizedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          // Geçerli bir tarih mi kontrol et
          if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
            // Prisma için yeni Date nesnesi oluştur
            dueDate = new Date(`${normalizedDate}T00:00:00.000Z`);
            
            if (isNaN(dueDate.getTime())) {
              console.error('API - Vade tarihi dönüşümü başarısız:', data.dueDate);
              dueDate = null;
            } else {
              console.log('API - İşlenen vade tarihi:', dueDate, 'Orijinal:', data.dueDate);
            }
          } else {
            console.error('API - Geçersiz vade tarihi değerleri:', { day, month, year });
          }
        } else {
          // Eski yöntem - data.dueDate bir Date nesnesi oluşturmaya çalış
          dueDate = new Date(data.dueDate);
          if (isNaN(dueDate.getTime())) {
            console.error('API - Geçersiz vade tarihi:', data.dueDate);
            dueDate = null;
          } else {
            console.log('API - İşlenen vade tarihi (yedek yöntem):', dueDate);
          }
        }
      } catch (e) {
        console.error('API - Vade tarihi dönüştürme hatası:', e);
      }
    }
    
    // Tutar bilgilerini doğrulama
    // Toplam tutar
    let totalAmount = 0;
    if (data.totalAmount !== undefined && data.totalAmount !== null) {
      try {
        if (typeof data.totalAmount === 'string') {
          totalAmount = parseFloat(data.totalAmount);
        } else {
          totalAmount = data.totalAmount;
        }
        console.log('API - İşlenen toplam tutar:', totalAmount);
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
    
    // İlk olarak faturayı oluşturalım
    const invoice = await prisma.invoice.create({
      data: {
        id: invoiceId,
        invoiceNumber: data.invoiceNumber,
        invoiceDate: invoiceDate,
        dueDate: dueDate,
        amount: amount,
        taxRate: taxRate,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
        status: data.status || 'draft',
        notes: data.notes || 'OCR ile taranmış fatura',
        type: data.type || 'outgoing',
        issuerName: issuerName,
        recipientName: recipientName,
        issuerAddress: data.issuerAddress || '',
        recipientAddress: data.recipientAddress || '',
        issuerTaxId: data.issuerTaxId || '',
        recipientTaxId: data.recipientTaxId || '',
        customerId: data.customerId
      }
    });
    
    console.log('Fatura oluşturuldu:', invoice.id, 'Veri:', {
      invoiceNumber: invoice.invoiceNumber,
      issuerName: invoice.issuerName,
      recipientName: invoice.recipientName,
      totalAmount: invoice.totalAmount,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate
    });
    
    // Eğer taranmış dosya bilgisi varsa, dosyayı geçici depodan daimi depoya taşıyalım
    let invoiceFile = null;
    
    if (data.tempFileId && data.tempFileName) {
      // Geçici dosya yolu
      const tempFilePath = path.join(TEMP_STORAGE_PATH, data.tempFileName);
      
      try {
        // Dosyanın varlığını kontrol edelim
        await fs.access(tempFilePath);
        
        // Dosya var, fatura dosyası kaydını oluşturalım
        invoiceFile = await prisma.invoiceFile.create({
          data: {
            id: uuidv4(),
            filename: data.tempFileName.substring(data.tempFileName.indexOf('-') + 1), // Orijinal dosya adını alalım
            fileKey: data.tempFileName,
            fileSize: data.fileSize || 0,
            mimeType: data.fileType || 'application/pdf',
            invoiceId: invoice.id,
            uploadDate: new Date(),
            updatedAt: new Date()
          }
        });
        
        console.log('Fatura dosyası kaydedildi:', invoiceFile.id);
      } catch (fileError) {
        console.error('Geçici dosya bulunamadı veya işlenemedi:', fileError);
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