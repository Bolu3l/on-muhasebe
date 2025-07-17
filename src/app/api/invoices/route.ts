import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';
import { CSXmlBuilder, type FaturaTipi } from '@/lib/xml-builder';
import { GIBApi } from '@/lib/gib-api';

// E-fatura ayarları interface
interface EInvoiceSettings {
  profile: 'BASIC' | 'COMMERCIAL' | 'BUYUKMUKELLEF' | 'EARSIV';
  scenario: 'BASIC' | 'COMMERCIAL' | 'EXPORT' | 'IMPORT';
  invoiceType: 'SALES' | 'RETURN' | 'WITHHOLDING' | 'EXCEPTION';
  currency: 'TRY' | 'USD' | 'EUR' | 'GBP';
  exchangeRate: number;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD' | 'CHEQUE' | 'OTHER';
  paymentTerms: number;
}

// Fatura kalemi interface - Tevkifat alanları eklendi
interface InvoiceItem {
  id: string;
  productCode?: string;
  productName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  vatRate: number;
  vatAmount: number;
  discountRate: number;
  discountAmount: number;
  subtotal: number;
  total: number;
  // Tevkifat alanları
  withholdingType: 'GELIR_VERGISI' | 'KDV' | 'DAMGA' | 'NONE';
  withholdingRate: number;
  withholdingAmount: number;
}

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
      include: {
        customer: true,
        items: true,
        eInvoice: true,
        invoiceFiles: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Faturalar API - ${invoices.length} fatura getirildi.`);
    
    // Decimal veri tiplerini dönüştürerek döndür
    const processedInvoices = invoices.map(invoice => ({
      ...invoice,
      amount: invoice.amount ? Number(invoice.amount.toString()) : 0,
      vatAmount: invoice.vatAmount ? Number(invoice.vatAmount.toString()) : 0,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0,
      items: invoice.items.map(item => ({
        ...item,
        quantity: item.quantity ? Number(item.quantity.toString()) : 0,
        unitPrice: item.unitPrice ? Number(item.unitPrice.toString()) : 0,
        vatAmount: item.vatAmount ? Number(item.vatAmount.toString()) : 0,
        discountAmount: item.discountAmount ? Number(item.discountAmount.toString()) : 0,
        totalAmount: item.totalAmount ? Number(item.totalAmount.toString()) : 0
      }))
    }));
    
    return NextResponse.json(processedInvoices);
    
  } catch (error: any) {
    console.error('Faturalar API hatası:', error);
    return NextResponse.json({ 
      error: error?.message || error?.toString() || 'Bilinmeyen hata',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('E-Fatura oluşturma API çağrıldı');
    
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
    const company = user.companies[0];
    
    const data = await request.json();
    console.log('Gelen e-fatura verisi:', JSON.stringify(data, null, 2));
    
    // Gerekli alanları kontrol et
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ 
        error: 'En az bir kalem gerekli' 
      }, { status: 400 });
    }
    
    // Fatura numarası kontrolü ve otomatik üretimi
    let invoiceNumber = data.invoiceNumber?.trim();
    if (!invoiceNumber) {
      // Otomatik fatura numarası üret
      const currentYear = new Date().getFullYear();
      
      // Bu yıl için son fatura numarasını bul
      const lastInvoice = await prisma.invoice.findFirst({
        where: {
          companyId: companyId,
          invoiceNumber: {
            startsWith: currentYear.toString()
          }
        },
        orderBy: {
          invoiceNumber: 'desc'
        }
      });
      
      let nextNumber = 1;
      if (lastInvoice?.invoiceNumber) {
        // Son numaradan sequence'ı çıkar ve 1 artır
        const lastSequence = parseInt(lastInvoice.invoiceNumber.slice(-6)) || 0;
        nextNumber = lastSequence + 1;
      }
      
      // Format: YYYYYNNNNNN (Yıl + 6 haneli sequence)
      invoiceNumber = `${currentYear}${nextNumber.toString().padStart(6, '0')}`;
      console.log('Otomatik fatura numarası oluşturuldu:', invoiceNumber);
    }
    
    // Müşteri bilgilerini al veya oluştur
    let customer;
    let customerId = data.customerId;
    
    if (data.customer) {
      // Elle girilen müşteri bilgileri varsa
      if (data.customer.id) {
        // Kayıtlı müşteri seçilmiş
        customer = await prisma.customer.findUnique({
          where: { id: data.customer.id }
        });
        
        if (!customer) {
          return NextResponse.json({ error: 'Seçilen müşteri bulunamadı' }, { status: 404 });
        }
        customerId = customer.id;
      } else {
                 // Elle girilen müşteri bilgileri - geçici olarak kullan
         customer = {
           id: 'temp-' + uuidv4(),
           name: data.customer.name,
           taxNumber: data.customer.taxNumber,
           email: data.customer.email || '',
           phone: data.customer.phone || '',
           address: data.customer.address || '',
           city: data.customer.city || '',
           country: data.customer.country || 'Türkiye',
           customerType: data.customer.isCompany ? 'COMPANY' : 'INDIVIDUAL',
           isCompany: data.customer.isCompany,
           taxOffice: data.customer.taxOffice || '',
           district: '',
           postalCode: ''
         };
        customerId = null; // Elle girilen müşteri için null
      }
    } else if (data.customerId) {
      // Eski format - customerId ile müşteri seçimi
      customer = await prisma.customer.findUnique({
        where: { id: data.customerId }
      });
      
      if (!customer) {
        return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });
      }
      customerId = customer.id;
        } else {
      return NextResponse.json({ error: 'Müşteri bilgisi gerekli' }, { status: 400 });
    }
    
    const invoiceId = uuidv4();
    
    // E-fatura ayarları - hep E-Fatura kullanıyoruz
    const eInvoiceProfile = 'TICARIFATURA';
    const eInvoiceScenario = 'TICARIFATURA';
    
    const eInvoiceSettings: EInvoiceSettings = {
      profile: eInvoiceProfile === 'TICARIFATURA' ? 'COMMERCIAL' : 'BASIC',
      scenario: eInvoiceScenario === 'TICARIFATURA' ? 'COMMERCIAL' : 'BASIC',
      invoiceType: data.invoiceType === 'TEVKIFAT' ? 'WITHHOLDING' : 
                   data.invoiceType === 'IADE' ? 'RETURN' : 'SALES',
      currency: data.currency || 'TRY',
      exchangeRate: data.exchangeRate || 1,
      paymentMethod: data.paymentMethod === 'NAKIT' ? 'CASH' : 'BANK_TRANSFER',
      paymentTerms: 30
    };
    
    // Tarih alanlarını işle
    const invoiceDate = new Date(data.issueDate);
    const dueDate = data.dueDate ? new Date(data.dueDate) : new Date(invoiceDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    // Status enum mapping
    const mapStatus = (status: string) => {
      switch (status?.toUpperCase()) {
        case 'DRAFT': return 'DRAFT';
        case 'SENT': return 'SENT';
        case 'ACCEPTED': return 'ACCEPTED';
        case 'REJECTED': return 'REJECTED';
        case 'CANCELLED': return 'CANCELLED';
        default: return 'DRAFT';
      }
    };
    
    // Invoice Type enum mapping
    const mapInvoiceType = (type: string): 'OUTGOING' | 'INCOMING' => {
      return 'OUTGOING'; // E-fatura her zaman outgoing
    };
    
    // Fatura toplamları hesapla (frontend'den gelen yerine backend'de hesapla)
    let subtotalSum = 0;
    let totalVATSum = 0;
    let totalWithholdingSum = 0;
    let grandTotalSum = 0;
    
    // İşlenmiş kalemler (XML için)
    const processedItems = [];
    
    for (const item of data.items) {
      const quantity = item.quantity || 1;
      const unitPrice = item.unitPrice || 0;
      const vatRate = (item.vatRate || 0) / 100;
      const discountRate = (item.discountRate || 0) / 100;
      const withholdingRate = (item.withholdingRate || 0) / 100;
      
      const subtotal = quantity * unitPrice;
      const discountAmount = subtotal * discountRate;
      const discountedAmount = subtotal - discountAmount;
      const vatAmount = discountedAmount * vatRate;
      const withholdingAmount = discountedAmount * withholdingRate;
      const totalAmount = discountedAmount + vatAmount - withholdingAmount;
      
      subtotalSum += discountedAmount;
      totalVATSum += vatAmount;
      totalWithholdingSum += withholdingAmount;
      grandTotalSum += totalAmount;
      
      // İşlenmiş kalemi ekle
      processedItems.push({
        ...item,
        quantity,
        unitPrice,
        vatRate: vatRate * 100, // XML'de yüzde olarak
        discountRate: discountRate * 100,
        withholdingRate: withholdingRate * 100,
        subtotal: discountedAmount,
        vatAmount,
        discountAmount,
        withholdingAmount,
        total: totalAmount
      });
    }
    
    // Faturayı oluştur
    const invoice = await prisma.invoice.create({
      data: {
        id: invoiceId,
        userId: decoded.userId,
        companyId: companyId,
        invoiceNumber: invoiceNumber,
        invoiceType: mapInvoiceType('OUTGOING'),
        invoiceDate: invoiceDate,
        dueDate: dueDate,
        amount: subtotalSum,
        vatAmount: totalVATSum,
        totalAmount: grandTotalSum,
        currency: eInvoiceSettings.currency,
        exchangeRate: eInvoiceSettings.exchangeRate,
        status: mapStatus(data.status),
        customerId: customerId,
        notes: data.notes || '',
      }
    });
    
    console.log('Fatura oluşturuldu:', invoice.id);
    
    // Fatura kalemlerini oluştur
    for (const item of processedItems) {
      await prisma.invoiceItem.create({
        data: {
          id: uuidv4(),
          invoiceId: invoice.id,
          productCode: item.productCode || null,
          description: item.productName || item.description,
          quantity: item.quantity,
          unitOfMeasure: item.unit || 'ADET',
          unitPrice: item.unitPrice,
          vatRate: item.vatRate / 100, // Database'de decimal olarak sakla
          vatAmount: item.vatAmount,
          discountRate: item.discountRate / 100, // Database'de decimal olarak sakla
          discountAmount: item.discountAmount,
          totalAmount: item.total
        }
      });
    }
    
    console.log(`${processedItems.length} fatura kalemi oluşturuldu`);
    
    // E-fatura XML'ini oluştur
    let xmlContent = '';
    let xmlValidation: { isValid: boolean; errors: string[] } = { isValid: false, errors: [] };
    
    try {
      // XML için FaturaTipi oluştur
      const faturaTipi: FaturaTipi = {
        faturaTuru: eInvoiceProfile,
        faturaNo: invoiceNumber,
        faturaTarihi: { value: invoiceDate.toISOString().split('T')[0] },
        faturaZamani: { value: invoiceDate.toLocaleTimeString('tr-TR', { hour12: false }) },
        faturaTipi: data.invoiceType === 'TEVKIFAT' ? 'TEVKIFAT' : 
                    data.invoiceType === 'IADE' ? 'IADE' : 'SATIS',
        paraBirimi: eInvoiceSettings.currency,
        satici: {
          aliciSaticiTanimi: [{ value: company.taxNumber, schemeId: 'VKN' }],
          unvan: company.name,
          postaAdresi: {
            ilce: 'İlçe',
            sehir: 'Şehir',
            ulke: 'Türkiye',
            caddeSokak: company.address || 'Adres',
            mahalle: 'Mahalle',
            postaKodu: '34000'
          },
          vergiDairesi: company.taxOffice || 'Vergi Dairesi',
          etiket: `urn:mail:${company.email || 'info@company.com'}`
        },
        alici: {
          aliciSaticiTanimi: [{ value: customer.taxNumber || '1111111111', schemeId: customer.customerType === 'INDIVIDUAL' ? 'TCKN' : 'VKN' }],
          unvan: customer.name,
          postaAdresi: {
            ilce: customer.district || 'İlçe',
            sehir: customer.city || 'Şehir',
            ulke: customer.country || 'Türkiye',
            caddeSokak: customer.address || 'Adres',
            mahalle: 'Mahalle',
            postaKodu: customer.postalCode || '34000'
          },
          vergiDairesi: customer.taxOffice || (customer.city ? `${customer.city} Vergi Dairesi` : 'Vergi Dairesi'),
          etiket: `urn:mail:${customer.email || 'musteri@email.com'}`
        },
        vergiler: [{
          toplamVergiTutari: { value: totalVATSum, paraBirimi: eInvoiceSettings.currency },
          vergi: processedItems.map(item => ({
            matrah: { value: item.subtotal, paraBirimi: eInvoiceSettings.currency },
            vergiTutari: { value: item.vatAmount, paraBirimi: eInvoiceSettings.currency },
            oran: item.vatRate,
            vergiTuru: {
              vergiAdi: 'KDV',
              vergikodu: '0015'
            }
          }))
        }],
        // Tevkifat bilgilerini ekle
        ...(totalWithholdingSum > 0 && {
          tevkifatlar: [{
            toplamVergiTutari: { value: totalWithholdingSum, paraBirimi: eInvoiceSettings.currency },
            vergi: processedItems
              .filter(item => item.withholdingType !== 'NONE' && item.withholdingAmount > 0)
              .map(item => ({
                matrah: { 
                  value: item.withholdingType === 'KDV' ? item.vatAmount : item.subtotal, 
                  paraBirimi: eInvoiceSettings.currency 
                },
                vergiTutari: { value: item.withholdingAmount, paraBirimi: eInvoiceSettings.currency },
                oran: item.withholdingRate,
                vergiTuru: {
                  vergiAdi: item.withholdingType === 'GELIR_VERGISI' ? 'GV' : 
                            item.withholdingType === 'KDV' ? 'KDV' : 'DAMGA',
                  vergikodu: item.withholdingType === 'GELIR_VERGISI' ? '0011' : 
                             item.withholdingType === 'KDV' ? '0015' : '0003'
                }
              }))
          }]
        }),
        parasalToplamlar: {
          toplamMalHizmetTutari: { value: subtotalSum, paraBirimi: eInvoiceSettings.currency },
          vergiHaricTutar: { value: subtotalSum, paraBirimi: eInvoiceSettings.currency },
          vergiDahilTutar: { value: subtotalSum + totalVATSum, paraBirimi: eInvoiceSettings.currency },
          odenecekTutar: { value: grandTotalSum, paraBirimi: eInvoiceSettings.currency }
        },
        faturaSatir: processedItems.map((item, index) => ({
          siraNo: { value: (index + 1).toString() },
          miktar: { value: item.quantity, birimKodu: item.unit },
          malHizmetMiktari: { value: item.total, paraBirimi: eInvoiceSettings.currency },
          malHizmetBilgileri: {
            adi: item.productName || item.description,
            aciklama: item.description
          },
          birimFiyat: { value: item.unitPrice, paraBirimi: eInvoiceSettings.currency },
          vergiler: {
            toplamVergiTutari: { value: item.vatAmount, paraBirimi: eInvoiceSettings.currency },
            vergi: [{
              matrah: { value: item.subtotal, paraBirimi: eInvoiceSettings.currency },
              vergiTutari: { value: item.vatAmount, paraBirimi: eInvoiceSettings.currency },
              oran: item.vatRate,
              vergiTuru: {
                vergiAdi: 'KDV',
                vergikodu: '0015'
              }
            }]
          },
          // Tevkifat bilgilerini kalem bazında ekle
          ...(item.withholdingType !== 'NONE' && item.withholdingAmount > 0 && {
            tevkifatlar: [{
              toplamVergiTutari: { value: item.withholdingAmount, paraBirimi: eInvoiceSettings.currency },
              vergi: [{
                matrah: { 
                  value: item.withholdingType === 'KDV' ? item.vatAmount : item.subtotal, 
                  paraBirimi: eInvoiceSettings.currency 
                },
                vergiTutari: { value: item.withholdingAmount, paraBirimi: eInvoiceSettings.currency },
                oran: item.withholdingRate,
                vergiTuru: {
                  vergiAdi: item.withholdingType === 'GELIR_VERGISI' ? 'GV' : 
                            item.withholdingType === 'KDV' ? 'KDV' : 'DAMGA',
                  vergikodu: item.withholdingType === 'GELIR_VERGISI' ? '0011' : 
                             item.withholdingType === 'KDV' ? '0015' : '0003'
                }
              }]
            }]
          })
        })),
        odemeSekli: {
          kod: eInvoiceSettings.paymentMethod === 'CASH' ? '1' : '2',
          aliciHesapBilgileri: {
            hesapNo: '1234567890123456',
            hesapDovizBirimi: eInvoiceSettings.currency,
            aciklama: `${company.name} Hesabı`
          }
        },
        odemeKosullari: {
          not: `Fatura düzenlenme tarihinden itibaren ${eInvoiceSettings.paymentTerms} gün içerisinde ödenecektir.`,
          sonOdemeTarihi: dueDate.toISOString().split('T')[0]
        }
      };
      
      // Tevkifat notu ekle
      if (data.withholdingNote && totalWithholdingSum > 0) {
        faturaTipi.faturaNot = [data.withholdingNote];
      }
      
      // XML'i oluştur ve validate et
      xmlContent = CSXmlBuilder.buildFaturaXml(faturaTipi);
      xmlValidation = CSXmlBuilder.validateFatura(faturaTipi);
      
      console.log('XML oluşturuldu, boyut:', xmlContent.length);
      
    } catch (xmlError) {
      console.error('XML oluşturma hatası:', xmlError);
      xmlValidation = { 
        isValid: false, 
        errors: [xmlError instanceof Error ? xmlError.message : 'XML oluşturma hatası'] 
      };
    }
    
    // E-fatura kaydını oluştur
    const eInvoiceData = {
      id: uuidv4(),
      invoiceId: invoice.id,
      eInvoiceType: eInvoiceSettings.invoiceType,
      profileId: eInvoiceProfile,
      scenario: eInvoiceScenario,
      status: 'PENDING',
      xmlContent: xmlContent,
      errorMessage: xmlValidation.isValid ? null : xmlValidation.errors.join(', '),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const eInvoice = await prisma.eInvoice.create({
      data: eInvoiceData as any
    });
    
    console.log('E-fatura kaydı oluşturuldu:', eInvoice.id);
    
    // QNB E-solution'a gönderim kontrolü
    let qnbSendResult = null;
    console.log('🔍 QNB gönderim kontrolleri:', {
      sendToQNB: data.sendToQNB,
      xmlIsValid: xmlValidation.isValid,
      willSend: data.sendToQNB && xmlValidation.isValid
    });
    
    if (data.sendToQNB && xmlValidation.isValid) {
      try {
        console.log('🚀 QNB E-solution\'a fatura gönderiliyor...');
        
        // Kullanıcının şifresini decode etmek için bcrypt compare kullanamayız
        // Bu durumda kullanıcı login olurken şifresini session'da tutmamız gerekecek
        // Şimdilik alternatif çözüm: QNB şifresini ayrı bir field olarak tutabiliriz
        // Ama gereksinim şifrenin aynı olması, bu durumda kullanıcı registration/login flow'u değişmeli
        
                // Direkt WS-Security yaklaşımı kullan - çalışan test sistemindeki gibi
        console.log('🚀 QNB E-solution direkt WS-Security gönderimi başlıyor...');
        
        // QNB şifresini kontrol et
        const qnbPassword = data.qnbPassword;
        if (!qnbPassword) {
          console.error('❌ QNB şifre bulunamadı');
          
          qnbSendResult = {
            success: false,
            error: 'QNB şifre gerekli',
            message: 'QNB E-solution şifresi gerekli. Lütfen şifrenizi girin.'
          };
          
          return NextResponse.json({
            success: true,
            message: 'Fatura başarıyla oluşturuldu ancak QNB gönderimi başarısız',
            data: {
              invoiceId: invoice.id,
              invoiceNumber: invoice.invoiceNumber,
              invoiceType: data.invoiceType,
              totalAmount: Number(invoice.totalAmount.toString()),
              totalWithholding: totalWithholdingSum,
              status: invoice.status,
              invoiceDate: invoice.invoiceDate,
              xmlContent: xmlContent,
              xmlValidation: xmlValidation,
              qnbSendResult: qnbSendResult
            }
          });
        }
        
        try {
          // SOAP import'u
          const soap = await import('soap');
          const { v4: uuidv4 } = await import('uuid');
          const crypto = await import('crypto');
          
          // VKN'ye göre doğru URL'yi seç
          const getConnectorUrl = (vkn: string) => {
            if (vkn === '0010963799') {
              return 'https://erpefaturatest1.qnbesolutions.com.tr/efatura/ws/connectorService?wsdl';
            } else if (vkn === '0010963800') {
              return 'https://erpefaturatest2.qnbesolutions.com.tr/efatura/ws/connectorService?wsdl';
            } else {
              // Varsayılan olarak test2 kullan
              return 'https://erpefaturatest2.qnbesolutions.com.tr/efatura/ws/connectorService?wsdl';
            }
          };
          
          const rawVkn = company.taxNumber;
          const formattedVkn = rawVkn.padStart(10, '0'); // 10 haneli yap, başına sıfır ekle
          const CONNECTOR_SERVICE_WSDL = getConnectorUrl(formattedVkn);
          
          console.log('🔧 SOAP Client oluşturuluyor...', {
            rawVkn: company.taxNumber,
            formattedVkn: formattedVkn,
            url: CONNECTOR_SERVICE_WSDL
          });
          const client = await soap.createClientAsync(CONNECTOR_SERVICE_WSDL);
          
          console.log('🔐 WS-Security header ekleniyor...', {
            rawVkn: rawVkn,
            formattedVkn: formattedVkn,
            length: formattedVkn.length
          });
          
          // QNB WS-Security header ekle
          const wsSecurityHeader = {
            'wsse:Security': {
              attributes: {
                'xmlns:wsse': 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'
              },
              'wsse:UsernameToken': {
                'wsse:Username': formattedVkn, // VKN'yi 10 haneli formatta gönder
                'wsse:Password': qnbPassword // Kullanıcının şifresi
              }
            }
          };
          
          (client as any).addSoapHeader(wsSecurityHeader);
          
          // XML'i base64 encode et
          const xmlBase64 = Buffer.from(xmlContent, 'utf-8').toString('base64');
          const belgeNo = uuidv4();
          const belgeHash = crypto.createHash('md5').update(xmlContent).digest('hex');
          
          console.log('📤 Belge gönderiliyor...', {
            xmlSize: xmlContent.length,
            base64Size: xmlBase64.length,
            belgeNo,
            faturaNo: invoiceNumber,
            vknUsed: formattedVkn
          });
          
          const belgeParams = {
            parametreler: {
              belgeNo: belgeNo,
              vergiTcKimlikNo: formattedVkn, // Burada da formatlanmış VKN kullan
              belgeTuru: 'FATURA',
              veri: xmlBase64,
              belgeHash: belgeHash,
              mimeType: 'application/xml',
              belgeVersiyon: '3.0'
            }
          };
          
          const result = await (client as any).belgeGonderExtAsync(belgeParams);
          
          console.log('✅ QNB E-solution başarılı sonuç:', result);
          
          // E-fatura kaydını güncelle
          await prisma.eInvoice.update({
            where: { id: eInvoice.id },
            data: {
              status: 'SENT',
              qnbResponse: JSON.stringify(result),
              qnbBelgeOid: result?.belgeOid || belgeNo,
              sentAt: new Date()
            }
          });
          
          qnbSendResult = {
            success: true,
            message: 'QNB E-solution\'a başarıyla gönderildi',
            result: result
          };
          
        } catch (qnbError: any) {
          console.error('❌ QNB direkt gönderim hatası:', qnbError);
          console.error('❌ Hata detayları:', {
            message: qnbError.message,
            body: qnbError.body,
            response: qnbError.response
          });
          
          // Hata kaydını güncelle
          await prisma.eInvoice.update({
            where: { id: eInvoice.id },
            data: {
              status: 'REJECTED',
              errorMessage: qnbError.message || qnbError.toString()
            }
          });
          
          qnbSendResult = {
            success: false,
            error: qnbError.message || qnbError.toString(),
            message: 'QNB E-solution gönderimi başarısız'
          };
        }
        
      } catch (qnbError) {
        console.error('❌ QNB gönderim hatası:', qnbError);
        
                 // Hata kaydını güncelle
         await prisma.eInvoice.update({
           where: { id: eInvoice.id },
           data: {
             status: 'REJECTED',
             errorMessage: qnbError instanceof Error ? qnbError.message : 'QNB gönderim hatası'
           }
         });
        
        qnbSendResult = {
          success: false,
          error: qnbError instanceof Error ? qnbError.message : 'QNB gönderim hatası',
          message: 'QNB E-solution\'a gönderim sırasında hata oluştu'
        };
      }
    }
    
    // Başarılı cevap döndür
    return NextResponse.json({
      success: true,
      message: `${data.invoiceType === 'TEVKIFAT' ? 'Tevkifatlı ' : ''}E-fatura başarıyla oluşturuldu`,
      invoice: {
        id: invoice.id,
        invoiceNumber: invoiceNumber,
        invoiceType: data.invoiceType,
        totalAmount: Number(invoice.totalAmount.toString()),
        totalWithholding: totalWithholdingSum,
        status: invoice.status,
        invoiceDate: invoice.invoiceDate,
        dueDate: invoice.dueDate,
        eInvoiceId: eInvoice.id,
        xmlValidation: xmlValidation,
        eInvoiceProfile: eInvoiceProfile,
        eInvoiceScenario: eInvoiceScenario
      },
      eInvoiceSettings: eInvoiceSettings,
      xml: {
        isValid: xmlValidation.isValid,
        errors: xmlValidation.errors,
        size: xmlContent.length
      },
      qnbSendResult: qnbSendResult
    });
    
  } catch (error) {
    console.error('E-fatura oluşturma hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'E-fatura oluşturulurken bir hata oluştu',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 