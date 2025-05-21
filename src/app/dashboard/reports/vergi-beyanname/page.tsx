"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";

// Beyanname Kartı Bileşeni
const TaxDeclarationCard = ({ 
  title, 
  description,
  icon, 
  link,
  dueDate,
  status
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  link: string;
  dueDate: string;
  status: "pending" | "completed" | "late" | "notRequired";
}) => {
  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
    late: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
    notRequired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  };

  const statusText = {
    pending: "Hazırlanması Gerekiyor",
    completed: "Tamamlandı",
    late: "Gecikmiş",
    notRequired: "Bu dönem gerekli değil"
  };

  return (
    <Link href={link} className="block">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
            {icon}
          </div>
          <div>
            <h2 className="text-lg font-medium dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 border-t border-gray-100 dark:border-gray-700 pt-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Son Tarih:</p>
            <p className="text-sm font-medium dark:text-white">{dueDate}</p>
          </div>
          
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
              {statusText[status]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Özet Kart Bileşeni
const SummaryCard = ({ 
  title, 
  amount, 
  period,
  icon,
  trend
}: { 
  title: string; 
  amount: string; 
  period: string;
  icon: React.ReactNode;
  trend?: { percent: string; isUp: boolean } 
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold dark:text-white mt-1">{amount}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{period}</p>
      </div>
      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400">
        {icon}
      </div>
    </div>
    
    {trend && (
      <div className="mt-4 flex items-center">
        <span className={`text-xs ${trend.isUp ? 'text-green-500' : 'text-red-500'} mr-1`}>
          {trend.isUp ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414l3.293 3.293A1 1 0 0014 13z" clipRule="evenodd" />
            </svg>
          )}
          {trend.percent}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">önceki döneme göre</span>
      </div>
    )}
  </div>
);

export default function VergiBeyannamePage() {
  const [mounted, setMounted] = useState(false);
  const [activeYear, setActiveYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taxData, setTaxData] = useState<any>({
    taxCalendar: [],
    summary: {
      vatTotal: 0,
      withholding: 0,
      incomeTax: 0,
      corporateTax: 0,
      vatTrend: { percent: "0%", isUp: true },
      withholdingTrend: { percent: "0%", isUp: true },
      incomeTaxTrend: { percent: "0%", isUp: true },
      corporateTaxTrend: { percent: "0%", isUp: false }
    }
  });
  
  // API'den vergi verilerini getir
  useEffect(() => {
    const fetchTaxData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/taxes/summary?year=${activeYear}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTaxData(data);
        setLoading(false);
      } catch (err) {
        console.error('Vergi verileri yüklenirken hata oluştu:', err);
        setError('Vergi verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setLoading(false);
      }
    };
    
    if (mounted) {
      fetchTaxData();
    }
  }, [mounted, activeYear]);
  
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
          <h1 className="text-2xl font-bold dark:text-white">Vergi Beyanname Hazırlama</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            KDV, muhtasar ve gelir vergisi beyannamelerini hazırlayın ve yönetin
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm"
            value={activeYear}
            onChange={(e) => setActiveYear(e.target.value)}
          >
            {[...Array(5)].map((_, i) => {
              const year = new Date().getFullYear() - 2 + i;
              return (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      
      {/* Vergi Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard 
          title="Toplam Ödenen KDV" 
          amount={formatCurrency(taxData.summary.vatTotal)}
          period={`${activeYear} Yılı Toplam`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
          trend={taxData.summary.vatTrend}
        />
        
        <SummaryCard 
          title="Toplam Ödenen Stopaj" 
          amount={formatCurrency(taxData.summary.withholding)}
          period={`${activeYear} Yılı Toplam`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          }
          trend={taxData.summary.withholdingTrend}
        />
        
        <SummaryCard 
          title="Gelir Vergisi" 
          amount={formatCurrency(taxData.summary.incomeTax)}
          period={`${activeYear} Tahmini`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          trend={taxData.summary.incomeTaxTrend}
        />
        
        <SummaryCard 
          title="Kurumlar Vergisi" 
          amount={formatCurrency(taxData.summary.corporateTax)}
          period={`${activeYear} Tahmini`}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          trend={taxData.summary.corporateTaxTrend}
        />
      </div>
      
      {/* Beyanname Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TaxDeclarationCard
          title="KDV Beyannamesi"
          description="Aylık Katma Değer Vergisi Beyannamesi"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
          link="/dashboard/reports/vergi-beyanname/kdv"
          dueDate={taxData.nextDueDates?.kdv || "26 Eylül 2023"}
          status={taxData.nextStatuses?.kdv || "pending"}
        />
        
        <TaxDeclarationCard
          title="Muhtasar Beyanname"
          description="Gelir ve Kurumlar Vergisi Stopajları"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          }
          link="/dashboard/reports/vergi-beyanname/muhtasar"
          dueDate={taxData.nextDueDates?.muhtasar || "26 Eylül 2023"}
          status={taxData.nextStatuses?.muhtasar || "pending"}
        />
        
        <TaxDeclarationCard
          title="Gelir Vergisi Hesaplamaları"
          description="Gelir Vergisi Tahminleri ve Hesaplamaları"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
          link="/dashboard/reports/vergi-beyanname/gelir-vergisi"
          dueDate={taxData.nextDueDates?.gelir || "31 Mart 2024"}
          status={taxData.nextStatuses?.gelir || "notRequired"}
        />
      </div>
      
      {/* Vergi Takvimi */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Takvimi</h2>
        
        <div className="space-y-4">
          {taxData.taxCalendar && taxData.taxCalendar.length > 0 ? (
            taxData.taxCalendar.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <div>
                  <p className="text-sm font-medium dark:text-white">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.month}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mr-4">{item.deadline}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    item.status === 'late' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {item.status === 'completed' ? 'Tamamlandı' :
                    item.status === 'pending' ? 'Bekliyor' :
                    item.status === 'late' ? 'Gecikmiş' : 'Gerekli Değil'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Vergi takvimi bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
} 