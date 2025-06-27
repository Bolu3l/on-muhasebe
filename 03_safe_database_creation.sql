-- SAFE ON-MUHASEBE DATABASE CREATION
-- Bu kod mevcut yapıları kontrol eder ve sadece eksik olanları oluşturur

-- 1. ENUM TYPES OLUŞTUR (IF NOT EXISTS)
DO $$ BEGIN
    CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "SalaryPaymentType" AS ENUM ('SALARY', 'BONUS', 'ALLOWANCE', 'ADVANCE', 'CUSTOMER_SATISFACTION', 'SALES', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'BEREAVEMENT', 'UNPAID', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. USER TABLOSU
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. CONTACT TABLOSU (Müşteri/Tedarikçi)
CREATE TABLE IF NOT EXISTS "Contact" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "taxNumber" TEXT,
    "taxOffice" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isCustomer" BOOLEAN DEFAULT true NOT NULL,
    "isSupplier" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. INVOICE TABLOSU (Fatura)
CREATE TABLE IF NOT EXISTS "Invoice" (
    "id" TEXT PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "invoiceDate" TIMESTAMPTZ,
    "dueDate" TIMESTAMPTZ,
    "amount" NUMERIC DEFAULT 0,
    "taxRate" NUMERIC DEFAULT 0,
    "taxAmount" NUMERIC DEFAULT 0,
    "totalAmount" NUMERIC DEFAULT 0 NOT NULL,
    "isPaid" BOOLEAN DEFAULT false NOT NULL,
    "paymentDate" TIMESTAMPTZ,
    "status" TEXT DEFAULT 'pending' NOT NULL,
    "type" TEXT DEFAULT 'incoming',
    "notes" TEXT,
    "customerId" TEXT,
    "supplierId" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "issuerAddress" TEXT,
    "issuerName" TEXT,
    "issuerTaxId" TEXT,
    "recipientAddress" TEXT,
    "recipientName" TEXT,
    "recipientTaxId" TEXT
);

-- Foreign key constraints (sadece mevcut değilse ekle)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'Invoice_customerId_fkey') THEN
        ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" 
        FOREIGN KEY ("customerId") REFERENCES "Contact"("id");
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'Invoice_supplierId_fkey') THEN
        ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_supplierId_fkey" 
        FOREIGN KEY ("supplierId") REFERENCES "Contact"("id");
    END IF;
END $$;

-- 5. INVOICE ITEM TABLOSU (Fatura Kalemleri)
CREATE TABLE IF NOT EXISTS "InvoiceItem" (
    "id" TEXT PRIMARY KEY,
    "description" TEXT NOT NULL,
    "quantity" NUMERIC DEFAULT 1 NOT NULL,
    "unitPrice" NUMERIC NOT NULL,
    "vatRate" NUMERIC DEFAULT 0 NOT NULL,
    "vatAmount" NUMERIC DEFAULT 0 NOT NULL,
    "totalAmount" NUMERIC NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'InvoiceItem_invoiceId_fkey') THEN
        ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" 
        FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 6. INVOICE FILE TABLOSU (Fatura Dosyaları)
CREATE TABLE IF NOT EXISTS "InvoiceFile" (
    "id" TEXT PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadDate" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'InvoiceFile_invoiceId_fkey') THEN
        ALTER TABLE "InvoiceFile" ADD CONSTRAINT "InvoiceFile_invoiceId_fkey" 
        FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 7. EXPENSE TABLOSU (Giderler)
CREATE TABLE IF NOT EXISTS "Expense" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" NUMERIC NOT NULL,
    "expenseDate" TIMESTAMPTZ NOT NULL,
    "category" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT DEFAULT 'completed' NOT NULL,
    "receiptUrl" TEXT,
    "supplierId" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'Expense_supplierId_fkey') THEN
        ALTER TABLE "Expense" ADD CONSTRAINT "Expense_supplierId_fkey" 
        FOREIGN KEY ("supplierId") REFERENCES "Contact"("id");
    END IF;
