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
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("outgoing");
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('outgoing');

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

  // Filtreleme işlevi
  useEffect(() => {
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
  }, [searchTerm, statusFilter, typeFilter, invoices]);

  // Sekme değiştiğinde filtreleme yap
  const handleTabChange = (tab: 'incoming' | 'outgoing') => {
    setActiveTab(tab);
    setTypeFilter(tab);
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Faturalar ({filteredInvoices.length})</h1>
          <div className="flex space-x-2">
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
          </nav>
        </div>

        {/* Filtreleme ve Arama */}
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

        <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
        </div>
        
        {/* Filtrelenmiş sonuç yok */}
        {invoices.length > 0 && filteredInvoices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun fatura bulunamadı.</p>
          </div>
        )}
      </div>
    </main>
  );
} 