"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getInvoices } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function InvoicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
  const [receiptExpenses, setReceiptExpenses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("outgoing");
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'receipts'>('outgoing');
  
  // Fiş ekleme için modal state'i
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Fiş formu için state
  const [receiptForm, setReceiptForm] = useState({
    title: "",
    description: "",
    amount: "",
    expenseDate: new Date().toISOString().split('T')[0], // Bugünün tarihi
    category: "",
    receiptNumber: "",
    taxRate: "18", // Varsayılan KDV oranı
    paymentMethod: "cash",
    isVerified: false
  });
  
  // Kategori seçenekleri
  const categories = [
    "Akaryakıt",
    "Gıda",
    "Ofis Malzemeleri",
    "Ulaşım",
    "Konaklama",
    "Diğer"
  ];
  
  // Ödeme şekli seçenekleri
  const paymentMethods = [
    { value: "cash", label: "Nakit" },
    { value: "card", label: "Kredi/Banka Kartı" },
    { value: "transfer", label: "Havale/EFT" }
  ];

  useEffect(() => {
    async function loadInvoices() {
      try {
        setIsLoading(true);
        
        // Önce doğrudan API endpoint'ini dene
        try {
          const response = await fetch('/api/invoices');
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              console.log("Fatura verileri:", data);
              setInvoices(data);
              setFilteredInvoices(data);
              setIsLoading(false);
              return;
            }
          }
        } catch (directApiError) {
          // Sessizce devam et ve alternatif yöntemleri dene
        }
        
        // Alternatif olarak getInvoices'i kullan
        const data = await getInvoices();
        
        if (!data || data.length === 0) {
          setInvoices([]);
          setFilteredInvoices([]);
          return;
        }
        
        console.log("Alternatif yoldan gelen fatura verileri:", data);
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (err: any) {
        console.error("Faturalar yüklenirken hata oluştu:", err);
        setError(`Fatura verileri yüklenemedi: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadInvoices();
  }, []);

  // Fiş Giderlerini Yükleme
  useEffect(() => {
    async function loadReceiptExpenses() {
      if (activeTab === 'receipts') {
        try {
          setIsLoading(true);
          const response = await fetch('/api/receipts');
          if (response.ok) {
            const data = await response.json();
            console.log("Fiş giderleri verileri:", data);
            setReceiptExpenses(data);
          } else {
            throw new Error('Fiş giderleri alınamadı');
          }
        } catch (err: any) {
          console.error("Fiş giderleri yüklenirken hata oluştu:", err);
          setError(`Fiş giderleri yüklenemedi: ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    loadReceiptExpenses();
  }, [activeTab]);

  // Sayfa ilk yüklendiğinde fiş giderlerini getir
  useEffect(() => {
    async function loadInitialReceiptExpenses() {
      try {
        const response = await fetch('/api/receipts');
        if (response.ok) {
          const data = await response.json();
          console.log("Sayfa yüklenirken fiş giderleri verileri:", data);
          setReceiptExpenses(data);
        }
      } catch (err: any) {
        console.error("Fiş giderleri ilk yüklemede hata oluştu:", err);
      }
    }
    
    loadInitialReceiptExpenses();
  }, []);

  // Filtreleme işlevi
  useEffect(() => {
    if (activeTab === 'receipts') return; // Fiş giderleri için filtreleme yapmıyoruz
    
    if (!invoices.length) return;
    
    let results = [...invoices];
    
    // Arama terimi filtresi
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(searchLower) || 
        (invoice.customer?.name && invoice.customer.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Durum filtresi
    if (statusFilter) {
      results = results.filter(invoice => 
        invoice.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Fatura tipi filtresi (gelen/giden)
    if (typeFilter) {
      results = results.filter(invoice => 
        invoice.type?.toLowerCase() === typeFilter.toLowerCase()
      );
    }
    
    setFilteredInvoices(results);
  }, [searchTerm, statusFilter, typeFilter, invoices, activeTab]);

  // Sekme değiştiğinde filtreleme yap
  const handleTabChange = (tab: 'incoming' | 'outgoing' | 'receipts') => {
    setActiveTab(tab);
    if (tab !== 'receipts') {
    setTypeFilter(tab);
    }
  };

  // Fiş form alanı değişikliği
  const handleReceiptFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setReceiptForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setReceiptForm(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // KDV oranını değiştirdiğinde KDV tutarını ve toplam tutarı hesapla
  const calculateTax = (amount: string, taxRate: string) => {
    const amountValue = parseFloat(amount) || 0;
    const taxRateValue = parseFloat(taxRate) || 0;
    const taxAmount = (amountValue * taxRateValue) / 100;
    const totalAmount = amountValue + taxAmount;
    
    return {
      taxAmount: taxAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    };
  };
  
  // Fiş formu gönderimi
  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // KDV ve toplam tutarı hesapla
      const { taxAmount, totalAmount } = calculateTax(receiptForm.amount, receiptForm.taxRate);
      
      // API'ye gönderilecek veriyi hazırla
      const payload = {
        ...receiptForm,
        amount: parseFloat(receiptForm.amount) || 0,
        taxRate: parseFloat(receiptForm.taxRate) || 0,
        taxAmount: parseFloat(taxAmount),
        totalAmount: parseFloat(totalAmount)
      };
      
      // API'ye POST isteği gönder
      const response = await fetch('/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fiş eklenirken bir hata oluştu');
      }
      
      // Başarılı ise modalı kapat ve fiş listesini yenile
      setIsReceiptModalOpen(false);
      
      // Form verilerini sıfırla
      setReceiptForm({
        title: "",
        description: "",
        amount: "",
        expenseDate: new Date().toISOString().split('T')[0],
        category: "",
        receiptNumber: "",
        taxRate: "18",
        paymentMethod: "cash",
        isVerified: false
      });
      
      // Fiş listesini yenile
      const refreshResponse = await fetch('/api/receipts');
      if (refreshResponse.ok) {
        const refreshedData = await refreshResponse.json();
        setReceiptExpenses(refreshedData);
      }
      
    } catch (err: any) {
      console.error('Fiş ekleme hatası:', err);
      setSubmitError(err.message || 'Fiş eklenirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basit yükleme durumu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Faturalar yükleniyor...</span>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
          <h2 className="text-lg font-bold">Hata!</h2>
          <p>{error}</p>
          <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  // Boş veri durumu
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-900 mt-8 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Henüz fatura kaydı bulunmamaktadır</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {activeTab === 'incoming' ? 'Yeni bir gider eklemek için "Yeni Gider ekle" butonunu kullanabilirsiniz.' : 'Yeni bir gelir eklemek için "Yeni Gelir ekle" butonunu kullanabilirsiniz.'}
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/invoices/create?type=outgoing"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Yeni Fatura Oluştur
          </Link>
        </div>
      </div>
    );
  }

  // Durum badge renklerini belirle
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'ödendi':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'bekliyor':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
      case 'gecikmiş':
        return 'bg-red-100 text-red-800';
      case 'draft':
      case 'taslak':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
      case 'iptal':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fatura silme
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu faturayı silmek istediğinizden emin misiniz?')) {
      try {
        // API çağrısı ile silme işlemi gerçekleştir
        const response = await fetch(`/api/invoices/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Fatura silinirken bir hata oluştu');
        }
        
        console.log('Fatura başarıyla silindi:', id);
        
        // UI'dan kaldırma
        const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
        setInvoices(updatedInvoices);
        setFilteredInvoices(filteredInvoices.filter(invoice => invoice.id !== id));
      } catch (error) {
        console.error('Fatura silinirken hata:', error);
        alert(`Fatura silinirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
      }
    }
  };

  // Verileri göster
  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {activeTab === 'receipts' ? 'Fiş Giderleri' : `Faturalar (${filteredInvoices.length})`}
          </h1>
          <div className="flex space-x-2">
            {activeTab !== 'receipts' ? (
              <>
            <Link
              href="/dashboard/invoices/scan"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Fatura Tara
            </Link>
            <Link
              href="/dashboard/invoices/create?type=outgoing"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Yeni Fatura Oluştur
            </Link>
              </>
            ) : (
              <button
                onClick={() => setIsReceiptModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Yeni Fiş Ekle
              </button>
            )}
          </div>
        </div>

        {/* Fatura Sekmeleri */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('outgoing')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'outgoing'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Giden Faturalar
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'outgoing' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
              }`}>
                {invoices.filter(invoice => invoice.type === 'outgoing').length}
              </span>
            </button>
            <button
              onClick={() => handleTabChange('incoming')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'incoming'
                  ? 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Gelen Faturalar
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'incoming' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
              }`}>
                {invoices.filter(invoice => invoice.type === 'incoming').length}
              </span>
            </button>
            <button
              onClick={() => handleTabChange('receipts')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'receipts'
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Fiş Giderleri
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'receipts' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
              }`}>
                {receiptExpenses.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Filtreleme ve Arama */}
        {activeTab !== 'receipts' && (
        <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="w-full sm:w-96">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arama
            </label>
            <input
              type="text"
              id="search"
              placeholder="Fatura no veya muhatap adı ile ara..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durum
            </label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="pending">Bekliyor</option>
              <option value="paid">Ödendi</option>
              <option value="overdue">Gecikmiş</option>
              <option value="draft">Taslak</option>
              <option value="cancelled">İptal</option>
            </select>
          </div>
        </div>
        )}

        {/* Fiş Giderleri İçin Filtreleme */}
        {activeTab === 'receipts' && (
          <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-48">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kategori
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                onChange={(e) => {
                  // Kategori seçimi değişince API'ye istek atılabilir
                  console.log("Kategori seçildi:", e.target.value);
                }}
              >
                <option value="">Tüm Kategoriler</option>
                <option value="Akaryakıt">Akaryakıt</option>
                <option value="Gıda">Gıda</option>
                <option value="Ofis Malzemeleri">Ofis Malzemeleri</option>
                <option value="Ulaşım">Ulaşım</option>
                <option value="Konaklama">Konaklama</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          {/* Faturalar Tablosu */}
          {activeTab !== 'receipts' && (
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                  Fatura No
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white w-48">
                  Muhatap
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Tarih
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Mal Hizmet Tutarı
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  KDV Oranı
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  KDV Tutarı
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Toplam Tutar
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Tip
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Durum
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">İşlemler</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {filteredInvoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className={`
                    hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                    ${invoice.type === 'incoming' ? 'bg-red-50 dark:bg-red-900/10' : 'bg-green-50 dark:bg-green-900/10'}
                  `}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-48 truncate" title={invoice.type === 'incoming' 
                      ? (invoice.issuerName || invoice.customer?.name || "Bilinmeyen") 
                      : (invoice.recipientName || invoice.customer?.name || "Bilinmeyen")}>
                      {invoice.type === 'incoming' 
                        ? (invoice.issuerName || invoice.customer?.name || "Bilinmeyen") 
                        : (invoice.recipientName || invoice.customer?.name || "Bilinmeyen")}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(invoice.invoiceDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {invoice.taxRate ? `%${invoice.taxRate}` : '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(invoice.taxAmount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(invoice.totalAmount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.type === 'incoming' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {invoice.type === 'incoming' ? 'Gelen' : 'Giden'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex space-x-2 justify-end">
                      <button
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => {
                          console.log("Fatura bilgileri:", invoice);
                          
                          // Önce invoice.fileId'yi kontrol edelim (ilişkili dosya ID'si)
                          if (invoice.fileId) {
                            console.log("fileId değeri:", invoice.fileId);
                            window.open(`/api/files/invoices/${invoice.fileId}`, '_blank');
                          }
                          // invoice.InvoiceFile ilişkisini kontrol edelim (doğru veri modeli adı)
                          else if (invoice.InvoiceFile) {
                            console.log("InvoiceFile bilgisi:", invoice.InvoiceFile);
                            
                            if (invoice.InvoiceFile.id) {
                              // ID'yi kullanarak dosyayı görüntüle
                              window.open(`/api/files/invoices/${invoice.InvoiceFile.id}`, '_blank');
                            }
                            else if (invoice.InvoiceFile.filePath || invoice.InvoiceFile.path || invoice.InvoiceFile.location) {
                              // filePath, path veya location alanlarından birini kullan
                              const filePath = invoice.InvoiceFile.filePath || invoice.InvoiceFile.path || invoice.InvoiceFile.location;
                              const encodedFilePath = encodeURIComponent(filePath);
                              window.open(`/api/files/invoices/${encodedFilePath}`, '_blank');
                            }
                            else {
                              alert(`Fatura dosyası bilgisi eksik. Fatura ID: ${invoice.id}`);
                            }
                          }
                          // Alternatif olarak invoice.filePath'i kontrol edelim
                          else if (invoice.filePath) {
                            console.log("filePath değeri:", invoice.filePath);
                            const encodedFilePath = encodeURIComponent(invoice.filePath);
                            window.open(`/api/files/invoices/${encodedFilePath}`, '_blank');
                          }
                          // invoice.invoiceFile ilişkisini kontrol edelim (küçük harf versiyonu için)
                          else if (invoice.invoiceFile && invoice.invoiceFile.id) {
                            console.log("invoiceFile.id değeri:", invoice.invoiceFile.id);
                            window.open(`/api/files/invoices/${invoice.invoiceFile.id}`, '_blank');
                          }
                          // Dosya bilgisi bulunamadı
                          else {
                            alert(`Bu faturanın dosyası bulunamadı. Fatura ID: ${invoice.id}`);
                          }
                        }}
                      >
                        <FaEye className="w-5 h-5" title="Görüntüle" />
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        onClick={() => console.log('Düzenleme:', invoice.id)}
                      >
                        <FaEdit className="w-5 h-5" title="Düzenle" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDelete(invoice.id)}
                      >
                        <FaTrash className="w-5 h-5" title="Sil" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}

          {/* Fiş Giderleri Tablosu */}
          {activeTab === 'receipts' && (
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    Başlık
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Kategori
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Tarih
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Tutar
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    KDV Oranı
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    KDV Tutarı
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Toplam Tutar
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Ödeme Şekli
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">İşlemler</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                {receiptExpenses.map((receipt) => (
                  <tr 
                    key={receipt.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors bg-orange-50 dark:bg-orange-900/10"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                      {receipt.title}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {receipt.category}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(receipt.expenseDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(receipt.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {receipt.taxRate ? `%${receipt.taxRate}` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(receipt.taxAmount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(receipt.totalAmount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {receipt.paymentMethod === 'cash' ? 'Nakit' : 
                       receipt.paymentMethod === 'card' ? 'Kart' : 
                       receipt.paymentMethod === 'transfer' ? 'Havale/EFT' : 
                       receipt.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex space-x-2 justify-end">
                        <Link href={`/dashboard/receipts/${receipt.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <FaEye className="w-5 h-5" title="Görüntüle" />
                        </Link>
                        <Link href={`/dashboard/receipts/${receipt.id}/edit`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                          <FaEdit className="w-5 h-5" title="Düzenle" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => {
                            if (window.confirm('Bu fiş kaydını silmek istediğinizden emin misiniz?')) {
                              fetch(`/api/receipts?id=${receipt.id}`, {
                                method: 'DELETE',
                              })
                              .then(response => {
                                if (response.ok) {
                                  setReceiptExpenses(receiptExpenses.filter(r => r.id !== receipt.id));
                                } else {
                                  throw new Error('Fiş silinemedi');
                                }
                              })
                              .catch(error => {
                                console.error('Fiş silinirken hata oluştu:', error);
                                alert('Fiş silinirken bir hata oluştu. Lütfen tekrar deneyin.');
                              });
                            }
                          }}
                        >
                          <FaTrash className="w-5 h-5" title="Sil" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Filtrelenmiş sonuç yok */}
        {activeTab !== 'receipts' && invoices.length > 0 && filteredInvoices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun fatura bulunamadı.</p>
          </div>
        )}
        
        {/* Fiş Giderleri Boş Durumu */}
        {activeTab === 'receipts' && receiptExpenses.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Henüz hiç fiş gideri bulunmuyor.</p>
            <button 
              onClick={() => setIsReceiptModalOpen(true)}
              className="inline-flex items-center mt-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Yeni Fiş Ekle
            </button>
          </div>
        )}
        
        {/* Fiş Ekleme Modal */}
        {isReceiptModalOpen && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Yeni Fiş Girişi
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setIsReceiptModalOpen(false)}
                  >
                    <span className="sr-only">Kapat</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {submitError && (
                  <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <form onSubmit={handleReceiptSubmit}>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Fiş Başlığı */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fiş Başlığı <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={receiptForm.title}
                        onChange={handleReceiptFormChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Örn: Akaryakıt Fişi"
                      />
                    </div>
                    
                    {/* Kategori */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kategori <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={receiptForm.category}
                        onChange={handleReceiptFormChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="">Kategori Seçin</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Fiş Tarihi */}
                      <div>
                        <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Fiş Tarihi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="expenseDate"
                          name="expenseDate"
                          value={receiptForm.expenseDate}
                          onChange={handleReceiptFormChange}
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      
                      {/* Fiş Numarası */}
                      <div>
                        <label htmlFor="receiptNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Fiş Numarası
                        </label>
                        <input
                          type="text"
                          id="receiptNumber"
                          name="receiptNumber"
                          value={receiptForm.receiptNumber}
                          onChange={handleReceiptFormChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Fiş üzerindeki numara"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Tutar */}
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          KDV Hariç Tutar (₺) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          id="amount"
                          name="amount"
                          value={receiptForm.amount}
                          onChange={handleReceiptFormChange}
                          required
                          min="0"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="0.00"
                        />
                      </div>
                      
                      {/* KDV Oranı */}
                      <div>
                        <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          KDV Oranı (%)
                        </label>
                        <select
                          id="taxRate"
                          name="taxRate"
                          value={receiptForm.taxRate}
                          onChange={handleReceiptFormChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                          <option value="0">0%</option>
                          <option value="1">1%</option>
                          <option value="8">8%</option>
                          <option value="10">10%</option>
                          <option value="18">18%</option>
                          <option value="20">20%</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Ödeme Şekli */}
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ödeme Şekli
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={receiptForm.paymentMethod}
                        onChange={handleReceiptFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        {paymentMethods.map(method => (
                          <option key={method.value} value={method.value}>{method.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Açıklama */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Açıklama
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={receiptForm.description}
                        onChange={handleReceiptFormChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Fiş hakkında ek açıklamalar..."
                      ></textarea>
                    </div>
                    
                    {/* Onay Kontrolü */}
                    <div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isVerified"
                          name="isVerified"
                          checked={receiptForm.isVerified}
                          onChange={handleReceiptFormChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Fiş doğrulandı (Vergi beyannamesi için onaylı)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsReceiptModalOpen(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 