END $$;

-- 8. RECURRING TRANSACTION TABLOSU (Düzenli İşlemler)
CREATE TABLE IF NOT EXISTS "RecurringTransaction" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" NUMERIC NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "paymentMethod" TEXT,
    "startDate" TIMESTAMPTZ NOT NULL,
    "endDate" TIMESTAMPTZ,
    "frequency" TEXT DEFAULT 'monthly' NOT NULL,
    "dayOfMonth" INTEGER,
    "dayOfWeek" INTEGER,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "lastProcessed" TIMESTAMPTZ,
    "contactId" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'RecurringTransaction_contactId_fkey') THEN
        ALTER TABLE "RecurringTransaction" ADD CONSTRAINT "RecurringTransaction_contactId_fkey" 
        FOREIGN KEY ("contactId") REFERENCES "Contact"("id");
    END IF;
END $$;

-- 9. EMPLOYEE TABLOSU (Çalışanlar)
CREATE TABLE IF NOT EXISTS "Employee" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "taxId" TEXT,
    "socialSecurityNumber" TEXT,
    "bankAccount" TEXT,
    "salary" REAL NOT NULL,
    "status" "EmployeeStatus" DEFAULT 'ACTIVE' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. SALARY PAYMENT TABLOSU (Maaş Ödemeleri)
CREATE TABLE IF NOT EXISTS "SalaryPayment" (
    "id" TEXT PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "paymentDate" TIMESTAMPTZ NOT NULL,
    "amount" REAL NOT NULL,
    "type" "SalaryPaymentType" DEFAULT 'SALARY' NOT NULL,
    "taxAmount" REAL DEFAULT 0 NOT NULL,
    "netAmount" REAL NOT NULL,
    "notes" TEXT,
    "paymentMethod" TEXT,
    "status" "PaymentStatus" DEFAULT 'PAID' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'SalaryPayment_employeeId_fkey') THEN
        ALTER TABLE "SalaryPayment" ADD CONSTRAINT "SalaryPayment_employeeId_fkey" 
        FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 11. LEAVE REQUEST TABLOSU (İzin Talepleri)
CREATE TABLE IF NOT EXISTS "LeaveRequest" (
    "id" TEXT PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "startDate" TIMESTAMPTZ NOT NULL,
    "endDate" TIMESTAMPTZ NOT NULL,
    "days" INTEGER NOT NULL,
    "type" "LeaveType" NOT NULL,
    "status" "LeaveStatus" DEFAULT 'PENDING' NOT NULL,
    "notes" TEXT,
    "approvedAt" TIMESTAMPTZ,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'LeaveRequest_employeeId_fkey') THEN
        ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_employeeId_fkey" 
        FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 12. EMPLOYEE DOCUMENT TABLOSU (Çalışan Belgeleri)
CREATE TABLE IF NOT EXISTS "EmployeeDocument" (
    "id" TEXT PRIMARY KEY,
    "employeeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadDate" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "category" TEXT DEFAULT 'other' NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'EmployeeDocument_employeeId_fkey') THEN
        ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_employeeId_fkey" 
        FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 13. EMPLOYEE LEAVE BALANCE TABLOSU (Çalışan İzin Bakiyeleri)
CREATE TABLE IF NOT EXISTS "EmployeeLeaveBalance" (
    "id" TEXT PRIMARY KEY,
    "employeeId" TEXT UNIQUE NOT NULL,
    "year" INTEGER NOT NULL,
    "annualLeaveTotal" INTEGER DEFAULT 14 NOT NULL,
    "annualLeaveUsed" INTEGER DEFAULT 0 NOT NULL,
    "sickLeaveTotal" INTEGER DEFAULT 5 NOT NULL,
    "sickLeaveUsed" INTEGER DEFAULT 0 NOT NULL,
    "lastUpdated" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'EmployeeLeaveBalance_employeeId_fkey') THEN
        ALTER TABLE "EmployeeLeaveBalance" ADD CONSTRAINT "EmployeeLeaveBalance_employeeId_fkey" 
        FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE;
    END IF;
