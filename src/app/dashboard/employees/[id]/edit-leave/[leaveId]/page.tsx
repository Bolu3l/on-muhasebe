"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  notes: string | null;
  days: number;
  status: string;
}

export default function EditEmployeeLeave() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;
  const leaveId = params?.leaveId as string;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form durumları
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    type: "ANNUAL",
    notes: ""
  });

  // İzin türleri
  const leaveTypes = [
    { value: "ANNUAL", label: "Yıllık İzin" },
    { value: "SICK", label: "Hastalık İzni" },
    { value: "MATERNITY", label: "Doğum İzni" },
    { value: "PATERNITY", label: "Babalık İzni" },
    { value: "BEREAVEMENT", label: "Cenaze İzni" },
    { value: "UNPAID", label: "Ücretsiz İzin" },
    { value: "OTHER", label: "Diğer" }
  ];

  // Çalışan ve izin bilgilerini getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (!employeeId || !leaveId) {
          setError("Gerekli bilgiler eksik");
          return;
        }
        
        // Çalışan bilgisini getir
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
        
        // İzin bilgisini getir
        const leaveResponse = await fetch(`/api/employees/${employeeId}/leaves/${leaveId}`);
        
        if (leaveResponse.status === 404) {
          setError("İzin kaydı bulunamadı");
          return;
        }
        
        if (!leaveResponse.ok) {
          throw new Error("İzin bilgileri getirilemedi");
        }
        
        const leaveData = await leaveResponse.json();
        setLeaveRequest(leaveData);
        
        // Form verilerini güncelle
        setFormData({
          startDate: new Date(leaveData.startDate).toISOString().split('T')[0],
          endDate: new Date(leaveData.endDate).toISOString().split('T')[0],
          type: leaveData.type,
          notes: leaveData.notes || ""
        });
        
      } catch (err) {
        console.error("Veriler getirilirken hata oluştu:", err);
        setError("Veriler yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [employeeId, leaveId]);

  // Form alanı değişikliklerini işle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // İzin gün sayısını hesapla
  const calculateDays = () => {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    // Bitiş tarihi başlangıç tarihinden önce mi kontrol et
    if (endDate < startDate) {
      return 0;
    }
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil
    
    return diffDays;
  };

  // İzni sil
  const handleDelete = async () => {
    if (!confirm("Bu izin kaydını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      return;
    }
    
    try {
      setSaving(true);
      
      const response = await fetch(`/api/employees/${employeeId}/leaves/${leaveId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "İzin silinirken bir hata oluştu");
      }
      
      // Başarılı silme sonrası personel detay sayfasına yönlendir
      router.push(`/dashboard/employees/${employeeId}`);
      
    } catch (error) {
      console.error("İzin silinirken hata oluştu:", error);
      setError(error instanceof Error ? error.message : "İzin silinirken bir hata oluştu");
      setSaving(false);
    }
  };

  // Formu gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      // Bitiş tarihi başlangıç tarihinden önce mi kontrol et
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        throw new Error("Bitiş tarihi başlangıç tarihinden önce olamaz");
      }
      
      // API'ye izin güncellemesi gönder
      const response = await fetch(`/api/employees/${employeeId}/leaves/${leaveId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "İzin güncellenirken bir hata oluştu");
      }
      
      // Başarılı kayıt sonrası personel detay sayfasına yönlendir
      router.push(`/dashboard/employees/${employeeId}`);
      
    } catch (error) {
      console.error("İzin güncellenirken hata oluştu:", error);
      setError(error instanceof Error ? error.message : "İzin güncellenirken bir hata oluştu");
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

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{error}</h2>
        <Link 
          href={`/dashboard/employees/${employeeId}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Personel Detayına Dön
        </Link>
      </div>
    );
  }

  if (!employee || !leaveRequest) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Bilgiler bulunamadı</h2>
        <Link 
          href="/dashboard/employees" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Personel Listesine Dön
        </Link>
      </div>
    );
  }

  const dayCount = calculateDays();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">İzin Düzenle: {employee.name}</h1>
        <div className="flex space-x-3">
          <Link 
            href={`/dashboard/employees/${employeeId}`} 
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
          >
            İptal
          </Link>
          <button
            onClick={handleDelete}
            disabled={saving}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'İşleniyor...' : 'İzni Sil'}
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
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">İzin Bilgileri</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* İzin Türü */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                İzin Türü <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                {leaveTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            {/* Mevcut İzin Bilgisi */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <p className="text-sm text-gray-700 dark:text-gray-300">Mevcut İzin Süresi: <span className="font-medium">{leaveRequest.days} gün</span></p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Durum: <span className="font-medium">Onaylandı</span></p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
            
            {/* Bitiş Tarihi */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bitiş Tarihi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            {/* Toplam Gün */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Yeni Toplam Gün
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white">
                {dayCount} gün
              </div>
            </div>
          </div>
          
          {/* Notlar */}
          <div className="mt-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notlar
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="İzin hakkında ek bilgiler..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || dayCount === 0}
            className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium ${
              (saving || dayCount === 0) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
} 