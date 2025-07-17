'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthHeaders } from '@/lib/auth';
import { QNBPasswordManager } from '@/lib/qnb-password-cache';

interface Customer {
  id: string;
  name: string;
  taxNumber: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  address: string | null;
  city: string | null;
  country: string;
  companyName: string | null;
  customerType: "INDIVIDUAL" | "CORPORATE" | "GOVERNMENT";
  isActive: boolean;
  createdAt: string;
}

interface InvoiceItem {
  id: string;
  productCode: string;
  productName: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  vatRate: number;
  discountRate: number;
  subtotal: number;
  vatAmount: number;
  total: number;
  // Tevkifat alanları
  withholdingRate: number;
  withholdingAmount: number;
  withholdingType: 'GELIR_VERGISI' | 'KDV' | 'DAMGA' | 'NONE';
}

export default function CreateInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // Müşteri seçimi türü
  const [customerInputType, setCustomerInputType] = useState<'select' | 'manual'>('select');
  
  // GIB'e gönderim seçeneği
  const [sendToGIB, setSendToGIB] = useState(false);
  
  // QNB gönderim sonucu
  const [qnbSendResult, setQnbSendResult] = useState<{
    success: boolean;
    message: string;
    error?: string;
    result?: any;
  } | null>(null);

  // QNB şifre modal durumu
  const [showQnbPasswordModal, setShowQnbPasswordModal] = useState(false);
  const [qnbPassword, setQnbPassword] = useState('');
  const [qnbPasswordLoading, setQnbPasswordLoading] = useState(false);
  const [pendingInvoiceData, setPendingInvoiceData] = useState<any>(null);
  const [userVkn, setUserVkn] = useState<string | null>(null);

  // QNB cache durumu
  const [qnbCacheStatus, setQnbCacheStatus] = useState<{
    hasPassword: boolean;
    remainingTime: number;
  }>({ hasPassword: false, remainingTime: 0 });
  


  // Müşteri bilgileri (elle girme)
  const [manualCustomerData, setManualCustomerData] = useState({
    name: '',
    taxNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Türkiye',
    taxOffice: ''
  });

  // Fatura bilgileri
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    customerId: '',
    notes: '',
    // E-fatura ayarları - artık otomatik belirleniyor
    currency: 'TRY',
    exchangeRate: 1,
    paymentMethod: 'NAKIT',
    paymentTerms: 'Peşin',
    // Tevkifat ayarları
    invoiceType: 'SATIS', // SATIS, IADE, TEVKIFAT
    hasWithholding: false,
    withholdingNote: '',
    // Diğer ayarlar
    orderNumber: '',
    orderDate: '',
    waybillNumber: '',
    waybillDate: '',
    exportDeliveryTerm: '',
    exportCustomsInfo: ''
  });

  // Fatura kalemleri
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      productCode: '',
      productName: '',
      description: '',
      quantity: 1,
      unit: 'ADET',
      unitPrice: 0,
      vatRate: 20,
      discountRate: 0,
      subtotal: 0,
      vatAmount: 0,
      total: 0,
      withholdingRate: 0,
      withholdingAmount: 0,
      withholdingType: 'NONE'
    }
  ]);

  // Müşteri verileri yükleme
  useEffect(() => {
    fetchCustomers();
    fetchUserVkn();
  }, []);

  // QNB cache durumu güncelleme
  useEffect(() => {
    updateQnbCacheStatus();
    
    // Her 30 saniyede bir cache durumunu kontrol et
    const interval = setInterval(updateQnbCacheStatus, 30000);
    return () => clearInterval(interval);
  }, [userVkn]);

  const fetchCustomers = async () => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch('/api/customers', {
        headers: authHeaders
      });
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Müşteri verileri yüklenemedi:', error);
    }
  };

  const fetchUserVkn = async () => {
    try {
      const authHeader = getAuthHeaders();
      const userResponse = await fetch('/api/auth/me', {
        headers: authHeader
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        const vkn = userData.user?.companies?.[0]?.taxNumber;
        setUserVkn(vkn);
        console.log('Kullanıcı VKN bilgisi alındı:', vkn);
      } else {
        console.error('Kullanıcı bilgileri alınamadı:', userResponse.status);
      }
    } catch (error) {
      console.error('Kullanıcı VKN alınamadı:', error);
    }
  };

  const updateQnbCacheStatus = () => {
    if (!userVkn) return;
    
    const hasPassword = QNBPasswordManager.hasValidPassword(userVkn);
    const remainingTime = QNBPasswordManager.getRemainingTime();
    
    setQnbCacheStatus({
      hasPassword,
      remainingTime
    });
  };

  const clearQnbCache = () => {
    QNBPasswordManager.clearPassword();
    updateQnbCacheStatus();
  };

  // Hesaplamalar
  const calculateItemTotals = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discountRate / 100);
    const discountedSubtotal = subtotal - discountAmount;
    
    // KDV hesaplama
    const vatAmount = discountedSubtotal * (item.vatRate / 100);
    
    // Tevkifat hesaplama
    let withholdingAmount = 0;
    if (item.withholdingType !== 'NONE' && item.withholdingRate > 0) {
      if (item.withholdingType === 'KDV') {
        // KDV tevkifatı: KDV üzerinden
        withholdingAmount = vatAmount * (item.withholdingRate / 100);
      } else {
        // Gelir vergisi tevkifatı: Matrah üzerinden
        withholdingAmount = discountedSubtotal * (item.withholdingRate / 100);
      }
    }
    
    const total = discountedSubtotal + vatAmount - withholdingAmount;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      vatAmount: Number(vatAmount.toFixed(2)),
      withholdingAmount: Number(withholdingAmount.toFixed(2)),
      total: Number(total.toFixed(2))
    };
  };

  const updateItemCalculations = (index: number, field: string, value: any) => {
    const newItems = [...invoiceItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    const calculations = calculateItemTotals(newItems[index]);
    newItems[index] = { ...newItems[index], ...calculations };
    
    setInvoiceItems(newItems);
  };

  const addNewItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productCode: '',
      productName: '',
      description: '',
      quantity: 1,
      unit: 'ADET',
      unitPrice: 0,
      vatRate: 20,
      discountRate: 0,
      subtotal: 0,
      vatAmount: 0,
      total: 0,
      withholdingRate: 0,
      withholdingAmount: 0,
      withholdingType: 'NONE'
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const removeItem = (index: number) => {
    if (invoiceItems.length > 1) {
      const newItems = invoiceItems.filter((_, i) => i !== index);
      setInvoiceItems(newItems);
    }
  };

  // Genel toplamlar
  const calculateTotals = () => {
    const subtotal = invoiceItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const totalVat = invoiceItems.reduce((sum, item) => sum + (item.vatAmount || 0), 0);
    const totalWithholding = invoiceItems.reduce((sum, item) => sum + (item.withholdingAmount || 0), 0);
    const grandTotal = invoiceItems.reduce((sum, item) => sum + (item.total || 0), 0);

    return {
      subtotal: Number(subtotal.toFixed(2)),
      totalVat: Number(totalVat.toFixed(2)),
      totalWithholding: Number(totalWithholding.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2))
    };
  };

  const totals = calculateTotals();

  // Müşteri seçme
  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setInvoiceData({ ...invoiceData, customerId: customer.id });
    setShowCustomerModal(false);
  };

  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setInvoiceData({ ...invoiceData, customerId: '' });
  };

  const handleClearManualCustomer = () => {
    setManualCustomerData({
      name: '',
      taxNumber: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: 'Türkiye',
      taxOffice: ''
    });
  };

  const handleInvoiceTypeChange = (type: string) => {
    setInvoiceData({ ...invoiceData, invoiceType: type });
    
    // Tevkifat türü değiştiğinde kalemleri güncelle
    if (type !== 'TEVKIFAT') {
      const newItems = invoiceItems.map(item => ({
        ...item,
        withholdingType: 'NONE' as const,
        withholdingRate: 0,
        withholdingAmount: 0
      }));
      setInvoiceItems(newItems);
    }
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    // Fatura bilgileri kontrolü
    if (!invoiceData.issueDate) {
      newErrors.push('Fatura tarihi gereklidir.');
    }

         // Müşteri bilgileri kontrolü (sadece elle girme durumunda)
     if (customerInputType === 'manual') {
       if (!manualCustomerData.name.trim()) {
         newErrors.push('Müşteri adı gereklidir.');
       }
       if (!manualCustomerData.taxNumber.trim()) {
         newErrors.push('Vergi/TC numarası gereklidir.');
       }
       if (manualCustomerData.taxNumber.length !== 10 && manualCustomerData.taxNumber.length !== 11) {
         newErrors.push('Vergi numarası 10 haneli veya TC kimlik numarası 11 haneli olmalıdır.');
       }
       // VKN için vergi dairesi zorunlu
       if (manualCustomerData.taxNumber.length === 10 && !manualCustomerData.taxOffice.trim()) {
         newErrors.push('10 haneli vergi numarası için vergi dairesi gereklidir.');
       }
     }

    // Fatura kalemleri kontrolü
    if (invoiceItems.length === 0) {
      newErrors.push('En az bir fatura kalemi eklemelisiniz.');
    }
    
    invoiceItems.forEach((item, index) => {
      if (!item.productName.trim()) {
        newErrors.push(`${index + 1}. kalem için ürün adı gereklidir.`);
      }
      if (item.quantity <= 0) {
        newErrors.push(`${index + 1}. kalem için miktar sıfırdan büyük olmalıdır.`);
      }
      if (item.unitPrice <= 0) {
        newErrors.push(`${index + 1}. kalem için birim fiyat sıfırdan büyük olmalıdır.`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // QNB şifre modal fonksiyonları
  const handleQnbPasswordSubmit = async (password: string) => {
    setQnbPasswordLoading(true);
    
    try {
      // Şifreyi cache'e kaydet
      QNBPasswordManager.savePassword(pendingInvoiceData.vkn, password);
      
      // Cache durumunu güncelle
      updateQnbCacheStatus();
      
      // Faturayı şifre ile birlikte gönder
      await submitInvoiceWithPassword(pendingInvoiceData, password);
      
      setShowQnbPasswordModal(false);
      setQnbPassword('');
      setPendingInvoiceData(null);
    } catch (error) {
      console.error('QNB şifre hatası:', error);
      setErrors(['QNB şifre doğrulama hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata')]);
    } finally {
      setQnbPasswordLoading(false);
    }
  };

  const submitInvoiceWithPassword = async (submitData: any, password: string) => {
    console.log('🔐 Frontend QNB gönderim bilgileri:', {
      sendToQNB: submitData.sendToQNB,
      hasPassword: !!password,
      passwordLength: password?.length || 0,
      submitDataKeys: Object.keys(submitData)
    });

    const dataWithPassword = {
      ...submitData,
      qnbPassword: password
    };
      
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(dataWithPassword),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Fatura oluşturma yanıtı:', responseData);
      
      // QNB gönderim sonucunu state'e kaydet
      if (responseData.qnbSendResult) {
        setQnbSendResult(responseData.qnbSendResult);
      }
      
      // Fatura oluşturuldu log
      console.log('E-Fatura başarıyla oluşturuldu');
      
      setSuccess(true);
      setTimeout(() => {
      router.push('/dashboard/invoices');
      }, 3000);
    } else {
      const errorData = await response.json();
      setErrors([errorData.error || 'Fatura oluşturulurken bir hata oluştu.']);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      // Müşteri bilgilerini hazırla
      let customerData;
      if (customerInputType === 'select' && selectedCustomer) {
        customerData = selectedCustomer;
      } else if (customerInputType === 'manual') {
        customerData = manualCustomerData;
      } else {
        customerData = null;
      }

      const submitData = {
        ...invoiceData,
        customer: customerData,
        items: invoiceItems.map(item => ({
          productCode: item.productCode,
          productName: item.productName,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          vatRate: item.vatRate,
          discountRate: item.discountRate,
          withholdingType: item.withholdingType,
          withholdingRate: item.withholdingRate
        })),
        sendToQNB: sendToGIB // QNB gönderimi seçeneği
      };

      // QNB gönderimi seçili ve şifre cache'de yoksa modal göster
      if (sendToGIB) {
        // VKN'yi almak için auth'dan kullanıcı bilgilerini al
        const authHeader = getAuthHeaders();
        const userResponse = await fetch('/api/auth/me', {
          headers: authHeader
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          const userVkn = userData.user?.companies?.[0]?.taxNumber;
          
          if (userVkn) {
            console.log('Submit için VKN alındı:', userVkn);
            const cachedPassword = QNBPasswordManager.getPassword(userVkn);
            
            if (cachedPassword) {
              // Cache'de şifre var, direkt gönder
              QNBPasswordManager.refreshCache();
              await submitInvoiceWithPassword({
                ...submitData,
                vkn: userVkn
              }, cachedPassword);
            } else {
              // Cache'de şifre yok, modal göster
              setPendingInvoiceData({
                ...submitData,
                vkn: userVkn
              });
              setShowQnbPasswordModal(true);
            }
          } else {
            console.error('Kullanıcı companies verisi:', userData.user?.companies);
            setErrors(['Kullanıcı VKN bilgisi bulunamadı. Lütfen profil ayarlarınızı kontrol edin.']);
          }
        } else {
          const errorData = await userResponse.json().catch(() => ({}));
          console.error('Kullanıcı bilgileri alınamadı:', userResponse.status, errorData);
          setErrors(['Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapın.']);
        }
      } else {
        // QNB gönderimi yok, normal şekilde gönder
        const response = await fetch('/api/invoices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify(submitData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Fatura oluşturma yanıtı:', responseData);
          
          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard/invoices');
          }, 3000);
        } else {
          const errorData = await response.json();
          setErrors([errorData.error || 'Fatura oluşturulurken bir hata oluştu.']);
        }
      }
    } catch (error) {
      console.error('Fatura oluşturma hatası:', error);
      setErrors(['Fatura oluşturulurken bir hata oluştu.']);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fatura Başarıyla Oluşturuldu!</h3>
            
            {/* Fatura Tipi Bilgisi */}
            <div className="mb-3 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">Fatura Tipi:</span> 📄 E-Fatura (Ticari)
              </p>
              <p className="text-xs text-green-600 mt-1">
                Elektronik fatura oluşturuldu ve sisteme kaydedildi
              </p>
            </div>
            
            <p className="text-gray-600 mb-4">Fatura listeleme sayfasına yönlendiriliyorsunuz...</p>
            
            {/* QNB Gönderim Sonucu */}
            {qnbSendResult && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                qnbSendResult.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2">
                  {qnbSendResult.success ? (
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  <div>
                    <p className={`font-medium ${
                      qnbSendResult.success ? 'text-green-900' : 'text-red-900'
                    }`}>
                      QNB E-solution Gönderim Sonucu
                    </p>
                    <p className={`${
                      qnbSendResult.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {qnbSendResult.message}
                    </p>
                    {qnbSendResult.error && (
                      <p className="text-red-600 text-xs mt-1">
                        Hata: {qnbSendResult.error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Yeni E-Fatura Oluştur</h1>
          <p className="text-gray-600">Profesyonel e-fatura oluşturun ve otomatik olarak GİB'e gönderin</p>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
              <h4 className="font-medium text-red-800">Aşağıdaki hataları düzeltin:</h4>
            </div>
            <ul className="list-disc list-inside text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Üst Bölüm - Temel Bilgiler ve Müşteri */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Müşteri Bilgileri */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Müşteri Bilgileri</h3>
              </div>
              
              {/* Müşteri Seçim Türü */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomerInputType('select')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      customerInputType === 'select' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Kayıtlı Müşteri
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerInputType('manual')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      customerInputType === 'manual' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Elle Gir
                  </button>
                </div>
        </div>

              {/* Kayıtlı Müşteri Seçimi */}
              {customerInputType === 'select' && (
                <>
                  {selectedCustomer ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {selectedCustomer.taxNumber && selectedCustomer.taxNumber.length === 10 ? 'Vergi Numarası' : 'TC Kimlik No'}
                        </span>
                                               <div className="flex gap-2">
                         <button
                           type="button"
                           onClick={() => setShowCustomerModal(true)}
                           className="text-sm text-blue-600 hover:text-blue-800"
                         >
                           Değiştir
                         </button>
                         <button
                           type="button"
                           onClick={handleClearCustomer}
                           className="text-sm text-red-600 hover:text-red-800"
                         >
                           Temizle
                         </button>
                       </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{selectedCustomer.name}</h4>
                        <p className="text-sm text-gray-600">{selectedCustomer.taxNumber || 'Vergi No: -'}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{selectedCustomer.email || 'Email: -'}</p>
                        <p>{selectedCustomer.phone || selectedCustomer.mobile || 'Telefon: -'}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{selectedCustomer.address || 'Adres: -'}</p>
                        <p>{selectedCustomer.city || 'Şehir: -'}, {selectedCustomer.country}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 mb-3">Müşteri seçilmedi</p>
                      <button
                        type="button"
                        onClick={() => setShowCustomerModal(true)}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Müşteri Seç
                      </button>
          </div>
                  )}
                </>
              )}

              {/* Elle Müşteri Girişi */}
              {customerInputType === 'manual' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Elle Müşteri Girişi</span>
                    {(manualCustomerData.name || manualCustomerData.taxNumber) && (
                      <button
                        type="button"
                        onClick={handleClearManualCustomer}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Temizle
                      </button>
                    )}
                  </div>
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {manualCustomerData.taxNumber.length === 11 ? 'Ad Soyad' : 'Firma Adı'} *
              </label>
              <input
                type="text"
                      value={manualCustomerData.name}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={manualCustomerData.taxNumber.length === 11 ? 'Ad soyad' : 'Firma adı'}
              />
            </div>
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vergi/TC Numarası *
              </label>
              <input
                type="text"
                      value={manualCustomerData.taxNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Sadece rakam
                              setManualCustomerData({
        ...manualCustomerData,
        taxNumber: value
      });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="10 haneli vergi numarası veya 11 haneli TC kimlik no"
                      maxLength={11}
                    />
                    {manualCustomerData.taxNumber.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        {manualCustomerData.taxNumber.length === 10 && '✓ Vergi Numarası (10 hane)'}
                        {manualCustomerData.taxNumber.length === 11 && '✓ TC Kimlik Numarası (11 hane)'}
                        {manualCustomerData.taxNumber.length > 0 && manualCustomerData.taxNumber.length !== 10 && manualCustomerData.taxNumber.length !== 11 && 
                         `${manualCustomerData.taxNumber.length}/11 hane`}
                      </p>
                    )}
            </div>
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={manualCustomerData.email}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={manualCustomerData.phone}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0555 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                    <textarea
                      value={manualCustomerData.address}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Adres bilgisi..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Şehir</label>
                    <input
                      type="text"
                      value={manualCustomerData.city}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="İstanbul"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vergi Dairesi {manualCustomerData.taxNumber.length === 10 ? '*' : ''}
              </label>
              <input
                      type="text"
                      value={manualCustomerData.taxOffice}
                      onChange={(e) => setManualCustomerData({ ...manualCustomerData, taxOffice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={manualCustomerData.taxNumber.length === 10 ? 'Örn: Şişli Vergi Dairesi (zorunlu)' : 'Vergi dairesi (opsiyonel)'}
                    />
                    {manualCustomerData.taxNumber.length === 10 && (
                      <p className="text-sm text-gray-500 mt-1">
                        ℹ️ 10 haneli vergi numarası için vergi dairesi gereklidir
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Fatura Bilgileri */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Fatura Bilgileri</h3>
              </div>
              <div className="space-y-4">
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fatura Türü *</label>
                  <select
                    value={invoiceData.invoiceType}
                    onChange={(e) => handleInvoiceTypeChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="SATIS">Satış Faturası</option>
                    <option value="IADE">İade Faturası</option>
                    <option value="TEVKIFAT">Tevkifatlı Fatura</option>
                  </select>
                  {invoiceData.invoiceType === 'TEVKIFAT' && (
                    <p className="text-sm text-orange-600 mt-1">
                      ⚠️ Tevkifatlı fatura seçildi. Tevkifat oranlarını belirleyin.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fatura Numarası</label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Boş bırakılırsa otomatik oluşturulur"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Boş bırakırsanız sistem otomatik olarak sıralı numara üretir
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fatura Tarihi *</label>
              <input
                type="date"
                    value={invoiceData.issueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vade Tarihi</label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sipariş Numarası</label>
                  <input
                    type="text"
                    value={invoiceData.orderNumber}
                    onChange={(e) => setInvoiceData({ ...invoiceData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Opsiyonel"
                  />
                </div>
              </div>
            </div>

            {/* E-Fatura Ayarları */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Fatura Ayarları</h3>
              </div>
              <div className="space-y-4">
                {/* E-Fatura Bilgisi */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-sm font-medium text-green-900">E-Fatura Sistemi</h4>
                  </div>
                  <div className="text-sm text-green-700">
                    📄 Tüm faturalar E-Fatura (Ticari) formatında oluşturulur ve QNB E-solution üzerinden gönderilir
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
              <select
                      value={invoiceData.currency}
                      onChange={(e) => setInvoiceData({ ...invoiceData, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="TRY">TRY</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ödeme Yöntemi</label>
                    <select
                      value={invoiceData.paymentMethod}
                      onChange={(e) => setInvoiceData({ ...invoiceData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="NAKIT">Nakit</option>
                      <option value="KREDIKARTI">Kredi Kartı</option>
                      <option value="HAVALE">Havale</option>
                      <option value="CEK">Çek</option>
              </select>
            </div>
          </div>

                {/* GIB'e Gönderim Seçeneği */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">QNB E-solution'a Otomatik Gönderim</h4>
                        <p className="text-xs text-gray-500">Fatura oluşturulduktan sonra otomatik olarak QNB E-solution üzerinden gönderilsin</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sendToGIB}
                        onChange={(e) => setSendToGIB(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {sendToGIB && (
                    <div className="mt-3 space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-sm">
                            <p className="font-medium text-blue-900">QNB E-solution Gönderim Aktif</p>
                            <p className="text-blue-700">Fatura oluşturulduktan sonra otomatik olarak QNB E-solution entegratörü üzerinden gönderilecek ve e-fatura numarası alınacaktır.</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* QNB Cache Durumu */}
                      <div className={`p-3 rounded-lg border ${
                        qnbCacheStatus.hasPassword 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-orange-50 border-orange-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg className={`w-4 h-4 ${
                              qnbCacheStatus.hasPassword ? 'text-green-600' : 'text-orange-600'
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <div className="text-sm">
                              <p className={`font-medium ${
                                qnbCacheStatus.hasPassword ? 'text-green-900' : 'text-orange-900'
                              }`}>
                                QNB Şifre Durumu
                              </p>
                              <p className={`${
                                qnbCacheStatus.hasPassword ? 'text-green-700' : 'text-orange-700'
                              }`}>
                                                                 {qnbCacheStatus.hasPassword ? (
                                   <>
                                     ✅ Şifre kaydedildi. Kalan süre: {Math.floor(qnbCacheStatus.remainingTime / (1000 * 60 * 60))}sa {Math.floor((qnbCacheStatus.remainingTime % (1000 * 60 * 60)) / (1000 * 60))}dk
                                   </>
                                 ) : (
                                   '❌ Şifre kaydedilmedi. İlk fatura gönderiminde şifre sorulacak.'
                                 )}
                              </p>
                            </div>
                          </div>
                          {qnbCacheStatus.hasPassword && (
                            <button
                              type="button"
                              onClick={clearQnbCache}
                              className="text-xs px-2 py-1 text-red-600 hover:text-red-800 border border-red-200 rounded hover:bg-red-50 transition-colors"
                            >
                              Şifreyi Temizle
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fatura Kalemleri */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-orange-100 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Fatura Kalemleri</h3>
              {invoiceData.invoiceType === 'TEVKIFAT' && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Tevkifatlı
                </span>
              )}
            </div>
            <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium border border-gray-200">Ürün Kodu</th>
                      <th className="text-left p-3 font-medium border border-gray-200">Ürün Adı *</th>
                      <th className="text-left p-3 font-medium border border-gray-200">Miktar *</th>
                      <th className="text-left p-3 font-medium border border-gray-200">Birim</th>
                      <th className="text-left p-3 font-medium border border-gray-200">Birim Fiyat *</th>
                      <th className="text-left p-3 font-medium border border-gray-200">İskonto %</th>
                      <th className="text-left p-3 font-medium border border-gray-200">KDV %</th>
                      {invoiceData.invoiceType === 'TEVKIFAT' && (
                        <>
                          <th className="text-left p-3 font-medium border border-gray-200">Tevkifat Türü</th>
                          <th className="text-left p-3 font-medium border border-gray-200">Tevkifat %</th>
                        </>
                      )}
                      <th className="text-left p-3 font-medium border border-gray-200">Toplam</th>
                      <th className="text-left p-3 font-medium border border-gray-200">İşlem</th>
                  </tr>
                </thead>
                  <tbody>
                    {invoiceItems.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-3 border border-gray-200">
                        <input
                          type="text"
                            value={item.productCode}
                            onChange={(e) => updateItemCalculations(index, 'productCode', e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded"
                            placeholder="Kod"
                        />
                      </td>
                        <td className="p-3 border border-gray-200">
                          <input
                            type="text"
                            value={item.productName}
                            onChange={(e) => updateItemCalculations(index, 'productName', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder="Ürün adı"
                          />
                        </td>
                        <td className="p-3 border border-gray-200">
                        <input
                          type="number"
                            value={item.quantity}
                            onChange={(e) => updateItemCalculations(index, 'quantity', Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                            min="0"
                          step="0.01"
                          />
                        </td>
                        <td className="p-3 border border-gray-200">
                          <select
                            value={item.unit}
                            onChange={(e) => updateItemCalculations(index, 'unit', e.target.value)}
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                          >
                            <option value="ADET">Adet</option>
                            <option value="KG">Kg</option>
                            <option value="LT">Lt</option>
                            <option value="M">M</option>
                            <option value="M2">M²</option>
                            <option value="SAAT">Saat</option>
                          </select>
                        </td>
                        <td className="p-3 border border-gray-200">
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItemCalculations(index, 'unitPrice', Number(e.target.value))}
                            className="w-24 px-2 py-1 border border-gray-300 rounded"
                          min="0"
                            step="0.01"
                        />
                      </td>
                        <td className="p-3 border border-gray-200">
                        <input
                          type="number"
                            value={item.discountRate}
                            onChange={(e) => updateItemCalculations(index, 'discountRate', Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded"
                            min="0"
                            max="100"
                            step="0.01"
                        />
                      </td>
                        <td className="p-3 border border-gray-200">
                          <select
                            value={item.vatRate.toString()}
                            onChange={(e) => updateItemCalculations(index, 'vatRate', Number(e.target.value))}
                            className="w-16 px-2 py-1 border border-gray-300 rounded"
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>
                        </td>
                        {invoiceData.invoiceType === 'TEVKIFAT' && (
                          <>
                            <td className="p-3 border border-gray-200">
                              <select
                                value={item.withholdingType}
                                onChange={(e) => updateItemCalculations(index, 'withholdingType', e.target.value)}
                                className="w-32 px-2 py-1 border border-gray-300 rounded"
                              >
                                <option value="NONE">Yok</option>
                                <option value="GELIR_VERGISI">Gelir Vergisi</option>
                                <option value="KDV">KDV Tevkifatı</option>
                                <option value="DAMGA">Damga Vergisi</option>
                              </select>
                            </td>
                            <td className="p-3 border border-gray-200">
                              <input
                                type="number"
                                value={item.withholdingRate}
                                onChange={(e) => updateItemCalculations(index, 'withholdingRate', Number(e.target.value))}
                                className="w-16 px-2 py-1 border border-gray-300 rounded"
                                min="0"
                                max="100"
                                step="0.01"
                                disabled={item.withholdingType === 'NONE'}
                              />
                            </td>
                          </>
                        )}
                        <td className="p-3 border border-gray-200">
                          <div className="text-right">
                            <div className="font-medium">₺{item.total.toLocaleString()}</div>
                            {invoiceData.invoiceType === 'TEVKIFAT' && item.withholdingAmount > 0 && (
                              <div className="text-xs text-orange-600">
                                -₺{item.withholdingAmount.toLocaleString()} tevkifat
                              </div>
                            )}
                        </div>
                      </td>
                        <td className="p-3 border border-gray-200">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                            disabled={invoiceItems.length === 1}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
              <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                  onClick={addNewItem}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Yeni Kalem Ekle
              </button>

                <div className="text-right space-y-2">
                  <div className="flex justify-between gap-8">
                    <span>Ara Toplam:</span>
                    <span className="font-medium">₺{totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>KDV:</span>
                    <span className="font-medium">₺{totals.totalVat.toLocaleString()}</span>
                  </div>
                  {totals.totalWithholding > 0 && (
                    <div className="flex justify-between gap-8">
                      <span className="text-orange-600">Tevkifat:</span>
                      <span className="font-medium text-orange-600">-₺{totals.totalWithholding.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between gap-8 text-lg font-bold">
                      <span>Genel Toplam:</span>
                      <span>₺{totals.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notlar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fatura Notları</h3>
              <textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Fatura ile ilgili notlarınızı buraya yazabilirsiniz..."
                rows={3}
            />
            {invoiceData.invoiceType === 'TEVKIFAT' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tevkifat Notu</label>
                <textarea
                  value={invoiceData.withholdingNote}
                  onChange={(e) => setInvoiceData({ ...invoiceData, withholdingNote: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tevkifat ile ilgili özel notlar..."
                  rows={2}
                />
              </div>
            )}
            </div>
            
          {/* Alt Butonlar */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard/invoices')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-32"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Oluşturuluyor...
              </div>
              ) : (
                `${invoiceData.invoiceType === 'TEVKIFAT' ? 'Tevkifatlı ' : ''}Fatura Oluştur`
              )}
            </button>
                </div>
        </form>

        {/* Müşteri Seçim Modalı */}
        {showCustomerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">Müşteri Seç</h2>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                </div>
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{customer.name}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {customer.taxNumber && customer.taxNumber.length === 10 ? 'VKN' : 'TCKN'}
                  </span>
                </div>
                      <p className="text-sm text-gray-600 mb-1">{customer.taxNumber || 'Vergi No: -'}</p>
                      <p className="text-sm text-gray-600">{customer.email || 'Email: -'}</p>
              </div>
                  ))}
            </div>
                {customers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Henüz müşteri bulunmuyor.</p>
                    <button
                      onClick={() => {
                        setShowCustomerModal(false);
                        router.push('/dashboard/customers');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Yeni Müşteri Ekle
                    </button>
          </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QNB Şifre Modalı */}
        {showQnbPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold">QNB E-solution Şifresi</h2>
                </div>
                <button
                  onClick={() => {
                    setShowQnbPasswordModal(false);
                    setQnbPassword('');
                    setPendingInvoiceData(null);
                    setLoading(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700">
                      <strong>VKN:</strong> {pendingInvoiceData?.vkn}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    E-faturayı QNB E-solution üzerinden göndermek için şifrenizi girin. 
                    Şifre güvenli bir şekilde saklanacak ve 8 saat boyunca tekrar sorulmayacak.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    QNB E-solution Şifresi
                  </label>
                  <input
                    type="password"
                    value={qnbPassword}
                    onChange={(e) => setQnbPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Şifrenizi girin"
                    disabled={qnbPasswordLoading}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && qnbPassword.trim()) {
                        handleQnbPasswordSubmit(qnbPassword.trim());
                      }
                    }}
                  />
                </div>

                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Güvenlik</p>
                      <p>Şifre sadece oturum süresince (8 saat) güvenli olarak saklanır.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQnbPasswordModal(false);
                      setQnbPassword('');
                      setPendingInvoiceData(null);
                      setLoading(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={qnbPasswordLoading}
            >
              İptal
                  </button>
            <button
                    type="button"
                    onClick={() => handleQnbPasswordSubmit(qnbPassword.trim())}
                    disabled={qnbPasswordLoading || !qnbPassword.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-24"
                  >
                    {qnbPasswordLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      'Fatura Gönder'
                    )}
            </button>
          </div>
      </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 