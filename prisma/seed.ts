const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seed işlemi başlatılıyor...');

  // Test kullanıcısı oluştur veya güncelle
  const hashedPassword = await bcrypt.hash('test123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@onmuhasebe.com' },
    update: {},
    create: {
      email: 'test@onmuhasebe.com',
      name: 'Test Kullanıcı',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('Test kullanıcısı hazırlandı:', user.email);

  // Test şirketi oluştur veya güncelle
  const company = await prisma.company.upsert({
    where: { userId: user.id },
    update: {},
    create: {
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

  console.log('Test şirketi hazırlandı:', company.name);

  // Test müşteri oluştur veya güncelle
  const customer = await prisma.contact.upsert({
    where: { 
      userId_taxNumber: { 
        userId: user.id, 
        taxNumber: '9876543210' 
      } 
    },
    update: {},
    create: {
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

  console.log('Test müşteri hazırlandı:', customer.name);

  // Test tedarikçi oluştur veya güncelle
  const supplier = await prisma.contact.upsert({
    where: { 
      userId_taxNumber: { 
        userId: user.id, 
        taxNumber: '1357924680' 
      } 
    },
    update: {},
    create: {
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

  console.log('Test tedarikçi hazırlandı:', supplier.name);

  // Test çalışan oluştur veya güncelle
  const employee = await prisma.employee.upsert({
    where: { 
      userId_tcNumber: { 
        userId: user.id, 
        tcNumber: '12345678901' 
      } 
    },
    update: {},
    create: {
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

  console.log('Test çalışan hazırlandı:', employee.firstName, employee.lastName);

  // Varsayılan prim tiplerini oluştur
  const bonusTypes = [
    {
      name: 'Performans Primi',
      code: 'PERFORMANCE',
      isDefault: true,
      isActive: true,
    },
    {
      name: 'Satış Primi',
      code: 'SALES',
      isDefault: true,
      isActive: true,
    },
    {
      name: 'Yıl Sonu Primi',
      code: 'YEAR_END',
      isDefault: true,
      isActive: true,
    },
    {
      name: 'Proje Primi',
      code: 'PROJECT',
      isDefault: true,
      isActive: true,
    },
    {
      name: 'Fazla Mesai Primi',
      code: 'OVERTIME',
      isDefault: true,
      isActive: true,
    },
  ];

  for (const bonusType of bonusTypes) {
    await prisma.bonusType.upsert({
      where: { code: bonusType.code },
      update: {},
      create: bonusType,
    });
  }

  console.log('Varsayılan prim tipleri hazırlandı');

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