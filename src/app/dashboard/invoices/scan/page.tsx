"use client";

import { useState } from 'react';
import InvoiceScanner from '@/components/InvoiceScanner';
import Link from 'next/link';

type ExtractedInvoiceData = {
  seller?: string;
  buyer?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  amount?: string;
  taxRate?: string;
  taxAmount?: string;
  totalAmount?: string;
  debugRawText?: string;
  issuerName?: string;
  recipientName?: string;
  type?: 'incoming' | 'outgoing';
};

export default function InvoiceScanPage() {
  const [extractedData, setExtractedData] = useState<ExtractedInvoiceData | null>(null);
  const [formData, setFormData] = useState<ExtractedInvoiceData & { type?: 'incoming' | 'outgoing' }>({
    type: 'outgoing' // Varsayılan olarak giden fatura
  });
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const handleDataExtracted = (data: ExtractedInvoiceData & { tempFileId?: string, tempFileName?: string, fileSize?: number, fileType?: string, issuerName?: string, recipientName?: string }) => {
    setExtractedData(data);
    
    console.log('Tarama sonucu alınan veriler:', data);
    
    // Form verilerine OCR'dan çıkarılan bilgileri ekleyelim
    const formValues = {
      seller: data.issuerName || data.seller || '',
      buyer: data.recipientName || data.buyer || '',
      invoiceNumber: data.invoiceNumber || '',
      invoiceDate: data.invoiceDate || '',
      dueDate: data.dueDate || '',
      amount: data.amount || '',
      taxRate: data.taxRate || '',
      taxAmount: data.taxAmount || '',
      totalAmount: data.totalAmount || '',
      type: data.type || 'outgoing' // OCR'den tespit edilen fatura tipi veya varsayılan
    };
    
    console.log('Form için hazırlanan veriler:', formValues);
    
    setFormData(formValues);
    
    // Dosya bilgilerini saklayalım (fatura oluşturulurken kullanacağız)
    if (data.tempFileId && data.tempFileName) {
      setFileInfo({
        tempFileId: data.tempFileId,
        tempFileName: data.tempFileName,
        fileSize: data.fileSize,
        fileType: data.fileType
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Radio buttonlar için değer kontrolü
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Eğer dosya bilgisi yoksa uyarı göster
    if (!fileInfo || !fileInfo.tempFileId) {
      setSubmitError('Dosya bilgisi eksik. Lütfen önce bir fatura PDF\'i yükleyin.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    // Form verilerini detaylı olarak logla
    console.log('Gönderilecek form verileri:', formData);
    
    // Form verilerini API'ya göndererek yeni fatura oluşturma işlemi
    try {
      // Tarih formatını düzenleme
      let invoiceDate = null;
      if (formData.invoiceDate) {
        try {
          // Tarih formatını standartlaştırma
          const dateStr = formData.invoiceDate.trim();
          console.log('Dönüştürülecek tarih:', dateStr);
          
          // DD.MM.YYYY formatını kontrol edelim
          if (dateStr.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/)) {
            const [day, month, year] = dateStr.split('.').map(Number);
            // Tarih dizesi oluşturup direkt date kullanmak daha güvenilir
            // ISO formatı: YYYY-MM-DD kullan
            const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            invoiceDate = isoDateStr;
            console.log('DD.MM.YYYY formatından ISO formatına dönüştürüldü:', isoDateStr);
          } 
          // DD/MM/YYYY formatını kontrol et
          else if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [day, month, year] = dateStr.split('/').map(Number);
            const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            invoiceDate = isoDateStr;
            console.log('DD/MM/YYYY formatından ISO formatına dönüştürüldü:', isoDateStr);
          }
          // YYYY-MM-DD formatını kontrol et
          else if (dateStr.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            // Zaten ISO formatında, direkt kullan
            invoiceDate = dateStr;
            console.log('Zaten ISO formatında:', dateStr);
          } 
          else {
            // Diğer formatları güvenli bir şekilde dönüştürmeyi dene
            console.log('Bilinmeyen formatı çözümlemeye çalışıyorum:', dateStr);
            const dateParts = dateStr.split(/[.\/\-]/);
          if (dateParts.length === 3) {
              let day, month, year;
              // Eğer ilk kısım 4 haneliyse YYYY-MM-DD gibidir
              if (dateParts[0].length === 4) {
                [year, month, day] = dateParts.map(Number);
          } else {
                // Değilse muhtemelen DD-MM-YYYY formatıdır
                [day, month, year] = dateParts.map(Number);
              }
              
              // Geçerli bir tarih mi kontrol et
              if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
                const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                invoiceDate = isoDateStr;
                console.log('Tarih analiz edildi ve dönüştürüldü:', isoDateStr);
              }
            }
          }
          
          console.log('Dönüştürülen fatura tarihi:', invoiceDate);
        } catch (e) {
          console.error('Tarih dönüştürme hatası:', e);
        }
      }
      
      // Vade tarihi formatını düzenleme
      let dueDate = null;
      if (formData.dueDate) {
        try {
          const dateStr = formData.dueDate.trim();
          console.log('Dönüştürülecek vade tarihi:', dateStr);
          
          // DD.MM.YYYY formatını kontrol et
          if (dateStr.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/)) {
            const [day, month, year] = dateStr.split('.').map(Number);
            const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            dueDate = isoDateStr;
            console.log('DD.MM.YYYY formatından ISO formatına dönüştürüldü:', isoDateStr);
          }
          // DD/MM/YYYY formatını kontrol et
          else if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [day, month, year] = dateStr.split('/').map(Number);
            const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            dueDate = isoDateStr;
            console.log('DD/MM/YYYY formatından ISO formatına dönüştürüldü:', isoDateStr);
          }
          // YYYY-MM-DD formatını kontrol et
          else if (dateStr.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            dueDate = dateStr;
            console.log('Zaten ISO formatında:', dateStr);
          }
          else {
            // Diğer formatları güvenli bir şekilde dönüştürmeyi dene
            console.log('Bilinmeyen formatı çözümlemeye çalışıyorum:', dateStr);
            const dateParts = dateStr.split(/[.\/\-]/);
          if (dateParts.length === 3) {
              let day, month, year;
              // Eğer ilk kısım 4 haneliyse YYYY-MM-DD gibidir
              if (dateParts[0].length === 4) {
                [year, month, day] = dateParts.map(Number);
          } else {
                // Değilse muhtemelen DD-MM-YYYY formatıdır
                [day, month, year] = dateParts.map(Number);
              }
              
              // Geçerli bir tarih mi kontrol et
              if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
                const isoDateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                dueDate = isoDateStr;
                console.log('Tarih analiz edildi ve dönüştürüldü:', isoDateStr);
          }
            }
          }
          
          console.log('Dönüştürülen vade tarihi:', dueDate);
        } catch (e) {
          console.error('Vade tarihi dönüştürme hatası:', e);
        }
      }
      
      // Toplam tutarı düzenleme
      let totalAmount = 0;
      if (formData.totalAmount) {
        try {
          // Türkçe para formatından sayısal değere dönüştürme
          // "11.800,00 TL" -> 11800.00
          let amountStr = formData.totalAmount.replace(/[^\d,.-]/g, '');
          
          // Türkçe formatı (1.234,56) -> (1234.56)
          if (amountStr.includes('.') && amountStr.includes(',')) {
            amountStr = amountStr.replace(/\./g, '').replace(',', '.');
          } 
          // Sadece virgül varsa (123,45) -> (123.45)
          else if (amountStr.includes(',')) {
            amountStr = amountStr.replace(',', '.');
          }
          
          totalAmount = parseFloat(amountStr);
          console.log('Dönüştürülen toplam tutar:', totalAmount, 'Orjinal:', formData.totalAmount);
        } catch (e) {
          console.error('Toplam tutar dönüştürme hatası:', e);
        }
      }
      
      // Mal hizmet tutarını düzenleme
      let amount = 0;
      if (formData.amount) {
        try {
          // Türkçe para formatından sayısal değere dönüştürme
          let amountStr = formData.amount.replace(/[^\d,.-]/g, '');
          
          // Türkçe formatı (1.234,56) -> (1234.56)
          if (amountStr.includes('.') && amountStr.includes(',')) {
            amountStr = amountStr.replace(/\./g, '').replace(',', '.');
          } 
          // Sadece virgül varsa (123,45) -> (123.45)
          else if (amountStr.includes(',')) {
            amountStr = amountStr.replace(',', '.');
          }
          
          amount = parseFloat(amountStr);
          console.log('Dönüştürülen mal hizmet tutarı:', amount, 'Orjinal:', formData.amount);
        } catch (e) {
          console.error('Mal hizmet tutarı dönüştürme hatası:', e);
        }
      }
      
      // KDV oranını düzenleme
      let taxRate = 0;
      if (formData.taxRate) {
        try {
          // KDV oranı genellikle %18 gibi formatlarda olabilir
          // Yüzde işareti ve diğer metinleri kaldır
          let rateStr = formData.taxRate.replace(/[^\d,.-]/g, '');
          
          // Türkçe formatı (virgül yerine nokta)
          if (rateStr.includes(',')) {
            rateStr = rateStr.replace(',', '.');
          }
          
          taxRate = parseFloat(rateStr);
          console.log('Dönüştürülen KDV oranı:', taxRate, 'Orjinal:', formData.taxRate);
        } catch (e) {
          console.error('KDV oranı dönüştürme hatası:', e);
        }
      }
      
      // KDV tutarını düzenleme
      let taxAmount = 0;
      if (formData.taxAmount) {
        try {
          // Türkçe para formatından sayısal değere dönüştürme
          let taxStr = formData.taxAmount.replace(/[^\d,.-]/g, '');
          
          // Türkçe formatı (1.234,56) -> (1234.56)
          if (taxStr.includes('.') && taxStr.includes(',')) {
            taxStr = taxStr.replace(/\./g, '').replace(',', '.');
          } 
          // Sadece virgül varsa (123,45) -> (123.45)
          else if (taxStr.includes(',')) {
            taxStr = taxStr.replace(',', '.');
          }
          
          taxAmount = parseFloat(taxStr);
          console.log('Dönüştürülen KDV tutarı:', taxAmount, 'Orjinal:', formData.taxAmount);
        } catch (e) {
          console.error('KDV tutarı dönüştürme hatası:', e);
        }
      }
      
      // Satıcı ve alıcı bilgilerini kontrol et
      const seller = formData.seller?.trim() || "";
      const buyer = formData.buyer?.trim() || "";
      
      console.log('Satıcı ve alıcı bilgileri:', { seller, buyer });
      
      // API isteği için veri hazırlama
      const requestData = {
          // Form verileri
          invoiceNumber: formData.invoiceNumber,
          invoiceDate: invoiceDate,
          dueDate: dueDate,
        amount: amount,
        taxRate: taxRate,
        taxAmount: taxAmount,
        totalAmount: totalAmount,
          status: 'draft',
          notes: 'OCR ile taranmış fatura',
        issuerName: seller,
        recipientName: buyer,
        type: formData.type || 'outgoing', // Formdan gelen fatura tipi
          
          // Dosya bilgileri
          tempFileId: fileInfo.tempFileId,
          tempFileName: fileInfo.tempFileName,
          fileSize: fileInfo.fileSize,
          fileType: fileInfo.fileType
      };
      
      console.log('API\'ye gönderilen veri:', requestData);
      
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // API yanıtını da loglayalım
      const responseData = await response.json();
      console.log('API yanıtı:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Fatura oluşturma başarısız');
      }

      // Başarılı olursa faturalar sayfasına yönlendir
      window.location.href = '/dashboard/invoices';
    } catch (error: any) {
      console.error('Fatura oluşturma hatası:', error);
      setSubmitError(`Fatura oluşturulurken bir hata oluştu: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Fatura Tara</h1>
          <Link
            href="/dashboard/invoices"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Geri Dön
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                PDF Fatura Yükle
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                PDF formatındaki faturanızı yükleyin. Sistem faturadaki bilgileri otomatik olarak okumaya çalışacak.
              </p>
              <InvoiceScanner onDataExtracted={handleDataExtracted} />
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Çıkarılan Bilgiler
              </h2>
              
              {extractedData ? (
                <form onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fatura No
                      </label>
                      <input
                        type="text"
                        id="invoiceNumber"
                        name="invoiceNumber"
                        value={formData.invoiceNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Fatura Tarihi
                      </label>
                      <input
                        type="text"
                        id="invoiceDate"
                        name="invoiceDate"
                        value={formData.invoiceDate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="seller" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Satıcı
                    </label>
                    <input
                      type="text"
                      id="seller"
                      name="seller"
                      value={formData.seller || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="buyer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Alıcı
                    </label>
                    <input
                      type="text"
                      id="buyer"
                      name="buyer"
                      value={formData.buyer || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mal Hizmet Tutarı
                      </label>
                      <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        KDV Oranı
                      </label>
                      <input
                        type="text"
                        id="taxRate"
                        name="taxRate"
                        value={formData.taxRate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="taxAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        KDV Tutarı
                      </label>
                      <input
                        type="text"
                        id="taxAmount"
                        name="taxAmount"
                        value={formData.taxAmount || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Toplam Tutar
                    </label>
                    <input
                      type="text"
                      id="totalAmount"
                      name="totalAmount"
                      value={formData.totalAmount || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Fatura Tipi
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          id="outgoing"
                          name="type"
                          type="radio"
                          value="outgoing"
                          checked={formData.type === 'outgoing'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="outgoing" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Giden Fatura (Satış)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="incoming"
                          name="type"
                          type="radio"
                          value="incoming"
                          checked={formData.type === 'incoming'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="incoming" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Gelen Fatura (Alım)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block animate-spin mr-2">&#9696;</span>
                          İşleniyor...
                        </>
                      ) : (
                        'Faturayı Kaydet'
                      )}
                    </button>
                  </div>

                  {submitError && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                      {submitError}
                    </div>
                  )}
                  
                  {/* Debug panel */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => setShowDebugPanel(!showDebugPanel)}
                      className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {showDebugPanel ? 'Debug Panelini Gizle' : 'Debug Panelini Göster (Raw Text)'}
                    </button>
                    
                    {showDebugPanel && extractedData.debugRawText && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Ham PDF Metni (Debug)
                        </h3>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 overflow-auto" style={{ maxHeight: '300px' }}>
                          <pre className="text-xs text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                            {extractedData.debugRawText}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Veri yok</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Önce bir fatura PDF'i yükleyin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 