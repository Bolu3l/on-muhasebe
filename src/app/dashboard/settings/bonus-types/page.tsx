"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BonusType {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function BonusTypesPage() {
  const [bonusTypes, setBonusTypes] = useState<BonusType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true
  });
  
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusChanged, setStatusChanged] = useState(false);
  
  // Prim türlerini getir
  useEffect(() => {
    const fetchBonusTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/bonus-types');
        
        if (!response.ok) {
          throw new Error('Prim türleri getirilemedi');
        }
        
        const data = await response.json();
        setBonusTypes(data);
      } catch (err) {
        console.error('Prim türlerini getirme hatası:', err);
        setError('Prim türleri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBonusTypes();
  }, [statusChanged]);
  
  // Form alanlarını değiştir
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  // Yeni prim türü ekle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const url = editingId 
        ? `/api/bonus-types/${editingId}`
        : '/api/bonus-types';
        
      const method = editingId ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prim türü kaydedilemedi');
      }
      
      // Başarılı kayıt sonrası listeyi güncelle
      setStatusChanged(!statusChanged);
      
      // Formu sıfırla
      setFormData({
        name: "",
        description: "",
        isActive: true
      });
      
      setShowAddForm(false);
      setEditingId(null);
      
    } catch (err) {
      console.error('Prim türü kaydetme hatası:', err);
      setError((err as Error).message || 'Prim türü kaydedilemedi');
    } finally {
      setSaving(false);
    }
  };
  
  // Prim türünü düzenlemeye başla
  const handleEdit = (bonusType: BonusType) => {
    setFormData({
      name: bonusType.name,
      description: bonusType.description || "",
      isActive: bonusType.isActive
    });
    setEditingId(bonusType.id);
    setShowAddForm(true);
  };
  
  // Prim türünün durumunu değiştir (aktif/pasif)
  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/bonus-types/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isActive: !currentStatus
        })
      });
      
      if (!response.ok) {
        throw new Error('Durum değiştirilemedi');
      }
      
      // Listeyi güncelle
      setStatusChanged(!statusChanged);
      
    } catch (err) {
      console.error('Durum değiştirme hatası:', err);
      setError('Durum değiştirilirken bir hata oluştu');
    }
  };
  
  // Prim türünü sil
  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu prim türünü silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/bonus-types/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prim türü silinemedi');
      }
      
      // Listeyi güncelle
      setStatusChanged(!statusChanged);
      
      // Eğer silinen, düzenlenmekte olan kayıtsa formu sıfırla
      if (editingId === id) {
        setFormData({
          name: "",
          description: "",
          isActive: true
        });
        setEditingId(null);
        setShowAddForm(false);
      }
      
    } catch (err) {
      console.error('Prim türü silme hatası:', err);
      setError((err as Error).message || 'Prim türü silinemedi');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prim Türleri</h1>
        <button 
          onClick={() => {
            setShowAddForm(!showAddForm);
            if (!showAddForm) {
              setFormData({
                name: "",
                description: "",
                isActive: true
              });
              setEditingId(null);
            }
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          {showAddForm ? 'İptal' : 'Yeni Prim Türü Ekle'}
        </button>
      </div>
      
      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Prim türü ekleme/düzenleme formu */}
      {showAddForm && (
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingId ? 'Prim Türünü Düzenle' : 'Yeni Prim Türü Ekle'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prim Türü Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
                placeholder="Örn: Satış Primi, Yıl Sonu Primi"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
                placeholder="Bu prim türü hakkında açıklama"
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Aktif
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium disabled:opacity-50"
              >
                {saving ? 'Kaydediliyor...' : (editingId ? 'Güncelle' : 'Ekle')}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Prim türleri listesi */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bonusTypes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-card shadow-sm rounded-lg border border-gray-200 dark:border-dark-border">
          <p className="text-gray-500 dark:text-gray-400">Henüz prim türü eklenmemiş</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          >
            Yeni Prim Türü Ekle
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prim Türü
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Açıklama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
              {bonusTypes.map((bonusType) => (
                <tr key={bonusType.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{bonusType.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{bonusType.description || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        bonusType.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {bonusType.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => toggleStatus(bonusType.id, bonusType.isActive)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        {bonusType.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                      </button>
                      <button
                        onClick={() => handleEdit(bonusType)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(bonusType.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Ayarlar sayfasına geri dön linki */}
      <div className="mt-6">
        <Link 
          href="/dashboard/settings"
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          &larr; Ayarlar'a Geri Dön
        </Link>
      </div>
    </div>
  );
} 