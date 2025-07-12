import { NextResponse } from 'next/server';
import * as soap from 'soap';
import { CookieJar } from 'tough-cookie';

const USER_SERVICE_WSDL = 'https://erpefaturatest1.qnbesolutions.com.tr/efatura/ws/userService?wsdl';

export async function POST() {
  try {
    console.log('🧪 Direkt SOAP login test başlatılıyor...');
    
    const cookieJar = new CookieJar();
    
    // SOAP client oluştur
    const client = await soap.createClientAsync(USER_SERVICE_WSDL, {
      wsdl_options: {
        jar: cookieJar,
        timeout: 30000
      }
    });

    console.log('✅ SOAP client oluşturuldu');

    // QNB test hesabı bilgileri
    const credentials = {
      userId: '0010963799',
      password: 'Bolu3.12',
      lang: 'tr'
    };

    console.log(`🔐 Login deneniyor - userId: ${credentials.userId}`);

    // Direkt wsLogin çağrısı
    const loginResult = await (client as any).wsLoginAsync(credentials);
    
    console.log('✅ Login başarılı! Result:', loginResult);

    return NextResponse.json({
      success: true,
      message: 'Direkt SOAP login başarılı',
      data: {
        loginResult,
        credentials: { ...credentials, password: '***' }
      }
    });

  } catch (error: any) {
    console.error('❌ Direkt SOAP login hatası:', error.message);
    console.error('❌ Error details:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.body || error.toString()
    }, { status: 500 });
  }
} 