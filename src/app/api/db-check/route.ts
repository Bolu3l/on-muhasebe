import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    console.log('Database check endpoint çağrıldı');
    
    // Environment variables check
    const dbUrl = process.env.DATABASE_URL;
    const directUrl = process.env.DIRECT_URL;
    
    console.log('Environment variables:');
    console.log('DATABASE_URL exists:', !!dbUrl);
    console.log('DIRECT_URL exists:', !!directUrl);
    console.log('DATABASE_URL prefix:', dbUrl?.substring(0, 30) + '...');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Database connection test
    console.log('Database connection test başlatılıyor...');
    await prisma.$connect();
    console.log('Database connection başarılı');
    
    // Simple query test
    console.log('Test query çalıştırılıyor...');
    const employeeCount = await prisma.employee.count();
    console.log('Employee count:', employeeCount);
    
    // Test data creation (optional)
    console.log('Test employee oluşturma testi...');
    const testEmployee = {
      name: 'Test User',
      position: 'Test Position',
      department: 'Test Department',
      startDate: new Date(),
      salary: 1000,
      status: 'ACTIVE' as const
    };
    
    // Sadece test, gerçekten kaydetmeyeceğiz
    console.log('Test employee data:', testEmployee);
    
    return NextResponse.json({
      status: 'success',
      message: 'Database bağlantısı başarılı',
      details: {
        databaseUrlExists: !!dbUrl,
        directUrlExists: !!directUrl,
        employeeCount,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Database check hatası:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error('Error stack:', error instanceof Error ? error.stack : 'Stack yok');
    
    // Prisma-specific error handling
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Prisma error code:', (error as any).code);
      console.error('Prisma error meta:', (error as any).meta);
    }
    
    return NextResponse.json({
      status: 'error',
      message: 'Database bağlantısı başarısız',
      error: error instanceof Error ? error.message : String(error),
      details: {
        errorType: typeof error,
        errorConstructor: error?.constructor?.name,
        databaseUrlExists: !!process.env.DATABASE_URL,
        directUrlExists: !!process.env.DIRECT_URL,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
} 