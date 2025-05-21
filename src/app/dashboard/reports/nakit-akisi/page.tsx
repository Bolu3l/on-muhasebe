"use client";

import { useState, useEffect } from "react";

export default function NakitAkisiPage() {
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("12-month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);
  const [expectedIncomes, setExpectedIncomes] = useState<any[]>([]);
  const [pastDataLength, setPastDataLength] = useState(0);
  
  // API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reports/cash-flow?period=${timeRange}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data) {
          setCashFlowData([...(data.past || []), ...(data.forecast || [])]);
          setUpcomingPayments(data.upcomingPayments || []);
          setExpectedIncomes(data.expectedIncomes || []);
          setPastDataLength(data.past?.length || 0);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Nakit akışı verileri yüklenirken hata:', err);
        setError('Veriler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };
    
    if (mounted) {
      fetchData();
    }
  }, [mounted, timeRange]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // Ay formatını kısaltma fonksiyonu
  const formatMonth = (month: string) => month?.substring(0, 3) || '';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-4 rounded-md">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

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
            {cashFlowData.length > 0 && (
              <div 
                className="absolute h-full w-px bg-gray-400 dark:bg-gray-500 z-10"
                style={{ left: `${(pastDataLength / cashFlowData.length) * 100}%` }}
              >
                <div className="absolute top-0 -ml-14 text-xs text-gray-500 dark:text-gray-400">
                  Tahmin Başlangıcı
                </div>
              </div>
            )}
            
            {/* Barlar */}
            <div className="h-full flex">
              {cashFlowData.map((item, i) => {
                const isForecasted = i >= pastDataLength;
                
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
                {upcomingPayments.length > 0 ? (
                  upcomingPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 text-sm text-gray-800 dark:text-gray-300">{payment.title}</td>
                      <td className="py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">
                        {payment.amount.toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                        {new Date(payment.dueDate).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                      Yaklaşan ödeme bulunmamaktadır
                    </td>
                  </tr>
                )}
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
                {expectedIncomes.length > 0 ? (
                  expectedIncomes.map((income) => (
                    <tr key={income.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 text-sm text-gray-800 dark:text-gray-300">{income.title}</td>
                      <td className="py-3 text-sm text-right font-medium text-green-600 dark:text-green-400">
                        {income.amount.toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                        {new Date(income.expectedDate).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                      Beklenen gelir bulunmamaktadır
                    </td>
                  </tr>
                )}
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
            {cashFlowData
              .slice(pastDataLength)
              .reduce((sum, item) => sum + (item.income || 0), 0)
              .toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek dönem</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-base font-medium mb-1 dark:text-white">Toplam Beklenen Gider</h2>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {cashFlowData
              .slice(pastDataLength)
              .reduce((sum, item) => sum + (item.expense || 0), 0)
              .toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek dönem</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-base font-medium mb-1 dark:text-white">Tahmini Net Nakit Akışı</h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {cashFlowData
              .slice(pastDataLength)
              .reduce((sum, item) => sum + (item.balance || 0), 0)
              .toLocaleString('tr-TR')} ₺
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gelecek dönem</p>
        </div>
      </div>
    </div>
  );
} 