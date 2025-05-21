// API işlevlerini içeren servis katmanı
// Gerçek veritabanı için güncellendi

import { prisma } from './db';
import { formatCurrency, convertDecimalFields } from './utils';
import { DashboardData, TaxDuty, TaxPeriod } from './types';

// Veritabanı bağlantısını kontrol et
async function testDatabaseConnection() {
  try {
    console.log('Veritabanı bağlantısı test ediliyor...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Veritabanı bağlantı testi başarılı:', result);
    return true;
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    return false;
  }
}

// Her API çağrısı öncesinde veritabanı bağlantısını kontrol et
async function withDatabaseCheck<T>(apiCall: () => Promise<T>): Promise<T> {
  await testDatabaseConnection();
  return apiCall();
}

// Tarih aralığı için yardımcı fonksiyon
function isDateInRange(date: Date | null | undefined, startDate: Date, endDate: Date): boolean {
  if (!date) return false;
  
  // Tarih karşılaştırması yapılırken saat, dakika, saniye bilgilerini sıfırla
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  
  const startDateOnly = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  
  const endDateOnly = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  
  // Tarih karşılaştırması yap (sadece gün, ay, yıl)
  return dateOnly >= startDateOnly && dateOnly <= endDateOnly;
}

// Vergi hesaplamaları için yardımcı fonksiyonlar
export function calculateVAT(amount: number, vatRate: number): number {
  return (amount * vatRate) / 100;
}

// Türkiye'deki vergi dönemlerini hesapla
export function getTaxPeriods(year: number = new Date().getFullYear()): TaxPeriod[] {
  const periods: TaxPeriod[] = [];
  
  // KDV için aylık dönemler (her ayın 1'i ile son günü arası)
  for (let month = 0; month < 12; month++) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // Ayın son günü
    
    periods.push({
      startDate,
      endDate,
      type: 'month',
      label: `${startDate.toLocaleString('tr-TR', { month: 'long' })} ${year} KDV Dönemi`
    });
  }
  
  // Gelir vergisi için 3 aylık dönemler
  for (let quarter = 0; quarter < 4; quarter++) {
    const startDate = new Date(year, quarter * 3, 1);
    const endDate = new Date(year, (quarter + 1) * 3, 0);
    
    periods.push({
      startDate,
      endDate,
      type: 'quarter',
      label: `${year} ${quarter + 1}. Çeyrek Gelir Vergisi`
    });
  }
  
  // Yıllık vergi dönemi
  periods.push({
    startDate: new Date(year, 0, 1),
    endDate: new Date(year, 11, 31),
    type: 'year',
    label: `${year} Yıllık Vergi Dönemi`
  });
  
  return periods;
}

// Vergi takvimi oluştur
export function generateTaxCalendar(year: number = new Date().getFullYear()): TaxDuty[] {
  const now = new Date();
  const taxDuties: TaxDuty[] = [];
  
  // KDV beyannameleri (her ayın 26'sı)
  for (let month = 0; month < 12; month++) {
    // Bir önceki ayın KDV beyannamesi
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonthName = new Date(prevMonthYear, prevMonth, 1).toLocaleString('tr-TR', { month: 'long' });
    
    const dueDate = new Date(year, month, 26);
    const isPast = dueDate < now;
    
    taxDuties.push({
      id: `kdv-${year}-${month + 1}`,
      name: `${prevMonthName} Ayı KDV Beyannamesi`,
      type: 'kdv',
      dueDate,
      amount: null, // Hesaplanacak
      isPaid: isPast, // Geçmişse ödenmiş varsayalım
      period: `${prevMonthYear}-${(prevMonth + 1).toString().padStart(2, '0')}`,
      status: isPast ? 'paid' : (dueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000 ? 'due' : 'upcoming')
    });
  }
  
  // Muhtasar beyanname (3 aylık)
  const muhtasarMonths = [0, 3, 6, 9]; // Ocak, Nisan, Temmuz, Ekim
  for (let i = 0; i < muhtasarMonths.length; i++) {
    const month = muhtasarMonths[i];
    const quarter = Math.floor(month / 3) + 1;
    const dueDate = new Date(year, month, 26);
    const isPast = dueDate < now;
    
    taxDuties.push({
      id: `muhtasar-${year}-Q${quarter}`,
      name: `${year} ${quarter}. Çeyrek Muhtasar Beyanname`,
      type: 'muhtasar',
      dueDate,
      amount: null,
      isPaid: isPast,
      period: `${year}-Q${quarter}`,
      status: isPast ? 'paid' : (dueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000 ? 'due' : 'upcoming')
    });
  }
  
  // Gelir vergisi (yıllık)
  const incomeTaxDueDate = new Date(year, 2, 31); // 31 Mart
  const isPastIncomeTax = incomeTaxDueDate < now;
  
  taxDuties.push({
    id: `gelir-${year}`,
    name: `${year - 1} Yılı Gelir Vergisi Beyannamesi`,
    type: 'gelir',
    dueDate: incomeTaxDueDate,
    amount: null,
    isPaid: isPastIncomeTax,
    period: `${year - 1}`,
    status: isPastIncomeTax ? 'paid' : (incomeTaxDueDate.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000 ? 'due' : 'upcoming')
  });
  
  return taxDuties;
}

