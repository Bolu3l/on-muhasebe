import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  let pool: Pool | null = null;
  
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email ve şifre gerekli' },
        { status: 400 }
      );
    }

    // PostgreSQL bağlantısı
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Kullanıcıyı bul
    const userResult = await pool.query(
      'SELECT id, email, name, role, "isActive", "passwordHash" FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    const user = userResult.rows[0];

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Geçersiz şifre' },
        { status: 401 }
      );
    }

    // Kullanıcının şirketlerini al
    const companiesResult = await pool.query(
      'SELECT id, name, "taxNumber", "taxOffice", address, phone, email, sector, "isActive" FROM companies WHERE "userId" = $1',
      [user.id]
    );

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { passwordHash: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        companies: companiesResult.rows
      },
      token,
      message: 'Giriş başarılı'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: 'Giriş sırasında bir hata oluştu',
        debug: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  } finally {
    if (pool) {
      await pool.end();
    }
  }
} 