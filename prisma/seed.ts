const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Varsayılan prim tiplerini ekle
  const defaultBonusTypes = [
    {
      name: 'Genel Prim',
      code: 'BONUS',
      isDefault: true,
    },
    {
      name: 'Müşteri Memnuniyeti',
      code: 'CUSTOMER_SATISFACTION',
      isDefault: true,
    },
    {
      name: 'Satış Primi',
      code: 'SALES',
      isDefault: true,
    },
    {
      name: 'Diğer',
      code: 'OTHER',
      isDefault: true,
    },
  ];

  console.log('Varsayılan prim tipleri ekleniyor...');

  for (const bonusType of defaultBonusTypes) {
    // Önce bu kodla bir kayıt var mı kontrol et
    const exists = await prisma.bonusType.findFirst({
      where: { code: bonusType.code },
    });

    // Yoksa ekle
    if (!exists) {
      await prisma.bonusType.create({
        data: bonusType,
      });
      console.log(`${bonusType.name} eklendi.`);
    } else {
      console.log(`${bonusType.name} zaten mevcut.`);
    }
  }

  console.log('Seed işlemi tamamlandı!');
}

main()
  .catch((e) => {
    console.error('Seed işlemi sırasında hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 