import { NextRequest, NextResponse } from 'next/server';
import { gibApi } from '@/lib/gib-api';

export async function POST(request: NextRequest) {
  try {
    const { accountNumber } = await request.json();

    console.log('🧪 GİB Login Test başlatılıyor...');

    // GİB API'yi initialize et
    await gibApi.initialize();

    // Test hesabı ile login yap
    await gibApi.testLogin(accountNumber || 1);

    // Bağlantı durumunu kontrol et
    const status = gibApi.getStatus();

    return NextResponse.json({
      success: true,
      message: 'GİB login testi başarılı',
      data: {
        isLoggedIn: status.isLoggedIn,
        currentVKN: status.currentVKN,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ GİB Login Test hatası:', error);

    return NextResponse.json({
      success: false,
      message: 'GİB login testi başarısız',
      error: error.message || 'Bilinmeyen hata',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Mevcut durumu kontrol et
    const status = gibApi.getStatus();

    return NextResponse.json({
      success: true,
      message: 'GİB bağlantı durumu',
      data: {
        isLoggedIn: status.isLoggedIn,
        currentVKN: status.currentVKN,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ GİB Status kontrol hatası:', error);

    return NextResponse.json({
      success: false,
      message: 'GİB durumu kontrol edilemedi',
      error: error.message || 'Bilinmeyen hata',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 