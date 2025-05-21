"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TaxDuty } from "@/lib/types";
import { FaFileInvoice, FaMoneyBillWave, FaUserTie, FaReceipt, FaBalanceScale, FaExclamationTriangle, FaCalculator, FaCalendarAlt, FaArrowLeft, FaDownload, FaFilePdf } from 'react-icons/fa';

// Vergi görevleri için bileşen
const TaxDutyItem = ({ duty }: { duty: TaxDuty }) => {
  // Durum renklerini belirle
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30',
    due: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/30',
    overdue: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/30',
    paid: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/30',
  };
  
  // Vergi türü için simge belirle
  const taxTypeIcons = {
    kdv: <FaReceipt className="mr-2" />,
    gelir: <FaMoneyBillWave className="mr-2" />,
    kurumlar: <FaBalanceScale className="mr-2" />,
    damga: <FaFileInvoice className="mr-2" />,
    muhtasar: <FaUserTie className="mr-2" />,
    other: <FaExclamationTriangle className="mr-2" />
  };
  
  return (
    <div className={`p-4 border rounded-md mb-3 ${statusColors[duty.status]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {taxTypeIcons[duty.type] || taxTypeIcons.other}
          <span className="font-medium">{duty.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-4">
            {formatDate(duty.dueDate)}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            duty.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
            duty.status === 'due' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
            duty.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {duty.status === 'upcoming' ? 'Yaklaşan' :
             duty.status === 'due' ? 'Çok Yakında' :
             duty.status === 'overdue' ? 'Gecikmiş' : 'Ödenmiş'}
          </span>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">Dönem:</span> {duty.period}
          {duty.amount && (
            <span className="ml-4">
              <span className="font-medium">Tahmini Tutar:</span> {formatCurrency(duty.amount)}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Link 
            href={`/dashboard/reports/${duty.type === 'kdv' ? 'vat' : duty.type === 'gelir' ? 'income' : duty.type === 'muhtasar' ? 'withholding' : 'tax'}`}
            className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
          >
            <FaFilePdf className="mr-1" /> Rapor
          </Link>
          {duty.status !== 'paid' && (
            <Link
              href={`/dashboard/reports/vergi-beyanname/${duty.type === 'kdv' ? 'kdv' : duty.type === 'gelir' ? 'gelir-vergisi' : duty.type === 'muhtasar' ? 'muhtasar' : 'tax'}?period=${duty.period}`}
              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Beyanname
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TaxManagementPage() {
  const [taxCalendar, setTaxCalendar] = useState<TaxDuty[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Vergi takvimini getir
  useEffect(() => {
    const fetchTaxCalendar = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dashboard?tax=only&year=${selectedYear}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setTaxCalendar(data.taxCalendar || []);
        setLoading(false);
      } catch (err) {
        console.error('Vergi takvimi alınırken hata oluştu:', err);
        setError('Vergi takvimi yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setTaxCalendar([]);
        setLoading(false);
      }
    };
    
    fetchTaxCalendar();
  }, [selectedYear]);
  
  // Vergi türlerine göre filtrele
  const kdvDuties = taxCalendar.filter(duty => duty.type === 'kdv');
  const incomeTaxDuties = taxCalendar.filter(duty => duty.type === 'gelir');
  const muhtasarDuties = taxCalendar.filter(duty => duty.type === 'muhtasar');
  const otherDuties = taxCalendar.filter(duty => !['kdv', 'gelir', 'muhtasar'].includes(duty.type));
  
  // Durumlara göre filtrele
  const upcomingDuties = taxCalendar.filter(duty => duty.status === 'upcoming' || duty.status === 'due');
  const overdueDuties = taxCalendar.filter(duty => duty.status === 'overdue');
  const paidDuties = taxCalendar.filter(duty => duty.status === 'paid');
  
  return (
    <div className="py-6 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Başlık ve geri dön butonu */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
              <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Vergi Yönetimi</h1>
          </div>
          
          {/* Yıl Seçici */}
          <div className="flex items-center space-x-2">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Vergi Yılı:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md py-2 px-4 text-sm"
            >
              {[...Array(5)].map((_, i) => {
                const year = new Date().getFullYear() - 2 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        
        {/* Vergi İşlem Butonları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            href="/dashboard/taxes/calculator" 
            className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaCalculator className="text-blue-500" size={20} />
            <span className="font-medium">Vergi Hesaplama</span>
          </Link>
          <Link 
            href="/dashboard/reports/vergi-beyanname/kdv" 
            className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaReceipt className="text-green-500" size={20} />
            <span className="font-medium">KDV Beyannamesi Hazırla</span>
          </Link>
          <Link 
            href="/dashboard/reports/vergi-beyanname/gelir-vergisi" 
            className="flex items-center justify-center gap-3 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FaMoneyBillWave className="text-amber-500" size={20} />
            <span className="font-medium">Gelir Vergisi Beyannamesi Hazırla</span>
          </Link>
        </div>
        
        {/* Vergi Özeti Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium dark:text-dark-text">Yaklaşan Vergiler</h2>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <FaCalendarAlt size={18} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold dark:text-dark-text">{upcomingDuties.length} görev</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {upcomingDuties.length > 0 
                  ? `En yakın: ${formatDate(upcomingDuties[0].dueDate)}`
                  : 'Yaklaşan vergi görevi bulunmuyor'}
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium dark:text-dark-text">Gecikmiş Vergiler</h2>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                <FaExclamationTriangle size={18} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold dark:text-dark-text">{overdueDuties.length} görev</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {overdueDuties.length > 0 
                  ? `En acil: ${formatDate(overdueDuties[0].dueDate)}`
                  : 'Gecikmiş vergi görevi bulunmuyor'}
              </span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium dark:text-dark-text">Tamamlanan Vergiler</h2>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <FaBalanceScale size={18} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold dark:text-dark-text">{paidDuties.length} görev</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {paidDuties.length > 0 
                  ? `Son ödenen: ${formatDate(paidDuties[0].dueDate)}`
                  : 'Tamamlanmış vergi görevi bulunmuyor'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Vergi Takvimi */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text">{selectedYear} Vergi Takvimi</h2>
            <button className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-sm">
              <FaDownload className="mr-2" /> Takvimi İndir
            </button>
          </div>
          
          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Vergi takvimi yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center text-red-600 dark:text-red-400">
              <FaExclamationTriangle className="mx-auto mb-2" size={24} />
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* KDV Beyannameleri */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <FaReceipt className="mr-2 text-blue-500" /> KDV Beyannameleri
                </h3>
                <div className="space-y-3">
                  {kdvDuties.length > 0 ? (
                    kdvDuties.map(duty => (
                      <TaxDutyItem key={duty.id} duty={duty} />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">KDV beyanname görevi bulunamadı.</p>
                  )}
                </div>
              </div>
              
              {/* Gelir Vergisi Beyannameleri */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-amber-500" /> Gelir Vergisi Beyannameleri
                </h3>
                <div className="space-y-3">
                  {incomeTaxDuties.length > 0 ? (
                    incomeTaxDuties.map(duty => (
                      <TaxDutyItem key={duty.id} duty={duty} />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">Gelir vergisi beyanname görevi bulunamadı.</p>
                  )}
                </div>
              </div>
              
              {/* Muhtasar Beyannameler */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <FaUserTie className="mr-2 text-purple-500" /> Muhtasar Beyannameler
                </h3>
                <div className="space-y-3">
                  {muhtasarDuties.length > 0 ? (
                    muhtasarDuties.map(duty => (
                      <TaxDutyItem key={duty.id} duty={duty} />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">Muhtasar beyanname görevi bulunamadı.</p>
                  )}
                </div>
              </div>
              
              {/* Diğer Vergi Görevleri */}
              {otherDuties.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                    <FaBalanceScale className="mr-2 text-gray-500" /> Diğer Vergi Görevleri
                  </h3>
                  <div className="space-y-3">
                    {otherDuties.map(duty => (
                      <TaxDutyItem key={duty.id} duty={duty} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Vergi Rehberi */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text mb-4">Vergi Rehberi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">KDV Beyannamesi</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                KDV beyannamesi, her ayın 26'sına kadar bir önceki ayın KDV bilgilerini içerecek şekilde verilmelidir.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>Fatura ve fiş bilgilerinizi düzenli tutun</li>
                <li>Tahsil edilen ve ödenen KDV tutarlarını ayrı kaydedin</li>
                <li>Beyanname son gününü kaçırmayın</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Gelir Vergisi Beyannamesi</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                Gelir vergisi beyannamesi, bir önceki yılın gelirlerini içerecek şekilde 1-25 Mart tarihleri arasında verilmelidir.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>Tüm gelir kaynaklarınızı beyan edin</li>
                <li>İndirim ve istisnalardan faydalanın</li>
                <li>Gerekli belgeleri önceden hazırlayın</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 