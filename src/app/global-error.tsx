'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global hata:', error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Kritik Uygulama Hatası
            </h2>
            <p className="text-gray-700 mb-6">
              Uygulamada beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
            </p>
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 mb-6 overflow-auto">
              {error.message || 'Bilinmeyen hata'}
              {error.digest && <p className="mt-2 text-xs text-gray-500">Hata kodu: {error.digest}</p>}
            </div>
            <button
              onClick={() => reset()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 