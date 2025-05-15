"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  salary: number;
  department: string;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED";
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxId?: string | null;
  socialSecurityNumber?: string | null;
  bankAccount?: string | null;
  salaryPayments?: SalaryPayment[];
  leaveRequests?: LeaveRequest[];
}

interface SalaryPayment {
  id: string;
  amount: number;
  paymentDate: string;
  description: string | null;
  status: string;
  type: string;
  notes?: string | null;
  bonusType?: {
    id: string;
    name: string;
  } | null;
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  notes: string | null;
  days?: number;
}

interface LeaveBalance {
  annualLeaveTotal: number;
  annualLeaveUsed: number;
  annualLeaveRemaining: number;
  sickLeaveTotal: number;
  sickLeaveUsed: number;
  sickLeaveRemaining: number;
}

export default function EmployeeDetail() {
  const router = useRouter();
  const params = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!params || !params.id) {
          setError('Personel ID bilgisi bulunamadı');
          setEmployee(null);
          return;
        }
        
        const response = await fetch(`/api/employees/${params.id}`);
        
        if (response.status === 404) {
          setEmployee(null);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Personel bilgileri getirilemedi');
        }
        
        const data = await response.json();
        setEmployee(data);
        
        // Personel izin hesaplamaları
        if (data && data.leaveRequests) {
          calculateLeaveBalance(data.leaveRequests);
        }
      } catch (err) {
        console.error('Personel verilerini getirme hatası:', err);
        setError('Personel bilgileri yüklenirken bir hata oluştu');
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployee();
  }, [params]);

  // İzin bakiyesi hesaplama fonksiyonu
  const calculateLeaveBalance = (leaveRequests: LeaveRequest[]) => {
    // Türkiye'de yasal olarak en az 14 gün yıllık izin hakkı
    const defaultAnnualLeave = 14;
    // Örnek olarak 5 gün hastalık izni
    const defaultSickLeave = 5;
    
    // Çalışma süresine göre izin günü artırma (1-5 yıl: 14 gün, 5-15 yıl: 20 gün, 15+ yıl: 26 gün)
    let annualLeaveTotal = defaultAnnualLeave;
    
    if (employee) {
      const startDate = new Date(employee.startDate);
      const now = new Date();
      const yearsWorked = now.getFullYear() - startDate.getFullYear();
      
      if (yearsWorked >= 5 && yearsWorked < 15) {
        annualLeaveTotal = 20;
      } else if (yearsWorked >= 15) {
        annualLeaveTotal = 26;
      }
    }
    
    // Kullanılan izinleri hesapla
    // ANNUAL tipindeki onaylanmış izinleri say
    const annualLeaveUsed = leaveRequests
      .filter(leave => leave.type === "ANNUAL" && leave.status === "APPROVED")
      .reduce((total, leave) => {
        // days alanı varsa kullan, yoksa başlangıç ve bitiş günü arasındaki farkı hesapla
        if (leave.days !== undefined) {
          return total + leave.days;
        } else {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil
          return total + diffDays;
        }
      }, 0);
    
    // SICK tipindeki onaylanmış izinleri say
    const sickLeaveUsed = leaveRequests
      .filter(leave => leave.type === "SICK" && leave.status === "APPROVED")
      .reduce((total, leave) => {
        if (leave.days !== undefined) {
          return total + leave.days;
        } else {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          return total + diffDays;
        }
      }, 0);
    
    // İzin bakiyesini hesapla ve state'e kaydet
    setLeaveBalance({
      annualLeaveTotal: annualLeaveTotal,
      annualLeaveUsed: annualLeaveUsed,
      annualLeaveRemaining: annualLeaveTotal - annualLeaveUsed,
      sickLeaveTotal: defaultSickLeave,
      sickLeaveUsed: sickLeaveUsed,
      sickLeaveRemaining: defaultSickLeave - sickLeaveUsed
    });
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
    <div className="space-y-6">
      {/* Üst Başlık ve İşlemler */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{employee.position} | {employee.department}</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href={`/dashboard/employees/${employee.id}/add-leave`} 
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
          >
            İzin Ekle
          </Link>
          <Link 
            href={`/dashboard/employees/${employee.id}/edit`} 
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
          >
            Düzenle
          </Link>
          <Link 
            href={`/dashboard/employees/${employee.id}/add-bonus`} 
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium"
          >
            Prim Öde
          </Link>
          <button 
            onClick={() => alert('Bu özellik henüz aktif değil')} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
          >
            Maaş Öde
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personel Bilgileri */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personel Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">İletişim Bilgileri</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">E-posta:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.email || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">Telefon:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.phone || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">Adres:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.address || '-'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resmi Bilgiler</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">T.C. No:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.taxId || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">SGK No:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.socialSecurityNumber || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-24">Banka Hesabı:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{employee.bankAccount || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maaş Ödemeleri */}
          <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ödeme Geçmişi</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tarih</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tür</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Açıklama</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Miktar</th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                  {employee.salaryPayments && employee.salaryPayments.length > 0 ? (
                    employee.salaryPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                          {new Date(payment.paymentDate).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                          {payment.type === 'SALARY' && 'Maaş'}
                          {payment.type === 'BONUS' && (
                            payment.bonusType 
                              ? `Prim (${payment.bonusType.name})` 
                              : 'Prim'
                          )}
                          {payment.type === 'ALLOWANCE' && 'Ödenek'}
                          {payment.type === 'ADVANCE' && 'Avans'}
                          {payment.type === 'OTHER' && 'Diğer'}
                        </td>
                        <td className="py-3 text-sm text-gray-700 dark:text-gray-300">{payment.description || payment.notes || '-'}</td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">
                          ₺{payment.amount.toLocaleString()}
                        </td>
                        <td className="py-3">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-3 text-sm text-center text-gray-500 dark:text-gray-400">
                        Henüz ödeme kaydı bulunmuyor
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sağ Taraftaki Özet Alanları */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Çalışan Özeti</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Durum</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  employee.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : employee.status === 'ON_LEAVE'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {employee.status === 'ACTIVE' 
                    ? 'Aktif' 
                    : employee.status === 'INACTIVE' 
                    ? 'Pasif'
                    : employee.status === 'ON_LEAVE'
                    ? 'İzinde'
                    : 'İşten Ayrıldı'}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Başlangıç Tarihi</h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(employee.startDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Çalışma Süresi</h3>
                <p className="text-sm text-gray-900 dark:text-white">
                  {calculateWorkDuration(employee.startDate)}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mevcut Maaş</h3>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  ₺{employee.salary.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">İzin Bilgileri</h2>
            
            {/* İzin Bakiyesi */}
            {leaveBalance && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">İzin Bakiyesi</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Yıllık İzin</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{leaveBalance.annualLeaveRemaining} gün</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Toplam: {leaveBalance.annualLeaveTotal} gün | Kullanılan: {leaveBalance.annualLeaveUsed} gün
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Hastalık İzni</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{leaveBalance.sickLeaveRemaining} gün</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Toplam: {leaveBalance.sickLeaveTotal} gün | Kullanılan: {leaveBalance.sickLeaveUsed} gün
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* İzin Geçmişi */}
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">İzin Geçmişi</h3>
            {employee.leaveRequests && employee.leaveRequests.length > 0 ? (
              <div className="space-y-3">
                {employee.leaveRequests.map((leave) => (
                  <div key={leave.id} className="border-b border-gray-200 dark:border-dark-border pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{leave.type}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(leave.startDate).toLocaleDateString('tr-TR')} - {new Date(leave.endDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link 
                          href={`/dashboard/employees/${employee.id}/edit-leave/${leave.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          leave.status === 'APPROVED' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : leave.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {leave.status === 'APPROVED' 
                            ? 'Onaylandı' 
                            : leave.status === 'PENDING' 
                            ? 'Beklemede' 
                            : 'Reddedildi'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Henüz izin kaydı bulunmuyor</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWorkDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  
  const diffInMonths = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  if (years > 0 && months > 0) {
    return `${years} yıl ${months} ay`;
  } else if (years > 0) {
    return `${years} yıl`;
  } else if (months > 0) {
    return `${months} ay`;
  } else {
    const diffInDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffInDays} gün`;
  }
} 