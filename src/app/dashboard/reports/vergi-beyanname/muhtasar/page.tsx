"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Örnek veriler kaldırıldı - gerçek API verileri kullanılıyor

export default function MuhtasarBeyannamePage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taxItems, setTaxItems] = useState<Array<{ code: string; description: string; grossAmount: number; rate: number; taxAmount: number; [key: string]: any }>>([]);
  const [currentPeriod, setCurrentPeriod] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    periodText: `${new Date().getFullYear()}/${new Date().toLocaleString('tr-TR', { month: 'long' })}`,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 26).toLocaleDateString('tr-TR')
  });
  const [previousPeriods, setPreviousPeriods] = useState<Array<{ period: string; totalGross: number; totalTax: number; [key: string]: any }>>([]);
  
  // API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // URL parametrelerini kontrol et
        const params = new URLSearchParams(window.location.search);
        const period = params.get('period');
        
        const response = await fetch(`/api/taxes/withholding${period ? `?period=${period}` : ''}`);
        if (!response.ok) {
          throw new Error('Vergi verileri alınamadı');
        }
        const data = await response.json();
        
        if (data) {
          setTaxItems(data.taxItems || []);
          setPreviousPeriods(data.previousPeriods || []);
          if (data.currentPeriod) {
            setCurrentPeriod(data.currentPeriod);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Vergi verileri yüklenirken hata:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
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

  // Toplam değerleri hesaplama
  const totalGross = taxItems.reduce((sum, item) => sum + item.grossAmount, 0);
  const totalTax = taxItems.reduce((sum, item) => sum + item.taxAmount, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Muhtasar Beyanname</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {currentPeriod.periodText} Dönemi
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link
            href="/dashboard/reports/vergi-beyanname"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Geri Dön
          </Link>
        </div>
      </div>
      
      {/* Sekmeler */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 text-sm font-medium ${
                activeTab === "general"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("general")}
            >
              Genel Bilgiler
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 text-sm font-medium ${
                activeTab === "taxItems"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("taxItems")}
            >
              Vergi Kesintileri
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block py-2 px-4 text-sm font-medium ${
                activeTab === "summary"
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("summary")}
            >
              Özet ve Sonuç
            </button>
          </li>
        </ul>
      </div>
      
      {/* Sekme İçeriği */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {activeTab === "general" && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Genel Bilgiler</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vergilendirme Dönemi
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={currentPeriod.periodText}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Son Gönderim Tarihi
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={currentPeriod.dueDate}
                  readOnly
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Beyanname Türü
              </label>
              <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <option>Muhtasar Beyanname</option>
                <option>Muhtasar ve Prim Hizmet Beyannamesi</option>
                <option>Düzeltme Beyannamesi</option>
              </select>
            </div>
            
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-md font-medium mb-4 dark:text-white">Önceki Dönem Beyannameleri</h3>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönem</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brüt Tutar</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Toplam Kesinti</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {previousPeriods.map((period, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.period}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.totalGross.toLocaleString('tr-TR')} ₺</td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.totalTax.toLocaleString('tr-TR')} ₺</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">
                          Tamamlandı
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === "taxItems" && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Kesintileri</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kod</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Açıklama</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brüt Tutar</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Oran</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kesinti Tutarı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {taxItems.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.code}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.description}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          value={item.grossAmount.toLocaleString('tr-TR')}
                          onChange={(e) => {
                            const newTaxItems = [...taxItems];
                            const value = Number(e.target.value.replace(/\D/g, ''));
                            newTaxItems[i].grossAmount = value;
                            newTaxItems[i].taxAmount = (value * item.taxRate) / 100;
                            setTaxItems(newTaxItems);
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">%{item.taxRate}</td>
                      <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                        {item.taxAmount.toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td colSpan={2} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                      {totalGross.toLocaleString('tr-TR')} ₺
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300"></td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                      {totalTax.toLocaleString('tr-TR')} ₺
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-4 text-right">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Yeni Kesinti Ekle
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "summary" && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Özet ve Sonuç</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Kesinti Özeti</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Brüt Tutar:</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{totalGross.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Kesinti:</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{totalTax.toLocaleString('tr-TR')} ₺</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tahakkuk Eden Vergi:</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{totalTax.toLocaleString('tr-TR')} ₺</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Beyanname Özeti</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Dönem:</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{currentPeriod.periodText}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Son Tarih:</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{currentPeriod.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Durum:</span>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500">
                      Taslak
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md">
                Taslak Olarak Kaydet
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                Beyanname Gönder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 