// KDV hesapla (belirli bir dönem için)
export async function calculateVATForPeriod(startDate: Date, endDate: Date): Promise<{collected: number, paid: number, balance: number}> {
  try {
    console.log(`KDV hesaplanıyor - Başlangıç: ${startDate.toISOString()}, Bitiş: ${endDate.toISOString()}`);
    
    // Giden faturalardan toplanan KDV - InvoiceItem tablosunu kullanmak yerine doğrudan faturalardan hesapla
    const outgoingInvoices: any[] = await prisma.$queryRaw`
      SELECT id, "invoiceNumber", "taxAmount"::numeric, "totalAmount"::numeric, "invoiceDate"
      FROM "Invoice"
      WHERE type = 'outgoing' AND "invoiceDate" >= ${startDate} AND "invoiceDate" <= ${endDate}
    `;
    
    // Gelen faturalardan ödenen KDV - InvoiceItem tablosunu kullanmak yerine doğrudan faturalardan hesapla
    const incomingInvoices: any[] = await prisma.$queryRaw`
      SELECT id, "invoiceNumber", "taxAmount"::numeric, "totalAmount"::numeric, "invoiceDate"
      FROM "Invoice"
      WHERE type = 'incoming' AND "invoiceDate" >= ${startDate} AND "invoiceDate" <= ${endDate}
    `;
    
    // Fiş giderlerinden ödenen KDV
    const receipts: any[] = await prisma.$queryRaw`
      SELECT id, "taxRate", "taxAmount"::numeric, "expenseDate"
      FROM "ReceiptExpense"
      WHERE "expenseDate" >= ${startDate} AND "expenseDate" <= ${endDate}
    `;
    
    console.log(`Bulunan faturalar: ${outgoingInvoices.length} giden, ${incomingInvoices.length} gelen`);
    console.log(`Bulunan fiş giderleri: ${receipts.length}`);
    
    // Toplanan KDV hesapla
    const vatCollected = outgoingInvoices.reduce((total, invoice) => {
      const taxAmount = parseFloat(invoice.taxAmount || 0);
      console.log(`Giden fatura #${invoice.invoiceNumber}, Tarih: ${invoice.invoiceDate}, KDV: ${taxAmount}`);
      return total + taxAmount;
    }, 0);
    
    // Ödenen KDV hesapla (faturalar + fişler)
    const vatPaidInvoices = incomingInvoices.reduce((total, invoice) => {
      const taxAmount = parseFloat(invoice.taxAmount || 0);
      console.log(`Gelen fatura #${invoice.invoiceNumber}, Tarih: ${invoice.invoiceDate}, KDV: ${taxAmount}`);
      return total + taxAmount;
    }, 0);
    
    const vatPaidReceipts = receipts.reduce((total, receipt) => {
      return total + parseFloat(receipt.taxAmount || 0);
    }, 0);
    
    const vatPaid = vatPaidInvoices + vatPaidReceipts;
    
    // KDV dengesi (pozitif ise devlete ödenecek, negatif ise devletten alınacak)
    const vatBalance = vatCollected - vatPaid;
    
    console.log(`KDV hesaplama sonuçları - Tahsil: ${vatCollected}, Ödenen: ${vatPaid}, Bakiye: ${vatBalance}`);
    
    return {
      collected: vatCollected,
      paid: vatPaid,
      balance: vatBalance
    };
  } catch (error) {
    console.error('KDV hesaplama hatası:', error);
    return {
      collected: 0,
      paid: 0,
      balance: 0
    };
  }
}

