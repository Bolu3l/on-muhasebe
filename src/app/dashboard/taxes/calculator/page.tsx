"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { FaArrowLeft, FaCalculator, FaFileInvoice } from 'react-icons/fa';

export default function TaxCalculatorPage() {
  // KDV hesaplama için state
  const [vatBase, setVatBase] = useState<string>('');
  const [vatRate, setVatRate] = useState<string>('18');
  const [vatResult, setVatResult] = useState<{
    baseAmount: number;
    vatAmount: number;
    totalAmount: number;
  } | null>(null);
  
  // Gelir vergisi hesaplama için state
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');
  const [incomeTaxResult, setIncomeTaxResult] = useState<{
    netIncome: number;
    taxAmount: number;
    effectiveRate: number;
  } | null>(null);
  
  // KDV hesapla
  const calculateVAT = () => {
    const baseAmount = parseFloat(vatBase);
    if (isNaN(baseAmount)) return;
    
    const rate = parseFloat(vatRate) / 100;
    const vatAmount = baseAmount * rate;
    const totalAmount = baseAmount + vatAmount;
    
    setVatResult({
      baseAmount,
      vatAmount,
      totalAmount
    });
  };
  
  // Gelir vergisi hesapla
  const calculateIncomeTax = () => {
    const income = parseFloat(annualIncome);
    const totalExpenses = parseFloat(expenses) || 0;
    
    if (isNaN(income)) return;
    
    const netIncome = income - totalExpenses;
    
    // Türkiye'deki gelir vergisi dilimleri (2023 yılı için)
    let taxAmount = 0;
    
    if (netIncome <= 70000) {
      taxAmount = netIncome * 0.15;
    } else if (netIncome <= 150000) {
      taxAmount = 10500 + (netIncome - 70000) * 0.20;
    } else if (netIncome <= 550000) {
      taxAmount = 26500 + (netIncome - 150000) * 0.27;
    } else if (netIncome <= 1900000) {
      taxAmount = 134500 + (netIncome - 550000) * 0.35;
    } else {
      taxAmount = 607000 + (netIncome - 1900000) * 0.40;
    }
    
    const effectiveRate = (taxAmount / netIncome) * 100;
    
    setIncomeTaxResult({
      netIncome,
      taxAmount,
      effectiveRate
    });
  };
  
  return (
    <div className="py-6 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        {/* Başlık ve geri dön butonu */}
        <div className="flex items-center mb-8">
          <Link href="/dashboard/taxes" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
            <FaArrowLeft className="text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-text">Vergi Hesaplama Araçları</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KDV Hesaplama */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="flex items-center mb-6">
              <FaCalculator className="mr-3 text-blue-500" size={24} />
              <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text">KDV Hesaplama</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="vat-base" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  KDV Hariç Tutar (₺)
                </label>
                <input
                  id="vat-base"
                  type="number"
                  value={vatBase}
                  onChange={(e) => setVatBase(e.target.value)}
                  placeholder="KDV hariç tutarı girin"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="vat-rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  KDV Oranı (%)
                </label>
                <select
                  id="vat-rate"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="1">%1</option>
                  <option value="8">%8</option>
                  <option value="10">%10</option>
                  <option value="18">%18</option>
                  <option value="20">%20</option>
                </select>
              </div>
              
              <button
                onClick={calculateVAT}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Hesapla
              </button>
              
              {vatResult && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900/30">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Hesaplama Sonucu</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">KDV Hariç Tutar:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(vatResult.baseAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">KDV Tutarı ({vatRate}%):</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(vatResult.vatAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200 dark:border-blue-800">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Toplam Tutar:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(vatResult.totalAmount)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      href={`/dashboard/reports/vergi-beyanname/kdv?baseAmount=${vatResult.baseAmount}&vatAmount=${vatResult.vatAmount}&vatRate=${vatRate}`}
                      className="inline-flex items-center px-3 py-1.5 text-xs border border-blue-300 dark:border-blue-700 rounded-md shadow-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-dark-card hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none"
                    >
                      <FaFileInvoice className="mr-2" size={12} />
                      KDV Raporu Oluştur
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Gelir Vergisi Hesaplama */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="flex items-center mb-6">
              <FaCalculator className="mr-3 text-amber-500" size={24} />
              <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text">Gelir Vergisi Hesaplama</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="annual-income" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Yıllık Gelir (₺)
                </label>
                <input
                  id="annual-income"
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  placeholder="Yıllık geliri girin"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="expenses" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Giderler (₺)
                </label>
                <input
                  id="expenses"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="Giderleri girin (opsiyonel)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <button
                onClick={calculateIncomeTax}
                className="w-full py-2 px-4 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:bg-amber-700 dark:hover:bg-amber-600"
              >
                Hesapla
              </button>
              
              {incomeTaxResult && (
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-100 dark:border-amber-900/30">
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Hesaplama Sonucu</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Net Gelir:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(incomeTaxResult.netIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Vergi Tutarı:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(incomeTaxResult.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Efektif Vergi Oranı:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">%{incomeTaxResult.effectiveRate.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-amber-200 dark:border-amber-800">
                      <span className="font-medium text-gray-800 dark:text-gray-200">Vergi Sonrası Gelir:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(incomeTaxResult.netIncome - incomeTaxResult.taxAmount)}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      href={`/dashboard/reports/income/create?income=${incomeTaxResult.netIncome}&taxAmount=${incomeTaxResult.taxAmount}&effectiveRate=${incomeTaxResult.effectiveRate.toFixed(2)}`}
                      className="inline-flex items-center px-3 py-1.5 text-xs border border-amber-300 dark:border-amber-700 rounded-md shadow-sm font-medium text-amber-700 dark:text-amber-400 bg-white dark:bg-dark-card hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none"
                    >
                      <FaFileInvoice className="mr-2" size={12} />
                      Gelir Raporu Oluştur
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Vergi Dilimleri Bilgi Kartı */}
        <div className="mt-8 bg-white dark:bg-dark-card p-6 rounded-lg shadow-sm border border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-medium text-gray-900 dark:text-dark-text mb-4">2023 Gelir Vergisi Dilimleri</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Gelir Dilimi
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vergi Oranı
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vergi Tutarı
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">0 - 70.000 ₺</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">%15</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">0 - 10.500 ₺</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">70.001 - 150.000 ₺</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">%20</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">10.500 - 26.500 ₺</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">150.001 - 550.000 ₺</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">%27</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">26.500 - 134.500 ₺</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">550.001 - 1.900.000 ₺</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">%35</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">134.500 - 607.000 ₺</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">1.900.001 ₺ ve üzeri</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">%40</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">607.000 ₺ ve üzeri</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Not: Bu hesaplamalar yaklaşık değerlerdir ve sadece bilgi amaçlıdır. Kesin vergi hesaplamaları için lütfen bir mali müşavire danışın.
          </p>
        </div>
      </div>
    </div>
  );
} 