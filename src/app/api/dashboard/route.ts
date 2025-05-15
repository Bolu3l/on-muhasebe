import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') as 'week' | 'month' | 'year' || 'month';
    
    console.log(`Dashboard API çağrıldı, dönem: ${period}`);
    
    const data = await getDashboardData(period);
    
    console.log('Dashboard verileri:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard API hatası:', error);
    
    // Hata durumunda bile sıfır değerlerini döndür, kullanıcı tercihine göre
    return NextResponse.json({
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      pendingInvoices: {
        count: 0,
        total: 0
      },
      recentTransactions: []
    });
  }
} 