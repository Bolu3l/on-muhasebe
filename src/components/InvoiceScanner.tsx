"use client";

import { useState, useRef, useCallback } from 'react';
import { FaFileUpload, FaSpinner } from 'react-icons/fa';

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
  issuerName?: string;
  recipientName?: string;
  type?: 'incoming' | 'outgoing';
};

// Tarih formatını normalize eden bir yardımcı fonksiyon
const normalizeDate = (dateText: string): string => {
  if (!dateText) return '';
  
  // Tarih içindeki sayı olmayan karakterleri temizle
  const cleanDateText = dateText.replace(/[^\d\.\-\/]/g, '').trim();
  console.log('Normalize edilecek tarih:', cleanDateText);
  
  // Farklı tarih formatlarını kontrol et
  // GG.AA.YYYY formatı
  const dotFormat = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
  // GG/AA/YYYY formatı
  const slashFormat = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  // YYYY-AA-GG formatı
  const dashFormat = /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/;
  
  // Başlangıç değerlerini ata
  let year = 0, month = 0, day = 0;
  let isDateParsed = false;
  
  if (cleanDateText.match(dotFormat)) {
    const matches = cleanDateText.match(dotFormat);
    if (matches) {
      day = parseInt(matches[1], 10);
      month = parseInt(matches[2], 10);
      year = parseInt(matches[3], 10);
      isDateParsed = true;
    }
  } else if (cleanDateText.match(slashFormat)) {
    const matches = cleanDateText.match(slashFormat);
    if (matches) {
      day = parseInt(matches[1], 10);
      month = parseInt(matches[2], 10);
      year = parseInt(matches[3], 10);
      isDateParsed = true;
    }
  } else if (cleanDateText.match(dashFormat)) {
    const matches = cleanDateText.match(dashFormat);
    if (matches) {
      year = parseInt(matches[1], 10);
      month = parseInt(matches[2], 10);
      day = parseInt(matches[3], 10);
      isDateParsed = true;
    }
  } else {
    // Bilinmeyen format, parçalara ayırmayı dene
    const parts = cleanDateText.split(/[\.\-\/]/);
    if (parts.length === 3) {
      // İlk kısım 4 haneliyse muhtemelen YYYY-MM-DD formatıdır
      if (parts[0].length === 4) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
        isDateParsed = true;
      } else {
        // Değilse muhtemelen DD-MM-YYYY formatıdır
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
        isDateParsed = true;
      }
    } else {
      // Format anlaşılamadı, orijinal metni döndür
      console.error('Tarih formatı anlaşılamadı:', cleanDateText);
      return dateText;
    }
  }
  
  // Tarih başarıyla ayrıştırıldı mı kontrol et
  if (!isDateParsed) {
    console.error('Tarih ayrıştırılamadı:', cleanDateText);
    return dateText;
  }
  
  // Geçerli tarih değerleri mi kontrol et
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    console.error('Geçersiz tarih değerleri:', { day, month, year });
    return dateText;
  }
  
  // ISO formatı: YYYY-MM-DD
  const isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  console.log('Normalize edilmiş tarih:', isoDate);
  return isoDate;
};

// Alıcı ve satıcı bilgilerini temizleyen bir yardımcı fonksiyon
const normalizeCompanyName = (text: string): string => {
  if (!text) return '';
  
  // Gereksiz metinleri kaldır
  return text.replace(/^(SAYIN|SATAN|ALICI|FİRMA|MÜŞTERİ):/i, '')
             .replace(/^(VKN\/TCKN|VKN|TCKN):/i, '')
             .trim();
};

const InvoiceScanner = ({ onDataExtracted }: { onDataExtracted: (data: ExtractedInvoiceData) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = async (file: File) => {
    // Sadece PDF dosyalarını kabul et
    if (file.type !== 'application/pdf') {
      setError('Lütfen sadece PDF dosyası yükleyin');
      setFile(null);
      return;
    }

    setFile(file);
    setError(null);
    setIsLoading(true);

    // Dosyayı bir FormData nesnesine ekle
    const formData = new FormData();
    formData.append('file', file);

    try {
      // API'ye dosyayı gönder - React 19 ve Next.js 15 uyumlu
      const response = await fetch('/api/invoices/scan', {
        method: 'POST',
        body: formData,
        // Otomatik Content-Type belirlenmesine izin ver
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `API hatası: ${response.status}`;
        
        try {
          // JSON olarak ayrıştırmayı dene
          const errorData = JSON.parse(errorText);
          if (errorData.error || errorData.message) {
            errorMessage = errorData.error || errorData.message;
          }
        } catch {
          // JSON ayrıştırılamadıysa ham metni kullan
          if (errorText) {
            errorMessage += ` - ${errorText}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // OCR sonuçlarını normalize et
      if (data.invoiceDate) {
        data.invoiceDate = normalizeDate(data.invoiceDate);
      }
      
      if (data.dueDate) {
        data.dueDate = normalizeDate(data.dueDate);
      }
      
      if (data.seller) {
        data.seller = normalizeCompanyName(data.seller);
      }
      
      if (data.buyer) {
        data.buyer = normalizeCompanyName(data.buyer);
      }
      
      // İsimlendirme uyumluluğu için satıcı/alıcı alanlarını kontrol et
      if (!data.issuerName && data.seller) {
        data.issuerName = data.seller;
      }
      
      if (!data.recipientName && data.buyer) {
        data.recipientName = data.buyer;
      }
      
      // Alıcı-satıcı ilişkisine göre fatura tipini önerelim
      // Eğer alıcı bilgisi varsa muhtemelen giden fatura
      if (data.buyer || data.recipientName) {
        data.type = 'outgoing'; // Giden fatura (satış)
      }
      // Eğer sadece satıcı bilgisi varsa muhtemelen gelen fatura
      else if ((data.seller || data.issuerName) && !(data.buyer || data.recipientName)) {
        data.type = 'incoming'; // Gelen fatura (alım)
      }
      
      console.log('Normalize edilmiş OCR sonuçları:', data);

      // Çıkarılan fatura verilerini üst bileşene ilet
      onDataExtracted(data);
    } catch (err: any) {
      console.error('Fatura tarama hatası:', err);
      setError(`Fatura tarama başarısız: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'
        } hover:border-blue-500 dark:hover:border-blue-500`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept="application/pdf"
        />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <FaSpinner className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Fatura taranıyor ve bilgiler çıkarılıyor...</p>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-900 dark:text-white font-medium">{file.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }} 
              className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Başka bir dosya yükle
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFileUpload className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Fatura Tara</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Faturaları otomatik olarak okumak için PDF dosyasını sürükleyin veya tıklayın
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Sadece PDF formatı desteklenmektedir
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-3 text-sm text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceScanner; 