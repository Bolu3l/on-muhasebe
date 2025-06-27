"use client";

import { useState, useEffect } from "react";

// Örnek veriler kaldırıldı - gerçek API verileri kullanılıyor

export default function KarZararPage() {
  const [mounted, setMounted] = useState(false);
  const [periodSelector, setPeriodSelector] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{
    monthly: Array<{ revenue: number; expenses: number; profit: number; month: string; [key: string]: any }>;
    revenueByCategory: Array<any>;
    expensesByCategory: Array<{ profitMargin: number; [key: string]: any }>;
    productProfitability: Array<any>;
  }>({
    monthly: [],
    revenueByCategory: [],
    expensesByCategory: [],
    productProfitability: []
  });
  
  // API'den verileri çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reports/profit-loss?period=${periodSelector}`);
        if (!response.ok) {
          throw new Error('Rapor verileri alınamadı');
        }
        const data = await response.json();
        setReportData(data);
        setLoading(false);
      } catch (err) {
        console.error('Rapor verileri yüklenirken hata:', err);
        setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
        setLoading(false);
      }
    };
    
    if (mounted) {
      fetchData();
    }
  }, [mounted, periodSelector]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Rapor verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  // Toplam değerleri hesaplama
  const totalRevenue = reportData.monthly.reduce((sum, month) => sum + month.revenue, 0);
  const totalExpenses = reportData.monthly.reduce((sum, month) => sum + month.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const avgProfitMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Kâr/Zarar Analizleri</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            İşletmenizin kârlılık performansı ve finansal analizleri
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="mr-4">
            <select 
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm"
              value={periodSelector}
              onChange={(e) => setPeriodSelector(e.target.value)}
            >
              <option value="monthly">Aylık</option>
              <option value="quarterly">Çeyreklik</option>
              <option value="yearly">Yıllık</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Raporu İndir
          </button>
        </div>
      </div>
      
      {/* Genel Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Toplam Gelir</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {totalRevenue.toLocaleString('tr-TR')} ₺
          </p>
          <div className="flex items-center text-green-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">%8.2 önceki döneme göre</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Toplam Gider</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {totalExpenses.toLocaleString('tr-TR')} ₺
          </p>
          <div className="flex items-center text-red-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414l3.293 3.293A1 1 0 0014 13z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">%5.7 önceki döneme göre</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Net Kâr</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {totalProfit.toLocaleString('tr-TR')} ₺
          </p>
          <div className="flex items-center text-green-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">%12.3 önceki döneme göre</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Kâr Marjı</h2>
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            %{avgProfitMargin.toFixed(1)}
          </p>
          <div className="flex items-center text-green-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586l3.293-3.293A1 1 0 0114 7z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">%2.5 önceki döneme göre</span>
          </div>
        </div>
      </div>
      
      {/* Aylık Kâr/Zarar Grafiği */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Aylık Kâr/Zarar</h2>
          
          <div className="h-80 relative">
            {/* Chart Y ekseni */}
            <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between py-4">
              {[0, 40000, 80000, 120000, 160000].reverse().map((value) => (
                <div key={value} className="text-xs text-gray-500 dark:text-gray-400">
                  {value.toLocaleString('tr-TR')} ₺
                </div>
              ))}
            </div>
            
            {/* Chart çizim alanı */}
            <div className="ml-16 h-full relative">
              {/* Y ekseni çizgileri */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <div 
                  key={percent} 
                  className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                  style={{ top: `${100 - percent}%` }}
                ></div>
              ))}
              
              {/* Barlar */}
              <div className="h-full flex">
                {reportData.monthly.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end h-full px-1">
                    {/* Gelir barı */}
                    <div 
                      className="w-full bg-blue-500"
                      style={{ height: `${(item.revenue / 160000) * 100}%` }}
                    ></div>
                    
                    {/* Gider barı (Gelirin üzerine) */}
                    <div 
                      className="w-full bg-red-500 absolute bottom-0"
                      style={{ 
                        height: `${(item.expenses / 160000) * 100}%`, 
                        opacity: 0.75
                      }}
                    ></div>
                    
                    {/* Kâr çizgisi - Bar grafiğinin üzerine */}
                    <div 
                      className="w-full h-1 bg-green-500 absolute"
                      style={{ 
                        bottom: `${(item.profit / 160000) * 100}%`,
                      }}
                    ></div>
                    
                    {/* X ekseni etiketi */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center absolute bottom-0 w-full" style={{ left: 0, transform: 'translateY(100%)' }}>
                      {item.month.substring(0, 3)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Gösterge */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Gelir</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2 opacity-75"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Gider</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Net Kâr</span>
            </div>
          </div>
        </div>
        
        {/* Kâr Marjı Trendi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Kâr Marjı Trendi</h2>
          
          <div className="h-80 relative">
            {/* Chart Y ekseni */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-4">
              {[0, 10, 20, 30, 40].reverse().map((value) => (
                <div key={value} className="text-xs text-gray-500 dark:text-gray-400">
                  %{value}
                </div>
              ))}
            </div>
            
            {/* Chart çizim alanı */}
            <div className="ml-12 h-full relative pr-4">
              {/* Y ekseni çizgileri */}
              {[0, 25, 50, 75, 100].map((percent) => (
                <div 
                  key={percent} 
                  className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                  style={{ top: `${100 - percent}%` }}
                ></div>
              ))}
              
              {/* Çizgi grafik */}
              <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                  points={reportData.monthly.map((item, i) => 
                    `${(i / (reportData.monthly.length - 1)) * 100}, ${100 - ((item.profitMargin / 40) * 100)}`
                  ).join(' ')}
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Nokta işaretçileri */}
              <div className="absolute inset-0">
                {reportData.monthly.map((item, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 bg-white border-2 border-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ 
                      left: `${(i / (reportData.monthly.length - 1)) * 100}%`, 
                      top: `${100 - ((item.profitMargin / 40) * 100)}%` 
                    }}
                  ></div>
                ))}
              </div>
              
              {/* X ekseni etiketleri */}
              <div className="absolute bottom-0 inset-x-0 flex justify-between">
                {reportData.monthly.map((item, i) => (
                  <div key={i} className="text-xs text-gray-500 dark:text-gray-400 text-center" style={{ transform: 'translateY(20px)' }}>
                    {item.month.substring(0, 3)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Kâr Marjı Özeti</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ortalama</p>
                <p className="text-lg font-semibold">%{avgProfitMargin.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">En Yüksek</p>
                <p className="text-lg font-semibold">
                  %{Math.max(...reportData.monthly.map(item => item.profitMargin)).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Kategori Dağılımları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Gelir Kategorileri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Gelir Dağılımı</h2>
          
          <div className="flex space-x-6">
            {/* Pie chart */}
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {reportData.revenueByCategory.map((item, i, arr) => {
                  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                  
                  // SVG pie chart slice hesaplama
                  let cumulativePercent = 0;
                  for (let j = 0; j < i; j++) {
                    cumulativePercent += arr[j].percentage;
                  }
                  
                  const startAngle = (cumulativePercent / 100) * 360;
                  const endAngle = ((cumulativePercent + item.percentage) / 100) * 360;
                  
                  // SVG için arc gösterimi
                  const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
                  const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
                  const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
                  const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));
                  
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                  
                  const pathData = [
                    `M 50 50`,
                    `L ${startX} ${startY}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `Z`
                  ].join(' ');
                  
                  return (
                    <path 
                      key={i} 
                      d={pathData} 
                      fill={colors[i % colors.length]} 
                    />
                  );
                })}
                <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-800" />
              </svg>
            </div>
            
            {/* Kategori listesi */}
            <div className="flex-1">
              {reportData.revenueByCategory.map((item, i) => {
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                return (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[i % colors.length] }}></div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.category}</p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      %{item.percentage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Gider Kategorileri */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Gider Dağılımı</h2>
          
          <div className="flex space-x-6">
            {/* Pie chart */}
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {reportData.expensesByCategory.map((item, i, arr) => {
                  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                  
                  // SVG pie chart slice hesaplama
                  let cumulativePercent = 0;
                  for (let j = 0; j < i; j++) {
                    cumulativePercent += arr[j].percentage;
                  }
                  
                  const startAngle = (cumulativePercent / 100) * 360;
                  const endAngle = ((cumulativePercent + item.percentage) / 100) * 360;
                  
                  // SVG için arc gösterimi
                  const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
                  const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
                  const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
                  const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));
                  
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
                  
                  const pathData = [
                    `M 50 50`,
                    `L ${startX} ${startY}`,
                    `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                    `Z`
                  ].join(' ');
                  
                  return (
                    <path 
                      key={i} 
                      d={pathData} 
                      fill={colors[i % colors.length]} 
                    />
                  );
                })}
                <circle cx="50" cy="50" r="20" fill="white" className="dark:fill-gray-800" />
              </svg>
            </div>
            
            {/* Kategori listesi */}
            <div className="flex-1">
              {reportData.expensesByCategory.map((item, i) => {
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                return (
                  <div key={i} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[i % colors.length] }}></div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item.category}</p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      %{item.percentage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Ürün Kârlılık Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4 dark:text-white">Ürün Kârlılık Analizi</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Ürün</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Satış Geliri</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Maliyet</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Kâr</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Kâr Marjı</th>
              </tr>
            </thead>
            <tbody>
              {reportData.productProfitability.map((product, i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{product.product}</td>
                  <td className="py-3 px-4 text-sm text-right text-gray-800 dark:text-gray-300">
                    {product.revenue.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="py-3 px-4 text-sm text-right text-gray-800 dark:text-gray-300">
                    {product.cost.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-gray-800 dark:text-gray-300">
                    {product.profit.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium">
                    <span className={`${product.margin > 30 ? 'text-green-600 dark:text-green-400' : 
                                         product.margin > 20 ? 'text-yellow-600 dark:text-yellow-400' : 
                                         'text-red-600 dark:text-red-400'}`}>
                      %{product.margin.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam</td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-gray-800 dark:text-gray-300">
                  {reportData.productProfitability.reduce((sum, product) => sum + product.revenue, 0).toLocaleString('tr-TR')} ₺
                </td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-gray-800 dark:text-gray-300">
                  {reportData.productProfitability.reduce((sum, product) => sum + product.cost, 0).toLocaleString('tr-TR')} ₺
                </td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-gray-800 dark:text-gray-300">
                  {reportData.productProfitability.reduce((sum, product) => sum + product.profit, 0).toLocaleString('tr-TR')} ₺
                </td>
                <td className="py-3 px-4 text-sm text-right font-semibold text-gray-800 dark:text-gray-300">
                  %{(reportData.productProfitability.reduce((sum, product) => sum + product.profit, 0) / 
                    reportData.productProfitability.reduce((sum, product) => sum + product.revenue, 0) * 100).toFixed(1)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
} 