// Gelir vergisi tahmini hesapla
export async function estimateIncomeTax(year: number = new Date().getFullYear()): Promise<number> {
  try {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Tüm gelirleri topla
    const totalIncome = await calculateTotalIncomeForPeriod(startDate, endDate);
    
    // Tüm giderleri topla
    const totalExpense = await calculateTotalExpenseForPeriod(startDate, endDate);
    
    // Net kar
    const netProfit = totalIncome - totalExpense;
    
    // Basit bir gelir vergisi tahmini (gerçek hesaplama daha karmaşık olabilir)
    // Türkiye'deki gelir vergisi dilimleri (2023 yılı için)
    let incomeTax = 0;
    
    if (netProfit <= 70000) {
      incomeTax = netProfit * 0.15;
    } else if (netProfit <= 150000) {
      incomeTax = 10500 + (netProfit - 70000) * 0.20;
    } else if (netProfit <= 550000) {
      incomeTax = 26500 + (netProfit - 150000) * 0.27;
    } else if (netProfit <= 1900000) {
      incomeTax = 134500 + (netProfit - 550000) * 0.35;
    } else {
      incomeTax = 607000 + (netProfit - 1900000) * 0.40;
    }
    
    return incomeTax;
  } catch (error) {
    console.error('Gelir vergisi tahmini hesaplama hatası:', error);
    return 0;
  }
}

// Belirli bir dönem için toplam gelir hesapla
async function calculateTotalIncomeForPeriod(startDate: Date, endDate: Date): Promise<number> {
  try {
    // Giden faturalardan gelirler
    const invoiceIncome: any = await prisma.$queryRaw`
      SELECT SUM("totalAmount"::numeric) as total
      FROM "Invoice"
      WHERE type = 'outgoing' AND "invoiceDate" >= ${startDate} AND "invoiceDate" <= ${endDate}
    `;
    
    // Düzenli gelirler
    const recurringIncome: any = await prisma.$queryRaw`
      SELECT SUM(amount::numeric) as total
      FROM "RecurringTransaction"
      WHERE type = 'income' AND "isActive" = true AND "startDate" <= ${endDate}
    `;
    
    const totalInvoiceIncome = parseFloat(invoiceIncome[0]?.total || 0);
    const totalRecurringIncome = parseFloat(recurringIncome[0]?.total || 0);
    
    return totalInvoiceIncome + totalRecurringIncome;
  } catch (error) {
    console.error('Gelir hesaplama hatası:', error);
    return 0;
  }
}

