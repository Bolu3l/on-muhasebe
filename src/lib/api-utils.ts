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

/**
 * API isteklerindeki gerekli alanları doğrulayan yardımcı fonksiyon
 */
export function validateRequestData(data: any, requiredFields: string[]) {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
} 