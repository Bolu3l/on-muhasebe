"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Rapor türü kartı bileşeni
const ReportCard = ({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  link: string 
}) => (
  <Link href={link} className="block">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
          {icon}
        </div>
        <h2 className="text-lg font-medium dark:text-white">{title}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  </Link>
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Finansal Raporlar</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          İşletmenizin finansal durumunu analiz edin ve detaylı raporlar oluşturun
        </p>
      </div>
      
      {/* Rapor Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportCard
          title="Nakit Akışı Tahminleri"
          description="Gelecek dönemler için nakit akışı projeksiyonları ve tahminleri"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          link="/dashboard/reports/nakit-akisi"
        />
        
        <ReportCard
          title="Kâr/Zarar Analizleri"
          description="İşletmenizin kârlılık performansı ve finansal analizleri"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          link="/dashboard/reports/kar-zarar"
        />
        
        <ReportCard
          title="Alacak/Borç Vade Analizleri"
          description="Alacak ve borçların vade durumları ve ödemeler analizi"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          link="/dashboard/reports/alacak-borc"
        />
        
        <ReportCard
          title="Grafiksel Finansal Raporlar"
          description="İşletmenizin finansal verilerini görsel raporlar ile analiz edin"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          }
          link="/dashboard/reports/grafik-raporlar"
        />
        
        <ReportCard
          title="Vergi Beyanname Hazırlama"
          description="KDV, muhtasar ve gelir vergisi beyannamelerini hazırlayın ve yönetin"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
          link="/dashboard/reports/vergi-beyanname"
        />
      </div>
      
      {/* Hızlı Raporlar Bölümü */}
      <div className="mt-12">
        <h2 className="text-xl font-bold dark:text-white mb-4">Hızlı Raporlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Aylık Gelir Raporu</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Vadesi Geçen Alacaklar</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">KDV Raporu</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Personel Gider Raporu</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Stok Değerleme</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-white">Banka Mutabakatı</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Özel Rapor Oluşturma */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold dark:text-white mb-4">Özel Rapor Oluştur</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rapor Türü
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>Gelir Raporu</option>
              <option>Gider Raporu</option>
              <option>Kâr/Zarar Raporu</option>
              <option>Müşteri Analizi</option>
              <option>Tedarikçi Analizi</option>
              <option>Vergi Raporu</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tarih Aralığı
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>Bu Ay</option>
              <option>Son 3 Ay</option>
              <option>Son 6 Ay</option>
              <option>Bu Yıl</option>
              <option>Geçen Yıl</option>
              <option>Özel Aralık</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rapor Formatı
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>Görsel Rapor</option>
            </select>
          </div>
        </div>
        
        <div className="text-right">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Rapor Oluştur
          </button>
        </div>
      </div>
    </div>
  );
} 