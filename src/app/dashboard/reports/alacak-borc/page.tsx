"use client";

import { useState, useEffect } from "react";

// Örnek alacak/borç verileri
const demoData = {
  // Alacaklar
  receivables: [
    { id: 1, customer: "ABC Ltd. Şti.", invoiceNumber: "FT2023-421", amount: 28500, issueDate: "2023-05-15", dueDate: "2023-07-15", status: "pending", daysOverdue: 0 },
    { id: 2, customer: "XYZ A.Ş.", invoiceNumber: "FT2023-385", amount: 17200, issueDate: "2023-05-01", dueDate: "2023-06-15", status: "overdue", daysOverdue: 15 },
    { id: 3, customer: "123 Tekstil", invoiceNumber: "FT2023-390", amount: 34000, issueDate: "2023-05-05", dueDate: "2023-06-05", status: "overdue", daysOverdue: 25 },
    { id: 4, customer: "Tekno Market", invoiceNumber: "FT2023-410", amount: 12800, issueDate: "2023-05-10", dueDate: "2023-07-10", status: "pending", daysOverdue: 0 },
    { id: 5, customer: "Global Ticaret", invoiceNumber: "FT2023-428", amount: 45000, issueDate: "2023-05-20", dueDate: "2023-08-20", status: "pending", daysOverdue: 0 },
    { id: 6, customer: "Best İnşaat", invoiceNumber: "FT2023-442", amount: 67500, issueDate: "2023-05-30", dueDate: "2023-06-30", status: "pending", daysOverdue: 0 }
  ],
  
  // Borçlar
  payables: [
    { id: 1, supplier: "Malzeme A.Ş.", invoiceNumber: "2023-1215", amount: 15700, issueDate: "2023-05-10", dueDate: "2023-06-10", status: "overdue", daysOverdue: 20 },
    { id: 2, supplier: "Tedarik Ltd.", invoiceNumber: "2023-458", amount: 28900, issueDate: "2023-05-15", dueDate: "2023-07-15", status: "pending", daysOverdue: 0 },
    { id: 3, supplier: "Mega Dağıtım", invoiceNumber: "2023-789", amount: 9800, issueDate: "2023-05-05", dueDate: "2023-06-05", status: "overdue", daysOverdue: 25 },
    { id: 4, supplier: "Lojistik Pro", invoiceNumber: "2023-321", amount: 3500, issueDate: "2023-05-20", dueDate: "2023-06-20", status: "overdue", daysOverdue: 10 },
    { id: 5, supplier: "Ofis Malzemeleri", invoiceNumber: "2023-654", amount: 2100, issueDate: "2023-05-25", dueDate: "2023-07-25", status: "pending", daysOverdue: 0 }
  ],
  
  // Vade analizi - alacaklar
  receivablesAgingBuckets: [
    { range: "Vadesi Gelmemiş", amount: 125300, percentage: 60 },
    { range: "1-30 Gün Geçmiş", amount: 51200, percentage: 25 },
    { range: "31-60 Gün Geçmiş", amount: 22000, percentage: 10 },
    { range: "61-90 Gün Geçmiş", amount: 9800, percentage: 5 },
    { range: "90+ Gün Geçmiş", amount: 0, percentage: 0 }
  ],
  
  // Vade analizi - borçlar
  payablesAgingBuckets: [
    { range: "Vadesi Gelmemiş", amount: 31000, percentage: 55 },
    { range: "1-30 Gün Geçmiş", amount: 29000, percentage: 40 },
    { range: "31-60 Gün Geçmiş", amount: 0, percentage: 0 },
    { range: "61-90 Gün Geçmiş", amount: 0, percentage: 0 },
    { range: "90+ Gün Geçmiş", amount: 0, percentage: 0 }
  ],
  
  // Aylık ödemeler/tahsilatlar
  monthlyPayments: [
    { month: "Ocak", receivables: 85000, payables: 62000 },
    { month: "Şubat", receivables: 92000, payables: 71000 },
    { month: "Mart", receivables: 88000, payables: 67000 },
    { month: "Nisan", receivables: 105000, payables: 74000 },
    { month: "Mayıs", receivables: 115000, payables: 78000 },
    { month: "Haziran", receivables: 96000, payables: 69000 },
  ]
};

export default function AlacakBorcPage() {
  const [mounted, setMounted] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Toplam alacak ve borç hesaplamaları
  const totalReceivables = demoData.receivables.reduce((sum, item) => sum + item.amount, 0);
  const totalPayables = demoData.payables.reduce((sum, item) => sum + item.amount, 0);
  const overdueReceivables = demoData.receivables.filter(item => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0);
  const overduePayables = demoData.payables.filter(item => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0);

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
                    {demoData.monthlyPayments.map((item, i) => (
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
                  {demoData.receivablesAgingBuckets.map((item, i) => (
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
                  {demoData.payablesAgingBuckets.map((item, i) => (
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
                {demoData.receivables.map((item) => (
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
                {demoData.payables.map((item) => (
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