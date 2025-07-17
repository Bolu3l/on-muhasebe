"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getAuthHeaders } from '@/lib/auth';

// Müşteri veri modeli
interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  companyName: string | null;
  address: string | null;
  city: string | null;
  customerType: "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT";
  isActive: boolean;
  createdAt: string;
  taxNumber: string | null;
  sector: string | null;
  customerCode: string;
  paymentMethod: string | null;
  paymentTerms: string | null;
  creditLimit: number | null;
  discountRate: number;
}

export default function CustomerManagementPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "active" | "inactive">("all");
  const [filterCustomerType, setFilterCustomerType] = useState<"all" | "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT">("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    individual: 0,
    corporate: 0,
    government: 0
  });

  const searchParams = useSearchParams();

  // Component mount kontrolü
  useEffect(() => {
    setMounted(true);
    
    // Success parametresi var mı kontrol et
    if (searchParams && searchParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
  }, [searchParams]);

  // Müşterileri yükle fonksiyonu
  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      
      const authHeaders = getAuthHeaders();
      const response = await fetch('/api/customers', {
        headers: authHeaders
      });
      
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
        
        // İstatistikleri hesapla
        const stats = {
          total: data.length,
          active: data.filter((c: Customer) => c.isActive).length,
          inactive: data.filter((c: Customer) => !c.isActive).length,
          individual: data.filter((c: Customer) => c.customerType === 'INDIVIDUAL').length,
          corporate: data.filter((c: Customer) => c.customerType === 'CORPORATE').length,
          government: data.filter((c: Customer) => c.customerType === 'GOVERNMENT').length
        };
        setStats(stats);
      } else {
        console.error('Müşteri verileri yüklenemedi');
      }
    } catch (err) {
      console.error('Müşteri verileri yüklenirken hata:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Müşterileri yükle
  useEffect(() => {
    if (mounted) {
      loadCustomers();
    }
  }, [mounted]);

  // Success parametresi geldiğinde müşteri listesini yenile
  useEffect(() => {
    if (searchParams && searchParams.get('success') === 'true' && mounted) {
      loadCustomers();
    }
  }, [searchParams, mounted]);

  // Filtreleme fonksiyonu
  useEffect(() => {
    let filtered = customers;

    // Arama terimi filtresi
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.companyName && customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.sector && customer.sector.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.taxNumber && customer.taxNumber.includes(searchTerm)) ||
        customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Durum filtresi
    if (filterType !== "all") {
      filtered = filtered.filter(customer => 
        filterType === "active" ? customer.isActive : !customer.isActive
      );
    }

    // Müşteri tipi filtresi
    if (filterCustomerType !== "all") {
      filtered = filtered.filter(customer => customer.customerType === filterCustomerType);
    }

    setFilteredCustomers(filtered);
  }, [searchTerm, customers, filterType, filterCustomerType]);

  // Müşteri silme
  const handleDeleteCustomer = async (customer: Customer) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: 'DELETE',
        headers: authHeaders
      });

      if (response.ok) {
        setShowSuccessMessage(true);
        loadCustomers();
        setShowDeleteModal(false);
        setCustomerToDelete(null);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      } else {
        console.error('Müşteri silinemedi');
      }
    } catch (error) {
      console.error('Müşteri silme hatası:', error);
    }
  };

  // Müşteri durumunu değiştir
  const toggleCustomerStatus = async (customer: Customer) => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch(`/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          isActive: !customer.isActive
        })
      });

      if (response.ok) {
        loadCustomers();
      } else {
        console.error('Müşteri durumu güncellenemedi');
      }
    } catch (error) {
      console.error('Müşteri durumu güncelleme hatası:', error);
    }
  };

  // Hydration sorunlarını önlemek için
  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Müşteri Yönetimi</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Müşterilerinizi görüntüleyin, düzenleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <Link
            href="/dashboard/settings"
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← Ayarlara Dön
          </Link>
          <Link
            href="/dashboard/customers/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Müşteri
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            İşlem başarıyla tamamlandı!
          </div>
        </div>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Aktif</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pasif</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Bireysel</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.individual}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Kurumsal</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.corporate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Devlet</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.government}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtreler */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Müşteri ara (ad, email, şirket, vergi no, müşteri kodu...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "active" | "inactive")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>

            <select
              value={filterCustomerType}
              onChange={(e) => setFilterCustomerType(e.target.value as "all" | "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tüm Tipler</option>
              <option value="INDIVIDUAL">Bireysel</option>
              <option value="CORPORATE">Kurumsal</option>
              <option value="GOVERNMENT">Devlet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Müşteri Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tür
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vergi/TC No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-medium">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {customer.companyName || customer.customerCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        customer.customerType === 'INDIVIDUAL' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          : customer.customerType === 'CORPORATE'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
                      }`}>
                        {customer.customerType === 'INDIVIDUAL' ? 'Bireysel' : 
                         customer.customerType === 'CORPORATE' ? 'Kurumsal' : 'Devlet'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {customer.email || '-'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {customer.phone || customer.mobile || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {customer.taxNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleCustomerStatus(customer)}
                        className={`inline-flex px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                          customer.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                        }`}
                      >
                        {customer.isActive ? 'Aktif' : 'Pasif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(customer.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/dashboard/customers/${customer.id}/edit`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => {
                            setCustomerToDelete(customer);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm || filterType !== "all" || filterCustomerType !== "all" 
                      ? "Filtre kriterlerine uygun müşteri bulunamadı." 
                      : "Henüz müşteri bulunmuyor."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Sayfalama bilgisi */}
        {!isLoading && filteredCustomers.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Toplam {filteredCustomers.length} müşteri gösteriliyor
              {filteredCustomers.length !== customers.length && (
                <span> (Toplam {customers.length} müşteri içinden)</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Silme Modalı */}
      {showDeleteModal && customerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Müşteriyi Sil
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bu işlem geri alınamaz
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>{customerToDelete.name}</strong> isimli müşteriyi silmek istediğinizden emin misiniz?
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Bu müşteriye ait tüm veriler silinecektir.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCustomerToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customerToDelete)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 