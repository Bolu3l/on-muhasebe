'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Uygulama hatası:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Bir hata oluştu
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Üzgünüz, sayfayı yüklerken bir sorun oluştu. Tekrar denemek için aşağıdaki butona tıklayın.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300 mb-6 overflow-auto">
          {error.message || 'Bilinmeyen hata'}
        </div>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
} 