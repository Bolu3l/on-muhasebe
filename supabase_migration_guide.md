# 🚀 SUPABASE'E GEÇIŞ KILAVUZU

## 1. SUPABASE DATABASE'İNİ TEMİZLE
```sql
-- clear_supabase_database.sql dosyasını Supabase SQL Editor'da çalıştır
```

## 2. LOCAL VERİLERİ EXPORT ET (eğer veri varsa)
```bash
# Terminal'de çalıştır:
sqlite3 prisma/dev.db < export_local_data.sql
```

## 3. PRISMA SCHEMA'SINI SUPABASE'E UYGULA
```bash
# Prisma generate
npx prisma generate

# Prisma migrate ve push
npx prisma db push
```

## 4. ENVIRONMENT VARIABLES GÜNCELLE
`.env` dosyasını güncelle:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database URLs (Supabase - SADECE BUNLAR KALDI)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Local Database (ARTIK KULLANILMIYOR - SİLİNEBİLİR)
# DATABASE_URL=file:./dev.db
# DIRECT_URL=file:./dev.db
```

## 5. VERCEL ENVIRONMENT VARIABLES GÜNCELLE
Vercel Dashboard → Project → Settings → Environment Variables:
- `DATABASE_URL` → Supabase connection string
- `DIRECT_URL` → Supabase connection string  
- `NEXT_PUBLIC_SUPABASE_URL` → Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` → Supabase service role key

## 6. LOCAL FİLELERI TEMİZLE (İsteğe bağlı)
```bash
# SQLite database dosyalarını sil
rm prisma/dev.db
rm prisma/dev.db-journal
rm -rf prisma/prisma/

# Migration dosyalarını gözden geçir
ls prisma/migrations/
```

## 7. PRISMA CLIENT'I TAMAMEN KALDIR (İsteğe bağlı)
```bash
# Sadece Supabase client kullanacaksak Prisma'yı kaldırabiliriz
npm uninstall prisma @prisma/client

# package.json'dan prisma postinstall script'ini kaldır
```

## 8. TEST ET
- Local'de test: `npm run dev`
- Production'da test: Deploy sonrası
- API endpoint'leri test et:
  - GET /api/employees
  - POST /api/employees  
  - GET /api/recurring
  - POST /api/recurring
  - GET /api/expenses
  - POST /api/expenses
  - GET /api/invoices
  - POST /api/invoices

## 9. DATABASE BACKUP (Önerilen)
```sql
-- Supabase SQL Editor'da backup oluştur
pg_dump -h db.your-project-ref.supabase.co -U postgres -d postgres > backup_$(date +%Y%m%d).sql
```

## 10. MONİTORİNG
- Supabase Dashboard → Database → Logs
- Vercel Dashboard → Functions → Logs
- Network isteklerini browser dev tools'da kontrol et

---

## ⚠️ DİKKAT EDİLECEKLER:
1. **Environment Variables**: Local ve Production'da aynı olmalı
2. **Data Types**: Prisma Decimal → Supabase Numeric uyumluluğu
3. **Foreign Keys**: Supabase'de foreign key constraint'leri aktif
4. **Connection Pooling**: Supabase otomatik pool yönetimi yapıyor
5. **SSL**: Supabase connection'ları SSL gerektirir

## 🎉 BAŞARILI GEÇİŞ SONRASI:
- ✅ Tüm API'ler Supabase client kullanıyor
- ✅ Production'da database connection sorunları çözüldü  
- ✅ Local development Supabase'e bağlı
- ✅ Tek source of truth: Supabase database 