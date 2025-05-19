"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Gelir vergisi dilimleri (2023)
const taxBrackets = [
  { min: 0, max: 70000, rate: 15 },
  { min: 70000, max: 150000, rate: 20 },
  { min: 150000, max: 550000, rate: 27 },
  { min: 550000, max: 1900000, rate: 35 },
  { min: 1900000, max: Infinity, rate: 40 }
];

// Demo veri
const demoData = {
  year: 2023,
  estimatedIncome: 320000,
  expenses: [
    { type: "Bağ-Kur Primleri", amount: 32000 },
    { type: "İşyeri Kira Giderleri", amount: 48000 },
    { type: "Sağlık Harcamaları", amount: 8500 },
    { type: "Eğitim Harcamaları", amount: 12000 }
  ],
  advancePayments: [
    { period: "1. Dönem (Ocak-Mart)", amount: 14500 },
    { period: "2. Dönem (Nisan-Haziran)", amount: 15200 },
    { period: "3. Dönem (Temmuz-Eylül)", amount: 16300 },
    { period: "4. Dönem (Ekim-Aralık)", amount: 17500 }
  ]
};

export default function GelirVergisiPage() {
  const [mounted, setMounted] = useState(false);
  const [income, setIncome] = useState(demoData.estimatedIncome);
  const [expenses, setExpenses] = useState(demoData.expenses);
  const [advancePayments, setAdvancePayments] = useState(demoData.advancePayments);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Giderlerin toplamını hesaplama
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  
  // Vergilendirilebilir geliri hesaplama
  const taxableIncome = Math.max(0, income - totalExpenses);
  
  // Gelir vergisini hesaplama
  const calculateIncomeTax = (income: number) => {
    let tax = 0;
    let remainingIncome = income;
    
    for (const bracket of taxBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableAmountInBracket = Math.min(
        remainingIncome, 
        bracket.max - bracket.min
      );
      
      tax += taxableAmountInBracket * (bracket.rate / 100);
      remainingIncome -= taxableAmountInBracket;
    }
    
    return tax;
  };
  
  // Vergiyi hesaplama
  const calculatedTax = calculateIncomeTax(taxableIncome);
  
  // Avans ödemelerinin toplamını hesaplama
  const totalAdvancePayments = advancePayments.reduce((sum, item) => sum + item.amount, 0);
  
  // Kalan vergiyi hesaplama
  const remainingTax = Math.max(0, calculatedTax - totalAdvancePayments);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Gelir Vergisi Hesaplamaları</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {demoData.year} Yılı Tahmini Gelir Vergisi
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link
            href="/dashboard/reports/vergi-beyanname"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Geri Dön
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gelir Bilgileri */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4 dark:text-white">Gelir Bilgileri</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tahmini Yıllık Gelir
              </label>
              <div className="flex">
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-l-md shadow-sm py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  value={income.toLocaleString('tr-TR')}
                  onChange={(e) => {
                    const value = Number(e.target.value.replace(/\D/g, ''));
                    setIncome(value);
                  }}
                />
                <span className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  ₺
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İndirim ve Giderler
              </label>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gider Türü</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {expenses.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.type}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                          <div className="flex">
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 dark:border-gray-700 rounded-l-md shadow-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              value={item.amount.toLocaleString('tr-TR')}
                              onChange={(e) => {
                                const newExpenses = [...expenses];
                                newExpenses[i].amount = Number(e.target.value.replace(/\D/g, ''));
                                setExpenses(newExpenses);
                              }}
                            />
                            <span className="inline-flex items-center px-2 py-1 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs">
                              ₺
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam Giderler</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                        {totalExpenses.toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-4 text-right">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">
                  Yeni Gider Ekle
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Geçici Vergi Ödemeleri
              </label>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-left">
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dönem</th>
                      <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tutar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {advancePayments.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">{item.period}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-300">
                          <div className="flex">
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 dark:border-gray-700 rounded-l-md shadow-sm py-1 px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                              value={item.amount.toLocaleString('tr-TR')}
                              onChange={(e) => {
                                const newPayments = [...advancePayments];
                                newPayments[i].amount = Number(e.target.value.replace(/\D/g, ''));
                                setAdvancePayments(newPayments);
                              }}
                            />
                            <span className="inline-flex items-center px-2 py-1 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs">
                              ₺
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 dark:bg-gray-900">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">Toplam Geçici Vergiler</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-800 dark:text-gray-300">
                        {totalAdvancePayments.toLocaleString('tr-TR')} ₺
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vergi Hesaplamaları ve Özet */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Hesaplaması</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Gelir:</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{income.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Giderler:</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-300">- {totalExpenses.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vergilendirilebilir Gelir:</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{taxableIncome.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hesaplanan Gelir Vergisi:</span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{calculatedTax.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Ödenen Geçici Vergiler:</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-300">- {totalAdvancePayments.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ödenecek Gelir Vergisi:</span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{remainingTax.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4 dark:text-white">Vergi Dilimleri</h2>
            
            <div className="space-y-2">
              {taxBrackets.map((bracket, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {bracket.min.toLocaleString('tr-TR')} ₺ - {bracket.max === Infinity ? 'üzeri' : bracket.max.toLocaleString('tr-TR') + ' ₺'}:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-300">%{bracket.rate}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-800 dark:text-blue-300">
              <p>Bu hesaplamalar tahmini olup, gerçek vergi hesaplaması resmi beyanname hazırlanırken yapılacaktır.</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4 dark:text-white">İşlemler</h2>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Raporu Kaydet
              </button>
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
                Raporu PDF Olarak İndir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 