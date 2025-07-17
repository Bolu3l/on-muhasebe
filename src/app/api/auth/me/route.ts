import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // JWT token'ı kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }

    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Kullanıcı bilgilerini getir
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { companies: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        companies: user.companies.map(company => ({
          id: company.id,
          name: company.name,
          taxNumber: company.taxNumber,
          taxOffice: company.taxOffice,
          address: company.address,
          phone: company.phone
        }))
      }
    });

  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 