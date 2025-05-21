"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FaArrowLeft, FaFileInvoice, FaDownload, FaFilePdf, FaReceipt } from 'react-icons/fa';

export default function VATReportPage() {
  const [period, setPeriod] = useState<string>('current-month');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Dönem seçenekleri
  const periodOptions = [
    { value: 'current-month', label: 'Bu Ay' },
    { value: 'previous-month', label: 'Geçen Ay' },
    { value: 'current-quarter', label: 'Bu Çeyrek' },
    { value: 'previous-quarter', label: 'Geçen Çeyrek' },
    { value: 'current-year', label: 'Bu Yıl' },
    { value: 'custom', label: 'Özel Tarih Aralığı' }
  ];
  
  // Özel tarih aralığı için state
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showCustomDates, setShowCustomDates] = useState(false);
  
  // Dönem değiştiğinde
  useEffect(() => {
    if (period === 'custom') {
      setShowCustomDates(true);
    } else {
      setShowCustomDates(false);
      if (period) {
        generateReport();
      }
    }
  }, [period]);
  
  // Rapor oluştur
  const generateReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API çağrısı için parametreler
      let params = new URLSearchParams();
      
      if (period === 'custom') {
        if (!startDate || !endDate) {
          setError('Lütfen başlangıç ve bitiş tarihlerini belirtin.');
          setLoading(false);
          return;
        }
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      } else {
        params.append('period', period);
      }
      
      // API'den KDV verilerini al
      const response = await fetch(`/api/reports/vat?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setReportData(data);
      setLoading(false);
    } catch (err) {
      console.error('KDV raporu alınırken hata oluştu:', err);
      setError('Rapor yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setLoading(false);
    }
  };
  
  // Özel tarih aralığı için rapor oluştur
  const generateCustomReport = () => {
    if (!startDate || !endDate) {
      setError('Lütfen başlangıç ve bitiş tarihlerini belirtin.');
      return;
    }
    
    generateReport();
  };
  
  // Test verileri (API henüz yoksa)
  // Örnek veriler kaldırıldı - gerçek API verileri kullanılıyor
  
  // Rapor verisi yoksa ve yükleme durumu değilse test verilerini kullan
  const displayData = reportData;
  
  return (
    <div className="py-6 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Başlık ve geri dön butonu */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard/taxes" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">KDV Raporu</h1>
        </div>
        
        {/* Rapor Filtreleri */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dönem
              </label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              >
                {periodOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {showCustomDates && (
              <>
                <div className="w-full md:w-1/4">
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Başlangıç Tarihi
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div className="w-full md:w-1/4">
                  <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bitiş Tarihi
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div>
                  <button
                    onClick={generateCustomReport}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    Rapor Oluştur
                  </button>
                </div>
              </>
            )}
            
            {!showCustomDates && (
              <div>
                <button
                  onClick={() => generateReport()}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Yenile
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Yükleme durumu */}
        {loading && (
          <div className="py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">KDV raporu yükleniyor...</p>
          </div>
        )}
        
        {/* Hata durumu */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 p-4 rounded-md mb-6">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        
        {/* Rapor İçeriği */}
        {displayData && !loading && (
          <>
            {/* KDV Özeti */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text">KDV Özeti - {displayData.period}</h2>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FaDownload className="mr-2 text-gray-500 dark:text-gray-400" size={16} />
                    Excel
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <FaFilePdf className="mr-2 text-gray-500 dark:text-gray-400" size={16} />
                    PDF
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Hesaplanan KDV</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{formatCurrency(displayData.vatCollected)}</p>
                  <p className="text-xs text-green-500 dark:text-green-500 mt-1">
                    {displayData.details?.outgoingInvoices?.length || 0} adet faturadan
                  </p>
                </div>
                
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">İndirilecek KDV</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">{formatCurrency(displayData.vatPaid)}</p>
                  <p className="text-xs text-red-500 dark:text-red-500 mt-1">
                    {(displayData.details?.incomingInvoices?.length || 0) + (displayData.details?.expenses?.length || 0)} adet belgeden
                  </p>
                </div>
                
                <div className={`p-4 ${displayData.vatBalance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/30'} rounded-lg border`}>
                  <p className={`text-sm ${displayData.vatBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'} font-medium`}>
                    {displayData.vatBalance >= 0 ? 'Ödenecek KDV' : 'Devreden KDV'}
                  </p>
                  <p className={`text-2xl font-bold ${displayData.vatBalance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-purple-700 dark:text-purple-300'} mt-1`}>
                    {formatCurrency(Math.abs(displayData.vatBalance))}
                  </p>
                  <p className={`text-xs ${displayData.vatBalance >= 0 ? 'text-blue-500 dark:text-blue-500' : 'text-purple-500 dark:text-purple-500'} mt-1`}>
                    {displayData.vatBalance >= 0 ? 'Son ödeme tarihi: 26.02.2023' : 'Sonraki döneme devredilecek'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <Link
                  href="/dashboard/reports/vergi-beyanname/kdv"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  <FaFileInvoice className="mr-2" />
                  KDV Beyannamesi Hazırla
                </Link>
              </div>
            </div>
            
            {/* Hesaplanan KDV (Giden Faturalar) */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4 flex items-center">
                <FaFileInvoice className="mr-2 text-green-500" /> Hesaplanan KDV - Giden Faturalar
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fatura No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Müşteri
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Matrah
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KDV Oranı
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KDV Tutarı
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                    {displayData.details?.outgoingInvoices?.map((invoice: any) => (
                      <tr key={invoice.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{invoice.number}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDate(new Date(invoice.date))}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{invoice.customer}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{formatCurrency(invoice.amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">%{invoice.vatRate}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-green-600 dark:text-green-400">{formatCurrency(invoice.vatAmount)}</td>
                      </tr>
                    ))}
                    
                    {/* Toplam Satırı */}
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Toplam</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(displayData.details?.outgoingInvoices?.reduce((sum: number, inv: any) => sum + inv.amount, 0) || 0)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-gray-100"></td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(displayData.vatCollected)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* İndirilecek KDV (Gelen Faturalar) */}
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4 flex items-center">
                <FaFileInvoice className="mr-2 text-red-500" /> İndirilecek KDV - Gelen Faturalar
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Fatura No
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tarih
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tedarikçi
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Matrah
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KDV Oranı
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        KDV Tutarı
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                    {displayData.details?.incomingInvoices?.map((invoice: any) => (
                      <tr key={invoice.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{invoice.number}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDate(new Date(invoice.date))}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{invoice.supplier}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{formatCurrency(invoice.amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">%{invoice.vatRate}</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">{formatCurrency(invoice.vatAmount)}</td>
                      </tr>
                    ))}
                    
                    {/* Diğer Giderler */}
                    {displayData.details?.expenses?.map((expense: any) => (
                      <tr key={expense.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">-</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDate(new Date(expense.date))}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{expense.title}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">{formatCurrency(expense.amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">%18</td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">{formatCurrency(expense.vatAmount)}</td>
                      </tr>
                    ))}
                    
                    {/* Toplam Satırı */}
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Toplam</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(
                          (displayData.details?.incomingInvoices?.reduce((sum: number, inv: any) => sum + inv.amount, 0) || 0) +
                          (displayData.details?.expenses?.reduce((sum: number, exp: any) => sum + exp.amount, 0) || 0)
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-gray-100"></td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(displayData.vatPaid)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 