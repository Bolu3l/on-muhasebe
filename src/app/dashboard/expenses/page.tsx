"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExpenses } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

// Basit bir tip tanımlaması
type Expense = {
  id: string;
  title: string;
  amount: number | string | any;
  expenseDate: string | Date;
  category: string;
  status: string;
  [key: string]: any; // Diğer alanlar için
};

export default function ExpensesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    async function loadExpenses() {
      try {
        setIsLoading(true);
        
        // Önce doğrudan API endpoint'ini dene
        try {
          const response = await fetch('/api/expenses');
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              setExpenses(data);
              setFilteredExpenses(data);
              setIsLoading(false);
              return;
            }
          }
        } catch (directApiError) {
          // Sessizce devam et ve alternatif yöntemleri dene
        }
        
        // Alternatif olarak getExpenses'i kullan
        const data = await getExpenses();
        
        if (!data || data.length === 0) {
          setExpenses([]);
          setFilteredExpenses([]);
          return;
        }
        
        setExpenses(data);
        setFilteredExpenses(data);
      } catch (err: any) {
        console.error("Giderler yüklenirken hata oluştu:", err);
        setError(`Gider verileri yüklenemedi: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadExpenses();
  }, []);

  // Filtreleme işlevi
  useEffect(() => {
    if (!expenses.length) return;
    
    let results = [...expenses];
    
    // Arama terimi filtresi
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(expense => 
        (expense.title && expense.title.toLowerCase().includes(searchLower)) || 
        (expense.id && expense.id.toLowerCase().includes(searchLower))
      );
    }
    
    // Kategori filtresi
    if (categoryFilter) {
      results = results.filter(expense => 
        expense.category && expense.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Durum filtresi
    if (statusFilter) {
      results = results.filter(expense => 
        expense.status && expense.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    setFilteredExpenses(results);
  }, [searchTerm, categoryFilter, statusFilter, expenses]);

  // Basit yükleme durumu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Giderler yükleniyor...</span>
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
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-900 mt-8 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Henüz gider kaydı bulunmamaktadır</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Yeni bir gider eklemek için "Yeni Gider" butonunu kullanabilirsiniz.
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard/expenses/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Yeni Gider
          </Link>
        </div>
      </div>
    );
  }

  // Status badge renklerini belirle
  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'tamamlandı':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'bekliyor':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'iptal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Kategori badge renklerini belirle
  const getCategoryBadgeClass = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'ofis':
        return 'bg-blue-100 text-blue-800';
      case 'kira':
        return 'bg-purple-100 text-purple-800';
      case 'maaş':
        return 'bg-indigo-100 text-indigo-800';
      case 'fatura':
        return 'bg-pink-100 text-pink-800';
      case 'diğer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Gider silme
  const handleDelete = async (id: string) => {
    if (window.confirm('Bu gideri silmek istediğinizden emin misiniz?')) {
      try {
        // API çağrısı ile silme işlemi gerçekleştir
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gider silinirken bir hata oluştu');
        }
        
        console.log('Gider başarıyla silindi:', id);
        
        // UI'dan kaldırma
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
        setFilteredExpenses(filteredExpenses.filter(expense => expense.id !== id));
      } catch (error) {
        console.error('Gider silinirken hata:', error);
        alert(`Gider silinirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
      }
    }
  };

  // Kategori seçeneklerini toplama
  const categoryOptions = Array.from(new Set(expenses.map(expense => expense.category))).filter(Boolean);

  // Verileri göster
  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Giderler ({filteredExpenses.length})</h1>
          <Link
            href="/dashboard/expenses/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Yeni Gider
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
              placeholder="Başlık veya ID ile ara..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kategori
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Tümü</option>
              {categoryOptions.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
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
              <option value="completed">Tamamlandı</option>
              <option value="pending">Bekliyor</option>
              <option value="cancelled">İptal</option>
            </select>
          </div>
        </div>

        <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
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
                  Durum
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">İşlemler</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                    {expense.id.substring(0, 12)}...
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {expense.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeClass(expense.category)}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(expense.expenseDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex space-x-2 justify-end">
                      <button
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        onClick={() => console.log('Görüntüleme:', expense.id)}
                      >
                        <FaEye className="w-5 h-5" title="Görüntüle" />
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        onClick={() => console.log('Düzenleme:', expense.id)}
                      >
                        <FaEdit className="w-5 h-5" title="Düzenle" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDelete(expense.id)}
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
        {expenses.length > 0 && filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Arama kriterlerinize uygun gider bulunamadı.</p>
          </div>
        )}
      </div>
    </main>
  );
} 