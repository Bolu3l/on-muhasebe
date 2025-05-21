"use client";

import { useState, useEffect } from "react";

// Örnek veriler kaldırıldı - gerçek API verileri kullanılıyor

export default function AlacakBorcPage() {
  const [mounted, setMounted] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState({
    receivables: [],
    payables: [],
    receivablesAgingBuckets: [],
    payablesAgingBuckets: [],
    monthlyPayments: []
  });
  
  // API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reports/receivables-payables');
        if (!response.ok) {
          throw new Error('Rapor verileri alınamadı');
        }
        const data = await response.json();
        setReportData(data);
        setLoading(false);
      } catch (err) {
        console.error('Rapor verileri yüklenirken hata:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (mounted) {
      fetchData();
    }
  }, [mounted]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Rapor verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  // Toplam alacak ve borç hesaplamaları
  const totalReceivables = reportData.receivables.reduce((sum, item) => sum + item.amount, 0);
  const totalPayables = reportData.payables.reduce((sum, item) => sum + item.amount, 0);
  const overdueReceivables = reportData.receivables.filter(item => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0);
  const overduePayables = reportData.payables.filter(item => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Alacak/Borç Vade Analizleri</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Alacak ve borçların vade durumları ve ödemeler analizi
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${tabIndex === 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setTabIndex(0)}
          >
            Genel Bakış
          </button>
          
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${tabIndex === 1 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setTabIndex(1)}
          >
            Alacaklar
          </button>
          
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${tabIndex === 2 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setTabIndex(2)}
          >
            Borçlar
          </button>
        </div>
      </div>
      
      {/* Genel Bakış Sekmesi */}
      {tabIndex === 0 && (
        <>
          {/* Özet Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Toplam Alacak</h2>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {totalReceivables.toLocaleString('tr-TR')} ₺
              </p>
              <div className="flex items-center mt-2">
                <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${totalReceivables / (totalReceivables + totalPayables) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Toplam Borç</h2>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {totalPayables.toLocaleString('tr-TR')} ₺
              </p>
              <div className="flex items-center mt-2">
                <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${totalPayables / (totalReceivables + totalPayables) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vadesi Geçmiş Alacaklar</h2>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {overdueReceivables.toLocaleString('tr-TR')} ₺
              </p>
              <div className="flex items-center text-yellow-500 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Toplam alacakların %{((overdueReceivables / totalReceivables) * 100).toFixed(1)}'i</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Vadesi Geçmiş Borçlar</h2>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {overduePayables.toLocaleString('tr-TR')} ₺
              </p>
              <div className="flex items-center text-yellow-500 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Toplam borçların %{((overduePayables / totalPayables) * 100).toFixed(1)}'i</span>
              </div>
            </div>
          </div>
          
          {/* Alacak/Borç Tahsilat Grafiği */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4 dark:text-white">Aylık Alacak/Borç Analizi</h2>
              
              <div className="h-80 relative">
                {/* Chart Y ekseni */}
                <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between py-4">
                  {[0, 30000, 60000, 90000, 120000].reverse().map((value) => (
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
                  
                  {/* Barlar */}
                  <div className="h-full flex">
                    {reportData.monthlyPayments.map((item, i) => (
                      <div key={i} className="flex-1 flex justify-center h-full px-1">
                        {/* Alacaklar barı */}
                        <div className="w-8 flex flex-col justify-end h-full">
                          <div 
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${(item.receivables / 120000) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Borçlar barı */}
                        <div className="w-8 flex flex-col justify-end h-full ml-2">
                          <div 
                            className="w-full bg-red-500 rounded-t"
                            style={{ height: `${(item.payables / 120000) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* X ekseni etiketi */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center absolute bottom-0 w-full" style={{ left: 0, transform: 'translateY(20px)' }}>
                          {item.month.substring(0, 3)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Gösterge */}
              <div className="flex justify-center mt-8 space-x-8">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Alacaklar</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Borçlar</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vade Dağılımları */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Alacak Vade Dağılımı */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4 dark:text-white">Alacak Vade Dağılımı</h2>
                
                <div className="space-y-4">
                  {reportData.receivablesAgingBuckets.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.range}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                            {item.amount.toLocaleString('tr-TR')} ₺
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Borç Vade Dağılımı */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4 dark:text-white">Borç Vade Dağılımı</h2>
                
                <div className="space-y-4">
                  {reportData.payablesAgingBuckets.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.range}</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                            {item.amount.toLocaleString('tr-TR')} ₺
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div
                          className={`h-2 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Alacaklar Sekmesi */}
      {tabIndex === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium dark:text-white">Alacak Listesi</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Müşteri</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fatura No</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fatura Tarihi</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vade Tarihi</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reportData.receivables.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.invoiceNumber}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-gray-300">
                      {item.amount.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(item.issueDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(item.dueDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {item.status === "overdue" ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          {item.daysOverdue} Gün Gecikmiş
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Vadesi Gelmemiş
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={2} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam</td>
                  <td colSpan={4} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    {totalReceivables.toLocaleString('tr-TR')} ₺
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
      
      {/* Borçlar Sekmesi */}
      {tabIndex === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium dark:text-white">Borç Listesi</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tedarikçi</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fatura No</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fatura Tarihi</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vade Tarihi</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reportData.payables.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.supplier}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{item.invoiceNumber}</td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-800 dark:text-gray-300">
                      {item.amount.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(item.issueDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(item.dueDate).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {item.status === "overdue" ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          {item.daysOverdue} Gün Gecikmiş
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Vadesi Gelmemiş
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td colSpan={2} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam</td>
                  <td colSpan={4} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    {totalPayables.toLocaleString('tr-TR')} ₺
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 