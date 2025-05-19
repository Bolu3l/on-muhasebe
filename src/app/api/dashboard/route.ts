import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodParam = searchParams.get('period');
    
    // Dönem parametresini kontrol et ve geçerli bir değer değilse varsayılan olarak 'month' kullan
    let period: 'week' | 'month' | 'year' = 'month';
    if (periodParam === 'week' || periodParam === 'month' || periodParam === 'year') {
      period = periodParam;
    }
    
    console.log(`Dashboard API çağrıldı, istenen dönem: ${period}`);
    
    const data = await getDashboardData(period);
    
    console.log(`Dashboard verileri başarıyla alındı, dönem: ${period}`);
    
    // API yanıtını döndür
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard verileri alınırken hata oluştu:', error);
    
    // Hata detaylarını döndür
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    const errorStack = error instanceof Error ? error.stack : '';
    
    return NextResponse.json(
      { 
        error: 'Dashboard verileri alınamadı',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 