"use client";

import { useState, useEffect } from "react";

const ReportCard = ({ title, description, icon, onClick }: { title: string; description: string; icon: React.ReactNode; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer"
  >
    <div className="flex items-center mb-4">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
        {icon}
      </div>
      <h2 className="text-lg font-medium dark:text-white">{title}</h2>
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </div>
);

// Örnek chart bileşeni
const Chart = ({ type, data }: { type: string; data: any }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  // Bar chart için
  if (type === 'bar') {
    return (
      <div className="h-80 flex items-end justify-between px-4">
        {data.map((item: any, i: number) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div 
              className="w-full mx-1 bg-blue-500 dark:bg-blue-600 rounded-t" 
              style={{ height: `${(item.value / Math.max(...data.map((d: any) => d.value))) * 100}%` }}
            ></div>
            <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Pie chart için basit bir simülasyon
  if (type === 'pie') {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const total = data.reduce((acc: number, curr: any) => acc + curr.value, 0);
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative h-60 w-60 rounded-full overflow-hidden">
          {data.map((item: any, i: number) => {
            const percentage = (item.value / total) * 100;
            const prevPercentages = data
              .slice(0, i)
              .reduce((acc: number, curr: any) => acc + (curr.value / total) * 100, 0);
            
            return (
              <div 
                key={i} 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: colors[i % colors.length],
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * prevPercentages / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * prevPercentages / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * (prevPercentages + percentage) / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * (prevPercentages + percentage) / 100)}%)` 
                }}
              ></div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800"></div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item: any, i: number) => (
            <div key={i} className="flex items-center text-sm">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[i % colors.length] }}></span>
              <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Line chart için
  if (type === 'line') {
    return (
      <div className="h-80 relative">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200 dark:bg-gray-700"></div>
        <div className="absolute inset-y-0 left-0 w-px bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Y ekseni etiketleri */}
        <div className="absolute left-2 inset-y-0 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-2">
          {[0, 25, 50, 75, 100].reverse().map((val) => (
            <span key={val}>{val}%</span>
          ))}
        </div>
        
        <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={data.map((item: any, i: number) => `${(i / (data.length - 1)) * 100}, ${100 - item.value}`).join(' ')}
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* X ekseni etiketleri */}
        <div className="absolute bottom-2 inset-x-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-4">
          {data.map((item: any, i: number) => (
            <span key={i}>{item.label}</span>
          ))}
        </div>
      </div>
    );
  }
  
  return <div className="h-80 flex items-center justify-center">Geçersiz grafik türü</div>;
};

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  
  // Demo veri
  const demoData = {
    sales: [
      { label: "Oca", value: 65 },
      { label: "Şub", value: 59 },
      { label: "Mar", value: 80 },
      { label: "Nis", value: 81 },
      { label: "May", value: 56 },
      { label: "Haz", value: 55 },
      { label: "Tem", value: 40 }
    ],
    categories: [
      { label: "Teknoloji", value: 45 },
      { label: "Hizmetler", value: 30 },
      { label: "Ürünler", value: 15 },
      { label: "Diğer", value: 10 }
    ],
    customers: [
      { label: "Yeni", value: 25 },
      { label: "Tekrarlayan", value: 75 }
    ],
    growth: [
      { label: "Oca", value: 20 },
      { label: "Şub", value: 35 },
      { label: "Mar", value: 25 },
      { label: "Nis", value: 45 },
      { label: "May", value: 65 },
      { label: "Haz", value: 48 },
      { label: "Tem", value: 70 }
    ],
    payments: [
      { label: "Nakit", value: 15 },
      { label: "Kredi Kartı", value: 65 },
      { label: "Banka Transferi", value: 20 }
    ]
  };

  useEffect(() => {
    setMounted(true);
    // API simülasyonu
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Hydration sorunlarını önlemek için
  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Raporlar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            İşletmenizin performansını analiz edin
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Raporu İndir
          </button>
        </div>
      </div>
      
      {/* Başlık ve Seçim */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        {activeReport ? (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between">
            <button 
              onClick={() => setActiveReport(null)} 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 md:mb-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Rapor Listesine Dön
            </button>
            
            <div className="flex items-center">
              <select className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                <option value="year">Son 1 Yıl</option>
                <option value="month">Son 1 Ay</option>
                <option value="quarter">Son 3 Ay</option>
                <option value="custom">Özel Aralık</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-medium dark:text-white">Rapor Seçin</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Analiz etmek istediğiniz rapor türünü seçin</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : activeReport ? (
          <div className="p-6">
            {activeReport === 'sales' && (
              <>
                <h3 className="text-lg font-medium dark:text-white mb-4">Satış Performansı</h3>
                <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <Chart type="bar" data={demoData.sales} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Satış</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">₺124,500</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ %12 geçen aya göre</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ortalama Fatura</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">₺4,150</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">↓ %3 geçen aya göre</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fatura Adedi</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">30</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ %15 geçen aya göre</p>
                  </div>
                </div>
              </>
            )}
            
            {activeReport === 'categories' && (
              <>
                <h3 className="text-lg font-medium dark:text-white mb-4">Kategori Dağılımı</h3>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <Chart type="pie" data={demoData.categories} />
                  </div>
                  <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">En Çok Satan Kategori</p>
                      <p className="text-lg font-bold dark:text-white mt-1">Teknoloji</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">₺55,800 toplam değer</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">En Hızlı Büyüyen Kategori</p>
                      <p className="text-lg font-bold dark:text-white mt-1">Hizmetler</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ %28 geçen aya göre</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">En Düşük Performans</p>
                      <p className="text-lg font-bold dark:text-white mt-1">Diğer</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2">↓ %5 geçen aya göre</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeReport === 'customers' && (
              <>
                <h3 className="text-lg font-medium dark:text-white mb-4">Müşteri Analizi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Müşteri Tipi</h4>
                    <Chart type="pie" data={demoData.customers} />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Müşteri Büyümesi</h4>
                    <Chart type="line" data={demoData.growth} />
                  </div>
                </div>
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium dark:text-white">En Değerli Müşteriler</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                        <tr>
                          <th className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium">Müşteri</th>
                          <th className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium">Toplam Satış</th>
                          <th className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium">Fatura Adedi</th>
                          <th className="px-6 py-3 text-gray-500 dark:text-gray-400 text-sm font-medium">Son İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[
                          { name: "Mehmet Kaya", company: "123 Holding", total: 32400, count: 3, lastDate: "10.07.2023" },
                          { name: "Ahmet Yılmaz", company: "ABC Teknoloji Ltd.", total: 24500, count: 5, lastDate: "15.06.2023" },
                          { name: "Ayşe Demir", company: "XYZ Danışmanlık A.Ş.", total: 18750, count: 2, lastDate: "20.06.2023" },
                          { name: "Mustafa Öztürk", company: "Global Ticaret", total: 15200, count: 4, lastDate: "18.05.2023" },
                          { name: "Zeynep Şahin", company: "Acme Ltd.", total: 9800, count: 1, lastDate: "05.04.2023" }
                        ].map((customer, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{customer.company}</div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                              ₺{customer.total.toLocaleString('tr-TR')}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {customer.count}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                              {customer.lastDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            
            {activeReport === 'payments' && (
              <>
                <h3 className="text-lg font-medium dark:text-white mb-4">Ödeme Analizi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Ödeme Metodları</h4>
                    <Chart type="pie" data={demoData.payments} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Tahsilatlar</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Zamanında Ödenen</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">₺89,450</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Geciken Ödemeler</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">₺15,200</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Ödemesi Bekleyenler</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">₺8,850</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                          <span className="font-medium dark:text-white">Toplam</span>
                          <span className="font-bold dark:text-white">₺113,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ortalama Tahsilat Süresi</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">15 gün</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">↓ 2 gün geçen aya göre</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">En Çok Tercih Edilen Metod</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">Kredi Kartı</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Toplam ödemelerin %65'i</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gecikmiş Ödemeler</p>
                    <p className="text-2xl font-bold dark:text-white mt-1">₺15,200</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">3 adet fatura</p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ReportCard 
                title="Satış Performansı" 
                description="Zamanla işletmenizin satışlarını ve gelirlerini analiz edin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                onClick={() => setActiveReport('sales')}
              />
              
              <ReportCard 
                title="Kategori Dağılımı" 
                description="Ürün ve hizmet kategorilerinin satışlardaki dağılımını görüntüleyin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                }
                onClick={() => setActiveReport('categories')}
              />
              
              <ReportCard 
                title="Müşteri Analizi" 
                description="Müşteri davranışlarını ve müşteri bazlı gelirleri inceleyin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                onClick={() => setActiveReport('customers')}
              />
              
              <ReportCard 
                title="Ödeme Analizi" 
                description="Ödeme yöntemlerini ve tahsilatları analiz edin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                onClick={() => setActiveReport('payments')}
              />
              
              <ReportCard 
                title="Kar Marjı Raporu" 
                description="Ürün ve hizmet bazında maliyetleri ve kar marjlarını görüntüleyin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                onClick={() => setActiveReport('margins')}
              />
              
              <ReportCard 
                title="Dönemsel Karşılaştırma" 
                description="Farklı dönemleri karşılaştırarak işletmenizin gelişimini izleyin."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                onClick={() => setActiveReport('periods')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 