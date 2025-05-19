"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function CreateReceiptPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form verisi
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    expenseDate: new Date().toISOString().split('T')[0], // Bugünün tarihi
    category: "",
    receiptNumber: "",
    taxRate: "18", // Varsayılan KDV oranı
    paymentMethod: "cash",
    supplierId: "",
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
  
  // Form alanı değişikliği
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
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
  
  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // KDV ve toplam tutarı hesapla
      const { taxAmount, totalAmount } = calculateTax(formData.amount, formData.taxRate);
      
      // API'ye gönderilecek veriyi hazırla
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount) || 0,
        taxRate: parseFloat(formData.taxRate) || 0,
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
      
      // Başarılı ise fiş listesine yönlendir
      router.push('/dashboard/receipts');
      router.refresh();
      
    } catch (err: any) {
      console.error('Fiş ekleme hatası:', err);
      setError(err.message || 'Fiş eklenirken bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Yeni Fiş Girişi
        </h1>
        <Link 
          href="/dashboard/receipts" 
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Fiş Listesine Dön
        </Link>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fiş Başlığı */}
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fiş Başlığı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Kategori Seçin</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Fiş Tarihi */}
          <div>
            <label htmlFor="expenseDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fiş Tarihi <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="expenseDate"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
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
              value={formData.receiptNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Fiş üzerindeki numara"
            />
          </div>
          
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
              value={formData.amount}
              onChange={handleChange}
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
              value={formData.taxRate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="0">%0</option>
              <option value="1">%1</option>
              <option value="8">%8</option>
              <option value="18">%18</option>
              <option value="20">%20</option>
            </select>
          </div>
          
          {/* Hesaplanan KDV Tutarı ve Toplam */}
          <div className="col-span-2 grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">KDV Tutarı:</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                  parseFloat(calculateTax(formData.amount, formData.taxRate).taxAmount)
                )}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">Toplam Tutar:</span>
              <span className="text-lg font-semibold">
                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(
                  parseFloat(calculateTax(formData.amount, formData.taxRate).totalAmount)
                )}
              </span>
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
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
          </div>
          
          {/* Onay Kontrolü */}
          <div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isVerified"
                name="isVerified"
                checked={formData.isVerified}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Fiş doğrulandı (Vergi beyannamesi için onaylı)
              </label>
            </div>
          </div>
          
          {/* Açıklama */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Açıklama
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Opsiyonel açıklama"
            />
          </div>
        </div>
        
        {/* Form Gönder Butonu */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <FaSave className="mr-2" />
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 