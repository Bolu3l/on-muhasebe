"use client";

import { useState, useEffect } from "react";

const SampleChart = ({ type, title }: { type: string; title: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium dark:text-white">{title}</h3>
        
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
      
      {type === 'bar' && (
        <div className="h-64">
          <div className="h-full w-full flex items-end space-x-2 pl-8 pb-8 pt-2 pr-2">
            {[25, 40, 30, 50, 70, 45].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                <div 
                  className="w-full bg-blue-500 dark:bg-blue-600 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {type === 'line' && (
        <div className="h-64">
          <svg viewBox="0 0 300 200" className="h-full w-full">
            <polyline
              points="0,150 50,100 100,125 150,75 200,100 250,50 300,75"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            {/* Eksenleri ve noktaları ekleyebilirsiniz */}
            <line x1="0" y1="200" x2="300" y2="200" stroke="#9ca3af" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="200" stroke="#9ca3af" strokeWidth="1" />
          </svg>
        </div>
      )}
      
      {type === 'pie' && (
        <div className="h-64 flex justify-center items-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="50" cy="50" r="40" fill="#3b82f6" strokeWidth="0" />
              <path d="M50 10 A40 40 0 0 1 90 50 L 50 50 Z" fill="#10b981" />
              <path d="M50 50 L 90 50 A40 40 0 0 1 50 90 Z" fill="#f59e0b" />
              <path d="M50 50 L 50 90 A40 40 0 0 1 10 50 Z" fill="#ef4444" />
              <path d="M50 50 L 10 50 A40 40 0 0 1 50 10 Z" fill="#8b5cf6" />
              <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-800" />
            </svg>
          </div>
        </div>
      )}
      
      {type === 'radar' && (
        <div className="h-64 flex justify-center items-center">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {/* Pentagon arkaplan */}
              <polygon points="50,10 90,35 80,80 20,80 10,35" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
              <polygon points="50,20 80,40 70,70 30,70 20,40" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
              <polygon points="50,30 70,45 65,65 35,65 30,45" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
              
              {/* Veri grafiği */}
              <polygon 
                points="50,15 85,38 75,75 25,75 15,38" 
                fill="#3b82f6" 
                fillOpacity="0.5"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* Eksenler */}
              <line x1="50" y1="10" x2="50" y2="80" stroke="#9ca3af" strokeWidth="0.5" />
              <line x1="10" y1="35" x2="90" y2="35" stroke="#9ca3af" strokeWidth="0.5" />
              <line x1="20" y1="80" x2="80" y2="80" stroke="#9ca3af" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="90" y2="35" stroke="#9ca3af" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="10" y2="35" stroke="#9ca3af" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default function GrafikRaporlarPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("finance");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Grafiksel Finansal Raporlar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            İşletmenizin finansal verilerini görsel raporlar ile analiz edin
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'finance' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setActiveTab('finance')}
          >
            Finansal
          </button>
          
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'sales' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setActiveTab('sales')}
          >
            Satışlar
          </button>
          
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'expenses' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}`}
            onClick={() => setActiveTab('expenses')}
          >
            Giderler
          </button>
        </div>
      </div>
      
      {/* Finansal Grafikler */}
      {activeTab === 'finance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SampleChart type="bar" title="Aylık Gelir ve Gider Karşılaştırması" />
          <SampleChart type="line" title="Nakit Akışı Trendi" />
          <SampleChart type="pie" title="Gelir Kaynakları Dağılımı" />
          <SampleChart type="radar" title="Finansal Sağlık Göstergeleri" />
        </div>
      )}
      
      {/* Satış Grafikleri */}
      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SampleChart type="bar" title="Aylık Satış Performansı" />
          <SampleChart type="line" title="Satış Büyüme Trendi" />
          <SampleChart type="pie" title="Ürün Kategorisi Bazında Satışlar" />
          <SampleChart type="bar" title="En Çok Satan 5 Ürün" />
        </div>
      )}
      
      {/* Gider Grafikleri */}
      {activeTab === 'expenses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SampleChart type="bar" title="Aylık Gider Analizi" />
          <SampleChart type="line" title="Gider Trendi" />
          <SampleChart type="pie" title="Gider Kategorisi Dağılımı" />
          <SampleChart type="bar" title="En Yüksek 5 Gider Kalemi" />
        </div>
      )}
      
      {/* Filtre ve Raporlama Seçenekleri */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Rapor Ayarları</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tarih Aralığı
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>Son 30 gün</option>
              <option>Son 90 gün</option>
              <option>Son 6 ay</option>
              <option>Son 1 yıl</option>
              <option>Özel aralık</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gruplama
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>Günlük</option>
              <option>Haftalık</option>
              <option>Aylık</option>
              <option>Çeyreklik</option>
              <option>Yıllık</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rapor Formatı
            </label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>Görsel (PNG)</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Raporu İndir
          </button>
        </div>
      </div>
    </div>
  );
} 