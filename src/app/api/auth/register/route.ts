import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, companyName, taxNumber, taxOffice, phone, address } = await req.json();

    console.log('Kayıt API çağrıldı:', { email, name, companyName, taxNumber });

    // Zorunlu alanları kontrol et
    if (!email || !password || !name || !companyName || !taxNumber) {
      return NextResponse.json(
        { error: 'Email, şifre, ad, şirket adı ve vergi numarası zorunlu alanlardır' },
        { status: 400 }
      );
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // Vergi numarası uzunluğunu kontrol et
    if (!/^\d{10}$/.test(taxNumber)) {
      return NextResponse.json(
        { error: 'Vergi numarası 10 haneli olmalıdır' },
        { status: 400 }
      );
    }

    // Aynı email ile kayıtlı kullanıcı var mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email adresi ile kayıtlı bir kullanıcı bulunmaktadır' },
        { status: 400 }
      );
    }

    // Aynı vergi numarası ile kayıtlı şirket var mı kontrol et
    const existingCompany = await prisma.company.findFirst({
      where: { taxNumber }
    });

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Bu vergi numarası ile kayıtlı bir şirket bulunmaktadır' },
        { status: 400 }
      );
    }

    // Şifreyi hash'le
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Kullanıcı ve şirket ID'leri oluştur
    const userId = uuidv4();
    const companyId = uuidv4();

    // Transaction ile kullanıcı ve şirket oluştur
    const result = await prisma.$transaction(async (prisma) => {
      // Kullanıcı oluştur
      const user = await prisma.user.create({
        data: {
          id: userId,
          email,
          name,
          passwordHash,
          role: 'ADMIN', // İlk kullanıcı admin olsun
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Şirket oluştur
      const company = await prisma.company.create({
        data: {
          id: companyId,
          userId: userId,
          name: companyName,
          taxNumber,
          taxOffice: taxOffice || 'Vergi Dairesi',
          phone: phone || null,
          address: address || null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      return { user, company };
    });

    console.log('Kullanıcı ve şirket başarıyla oluşturuldu:', {
      userId: result.user.id,
      companyId: result.company.id
    });

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: result.user.id,
        email: result.user.email,
        name: result.user.name
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Şifre hash'ini response'tan çıkar
    const { passwordHash: _, ...userWithoutPassword } = result.user;

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı',
      user: {
        ...userWithoutPassword,
        companies: [result.company]
      },
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { 
        error: 'Kayıt sırasında bir hata oluştu',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 