"use client";

import { useState, useEffect } from "react";
import { getRecurringTransactions } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Link from "next/link";

interface RecurringTransaction {
  id: string;
  title: string;
  amount: number | string | any;
  type: string;
  frequency: string;
  startDate: Date | string;
  endDate: Date | string | null;
  isActive: boolean;
  lastProcessed?: Date | string | null;
  category: string;
  description?: string | null;
}

export default function RecurringTransactionsPage() {
  const [recurringItems, setRecurringItems] = useState<RecurringTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [filteredItems, setFilteredItems] = useState<RecurringTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    async function loadRecurringTransactions() {
      try {
        setIsLoading(true);
        
        // Önce doğrudan API endpoint'ini dene
        try {
          const response = await fetch('/api/recurring');
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const transformedData = data.map((item: any) => ({
                ...item,
                lastProcessed: item.lastProcessed || null
              }));
              
              setRecurringItems(transformedData);
              setFilteredItems(transformedData);
              setIsLoading(false);
              setError(null);
              return;
            }
          }
        } catch (directApiError) {
          // Sessizce devam et ve alternatif yöntemleri dene
        }
        
        // Alternatif olarak getRecurringTransactions'i kullan
        const data = await getRecurringTransactions();
        
        if (!data || data.length === 0) {
          setRecurringItems([]);
          setFilteredItems([]);
        } else {
          const transformedData = data.map((item: any) => ({
            ...item,
            lastProcessed: item.lastProcessed || null
          }));
          
          setRecurringItems(transformedData);
          setFilteredItems(transformedData);
        }
        
        setError(null);
      } catch (err: any) {
        console.error("Düzenli işlemler yüklenirken hata oluştu:", err);
        setError("Düzenli işlem verileri yüklenemedi: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadRecurringTransactions();
  }, []);

  // Filtreleme
  useEffect(() => {
    if (!recurringItems.length) return;
    
    let results = [...recurringItems];
    
    // Arama terimi filtresi
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        (item.id && item.id.toLowerCase().includes(searchLower))
      );
    }
    
    // Tür filtresi
    if (typeFilter !== "") {
      results = results.filter(item => item.type === typeFilter);
    }
    
    // Sıklık filtresi
    if (frequencyFilter !== "") {
      results = results.filter(item => item.frequency === frequencyFilter);
    }
    
    // Durum filtresi
    if (statusFilter !== "") {
      results = results.filter(item => 
        (statusFilter === "active" && item.isActive) || 
        (statusFilter === "paused" && !item.isActive)
      );
    }
    
    setFilteredItems(results);
  }, [typeFilter, frequencyFilter, statusFilter, searchTerm, recurringItems]);

  // Sıklık metni oluştur
  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'weekly': return 'Haftalık';
      case 'monthly': return 'Aylık';
      case 'quarterly': return '3 Aylık';
      case 'annually': return 'Yıllık';
      default: return frequency;
    }
  }

  // Düzenli işlem silme
  const handleDelete = (id: string) => {
    if (window.confirm('Bu düzenli işlemi silmek istediğinizden emin misiniz?')) {
      // API çağrısı ile silme işlemi gerçekleştirilecek
      console.log('Düzenli işlem silindi:', id);
      
      // UI'dan kaldırma
      const updatedItems = recurringItems.filter(item => item.id !== id);
      setRecurringItems(updatedItems);
      setFilteredItems(filteredItems.filter(item => item.id !== id));
    }
  };

  if (!mounted) {
    return null;
  }

  // Hata durumu
  if (error) {
    return (
      <div className="p-10 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="text-lg font-bold">Hata!</h2>
        <p>{error}</p>
        <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Düzenli İşlemler</h1>
          <Link
            href="/dashboard/recurring/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Yeni Düzenli İşlem
          </Link>
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
              placeholder="İşlem adı veya ID ile ara..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tür
            </label>
            <select
              id="type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="expense">Gider</option>
              <option value="income">Gelir</option>
            </select>
          </div>
          <div className="w-full sm:w-48">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sıklık
            </label>
            <select
              id="frequency"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={frequencyFilter}
              onChange={(e) => setFrequencyFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              <option value="weekly">Haftalık</option>
              <option value="monthly">Aylık</option>
              <option value="quarterly">3 Aylık</option>
              <option value="annually">Yıllık</option>
            </select>
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
              <option value="active">Aktif</option>
              <option value="paused">Duraklatılmış</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3">Düzenli işlemler yükleniyor...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 mt-8 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Henüz düzenli işlem bulunmamaktadır</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Yeni bir düzenli işlem eklemek için "Yeni Düzenli İşlem" butonunu kullanabilirsiniz.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/recurring/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Yeni Düzenli İşlem
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                    İşlem Adı
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Tür
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Tutar
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Sıklık
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Başlangıç Tarihi
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
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.type === "income" ? "Gelir" : "Gider"}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(item.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {getFrequencyText(item.frequency)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.isActive ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex space-x-2 justify-end">
                        <button
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => console.log('Görüntüleme:', item.id)}
                        >
                          <FaEye className="w-5 h-5" title="Görüntüle" />
                        </button>
                        <button
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          onClick={() => console.log('Düzenleme:', item.id)}
                        >
                          <FaEdit className="w-5 h-5" title="Düzenle" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDelete(item.id)}
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
        )}
      </div>
    </main>
  );
} 