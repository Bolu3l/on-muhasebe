const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('Prim tipleri ekleniyor...');

  // Varsayılan prim tipleri
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
    try {
      // Önce var mı kontrol et
      const existing = await prisma.bonusType.findFirst({
        where: { code: bonusType.code }
      });
      
      if (!existing) {
        await prisma.bonusType.create({
          data: bonusType,
        });
        console.log(`✓ ${bonusType.name} eklendi`);
      } else {
        console.log(`- ${bonusType.name} zaten mevcut`);
      }
    } catch (error) {
      console.error(`✗ ${bonusType.name} eklenirken hata:`, error.message);
    }
  }

  console.log('Prim tipleri işlemi tamamlandı!');
}

main()
  .catch((e) => {
    console.error('Hata:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 