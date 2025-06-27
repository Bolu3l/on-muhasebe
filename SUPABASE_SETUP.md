# Supabase Kurulum Rehberi

Bu rehber, projenizi local veritabanından Supabase'e taşımanız için gerekli adımları içerir.

## 1. Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. "New Project" butonuna tıklayın
3. Proje adını girin (örn: "on-muhasebe")
4. Veritabanı şifresini belirleyin
5. Bölge seçin (Türkiye için en yakın bölge)
6. "Create new project" butonuna tıklayın

## 2. Veritabanı Şemasını Oluşturma

1. Supabase Dashboard'da projenizi açın
2. Sol menüden "SQL Editor" seçin
3. Aşağıdaki SQL komutlarını çalıştırın:

```sql
-- Prisma şemasına uygun tabloları oluştur
-- Bu komutları sırayla çalıştırın

-- Contact tablosu
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taxNumber" TEXT,
    "taxOffice" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isCustomer" BOOLEAN NOT NULL DEFAULT true,
    "isSupplier" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- Invoice tablosu
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "amount" DECIMAL(10,2) DEFAULT 0,
    "taxRate" DECIMAL(5,2) DEFAULT 0,
    "taxAmount" DECIMAL(10,2) DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paymentDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "type" TEXT DEFAULT 'incoming',
    "notes" TEXT,
    "customerId" TEXT,
    "supplierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "issuerAddress" TEXT,
    "issuerName" TEXT,
    "issuerTaxId" TEXT,
    "recipientAddress" TEXT,
    "recipientName" TEXT,
    "recipientTaxId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- InvoiceItem tablosu
CREATE TABLE "InvoiceItem" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "vatRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "vatAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY ("id")
);

-- Expense tablosu
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "receiptUrl" TEXT,
    "supplierId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- Employee tablosu
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "taxId" TEXT,
    "socialSecurityNumber" TEXT,
    "bankAccount" TEXT,
    "salary" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- Foreign key constraints
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## 3. Environment Değişkenlerini Ayarlama

1. Supabase Dashboard'da "Settings" > "API" bölümüne gidin
2. Aşağıdaki bilgileri kopyalayın:
   - Project URL
   - anon/public key
   - service_role key

3. Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database URLs (Supabase)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

## 4. Veri Taşıma

1. Local veritabanınızdaki verileri Supabase'e taşımak için:

```bash
npm run supabase:migrate
```

## 5. Storage Bucket Oluşturma

1. Supabase Dashboard'da "Storage" bölümüne gidin
2. "New bucket" butonuna tıklayın
3. Bucket adını girin: "invoices"
4. "Public bucket" seçeneğini işaretleyin
5. "Create bucket" butonuna tıklayın

## 6. Row Level Security (RLS) Ayarları

Güvenlik için RLS politikalarını ayarlayın:

```sql
-- Tüm tablolar için RLS'yi etkinleştir
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InvoiceItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Expense" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Employee" ENABLE ROW LEVEL SECURITY;

-- Geçici olarak tüm erişime izin ver (geliştirme için)
CREATE POLICY "Allow all" ON "Contact" FOR ALL USING (true);
CREATE POLICY "Allow all" ON "Invoice" FOR ALL USING (true);
CREATE POLICY "Allow all" ON "InvoiceItem" FOR ALL USING (true);
CREATE POLICY "Allow all" ON "Expense" FOR ALL USING (true);
CREATE POLICY "Allow all" ON "Employee" FOR ALL USING (true);
```

## 7. Test Etme

1. Uygulamayı başlatın:
```bash
npm run dev
```

2. Fatura oluşturma, listeleme gibi işlemleri test edin
3. Console'da hata mesajlarını kontrol edin

## Sorun Giderme

### Bağlantı Hatası
- Environment değişkenlerinin doğru olduğundan emin olun
- Supabase projesinin aktif olduğunu kontrol edin

### Tablo Bulunamadı Hatası
- SQL Editor'da tabloların oluşturulduğunu kontrol edin
- Tablo isimlerinin büyük/küçük harf duyarlılığına dikkat edin

### Yetki Hatası
- RLS politikalarının doğru ayarlandığından emin olun
- Service role key'in doğru olduğunu kontrol edin

## Güvenlik Notları

- Production ortamında RLS politikalarını daha sıkı ayarlayın
- Service role key'i client-side kodda kullanmayın
- Environment değişkenlerini git'e commit etmeyin 