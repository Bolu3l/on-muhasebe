const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seed işlemi başlatılıyor...');

  // Test kullanıcısı oluştur
  const hashedPassword = await bcrypt.hash('test123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'test@onmuhasebe.com',
      name: 'Test Kullanıcı',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('Test kullanıcısı oluşturuldu:', user.email);

  // Test şirketi oluştur
  const company = await prisma.company.create({
    data: {
      userId: user.id,
      name: 'Test Şirketi A.Ş.',
      taxNumber: '1234567890',
      taxOffice: 'Kadıköy',
      mersisNo: '0123456789012345',
      address: 'Test Mahallesi, Test Sokak No:1 Kadıköy/İstanbul',
      phone: '+90 216 123 45 67',
      email: 'info@testshirketi.com',
      sector: 'Bilgi Teknolojileri',
      activityCode: '62.01',
      isActive: true,
    },
  });

  console.log('Test şirketi oluşturuldu:', company.name);

  // Test müşteri oluştur
  const customer = await prisma.contact.create({
    data: {
      userId: user.id,
      companyId: company.id,
      name: 'Örnek Müşteri Ltd. Şti.',
      taxNumber: '9876543210',
      taxOffice: 'Beşiktaş',
      address: 'Müşteri Mahallesi, Müşteri Sokak No:10 Beşiktaş/İstanbul',
      phone: '+90 212 987 65 43',
      email: 'info@ornekmusteri.com',
      contactType: 'CUSTOMER',
      isActive: true,
      creditLimit: 50000.00,
      paymentTerms: '30 gün',
    },
  });

  console.log('Test müşteri oluşturuldu:', customer.name);

  // Test tedarikçi oluştur
  const supplier = await prisma.contact.create({
    data: {
      userId: user.id,
      companyId: company.id,
      name: 'Tedarikçi A.Ş.',
      taxNumber: '1357924680',
      taxOffice: 'Şişli',
      address: 'Tedarikçi Mahallesi, Tedarikçi Sokak No:5 Şişli/İstanbul',
      phone: '+90 212 135 79 24',
      email: 'info@tedarikci.com',
      contactType: 'SUPPLIER',
      isActive: true,
      paymentTerms: '15 gün',
    },
  });

  console.log('Test tedarikçi oluşturuldu:', supplier.name);

  // Test çalışan oluştur
  const employee = await prisma.employee.create({
    data: {
      userId: user.id,
      companyId: company.id,
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      tcNumber: '12345678901',
      sgkNumber: 'SGK123456',
      position: 'Yazılım Geliştirici',
      department: 'Bilgi İşlem',
      startDate: new Date('2024-01-01'),
      email: 'ahmet.yilmaz@testshirketi.com',
      phone: '+90 532 123 45 67',
      address: 'Çalışan Mahallesi, Çalışan Sokak No:15 Kadıköy/İstanbul',
      salary: 25000.00,
      status: 'ACTIVE',
    },
  });

  console.log('Test çalışan oluşturuldu:', employee.firstName, employee.lastName);

  console.log('Seed işlemi tamamlandı!');
  console.log('Giriş bilgileri:');
  console.log('E-posta: test@onmuhasebe.com');
  console.log('Şifre: test123');
}

main()
  .catch((e) => {
    console.error('Seed işlemi sırasında hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 