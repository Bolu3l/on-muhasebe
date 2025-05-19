import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') as 'week' | 'month' | 'year' || 'month';
    
    const data = await getDashboardData(period);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard verileri alınırken hata oluştu:', error);
    return NextResponse.json(
      { error: 'Dashboard verileri alınamadı' },
      { status: 500 }
    );
  }
} 