// Belirli bir dönem için toplam gider hesapla
async function calculateTotalExpenseForPeriod(startDate: Date, endDate: Date): Promise<number> {
  try {
    // Gelen faturalardan giderler
    const invoiceExpense: any = await prisma.$queryRaw`
      SELECT SUM("totalAmount"::numeric) as total
      FROM "Invoice"
      WHERE type = 'incoming' AND "invoiceDate" >= ${startDate} AND "invoiceDate" <= ${endDate}
    `;
    
    // Doğrudan giderler
    const directExpense: any = await prisma.$queryRaw`
      SELECT SUM(amount::numeric) as total
      FROM "Expense"
      WHERE "expenseDate" >= ${startDate} AND "expenseDate" <= ${endDate}
    `;
    
    // Fiş giderleri
    const receiptExpense: any = await prisma.$queryRaw`
      SELECT SUM("totalAmount"::numeric) as total
      FROM "ReceiptExpense"
      WHERE "expenseDate" >= ${startDate} AND "expenseDate" <= ${endDate}
    `;
    
    // Düzenli giderler
    const recurringExpense: any = await prisma.$queryRaw`
      SELECT SUM(amount::numeric) as total
      FROM "RecurringTransaction"
      WHERE type = 'expense' AND "isActive" = true AND "startDate" <= ${endDate}
    `;
    
    const totalInvoiceExpense = parseFloat(invoiceExpense[0]?.total || 0);
    const totalDirectExpense = parseFloat(directExpense[0]?.total || 0);
    const totalReceiptExpense = parseFloat(receiptExpense[0]?.total || 0);
    const totalRecurringExpense = parseFloat(recurringExpense[0]?.total || 0);
    
    return totalInvoiceExpense + totalDirectExpense + totalReceiptExpense + totalRecurringExpense;
  } catch (error) {
    console.error('Gider hesaplama hatası:', error);
    return 0;
  }
}

// Vergi özeti hesapla ve dashboard verilerine ekle
export async function getTaxSummaryForDashboard(period: 'week' | 'month' | 'year'): Promise<any> {
  try {
    // Dönem tarih aralığını hesapla
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        const currentDay = startDate.getDay();
        const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
        startDate.setDate(startDate.getDate() - daysToSubtract);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }
    
    // Seçilen dönem için KDV hesapla
    const vatData = await calculateVATForPeriod(startDate, now);
    
    // Gelir vergisi tahmini
    const incomeTaxEstimate = await estimateIncomeTax(now.getFullYear());
    
    // Yaklaşan vergi görevleri
    const allTaxDuties = generateTaxCalendar(now.getFullYear());
    const upcomingTaxes = allTaxDuties.filter(tax => 
      tax.status === 'upcoming' || tax.status === 'due'
    ).slice(0, 5); // En yakın 5 vergi görevi
    
    // KDV beyanname tarihi (bir sonraki ay 26'sı)
    const nextMonth = now.getMonth() + 1;
    const nextMonthYear = nextMonth === 12 ? now.getFullYear() + 1 : now.getFullYear();
    const vatDueDate = new Date(nextMonthYear, nextMonth % 12, 26);
    
    return {
      vatCollected: vatData.collected,
      vatPaid: vatData.paid,
      vatBalance: vatData.balance,
      vatDueDate,
      incomeTaxEstimate,
      upcomingTaxes
    };
  } catch (error) {
    console.error('Vergi özeti hesaplama hatası:', error);
    return {
      vatCollected: 0,
      vatPaid: 0,
      vatBalance: 0,
      vatDueDate: null,
      incomeTaxEstimate: 0,
      upcomingTaxes: []
    };
  }
}

