import { NextRequest, NextResponse } from 'next/server';
import { invoiceOperations } from '@/lib/supabase-db';
import { v4 as uuidv4 } from 'uuid';
import { CSXmlBuilder, type FaturaTipi } from '@/lib/xml-builder';

export async function POST(request: NextRequest) {
  try {
    console.log('Yeni fatura oluşturma isteği alındı');
    
    // Fatura numarası 0010963800 ile yeni fatura oluşturalım
    const invoiceNumber = "0010963800";
    const invoiceId = uuidv4();
    const currentDate = new Date('2025-07-08T10:00:00'); // 08/07/2025 tarihine ayarlandı
    
    // Fatura bilgileri
    const invoiceData = {
      id: invoiceId,
      invoiceNumber: invoiceNumber,
      invoiceDate: currentDate,
      dueDate: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 gün sonra
      amount: 5000.00, // Ana tutar
      taxRate: 18.00, // KDV oranı
      taxAmount: 900.00, // KDV tutarı
      totalAmount: 5900.00, // Toplam tutar
      status: 'pending',
      type: 'outgoing',
      notes: 'QNB e-fatura sistemi üzerinden oluşturuldu',
      issuerName: 'ON Muhasebe ve Finans Danışmanlığı',
      issuerAddress: 'Maslak Mahallesi, Büyükdere Caddesi No:123, Şişli/İstanbul',
      issuerTaxId: '1234567890',
      recipientName: 'Müşteri Şirket A.Ş.',
      recipientAddress: 'Levent Mahallesi, Beşiktaş Caddesi No:456, Beşiktaş/İstanbul',
      recipientTaxId: '9876543210'
    };
    
    console.log('Fatura oluşturuluyor:', invoiceData);
    
    // Faturayı veritabanına kaydet
    const invoice = await invoiceOperations.create(invoiceData);
    
    console.log('Fatura başarıyla oluşturuldu:', invoice.id);
    
    // XML oluşturma için FaturaTipi yapısına uygun veri hazırla
    const faturaTipi: FaturaTipi = {
      faturaTuru: "TICARIFATURA",
      faturaNo: invoiceNumber,
      faturaTarihi: { value: currentDate.toISOString().split('T')[0] },
      faturaZamani: { value: currentDate.toLocaleTimeString('tr-TR', { hour12: false }) },
      faturaTipi: "SATIS",
      paraBirimi: "TRY",
      satici: {
        aliciSaticiTanimi: [{ value: invoiceData.issuerTaxId, schemeId: "VKN" }],
        unvan: invoiceData.issuerName,
        postaAdresi: {
          ilce: "Şişli",
          sehir: "Istanbul",
          ulke: "Türkiye",
          caddeSokak: "Büyükdere Caddesi No:123",
          mahalle: "Maslak Mahallesi",
          postaKodu: "34398"
        },
        vergiDairesi: "Şişli Vergi Dairesi",
        etiket: "urn:mail:satici@onmuhasebe.com"
      },
      alici: {
        aliciSaticiTanimi: [{ value: invoiceData.recipientTaxId, schemeId: "VKN" }],
        unvan: invoiceData.recipientName,
        postaAdresi: {
          ilce: "Beşiktaş",
          sehir: "Istanbul",
          ulke: "Türkiye",
          caddeSokak: "Beşiktaş Caddesi No:456",
          mahalle: "Levent Mahallesi",
          postaKodu: "34394"
        },
        vergiDairesi: "Beşiktaş Vergi Dairesi",
        etiket: "urn:mail:alici@musteri.com"
      },
      vergiler: [{
        toplamVergiTutari: { value: 900.00, paraBirimi: "TRY" },
        vergi: [{
          matrah: { value: 5000.00, paraBirimi: "TRY" },
          vergiTutari: { value: 900.00, paraBirimi: "TRY" },
          oran: 18,
          vergiTuru: {
            vergiAdi: "KDV",
            vergikodu: "0015"
          }
        }]
      }],
      parasalToplamlar: {
        toplamMalHizmetTutari: { value: 5000.00, paraBirimi: "TRY" },
        vergiHaricTutar: { value: 5000.00, paraBirimi: "TRY" },
        vergiDahilTutar: { value: 5900.00, paraBirimi: "TRY" },
        odenecekTutar: { value: 5900.00, paraBirimi: "TRY" }
      },
      faturaSatir: [{
        siraNo: { value: "1" },
        miktar: { value: 1, birimKodu: "C62" },
        malHizmetMiktari: { value: 5000.00, paraBirimi: "TRY" },
        malHizmetBilgileri: {
          adi: "Muhasebe Danışmanlığı Hizmeti",
          aciklama: "Aylık muhasebe danışmanlığı ve finansal raporlama hizmetleri"
        },
        birimFiyat: { value: 5000.00, paraBirimi: "TRY" },
        vergiler: {
          toplamVergiTutari: { value: 900.00, paraBirimi: "TRY" },
          vergi: [{
            matrah: { value: 5000.00, paraBirimi: "TRY" },
            vergiTutari: { value: 900.00, paraBirimi: "TRY" },
            oran: 18,
            vergiTuru: {
              vergiAdi: "KDV",
              vergikodu: "0015"
            }
          }]
        }
      }],
      odemeSekli: {
        kod: "2",
        aliciHesapBilgileri: {
          hesapNo: "1234567890123456",
          hesapDovizBirimi: "TRL",
          aciklama: "ON Muhasebe İş Bankası Hesabı"
        }
      },
      odemeKosullari: {
        not: "Fatura düzenlenme tarihinden itibaren 30 gün içerisinde ödenecektir.",
        sonOdemeTarihi: new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    };
    
    // XML oluştur
    const xmlContent = CSXmlBuilder.buildFaturaXml(faturaTipi);
    const validation = CSXmlBuilder.validateFatura(faturaTipi);
    
    console.log('XML oluşturuldu, boyut:', xmlContent.length, 'karakter');
    
    return NextResponse.json({
      success: true,
      message: 'Fatura başarıyla oluşturuldu',
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        invoiceDate: invoice.invoiceDate,
        dueDate: invoice.dueDate
      },
      xml: {
        isValid: validation.isValid,
        errors: validation.errors,
        size: xmlContent.length,
        content: xmlContent
      }
    });
    
  } catch (error) {
    console.error('Fatura oluşturma hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Fatura oluşturulurken hata oluştu',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 