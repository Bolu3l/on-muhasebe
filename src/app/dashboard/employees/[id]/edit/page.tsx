"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface EmployeeData {
  id: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  socialSecurityNumber: string | null;
  bankAccount: string | null;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED";
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Form durumları
  const [formData, setFormData] = useState<EmployeeData | null>(null);
  
  // Personel verilerini yükle
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/employees/${employeeId}`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Personel bilgileri getirilemedi');
        }
        
        const data = await response.json();
        
        // API'den gelen tarih formatını form için düzenle
        const formattedData = {
          ...data,
          // YYYY-MM-DDT... formatından YYYY-MM-DD formatına dönüştür
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
        };
        
        setFormData(formattedData);
      } catch (err) {
        console.error('Personel verilerini getirme hatası:', err);
        setError('Personel bilgileri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [employeeId]);

  const departments = ["Muhasebe", "Satış", "Teknik", "İnsan Kaynakları", "Lojistik", "Müşteri Hizmetleri", "Yönetim"];
  const statusOptions = [
    { value: "ACTIVE", label: "Aktif" },
    { value: "INACTIVE", label: "Pasif" },
    { value: "ON_LEAVE", label: "İzinde" },
    { value: "TERMINATED", label: "İşten Ayrıldı" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    
    // Maaş için sayısal değer kontrolü
    if (name === "salary") {
      // Sadece sayı girişine izin ver
      if (value === "" || /^\d+$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value === "" ? 0 : parseInt(value),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setSaving(true);
    setError(null);
    
    try {
      // API'ye güncelleme isteği gönder
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Personel güncellenirken bir hata oluştu');
      }
      
      // Başarılı güncelleme sonrası detay sayfasına yönlendir
      router.push(`/dashboard/employees/${employeeId}`);
      
    } catch (error) {
      console.error("Personel güncellenirken hata oluştu:", error);
      setError(error instanceof Error ? error.message : 'Personel güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  // Sayfa yüklenirken
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Personel bulunamadıysa
  if (notFound) {
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

  // Veri yoksa (beklenmedik bir durum)
  if (!formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personel verisi yüklenemedi</h2>
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personel Düzenle: {formData.name}</h1>
        <div className="flex space-x-3">
          <Link 
            href={`/dashboard/employees/${employeeId}`} 
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
          >
            İptal
          </Link>
          <button
            onClick={async () => {
              if (window.confirm("Bu personeli silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
                try {
                  setSaving(true);
                  const response = await fetch(`/api/employees/${employeeId}`, {
                    method: 'DELETE',
                  });
                  
                  if (!response.ok) {
                    throw new Error('Personel silinemedi');
                  }
                  
                  router.push('/dashboard/employees');
                } catch (error) {
                  console.error("Personel silinirken hata oluştu:", error);
                  setError('Personel silinirken bir hata oluştu');
                  setSaving(false);
                }
              }
            }}
            disabled={saving}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
          >
            Sil
          </button>
        </div>
      </div>

      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Temel Bilgiler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ad Soyad */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Pozisyon */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pozisyon <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Departman */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Departman <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                <option value="">Seçiniz</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            {/* Başlangıç Tarihi */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Başlangıç Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Maaş */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maaş (₺) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary.toString()}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Durum */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durum <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">İletişim Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Telefon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefon
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Adres */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adres
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resmi Bilgiler</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* T.C. Kimlik No */}
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                T.C. Kimlik No
              </label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* SGK No */}
            <div>
              <label htmlFor="socialSecurityNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SGK No
              </label>
              <input
                type="text"
                id="socialSecurityNumber"
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Banka Hesap No */}
            <div>
              <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Banka Hesap No
              </label>
              <input
                type="text"
                id="bankAccount"
                name="bankAccount"
                value={formData.bankAccount || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 