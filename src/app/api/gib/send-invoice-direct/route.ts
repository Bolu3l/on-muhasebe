import { NextResponse } from 'next/server';
import { CSXmlBuilder, createSampleFatura } from '@/lib/xml-builder';
import * as soap from 'soap';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const CONNECTOR_SERVICE_WSDL = 'https://erpefaturatest1.qnbesolutions.com.tr/efatura/ws/connectorService?wsdl';

// QNB Test Account 1 credentials
const TEST_ACCOUNT = {
  USERNAME: '0010963799',
  PASSWORD: 'Bolu3.12',
  VKN: '0010963799'
};

export async function POST() {
  try {
    console.log('🚀 Direct WS-Security ile belge gönderme testi başlıyor...');
    
    // Sample fatura oluştur
    const sampleFatura = createSampleFatura();
    const xmlContent = CSXmlBuilder.buildFaturaXml(sampleFatura);
    const belgeNo = uuidv4();
    const belgeHash = crypto.createHash('md5').update(xmlContent).digest('hex');
    
    console.log('✅ XML oluşturuldu:', {
      xmlSize: xmlContent.length,
      belgeNo,
      belgeHash
    });
    
    // SOAP Client oluştur
    console.log('🔧 SOAP Client oluşturuluyor...');
    const client = await soap.createClientAsync(CONNECTOR_SERVICE_WSDL);
    
    // QNB WS-Security header ekle
    console.log('🔐 WS-Security header ekleniyor...');
    const wsSecurityHeader = {
      'wsse:Security': {
        attributes: {
          'xmlns:wsse': 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'
        },
        'wsse:UsernameToken': {
          'wsse:Username': TEST_ACCOUNT.USERNAME,
          'wsse:Password': TEST_ACCOUNT.PASSWORD
        }
      }
    };
    
    (client as any).addSoapHeader(wsSecurityHeader);
    
    // Belge gönder
    console.log('📤 Belge gönderiliyor...');
    
    // XML içeriğini debug et
    console.log('🔍 XML Debug:', {
      xmlLength: xmlContent.length,
      xmlStart: xmlContent.substring(0, 200),
      xmlEnd: xmlContent.substring(xmlContent.length - 100)
    });
    
    // XML'i base64 encode et (QNB gereksinimi)
    const xmlBase64 = Buffer.from(xmlContent, 'utf-8').toString('base64');
    
    console.log('🔍 Base64 Debug:', {
      originalSize: xmlContent.length,
      base64Size: xmlBase64.length,
      base64Start: xmlBase64.substring(0, 50)
    });
    
    const belgeParams = {
      parametreler: {
        belgeNo: belgeNo,
        vergiTcKimlikNo: TEST_ACCOUNT.VKN,
        belgeTuru: 'FATURA', // CS-XML formatı için (fatura_v3.xsd)
        veri: xmlBase64, // Base64 encoded XML
        belgeHash: belgeHash,
        mimeType: 'application/xml',
        belgeVersiyon: '3.0' // fatura_v3.xsd uyumlu
      }
    };
    
    console.log('📋 Gönderilecek parametreler:', {
      ...belgeParams,
      parametreler: {
        ...belgeParams.parametreler,
        veri: `[XML Content ${xmlContent.length} chars]` // XML'i tamamen log'lama
      }
    });
    
    const result = await (client as any).belgeGonderExtAsync(belgeParams);
    
    console.log('✅ Belge gönderme başarılı:', result);
    
    return NextResponse.json({
      success: true,
      result: result,
      message: "Direct WS-Security ile belge gönderme başarılı",
      details: {
        xmlSize: xmlContent.length,
        belgeNo,
        belgeHash,
        testAccount: TEST_ACCOUNT.VKN
      }
    });

  } catch (error) {
    console.error('❌ Direct belge gönderme hatası:', error);
    
    // Hata detaylarını logla
    if (error && typeof error === 'object') {
      console.error('❌ Error details:', {
        message: (error as any).message,
        body: (error as any).body,
        response: (error as any).response,
        statusCode: (error as any).statusCode
      });
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
      message: "Direct belge gönderme hatası",
      errorDetails: error && typeof error === 'object' ? {
        body: (error as any).body,
        statusCode: (error as any).statusCode
      } : null
    }, { status: 500 });
  }
} 