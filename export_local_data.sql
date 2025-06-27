-- LOCAL DATABASE EXPORT KODU
-- Bu kodu şu şekilde çalıştırın: sqlite3 prisma/dev.db < export_local_data.sql

-- Output mode'u INSERT olarak ayarla
.mode insert

-- 1. Contact tablosu (önce referans tabloları)
.output contact_data.sql
SELECT 'INSERT INTO "Contact" (id, name, "taxNumber", "taxOffice", address, phone, email, "isCustomer", "isSupplier", "createdAt", "updatedAt") VALUES' as header;
.headers off
SELECT '(' || 
  quote(id) || ',' ||
  quote(name) || ',' ||
  quote("taxNumber") || ',' ||
  quote("taxOffice") || ',' ||
  quote(address) || ',' ||
  quote(phone) || ',' ||
  quote(email) || ',' ||
  "isCustomer" || ',' ||
  "isSupplier" || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM Contact;

-- 2. User tablosu
.output user_data.sql
SELECT 'INSERT INTO "User" (id, email, name, "passwordHash", role, "createdAt", "updatedAt") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote(email) || ',' ||
  quote(name) || ',' ||
  quote("passwordHash") || ',' ||
  quote(role) || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM User;

-- 3. Invoice tablosu
.output invoice_data.sql
SELECT 'INSERT INTO "Invoice" (id, "invoiceNumber", "invoiceDate", "dueDate", amount, "taxRate", "taxAmount", "totalAmount", "isPaid", "paymentDate", status, type, notes, "customerId", "supplierId", "createdAt", "updatedAt", "issuerAddress", "issuerName", "issuerTaxId", "recipientAddress", "recipientName", "recipientTaxId") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote("invoiceNumber") || ',' ||
  quote("invoiceDate") || ',' ||
  quote("dueDate") || ',' ||
  amount || ',' ||
  "taxRate" || ',' ||
  "taxAmount" || ',' ||
  "totalAmount" || ',' ||
  "isPaid" || ',' ||
  quote("paymentDate") || ',' ||
  quote(status) || ',' ||
  quote(type) || ',' ||
  quote(notes) || ',' ||
  quote("customerId") || ',' ||
  quote("supplierId") || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") || ',' ||
  quote("issuerAddress") || ',' ||
  quote("issuerName") || ',' ||
  quote("issuerTaxId") || ',' ||
  quote("recipientAddress") || ',' ||
  quote("recipientName") || ',' ||
  quote("recipientTaxId") ||
  ');'
FROM Invoice;

-- 4. InvoiceItem tablosu
.output invoiceitem_data.sql
SELECT 'INSERT INTO "InvoiceItem" (id, description, quantity, "unitPrice", "vatRate", "vatAmount", "totalAmount", "invoiceId", "createdAt", "updatedAt") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote(description) || ',' ||
  quantity || ',' ||
  "unitPrice" || ',' ||
  "vatRate" || ',' ||
  "vatAmount" || ',' ||
  "totalAmount" || ',' ||
  quote("invoiceId") || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM InvoiceItem;

-- 5. InvoiceFile tablosu
.output invoicefile_data.sql
SELECT 'INSERT INTO "InvoiceFile" (id, filename, "fileKey", "fileSize", "mimeType", "uploadDate", "invoiceId", "createdAt", "updatedAt") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote(filename) || ',' ||
  quote("fileKey") || ',' ||
  "fileSize" || ',' ||
  quote("mimeType") || ',' ||
  quote("uploadDate") || ',' ||
  quote("invoiceId") || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM InvoiceFile;

-- 6. Expense tablosu
.output expense_data.sql
SELECT 'INSERT INTO "Expense" (id, title, description, amount, "expenseDate", category, "paymentMethod", status, "receiptUrl", "supplierId", "createdAt", "updatedAt") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote(title) || ',' ||
  quote(description) || ',' ||
  amount || ',' ||
  quote("expenseDate") || ',' ||
  quote(category) || ',' ||
  quote("paymentMethod") || ',' ||
  quote(status) || ',' ||
  quote("receiptUrl") || ',' ||
  quote("supplierId") || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM Expense;

-- 7. RecurringTransaction tablosu
.output recurring_data.sql
SELECT 'INSERT INTO "RecurringTransaction" (id, title, description, amount, type, category, "paymentMethod", "startDate", "endDate", frequency, "dayOfMonth", "dayOfWeek", "isActive", "lastProcessed", "contactId", "createdAt", "updatedAt") VALUES' as header;
SELECT '(' || 
  quote(id) || ',' ||
  quote(title) || ',' ||
  quote(description) || ',' ||
  amount || ',' ||
  quote(type) || ',' ||
  quote(category) || ',' ||
  quote("paymentMethod") || ',' ||
  quote("startDate") || ',' ||
  quote("endDate") || ',' ||
  quote(frequency) || ',' ||
  "dayOfMonth" || ',' ||
  "dayOfWeek" || ',' ||
  "isActive" || ',' ||
  quote("lastProcessed") || ',' ||
  quote("contactId") || ',' ||
  quote("createdAt") || ',' ||
  quote("updatedAt") ||
  ');'
FROM RecurringTransaction;

.output stdout
SELECT 'Export işlemi tamamlandı! Oluşturulan dosyalar:';
SELECT '- contact_data.sql';
SELECT '- user_data.sql';
SELECT '- invoice_data.sql';
SELECT '- invoiceitem_data.sql';
SELECT '- invoicefile_data.sql';
SELECT '- expense_data.sql';
SELECT '- recurring_data.sql'; 