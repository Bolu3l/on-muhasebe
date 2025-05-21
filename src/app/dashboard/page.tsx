"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDashboardData } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DashboardData, TaxDuty } from "@/lib/types";
import { FaFileInvoice, FaMoneyBillWave, FaUserTie, FaCalendarAlt, FaChartPie, FaReceipt, FaBalanceScale, FaExclamationTriangle, FaCalculator } from 'react-icons/fa';

const StatCard = ({ title, value, subtext, icon, className = "" }: { title: string; value: string; subtext: string; icon: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium dark:text-dark-text">{title}</h2>
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
        {icon}
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold dark:text-dark-text">{value}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtext}</span>
    </div>
  </div>
);

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
    <div className={`p-3 border rounded-md mb-2 ${statusColors[duty.status]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {taxTypeIcons[duty.type] || taxTypeIcons.other}
          <span className="font-medium">{duty.name}</span>
        </div>
        <span className="text-sm">
          {formatDate(duty.dueDate)}
        </span>
      </div>
      {duty.amount && (
        <div className="mt-1 text-sm">
          Tahmini Tutar: {formatCurrency(duty.amount)}
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [invoicesData, setInvoicesData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [recurringData, setRecurringData] = useState<any[]>([]);
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [receiptData, setReceiptData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Veritabanından verileri yükle
  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        
        // API'den Fatura verilerini al
        try {
          console.log(`Dashboard verilerini ${selectedPeriod} periyodu için yüklüyorum...`);
          const response = await fetch(`/api/dashboard?period=${selectedPeriod}`);
          if (response.ok) {
            const data = await response.json();
            setDashboardData(data);
            console.log(`${selectedPeriod} periyodu için dashboard verileri başarıyla yüklendi.`);
          } else {
            console.error(`${selectedPeriod} periyodu için dashboard verileri yüklenemedi.`);
            setError("Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
          }
        } catch (err) {
          console.error("Dashboard verisi yüklenirken hata oluştu:", err);
          setError("Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
        }
        
        // Tüm faturaları al (gelir hesaplaması için outgoing faturaları kullanacağız)
        try {
          const invoiceResponse = await fetch('/api/invoices');
          if (invoiceResponse.ok) {
            const invoiceData = await invoiceResponse.json();
            setInvoicesData(invoiceData || []);
          }
        } catch (invErr) {
          console.error("Fatura verisi yüklenirken hata oluştu:", invErr);
        }
        
        // Giderler verilerini al 
        try {
          const expenseResponse = await fetch('/api/expenses');
          if (expenseResponse.ok) {
            const expenseData = await expenseResponse.json();
            setExpensesData(expenseData || []);
          }
        } catch (expErr) {
          console.error("Giderler verisi yüklenirken hata oluştu:", expErr);
        }
        
        // Düzenli İşlemler verilerini al
        try {
          const recurringResponse = await fetch('/api/recurring');
          if (recurringResponse.ok) {
            const recurringData = await recurringResponse.json();
            setRecurringData(recurringData || []);
          }
        } catch (recErr) {
          console.error("Düzenli işlemler verisi yüklenirken hata oluştu:", recErr);
        }
        
        // Personel verilerini al
        try {
          const employeeResponse = await fetch('/api/employees');
          if (employeeResponse.ok) {
            const employeeData = await employeeResponse.json();
            setEmployeeData(employeeData || []);
          }
        } catch (empErr) {
          console.error("Personel verisi yüklenirken hata oluştu:", empErr);
        }
        
        // Fiş giderleri verilerini al
        try {
          const receiptResponse = await fetch('/api/receipts');
          if (receiptResponse.ok) {
            const receiptData = await receiptResponse.json();
            setReceiptData(receiptData || []);
          }
        } catch (rcptErr) {
          console.error("Fiş giderleri verisi yüklenirken hata oluştu:", rcptErr);
        }
        
        setLoading(false);
        setError(null);
      } catch (err: any) {
        console.error("Dashboard verisi yüklenirken hata oluştu:", err);
        setError("Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
        setLoading(false);
      }
    }
    
    loadDashboardData();
  }, [selectedPeriod]); // selectedPeriod değiştiğinde verileri yeniden yükle

  // Yükleme durumu
  if (loading) {
    return (
      <div className="py-6 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Hata durumu
  if (error) {
    return (
      <div className="py-6 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Hata: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  // Veri yoksa (ilk yükleme sonrası)
  if (!dashboardData) {
    return (
      <div className="py-6 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Henüz veri bulunmamaktadır.</span>
          </div>
        </div>
      </div>
    );
  }

  // Veri var, normal görünümü göster
  const { pendingInvoices, recentTransactions, totalIncome, totalExpense, netProfit, details, taxSummary } = dashboardData;
  
  // Düzenli işlemler analizi (bu değerler filtrelenmemiş olabilir, sadece ek bilgi olarak gösteriliyor)
  const activeRecurring = recurringData.filter(item => item.isActive).length;
  
  // Personel analizi (bu değerler filtrelenmemiş olabilir, sadece ek bilgi olarak gösteriliyor)
  const totalEmployees = employeeData.length;
  const totalSalaries = employeeData.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
  
  // API'den gelen filtrelenmiş değerleri kullan
  const totalRevenue = totalIncome; // API'den gelen filtrelenmiş gelir değeri
  const totalAllExpenses = totalExpense; // API'den gelen filtrelenmiş gider değeri
  
  // API'den gelen filtrelenmiş kar/zarar değerini kullan
  const totalProfitCalculated = netProfit;

  // Dönem seçici için etiketler
  const periodLabels = {
    'week': 'Bu Hafta',
    'month': 'Bu Ay',
    'year': 'Bu Yıl'
  };

  return (
    <div className="py-6 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Başlık ve filtre */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Finansal Dashboard</h1>
          
          {/* Dönem Seçici Butonlar */}
          <div className="flex items-center space-x-2 bg-white dark:bg-dark-card p-1 rounded-lg border border-gray-200 dark:border-dark-border shadow-sm">
            {Object.entries(periodLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  console.log(`Dönem değiştiriliyor: ${value}`);
                  setSelectedPeriod(value as 'week' | 'month' | 'year');
                  setLoading(true); // Dönem değiştiğinde yükleme durumunu aktifleştir
                }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedPeriod === value 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Ana Finansal Durum Kartı */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text">
                Genel Finansal Durum
              </h2>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <FaChartPie size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Toplam Gelir</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-1">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-green-500 dark:text-green-500 mt-1">
                {details && `Fatura: ${formatCurrency(details.invoiceIncome)} + Düzenli: ${formatCurrency(details.recurringIncome)}`}
              </p>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Toplam Gider</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-1">{formatCurrency(totalAllExpenses)}</p>
              <p className="text-xs text-red-500 dark:text-red-500 mt-1">
                {details && `Fatura: ${formatCurrency(details.invoiceExpense)} + Diğer: ${formatCurrency(details.expenseAmount + details.receiptAmount + details.recurringExpense)}`}
              </p>
            </div>

            <div className={`p-4 ${totalProfitCalculated >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30'} rounded-lg border`}>
              <p className={`text-sm ${totalProfitCalculated >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'} font-medium`}>
                Net Kar/Zarar
              </p>
              <p className={`text-2xl font-bold ${totalProfitCalculated >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-amber-700 dark:text-amber-300'} mt-1`}>
                {formatCurrency(totalProfitCalculated)}
              </p>
              <p className={`text-xs ${totalProfitCalculated >= 0 ? 'text-blue-500 dark:text-blue-500' : 'text-amber-500 dark:text-amber-500'} mt-1`}>
                {totalProfitCalculated >= 0 ? 'Kârlılık Oranı: ' + Math.round((totalProfitCalculated / totalRevenue) * 100 || 0) + '%' : 'Zarardasınız!'}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gider Dağılımı</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Fatura Giderleri</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {details ? formatCurrency(details.invoiceExpense) : formatCurrency(totalExpense)}
                </p>
                <p className="text-xs text-gray-500 mt-1">(Filtrelenmiş dönem)</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Doğrudan Giderler</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {details ? formatCurrency(details.expenseAmount) : formatCurrency(0)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Fiş Giderleri</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {details ? formatCurrency(details.receiptAmount) : formatCurrency(0)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Personel Maaşları</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatCurrency(totalSalaries)}</p>
                <p className="text-xs text-gray-500 mt-1">({totalEmployees} personel)</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <p className="text-xs text-gray-500 dark:text-gray-400">Düzenli Giderler</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {details ? formatCurrency(details.recurringExpense) : formatCurrency(0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vergi Yönetimi Kartı */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link href="/dashboard/taxes" className="group">
                <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center">
                  Vergi Yönetimi
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </h2>
              </Link>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <FaBalanceScale size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* KDV Özeti */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">KDV Özeti</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">
                {taxSummary ? formatCurrency(taxSummary.vatBalance) : "Hesaplanıyor..."}
              </p>
              <p className="text-xs text-blue-500 dark:text-blue-500 mt-1">
                {taxSummary && `Tahsil Edilen: ${formatCurrency(taxSummary.vatCollected)} - Ödenen: ${formatCurrency(taxSummary.vatPaid)}`}
              </p>
              <p className="text-xs mt-2">
                <span className="font-medium">Son Beyanname Tarihi:</span> {taxSummary?.vatDueDate ? formatDate(taxSummary.vatDueDate) : "Belirtilmemiş"}
              </p>
            </div>
            
            {/* Gelir Vergisi Tahmini */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Gelir Vergisi Tahmini</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">
                {taxSummary ? formatCurrency(taxSummary.incomeTaxEstimate) : "Hesaplanıyor..."}
              </p>
              <p className="text-xs text-amber-500 dark:text-amber-500 mt-1">
                {taxSummary && `Tahmini Vergi Oranı: ${Math.round((taxSummary.incomeTaxEstimate / netProfit) * 100 || 0)}%`}
              </p>
              <p className="text-xs mt-2">
                <span className="font-medium">Beyanname Tarihi:</span> {new Date().getFullYear() + 1}.03.31
              </p>
            </div>

            {/* Vergi Takvimi Özeti */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Vergi Takvimi</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">
                {taxSummary?.upcomingTaxes ? `${taxSummary.upcomingTaxes.length} Yaklaşan Görev` : "Yükleniyor..."}
              </p>
              <p className="text-xs text-purple-500 dark:text-purple-500 mt-1">
                {taxSummary?.upcomingTaxes && taxSummary.upcomingTaxes.length > 0 && 
                  `En yakın: ${taxSummary.upcomingTaxes[0].name} (${formatDate(taxSummary.upcomingTaxes[0].dueDate)})`
                }
              </p>
              <Link href="/dashboard/taxes" className="text-xs font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mt-2 inline-block">
                Tüm Vergi Takvimini Görüntüle →
              </Link>
            </div>
          </div>
          
          {/* Yaklaşan Vergi Görevleri */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yaklaşan Vergi Görevleri</h3>
            {taxSummary?.upcomingTaxes && taxSummary.upcomingTaxes.length > 0 ? (
              <div className="space-y-2">
                {taxSummary.upcomingTaxes.map(duty => (
                  <TaxDutyItem key={duty.id} duty={duty} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Yaklaşan vergi görevi bulunmamaktadır.</p>
            )}
          </div>
          
          {/* Vergi Hesaplama ve Beyanname Butonları */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link 
              href="/dashboard/taxes/calculator" 
              className="inline-flex items-center px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-md shadow-sm text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-dark-card hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none"
            >
              <FaCalculator className="mr-2" />
              Vergi Hesaplama
            </Link>
            <Link 
              href="/dashboard/reports/vergi-beyanname/kdv" 
              className="inline-flex items-center px-4 py-2 border border-green-300 dark:border-green-700 rounded-md shadow-sm text-sm font-medium text-green-700 dark:text-green-400 bg-white dark:bg-dark-card hover:bg-green-50 dark:hover:bg-green-900/20 focus:outline-none"
            >
              <FaFileInvoice className="mr-2" />
              KDV Beyannamesi Hazırla
            </Link>
            <Link 
              href="/dashboard/reports/vergi-beyanname/gelir-vergisi" 
              className="inline-flex items-center px-4 py-2 border border-amber-300 dark:border-amber-700 rounded-md shadow-sm text-sm font-medium text-amber-700 dark:text-amber-400 bg-white dark:bg-dark-card hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none"
            >
              <FaMoneyBillWave className="mr-2" />
              Gelir Vergisi Beyannamesi Hazırla
            </Link>
          </div>
        </div>

        {/* İstatistik kartları - 2 sütunlu grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard 
            title="Faturalar" 
            value={formatCurrency(details ? details.invoiceIncome - details.invoiceExpense : totalIncome)}
            subtext={`Filtrelenmiş dönem: ${formatCurrency(details ? details.invoiceIncome : totalIncome)} gelir, ${formatCurrency(details ? details.invoiceExpense : totalExpense)} gider`}
            icon={<FaFileInvoice size={20} />}
          />
          <StatCard 
            title="Bekleyen Faturalar" 
            value={`${pendingInvoices.count} adet`}
            subtext={`Toplam tutar: ${formatCurrency(pendingInvoices.total)}`}
            icon={<FaFileInvoice size={20} />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard 
            title="Giderler ve Düzenli İşlemler" 
            value={formatCurrency(details ? details.expenseAmount + details.receiptAmount + details.recurringExpense : 0)}
            subtext={`Giderler: ${formatCurrency(details ? details.expenseAmount : 0)}, Fiş: ${formatCurrency(details ? details.receiptAmount : 0)}, Düzenli: ${formatCurrency(details ? details.recurringExpense : 0)}`}
            icon={<FaMoneyBillWave size={20} />}
          />
          <StatCard 
            title="Personel" 
            value={`${totalEmployees} çalışan`}
            subtext={`Toplam maaş: ${formatCurrency(totalSalaries)}`}
            icon={<FaUserTie size={20} />}
          />
        </div>

        {/* Son İşlemler */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text">Son İşlemler</h2>
            <Link href="/dashboard/invoices" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Tüm İşlemleri Görüntüle →
            </Link>
          </div>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Tarih</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Açıklama</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Tutar</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-200 dark:border-dark-border">
                    <td className="py-3 text-sm text-gray-900 dark:text-dark-text">{formatDate(tx.date)}</td>
                    <td className="py-3 text-sm text-gray-900 dark:text-dark-text">{tx.description}</td>
                    <td
                      className={`py-3 text-sm text-right font-medium ${
                        tx.type === 'expense'
                          ? "text-red-600 dark:text-red-400" 
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                    Henüz işlem bulunmamaktadır.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modül Linkleri */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/invoices" className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaFileInvoice className="text-blue-500" />
            <span className="text-sm font-medium">Faturalar</span>
          </Link>
          <Link href="/dashboard/expenses" className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaMoneyBillWave className="text-red-500" />
            <span className="text-sm font-medium">Giderler</span>
          </Link>
          <Link href="/dashboard/recurring" className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaCalendarAlt className="text-green-500" />
            <span className="text-sm font-medium">Düzenli İşlemler</span>
          </Link>
          <Link href="/dashboard/employees" className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaUserTie className="text-purple-500" />
            <span className="text-sm font-medium">Personel</span>
          </Link>
          <Link href="/dashboard/taxes" className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <FaBalanceScale className="text-amber-500" />
            <span className="text-sm font-medium">Vergi Yönetimi</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 