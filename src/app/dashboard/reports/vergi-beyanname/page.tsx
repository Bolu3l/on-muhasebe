"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [activeYear, setActiveYear] = useState("2023");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Vergi takvimi verileri
  const taxCalendar = [
    { 
      month: "Ağustos", 
      deadline: "26 Ağustos", 
      title: "KDV Beyannamesi (Temmuz)", 
      status: "completed" as const
    },
    { 
      month: "Ağustos", 
      deadline: "26 Ağustos", 
      title: "Muhtasar Beyanname (Temmuz)", 
      status: "completed" as const
    },
    { 
      month: "Eylül", 
      deadline: "26 Eylül", 
      title: "KDV Beyannamesi (Ağustos)", 
      status: "pending" as const
    },
    { 
      month: "Eylül", 
      deadline: "26 Eylül", 
      title: "Muhtasar Beyanname (Ağustos)", 
      status: "pending" as const
    },
    { 
      month: "Ekim", 
      deadline: "26 Ekim", 
      title: "KDV Beyannamesi (Eylül)", 
      status: "notRequired" as const
    }
  ];

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
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
      </div>
      
      {/* Vergi Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard 
          title="Toplam Ödenen KDV" 
          amount="45.250,00 ₺" 
          period="2023 Yılı Toplam"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
          }
          trend={{
            percent: "8.5%",
            isUp: true
          }}
        />
        
        <SummaryCard 
          title="Toplam Ödenen Stopaj" 
          amount="28.750,00 ₺" 
          period="2023 Yılı Toplam"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          }
          trend={{
            percent: "5.2%",
            isUp: true
          }}
        />
        
        <SummaryCard 
          title="Gelir Vergisi" 
          amount="67.850,00 ₺" 
          period="2023 Tahmini"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          trend={{
            percent: "12.8%",
            isUp: true
          }}
        />
        
        <SummaryCard 
          title="Kurumlar Vergisi" 
          amount="92.300,00 ₺" 
          period="2023 Tahmini"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          trend={{
            percent: "3.7%",
            isUp: false
          }}
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
          dueDate="26 Eylül 2023"
          status="pending"
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
          dueDate="26 Eylül 2023"
          status="pending"
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
          dueDate="31 Mart 2024"
          status="notRequired"
        />
      </div>
      
      {/* Vergi Takvimi */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Takvimi</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ay</th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Son Tarih</th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Beyanname</th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {taxCalendar.map((item, i) => {
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
                  notRequired: "Gerekli Değil"
                };
                
                return (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.month}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.deadline}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.title}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[item.status]}`}>
                        {statusText[item.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Vergi Bildirimleri */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Duyuruları ve Değişiklikler</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">KDV Oranlarında Değişiklik</h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    1 Ekim 2023 tarihinden itibaren bazı ürün ve hizmetlerde KDV oranları değişecektir. Beyannamelerinizi hazırlarken bu değişiklikleri göz önünde bulundurunuz.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-900/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">E-Beyanname Sistemi Bakımı</h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    Gelir İdaresi Başkanlığı, e-beyanname sisteminde 15-16 Eylül 2023 tarihlerinde bakım çalışması yapılacağını duyurmuştur. Bu tarihler arasında sistem erişime kapalı olacaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 