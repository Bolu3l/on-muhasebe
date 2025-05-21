import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData, generateTaxCalendar, calculateVATForPeriod, getTaxSummaryForDashboard } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const periodParam = searchParams.get('period');
    const taxParam = searchParams.get('tax');
    
    // Dönem parametresini kontrol et ve geçerli bir değer değilse varsayılan olarak 'month' kullan
    let period: 'week' | 'month' | 'year' = 'month';
    if (periodParam === 'week' || periodParam === 'month' || periodParam === 'year') {
      period = periodParam;
    }
    
    console.log(`Dashboard API çağrıldı, istenen dönem: ${period}`);
    
    // Eğer sadece vergi bilgileri isteniyorsa
    if (taxParam === 'only') {
      const now = new Date();
      const year = now.getFullYear();
      
      // Vergi takvimi oluştur
      const taxCalendar = generateTaxCalendar(year);
      
      // Sadece vergi bilgilerini döndür
      return NextResponse.json({
        taxCalendar,
        year
      });
    }
    
    // Her seferinde taze verilerle vergi özetini hesapla
    const taxSummary = await getTaxSummaryForDashboard(period);
    
    // Dashboard verilerini al
    const data = await getDashboardData(period);
    
    // Vergi özetini dashboard verilerine ekle
    data.taxSummary = taxSummary;
    
    console.log(`Dashboard verileri başarıyla alındı, dönem: ${period}`);
    console.log(`KDV özeti: Tahsil: ${taxSummary.vatCollected}, Ödenen: ${taxSummary.vatPaid}, Bakiye: ${taxSummary.vatBalance}`);
    
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