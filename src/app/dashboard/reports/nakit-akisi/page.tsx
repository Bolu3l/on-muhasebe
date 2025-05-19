"use client";

import { useState, useEffect } from "react";

// Örnek nakit akışı veri seti
const demoData = {
  // Son 6 ay için gerçekleşen nakit akışı
  past: [
    { month: "Ocak", income: 48000, expense: 35000, balance: 13000 },
    { month: "Şubat", income: 52000, expense: 38000, balance: 14000 },
    { month: "Mart", income: 45000, expense: 36000, balance: 9000 },
    { month: "Nisan", income: 55000, expense: 40000, balance: 15000 },
    { month: "Mayıs", income: 60000, expense: 42000, balance: 18000 },
    { month: "Haziran", income: 58000, expense: 43000, balance: 15000 }
  ],
  // Gelecek 6 ay için tahmin edilen nakit akışı
  forecast: [
    { month: "Temmuz", income: 62000, expense: 45000, balance: 17000 },
    { month: "Ağustos", income: 65000, expense: 47000, balance: 18000 },
    { month: "Eylül", income: 67000, expense: 48000, balance: 19000 },
    { month: "Ekim", income: 70000, expense: 50000, balance: 20000 },
    { month: "Kasım", income: 73000, expense: 52000, balance: 21000 },
    { month: "Aralık", income: 78000, expense: 55000, balance: 23000 }
  ],
  // Vadesi gelen ödemeler
  upcomingPayments: [
    { id: 1, title: "KDV Ödemesi", amount: 12500, dueDate: "2023-07-26" },
    { id: 2, title: "SGK Primi", amount: 8750, dueDate: "2023-07-30" },
    { id: 3, title: "Kira Ödemesi", amount: 15000, dueDate: "2023-08-05" },
    { id: 4, title: "Tedarikçi Ödemesi", amount: 24300, dueDate: "2023-08-15" }
  ],
  // Beklenen gelirler
  expectedIncomes: [
    { id: 1, title: "Müşteri Ödemesi - ABC Ltd.", amount: 32500, expectedDate: "2023-07-25" },
    { id: 2, title: "Müşteri Ödemesi - XYZ A.Ş.", amount: 18750, expectedDate: "2023-08-03" },
    { id: 3, title: "Kira Geliri", amount: 8000, expectedDate: "2023-08-10" }
  ]
};

export default function NakitAkisiPage() {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("12-month");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Nakit akışı grafiği için veriler
  const cashFlowData = [...demoData.past, ...demoData.forecast];
  
  // Ay formatını kısaltma fonksiyonu
  const formatMonth = (month: string) => month.substring(0, 3);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Nakit Akışı Tahminleri</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gelecek dönemler için nakit akışı projeksiyonları ve tahminleri
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="mr-4">
            <select 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="3-month">3 Aylık</option>
              <option value="6-month">6 Aylık</option>
              <option value="12-month">12 Aylık</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Raporu İndir
          </button>
        </div>
      </div>
      
      {/* Nakit Akışı Grafiği */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Nakit Akışı Projeksiyonu</h2>
        
        <div className="h-96 relative">
          {/* Chart Y ekseni */}
          <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between py-4">
            {[0, 20000, 40000, 60000, 80000].reverse().map((value) => (
              <div key={value} className="text-xs text-gray-500 dark:text-gray-400">
                {value.toLocaleString('tr-TR')} ₺
              </div>
            ))}
          </div>
          
          {/* Chart çizim alanı */}
          <div className="ml-16 h-full relative">
            {/* Y ekseni çizgileri */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <div 
                key={percent} 
                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                style={{ top: `${100 - percent}%` }}
              ></div>
            ))}
            
            {/* Geçmiş ve tahmin ayrımı */}
            <div 
              className="absolute h-full w-px bg-gray-400 dark:bg-gray-500 z-10"
              style={{ left: `${(demoData.past.length / cashFlowData.length) * 100}%` }}
            >
              <div className="absolute top-0 -ml-14 text-xs text-gray-500 dark:text-gray-400">
                Tahmin Başlangıcı
              </div>
            </div>
            
            {/* Barlar */}
            <div className="h-full flex">
              {cashFlowData.map((item, i) => {
                const isForecasted = i >= demoData.past.length;
                
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full px-1">
                    {/* Gelir barı */}
                    <div 
                      className={`w-full ${isForecasted ? 'bg-green-400/60' : 'bg-green-500'} mb-1`}
                      style={{ height: `${(item.income / 80000) * 100}%` }}
                    ></div>
                    
                    {/* Gider barı */}
                    <div 
                      className={`w-full ${isForecasted ? 'bg-red-400/60' : 'bg-red-500'} mb-8`}
                      style={{ height: `${(item.expense / 80000) * 100}%` }}
                    ></div>
                    
                    {/* X ekseni etiketi */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center absolute bottom-0 w-full" style={{ left: 0 }}>
                      {formatMonth(item.month)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Gösterge */}
        <div className="flex justify-center mt-8 space-x-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Gelir</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Gider</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400/60 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Tahmini Gelir</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400/60 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Tahmini Gider</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yaklaşan Ödemeler */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Yaklaşan Ödemeler</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Açıklama</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Tutar</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Vade Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {demoData.upcomingPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-sm text-gray-800 dark:text-gray-300">{payment.title}</td>
                    <td className="py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">
                      {payment.amount.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                      {new Date(payment.dueDate).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Beklenen Gelirler */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Beklenen Gelirler</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Açıklama</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Tutar</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-600 dark:text-gray-400">Beklenen Tarih</th>
                </tr>
              </thead>
              <tbody>
                {demoData.expectedIncomes.map((income) => (
                  <tr key={income.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-sm text-gray-800 dark:text-gray-300">{income.title}</td>
                    <td className="py-3 text-sm text-right font-medium text-green-600 dark:text-green-400">
                      {income.amount.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                      {new Date(income.expectedDate).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Nakit Akışı Özeti */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-base font-medium mb-1 dark:text-white">Toplam Beklenen Gelir</h2>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {demoData.forecast.reduce((sum, item) => sum + item.income, 0).toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek 6 ay</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-base font-medium mb-1 dark:text-white">Toplam Beklenen Gider</h2>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {demoData.forecast.reduce((sum, item) => sum + item.expense, 0).toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek 6 ay</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-base font-medium mb-1 dark:text-white">Tahmini Net Nakit Akışı</h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {demoData.forecast.reduce((sum, item) => sum + item.balance, 0).toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek 6 ay</p>
        </div>
      </div>
    </div>
  );
} 