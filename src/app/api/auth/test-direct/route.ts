import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET(req: NextRequest) {
  let pool: Pool | null = null;
  
  try {
    // Direkt PostgreSQL bağlantısı
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Basit test sorgusu
    const result = await pool.query('SELECT COUNT(*) as count FROM users');
    const userCount = parseInt(result.rows[0].count);

    // Test kullanıcısını sorgula
    const userResult = await pool.query(
      'SELECT id, email, name, role, "isActive", "passwordHash" FROM users WHERE email = $1',
      ['test@onmuhasebe.com']
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Test kullanıcısı bulunamadı',
        userCount,
        method: 'DIRECT_SQL'
      });
    }

    const testUser = userResult.rows[0];

    return NextResponse.json({
      success: true,
      message: 'Direkt SQL bağlantısı başarılı',
      userCount,
      testUser: {
        id: testUser.id,
        email: testUser.email,
        name: testUser.name,
        role: testUser.role,
        isActive: testUser.isActive,
        hasPassword: !!testUser.passwordHash
      },
      method: 'DIRECT_SQL',
      jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      databaseUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'NOT_SET'
    });

  } catch (error) {
    console.error('Direct SQL test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      method: 'DIRECT_SQL',
      jwtSecret: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      databaseUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + '...' : 'NOT_SET'
    }, { status: 500 });
  } finally {
    if (pool) {
      await pool.end();
    }
  }
} 