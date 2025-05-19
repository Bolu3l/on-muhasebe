"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaFilter, FaFileAlt, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Kategori seçenekleri
  const categories = [
    "Akaryakıt",
    "Gıda",
    "Ofis Malzemeleri",
    "Ulaşım",
    "Konaklama",
    "Diğer"
  ];

  // Fiş verilerini getir
  useEffect(() => {
    async function fetchReceipts() {
      try {
        setLoading(true);
        const url = selectedCategory 
          ? `/api/receipts?category=${encodeURIComponent(selectedCategory)}` 
          : '/api/receipts';
          
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Fiş verileri alınamadı');
        }
        
        const data = await response.json();
        setReceipts(data);
        setError(null);
      } catch (err: any) {
        console.error('Fiş verileri yüklenirken hata oluştu:', err);
        setError('Fiş verileri yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchReceipts();
  }, [selectedCategory]);

  // Fiş sil
  async function handleDeleteReceipt(id: string) {
    if (!confirm('Bu fiş kaydını silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/receipts?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Fiş silinemedi');
      }
      
      // Başarıyla silindiyse sayfayı güncelle
      setReceipts(receipts.filter(receipt => receipt.id !== id));
    } catch (err) {
      console.error('Fiş silinirken hata oluştu:', err);
      alert('Fiş silinirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-0">
          Fiş Giderleri
        </h1>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
          </div>
          
          <Link 
            href="/dashboard/receipts/create" 
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2" />
            Yeni Fiş Ekle
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : receipts.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaFileAlt className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Henüz hiç fiş kaydı bulunmuyor. Yeni fiş eklemek için "Yeni Fiş Ekle" butonunu kullanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Başlık</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tarih</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">KDV</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Toplam</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ödeme Şekli</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {receipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {receipt.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {receipt.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatDate(new Date(receipt.expenseDate))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(receipt.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(receipt.taxAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {formatCurrency(receipt.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {receipt.paymentMethod === 'cash' ? 'Nakit' : 
                     receipt.paymentMethod === 'card' ? 'Kart' : 
                     receipt.paymentMethod === 'transfer' ? 'Havale/EFT' : 
                     receipt.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 space-x-2">
                    <Link href={`/dashboard/receipts/${receipt.id}`} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400">
                      <FaEye className="inline h-4 w-4" />
                    </Link>
                    <Link href={`/dashboard/receipts/${receipt.id}/edit`} className="text-yellow-600 hover:text-yellow-900 dark:hover:text-yellow-400">
                      <FaEdit className="inline h-4 w-4" />
                    </Link>
                    <button 
                      onClick={() => handleDeleteReceipt(receipt.id)} 
                      className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                    >
                      <FaTrash className="inline h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 