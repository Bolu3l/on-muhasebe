import { NextResponse } from 'next/server';

/**
 * API hatalarını standart bir şekilde işleyen yardımcı fonksiyon
 */
export function handleApiError(error: Error) {
  console.error('API hatası:', error);
  
  return NextResponse.json(
    { 
      error: 'İşlem sırasında bir hata oluştu.',
      message: error.message || 'Bilinmeyen hata',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    },
    { status: 500 }
  );
} 