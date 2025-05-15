"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

interface BonusType {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
}

export default function AddEmployeeBonus() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [bonusTypes, setBonusTypes] = useState<BonusType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form durumları
  const [formData, setFormData] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    description: "",
    paymentMethod: "bank_transfer",
    bonusTypeId: ""
  });

  // Ödeme yöntemleri
  const paymentMethods = [
    { value: "bank_transfer", label: "Banka Transferi" },
    { value: "cash", label: "Nakit" },
    { value: "check", label: "Çek" },
    { value: "other", label: "Diğer" }
  ];

  // Çalışan ve prim türlerini getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!employeeId) {
          setError("Çalışan ID bilgisi bulunamadı");
          return;
        }
        
        // Çalışan bilgilerini getir
        const employeeResponse = await fetch(`/api/employees/${employeeId}`);
        
        if (employeeResponse.status === 404) {
          setError("Çalışan bulunamadı");
          return;
        }
        
        if (!employeeResponse.ok) {
          throw new Error("Çalışan bilgileri getirilemedi");
        }
        
        const employeeData = await employeeResponse.json();
        setEmployee(employeeData);
        
        // Aktif prim türlerini getir
        const bonusTypesResponse = await fetch('/api/bonus-types?active=true');
        
        if (!bonusTypesResponse.ok) {
          throw new Error("Prim türleri getirilemedi");
        }
        
        const bonusTypesData = await bonusTypesResponse.json();
        setBonusTypes(bonusTypesData);
        
      } catch (err) {
        console.error("Veri getirme hatası:", err);
        setError("Veriler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [employeeId]);

  // Form alanı değişikliklerini işle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Formu gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Miktar doğrulama
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Geçerli bir prim miktarı girmelisiniz");
      }
      
      // API'ye prim ödemesi gönder
      const response = await fetch(`/api/employees/${employeeId}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount,
          type: "BONUS", // Prim ödemesi olduğunu belirt
          status: "PAID",  // Otomatik olarak ödenmiş kabul et
          bonusTypeId: formData.bonusTypeId || null // Prim türü ID'si
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Prim ödemesi kaydedilirken bir hata oluştu");
      }
      
      // Başarılı kayıt sonrası mesaj göster
      setSuccess("Prim ödemesi başarıyla kaydedildi");
      // Formu sıfırla
      setFormData({
        amount: "",
        paymentDate: new Date().toISOString().split('T')[0],
        description: "",
        paymentMethod: "bank_transfer",
        bonusTypeId: ""
      });
      
      // 2 saniye sonra personel detay sayfasına yönlendir
      setTimeout(() => {
        router.push(`/dashboard/employees/${employeeId}`);
      }, 2000);
      
    } catch (error) {
      console.error("Prim ödemesi kaydedilirken hata oluştu:", error);
      setError(error instanceof Error ? error.message : "Prim ödemesi kaydedilirken bir hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
        <Link 
          href="/dashboard/employees" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Personel Listesine Dön
        </Link>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personel bulunamadı</h2>
        <Link 
          href="/dashboard/employees" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Personel Listesine Dön
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prim Ödemesi: {employee.name}</h1>
        <Link 
          href={`/dashboard/employees/${employeeId}`} 
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
        >
          İptal
        </Link>
      </div>

      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Başarı mesajı */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Prim Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personel ve Mevcut Maaş Bilgisi */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Pozisyon:</span> {employee.position}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Departman:</span> {employee.department}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-medium">Mevcut Maaş:</span> ₺{employee.salary.toLocaleString()}
              </p>
            </div>
            
            {/* Prim Miktarı */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prim Miktarı (₺) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                placeholder="Örn: 5000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Prim Türü */}
            <div>
              <label htmlFor="bonusTypeId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prim Türü <span className="text-red-500">*</span>
              </label>
              <select
                id="bonusTypeId"
                name="bonusTypeId"
                value={formData.bonusTypeId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                <option value="">Seçiniz</option>
                {bonusTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
                <option value="other">Diğer</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                <Link href="/dashboard/settings/bonus-types" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Prim türlerini yönet &rarr;
                </Link>
              </p>
            </div>

            {/* Ödeme Tarihi */}
            <div>
              <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ödeme Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="paymentDate"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Ödeme Yöntemi */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ödeme Yöntemi <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Açıklama */}
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Açıklama
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Prim ödemesi hakkında notlar..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium ${
              saving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Kaydediliyor...' : 'Prim Ödemesini Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 