// API fonksiyonlarını test et
require('dotenv').config();
const { getInvoices, getExpenses, getRecurringTransactions } = require('./src/lib/api');

async function main() {
  try {
    console.log('API fonksiyonları test ediliyor...');
    
    // Faturaları getir
    console.log('Faturalar getiriliyor...');
    const invoices = await getInvoices();
    console.log(`${invoices.length} fatura bulundu:`);
    console.log(JSON.stringify(invoices.map(i => ({ id: i.id, number: i.invoiceNumber })), null, 2));
    
    // Giderleri getir
    console.log('\nGiderler getiriliyor...');
    const expenses = await getExpenses();
    console.log(`${expenses.length} gider bulundu:`);
    console.log(JSON.stringify(expenses.map(e => ({ id: e.id, title: e.title })), null, 2));
    
    // Düzenli işlemleri getir
    console.log('\nDüzenli işlemler getiriliyor...');
    const recurring = await getRecurringTransactions();
    console.log(`${recurring.length} düzenli işlem bulundu:`);
    console.log(JSON.stringify(recurring.map(r => ({ id: r.id, title: r.title })), null, 2));

  } catch (error) {
    console.error('API hatası:', error);
  }
}

main(); 