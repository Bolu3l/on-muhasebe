// Yardımcı fonksiyonlar

// Para birimini formatlayan fonksiyon
export function formatCurrency(amount: number | bigint | string | any): string {
  // Decimal tipi için özel dönüşüm
  const numAmount = typeof amount === 'object' && amount !== null 
    ? parseFloat(amount.toString()) 
    : Number(amount);
  
  if (isNaN(numAmount)) {
    console.warn('Geçersiz para değeri:', amount);
    return "0,00 ₺";
  }
  
  // Debug log ekle
  console.log('formatCurrency called with:', amount, 'converted to:', numAmount);
  
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2
  }).format(numAmount);
}

// Tarihi formatlayan fonksiyon
export function formatDate(date: Date | string | null): string {
  if (!date) return "-";
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('tr-TR');
}

// Türkçe ay isimleri
export const TR_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

// Yüzde hesaplama fonksiyonu
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

// API'den gelen Decimal tiplerini number'a dönüştürme yardımcı fonksiyonu
export function convertDecimalFields<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  
  const result = {...obj};
  
  Object.entries(result).forEach(([key, value]) => {
    if (value !== null && typeof value === 'object' && 'toString' in value) {
      // Muhtemelen bir Decimal
      (result as any)[key] = parseFloat(value.toString());
    } else if (value !== null && typeof value === 'object') {
      // İç içe objeleri de dönüştür
      (result as any)[key] = convertDecimalFields(value);
    }
  });
  
  return result;
} 