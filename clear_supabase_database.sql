-- SUPABASE DATABASE TEMİZLEME KODU
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- Foreign key constraint'leri göz önünde bulundurarak tabloları temizle
-- Önce bağımlı tablolar, sonra ana tablolar

-- 1. Employee ile ilgili tablolar
DROP TABLE IF EXISTS "EmployeeLeaveBalance" CASCADE;
DROP TABLE IF EXISTS "EmployeeDocument" CASCADE;
DROP TABLE IF EXISTS "LeaveRequest" CASCADE;
DROP TABLE IF EXISTS "SalaryPayment" CASCADE;
DROP TABLE IF EXISTS "Employee" CASCADE;

-- 2. Invoice ile ilgili tablolar
DROP TABLE IF EXISTS "InvoiceItem" CASCADE;
DROP TABLE IF EXISTS "InvoiceFile" CASCADE;
DROP TABLE IF EXISTS "Invoice" CASCADE;

-- 3. Diğer bağımlı tablolar
DROP TABLE IF EXISTS "Expense" CASCADE;
DROP TABLE IF EXISTS "RecurringTransaction" CASCADE;
DROP TABLE IF EXISTS "ReceiptExpense" CASCADE;

-- 4. Ana tablolar
DROP TABLE IF EXISTS "Contact" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "BonusType" CASCADE;

-- 5. Enum tiplerini sil
DROP TYPE IF EXISTS "EmployeeStatus" CASCADE;
DROP TYPE IF EXISTS "SalaryPaymentType" CASCADE;
DROP TYPE IF EXISTS "PaymentStatus" CASCADE;
DROP TYPE IF EXISTS "LeaveType" CASCADE;
DROP TYPE IF EXISTS "LeaveStatus" CASCADE;

-- 6. Prisma migration tablosunu da temizle (isteğe bağlı)
DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;

-- Tüm işlem tamamlandıktan sonra bilgilendirme
SELECT 'Supabase database başarıyla temizlendi!' as message; 