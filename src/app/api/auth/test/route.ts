import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  try {
    // Database connection test
    const userCount = await prisma.user.count();
    console.log('Toplam kullanıcı sayısı:', userCount);

    // Test kullanıcısını kontrol et
    const testUser = await prisma.user.findUnique({
      where: { email: 'test@onmuhasebe.com' },
      include: { companies: true }
    });

    if (!testUser) {
      return NextResponse.json({
        success: false,
        message: 'Test kullanıcısı bulunamadı',
        userCount
      });
    }

    // Şifre hash'ini test et
    const isPasswordValid = await bcrypt.compare('test123', testUser.passwordHash);

    return NextResponse.json({
      success: true,
      message: 'Test kullanıcısı mevcut',
      userCount,
      testUser: {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
        role: testUser.role,
        isActive: testUser.isActive,
        passwordValid: isPasswordValid,
        companiesCount: testUser.companies.length
      },
      jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      databaseUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'NOT_SET',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET'
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      databaseUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'NOT_SET',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET'
    }, { status: 500 });
  }
} 