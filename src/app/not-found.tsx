import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          404 - Sayfa Bulunamadı
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Üzgünüz, aradığınız sayfaya ulaşılamıyor. Sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md block text-center"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
} 