import { NextResponse } from 'next/server';
import { GIBApi } from '@/lib/gib-api';
import { CSXmlBuilder, createSampleFatura } from '@/lib/xml-builder';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { useCustomInvoice = false, customInvoiceData = null } = body;

    // GIB API instance oluştur
    const gibApi = new GIBApi();

    try {
      // Initialize ve login yap
      await gibApi.initialize();
      await gibApi.testLogin(); // Test account 1 kullan
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Login başarısız',
        message: "GIB login başarısız"
      }, { status: 401 });
    }

    // Fatura verisi hazırla
    let faturaData;
    if (useCustomInvoice && customInvoiceData) {
      faturaData = customInvoiceData;
    } else {
      faturaData = createSampleFatura();
    }

    // Fatura validasyonu
    const validation = CSXmlBuilder.validateFatura(faturaData);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        errors: validation.errors,
        message: "Fatura validasyonu başarısız"
      }, { status: 400 });
    }

    // XML oluştur
    const xmlContent = CSXmlBuilder.buildFaturaXml(faturaData);
    
    // Faturayı GIB'e gönder
    const sendResult = await gibApi.sendInvoiceXml(xmlContent, gibApi.getCurrentVKN());
    
    // Logout yap
    await gibApi.logout();

    if (sendResult.success) {
      return NextResponse.json({
        success: true,
        result: sendResult.result,
        message: "Fatura başarıyla GIB'e gönderildi",
        details: {
          xmlSize: xmlContent.length,
          validation: validation
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: sendResult.error,
        message: "Fatura gönderme başarısız"
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Fatura gönderme API hatası:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "Fatura gönderme API hatası"
    }, { status: 500 });
  }
}

// Test için GET endpoint
export async function GET() {
  try {
    console.log('🚀 Fatura gönderme testi başlıyor...');
    
    // Test faturası ile gönderim yap
    const gibApi = new GIBApi();
    
    try {
      await gibApi.initialize();
      console.log('✅ GIB API initialize edildi');
      
      await gibApi.testLogin();
      console.log('✅ Login başarılı, durum:', gibApi.getStatus());
      
      const sampleFatura = createSampleFatura();
      const xmlContent = CSXmlBuilder.buildFaturaXml(sampleFatura);
      console.log('✅ XML oluşturuldu, boyut:', xmlContent.length);
      
      // Session'ı kontrol et
      const status = gibApi.getStatus();
      console.log('🔍 Login durumu kontrol:', status);
      
      if (!status.isLoggedIn) {
        throw new Error('Login durumu kaybedildi');
      }
      
      console.log('📤 Belge gönderme başlıyor...');
      const sendResult = await gibApi.sendInvoiceXml(xmlContent, status.currentVKN!);
      console.log('📋 Gönderme sonucu:', sendResult);
      
      await gibApi.logout();
      console.log('✅ Logout tamamlandı');

      return NextResponse.json({
        success: sendResult.success,
        result: sendResult.result,
        error: sendResult.error,
        message: sendResult.message || "Test fatura gönderme tamamlandı",
        details: {
          xmlSize: xmlContent.length,
          belgeNo: GIBApi.generateBelgeNo(),
          belgeHash: GIBApi.generateHash(xmlContent),
          loginStatus: status
        }
      });
      
    } catch (loginError) {
      console.error('❌ Login/Session hatası:', loginError);
      return NextResponse.json({
        success: false,
        error: loginError instanceof Error ? loginError.message : 'Login başarısız',
        message: "GIB login/session hatası"
      }, { status: 401 });
    }

  } catch (error) {
    console.error('❌ Test fatura gönderme hatası:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "Test fatura gönderme hatası"
    }, { status: 500 });
  }
} 