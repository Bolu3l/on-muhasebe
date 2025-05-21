"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// KDV Hesap bilgileri için API'den alınacak
// Örnek veriler kaldırıldı - gerçek API verileri kullanılıyor

export default function KdvBeyannamePage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taxData, setTaxData] = useState(null);
  const [taxBase, setTaxBase] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    periodText: `${new Date().getFullYear()}/${new Date().toLocaleString('tr-TR', { month: 'long' })}`,
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 26).toLocaleDateString('tr-TR')
  });
  
  // API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // URL parametrelerini kontrol et
        const params = new URLSearchParams(window.location.search);
        const period = params.get('period');
        
        const response = await fetch(`/api/taxes/vat${period ? `?period=${period}` : ''}`);
        if (!response.ok) {
          throw new Error('Vergi verileri alınamadı');
        }
        const data = await response.json();
        setTaxData(data);
        
        if (data) {
          setTaxBase(data.taxBase || []);
          setDeductions(data.deductions || []);
          if (data.currentPeriod) {
            setCurrentPeriod(data.currentPeriod);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Vergi verileri yüklenirken hata:', err);
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

  // Toplam değerleri hesaplama
  const totalBase = taxBase.reduce((sum, item) => sum + item.base, 0);
  const totalTax = taxBase.reduce((sum, item) => sum + item.tax, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netTaxDue = totalTax > totalDeductions ? totalTax - totalDeductions : 0;
  const nextPeriodDeduction = totalDeductions > totalTax ? totalDeductions - totalTax : 0;

  // Adım içeriğini render etme
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Genel Bilgiler</h3>
              
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
                  Beyanname Tipi
                </label>
                <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <option>KDV 1 (Katma Değer Vergisi Beyannamesi)</option>
                  <option>KDV 2 (Ek Beyanname)</option>
                  <option>KDV 3 (Düzeltme Beyannamesi)</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => setStep(2)}
              >
                Devam Et
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 dark:text-white">KDV Matrah ve Vergi Bildirimi</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kod</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Açıklama</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Oran</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Matrah</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hesaplanan KDV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {taxBase.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.code}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.description}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">%{item.rate}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            value={item.base.toLocaleString('tr-TR')}
                            onChange={(e) => {
                              const newTaxBase = [...taxBase];
                              const value = Number(e.target.value.replace(/\D/g, ''));
                              newTaxBase[i].base = value;
                              newTaxBase[i].tax = (value * item.rate) / 100;
                              setTaxBase(newTaxBase);
                            }}
                          />
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                          {item.tax.toLocaleString('tr-TR')} ₺
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td colSpan={3} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                        {totalBase.toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                        {totalTax.toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md"
                onClick={() => setStep(1)}
              >
                Geri
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => setStep(3)}
              >
                Devam Et
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 dark:text-white">İndirimler</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kod</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Açıklama</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {deductions.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.code}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.description}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            value={item.amount.toLocaleString('tr-TR')}
                            onChange={(e) => {
                              const newDeductions = [...deductions];
                              newDeductions[i].amount = Number(e.target.value.replace(/\D/g, ''));
                              setDeductions(newDeductions);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td colSpan={2} className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam İndirilebilir KDV</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                        {totalDeductions.toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md"
                onClick={() => setStep(2)}
              >
                Geri
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => setStep(4)}
              >
                Devam Et
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Sonuç ve Özet</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Hesaplanan KDV Özeti</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Matrah:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{totalBase.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Hesaplanan KDV:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{totalTax.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Toplam İndirimler:</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{totalDeductions.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ödenmesi Gereken KDV:</span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">{netTaxDue.toLocaleString('tr-TR')} ₺</span>
                        </div>
                      </div>
                      
                      {nextPeriodDeduction > 0 && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sonraki Döneme Devreden KDV:</span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{nextPeriodDeduction.toLocaleString('tr-TR')} ₺</span>
                        </div>
                      )}
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
                
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Önemli Bilgiler</h4>
                  </div>
                  
                  <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>Bu beyanname sistem üzerinden GİB'e iletilecektir.</li>
                    <li>Beyanname göndermeden önce tüm bilgileri kontrol ediniz.</li>
                    <li>Ödemenizi son ödeme tarihine kadar yapmanız gerekmektedir.</li>
                    <li>Bu işlem gerçek bir beyanname gönderimi değildir, sadece simülasyondur.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md"
                onClick={() => setStep(3)}
              >
                Geri
              </button>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md">
                  Kaydet ve Çık
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                  Beyanname Gönder
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">KDV Beyannamesi</h1>
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
      
      {/* Adımlar */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === stepNumber
                    ? 'bg-blue-600 text-white'
                    : step > stepNumber
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {step > stepNumber ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber !== 4 && (
                <div
                  className={`h-1 w-10 md:w-24 lg:w-40 ${
                    step > stepNumber ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="w-8 text-center">Genel</div>
          <div className="w-8 text-center">Matrah</div>
          <div className="w-8 text-center">İndirimler</div>
          <div className="w-8 text-center">Sonuç</div>
        </div>
      </div>
      
      {/* Adım içeriği */}
      {renderStepContent()}
      
      {/* Önceki dönemler */}
      {step === 1 && (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4 dark:text-white">Önceki Dönem Beyannameleri</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönem</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Matrah</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hesaplanan KDV</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ödenen KDV</th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {taxData?.previousPeriods.map((period, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.period}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.base.toLocaleString('tr-TR')} ₺</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.tax.toLocaleString('tr-TR')} ₺</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{period.payment.toLocaleString('tr-TR')} ₺</td>
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
    </div>
  );
} 