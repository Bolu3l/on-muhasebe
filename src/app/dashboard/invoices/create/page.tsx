"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function CreateInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // URL'den gelen type değerini dikkate almadan her zaman 'outgoing' olarak ayarla
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    customerName: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ description: '', amount: '', quantity: '1', total: '0' }],
    totalAmount: '0',
    status: 'pending',
    notes: '',
    type: 'outgoing', // Her zaman giden fatura olarak ayarla
    taxRate: '18' // KDV oranı için varsayılan değeri ekle
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Artık type değerine göre güncelleme yapmayacağız
  // useEffect(() => {
  //   setFormData(prev => ({ ...prev, type }));
  // }, [type]);

  // Form girdisi değiştiğinde state'i güncelle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Kalem listesi işlemleri
  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    
    updatedItems[index] = {
      ...updatedItems[index],
      [name]: value
    };
    
    // Kalem toplamını hesapla
    if (name === 'amount' || name === 'quantity') {
      const amount = parseFloat(updatedItems[index].amount) || 0;
      const quantity = parseFloat(updatedItems[index].quantity) || 0;
      updatedItems[index].total = (amount * quantity).toString();
    }
    
    // Genel toplamı hesapla
    const totalAmount = updatedItems.reduce((sum, item) => {
      return sum + (parseFloat(item.total) || 0);
    }, 0);
    
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: totalAmount.toString()
    });
  };

  // Yeni kalem ekle
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', amount: '', quantity: '1', total: '0' }]
    });
  };

  // Kalem sil
  const removeItem = (index: number) => {
    if (formData.items.length === 1) {
      return; // En az bir kalem olmalı
    }
    
    const updatedItems = formData.items.filter((_, i) => i !== index);
    
    // Genel toplamı güncelle
    const totalAmount = updatedItems.reduce((sum, item) => {
      return sum + (parseFloat(item.total) || 0);
    }, 0);
    
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: totalAmount.toString()
    });
  };

  // Formu gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Boş alanları kontrol et
      if (!formData.invoiceNumber || !formData.customerName || !formData.invoiceDate) {
        throw new Error('Lütfen zorunlu alanları doldurun');
      }
      
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fatura kaydedilirken bir hata oluştu');
      }
      
      // Başarılı ise faturaların listesine geri dön
      router.push('/dashboard/invoices');
      
    } catch (err: any) {
      console.error('Fatura kaydedilirken hata:', err);
      setError(err.message || 'Fatura kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Başlık ve buton stilini fatura tipine göre ayarla - Artık sabit
  const typeColor = 'blue';
  const pageTitle = 'Yeni Fatura Oluştur';
  const fieldLabel = 'Müşteri';

  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-semibold text-${typeColor}-600 dark:text-${typeColor}-400`}>
            {pageTitle}
          </h1>
          <Link
            href="/dashboard/invoices"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            İptal
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6">
            <h2 className="text-lg font-bold">Hata!</h2>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow overflow-hidden rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fatura Numarası <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {fieldLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fatura Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Son Ödeme Tarihi
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durum
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="pending">Bekliyor</option>
                <option value="paid">Ödendi</option>
                <option value="overdue">Gecikmiş</option>
                <option value="draft">Taslak</option>
                <option value="cancelled">İptal</option>
              </select>
            </div>
          </div>

          {/* Kalemler */}
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Fatura Kalemleri</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Açıklama
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Birim Fiyat
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Miktar
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Toplam
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">İşlemler</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {formData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 pl-4 pr-3">
                        <input
                          type="text"
                          name="description"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="Kalem açıklaması"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-4">
                        <input
                          type="number"
                          name="amount"
                          value={item.amount}
                          onChange={(e) => handleItemChange(index, e)}
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-4">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, e)}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-gray-900 dark:text-white">
                          {formatCurrency(parseFloat(item.total) || 0)}
                        </div>
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          disabled={formData.items.length === 1}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + Yeni Kalem
              </button>
            </div>
          </div>

          {/* Toplam ve Notlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notlar
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex flex-col justify-end">
              <div className="mb-4">
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  KDV Oranı (%)
                </label>
                <select
                  id="taxRate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="0">0%</option>
                  <option value="1">1%</option>
                  <option value="8">8%</option>
                  <option value="10">10%</option>
                  <option value="18">18%</option>
                  <option value="20">20%</option>
                </select>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Ara Toplam:</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatCurrency(parseFloat(formData.totalAmount) || 0)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300">KDV ({formData.taxRate}%):</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatCurrency((parseFloat(formData.totalAmount) || 0) * (parseFloat(formData.taxRate) / 100))}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white font-bold">Genel Toplam:</span>
                  <span className="text-gray-900 dark:text-white font-bold">
                    {formatCurrency((parseFloat(formData.totalAmount) || 0) * (1 + parseFloat(formData.taxRate) / 100))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Düğmeleri */}
          <div className="flex justify-end mt-8 space-x-3">
            <Link
              href="/dashboard/invoices"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md text-white transition-colors ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 