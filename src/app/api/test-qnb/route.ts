import { NextRequest, NextResponse } from 'next/server';
import { CSXmlBuilder, createSampleFatura2 } from '@/lib/xml-builder';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 QNB XML Test #2 başlatılıyor...');
    
    // İkinci sample fatura oluştur (daha karmaşık)
    const fatura = createSampleFatura2();
    console.log('📋 Fatura oluşturuldu:', fatura);
    
    // XML'e dönüştür
    const xmlContent = CSXmlBuilder.buildFaturaXml(fatura);
    console.log('📄 XML içeriği:', xmlContent);
    console.log('📏 XML boyutu:', xmlContent.length, 'bytes');
    
    // Validation kontrolü
    const validation = CSXmlBuilder.validateFatura(fatura);
    console.log('✅ Validation:', validation);
    
    // Başarılı yanıt döndür - XML'i ve detayları göster
    return NextResponse.json({
      success: true,
      message: "TEST FATURA #2 - Daha karmaşık örnek başarıyla oluşturuldu",
      xmlSize: xmlContent.length,
      validation: validation,
      generatedXml: xmlContent,
      invoiceDetails: {
        satici: "ABC Teknoloji Şirketi (Şişli/Istanbul)",
        alici: "XYZ Perakende Mağazası (Ümraniye/Istanbul)",
        tarih: "2025-01-15 14:45:30",
        toplamTutar: "9.086,00 TL",
        urunSayisi: 3,
        odemeSekli: "Kod 2 - Garanti BBVA",
        odemeVadesi: "30 gün (2025-02-14)"
      },
      products: [
        "2x Laptop Bilgisayar (Dell Vostro) - 3.000 TL",
        "5x Kablosuz Mouse (Logitech MX Master 3) - 2.500 TL", 
        "3x USB-C Hub (Çoklu port) - 2.500 TL"
      ],
      features: [
        "✅ 3 farklı ürün satırı",
        "✅ İskonto hesaplaması (300 TL)",
        "✅ Detaylı adres bilgileri (posta kodu dahil)",
        "✅ Farklı ödeme şekli (kod: 2)",
        "✅ 30 gün vadeli ödeme",
        "✅ Toplam 9.086 TL tutarında fatura"
      ]
    });
    
  } catch (error) {
    console.error('💥 XML generation hatası:', error);
    return NextResponse.json({ 
      error: 'XML generation başarısız', 
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
} 