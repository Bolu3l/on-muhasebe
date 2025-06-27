-- ON-MUHASEBE COMPLETE DATABASE CREATION
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- 1. ENUM TYPES OLUŞTUR
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED');
CREATE TYPE "SalaryPaymentType" AS ENUM ('SALARY', 'BONUS', 'ALLOWANCE', 'ADVANCE', 'CUSTOMER_SATISFACTION', 'SALES', 'OTHER');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');
CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'BEREAVEMENT', 'UNPAID', 'OTHER');
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- 2. USER TABLOSU
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user' NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. CONTACT TABLOSU (Müşteri/Tedarikçi)
CREATE TABLE "Contact" (
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
CREATE TABLE "Invoice" (
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
    "recipientTaxId" TEXT,
    
    CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Contact"("id"),
    CONSTRAINT "Invoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Contact"("id")
);

-- 5. INVOICE ITEM TABLOSU (Fatura Kalemleri)
CREATE TABLE "InvoiceItem" (
    "id" TEXT PRIMARY KEY,
    "description" TEXT NOT NULL,
    "quantity" NUMERIC DEFAULT 1 NOT NULL,
    "unitPrice" NUMERIC NOT NULL,
    "vatRate" NUMERIC DEFAULT 0 NOT NULL,
    "vatAmount" NUMERIC DEFAULT 0 NOT NULL,
    "totalAmount" NUMERIC NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE
);

-- 6. INVOICE FILE TABLOSU (Fatura Dosyaları)
CREATE TABLE "InvoiceFile" (
    "id" TEXT PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "fileKey" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadDate" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "InvoiceFile_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE
);

-- 7. EXPENSE TABLOSU (Giderler)
CREATE TABLE "Expense" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "Expense_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Contact"("id")
);

-- 8. RECURRING TRANSACTION TABLOSU (Düzenli İşlemler)
CREATE TABLE "RecurringTransaction" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "RecurringTransaction_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id")
);

-- 9. EMPLOYEE TABLOSU (Çalışanlar)
CREATE TABLE "Employee" (
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
CREATE TABLE "SalaryPayment" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "SalaryPayment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE
);

-- 11. LEAVE REQUEST TABLOSU (İzin Talepleri)
CREATE TABLE "LeaveRequest" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "LeaveRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE
);

-- 12. EMPLOYEE DOCUMENT TABLOSU (Çalışan Belgeleri)
CREATE TABLE "EmployeeDocument" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "EmployeeDocument_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE
);

-- 13. EMPLOYEE LEAVE BALANCE TABLOSU (Çalışan İzin Bakiyeleri)
CREATE TABLE "EmployeeLeaveBalance" (
    "id" TEXT PRIMARY KEY,
    "employeeId" TEXT UNIQUE NOT NULL,
    "year" INTEGER NOT NULL,
    "annualLeaveTotal" INTEGER DEFAULT 14 NOT NULL,
    "annualLeaveUsed" INTEGER DEFAULT 0 NOT NULL,
    "sickLeaveTotal" INTEGER DEFAULT 5 NOT NULL,
    "sickLeaveUsed" INTEGER DEFAULT 0 NOT NULL,
    "lastUpdated" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "EmployeeLeaveBalance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE
);

-- 14. BONUS TYPE TABLOSU (Prim Tipleri)
CREATE TABLE "BonusType" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isDefault" BOOLEAN DEFAULT false NOT NULL,
    "isActive" BOOLEAN DEFAULT true NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. RECEIPT EXPENSE TABLOSU (Fiş Giderleri)
CREATE TABLE "ReceiptExpense" (
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
    "updatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    CONSTRAINT "ReceiptExpense_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Contact"("id")
);

-- 16. INDEXES OLUŞTUR (Performance için)
CREATE INDEX "Invoice_customerId_idx" ON "Invoice"("customerId");
CREATE INDEX "Invoice_supplierId_idx" ON "Invoice"("supplierId");
CREATE INDEX "Invoice_createdAt_idx" ON "Invoice"("createdAt");
CREATE INDEX "InvoiceItem_invoiceId_idx" ON "InvoiceItem"("invoiceId");
CREATE INDEX "InvoiceFile_invoiceId_idx" ON "InvoiceFile"("invoiceId");
CREATE INDEX "Expense_supplierId_idx" ON "Expense"("supplierId");
CREATE INDEX "Expense_expenseDate_idx" ON "Expense"("expenseDate");
CREATE INDEX "RecurringTransaction_contactId_idx" ON "RecurringTransaction"("contactId");
CREATE INDEX "SalaryPayment_employeeId_idx" ON "SalaryPayment"("employeeId");
CREATE INDEX "LeaveRequest_employeeId_idx" ON "LeaveRequest"("employeeId");
CREATE INDEX "EmployeeDocument_employeeId_idx" ON "EmployeeDocument"("employeeId");
CREATE INDEX "ReceiptExpense_supplierId_idx" ON "ReceiptExpense"("supplierId");

-- 17. UPDATED_AT TRIGGER FUNCTION OLUŞTUR
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 18. UPDATED_AT TRIGGER'LARI OLUŞTUR
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON "Contact" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_updated_at BEFORE UPDATE ON "Invoice" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoiceitem_updated_at BEFORE UPDATE ON "InvoiceItem" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoicefile_updated_at BEFORE UPDATE ON "InvoiceFile" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expense_updated_at BEFORE UPDATE ON "Expense" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recurring_updated_at BEFORE UPDATE ON "RecurringTransaction" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employee_updated_at BEFORE UPDATE ON "Employee" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_salarypayment_updated_at BEFORE UPDATE ON "SalaryPayment" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaverequest_updated_at BEFORE UPDATE ON "LeaveRequest" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employeedocument_updated_at BEFORE UPDATE ON "EmployeeDocument" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employeeleavebalance_updated_at BEFORE UPDATE ON "EmployeeLeaveBalance" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bonustype_updated_at BEFORE UPDATE ON "BonusType" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_receiptexpense_updated_at BEFORE UPDATE ON "ReceiptExpense" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 19. ROW LEVEL SECURITY (RLS) ENABLE ET
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Invoice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InvoiceItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InvoiceFile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Expense" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RecurringTransaction" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Employee" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SalaryPayment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LeaveRequest" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EmployeeDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EmployeeLeaveBalance" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BonusType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReceiptExpense" ENABLE ROW LEVEL SECURITY;

-- 20. BASIC RLS POLICIES (Herkese erişim - Daha sonra güncellenebilir)
CREATE POLICY "Enable all access for all users" ON "User" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "Contact" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "Invoice" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "InvoiceItem" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "InvoiceFile" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "Expense" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "RecurringTransaction" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "Employee" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "SalaryPayment" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "LeaveRequest" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "EmployeeDocument" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "EmployeeLeaveBalance" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "BonusType" FOR ALL USING (true);
CREATE POLICY "Enable all access for all users" ON "ReceiptExpense" FOR ALL USING (true);

-- 21. COMPLETION MESSAGE
SELECT 'ON-MUHASEBE Database başarıyla oluşturuldu!' as message;
SELECT '15 tablo, 5 enum, index ler, trigger lar ve RLS policy leri hazır.' as status; 