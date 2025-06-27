const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const prisma = new PrismaClient();

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateData() {
  try {
    console.log('Veri taşıma işlemi başlıyor...');

    // 1. Müşteri/Tedarikçi verilerini taşı
    console.log('Müşteri/Tedarikçi verileri taşınıyor...');
    const contacts = await prisma.contact.findMany();
    
    for (const contact of contacts) {
      const { error } = await supabase
        .from('Contact')
        .upsert({
          id: contact.id,
          name: contact.name,
          taxNumber: contact.taxNumber,
          taxOffice: contact.taxOffice,
          address: contact.address,
          phone: contact.phone,
          email: contact.email,
          isCustomer: contact.isCustomer,
          isSupplier: contact.isSupplier,
          createdAt: contact.createdAt,
          updatedAt: contact.updatedAt
        });
      
      if (error) {
        console.error('Contact taşıma hatası:', error);
      }
    }
    console.log(`${contacts.length} müşteri/tedarikçi taşındı`);

    // 2. Fatura verilerini taşı
    console.log('Fatura verileri taşınıyor...');
    const invoices = await prisma.invoice.findMany();
    
    for (const invoice of invoices) {
      const { error } = await supabase
        .from('Invoice')
        .upsert({
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          dueDate: invoice.dueDate,
          amount: invoice.amount,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          totalAmount: invoice.totalAmount,
          isPaid: invoice.isPaid,
          paymentDate: invoice.paymentDate,
          status: invoice.status,
          type: invoice.type,
          notes: invoice.notes,
          customerId: invoice.customerId,
          supplierId: invoice.supplierId,
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt,
          issuerAddress: invoice.issuerAddress,
          issuerName: invoice.issuerName,
          issuerTaxId: invoice.issuerTaxId,
          recipientAddress: invoice.recipientAddress,
          recipientName: invoice.recipientName,
          recipientTaxId: invoice.recipientTaxId
        });
      
      if (error) {
        console.error('Invoice taşıma hatası:', error);
      }
    }
    console.log(`${invoices.length} fatura taşındı`);

    // 3. Fatura kalemlerini taşı
    console.log('Fatura kalemleri taşınıyor...');
    const invoiceItems = await prisma.invoiceItem.findMany();
    
    for (const item of invoiceItems) {
      const { error } = await supabase
        .from('InvoiceItem')
        .upsert({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          vatRate: item.vatRate,
          vatAmount: item.vatAmount,
          totalAmount: item.totalAmount,
          invoiceId: item.invoiceId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        });
      
      if (error) {
        console.error('InvoiceItem taşıma hatası:', error);
      }
    }
    console.log(`${invoiceItems.length} fatura kalemi taşındı`);

    // 4. Gider verilerini taşı
    console.log('Gider verileri taşınıyor...');
    const expenses = await prisma.expense.findMany();
    
    for (const expense of expenses) {
      const { error } = await supabase
        .from('Expense')
        .upsert({
          id: expense.id,
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          expenseDate: expense.expenseDate,
          category: expense.category,
          paymentMethod: expense.paymentMethod,
          status: expense.status,
          receiptUrl: expense.receiptUrl,
          supplierId: expense.supplierId,
          createdAt: expense.createdAt,
          updatedAt: expense.updatedAt
        });
      
      if (error) {
        console.error('Expense taşıma hatası:', error);
      }
    }
    console.log(`${expenses.length} gider taşındı`);

    // 5. Personel verilerini taşı
    console.log('Personel verileri taşınıyor...');
    const employees = await prisma.employee.findMany();
    
    for (const employee of employees) {
      const { error } = await supabase
        .from('Employee')
        .upsert({
          id: employee.id,
          name: employee.name,
          position: employee.position,
          department: employee.department,
          startDate: employee.startDate,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          taxId: employee.taxId,
          socialSecurityNumber: employee.socialSecurityNumber,
          bankAccount: employee.bankAccount,
          salary: employee.salary,
          status: employee.status,
          createdAt: employee.createdAt,
          updatedAt: employee.updatedAt
        });
      
      if (error) {
        console.error('Employee taşıma hatası:', error);
      }
    }
    console.log(`${employees.length} personel taşındı`);

    console.log('Veri taşıma işlemi tamamlandı!');

  } catch (error) {
    console.error('Veri taşıma hatası:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateData(); 