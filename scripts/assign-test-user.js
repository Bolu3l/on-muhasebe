const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function assignTestUser() {
  try {
    console.log('🔄 Test kullanıcısı oluşturuluyor...');
    
    // Test kullanıcısı oluştur
    const testUser = await prisma.user.upsert({
      where: { email: 'test@onmuhasebe.com' },
      update: {},
      create: {
        id: 'test-user-id',
        email: 'test@onmuhasebe.com',
        name: 'Test Kullanıcı',
        passwordHash: await bcrypt.hash('test123', 12),
        role: 'admin',
        companyName: 'Test Şirketi',
        taxNumber: '1234567890',
        taxOffice: 'Test Vergi Dairesi',
        address: 'Test Adres',
        phone: '0555 123 45 67',
        isEmailVerified: true,
        isActive: true,
      },
    });

    console.log('✅ Test kullanıcısı oluşturuldu:', testUser.email);

    // Mevcut verileri test kullanıcısına ata
    console.log('🔄 Mevcut veriler test kullanıcısına atanıyor...');

    // Invoices
    const invoiceUpdateResult = await prisma.invoice.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${invoiceUpdateResult.count} fatura test kullanıcısına atandı`);

    // Expenses
    const expenseUpdateResult = await prisma.expense.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${expenseUpdateResult.count} gider test kullanıcısına atandı`);

    // Contacts
    const contactUpdateResult = await prisma.contact.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${contactUpdateResult.count} kişi test kullanıcısına atandı`);

    // Employees
    const employeeUpdateResult = await prisma.employee.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${employeeUpdateResult.count} çalışan test kullanıcısına atandı`);

    // Recurring Transactions
    const recurringUpdateResult = await prisma.recurringTransaction.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${recurringUpdateResult.count} tekrarlayan işlem test kullanıcısına atandı`);

    // Receipt Expenses
    const receiptUpdateResult = await prisma.receiptExpense.updateMany({
      where: { userId: null },
      data: { userId: testUser.id },
    });
    console.log(`✅ ${receiptUpdateResult.count} fiş gideri test kullanıcısına atandı`);

    console.log('🎉 Tüm veriler başarıyla test kullanıcısına atandı!');
    
    // Özet bilgi
    console.log('\n📊 Özet:');
    console.log('Test Kullanıcı Bilgileri:');
    console.log('- Email:', testUser.email);
    console.log('- Şifre: test123');
    console.log('- Rol:', testUser.role);
    console.log('- Şirket:', testUser.companyName);
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

assignTestUser(); 