// Dashboard verilerini getir
export async function getDashboardData(period: 'week' | 'month' | 'year' = 'month'): Promise<DashboardData> {
  try {
    console.log('getDashboardData çağrıldı, dönem:', period);
    
    // İlk olarak veritabanı bağlantısını test et
    try {
      const testResult = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('Veritabanı bağlantısı başarılı:', testResult);
    } catch (dbError) {
      console.error('VERİTABANI BAĞLANTI HATASI!', dbError);
      throw new Error('Veritabanı bağlantısı kurulamadı!');
    }
    
    // Tarih aralığını hesapla
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        // Haftanın başlangıcı (Pazartesi)
        startDate = new Date(now);
        const currentDay = startDate.getDay(); // 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi
        
        // Eğer bugün Pazar ise (0), 6 gün geri git; diğer günlerde (1-6) bugünden geriye doğru o günün numarası - 1 kadar git
        const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
        startDate.setDate(startDate.getDate() - daysToSubtract);
        startDate.setHours(0, 0, 0, 0);
        
        console.log(`Bugün haftanın ${currentDay}. günü, ${daysToSubtract} gün çıkarıldı`);
        break;
        
      case 'month':
        // Ayın başlangıcı (1'i)
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
        
      case 'year':
        // Yılın başlangıcı (1 Ocak)
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }
    
    console.log(`Seçilen dönem: ${period}`);
    console.log(`Başlangıç tarihi: ${startDate.toISOString()}`);
    console.log(`Bitiş tarihi: ${now.toISOString()}`);
    
    // 1. TÜM FATURALARI getir
    const allInvoices: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        "invoiceNumber", 
        "totalAmount"::numeric as amount, 
        "invoiceDate", 
        type, 
        status
      FROM "Invoice"
      WHERE "invoiceDate" IS NOT NULL
      ORDER BY "invoiceDate" DESC
    `;
    
    // 2. TÜM GİDERLERİ getir
    const allExpenses: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        title, 
        amount::numeric as amount, 
        "expenseDate", 
        category
      FROM "Expense"
      WHERE "expenseDate" IS NOT NULL
      ORDER BY "expenseDate" DESC
    `;
    
    // 3. TÜM FİŞ GİDERLERİNİ getir
    const allReceipts: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        title, 
        "totalAmount"::numeric as amount, 
        "expenseDate", 
        category
      FROM "ReceiptExpense"
      WHERE "expenseDate" IS NOT NULL
      ORDER BY "expenseDate" DESC
    `;
    
    // 4. TÜM DÜZENLİ İŞLEMLERİ getir
    const allRecurring: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        title, 
        amount::numeric as amount, 
        "startDate",
        frequency,
        type,
        "isActive"
      FROM "RecurringTransaction"
      WHERE "isActive" = true
      ORDER BY "startDate" DESC
    `;
    
    // FATURALARI FİLTRELE
    const filteredInvoices = allInvoices.filter(invoice => 
      isDateInRange(new Date(invoice.invoiceDate), startDate, now)
    );
    
    // GİDERLERİ FİLTRELE
    const filteredExpenses = allExpenses.filter(expense => 
      isDateInRange(new Date(expense.expenseDate), startDate, now)
    );
    
    // FİŞ GİDERLERİNİ FİLTRELE
    const filteredReceipts = allReceipts.filter(receipt => 
      isDateInRange(new Date(receipt.expenseDate), startDate, now)
    );
    
    // DÜZENLİ İŞLEMLERİ FİLTRELE (başlangıç tarihi dönem içinde olanlar)
    const filteredRecurring = allRecurring.filter(recurring => 
      isDateInRange(new Date(recurring.startDate), startDate, now)
    );
    
    console.log(`Dönem (${period}) içinde:`);
    console.log(`- ${filteredInvoices.length}/${allInvoices.length} fatura`);
    console.log(`- ${filteredExpenses.length}/${allExpenses.length} gider`);
    console.log(`- ${filteredReceipts.length}/${allReceipts.length} fiş gideri`);
    console.log(`- ${filteredRecurring.length}/${allRecurring.length} düzenli işlem`);
    
    // FATURALARDAN GELİR VE GİDER HESAPLA
    let totalInvoiceIncome = 0;
    let totalInvoiceExpense = 0;
    
    for (const invoice of filteredInvoices) {
      if (invoice.amount === null || invoice.amount === undefined) continue;
      
      // Tutarı sayısal değere dönüştür
      let amount = invoice.amount;
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
      } else if (typeof amount === 'object') {
        amount = parseFloat(amount.toString());
      }
      
      if (isNaN(amount)) continue;
      
      if (invoice.type === 'outgoing') {
        totalInvoiceIncome += amount;
      } else if (invoice.type === 'incoming') {
        totalInvoiceExpense += amount;
      }
    }
    
    // GİDERLERDEN TOPLAM GİDER HESAPLA
    let totalExpenseAmount = 0;
    for (const expense of filteredExpenses) {
      if (expense.amount === null || expense.amount === undefined) continue;
      
      let amount = expense.amount;
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
      } else if (typeof amount === 'object') {
        amount = parseFloat(amount.toString());
      }
      
      if (isNaN(amount)) continue;
      totalExpenseAmount += amount;
    }
    
    // FİŞ GİDERLERİNDEN TOPLAM GİDER HESAPLA
    let totalReceiptAmount = 0;
    for (const receipt of filteredReceipts) {
      if (receipt.amount === null || receipt.amount === undefined) continue;
      
      let amount = receipt.amount;
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
      } else if (typeof amount === 'object') {
        amount = parseFloat(amount.toString());
      }
      
      if (isNaN(amount)) continue;
      totalReceiptAmount += amount;
    }
    
    // DÜZENLİ İŞLEMLERDEN GELİR VE GİDER HESAPLA
    let totalRecurringIncome = 0;
    let totalRecurringExpense = 0;
    
    for (const recurring of filteredRecurring) {
      if (recurring.amount === null || recurring.amount === undefined) continue;
      
      let amount = recurring.amount;
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
      } else if (typeof amount === 'object') {
        amount = parseFloat(amount.toString());
      }
      
      if (isNaN(amount)) continue;
      
      if (recurring.type === 'income') {
        totalRecurringIncome += amount;
      } else if (recurring.type === 'expense') {
        totalRecurringExpense += amount;
      }
    }
    
    // TOPLAM GELİR VE GİDER HESAPLA
    const totalIncome = totalInvoiceIncome + totalRecurringIncome;
    const totalExpense = totalInvoiceExpense + totalExpenseAmount + totalReceiptAmount + totalRecurringExpense;
    
    // NET KAR/ZARAR HESAPLA
    const netProfit = totalIncome - totalExpense;
    
    console.log(`Dönem (${period}) içindeki toplam gelir: ${totalIncome}`);
    console.log(`- Fatura gelirleri: ${totalInvoiceIncome}`);
    console.log(`- Düzenli gelirler: ${totalRecurringIncome}`);
    
    console.log(`Dönem (${period}) içindeki toplam gider: ${totalExpense}`);
    console.log(`- Fatura giderleri: ${totalInvoiceExpense}`);
    console.log(`- Doğrudan giderler: ${totalExpenseAmount}`);
    console.log(`- Fiş giderleri: ${totalReceiptAmount}`);
    console.log(`- Düzenli giderler: ${totalRecurringExpense}`);
    
    // Bekleyen faturaları getir
    const pendingInvoicesResult: any[] = await prisma.$queryRaw`
      SELECT COUNT(*) as count, SUM("totalAmount")::numeric as total
      FROM "Invoice"
      WHERE status = 'pending' AND "isPaid" = false
    `;
    
    const pendingInvoices = {
      count: Number(pendingInvoicesResult[0]?.count || 0),
      total: Number(pendingInvoicesResult[0]?.total || 0)
    };
    
    // Son işlemleri getir
    const recentInvoicesRaw: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        "invoiceNumber", 
        "totalAmount"::numeric as amount, 
        "invoiceDate"::text as date, 
        type
      FROM "Invoice"
      ORDER BY "invoiceDate" DESC
      LIMIT 3
    `;
    
    const recentExpensesRaw: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        title, 
        amount::numeric as amount, 
        "expenseDate"::text as date
      FROM "Expense"
      ORDER BY "expenseDate" DESC
      LIMIT 2
    `;
    
    // İşlemleri düzenle ve birleştir
    const recentTransactions = [
      ...recentInvoicesRaw.map(invoice => ({
        id: invoice.id,
        date: invoice.date ? new Date(invoice.date) : new Date(),
        description: `Fatura #${invoice.invoiceNumber}`,
        amount: Number(invoice.amount),
        type: invoice.type === 'outgoing' ? 'income' : 'expense'
      })),
      ...recentExpensesRaw.map(expense => ({
        id: expense.id,
        date: expense.date ? new Date(expense.date) : new Date(),
        description: expense.title,
        amount: Number(expense.amount),
        type: 'expense'
      }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    
    // Vergi özeti hesapla
    const taxSummary = await getTaxSummaryForDashboard(period);
    
    // Sonucu hazırla
    const result = {
      totalIncome,
      totalExpense,
      netProfit,
      pendingInvoices,
      recentTransactions,
      // Detaylı gelir-gider bilgileri
      details: {
        invoiceIncome: totalInvoiceIncome,
        invoiceExpense: totalInvoiceExpense,
        expenseAmount: totalExpenseAmount,
        receiptAmount: totalReceiptAmount,
        recurringIncome: totalRecurringIncome,
        recurringExpense: totalRecurringExpense
      },
      taxSummary // Vergi özetini ekle
    };
    
    return result;
  } catch (error) {
    console.error('Dashboard verileri alınırken hata oluştu:', error);
    console.error('Hata mesajı:', error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error('Hata stacktrace:', error instanceof Error ? error.stack : 'Stack yok');
    
    // Hata durumunda varsayılan değerleri döndür
    return {
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      pendingInvoices: {
        count: 0,
        total: 0
      },
      recentTransactions: [],
      taxSummary: {
        vatCollected: 0,
        vatPaid: 0,
        vatBalance: 0,
        vatDueDate: null,
        incomeTaxEstimate: 0,
        upcomingTaxes: []
      }
    };
  }
}

// Faturaları getir
export async function getInvoices(status?: string) {
  try {
    console.log('getInvoices API çağrısı yapılıyor...');
    console.log('Veritabanı URL:', process.env.DATABASE_URL);
    
    const statusFilter = status ? { status } : {};
    
    // Toplam kayıt sayısını kontrol et
    const count = await prisma.invoice.count({
      where: statusFilter
    });
    console.log(`Invoice tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      console.log('Hiç fatura kaydı bulunamadı!');
      return [];
    }
    
    // Çok basit sorgu ile tüm verileri getir
    console.log('Tüm faturaları alıyoruz...');
    const rawInvoices = await prisma.$queryRaw`SELECT * FROM "Invoice" LIMIT 10`;
    console.log('Faturalar ham SQL sorgusuyla alındı:', rawInvoices);
    
    // Standart sorgu ile verileri getir
    const invoices = await prisma.invoice.findMany({
      where: statusFilter,
      select: {
        id: true,
        invoiceNumber: true,
        invoiceDate: true,
        dueDate: true,
        totalAmount: true,
        status: true,
        type: true,
        customer: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`${invoices.length} fatura veritabanından alındı.`);
    console.log('İlk fatura:', JSON.stringify(invoices[0]));
    
    // Decimal alanları dönüştür - string olarak döndür
    return invoices.map(invoice => ({
      ...invoice,
      totalAmount: invoice.totalAmount ? Number(invoice.totalAmount.toString()) : 0
    }));
  } catch (error) {
    console.error('Faturalar alınırken hata oluştu:', error);
    return [];
  }
}

// Giderleri getir
export async function getExpenses(category?: string) {
  try {
    console.log('getExpenses API çağrısı yapılıyor...');
    console.log('Veritabanı URL:', process.env.DATABASE_URL);
    
    const categoryFilter = category ? { category } : {};
    
    // Toplam kayıt sayısını kontrol et
    const count = await prisma.expense.count({
      where: categoryFilter
    });
    console.log(`Expense tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      console.log('Hiç gider kaydı bulunamadı!');
      return [];
    }
    
    // Çok basit sorgu ile tüm verileri getir
    console.log('Tüm giderleri alıyoruz...');
    const rawExpenses = await prisma.$queryRaw`SELECT * FROM "Expense" LIMIT 10`;
    console.log('Giderler ham SQL sorgusuyla alındı:', rawExpenses);
    
    // Standart sorgu ile verileri getir
    const expenses = await prisma.expense.findMany({
      where: categoryFilter,
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        expenseDate: true,
        category: true,
        status: true
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`${expenses.length} gider veritabanından alındı.`);
    if (expenses.length > 0) {
      console.log('İlk gider:', JSON.stringify(expenses[0]));
    }
    
    // Decimal alanları dönüştür - string olarak döndür
    return expenses.map(expense => ({
      ...expense,
      amount: expense.amount ? Number(expense.amount.toString()) : 0
    }));
  } catch (error) {
    console.error('Giderler alınırken hata oluştu:', error);
    return [];
  }
}

// İletişim kişilerini getir
export async function getContacts(type?: 'customer' | 'supplier') {
  try {
    const typeFilter = type === 'customer' 
      ? { isCustomer: true }
      : type === 'supplier'
        ? { isSupplier: true }
        : {};
    
    const contacts = await prisma.contact.findMany({
      where: typeFilter,
      orderBy: { name: 'asc' }
    });
    
    return contacts;
  } catch (error) {
    console.error('Kişiler alınırken hata oluştu:', error);
    return [];
  }
}

// Düzenli işlemleri getir
export async function getRecurringTransactions(type?: string, isActive?: boolean) {
  try {
    console.log('getRecurringTransactions API çağrısı yapılıyor...');
    console.log('Veritabanı URL:', process.env.DATABASE_URL);
    
    const filter: any = {};
    if (type) filter.type = type;
    if (isActive !== undefined) filter.isActive = isActive;
    
    // Toplam kayıt sayısını kontrol et
    const count = await prisma.recurringTransaction.count({
      where: filter
    });
    console.log(`RecurringTransaction tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      console.log('Hiç düzenli işlem kaydı bulunamadı!');
      return [];
    }
    
    // Çok basit sorgu ile tüm verileri getir
    console.log('Tüm düzenli işlemleri alıyoruz...');
    const rawTransactions = await prisma.$queryRaw`SELECT * FROM "RecurringTransaction" LIMIT 10`;
    console.log('Düzenli işlemler ham SQL sorgusuyla alındı:', rawTransactions);
    
    // Standart sorgu ile verileri getir
    const transactions = await prisma.recurringTransaction.findMany({
      where: filter,
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        type: true,
        frequency: true,
        startDate: true,
        endDate: true,
        isActive: true,
        category: true
      },
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`${transactions.length} düzenli işlem veritabanından alındı.`);
    if (transactions.length > 0) {
      console.log('İlk düzenli işlem:', JSON.stringify(transactions[0]));
    }
    
    // Decimal alanları dönüştür - string olarak döndür
    return transactions.map(transaction => ({
      ...transaction,
      amount: transaction.amount ? Number(transaction.amount.toString()) : 0
    }));
  } catch (error) {
    console.error('Düzenli işlemler alınırken hata oluştu:', error);
    return [];
  }
} 

// Fiş giderlerini getir
export async function getReceiptExpenses(category?: string) {
  try {
    console.log('getReceiptExpenses API çağrısı yapılıyor...');
    
    const categoryFilter = category ? { category } : {};
    
    // Toplam kayıt sayısını kontrol et
    const count = await prisma.receiptExpense.count({
      where: categoryFilter
    });
    console.log(`ReceiptExpense tablosunda ${count} kayıt bulundu.`);
    
    if (count === 0) {
      console.log('Hiç fiş gideri kaydı bulunamadı!');
      return [];
    }
    
    // Standart sorgu ile verileri getir
    const receiptExpenses = await prisma.receiptExpense.findMany({
      where: categoryFilter,
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        expenseDate: true,
        category: true,
        receiptNumber: true,
        taxRate: true,
        taxAmount: true,
        totalAmount: true,
        paymentMethod: true,
        isVerified: true,
        supplier: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { expenseDate: 'desc' }
    });
    
    console.log(`${receiptExpenses.length} fiş gideri veritabanından alındı.`);
    
    // Decimal alanları dönüştür - string olarak döndür
    return receiptExpenses.map(receipt => ({
      ...receipt,
      amount: receipt.amount ? Number(receipt.amount.toString()) : 0,
      taxRate: receipt.taxRate ? Number(receipt.taxRate.toString()) : 0,
      taxAmount: receipt.taxAmount ? Number(receipt.taxAmount.toString()) : 0,
      totalAmount: receipt.totalAmount ? Number(receipt.totalAmount.toString()) : 0
    }));
  } catch (error) {
    console.error('Fiş giderleri alınırken hata oluştu:', error);
    return [];
  }
} 