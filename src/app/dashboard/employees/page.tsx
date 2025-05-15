"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  salary: number;
  department: string;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED";
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Veritabanından personel verilerini çek
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/employees');
        
        if (!response.ok) {
          throw new Error('Personel verileri getirilemedi');
        }
        
        const data = await response.json();
        setEmployees(data);
        setError(null);
      } catch (err) {
        console.error('Personel verilerini getirme hatası:', err);
        setError('Personel verileri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  // Örnek departmanlar
  const departments = ["Muhasebe", "Satış", "Teknik", "İnsan Kaynakları", "Lojistik", "Müşteri Hizmetleri"];

  // Arama ve filtreleme
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Toplam maaş hesaplama
  const totalSalary = filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personel Yönetimi</h1>
        <Link 
          href="/dashboard/employees/new" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
        >
          Yeni Personel Ekle
        </Link>
      </div>
      
      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Yükleniyor göstergesi */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Özet Kartlar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Personel</h2>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{filteredEmployees.length}</p>
            </div>
            
            <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Aylık Toplam Maaş</h2>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">₺{totalSalary.toLocaleString()}</p>
            </div>
            
            <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ortalama Maaş</h2>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                ₺{filteredEmployees.length ? Math.round(totalSalary / filteredEmployees.length).toLocaleString() : 0}
              </p>
            </div>
          </div>
          
          {/* Arama ve Filtreler */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Personel ara..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-dark-card dark:text-white"
              >
                <option value="all">Tüm Departmanlar</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Personel Tablosu */}
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-dark-card shadow-sm rounded-lg border border-gray-200 dark:border-dark-border">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || filterDepartment !== "all" 
                  ? "Arama kriterlerine uygun personel bulunamadı."
                  : "Henüz personel kaydı bulunmamaktadır. Yeni personel eklemek için 'Yeni Personel Ekle' butonunu kullanabilirsiniz."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-dark-card shadow-sm rounded-lg border border-gray-200 dark:border-dark-border">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Personel</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pozisyon</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Departman</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Başlangıç Tarihi</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Maaş</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-sm font-medium text-blue-800 dark:text-blue-200">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{employee.position}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{employee.department}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {new Date(employee.startDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">₺{employee.salary.toLocaleString()}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <StatusBadge status={employee.status} />
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                          Detay
                        </Link>
                        <Link href={`/dashboard/employees/${employee.id}/edit`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                          Düzenle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Durum için renk ve metin ataması
function StatusBadge({ status }: { status: string }) {
  let className = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full ";
  let label = "";

  switch (status) {
    case "ACTIVE":
      className += "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      label = "Aktif";
      break;
    case "INACTIVE":
      className += "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      label = "Pasif";
      break;
    case "ON_LEAVE":
      className += "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      label = "İzinde";
      break;
    case "TERMINATED":
      className += "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      label = "İşten Ayrıldı";
      break;
    default:
      className += "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      label = status;
  }

  return <span className={className}>{label}</span>;
} 