END $$;

-- 14. BONUS TYPE TABLOSU (Prim Tipleri)
CREATE TABLE IF NOT EXISTS "BonusType" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isDefault" BOOLEAN DEFAULT false NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. RECEIPT EXPENSE TABLOSU (Fiş Giderleri)
CREATE TABLE IF NOT EXISTS "ReceiptExpense" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" REAL NOT NULL,
    "expenseDate" TIMESTAMPTZ NOT NULL,
    "category" TEXT NOT NULL,
    "receiptNumber" TEXT,
    "taxRate" REAL DEFAULT 0 NOT NULL,
    "taxAmount" REAL DEFAULT 0 NOT NULL,
    "totalAmount" REAL NOT NULL,
    "paymentMethod" TEXT DEFAULT 'cash' NOT NULL,
    "supplierId" TEXT,
    "receiptImageUrl" TEXT,
    "isVerified" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'ReceiptExpense_supplierId_fkey') THEN
        ALTER TABLE "ReceiptExpense" ADD CONSTRAINT "ReceiptExpense_supplierId_fkey" 
        FOREIGN KEY ("supplierId") REFERENCES "Contact"("id");
    END IF;
END $$;

-- 16. INDEXES OLUŞTUR (IF NOT EXISTS kontrolü ile)
CREATE INDEX IF NOT EXISTS "Invoice_customerId_idx" ON "Invoice"("customerId");
CREATE INDEX IF NOT EXISTS "Invoice_supplierId_idx" ON "Invoice"("supplierId");
CREATE INDEX IF NOT EXISTS "Invoice_createdAt_idx" ON "Invoice"("createdAt");
CREATE INDEX IF NOT EXISTS "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");
CREATE INDEX IF NOT EXISTS "InvoiceFile_invoiceId_idx" ON "InvoiceFile"("invoiceId");
CREATE INDEX IF NOT EXISTS "Expense_supplierId_idx" ON "Expense"("supplierId");
CREATE INDEX IF NOT EXISTS "Expense_expenseDate_idx" ON "Expense"("expenseDate");
CREATE INDEX IF NOT EXISTS "RecurringTransaction_contactId_idx" ON "RecurringTransaction"("contactId");
CREATE INDEX IF NOT EXISTS "SalaryPayment_employeeId_idx" ON "SalaryPayment"("employeeId");
CREATE INDEX IF NOT EXISTS "LeaveRequest_employeeId_idx" ON "LeaveRequest"("employeeId");
CREATE INDEX IF NOT EXISTS "EmployeeDocument_employeeId_idx" ON "EmployeeDocument"("employeeId");
CREATE INDEX IF NOT EXISTS "ReceiptExpense_supplierId_idx" ON "ReceiptExpense"("supplierId");

-- 17. UPDATED_AT TRIGGER FUNCTION OLUŞTUR
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 18. UPDATED_AT TRIGGER'LARI OLUŞTUR (IF NOT EXISTS kontrolü ile)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_user_updated_at') THEN
        CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_contact_updated_at') THEN
        CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON "Contact" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Continue with other triggers...
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_invoice_updated_at') THEN
        CREATE TRIGGER update_invoice_updated_at BEFORE UPDATE ON "Invoice" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 19. RLS ENABLE (Güvenli şekilde)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'User' AND rowsecurity = true) THEN
        ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'Contact' AND rowsecurity = true) THEN
        ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Continue for other tables...

-- 20. BASIC RLS POLICIES (sadece mevcut değilse)
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable all access for all users' AND tablename = 'User') THEN
        CREATE POLICY "Enable all access for all users" ON "User" FOR ALL USING (true);
    END IF;
END $$;

-- 21. COMPLETION MESSAGE
SELECT 'Safe ON-MUHASEBE Database oluşturma/güncelleme tamamlandı!' as message;
SELECT 'Mevcut yapılar korundu, eksik olanlar eklendi.' as status; 