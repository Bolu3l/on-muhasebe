import { NextResponse } from 'next/server';
import { CSXmlBuilder, createSampleFatura } from '@/lib/xml-builder';

export async function GET() {
  try {
    // Test faturası oluştur
    const sampleFatura = createSampleFatura();
    
    // Validasyon kontrol et
    const validation = CSXmlBuilder.validateFatura(sampleFatura);
    
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        errors: validation.errors,
        message: "Fatura validasyonu başarısız"
      }, { status: 400 });
    }
    
    // XML oluştur
    const xml = CSXmlBuilder.buildFaturaXml(sampleFatura);
    
    // XML'i güzel formatla (basit versiyonu)
    const formattedXml = xml
      .replace(/></g, '>\n<')
      .replace(/^\s*\n/gm, '')
      .split('\n')
      .map((line, index) => {
        const depth = (line.match(/</g) || []).length - (line.match(/</g) || []).length;
        return '  '.repeat(Math.max(0, depth)) + line.trim();
      })
      .join('\n');
    
    return NextResponse.json({
      success: true,
      validation: {
        isValid: validation.isValid,
        errors: validation.errors
      },
      xml: {
        raw: xml,
        formatted: formattedXml
      },
      size: xml.length,
      message: "XML başarıyla oluşturuldu"
    });
    
  } catch (error) {
    console.error('XML test hatası:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "XML oluşturma hatası"
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Custom fatura verisi ile test
    const validation = CSXmlBuilder.validateFatura(body);
    
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        errors: validation.errors,
        message: "Fatura validasyonu başarısız"
      }, { status: 400 });
    }
    
    const xml = CSXmlBuilder.buildFaturaXml(body);
    
    return NextResponse.json({
      success: true,
      validation: {
        isValid: validation.isValid,
        errors: validation.errors
      },
      xml: xml,
      size: xml.length,
      message: "Custom fatura XML'i başarıyla oluşturuldu"
    });
    
  } catch (error) {
    console.error('Custom XML test hatası:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "XML oluşturma hatası"
    }, { status: 500 });
  }
} 