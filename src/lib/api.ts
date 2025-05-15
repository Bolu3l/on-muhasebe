// API işlevlerini içeren servis katmanı
// Gerçek veritabanı için güncellendi

import { prisma } from './db';
import { formatCurrency, convertDecimalFields } from './utils';
import { DashboardData } from './types';

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

// Dashboard verilerini getir
export async function getDashboardData(period: 'week' | 'month' | 'year' = 'month'): Promise<DashboardData> {
  try {
    console.log('getDashboardData çağrıldı, dönem:', period);
    console.log('SORUNU BULMAK İÇİN ADIM ADIM İLERLEYECEĞİZ');
    
    // İlk olarak veritabanı bağlantısını test et
    console.log('1. ADIM: VERİTABANI BAĞLANTISINI KONTROL EDİYORUM');
    try {
      const testResult = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('Veritabanı bağlantısı başarılı:', testResult);
    } catch (dbError) {
      console.error('VERİTABANI BAĞLANTI HATASI!', dbError);
      throw new Error('Veritabanı bağlantısı kurulamadı!');
    }
    
    // Dönem başlangıç ve bitiş tarihlerini hesapla
    console.log('2. ADIM: TARİH ARALIĞINI BELİRLİYORUM');
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        // Haftanın başlangıcı (Pazartesi) olarak ayarla
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Pazar günü için ayarlama
        startDate = new Date(now);
        startDate.setDate(diff);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        // İçinde bulunulan ayın başlangıcı (1'i) olarak ayarla
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        // İçinde bulunulan yılın başlangıcı (1 Ocak) olarak ayarla
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }
    
    console.log('Dönem başlangıç tarihi:', startDate.toISOString());
    console.log('Dönem bitiş tarihi:', now.toISOString());
    
    // 3. Faturaları direkt SQL ile getir
    console.log('3. ADIM: TÜM FATURALARI GETİRİYORUM');
    // String olarak alarak decimal dönüşüm sorunlarını aş
    const rawInvoices: any[] = await prisma.$queryRaw`
      SELECT 
        id, 
        "invoiceNumber", 
        "totalAmount"::numeric as amount, 
        "invoiceDate", 
        type, 
        status
      FROM "Invoice"
    `;
    
    console.log(`Toplam ${rawInvoices.length} fatura bulundu`);
    
    if (rawInvoices.length === 0) {
      console.log('UYARI: Veritabanında hiç fatura bulunamadı!');
      console.log('Hiç fatura olmadığı için dashboard 0 değerlerle dönecek!');
    } else {
      console.log('MEVCUT FATURALAR:');
      for (let i = 0; i < Math.min(5, rawInvoices.length); i++) {
        const inv = rawInvoices[i];
        console.log(`Fatura #${i+1}:`);
        console.log('  ID:', inv.id);
        console.log('  Tip:', inv.type);
        console.log('  Tutar:', inv.amount, 'Tipi:', typeof inv.amount);
        console.log('  Tarih:', inv.invoiceDate, 'Tipi:', typeof inv.invoiceDate);
      }
    }
    
    // 4. Tarih filtreleme
    console.log('4. ADIM: FATURALARI FİLTRELİYORUM');
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const filteredInvoices = rawInvoices.filter(invoice => {
      if (!invoice.invoiceDate) {
        console.log(`Fatura ${invoice.id} tarih değeri yok, FİLTRELENDİ`);
        return false;
      }
      
      // Tarih formatını kontrol et
      let invoiceDate;
      try {
        invoiceDate = new Date(invoice.invoiceDate);
        
        // Geçersiz tarih kontrolü
        if (isNaN(invoiceDate.getTime())) {
          console.log(`Fatura ${invoice.id} geçersiz tarih: ${invoice.invoiceDate}, FİLTRELENDİ`);
          return false;
        }
      } catch (e) {
        console.log(`Fatura ${invoice.id} tarih dönüşüm hatası: ${e}, FİLTRELENDİ`);
        return false;
      }
      
      const invoiceYear = invoiceDate.getFullYear();
      const invoiceMonth = invoiceDate.getMonth();
      
      let isInPeriod = false;
      
      if (period === 'year') {
        isInPeriod = (invoiceYear === currentYear);
      } else if (period === 'month') {
        isInPeriod = (invoiceYear === currentYear && invoiceMonth === currentMonth);
      } else {
        isInPeriod = (invoiceDate >= startDate && invoiceDate <= now);
      }
      
      if (!isInPeriod) {
        console.log(`Fatura ${invoice.id} dönem dışında: ${invoice.invoiceDate}, FİLTRELENDİ`);
      }
      
      return isInPeriod;
    });
    
    console.log(`Filtreleme sonrası ${filteredInvoices.length} fatura kaldı (dönem: ${period})`);
    
    // 5. Gelir ve Gider hesapla
    console.log('5. ADIM: GELİR VE GİDERLERİ HESAPLIYORUM');
    
    let totalIncome = 0;
    let totalExpense = 0;
    let processedIncomeCount = 0;
    let processedExpenseCount = 0;
    
    for (const invoice of filteredInvoices) {
      // Tutar kontrolü
      if (invoice.amount === null || invoice.amount === undefined) {
        console.log(`Fatura ${invoice.id} tutarı bulunamadı, atlanıyor`);
        continue;
      }
      
      // Tipi string ise sayıya çevir
      let amount = invoice.amount;
      if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(',', '.'));
      } else if (typeof amount === 'object') {
        // Decimal objesi olabilir
        amount = parseFloat(amount.toString());
      }
      
      // Sayısal değer kontrolü
      if (isNaN(amount)) {
        console.log(`Fatura ${invoice.id} geçersiz tutar: ${invoice.amount}, atlanıyor`);
        continue;
      }
      
      if (invoice.type === 'outgoing') {
        totalIncome += amount;
        processedIncomeCount++;
        console.log(`Gelir eklendi: Fatura ${invoice.id}, Tutar: ${amount}, Yeni Toplam: ${totalIncome}`);
      } else if (invoice.type === 'incoming') {
        totalExpense += amount;
        processedExpenseCount++;
        console.log(`Gider eklendi: Fatura ${invoice.id}, Tutar: ${amount}, Yeni Toplam: ${totalExpense}`);
      } else {
        console.log(`Fatura ${invoice.id} bilinmeyen tipte: ${invoice.type}, atlanıyor`);
      }
    }
    
    console.log(`İşlenen gelir faturaları: ${processedIncomeCount}, Toplam gelir: ${totalIncome}`);
    console.log(`İşlenen gider faturaları: ${processedExpenseCount}, Toplam gider: ${totalExpense}`);
    
    // 6. Net kar/zarar hesapla
    const netProfit = totalIncome - totalExpense;
    console.log(`Net kar/zarar: ${netProfit}`);
    
    // 7. İlave bilgileri getir
    console.log('7. ADIM: BEKLEYEN FATURALARI VE SON İŞLEMLERİ GETİRİYORUM');
    
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
    
    console.log('Bekleyen faturalar:', pendingInvoices);
    
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
    
    console.log(`Son işlemler: ${recentTransactions.length} adet`);
    
    // 8. Son sonucu hazırla
    console.log('8. ADIM: SON SONUCU HAZIRLIYORUM VE DÖNÜYORUM');
    
    const result = {
      totalIncome,
      totalExpense,
      netProfit,
      pendingInvoices,
      recentTransactions
    };
    
    console.log('SONUÇ:', result);
    
    return result;
  } catch (error) {
    console.error('GENİŞLETİLMİŞ HATA AYRINTI!:', error);
    console.error('Hata mesajı:', error instanceof Error ? error.message : 'Bilinmeyen hata');
    console.error('Hata stacktrace:', error instanceof Error ? error.stack : 'Stack yok');
    
    // Hata durumunda mümkün olduğunca kullanıcı dostu bir yanıt döndür
    return {
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      pendingInvoices: {
        count: 0,
        total: 0
      },
      recentTransactions: []
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