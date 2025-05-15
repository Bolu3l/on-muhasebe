// Prisma bağlantısını test et
const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    // Bağlantıyı kontrol et
    console.log('Veritabanı bağlantısı test ediliyor...');
    
    // Invoice tablosundan sayıyı getir
    const invoiceCount = await prisma.invoice.count();
    console.log(`Invoice tablosundaki kayıt sayısı: ${invoiceCount}`);
    
    // Expense tablosundan sayıyı getir
    const expenseCount = await prisma.expense.count();
    console.log(`Expense tablosundaki kayıt sayısı: ${expenseCount}`);
    
    // RecurringTransaction tablosundan sayıyı getir
    const recurringCount = await prisma.recurringTransaction.count();
    console.log(`RecurringTransaction tablosundaki kayıt sayısı: ${recurringCount}`);

    console.log('Veritabanı bağlantısı başarılı!');
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 