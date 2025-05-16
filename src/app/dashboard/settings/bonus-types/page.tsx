"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BonusType {
  id: string;
  name: string;
  code: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BonusTypesPage() {
  const [bonusTypes, setBonusTypes] = useState<BonusType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form durumları
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: ""
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Silme dialogu durumları
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BonusType | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  // Prim tiplerini getir
  const fetchBonusTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/bonus-types');
      
      if (!response.ok) {
        throw new Error('Prim tipleri getirilemedi');
      }
      
      const data = await response.json();
      
      // Prim tiplerini sırala: önce özel tipler (varsayılan olmayanlar), sonra varsayılanlar
      // Her grup kendi içinde alfabetik olarak sıralanır
      const sortedData = data.sort((a: BonusType, b: BonusType) => {
        // Önce varsayılan/özel durumuna göre sırala
        if (a.isDefault !== b.isDefault) {
          return a.isDefault ? 1 : -1; // Varsayılan olmayanlar (özel tipler) önce
        }
        // Sonra ada göre alfabetik sırala
        return a.name.localeCompare(b.name, 'tr');
      });
      
      setBonusTypes(sortedData);
    } catch (err) {
      console.error('Prim tipleri getirilirken hata:', err);
      setError('Prim tipleri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };
  
  // Sayfa yüklendiğinde prim tiplerini getir
  useEffect(() => {
    fetchBonusTypes();
  }, []);
  
  // Prim tipinin durumunu değiştir (aktif/pasif)
  const toggleBonusTypeStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/bonus-types/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Prim tipi durumu güncellenemedi');
      }
      
      // Listeyi güncelle
      setBonusTypes(bonusTypes.map(type => 
        type.id === id ? { ...type, isActive: !currentStatus } : type
      ));
      
    } catch (err) {
      console.error('Prim tipi durumu güncellenirken hata:', err);
      setError('Prim tipi durumu güncellenirken bir hata oluştu');
    }
  };
  
  // Silme onay modalını göster
  const openDeleteModal = (bonusType: BonusType) => {
    setDeleteTarget(bonusType);
    setShowDeleteModal(true);
  };
  
  // Silme modalını kapat
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };
  
  // Prim tipini sil
  const deleteBonusType = async () => {
    if (!deleteTarget) return;
    
    try {
      setDeleting(true);
      const response = await fetch(`/api/bonus-types/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Prim tipi silinemedi');
      }
      
      // Listeden kaldır
      setBonusTypes(bonusTypes.filter(type => type.id !== deleteTarget.id));
      
      // Başarı mesajı göster ve modalı kapat
      setFormSuccess(`"${deleteTarget.name}" başarıyla silindi`);
      closeDeleteModal();
      
      // 3 saniye sonra başarı mesajını temizle
      setTimeout(() => {
        setFormSuccess(null);
      }, 3000);
      
    } catch (err) {
      console.error('Prim tipi silinirken hata:', err);
      setFormError(err instanceof Error ? err.message : 'Prim tipi silinirken bir hata oluştu');
      closeDeleteModal();
      
      // 3 saniye sonra hata mesajını temizle
      setTimeout(() => {
        setFormError(null);
      }, 3000);
    } finally {
      setDeleting(false);
    }
  };
  
  // Form alanlarını değiştir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Kod için otomatik dönüşüm (boşlukları altçizgiye dönüştür ve büyük harfe çevir)
    if (name === 'code') {
      const formattedCode = value.replace(/\s+/g, '_').toUpperCase();
      setFormData({
        ...formData,
        [name]: formattedCode
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Formu gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setSaving(true);
    
    try {
      // Form doğrulama
      if (!formData.name.trim()) {
        throw new Error('Prim tipi adı boş olamaz');
      }
      
      if (!formData.code.trim()) {
        throw new Error('Prim tipi kodu boş olamaz');
      }
      
      // API'ye gönder
      const response = await fetch('/api/bonus-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prim tipi eklenirken bir hata oluştu');
      }
      
      // Başarılı
      setFormSuccess('Prim tipi başarıyla eklendi');
      setFormData({ name: "", code: "" });
      
      // Listeyi güncelle - yeni eklenen öğe en üstte görünsün
      setBonusTypes([data, ...bonusTypes]);
      
      // Formu kapat
      setTimeout(() => {
        setShowForm(false);
        setFormSuccess(null);
      }, 2000);
      
    } catch (err) {
      console.error('Prim tipi eklenirken hata:', err);
      setFormError(err instanceof Error ? err.message : 'Prim tipi eklenirken bir hata oluştu');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prim Tipleri Yönetimi</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          {showForm ? 'İptal' : 'Yeni Prim Tipi Ekle'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {formSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p>{formSuccess}</p>
        </div>
      )}
      
      {formError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{formError}</p>
        </div>
      )}
      
      {/* Yeni Prim Tipi Ekleme Formu */}
      {showForm && (
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Yeni Prim Tipi Ekle</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prim Tipi Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Örnek: Proje Tamamlama Primi"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prim Tipi Kodu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Örnek: PROJECT_COMPLETION"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Boşluklar otomatik olarak altçizgi (_) ile değiştirilir ve büyük harfe çevrilir.
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium ${
                  saving ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Kaydediliyor...' : 'Prim Tipini Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Prim Tipleri Listesi */}
      <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-dark-border">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Prim Tipi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Kod
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-dark-border">
            {bonusTypes.length > 0 ? (
              bonusTypes.map((bonusType) => (
                <tr key={bonusType.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {bonusType.name}
                    {bonusType.isDefault && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Varsayılan
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {bonusType.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bonusType.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {bonusType.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleBonusTypeStatus(bonusType.id, bonusType.isActive)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                    >
                      {bonusType.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                    </button>
                    {!bonusType.isDefault && (
                      <button
                        onClick={() => openDeleteModal(bonusType)}
                        className="px-2 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded mr-1 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                      >
                        Sil
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Henüz prim tipi bulunmuyor
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6">
        <Link 
          href="/dashboard/settings" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Ayarlar Sayfasına Dön
        </Link>
      </div>
      
      {/* Silme Onay Modalı */}
      {showDeleteModal && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Prim Tipini Sil</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              <strong>"{deleteTarget.name}"</strong> prim tipini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
              >
                İptal
              </button>
              <button
                onClick={deleteBonusType}
                disabled={deleting}
                className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium ${
                  deleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {deleting ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 