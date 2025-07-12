import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Client-side'da token'ı silmek için response döndür
    return NextResponse.json({
      message: 'Çıkış başarılı'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Çıkış sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
} 